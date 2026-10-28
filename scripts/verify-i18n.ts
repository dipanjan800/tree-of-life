import { SUPPORTED_LOCALES, DEFAULT_LOCALE, type Locale } from "../lib/i18n/config";
import { DICTIONARIES } from "../lib/i18n/translations";
import { searchNodes } from "../lib/tree-utils";
import { ALL_NODES } from "../data/tree";

console.log("=== Tree of Life — Site-Wide Multilingual System Verification Suite ===\n");

let totalPassed = 0;
let totalFailed = 0;

function assert(condition: boolean, msg: string) {
  if (condition) {
    console.log(`  ✓ ${msg}`);
    totalPassed++;
  } else {
    console.error(`  ✗ FAIL: ${msg}`);
    totalFailed++;
  }
}

// [1] Locale Configuration Checks
console.log("[1] Supported Locales Configuration");
const locales: Locale[] = ["en", "bn-IN", "hi-IN", "es", "fr"];
assert(Object.keys(SUPPORTED_LOCALES).length === 5, "Exactly 5 locales configured in SUPPORTED_LOCALES");
locales.forEach((loc) => {
  assert(Boolean(SUPPORTED_LOCALES[loc]), `Locale '${loc}' configured with native name: ${SUPPORTED_LOCALES[loc]?.nativeName}`);
  assert(SUPPORTED_LOCALES[loc]?.dir === "ltr", `Locale '${loc}' text direction is 'ltr'`);
});
assert(DEFAULT_LOCALE === "en", "Default locale is 'en'");

// [2] Dictionary Presence & Loading
console.log("\n[2] Translation Dictionaries Presence");
locales.forEach((loc) => {
  const dict = DICTIONARIES[loc];
  assert(Boolean(dict), `Dictionary for locale '${loc}' loaded successfully`);
  assert(dict.locale === loc, `Dictionary locale matches '${loc}'`);
});

// [3] Taxa Translations & Scientific Invariant Integrity
console.log("\n[3] Taxa Translations Integrity (92 Biological Nodes)");
locales.forEach((loc) => {
  const dict = DICTIONARIES[loc];
  const taxonCount = Object.keys(dict.taxa).length;
  assert(taxonCount === 92, `Locale '${loc}' contains all 92 localized taxa`);

  // Verify key nodes
  const homo = dict.taxa["homo-sapiens"];
  const luca = dict.taxa["luca"];
  const elephant = dict.taxa["loxodonta-africana"];

  assert(Boolean(homo && homo.name && homo.description), `Locale '${loc}': Homo sapiens has localized name '${homo?.name}'`);
  assert(Boolean(luca && luca.name && luca.description), `Locale '${loc}': LUCA has localized name '${luca?.name}'`);
  assert(Boolean(elephant && elephant.name), `Locale '${loc}': Loxodonta africana has localized name '${elephant?.name}'`);
});

// Verify biological nodes in canonical tree remain 92 and untouched
assert(ALL_NODES.length === 92, "Canonical ALL_NODES has exactly 92 biological nodes");

// [4] Story Stages Coverage (8 Stages)
console.log("\n[4] Story Stages Coverage (8 Stages: Stage 0 + Stages 1-7)");
locales.forEach((loc) => {
  const dict = DICTIONARIES[loc];
  const stageCount = Object.keys(dict.storyStages).length;
  assert(stageCount === 8, `Locale '${loc}' contains all 8 localized story stages`);

  const cosmic = dict.storyStages["cosmic-origins"];
  assert(Boolean(cosmic && cosmic.title && cosmic.narrativeParagraphs.length >= 4), `Locale '${loc}': Cosmic Origins stage has title '${cosmic?.title}' and 4 narrative paragraphs`);

  const living = dict.storyStages["living-biosphere"];
  assert(Boolean(living && living.title && living.keyMilestones.length >= 3), `Locale '${loc}': Living Biosphere stage has title '${living?.title}' and ${living?.keyMilestones.length} milestones`);
});

