// ============================================================
// Tree of Life — Scientific Evidence & Confidence Verification Suite
// Milestone 1 Automated Test & Integrity Audit
// ============================================================

import { getClaimsForTaxon, getClaimsByCategory, getClaimById, getAllClaims } from "../data/evidence/claims";
import { TREE_DATA } from "../data/tree";
import { UI_TRANSLATIONS } from "../lib/i18n/translations/ui";
import { SUPPORTED_LOCALES } from "../lib/i18n/config";
import type { EvidenceCategory } from "../types/evidence";

function assert(condition: boolean, message: string) {
  if (!condition) {
    console.error(`❌ FAIL: ${message}`);
    process.exit(1);
  }
}

console.log("=== Scientific Evidence & Confidence Engine Verification Suite ===\n");

// ── 1. Claim Registry Uniqueness & Structure ─────────────────────
console.log("[1] Claim Registry Integrity & Schema Validation");
const allClaims = getAllClaims();
assert(allClaims.length > 0, "Scientific claims registry must not be empty");
console.log(`    Total registered claims: ${allClaims.length}`);

const claimIds = new Set<string>();
for (const claim of allClaims) {
  assert(!claimIds.has(claim.id), `Duplicate claim ID detected: '${claim.id}'`);
  claimIds.add(claim.id);

  assert(Boolean(claim.statement && claim.statement.trim().length > 10), `Claim '${claim.id}' has missing or trivial statement`);
  assert(Boolean(claim.explanation && claim.explanation.trim().length > 15), `Claim '${claim.id}' has missing or trivial explanation`);
  assert(Array.isArray(claim.taxonIds) && claim.taxonIds.length > 0, `Claim '${claim.id}' must be associated with at least one taxon`);
  assert(Array.isArray(claim.references) && claim.references.length > 0, `Claim '${claim.id}' must contain bibliographic references`);

  // Verify all associated taxon IDs exist in the 92-node biological dataset
  for (const tid of claim.taxonIds) {
    assert(TREE_DATA.nodes[tid] !== undefined, `Claim '${claim.id}' references non-existent taxonId '${tid}' in tree data`);
  }
}
console.log(`    ✓ All ${allClaims.length} claims passed unique ID, structural, and taxon linkage checks`);

// ── 2. Source Validation: Verified vs. Unverified Demarcation ─────
console.log("\n[2] Source Validation (Verified vs. Candidate Demarcation)");
let verifiedRefCount = 0;
let unverifiedRefCount = 0;

for (const claim of allClaims) {
  for (const ref of claim.references) {
    assert(Boolean(ref.id), `Reference in claim '${claim.id}' missing ID`);
    assert(Array.isArray(ref.authors) && ref.authors.length > 0, `Reference '${ref.id}' must list authors`);
    assert(Boolean(ref.title), `Reference '${ref.id}' missing title`);
    assert(Boolean(ref.journalOrPublisher), `Reference '${ref.id}' missing journal/publisher`);

    if (ref.verificationStatus === "verified") {
      verifiedRefCount++;
      assert(Boolean(ref.doi), `Verified reference '${ref.id}' must possess a verified DOI`);
      assert(ref.doi!.startsWith("10."), `Verified reference '${ref.id}' has invalid DOI format: '${ref.doi}'`);
      assert(Boolean(ref.verificationNotes), `Verified reference '${ref.id}' must document verification audit notes`);
    } else if (ref.verificationStatus === "unverified") {
      unverifiedRefCount++;
      assert(
        Boolean(ref.verificationNotes && ref.verificationNotes.trim().length > 10),
        `Unverified reference '${ref.id}' MUST document what remains to be verified`
      );
    }
  }
}

console.log(`    Total bibliographic references audited: ${verifiedRefCount + unverifiedRefCount}`);
console.log(`    - Verified peer-reviewed DOIs: ${verifiedRefCount}`);
console.log(`    - Unverified candidate references: ${unverifiedRefCount}`);
assert(verifiedRefCount >= 6, "Expected at least 6 verified references with valid DOIs");
assert(unverifiedRefCount >= 1, "Expected at least 1 candidate unverified reference illustrating the audit workflow");
console.log("    ✓ Strict separation of verified and unverified sources verified");

// ── 3. Query & Retrieval Logic ───────────────────────────────────
console.log("\n[3] Query & Retrieval Functionality");

