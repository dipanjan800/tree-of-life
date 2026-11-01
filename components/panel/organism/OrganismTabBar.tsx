"use client";

import React, { useRef, useState, useEffect, useCallback, useMemo } from "react";
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
  const containerRef = useRef<HTMLDivElement | null>(null);
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const tabs = useMemo<Array<{ id: OrganismTabId; label: string; icon: string; countBadge?: number }>>(
    () => [
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
    ],
    [t]
  );

  // Check scroll boundary status
  const updateScrollState = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 2);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 2);
  }, []);

  useEffect(() => {
    updateScrollState();
    const el = containerRef.current;
    if (!el) return;

    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState]);

  // Smoothly ensure active tab is comfortably in view with safe margins
  const scrollTabIntoView = useCallback((idx: number) => {
    const container = containerRef.current;
    const tab = tabsRef.current[idx];
    if (!container || !tab) return;

    const containerRect = container.getBoundingClientRect();
    const tabRect = tab.getBoundingClientRect();
    const safeMargin = 28;

    if (tabRect.left < containerRect.left + safeMargin) {
      container.scrollTo({
        left: container.scrollLeft + (tabRect.left - containerRect.left) - safeMargin,
        behavior: "smooth",
      });
    } else if (tabRect.right > containerRect.right - safeMargin) {
      container.scrollTo({
        left: container.scrollLeft + (tabRect.right - containerRect.right) + safeMargin,
        behavior: "smooth",
      });
    }
  }, []);

  // When active tab changes, scroll it into view and update indicators
  useEffect(() => {
    const activeIdx = tabs.findIndex((t) => t.id === activeTab);
    if (activeIdx !== -1) {
      scrollTabIntoView(activeIdx);
    }
    const timer = setTimeout(updateScrollState, 150);
    return () => clearTimeout(timer);
  }, [activeTab, scrollTabIntoView, updateScrollState, tabs]);

  // Keyboard navigation for WAI-ARIA tablist pattern
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      const nextIdx = (index + 1) % tabs.length;
      tabsRef.current[nextIdx]?.focus();
      onChangeTab(tabs[nextIdx].id);
      scrollTabIntoView(nextIdx);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      const prevIdx = (index - 1 + tabs.length) % tabs.length;
      tabsRef.current[prevIdx]?.focus();
      onChangeTab(tabs[prevIdx].id);
      scrollTabIntoView(prevIdx);
    } else if (e.key === "Home") {
      e.preventDefault();
      tabsRef.current[0]?.focus();
      onChangeTab(tabs[0].id);
      scrollTabIntoView(0);
    } else if (e.key === "End") {
      e.preventDefault();
      const lastIdx = tabs.length - 1;
      tabsRef.current[lastIdx]?.focus();
      onChangeTab(tabs[lastIdx].id);
      scrollTabIntoView(lastIdx);
    }
  };

  const handleScrollLeft = () => {
    containerRef.current?.scrollBy({ left: -140, behavior: "smooth" });
  };

  const handleScrollRight = () => {
    containerRef.current?.scrollBy({ left: 140, behavior: "smooth" });
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (containerRef.current && Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      containerRef.current.scrollLeft += e.deltaY;
    }
  };

  return (
    <div className="relative border-b border-[var(--surface-border)] bg-[rgba(10,15,22,0.95)] shrink-0 select-none">
      {/* Left scroll chevron button */}
      {canScrollLeft && (
        <div className="absolute left-0 top-0 bottom-0 z-10 flex items-center pr-2 pl-0.5 bg-gradient-to-r from-[rgba(10,15,22,0.98)] via-[rgba(10,15,22,0.9)] to-transparent pointer-events-none">
          <button
            type="button"
            onClick={handleScrollLeft}
            aria-label={t("taxonPanel.scrollTabsLeft", "Scroll tabs left")}
            className="pointer-events-auto w-6 h-6 rounded flex items-center justify-center bg-black/60 hover:bg-black/90 text-white/80 hover:text-white border border-white/10 shadow-sm transition-colors text-xs"
          >
            ‹
          </button>
        </div>
      )}

      {/* Tablist container */}
      <div
        ref={containerRef}
        role="tablist"
        aria-label={t("taxonPanel.tabsAria", "Organism dossier sections")}
        onWheel={handleWheel}
        className="flex items-center gap-1 px-2 py-1.5 overflow-x-auto no-scrollbar scroll-smooth"
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
              onClick={() => {
                onChangeTab(tab.id);
                scrollTabIntoView(idx);
              }}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[11px] font-medium transition-all whitespace-nowrap shrink-0 outline-none ${
                isActive
                  ? "bg-[rgba(61,142,248,0.22)] text-white border border-[rgba(61,142,248,0.45)] shadow-sm font-semibold"
                  : "text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] hover:bg-white/[0.04] border border-transparent"
              }`}
            >
              <span className="text-[12px] leading-none" aria-hidden="true">
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

      {/* Right scroll chevron button */}
      {canScrollRight && (
        <div className="absolute right-0 top-0 bottom-0 z-10 flex items-center pl-2 pr-0.5 bg-gradient-to-l from-[rgba(10,15,22,0.98)] via-[rgba(10,15,22,0.9)] to-transparent pointer-events-none">
          <button
            type="button"
            onClick={handleScrollRight}
            aria-label={t("taxonPanel.scrollTabsRight", "Scroll tabs right")}
            className="pointer-events-auto w-6 h-6 rounded flex items-center justify-center bg-black/60 hover:bg-black/90 text-white/80 hover:text-white border border-white/10 shadow-sm transition-colors text-xs"
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}
