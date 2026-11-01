"use client";

import React from "react";
import type { ConservationViewMode, MassExtinctionId } from "@/types/conservation";
import { BIG_FIVE_MASS_EXTINCTIONS } from "@/data/conservation/mass-extinctions";
import { useLanguage } from "@/lib/i18n";

interface ConservationToolbarProps {
  viewMode: ConservationViewMode;
  onViewModeChange: (mode: ConservationViewMode) => void;
  selectedMassExtinction: MassExtinctionId | null;
  onSelectMassExtinction: (id: MassExtinctionId | null) => void;
  onOpenExplorerModal: () => void;
}

export default function ConservationToolbar({
  viewMode,
  onViewModeChange,
  selectedMassExtinction,
  onSelectMassExtinction,
  onOpenExplorerModal,
}: ConservationToolbarProps) {
  const { t } = useLanguage();

  const isFilterActive = viewMode !== "all" || selectedMassExtinction !== null;

  return (
    <div
      className="absolute top-18 sm:top-20 left-1/2 -translate-x-1/2 z-25 flex items-center gap-1.5 p-1 rounded-2xl border border-white/10 bg-[rgba(8,12,18,0.88)] backdrop-blur-xl shadow-2xl max-w-[calc(100vw-32px)] overflow-x-auto no-scrollbar"
      style={{
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
      role="toolbar"
      aria-label={t("conservation.title", "Conservation and Extinction Filter Toolbar")}
    >
      {/* 1. All Lineages (Normal view) */}
      <button
        onClick={() => {
          onViewModeChange("all");
          onSelectMassExtinction(null);
        }}
        className={`px-3 py-1.5 rounded-xl text-[11px] font-semibold transition-all whitespace-nowrap cursor-pointer ${
          !isFilterActive
            ? "bg-white/15 text-white shadow-sm border border-white/20"
            : "text-white/60 hover:text-white hover:bg-white/5 border border-transparent"
        }`}
      >
        {t("conservation.filterAll", "All Lineages")}
      </button>

      {/* 2. Mass Extinction Victims Filter */}
      <button
        onClick={() => {
          onViewModeChange("mass_extinction");
          onSelectMassExtinction(null);
        }}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-semibold transition-all whitespace-nowrap cursor-pointer ${
          viewMode === "mass_extinction" && selectedMassExtinction === null
            ? "bg-rose-500/25 text-rose-300 border border-rose-500/40 shadow-sm"
            : "text-white/60 hover:text-white hover:bg-white/5 border border-transparent"
        }`}
      >
        <span className="text-rose-400">†</span>
        <span>{t("conservation.filterMassExtinctions", "Mass Extinction Victims")}</span>
      </button>

      {/* 3. Modern Threatened (CR, EN, VU) Filter */}
      <button
        onClick={() => {
          onViewModeChange("threatened_modern");
          onSelectMassExtinction(null);
        }}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-semibold transition-all whitespace-nowrap cursor-pointer ${
          viewMode === "threatened_modern"
            ? "bg-amber-500/25 text-amber-300 border border-amber-500/40 shadow-sm"
            : "text-white/60 hover:text-white hover:bg-white/5 border border-transparent"
        }`}
      >
        <span className="text-amber-400">⚠️</span>
        <span>{t("conservation.filterThreatened", "IUCN Threatened")}</span>
      </button>

      {/* 4. Ancient Relicts Filter */}
      <button
        onClick={() => {
          onViewModeChange("relict_lineages");
          onSelectMassExtinction(null);
        }}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-semibold transition-all whitespace-nowrap cursor-pointer ${
          viewMode === "relict_lineages"
            ? "bg-emerald-500/25 text-emerald-300 border border-emerald-500/40 shadow-sm"
            : "text-white/60 hover:text-white hover:bg-white/5 border border-transparent"
        }`}
      >
        <span className="text-emerald-400">🌱</span>
        <span>{t("conservation.filterRelicts", "Living Relicts")}</span>
      </button>

      {/* Divider */}
      <div className="w-[1px] h-4 bg-white/10 mx-1 shrink-0" />

      {/* 5. Big Five Quick Dropdown / Filter */}
      <div className="relative shrink-0">
        <select
          value={selectedMassExtinction || ""}
          onChange={(e) => {
            const val = e.target.value as MassExtinctionId | "";
            if (val) {
              onSelectMassExtinction(val);
              onViewModeChange("mass_extinction");
            } else {
              onSelectMassExtinction(null);
            }
          }}
          className="appearance-none bg-black/40 border border-white/10 text-white/80 hover:text-white hover:border-white/20 px-2.5 py-1.5 pr-6 rounded-xl text-[11px] font-semibold cursor-pointer outline-none transition-colors"
          aria-label="Filter by specific mass extinction"
        >
          <option value="" className="bg-neutral-900 text-white">
            {t("conservation.bigFiveTitle", "Big Five Crises...")}
          </option>
          {Object.values(BIG_FIVE_MASS_EXTINCTIONS).map((evt) => (
            <option key={evt.id} value={evt.id} className="bg-neutral-900 text-white">
              {evt.name.split("(")[0].trim()} (~{evt.ageMya} MYA)
            </option>
          ))}
        </select>
        <span className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-white/40 text-[9px]">
          ▼
        </span>
      </div>

      {/* Divider */}
      <div className="w-[1px] h-4 bg-white/10 mx-1 shrink-0" />

      {/* 6. Comprehensive Dossier Modal Launcher */}
      <button
        onClick={onOpenExplorerModal}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-500/15 text-sky-300 hover:bg-sky-500/25 hover:text-white border border-sky-500/30 text-[11px] font-semibold transition-all whitespace-nowrap cursor-pointer shrink-0 shadow-sm"
        title="Open interactive Mass Extinction & Conservation Dossier"
      >
        <span>🏛️</span>
        <span className="hidden md:inline">{t("conservation.title", "Explorer Dossier")}</span>
        <span className="md:hidden">Dossier</span>
        <span>→</span>
      </button>
    </div>
  );
}

