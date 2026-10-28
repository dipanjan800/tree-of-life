// ============================================================
// Tree of Life — "The Story of Life" Narrative Data
// 7-Stage Scientific Progression adhering to SCIENTIFIC_DATA_POLICY.md
// ============================================================

export interface StoryStage {
  id: string;
  stageNumber: number;
  title: string;
  subtitle: string;
  timeRange: string;
  eonOrEra: string;
  myaRange: [number, number]; // [startMya, endMya]
  narrativeParagraphs: string[];
  scientificNotes?: {
    label: "Established Consensus" | "Active Hypothesis" | "Uncertainty Note";
    text: string;
  }[];
  keyMilestones: string[];
  visualTheme: {
    accentColor: string;
    ambientGradient: string;
    icon: string;
  };
  attribution: {
    subject: string;
    source: string;
    credit: string;
    license: string;
  };
}

export const STORY_STAGES: StoryStage[] = [
  {
    id: "cosmic-origins",
    stageNumber: 0,
    title: "We Are Made of Stardust",
    subtitle: "From the first elements to the chemical ingredients of life",
    timeRange: "~13.8 – 4.54 BYA",
    eonOrEra: "Cosmic Dawn to Solar Nebula",
    myaRange: [13800, 4540],
    narrativeParagraphs: [
      "In the first minutes following the Big Bang approximately 13.8 billion years ago, the expanding cosmos cooled sufficiently for fundamental particles to combine. During this brief window of Big Bang nucleosynthesis, the universe forged almost exclusively hydrogen (roughly 75% of baryonic mass) and helium (roughly 25%), accompanied by only minute trace amounts of lithium. The nascent cosmos possessed neither carbon, oxygen, nor iron; stars, rocky minerals, and planets did not yet exist.",
      "Hundreds of millions of years later, gravity condensed primordial gas clouds into the first generation of massive stars. In their extreme stellar cores, sustained thermonuclear fusion forged carbon, nitrogen, oxygen, and heavier elements up to iron (Fe-56). Because core fusion cannot yield net energy beyond iron, elements heavier than iron required alternative, highly energetic astrophysical mechanisms—principally slow and rapid neutron capture (s-process and r-process) occurring in asymptotic giant branch stars, core-collapse supernovae, and colliding binary neutron stars (kilonovae). Powerful stellar winds, planetary nebulae, and stellar explosions subsequently dispersed these newly forged elements across interstellar space.",
      "Over billions of years, successive generations of stars progressively enriched the interstellar medium with heavier elements. Approximately 4.6 billion years ago, a dense molecular cloud seeded with this interstellar material collapsed under its own gravity to form our Solar Nebula—a spinning protoplanetary disk orbiting the proto-Sun. In the inner disk, volatile gases were driven outward while refractory silicates, iron, nickel, and carbonaceous grains accreted through planetesimal collisions, consolidating into Earth around 4.54 billion years ago. Every atom of iron in our blood, phosphorus in our DNA, and calcium in our bones originated in the nuclear furnaces and violent deaths of ancient stars.",
      "All known terrestrial life relies centrally on six primary chemical elements—CHNOPS: Carbon (the versatile structural backbone of organic macromolecules), Hydrogen and Oxygen (which form the universal aqueous medium, water, and drive proton-gradient energetics), Nitrogen (the essential component of amino acids, proteins, and nucleic acid bases), Phosphorus (the linking backbone of DNA and RNA and the high-energy ester bonds of ATP), and Sulfur (essential for polypeptide disulfide folding and catalytic iron-sulfur clusters). Analyses of carbonaceous chondrite meteorites, such as the Murchison meteorite, along with interstellar dust observations, demonstrate that amino acids and other complex organic compounds form readily through abiotic cosmic chemistry. Crucially, however, the abiotic presence of organic molecules does not constitute life. How non-living organic chemistry on early Earth transitioned into autonomous, compartmentalized, self-replicating metabolic systems remains one of the great open frontiers in modern science.",
    ],
    scientificNotes: [
      {
        label: "Established Consensus",
        text: "Big Bang nucleosynthesis yielded exclusively hydrogen, helium, and trace lithium. Elements heavier than lithium were synthesized via stellar core fusion, neutron capture (s-process and r-process in supernovae and kilonovae), and cosmic ray spallation.",
      },
      {
        label: "Established Consensus",
        text: "Carbonaceous chondrite meteorites (e.g., Murchison) carry over 70 abiotic amino acids, nitrogenous bases, and polycyclic hydrocarbons formed non-biologically in astrophysical environments.",
      },
      {
        label: "Active Hypothesis",
        text: "Whether the initial prebiotic chemical feedstock for life was delivered exogenously through meteorite and comet bombardment during late accretion or synthesized endogenously in deep-sea alkaline hydrothermal vents remains an active scientific debate.",
      },
      {
        label: "Uncertainty Note",
        text: "Abiotic organic molecules are not living systems. The discovery of extraterrestrial amino acids demonstrates widespread cosmic organic chemistry, but does not prove life originated in space or establish the exact pathway of terrestrial abiogenesis.",
      },
    ],
    keyMilestones: [
      "Big Bang nucleosynthesis produces primordial H, He & trace Li (~13.8 BYA)",
      "First stars ignite & synthesize elements up to iron via nuclear fusion (~13.6–12 BYA)",
      "Supernovae & neutron star mergers disperse heavy elements into space",
      "Gravitational collapse of Solar Nebula forms Sun & protoplanetary disk (~4.6 BYA)",
      "Accretion of Earth (~4.54 BYA) & prebiotic availability of CHNOPS elements",
    ],
    visualTheme: {
      accentColor: "#a855f7", // Cosmic purple
      ambientGradient: "radial-gradient(ellipse 65% 55% at 50% 30%, rgba(168, 85, 247, 0.12) 0%, transparent 75%)",
      icon: "✨",
    },
    attribution: {
      subject: "Cosmic Nucleosynthesis & Protoplanetary Disk",
      source: "Astrophysical Reference Concepts (NASA/ESA Inspired)",
      credit: "Procedural Astrophysical Vector Model (Educational)",
      license: "Original Procedural Vector Asset (Educational CC-BY 4.0)",
    },
  },
  {
    id: "prebiotic-earth",
    stageNumber: 1,
    title: "The Prebiotic Cradle",
    subtitle: "The violent, dynamic environment of early Earth",
    timeRange: "~4.54 – 4.0 BYA",
    eonOrEra: "Hadean Eon",
    myaRange: [4540, 4000],
    narrativeParagraphs: [
      "More than 4.5 billion years ago, Earth coalesced from a swirling accretion disk of gas and interstellar dust. In its infancy, our planet was a volatile crucible: scorched by planetary collisions, enveloped in dense greenhouse atmospheres of nitrogen, carbon dioxide, and water vapor, and illuminated by a younger, fainter sun.",
      "As volcanic outgassing subsided and surface temperatures cooled below the boiling point, torrential planetary rains filled the first ocean basins. Hydrothermal vent systems along the deep seabed began circulating mineral-laden supercritical fluids, creating thermal and chemical gradients rich in iron-sulfur minerals, methane, and hydrogen.",
    ],
    scientificNotes: [
      {
        label: "Established Consensus",
        text: "Zircon crystals from Western Australia demonstrate that liquid water oceans and a crust existed as early as 4.4 billion years ago.",
      },
      {
        label: "Active Hypothesis",
        text: "Whether prebiotic organic synthesis occurred predominantly at alkaline hydrothermal vents, volcanic pumice rafts, or subaerial geothermal pools remains an active area of geochemical research.",
      },
    ],
    keyMilestones: [
      "Formation of Earth & Moon (~4.51 BYA)",
      "Condensation of primeval oceans (~4.4 BYA)",
      "Synthesis of basic prebiotic amino acids & nucleotides",
    ],
    visualTheme: {
      accentColor: "#f97316", // Warm magma amber
      ambientGradient: "radial-gradient(ellipse 65% 55% at 50% 30%, rgba(249, 115, 22, 0.12) 0%, transparent 75%)",
      icon: "🌋",
    },
    attribution: {
      subject: "Early Earth Prebiotic Environment",
      source: "NASA Astrobiology / JPL-Caltech",
      credit: "Tim Pyle / NASA",
      license: "Public Domain (NASA Educational)",
    },
  },
  {
    id: "emergence-of-life",
    stageNumber: 2,
    title: "The Spark of Self-Replication",
    subtitle: "The transition from prebiotic chemistry to biology",
    timeRange: "~4.0 – 3.8 BYA",
    eonOrEra: "Late Hadean / Early Archean",
    myaRange: [4000, 3800],
    narrativeParagraphs: [
      "Somewhere in the ancient oceans, organic chemistry crossed an astonishing threshold. Molecules learned to store biological information and catalyze their own synthesis. This emergence of self-sustaining metabolism and compartmentalized replication marks the dawn of life on Earth.",
      "Crucially, modern science does not claim to know the exact mechanism of abiogenesis. The 'RNA World' hypothesis proposes that ribonucleic acid originally served dual roles—both storing genetic memory and catalyzing metabolic reactions before proteins and DNA took over.",
      "It is vital to distinguish this origin event from LUCA: life began long before LUCA existed, through diverse protocells and early communal lineages that left no living descendants today.",
    ],
    scientificNotes: [
      {
        label: "Uncertainty Note",
        text: "Abiogenesis is NOT LUCA. Life likely originated through protocellular collectives and lateral exchange hundreds of millions of years prior to LUCA.",
      },
      {
        label: "Active Hypothesis",
        text: "The RNA World model and Iron-Sulfur World theory represent leading hypotheses for early biochemical energetics.",
      },
    ],
    keyMilestones: [
      "Formation of lipid membrane protocells",
      "Catalytic RNA ribozymes and early genetic code",
      "Coupling of proton gradients with primitive ATP synthesis",
    ],
    visualTheme: {
      accentColor: "#06b6d4", // Electric cyan
      ambientGradient: "radial-gradient(ellipse 65% 55% at 50% 30%, rgba(6, 182, 212, 0.12) 0%, transparent 75%)",
      icon: "⚡",
    },
    attribution: {
      subject: "Deep-Sea Hydrothermal Vent Chimney",
      source: "NOAA Ocean Exploration",
      credit: "NOAA / OER",
      license: "Public Domain (US Government)",
    },
  },
  {
    id: "microbial-world",
    stageNumber: 3,
    title: "The Deep Microbial Ocean & LUCA",
    subtitle: "Single-celled dominion and the Great Oxidation Event",
    timeRange: "~3.8 – 2.0 BYA",
    eonOrEra: "Archean to Early Proterozoic",
    myaRange: [3800, 2000],
    narrativeParagraphs: [
      "Around 3.8 to 3.5 billion years ago, the Last Universal Common Ancestor (LUCA) flourished: an anaerobic, thermophilic population equipped with a universal genetic code, ribosomes, and ATP synthase. From LUCA, the tree branched into two primary prokaryotic domains: Bacteria and Archaea.",
      "For billions of years, life remained entirely microscopic, yet its planetary impact was titanic. Cyanobacteria evolved oxygenic photosynthesis, capturing solar photons to split water molecules. By ~2.4 billion years ago, dissolved oxygen saturated ocean basins and spilled into the atmosphere—the Great Oxidation Event (GOE)—permanently re-engineering Earth's geochemical cycles.",
    ],
    scientificNotes: [
      {
        label: "Established Consensus",
        text: "Stromatolite fossils from Australia confirm microbial benthic mats existed at least 3.48 billion years ago.",
      },
      {
        label: "Established Consensus",
        text: "All living cellular organisms share the exact same genetic code and core ATP synthase machinery inherited from LUCA.",
      },
    ],
    keyMilestones: [
      "Last Universal Common Ancestor (LUCA) (~3.8 BYA)",
      "Bifurcation into Bacteria and Archaea",
      "Evolution of oxygenic photosynthesis by Cyanobacteria",
      "The Great Oxidation Event (GOE ~2.45 BYA)",
    ],
    visualTheme: {
      accentColor: "#10b981", // Emerald chlorophyll
      ambientGradient: "radial-gradient(ellipse 65% 55% at 50% 30%, rgba(16, 185, 129, 0.12) 0%, transparent 75%)",
      icon: "🦠",
    },
    attribution: {
      subject: "Modern Shark Bay Stromatolite Formations",
      source: "Wikimedia Commons",
      credit: "Paul Harrison / CC-BY-SA 3.0",
      license: "CC-BY-SA 3.0",
    },
  },
  {
    id: "endosymbiosis-complex-life",
    stageNumber: 4,
    title: "Eukaryogenesis & The Complex Cell",
    subtitle: "A partnership that forged complex multicellularity",
    timeRange: "~2.0 – 0.54 BYA",
    eonOrEra: "Proterozoic Eon",
    myaRange: [2000, 541],
    narrativeParagraphs: [
      "Approximately 1.8 to 2.0 billion years ago, the most consequential symbiosis in evolutionary history took place: an Asgard-related archaeon engulfed an alphaproteobacterium. Instead of digestion, the bacterium became a permanent internal powerhouse—the mitochondrion. This gave rise to the Eukaryota.",
      "With an astronomical increase in accessible cellular energy, eukaryotes evolved intricate internal membranes, a protective cell nucleus, sexual reproduction, and eventually complex multicellularity. In the late Ediacaran (~570 MYA), soft-bodied enigmatic fronds and disc-like organisms like Dickinsonia drifted in shallow, oxygenated waters.",
    ],
    scientificNotes: [
      {
        label: "Established Consensus",
        text: "Endosymbiotic theory (pioneered by Lynn Margulis) is universally verified by mitochondrial circular DNA and bacterial-type ribosomes.",
      },
      {
        label: "Active Hypothesis",
        text: "The exact phylogenetic position of Eukaryota branching from within the Asgardarchaeota superphylum remains an active frontier of phylogenomics.",
      },
    ],
    keyMilestones: [
      "Mitochondrial endosymbiosis (~1.8–2.0 BYA)",
      "Plastid endosymbiosis giving rise to green algae & plants (~1.5 BYA)",
      "Ediacaran soft-bodied macro-biota (~575–541 MYA)",
    ],
    visualTheme: {
      accentColor: "#8b5cf6", // Royal eukaryotic purple
      ambientGradient: "radial-gradient(ellipse 65% 55% at 50% 30%, rgba(139, 92, 246, 0.12) 0%, transparent 75%)",
      icon: "🧬",
    },
    attribution: {
      subject: "Ediacaran Dickinsonia Fossil Specimen",
      source: "South Australia Museum / Wikimedia",
      credit: "Verisimilus / Museum Collections",
      license: "CC-BY-SA 3.0",
    },
  },
  {
    id: "major-radiations",
    stageNumber: 5,
    title: "The Explosion of Diversity & Land Invasion",
    subtitle: "Body plans, forests, flight, and the crucible of extinctions",
    timeRange: "~541 – 66 MYA",
    eonOrEra: "Paleozoic & Mesozoic Eras",
    myaRange: [541, 66],
    narrativeParagraphs: [
      "At the onset of the Cambrian (~541 MYA), mineralized shells, compound eyes, predatory appendages, and bilaterian body architectures erupted in the fossil record. Lineages diversified into arthropods, mollusks, echinoderms, and early chordates.",
      "Life ventured beyond the surf: non-vascular bryophytes and mycorrhizal fungi carpeted barren continents, followed by towering Carboniferous lycophyte forests that locked away carbon and drove atmospheric oxygen to historical peaks. Tetrapods crawled onto land, evolving into synapsids (ancestral mammals) and sauropsids (reptiles, dinosaurs, and birds), surviving five catastrophic mass extinctions.",
    ],
    scientificNotes: [
      {
        label: "Established Consensus",
        text: "Birds are living theropod dinosaurs, directly surviving the Cretaceous-Paleogene (K-Pg) asteroid impact 66 million years ago.",
      },
      {
        label: "Established Consensus",
        text: "Over 99% of all species that have ever lived on Earth are now extinct, reflecting the relentless dynamics of natural selection.",
      },
    ],
    keyMilestones: [
      "Cambrian Explosion of bilaterian marine animals (~541 MYA)",
      "Plant & fungal colonization of terrestrial land (~470 MYA)",
      "End-Permian mass extinction wipes out ~90% of species (~252 MYA)",
      "Reign and K-Pg extinction of non-avian dinosaurs (~66 MYA)",
    ],
    visualTheme: {
      accentColor: "#ec4899", // Vibrant coral rose
      ambientGradient: "radial-gradient(ellipse 65% 55% at 50% 30%, rgba(236, 72, 153, 0.12) 0%, transparent 75%)",
      icon: "🦖",
    },
    attribution: {
      subject: "Cambrian Burgess Shale Marine Biota",
      source: "Wikimedia Commons",
      credit: "Nobu Tamura (Artistic Reconstruction) / CC-BY-SA 4.0",
      license: "CC-BY-SA 4.0",
    },
  },
  {
    id: "hominin-lineage",
    stageNumber: 6,
    title: "The Twig of Humanity",
    subtitle: "A modest terminal branch in the primate canopy",
    timeRange: "~7 MYA – Present",
    eonOrEra: "Late Cenozoic (Neogene to Quaternary)",
    myaRange: [7, 0],
    narrativeParagraphs: [
      "Following the K-Pg extinction, placental mammals radiated across newly vacant ecological niches. In African forests and expanding savannas, primates developed stereoscopic vision, flexible grasping hands, and social brain networks.",
      "Between 7 and 6 million years ago, the hominin lineage diverged from our closest living relatives, the ancestors of chimpanzees and bonobos. Bipedalism arose early in Sahelanthropus and Australopithecus, followed by systematic stone tool manufacture, controlled use of fire, and expanded encephalization in Homo erectus.",
      "Homo sapiens emerged roughly 300,000 years ago—not as the pinnacle or purpose of evolution, but as one young twig on an ancient tree, inextricably bound to every other living creature.",
    ],
    scientificNotes: [
      {
        label: "Established Consensus",
        text: "Genetic analysis proves humans and chimpanzees share ~98.8% DNA sequence identity, inheriting common ancestry ~6–8 MYA.",
      },
      {
        label: "Established Consensus",
        text: "Human evolution was a bushy, branching mosaic of coexisting species (including Neanderthals and Denisovans), not a linear march.",
      },
    ],
    keyMilestones: [
      "Hominin / Pan divergence in Africa (~7–6 MYA)",
      "Bipedal Australopithecines (e.g., 'Lucy' ~3.2 MYA)",
      "Oldowan lithic tool technology (~2.6 MYA)",
      "Anatomically modern Homo sapiens emerges (~300,000 years ago)",
    ],
    visualTheme: {
      accentColor: "#3d8ef8", // Sapphire blue
      ambientGradient: "radial-gradient(ellipse 65% 55% at 50% 30%, rgba(61, 142, 248, 0.12) 0%, transparent 75%)",
      icon: "🌍",
    },
    attribution: {
      subject: "Hominin Cranial Evolutionary Sequence",
      source: "Smithsonian National Museum of Natural History",
      credit: "Smithsonian Human Origins Program / Chip Clark",
      license: "Open Access Educational (CC0 / Smithsonian)",
    },
  },
  {
    id: "living-biosphere",
    stageNumber: 7,
    title: "The Interconnected Tree",
    subtitle: "From single-celled roots to millions of living branches",
    timeRange: "Present Day",
    eonOrEra: "Anthropocene / Holocene",
    myaRange: [0, 0],
    narrativeParagraphs: [
      "Today, our planet harbors an estimated 8.7 million eukaryotic species—alongside hundreds of millions of microbial strains—all tracing their lineage back to the self-same primeval ancestors in Archean waters.",
      "Every bacterium on your skin, every redwood tree in the coastal fog, every whale diving into ocean trenches, and every human being shares a single continuous genealogy. We are not outside nature looking in: we are a branch of the living tree.",
      "Step inside the interactive Explorer to trace the branches, examine clades, investigate deep-time divergences, and navigate 3.8 billion years of natural history.",
    ],
    scientificNotes: [
      {
        label: "Established Consensus",
        text: "All living cellular organisms use identical L-amino acids for proteins, D-sugars for nucleic acids, and a near-universal 64-codon genetic cipher.",
      },
    ],
    keyMilestones: [
      "~8.7 million modern eukaryotic species",
      "Billions of microbial lineages spanning every Earth biome",
      "A unified genealogical tapestry spanning 3.8+ billion years",
    ],
    visualTheme: {
      accentColor: "#38bdf8", // Sky blue
      ambientGradient: "radial-gradient(ellipse 70% 60% at 50% 30%, rgba(56, 189, 248, 0.15) 0%, transparent 80%)",
      icon: "🌳",
    },
    attribution: {
      subject: "Interactive Phylogenetic Exploration",
      source: "Tree of Life Core Project",
      credit: "Tree of Life Engine",
      license: "Creative Commons Attribution 4.0",
    },
  },
];
