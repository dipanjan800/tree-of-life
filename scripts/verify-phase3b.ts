import { TREE_DATA, ALL_NODES } from "../data/tree";
import { computeTreeLayout, getTreeBounds } from "../lib/tree-layout";
import { searchNodes, getRankDisplay } from "../lib/tree-utils";

function assert(condition: boolean, message: string) {
  if (!condition) {
    console.error(`FAIL: ${message}`);
    process.exit(1);
  }
}

console.log("=== Phase 3B Algorithmic & Scientific Verification Suite ===\n");

// 1. Node Count Check
const nodeCount = Object.keys(TREE_DATA.nodes).length;
console.log(`[1] Total Node Count: ${nodeCount}`);
assert(nodeCount === 92, `Expected exactly 92 nodes (90 + 2 Elephantidae enrichment), got ${nodeCount}`);
assert(ALL_NODES.length === 92, `Expected ALL_NODES length to be 92, got ${ALL_NODES.length}`);
console.log("    ✓ Node count verified: 92 nodes");

// 2. Single Root Check
console.log("\n[2] Single Root Verification");
assert(TREE_DATA.rootId === "luca", `Root ID must be 'luca', got '${TREE_DATA.rootId}'`);
const roots = Object.values(TREE_DATA.nodes).filter(n => n.parentId === null);
assert(roots.length === 1, `Expected exactly 1 root node with null parent, found ${roots.length}`);
assert(roots[0].id === "luca", `Root node must be 'luca'`);
console.log("    ✓ Single root confirmed: 'luca'");

// 3. Parent-Child Bi-directional Integrity
console.log("\n[3] Parent-Child Reference Integrity");
for (const [id, node] of Object.entries(TREE_DATA.nodes)) {
  if (node.parentId !== null) {
    const parent = TREE_DATA.nodes[node.parentId];
    assert(parent !== undefined, `Node '${id}' has missing parent '${node.parentId}'`);
    assert(
      (parent.childIds ?? []).includes(id),
      `Parent '${node.parentId}' does not list child '${id}' in childIds`
    );
  }
  for (const childId of (node.childIds ?? [])) {
    const child = TREE_DATA.nodes[childId];
    assert(child !== undefined, `Node '${id}' lists non-existent child '${childId}'`);
    assert(
      child.parentId === id,
      `Child '${childId}' has parentId '${child.parentId}', expected '${id}'`
    );
  }
}
console.log("    ✓ All 92 nodes have verified bidirectional parent-child references");

// 4. Cycle Detection & Reachability
console.log("\n[4] Cycle Detection & Reachability");
const visited = new Set<string>();
function traverse(nodeId: string, path: string[]) {
  if (path.includes(nodeId)) {
    throw new Error(`Cycle detected: ${path.join(" -> ")} -> ${nodeId}`);
  }
  visited.add(nodeId);
  const node = TREE_DATA.nodes[nodeId];
  for (const childId of (node.childIds ?? [])) {
    traverse(childId, [...path, nodeId]);
  }
}
traverse("luca", []);
assert(visited.size === nodeCount, `Reachable nodes (${visited.size}) != Total nodes (${nodeCount})`);
console.log(`    ✓ Zero cycles detected; all ${visited.size} nodes reachable from 'luca'`);

// 5. Part 1: Sarcopterygii, Tetrapoda & Tiktaalik Placement
console.log("\n[5] Part 1: Sarcopterygii, Tetrapoda & Tiktaalik Placement");

// 5.1 Sarcopterygii Clade
const sarcopterygii = TREE_DATA.nodes["sarcopterygii"];
assert(sarcopterygii !== undefined, "sarcopterygii must exist");
assert(sarcopterygii.parentId === "vertebrata", `sarcopterygii parent must be 'vertebrata', got '${sarcopterygii.parentId}'`);
assert(sarcopterygii.rank === "class", `sarcopterygii rank must be 'class', got '${sarcopterygii.rank}'`);
assert(sarcopterygii.estimatedOriginMya === 420, "sarcopterygii estimatedOriginMya must be 420");
console.log("    ✓ Sarcopterygii (Lobe-finned vertebrates) established under Vertebrata (~420 MYA)");

