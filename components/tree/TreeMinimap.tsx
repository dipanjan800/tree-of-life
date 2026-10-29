"use client";

import React, { useRef, useCallback } from "react";
import type { ViewportTransform, TreeData } from "@/types/taxonomy";
import { computeTreeLayout, getTreeBounds } from "@/lib/tree-layout";
import { getNodeAccentColor } from "@/lib/tree-utils";
import { useLanguage } from "@/lib/i18n";

interface TreeMinimapProps {
  treeData: TreeData;
  currentTransform: ViewportTransform;
  viewportWidth: number;
  viewportHeight: number;
  onViewportChange: (transform: ViewportTransform) => void;
  visible: boolean;
  isPanelOpen?: boolean;
  isMobileVisible?: boolean;
}

export default function TreeMinimap({
  treeData,
  currentTransform,
  viewportWidth,
  viewportHeight,
  onViewportChange,
  visible,
  isPanelOpen = false,
  isMobileVisible = false,
}: TreeMinimapProps) {
  const { t } = useLanguage();
  const svgRef = useRef<SVGSVGElement>(null);
  const isDragging = useRef(false);
  const lastDragPos = useRef({ x: 0, y: 0 });

  const isMobile = viewportWidth < 640;
  const isVisible = visible && (!isMobile || isMobileVisible) && (!isPanelOpen || !isMobile);

  const isCompact = viewportWidth < 768 || viewportHeight < 650;
  const mmWidth = isCompact ? 140 : 190;
  const mmHeight = isCompact ? 90 : 120;
  const mmPadding = isCompact ? 6 : 8;

  const layoutNodes = React.useMemo(
    () => computeTreeLayout(treeData),
    [treeData]
  );

  const bounds = React.useMemo(
    () => getTreeBounds(layoutNodes),
    [layoutNodes]
  );

  // Scale to fit in minimap
  const scaleX = (mmWidth - mmPadding * 2) / bounds.width;
  const scaleY = (mmHeight - mmPadding * 2) / bounds.height;
  const mmScale = Math.min(scaleX, scaleY);

  const offsetX = mmPadding + (mmWidth - mmPadding * 2 - bounds.width * mmScale) / 2;
  const offsetY = mmPadding + (mmHeight - mmPadding * 2 - bounds.height * mmScale) / 2;

  // Minimap to world space transform
  const mmToWorld = useCallback(
    (mmX: number, mmY: number) => ({
      x: (mmX - offsetX) / mmScale + bounds.minX,
      y: (mmY - offsetY) / mmScale + bounds.minY,
    }),
    [offsetX, offsetY, mmScale, bounds.minX, bounds.minY]
  );

  // Compute viewport rectangle in minimap space
  const vpRect = {
    x: offsetX + (-currentTransform.x / currentTransform.scale - bounds.minX) * mmScale,
    y: offsetY + (-currentTransform.y / currentTransform.scale - bounds.minY) * mmScale,
    w: (viewportWidth / currentTransform.scale) * mmScale,
    h: (viewportHeight / currentTransform.scale) * mmScale,
  };

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<SVGElement>) => {
      e.preventDefault();
      isDragging.current = true;
      lastDragPos.current = { x: e.clientX, y: e.clientY };
    },
    []
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<SVGSVGElement>) => {
      if (!isDragging.current) return;
      const dx = e.clientX - lastDragPos.current.x;
      const dy = e.clientY - lastDragPos.current.y;
      lastDragPos.current = { x: e.clientX, y: e.clientY };

      // Move viewport by delta
      const worldDx = dx / mmScale;
      const worldDy = dy / mmScale;

      onViewportChange({
        x: currentTransform.x - worldDx * currentTransform.scale,
        y: currentTransform.y - worldDy * currentTransform.scale,
        scale: currentTransform.scale,
      });
    },
    [currentTransform, mmScale, onViewportChange]
  );

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  const handleSvgClick = useCallback(
    (e: React.MouseEvent<SVGSVGElement>) => {
      if (isDragging.current) return;
      const rect = svgRef.current?.getBoundingClientRect();
      if (!rect) return;
      const mmX = e.clientX - rect.left;
      const mmY = e.clientY - rect.top;
      const world = mmToWorld(mmX, mmY);

      // Center viewport on click
      onViewportChange({
        x: viewportWidth / 2 - world.x * currentTransform.scale,
        y: viewportHeight / 2 - world.y * currentTransform.scale,
        scale: currentTransform.scale,
      });
    },
    [currentTransform, viewportWidth, viewportHeight, onViewportChange, mmToWorld]
  );

  if (!visible) return null;

  return (
    <div
      className="absolute glass-panel rounded-lg overflow-hidden"
      style={{
        bottom: isCompact ? "12px" : "16px",
        right: isPanelOpen
          ? "calc(min(100%, 360px) + 16px)"
          : isCompact
          ? "12px"
          : "16px",
        zIndex: 35,
        width: mmWidth,
        height: mmHeight,
        background: "rgba(10, 15, 24, 0.88)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        border: "1px solid var(--surface-border)",
        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.45), 0 2px 6px rgba(0, 0, 0, 0.3)",
        opacity: isVisible ? 1 : 0,
        pointerEvents: isVisible ? "auto" : "none",
        visibility: isVisible ? "visible" : "hidden",
        transition:
          "right 320ms cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94), visibility 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94), width 200ms ease, height 200ms ease",
      }}
      aria-label={t("minimap.ariaLabel", "Minimap — click to navigate")}
      aria-hidden={!isVisible}
    >
      {/* Label */}
      <div
        className="absolute top-1.5 left-2.5 z-10"
        style={{
          fontSize: "8px",
          fontWeight: 600,
          letterSpacing: "0.1em",
          color: "var(--text-tertiary)",
          textTransform: "uppercase",
          pointerEvents: "none",
        }}
      >
        {t("minimap.label", "Minimap")}
      </div>

      <svg
        ref={svgRef}
        width={mmWidth}
        height={mmHeight}
        onClick={handleSvgClick}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ display: "block", cursor: "crosshair" }}
      >
        {/* Node dots */}
        {Array.from(layoutNodes.values()).map((node) => {
          const mmX = offsetX + (node.x - bounds.minX) * mmScale;
          const mmY = offsetY + (node.y - bounds.minY) * mmScale;
          const accentColor = getNodeAccentColor(node, 0.6);
          return (
            <circle
              key={node.id}
              cx={mmX}
              cy={mmY}
              r={1.5}
              fill={accentColor}
            />
          );
        })}

        {/* Branch lines (simplified) */}
        {Array.from(layoutNodes.values()).map((node) => {
          if (!node.parentId) return null;
          const parent = layoutNodes.get(node.parentId);
          if (!parent) return null;
          const px = offsetX + (parent.x - bounds.minX) * mmScale;
          const py = offsetY + (parent.y - bounds.minY) * mmScale;
          const cx2 = offsetX + (node.x - bounds.minX) * mmScale;
          const cy2 = offsetY + (node.y - bounds.minY) * mmScale;
          const midX = (px + cx2) / 2;
          return (
            <path
              key={`mm-${node.id}`}
              d={`M ${px} ${py} C ${midX} ${py}, ${midX} ${cy2}, ${cx2} ${cy2}`}
              fill="none"
              stroke="rgba(255,255,255,0.12)"
              strokeWidth={0.6}
            />
          );
        })}

        {/* Viewport rectangle */}
        <rect
          x={vpRect.x}
          y={vpRect.y}
          width={Math.max(vpRect.w, 4)}
          height={Math.max(vpRect.h, 4)}
          className="minimap-viewport-rect"
          rx={2}
          onMouseDown={handleMouseDown}
        />
      </svg>
    </div>
  );
}
