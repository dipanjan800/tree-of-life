// ============================================================
// Tree of Life — Conservation & Extinction Domain Types
// Milestone 3: Mass Extinctions, Extinct Species & IUCN Red List
// Strict Epistemological Demarcation:
// Deep-time geological extinction is NEVER conflated with
// modern anthropogenic extinction or IUCN categories.
// ============================================================

export type IUCNCategory =
  | "EX" // Extinct (modern historical post-1500 CE)
  | "EW" // Extinct in the Wild
  | "CR" // Critically Endangered
  | "EN" // Endangered
  | "VU" // Vulnerable
  | "NT" // Near Threatened
  | "LC" // Least Concern
  | "DD" // Data Deficient
  | "NE"; // Not Evaluated

export type PopulationTrend = "increasing" | "decreasing" | "stable" | "unknown";

export type ThreatCategory =
  | "habitat_loss"
  | "climate_change"
  | "overexploitation"
  | "invasive_species"
  | "pollution"
  | "disease"
  | "human_conflict";

export interface ModernConservationData {
  taxonId: string;
  iucnCategory: IUCNCategory;
  categoryName: string;
  assessmentYear: number;
  populationTrend: PopulationTrend;
  geographicRange: string;
  threats: ThreatCategory[];
  threatSummary: string;
  conservationActions: string[];
  iucnTaxonId?: number;
  iucnAssessmentUrl?: string;
  authorityProvenance: string; // e.g. "IUCN Red List of Threatened Species 2024-2"
  lastVerifiedDate: string; // ISO format "2024-08-01"
}

export type MassExtinctionId =
  | "ordovician_silurian"
  | "late_devonian"
  | "permian_triassic"
  | "triassic_jurassic"
  | "cretaceous_paleogene";

export interface MassExtinctionEvent {
  id: MassExtinctionId;
  name: string;
  geologicalBoundary: string;
  ageMya: number;
  ageRange: string; // e.g. "~445.2–443.8 MYA"
  estimatedLossGeneraPercent: string; // e.g. "~57% of marine genera"
  estimatedLossSpeciesPercent: string; // e.g. "~85% of marine species"
  environmentalMechanisms: string[];
  primaryTriggers: string[];
  affectedGroups: string[];
  survivingRadiations: string[];
  uncertaintyNotes: string;
  peerReviewedReferences: Array<{
    citation: string;
    doi?: string;
    year: number;
  }>;
}

export interface DeepTimeExtinctionProfile {
  taxonId: string;
  scientificName: string;
  commonName: string;
  massExtinctionEventId?: MassExtinctionId;
  horizonName: string; // e.g. "K-Pg Boundary", "Late Devonian Frasnian–Famennian", "Quaternary Megafaunal Extinction"
  lastFossilOccurrenceMya: number;
  lastFossilHorizon: string; // e.g. "Hell Creek Formation, Montana (66.043 ± 0.043 MYA)"
  datingMethod: string; // e.g. "40Ar/39Ar high-precision radio-isotopic tephra dating"
  extinctionMechanisms: string[];
  significance: string;
  isMassExtinctionVictim: boolean;
  scientificUncertainty: string;
  fossilSpecimenReference?: string;
}

export type ConservationViewMode =
  | "all"
  | "mass_extinction"
  | "threatened_modern"
  | "relict_lineages";