// [5] Prebiotic & Pre-LUCA History (5 Stages)
console.log("\n[5] Prebiotic & Pre-LUCA History Coverage (5 Non-Cladistic Stages)");
locales.forEach((loc) => {
  const dict = DICTIONARIES[loc];
  const prebioticCount = Object.keys(dict.prebioticStages).length;
  assert(prebioticCount === 5, `Locale '${loc}' contains all 5 Pre-LUCA stages`);

  const fuca = dict.prebioticStages["fuca-concept"];
  assert(Boolean(fuca && fuca.title), `Locale '${loc}': FUCA stage localized title '${fuca?.title}'`);
  assert(fuca.title.includes("FUCA"), `Locale '${loc}': FUCA title preserves acronym 'FUCA'`);

  const lucaTransition = dict.prebioticStages["luca-transition"];
  assert(Boolean(lucaTransition && lucaTransition.title), `Locale '${loc}': LUCA transition localized title '${lucaTransition?.title}'`);
});

// [6] UI String Parity Checks
console.log("\n[6] UI String Key Parity Across All 5 Locales");
const referenceUi = DICTIONARIES.en.ui;
const uiCategories = Object.keys(referenceUi) as (keyof typeof referenceUi)[];

locales.forEach((loc) => {
  const dictUi = DICTIONARIES[loc].ui;
  uiCategories.forEach((cat) => {
    const refKeys = Object.keys(referenceUi[cat]);
    const targetKeys = Object.keys(dictUi[cat]);
    const missing = refKeys.filter((k) => !(k in (dictUi[cat] as Record<string, string>)));
    assert(missing.length === 0, `Locale '${loc}' category '${cat}' has 100% key parity (${targetKeys.length}/${refKeys.length} keys)`);
  });
});

// [7] Multilingual Search Verification
console.log("\n[7] Multilingual Search Functionality");
// English search
const enResults = searchNodes("Human", 5, DICTIONARIES.en.taxa);
assert(enResults[0]?.node.id === "homo-sapiens", "English search 'Human' finds Homo sapiens");

// Bengali search
const bnResults = searchNodes("মানুষ", 5, DICTIONARIES["bn-IN"].taxa);
assert(bnResults[0]?.node.id === "homo-sapiens", "Bengali search 'মানুষ' finds Homo sapiens");

const bnTigerResults = searchNodes("বাঘ", 5, DICTIONARIES["bn-IN"].taxa);
assert(bnTigerResults[0]?.node.id === "tiger", "Bengali search 'বাঘ' finds Panthera tigris");

// Hindi search
const hiResults = searchNodes("मानव", 5, DICTIONARIES["hi-IN"].taxa);
assert(hiResults[0]?.node.id === "homo-sapiens", "Hindi search 'मानव' finds Homo sapiens");

const hiElephantResults = searchNodes("हाथी", 5, DICTIONARIES["hi-IN"].taxa);
assert(Boolean(hiElephantResults.some((r) => r.node.id.includes("eleph") || r.node.id.includes("loxodonta"))), "Hindi search 'हाथी' finds Elephantidae");

// Spanish search
const esResults = searchNodes("ballena", 5, DICTIONARIES.es.taxa);
assert(Boolean(esResults.some((r) => r.node.id === "cetacea")), "Spanish search 'ballena' finds Cetacea");

// French search
const frResults = searchNodes("chauve-souris", 5, DICTIONARIES.fr.taxa);
assert(Boolean(frResults.some((r) => r.node.id === "chiroptera")), "French search 'chauve-souris' finds Chiroptera");

// Latin scientific name invariant search
const sciResults = searchNodes("Archaeopteryx lithographica", 5, DICTIONARIES["bn-IN"].taxa);
assert(sciResults[0]?.node.id === "archaeopteryx-lithographica", "Latin scientific search works in Bengali context");

// Node ID search
const idResults = searchNodes("tiktaalik-roseae", 5, DICTIONARIES["hi-IN"].taxa);
assert(idResults[0]?.node.id === "tiktaalik-roseae", "Node ID search 'tiktaalik-roseae' works in Hindi context");

// [8] Summary
console.log("\n=======================================================");
console.log(`TOTAL CHECKS: ${totalPassed + totalFailed} | PASSED: ${totalPassed} | FAILED: ${totalFailed}`);
if (totalFailed === 0) {
  console.log("ALL MULTILINGUAL SYSTEM VERIFICATION CHECKS PASSED 100%!");
} else {
  console.error("SOME CHECKS FAILED!");
  process.exit(1);
}
console.log("=======================================================");
