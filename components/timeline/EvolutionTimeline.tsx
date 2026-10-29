"use client";

import React, { useMemo } from "react";
import type { ViewportTransform, TreeData } from "@/types/taxonomy";
import { computeTreeLayout, getTreeBounds } from "@/lib/tree-layout";
import { useLanguage } from "@/lib/i18n";
import { toBengaliDigits } from "@/lib/tree-utils";

interface EvolutionTimelineProps {
  treeData: TreeData;
  transform: ViewportTransform;
  viewportWidth: number;
}

// Timeline markers in millions of years ago
const TIMELINE_MARKERS = [
  { mya: 4000, label: "4 BYA" },
  { mya: 3500, label: "3.5 BYA" },
  { mya: 3000, label: "3 BYA" },
  { mya: 2500, label: "2.5 BYA" },
  { mya: 2000, label: "2 BYA" },
  { mya: 1500, label: "1.5 BYA" },
  { mya: 1000, label: "1 BYA" },
  { mya: 750, label: "750 MYA" },
  { mya: 600, label: "600 MYA" },
  { mya: 540, label: "540 MYA" },
  { mya: 500, label: "500 MYA" },
  { mya: 400, label: "400 MYA" },
  { mya: 300, label: "300 MYA" },
  { mya: 200, label: "200 MYA" },
  { mya: 100, label: "100 MYA" },
  { mya: 66, label: "K-Pg" },
  { mya: 50, label: "50 MYA" },
  { mya: 10, label: "10 MYA" },
  { mya: 0, label: "Present" },
];

// Key geological events
const GEOLOGICAL_EVENTS = [
  { mya: 3800, label: "LUCA", color: "#4ade80" },
  { mya: 2700, label: "Cyanobacteria", color: "#60a5fa" },
  { mya: 541, label: "Cambrian Explosion", color: "#f59e0b" },
  { mya: 252, label: "Permian Extinction", color: "#f87171" },
  { mya: 66, label: "K-Pg Extinction", color: "#f87171" },
  { mya: 0.3, label: "Homo sapiens", color: "#a78bfa" },
];

export default function EvolutionTimeline({
  treeData,
  transform,
  viewportWidth,
}: EvolutionTimelineProps) {
  const { t, locale } = useLanguage();
  const layoutNodes = useMemo(() => computeTreeLayout(treeData), [treeData]);
  const bounds = useMemo(() => getTreeBounds(layoutNodes), [layoutNodes]);

  // Map MYA to world X coordinate
  // LUCA (~3800 MYA) is at the leftmost point
  // Present (~0) is at the rightmost point
  const maxMya = 4000;
  const minMya = 0;

  function myaToWorldX(mya: number): number {
    // Linear interpolation between bounds
    const t = 1 - (mya - minMya) / (maxMya - minMya);
    return bounds.minX + t * bounds.width;
  }

  // Convert world X to screen X
  function worldXToScreen(worldX: number): number {
    return worldX * transform.scale + transform.x;
  }

  function myaToScreenX(mya: number): number {
    return worldXToScreen(myaToWorldX(mya));
  }

  const TIMELINE_HEIGHT = 52;

  const visibleMarkers = useMemo(() => {
    let lastX = -999;
    const result: Array<{
      mya: number;
      label: string;
      screenX: number;
      isPresent: boolean;
      isSpecial: boolean;
    }> = [];
    for (const marker of TIMELINE_MARKERS) {
      const screenX = myaToScreenX(marker.mya);
      if (screenX < -20 || screenX > viewportWidth + 20) continue;
      const minSpacing = marker.mya === 0 ? 30 : 44;
      if (marker.mya !== 0 && screenX - lastX < minSpacing) continue;
      lastX = screenX;
      result.push({
        ...marker,
        screenX,
        isPresent: marker.mya === 0,
        isSpecial: marker.mya === 66 || marker.mya === 541,
      });
    }
    return result;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bounds, transform, viewportWidth]);

  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: `${TIMELINE_HEIGHT}px`,
        background: "linear-gradient(to top, rgba(8,12,16,0.95) 60%, transparent)",
        borderTop: "1px solid var(--surface-border)",
        overflow: "hidden",
        zIndex: 10,
        pointerEvents: "none",
      }}
      aria-label="Evolutionary timeline"
    >
      <svg
        width="100%"
        height={TIMELINE_HEIGHT}
        style={{ display: "block", overflow: "visible" }}
      >
        {/* Geological events */}
        {GEOLOGICAL_EVENTS.map((event) => {
          const screenX = myaToScreenX(event.mya);
          if (screenX < -50 || screenX > viewportWidth + 50) return null;

          return (
            <g key={event.label} transform={`translate(${screenX}, 0)`}>
              <line
                x1={0}
                y1={0}
                x2={0}
                y2={TIMELINE_HEIGHT - 24}
                stroke={event.color}
                strokeWidth={1}
                strokeDasharray="2,3"
                opacity={0.4}
              />
            </g>
          );
        })}

        {/* Timeline tick marks */}
        {visibleMarkers.map((marker) => (
          <g key={marker.mya} transform={`translate(${marker.screenX}, 0)`}>
            {/* Tick line */}
            <line
              x1={0}
              y1={TIMELINE_HEIGHT - 22}
              x2={0}
              y2={TIMELINE_HEIGHT - 14}
              stroke={
                marker.isPresent || marker.isSpecial
                  ? "rgba(255,255,255,0.35)"
                  : "rgba(255,255,255,0.15)"
              }
              strokeWidth={marker.isPresent || marker.isSpecial ? 1.5 : 1}
            />

            {/* Label */}
            <text
              x={0}
              y={TIMELINE_HEIGHT - 4}
              textAnchor="middle"
              className="timeline-tick"
              style={{
                fill: marker.isPresent
                  ? "rgba(255,255,255,0.5)"
                  : marker.isSpecial
                  ? "rgba(245,158,11,0.7)"
                  : "rgba(255,255,255,0.2)",
                fontSize: marker.isPresent || marker.isSpecial ? "9.5px" : "8.5px",
                fontWeight: marker.isPresent || marker.isSpecial ? "600" : "500",
              }}
            >
              {marker.mya === 0
                ? t("timeline.present", "Present")
                : locale === "bn-IN"
                ? toBengaliDigits(marker.label.replace("BYA", " " + t("timeline.bya", "BYA")).replace("MYA", " " + t("timeline.mya", "MYA")))
                : marker.label.replace("BYA", " " + t("timeline.bya", "BYA")).replace("MYA", " " + t("timeline.mya", "MYA"))}
            </text>
          </g>
        ))}

        {/* Timeline baseline */}
        <line
          x1={0}
          y1={TIMELINE_HEIGHT - 22}
          x2={viewportWidth}
          y2={TIMELINE_HEIGHT - 22}
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={1}
        />

        {/* "Time →" label */}
        <text
          x={8}
          y={TIMELINE_HEIGHT - 27}
          style={{
            fill: "rgba(255,255,255,0.15)",
            fontSize: "8px",
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          {t("timeline.title", "TIME")}
        </text>
        <path
          d={`M 28 ${TIMELINE_HEIGHT - 29} L 46 ${TIMELINE_HEIGHT - 29}`}
          stroke="rgba(255,255,255,0.1)"
          strokeWidth={1}
          markerEnd="url(#arrow)"
        />
      </svg>
    </div>
  );
}
