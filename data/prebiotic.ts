// ============================================================
// Tree of Life — Pre-LUCA History & Cosmochemical Dataset
// Dedicated Non-Cladistic Historical Layer
// Governed by: docs/COSMIC-ORIGINS-FUCA-ARCHITECTURE-PLAN.md
// ============================================================

export type PrebioticStageType =
  | "cosmic"
  | "planetary"
  | "prebiotic"
  | "fuca"
  | "luca";

export type ScientificCertitude =
  | "established_consensus"
  | "active_hypothesis"
  | "theoretical_construct";

export interface PrebioticCitation {
  authorYear: string;
  title: string;
  source: string;
}

export interface PrebioticStage {
  id: string;
  stageType: PrebioticStageType;
  stageNumber: string; // e.g. "Stage A", "Stage B", etc.
  title: string;
  subtitle: string;
  timeRangeDisplay: string;
  approximateMya?: number;
  scientificCertitude: ScientificCertitude;
  statusLabel: string;
  narrativeOverview: string[];
  empiricalEvidence: string[];
  activeHypotheses: string[];
  uncertaintyNotes: string[];
  relevantElements?: string[]; // e.g. ["H", "He", "C", "N", "O", "P", "S"]
  citations: PrebioticCitation[];
  visualTheme: {
    accentColor: string;
    secondaryColor: string;
    badgeBg: string;
    badgeBorder: string;
    icon: string;
  };
}

