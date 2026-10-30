"use client";

import React, { useMemo, useState, useEffect } from "react";
import type { TaxonNode } from "@/types/taxonomy";
import {
  getNodeAccentColor,
  getRankDisplay,
  getStatusLabel,
  getStatusColor,
  formatMya,
} from "@/lib/tree-utils";
import { useLanguage } from "@/lib/i18n";
import TaxonIcon from "@/components/ui/TaxonIcon";

interface NodeHoverPreviewProps {
  node: TaxonNode | null;
  nodePosition: { x: number; y: number; scale: number } | null;
  viewportDimensions: { width: number; height: number };
  isPanelOpen: boolean;
  onOpenDetails: (nodeId: string) => void;
  onClose?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export default function NodeHoverPreview({
  node,
  nodePosition,
  viewportDimensions,
  isPanelOpen,
  onOpenDetails,
  onClose,
  onMouseEnter,
  onMouseLeave,
}: NodeHoverPreviewProps) {
  const { t, localizeTaxon, ui, locale } = useLanguage();

  const [displayNode, setDisplayNode] = useState<TaxonNode | null>(node);
  const [displayPos, setDisplayPos] = useState<typeof nodePosition>(nodePosition);
  const [prevNode, setPrevNode] = useState<TaxonNode | null>(node);
  const [prevPos, setPrevPos] = useState<typeof nodePosition>(nodePosition);
  const [isClosing, setIsClosing] = useState(false);

  // Synchronize state when node or position changes
  if (node !== prevNode) {
    setPrevNode(node);
    if (node) {
      setDisplayNode(node);
      setDisplayPos(nodePosition);
      setIsClosing(false);
    } else {
      setIsClosing(true);
    }
  } else if (node && nodePosition !== prevPos) {
    setPrevPos(nodePosition);
    setDisplayPos(nodePosition);
  }

  useEffect(() => {
    if (isClosing) {
      const timer = setTimeout(() => {
        setDisplayNode(null);
        setDisplayPos(null);
        setIsClosing(false);
      }, 160);
      return () => clearTimeout(timer);
    }
  }, [isClosing]);

  const isMobile = viewportDimensions.width < 640;
  const CARD_WIDTH = isMobile
    ? Math.min(360, viewportDimensions.width - 24)
    : Math.min(286, Math.max(240, viewportDimensions.width - 32));
  const CARD_HEIGHT = isMobile ? 156 : 148;

  const isCompact = viewportDimensions.width < 768;
  // Account for TaxonPanel (360px) + gap (16px) + TreeControls (44px) + margin (16px) = 436px
  const maxAvailableRight =
    isPanelOpen && !isCompact
      ? viewportDimensions.width - 436
      : viewportDimensions.width - 76;

  // Intelligent positioning relative to the node
  const stylePosition = useMemo(() => {
    if (!displayPos) return null;

    if (isMobile) {
      // On narrow mobile screens, ensure the card never covers the tapped node
      const isNodeInBottomHalf = displayPos.y > viewportDimensions.height * 0.52;
      const top = isNodeInBottomHalf
        ? Math.max(16, Math.min(displayPos.y - CARD_HEIGHT - 22, viewportDimensions.height * 0.22))
        : Math.min(viewportDimensions.height - CARD_HEIGHT - 16, Math.max(displayPos.y + 36, viewportDimensions.height * 0.44));
      const left = Math.max(12, (viewportDimensions.width - CARD_WIDTH) / 2);
      return { left, top };
    }

    let left = displayPos.x + 16;
    // By default, place above the node
    let top = displayPos.y - CARD_HEIGHT - 14;

    // Flip below if too close to the top of the canvas
    if (top < 12) {
      top = displayPos.y + 24;
    }

    // Flip to the left if overflowing the right edge or open panel
    if (left + CARD_WIDTH > maxAvailableRight) {
      const leftCandidate = displayPos.x - CARD_WIDTH - 16;
      if (leftCandidate >= 16) {
        left = leftCandidate;
      } else {
        left = Math.max(16, maxAvailableRight - CARD_WIDTH);
      }
    }

    if (left < 16) {
      left = 16;
    }

    const maxTop = Math.max(12, viewportDimensions.height - CARD_HEIGHT - 16);
    top = Math.max(12, Math.min(top, maxTop));

    return { left, top };
  }, [displayPos, isMobile, CARD_WIDTH, CARD_HEIGHT, maxAvailableRight, viewportDimensions.height, viewportDimensions.width]);

  if (!displayNode || !stylePosition) return null;

  const isVisible = Boolean(node) && !isClosing;
  const loc = localizeTaxon(displayNode);
  const displayName = loc?.name || displayNode.name;
  const displayDescription = loc?.description || displayNode.description;
  const rankLabel = ui.ranks[displayNode.rank] || getRankDisplay(displayNode.rank);
  const accentColor = getNodeAccentColor(displayNode);
  const statusColor = getStatusColor(displayNode.status);
  const statusLabel = displayNode.status
    ? ui.organismStatus[displayNode.status] || getStatusLabel(displayNode.status)
    : null;

  const originDate =
    displayNode.estimatedOriginMya !== undefined
      ? (locale === "en" && displayNode.estimatedOrigin
          ? displayNode.estimatedOrigin
          : formatMya(displayNode.estimatedOriginMya, locale))
      : displayNode.estimatedOrigin ?? null;

  const showScientificName = Boolean(
    displayNode.scientificName && displayNode.scientificName !== displayNode.name
  );

  return (
    <div
      role="region"
      aria-label={`${displayName} preview`}
      className="group"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onTouchStart={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
      onTouchEnd={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()}
      style={{
        position: "absolute",
        left: `${stylePosition.left}px`,
        top: `${stylePosition.top}px`,
        width: `${CARD_WIDTH}px`,
        zIndex: 36,
        background: "rgba(13, 17, 23, 0.94)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        border: "1px solid var(--surface-border)",
        borderRadius: "var(--radius-md)",
        boxShadow:
          "0 14px 34px -4px rgba(0, 0, 0, 0.7), 0 0 1px 1px rgba(255, 255, 255, 0.08)",
        overflow: "hidden",
        pointerEvents: "auto",
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? "translateY(0) scale(1)"
          : "translateY(4px) scale(0.97)",
        transition:
          "opacity 160ms cubic-bezier(0.16, 1, 0.3, 1), transform 160ms cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {/* Top Clade Accent Bar */}
      <div
        style={{
          height: "3px",
          width: "100%",
          background: `linear-gradient(90deg, ${accentColor}, transparent)`,
        }}
      />

      <div style={{ padding: "10px 12px 10px 12px" }}>
        {/* Header: Name + Rank + Close button */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: "8px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "6px", minWidth: 0, flex: 1 }}>
            <TaxonIcon node={displayNode} size={15} />
            <h4
              style={{
                fontSize: "13px",
                fontWeight: 600,
                color: "var(--text-primary)",
                margin: 0,
                lineHeight: 1.3,
                wordBreak: "break-word",
              }}
              title={displayName}
            >
              {displayName}
            </h4>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "6px", flexShrink: 0 }}>
            <span
              style={{
                fontSize: "9.5px",
                fontWeight: 600,
                color: "var(--text-tertiary)",
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid var(--surface-border)",
                borderRadius: "4px",
                padding: "1.5px 6px",
                textTransform: "uppercase",
                letterSpacing: "0.04em",
              }}
            >
              {rankLabel}
            </span>

            {/* Clear way to dismiss without opening full details */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onClose?.();
              }}
              aria-label={t("common.close", "Close")}
              style={{
                background: "rgba(255, 255, 255, 0.06)",
                border: "1px solid var(--surface-border)",
                borderRadius: "4px",
                width: "22px",
                height: "22px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--text-secondary)",
                cursor: "pointer",
                fontSize: "11px",
                lineHeight: 1,
              }}
            >
              ✕
            </button>
          </div>
        </div>

        {/* Sub-header: Scientific Name, Status, Origin */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "6px",
            marginTop: "4px",
            fontSize: "10.5px",
          }}
        >
          {showScientificName && (
            <span
              style={{
                fontStyle: "italic",
                color: "var(--text-accent)",
                fontWeight: 400,
              }}
            >
              {displayNode.scientificName}
            </span>
          )}

          {statusLabel && (
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "3.5px",
                color: statusColor,
                fontSize: "10px",
                fontWeight: 500,
              }}
            >
              <span
                style={{
                  width: "5px",
                  height: "5px",
                  borderRadius: "50%",
                  background: statusColor,
                }}
              />
              {statusLabel}
            </span>
          )}

          {originDate && (
            <span
              style={{
                color: "var(--text-tertiary)",
                fontSize: "10px",
                marginLeft: "auto",
              }}
            >
              ⏱ {originDate}
            </span>
          )}
        </div>

        {/* Short description */}
        {displayDescription && (
          <p
            style={{
              margin: "6px 0 0 0",
              fontSize: "11px",
              lineHeight: 1.45,
              color: "var(--text-secondary)",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {displayDescription}
          </p>
        )}

        {/* Prominent, touch-friendly primary action button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onOpenDetails(displayNode.id);
          }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            marginTop: "10px",
            padding: "8px 12px",
            minHeight: "38px",
            borderRadius: "6px",
            background: "var(--accent-primary-dim)",
            border: "1px solid rgba(61, 142, 248, 0.4)",
            fontSize: "11px",
            fontWeight: 600,
            color: "var(--accent-primary)",
            cursor: "pointer",
            transition: "all 150ms ease",
          }}
        >
          <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {t("taxonPanel.openFullDetails", "Click to open full details")}
          </span>
          <span style={{ fontSize: "14px", marginLeft: "8px", flexShrink: 0 }}>→</span>
        </button>
      </div>
    </div>
  );
}