// 5.2 Tiktaalik Placement under Sarcopterygii & Epistemic Qualification
const tiktaalik = TREE_DATA.nodes["tiktaalik-roseae"];
assert(tiktaalik !== undefined, "tiktaalik-roseae must exist");
assert(tiktaalik.parentId === "sarcopterygii", `tiktaalik-roseae parent must be 'sarcopterygii', got '${tiktaalik.parentId}'`);
assert(Boolean(tiktaalik.confidenceNotes?.includes("Zachelmie") && tiktaalik.confidenceNotes?.includes("trace-fossil")), "tiktaalik confidenceNotes must qualify Zachelmie as trace-fossil evidence");
assert(Boolean(tiktaalik.confidenceNotes?.includes("elpistostegalian stem-tetrapodomorph")), "tiktaalik confidenceNotes must identify elpistostegalian stem-tetrapodomorph grade");
assert(Boolean(tiktaalik.description?.includes("elpistostegalian stem-tetrapodomorph")), "tiktaalik description must identify elpistostegalian stem-tetrapodomorph");
console.log("    ✓ Tiktaalik placed as stem-tetrapod under Sarcopterygii; transitional elpistostegalian grade and trace-fossil evidence qualified");

// 5.3 Tetrapoda Clade
const tetrapoda = TREE_DATA.nodes["tetrapoda"];
assert(tetrapoda !== undefined, "tetrapoda must exist");
assert(tetrapoda.parentId === "sarcopterygii", `tetrapoda parent must be 'sarcopterygii', got '${tetrapoda.parentId}'`);
assert(tetrapoda.estimatedOriginMya === 370, "tetrapoda estimatedOriginMya must be 370");
console.log("    ✓ Tetrapoda established under Sarcopterygii (~370 MYA)");

// 5.4 Vertebrata, Fish, and Tetrapod Descendants
const vertebrata = TREE_DATA.nodes["vertebrata"];
assert(vertebrata.rank === "subphylum", `vertebrata rank must be 'subphylum', got '${vertebrata.rank}'`);
assert(vertebrata.estimatedOriginMya === 535, `vertebrata estimatedOriginMya must be 535, got ${vertebrata.estimatedOriginMya}`);
const fish = TREE_DATA.nodes["fish"];
assert(fish.rank === "group", `fish rank must be 'group', got '${fish.rank}'`);
assert(fish.scientificName === "Pisces (non-tetrapod vertebrates)", `fish scientificName must be 'Pisces (non-tetrapod vertebrates)', got '${fish.scientificName}'`);
assert(fish.estimatedOriginMya === 525, `fish estimatedOriginMya must be 525, got ${fish.estimatedOriginMya}`);

const amphibia = TREE_DATA.nodes["amphibia"];
const reptilia = TREE_DATA.nodes["reptilia"];
const dinosauria = TREE_DATA.nodes["dinosauria"];
const aves = TREE_DATA.nodes["aves"];
const synapsida = TREE_DATA.nodes["synapsida"];

assert(amphibia?.parentId === "tetrapoda", `amphibia parent must be 'tetrapoda', got '${amphibia?.parentId}'`);
assert(reptilia?.parentId === "tetrapoda", `reptilia parent must be 'tetrapoda', got '${reptilia?.parentId}'`);
assert(synapsida?.parentId === "tetrapoda", `synapsida parent must be 'tetrapoda', got '${synapsida?.parentId}'`);
assert(synapsida?.rank === "group", `synapsida rank must be 'group', got '${synapsida?.rank}'`);

// Cladistic correction: Aves is nested within Dinosauria, which is nested within Reptilia
assert(dinosauria?.parentId === "reptilia", `dinosauria parent must be 'reptilia', got '${dinosauria?.parentId}'`);
assert(dinosauria?.rank === "group", `dinosauria rank must be 'group', got '${dinosauria?.rank}'`);
assert(dinosauria?.status === "living", "dinosauria status must be 'living' (persisting via living birds)");
assert(aves?.parentId === "dinosauria", `aves parent must be 'dinosauria', got '${aves?.parentId}'`);

