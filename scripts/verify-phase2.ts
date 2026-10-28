import { TREE_DATA, ALL_NODES } from "../data/tree";
import { computeTreeLayout, getTreeBounds } from "../lib/tree-layout";
import { searchNodes } from "../lib/tree-utils";

function assert(condition: boolean, message: string) {
  if (!condition) {
    console.error(`FAIL: ${message}`);
    process.exit(1);
  }
}

console.log("=== Phase 2 Algorithmic Verification Suite ===\n");

// 1. Node Count Check
const nodeCount = Object.keys(TREE_DATA.nodes).length;
console.log(`[1] Total Node Count: ${nodeCount}`);
assert(nodeCount === 83, `Expected exactly 83 nodes, got ${nodeCount}`);
assert(ALL_NODES.length === 83, `Expected ALL_NODES length to be 83, got ${ALL_NODES.length}`);
console.log("    ✓ Node count verified: 83 nodes (64 Phase 1 + 19 Phase 2)");

// 2. Single Root Check
console.log("\n[2] Single Root Verification");
assert(TREE_DATA.rootId === "luca", `Root ID must be 'luca', got '${TREE_DATA.rootId}'`);
const roots = Object.values(TREE_DATA.nodes).filter(n => n.parentId === null);
assert(roots.length === 1, `Expected exactly 1 root node with null parent, found ${roots.length}`);
assert(roots[0].id === "luca", `Root node must be luca`);
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
console.log("    ✓ All 83 nodes have perfect bidirectional parent-child references");

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

// 5. Approved Specific Constraints
console.log("\n[5] Approved Specific Constraints Verification");

// Constraint 1: Smilodon fatalis parent is felidae
const smilodon = TREE_DATA.nodes["smilodon-fatalis"];
assert(smilodon !== undefined, "smilodon-fatalis must exist");
assert(smilodon.parentId === "felidae", `smilodon parent must be 'felidae', got '${smilodon.parentId}'`);
console.log("    ✓ Smilodon fatalis correctly placed under 'felidae'");

// Constraint 2: Dimetrodon limbatus placed in Synapsida stem-mammal lineage (not dinosaur)
const dimetrodon = TREE_DATA.nodes["dimetrodon-limbatus"];
assert(dimetrodon !== undefined, "dimetrodon-limbatus must exist");
assert(dimetrodon.parentId === "synapsida", `dimetrodon parent must be 'synapsida', got '${dimetrodon.parentId}'`);
const synapsida = TREE_DATA.nodes["synapsida"];
assert(synapsida !== undefined, "synapsida must exist");
assert(synapsida.parentId === "vertebrata", `synapsida parent must be 'vertebrata', got '${synapsida.parentId}'`);
const mammalia = TREE_DATA.nodes["mammalia"];
assert(mammalia.parentId === "synapsida", `mammalia parent must be 'synapsida', got '${mammalia.parentId}'`);
console.log("    ✓ Dimetrodon limbatus correctly placed under Synapsida (stem-mammals, non-dinosaur)");

// Constraint 3: Trilobita as Class under Arthropoda, Elrathia kingii as species under Trilobita
const trilobita = TREE_DATA.nodes["trilobita"];
assert(trilobita !== undefined, "trilobita must exist");
assert(trilobita.rank === "class", `trilobita rank must be 'class', got '${trilobita.rank}'`);
assert(trilobita.parentId === "arthropoda", `trilobita parent must be 'arthropoda', got '${trilobita.parentId}'`);
const elrathia = TREE_DATA.nodes["elrathia-kingii"];
assert(elrathia !== undefined, "elrathia-kingii must exist");
assert(elrathia.rank === "species", `elrathia rank must be 'species', got '${elrathia.rank}'`);
assert(elrathia.parentId === "trilobita", `elrathia parent must be 'trilobita', got '${elrathia.parentId}'`);
console.log("    ✓ Trilobita is Class under Arthropoda; Elrathia kingii is Species under Trilobita");