export const PRE_LUCA_STAGES: PrebioticStage[] = [
  {
    id: "cosmic-origins",
    stageType: "cosmic",
    stageNumber: "Stage A",
    title: "Cosmic Origins & Astrochemical Nucleosynthesis",
    subtitle: "Primordial light elements and stellar furnaces of the early universe",
    timeRangeDisplay: "~13.8 – 5.0 BYA",
    approximateMya: 13800,
    scientificCertitude: "established_consensus",
    statusLabel: "Established Cosmology & Astrophysics",
    narrativeOverview: [
      "During the first three minutes following the Big Bang (~13.8 BYA), primordial nucleosynthesis synthesized the lightest elemental isotopes: hydrogen (~75% by mass), helium (~25%), and trace amounts of lithium. The nascent cosmos contained no carbon, oxygen, phosphorus, sulfur, iron, or rock-forming silicates.",
      "Hundreds of millions of years later, gravitational collapse of primordial gas ignited the first generation of massive stars (Population III). In stellar cores, thermonuclear fusion forged heavier elements from carbon up to iron-56.",
      "Because ordinary core fusion ceases at iron due to nuclear binding energy limits, elements heavier than iron were synthesized through energetic neutron-capture mechanisms: the s-process in asymptotic giant branch (AGB) stars, and the r-process in core-collapse supernovae and binary neutron star mergers (kilonovae). Stellar winds and explosive shockwaves dispersed these chemical elements into the interstellar medium.",
    ],
    empiricalEvidence: [
      "Cosmic Microwave Background (CMB) spectral anisotropy measurements (COBE, WMAP, Planck) confirming standard Big Bang nucleosynthesis yields.",
      "Stellar spectroscopic observations of low-metallicity Population II and III halo stars.",
      "Gravitational wave and optical detection of heavy element r-process production in binary neutron star mergers (LIGO/Virgo GW170817).",
    ],
    activeHypotheses: [
      "The exact initial mass function and lifetimes of the earliest Population III stars.",
      "Relative quantitative contributions of core-collapse supernovae versus neutron star mergers to early galactic heavy-element abundance.",
    ],
    uncertaintyNotes: [
      "Cosmic nucleosynthesis is an astrophysical process, not a biological lineage. These events provided the atomic prerequisites of matter, but contain zero biological organization.",
    ],
    relevantElements: ["H", "He", "Li", "C", "N", "O", "Fe"],
    citations: [
      {
        authorYear: "Alpher, Bethe, & Gamow (1948)",
        title: "The Origin of Chemical Elements",
        source: "Physical Review, 73(7): 803–804",
      },
      {
        authorYear: "Burbidge, Burbidge, Fowler, & Hoyle (1957)",
        title: "Synthesis of the Elements in Stars (B²FH Paper)",
        source: "Reviews of Modern Physics, 29(4): 547–650",
      },
      {
        authorYear: "Abbott et al. (LIGO/Virgo Collaboration, 2017)",
        title: "Multi-messenger Observations of a Binary Neutron Star Merger (GW170817)",
        source: "Astrophysical Journal Letters, 848(2): L12",
      },
    ],
    visualTheme: {
      accentColor: "#a855f7",
      secondaryColor: "#fbbf24",
      badgeBg: "rgba(168, 85, 247, 0.12)",
      badgeBorder: "rgba(168, 85, 247, 0.35)",
      icon: "✨",
    },
  },
  {
    id: "solar-system-earth",
    stageType: "planetary",
    stageNumber: "Stage B",
    title: "Solar System & Planetary Accretion",
    subtitle: "Consolidation of the Solar Nebula, proto-Earth, and primeval oceans",
    timeRangeDisplay: "~4.6 – 4.4 BYA",
    approximateMya: 4540,
    scientificCertitude: "established_consensus",
    statusLabel: "Established Geochemistry & Cosmochemistry",
    narrativeOverview: [
      "Approximately 4.6 billion years ago, a dense interstellar molecular cloud fragment enriched with stellar nucleosynthetic debris collapsed gravitationally to form the Solar Nebula—a spinning protoplanetary accretion disk centered around the nascent Sun.",
      "In the inner disk, volatile gases were driven outward by radiation pressure, while refractory silicates, iron-nickel metals, and carbonaceous grains collided and accreted into planetesimals. Through catastrophic runaway collisions, planetesimals consolidated into the terrestrial planets, with Earth reaching its primary mass ~4.54 billion years ago.",
      "Planetary differentiation segregated dense molten iron and nickel into Earth's metallic core, generating the planetary geodynamo and magnetosphere. Rapid outgassing, supplemented by chondritic volatile bombardment, produced an early atmosphere and liquid water oceans, confirmed by detrital zircon crystals formed as early as 4.404 billion years ago.",
    ],
    empiricalEvidence: [
      "Radiometric isochron dating of primitive chondritic meteorites (Allende, Canyon Diablo) establishing the age of Solar System crystallization at ~4.567 BYA.",
      "Uranium-lead isotopic dating of detrital zircon crystals from Jack Hills, Western Australia, proving solid crust and liquid water interactions by ~4.404 BYA.",
      "Oxygen isotope ratios (δ¹⁸O) in Hadean zircons demonstrating low-temperature hydrothermal alteration by liquid oceans.",
    ],
    activeHypotheses: [
      "The exact timing, impact dynamics, and volatile consequences of the Moon-forming giant impact (Theia hypothesis, ~4.51–4.45 BYA).",
      "Relative proportion of terrestrial water delivered by carbonaceous chondrites versus endogenous mantle outgassing.",
    ],
    uncertaintyNotes: [
      "The Late Heavy Bombardment timing and intensity remains debated among planetary geophysicists, with modern dynamical models favoring a declining accretion tail rather than a terminal spike.",
    ],
    relevantElements: ["Si", "Fe", "Ni", "Mg", "O", "H", "C"],
    citations: [
      {
        authorYear: "Patterson (1956)",
        title: "Age of Meteorites and the Earth",
        source: "Geochimica et Cosmochimica Acta, 10(4): 230–237",
      },
      {
        authorYear: "Valley et al. (2014)",
        title: "Hadean age for a post-magma-ocean zircon confirmed by atom-probe tomography",
        source: "Nature Geoscience, 7(3): 219–223",
      },
      {
        authorYear: "Chambers (2004)",
        title: "Planetary accretion in the inner Solar System",
        source: "Earth and Planetary Science Letters, 223(3-4): 241–252",
      },
    ],
    visualTheme: {
      accentColor: "#f59e0b",
      secondaryColor: "#38bdf8",
      badgeBg: "rgba(245, 158, 11, 0.12)",
      badgeBorder: "rgba(245, 158, 11, 0.35)",
      icon: "🪐",
    },
  },
  {
    id: "prebiotic-chemistry",
    stageType: "prebiotic",
    stageNumber: "Stage C",
    title: "Prebiotic Chemistry & The Abiotic Threshold",
    subtitle: "Organic building blocks, geochemical reactors, and catalytic cycles",
    timeRangeDisplay: "~4.4 – 4.0 BYA",
    approximateMya: 4200,
    scientificCertitude: "active_hypothesis",
    statusLabel: "Active Frontier in Organic Geochemistry",
    narrativeOverview: [
      "With liquid oceans in place, the physical and chemical stages were set for prebiotic organic synthesis. Carbon, hydrogen, nitrogen, oxygen, phosphorus, and sulfur (CHNOPS) circulated through hydrothermal, atmospheric, and mineral interfaces.",
      "Prebiotic organic molecules—amino acids, carboxylic acids, nucleobases, and simple sugars—originated through both exogenous delivery (carbonaceous meteorites and comets) and endogenous synthesis (Fischer-Tropsch-type mineral catalysis, spark discharge reactions, and serpentinization).",
      "Crucially, the presence of abiotic organic compounds does not equal life. The fundamental question of abiogenesis is how non-living chemical reaction networks crossed the threshold into compartmentalized, self-maintaining, autocatalytic, and evolvable biological systems.",
    ],
    empiricalEvidence: [
      "Analysis of carbonaceous chondrites (Murchison, Winchcombe) confirming over 70 abiotic amino acids, purines, pyrimidines, and amphiphilic lipid precursors formed non-biologically in space.",
      "Laboratory simulation of alkaline hydrothermal vent conditions generating organic molecules through inorganic iron-sulfur precipitate membranes.",
      "In vitro non-enzymatic synthesis of ribonucleotide precursors under plausible prebiotic conditions (Powner et al. 2009).",
    ],
    activeHypotheses: [
      "Submarine Alkaline Hydrothermal Vents: Natural proton gradients across porous iron-sulfur minerals drove initial metabolic energy generation (Russell, Martin).",
      "Subaerial Volcanic Geothermal Pools: Wet-dry dehydration/hydration cycles on land driven by solar evaporation facilitated condensation polymerization of RNA-like oligomers (Damer, Deamer).",
      "The RNA World: RNA originally served as both informational genetic template and catalytic enzyme before DNA and coded proteins evolved.",
    ],
    uncertaintyNotes: [
      "The exact geochemical environment where life originated on Earth remains unproven and constitutes an active international scientific investigation.",
      "Abiotic chemical synthesis does NOT represent an organismal lineage. No parent-child cladistic genealogy connects non-living mineral catalysis to cellular life.",
    ],
    relevantElements: ["C", "H", "N", "O", "P", "S"],
    citations: [
      {
        authorYear: "Kvenvolden et al. (1970)",
        title: "Evidence for extraterrestrial amino-acids and hydrocarbons in the Murchison meteorite",
        source: "Nature, 228(5275): 923–926",
      },
      {
        authorYear: "Martin & Russell (2003)",
        title: "On the origins of cells: a hypothesis for the evolutionary transitions from abiotic geochemistry to chemoautotrophic prokaryotes",
        source: "Philosophical Transactions of the Royal Society B, 358(1429): 59–85",
      },
      {
        authorYear: "Powner, Gerland, & Sutherland (2009)",
        title: "Synthesis of activated pyrimidine ribonucleotides in prebiotic conditions",
        source: "Nature, 459(7244): 239–242",
      },
    ],
    visualTheme: {
      accentColor: "#06b6d4",
      secondaryColor: "#10b981",
      badgeBg: "rgba(6, 182, 212, 0.12)",
      badgeBorder: "rgba(6, 182, 212, 0.35)",
      icon: "🧪",
    },
  },
  {
    id: "fuca-concept",
    stageType: "fuca",
    stageNumber: "Stage D",
    title: "Early Replicating Systems & The FUCA Concept",
    subtitle: "Hypothetical First Universal Common Ancestor and lost stem lineages",
    timeRangeDisplay: "Date Uncertain (Hypothetical Pre-LUCA)",
    approximateMya: undefined, // Explicitly undefined to avoid inventing false precision
    scientificCertitude: "theoretical_construct",
    statusLabel: "Theoretical Evolutionary Construct",
    narrativeOverview: [
      "The First Universal Common Ancestor (FUCA) is a theoretical concept representing the earliest common ancestor of all biological life that ever arose from abiogenesis—including extinct, lost lineages that branched off prior to LUCA.",
      "FUCA is fundamentally distinct from LUCA. While LUCA is the inferred coalescence point of all SURVIVING modern cellular life, FUCA represents the primordial emergence of compartmentalized genetic replication.",
      "Because no physical fossils, preserved geological signatures, or surviving pre-LUCA sister branches exist today, science cannot assign FUCA a definitive morphological structure, exact metabolism, specific genome size, or precise geological date. It is treated as an uncertainty-qualified conceptual milestone.",
    ],
    empiricalEvidence: [
      "Universal conservation of core biochemical machinery across all extant life (ribosomal peptidyl transferase center, 64-codon cipher, ATP synthase) demonstrates that surviving life converged through a single bottleneck (LUCA), leaving earlier stem lineages unrepresented in modern genomes.",
    ],
    activeHypotheses: [
      "Protocellular communal collectives: Early pre-LUCA evolution may have occurred within interconnected lipid vesicles undergoing rampant lateral gene transfer, rather than discrete, walled cellular species (Woese's Darwinian threshold).",
      "Peptide-RNA co-evolution: Primitive catalytic peptides and short RNA oligomers co-stabilized one another before modern complex ribosomes crystallized.",
      "Extinct non-LUCA Domains: Primordial life may have diversified into multiple early lineages that were subsequently wiped out or outcompeted during Archean environmental transitions.",
    ],
    uncertaintyNotes: [
      "DO NOT ASSIGN A PRECISE DATE: Proposed dates for FUCA (e.g., ~4.2–3.9 BYA) are purely speculative and model-dependent. No empirical consensus date exists.",
      "NOT A CONFIRMED TAXON: FUCA must not be modeled as an authoritative taxonomic node with parent-child cladistic links in the biological Tree of Life.",
    ],
    relevantElements: ["RNA", "Lipids", "Peptides", "ATP"],
    citations: [
      {
        authorYear: "Woese (2002)",
        title: "On the evolution of cells",
        source: "Proceedings of the National Academy of Sciences, 99(13): 8742–8747",
      },
      {
        authorYear: "Weiss et al. (2018)",
        title: "The physiology and habitat of the last universal common ancestor",
        source: "Nature Microbiology, 1(9): 16116",
      },
      {
        authorYear: "Prosdocimi et al. (2019)",
        title: "The First Universal Common Ancestor (FUCA) as the earliest ancestor of life's stem group",
        source: "Journal of Theoretical Biology, 478: 104–110",
      },
    ],
    visualTheme: {
      accentColor: "#ec4899",
      secondaryColor: "#a855f7",
      badgeBg: "rgba(236, 72, 153, 0.12)",
      badgeBorder: "rgba(236, 72, 153, 0.35)",
      icon: "🧬",
    },
  },
  {
    id: "luca-transition",
    stageType: "luca",
    stageNumber: "Stage E",
    title: "LUCA & The Biological Phylogeny Threshold",
    subtitle: "The Last Universal Common Ancestor and root of the 92-node Tree of Life",
    timeRangeDisplay: "~3.8 – 3.5 BYA",
    approximateMya: 3800,
    scientificCertitude: "established_consensus",
    statusLabel: "Established Phylogenomic Inference (Root of Tree)",
    narrativeOverview: [
      "LUCA—the Last Universal Common Ancestor—is the inferred ancestral cellular population from which every organism on the living Tree of Life descends. LUCA is anchored at ~3.8 billion years ago as the single root of the biological dataset.",
      "LUCA was not the first life form on Earth, nor was it necessarily a solitary individual organism. It was a sophisticated, anaerobic, thermophilic population equipped with DNA/RNA replication, a universal 64-codon genetic code, ribosomes, 20 L-amino acids, and membrane-associated ATP synthase.",
      "From LUCA, the tree bifurcated into the two primary prokaryotic domains: Bacteria and Archaea. More than 1.5 billion years later, symbiogenesis between an Asgard-related archaeon and an alphaproteobacterial endosymbiont gave rise to Eukaryota.",
      "Selecting LUCA in the Tree Explorer provides the direct entry point into the verified 92-node biological cladistic phylogeny.",
    ],
    empiricalEvidence: [
      "Universal molecular homologies shared across all 92 taxa: universal genetic code, homologous ribosomal RNA (16S/18S, 23S/28S), universal ATP synthase, and shared L-amino acid stereochemistry.",
      "Phylogenomic reconstruction identifying ~355 protein-coding gene families present in the common ancestor of Bacteria and Archaea (Weiss et al. 2016).",
      "Stromatolite fossil formations from Pilbara, Australia, confirming complex benthic microbial communities by ~3.48 BYA.",
    ],
    activeHypotheses: [
      "Whether LUCA possessed a modern phospholipid bilayer or an intermediate hybrid isoprenoid/fatty-acid membrane prior to the lipid divide.",
      "Exact hydrothermal habitat (deep-sea alkaline hydrothermal vent chimney versus volcanic terrestrial pool).",
    ],
    uncertaintyNotes: [
      "LUCA represents the root of SURVIVING cellular life. Extinct primordial sister branches that left no descendants in modern genomes are invisible to cladistics.",
    ],
    relevantElements: ["DNA", "RNA", "Ribosomes", "ATP Synthase", "Proteins"],
    citations: [
      {
        authorYear: "Weiss et al. (2016)",
        title: "The physiology and habitat of the last universal common ancestor",
        source: "Nature Microbiology, 1(9): 16116",
      },
      {
        authorYear: "Woese & Fox (1977)",
        title: "Phylogenetic structure of the prokaryotic domain: the primary kingdoms",
        source: "Proceedings of the National Academy of Sciences, 74(11): 5088–5090",
      },
      {
        authorYear: "Doolittle (1999)",
        title: "Phylogenetic classification and the universal tree",
        source: "Science, 284(5423): 2124–2129",
      },
    ],
    visualTheme: {
      accentColor: "#10b981",
      secondaryColor: "#3d8ef8",
      badgeBg: "rgba(16, 185, 129, 0.12)",
      badgeBorder: "rgba(16, 185, 129, 0.35)",
      icon: "🌱",
    },
  },
];
