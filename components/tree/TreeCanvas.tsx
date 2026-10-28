"use client";

import React, {
  useRef,
  useEffect,
  useCallback,
  useMemo,
  useState,
} from "react";
import type { TaxonLayoutNode, ViewportTransform, TreeData } from "@/types/taxonomy";
import {
  computeTreeLayout,
  getTreeBounds,
  computeBranchPath,
  getAncestorChain,
  getDescendantIds,
  computeFitTransform,
  computeNodeFocusTransform,
} from "@/lib/tree-layout";
import { getNodeAccentColor, clamp } from "@/lib/tree-utils";

// ── Constants ──────────────────────────────────────────────
const MIN_ZOOM = 0.12;
const MAX_ZOOM = 5;
const ZOOM_SENSITIVITY = 0.001;
const SMOOTH_FACTOR = 0.12;

// ── Types ──────────────────────────────────────────────────
interface TreeCanvasProps {
  treeData: TreeData;
  selectedNodeId: string | null;
  hoveredNodeId: string | null;
  onNodeSelect: (id: string) => void;
  onNodeHover: (id: string | null) => void;
  externalTransform?: ViewportTransform | null;
  onTransformChange?: (t: ViewportTransform) => void;
  registerControls?: (controls: TreeCanvasControls) => void;
  initialFocusNodeId?: string | null;
  onOpenPreLuca?: () => void;
}

export interface TreeCanvasControls {
  zoomIn: () => void;
  zoomOut: () => void;
  resetView: () => void;
  fitTree: () => void;
  focusNode: (id: string) => void;
  getTransform: () => ViewportTransform;
}

// ── Node component ─────────────────────────────────────────
interface TreeNodeProps {
  node: TaxonLayoutNode;
  isSelected: boolean;
  isHovered: boolean;
  isHighlighted: boolean;
  isDimmed: boolean;
  zoomScale: number;
  onSelect: (id: string) => void;
  onHover: (id: string | null) => void;
}

const TreeNode = React.memo(function TreeNode({
  node,
  isSelected,
  isHovered,
  isHighlighted,
  isDimmed,
  zoomScale,
  onSelect,
  onHover,
}: TreeNodeProps) {
  const accentColor = getNodeAccentColor(node);
  const accentColorDim = getNodeAccentColor(node, 0.35);

  const nodeRadius = isSelected ? 7.5 : isHovered ? 6.5 : 5;
  const opacity = isDimmed ? 0.22 : 1;

  // Progressive Level of Detail (LOD) thresholds
  const isMajorNode =
    node.rank === "root" ||
    node.rank === "domain" ||
    node.rank === "kingdom" ||
    node.id === "luca";

  const isMesoNode =
    isMajorNode ||
    node.rank === "phylum" ||
    node.rank === "class";

  // Label visibility by LOD
  const showLabel =
    isSelected ||
    isHovered ||
    isHighlighted ||
    zoomScale >= 0.85 ||
    (zoomScale >= 0.45 && isMesoNode) ||
    isMajorNode;

  // Rich scientific sublabel visibility
  const showScientificName =
    Boolean(node.scientificName && node.scientificName !== node.name) &&
    (isSelected || isHovered || zoomScale >= 1.25);

  return (
    <g
      className="tree-node"
      transform={`translate(${node.x}, ${node.y})`}
      onClick={() => onSelect(node.id)}
      onMouseEnter={() => onHover(node.id)}
      onMouseLeave={() => onHover(null)}
      opacity={opacity}
      role="button"
      aria-label={`${node.name}${node.scientificName ? `, ${node.scientificName}` : ""}`}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onSelect(node.id);
      }}
    >
      {/* Glow ring for selected/hovered */}
      {(isSelected || isHovered) && (
        <circle
          cx={0}
          cy={0}
          r={nodeRadius + 5}
          fill={isSelected ? `${accentColor.replace(")", ", 0.15)")}` : "rgba(255,255,255,0.04)"}
          style={{ filter: isSelected ? `drop-shadow(0 0 8px ${accentColor})` : "none" }}
        />
      )}

      {/* Main node circle */}
      <circle
        cx={0}
        cy={0}
        r={nodeRadius}
        fill={
          isSelected
            ? accentColor
            : isHighlighted
            ? accentColorDim
            : "rgba(255,255,255,0.12)"
        }
        stroke={
          isSelected
            ? accentColor
            : isHighlighted || isHovered
            ? accentColorDim
            : "rgba(255,255,255,0.18)"
        }
        strokeWidth={isSelected ? 0 : 1}
        style={{
          transition: "r 200ms ease, fill 200ms ease, filter 200ms ease",
          filter: isSelected
            ? `drop-shadow(0 0 6px ${accentColor})`
            : isHovered
            ? "drop-shadow(0 0 4px rgba(255,255,255,0.3))"
            : "none",
        }}
      />

      {/* Name label (conditioned on Progressive LOD) */}
      {showLabel && (
        <text
          x={14}
          y={showScientificName ? -3 : 4}
          className={`node-label ${isSelected || isHighlighted ? "selected" : ""}`}
          style={{
            fill: isSelected
              ? accentColor
              : isHighlighted || isHovered
              ? "var(--text-primary)"
              : "var(--text-secondary)",
            fontSize: isSelected ? "12.5px" : isMajorNode ? "12px" : "11px",
            fontWeight: isSelected || isMajorNode ? "600" : "500",
            letterSpacing: isMajorNode ? "0.02em" : "0",
            transition: "fill 200ms ease, font-size 200ms ease",
          }}
        >
          {node.name}
        </text>
      )}

      {/* Scientific name label (conditioned on zoom scale or selection) */}
      {showScientificName && (
        <text
          x={14}
          y={10}
          className="node-sublabel"
          style={{
            fill: isSelected ? "rgba(168, 196, 232, 0.7)" : "var(--text-tertiary)",
            fontSize: "10px",
            fontStyle: "italic",
          }}
        >
          {node.scientificName}
        </text>
      )}

      {/* Extinct indicator (shown when label is visible) */}
      {node.status === "extinct" && showLabel && (
        <text
          x={0}
          y={nodeRadius + 11}
          textAnchor="middle"
          style={{
            fill: "var(--accent-extinct)",
            fontSize: "8.5px",
            fontWeight: "600",
            letterSpacing: "0.08em",
            opacity: isSelected || isHovered ? 1 : 0.65,
          }}
        >
          †
        </text>
      )}
    </g>
  );
});

