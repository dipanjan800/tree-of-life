// ============================================================
// Tree of Life — Localized Story Stages Dictionaries
// All 8 stages for all five supported languages:
// en, bn-IN, hi-IN, es, fr.
// ============================================================

import type { LocalizedStoryStage } from "../types";

export const storyEN: Record<string, LocalizedStoryStage> = {
  "cosmic-origins": {
    id: "cosmic-origins",
    title: "We Are Made of Stardust",
    subtitle: "From the first elements to the chemical ingredients of life",
    timeRange: "~13.8 – 4.54 BYA",
    eonOrEra: "Cosmic Dawn to Solar Nebula",
    narrativeParagraphs: [
    "In the first minutes following the Big Bang approximately 13.8 billion years ago, the expanding cosmos cooled sufficiently for fundamental particles to combine. During this brief window of Big Bang nucleosynthesis, the universe forged almost exclusively hydrogen (roughly 75% of baryonic mass) and helium (roughly 25%), accompanied by only minute trace amounts of lithium. The nascent cosmos possessed neither carbon, oxygen, nor iron; stars, rocky minerals, and planets did not yet exist.",
    "Hundreds of millions of years later, gravity condensed primordial gas clouds into the first generation of massive stars. In their extreme stellar cores, sustained thermonuclear fusion forged carbon, nitrogen, oxygen, and heavier elements up to iron (Fe-56). Because core fusion cannot yield net energy beyond iron, elements heavier than iron required alternative, highly energetic astrophysical mechanisms—principally slow and rapid neutron capture (s-process and r-process) occurring in asymptotic giant branch stars, core-collapse supernovae, and colliding binary neutron stars (kilonovae). Powerful stellar winds, planetary nebulae, and stellar explosions subsequently dispersed these newly forged elements across interstellar space.",
    "Over billions of years, successive generations of stars progressively enriched the interstellar medium with heavier elements. Approximately 4.6 billion years ago, a dense molecular cloud seeded with this interstellar material collapsed under its own gravity to form our Solar Nebula—a spinning protoplanetary disk orbiting the proto-Sun. In the inner disk, volatile gases were driven outward while refractory silicates, iron, nickel, and carbonaceous grains accreted through planetesimal collisions, consolidating into Earth around 4.54 billion years ago. Every atom of iron in our blood, phosphorus in our DNA, and calcium in our bones originated in the nuclear furnaces and violent deaths of ancient stars.",
    "All known terrestrial life relies centrally on six primary chemical elements—CHNOPS: Carbon (the versatile structural backbone of organic macromolecules), Hydrogen and Oxygen (which form the universal aqueous medium, water, and drive proton-gradient energetics), Nitrogen (the essential component of amino acids, proteins, and nucleic acid bases), Phosphorus (the linking backbone of DNA and RNA and the high-energy ester bonds of ATP), and Sulfur (essential for polypeptide disulfide folding and catalytic iron-sulfur clusters). Analyses of carbonaceous chondrite meteorites, such as the Murchison meteorite, along with interstellar dust observations, demonstrate that amino acids and other complex organic compounds form readily through abiotic cosmic chemistry. Crucially, however, the abiotic presence of organic molecules does not constitute life. How non-living organic chemistry on early Earth transitioned into autonomous, compartmentalized, self-replicating metabolic systems remains one of the great open frontiers in modern science."
],
    keyMilestones: [
    "Big Bang nucleosynthesis produces primordial H, He & trace Li (~13.8 BYA)",
    "First stars ignite & synthesize elements up to iron via nuclear fusion (~13.6–12 BYA)",
    "Supernovae & neutron star mergers disperse heavy elements into space",
    "Gravitational collapse of Solar Nebula forms Sun & protoplanetary disk (~4.6 BYA)",
    "Accretion of Earth (~4.54 BYA) & prebiotic availability of CHNOPS elements"
],
    scientificNotes: [
    {
        "label": "Established Consensus",
        "text": "Big Bang nucleosynthesis yielded exclusively hydrogen, helium, and trace lithium. Elements heavier than lithium were synthesized via stellar core fusion, neutron capture (s-process and r-process in supernovae and kilonovae), and cosmic ray spallation."
    },
    {
        "label": "Established Consensus",
        "text": "Carbonaceous chondrite meteorites (e.g., Murchison) carry over 70 abiotic amino acids, nitrogenous bases, and polycyclic hydrocarbons formed non-biologically in astrophysical environments."
    },
    {
        "label": "Active Hypothesis",
        "text": "Whether the initial prebiotic chemical feedstock for life was delivered exogenously through meteorite and comet bombardment during late accretion or synthesized endogenously in deep-sea alkaline hydrothermal vents remains an active scientific debate."
    },
    {
        "label": "Uncertainty Note",
        "text": "Abiotic organic molecules are not living systems. The discovery of extraterrestrial amino acids demonstrates widespread cosmic organic chemistry, but does not prove life originated in space or establish the exact pathway of terrestrial abiogenesis."
    }
],
  },
  "prebiotic-earth": {
    id: "prebiotic-earth",
    title: "The Prebiotic Cradle",
    subtitle: "The violent, dynamic environment of early Earth",
    timeRange: "~4.54 – 4.0 BYA",
    eonOrEra: "Hadean Eon",
    narrativeParagraphs: [
    "More than 4.5 billion years ago, Earth coalesced from a swirling accretion disk of gas and interstellar dust. In its infancy, our planet was a volatile crucible: scorched by planetary collisions, enveloped in dense greenhouse atmospheres of nitrogen, carbon dioxide, and water vapor, and illuminated by a younger, fainter sun.",
    "As volcanic outgassing subsided and surface temperatures cooled below the boiling point, torrential planetary rains filled the first ocean basins. Hydrothermal vent systems along the deep seabed began circulating mineral-laden supercritical fluids, creating thermal and chemical gradients rich in iron-sulfur minerals, methane, and hydrogen."
],
    keyMilestones: [
    "Formation of Earth & Moon (~4.51 BYA)",
    "Condensation of primeval oceans (~4.4 BYA)",
    "Synthesis of basic prebiotic amino acids & nucleotides"
],
    scientificNotes: [
    {
        "label": "Established Consensus",
        "text": "Zircon crystals from Western Australia demonstrate that liquid water oceans and a crust existed as early as 4.4 billion years ago."
    },
    {
        "label": "Active Hypothesis",
        "text": "Whether prebiotic organic synthesis occurred predominantly at alkaline hydrothermal vents, volcanic pumice rafts, or subaerial geothermal pools remains an active area of geochemical research."
    }
],
  },
  "emergence-of-life": {
    id: "emergence-of-life",
    title: "The Spark of Self-Replication",
    subtitle: "The transition from prebiotic chemistry to biology",
    timeRange: "~4.0 – 3.8 BYA",
    eonOrEra: "Late Hadean / Early Archean",
    narrativeParagraphs: [
    "Somewhere in the ancient oceans, organic chemistry crossed an astonishing threshold. Molecules learned to store biological information and catalyze their own synthesis. This emergence of self-sustaining metabolism and compartmentalized replication marks the dawn of life on Earth.",
    "Crucially, modern science does not claim to know the exact mechanism of abiogenesis. The 'RNA World' hypothesis proposes that ribonucleic acid originally served dual roles—both storing genetic memory and catalyzing metabolic reactions before proteins and DNA took over.",
    "It is vital to distinguish this origin event from LUCA: life began long before LUCA existed, through diverse protocells and early communal lineages that left no living descendants today."
],
    keyMilestones: [
    "Formation of lipid membrane protocells",
    "Catalytic RNA ribozymes and early genetic code",
    "Coupling of proton gradients with primitive ATP synthesis"
],
    scientificNotes: [
    {
        "label": "Uncertainty Note",
        "text": "Abiogenesis is NOT LUCA. Life likely originated through protocellular collectives and lateral exchange hundreds of millions of years prior to LUCA."
    },
    {
        "label": "Active Hypothesis",
        "text": "The RNA World model and Iron-Sulfur World theory represent leading hypotheses for early biochemical energetics."
    }
],
  },
  "microbial-world": {
    id: "microbial-world",
    title: "The Deep Microbial Ocean & LUCA",
    subtitle: "Single-celled dominion and the Great Oxidation Event",
    timeRange: "~3.8 – 2.0 BYA",
    eonOrEra: "Archean to Early Proterozoic",
    narrativeParagraphs: [
    "Around 3.8 to 3.5 billion years ago, the Last Universal Common Ancestor (LUCA) flourished: an anaerobic, thermophilic population equipped with a universal genetic code, ribosomes, and ATP synthase. From LUCA, the tree branched into two primary prokaryotic domains: Bacteria and Archaea.",
    "For billions of years, life remained entirely microscopic, yet its planetary impact was titanic. Cyanobacteria evolved oxygenic photosynthesis, capturing solar photons to split water molecules. By ~2.4 billion years ago, dissolved oxygen saturated ocean basins and spilled into the atmosphere—the Great Oxidation Event (GOE)—permanently re-engineering Earth's geochemical cycles."
],
    keyMilestones: [
    "Last Universal Common Ancestor (LUCA) (~3.8 BYA)",
    "Bifurcation into Bacteria and Archaea",
    "Evolution of oxygenic photosynthesis by Cyanobacteria",
    "The Great Oxidation Event (GOE ~2.45 BYA)"
],
    scientificNotes: [
    {
        "label": "Established Consensus",
        "text": "Stromatolite fossils from Australia confirm microbial benthic mats existed at least 3.48 billion years ago."
    },
    {
        "label": "Established Consensus",
        "text": "All living cellular organisms share the exact same genetic code and core ATP synthase machinery inherited from LUCA."
    }
],
  },
  "endosymbiosis-complex-life": {
    id: "endosymbiosis-complex-life",
    title: "Eukaryogenesis & The Complex Cell",
    subtitle: "A partnership that forged complex multicellularity",
    timeRange: "~2.0 – 0.54 BYA",
    eonOrEra: "Proterozoic Eon",
    narrativeParagraphs: [
    "Approximately 1.8 to 2.0 billion years ago, the most consequential symbiosis in evolutionary history took place: an Asgard-related archaeon engulfed an alphaproteobacterium. Instead of digestion, the bacterium became a permanent internal powerhouse—the mitochondrion. This gave rise to the Eukaryota.",
    "With an astronomical increase in accessible cellular energy, eukaryotes evolved intricate internal membranes, a protective cell nucleus, sexual reproduction, and eventually complex multicellularity. In the late Ediacaran (~570 MYA), soft-bodied enigmatic fronds and disc-like organisms like Dickinsonia drifted in shallow, oxygenated waters."
],
    keyMilestones: [
    "Mitochondrial endosymbiosis (~1.8–2.0 BYA)",
    "Plastid endosymbiosis giving rise to green algae & plants (~1.5 BYA)",
    "Ediacaran soft-bodied macro-biota (~575–541 MYA)"
],
    scientificNotes: [
    {
        "label": "Established Consensus",
        "text": "Endosymbiotic theory (pioneered by Lynn Margulis) is universally verified by mitochondrial circular DNA and bacterial-type ribosomes."
    },
    {
        "label": "Active Hypothesis",
        "text": "The exact phylogenetic position of Eukaryota branching from within the Asgardarchaeota superphylum remains an active frontier of phylogenomics."
    }
],
  },
  "major-radiations": {
    id: "major-radiations",
    title: "The Explosion of Diversity & Land Invasion",
    subtitle: "Body plans, forests, flight, and the crucible of extinctions",
    timeRange: "~541 – 66 MYA",
    eonOrEra: "Paleozoic & Mesozoic Eras",
    narrativeParagraphs: [
    "At the onset of the Cambrian (~541 MYA), mineralized shells, compound eyes, predatory appendages, and bilaterian body architectures erupted in the fossil record. Lineages diversified into arthropods, mollusks, echinoderms, and early chordates.",
    "Life ventured beyond the surf: non-vascular bryophytes and mycorrhizal fungi carpeted barren continents, followed by towering Carboniferous lycophyte forests that locked away carbon and drove atmospheric oxygen to historical peaks. Tetrapods crawled onto land, evolving into synapsids (ancestral mammals) and sauropsids (reptiles, dinosaurs, and birds), surviving five catastrophic mass extinctions."
],
    keyMilestones: [
    "Cambrian Explosion of bilaterian marine animals (~541 MYA)",
    "Plant & fungal colonization of terrestrial land (~470 MYA)",
    "End-Permian mass extinction wipes out ~90% of species (~252 MYA)",
    "Reign and K-Pg extinction of non-avian dinosaurs (~66 MYA)"
],
    scientificNotes: [
    {
        "label": "Established Consensus",
        "text": "Birds are living theropod dinosaurs, directly surviving the Cretaceous-Paleogene (K-Pg) asteroid impact 66 million years ago."
    },
    {
        "label": "Established Consensus",
        "text": "Over 99% of all species that have ever lived on Earth are now extinct, reflecting the relentless dynamics of natural selection."
    }
],
  },
  "hominin-lineage": {
    id: "hominin-lineage",
    title: "The Twig of Humanity",
    subtitle: "A modest terminal branch in the primate canopy",
    timeRange: "~7 MYA – Present",
    eonOrEra: "Late Cenozoic (Neogene to Quaternary)",
    narrativeParagraphs: [
    "Following the K-Pg extinction, placental mammals radiated across newly vacant ecological niches. In African forests and expanding savannas, primates developed stereoscopic vision, flexible grasping hands, and social brain networks.",
    "Between 7 and 6 million years ago, the hominin lineage diverged from our closest living relatives, the ancestors of chimpanzees and bonobos. Bipedalism arose early in Sahelanthropus and Australopithecus, followed by systematic stone tool manufacture, controlled use of fire, and expanded encephalization in Homo erectus.",
    "Homo sapiens emerged roughly 300,000 years ago—not as the pinnacle or purpose of evolution, but as one young twig on an ancient tree, inextricably bound to every other living creature."
],
    keyMilestones: [
    "Hominin / Pan divergence in Africa (~7–6 MYA)",
    "Bipedal Australopithecines (e.g., 'Lucy' ~3.2 MYA)",
    "Oldowan lithic tool technology (~2.6 MYA)",
    "Anatomically modern Homo sapiens emerges (~300,000 years ago)"
],
    scientificNotes: [
    {
        "label": "Established Consensus",
        "text": "Genetic analysis proves humans and chimpanzees share ~98.8% DNA sequence identity, inheriting common ancestry ~6–8 MYA."
    },
    {
        "label": "Established Consensus",
        "text": "Human evolution was a bushy, branching mosaic of coexisting species (including Neanderthals and Denisovans), not a linear march."
    }
],
  },
  "living-biosphere": {
    id: "living-biosphere",
    title: "The Interconnected Tree",
    subtitle: "From single-celled roots to millions of living branches",
    timeRange: "Present Day",
    eonOrEra: "Anthropocene / Holocene",
    narrativeParagraphs: [
    "Today, our planet harbors an estimated 8.7 million eukaryotic species—alongside hundreds of millions of microbial strains—all tracing their lineage back to the self-same primeval ancestors in Archean waters.",
    "Every bacterium on your skin, every redwood tree in the coastal fog, every whale diving into ocean trenches, and every human being shares a single continuous genealogy. We are not outside nature looking in: we are a branch of the living tree.",
    "Step inside the interactive Explorer to trace the branches, examine clades, investigate deep-time divergences, and navigate 3.8 billion years of natural history."
],
    keyMilestones: [
    "~8.7 million modern eukaryotic species",
    "Billions of microbial lineages spanning every Earth biome",
    "A unified genealogical tapestry spanning 3.8+ billion years"
],
    scientificNotes: [
    {
        "label": "Established Consensus",
        "text": "All living cellular organisms use identical L-amino acids for proteins, D-sugars for nucleic acids, and a near-universal 64-codon genetic cipher."
    }
],
  },
};

