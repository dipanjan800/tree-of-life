"use client";

import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  useMemo,
} from "react";
import type { TaxonNode, ViewportTransform } from "@/types/taxonomy";
import { TREE_DATA } from "@/data/tree";
import { computeTreeLayout } from "@/lib/tree-layout";
import TreeCanvas, { type TreeCanvasControls } from "@/components/tree/TreeCanvas";
import TreeControls from "@/components/tree/TreeControls";
import TreeMinimap from "@/components/tree/TreeMinimap";
import TreeSearch from "@/components/search/TreeSearch";
import TaxonPanel from "@/components/panel/TaxonPanel";
import PreLucaPanel from "@/components/panel/PreLucaPanel";
import EvolutionTimeline from "@/components/timeline/EvolutionTimeline";
import LanguageSelector from "@/components/ui/LanguageSelector";
import NodeHoverPreview from "@/components/preview/NodeHoverPreview";
import { useLanguage } from "@/lib/i18n";

const TIMELINE_HEIGHT = 52;

interface ExplorerViewProps {
  onBack?: () => void;
  onOpenStory?: () => void;
}

export default function ExplorerView({ onBack, onOpenStory }: ExplorerViewProps) {
  const { t, localizeTaxon } = useLanguage();
  // Initialize selected node from deep-link query parameter or default to "homo-sapiens"
  const [selectedNode, setSelectedNode] = useState<TaxonNode | null>(() => {
    if (typeof window === "undefined") return TREE_DATA.nodes["homo-sapiens"] ?? null;
    const params = new URLSearchParams(window.location.search);
    const paramNodeId = params.get("node") || params.get("selected");
    if (paramNodeId && TREE_DATA.nodes[paramNodeId]) {
      return TREE_DATA.nodes[paramNodeId];
    }
    return TREE_DATA.nodes["homo-sapiens"] ?? null;
  });
  const [showPreLuca, setShowPreLuca] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    const params = new URLSearchParams(window.location.search);
    return params.get("layer") === "pre-luca" || params.get("preluca") === "true";
  });
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [showMinimap, setShowMinimap] = useState(true);
  const [transform, setTransform] = useState<ViewportTransform>({
    x: 0,
    y: 0,
    scale: 0.7,
  });
  const [externalTransform, setExternalTransform] =
    useState<ViewportTransform | null>(null);
  const [viewportDimensions, setViewportDimensions] = useState(() => ({
    width: typeof window !== "undefined" ? window.innerWidth : 1200,
    height: typeof window !== "undefined" ? window.innerHeight : 800,
  }));

  const [canvasControls, setCanvasControls] = useState<TreeCanvasControls | null>(null);
  const controlsRef = useRef<TreeCanvasControls | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Measure viewport
  useEffect(() => {
    const measure = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setViewportDimensions({ width: rect.width, height: rect.height });
      }
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // ── Mobile 2.5-Second Inactivity Auto-Hide for Controls ─────
  const MOBILE_CONTROLS_AUTOHIDE_MS = 2500;
  const [isControlsVisibleMobile, setIsControlsVisibleMobile] = useState(false);
  const autoHideTimerRef = useRef<NodeJS.Timeout | null>(null);

  const clearAutoHideTimer = useCallback(() => {
    if (autoHideTimerRef.current) {
      clearTimeout(autoHideTimerRef.current);
      autoHideTimerRef.current = null;
    }
  }, []);

  const triggerControlsActivity = useCallback(() => {
    if (viewportDimensions.width >= 640) return;

    setIsControlsVisibleMobile((prev) => (!prev ? true : prev));
    clearAutoHideTimer();

    autoHideTimerRef.current = setTimeout(() => {
      setIsControlsVisibleMobile(false);
      autoHideTimerRef.current = null;
    }, MOBILE_CONTROLS_AUTOHIDE_MS);
  }, [viewportDimensions.width, clearAutoHideTimer]);

  // Clean up auto-hide timer on unmount
  useEffect(() => {
    return () => {
      clearAutoHideTimer();
    };
  }, [clearAutoHideTimer]);

  // Capture touch and pointer activity on canvas area to reveal controls on mobile
  useEffect(() => {
    const container = containerRef.current;
    if (!container || viewportDimensions.width >= 640) return;

    const handleTouchOrPointer = () => {
      triggerControlsActivity();
    };

    container.addEventListener("touchstart", handleTouchOrPointer, { capture: true, passive: true });
    container.addEventListener("touchmove", handleTouchOrPointer, { capture: true, passive: true });
    container.addEventListener("touchend", handleTouchOrPointer, { capture: true, passive: true });
    container.addEventListener("pointerdown", handleTouchOrPointer, { capture: true, passive: true });

    return () => {
      container.removeEventListener("touchstart", handleTouchOrPointer, { capture: true });
      container.removeEventListener("touchmove", handleTouchOrPointer, { capture: true });
      container.removeEventListener("touchend", handleTouchOrPointer, { capture: true });
      container.removeEventListener("pointerdown", handleTouchOrPointer, { capture: true });
    };
  }, [viewportDimensions.width, triggerControlsActivity]);

  // Pre-compute layout coordinates for reactive hover preview positioning
  const layoutNodes = useMemo(() => computeTreeLayout(TREE_DATA), []);
  const hoveredLayoutNode = hoveredNodeId ? layoutNodes.get(hoveredNodeId) ?? null : null;
  const hoveredTaxonNode = hoveredNodeId ? TREE_DATA.nodes[hoveredNodeId] ?? null : null;

  const hoveredNodePosition = useMemo(() => {
    if (!hoveredLayoutNode) return null;
    return {
      x: transform.x + hoveredLayoutNode.x * transform.scale,
      y: transform.y + hoveredLayoutNode.y * transform.scale,
      scale: transform.scale,
    };
  }, [hoveredLayoutNode, transform]);

  // Clean up hover timer on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    };
  }, []);

  // Escape key closes preview
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setHoveredNodeId(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleNodeSelect = useCallback(
    (nodeId: string) => {
      const node = TREE_DATA.nodes[nodeId];
      if (!node) return;
      setSelectedNode(node);
      // Auto-centering on node selection is disabled in Desktop View (width >= 640px).
      // The current zoom level, pan position, and viewport transform are preserved.
      // Auto-centering is preserved for mobile viewports (< 640px).
      const isMobileViewport =
        viewportDimensions.width < 640 ||
        (typeof window !== "undefined" && window.innerWidth < 640);
      if (isMobileViewport) {
        controlsRef.current?.focusNode(nodeId);
      }
    },
    [viewportDimensions.width]
  );

  const handleNodeHover = useCallback((nodeId: string | null) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }

    if (nodeId) {
      setHoveredNodeId(nodeId);
    } else {
      // 200ms grace period to allow moving pointer from node to preview card without flicker
      hoverTimeoutRef.current = setTimeout(() => {
        setHoveredNodeId(null);
        hoverTimeoutRef.current = null;
      }, 200);
    }
  }, []);

  const handleNodePreview = useCallback((nodeId: string) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setHoveredNodeId(nodeId);
  }, []);

  const handlePreviewMouseEnter = useCallback(() => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
  }, []);

  const handlePreviewMouseLeave = useCallback(() => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredNodeId(null);
      hoverTimeoutRef.current = null;
    }, 200);
  }, []);

  const handleSearchResult = useCallback(
    (node: TaxonNode) => {
      setSelectedNode(node);
      // Focus after a micro-delay to let React process state
      setTimeout(() => controlsRef.current?.focusNode(node.id), 50);
    },
    []
  );

  const handlePanelClose = useCallback(() => {
    setSelectedNode(null);
  }, []);

  const handleNavigate = useCallback(
    (nodeId: string) => {
      const node = TREE_DATA.nodes[nodeId];
      if (!node) return;
      setSelectedNode(node);
      setTimeout(() => controlsRef.current?.focusNode(nodeId), 50);
    },
    []
  );

  const handleFocusLuca = useCallback(() => {
    setShowPreLuca(false);
    const luca = TREE_DATA.nodes["luca"];
    if (luca) {
      setSelectedNode(luca);
      setTimeout(() => controlsRef.current?.focusNode("luca"), 50);
    }
  }, []);

  const handleTransformChange = useCallback((t: ViewportTransform) => {
    setTransform(t);
    if (viewportDimensions.width < 640) {
      triggerControlsActivity();
    }
  }, [viewportDimensions.width, triggerControlsActivity]);

  const handleMinimapNavigate = useCallback((t: ViewportTransform) => {
    setExternalTransform({ ...t });
  }, []);

  const registerControls = useCallback((controls: TreeCanvasControls) => {
    controlsRef.current = controls;
    setCanvasControls(controls);
  }, []);

  const isMobile = viewportDimensions.width < 640;
  // Narrow desktop: 640–899px – show icon-only / short labels to prevent overflow
  const isNarrowDesktop = !isMobile && viewportDimensions.width < 900;
  const TOPBAR_HEIGHT = 58;
  const canvasHeight = viewportDimensions.height - (isMobile ? 88 : TOPBAR_HEIGHT) - TIMELINE_HEIGHT;

  return (
    <div
      className="flex flex-col"
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        overflow: "hidden",
        background: "var(--bg-primary)",
      }}
    >
      {/* ── Top Bar ─────────────────────────────────────────── */}
      <header
        className="glass-panel shrink-0"
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: isMobile ? "stretch" : "center",
          justifyContent: isMobile ? "center" : "flex-start",
          padding: isMobile ? "8px 14px" : "0 20px",
          gap: isMobile ? "8px" : "16px",
          height: isMobile ? "auto" : `${TOPBAR_HEIGHT}px`,
          minHeight: isMobile ? "86px" : `${TOPBAR_HEIGHT}px`,
          maxHeight: isMobile ? undefined : `${TOPBAR_HEIGHT}px`,
          borderBottom: "1px solid var(--surface-border)",
          borderRadius: 0,
          zIndex: 40,
          position: "relative",
        }}
      >
        {/* Mobile Top Row: Branding (left) + Actions (right) */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: isMobile ? "space-between" : "flex-start",
            width: isMobile ? "100%" : "auto",
            flexShrink: 0,
          }}
        >
          {/* Logo / Title */}
          <div
            className={`flex items-center gap-2.5 sm:gap-3 shrink-0 ${onBack ? "cursor-pointer hover:opacity-85 transition-opacity" : ""}`}
            onClick={onBack}
            role={onBack ? "button" : undefined}
            tabIndex={onBack ? 0 : undefined}
          >
            {/* Tree icon */}
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true" className="shrink-0">
              <circle cx="4" cy="11" r="2.5" fill="var(--accent-primary)" opacity="0.9" />
              <circle cx="11" cy="5" r="2" fill="var(--accent-living)" opacity="0.8" />
              <circle cx="11" cy="17" r="2" fill="#f59e0b" opacity="0.7" />
              <circle cx="18" cy="2" r="1.5" fill="var(--accent-living)" opacity="0.6" />
              <circle cx="18" cy="8" r="1.5" fill="#60a5fa" opacity="0.6" />
              <circle cx="18" cy="14" r="1.5" fill="#f59e0b" opacity="0.6" />
              <circle cx="18" cy="20" r="1.5" fill="#a78bfa" opacity="0.6" />
              <line x1="6.5" y1="11" x2="9" y2="5" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
              <line x1="6.5" y1="11" x2="9" y2="5" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
              <line x1="13" y1="5" x2="16.5" y2="2" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
              <line x1="13" y1="5" x2="16.5" y2="8" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
              <line x1="13" y1="17" x2="16.5" y2="14" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
              <line x1="13" y1="17" x2="16.5" y2="20" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
            </svg>

            <div className="min-w-0">
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  color: "var(--text-primary)",
                  lineHeight: 1.2,
                }}
              >
                {t("common.treeOfLife", "Tree of Life")}
              </div>
              {!isMobile && (
                <div
                  style={{
                    fontSize: "10px",
                    color: "var(--text-tertiary)",
                    letterSpacing: "0.04em",
                    lineHeight: 1.2,
                  }}
                >
                  {t("common.tagline", "Evolutionary History of Life")}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Right Actions: Pre-LUCA launcher + LanguageSelector */}
          {isMobile && (
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setShowPreLuca(true)}
                aria-label={t("topbar.preLucaBtnAria", "Explore Pre-LUCA History (Cosmic Origins, Prebiotic Chemistry, and FUCA)")}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                  padding: "4px 8px",
                  borderRadius: "100px",
                  background: "rgba(168,85,247,0.1)",
                  border: "1px solid rgba(168,85,247,0.25)",
                  fontSize: "11px",
                  fontWeight: 600,
                  color: "#c084fc",
                  cursor: "pointer",
                }}
              >
                <span>{t("topbar.preLucaShort", "Pre-LUCA")}</span>
                <span style={{ fontSize: "10px" }}>✨</span>
              </button>
              <LanguageSelector compact align="right" />
            </div>
          )}
        </div>

        {/* Divider (Desktop only) */}
        {!isMobile && (
          <div
            style={{
              width: 1,
              height: 30,
              background: "var(--surface-border)",
              flexShrink: 0,
            }}
          />
        )}

        {/* Search */}
        <div
          style={{
            width: isMobile ? "100%" : undefined,
            flex: isMobile ? undefined : "1 1 160px",
            maxWidth: isMobile ? "100%" : "340px",
            minWidth: isMobile ? undefined : "120px",
          }}
        >
          <TreeSearch
            onSelectResult={handleSearchResult}
          />
        </div>

        {/* Right controls (Desktop only) */}
        {!isMobile && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginLeft: "auto",
              flexShrink: 1,
              minWidth: 0,
            }}
          >
            {/* Selected node indicator */}
            {selectedNode && (
              <div
                className="hidden lg:flex items-center gap-2"
                style={{
                  padding: "5px 12px",
                  background: "rgba(61,142,248,0.08)",
                  border: "1px solid rgba(61,142,248,0.2)",
                  borderRadius: "8px",
                  fontSize: "12.5px",
                  color: "var(--text-secondary)",
                  maxWidth: "180px",
                }}
              >
                <div
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "var(--accent-primary)",
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {localizeTaxon(selectedNode)?.name || selectedNode.name}
                </span>
              </div>
            )}

            {/* Pre-LUCA History launcher */}
            <button
              onClick={() => setShowPreLuca(true)}
              aria-label={t("topbar.preLucaBtnAria", "Explore Pre-LUCA History (Cosmic Origins, Prebiotic Chemistry, and FUCA)")}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "5px 12px",
                borderRadius: "100px",
                background: "rgba(168,85,247,0.1)",
                border: "1px solid rgba(168,85,247,0.25)",
                fontSize: "11px",
                fontWeight: 600,
                color: "#c084fc",
                cursor: "pointer",
                transition: "all 150ms ease",
                flexShrink: 0,
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(168,85,247,0.2)";
                (e.currentTarget as HTMLElement).style.borderColor = "#c084fc";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(168,85,247,0.1)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(168,85,247,0.25)";
              }}
            >
              <span>{isNarrowDesktop ? t("topbar.preLucaShort", "Pre-LUCA") : t("topbar.preLucaBtn", "Pre-LUCA History")}</span>
              <span style={{ fontSize: "10px" }}>✨</span>
            </button>

            {/* Story of Life launcher */}
            {onOpenStory && (
              <button
                onClick={onOpenStory}
                aria-label={t("topbar.storyBtnAria", "Launch The Story of Life cinematic narrative")}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "5px 12px",
                  borderRadius: "100px",
                  background: "rgba(61,142,248,0.1)",
                  border: "1px solid rgba(61,142,248,0.25)",
                  fontSize: "11px",
                  fontWeight: 600,
                  color: "var(--accent-primary)",
                  cursor: "pointer",
                  transition: "all 150ms ease",
                  flexShrink: 0,
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(61,142,248,0.2)";
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--accent-primary)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(61,142,248,0.1)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(61,142,248,0.25)";
                }}
              >
                <span>{isNarrowDesktop ? t("topbar.storyShort", "Story") : t("topbar.storyBtn", "The Story of Life")}</span>
                {!isNarrowDesktop && (
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5h6M5 2l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
            )}

            {/* Phase indicator */}
            <div
              className="hidden xl:block"
              style={{
                padding: "4px 10px",
                borderRadius: "6px",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid var(--surface-border)",
                fontSize: "10px",
                fontWeight: 600,
                color: "var(--text-tertiary)",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              {t("topbar.explorerPhase", "Evolutionary Explorer")}
            </div>
            <LanguageSelector compact align="right" />
          </div>
        )}
      </header>

      {/* ── Canvas Area ──────────────────────────────────────── */}
      <div
        ref={containerRef}
        className="relative flex-1 overflow-hidden"
        style={{
          position: "relative",
          flex: 1,
          overflow: "hidden",
          background: "var(--bg-primary)",
        }}
      >
        {/* Radial background glow */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background:
              "radial-gradient(ellipse 60% 50% at 30% 50%, rgba(61,142,248,0.03) 0%, transparent 70%)",
          }}
        />

        {/* Tree Canvas */}
        <TreeCanvas
          treeData={TREE_DATA}
          selectedNodeId={selectedNode?.id ?? null}
          hoveredNodeId={hoveredNodeId}
          onNodeSelect={handleNodeSelect}
          onNodeHover={handleNodeHover}
          onNodePreview={handleNodePreview}
          externalTransform={externalTransform}
          onTransformChange={handleTransformChange}
          registerControls={registerControls}
          initialFocusNodeId={selectedNode?.id ?? "homo-sapiens"}
          onOpenPreLuca={() => setShowPreLuca(true)}
          onInteraction={triggerControlsActivity}
        />

        {/* Smart Hover / Tap Preview Card */}
        <NodeHoverPreview
          node={hoveredTaxonNode}
          nodePosition={hoveredNodePosition}
          viewportDimensions={{
            width: viewportDimensions.width,
            height: canvasHeight,
          }}
          isPanelOpen={Boolean(selectedNode)}
          onOpenDetails={handleNodeSelect}
          onClose={() => setHoveredNodeId(null)}
          onMouseEnter={handlePreviewMouseEnter}
          onMouseLeave={handlePreviewMouseLeave}
        />

        {/* Right controls */}
        <TreeControls
          controls={canvasControls}
          showMinimap={showMinimap}
          onToggleMinimap={() => setShowMinimap((v) => !v)}
          isPanelOpen={Boolean(selectedNode)}
          viewportWidth={viewportDimensions.width}
          isMobileVisible={isControlsVisibleMobile}
          onInteraction={triggerControlsActivity}
        />

        {/* Minimap */}
        <TreeMinimap
          treeData={TREE_DATA}
          currentTransform={transform}
          viewportWidth={viewportDimensions.width}
          viewportHeight={canvasHeight}
          onViewportChange={handleMinimapNavigate}
          visible={showMinimap}
          isPanelOpen={Boolean(selectedNode)}
          isMobileVisible={isControlsVisibleMobile}
        />

        {/* Right panel */}
        <TaxonPanel
          node={selectedNode}
          onClose={handlePanelClose}
          onNavigate={handleNavigate}
          onOpenPreLuca={() => setShowPreLuca(true)}
        />

        {/* Pre-LUCA History Drawer */}
        <PreLucaPanel
          isOpen={showPreLuca}
          onClose={() => setShowPreLuca(false)}
          onFocusLuca={handleFocusLuca}
          onOpenStory={onOpenStory}
        />


      </div>

      {/* ── Timeline ────────────────────────────────────────── */}
      <div style={{ position: "relative", flexShrink: 0, height: `${TIMELINE_HEIGHT}px` }}>
        <EvolutionTimeline
          treeData={TREE_DATA}
          transform={transform}
          viewportWidth={viewportDimensions.width}
        />
      </div>
    </div>
  );
}
