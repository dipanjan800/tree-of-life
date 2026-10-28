// ============================================================
// Tree Utilities — Search, filtering, and helper functions
// ============================================================

import type { TaxonNode, SearchResult } from "@/types/taxonomy";
import { ALL_NODES } from "@/data/tree";

const RANK_DISPLAY: Record<string, string> = {
  root: "Root",
  domain: "Domain",
  kingdom: "Kingdom",
  phylum: "Phylum",
  subphylum: "Subphylum",
  class: "Class",
  infraclass: "Infraclass",
  order: "Order",
  family: "Family",
  genus: "Genus",
  species: "Species",
  group: "Group",
};

export function getRankDisplay(rank: string): string {
  return RANK_DISPLAY[rank] ?? rank;
}

export interface LocalizedSearchTaxon {
  name: string;
  description?: string;
  commonNames?: string[];
}

export function searchNodes(
  query: string,
  limit = 12,
  localizedTaxa?: Record<string, LocalizedSearchTaxon>
): SearchResult[] {
  if (!query.trim()) return [];

  const q = query.toLowerCase().trim();
  const results: SearchResult[] = [];

  for (const node of ALL_NODES) {
    const loc = localizedTaxa ? localizedTaxa[node.id] : undefined;
    const locName = loc?.name ? loc.name.toLowerCase() : "";
    const locDesc = loc?.description ? loc.description.toLowerCase() : "";
    const commonNames = loc?.commonNames || [];

    const nameMatch = node.name.toLowerCase().includes(q);
    const locNameMatch = locName.includes(q);
    const idMatch = node.id.toLowerCase().includes(q);
    const sciMatch = node.scientificName?.toLowerCase().includes(q) ?? false;
    const rankMatch = node.rank.toLowerCase().includes(q);
    const descMatch = (node.description?.toLowerCase().includes(q) ?? false) || locDesc.includes(q);
    const commonMatch = commonNames.some((c) => c.toLowerCase().includes(q));

    if (!nameMatch && !locNameMatch && !idMatch && !sciMatch && !rankMatch && !descMatch && !commonMatch) {
      continue;
    }

    const matchFields: string[] = [];
    let score = 0;

    // Localized name match
    if (locName === q) {
      score += 120;
      matchFields.push("localized-exact");
    } else if (locName.startsWith(q)) {
      score += 70;
      matchFields.push("localized-prefix");
    } else if (locNameMatch) {
      score += 50;
      matchFields.push("localized-name");
    }

    // Common synonyms match
    if (commonMatch) {
      const exactCommon = commonNames.some((c) => c.toLowerCase() === q);
      if (exactCommon) {
        score += 110;
        matchFields.push("common-exact");
      } else {
        score += 65;
        matchFields.push("common-synonym");
      }
    }

    // Canonical English name match
    if (node.name.toLowerCase() === q) {
      score += 100;
      matchFields.push("name-exact");
    } else if (node.name.toLowerCase().startsWith(q)) {
      score += 60;
      matchFields.push("name-prefix");
    } else if (nameMatch) {
      score += 40;
      matchFields.push("name");
    }

    // Scientific Latin name match
    if (node.scientificName?.toLowerCase() === q) {
      score += 90;
      matchFields.push("scientificName-exact");
    } else if (sciMatch) {
      score += 40;
      matchFields.push("scientificName");
    }

    // Canonical Node ID match (e.g. homo-sapiens)
    if (node.id.toLowerCase() === q) {
      score += 85;
      matchFields.push("id-exact");
    } else if (idMatch) {
      score += 35;
      matchFields.push("id");
    }

    if (rankMatch) {
      score += 10;
      matchFields.push("rank");
    }

    if (descMatch) {
      score += 8;
      matchFields.push("description");
    }

    results.push({ node, matchScore: score, matchFields });
  }

  return results
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, limit);
}

export function formatMya(mya?: number): string {
  if (mya === undefined || mya === null) return "Unknown";
  if (mya >= 1000) {
    return `${(mya / 1000).toFixed(1)} billion years ago`;
  }
  if (mya < 1) {
    return `${(mya * 1000).toFixed(0)} thousand years ago`;
  }
  return `${mya.toFixed(0)} million years ago`;
}

export function getStatusColor(status?: string): string {
  switch (status) {
    case "living":
      return "#4ade80"; // green-400
    case "extinct":
      return "#f87171"; // red-400
    default:
      return "#94a3b8"; // slate-400
  }
}

export function getStatusLabel(status?: string): string {
  switch (status) {
    case "living":
      return "Living";
    case "extinct":
      return "Extinct";
    default:
      return "Unknown";
  }
}

// Get a deterministic accent color from the node's hue or ID
export function getNodeAccentColor(node: TaxonNode, alpha = 1): string {
  const hue = node.colorHue ?? (hashString(node.id) % 360);
  return `hsla(${hue}, 60%, 65%, ${alpha})`;
}

export function getNodeAccentColorRaw(node: TaxonNode): { h: number; s: number; l: number } {
  const hue = node.colorHue ?? (hashString(node.id) % 360);
  return { h: hue, s: 60, l: 65 };
}

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

// Smooth easing for animations
export function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

export function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

// Clamp utility
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

// Linear interpolation
export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}
