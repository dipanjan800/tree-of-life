"use client";

import React from "react";
import type { TaxonNode } from "@/types/taxonomy";
import { TREE_DATA } from "@/data/tree";
import { useLanguage } from "@/lib/i18n";

interface ClassificationTabProps {
  node: TaxonNode;
  onNavigate: (nodeId: string) => void;
  accentColor?: string;
}

interface LinnaeanRankDisplay {
  key: string;
  label: string;
  node: TaxonNode | null;
}

export default function ClassificationTab({
  node,
  onNavigate,
}: ClassificationTabProps) {
  const { t, localizeTaxon, ui } = useLanguage();

  // Reconstruct full lineage chain from root to this node
  const lineageChain: TaxonNode[] = [];
  let curr: TaxonNode | null = node;
  while (curr) {
    lineageChain.unshift(curr);
    if (!curr.parentId) break;
    curr = TREE_DATA.nodes[curr.parentId] ?? null;
  }

  // Major 8 Linnaean ranks requested in Milestone 2
  const standardRanks = [
    { rank: "domain", label: t("ranks.domain", "Domain") },
    { rank: "kingdom", label: t("ranks.kingdom", "Kingdom") },
    { rank: "phylum", label: t("ranks.phylum", "Phylum") },
    { rank: "class", label: t("ranks.class", "Class") },
    { rank: "order", label: t("ranks.order", "Order") },
    { rank: "family", label: t("ranks.family", "Family") },
    { rank: "genus", label: t("ranks.genus", "Genus") },
    { rank: "species", label: t("ranks.species", "Species") },
  ];

  // Map lineage nodes to their corresponding Linnaean slots
  const mappedRanks: LinnaeanRankDisplay[] = standardRanks.map(({ rank, label }) => {
    // Find node in lineage chain matching this rank
    const match = lineageChain.find((n) => n.rank === rank) ?? null;
    return {
      key: rank,
      label,
      node: match,
    };
  });

  return (
    <div className="space-y-5 p-5 animate-fade-in">
      {/* Editorial intro */}
      <div>
        <h4 className="text-[11px] font-bold tracking-widest text-[var(--text-tertiary)] uppercase mb-1">
          {t("taxonPanel.linnaeanHierarchy", "Linnaean Taxonomic Hierarchy")}
        </h4>
        <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
          {t(
            "taxonPanel.linnaeanExplanation",
            "Displaying scientifically supported classification levels based on phylogenomic and morphological consensus."
          )}
        </p>
      </div>

      {/* 8-Tier Linnaean Ladder */}
      <div className="rounded-xl border border-white/10 bg-white/[0.02] divide-y divide-white/5 overflow-hidden">
        {mappedRanks.map((slot) => {
          const isTargetNode = slot.node?.id === node.id;
          const locNode = slot.node ? localizeTaxon(slot.node) : null;
          const nodeName = locNode?.name || slot.node?.name;
          const sciName = slot.node?.scientificName;

          return (
            <div
              key={slot.key}
              className={`p-3 flex items-center justify-between gap-3 text-xs transition-colors ${
                isTargetNode ? "bg-[rgba(61,142,248,0.15)]" : ""
              }`}
            >
              <div className="w-24 shrink-0">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                  {slot.label}
                </span>
              </div>

              <div className="flex-1 min-w-0 text-right">
                {slot.node ? (
                  <button
                    onClick={() => slot.node && !isTargetNode && onNavigate(slot.node.id)}
                    disabled={isTargetNode}
                    className={`inline-flex flex-col items-end text-left transition-all ${
                      isTargetNode
                        ? "cursor-default text-sky-400 font-semibold"
                        : "cursor-pointer text-[var(--text-primary)] hover:text-white hover:underline underline-offset-2"
                    }`}
                  >
                    <span className="truncate max-w-[200px] font-semibold text-[13px]">{nodeName}</span>
                    {sciName && sciName !== nodeName && (
                      <span className={`text-[11px] italic tracking-wide truncate max-w-[200px] ${
                        isTargetNode ? "text-sky-200/90" : "text-[var(--text-secondary)]"
                      }`}>
                        {sciName}
                      </span>
                    )}
                  </button>
                ) : (
                  <span className="text-[var(--text-tertiary)] italic text-[11px]">
                    {t("taxonPanel.unrankedIntermediate", "— (unranked / omitted in dataset)")}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Complete Cladistic Trail (including subphyla, groups, etc.) */}
      <div>
        <h4 className="text-[11px] font-bold tracking-widest text-[var(--text-tertiary)] uppercase mb-2">
          {t("taxonPanel.completeCladisticTrail", "Complete Cladistic Lineage")}
        </h4>
        <div className="p-3 rounded-lg border border-white/5 bg-white/[0.015] flex flex-wrap items-center gap-1.5 text-xs text-white/60">
          {lineageChain.map((entry, idx) => {
            const isLast = idx === lineageChain.length - 1;
            const entryLoc = localizeTaxon(entry);
            const entryName = entryLoc?.name || entry.name;
            const entryRank = ui.ranks[entry.rank] || entry.rank;

            return (
              <React.Fragment key={entry.id}>
                {idx > 0 && <span className="text-white/20 select-none">→</span>}
                <button
                  onClick={() => !isLast && onNavigate(entry.id)}
                  disabled={isLast}
                  className={`px-1.5 py-0.5 rounded text-[11px] transition-colors ${
                    isLast
                      ? "bg-sky-500/20 text-sky-300 font-semibold border border-sky-500/30"
                      : "hover:bg-white/10 hover:text-white cursor-pointer"
                  }`}
                  title={`${entryRank}: ${entryName}`}
                >
                  {entryName}
                </button>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}
