"use client";

import React from "react";
import type { TaxonNode } from "@/types/taxonomy";
import type { OrganismDossier } from "@/types/dossier";
import { useLanguage } from "@/lib/i18n";
import MissingDataIndicator from "./MissingDataIndicator";

interface SpecimensTabProps {
  node?: TaxonNode;
  dossier: OrganismDossier | null;
  accentColor?: string;
}

export default function SpecimensTab({
  dossier,
}: SpecimensTabProps) {
  const { t } = useLanguage();
  const specimens = dossier?.specimens ?? [];

  return (
    <div className="space-y-5 p-5 animate-fade-in">
      {/* Editorial intro */}
      <div>
        <h4 className="text-[11px] font-bold tracking-widest text-[var(--text-tertiary)] uppercase mb-1">
          {t("taxonPanel.holotypesAndFossils", "Fossils & Museum Holotypes")}
        </h4>
        <p className="text-xs text-white/50 leading-relaxed">
          {t(
            "taxonPanel.specimensIntro",
            "Documented physical type specimens, fossil accessions, and museum repository provenance. Unverified artifacts are excluded."
          )}
        </p>
      </div>

      {/* Museum Specimen Accession Cards */}
      {specimens.length > 0 ? (
        <div className="space-y-3.5">
          {specimens.map((specimen, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.03] to-transparent space-y-2.5"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="text-[10px] uppercase font-bold tracking-wider text-sky-400">
                    {t("taxonPanel.catalogNumberLabel", "Accession Identifier")}
                  </div>
                  <h5 className="text-sm font-bold text-white mt-0.5">
                    {specimen.catalogNumber}
                  </h5>
                </div>
                {specimen.discoveryYear && (
                  <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-semibold text-white/70">
                    {t("taxonPanel.discoveredLabel", "Discovered")} {specimen.discoveryYear}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 gap-1 text-xs">
                <div>
                  <span className="text-[var(--text-secondary)] font-medium mr-1.5">
                    {t("taxonPanel.repositoryLabel", "Repository:")}
                  </span>
                  <span className="text-[var(--text-primary)] font-medium">{specimen.museumOrRepository}</span>
                </div>
                <div>
                  <span className="text-[var(--text-secondary)] font-medium mr-1.5">
                    {t("taxonPanel.locationLabel", "Location:")}
                  </span>
                  <span className="text-[var(--text-primary)]">{specimen.locationCityCountry}</span>
                </div>
                {specimen.typeLocality && (
                  <div>
                    <span className="text-[var(--text-secondary)] font-medium mr-1.5">
                      {t("taxonPanel.typeLocalityLabel", "Geological Locality:")}
                    </span>
                    <span className="text-[var(--text-primary)] italic">{specimen.typeLocality}</span>
                  </div>
                )}
              </div>

              {specimen.discoveryNotes && (
                <p className="text-xs text-white/75 leading-relaxed pt-2 border-t border-white/5">
                  {specimen.discoveryNotes}
                </p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <MissingDataIndicator
          field={t("taxonPanel.holotypesAndFossils", "Fossils & Museum Holotypes")}
          reason={t(
            "taxonPanel.noSpecimensCataloged",
            "No holotype catalog numbers or museum accession records cataloged in this repository for this specific taxon yet. Deep lineage inferred from comparative cladistics."
          )}
        />
      )}
    </div>
  );
}