assert((vertebrata.childIds ?? []).includes("fish"), "vertebrata must parent 'fish'");
assert((vertebrata.childIds ?? []).includes("sarcopterygii"), "vertebrata must parent 'sarcopterygii'");
assert(!(vertebrata.childIds ?? []).includes("amphibia"), "vertebrata must no longer directly parent 'amphibia'");
assert(!(vertebrata.childIds ?? []).includes("tiktaalik-roseae"), "vertebrata must no longer directly parent 'tiktaalik-roseae'");
assert(!(tetrapoda.childIds ?? []).includes("aves"), "tetrapoda must not directly parent 'aves'; aves is nested within dinosauria");
console.log("    ✓ Cladistic hierarchy verified: Tetrapoda -> Reptilia -> Dinosauria -> Aves");

// 5.5 Archaeopteryx qualification
const archaeopteryx = TREE_DATA.nodes["archaeopteryx-lithographica"];
assert(archaeopteryx?.parentId === "dinosauria", `archaeopteryx parent must be 'dinosauria', got '${archaeopteryx?.parentId}'`);
assert(Boolean(archaeopteryx?.confidenceNotes?.includes("stem-avialan")), "archaeopteryx confidenceNotes must state stem-avialan transitional status");
console.log("    ✓ Archaeopteryx confirmed as stem-avialan transitional grade under Dinosauria");

// 6. Part 2: Proboscidea & Elephantidae Hierarchy
console.log("\n[6] Part 2: Proboscidea -> Elephantidae -> Mammuthus, Elephas & Loxodonta Hierarchy");

const proboscidea = TREE_DATA.nodes["proboscidea"];
const elephantidae = TREE_DATA.nodes["elephantidae"];
const mammuthus = TREE_DATA.nodes["mammuthus"];
const mammoth = TREE_DATA.nodes["mammuthus-primigenius"];
const elephas = TREE_DATA.nodes["elephas"];
const asianElephant = TREE_DATA.nodes["elephas-maximus"];
const loxodonta = TREE_DATA.nodes["loxodonta"];
const africanElephant = TREE_DATA.nodes["loxodonta-africana"];

assert(proboscidea?.parentId === "placentalia", `proboscidea parent must be 'placentalia', got '${proboscidea?.parentId}'`);
assert(elephantidae !== undefined, "elephantidae must exist");
assert(elephantidae.parentId === "proboscidea", `elephantidae parent must be 'proboscidea', got '${elephantidae.parentId}'`);
assert(elephantidae.rank === "family", `elephantidae rank must be 'family', got '${elephantidae.rank}'`);
assert(elephantidae.estimatedOriginMya === 8.0, "elephantidae origin must be ~8.0 MYA");

assert(mammuthus !== undefined, "mammuthus genus must exist");
assert(mammuthus.parentId === "elephantidae", `mammuthus parent must be 'elephantidae', got '${mammuthus.parentId}'`);
assert(mammuthus.rank === "genus", `mammuthus rank must be 'genus', got '${mammuthus.rank}'`);
assert(mammuthus.estimatedOriginMya === 5.0, "mammuthus origin must be ~5.0 MYA");
assert(mammoth?.parentId === "mammuthus", `mammuthus-primigenius parent must be 'mammuthus', got '${mammoth?.parentId}'`);

assert(elephas !== undefined, "elephas genus must exist");
assert(elephas.parentId === "elephantidae", `elephas parent must be 'elephantidae', got '${elephas.parentId}'`);
assert(elephas.rank === "genus", `elephas rank must be 'genus', got '${elephas.rank}'`);
assert(elephas.estimatedOriginMya === 5.5, "elephas origin must be ~5.5 MYA");

assert(asianElephant !== undefined, "elephas-maximus must exist");
assert(asianElephant.parentId === "elephas", `elephas-maximus parent must be 'elephas', got '${asianElephant.parentId}'`);
assert(asianElephant.rank === "species", `elephas-maximus rank must be 'species', got '${asianElephant.rank}'`);
assert(asianElephant.status === "living", "elephas-maximus status must be 'living'");
assert(asianElephant.estimatedOriginMya === 0.8, `elephas-maximus origin must be 0.8 MYA (~0.6-1.0 MYA), got ${asianElephant.estimatedOriginMya}`);

// Loxodonta enrichment checks
assert(loxodonta !== undefined, "loxodonta genus must exist");
assert(loxodonta.parentId === "elephantidae", `loxodonta parent must be 'elephantidae', got '${loxodonta.parentId}'`);
assert(loxodonta.rank === "genus", `loxodonta rank must be 'genus', got '${loxodonta.rank}'`);
assert(loxodonta.estimatedOriginMya === 7.6, "loxodonta origin must be ~7.6 MYA");