// Query by taxon
const homoClaims = getClaimsForTaxon("homo-sapiens");
assert(homoClaims.length >= 2, `Expected at least 2 claims for homo-sapiens (Jebel Irhoud & Neanderthal admixture), got ${homoClaims.length}`);
assert(homoClaims.some(c => c.id === "claim-homo-sapiens-jebel-irhoud"), "Jebel Irhoud claim not found for homo-sapiens");
assert(homoClaims.some(c => c.id === "claim-neanderthal-human-admixture"), "Neanderthal admixture claim not found for homo-sapiens");
console.log(`    ✓ homo-sapiens claims query returned ${homoClaims.length} records`);

const dickinsoniaClaims = getClaimsForTaxon("dickinsonia-costata");
assert(dickinsoniaClaims.length >= 1, `Expected claim for dickinsonia-costata, got ${dickinsoniaClaims.length}`);
assert(dickinsoniaClaims[0].id === "claim-dickinsonia-biomarker-steranes", "Dickinsonia sterane claim missing");
console.log("    ✓ dickinsonia-costata biomarker claim query verified");

const tiktaalikClaims = getClaimsForTaxon("tiktaalik-roseae");
assert(tiktaalikClaims.length >= 1, `Expected claim for tiktaalik-roseae, got ${tiktaalikClaims.length}`);
assert(tiktaalikClaims[0].category === "fossil", "Tiktaalik claim should be categorized as 'fossil'");
console.log("    ✓ tiktaalik-roseae transitional fossil claim verified");

// Empty state query check
const emptyTaxonClaims = getClaimsForTaxon("unknown-taxon-placeholder");
assert(emptyTaxonClaims.length === 0, "Expected empty array for non-existent or un-cataloged taxon");
console.log("    ✓ Empty state returns empty array cleanly without throwing or fabricating claims");

// Query by category
const fossilClaims = getClaimsByCategory("fossil");
assert(fossilClaims.length >= 3, `Expected at least 3 fossil claims, got ${fossilClaims.length}`);
const biomarkerClaims = getClaimsByCategory("geochemical_biomarkers");
assert(biomarkerClaims.length >= 1, `Expected at least 1 geochemical biomarker claim, got ${biomarkerClaims.length}`);
console.log(`    ✓ Category filtering verified: ${fossilClaims.length} fossil, ${biomarkerClaims.length} geochemical biomarker claims`);

// Query by ID
const specificClaim = getClaimById("claim-dickinsonia-biomarker-steranes");
assert(specificClaim !== undefined, "Failed to retrieve claim by ID");
assert(specificClaim?.id === "claim-dickinsonia-biomarker-steranes", "Claim ID mismatch");
console.log("    ✓ Direct getClaimById lookup verified");

// ── 4. Internationalization Key Parity ───────────────────────────
console.log("\n[4] Localization & Key Parity Audit (All 5 Supported Locales)");
const requiredEvidenceCategories: EvidenceCategory[] = [
  "fossil",
  "molecular_clock",
  "geochemical_biomarkers",
  "hypothesis",
  "phylogenomic_inference",
  "comparative_anatomy",
];

const requiredStringKeys = [
  "modalTitle",
  "modalSubtitle",
  "viewEvidenceBtn",
  "viewEvidenceCount",
  "closeBtn",
  "emptyTitle",
  "emptyDescription",
  "claimHeadline",
  "evidenceCategory",
  "uncertaintyTitle",
  "formationTitle",
  "specimensTitle",
  "referencesTitle",
  "verifiedSource",
  "unverifiedSource",
  "underReview",
  "verifiedClaim",
  "lastReviewed",
  "doiLabel",
];

for (const locale of Object.values(SUPPORTED_LOCALES)) {
  const dict = UI_TRANSLATIONS[locale.code];
  assert(dict !== undefined, `Dictionary for locale '${locale.code}' not found`);
  assert(dict.evidenceInspector !== undefined, `evidenceInspector missing in locale '${locale.code}'`);

  for (const key of requiredStringKeys) {
    const val = (dict.evidenceInspector as Record<string, unknown>)[key];
    assert(Boolean(val && typeof val === "string" && val.trim().length > 0), `Key '${key}' missing or empty in locale '${locale.code}'`);
  }

  for (const cat of requiredEvidenceCategories) {
    const catLabel = dict.evidenceInspector.categories[cat];
    assert(Boolean(catLabel && catLabel.trim().length > 0), `Category '${cat}' missing or empty in locale '${locale.code}'`);
  }

  console.log(`    ✓ Locale '${locale.code}' (${locale.name}) has 100% string and category parity`);
}

console.log("\n=======================================================");
console.log("ALL SCIENTIFIC EVIDENCE ENGINE CHECKS PASSED (100%)!");
console.log("=======================================================");
