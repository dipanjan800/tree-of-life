// ============================================================
// Tree of Life — Mass Extinction Events Dataset
// The "Big Five" Major Phanerozoic Extinction Crises
// Chronological & geochemical consensus calibrated to
// the International Commission on Stratigraphy (ICS v2024).
// Preserves scientific uncertainty and competing hypotheses.
// ============================================================

import type { MassExtinctionEvent, MassExtinctionId } from "@/types/conservation";

export const BIG_FIVE_MASS_EXTINCTIONS: Record<MassExtinctionId, MassExtinctionEvent> = {
  ordovician_silurian: {
    id: "ordovician_silurian",
    name: "Late Ordovician Mass Extinction (LOME)",
    geologicalBoundary: "Hirnantian–Rhuddanian Stage Boundary",
    ageMya: 444,
    ageRange: "~445.2–443.8 MYA (End-Ordovician Hirnantian Stage)",
    estimatedLossGeneraPercent: "~50–60% of marine genera",
    estimatedLossSpeciesPercent: "~85% of marine species",
    primaryTriggers: [
      "Rapid Gondwanan South Polar glaciation",
      "Subduction-zone volcanism and silicate weathering drawdown of atmospheric CO2",
      "Episodic oceanic anoxia and euxinia during interglacial deglaciation pulses",
    ],
    environmentalMechanisms: [
      "Severe global sea-level drop (>70m–100m) draining epicontinental shelf seas",
      "Sharp global cooling pulse followed by rapid warming and shelf-sea dysoxia",
      "Disruption of marine thermohaline circulation",
    ],
    affectedGroups: [
      "Graptolites (near total decimation)",
      "Trilobites (severe taxonomic reduction, loss of agnostids and asaphids)",
      "Brachiopods and Bryozoans (loss of ~80% of endemic shelf taxa)",
      "Conodonts and early jawless ostracoderms",
      "Reef-building tabulate and rugose corals",
    ],
    survivingRadiations: [
      "Surviving rhynchonelliform brachiopods that recolonized post-glacial benthic biomes",
      "Primitive jawless vertebrates and ancestral gnathostomes",
      "Cosmopolitan graptolite survivors leading into Silurian monograptid radiations",
      "Early terrestrializing embryophyte land plants expanding into riparian fringes",
    ],
    uncertaintyNotes:
      "Scientific debate centers on whether Hirnantian glaciation was driven by silicate rock weathering accelerated by primitive land plants or volcanic winter aerosols, and whether toxic heavy metal (Hg, Pb) release from oceanic euxinia contributed to the second kill pulse.",
    peerReviewedReferences: [
      {
        citation: "Sheehan, P. M. (2001). The Late Ordovician mass extinction. Annual Review of Earth and Planetary Sciences, 29(1), 331-364.",
        doi: "10.1146/annurev.earth.29.1.331",
        year: 2001,
      },
      {
        citation: "Finnegan, S., et al. (2011). The magnitude and duration of Late Ordovician-Early Silurian glaciation. Science, 331(6019), 903-906.",
        doi: "10.1126/science.1200803",
        year: 2011,
      },
    ],
  },

  late_devonian: {
    id: "late_devonian",
    name: "Late Devonian Mass Extinction (Kellwasser & Hangenberg Events)",
    geologicalBoundary: "Frasnian–Famennian (~372 MYA) & Devonian–Carboniferous (~359 MYA) Horizons",
    ageMya: 372,
    ageRange: "~372–359 MYA (Pulsed multi-stage biotic crisis)",
    estimatedLossGeneraPercent: "~50% of all genera",
    estimatedLossSpeciesPercent: "~70–80% of all species",
    primaryTriggers: [
      "Expansion of deep-rooted vascular forests (e.g. Archaeopteris) driving extreme pedogenesis and nutrient runoff (eutrophication)",
      "Viluy and Pripyat–Dnieper–Donets Large Igneous Province (LIP) magmatism",
      "Widespread oceanic bottom-water anoxia and black shale deposition (Kellwasser Horizons)",
    ],
    environmentalMechanisms: [
      "Hyper-eutrophication and prolonged oceanic anoxic events (OAEs)",
      "Global cooling and polar glaciation at the Devonian–Carboniferous boundary (Hangenberg event)",
      "Collapse of shallow marine carbonate factories and stromatoporoid reef biomes",
    ],
    affectedGroups: [
      "Armored Placoderm fishes (e.g. Dunkleosteus, completely extirpated)",
      "Stromatoporoids and rugose coral reef communities",
      "Trilobites (loss of Phacopida and all orders except Proetida)",
      "Early stem-tetrapods and lobe-finned fish lineages (Romer's Gap bottlenecks)",
      "Ammonoids and acritarchs",
    ],
    survivingRadiations: [
      "Proetid trilobites (sole surviving trilobite order through the Carboniferous)",
      "Ray-finned fishes (Actinopterygii) and chondrichthyans (sharks), which radiated rapidly into vacant nektonic niches",
      "Crown tetrapods, which diversified onto Carboniferous swamp-forest landmasses",
      "Lycopods, sphenopsids, and seed ferns forming Carboniferous coal basins",
    ],
    uncertaintyNotes:
      "Debate persists regarding the relative roles of LIP volcanism versus plant-induced weathering eutrophication, and whether an extraterrestrial impact (e.g. Siljan or Alamo impacts) played a trigger role in any of the individual bio-events.",
    peerReviewedReferences: [
      {
        citation: "Algeo, T. J., & Scheckler, S. E. (1998). Terrestrial-marine teleconnections in the Devonian: link between the evolution of land plants, weathering processes, and marine anoxic events. Philosophical Transactions of the Royal Society B, 353(1365), 113-130.",
        doi: "10.1098/rstb.1998.0195",
        year: 1998,
      },
      {
        citation: "McGhee, G. R. (1996). The Late Devonian Mass Extinction: the Frasnian/Famennian Crisis. Columbia University Press.",
        year: 1996,
      },
    ],
  },

  permian_triassic: {
    id: "permian_triassic",
    name: "Permian–Triassic Mass Extinction ('The Great Dying')",
    geologicalBoundary: "Changhsingian–Induan Stage Boundary (GSSP Meishan, China)",
    ageMya: 251.9,
    ageRange: "251.902 ± 0.024 MYA (High-precision U-Pb zircon geochronology)",
    estimatedLossGeneraPercent: "~83% of genera",
    estimatedLossSpeciesPercent: "~90–96% of marine species; ~70% of terrestrial vertebrate families",
    primaryTriggers: [
      "Massive Siberian Traps Large Igneous Province (LIP) flood basalt volcanism",
      "Thermal combustion and metamorphism of organic-rich coal and evaporite basins releasing vast gigatons of CO2, CH4, and halogenated gasses",
      "Extreme runaway greenhouse effect, oceanic acid-bath, and pan-oceanic super-anoxia/euxinia (H2S toxic buildup)",
    ],
    environmentalMechanisms: [
      "Hyperthermal warming (equatorial sea-surface temperatures exceeding 40°C)",
      "Oceanic acidification dissolving calcareous skeletons",
      "Catastrophic ozone shield depletion leading to mutagenic UV radiation",
      "Terrestrial soil stripping and acid rain collapse of continental ecosystems",
    ],
    affectedGroups: [
      "Trilobita (final complete extinction after 270 million years of survival)",
      "Eurypterids (sea scorpions)",
      "Tabulate and Rugose corals (total extinction of Paleozoic coral orders)",
      "Blastoid echinoderms and fusulinid foraminifera",
      "Gorgonopsians and diverse basal synapsids ('mammal-like reptiles')",
      "Heavy decimation of gymnosperms, seed ferns, and terrestrial insect orders",
    ],
    survivingRadiations: [
      "Early Archosauromorpha (ancestors of dinosaurs, pterosaurs, and crocodilians)",
      "Cynodont therapsids (the ancestral lineage of true mammals)",
      "Molluscs: bivalves and gastropods expanding into benthic zones",
      "Modern Scleractinian corals emerging in the Middle Triassic",
      "Ammonoids recovering explosively from a tiny handful of surviving lineages",
    ],
    uncertaintyNotes:
      "High-precision geochronology confirms the main marine extinction pulse lasted less than 60,000 years. Lingering debate focuses on whether a secondary pulse occurred in the Early Triassic and the exact relative contributions of toxic hydrogen sulfide oceans vs. thermal hyperthermia.",
    peerReviewedReferences: [
      {
        citation: "Burgess, S. D., Bowring, S., & Shen, S. Z. (2014). High-precision timeline for Earth's most severe extinction. Proceedings of the National Academy of Sciences, 111(8), 2602-2607.",
        doi: "10.1073/pnas.1317692111",
        year: 2014,
      },
      {
        citation: "Shen, S. Z., et al. (2011). Calibrating the End-Permian Mass Extinction. Science, 334(6061), 1367-1372.",
        doi: "10.1126/science.1213454",
        year: 2011,
      },
    ],
  },

  triassic_jurassic: {
    id: "triassic_jurassic",
    name: "Triassic–Jurassic Mass Extinction (End-Triassic Event)",
    geologicalBoundary: "Rhaetian–Hettangian Stage Boundary",
    ageMya: 201.4,
    ageRange: "201.36 ± 0.17 MYA",
    estimatedLossGeneraPercent: "~48% of marine genera",
    estimatedLossSpeciesPercent: "~75–80% of all species",
    primaryTriggers: [
      "Central Atlantic Magmatic Province (CAMP) flood basalt eruptions during Pangaean rifting",
      "Massive injection of volcanic CO2 and methane clathrate destabilization",
      "Global climate destabilization with alternating pulses of volcanic winter cooling and hyperthermal greenhouse warming",
    ],
    environmentalMechanisms: [
      "Severe ocean acidification and biomineralization crisis in marine calcifiers",
      "Widespread marine anoxia in epicontinental and shelf basins",
      "Soil erosion and floral collapse across Pangaean continental interiors",
    ],
    affectedGroups: [
      "Conodonts (final extinction of the Conodonta after ~300 million years)",
      "Pseudosuchian archosaurs (rauisuchians, aetosaurs, phytosaurs; all non-crocodylomorph archosaurs)",
      "Therapsids (extinction of large herbivorous dicynodonts and diverse non-mammaliaform cynodonts)",
      "Ammonoids (survived by a single family, Psiloceratidae)",
      "Shallow-water marine bivalves and reef-building scleractinian corals",
    ],
    survivingRadiations: [
      "Dinosauria: insulated with proto-feathers, dinosaurs survived polar freezing intervals and rapidly expanded to dominate all terrestrial megafaunal niches in the Jurassic",
      "Crocodylomorphs (giving rise to modern crocodilians and croc-line archosaurs)",
      "Early crown Mammaliaformes diversifying into nocturnal insectivorous niches",
      "Pterosaurs dominating aerial vertebrate niches",
      "Scleractinian corals reconstituting Jurassic biogenic reefs",
    ],
    uncertaintyNotes:
      "Recent research indicates that high-latitude freezing pulses driven by volcanic sulfate aerosols (volcanic winters) may have been the primary terrestrial kill mechanism, explaining why feathery dinosaurs with high metabolic rates survived while naked crurotarsan reptiles perished.",
    peerReviewedReferences: [
      {
        citation: "Blackburn, T. J., et al. (2013). Zircon U-Pb geochronology links the end-Triassic extinction with the Central Atlantic Magmatic Province. Science, 340(6135), 941-945.",
        doi: "10.1126/science.1234204",
        year: 2013,
      },
      {
        citation: "Olsen, P., et al. (2022). Arctic ice and the rise of dinosaurs: End-Triassic volcanic winter drove mass extinction of uninsulated competitors. Science Advances, 8(26), eabo6342.",
        doi: "10.1126/sciadv.abo6342",
        year: 2022,
      },
    ],
  },

  cretaceous_paleogene: {
    id: "cretaceous_paleogene",
    name: "Cretaceous–Paleogene Mass Extinction (K-Pg Event)",
    geologicalBoundary: "Maastrichtian–Danian Boundary (GSSP El Kef, Tunisia)",
    ageMya: 66.0,
    ageRange: "66.043 ± 0.043 MYA (High-precision 40Ar/39Ar tephra dating)",
    estimatedLossGeneraPercent: "~47% of marine genera",
    estimatedLossSpeciesPercent: "~75% of all species",
    primaryTriggers: [
      "Chicxulub asteroid impact (~10–14 km carbonaceous asteroid impacting carbonate/evaporite target rock on the Yucatán platform)",
      "Deccan Traps Large Igneous Province (LIP) flood volcanism in peninsular India (pulsed eruptive activity)",
      "Atmospheric vaporisation of anhydrite releasing ~325 Gt sulfur and ~425 Gt CO2, producing global impact winter and acid rain",
    ],
    environmentalMechanisms: [
      "Global darkness (impact winter) suppressing photosynthesis for 1–2 years",
      "Global thermal pulse from atmospheric re-entry of hypervelocity ballistic spherules igniting worldwide wildfires",
      "Catastrophic rapid ocean surface acidification within days to weeks",
      "Mega-tsunami (>100m) radiating across the Gulf of Mexico and Atlantic basins",
    ],
    affectedGroups: [
      "Non-avian Dinosaurs (e.g. Tyrannosaurus rex, Triceratops horridus; 100% extinction of non-avian clades)",
      "Pterosauria (giant winged reptiles completely extirpated)",
      "Marine reptiles: Mosasauridae and Plesiosauria",
      "Ammonites and Belemnites (total final extinction of coiled shelled cephalopods)",
      "Rudist bivalves and diverse calcareous plankton (globigerinid foraminifera, coccolithophores)",
      "Enantiornithine birds ('opposite birds')",
    ],
    survivingRadiations: [
      "Neornithes (Crown Birds): ground-dwelling, seed-eating beaked avians radiated explosively into modern bird orders",
      "Placental, Marsupial, and Monotreme Mammals: burrowing, detritivorous mammals diversified into vacant megafaunal niches within 300,000–1,000,000 years",
      "Crocodilians, Turtles, Lizards, and Snakes (ectothermic, semi-aquatic freshwater biomes suffered lower mortality)",
      "Lepidosteid and amiid freshwater fishes; teleost fishes in marine environments",
      "Angiosperms (flowering plants) and ferns (immediate post-impact 'fern spike')",
    ],
    uncertaintyNotes:
      "The primary kill mechanism is firmly attributed to the Chicxulub impact. The ongoing scientific debate revolves around whether earlier Deccan Traps volcanic outgassing pre-stressed ecosystems prior to impact or whether Deccan eruptions were seismically triggered/accelerated by the impact itself.",
    peerReviewedReferences: [
      {
        citation: "Schulte, P., et al. (2010). The Chicxulub asteroid impact and mass extinction at the Cretaceous-Paleogene boundary. Science, 327(5970), 1214-1218.",
        doi: "10.1126/science.1177265",
        year: 2010,
      },
      {
        citation: "Renne, P. R., et al. (2013). Time scales of critical events around the Cretaceous-Paleogene boundary. Science, 339(6120), 684-687.",
        doi: "10.1126/science.1230492",
        year: 2013,
      },
    ],
  },
};

