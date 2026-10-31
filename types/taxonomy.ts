// ============================================================
// Tree of Life — Taxonomy Type Definitions
// Phase 1: Mock data types, architected for real API integration
// ============================================================

export type TaxonomicRank =
  | "root"
  | "domain"
  | "kingdom"
  | "phylum"
  | "subphylum"
  | "class"
  | "infraclass"
  | "order"
  | "family"
  | "genus"
  | "species"
  | "group"; // catch-all for informal groupings
export type Organism = "living" | "extinct" | "unknown";

export type EvidenceType =
  | "fossil"
  | "molecular_clock"
  | "phylogenomic_inference"
  | "hypothesis";

export interface AdmixtureEvent {
  targetTaxonId: string;
  targetTaxonName: string;
  percentageRange: string;
  period: string;
  geography: string;
  significance: string;
}

export interface VisualAsset {
  id: string;
  url: string;
  altText: string;
  caption?: string;
  sourceName: string;
  sourceUrl: string;
  license:
    | "Public Domain"
    | "CC0"
    | "CC-BY-4.0"
    | "CC-BY-SA-4.0"
    | "CC-BY-SA-3.0"
    | "Open Access Educational";
  authorCredit: string;
  isReconstruction: boolean;
}

export interface TaxonNode {
  id: string;
  parentId: string | null;
  name: string;
  scientificName?: string;
  rank: TaxonomicRank;
  estimatedOrigin?: string;   // e.g., "3.8 BYA", "66 MYA"
  estimatedOriginMya?: number; // millions of years ago (positive = past)
  status?: Organism;
  imageUrl?: string;
  visualAsset?: VisualAsset;
  description?: string;
  evidenceType?: EvidenceType;
  confidenceNotes?: string;
  extinctionDateMya?: number;
  admixtureEvents?: AdmixtureEvent[];
  // Associated scientific claims (Milestone 1)
  claimIds?: string[];
  // child IDs — populated by layout engine, not raw data
  childIds?: string[];
  // display metadata
  colorHue?: number; // HSL hue for the clade color accent
  iconEmoji?: string; // optional emoji for quick identification
}

// Computed layout position for each node
export interface TaxonLayoutNode extends TaxonNode {
  x: number; // SVG x coordinate
  y: number; // SVG y coordinate
  depth: number;
  isLeaf: boolean;
  ancestorIds: string[];
}

// The complete tree state
export interface TreeData {
  nodes: Record<string, TaxonNode>;
  rootId: string;
}

// Viewport transform state
export interface ViewportTransform {
  x: number;
  y: number;
  scale: number;
}

// Search result
export interface SearchResult {
  node: TaxonNode;
  matchScore: number;
  matchFields: string[];
}