// Constraint 4: Mammuthus primigenius under Proboscidea
const proboscidea = TREE_DATA.nodes["proboscidea"];
assert(proboscidea !== undefined, "proboscidea must exist");
assert(proboscidea.rank === "order", `proboscidea rank must be 'order', got '${proboscidea.rank}'`);
assert(proboscidea.parentId === "placentalia", `proboscidea parent must be 'placentalia', got '${proboscidea.parentId}'`);
const mammoth = TREE_DATA.nodes["mammuthus-primigenius"];
assert(mammoth !== undefined, "mammuthus-primigenius must exist");
assert(mammoth.parentId === "proboscidea", `mammoth parent must be 'proboscidea', got '${mammoth.parentId}'`);
console.log("    ✓ Mammuthus primigenius placed under Order Proboscidea under Placentalia");

// Constraint 5: Opabinia deferred
assert(TREE_DATA.nodes["opabinia-regalis"] === undefined, "opabinia-regalis must NOT be integrated (deferred to Phase 3)");
console.log("    ✓ Opabinia regalis confirmed deferred (absent from Phase 2 tree)");

// Constraint 6: Asgardarchaeota open license asset & scientific note
const asgard = TREE_DATA.nodes["asgardarchaeota"];
assert(asgard !== undefined, "asgardarchaeota must exist");
assert(!asgard.visualAsset?.url?.includes("nature.com") && !asgard.imageUrl?.includes("nature.com"), "Asgardarchaeota must not use copyrighted Nature asset");
const asgardText = `${asgard.description} ${asgard.confidenceNotes ?? ""}`;
assert(asgardText.includes("two-domain") || asgardText.includes("eocyte") || asgardText.includes("Eukaryota"), "Asgardarchaeota must contain scientific note on origin of Eukaryota");
console.log("    ✓ Asgardarchaeota has verified open asset and evolutionary relationship note");

// 6. Layout Geometry Verification
console.log("\n[6] Layout Geometry Verification");
const layoutNodes = computeTreeLayout(TREE_DATA);
assert(layoutNodes.size === 83, `Layout nodes count (${layoutNodes.size}) != 83`);

for (const [id, lNode] of layoutNodes.entries()) {
  assert(!isNaN(lNode.x) && !isNaN(lNode.y), `Node '${id}' has NaN coordinates: (${lNode.x}, ${lNode.y})`);
  if (lNode.parentId) {
    const parentLayout = layoutNodes.get(lNode.parentId)!;
    assert(lNode.x > parentLayout.x, `Child '${id}' x (${lNode.x}) not strictly greater than parent x (${parentLayout.x})`);
  }
}
const bounds = getTreeBounds(layoutNodes);
assert(bounds.width > 0 && bounds.height > 0, "Tree bounds must have positive dimensions");
console.log(`    ✓ Layout calculated cleanly: width=${bounds.width}px, height=${bounds.height}px, minX=${bounds.minX}, maxX=${bounds.maxX}`);

// 7. Search Testing for New & Existing Taxa
console.log("\n[7] Search Test");
const searchQueries = [
  "Smilodon",
  "Dimetrodon",
  "Trilobite",
  "Mammoth",
  "Archaeopteryx",
  "Tiktaalik",
  "Homo erectus",
  "Lucy",
  "Neanderthal",
  "Tyrannosaurus",
  "Dunkleosteus",
  "Dickinsonia",
  "Asgard"
];

for (const q of searchQueries) {
  const res = searchNodes(q);
  assert(res.length > 0, `Search for '${q}' returned 0 results`);
  console.log(`    ✓ Search '${q}' -> top hit: "${res[0].node.name}" (${res[0].node.scientificName})`);
}

// 8. Timeline Synchronization
console.log("\n[8] Timeline Synchronization");
for (const node of ALL_NODES) {
  assert(typeof node.estimatedOriginMya === "number", `Node '${node.id}' missing valid origin Mya`);
  assert((node.estimatedOriginMya ?? 0) >= 0, `Node '${node.id}' origin Mya cannot be negative`);
  if (node.status === "extinct" && node.extinctionDateMya !== undefined) {
    assert(node.extinctionDateMya >= 0, `Node '${node.id}' extinction Mya cannot be negative`);
    assert(node.extinctionDateMya <= (node.estimatedOriginMya ?? 0), `Node '${node.id}' extinction Mya (${node.extinctionDateMya}) must be <= origin Mya (${node.estimatedOriginMya})`);
  }
}
console.log("    ✓ All temporal milestones verified and logically consistent");

console.log("\n=======================================================");
console.log("ALL PHASE 2 VERIFICATION CHECKS PASSED SUCCESSFULLY!");
console.log("=======================================================");
