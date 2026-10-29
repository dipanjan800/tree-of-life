"use client";

import React, { useCallback } from "react";
import type { TreeCanvasControls } from "./TreeCanvas";

interface TreeControlsProps {
  controls: TreeCanvasControls | null;
  showMinimap: boolean;
  onToggleMinimap: () => void;
  isPanelOpen?: boolean;
  viewportWidth?: number;
}

import { useLanguage } from "@/lib/i18n";

export default function TreeControls({
  controls,
  showMinimap,
  onToggleMinimap,
  isPanelOpen = false,
  viewportWidth = 1024,
}: TreeControlsProps) {
  const { t } = useLanguage();
  const handleZoomIn = useCallback(() => controls?.zoomIn(), [controls]);
  const handleZoomOut = useCallback(() => controls?.zoomOut(), [controls]);
  const handleReset = useCallback(() => controls?.resetView(), [controls]);
  const handleFit = useCallback(() => controls?.fitTree(), [controls]);

  const isMobile = viewportWidth < 640;

  return (
    <div
      className="absolute top-[calc(50%-70px)] -translate-y-1/2 flex flex-col items-center"
      style={{
        right: isPanelOpen ? "calc(min(100%, 360px) + 16px)" : "16px",
        zIndex: 35,
        background: "rgba(10, 15, 24, 0.88)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        border: "1px solid var(--surface-border)",
        borderRadius: "10px",
        padding: "4px",
        gap: "2px",
        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.45), 0 2px 6px rgba(0, 0, 0, 0.3)",
        opacity: isPanelOpen && isMobile ? 0 : 1,
        pointerEvents: isPanelOpen && isMobile ? "none" : "auto",
        transition:
          "right 320ms cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 250ms ease",
      }}
      role="toolbar"
      aria-label={t("controls.toolbarAria", "Tree navigation controls")}
    >
      {/* Zoom In */}
      <button
        className="ctrl-btn"
        onClick={handleZoomIn}
        aria-label={t("controls.zoomIn", "Zoom in")}
        title={t("controls.zoomIn", "Zoom in")}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path
            d="M7 2v10M2 7h10"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {/* Zoom Out */}
      <button
        className="ctrl-btn"
        onClick={handleZoomOut}
        aria-label={t("controls.zoomOut", "Zoom out")}
        title={t("controls.zoomOut", "Zoom out")}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path
            d="M2 7h10"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {/* Divider */}
      <div
        style={{
          height: 1,
          width: "20px",
          background: "var(--surface-border)",
          margin: "3px 0",
          opacity: 0.7,
        }}
      />

      {/* Fit */}
      <button
        className="ctrl-btn"
        onClick={handleFit}
        aria-label={t("controls.fitTree", "Fit entire tree to screen")}
        title={t("controls.fitTreeTitle", "Fit entire tree (all 92 nodes)")}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <rect
            x="2"
            y="2"
            width="4"
            height="4"
            rx="0.5"
            stroke="currentColor"
            strokeWidth="1.3"
          />
          <rect
            x="8"
            y="8"
            width="4"
            height="4"
            rx="0.5"
            stroke="currentColor"
            strokeWidth="1.3"
          />
          <path
            d="M6 3h3M3 6v3M8 11h3M11 8"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeOpacity="0.5"
          />
        </svg>
      </button>

      {/* Reset */}
      <button
        className="ctrl-btn"
        onClick={handleReset}
        aria-label={t("controls.resetView", "Reset view to Human focus")}
        title={t("controls.resetViewTitle", "Reset view (Human focus)")}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path
            d="M2.5 7A4.5 4.5 0 1 0 7 2.5"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <path
            d="M2.5 4.5V7H5"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Divider */}
      <div
        style={{
          height: 1,
          width: "20px",
          background: "var(--surface-border)",
          margin: "3px 0",
          opacity: 0.7,
        }}
      />

      {/* Minimap Toggle */}
      <button
        className={`ctrl-btn ${showMinimap ? "active" : ""}`}
        onClick={onToggleMinimap}
        aria-label={showMinimap ? t("controls.hideMinimap", "Hide minimap") : t("controls.showMinimap", "Show minimap")}
        aria-pressed={showMinimap}
        title={t("controls.toggleMinimapTitle", "Toggle minimap")}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <rect
            x="1.5"
            y="1.5"
            width="11"
            height="11"
            rx="1.5"
            stroke="currentColor"
            strokeWidth="1.3"
          />
          <rect
            x="4"
            y="4"
            width="4"
            height="3"
            rx="0.5"
            fill="currentColor"
            opacity="0.5"
          />
        </svg>
      </button>
    </div>
  );
}
