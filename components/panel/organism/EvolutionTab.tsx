"use client";

import React from "react";
import type { TaxonNode } from "@/types/taxonomy";
import type { OrganismDossier } from "@/types/dossier";
import { TREE_DATA } from "@/data/tree";
import { getNodeAccentColor } from "@/lib/tree-utils";
import { useLanguage } from "@/lib/i18n";
import TaxonIcon from "@/components/ui/TaxonIcon";

interface EvolutionTabProps {
  node: TaxonNode;
  dossier: OrganismDossier | null;
  onNavigate: (nodeId: string) => void;
  onOpenPreLuca?: () => void;
  accentColor?: string;
}

export default function EvolutionTab({
  node,
  dossier,
  onNavigate,
  onOpenPreLuca,
}: EvolutionTabProps) {
  const { t, localizeTaxon } = useLanguage();

  const parentNode = node.parentId ? TREE_DATA.nodes[node.parentId] : null;
  const childrenNodes =
    node.childIds?.map((id) => TREE_DATA.nodes[id]).filter((n): n is TaxonNode => Boolean(n)) ?? [];

  // Sibling taxa sharing the same parent
  const siblingNodes = parentNode
    ? (parentNode.childIds ?? [])
        .filter((id) => id !== node.id)
        .map((id) => TREE_DATA.nodes[id])
        .filter((n): n is TaxonNode => Boolean(n))
    : [];

  const innovations = dossier?.innovations ?? [];

  return (
    <div className="space-y-5 p-5 animate-fade-in">
      {/* Key Evolutionary Innovations (Synapomorphies) */}
      <div>
        <h4 className="text-[11px] font-bold tracking-widest text-[var(--text-tertiary)] uppercase mb-2">
          {t("taxonPanel.evolutionaryInnovations", "Key Evolutionary Innovations")}
        </h4>
        {innovations.length > 0 ? (
          <ul className="space-y-2">
            {innovations.map((item, idx) => (
              <li
                key={idx}
                className="p-3 rounded-lg border border-sky-500/20 bg-sky-500/[0.04] text-xs text-white/80 leading-relaxed flex items-start gap-2.5"
              >
                <span className="text-sky-400 font-bold select-none shrink-0 mt-0.5">✦</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="p-3 rounded-lg border border-white/5 bg-white/[0.02] text-xs text-white/40 italic">
            {t(
              "taxonPanel.noInnovationsCataloged",
              "Synapomorphies and derived character states currently undergoing cladistic codification."
            )}
          </div>
        )}
      </div>

      {/* Immediate Ancestral Lineage */}
      <div>
        <h4 className="text-[11px] font-bold tracking-widest text-[var(--text-tertiary)] uppercase mb-2">
          {t("taxonPanel.immediateAncestor", "Ancestral Placement")}
        </h4>
        {parentNode ? (
          <button
            onClick={() => onNavigate(parentNode.id)}
            className="w-full p-3 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/20 transition-all flex items-center justify-between text-left cursor-pointer group"
          >
            <div className="flex items-center gap-3 min-w-0">
              <TaxonIcon node={parentNode} size={20} />
              <div className="min-w-0">
                <div className="text-[10px] font-bold uppercase tracking-wider text-white/40">
                  {t("taxonPanel.directAncestor", "Parent Taxon")} · {parentNode.rank}
                </div>
                <div className="text-sm font-semibold text-white group-hover:text-sky-300 transition-colors truncate">
                  {localizeTaxon(parentNode)?.name || parentNode.name}
                </div>
              </div>
            </div>
            <span className="text-white/40 group-hover:text-white transition-colors shrink-0 text-xs">
              →
            </span>
          </button>
        ) : (
          <div className="p-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-xs text-emerald-300 flex items-center justify-between">
            <span>{t("taxonPanel.noParent", "Basal root of the biological tree (LUCA).")}</span>
            {onOpenPreLuca && (
              <button
                onClick={onOpenPreLuca}
                className="px-2.5 py-1 rounded bg-emerald-500/20 hover:bg-emerald-500/30 font-semibold cursor-pointer text-[11px]"
              >
                {t("taxonPanel.exploreAntecedents", "Pre-LUCA History ✨")}
              </button>
            )}
          </div>
        )}
      </div>

      {/* Sister Taxa / Neighboring Clades */}
      {siblingNodes.length > 0 && (
        <div>
          <h4 className="text-[11px] font-bold tracking-widest text-[var(--text-tertiary)] uppercase mb-2">
            {t("taxonPanel.sisterTaxaTitle", "Neighbouring Lineages (Sister Clades)")}
          </h4>
          <div className="grid grid-cols-1 gap-1.5">
            {siblingNodes.map((sibling) => {
              const sibAccent = getNodeAccentColor(sibling);
              const loc = localizeTaxon(sibling);
              return (
                <button
                  key={sibling.id}
                  onClick={() => onNavigate(sibling.id)}
                  className="p-2.5 rounded-lg border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/15 transition-all flex items-center justify-between text-left cursor-pointer group"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ background: sibAccent }}
                      aria-hidden="true"
                    />
                    <span className="text-xs text-white/80 group-hover:text-white font-medium truncate">
                      {loc?.name || sibling.name}
                    </span>
                  </div>
                  <span className="text-[10px] text-white/40 uppercase font-semibold shrink-0">
                    {sibling.rank}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Descendant Radiation */}
      <div>
        <h4 className="text-[11px] font-bold tracking-widest text-[var(--text-tertiary)] uppercase mb-2">
          {t("taxonPanel.descendantRadiation", "Descendant Radiations")}
        </h4>
        {childrenNodes.length > 0 ? (
          <div className="grid grid-cols-1 gap-1.5">
            {childrenNodes.map((child) => {
              const childAccent = getNodeAccentColor(child);
              const loc = localizeTaxon(child);
              return (
                <button
                  key={child.id}
                  onClick={() => onNavigate(child.id)}
                  className="p-2.5 rounded-lg border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/15 transition-all flex items-center justify-between text-left cursor-pointer group"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ background: childAccent }}
                      aria-hidden="true"
                    />
                    <div className="min-w-0">
                      <span className="text-xs text-white/80 group-hover:text-white font-medium block truncate">
                        {loc?.name || child.name}
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] text-white/40 uppercase font-semibold shrink-0">
                    {child.rank}
                  </span>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="p-3 rounded-lg border border-white/5 bg-white/[0.02] text-xs text-white/40 italic">
            {t("taxonPanel.noChildren", "Terminal branch — no further descendants in current dataset.")}
          </div>
        )}
      </div>

      {/* Reticulate Admixture Events */}
      {node.admixtureEvents && node.admixtureEvents.length > 0 && (
        <div>
          <h4 className="text-[11px] font-bold tracking-widest text-amber-400 uppercase mb-2">
            {t("taxonPanel.ancientAdmixtureTitle", "Ancient Admixture & Gene Flow")}
          </h4>
          <div className="space-y-2">
            {node.admixtureEvents.map((evt, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-lg border border-amber-500/20 bg-amber-500/[0.04] space-y-1.5 text-xs"
              >
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => onNavigate(evt.targetTaxonId)}
                    className="font-semibold text-amber-300 hover:underline cursor-pointer"
                  >
                    {evt.targetTaxonName} →
                  </button>
                  <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-200 font-bold text-[10px]">
                    {evt.percentageRange}
                  </span>
                </div>
                <div className="text-white/50 text-[11px]">
                  {evt.period} · {evt.geography}
                </div>
                <p className="text-white/80 leading-relaxed">{evt.significance}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
