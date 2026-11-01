"use client";

import React from "react";
import type { ModernConservationData } from "@/types/conservation";
import IUCNStatusPill from "./IUCNStatusPill";
import { useLanguage } from "@/lib/i18n";

interface ConservationDetailCardProps {
  data: ModernConservationData;
}

export default function ConservationDetailCard({ data }: ConservationDetailCardProps) {
  const { ui, t } = useLanguage();

  const trendLabel =
    ui.conservation?.trends?.[data.populationTrend] || data.populationTrend;

  const trendIcon = {
    increasing: "↗",
    decreasing: "↘",
    stable: "→",
    unknown: "?",
  }[data.populationTrend];

  const trendColor = {
    increasing: "text-emerald-400",
    decreasing: "text-rose-400",
    stable: "text-sky-400",
    unknown: "text-neutral-400",
  }[data.populationTrend];

  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-4 text-xs">
      {/* Header with authentic IUCN Pill */}
      <div className="flex items-center justify-between border-b border-white/5 pb-3">
        <div className="space-y-0.5">
          <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-tertiary)]">
            {t("conservation.modernTitle", "IUCN Red List Conservation Status")}
          </div>
          <div className="text-white font-semibold text-sm">
            {data.categoryName}
          </div>
        </div>
        <IUCNStatusPill category={data.iucnCategory} size="md" />
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-3">
        <div className="p-2.5 rounded-lg border border-white/5 bg-black/20">
          <span className="text-[10px] uppercase font-semibold text-[var(--text-tertiary)] block mb-1">
            {t("conservation.populationTrend", "Population Trend")}
          </span>
          <span className={`font-semibold flex items-center gap-1 ${trendColor}`}>
            <span>{trendIcon}</span>
            <span>{trendLabel}</span>
          </span>
        </div>

        <div className="p-2.5 rounded-lg border border-white/5 bg-black/20">
          <span className="text-[10px] uppercase font-semibold text-[var(--text-tertiary)] block mb-1">
            {t("conservation.assessmentYear", "Assessment Year")}
          </span>
          <span className="font-semibold text-white/90">
            {data.assessmentYear}
          </span>
        </div>
      </div>

      {/* Geographic Range */}
      <div>
        <span className="text-[10px] uppercase font-bold tracking-wider text-[var(--text-tertiary)] block mb-1">
          {t("conservation.geographicRange", "Geographic Range")}
        </span>
        <p className="text-white/80 leading-relaxed font-light bg-black/10 p-2.5 rounded-lg border border-white/5">
          {data.geographicRange}
        </p>
      </div>

      {/* Threat Summary & Badges */}
      <div>
        <span className="text-[10px] uppercase font-bold tracking-wider text-[var(--text-tertiary)] block mb-1.5">
          {t("conservation.primaryThreats", "Key Anthropogenic Threats")}
        </span>
        <div className="flex flex-wrap gap-1.5 mb-2">
          {data.threats.map((threat) => {
            const label = ui.conservation?.threatCategories?.[threat] || threat;
            return (
              <span
                key={threat}
                className="px-2 py-0.5 rounded-md bg-rose-500/10 text-rose-300 border border-rose-500/20 text-[10.5px]"
              >
                {label}
              </span>
            );
          })}
        </div>
        <p className="text-white/75 leading-relaxed italic text-[11.5px]">
          {data.threatSummary}
        </p>
      </div>

      {/* Conservation Actions */}
      {data.conservationActions && data.conservationActions.length > 0 && (
        <div>
          <span className="text-[10px] uppercase font-bold tracking-wider text-[var(--text-tertiary)] block mb-1.5">
            {t("conservation.conservationActions", "Active Interventions")}
          </span>
          <ul className="space-y-1.5">
            {data.conservationActions.map((action, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2 p-2 rounded-lg bg-emerald-500/[0.04] border border-emerald-500/15 text-emerald-200/90 text-[11px]"
              >
                <span className="text-emerald-400 select-none font-bold mt-0.5">✓</span>
                <span>{action}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Strict Provenance Footer */}
      <div className="pt-2 border-t border-white/5 flex flex-wrap items-center justify-between gap-2 text-[10.5px] text-[var(--text-tertiary)]">
        <span>{data.authorityProvenance}</span>
        {data.iucnAssessmentUrl && (
          <a
            href={data.iucnAssessmentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sky-400 hover:text-sky-300 hover:underline inline-flex items-center gap-1 font-medium"
          >
            <span>{t("conservation.iucnProfileLink", "IUCN Assessment")}</span>
            <span aria-hidden="true">↗</span>
          </a>
        )}
      </div>
    </div>
  );
}

