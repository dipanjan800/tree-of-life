"use client";

import React from "react";
import { useLanguage } from "@/lib/i18n";

export interface MissingDataIndicatorProps {
  field: string;
  reason?: string;
  className?: string;
}

/**
 * Standardized, transparent missing-data indicator.
 * Displays clear scientific reasons why specific data is not preserved or applicable,
 * upholding the project's zero-fabrication epistemic standards.
 */
export default function MissingDataIndicator({
  field,
  reason,
  className = "",
}: MissingDataIndicatorProps) {
  const { t } = useLanguage();

  return (
    <div
      className={`rounded-lg p-3 border border-dashed border-white/10 bg-white/[0.02] flex items-start gap-2.5 ${className}`}
      role="note"
      aria-label={`${field}: ${reason || t("taxonPanel.unrecordedData", "Data not documented in current dataset")}`}
    >
      <div className="shrink-0 text-amber-400/90 text-xs mt-0.5">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-[11px] font-bold text-[var(--text-secondary)] tracking-wide uppercase">
          {field}
        </div>
        <div className="text-xs text-[var(--text-secondary)] leading-relaxed mt-0.5 italic">
          {reason || t("taxonPanel.unrecordedDescription", "No verified empirical record cataloged in this repository for this specific taxon yet. Inferred phylogenetic placement derives from peer-reviewed cladistic analyses.")}
        </div>
      </div>
    </div>
  );
}