export const storyBN: Record<string, LocalizedStoryStage> = {
  "cosmic-origins": {
    id: "cosmic-origins",
    title: "আমরা নক্ষত্রধূলির সন্তান",
    subtitle: "মহাবিশ্বের আদিম উপাদান থেকে প্রাণের রাসায়নিক ভিত্তি",
    timeRange: "~১৩.৮ – ৪.৫৪ বিলিয়ন বছর আগে",
    eonOrEra: "মহাজাগতিক ভোর থেকে সৌর নীহারিকা",
    narrativeParagraphs: [
    "মহাবিস্ফোরণের (বিগ ব্যাং) প্রথম তিন মিনিটের মধ্যে কেবলমাত্র হাইড্রোজেন ও হিলিয়াম গঠিত হয়েছিল। তখন কোনো কার্বন, অক্সিজেন, লোহা বা প্রাণ ধারণের জন্য প্রয়োজনীয় উপাদান ছিল না।",
    "লক্ষ লক্ষ বছর পরে, মহাজাগতিক গ্যাসের সংকোচনে প্রথম প্রজন্মের বিশাল নক্ষত্রদের জন্ম হয়। তাদের জ্বলন্ত কেন্দ্রস্থলে পারমাণবিক ফিউশনের মাধ্যমে লোহা পর্যন্ত ভারী মৌলসমূহ তৈরি হয়।",
    "লোহার চেয়েও ভারী উপাদানগুলো তৈরি হয়েছে দানবীয় সুপারনোভা বিস্ফোরণ এবং দুটি নিউট্রন নক্ষত্রের সংঘর্ষে। এই মহাজাগতিক রাসায়নিক উপাদানগুলো গ্যালাক্সিতে ছড়িয়ে পড়ে গঠিত হয় আমাদের সৌরজগৎ ও পৃথিবী।",
    "আমাদের শরীরে প্রবাহিত রক্তে থাকা লোহা এবং ডিএনএ-র প্রতিটি পরমাণু কোটি কোটি বছর আগে কোনো বিলুপ্ত নক্ষত্রের জ্বলন্ত গর্ভে তৈরি হয়েছিল। আমরা আক্ষরিক অর্থেই নক্ষত্রের ধূলিকণা দিয়ে তৈরি।"
],
    keyMilestones: [
    "বিগ ব্যাং নিউক্লিওসিন্থেসিসে আদিম হাইড্রোজেন, হিলিয়াম ও লিথিয়াম তৈরি (~১৩.৮ BYA)",
    "প্রথম প্রজন্মের তারার নিউক্লিয়ার ফিউশনে লোহা পর্যন্ত মৌল সংশ্লেষ (~১৩.৬–১২ BYA)",
    "সুপারনোভা ও নিউট্রন স্টার সংঘর্ষের মাধ্যমে মহাকাশে ভারী মৌল ছড়িয়ে পড়া",
    "সৌর নীহারিকার পতনে সূর্য ও প্রোটোপ্ল্যানেটারি ডিস্কের সৃষ্টি (~৪.৬ BYA)",
    "পৃথিবীর সঞ্চয়ন (~৪.৫৪ BYA) এবং জীবনের জন্য CHNOPS মৌলের প্রাপ্যতা"
],
    scientificNotes: [
    {
        "label": "প্রতিষ্ঠিত বৈজ্ঞানিক ঐকমত্য",
        "text": "বিগ ব্যাং নিউক্লিওসিন্থেসিসে কেবল হাইড্রোজেন ও হিলিয়াম গঠিত হয়েছিল। লিথিয়ামের চেয়ে ভারী সমস্ত উপাদান নক্ষত্রের ফিউশন ও সুপারনোভার মাধ্যমে সৃষ্টি হয়েছে।"
    },
    {
        "label": "প্রতিষ্ঠিত বৈজ্ঞানিক ঐকমত্য",
        "text": "মারচিসন উল্কাপিণ্ডে ৭০টিরও বেশি অজৈব অ্যামিনো অ্যাসিড ও হাইড্রোকার্বন আবিষ্কৃত হয়েছে, যা মহাকাশের রাসায়নিক প্রাচুর্যের প্রমাণ।"
    },
    {
        "label": "সক্রিয় বৈজ্ঞানিক অনুমান",
        "text": "প্রাথমিক জীবনের রাসায়নিক উপাদান উল্কাপাতের মাধ্যমে বাইরে থেকে এসেছিল নাকি সমুদ্রের তলদেশের ক্ষারীয় হাইড্রোথার্মাল ভেন্টে তৈরি হয়েছিল—তা নিয়ে গবেষণা চলছে।"
    },
    {
        "label": "অনিশ্চয়তা সংক্রান্ত নোট",
        "text": "মহাজাগতিক জৈব অণুর উপস্থিতি প্রমাণ করে না যে জীবনের উৎপত্তি মহাকাশেই হয়েছিল; এটি কেবল মহাবিশ্বে রাসায়নিক উপাদানগুলির প্রাপ্যতা প্রদর্শন করে।"
    }
],
  },
  "prebiotic-earth": {
    id: "prebiotic-earth",
    title: "প্রিবায়োটিক ধাত্রীভূমি",
    subtitle: "আদি পৃথিবীর অশান্ত ও গতিশীল পরিবেশ",
    timeRange: "~৪.৫৪ – ৪.০ বিলিয়ন বছর আগে",
    eonOrEra: "হেডিয়ান ইয়ন",
    narrativeParagraphs: [
    "নবজাতক পৃথিবী ছিল আগ্নেয়গিরির লাভা ও মহাজাগতিক উল্কাপাতে উত্তপ্ত এক অগ্নিগর্ভ গোলক। চাঁদের সৃষ্টির মতো প্রচণ্ড সংঘর্ষ এই গ্রহের রূপ পরিবর্তন করেছিল।",
    "বায়ুমণ্ডল ধীরে ধীরে ঠাণ্ডা হয়ে শত শত বছর ধরে অবিরাম বৃষ্টির মাধ্যমে পৃথিবীর আদিম মহাসাগর তৈরি করেছিল। এই উষ্ণ পানিতেই জৈব অণুর প্রথম রাসায়নিক বিক্রিয়া শুরু হয়।"
],
    keyMilestones: [
    "পৃথিবী ও চাঁদের গঠন (~৪.৫১ BYA)",
    "আদিম তরল মহাসাগরের ঘনীভবন (~৪.৪ BYA)",
    "প্রাথমিক প্রিবায়োটিক অ্যামিনো অ্যাসিড ও নিউক্লিওটাইডের সংশ্লেষ"
],
    scientificNotes: [
    {
        "label": "প্রতিষ্ঠিত বৈজ্ঞানিক ঐকমত্য",
        "text": "পশ্চিম অস্ট্রেলিয়ার জিরকন ক্রিস্টাল প্রমাণ করে যে ৪.৪ বিলিয়ন বছর আগেই তরল জল ও ভূত্বক বিদ্যমান ছিল।"
    },
    {
        "label": "সক্রিয় বৈজ্ঞানিক অনুমান",
        "text": "প্রিবায়োটিক সংশ্লেষ ক্ষারীয় হাইড্রোথার্মাল ভেন্ট বা উষ্ণ কাদার কুণ্ডে ঘটেছিল কি না, তা ভূ-রসায়নের সক্রিয় গবেষণার বিষয়।"
    }
],
  },
  "emergence-of-life": {
    id: "emergence-of-life",
    title: "স্ব-প্রতিলিপির স্ফুলিঙ্গ",
    subtitle: "প্রিবায়োটিক রসায়ন থেকে জীববিজ্ঞানের রূপান্তর",
    timeRange: "~৪.০ – ৩.৮ বিলিয়ন বছর আগে",
    eonOrEra: "দের হেডিয়ান / প্রাথমিক আর্কিয়ান",
    narrativeParagraphs: [
    "জৈব রসায়ন এবং জীববিজ্ঞানের মধ্যবর্তী সীমান্ত কোনো আকস্মিক অলৌকিক ঘটনা ছিল না; এটি ছিল শত শত রাসায়নিক চক্রের আত্ম-সংগঠন।",
    "লিপিড অণুগুলো স্বতঃস্ফূর্তভাবে গোলাকার ভেসিকল তৈরি করেছিল, যা বহির্বিশ্ব থেকে অভ্যন্তরীণ পরিবেশকে আলাদা রাখে। এটিই কোষের আদিম রূপ বা প্রোটোসেল।",
    "আরএনএ অণু একই সাথে তথ্য সংরক্ষণ এবং অনুঘটকের কাজ করতে শুরু করে, যা 'আরএনএ ওয়ার্ল্ড' নামে পরিচিত। এর মাধ্যমেই শুরু হয় ডারউইনীয় প্রাকৃতিক নির্বাচন।"
],
    keyMilestones: [
    "লিপিড ঝিল্লির আদিম প্রোটোসেল গঠন",
    "অনুঘটক আরএনএ রাইবোজাইম ও প্রাথমিক জেনেটিক কোডের সূচনা",
    "প্রোটন গ্রেডিয়েন্টের সাথে আদিম এটিপি সংশ্লেষণের সংযোজন"
],
    scientificNotes: [
    {
        "label": "অনিশ্চয়তা সংক্রান্ত নোট",
        "text": "অ্যাবায়োজেনেসিস এবং লুকা এক নয়। লুকার শত মিলিয়ন বছর পূর্বে প্রোটোসেলীয় জীবকুলের মাধ্যমে প্রাণের সূচনা হয়েছিল।"
    },
    {
        "label": "সক্রিয় বৈজ্ঞানিক অনুমান",
        "text": "আরএনএ ওয়ার্ল্ড এবং আয়রন-সালফার ওয়ার্ল্ড মডেল প্রাথমিক জৈব রাসায়নিক শক্তির অন্যতম প্রধান তত্ত্ব।"
    }
],
  },
  "microbial-world": {
    id: "microbial-world",
    title: "অতল অণুজীব সাগর ও লুকা",
    subtitle: "এককোষী রাজত্ব এবং গ্রেট জারণ ঘটনা",
    timeRange: "~৩.৮ – ২.০ বিলিয়ন বছর আগে",
    eonOrEra: "আর্কিয়ান থেকে প্রাথমিক প্রোটেরোজোয়িক",
    narrativeParagraphs: [
    "প্রায় ৩.৮ বিলিয়ন বছর আগে লুকা (LUCA) থেকে জীবনের প্রধান দুটি প্রোকারিওটিক ডোমেন ব্যাকটেরিয়াল ও আর্কিয়াল শাখায় বিভক্ত হয়েছিল।",
    "সায়ানোব্যাকটেরিয়া অক্সিজেনযুক্ত সালোকসংশ্লেষণ আবিষ্কার করে বায়ুমণ্ডলে অক্সিজেন ছড়াতে শুরু করে, যা পৃথিবীর পরিবেশে বৃহত্তম রাসায়নিক বিপ্লব ডেকে আনে।"
],
    keyMilestones: [
    "লাস্ট ইউনিভার্সাল কমন অ্যানসেস্টর (LUCA) (~৩.৮ BYA)",
    "ব্যাকটেরিয়া ও আর্কিয়ার প্রাচীন দ্বিধাবিভক্তি",
    "সায়ানোব্যাকটেরিয়া দ্বারা অক্সিজেনিক সালোকসংশ্লেষণ",
    "গ্রেট জারণ ঘটনা (GOE ~২.৪৫ BYA)"
],
    scientificNotes: [
    {
        "label": "প্রতিষ্ঠিত বৈজ্ঞানিক ঐকমত্য",
        "text": "অস্ট্রেলিয়ার স্ট্রোমাটোলাইট ফসিল প্রমাণ করে যে ৩.৪৮ বিলিয়ন বছর আগেও মাইক্রোবিয়াল ম্যাট বিদ্যমান ছিল।"
    },
    {
        "label": "প্রতিষ্ঠিত বৈজ্ঞানিক ঐকমত্য",
        "text": "সমস্ত জীবন্ত কোষ একই জেনেটিক কোড এবং মূল এটিপি সিন্থেস প্রযুক্তি শেয়ার করে যা লুকা থেকে উত্তরাধিকার সূত্রে প্রাপ্ত।"
    }
],
  },
  "endosymbiosis-complex-life": {
    id: "endosymbiosis-complex-life",
    title: "এন্ডোসিম্বিওসিস ও জটিল কোষের উন্মেষ",
    subtitle: "একটি অবিস্মরণীয় অংশীদারিত্ব যা জটিল বহুকোষী জীবন সৃষ্টি করেছিল",
    timeRange: "~২.০ – ০.৫৪ বিলিয়ন বছর আগে",
    eonOrEra: "প্রোটেরোজোয়িক ইয়ন",
    narrativeParagraphs: [
    "একটি অ্যাসগার্ড আর্কিয়া এবং একটি আলফাপ্রোটিওব্যাকটেরিয়ামের মধ্যে অভ্যন্তরীণ সহাবস্থানের (এন্ডোসিম্বিওসিস) ফলে মাইটোকন্ড্রিয়ার জন্ম হয়, যা ইউক্যারিয়ট কোষের ভিত্তি স্থাপন করে।",
    "শক্তি উৎপাদনের এই প্রাচুর্য বহুকোষী রূপ, যৌন প্রজনন এবং এডিয়াকারান যুগের নরম দেহের অদ্ভুত প্রাণীকুলের বিকাশে পথ খুলে দিয়েছিল।"
],
    keyMilestones: [
    "মাইটোকন্ড্রিয়াল এন্ডোসিম্বিওসিস ও ইউক্যারিয়োজেনেসিস (~২.০–১.৮ BYA)",
    "প্লাস্টিড এন্ডোসিম্বিওসিসের মাধ্যমে শৈবাল ও উদ্ভিদের উৎপত্তি (~১.৫ BYA)",
    "এডিয়াকারান নরম দেহের ম্যাক্রো-বায়োটা (~৫৭৫–৫৪১ MYA)"
],
    scientificNotes: [
    {
        "label": "প্রতিষ্ঠিত বৈজ্ঞানিক ঐকমত্য",
        "text": "লিন মারগুলিসের এন্ডোসিম্বিওটিক তত্ত্ব মাইটোকন্ড্রিয়ার নিজস্ব ডিএনএ ও ব্যাকটেরিয়াল রাইবোজোম দ্বারা সার্বজনীনভাবে প্রমাণিত।"
    },
    {
        "label": "সক্রিয় বৈজ্ঞানিক অনুমান",
        "text": "অ্যাসগার্ড আর্কিয়ার ভেতর থেকে ইউক্যারিয়টের শাখার সুনির্দিষ্ট অবস্থান আধুনিক ফাইলোজেনোমিক্সের অন্যতম প্রধান গবেষণা কেন্দ্র।"
    }
],
  },
  "major-radiations": {
    id: "major-radiations",
    title: "বৈচিত্র্যের বিস্ফোরণ ও স্থল অভিযান",
    subtitle: "শারীরিক রূপরেখা, অরণ্য, ডানা এবং মহাবিলুপ্তির অগ্নিপরীক্ষা",
    timeRange: "~৫৪১ – ৬৬ মিলিয়ন বছর আগে",
    eonOrEra: "প্যালিওজোয়িক ও মেসোজোয়িক মহাযুগ",
    narrativeParagraphs: [
    "ক্যামব্রিয়ান বিস্ফোরণের মধ্য দিয়ে আধুনিক প্রাণী পর্বের প্রায় সমস্ত মৌলিক দেহ পরিকল্পনা তৈরি হয়েছিল। এরপর ট্রাইলোবাইট, মাছ ও সন্ধিপদরা সমুদ্র ও ডাঙায় বিস্তার লাভ করে।",
    "উদ্ভিদ ও ছত্রাকের সাহায্যে ডাঙায় বন তৈরি হয়, চতুষ্পদ মেরুদণ্ডীরা ডাঙ্গা জয় করে এবং ডাইনোসর ও সরীসৃপরা কোটি কোটি বছর পৃথিবীতে রাজত্ব করে।"
],
    keyMilestones: [
    "দ্বিপার্শ্বীয় সামুদ্রিক প্রাণীদের ক্যামব্রিয়ান বিস্ফোরণ (~৫৪১ MYA)",
    "উদ্ভিদ ও ছত্রাক দ্বারা স্থলভাগের প্রথম উপনিবেশায়ন (~৪৭০ MYA)",
    "পার্মিয়ান মহাবিলুপ্তিতে প্রায় ৯০% প্রজাতির অবলুপ্তি (~২৫২ MYA)",
    "ডাইনোসরদের যুগ এবং কে-পিজি উল্কাপাতে বিলুপ্তি (~৬৬ MYA)"
],
    scientificNotes: [
    {
        "label": "প্রতিষ্ঠিত বৈজ্ঞানিক ঐকমত্য",
        "text": "পাখি হলো জীবিত থেরোপড ডাইনোসর, যারা ৬৬ মিলিয়ন বছর পূর্বের কে-পিজি উল্কাপাতে বেঁচে গিয়েছিল।"
    },
    {
        "label": "প্রতিষ্ঠিত বৈজ্ঞানিক ঐকমত্য",
        "text": "পৃথিবীতে এ যাবৎ বসবাসকারী সমস্ত প্রজাতির ৯৯% বিলুপ্ত হয়ে গেছে, যা প্রাকৃতিক নির্বাচনের চলমান গতিশীলতাকে তুলে ধরে।"
    }
],
  },
  "hominin-lineage": {
    id: "hominin-lineage",
    title: "মানবজাতির ক্ষুদ্র পল্লব",
    subtitle: "প্রাইমেটদের বিশাল শামিয়ানায় একটি বিনম্র প্রান্তীয় শাখা",
    timeRange: "~৭ মিলিয়ন বছর আগে – বর্তমান",
    eonOrEra: "দের সিনোজোয়িক (নিওজিন থেকে কোয়াটারনারি)",
    narrativeParagraphs: [
    "প্রায় ৭ থেকে ৬ মিলিয়ন বছর আগে আফ্রিকায় হোমাইনিন ও শিম্পাঞ্জির সাধারণ পূর্বপুরুষ থেকে আমাদের নিজস্ব শাখাটি আলাদা হয়।",
    "অস্ট্রালোপিথেকাসের মতো আদি পূর্বপুরুষরা দুই পায়ে সোজা হয়ে হাঁটতে শেখে, যা হাতকে মুক্ত করে জটিল হাতিয়ার তৈরিতে সক্ষম করে তোলে।",
    "হোমো ইরেক্টাসের আগুনের ব্যবহার এবং হোমো সেপিয়েন্সের প্রতীকী ভাষা ও সাংস্কৃতিক বিপ্লব মানুষকে গ্রহব্যাপী প্রভাব বিস্তারকারী প্রজাতিতে পরিণত করেছে।"
],
    keyMilestones: [
    "আফ্রিকায় হোমাইনিন ও শিম্পাঞ্জি পূর্বপুরুষের বিভাজন (~৭–৬ MYA)",
    "দ্বিপদী অস্ট্রালোপিথেসিনদের আবির্ভাব (যেমন 'লুসি' ~৩.২ MYA)",
    "ওল্ডোয়ান পাথরের হাতিয়ারের প্রযুক্তি (~২.৬ MYA)",
    "শারীরবৃত্তীয়ভাবে আধুনিক হোমো সেপিয়েন্সের উৎপত্তি (~৩০০,০০০ বছর আগে)"
],
    scientificNotes: [
    {
        "label": "প্রতিষ্ঠিত বৈজ্ঞানিক ঐকমত্য",
        "text": "জিনগত বিশ্লেষণ প্রমাণ করে যে মানুষ এবং শিম্পাঞ্জি প্রায় ৯৮.৮% ডিএনএ অভিন্নতা শেয়ার করে।"
    },
    {
        "label": "প্রতিষ্ঠিত বৈজ্ঞানিক ঐকমত্য",
        "text": "মানব বিবর্তন কোনো সরলরৈখিক সিঁড়ি ছিল না, বরং সমসাময়িক একাধিক হোমাইনিন প্রজাতির একটি বহুশাখাযুক্ত বৃক্ষ ছিল।"
    }
],
  },
  "living-biosphere": {
    id: "living-biosphere",
    title: "পরস্পর সংযুক্ত জীবনের বৃক্ষ",
    subtitle: "এককোষী আদি শিকড় থেকে লক্ষ লক্ষ জীবিত শাখাপ্রশাখা",
    timeRange: "বর্তমান কাল",
    eonOrEra: "অ্যানথ্রোপোসিন / হলোসিন",
    narrativeParagraphs: [
    "আজকের পৃথিবীতে ব্যাক্টেরিয়া, উদ্ভিদ, ছত্রাক এবং প্রাণীদের লক্ষ লক্ষ প্রজাতি এক অখণ্ড জৈবিক জালিকা গঠন করে বেঁচে আছে।",
    "আমরা সকলেই—সমুদ্রের নীলাভ তিমি থেকে শুরু করে বাগানের ঘাস ও গভীর শিলার অণুজীব পর্যন্ত—একই আদিম পূর্বপুরুষের বংশধর।",
    "জীবনের বৃক্ষ আমাদের স্মরণ করিয়ে দেয় যে মানুষ প্রকৃতির মালিক নয়, বরং এই সাড়ে তিন বিলিয়ন বছরের মহাজাগতিক মহাকাব্যের একটি সচেতন শাখা।"
],
    keyMilestones: [
    "~৮.৭ মিলিয়ন আধুনিক ইউক্যারিয়টিক প্রজাতি",
    "পৃথিবীর প্রতিটি বায়োমে বিলিয়ন বিলিয়ন অণুজীবীয় বংশধারা",
    "৩.৮+ বিলিয়ন বছরের একটি ঐক্যবদ্ধ জিনগত ইতিহাস"
],
    scientificNotes: [
    {
        "label": "প্রতিষ্ঠিত বৈজ্ঞানিক ঐকমত্য",
        "text": "সমস্ত জীবন্ত কোষ প্রোটিনের জন্য অভিন্ন এল-অ্যামিনো অ্যাসিড এবং নিউক্লিক অ্যাসিডের জন্য ডি-সুগার ব্যবহার করে।"
    }
],
  },
};

