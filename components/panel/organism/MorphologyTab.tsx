"use client";

import React from "react";
import type { TaxonNode } from "@/types/taxonomy";
import type { OrganismDossier } from "@/types/dossier";
import { useLanguage } from "@/lib/i18n";
import MissingDataIndicator from "./MissingDataIndicator";

interface MorphologyTabProps {
  node: TaxonNode;
  dossier: OrganismDossier | null;
  accentColor?: string;
}

export default function MorphologyTab({
  node,
  dossier,
}: MorphologyTabProps) {
  const { t } = useLanguage();
  const morph = dossier?.morphology;

  return (
    <div className="space-y-5 p-5 animate-fade-in">
      {/* Visual Asset if present */}
      {node.visualAsset && (
        <div className="rounded-xl border border-white/10 overflow-hidden bg-black/40">
          <div className="relative aspect-video w-full flex items-center justify-center bg-black/60 overflow-hidden">
            {/* If SVG or standard asset */}
            <img
              src={node.visualAsset.url}
              alt={node.visualAsset.altText}
              className="max-h-full max-w-full object-contain p-2"
              loading="lazy"
              onError={(e) => {
                // Graceful fallback to SVG placeholder
                e.currentTarget.style.display = "none";
              }}
            />
            {node.visualAsset.isReconstruction && (
              <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/70 backdrop-blur text-[9.5px] font-semibold text-rose-300 border border-rose-500/30">
                {t("taxonPanel.artisticReconstruction", "* Artistic reconstruction (not a photograph)")}
              </span>
            )}
          </div>
          <div className="p-3 border-t border-white/5 text-xs text-white/70 space-y-1">
            <p className="leading-snug">{node.visualAsset.caption || node.visualAsset.altText}</p>
            <div className="flex items-center justify-between text-[10px] text-white/40 pt-1">
              <span>{node.visualAsset.authorCredit}</span>
              <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10">
                {node.visualAsset.license}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Body Plan & Architectural Summary */}
      <div>
        <h4 className="text-[11px] font-bold tracking-widest text-[var(--text-tertiary)] uppercase mb-2">
          {t("taxonPanel.bodyStructureTitle", "Body Plan & Anatomy")}
        </h4>
        {morph?.bodyPlan ? (
          <p className="text-sm text-white/80 leading-relaxed font-light p-3.5 rounded-xl border border-white/10 bg-white/[0.02]">
            {morph.bodyPlan}
          </p>
        ) : (
          <MissingDataIndicator
            field={t("taxonPanel.bodyStructureTitle", "Body Plan & Anatomy")}
            reason={t(
              "taxonPanel.unrecordedMorphology",
              "Soft-tissue anatomical architecture unpreserved in fossil matrix or generalized across higher taxonomic grade."
            )}
          />
        )}
      </div>

      {/* Distinctive Anatomical Characteristics */}
      <div>
        <h4 className="text-[11px] font-bold tracking-widest text-[var(--text-tertiary)] uppercase mb-2">
          {t("taxonPanel.anatomicalCharacteristics", "Distinctive Anatomical Traits")}
        </h4>
        {morph?.distinguishingFeatures && morph.distinguishingFeatures.length > 0 ? (
          <ul className="space-y-2">
            {morph.distinguishingFeatures.map((feat, idx) => (
              <li
                key={idx}
                className="p-3 rounded-lg border border-white/10 bg-white/[0.02] text-xs text-white/85 leading-relaxed flex items-start gap-2.5"
              >
                <span className="text-sky-400 select-none shrink-0 mt-0.5 font-bold">•</span>
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        ) : (
          <MissingDataIndicator
            field={t("taxonPanel.anatomicalCharacteristics", "Distinctive Anatomical Traits")}
            reason={t(
              "taxonPanel.unrecordedTraits",
              "Individual autapomorphic character states not cataloged in current diagnostic monograph."
            )}
          />
        )}
      </div>

      {/* Important Adaptations */}
      {morph?.adaptations && morph.adaptations.length > 0 && (
        <div>
          <h4 className="text-[11px] font-bold tracking-widest text-[var(--text-tertiary)] uppercase mb-2">
            {t("taxonPanel.evolutionaryAdaptations", "Functional Adaptations")}
          </h4>
          <ul className="space-y-2">
            {morph.adaptations.map((adap, idx) => (
              <li
                key={idx}
                className="p-3 rounded-lg border border-emerald-500/20 bg-emerald-500/[0.04] text-xs text-white/85 leading-relaxed flex items-start gap-2.5"
              >
                <span className="text-emerald-400 select-none shrink-0 mt-0.5">✦</span>
                <span>{adap}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Sexual Dimorphism (Documented ONLY when verified) */}
      <div>
        <h4 className="text-[11px] font-bold tracking-widest text-[var(--text-tertiary)] uppercase mb-2">
          {t("taxonPanel.sexualDimorphismTitle", "Sexual Dimorphism")}
        </h4>
        {morph?.sexualDimorphism ? (
          <div className="p-3.5 rounded-lg border border-purple-500/20 bg-purple-500/[0.04] text-xs text-purple-200 leading-relaxed flex items-start gap-2.5">
            <span className="text-purple-400 select-none shrink-0 text-sm">⚥</span>
            <span>{morph.sexualDimorphism}</span>
          </div>
        ) : (
          <div className="p-3 rounded-lg border border-white/5 bg-white/[0.015] text-xs text-white/40 italic">
            {t(
              "taxonPanel.noDimorphismDocumented",
              "No verified skeletal or morphological dimorphism scientifically documented for this taxon (or dimorphism absent/inapplicable)."
            )}
          </div>
        )}
      </div>
    </div>
  );
}
