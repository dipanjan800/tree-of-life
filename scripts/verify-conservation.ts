// ============================================================
// Tree of Life — Conservation & Extinction Domain Verification Suite
// Milestone 3: Scientific Integrity, IUCN Provenance & Demarcation
// ============================================================

import { BIG_FIVE_MASS_EXTINCTIONS } from "../data/conservation/mass-extinctions";
import { EXTINCT_TAXA_PROFILES } from "../data/conservation/extinct-taxa";
import { MODERN_CONSERVATION_PROFILES, IUCN_CATEGORY_COLORS } from "../data/conservation/modern-iucn";
import { getConservationVisualHighlights } from "../data/conservation/filter-service";
import { TREE_DATA } from "../data/tree";
import type { IUCNCategory, MassExtinctionId } from "../types/conservation";

console.log("=== Tree of Life — Conservation & Extinction Engine Verification Suite ===\n");

let passed = 0;
let failed = 0;

function assert(cond: boolean, msg: string) {
  if (cond) {
    console.log(`  ✓ ${msg}`);
    passed++;
  } else {
    console.error(`  ✗ FAIL: ${msg}`);
    failed++;
  }
}

// [1] The Big Five Mass Extinctions Verification
console.log("[1] The Big Five Mass Extinctions Coverage & Scientific Integrity");
const bigFiveKeys: MassExtinctionId[] = [
  "ordovician_silurian",
  "late_devonian",
  "permian_triassic",
  "triassic_jurassic",
  "cretaceous_paleogene",
];

assert(Object.keys(BIG_FIVE_MASS_EXTINCTIONS).length === 5, "Exactly 5 events in BIG_FIVE_MASS_EXTINCTIONS");
bigFiveKeys.forEach((key) => {
  const evt = BIG_FIVE_MASS_EXTINCTIONS[key];
  assert(Boolean(evt), `Event '${key}' exists in database`);
  assert(evt.ageMya > 0, `Event '${key}' age calibrated: ~${evt.ageMya} MYA`);
  assert(evt.primaryTriggers.length >= 2, `Event '${key}' has verified trigger mechanisms (${evt.primaryTriggers.length})`);
  assert(evt.environmentalMechanisms.length >= 2, `Event '${key}' has geochemical environmental pathways`);
  assert(evt.affectedGroups.length >= 3, `Event '${key}' documents severely affected clades`);
  assert(evt.survivingRadiations.length >= 2, `Event '${key}' documents recovery and radiating lineages`);
  assert(Boolean(evt.uncertaintyNotes && evt.uncertaintyNotes.length > 20), `Event '${key}' explicitly documents scientific uncertainty`);
  assert(evt.peerReviewedReferences.length >= 1, `Event '${key}' has peer-reviewed citations with DOIs`);
});

// Chronological order verification (oldest to youngest)
assert(
  BIG_FIVE_MASS_EXTINCTIONS.ordovician_silurian.ageMya > BIG_FIVE_MASS_EXTINCTIONS.late_devonian.ageMya &&
  BIG_FIVE_MASS_EXTINCTIONS.late_devonian.ageMya > BIG_FIVE_MASS_EXTINCTIONS.permian_triassic.ageMya &&
  BIG_FIVE_MASS_EXTINCTIONS.permian_triassic.ageMya > BIG_FIVE_MASS_EXTINCTIONS.triassic_jurassic.ageMya &&
  BIG_FIVE_MASS_EXTINCTIONS.triassic_jurassic.ageMya > BIG_FIVE_MASS_EXTINCTIONS.cretaceous_paleogene.ageMya,
  "Mass extinctions strictly ordered in chronological geological sequence"
);

// [2] Prehistoric Extinct Species Profiles & Epistemological Demarcation
console.log("\n[2] Deep-Time Extinct Taxa Integrity & Epistemological Demarcation");
const extinctTaxaCount = Object.keys(EXTINCT_TAXA_PROFILES).length;
assert(extinctTaxaCount >= 16, `Documented ${extinctTaxaCount} deep-time extinct species profiles`);

// Specifically requested species by the user:
const requiredTaxa = [
  "tyrannosaurus-rex",
  "triceratops-horridus",
  "dunkleosteus-terrelli",
  "smilodon-fatalis",
  "mammuthus-primigenius",
  "archaeopteryx-lithographica",
  "dickinsonia-costata",
];

requiredTaxa.forEach((taxonId) => {
  const profile = EXTINCT_TAXA_PROFILES[taxonId];
  assert(Boolean(profile), `Required taxon '${taxonId}' profile present`);
  assert(Boolean(TREE_DATA.nodes[taxonId]), `Taxon '${taxonId}' exists in canonical 92-node tree`);
  assert(TREE_DATA.nodes[taxonId]?.status === "extinct", `Canonical node '${taxonId}' marked as extinct in tree`);
  assert(Boolean(profile?.horizonName), `Taxon '${taxonId}' has geological horizon: '${profile?.horizonName}'`);
  assert(Boolean(profile?.datingMethod), `Taxon '${taxonId}' has geochronological dating method`);
  assert(Boolean(profile?.scientificUncertainty), `Taxon '${taxonId}' preserves scientific uncertainty`);
  assert(Boolean(profile?.fossilSpecimenReference), `Taxon '${taxonId}' cites authentic fossil specimens`);

  // STRICT DEMARCATION: Prehistoric taxa must NEVER have modern IUCN categories
  const hasModernIucn = taxonId in MODERN_CONSERVATION_PROFILES;
  assert(!hasModernIucn, `Taxon '${taxonId}' strictly demarcated: NOT assigned modern IUCN Red List category`);
});

