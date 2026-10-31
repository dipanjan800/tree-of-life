"use client";

import React from "react";
import type { TaxonNode } from "@/types/taxonomy";
import type { OrganismDossier } from "@/types/dossier";
import { formatMya } from "@/lib/tree-utils";
import { useLanguage } from "@/lib/i18n";

interface TimelineTabProps {
  node: TaxonNode;
  dossier: OrganismDossier | null;
  accentColor?: string;
}

export default function TimelineTab({
  node,
  dossier,
}: TimelineTabProps) {
  const { t, locale, ui } = useLanguage();
  const strat = dossier?.stratigraphy;

  // Determine chronological endpoints
  const fadMya = strat?.fadMya ?? node.estimatedOriginMya;
  const ladMya = strat?.ladMya ?? (node.status === "living" ? 0 : node.extinctionDateMya);

  // Formatting helper
  const renderDate = (mya?: number) => {
    if (mya === undefined) return t("taxonPanel.unrecordedData", "Unrecorded");
    if (mya === 0) return t("taxonPanel.statusLiving", "Present Day (0 MYA)");
    return formatMya(mya, locale);
  };

  return (
    <div className="space-y-5 p-5 animate-fade-in">
      {/* Visual Stratigraphic Horizon Ladder */}
      <div className="p-4 rounded-xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent space-y-4">
        <h4 className="text-[11px] font-bold tracking-widest text-[var(--text-tertiary)] uppercase">
          {t("taxonPanel.stratigraphicInterval", "Geochronological Range")}
        </h4>

        {/* Dual Horizon Pins */}
        <div className="relative pl-6 space-y-6 before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-gradient-to-b before:from-sky-500 before:to-amber-500">
          {/* First Appearance Datum (FAD) */}
          <div className="relative">
            <div className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-sky-400 ring-4 ring-sky-950" />
            <div className="text-[10px] uppercase font-bold text-sky-400 tracking-wider">
              {t("taxonPanel.firstAppearanceDatum", "First Known Appearance (FAD)")}
            </div>
            <div className="text-base font-bold text-white mt-0.5">
              {renderDate(fadMya)}
            </div>
            <div className="text-xs text-white/50 mt-0.5">
              {node.estimatedOrigin || (fadMya ? `~${fadMya} MYA` : "")}
            </div>
          </div>

          {/* Last Appearance Datum (LAD) */}
          <div className="relative">
            <div
              className={`absolute -left-6 top-1 w-2.5 h-2.5 rounded-full ring-4 ${
                node.status === "living"
                  ? "bg-emerald-400 ring-emerald-950"
                  : "bg-rose-400 ring-rose-950"
              }`}
            />
            <div
              className={`text-[10px] uppercase font-bold tracking-wider ${
                node.status === "living" ? "text-emerald-400" : "text-rose-400"
              }`}
            >
              {node.status === "living"
                ? t("taxonPanel.extantLineage", "Extant Lineage (Living Today)")
                : t("taxonPanel.lastAppearanceDatum", "Last Known Appearance (LAD)")}
            </div>
            <div className="text-base font-bold text-white mt-0.5">
              {renderDate(ladMya)}
            </div>
            <div className="text-xs text-white/50 mt-0.5">
              {node.status === "living"
                ? t("taxonPanel.continuousSurvivingLineage", "Continuous modern branch across biosphere")
                : node.extinctionDateMya
                ? `Extinction boundary ~${node.extinctionDateMya} MYA`
                : t("taxonPanel.deepTimeExtinction", "Extinct in fossil record")}
            </div>
          </div>
        </div>
      </div>

      {/* ICS Chronostratigraphic Hierarchy */}
      <div>
        <h4 className="text-[11px] font-bold tracking-widest text-[var(--text-tertiary)] uppercase mb-2">
          {t("taxonPanel.icsHierarchy", "ICS Chronostratigraphic Placement")}
        </h4>
        <div className="rounded-xl border border-white/10 bg-white/[0.02] divide-y divide-white/5 text-xs">
          <div className="p-3 flex items-center justify-between">
            <span className="text-white/40 uppercase font-semibold text-[10px]">
              {t("taxonPanel.eonLabel", "Eon")}
            </span>
            <span className="text-white/80 font-medium">{strat?.eon || "Phanerozoic"}</span>
          </div>
          <div className="p-3 flex items-center justify-between">
            <span className="text-white/40 uppercase font-semibold text-[10px]">
              {t("taxonPanel.eraLabel", "Era")}
            </span>
            <span className="text-white/80 font-medium">{strat?.era || "—"}</span>
          </div>
          <div className="p-3 flex items-center justify-between">
            <span className="text-white/40 uppercase font-semibold text-[10px]">
              {t("taxonPanel.periodLabel", "Period")}
            </span>
            <span className="text-white/80 font-semibold text-sky-300">
              {strat?.period || "—"}
            </span>
          </div>
          {strat?.epoch && (
            <div className="p-3 flex items-center justify-between">
              <span className="text-white/40 uppercase font-semibold text-[10px]">
                {t("taxonPanel.epochLabel", "Epoch")}
              </span>
              <span className="text-white/80 font-medium">{strat.epoch}</span>
            </div>
          )}
          {strat?.icsStage && (
            <div className="p-3 flex items-center justify-between">
              <span className="text-white/40 uppercase font-semibold text-[10px]">
                {t("taxonPanel.icsStageLabel", "ICS Stage")}
              </span>
              <span className="text-white/80 font-medium">{strat.icsStage}</span>
            </div>
          )}
        </div>
      </div>

      {/* Dating Methodology & Calibration */}
      <div>
        <h4 className="text-[11px] font-bold tracking-widest text-[var(--text-tertiary)] uppercase mb-2">
          {t("taxonPanel.datingMethodology", "Dating Calibration & Precision")}
        </h4>
        <div className="p-3.5 rounded-xl border border-white/10 bg-white/[0.02] space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-white/40 uppercase font-semibold text-[10px]">
              {t("taxonPanel.methodLabel", "Dating Method:")}
            </span>
            <span className="px-2 py-0.5 rounded bg-sky-500/10 text-sky-300 border border-sky-500/20 font-semibold text-[11px]">
              {strat?.datingMethod
                ? strat.datingMethod.replace("_", " ")
                : node.evidenceType
                ? (ui.evidenceTypes[node.evidenceType] || node.evidenceType)
                : t("taxonPanel.phylogeneticInference", "Phylogenetic Inference")}
            </span>
          </div>

          <div>
            <div className="text-[10px] text-white/40 uppercase font-semibold mt-1">
              {t("taxonPanel.uncertaintyAndNotes", "Dating Uncertainty & Margin:")}
            </div>
            <p className="text-white/70 leading-relaxed mt-0.5 italic">
              {strat?.datingUncertainty ||
                node.confidenceNotes ||
                t(
                  "taxonPanel.stratigraphicMarginNote",
                  "Age calibrated according to the International Chronostratigraphic Chart (v2024/05)."
                )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
