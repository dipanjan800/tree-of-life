// ============================================================
// Tree of Life — Modern Conservation Status Dataset
// Authoritative IUCN Red List Evaluations for Extant Taxa
// Ground Truth: IUCN Red List v2024-2.
// Strict Demarcation: Modern IUCN categories are NEVER assigned
// to deep-time prehistoric fossils.
// ============================================================

import type { ModernConservationData, IUCNCategory } from "@/types/conservation";

export const MODERN_CONSERVATION_PROFILES: Record<string, ModernConservationData> = {
  "tiger": {
    taxonId: "tiger",
    iucnCategory: "EN",
    categoryName: "Endangered",
    assessmentYear: 2022,
    populationTrend: "increasing",
    geographicRange: "Fragmented populations in South Asia, Southeast Asia, Russian Far East, and Northeast China",
    threats: ["habitat_loss", "overexploitation", "human_conflict", "climate_change"],
    threatSummary:
      "Intense poaching for illegal skin and bone trade, prey depletion from ungulate hunting, and acute habitat fragmentation across Asian forest corridors.",
    conservationActions: [
      "Targeted protected area enforcement (TX2 global initiative)",
      "Transboundary ecological corridor restoration (Terai Arc Landscape)",
      "Strict international commercial ban under CITES Appendix I",
    ],
    iucnTaxonId: 15955,
    iucnAssessmentUrl: "https://www.iucnredlist.org/species/15955/214862019",
    authorityProvenance: "IUCN Red List of Threatened Species 2022 (Goodrich et al.)",
    lastVerifiedDate: "2024-06-15",
  },

  "elephas-maximus": {
    taxonId: "elephas-maximus",
    iucnCategory: "EN",
    categoryName: "Endangered",
    assessmentYear: 2020,
    populationTrend: "decreasing",
    geographicRange: "Disjunct tropical forest and grassland pockets across 13 range states in South and Southeast Asia",
    threats: ["habitat_loss", "human_conflict", "overexploitation", "invasive_species"],
    threatSummary:
      "Habitat loss and fragmentation driven by agricultural expansion and infrastructure corridors, resulting in lethal human-elephant conflict and retaliatory killings. Poaching for ivory primarily impacts male bulls.",
    conservationActions: [
      "Establishment of designated elephant corridors and highway underpasses",
      "Community-level conflict mitigation (solar fencing and early-warning acoustic sensors)",
      "Protected national parks and elephant reserves (Project Elephant, India)",
    ],
    iucnTaxonId: 7140,
    iucnAssessmentUrl: "https://www.iucnredlist.org/species/7140/45818198",
    authorityProvenance: "IUCN Red List of Threatened Species 2020 (Williams et al.)",
    lastVerifiedDate: "2024-07-10",
  },

  "loxodonta-africana": {
    taxonId: "loxodonta-africana",
    iucnCategory: "EN",
    categoryName: "Endangered",
    assessmentYear: 2021,
    populationTrend: "decreasing",
    geographicRange: "Sub-Saharan Africa across savannas, grasslands, and semi-deserts in 23 countries",
    threats: ["overexploitation", "habitat_loss", "human_conflict", "climate_change"],
    threatSummary:
      "Widespread illegal commercial poaching for ivory ivory cartels, paired with severe habitat conversion into agricultural croplands across East, Central, and West Africa.",
    conservationActions: [
      "Anti-poaching ranger task forces and canine detection units",
      "International ivory trade embargo under CITES CoP resolutions",
      "Transfrontier conservation areas (KAZA TFCA spanning 5 Southern African nations)",
    ],
    iucnTaxonId: 181008073,
    iucnAssessmentUrl: "https://www.iucnredlist.org/species/181008073/204401095",
    authorityProvenance: "IUCN Red List of Threatened Species 2021 (Gobush et al.)",
    lastVerifiedDate: "2024-07-10",
  },

  "lion": {
    taxonId: "lion",
    iucnCategory: "VU",
    categoryName: "Vulnerable",
    assessmentYear: 2023,
    populationTrend: "decreasing",
    geographicRange: "Fragmented sub-Saharan African savannas and relict Asiatic subpopulation in Gir Forest, India",
    threats: ["human_conflict", "habitat_loss", "overexploitation", "disease"],
    threatSummary:
      "Indiscriminate retaliatory poisoning and snaring by livestock pastoralists, depletion of natural ungulate prey populations through the bushmeat trade, and habitat fragmentation.",
    conservationActions: [
      "Community livestock predator-proofing (boma enclosures) and compensation schemes",
      "Establishment of connected wildlife conservancies",
      "Intensive monitoring of the relict Gir Forest Asiatic population (Panthera leo leo)",
    ],
    iucnTaxonId: 15951,
    iucnAssessmentUrl: "https://www.iucnredlist.org/species/15951/223707764",
    authorityProvenance: "IUCN Red List of Threatened Species 2023 (Bauer et al.)",
    lastVerifiedDate: "2024-06-20",
  },

  "homo-sapiens": {
    taxonId: "homo-sapiens",
    iucnCategory: "LC",
    categoryName: "Least Concern",
    assessmentYear: 2008,
    populationTrend: "increasing",
    geographicRange: "Cosmopolitan global distribution across all continents and inhabited landmasses",
    threats: ["climate_change", "pollution"],
    threatSummary:
      "No imminent threat of biological extinction; global population exceeds 8 billion individuals. Major anthropogenic ecological pressures impact the planetary biosphere.",
    conservationActions: [
      "Multilateral United Nations environmental agreements (Paris Agreement, Kunming-Montreal Global Biodiversity Framework)",
      "Global biodiversity preservation treaties",
    ],
    iucnTaxonId: 136584,
    iucnAssessmentUrl: "https://www.iucnredlist.org/species/136584/4313662",
    authorityProvenance: "IUCN Red List of Threatened Species 2008 (Global Mammal Assessment)",
    lastVerifiedDate: "2024-08-01",
  },
};

/**
 * IUCN Category Official Color Specification
 */
export const IUCN_CATEGORY_COLORS: Record<IUCNCategory, { bg: string; text: string; border: string; glow: string }> = {
  EX: { bg: "#000000", text: "#ffffff", border: "#333333", glow: "rgba(255,255,255,0.15)" },
  EW: { bg: "#3c1a47", text: "#e9d5ff", border: "#7e22ce", glow: "rgba(126,34,206,0.3)" },
  CR: { bg: "#7f1d1d", text: "#fecaca", border: "#dc2626", glow: "rgba(220,38,38,0.4)" },
  EN: { bg: "#7c2d12", text: "#fed7aa", border: "#ea580c", glow: "rgba(234,88,12,0.4)" },
  VU: { bg: "#713f12", text: "#fef08a", border: "#ca8a04", glow: "rgba(202,138,4,0.35)" },
  NT: { bg: "#064e3b", text: "#a7f3d0", border: "#059669", glow: "rgba(5,150,105,0.3)" },
  LC: { bg: "#065f46", text: "#6ee7b7", border: "#10b981", glow: "rgba(16,185,129,0.25)" },
  DD: { bg: "#374151", text: "#d1d5db", border: "#6b7280", glow: "rgba(107,114,128,0.2)" },
  NE: { bg: "#1f2937", text: "#9ca3af", border: "#4b5563", glow: "rgba(75,85,99,0.2)" },
};

/**
 * Retrieve modern conservation data for a taxon.
 */
export function getModernConservationData(taxonId: string): ModernConservationData | null {
  return MODERN_CONSERVATION_PROFILES[taxonId] ?? null;
}