export const storyHI: Record<string, LocalizedStoryStage> = {
  "cosmic-origins": {
    id: "cosmic-origins",
    title: "हम तारों की धूल से बने हैं",
    subtitle: "प्रारंभिक तत्वों से लेकर जीवन के रासायनिक घटकों तक",
    timeRange: "~13.8 – 4.54 अरब वर्ष पूर्व",
    eonOrEra: "ब्रह्मांडीय भोर से सौर निहारिका तक",
    narrativeParagraphs: [
    "बिग बैंग के बाद के पहले तीन मिनटों में केवल हाइड्रोजन और हीलियम बने थे। उस समय कार्बन, ऑक्सीजन, लोहा या जीवन के निर्माण खंड मौजूद नहीं थे।",
    "करोड़ों वर्षों बाद, पहले तारों के कोर में नाभिकीय संलयन द्वारा लोहे तक के भारी तत्वों का निर्माण हुआ।",
    "लोहे से भी भारी तत्व सुपरनोवा विस्फोटों और न्यूट्रॉन तारों के विलय से बने और अंतरिक्ष में फैल गए, जिससे हमारा सौर मंडल और पृथ्वी बनी।",
    "हमारे शरीर में मौजूद लोहे और डीएनए का हर परमाणु प्राचीन तारों के गर्भ में गढ़ा गया था। हम वस्तुतः तारों की ही धूल हैं।"
],
    keyMilestones: [
    "बिग बैंग न्यूक्लियोसिंथेसिस में हाइड्रोजन, हीलियम और लीथियम का निर्माण (~13.8 BYA)",
    "पहले तारों के केंद्र में लोहे तक के भारी तत्वों का संलयन (~13.6–12 BYA)",
    "सुपरनोवा विस्फोटों द्वारा अंतरिक्ष में भारी तत्वों का प्रकीर्णन",
    "सौर नीहारिका के संकुचन से सूर्य और ग्रहों की तश्तरी का निर्माण (~4.6 BYA)",
    "पृथ्वी का निर्माण (~4.54 BYA) और जीवन के लिए CHNOPS तत्वों की उपलब्धता"
],
    scientificNotes: [
    {
        "label": "स्थापित वैज्ञानिक सहमति",
        "text": "बिग बैंग में केवल हल्के तत्व बने थे; अन्य सभी भारी तत्व तारकीय संलयन और सुपरनोवा द्वारा निर्मित हुए।"
    },
    {
        "label": "स्थापित वैज्ञानिक सहमति",
        "text": "मर्चिसन जैसे उल्कापिंडों में 70 से अधिक गैर-जैविक अमीनो अम्ल मिले हैं, जो अंतरिक्षीय कार्बनिक रसायन को दर्शाते हैं।"
    },
    {
        "label": "सक्रिय वैज्ञानिक परिकल्पना",
        "text": "जीवन के प्राथमिक घटक उल्कापिंडों से आए या समुद्र के गहरे ज्वालामुखीय झरनों में बने—यह अनुसंधान का सक्रिय विषय है।"
    },
    {
        "label": "अनिश्चितता नोट",
        "text": "अंतरिक्ष में कार्बनिक अणुओं का मिलना जीवन की उत्पत्ति का प्रमाण नहीं है, बल्कि केवल रासायनिक आधार की पुष्टि करता है।"
    }
],
  },
  "prebiotic-earth": {
    id: "prebiotic-earth",
    title: "प्रीबायोटिक पालना",
    subtitle: "आरंभिक पृथ्वी का उथल-पुथल भरा गतिशील वातावरण",
    timeRange: "~4.54 – 4.0 अरब वर्ष पूर्व",
    eonOrEra: "हेडियन कल्प",
    narrativeParagraphs: [
    "नवजात पृथ्वी एक धधकती हुई दुनिया थी, जिस पर लगातार उल्कापिंडों की बौछार और ज्वालामुखीय विस्फोट हो रहे थे। चंद्रमा के निर्माण जैसी टक्करों ने इसका कायाकल्प किया।",
    "वातावरण के ठंडा होने पर मूसलाधार बारिश से पृथ्वी के पहले महासागर बने। इन्हीं प्राचीन जलों में कार्बनिक अणुओं की रासायनिक अंतःक्रियाएं आरंभ हुईं।"
],
    keyMilestones: [
    "पृथ्वी और चंद्रमा का निर्माण (~4.51 BYA)",
    "प्राचीन तरल महासागरों का संघनन (~4.4 BYA)",
    "मूलभूत अमीनो एसिड और न्यूक्लियोटाइड्स का अजैविक संश्लेषण"
],
    scientificNotes: [
    {
        "label": "स्थापित वैज्ञानिक सहमति",
        "text": "पश्चिमी ऑस्ट्रेलिया के ज़िरकॉन क्रिस्टल दर्शाते हैं कि 4.4 अरब वर्ष पहले भी तरल जल मौजूद था।"
    },
    {
        "label": "सक्रिय वैज्ञानिक परिकल्पना",
        "text": "रासायनिक उत्पत्ति गहरे समुद्र के ज्वालामुखीय छिद्रों में हुई या छिछले गर्म पोखरों में, इस पर शोध जारी है।"
    }
],
  },
  "emergence-of-life": {
    id: "emergence-of-life",
    title: "आत्म-प्रतिकृति की चिंगारी",
    subtitle: "प्रीबायोटिक रसायन से जीवविज्ञान का संक्रमण",
    timeRange: "~4.0 – 3.8 अरब वर्ष पूर्व",
    eonOrEra: "उत्तर हेडियन / प्रारंभिक आर्कियन",
    narrativeParagraphs: [
    "निर्जीव रसायन और सजीव जीवन के बीच की सीमा कोई आकस्मिक घटना नहीं, बल्कि लाखों वर्षों का क्रमिक रासायनिक विकास था।",
    "लिपिड अणुओं ने स्वतः बुलबुलानुमा झिल्लियां (प्रोटोसेल) बनाईं, जिन्होंने आंतरिक वातावरण को बाहरी दुनिया से अलग किया।",
    "आरएनए ने आनुवंशिक जानकारी रखने और उत्प्रेरक (राइबोजाइम) दोनों की भूमिका निभाई, जिससे डार्विनियन प्राकृतिक चयन की शुरुआत हुई।"
],
    keyMilestones: [
    "लिपिड झिल्ली वाले प्रोटोसेल्स का निर्माण",
    "उत्प्रेरक आरएनए राइबोजाइम और प्रारंभिक आनुवंशिक कूट",
    "प्रोटॉन प्रवणता के साथ प्राचीन एटीपी संश्लेषण का तालमेल"
],
    scientificNotes: [
    {
        "label": "अनिश्चितता नोट",
        "text": "एबायोजेनेसिस और लूका एक नहीं हैं। लूका से करोड़ों वर्ष पहले प्रोटोसेल रूप में जीवन का प्रारंभ हुआ था।"
    },
    {
        "label": "सक्रिय वैज्ञानिक परिकल्पना",
        "text": "आरएनए वर्ल्ड और आयरन-सल्फर वर्ल्ड सिद्धांत प्रारंभिक जीवन के प्रमुख मॉडल हैं।"
    }
],
  },
  "microbial-world": {
    id: "microbial-world",
    title: "गहरा सूक्ष्मजीव सागर और लूका",
    subtitle: "एककोशिकीय जीवों का साम्राज्य और महान ऑक्सीकरण घटना",
    timeRange: "~3.8 – 2.0 अरब वर्ष पूर्व",
    eonOrEra: "आर्कियन से प्रारंभिक प्रोटेरोज़ोइक",
    narrativeParagraphs: [
    "लगभग 3.8 अरब वर्ष पूर्व लूका (LUCA) से जीवन बैक्टीरिया और आर्किया की दो मुख्य शाखाओं में विभाजित हुआ।",
    "साइनोबैक्टीरिया ने ऑक्सीजन उत्पन्न करने वाले प्रकाश संश्लेषण का आविष्कार किया, जिसने वायुमंडल में ऑक्सीजन भरकर पृथ्वी के इतिहास की सबसे बड़ी क्रांति ला दी।"
],
    keyMilestones: [
    "अंतिम सार्वभौमिक साझा पूर्वज (LUCA) (~3.8 BYA)",
    "बैक्टीरिया और आर्किया में विभाजन",
    "साइनोबैक्टीरिया द्वारा ऑक्सीजन युक्त प्रकाश संश्लेषण",
    "महान ऑक्सीकरण घटना (GOE ~2.45 BYA)"
],
    scientificNotes: [
    {
        "label": "स्थापित वैज्ञानिक सहमति",
        "text": "ऑस्ट्रेलिया के स्ट्रोमेटोलाइट्स प्रमाणित करते हैं कि 3.48 अरब वर्ष पूर्व भी सूक्ष्मजीवों की बस्तियां मौजूद थीं।"
    },
    {
        "label": "स्थापित वैज्ञानिक सहमति",
        "text": "सभी जीवित कोशिकाएं लूका से विरासत में मिले सार्वभौमिक आनुवंशिक कूट और एटीपी तंत्र को साझा करती हैं।"
    }
],
  },
  "endosymbiosis-complex-life": {
    id: "endosymbiosis-complex-life",
    title: "अंतःसहजीविता और जटिल कोशिका",
    subtitle: "एक ऐसी साझेदारी जिसने जटिल बहुकोशिकीय जीवन को जन्म दिया",
    timeRange: "~2.0 – 0.54 अरब वर्ष पूर्व",
    eonOrEra: "प्रोटेरोज़ोइक कल्प",
    narrativeParagraphs: [
    "एक असगार्ड आर्किया और अल्फा-प्रोटियोबैक्टीरिया के अंतःसहजीवन (एंडोसिम्बायोसिस) से माइटोकॉन्ड्रिया का जन्म हुआ, जिसने यूकेरियोटिक जटिलता की नींव रखी।",
    "ऊर्जा की इस अपार उपलब्धता ने बहुकोशिकीय जीवन, लैंगिक प्रजनन और एडियाकरन काल के रहस्यमय नरम जीवों के विकास का मार्ग प्रशस्त किया।"
],
    keyMilestones: [
    "माइटोकॉन्ड्रियल अंतःसहजीवन और यूकेरियोजेनेसिस (~2.0–1.8 BYA)",
    "प्लास्टिड अंतःसहजीवन से पादप कुल का उदय (~1.5 BYA)",
    "एडियाकरन काल के कोमल शरीर वाले विशालकाय जीव (~575–541 MYA)"
],
    scientificNotes: [
    {
        "label": "स्थापित वैज्ञानिक सहमति",
        "text": "लिन मार्गुलिस का अंतःसहजीवन सिद्धांत माइटोकॉन्ड्रियल डीएनए और राइबोसोम द्वारा पूरी तरह सिद्ध है।"
    },
    {
        "label": "सक्रिय वैज्ञानिक परिकल्पना",
        "text": "असगार्ड आर्किया के भीतर यूकेरियोट्स की सटीक शाखा पर वर्तमान में शोध जारी है।"
    }
],
  },
  "major-radiations": {
    id: "major-radiations",
    title: "विविधता का विस्फोट और थल पर विजय",
    subtitle: "शरीर की योजनाएं, जंगल, उड़ान और महाविनाश की अग्निपरीक्षा",
    timeRange: "~541 – 66 मिलियन वर्ष पूर्व",
    eonOrEra: "पैलियोज़ोइक और मेसोज़ोइक महायुग",
    narrativeParagraphs: [
    "कैम्ब्रियन विस्फोट में आधुनिक जंतु संघों की लगभग सभी शारीरिक संरचनाएं विकसित हुईं। इसके बाद ट्राइलोबाइट्स, मछलियां और आर्थ्रोपोड्स फैले।",
    "पौधों ने सूखी जमीन पर जंगल बनाए, मछलियों से चौपाया जीव बने और डायनासोरों ने करोड़ों वर्षों तक धरती पर शासन किया।"
],
    keyMilestones: [
    "कैम्ब्रियन विस्फोट में समुद्री जीवों की विविधता (~541 MYA)",
    "पौधों और कवकों द्वारा सूखी जमीन पर जीवन की शुरुआत (~470 MYA)",
    "पर्मियन महाविनाश में 90% से अधिक प्रजातियों का लोप (~252 MYA)",
    "डायनासोरों का स्वर्णिम काल और क्षुद्रग्रह से विनाश (~66 MYA)"
],
    scientificNotes: [
    {
        "label": "स्थापित वैज्ञानिक सहमति",
        "text": "पक्षी वस्तुतः जीवित थेरोपोड डायनासोर हैं, जो 6.6 करोड़ वर्ष पूर्व के क्षुद्रग्रह प्रभाव से बच निकले।"
    },
    {
        "label": "स्थापित वैज्ञानिक सहमति",
        "text": "पृथ्वी पर पैदा हुईं 99% से अधिक प्रजातियां आज विलुप्त हो चुकी हैं।"
    }
],
  },
  "hominin-lineage": {
    id: "hominin-lineage",
    title: "मानवता की छोटी टहनी",
    subtitle: "प्राइमेट्स की विशाल छतरी में एक विनम्र अंतिम शाखा",
    timeRange: "~70 लाख वर्ष पूर्व – वर्तमान",
    eonOrEra: "उत्तर सेनोज़ोइक (नियोजीन से क्वाटरनरी)",
    narrativeParagraphs: [
    "लगभग 70-60 लाख वर्ष पूर्व अफ्रीका में होमिनिन और चिम्पांजी की सामान्य वंशावली अलग-अलग दिशाओं में विकसित हुई।",
    "ऑस्ट्रेलोपिथेकस जैसे पूर्वजों ने दो पैरों पर चलना सीखा, जिससे उनके हाथ औजार बनाने के लिए स्वतंत्र हो गए।",
    "होमो इरेक्टस द्वारा आग पर नियंत्रण और होमो सेपियन्स द्वारा भाषा व प्रतीकात्मक सोच ने मनुष्य को वैश्विक प्रजाति बनाया।"
],
    keyMilestones: [
    "अफ्रीका में होमिनिन और चिम्पांजी वंश का अलगाव (~7–6 MYA)",
    "दो पैरों पर चलने वाले ऑस्ट्रेलोपिथेकस (जैसे 'लूसी' ~3.2 MYA)",
    "ओल्डोवन पत्थर के औजारों की तकनीक (~2.6 MYA)",
    "आधुनिक होमो सेपियन्स का प्रादुर्भाव (~3 लाख वर्ष पूर्व)"
],
    scientificNotes: [
    {
        "label": "स्थापित वैज्ञानिक सहमति",
        "text": "डीएनए विश्लेषण सिद्ध करता है कि मनुष्य और चिम्पांजी 98.8% आनुवंशिक समानता साझा करते हैं।"
    },
    {
        "label": "स्थापित वैज्ञानिक सहमति",
        "text": "मानव विकास कोई सीधी रेखा नहीं, बल्कि कई सह-अस्तित्व वाली प्रजातियों की एक घनी झाड़ी था।"
    }
],
  },
  "living-biosphere": {
    id: "living-biosphere",
    title: "परस्पर जुड़ा जीवन का वृक्ष",
    subtitle: "एककोशिकीय जड़ों से लेकर लाखों हरी-भरी शाखाओं तक",
    timeRange: "वर्तमान काल",
    eonOrEra: "एन्थ्रोपोसीन / होलोसीन",
    narrativeParagraphs: [
    "आज पृथ्वी पर जीवाणु, कवक, वनस्पतियां और प्राणी एक अखंड और सुंदर जैव-जाल का निर्माण करते हैं।",
    "हम सभी—विशाल नीली व्हेल से लेकर नन्हीं घास और जीवाणुओं तक—उसी एक साझे पूर्वज की संतान हैं।",
    "जीवन का यह वृक्ष हमें सिखाता है कि हम प्रकृति के स्वामी नहीं, बल्कि 3.8 अरब वर्षों की इस महागाथा का एक अभिन्न हिस्सा हैं।"
],
    keyMilestones: [
    "लगभग 87 लाख आधुनिक यूकेरियोटिक प्रजातियां",
    "धरती के प्रत्येक कोने में सूक्ष्मजीवों के अरबों वंश",
    "3.8+ अरब वर्षों का साझा व अविभाज्य आनुवंशिक इतिहास"
],
    scientificNotes: [
    {
        "label": "स्थापित वैज्ञानिक सहमति",
        "text": "सभी जीवित कोशिकाएं प्रोटीन निर्माण के लिए समान एल-अमीनो अम्ल और 64-कोडन आनुवंशिक कोड का उपयोग करती हैं।"
    }
],
  },
};

