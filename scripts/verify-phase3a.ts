import { TREE_DATA, ALL_NODES } from "../data/tree";
import { computeTreeLayout, getTreeBounds } from "../lib/tree-layout";
import { searchNodes, getRankDisplay } from "../lib/tree-utils";

function assert(condition: boolean, message: string) {
  if (!condition) {
    console.error(`FAIL: ${message}`);
    process.exit(1);
  }
}

console.log("=== Phase 3A Algorithmic & Scientific Verification Suite ===\n");

// 1. Node Count Check
const nodeCount = Object.keys(TREE_DATA.nodes).length;
console.log(`[1] Total Node Count: ${nodeCount}`);
assert(nodeCount === 84, `Expected exactly 84 nodes (83 + 1 'homo'), got ${nodeCount}`);
assert(ALL_NODES.length === 84, `Expected ALL_NODES length to be 84, got ${ALL_NODES.length}`);
console.log("    ✓ Node count verified: 84 nodes");

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
console.log("    ✓ All 84 nodes have verified bidirectional parent-child references");

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

// 5. Phase 3A Approved Decisions Check
console.log("\n[5] Phase 3A Scientific Corrections Verification");

// 5.1 Placentalia Rank
const placentalia = TREE_DATA.nodes["placentalia"];
assert(placentalia !== undefined, "placentalia must exist");
assert(placentalia.rank === "infraclass", `placentalia rank must be 'infraclass', got '${placentalia.rank}'`);
assert(getRankDisplay("infraclass") === "Infraclass", "getRankDisplay('infraclass') must return 'Infraclass'");
console.log("    ✓ Placentalia rank corrected to 'infraclass' (eliminating Order-parents-Order collision)");

// 5.2 Genus Homo Introduction
const homo = TREE_DATA.nodes["homo"];
assert(homo !== undefined, "Genus 'homo' node must exist");
assert(homo.rank === "genus", `homo rank must be 'genus', got '${homo.rank}'`);
assert(homo.parentId === "hominidae", `homo parentId must be 'hominidae', got '${homo.parentId}'`);
assert(homo.scientificName === "Homo", "homo scientificName must be 'Homo'");
assert(homo.estimatedOriginMya === 2.8, "homo estimatedOriginMya must be 2.8 (calibrated to LD 350-1)");
console.log("    ✓ Genus 'Homo' node verified (parent: 'hominidae', rank: 'genus', origin: ~2.8 MYA)");

// 5.3 Reparenting of Homo Species
const sapiens = TREE_DATA.nodes["homo-sapiens"];
const erectus = TREE_DATA.nodes["homo-erectus"];
const neanderthal = TREE_DATA.nodes["homo-neanderthalensis"];
assert(sapiens?.parentId === "homo", `homo-sapiens parent must be 'homo', got '${sapiens?.parentId}'`);
assert(erectus?.parentId === "homo", `homo-erectus parent must be 'homo', got '${erectus?.parentId}'`);
assert(neanderthal?.parentId === "homo", `homo-neanderthalensis parent must be 'homo', got '${neanderthal?.parentId}'`);
const hominidae = TREE_DATA.nodes["hominidae"];
assert((hominidae.childIds ?? []).includes("homo"), "hominidae must include 'homo' in childIds");
assert(!(hominidae.childIds ?? []).includes("homo-sapiens"), "hominidae must no longer directly parent 'homo-sapiens'");
assert((homo.childIds ?? []).includes("homo-sapiens"), "homo must include 'homo-sapiens' in childIds");
assert((homo.childIds ?? []).includes("homo-erectus"), "homo must include 'homo-erectus' in childIds");
assert((homo.childIds ?? []).includes("homo-neanderthalensis"), "homo must include 'homo-neanderthalensis' in childIds");
console.log("    ✓ Homo sapiens, erectus, and neanderthalensis reparented beneath Genus 'homo'");

// 5.4 Stem Hominins Retained under Hominidae
const sahelanthropus = TREE_DATA.nodes["sahelanthropus-tchadensis"];
const lucy = TREE_DATA.nodes["australopithecus-afarensis"];
assert(sahelanthropus?.parentId === "hominidae", `sahelanthropus parent must be 'hominidae', got '${sahelanthropus?.parentId}'`);
assert(lucy?.parentId === "hominidae", `lucy parent must be 'hominidae', got '${lucy?.parentId}'`);
console.log("    ✓ Sahelanthropus and Australopithecus retained under Hominidae");

// 5.5 Avoid Direct-Ancestor Claims in Text
assert(!sahelanthropus.description?.toLowerCase().includes("earliest known hominin ancestors"), "sahelanthropus description must not claim direct ancestry");
assert(!erectus.description?.toLowerCase().includes("pioneering ancestor of modern humans"), "homo-erectus description must not claim direct ancestry");
console.log("    ✓ Hominin descriptions refined to reject linear Scala Naturae / direct-ancestor claims");

// 5.6 Genetic Admixture Metadata
assert((sapiens.admixtureEvents?.length ?? 0) > 0, "homo-sapiens must have admixtureEvents");
assert(sapiens.admixtureEvents![0].targetTaxonId === "homo-neanderthalensis", "homo-sapiens admixture target must be homo-neanderthalensis");
assert((neanderthal.admixtureEvents?.length ?? 0) > 0, "homo-neanderthalensis must have admixtureEvents");
assert(neanderthal.admixtureEvents![0].targetTaxonId === "homo-sapiens", "homo-neanderthalensis admixture target must be homo-sapiens");
console.log("    ✓ Bidirectional genetic admixture metadata verified for Homo sapiens and Neanderthals");

// 6. Layout Geometry Verification
console.log("\n[6] Layout Geometry Verification");
const layoutNodes = computeTreeLayout(TREE_DATA);
assert(layoutNodes.size === 84, `Layout nodes count (${layoutNodes.size}) != 84`);

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

// 7. Search Test
console.log("\n[7] Search Test");
const searchQueries = [
  "Homo",
  "Neanderthal",
  "Lucy",
  "Sahelanthropus",
  "Placental",
  "Humans"
];

for (const q of searchQueries) {
  const res = searchNodes(q);
  assert(res.length > 0, `Search for '${q}' returned 0 results`);
  console.log(`    ✓ Search '${q}' -> top hit: "${res[0].node.name}" (${res[0].node.scientificName}) [Rank: ${res[0].node.rank}]`);
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
console.log("ALL PHASE 3A VERIFICATION CHECKS PASSED SUCCESSFULLY!");
console.log("=======================================================");
