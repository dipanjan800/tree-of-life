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

interface NodeHoverPreviewProps {
  node: TaxonNode | null;
  nodePosition: { x: number; y: number; scale: number } | null;
  viewportDimensions: { width: number; height: number };
  isPanelOpen: boolean;
  onOpenDetails: (nodeId: string) => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export default function NodeHoverPreview({
  node,
  nodePosition,
  viewportDimensions,
  isPanelOpen,
  onOpenDetails,
  onMouseEnter,
  onMouseLeave,
}: NodeHoverPreviewProps) {
  const { t, localizeTaxon, ui } = useLanguage();

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

  const CARD_WIDTH = Math.min(276, Math.max(240, viewportDimensions.width - 32));
  const CARD_HEIGHT = 142;

  const isCompact = viewportDimensions.width < 768;
  const maxAvailableRight =
    isPanelOpen && !isCompact
      ? viewportDimensions.width - 345
      : viewportDimensions.width - 16;

  // Intelligent positioning relative to the node
  const stylePosition = useMemo(() => {
    if (!displayPos) return null;

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
  }, [displayPos, CARD_WIDTH, CARD_HEIGHT, maxAvailableRight, viewportDimensions.height]);

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

  const originDate = displayNode.estimatedOrigin
    ? displayNode.estimatedOrigin
    : displayNode.estimatedOriginMya
    ? formatMya(displayNode.estimatedOriginMya)
    : null;

  const showScientificName = Boolean(
    displayNode.scientificName && displayNode.scientificName !== displayNode.name
  );

  return (
    <div
      role="tooltip"
      aria-label={`${displayName} preview`}
      className="group"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={(e) => {
        e.stopPropagation();
        onOpenDetails(displayNode.id);
      }}
      style={{
        position: "absolute",
        left: `${stylePosition.left}px`,
        top: `${stylePosition.top}px`,
        width: `${CARD_WIDTH}px`,
        zIndex: 25,
        cursor: "pointer",
        background: "rgba(13, 17, 23, 0.92)",
        backdropFilter: "blur(18px) saturate(180%)",
        WebkitBackdropFilter: "blur(18px) saturate(180%)",
        border: "1px solid var(--surface-border)",
        borderRadius: "var(--radius-md)",
        boxShadow:
          "0 14px 34px -4px rgba(0, 0, 0, 0.65), 0 0 1px 1px rgba(255, 255, 255, 0.08)",
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
        {/* Header: Name + Rank */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: "8px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "6px", minWidth: 0 }}>
            {displayNode.iconEmoji && (
              <span style={{ fontSize: "14px", lineHeight: 1, flexShrink: 0 }}>
                {displayNode.iconEmoji}
              </span>
            )}
            <h4
              style={{
                fontSize: "13px",
                fontWeight: 600,
                color: "var(--text-primary)",
                margin: 0,
                lineHeight: 1.3,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
              title={displayName}
            >
              {displayName}
            </h4>
          </div>

          <span
            style={{
              flexShrink: 0,
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

        {/* Subtle bottom action prompt */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "8px",
            paddingTop: "6px",
            borderTop: "1px solid rgba(255, 255, 255, 0.05)",
            fontSize: "10px",
            fontWeight: 500,
            color: "var(--accent-primary)",
          }}
        >
          <span>
            {t("preview.clickForDetails", "Click to open full details")}
          </span>
          <span
            style={{
              transition: "transform 150ms ease",
              display: "inline-block",
            }}
            className="group-hover:translate-x-0.5"
          >
            →
          </span>
        </div>
      </div>
    </div>
  );
}
