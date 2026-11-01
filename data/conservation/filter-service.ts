// ============================================================
// Tree of Life — Conservation & Extinction Filter Service
// Computes active highlights and dimming states for the Tree Canvas
// based on selected conservation view modes and mass extinction filters.
// ============================================================

import type { TaxonNode } from "@/types/taxonomy";
import type { ConservationViewMode, MassExtinctionId } from "@/types/conservation";
import { EXTINCT_TAXA_PROFILES } from "./extinct-taxa";
import { MODERN_CONSERVATION_PROFILES } from "./modern-iucn";

export interface ConservationFilterState {
  viewMode: ConservationViewMode;
  selectedMassExtinction: MassExtinctionId | null;
}

/**
 * Ancient relict lineages (living fossils) with deep roots and minimal morphology divergence.
 */
export const RELICT_LINEAGES = new Set<string>([
  "porifera",
  "cnidaria",
  "monotremata",
  "sarcopterygii",
  "sharks",
  "cyanobacteria",
  "archaea",
  "ferns",
  "gymnosperms",
]);

/**
 * Computes which taxon nodes should be highlighted or dimmed.
 */
export function getConservationVisualHighlights(
  nodes: Record<string, TaxonNode>,
  state: ConservationFilterState
): {
  highlightedNodeIds: Set<string>;
  dimmedNodeIds: Set<string>;
  isFilterActive: boolean;
} {
  const { viewMode, selectedMassExtinction } = state;
  const isFilterActive = viewMode !== "all" || selectedMassExtinction !== null;

  if (!isFilterActive) {
    return {
      highlightedNodeIds: new Set<string>(),
      dimmedNodeIds: new Set<string>(),
      isFilterActive: false,
    };
  }

  const highlighted = new Set<string>();

  if (selectedMassExtinction) {
    // Highlight all taxa terminated by this specific mass extinction
    Object.values(EXTINCT_TAXA_PROFILES).forEach((profile) => {
      if (profile.massExtinctionEventId === selectedMassExtinction) {
        highlighted.add(profile.taxonId);
      }
    });
  } else if (viewMode === "mass_extinction") {
    // Highlight all confirmed mass extinction victims
    Object.values(EXTINCT_TAXA_PROFILES).forEach((profile) => {
      if (profile.isMassExtinctionVictim) {
        highlighted.add(profile.taxonId);
      }
    });
  } else if (viewMode === "threatened_modern") {
    // Highlight modern taxa with CR, EN, or VU status
    Object.values(MODERN_CONSERVATION_PROFILES).forEach((profile) => {
      if (["CR", "EN", "VU"].includes(profile.iucnCategory)) {
        highlighted.add(profile.taxonId);
      }
    });
  } else if (viewMode === "relict_lineages") {
    // Highlight ancient lineages with living representatives
    RELICT_LINEAGES.forEach((id) => {
      if (nodes[id]) highlighted.add(id);
    });
  }

  // All other nodes are dimmed
  const dimmed = new Set<string>();
  Object.keys(nodes).forEach((id) => {
    if (!highlighted.has(id)) {
      dimmed.add(id);
    }
  });

  return {
    highlightedNodeIds: highlighted,
    dimmedNodeIds: dimmed,
    isFilterActive: true,
  };
}

