"use client";

import React, { useRef } from "react";
import { useLanguage } from "@/lib/i18n";

export type OrganismTabId =
  | "overview"
  | "classification"
  | "evolution"
  | "morphology"
  | "timeline"
  | "evidence"
  | "specimens";

interface OrganismTabBarProps {
  activeTab: OrganismTabId;
  onChangeTab: (tab: OrganismTabId) => void;
  hasEvidence: boolean;
  hasSpecimens: boolean;
  hasMorphology: boolean;
}

export default function OrganismTabBar({
  activeTab,
  onChangeTab,
  hasEvidence,
  hasSpecimens,
  hasMorphology,
}: OrganismTabBarProps) {
  const { t } = useLanguage();
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);

  const tabs: Array<{ id: OrganismTabId; label: string; icon: string; countBadge?: number }> = [
    {
      id: "overview",
      label: t("taxonPanel.tabOverview", "Overview"),
      icon: "📋",
    },
    {
      id: "classification",
      label: t("taxonPanel.tabClassification", "Taxonomy"),
      icon: "🌳",
    },
    {
      id: "evolution",
      label: t("taxonPanel.tabEvolution", "Lineage"),
      icon: "🧬",
    },
    {
      id: "morphology",
      label: t("taxonPanel.tabMorphology", "Anatomy"),
      icon: "🦴",
    },
    {
      id: "timeline",
      label: t("taxonPanel.tabTimeline", "Geochronology"),
      icon: "⏳",
    },
    {
      id: "evidence",
      label: t("taxonPanel.tabEvidence", "Evidence"),
      icon: "🔬",
    },
    {
      id: "specimens",
      label: t("taxonPanel.tabSpecimens", "Specimens"),
      icon: "🏛️",
    },
  ];

  // Keyboard navigation for WAI-ARIA tablist pattern
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      const nextIdx = (index + 1) % tabs.length;
      tabsRef.current[nextIdx]?.focus();
      onChangeTab(tabs[nextIdx].id);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      const prevIdx = (index - 1 + tabs.length) % tabs.length;
      tabsRef.current[prevIdx]?.focus();
      onChangeTab(tabs[prevIdx].id);
    } else if (e.key === "Home") {
      e.preventDefault();
      tabsRef.current[0]?.focus();
      onChangeTab(tabs[0].id);
    } else if (e.key === "End") {
      e.preventDefault();
      const lastIdx = tabs.length - 1;
      tabsRef.current[lastIdx]?.focus();
      onChangeTab(tabs[lastIdx].id);
    }
  };

  return (
    <div
      role="tablist"
      aria-label={t("taxonPanel.tabsAria", "Organism dossier sections")}
      className="flex items-center gap-1 px-3 py-2 border-b border-[var(--surface-border)] bg-[rgba(10,15,22,0.9)] overflow-x-auto no-scrollbar shrink-0 select-none"
      style={{
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      {tabs.map((tab, idx) => {
        const isActive = activeTab === tab.id;
        const isHighlight =
          (tab.id === "evidence" && hasEvidence) ||
          (tab.id === "specimens" && hasSpecimens) ||
          (tab.id === "morphology" && hasMorphology);

        return (
          <button
            key={tab.id}
            ref={(el) => {
              tabsRef.current[idx] = el;
            }}
            role="tab"
            id={`dossier-tab-${tab.id}`}
            aria-selected={isActive}
            aria-controls={`dossier-panel-${tab.id}`}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onChangeTab(tab.id)}
            onKeyDown={(e) => handleKeyDown(e, idx)}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[11px] font-medium transition-all whitespace-nowrap shrink-0 outline-none ${
              isActive
                ? "bg-[rgba(61,142,248,0.18)] text-white border border-[rgba(61,142,248,0.35)] shadow-sm"
                : "text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] hover:bg-white/[0.04] border border-transparent"
            }`}
          >
            <span className="text-[12px]" aria-hidden="true">
              {tab.icon}
            </span>
            <span>{tab.label}</span>
            {isHighlight && !isActive && (
              <span
                className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)] opacity-80"
                aria-hidden="true"
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