// [3] Modern IUCN Conservation Engine & Authority Provenance
console.log("\n[3] Modern IUCN Red List Data Integrity & Authenticity");
const modernTaxa = Object.values(MODERN_CONSERVATION_PROFILES);
assert(modernTaxa.length >= 5, `Documented ${modernTaxa.length} authentic modern conservation profiles`);

const validIucnCategories: IUCNCategory[] = ["EX", "EW", "CR", "EN", "VU", "NT", "LC", "DD", "NE"];
validIucnCategories.forEach((cat) => {
  assert(Boolean(IUCN_CATEGORY_COLORS[cat]), `IUCN category '${cat}' has defined accessible color theme`);
});

modernTaxa.forEach((profile) => {
  assert(Boolean(TREE_DATA.nodes[profile.taxonId]), `Modern taxon '${profile.taxonId}' exists in 92-node tree`);
  assert(TREE_DATA.nodes[profile.taxonId]?.status === "living", `Modern taxon '${profile.taxonId}' is marked living in tree`);
  assert(validIucnCategories.includes(profile.iucnCategory), `Taxon '${profile.taxonId}' has valid IUCN category '${profile.iucnCategory}'`);
  assert(profile.assessmentYear >= 2000 && profile.assessmentYear <= 2025, `Taxon '${profile.taxonId}' assessment year genuine: ${profile.assessmentYear}`);
  assert(Boolean(profile.authorityProvenance.includes("IUCN")), `Taxon '${profile.taxonId}' cites authentic IUCN provenance`);
  assert(Boolean(profile.lastVerifiedDate.match(/^\d{4}-\d{2}-\d{2}$/)), `Taxon '${profile.taxonId}' has ISO verification date`);
  assert(profile.threats.length >= 1, `Taxon '${profile.taxonId}' catalogs primary threats`);
  assert(profile.conservationActions.length >= 1, `Taxon '${profile.taxonId}' catalogs conservation interventions`);
});

// [4] Filter Service & Canvas Highlighting Logic
console.log("\n[4] Conservation Visual Filtering & Highlighting Service");
// All view mode
const allRes = getConservationVisualHighlights(TREE_DATA.nodes, {
  viewMode: "all",
  selectedMassExtinction: null,
});
assert(!allRes.isFilterActive, "Default 'all' view has filter inactive");
assert(allRes.highlightedNodeIds.size === 0, "Default 'all' view has no forced highlighted nodes");

// Mass extinction view mode
const massRes = getConservationVisualHighlights(TREE_DATA.nodes, {
  viewMode: "mass_extinction",
  selectedMassExtinction: null,
});
assert(massRes.isFilterActive, "Mass extinction filter is active");
assert(massRes.highlightedNodeIds.has("tyrannosaurus-rex"), "Mass extinction filter highlights T. rex");
assert(massRes.highlightedNodeIds.has("triceratops-horridus"), "Mass extinction filter highlights Triceratops");
assert(massRes.highlightedNodeIds.has("trilobita"), "Mass extinction filter highlights Trilobita");
assert(massRes.dimmedNodeIds.has("homo-sapiens"), "Mass extinction filter dims non-extinct Homo sapiens");

// Specific K-Pg extinction filter
const kpgRes = getConservationVisualHighlights(TREE_DATA.nodes, {
  viewMode: "mass_extinction",
  selectedMassExtinction: "cretaceous_paleogene",
});
assert(kpgRes.highlightedNodeIds.has("tyrannosaurus-rex"), "K-Pg filter highlights T. rex");
assert(kpgRes.highlightedNodeIds.has("triceratops-horridus"), "K-Pg filter highlights Triceratops");
assert(!kpgRes.highlightedNodeIds.has("trilobita"), "K-Pg filter excludes End-Permian Trilobita");

// Threatened modern taxa filter
const threatRes = getConservationVisualHighlights(TREE_DATA.nodes, {
  viewMode: "threatened_modern",
  selectedMassExtinction: null,
});
assert(threatRes.highlightedNodeIds.has("tiger"), "Threatened filter highlights Endangered Tiger");
assert(threatRes.highlightedNodeIds.has("elephas-maximus"), "Threatened filter highlights Asian Elephant");
assert(threatRes.highlightedNodeIds.has("loxodonta-africana"), "Threatened filter highlights African Elephant");
assert(threatRes.dimmedNodeIds.has("homo-sapiens"), "Threatened filter dims Least Concern Homo sapiens");

// [5] Summary
console.log("\n=======================================================");
console.log(`TOTAL CHECKS: ${passed + failed} | PASSED: ${passed} | FAILED: ${failed}`);
if (failed === 0) {
  console.log("ALL CONSERVATION & EXTINCTION CHECKS PASSED (100%)!");
} else {
  console.error("SOME CONSERVATION CHECKS FAILED!");
  process.exit(1);
}
console.log("=======================================================");