assert(africanElephant !== undefined, "loxodonta-africana must exist");
assert(africanElephant.parentId === "loxodonta", `loxodonta-africana parent must be 'loxodonta', got '${africanElephant.parentId}'`);
assert(africanElephant.rank === "species", `loxodonta-africana rank must be 'species', got '${africanElephant.rank}'`);
assert(africanElephant.status === "living", "loxodonta-africana status must be 'living'");

console.log("    ✓ Full Proboscidea hierarchy verified: placentalia -> proboscidea -> elephantidae -> { mammuthus -> woolly mammoth, elephas -> asian elephant, loxodonta -> african bush elephant }");

// 7. Layout Geometry Verification
console.log("\n[7] Layout Geometry Verification");
const layoutNodes = computeTreeLayout(TREE_DATA);
assert(layoutNodes.size === 92, `Layout nodes count (${layoutNodes.size}) != 92`);

for (const [id, lNode] of layoutNodes.entries()) {
  assert(!isNaN(lNode.x) && !isNaN(lNode.y), `Node '${id}' has NaN coordinates: (${lNode.x}, ${lNode.y})`);
  if (lNode.parentId) {
    const parentLayout = layoutNodes.get(lNode.parentId)!;
    assert(lNode.x > parentLayout.x, `Child '${id}' x (${lNode.x}) not strictly greater than parent x (${parentLayout.x})`);
  }
}
const bounds = getTreeBounds(layoutNodes);
assert(bounds.width > 0 && bounds.height > 0, "Tree bounds must have positive dimensions");
console.log(`    ✓ Reingold-Tilford layout verified: width=${bounds.width}px, height=${bounds.height}px, minX=${bounds.minX}, maxX=${bounds.maxX}`);

// 8. Search Test for Corrected and Enriched Taxa
console.log("\n[8] Search Test");
const searchQueries = [
  "Birds",
  "Archaeopteryx",
  "Dinosaurs",
  "Tiktaalik",
  "Sarcopterygii",
  "Tetrapod",
  "Fish",
  "Proboscidea",
  "Elephantidae",
  "Woolly Mammoth",
  "Asian Elephant",
  "African Elephant",
  "Loxodonta"
];

for (const q of searchQueries) {
  const res = searchNodes(q);
  assert(res.length > 0, `Search for '${q}' returned 0 results`);
  console.log(`    ✓ Search '${q}' -> top hit: "${res[0].node.name}" (${res[0].node.scientificName}) [Rank: ${getRankDisplay(res[0].node.rank)}]`);
}

// 9. Timeline Synchronization & Chronological Invariants
console.log("\n[9] Timeline Synchronization & Chronological Invariants");
for (const node of ALL_NODES) {
  assert(typeof node.estimatedOriginMya === "number", `Node '${node.id}' missing valid origin Mya`);
  assert((node.estimatedOriginMya ?? 0) >= 0, `Node '${node.id}' origin Mya cannot be negative`);
  if (node.status === "extinct" && node.extinctionDateMya !== undefined) {
    assert(node.extinctionDateMya >= 0, `Node '${node.id}' extinction Mya cannot be negative`);
    assert(node.extinctionDateMya <= (node.estimatedOriginMya ?? 0), `Node '${node.id}' extinction Mya (${node.extinctionDateMya}) must be <= origin Mya (${node.estimatedOriginMya})`);
  }
  if (node.parentId) {
    const parent = TREE_DATA.nodes[node.parentId];
    if (parent && parent.estimatedOriginMya !== undefined && node.estimatedOriginMya !== undefined) {
      assert(
        node.estimatedOriginMya <= parent.estimatedOriginMya,
        `Chronological inversion: Child '${node.id}' (${node.estimatedOriginMya} MYA) cannot be older than Parent '${parent.id}' (${parent.estimatedOriginMya} MYA)`
      );
    }
  }
}
console.log("    ✓ All temporal milestones verified: zero parent-child chronological inversions across 92 nodes");

console.log("\n=======================================================");
console.log("ALL PHASE 3B CORRECTIONS VERIFICATION CHECKS PASSED!");
console.log("=======================================================");
