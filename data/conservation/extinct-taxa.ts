// ============================================================
// Tree of Life — Deep-Time Extinct Taxa Profiles
// Profiles for authentic prehistoric taxa in the Tree of Life.
// Strict Demarcation: Modern IUCN status is NEVER applied to
// prehistoric fossils. Distinct from post-1500 CE anthropogenic extinctions.
// ============================================================

import type { DeepTimeExtinctionProfile } from "@/types/conservation";

export const EXTINCT_TAXA_PROFILES: Record<string, DeepTimeExtinctionProfile> = {
  "tyrannosaurus-rex": {
    taxonId: "tyrannosaurus-rex",
    scientificName: "Tyrannosaurus rex",
    commonName: "Tyrannosaurus rex",
    massExtinctionEventId: "cretaceous_paleogene",
    horizonName: "Cretaceous–Paleogene (K-Pg) Boundary",
    lastFossilOccurrenceMya: 66.0,
    lastFossilHorizon: "Uppermost Hell Creek Formation, Montana / Scollard Formation, Alberta (within 10 cm of the iridium-enriched K-Pg boundary layer)",
    datingMethod: "High-precision 40Ar/39Ar tephra sanidine geochronology and iridium anomaly boundary correlation",
    extinctionMechanisms: [
      "Global darkness (impact winter) suppressing primary vegetation production",
      "Immediate thermal wildfire pulse followed by dramatic terrestrial food web collapse",
      "Inability of large-bodied (>5–8 ton) obligate hypercarnivores to sustain caloric requirements following megaherbivore collapse",
    ],
    significance: "Terminal apex theropod of Laramidia. Exemplifies the 100% loss of non-avian dinosaurs across the K-Pg crisis.",
    isMassExtinctionVictim: true,
    scientificUncertainty: "Debate continues regarding whether population densities in western North America were already facing geographical fragmentation due to Western Interior Seaway regression in the late Maastrichtian prior to impact.",
    fossilSpecimenReference: "FMNH PR 2081 ('Sue', Field Museum of Natural History) & RSM P2523.8 ('Scotty')",
  },

  "triceratops-horridus": {
    taxonId: "triceratops-horridus",
    scientificName: "Triceratops horridus",
    commonName: "Triceratops",
    massExtinctionEventId: "cretaceous_paleogene",
    horizonName: "Cretaceous–Paleogene (K-Pg) Boundary",
    lastFossilOccurrenceMya: 66.0,
    lastFossilHorizon: "Top 3 meters of Hell Creek Formation, Harding County, South Dakota",
    datingMethod: "Tephra 40Ar/39Ar radiometrics and palynological boundary definition (disappearance of Cretaceous pollen species)",
    extinctionMechanisms: [
      "Total collapse of angiosperm and gymnosperm browse during 1–2 year sub-freezing impact winter",
      "Acid rain defoliation of forest canopies and soil leaching",
      "Starvation of multi-ton herd megaherbivores",
    ],
    significance: "Most abundant large herbivorous dinosaur of latest Maastrichtian North America (~66 MYA). Extinguished abruptly at the boundary.",
    isMassExtinctionVictim: true,
    scientificUncertainty: "High-density bonebed stratigraphy proves robust population viability in North America right up to the boundary, refuting gradual pre-impact decline models for this genus.",
    fossilSpecimenReference: "YPM 1820 (Holotype cranium, Yale Peabody Museum)",
  },

  "dunkleosteus-terrelli": {
    taxonId: "dunkleosteus-terrelli",
    scientificName: "Dunkleosteus terrelli",
    commonName: "Dunkleosteus",
    massExtinctionEventId: "late_devonian",
    horizonName: "Late Devonian Extinction (Hangenberg & Kellwasser Horizons)",
    lastFossilOccurrenceMya: 358.9,
    lastFossilHorizon: "Cleveland Shale Member of Ohio Shale, North Olmsted, Cuyahoga County, Ohio",
    datingMethod: "Conodont biostratigraphy (Bispathus ultimus zone) calibrated with high-resolution U-Pb zircon ashes",
    extinctionMechanisms: [
      "Pan-oceanic benthic and pelagic anoxia (Kellwasser and Hangenberg black shales)",
      "Global cooling pulse and sea-level regression destroying warm shallow epicontinental seas",
      "Specialized hypercarnivorous apex trophic niche collapse",
    ],
    significance: "Represents the total, irreversible extinction of Class Placodermi (armored jawed fishes), opening nektonic ecospace for chondrichthyans and actinopterygii.",
    isMassExtinctionVictim: true,
    scientificUncertainty: "Whether Dunkleosteus disappeared precisely during the earlier Frasnian-Famennian Kellwasser pulse or persisted as relict populations until the terminal Devonian Hangenberg event (~359 MYA).",
    fossilSpecimenReference: "CMNH 5768 (Cleveland Museum of Natural History)",
  },

  "trilobita": {
    taxonId: "trilobita",
    scientificName: "Trilobita",
    commonName: "Trilobites",
    massExtinctionEventId: "permian_triassic",
    horizonName: "Permian–Triassic (P-Tr) Boundary ('The Great Dying')",
    lastFossilOccurrenceMya: 251.9,
    lastFossilHorizon: "Bed 24–25 of Meishan GSSP, Zhejiang Province, China & Transcaucasian Permian carbonate strata",
    datingMethod: "High-precision CA-ID-TIMS U-Pb zircon geochronology (251.902 ± 0.024 MYA)",
    extinctionMechanisms: [
      "Oceanic acidification dissolving calcite carapaces",
      "Pervasive oceanic anoxia and toxic hydrogen sulfide (euxinia) upwelling across benthic shelf environments",
      "Catastrophic marine hyperthermia (tropical ocean temperatures reaching >40°C)",
    ],
    significance: "The definitive termination of an entire iconic class that spanned over 270 million years from the early Cambrian to the end of the Paleozoic.",
    isMassExtinctionVictim: true,
    scientificUncertainty: "Trilobites were reduced from thousands of genera in the Ordovician down to five proetid families by the Late Carboniferous, making their final demise an acute terminal shock after protracted long-term taxonomic attrition.",
    fossilSpecimenReference: "Proetida specimens in Meishan Section Bed 24",
  },

  "elrathia-kingii": {
    taxonId: "elrathia-kingii",
    scientificName: "Elrathia kingii",
    commonName: "Elrathia",
    horizonName: "Middle Cambrian (Miaolingian Series, Drumian Stage)",
    lastFossilOccurrenceMya: 501.0,
    lastFossilHorizon: "Wheeler Shale, House Range, Millard County, Utah",
    datingMethod: "Trilobite biozone stratigraphy (Ptychagnostus atavus zone) coupled with carbon isotope chemostratigraphy",
    extinctionMechanisms: [
      "Localized paleoenvironmental shift in dysoxic mudstone deposition",
      "Cambrian faunal turnover events (biomere turnovers) driven by episodic oceanic upwelling of anoxic deep water",
    ],
    significance: "One of the most abundant and well-preserved Cambrian benthic trilobites, adapted to low-oxygen seafloor facies.",
    isMassExtinctionVictim: false,
    scientificUncertainty: "Disappearance corresponds to regional biofacies migration and local extinction rather than a global catastrophic mass extinction horizon.",
    fossilSpecimenReference: "USNM 61536 (National Museum of Natural History)",
  },

  "anomalocaris-canadensis": {
    taxonId: "anomalocaris-canadensis",
    scientificName: "Anomalocaris canadensis",
    commonName: "Anomalocaris",
    horizonName: "Middle Cambrian (Wuliuan–Drumian Stage)",
    lastFossilOccurrenceMya: 500.0,
    lastFossilHorizon: "Burgess Shale, Stephen Formation, Fossil Ridge, British Columbia, Canada",
    datingMethod: "Trilobite/aglaspid biostratigraphy and radiometric constraints from interbedded volcanic tuffs",
    extinctionMechanisms: [
      "Ecological turnover of early stem-arthropods",
      "Diversification of crown euarthropods and cephalopod-like molluscs occupying higher-speed predator niches",
    ],
    significance: "World's earliest confirmed apex macroscopic swimming predator, pioneering compound vision and specialized grasping appendages.",
    isMassExtinctionVictim: false,
    scientificUncertainty: "Radiodonta relatives (such as Aegirocassis) are now documented through the Ordovician and even Devonian, indicating stem-arthropod lineages survived far longer than previously assumed.",
    fossilSpecimenReference: "ROM 51216 (Royal Ontario Museum) & GSC 7554",
  },

  "archaeopteryx-lithographica": {
    taxonId: "archaeopteryx-lithographica",
    scientificName: "Archaeopteryx lithographica",
    commonName: "Archaeopteryx",
    horizonName: "Late Jurassic (Early Tithonian Stage)",
    lastFossilOccurrenceMya: 148.5,
    lastFossilHorizon: "Solnhofen Archipelago Plattenkalk, Bavaria, Germany (Hybonoticeras hybonotum ammonite zone)",
    datingMethod: "Ammonite biostratigraphy calibrated with orbital cyclostratigraphy (~150.8–148.5 MYA)",
    extinctionMechanisms: [
      "Speciation and lineage transformation into more derived avialan clades (anagenetic/cladogenetic transition)",
      "Local lagoonal lagoon-island endemic habitat replacement",
    ],
    significance: "Iconic transitional stem-avialan fossil validating Darwinian macroevolutionary transition between non-avian maniraptoran theropods and crown birds.",
    isMassExtinctionVictim: false,
    scientificUncertainty: "Does not represent a catastrophic extinction; rather, represents a brief taphonomic window of exceptional preservation (Konservat-Lagerstätte) capturing an early stage of avian wing evolution.",
    fossilSpecimenReference: "London Specimen (BMNH 37001) & Berlin Specimen (HMN 1880)",
  },

  "dickinsonia-costata": {
    taxonId: "dickinsonia-costata",
    scientificName: "Dickinsonia costata",
    commonName: "Dickinsonia",
    horizonName: "End-Ediacaran Extinction / 'Cambrian Substrate Revolution'",
    lastFossilOccurrenceMya: 541.0,
    lastFossilHorizon: "Ediacara Member of the Rawnsley Quartzite, Flinders Ranges, South Australia & White Sea Lyamtsa Formation, Russia",
    datingMethod: "High-precision U-Pb dating of volcanic ash beds directly overlying Ediacaran bedding surfaces (541.0 ± 0.29 MYA)",
    extinctionMechanisms: [
      "Substrate revolution: burrowing bilaterian worms destroyed the ancient benthic microbial mats (agronomic revolution)",
      "Onset of predation by early biomineralized organisms",
      "Late Ediacaran oceanic anoxia pulses immediately preceding the Cambrian explosion",
    ],
    significance: "Earliest verified macroscopic animal (eumetazoan confirmed via cholesteroid biomarkers), extinguished prior to the Cambrian radiation.",
    isMassExtinctionVictim: false,
    scientificUncertainty: "Ongoing debate centers on whether the 'Cotyledon/Ediacaran extinction' was a true catastrophic biotic extinction event or primarily a taphonomic disappearance ('Savannah/Taphonomic Gap') caused by microbial mat loss.",
    fossilSpecimenReference: "SAM P13705 (South Australian Museum)",
  },

  "dimetrodon-limbatus": {
    taxonId: "dimetrodon-limbatus",
    scientificName: "Dimetrodon limbatus",
    commonName: "Dimetrodon",
    horizonName: "Early Permian (Artinskian Stage)",
    lastFossilOccurrenceMya: 272.0,
    lastFossilHorizon: "Wichita & Clear Fork Groups, Texas / Wellington Formation, Oklahoma",
    datingMethod: "Continental vertebrate biochronology (Land-Vertebrate Faunal faunas) and paleomagnetic reversal correlation",
    extinctionMechanisms: [
      "Early–Middle Permian aridification of equatorial Pangaea (drying of perennial riparian floodplains)",
      "Faunal turnover: replacement of sphenacodontids by therapsid (mammal-like reptile) radiations (Olson's Extinction)",
    ],
    significance: "Prominent basal non-mammalian synapsid with thermoregulatory neural dorsal sail, ancestral to the mammalian lineage.",
    isMassExtinctionVictim: false,
    scientificUncertainty: "Extinction occurred ~20 million years before the Permian–Triassic mass extinction during Olson's Extinction event (~273–270 MYA), which remains an active subject of paleobiological study.",
    fossilSpecimenReference: "AMNH 4065 (American Museum of Natural History)",
  },

  "tiktaalik-roseae": {
    taxonId: "tiktaalik-roseae",
    scientificName: "Tiktaalik roseae",
    commonName: "Tiktaalik",
    horizonName: "Late Devonian (Early Frasnian Stage)",
    lastFossilOccurrenceMya: 375.0,
    lastFossilHorizon: "Fram Formation, southern Ellesmere Island, Nunavut, Canada",
    datingMethod: "Spore and microvertebrate biostratigraphy calibrated against regional Devonian clastic deltaic sequences (~375 MYA)",
    extinctionMechanisms: [
      "Cladogenetic evolutionary transition: stem-tetrapods diversified into fully digited crown tetrapods (e.g. Acanthostega, Ichthyostega)",
      "Fluvial ecosystem changes and sea-level fluctuations",
    ],
    significance: "Crucial 'fishapod' bridging the gap between elpistostegalian lobe-finned fish and limbed tetrapods. Disappearance represents evolutionary transition rather than cataclysm.",
    isMassExtinctionVictim: false,
    scientificUncertainty: "Preserved in an active freshwater meandering river system. Discovery of Polish marine tetrapod trackways (~395 MYA) indicates stem-tetrapod divergence began substantially earlier than Tiktaalik.",
    fossilSpecimenReference: "NUFV 108 (Holotype, Canadian Museum of Nature / Nunavut)",
  },

  "smilodon-fatalis": {
    taxonId: "smilodon-fatalis",
    scientificName: "Smilodon fatalis",
    commonName: "Saber-Toothed Cat",
    horizonName: "Quaternary Megafaunal Extinction (Late Pleistocene–Early Holocene)",
    lastFossilOccurrenceMya: 0.01, // ~10,000–12,000 YA
    lastFossilHorizon: "Pit 91 and Pit 3, Rancho La Brea Tar Pits, Los Angeles, California",
    datingMethod: "Ultrafiltered AMS radiocarbon (14C) dating of purified bone collagen (12,900–10,200 calibrated years Before Present)",
    extinctionMechanisms: [
      "Extinction of specialized megaherbivore prey base (e.g. Bison antiquus, juvenile mammoths, ground sloths)",
      "Anthropogenic overkill and competitive pressure from expanding Paleo-Indian populations (Clovis hunters)",
      "Rapid post-glacial environmental change during the Younger Dryas climatic reversal",
    ],
    significance: "Terminal hypercarnivorous machairodontine felid. Disappeared during the Late Quaternary Extinction event alongside 70% of North American megafauna.",
    isMassExtinctionVictim: false,
    scientificUncertainty: "Scientific debate continues over whether anthropogenic overkill, climate-induced biome restructuring, or synergistic combinations was the primary kill driver across the North American continent.",
    fossilSpecimenReference: "LACMHC 2001-2 (La Brea Tar Pits & Museum)",
  },

  "mammuthus-primigenius": {
    taxonId: "mammuthus-primigenius",
    scientificName: "Mammuthus primigenius",
    commonName: "Woolly Mammoth",
    horizonName: "Late Quaternary Extinction & Mid-Holocene Relict Demise",
    lastFossilOccurrenceMya: 0.004, // ~4,000 YA (Wrangel Island)
    lastFossilHorizon: "Wrangel Island, Chukchi Sea, Arctic Siberia (Relict population) & St. Paul Island, Alaska (~5,600 YA)",
    datingMethod: "High-precision AMS 14C dating of ivory, dentin, and soft tissue mummies (calibrated to ~3,700–4,000 cal BP)",
    extinctionMechanisms: [
      "Climatic transformation of dry, cold productive mammoth steppe into wet, nutrient-poor mossy tundra and taiga",
      "Anthropogenic hunting pressure on mainland continental populations",
      "Severe genomic inbreeding depression and mutational meltdown in tiny, isolated insular relict populations on Wrangel Island",
    ],
    significance: "Iconic flagship species of the Pleistocene mammoth steppe. Main continental populations collapsed ~10,000 YA; isolated island relicts endured into human dynastic times.",
    isMassExtinctionVictim: false,
    scientificUncertainty: "Mainland extinction correlates strongly with both human expansion and climate warming. Wrangel Island extinction (~4,000 cal BP) coincides with sudden environmental perturbation, inbreeding bottlenecks, and possible early human arrival.",
    fossilSpecimenReference: "Adams Mammoth (Saint Petersburg Zoological Museum) & Lyuba mummy",
  },

  "homo-neanderthalensis": {
    taxonId: "homo-neanderthalensis",
    scientificName: "Homo neanderthalensis",
    commonName: "Neanderthals",
    horizonName: "Middle-to-Upper Paleolithic Transition",
    lastFossilOccurrenceMya: 0.04, // ~40,000 YA
    lastFossilHorizon: "Grotte de Spy, Belgium & Mezmaiskaya Cave, Caucasus & Gorham's Cave, Gibraltar",
    datingMethod: "Compound-specific AMS 14C collagen dating and optically stimulated luminescence (OSL) dating",
    extinctionMechanisms: [
      "Demographic swamping and genetic introgression into dispersing anatomically modern Homo sapiens",
      "Climatic instability during Heinrich Events and Dansgaard-Oeschger cycles in western Eurasia",
      "Resource competition and lower effective reproductive population sizes",
    ],
    significance: "Our closest archaic human relatives. Survived for ~400,000 years across Eurasia; 1–2% of Neanderthal genomic sequence persists in modern non-African genomes through ancient admixture.",
    isMassExtinctionVictim: false,
    scientificUncertainty: "Debate continues over whether extinction was competitive replacement, assimilation through high-volume admixture, or demographic decline in geographically fragmented small bands.",
    fossilSpecimenReference: "Neanderthal 1 (Feldhofer Cave, Neander Valley, Rheinisches Landesmuseum Bonn)",
  },

  "homo-erectus": {
    taxonId: "homo-erectus",
    scientificName: "Homo erectus",
    commonName: "Homo erectus",
    horizonName: "Late Pleistocene Ngandong Horizon",
    lastFossilOccurrenceMya: 0.117, // ~117,000–108,000 YA (Ngandong, Java)
    lastFossilHorizon: "Ngandong bonebed terrace, Solo River, Java, Indonesia",
    datingMethod: "U-series and electron spin resonance (ESR) dating on fossil teeth combined with 40Ar/39Ar pumice dating",
    extinctionMechanisms: [
      "Rainforest canopy expansion replacing open savanna-woodland habitats in Sundaland",
      "Environmental change and habitat fragmentation on the Sunda shelf",
    ],
    significance: "The longest-lived species in genus Homo (~1.9 million to ~110,000 YA). First hominin to harness fire, manufacture Acheulean handaxes, and disperse widely across Eurasia.",
    isMassExtinctionVictim: false,
    scientificUncertainty: "Precise extinction timing of continental versus insular populations; potential late interactions with Denisovans or Homo floresiensis in Sundaland.",
    fossilSpecimenReference: "Solo Man skulls (Ngandong) & Trinil 2 ('Java Man', Naturalis Biodiversity Center)",
  },

  "australopithecus-afarensis": {
    taxonId: "australopithecus-afarensis",
    scientificName: "Australopithecus afarensis",
    commonName: "Australopithecus ('Lucy')",
    horizonName: "Late Pliocene Piacenzian Stage",
    lastFossilOccurrenceMya: 2.95,
    lastFossilHorizon: "Hadar Formation (Kada Hadar Member), Afar Triangle, Ethiopia",
    datingMethod: "40Ar/39Ar single-crystal laser fusion dating on volcanic feldspars from tephra layers (BKT-2 marker bed)",
    extinctionMechanisms: [
      "Lineage cladogenesis and evolutionary turnover into robust australopithecines (Paranthropus) and early genus Homo",
      "Pliocene climatic cooling and expansion of open savanna grasslands in East Africa",
    ],
    significance: "Basal hominin demonstrating habitual upright bipedalism preceding significant brain encephalization by over 1.5 million years.",
    isMassExtinctionVictim: false,
    scientificUncertainty: "Whether A. afarensis directly gave rise to early Homo (e.g. via Australopithecus garhi or Homo habilis) or represents an offshoot lineage remains an active paleoanthropological question.",
    fossilSpecimenReference: "A.L. 288-1 ('Lucy', National Museum of Ethiopia, Addis Ababa)",
  },

  "sahelanthropus-tchadensis": {
    taxonId: "sahelanthropus-tchadensis",
    scientificName: "Sahelanthropus tchadensis",
    commonName: "Sahelanthropus",
    horizonName: "Late Miocene Messinian Stage",
    lastFossilOccurrenceMya: 6.8,
    lastFossilHorizon: "Anthracotheriid Unit, Kossom Bougoudi and Toros-Menalla, Djurab Desert, Chad",
    datingMethod: "Cosmogenic beryllium-10 / beryllium-9 (10Be/9Be) dating on lacustrine and perilacustrine sediments (7.2–6.8 MYA)",
    extinctionMechanisms: [
      "Miocene paleoenvironmental shifts in the Mega-Chad paleolake basin",
      "Evolutionary lineage replacement or phylogenetic transition close to the Pan–Homo split",
    ],
    significance: "Oldest candidate hominin possessing anteriorly positioned foramen magnum and reduced canine teeth, calibrated close to the human-chimpanzee molecular divergence.",
    isMassExtinctionVictim: false,
    scientificUncertainty: "Debate exists regarding whether postcranial specimens (femur TM 266-01-063) definitively prove habitual terrestrial bipedalism or arboreal clambering locomotion.",
    fossilSpecimenReference: "TM 266-01-060-1 ('Toumaï', N'Djamena, Chad)",
  },
};

export function getExtinctTaxonProfile(taxonId: string): DeepTimeExtinctionProfile | null {
  return EXTINCT_TAXA_PROFILES[taxonId] ?? null;
}

