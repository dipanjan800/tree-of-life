// ============================================================
// Tree Layout Engine — Reingold-Tilford inspired horizontal layout
// Positions nodes left-to-right, root on the left, leaves on the right
// ============================================================

import type { TaxonNode, TaxonLayoutNode, TreeData } from "@/types/taxonomy";

export const LAYOUT_CONFIG = {
  NODE_WIDTH: 220,          // horizontal spacing between depth levels
  NODE_HEIGHT: 56,          // vertical spacing between sibling nodes
  ROOT_X: 80,               // x start position
  ROOT_Y_OFFSET: 20,        // padding at the top
  MIN_SIBLING_GAP: 12,      // min vertical gap between siblings
} as const;

interface LayoutState {
  nodes: Map<string, TaxonLayoutNode>;
  treeData: TreeData;
}

function getChildren(id: string, treeData: TreeData): TaxonNode[] {
  const node = treeData.nodes[id];
  if (!node?.childIds?.length) return [];
  return node.childIds
    .map((cid: string) => treeData.nodes[cid])
    .filter((n): n is TaxonNode => n !== undefined);
}

export function countLeaves(id: string, treeData: TreeData): number {
  const children = getChildren(id, treeData);
  if (children.length === 0) return 1;
  return children.reduce(
    (sum, child) => sum + countLeaves(child.id, treeData),
    0
  );
}

function buildAncestorIds(
  id: string,
  treeData: TreeData,
  cache: Map<string, string[]>
): string[] {
  if (cache.has(id)) return cache.get(id)!;
  const node = treeData.nodes[id];
  if (!node?.parentId) {
    cache.set(id, []);
    return [];
  }
  const parentAncestors = buildAncestorIds(node.parentId, treeData, cache);
  const ancestors = [...parentAncestors, node.parentId];
  cache.set(id, ancestors);
  return ancestors;
}

function assignPositions(
  id: string,
  depth: number,
  yOffset: number,
  treeData: TreeData,
  state: LayoutState,
  ancestorCache: Map<string, string[]>
): number {
  const node = treeData.nodes[id];
  if (!node) return yOffset;

  const children = getChildren(id, treeData);
  const isLeaf = children.length === 0;
  const x = LAYOUT_CONFIG.ROOT_X + depth * LAYOUT_CONFIG.NODE_WIDTH;

  const ancestors = buildAncestorIds(id, treeData, ancestorCache);

  const layoutNode: TaxonLayoutNode = {
    ...node,
    x,
    y: 0, // placeholder, set after children
    depth,
    isLeaf,
    ancestorIds: ancestors,
  };

  state.nodes.set(id, layoutNode);

  if (isLeaf) {
    layoutNode.y =
      yOffset + LAYOUT_CONFIG.NODE_HEIGHT / 2 + LAYOUT_CONFIG.ROOT_Y_OFFSET;
    return yOffset + LAYOUT_CONFIG.NODE_HEIGHT;
  }

  let currentY = yOffset;
  const childYMidpoints: number[] = [];

  for (const child of children) {
    const newY = assignPositions(
      child.id,
      depth + 1,
      currentY,
      treeData,
      state,
      ancestorCache
    );
    // The child's y midpoint
    const childLayout = state.nodes.get(child.id);
    if (childLayout) {
      childYMidpoints.push(childLayout.y);
    }
    currentY = newY;
  }

  // Center this node between its first and last child
  const firstChildY = childYMidpoints[0] ?? yOffset;
  const lastChildY = childYMidpoints[childYMidpoints.length - 1] ?? yOffset;
  layoutNode.y = (firstChildY + lastChildY) / 2;

  return currentY;
}

export function computeTreeLayout(treeData: TreeData): Map<string, TaxonLayoutNode> {
  const state: LayoutState = {
    nodes: new Map(),
    treeData,
  };
  const ancestorCache = new Map<string, string[]>();

  assignPositions(treeData.rootId, 0, 0, treeData, state, ancestorCache);

  return state.nodes;
}

export function getTreeBounds(layoutNodes: Map<string, TaxonLayoutNode>): {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
  width: number;
  height: number;
} {
  let minX = Infinity,
    maxX = -Infinity,
    minY = Infinity,
    maxY = -Infinity;

  for (const node of layoutNodes.values()) {
    minX = Math.min(minX, node.x);
    maxX = Math.max(maxX, node.x);
    minY = Math.min(minY, node.y);
    maxY = Math.max(maxY, node.y);
  }

  // Add padding
  minX -= 80;
  maxX += 200;
  minY -= 40;
  maxY += 40;

  return {
    minX,
    maxX,
    minY,
    maxY,
    width: maxX - minX,
    height: maxY - minY,
  };
}

// Compute a smooth cubic bezier path from parent to child
export function computeBranchPath(
  parent: TaxonLayoutNode,
  child: TaxonLayoutNode
): string {
  const px = parent.x + 8; // slight offset for node radius
  const py = parent.y;
  const cx = child.x - 8;
  const cy = child.y;

  // Horizontal midpoint for control points
  const midX = px + (cx - px) * 0.5;

  return `M ${px} ${py} C ${midX} ${py}, ${midX} ${cy}, ${cx} ${cy}`;
}

// Get all ancestor IDs for a given node
export function getAncestorChain(
  nodeId: string,
  layoutNodes: Map<string, TaxonLayoutNode>
): Set<string> {
  const node = layoutNodes.get(nodeId);
  if (!node) return new Set<string>();
  const chain = new Set<string>(node.ancestorIds);
  chain.add(nodeId);
  return chain;
}

// Get all descendant IDs for a given node
export function getDescendantIds(
  nodeId: string,
  treeData: TreeData
): Set<string> {
  const result = new Set<string>();
  const queue = [nodeId];

  while (queue.length > 0) {
    const current = queue.shift()!;
    result.add(current);
    const node = treeData.nodes[current];
    if (node?.childIds) {
      for (const childId of node.childIds) {
        if (!result.has(childId)) {
          queue.push(childId);
        }
      }
    }
  }

  return result;
}

// Compute the viewport transform to fit the tree
export function computeFitTransform(
  bounds: ReturnType<typeof getTreeBounds>,
  viewportWidth: number,
  viewportHeight: number,
  padding = 80
): { x: number; y: number; scale: number } {
  const scaleX = (viewportWidth - padding * 2) / bounds.width;
  const scaleY = (viewportHeight - padding * 2) / bounds.height;
  const scale = Math.min(scaleX, scaleY, 1.2);

  const scaledWidth = bounds.width * scale;
  const scaledHeight = bounds.height * scale;

  const x = (viewportWidth - scaledWidth) / 2 - bounds.minX * scale;
  const y = (viewportHeight - scaledHeight) / 2 - bounds.minY * scale;

  return { x, y, scale };
}

// Compute transform to focus on a specific node
export function computeNodeFocusTransform(
  node: TaxonLayoutNode,
  viewportWidth: number,
  viewportHeight: number,
  currentScale: number
): { x: number; y: number; scale: number } {
  const targetScale = Math.max(currentScale, 0.8);
  const x = viewportWidth / 2 - node.x * targetScale;
  const y = viewportHeight / 2 - node.y * targetScale;
  return { x, y, scale: targetScale };
}
