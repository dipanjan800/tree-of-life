"use client";

import React, { useState } from "react";
import type { TaxonNode } from "@/types/taxonomy";
import type { ScientificClaim } from "@/types/evidence";
import { useLanguage } from "@/lib/i18n";
import ClaimCard from "@/components/evidence/ClaimCard";
import MissingDataIndicator from "./MissingDataIndicator";

interface EvidenceTabProps {
  node: TaxonNode;
  claims: ScientificClaim[];
  accentColor?: string;
  onOpenInspectorModal?: () => void;
}

export default function EvidenceTab({
  node,
  claims,
  onOpenInspectorModal,
}: EvidenceTabProps) {
  const { t, ui } = useLanguage();
  const [filterCategory, setFilterCategory] = useState<string>("all");

  const categories = Array.from(new Set(claims.map((c) => c.category)));
  const filteredClaims =
    filterCategory === "all" ? claims : claims.filter((c) => c.category === filterCategory);

  return (
    <div className="space-y-5 p-5 animate-fade-in">
      {/* Header and Inspector Button */}
      <div className="flex items-center justify-between gap-3 pb-3 border-b border-white/10">
        <div>
          <h4 className="text-[11px] font-bold tracking-widest text-[var(--text-tertiary)] uppercase">
            {t("taxonPanel.scientificBasis", "Scientific Evidence")}
          </h4>
          <p className="text-xs text-white/50 mt-0.5">
            {claims.length} {t("taxonPanel.claimsCataloged", "claim records cataloged for this taxon")}
          </p>
        </div>

        {onOpenInspectorModal && (
          <button
            onClick={onOpenInspectorModal}
            className="px-3 py-1.5 rounded-lg bg-sky-500/20 hover:bg-sky-500/30 border border-sky-500/40 text-sky-300 font-semibold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <span>🔬</span>
            <span>{t("evidenceInspector.modalTitle", "Full Inspector")}</span>
          </button>
        )}
      </div>

      {/* Category Pills if multiple */}
      {categories.length > 1 && (
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          <button
            onClick={() => setFilterCategory("all")}
            className={`px-2.5 py-1 rounded text-xs font-medium cursor-pointer transition-colors ${
              filterCategory === "all"
                ? "bg-white/15 text-white"
                : "text-white/50 hover:text-white/80 hover:bg-white/5"
            }`}
          >
            {t("common.all", "All")} ({claims.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-2.5 py-1 rounded text-xs font-medium cursor-pointer transition-colors whitespace-nowrap ${
                filterCategory === cat
                  ? "bg-sky-500/20 text-sky-300 border border-sky-500/30"
                  : "text-white/50 hover:text-white/80 hover:bg-white/5"
              }`}
            >
              {ui.evidenceInspector.categories[cat] || cat}
            </button>
          ))}
        </div>
      )}

      {/* Linked Claim Cards */}
      {filteredClaims.length > 0 ? (
        <div className="space-y-4">
          {filteredClaims.map((claim) => (
            <ClaimCard key={claim.id} claim={claim} />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          <MissingDataIndicator
            field={t("taxonPanel.scientificBasis", "Scientific Basis")}
            reason={t(
              "evidenceInspector.emptyDescription",
              "No granular peer-reviewed claim records have been cataloged for this specific taxon yet. Its phylogenetic placement and dating derive from the curated master evolutionary dataset."
            )}
          />
          {node.confidenceNotes && (
            <div className="p-3.5 rounded-lg border border-white/10 bg-white/[0.02] text-xs text-white/80 leading-relaxed">
              <span className="text-[10px] uppercase font-bold tracking-wider text-white/40 block mb-1">
                {t("taxonPanel.confidenceNoteTitle", "Scientific Consensus Note")}
              </span>
              {node.confidenceNotes}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