export const storyES: Record<string, LocalizedStoryStage> = {
  "cosmic-origins": {
    id: "cosmic-origins",
    title: "Estamos Hechos de Polvo de Estrellas",
    subtitle: "Desde los primeros elementos hasta los ingredientes químicos de la vida",
    timeRange: "~13.8 – 4.54 Ga",
    eonOrEra: "Del Alba Cósmica a la Nebulosa Solar",
    narrativeParagraphs: [
    "Durante los tres primeros minutos posteriores al Big Bang (~13.8 Ga), la nucleosíntesis primordial produjo únicamente hidrógeno y helio con trazas de litio. No existían el carbono ni el oxígeno.",
    "Cientos de millones de años más tarde, las primeras generaciones de estrellas masivas forjaron en sus núcleos termonucleares los elementos químicos hasta el hierro.",
    "Las supernovas y colisiones de estrellas de neutrones sintetizaron los elementos más pesados y los dispersaron por el medio interestelar, alimentando el nacimiento del Sistema Solar.",
    "Cada átomo de hierro en nuestra hemoglobina y de fósforo en nuestro ADN fue forjado en el crisol de estrellas extintas. Literalmente somos polvo de estrellas."
],
    keyMilestones: [
    "Nucleosíntesis del Big Bang produce H y He primordiales (~13.8 Ga)",
    "Primeras estrellas forjan elementos pesados hasta el hierro (~13.6–12 Ga)",
    "Supernovas y kilonovas dispersan elementos pesados por el cosmos",
    "Colapso de la nebulosa protosolar formando el Sol y la Tierra (~4.6 Ga)",
    "Acreción de la Tierra (~4.54 Ga) y disponibilidad de elementos CHNOPS"
],
    scientificNotes: [
    {
        "label": "Consenso Establecido",
        "text": "La nucleosíntesis primordial sólo produjo H y He; todos los elementos biogénicos pesados provienen de la nucleosíntesis estelar."
    },
    {
        "label": "Consenso Establecido",
        "text": "Los meteoritos condríticos carbonáceos contienen decenas de aminoácidos y bases nitrogenadas abióticas."
    },
    {
        "label": "Hipótesis Activa",
        "text": "El origen endógeno vs. exógeno de los precursores prebióticos sigue siendo objeto de investigación científica continua."
    },
    {
        "label": "Nota de Incertidumbre",
        "text": "Las moléculas orgánicas abióticas no constituyen vida por sí mismas, pero proporcionan el punto de partida químico."
    }
],
  },
  "prebiotic-earth": {
    id: "prebiotic-earth",
    title: "La Cuna Prebiótica",
    subtitle: "El ambiente violento y dinámico de la Tierra primitiva",
    timeRange: "~4.54 – 4.0 Ga",
    eonOrEra: "Eón Hádico",
    narrativeParagraphs: [
    "La Tierra recién nacida era un mundo extremo sometido a intenso bombardeo cósmico, océanos de magma y la colisión colosal que dio origen a la Luna.",
    "Al enfriarse la corteza, el vapor de agua se condensó en lluvias torrenciales que llenaron las primeras cuencas oceánicas, creando reactores geoquímicos ricos en minerales y gradientes térmicos."
],
    keyMilestones: [
    "Formación de la Tierra y la Luna (~4.51 Ga)",
    "Condensación de los océanos primitivos (~4.4 Ga)",
    "Síntesis de aminoácidos y nucleótidos prebióticos elementales"
],
    scientificNotes: [
    {
        "label": "Consenso Establecido",
        "text": "Los cristales de circón de Jack Hills confirman agua líquida y corteza sólida hace 4.400 millones de años."
    },
    {
        "label": "Hipótesis Activa",
        "text": "Las fuentes hidrotermales alcalinas oceánicas frente a los campos geotérmicos subaéreos como crisoles del origen."
    }
],
  },
  "emergence-of-life": {
    id: "emergence-of-life",
    title: "La Chispa de la Autorreplicación",
    subtitle: "La transición de la química prebiótica a la biología",
    timeRange: "~4.0 – 3.8 Ga",
    eonOrEra: "Hádico Tardío / Arcaico Temprano",
    narrativeParagraphs: [
    "La frontera entre la química inorgánica y la biología no fue un chispazo repentino, sino una continuidad de autoorganización de redes metabólicas.",
    "Los lípidos formaron vesículas cerradas espontáneas (protocélulas), aislando un medio interno protegido donde concentrar biomoléculas.",
    "Las moléculas de ARN asumieron funciones duales de almacenamiento informativo y actividad catalítica (ribozimas), iniciando la evolución por selección natural."
],
    keyMilestones: [
    "Ensamblaje de protocélulas con membranas lipídicas",
    "Ribozimas catalíticas de ARN y código genético primordial",
    "Acoplamiento de gradientes de protones a la síntesis de ATP"
],
    scientificNotes: [
    {
        "label": "Nota de Incertidumbre",
        "text": "La abiogénesis no es LUCA; antecede a LUCA por cientos de millones de años de evolución protocelular."
    },
    {
        "label": "Consenso Establecido",
        "text": "El modelo del Mundo de ARN sigue siendo el paradigma más respaldado para el origen del código genético."
    }
],
  },
  "microbial-world": {
    id: "microbial-world",
    title: "El Océano Microbiano Profundo y LUCA",
    subtitle: "Dominio unicelular y el Gran Evento de Oxidación",
    timeRange: "~3.8 – 2.0 Ga",
    eonOrEra: "Arcaico al Proterozoico Temprano",
    narrativeParagraphs: [
    "Hace ~3.8 Ga, LUCA dio origen a los dos dominios procariotas primarios: Bacteria y Archaea, colonizando todos los ambientes hidrotermales y bentónicos.",
    "Las cianobacterias inventaron la fotosíntesis oxigénica, desencadenando el Gran Evento de Oxidación (GOE) que transformó irrevocablemente la atmósfera y los mares."
],
    keyMilestones: [
    "Último Ancestro Común Universal (LUCA) (~3.8 Ga)",
    "Bifurcación primordial entre Bacterias y Arqueas",
    "Evolución de la fotosíntesis oxigénica por Cianobacterias",
    "Gran Evento de Oxidación (GOE ~2.45 Ga)"
],
    scientificNotes: [
    {
        "label": "Consenso Establecido",
        "text": "Los estromatolitos fósiles australianos confirman tapetes microbianos hace al menos 3.480 millones de años."
    },
    {
        "label": "Consenso Establecido",
        "text": "Todos los organismos celulares vivos comparten la misma maquinaria de traducción y ATP sintasa heredada de LUCA."
    }
],
  },
  "endosymbiosis-complex-life": {
    id: "endosymbiosis-complex-life",
    title: "Endosimbiosis y la Célula Compleja",
    subtitle: "Una asociación simbiótica que forjó la multicelularidad compleja",
    timeRange: "~2.0 – 0.54 Ga",
    eonOrEra: "Eón Proterozoico",
    narrativeParagraphs: [
    "La integración endosimbiótica de una alfaproteobacteria respiratoria en un hospedador arqueano del clado Asgard dio origen a la mitocondria y al linaje eucariota.",
    "Este salto bioenergético masivo impulsó la diferenciación celular, el citoesqueleto dinámico, la reproducción sexual y los primeros macroorganismos de la biota ediacárica."
],
    keyMilestones: [
    "Endosimbiosis mitocondrial y eucariogénesis (~2.0–1.8 Ga)",
    "Endosimbiosis plastidial originando algas y plantas (~1.5 Ga)",
    "Macrobiota blanda del Ediacárico (~575–541 Ma)"
],
    scientificNotes: [
    {
        "label": "Consenso Establecido",
        "text": "La teoría endosimbiótica es respaldada unánimemente por el ADN circular mitocondrial bacteriano."
    },
    {
        "label": "Hipótesis Activa",
        "text": "La posición exacta de Eukaryota dentro de las arqueas de Asgard sigue refinándose con nuevos metagenomas."
    }
],
  },
  "major-radiations": {
    id: "major-radiations",
    title: "La Explosión de Diversidad y la Conquista Terrestre",
    subtitle: "Planes corporales, bosques, vuelo y el crisol de las extinciones masivas",
    timeRange: "~541 – 66 Ma",
    eonOrEra: "Eras Paleozoica y Mesozoica",
    narrativeParagraphs: [
    "La Explosión Cámbrica estableció los planes anatómicos básicos de casi todos los filos animales bilaterales modernos en un intervalo geológico breve.",
    "Las plantas e invertebrados colonizaron tierra firme, seguidos por los tetrápodos que originaron a anfibios, sinápsidos y a los dinosaurios mesozoicos."
],
    keyMilestones: [
    "Explosión Cámbrica de animales bilaterales (~541 Ma)",
    "Colonización vegetal y fúngica del medio terrestre (~470 Ma)",
    "Gran Mortandad del Pérmico extinguiendo ~90% de especies (~252 Ma)",
    "Era de los dinosaurios e impacto asteroideo K-Pg (~66 Ma)"
],
    scientificNotes: [
    {
        "label": "Consenso Establecido",
        "text": "Las aves son dinosaurios terópodos vivientes supervivientes directos del impacto de Chicxulub."
    },
    {
        "label": "Consenso Establecido",
        "text": "Más del 99% de todas las especies biológicas que han existido se encuentran extintas."
    }
],
  },
  "hominin-lineage": {
    id: "hominin-lineage",
    title: "La Rama de la Humanidad",
    subtitle: "Una modesta rama terminal en el frondoso dosel de los primates",
    timeRange: "~7 Ma – Presente",
    eonOrEra: "Cenozoico Tardío (Neógeno al Cuaternario)",
    narrativeParagraphs: [
    "Hace entre 7 y 6 millones de años en África, el linaje hominino divergió del ancestro común compartido con los chimpancés.",
    "La bipedestación habitual liberó las manos para la manipulación fina y la talla lítica, sentando las bases del crecimiento encefálico.",
    "El dominio del fuego por Homo erectus y la eclosión del pensamiento simbólico en Homo sapiens propulsaron una transformación biocultural sin precedentes."
],
    keyMilestones: [
    "Divergencia entre Hominini y Pan en África (~7–6 Ma)",
    "Australopitecos bípedos habituales (e.g., 'Lucy' ~3.2 Ma)",
    "Tecnología lítica olduvayense (~2.6 Ma)",
    "Aparición de Homo sapiens anatómicamente moderno (~300.000 años)"
],
    scientificNotes: [
    {
        "label": "Consenso Establecido",
        "text": "El análisis genómico confirma que humanos y chimpancés comparten ~98.8% de identidad nucleotídica."
    },
    {
        "label": "Consenso Establecido",
        "text": "La evolución humana no fue una marcha lineal, sino un mosaico profuso de especies coexistentes e hibridadas."
    }
],
  },
  "living-biosphere": {
    id: "living-biosphere",
    title: "El Árbol Interconectado de la Vida",
    subtitle: "De raíces unicelulares a millones de ramas vivientes",
    timeRange: "Época Contemporánea",
    eonOrEra: "Antropoceno / Holoceno",
    narrativeParagraphs: [
    "La biosfera actual abarca millones de especies de bacterias, arqueas, hongos, plantas y animales entretejidos en una red ecológica inseparable.",
    "Desde la ballena azul antártica hasta las bacterias de las fumarolas abisales, toda la vida celular comparte una genealogía ininterrumpida.",
    "El Árbol de la Vida demuestra que no somos dueños de la biosfera, sino una rama consciente dentro de una odisea evolutiva de 3.800 millones de años."
],
    keyMilestones: [
    "~8.7 millones de especies eucariotas contemporáneas estimadas",
    "Billones de linajes procariotas sustentando los ciclos biogeoquímicos",
    "Un tapiz genealógico unificado continuo de más de 3.8 Ga"
],
    scientificNotes: [
    {
        "label": "Consenso Establecido",
        "text": "Toda la vida celular utiliza L-aminoácidos en proteínas, D-azúcares en ácidos nucleicos y el mismo código genético."
    }
],
  },
};

