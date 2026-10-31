// ============================================================
// Tree of Life — Scientific Evidence & Confidence Data Model
// Milestone 1: Reusable Claim-Level Scientific Provenance
// ============================================================

/**
 * Standardized evidence categories.
 * Designed as an open union type to allow future evolutionary categories
 * (e.g., comparative_genomics, paleoclimate_proxy) without architectural rewrites.
 */
export type EvidenceCategory =
  | "fossil"                  // Fossil Record (stratigraphic macro/microfossils)
  | "molecular_clock"         // Molecular Clock (calibrated divergence models)
  | "geochemical_biomarkers"  // Geochemical Biomarkers (chemical fossils, isotope ratios, steranes)
  | "hypothesis"              // Scientific Hypothesis (active debate, competing models)
  | "phylogenomic_inference"  // Phylogenomic Inference (homology matrix & tree topology)
  | "comparative_anatomy";    // Comparative Anatomy & Synapomorphies

/**
 * Verification state for individual bibliographic sources.
 * A reference may ONLY be marked "verified" when its DOI and substantive relevance
 * have been genuinely inspected.
 */
export type ReferenceVerificationStatus = "verified" | "unverified";

/**
 * Overarching epistemological verification status for a scientific claim.
 */
export type ClaimVerificationStatus =
  | "verified"      // Empirically substantiated with verified peer-reviewed literature
  | "provisional"   // Well-supported working model pending full bibliographic audit
  | "under_review"; // Active debate or preliminary finding requiring deeper citation check

/**
 * Individual peer-reviewed publication or authoritative museum specimen record.
 */
export interface ScientificReference {
  id: string;
  authors: string[];
  year?: number;
  title: string;
  journalOrPublisher: string;
  doi?: string; // Canonical digital object identifier (e.g., "10.1126/science.aat7228")
  url?: string; // Direct link or open-access resolver
  verificationStatus: ReferenceVerificationStatus;
  /**
   * Explains what was inspected (for verified) or what remains to be checked
   * (for unverified), upholding zero-fabrication standards.
   */
  verificationNotes?: string;
}

/**
 * Core Claim-Level Scientific Evidence Record.
 * Represents a discrete, testable scientific finding rather than an arbitrary score.
 */
export interface ScientificClaim {
  id: string;                       // Stable unique identifier (e.g., "claim-dickinsonia-biomarker")
  taxonIds: string[];               // Related node IDs from data/tree.ts (e.g., ["dickinsonia-costata"])
  statement: string;                // Concise, accurate scientific statement
  category: EvidenceCategory;       // Primary evidentiary category
  explanation: string;              // Detailed supporting explanation of the empirical basis
  references: ScientificReference[];// Associated bibliographic sources
  uncertaintyOrLimitations?: string;// Specific error margins, taphonomic biases, or competing hypotheses
  verificationStatus: ClaimVerificationStatus;
  lastReviewedDate?: string;        // ISO 8601 date (YYYY-MM-DD) when genuinely reviewed
  geologicalFormation?: string;     // Named rock unit (e.g., "Dresser Formation", "Jebel Irhoud")
  specimenIds?: string[];           // Museum or field accession numbers (e.g., ["PIN 3993/632"])
}

/**
 * Filter and query parameters for scientific claims.
 */
export interface ClaimFilterOptions {
  taxonId?: string;
  category?: EvidenceCategory;
  verificationStatus?: ClaimVerificationStatus;
}