// ── Branch component ───────────────────────────────────────
interface TreeBranchProps {
  path: string;
  isHighlighted: boolean;
  isDimmed: boolean;
  accentColor: string;
}

const TreeBranch = React.memo(function TreeBranch({
  path,
  isHighlighted,
  isDimmed,
  accentColor,
}: TreeBranchProps) {
  return (
    <path
      d={path}
      className={`branch-path ${isHighlighted ? "highlighted" : ""} ${isDimmed ? "dimmed" : ""}`}
      style={
        isHighlighted
          ? {
              stroke: accentColor,
              strokeWidth: 2,
              opacity: 1,
              transition: "stroke 200ms ease, stroke-width 200ms ease",
            }
          : { transition: "opacity 200ms ease" }
      }
    />
  );
});

// ── Main TreeCanvas ─────────────────────────────────────────
export default function TreeCanvas({
  treeData,
  selectedNodeId,
  hoveredNodeId,
  onNodeSelect,
  onNodeHover,
  externalTransform,
  onTransformChange,
  registerControls,
  initialFocusNodeId,
  onOpenPreLuca,
}: TreeCanvasProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Current transform (used for rendering)
  const transformRef = useRef<ViewportTransform>({ x: 0, y: 0, scale: 0.7 });
  const [renderTransform, setRenderTransform] = useState<ViewportTransform>({
    x: 0,
    y: 0,
    scale: 0.7,
  });

  // Target transform (used for smooth animation)
  const targetTransformRef = useRef<ViewportTransform>({ x: 0, y: 0, scale: 0.7 });
  const animFrameRef = useRef<number>(0);
  const isAnimatingRef = useRef(false);
  const animateRef = useRef<() => void>(() => {});

  // Pan state
  const isPanningRef = useRef(false);
  const lastPanPosRef = useRef({ x: 0, y: 0 });

  // Compute layout
  const layoutNodes = useMemo(
    () => computeTreeLayout(treeData),
    [treeData]
  );

  const bounds = useMemo(() => getTreeBounds(layoutNodes), [layoutNodes]);

  // Compute branches
  const branches = useMemo(() => {
    const result: Array<{
      id: string;
      path: string;
      parentId: string;
      childId: string;
      childAccentColor: string;
    }> = [];

    for (const node of layoutNodes.values()) {
      if (node.parentId) {
        const parent = layoutNodes.get(node.parentId);
        if (parent) {
          result.push({
            id: `${node.parentId}-${node.id}`,
            path: computeBranchPath(parent, node),
            parentId: node.parentId,
            childId: node.id,
            childAccentColor: getNodeAccentColor(node, 0.7),
          });
        }
      }
    }
    return result;
  }, [layoutNodes]);

  // Compute highlighted chain
  const highlightedChain = useMemo(() => {
    if (!selectedNodeId) return new Set<string>();
    return getAncestorChain(selectedNodeId, layoutNodes);
  }, [selectedNodeId, layoutNodes]);

  const highlightedDescendants = useMemo(() => {
    if (!selectedNodeId) return new Set<string>();
    return getDescendantIds(selectedNodeId, treeData);
  }, [selectedNodeId, treeData]);

  const hasSelection = selectedNodeId !== null;

  // ── Animation loop ─────────────────────────────────────────
  const animateToTarget = useCallback(() => {
    const current = transformRef.current;
    const target = targetTransformRef.current;

    const dx = target.x - current.x;
    const dy = target.y - current.y;
    const ds = target.scale - current.scale;

    const threshold = 0.0005;
    const posThreshold = 0.05;

    if (
      Math.abs(dx) < posThreshold &&
      Math.abs(dy) < posThreshold &&
      Math.abs(ds) < threshold
    ) {
      transformRef.current = { ...target };
      setRenderTransform({ ...target });
      onTransformChange?.({ ...target });
      isAnimatingRef.current = false;
      return;
    }

    const newTransform = {
      x: current.x + dx * SMOOTH_FACTOR,
      y: current.y + dy * SMOOTH_FACTOR,
      scale: current.scale + ds * SMOOTH_FACTOR,
    };

    transformRef.current = newTransform;
    setRenderTransform({ ...newTransform });
    onTransformChange?.({ ...newTransform });

    animFrameRef.current = requestAnimationFrame(() => animateRef.current());
  }, [onTransformChange]);

  useEffect(() => {
    animateRef.current = animateToTarget;
  }, [animateToTarget]);

  const startAnimation = useCallback(() => {
    if (!isAnimatingRef.current) {
      isAnimatingRef.current = true;
      animFrameRef.current = requestAnimationFrame(() => animateRef.current());
    }
  }, []);

  const setTargetTransform = useCallback(
    (t: ViewportTransform) => {
      targetTransformRef.current = {
        x: t.x,
        y: t.y,
        scale: clamp(t.scale, MIN_ZOOM, MAX_ZOOM),
      };
      startAnimation();
    },
    [startAnimation]
  );

  // ── Initial viewport positioning ───────────────────────────
  const hasInitializedRef = useRef(false);

  useEffect(() => {
    if (hasInitializedRef.current) return;
    const container = containerRef.current;
    if (!container) return;

    const { width, height } = container.getBoundingClientRect();
    if (width === 0 || height === 0) return;

    hasInitializedRef.current = true;

    // Prioritize initial focus node (defaults to homo-sapiens)
    const targetNodeId = initialFocusNodeId || "homo-sapiens";
    const targetNode = targetNodeId ? layoutNodes.get(targetNodeId) : null;

    if (targetNode) {
      const initialTransform = computeNodeFocusTransform(
        targetNode,
        width,
        height,
        0.85
      );
      transformRef.current = initialTransform;
      targetTransformRef.current = initialTransform;
      setRenderTransform(initialTransform);
      onTransformChange?.(initialTransform);
    } else {
      const fit = computeFitTransform(bounds, width, height, 60);
      transformRef.current = fit;
      targetTransformRef.current = fit;
      setRenderTransform(fit);
      onTransformChange?.(fit);
    }
  }, [bounds, initialFocusNodeId, layoutNodes, onTransformChange]);

  // ── External transform (e.g., from minimap or search) ──────
  useEffect(() => {
    if (externalTransform) {
      setTargetTransform(externalTransform);
    }
  }, [externalTransform, setTargetTransform]);

  // ── Controls registration ────────────────────────────────────
  useEffect(() => {
    if (!registerControls) return;

    const controls: TreeCanvasControls = {
      zoomIn: () => {
        const current = targetTransformRef.current;
        const container = containerRef.current;
        if (!container) return;
        const { width, height } = container.getBoundingClientRect();
        const factor = 1.3;
        const newScale = clamp(current.scale * factor, MIN_ZOOM, MAX_ZOOM);
        const scaleRatio = newScale / current.scale;
        setTargetTransform({
          x: width / 2 - (width / 2 - current.x) * scaleRatio,
          y: height / 2 - (height / 2 - current.y) * scaleRatio,
          scale: newScale,
        });
      },
      zoomOut: () => {
        const current = targetTransformRef.current;
        const container = containerRef.current;
        if (!container) return;
        const { width, height } = container.getBoundingClientRect();
        const factor = 1 / 1.3;
        const newScale = clamp(current.scale * factor, MIN_ZOOM, MAX_ZOOM);
        const scaleRatio = newScale / current.scale;
        setTargetTransform({
          x: width / 2 - (width / 2 - current.x) * scaleRatio,
          y: height / 2 - (height / 2 - current.y) * scaleRatio,
          scale: newScale,
        });
      },
      resetView: () => {
        const node = layoutNodes.get("homo-sapiens");
        const container = containerRef.current;
        if (!container) return;
        const { width, height } = container.getBoundingClientRect();
        if (node) {
          const t = computeNodeFocusTransform(node, width, height, 0.85);
          setTargetTransform(t);
          onNodeSelect("homo-sapiens");
        } else {
          const fit = computeFitTransform(bounds, width, height, 60);
          setTargetTransform(fit);
        }
      },
      fitTree: () => {
        const container = containerRef.current;
        if (!container) return;
        const { width, height } = container.getBoundingClientRect();
        const fit = computeFitTransform(bounds, width, height, 60);
        setTargetTransform(fit);
      },
      focusNode: (id: string) => {
        const node = layoutNodes.get(id);
        if (!node) return;
        const container = containerRef.current;
        if (!container) return;
        const { width, height } = container.getBoundingClientRect();
        const t = computeNodeFocusTransform(
          node,
          width,
          height,
          targetTransformRef.current.scale
        );
        setTargetTransform(t);
      },
      getTransform: () => transformRef.current,
    };

    registerControls(controls);
  }, [registerControls, bounds, layoutNodes, setTargetTransform, onNodeSelect]);

  // ── Wheel zoom ──────────────────────────────────────────────
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const rect = container.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const current = targetTransformRef.current;
      const delta = -e.deltaY * ZOOM_SENSITIVITY;
      const factor = Math.exp(delta * 3);
      const newScale = clamp(current.scale * factor, MIN_ZOOM, MAX_ZOOM);
      const scaleRatio = newScale / current.scale;

      setTargetTransform({
        x: mouseX - (mouseX - current.x) * scaleRatio,
        y: mouseY - (mouseY - current.y) * scaleRatio,
        scale: newScale,
      });
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, [setTargetTransform]);

  // ── Pan ─────────────────────────────────────────────────────
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button !== 0) return;
    isPanningRef.current = true;
    lastPanPosRef.current = { x: e.clientX, y: e.clientY };
    (e.currentTarget as HTMLElement).style.cursor = "grabbing";
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isPanningRef.current) return;
      const dx = e.clientX - lastPanPosRef.current.x;
      const dy = e.clientY - lastPanPosRef.current.y;
      lastPanPosRef.current = { x: e.clientX, y: e.clientY };

      const current = targetTransformRef.current;
      // Direct pan — no smoothing for immediate feel
      const newTransform = {
        x: current.x + dx,
        y: current.y + dy,
        scale: current.scale,
      };
      targetTransformRef.current = newTransform;
      transformRef.current = newTransform;
      setRenderTransform({ ...newTransform });
      onTransformChange?.({ ...newTransform });
    },
    [onTransformChange]
  );

  const handleMouseUp = useCallback((e: React.MouseEvent) => {
    isPanningRef.current = false;
    (e.currentTarget as HTMLElement).style.cursor = "grab";
  }, []);

  // ── Double click to zoom ────────────────────────────────────
  const handleDoubleClick = useCallback(
    (e: React.MouseEvent) => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const current = targetTransformRef.current;
      const factor = 1.8;
      const newScale = clamp(current.scale * factor, MIN_ZOOM, MAX_ZOOM);
      const scaleRatio = newScale / current.scale;

      setTargetTransform({
        x: mouseX - (mouseX - current.x) * scaleRatio,
        y: mouseY - (mouseY - current.y) * scaleRatio,
        scale: newScale,
      });
    },
    [setTargetTransform]
  );

  // ── Cleanup ─────────────────────────────────────────────────
  useEffect(() => {
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  const transform = renderTransform;
  const svgTransform = `translate(${transform.x}, ${transform.y}) scale(${transform.scale})`;

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden"
      style={{ cursor: "grab", background: "transparent" }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onDoubleClick={handleDoubleClick}
      aria-label="Evolutionary tree canvas — drag to pan, scroll to zoom"
    >
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        style={{ display: "block", overflow: "visible" }}
        aria-hidden="true"
      >
        {/* Defs for filters */}
        <defs>
          <filter id="node-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <filter id="branch-glow" x="-20%" y="-50%" width="140%" height="200%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        <g transform={svgTransform}>
          {/* Pre-LUCA Conceptual Antecedent Connector (Non-Cladistic Historical Layer) */}
          {(() => {
            const lucaNode = layoutNodes.get("luca");
            if (!lucaNode || !onOpenPreLuca) return null;
            return (
              <g
                className="cursor-pointer group"
                onClick={onOpenPreLuca}
                role="button"
                tabIndex={0}
                aria-label="Explore Pre-LUCA History (Cosmic Origins, Prebiotic Chemistry, and FUCA)"
              >
                {/* Dashed upstream connector line */}
                <line
                  x1={lucaNode.x - 170}
                  y1={lucaNode.y}
                  x2={lucaNode.x - 22}
                  y2={lucaNode.y}
                  stroke="#a855f7"
                  strokeWidth={1.8}
                  strokeDasharray="4 4"
                  strokeOpacity={0.65}
                />

                {/* Conceptual non-cladistic label */}
                <text
                  x={lucaNode.x - 95}
                  y={lucaNode.y - 10}
                  textAnchor="middle"
                  fill="#c084fc"
                  fontSize={8.5}
                  fontFamily="system-ui, sans-serif"
                  fontWeight={700}
                  letterSpacing="0.08em"
                  opacity={0.85}
                >
                  NON-CLADISTIC ANTECEDENTS
                </text>

                {/* Interactive Beacon Pill */}
                <rect
                  x={lucaNode.x - 305}
                  y={lucaNode.y - 17}
                  width={135}
                  height={34}
                  rx={17}
                  fill="rgba(16, 12, 26, 0.92)"
                  stroke="#a855f7"
                  strokeWidth={1.4}
                  strokeDasharray="3 3"
                  className="transition-all duration-200"
                />
                <circle
                  cx={lucaNode.x - 288}
                  cy={lucaNode.y}
                  r={4}
                  fill="#a855f7"
                  opacity={0.9}
                />
                <text
                  x={lucaNode.x - 276}
                  y={lucaNode.y + 3.5}
                  fill="#f3e8ff"
                  fontSize={10.5}
                  fontWeight={600}
                  fontFamily="system-ui, sans-serif"
                  letterSpacing="0.03em"
                >
                  ✨ Pre-LUCA History
                </text>
              </g>
            );
          })()}

          {/* Branches (rendered first, below nodes) */}
          <g aria-hidden="true">
            {branches.map((branch) => {
              const isHighlighted =
                hasSelection &&
                highlightedChain.has(branch.parentId) &&
                highlightedChain.has(branch.childId);

              const isDimmed =
                hasSelection &&
                !isHighlighted &&
                !highlightedDescendants.has(branch.childId);

              return (
                <TreeBranch
                  key={branch.id}
                  path={branch.path}
                  isHighlighted={isHighlighted}
                  isDimmed={isDimmed}
                  accentColor={branch.childAccentColor}
                />
              );
            })}
          </g>

          {/* Nodes */}
          <g>
            {Array.from(layoutNodes.values()).map((node) => {
              const isSelected = node.id === selectedNodeId;
              const isHovered = node.id === hoveredNodeId;
              const isHighlighted =
                hasSelection && highlightedChain.has(node.id);
              const isDescendant =
                hasSelection && highlightedDescendants.has(node.id);
              const isDimmed =
                hasSelection && !isHighlighted && !isDescendant;

              return (
                <TreeNode
                  key={node.id}
                  node={node}
                  isSelected={isSelected}
                  isHovered={isHovered}
                  isHighlighted={isHighlighted && !isSelected}
                  isDimmed={isDimmed}
                  zoomScale={transform.scale}
                  onSelect={onNodeSelect}
                  onHover={onNodeHover}
                />
              );
            })}
          </g>
        </g>
      </svg>
    </div>
  );
}