export const storyFR: Record<string, LocalizedStoryStage> = {
  "cosmic-origins": {
    id: "cosmic-origins",
    title: "Nous Sommes Faits de Poussière d'Étoiles",
    subtitle: "Des premiers éléments aux composants chimiques fondamentaux du vivant",
    timeRange: "~13.8 – 4.54 Ga",
    eonOrEra: "De l'Aube Cosmique à la Nébuleuse Solaire",
    narrativeParagraphs: [
    "Durant les trois premières minutes suivant le Big Bang (~13.8 Ga), la nucléosynthèse primordiale n'a engendré que de l'hydrogène et de l'hélium. Ni carbone, ni oxygène n'existaient encore.",
    "Des centaines de millions d'années plus tard, les cœurs des premières étoiles massives ont fusionné ces éléments légers jusqu'à former le fer.",
    "Les explosions de supernovas et les fusions d'étoiles à neutrons ont forgé les éléments plus lourds et ensemencé le milieu interstellaire, préparant la nébuleuse protosolaire.",
    "Chaque atome de fer dans notre sang et de phosphore dans notre ADN a été forgé au cœur d'étoiles disparues. Nous sommes littéralement nés de poussières d'étoiles."
],
    keyMilestones: [
    "Nucléosynthèse primordiale du Big Bang produisant H, He et traces de Li (~13.8 Ga)",
    "Allumage des premières étoiles et fusion des éléments jusqu'au fer (~13.6–12 Ga)",
    "Supernovas et kilonovas dispersant les éléments lourds dans l'espace",
    "Effondrement de la nébuleuse protosolaire et formation de la Terre (~4.6–4.54 Ga)",
    "Disponibilité géochimique des éléments CHNOPS sur la Terre primitive"
],
    scientificNotes: [
    {
        "label": "Consensus Établi",
        "text": "Le Big Bang n'a produit que de l'hydrogène et de l'hélium; les éléments de la vie sont tous nés de la nucléosynthèse stellaire."
    },
    {
        "label": "Consensus Établi",
        "text": "Les météorites comme Murchison renferment plus de 70 acides aminés synthétisés abiotiquement dans l'espace."
    },
    {
        "label": "Hypothèse Active",
        "text": "La part respective des apports météoritiques et des synthèses hydrothermales terrestres demeure activement débattue."
    },
    {
        "label": "Note d'Incertitude",
        "text": "La présence de molécules organiques cosmiques ne prouve pas une origine extraterrestre de la vie, mais atteste de sa fertilité chimique."
    }
],
  },
  "prebiotic-earth": {
    id: "prebiotic-earth",
    title: "Le Berceau Prébiotique",
    subtitle: "L'environnement dynamique et violent de la Terre primitive",
    timeRange: "~4.54 – 4.0 Ga",
    eonOrEra: "Éon Hadéen",
    narrativeParagraphs: [
    "La Terre primitive était un monde turbulent façonné par un bombardement météoritique intense, un volcanisme violent et l'impact géant qui a formé la Lune.",
    "Le refroidissement progressif a permis la condensation de pluies continues donnant naissance aux premiers océans d'eau liquide, véritables réacteurs géochimiques."
],
    keyMilestones: [
    "Accrétion de la Terre et impact formateur de la Lune (~4.51 Ga)",
    "Condensation des premiers océans liquides (~4.4 Ga)",
    "Synthèse abiotique d'acides aminés et de nucléotides primordiaux"
],
    scientificNotes: [
    {
        "label": "Consensus Établi",
        "text": "Les zircons de Jack Hills attestent de la présence d'eau liquide dès 4.4 milliards d'années."
    },
    {
        "label": "Hypothèse Active",
        "text": "Débat géochimique entre évents hydrothermaux profonds et mares géothermiques de surface."
    }
],
  },
  "emergence-of-life": {
    id: "emergence-of-life",
    title: "L'Étincelle de l'Autoréplication",
    subtitle: "De la chimie prébiotique à la première biologie",
    timeRange: "~4.0 – 3.8 Ga",
    eonOrEra: "Hadéen Tardif / Archéen Ancien",
    narrativeParagraphs: [
    "La transition de la géochimie inerte à la biologie vivante s'est opérée par une suite continue d'auto-organisations moléculaires.",
    "Les lipides ont formé spontanément des protocellules compartimentées délimitant un milieu intérieur protégé du milieu extérieur.",
    "L'ARN a cumulé les rôles d'archive génétique et de catalyseur enzymatique (ribozymes), déclenchant l'évolution darwinienne."
],
    keyMilestones: [
    "Compartimentation de protocellules à bicouche lipidique",
    "Monde à ARN et émergence du code génétique universel",
    "Chimiosmose et couplage des gradients de protons à l'ATP"
],
    scientificNotes: [
    {
        "label": "Note d'Incertitude",
        "text": "L'abiogenèse ne se confond pas avec LUCA; elle s'est étalée sur des millions d'années avant LUCA."
    },
    {
        "label": "Hypothèse Active",
        "text": "Le Monde de l'ARN et la théorie chimiosmotique des cheminées hydrothermales constituent le cadre de référence."
    }
],
  },
  "microbial-world": {
    id: "microbial-world",
    title: "L'Océan Microbien Profond et LUCA",
    subtitle: "Le règne unicellulaire et la Grande Oxydation",
    timeRange: "~3.8 – 2.0 Ga",
    eonOrEra: "Archéen au Protérozoïque Inférieur",
    narrativeParagraphs: [
    "Il y a ~3.8 Ga, LUCA a divergé vers les deux grands domaines procaryotes: les Bactéries et les Archées, colonisant l'ensemble des océans anoxiques.",
    "Les cyanobactéries ont perfectionné la photosynthèse oxygénique, entraînant la Grande Oxydation (~2.45 Ga) et bouleversant la biogéochimie terrestre."
],
    keyMilestones: [
    "Dernier Ancêtre Commun Universel (LUCA) (~3.8 Ga)",
    "Divergence fondatrice entre Bactéries et Archées",
    "Invention de la photosynthèse oxygénique cyanobactérienne",
    "Grande Oxydation de l'atmosphère (GOE ~2.45 Ga)"
],
    scientificNotes: [
    {
        "label": "Consensus Établi",
        "text": "Les stromatolites d'Australie occidentale attestent d'activités microbiennes vieilles de 3.48 milliards d'années."
    },
    {
        "label": "Consensus Établi",
        "text": "Tout le vivant partage le même code génétique et la même ATP synthase hérités de LUCA."
    }
],
  },
  "endosymbiosis-complex-life": {
    id: "endosymbiosis-complex-life",
    title: "Endosymbiose et Cellule Complexe",
    subtitle: "Une alliance biologique ayant rendu possible la multicellularité",
    timeRange: "~2.0 – 0.54 Ga",
    eonOrEra: "Éon Protérozoïque",
    narrativeParagraphs: [
    "L'endosymbiose entre une archée d'Asgard et une alphaprotéobactérie ancestrale a engendré la mitochondrie, marquant la naissance des eucaryotes.",
    "Cet apport bioénergétique colossal a permis le développement du cytosquelette, de la sexualité et des macro-organismes benthiques de l'Édiacarien."
],
    keyMilestones: [
    "Endosymbiose mitochondriale et eucaryogenèse (~2.0–1.8 Ga)",
    "Endosymbiose plastidiale fondant la lignée végétale (~1.5 Ga)",
    "Faune macroscopique à corps mou de l'Édiacarien (~575–541 Ma)"
],
    scientificNotes: [
    {
        "label": "Consensus Établi",
        "text": "La théorie endosymbiotique de Lynn Margulis est validée par les génomes mitochondriaux et plastidiaux."
    },
    {
        "label": "Hypothèse Active",
        "text": "La place phylogénétique exacte d'Eukaryota au sein des archées d'Asgard continue d'évoluer."
    }
],
  },
  "major-radiations": {
    id: "major-radiations",
    title: "L'Explosion de Diversité et la Conquête des Terres",
    subtitle: "Plans d'organisation, forêts, vol battu et grandes extinctions",
    timeRange: "~541 – 66 Ma",
    eonOrEra: "Ères Paléozoïque et Mésozoïque",
    narrativeParagraphs: [
    "L'explosion cambrienne a établi la quasi-totalité des plans d'organisation des métazoaires bilatériens dans les océans primaires.",
    "La colonisation terrestre des plantes et champignons a permis l'émergence des tétrapodes, conduisant aux forêts carbonifères et au règne mésozoïque des dinosaures."
],
    keyMilestones: [
    "Explosion cambrienne des animaux bilatériens marins (~541 Ma)",
    "Colonisation des terres émergées par les plantes et champignons (~470 Ma)",
    "Extinction massive du Permien-Trias éradiquant 90% des espèces (~252 Ma)",
    "Règne des dinosaures et impact météoritique K-Pg (~66 Ma)"
],
    scientificNotes: [
    {
        "label": "Consensus Établi",
        "text": "Les oiseaux sont des dinosaures théropodes survivants de la crise Crétacé-Paléogène."
    },
    {
        "label": "Consensus Établi",
        "text": "Plus de 99% des espèces ayant foulé la Terre sont aujourd'hui éteintes."
    }
],
  },
  "hominin-lineage": {
    id: "hominin-lineage",
    title: "Le Rameau de l'Humanité",
    subtitle: "Un modeste rameau terminal dans la canopée des primates",
    timeRange: "~7 Ma – Présent",
    eonOrEra: "Cénozoïque Récent (Néogène au Quaternaire)",
    narrativeParagraphs: [
    "Il y a ~7 à 6 millions d'années en Afrique, la lignée des hominines s'est séparée de celle menant aux chimpanzés.",
    "L'acquisition de la bipédie chez les australopithèques a libéré la main pour le travail d'outils et stimulé l'encéphalisation.",
    "La domestication du feu chez Homo erectus et l'avènement du langage symbolique chez Homo sapiens ont profondément transformé la biosphère."
],
    keyMilestones: [
    "Divergence hominine/panine en Afrique centrale et orientale (~7–6 Ma)",
    "Australopithèques bipèdes (ex: 'Lucy' ~3.2 Ma)",
    "Premiers outils lithiques oldowayens taillés (~2.6 Ma)",
    "Émergence anatomique d'Homo sapiens (~300 000 ans)"
],
    scientificNotes: [
    {
        "label": "Consensus Établi",
        "text": "L'Homme et le chimpanzé partagent ~98.8% de séquence génomique commune."
    },
    {
        "label": "Consensus Établi",
        "text": "L'arbre humain est un buisson complexe d'espèces ayant longtemps coexisté et s'étant métissées."
    }
],
  },
  "living-biosphere": {
    id: "living-biosphere",
    title: "L'Arbre Interconnecté du Vivant",
    subtitle: "Des racines unicellulaires aux millions de branches actuelles",
    timeRange: "Époque Actuelle",
    eonOrEra: "Anthropocène / Holocène",
    narrativeParagraphs: [
    "La biosphère actuelle déploie des millions d'espèces reliées par une trame généalogique et écologique ininterrompue.",
    "De la baleine bleue aux bactéries extrêmophiles des fosses océaniques, chaque être vivant dérive d'une racine cellulaire commune.",
    "L'Arbre du Vivant nous rappelle que l'Homme n'est pas le sommet de la nature, mais une étincelle de conscience dans une épopée de 3.8 milliards d'années."
],
    keyMilestones: [
    "~8.7 millions d'espèces eucaryotes contemporaines estimées",
    "Milliards de lignées microbiennes peuplant tous les écosystèmes",
    "Une tapisserie généalogique ininterrompue de plus de 3.8 Ga"
],
    scientificNotes: [
    {
        "label": "Consensus Établi",
        "text": "Tous les êtres vivants partagent les mêmes L-aminoacides et le même code génétique à 64 codons hérité de LUCA."
    }
],
  },
};

export const storyTranslations = {
  en: storyEN,
  "bn-IN": storyBN,
  "hi-IN": storyHI,
  es: storyES,
  fr: storyFR,
};
