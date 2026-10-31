// ============================================================
// Tree of Life — Organism Dossier Type Definitions
// Milestone 2: Premium Organism Detail Experience
// ============================================================

/**
 * Standardized morphological trait category.
 */
export type MorphologyCategory =
  | "skeletal"
  | "integument"
  | "cranial"
  | "dentition"
  | "locomotion"
  | "cellular"
  | "metabolic"
  | "reproductive";

export interface MorphologicalTrait {
  category: MorphologyCategory;
  trait: string;
  isAutapomorphy?: boolean; // Unique derived novelty / diagnostic feature
}

export interface MorphologyProfile {
  bodyPlan?: string;
  distinguishingFeatures?: string[];
  adaptations?: string[];
  sexualDimorphism?: string; // Documented only when scientifically recorded
  traits?: MorphologicalTrait[];
}

export interface StratigraphicRange {
  fadMya: number;
  ladMya?: number;
  eon: string;
  era: string;
  period: string;
  epoch?: string;
  icsStage?: string;
  datingMethod?: "radiometric" | "thermoluminescence" | "biostratigraphy" | "molecular_clock" | "stratigraphic_correlation";
  datingUncertainty?: string;
}

export interface PaleoecologyProfile {
  habitat: string;
  trophicLevel?: "primary_producer" | "herbivore" | "carnivore" | "apex_predator" | "filter_feeder" | "detritivore" | "chemosynthetic" | "omnivore";
  paleoEnvironment?: string;
  paleoContinentOrRegion?: string;
}

export interface HolotypeSpecimenRecord {
  catalogNumber: string; // Accession / specimen ID, e.g. "PIN 3993/632", "MB.Av.100"
  museumOrRepository: string; // Institution, e.g. "Museum für Naturkunde, Berlin"
  locationCityCountry: string; // e.g. "Berlin, Germany"
  discoveryYear?: number;
  typeLocality?: string; // Geographic rock formation locality
  discoveryNotes?: string;
}

export interface OrganismDossier {
  taxonId: string;
  morphology?: MorphologyProfile;
  stratigraphy?: StratigraphicRange;
  ecology?: PaleoecologyProfile;
  specimens?: HolotypeSpecimenRecord[];
  innovations?: string[]; // Key evolutionary novelties (synapomorphies)
}

