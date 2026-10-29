// ============================================================
// Tree of Life — Internationalization Types
// ============================================================

import type { TaxonomicRank, EvidenceType, Organism } from "@/types/taxonomy";
import type { ScientificCertitude } from "@/data/prebiotic";
import type { Locale } from "./config";

export interface UIStrings {
  common: {
    treeOfLife: string;
    tagline: string;
    phaseBadge: string;
    loading: string;
    error: string;
    back: string;
    close: string;
    share: string;
    disclaimer: string;
    sourceCode: string;
    language: string;
    selectLanguage: string;
  };
  hero: {
    preTitle: string;
    mainTitle1: string;
    mainTitle2: string;
    subtitle1: string;
    subtitle2Prefix: string;
    subtitle2Suffix: string;
    storyCta: string;
    storyCtaAria: string;
    exploreCta: string;
    exploreCtaAria: string;
    shortcutHint: string;
    shortcutEnter: string;
    shortcutE: string;
    taxaCountBadge: string;
    timeScaleBadge: string;
    interactiveBadge: string;
  };
  topbar: {
    searchPlaceholder: string;
    preLucaBtn: string;
    preLucaBtnAria: string;
    storyBtn: string;
    storyBtnAria: string;
    explorerPhase: string;
    homeAria: string;
    selectedNodeAria: string;
  };
  controls: {
    zoomIn: string;
    zoomOut: string;
    fitTree: string;
    fitTreeTitle: string;
    resetView: string;
    resetViewTitle: string;
    showMinimap: string;
    hideMinimap: string;
    toggleMinimapTitle: string;
    toolbarAria: string;
  };
  minimap: {
    label: string;
    ariaLabel: string;
  };
  timeline: {
    title: string;
    present: string;
    mya: string;
    bya: string;
    kya: string;
    timelineAria: string;
    epochHadean: string;
    epochArchean: string;
    epochProterozoic: string;
    epochPaleozoic: string;
    epochMesozoic: string;
    epochCenozoic: string;
  };
  search: {
    placeholder: string;
    noResultsFor: string;
    searchHint: string;
    escClose: string;
    navigate: string;
    select: string;
    matchingTaxa: string;
    searchAria: string;
  };
  taxonPanel: {
    closeAria: string;
    rankLabel: string;
    estimatedOrigin: string;
    extinction: string;
    yearsAgo: string;
    statusLiving: string;
    statusExtinct: string;
    statusUnknown: string;
    about: string;
    scientificBasis: string;
    confidenceUncertainty: string;
    directLineage: string;
    directAncestor: string;
    directDescendants: string;
    admixtureEvents: string;
    deepTimeAntecedents: string;
    exploreAntecedents: string;
    navigateTaxon: string;
    noChildren: string;
    noParent: string;
    confidenceNoteTitle: string;
    admixtureSignificance: string;
    openFullDetails: string;
  };
  preLuca: {
    panelTitle: string;
    badge: string;
    flowSubtitle: string;
    closeAria: string;
    geochemicalEvidence: string;
    certitudeStatus: string;
    scientificCitations: string;
    guardrailsTitle: string;
    focusLucaBtn: string;
    exploreStoryBtn: string;
    tabCosmic: string;
    tabPlanetary: string;
    tabPrebiotic: string;
    tabFuca: string;
    tabLuca: string;
    upstreamNotice: string;
    keyElements?: string;
    empiricalEvidenceTitle?: string;
    activeHypothesesTitle?: string;
    showCitations?: string;
    hideCitations?: string;
  };
  story: {
    beginStory: string;
    skipToExplorer: string;
    previousStage: string;
    nextStage: string;
    enterExplorer: string;
    replayStory: string;
    stageCounter: string;
    keyMilestones: string;
    scientificNotes: string;
    imageAttribution: string;
    stage0Notice: string;
    stage0Section1: string;
    stage0Section2: string;
    stage0Section3: string;
    stage0Section4: string;
    events?: string;
    prologue?: string;
    scientificReconstruction?: string;
    keyboardHint?: string;
    or?: string;
  };
  ranks: Record<TaxonomicRank, string>;
  evidenceTypes: Record<EvidenceType, string>;
  certitudes: Record<ScientificCertitude, string>;
  organismStatus: Record<Organism, string>;
}

export interface LocalizedTaxon {
  id: string;
  name: string;
  description?: string;
  confidenceNotes?: string;
  commonNames?: string[];
}

export interface LocalizedStoryStage {
  id: string;
  title: string;
  subtitle: string;
  timeRange: string;
  eonOrEra: string;
  narrativeParagraphs: string[];
  keyMilestones: string[];
  scientificNotes?: {
    label?: string;
    text: string;
  }[];
}

export interface LocalizedPrebioticStage {
  id: string;
  stageNumber?: string;
  title: string;
  subtitle: string;
  timeRangeDisplay: string;
  statusLabel?: string;
  narrativeOverview: string[];
  empiricalEvidence: string[];
  uncertaintyNotes?: string[];
  activeHypotheses?: string[];
  certitudeNote?: string;
  narrativeParagraphs?: string[];
  evidenceSummary?: string[];
}

export interface TranslationDictionary {
  locale: Locale;
  ui: UIStrings;
  taxa: Record<string, LocalizedTaxon>;
  storyStages: Record<string, LocalizedStoryStage>;
  prebioticStages: Record<string, LocalizedPrebioticStage>;
}
