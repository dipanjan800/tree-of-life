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
  onNodePreview?: (id: string) => void;
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
  isRecentTouch: () => boolean;
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
  isRecentTouch,
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

  const handleSelect = (e: React.MouseEvent) => {
    e.stopPropagation();
    // On touch devices, taps are processed by the touch gesture state machine.
    // Suppress synthesized ghost clicks within 500ms of a touch interaction.
    const isTouch = (e.nativeEvent as PointerEvent)?.pointerType === "touch" || isRecentTouch();
    if (isTouch) {
      return;
    }
    onSelect(node.id);
  };

  const nameLen = node.name.length;
  const sciLen = showScientificName && node.scientificName ? node.scientificName.length : 0;
  const textCharCount = Math.max(nameLen, sciLen);
  const hitBoxWidth = Math.min(185, Math.max(60, textCharCount * 7.5 + 16));

  return (
    <g
      className={`tree-node ${isSelected ? "selected" : ""} ${isHovered ? "hovered" : ""}`}
      data-node-id={node.id}
      transform={`translate(${node.x}, ${node.y})`}
      onClick={handleSelect}
      onMouseEnter={() => onHover(node.id)}
      onMouseLeave={() => onHover(null)}
      onFocus={() => onHover(node.id)}
      onBlur={() => onHover(null)}
      opacity={opacity}
      role="button"
      aria-label={`${node.name}${node.scientificName ? `, ${node.scientificName}` : ""}`}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(node.id);
        }
      }}
    >
      {/* 1. Circular Node Point target */}
      <g
        className="node-point-target"
        onClick={handleSelect}
        style={{ cursor: "pointer" }}
        role="presentation"
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
          className="tree-node-circle"
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
      </g>

      {/* 2. Node Title Text target */}
      {showLabel && (
        <g
          className="node-title-target"
          onClick={handleSelect}
          style={{ cursor: "pointer" }}
          role="presentation"
        >
          {/* Expanded transparent hit target for comfortable text clicking */}
          <rect
            x={10}
            y={showScientificName ? -15 : -12}
            width={hitBoxWidth}
            height={showScientificName ? 30 : 24}
            fill="transparent"
            style={{ cursor: "pointer", pointerEvents: "all" }}
          />

          {/* Name label (conditioned on Progressive LOD) */}
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
              cursor: "pointer",
              pointerEvents: "auto",
              transition: "fill 200ms ease, font-size 200ms ease",
            }}
          >
            {node.name}
          </text>

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
                cursor: "pointer",
                pointerEvents: "auto",
              }}
            >
              {node.scientificName}
            </text>
          )}
        </g>
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
            pointerEvents: "none",
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
  onNodePreview,
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
  const onNodeHoverRef = useRef(onNodeHover);
  useEffect(() => {
    onNodeHoverRef.current = onNodeHover;
  });

  const onNodePreviewRef = useRef(onNodePreview ?? onNodeHover);
  useEffect(() => {
    onNodePreviewRef.current = onNodePreview ?? onNodeHover;
  });

  const onOpenPreLucaRef = useRef(onOpenPreLuca);
  useEffect(() => {
    onOpenPreLucaRef.current = onOpenPreLuca;
  });

  // Touch gesture state machine
  const gestureStateRef = useRef<"idle" | "possible_tap" | "pan" | "pinch">("idle");
  const touchStartPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const lastTouchPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const touchedNodeIdRef = useRef<string | null>(null);
  const touchedPreLucaRef = useRef<boolean>(false);
  const lastTouchEndTimeRef = useRef<number>(0);

  // Pinch zoom tracking
  const initialPinchDistRef = useRef<number>(0);
  const initialPinchMidpointRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const pinchStartScaleRef = useRef<number>(1);
  const pinchStartTransformRef = useRef<ViewportTransform>({ x: 0, y: 0, scale: 1 });

  const isRecentTouch = useCallback(() => {
    return Date.now() - lastTouchEndTimeRef.current < 500;
  }, []);

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
      onNodeHoverRef.current(null);
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
    onNodeHoverRef.current(null);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isPanningRef.current) return;
      onNodeHoverRef.current(null);
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

  // ── Mobile Touch Interactions (Pinch Zoom, Touch Pan & Two-Step Tap) ──
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const TAP_THRESHOLD = 8; // Movement threshold in px to cancel tap

    const handleTouchStart = (e: TouchEvent) => {
      // 1. Two-finger pinch takes immediate priority over tap & pan
      if (e.touches.length === 2) {
        e.preventDefault();
        gestureStateRef.current = "pinch";
        touchedNodeIdRef.current = null;
        touchedPreLucaRef.current = false;
        onNodeHoverRef.current(null);

        const t0 = e.touches[0];
        const t1 = e.touches[1];
        const dist = Math.hypot(t0.clientX - t1.clientX, t0.clientY - t1.clientY);
        initialPinchDistRef.current = Math.max(dist, 1);

        const midX = (t0.clientX + t1.clientX) / 2;
        const midY = (t0.clientY + t1.clientY) / 2;
        initialPinchMidpointRef.current = { x: midX, y: midY };

        pinchStartScaleRef.current = targetTransformRef.current.scale;
        pinchStartTransformRef.current = { ...targetTransformRef.current };
        return;
      }

      // 2. Single-finger touch start
      if (e.touches.length === 1) {
        const touch = e.touches[0];
        touchStartPosRef.current = { x: touch.clientX, y: touch.clientY };
        lastTouchPosRef.current = { x: touch.clientX, y: touch.clientY };

        const targetEl = document.elementFromPoint(touch.clientX, touch.clientY);
        const nodeEl = targetEl?.closest(".tree-node");
        const nodeId = nodeEl?.getAttribute("data-node-id");
        const isPreLuca = Boolean(targetEl?.closest("[data-preluca='true']"));

        if (nodeId) {
          gestureStateRef.current = "possible_tap";
          touchedNodeIdRef.current = nodeId;
          touchedPreLucaRef.current = false;
        } else if (isPreLuca) {
          gestureStateRef.current = "possible_tap";
          touchedNodeIdRef.current = null;
          touchedPreLucaRef.current = true;
        } else {
          gestureStateRef.current = "pan";
          touchedNodeIdRef.current = null;
          touchedPreLucaRef.current = false;
          // Tapping empty canvas dismisses active preview
          onNodeHoverRef.current(null);
        }
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (gestureStateRef.current === "idle") return;
      // Prevent browser default window scrolling while interacting with tree canvas
      e.preventDefault();

      // If a second finger touches during move, seamlessly transition to pinch zoom
      if (e.touches.length === 2) {
        if (gestureStateRef.current !== "pinch") {
          gestureStateRef.current = "pinch";
          touchedNodeIdRef.current = null;
          touchedPreLucaRef.current = false;
          onNodeHoverRef.current(null);

          const t0 = e.touches[0];
          const t1 = e.touches[1];
          initialPinchDistRef.current = Math.max(Math.hypot(t0.clientX - t1.clientX, t0.clientY - t1.clientY), 1);
          initialPinchMidpointRef.current = { x: (t0.clientX + t1.clientX) / 2, y: (t0.clientY + t1.clientY) / 2 };
          pinchStartScaleRef.current = targetTransformRef.current.scale;
          pinchStartTransformRef.current = { ...targetTransformRef.current };
        }

        const t0 = e.touches[0];
        const t1 = e.touches[1];
        const currentDist = Math.hypot(t0.clientX - t1.clientX, t0.clientY - t1.clientY);
        const currentMidX = (t0.clientX + t1.clientX) / 2;
        const currentMidY = (t0.clientY + t1.clientY) / 2;

        const rect = container.getBoundingClientRect();
        const startTransform = pinchStartTransformRef.current;
        const startScale = pinchStartScaleRef.current;

        const scaleRatio = currentDist / initialPinchDistRef.current;
        const newScale = clamp(startScale * scaleRatio, MIN_ZOOM, MAX_ZOOM);

        // Center zoom anchored around the pinch midpoint
        const initialMidX = initialPinchMidpointRef.current.x - rect.left;
        const initialMidY = initialPinchMidpointRef.current.y - rect.top;

        const worldX = (initialMidX - startTransform.x) / startScale;
        const worldY = (initialMidY - startTransform.y) / startScale;

        const currentMidOffsetX = currentMidX - initialPinchMidpointRef.current.x;
        const currentMidOffsetY = currentMidY - initialPinchMidpointRef.current.y;

        const newX = initialMidX + currentMidOffsetX - worldX * newScale;
        const newY = initialMidY + currentMidOffsetY - worldY * newScale;

        const newTransform = { x: newX, y: newY, scale: newScale };
        targetTransformRef.current = newTransform;
        transformRef.current = newTransform;
        setRenderTransform(newTransform);
        onTransformChange?.(newTransform);
        return;
      }

      if (e.touches.length === 1) {
        const touch = e.touches[0];

        if (gestureStateRef.current === "possible_tap") {
          const moveDist = Math.hypot(
            touch.clientX - touchStartPosRef.current.x,
            touch.clientY - touchStartPosRef.current.y
          );

          if (moveDist > TAP_THRESHOLD) {
            // Cancel tap and transition to pan!
            gestureStateRef.current = "pan";
            touchedNodeIdRef.current = null;
            touchedPreLucaRef.current = false;
            onNodeHoverRef.current(null);
            lastTouchPosRef.current = { x: touch.clientX, y: touch.clientY };
          } else {
            // Under movement threshold: do not move viewport during tap attempt
            return;
          }
        }

        if (gestureStateRef.current === "pan") {
          const dx = touch.clientX - lastTouchPosRef.current.x;
          const dy = touch.clientY - lastTouchPosRef.current.y;
          lastTouchPosRef.current = { x: touch.clientX, y: touch.clientY };

          const current = targetTransformRef.current;
          const newTransform = {
            x: current.x + dx,
            y: current.y + dy,
            scale: current.scale,
          };
          targetTransformRef.current = newTransform;
          transformRef.current = newTransform;
          setRenderTransform(newTransform);
          onTransformChange?.(newTransform);
        }
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      lastTouchEndTimeRef.current = Date.now();

      // Check if tap completed
      if (gestureStateRef.current === "possible_tap") {
        e.preventDefault(); // Stop synthesized ghost clicks
        const tappedId = touchedNodeIdRef.current;
        const isPreLuca = touchedPreLucaRef.current;
        touchedNodeIdRef.current = null;
        touchedPreLucaRef.current = false;
        gestureStateRef.current = "idle";

        if (tappedId) {
          // On mobile: show preview popup first!
          onNodePreviewRef.current(tappedId);
        } else if (isPreLuca) {
          onOpenPreLucaRef.current?.();
        }
        return;
      }

      // If one finger remains after pinch, smoothly continue panning
      if (e.touches.length === 1 && gestureStateRef.current === "pinch") {
        gestureStateRef.current = "pan";
        lastTouchPosRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        return;
      }

      if (e.touches.length === 0) {
        gestureStateRef.current = "idle";
        touchedNodeIdRef.current = null;
        touchedPreLucaRef.current = false;
      }
    };

    const handleTouchCancel = () => {
      gestureStateRef.current = "idle";
      touchedNodeIdRef.current = null;
      touchedPreLucaRef.current = false;
    };

    container.addEventListener("touchstart", handleTouchStart, { passive: false });
    container.addEventListener("touchmove", handleTouchMove, { passive: false });
    container.addEventListener("touchend", handleTouchEnd, { passive: false });
    container.addEventListener("touchcancel", handleTouchCancel, { passive: false });

    return () => {
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("touchend", handleTouchEnd);
      container.removeEventListener("touchcancel", handleTouchCancel);
    };
  }, [onTransformChange]);

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
      style={{ cursor: "grab", background: "transparent", touchAction: "none" }}
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
                data-preluca="true"
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
                  isRecentTouch={isRecentTouch}
                />
              );
            })}
          </g>
        </g>
      </svg>
    </div>
  );
}
