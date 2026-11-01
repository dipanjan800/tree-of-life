"use client";

import React, { useState, useId } from "react";
import { BIG_FIVE_MASS_EXTINCTIONS } from "@/data/conservation/mass-extinctions";
import { EXTINCT_TAXA_PROFILES } from "@/data/conservation/extinct-taxa";
import { MODERN_CONSERVATION_PROFILES } from "@/data/conservation/modern-iucn";
import type { MassExtinctionId, IUCNCategory } from "@/types/conservation";
import IUCNStatusPill from "./IUCNStatusPill";
import { useLanguage } from "@/lib/i18n";

interface ConservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateTaxon: (taxonId: string) => void;
  initialTab?: "timeline" | "extinct" | "modern";
}

export default function ConservationModal({
  isOpen,
  onClose,
  onNavigateTaxon,
  initialTab = "timeline",
}: ConservationModalProps) {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<"timeline" | "extinct" | "modern">(initialTab);
  const [selectedExtinctionId, setSelectedExtinctionId] = useState<MassExtinctionId>("cretaceous_paleogene");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIucnFilter, setSelectedIucnFilter] = useState<IUCNCategory | "ALL">("ALL");

  const titleId = useId();
  const descId = useId();

  if (!isOpen) return null;

  const currentExtinction = BIG_FIVE_MASS_EXTINCTIONS[selectedExtinctionId];

  // Filtered extinct species list
  const filteredExtinctTaxa = Object.values(EXTINCT_TAXA_PROFILES).filter((p) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      p.commonName.toLowerCase().includes(q) ||
      p.scientificName.toLowerCase().includes(q) ||
      p.horizonName.toLowerCase().includes(q)
    );
  });

  // Filtered modern conservation list
  const filteredModernTaxa = Object.values(MODERN_CONSERVATION_PROFILES).filter((p) => {
    const matchesFilter = selectedIucnFilter === "ALL" || p.iucnCategory === selectedIucnFilter;
    if (!searchQuery) return matchesFilter;
    const q = searchQuery.toLowerCase();
    return matchesFilter && (p.taxonId.toLowerCase().includes(q) || p.categoryName.toLowerCase().includes(q));
  });

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={descId}
    >
      <div className="relative w-full max-w-5xl max-h-[92vh] flex flex-col rounded-2xl border border-white/10 bg-[rgba(10,14,22,0.96)] shadow-2xl overflow-hidden">
        {/* Top Header */}
        <div className="p-5 sm:p-6 border-b border-white/10 flex items-start justify-between gap-4 shrink-0 bg-white/[0.02]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl">🌍</span>
              <h2 id={titleId} className="text-lg sm:text-xl font-bold text-white tracking-tight">
                {t("conservation.title", "Conservation & Extinction Explorer")}
              </h2>
            </div>
            <p id={descId} className="text-xs text-[var(--text-secondary)] leading-relaxed max-w-2xl">
              {t(
                "conservation.subtitle",
                "Connecting Earth's Big Five Mass Extinction Crises with Contemporary Biodiversity Preservation"
              )}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg border border-white/10 bg-white/[0.04] hover:bg-white/10 text-white/60 hover:text-white transition-colors cursor-pointer shrink-0"
            aria-label={t("conservation.close", "Close Explorer")}
          >
            ✕
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 px-5 sm:px-6 py-2.5 border-b border-white/5 bg-black/30 shrink-0 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab("timeline")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === "timeline"
                ? "bg-sky-500/20 text-sky-300 border border-sky-500/30"
                : "text-white/60 hover:text-white hover:bg-white/5 border border-transparent"
            }`}
          >
            🌋 {t("conservation.tabTimeline", "Mass Extinction Timeline")}
          </button>
          <button
            onClick={() => setActiveTab("extinct")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === "extinct"
                ? "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                : "text-white/60 hover:text-white hover:bg-white/5 border border-transparent"
            }`}
          >
            🦴 {t("conservation.tabExtinctSpecies", "Extinct Species Profiles")}
          </button>
          <button
            onClick={() => setActiveTab("modern")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === "modern"
                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                : "text-white/60 hover:text-white hover:bg-white/5 border border-transparent"
            }`}
          >
            🛡️ {t("conservation.tabModernIucn", "Modern IUCN Red List")}
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {/* ======================================================== */}
          {/* TAB 1: MASS EXTINCTION TIMELINE                          */}
          {/* ======================================================== */}
          {activeTab === "timeline" && (
            <div className="space-y-6 animate-fade-in">
              {/* Event Selector Timeline Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                {Object.values(BIG_FIVE_MASS_EXTINCTIONS).map((evt) => {
                  const isSelected = evt.id === selectedExtinctionId;
                  return (
                    <button
                      key={evt.id}
                      onClick={() => setSelectedExtinctionId(evt.id)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? "bg-sky-500/15 border-sky-500/40 text-white shadow-lg"
                          : "bg-white/[0.02] border-white/5 text-white/60 hover:text-white hover:bg-white/[0.05]"
                      }`}
                    >
                      <div className="text-[10px] font-bold uppercase tracking-wider text-sky-400 mb-0.5">
                        ~{evt.ageMya} MYA
                      </div>
                      <div className="text-xs font-semibold truncate leading-snug">
                        {evt.name.split("(")[0].trim()}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Event Deep-Dive Card */}
              {currentExtinction && (
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-6 space-y-5">
                  <div className="border-b border-white/5 pb-4">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                      <h3 className="text-base sm:text-lg font-bold text-white">
                        {currentExtinction.name}
                      </h3>
                      <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-semibold text-[11px] border border-rose-500/30">
                        {currentExtinction.ageRange}
                      </span>
                    </div>
                    <p className="text-xs text-[var(--text-secondary)] italic">
                      {currentExtinction.geologicalBoundary}
                    </p>
                  </div>

                  {/* Impact Stats */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3.5 rounded-xl border border-rose-500/20 bg-rose-500/[0.04]">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-rose-300 block mb-1">
                        {t("conservation.killRateSpecies", "Estimated Species Loss")}
                      </span>
                      <span className="text-base font-bold text-white">
                        {currentExtinction.estimatedLossSpeciesPercent}
                      </span>
                    </div>

                    <div className="p-3.5 rounded-xl border border-amber-500/20 bg-amber-500/[0.04]">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 block mb-1">
                        {t("conservation.killRateGenera", "Estimated Genera Loss")}
                      </span>
                      <span className="text-base font-bold text-white">
                        {currentExtinction.estimatedLossGeneraPercent}
                      </span>
                    </div>
                  </div>

                  {/* Triggers and Environmental Mechanisms */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h4 className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-tertiary)]">
                        {t("conservation.primaryTriggers", "Primary Trigger Mechanisms")}
                      </h4>
                      <ul className="space-y-1.5">
                        {currentExtinction.primaryTriggers.map((trig, idx) => (
                          <li
                            key={idx}
                            className="p-2.5 rounded-lg border border-white/5 bg-black/20 text-xs text-white/80 flex items-start gap-2"
                          >
                            <span className="text-rose-400 select-none">⚡</span>
                            <span>{trig}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-tertiary)]">
                        {t("conservation.environmentalMechanisms", "Environmental & Geochemical Mechanisms")}
                      </h4>
                      <ul className="space-y-1.5">
                        {currentExtinction.environmentalMechanisms.map((mech, idx) => (
                          <li
                            key={idx}
                            className="p-2.5 rounded-lg border border-white/5 bg-black/20 text-xs text-white/80 flex items-start gap-2"
                          >
                            <span className="text-amber-400 select-none">🌪️</span>
                            <span>{mech}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Affected vs. Radiating Groups */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h4 className="text-[11px] font-bold uppercase tracking-wider text-rose-400">
                        {t("conservation.affectedGroups", "Severely Affected Taxa")}
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {currentExtinction.affectedGroups.map((grp, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 rounded-lg border border-rose-500/20 bg-rose-500/10 text-rose-200 text-xs"
                          >
                            † {grp}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                        {t("conservation.survivingRadiations", "Surviving Radiations & Recovery")}
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {currentExtinction.survivingRadiations.map((surv, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 rounded-lg border border-emerald-500/20 bg-emerald-500/10 text-emerald-200 text-xs"
                          >
                            🌱 {surv}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Scientific Uncertainty Alert */}
                  <div className="p-3.5 rounded-xl border border-sky-500/20 bg-sky-500/[0.04] text-xs text-sky-200/90 space-y-1">
                    <div className="font-semibold text-sky-300">
                      {t("conservation.scientificUncertainty", "Scientific Uncertainty & Consensus")}
                    </div>
                    <p className="leading-relaxed">{currentExtinction.uncertaintyNotes}</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 2: EXTINCT SPECIES PROFILES                          */}
          {/* ======================================================== */}
          {activeTab === "extinct" && (
            <div className="space-y-5 animate-fade-in">
              {/* Epistemological demarcation banner */}
              <div className="p-3 rounded-xl border border-amber-500/25 bg-amber-500/[0.05] text-xs text-amber-300/90 flex items-start gap-2.5">
                <span className="text-base select-none">⚠️</span>
                <span>
                  {t(
                    "conservation.extinctionDemarcationNote",
                    "Epistemological Demarcation: Deep-time prehistoric fossils are categorized strictly by chronological occurrence and geological horizons. They are never assigned modern IUCN categories."
                  )}
                </span>
              </div>

              {/* Search Bar */}
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  placeholder={t("common.search", "Filter extinct taxa by name, horizon, or formation...")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-white/10 bg-white/[0.03] text-xs text-white placeholder-white/30 focus:outline-none focus:border-sky-500/50"
                />
              </div>

              {/* Extinct Taxa Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredExtinctTaxa.map((profile) => (
                  <div
                    key={profile.taxonId}
                    className="p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-all space-y-3 flex flex-col justify-between"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="text-sm font-bold text-white">
                            {profile.commonName}
                          </div>
                          <div className="text-xs italic text-[var(--text-secondary)] font-serif">
                            {profile.scientificName}
                          </div>
                        </div>

                        {profile.isMassExtinctionVictim ? (
                          <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[10px] font-semibold whitespace-nowrap">
                            Mass Extinction Victim
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full bg-white/10 text-white/60 text-[10px] font-semibold whitespace-nowrap">
                            Lineage Demise / Turnover
                          </span>
                        )}
                      </div>

                      <div className="text-[11px] text-sky-300/90 font-medium">
                        {profile.horizonName} · ~{profile.lastFossilOccurrenceMya} MYA
                      </div>

                      <p className="text-xs text-white/75 leading-relaxed">
                        {profile.significance}
                      </p>

                      <div className="p-2 rounded-lg bg-black/30 border border-white/5 text-[10.5px] text-white/60 space-y-1">
                        <div>
                          <span className="font-semibold text-white/80">Horizon: </span>
                          <span>{profile.lastFossilHorizon}</span>
                        </div>
                        <div>
                          <span className="font-semibold text-white/80">Dating: </span>
                          <span>{profile.datingMethod}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        onClose();
                        onNavigateTaxon(profile.taxonId);
                      }}
                      className="w-full mt-2 py-1.5 px-3 rounded-lg border border-sky-500/30 bg-sky-500/10 hover:bg-sky-500/20 text-sky-300 font-semibold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                    >
                      <span>{t("conservation.dossierLink", "Open Organism Dossier")}</span>
                      <span>→</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 3: MODERN IUCN CONSERVATION STATUS                   */}
          {/* ======================================================== */}
          {activeTab === "modern" && (
            <div className="space-y-5 animate-fade-in">
              {/* Epistemological demarcation banner */}
              <div className="p-3 rounded-xl border border-emerald-500/25 bg-emerald-500/[0.05] text-xs text-emerald-300/90 flex items-start gap-2.5">
                <span className="text-base select-none">🛡️</span>
                <span>
                  {t(
                    "conservation.modernDemarcationNote",
                    "All modern conservation ratings are derived directly from the official IUCN Red List of Threatened Species (v2024-2). Provenance and assessment years are strictly recorded."
                  )}
                </span>
              </div>

              {/* IUCN Category Filter Pills */}
              <div className="flex flex-wrap items-center gap-1.5">
                {(["ALL", "CR", "EN", "VU", "NT", "LC", "DD", "NE"] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedIucnFilter(cat)}
                    className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      selectedIucnFilter === cat
                        ? "bg-white text-black shadow-sm"
                        : "bg-white/5 text-white/60 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Modern Taxa Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredModernTaxa.map((modern) => (
                  <div
                    key={modern.taxonId}
                    className="p-4 rounded-xl border border-white/10 bg-white/[0.02] space-y-3 flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-white capitalize">
                          {modern.taxonId.replace("-", " ")}
                        </span>
                        <IUCNStatusPill category={modern.iucnCategory} size="sm" />
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-[11px] p-2 rounded-lg bg-black/20 border border-white/5">
                        <div>
                          <span className="text-[var(--text-tertiary)] block">Trend</span>
                          <span className="text-white/90 font-medium capitalize">
                            {modern.populationTrend}
                          </span>
                        </div>
                        <div>
                          <span className="text-[var(--text-tertiary)] block">Assessed</span>
                          <span className="text-white/90 font-medium">
                            {modern.assessmentYear}
                          </span>
                        </div>
                      </div>

                      <p className="text-xs text-white/75 leading-relaxed font-light">
                        {modern.threatSummary}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        onClose();
                        onNavigateTaxon(modern.taxonId);
                      }}
                      className="w-full mt-2 py-1.5 px-3 rounded-lg border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 font-semibold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                    >
                      <span>{t("conservation.dossierLink", "Open Organism Dossier")}</span>
                      <span>→</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
