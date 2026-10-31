"use client";

import React from "react";
import type { TaxonNode } from "@/types/taxonomy";
import type { OrganismDossier } from "@/types/dossier";
import { formatMya } from "@/lib/tree-utils";
import { useLanguage } from "@/lib/i18n";
import MissingDataIndicator from "./MissingDataIndicator";

interface OverviewTabProps {
  node: TaxonNode;
  dossier: OrganismDossier | null;
  displayName: string;
  displayDescription?: string;
  accentColor: string;
  onOpenEvidence?: () => void;
  evidenceCount: number;
}

export default function OverviewTab({
  node,
  dossier,
  displayName,
  displayDescription,
  accentColor,
  onOpenEvidence,
  evidenceCount,
}: OverviewTabProps) {
  const { t, locale, ui } = useLanguage();

  const habitat = dossier?.ecology?.habitat;
  const paleoEnvironment = dossier?.ecology?.paleoEnvironment;
  const paleoRegion = dossier?.ecology?.paleoContinentOrRegion;
  const statusLabel = node.status ? (ui.organismStatus[node.status] || node.status) : null;

  return (
    <div className="space-y-4 p-5 animate-fade-in">
      {/* Museum Nomenclature Plaque */}
      <div className="p-4 rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent relative overflow-hidden">
        <div
          className="absolute top-0 right-0 w-28 h-28 rounded-full pointer-events-none blur-2xl opacity-15"
          style={{ background: accentColor }}
          aria-hidden="true"
        />

        <div className="flex items-baseline justify-between gap-2">
          <span className="text-[10px] font-bold tracking-widest text-[var(--text-tertiary)] uppercase">
            {ui.ranks[node.rank] || node.rank}
          </span>
          {statusLabel && (
            <span
              className={`text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                node.status === "living"
                  ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                  : node.status === "extinct"
                  ? "bg-rose-500/15 text-rose-400 border border-rose-500/30"
                  : "bg-white/10 text-white/70"
              }`}
            >
              {statusLabel}
            </span>
          )}
        </div>

        <h3 className="text-xl font-bold text-white mt-1 leading-tight">
          {displayName}
        </h3>

        {node.scientificName && node.scientificName !== displayName && (
          <p className="text-sm italic text-[var(--text-secondary)] mt-1 tracking-wide">
            {node.scientificName}
          </p>
        )}

        <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-white/10 text-xs">
          <div>
            <div className="text-[10px] text-[var(--text-secondary)] uppercase font-bold tracking-wider">
              {t("taxonPanel.estimatedOrigin", "Estimated Origin")}
            </div>
            <div className="font-semibold text-[var(--text-primary)] mt-0.5">
              {node.estimatedOriginMya !== undefined
                ? formatMya(node.estimatedOriginMya, locale)
                : node.estimatedOrigin || t("taxonPanel.unrecordedData", "Unrecorded")}
            </div>
          </div>
          <div>
            <div className="text-[10px] text-[var(--text-secondary)] uppercase font-bold tracking-wider">
              {t("taxonPanel.extinction", "Status / Horizon")}
            </div>
            <div className="font-semibold text-[var(--text-primary)] mt-0.5">
              {node.status === "extinct"
                ? node.extinctionDateMya !== undefined
                  ? `${formatMya(node.extinctionDateMya, locale)} (†)`
                  : t("taxonPanel.statusExtinct", "Extinct (†)")
                : node.status === "living"
                ? t("taxonPanel.statusLiving", "Extant (Present Day)")
                : t("taxonPanel.statusUnknown", "Unknown")}
            </div>
          </div>
        </div>
      </div>

      {/* Description / Monograph */}
      <div>
        <h4 className="text-[11px] font-bold tracking-widest text-[var(--text-tertiary)] uppercase mb-2">
          {t("taxonPanel.scientificOverview", "Scientific Summary")}
        </h4>
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed font-light">
          {displayDescription || (
            <span className="italic text-white/40">
              {t("taxonPanel.noDescription", "Standard taxonomic description pending editorial accession.")}
            </span>
          )}
        </p>
      </div>

      {/* Habitat & Paleoecology */}
      <div>
        <h4 className="text-[11px] font-bold tracking-widest text-[var(--text-tertiary)] uppercase mb-2">
          {t("taxonPanel.habitatAndEnvironment", "Habitat & Ecology")}
        </h4>
        {habitat || paleoEnvironment || paleoRegion ? (
          <div className="p-3.5 rounded-lg border border-white/10 bg-white/[0.02] space-y-2 text-xs">
            {habitat && (
              <div>
                <span className="text-[var(--text-secondary)] font-medium mr-1.5">
                  {t("taxonPanel.habitatLabel", "Habitat:")}
                </span>
                <span className="text-[var(--text-primary)] leading-normal">{habitat}</span>
              </div>
            )}
            {paleoEnvironment && (
              <div>
                <span className="text-[var(--text-secondary)] font-medium mr-1.5">
                  {t("taxonPanel.paleoEnvironmentLabel", "Paleoenvironment:")}
                </span>
                <span className="text-[var(--text-primary)] leading-normal">{paleoEnvironment}</span>
              </div>
            )}
            {paleoRegion && (
              <div>
                <span className="text-[var(--text-secondary)] font-medium mr-1.5">
                  {t("taxonPanel.geographicRangeLabel", "Paleo-geographic Range:")}
                </span>
                <span className="text-[var(--text-primary)] leading-normal">{paleoRegion}</span>
              </div>
            )}
          </div>
        ) : (
          <MissingDataIndicator
            field={t("taxonPanel.habitatAndEnvironment", "Habitat & Ecology")}
            reason={t(
              "taxonPanel.unrecordedHabitat",
              "Ecological parameters unpreserved or inferred solely through phylogenetic bracketing."
            )}
          />
        )}
      </div>

      {/* Scientific Evidence Quick Access */}
      {evidenceCount > 0 && onOpenEvidence && (
        <div className="p-3.5 rounded-xl border border-[rgba(61,142,248,0.25)] bg-[rgba(61,142,248,0.06)] flex items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="text-[10px] uppercase font-bold text-sky-400 tracking-wider">
              {t("taxonPanel.scientificEvidenceTitle", "Verified Scientific Evidence")}
            </div>
            <div className="text-xs text-white/70 mt-0.5 truncate">
              {evidenceCount} {t("taxonPanel.claimsCataloged", "claim records with peer-reviewed DOIs")}
            </div>
          </div>
          <button
            onClick={onOpenEvidence}
            className="shrink-0 px-3 py-1.5 rounded-md bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 text-xs font-semibold border border-sky-400/30 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <span aria-hidden="true">🔬</span>
            <span>{t("evidenceInspector.viewEvidenceBtn", "Inspect Evidence")}</span>
          </button>
        </div>
      )}
    </div>
  );
}

