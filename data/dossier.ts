// ============================================================
// Tree of Life — Curated Organism Dossiers
// Milestone 2: Museum-Grade Scientific Taxon Enrichment
// Strict Epistemic Demarcation: Only authentic specimens,
// peer-reviewed stratigraphic horizons, and diagnostic traits.
// No invented dates, percentages, or holotype numbers.
// ============================================================

import type { OrganismDossier } from "@/types/dossier";

export const ORGANISM_DOSSIERS: Record<string, OrganismDossier> = {
  "homo-sapiens": {
    taxonId: "homo-sapiens",
    morphology: {
      bodyPlan: "Obligate bipedal hominine primate with gracile skeletal architecture, globularized neurocranium, and reduced masticatory apparatus.",
      distinguishingFeatures: [
        "Globular cranial vault with distinct parietal bossing and vertical forehead",
        "True bony mental protuberance (chin) on mandible (autapomorphy among hominins)",
        "Mean cranial capacity of ~1,350–1,400 cm³ with expanded parietal and cerebellar lobes",
        "Canine teeth fully reduced without honing complex (diastema)",
        "Fully upright posture with double-curved (lumbar/cervical lordosis) spine and non-opposable hallux",
      ],
      adaptations: [
        "Endurance running thermoregulation via whole-body eccrine sweating",
        "High-dexterity manipulative hand with opposable thumb and broad apical tufts for precision grip",
        "Vocal tract architecture (descended larynx and curved hyoid bone) enabling complex phonation",
      ],
      sexualDimorphism: "Moderate sexual dimorphism (~15% body mass differential on average; reduced canine dimorphism compared to ancestral hominids).",
      traits: [
        { category: "cranial", trait: "Globular cranial vault and prominent mental protuberance", isAutapomorphy: true },
        { category: "locomotion", trait: "Habitual striding bipedalism with adducted hallux", isAutapomorphy: true },
        { category: "skeletal", trait: "Gracile postcranial skeleton with reduced cortical bone thickness", isAutapomorphy: false },
      ],
    },
    stratigraphy: {
      fadMya: 0.315, // Jebel Irhoud ~315 ka
      ladMya: 0,
      eon: "Phanerozoic",
      era: "Cenozoic",
      period: "Quaternary",
      epoch: "Pleistocene to Holocene",
      icsStage: "Chibanian to Meghalayan",
      datingMethod: "thermoluminescence",
      datingUncertainty: "±34,000 years (Jebel Irhoud thermoluminescence and coupled ESR/U-series dating)",
    },
    ecology: {
      habitat: "Terrestrial (cosmopolitan geographic distribution across all continents and biomes).",
      trophicLevel: "omnivore",
      paleoEnvironment: "African savanna-woodland mosaic and coastal refugia during Middle Pleistocene glacial cycles.",
      paleoContinentOrRegion: "Pan-African origin (Jebel Irhoud, Morocco; Omo Kibish, Ethiopia; Florisbad, South Africa).",
    },
    specimens: [
      {
        catalogNumber: "Irhoud 1 (cranium)",
        museumOrRepository: "Institut National des Sciences de l'Archéologie et du Patrimoine (INSAP)",
        locationCityCountry: "Rabat, Morocco",
        discoveryYear: 1961,
        typeLocality: "Jebel Irhoud Cave, Morocco (~315 ka)",
        discoveryNotes: "Early anatomically modern human partial cranium showing modern facial morphology combined with an elongated archaic braincase.",
      },
      {
        catalogNumber: "Omo I",
        museumOrRepository: "National Museum of Ethiopia",
        locationCityCountry: "Addis Ababa, Ethiopia",
        discoveryYear: 1967,
        typeLocality: "Kibish Formation, Lower Omo Valley, Ethiopia (~233 ka)",
        discoveryNotes: "Partial skeleton displaying unambiguous modern cranial and postcranial apomorphies including a distinct chin and high vault.",
      },
      {
        catalogNumber: "Herto BOU-VP-16/1",
        museumOrRepository: "National Museum of Ethiopia",
        locationCityCountry: "Addis Ababa, Ethiopia",
        discoveryYear: 1997,
        typeLocality: "Bouri Formation, Middle Awash, Ethiopia (~160 ka)",
        discoveryNotes: "Adult cranium classified under Homo sapiens idaltu, representing near-modern cranial dimensions.",
      },
    ],
    innovations: [
      "Symbolic culture, abstract representational art, and complex syntactic language",
      "Cumulative technological culture with standardized microblade and composite tool technologies",
      "Global environmental modification, plant/animal domestication, and complex cooperative social networks",
    ],
  },

  "dickinsonia-costata": {
    taxonId: "dickinsonia-costata",
    morphology: {
      bodyPlan: "Dorsoventrally compressed, bilateral or glide-reflective segmented disk (Vendobiont / early metazoan grade).",
      distinguishingFeatures: [
        "Oval to round, ribbed body organized into paired, alternating isomeric modules ('units')",
        "Distinct anterior-posterior axis with a non-segmented anterior terminal unit",
        "Unit expansion and addition at the posterior sub-terminal growth zone",
        "Preserved body thickness in life estimated at only a few millimeters",
      ],
      adaptations: [
        "Osmo-absorptive or benthic ventral surface digestion of microbial mats",
        "Glide-symmetry segmentation maximizing surface area relative to body volume",
      ],
      traits: [
        { category: "skeletal", trait: "Non-biomineralized soft-bodied organic quilted integument", isAutapomorphy: false },
        { category: "metabolic", trait: "Production of cholestane sterol biomarkers indicating metazoan animal affinity", isAutapomorphy: true },
      ],
    },
    stratigraphy: {
      fadMya: 558,
      ladMya: 541,
      eon: "Proterozoic",
      era: "Neoproterozoic",
      period: "Ediacaran",
      icsStage: "Ediacaran (upper)",
      datingMethod: "radiometric",
      datingUncertainty: "±1.0 MYA (U-Pb zircon dating of interbedded volcanic ashes)",
    },
    ecology: {
      habitat: "Marine shallow to mid-depth benthic seafloor on microbial mat substrata.",
      trophicLevel: "detritivore",
      paleoEnvironment: "Oxygenated Proterozoic shallow marine shelf; low-energy benthic marine environments.",
      paleoContinentOrRegion: "Baltica (White Sea, Russia) and Eastern Gondwana (Flinders Ranges, South Australia).",
    },
    specimens: [
      {
        catalogNumber: "PIN 3993/632",
        museumOrRepository: "Borissiak Paleontological Institute, Russian Academy of Sciences",
        locationCityCountry: "Moscow, Russia",
        discoveryYear: 2016,
        typeLocality: "Lyamtsa, White Sea region, Arkhangelsk Oblast, Russia (Ust-Pinega Formation)",
        discoveryNotes: "Specimen retaining organic carbon film with intact cholesteroid sterane biomarkers up to 93% cholesteroids, confirming metazoan identity.",
      },
      {
        catalogNumber: "SAM P40101",
        museumOrRepository: "South Australian Museum",
        locationCityCountry: "Adelaide, Australia",
        typeLocality: "Ediacara Hills, Flinders Ranges, South Australia (Rawnsley Quartzite)",
        discoveryNotes: "Historic holotypic and comparative material preserved as hyporelief casts on sandstone bed soles.",
      },
    ],
    innovations: [
      "Earliest empirically verified macroscopic bilateral animal tissue preservation",
      "True metazoan sterol cholesterol biosynthesis in the pre-Cambrian rock record",
    ],
  },

  "tiktaalik-roseae": {
    taxonId: "tiktaalik-roseae",
    morphology: {
      bodyPlan: "Dorsoventrally flattened stem-tetrapodomorph with intermediate piscine fins and tetrapod limb characteristics.",
      distinguishingFeatures: [
        "Fin skeleton with expanded lepidotrichia (fin rays) housing homologous humerus, radius, ulna, and proto-wrist radials",
        "Pectoral girdle decoupled from the skull (loss of opercular and extrascapular bones), creating a mobile functional neck",
        "Dorsally positioned orbits situated atop a flat crocodile-like skull for peering above shallow water",
        "Robust imbricated rib cage capable of supporting thoracic body weight against gravity in shallow water",
      ],
      adaptations: [
        "Pectoral fins capable of propping the body and performing substrate push-ups in shallow waterways",
        "Bimodal respiration utilizing internal gills supplemented by lungs (air-gulping)",
      ],
      traits: [
        { category: "skeletal", trait: "Functional mobile neck with separate pectoral girdle and distinct wrist-like radials", isAutapomorphy: true },
        { category: "locomotion", trait: "Weight-bearing substrate-propping pectoral appendage", isAutapomorphy: true },
      ],
    },
    stratigraphy: {
      fadMya: 375,
      ladMya: 370,
      eon: "Phanerozoic",
      era: "Paleozoic",
      period: "Devonian",
      epoch: "Late Devonian",
      icsStage: "Frasnian",
      datingMethod: "biostratigraphy",
      datingUncertainty: "Calibrated via vertebrate microvertebrate biostratigraphy and palynology (Fram Formation)",
    },
    ecology: {
      habitat: "Shallow, sluggish, subtropical freshwater floodplains and meandering river systems.",
      trophicLevel: "carnivore",
      paleoEnvironment: "Equatorial river channels choked with terrestrial plant debris and low-oxygen shallow margins.",
      paleoContinentOrRegion: "Euramerica / Laurentia (present-day Ellesmere Island, Nunavut, Arctic Canada).",
    },
    specimens: [
      {
        catalogNumber: "NUFV 108 (Holotype)",
        museumOrRepository: "Canadian Museum of Nature (curated on behalf of Nunavut)",
        locationCityCountry: "Ottawa / Iqaluit, Canada",
        discoveryYear: 2004,
        typeLocality: "Fram Formation, southern Ellesmere Island, Nunavut, Canada",
        discoveryNotes: "Partially articulated cranium and complete pectoral girdle with right fin exhibiting the iconic proto-wrist anatomy.",
      },
      {
        catalogNumber: "NUFV 110 (Paratype)",
        museumOrRepository: "Canadian Museum of Nature",
        locationCityCountry: "Ottawa, Canada",
        discoveryYear: 2004,
        typeLocality: "Fram Formation, Ellesmere Island, Nunavut, Canada",
        discoveryNotes: "Well-preserved skull and anterior postcranial skeleton validating anatomical diagnostic features.",
      },
    ],
    innovations: [
      "Loss of the opercular bone series creating cranial-cervical independence (first true neck among vertebrate lineages)",
      "Proximal-distal fin endoskeleton reorganization prefiguring the autopodium (wrist, ankle, and digits) of tetrapods",
    ],
  },

  "archaeopteryx-lithographica": {
    taxonId: "archaeopteryx-lithographica",
    morphology: {
      bodyPlan: "Transitional avialan dinosaur possessing pennaceous aerodynamic flight feathers combined with ancestral theropod skeletal anatomy.",
      distinguishingFeatures: [
        "Asymmetric flight remiges and retrices arranged identically to modern avian wing and tail plumage",
        "Toothed premaxilla, maxilla, and dentary (retention of ancestral non-avian dinosaurian dentition)",
        "Long bony caudal vertebral series (22–23 vertebrae) without a fused pygostyle",
        "Three unfused manual clawed digits on the forelimb capable of grasping",
        "Hyperextensible second pedal digit (relictual dromaeosaurid paravian sickle claw grade)",
      ],
      adaptations: [
        "Gliding and powered flapping flight capability in low-canopy insular archipelagic environments",
        "Insulative and aerodynamic integument consisting of contour and vaned flight feathers",
      ],
      traits: [
        { category: "integument", trait: "Asymmetric pennaceous flight feathers identical in microstructure to modern birds", isAutapomorphy: false },
        { category: "skeletal", trait: "Unfused long bony tail and toothed jaws combined with furcula (wishbone)", isAutapomorphy: false },
      ],
    },
    stratigraphy: {
      fadMya: 150.8,
      ladMya: 148.5,
      eon: "Phanerozoic",
      era: "Mesozoic",
      period: "Jurassic",
      epoch: "Late Jurassic",
      icsStage: "Tithonian",
      datingMethod: "biostratigraphy",
      datingUncertainty: "High-precision ammonite biozonation (Hybonoticeras hybonotum zone, Solnhofen Limestone)",
    },
    ecology: {
      habitat: "Subtropical arid archipelago with hypersaline lagoons and scrub vegetation.",
      trophicLevel: "carnivore",
      paleoEnvironment: "Stagnant, anoxic lagoon bottom waters fostering exceptional lagerstätte preservation.",
      paleoContinentOrRegion: "European Archipelago, Laurasia (Bavaria, Germany).",
    },
    specimens: [
      {
        catalogNumber: "MB.Av.100 (Berlin Specimen)",
        museumOrRepository: "Museum für Naturkunde",
        locationCityCountry: "Berlin, Germany",
        discoveryYear: 1874,
        typeLocality: "Blumenberg near Eichstätt, Solnhofen Limestone, Bavaria, Germany",
        discoveryNotes: "The most famous and complete articulated skeleton with fully preserved feather impressions and skull.",
      },
      {
        catalogNumber: "NHMUK PV OR 37007 (London Specimen - Holotype)",
        museumOrRepository: "Natural History Museum",
        locationCityCountry: "London, United Kingdom",
        discoveryYear: 1861,
        typeLocality: "Langenaltheim, Solnhofen Limestone, Bavaria, Germany",
        discoveryNotes: "First skeletal specimen discovered with feather impressions; purchased by Richard Owen for the British Museum.",
      },
    ],
    innovations: [
      "Aerodynamic asymmetric remiges arranged on forelimbs for aerial locomotion",
      "Fused clavicles forming a functional avian furcula (wishbone) for flight muscle anchoring",
    ],
  },

  "homo-neanderthalensis": {
    taxonId: "homo-neanderthalensis",
    morphology: {
      bodyPlan: "Cold-adapted, heavily muscled archaic hominin with robust skeleton, barrel-shaped thorax, and short distal limb segments.",
      distinguishingFeatures: [
        "Large cranial capacity (~1,400–1,600 cm³) exceeding modern human average",
        "Continuous, double-arched supraorbital torus (brow ridge) and swept-back zygomatics (midfacial prognathism)",
        "Occipital bun (chignon) and suprainiac fossa on posterior cranial vault",
        "Retromolar space on mandible and lack of prominent chin",
        "Large, projecting nasal aperture adapted for humidifying cold glacial air",
      ],
      adaptations: [
        "Allen's and Bergmann's ecogeographic body mass scaling minimizing thermal surface dissipation",
        "Heavy musculoskeletal stress resistance for close-range ambush hunting of Pleistocene megafauna",
      ],
      sexualDimorphism: "Marked sexual dimorphism comparable to modern humans (males ~165 cm, females ~154 cm on average).",
      traits: [
        { category: "cranial", trait: "Midfacial prognathism, suprainiac fossa, and continuous supraorbital torus", isAutapomorphy: true },
        { category: "skeletal", trait: "Hyper-robust thick-walled long bones and expanded apical phalangeal tufts", isAutapomorphy: false },
      ],
    },
    stratigraphy: {
      fadMya: 0.43,
      ladMya: 0.04,
      eon: "Phanerozoic",
      era: "Cenozoic",
      period: "Quaternary",
      epoch: "Pleistocene",
      icsStage: "Chibanian to Late Pleistocene",
      datingMethod: "radiometric",
      datingUncertainty: "High-precision radiocarbon (ultrafiltered ¹⁴C) and ESR/luminescence dating across Eurasian cave sequences",
    },
    ecology: {
      habitat: "Temperate to periglacial steppe-tundra, boreal woodlands, and Mediterranean karst caves.",
      trophicLevel: "apex_predator",
      paleoEnvironment: "Eurasian mammoth-steppe and Pleistocene glacial forest margins.",
      paleoContinentOrRegion: "Western Eurasia (from the Atlantic coast across Central Asia to the Altai Mountains in Siberia).",
    },
    specimens: [
      {
        catalogNumber: "Neanderthal 1 (Feldhofer 1 - Holotype)",
        museumOrRepository: "Rheinisches Landesmuseum Bonn",
        locationCityCountry: "Bonn, Germany",
        discoveryYear: 1856,
        typeLocality: "Kleine Feldhofer Grotte, Neandertal valley near Düsseldorf, Germany",
        discoveryNotes: "Cranial vault and 15 postcranial elements recognized by Fuhlrott and Schaaffhausen as a distinct human fossil lineage.",
      },
      {
        catalogNumber: "La Ferrassie 1",
        museumOrRepository: "Musée de l'Homme",
        locationCityCountry: "Paris, France",
        discoveryYear: 1909,
        typeLocality: "La Ferrassie rock shelter, Savignac-de-Miremont, Dordogne, France",
        discoveryNotes: "Exceptionally complete adult male skeleton exhibiting diagnostic midfacial prognathism and severe tooth wear.",
      },
    ],
    innovations: [
      "Mousterian prepared-core lithic technology (Levallois technique)",
      "Evidence of deliberate burial practices, personal ornamentation (pierced raptor claws, pigments), and medicinal botanical usage",
      "Genetic introgression into non-African Homo sapiens populations contributing 1–2% of the modern Eurasian gene pool",
    ],
  },

  "tyrannosaurus-rex": {
    taxonId: "tyrannosaurus-rex",
    morphology: {
      bodyPlan: "Giant, bipedal hypercarnivorous coelurosaurian theropod dinosaur with massive cranial proportions and reduced forelimbs.",
      distinguishingFeatures: [
        "Massive, heavily reinforced skull (~1.5 m length) with binocular stereoscopic vision",
        "Incipiently heterodont incrassate (D-shaped) bone-crushing dentition up to 30 cm long including roots",
        "Extremely reduced, two-clawed forelimbs that retained robust muscle insertion sites",
        "Expanded dorsal pelvic ilium and arctometatarsalian foot structure for shock absorption during locomotion",
        "Calculated bite force of ~35,000–57,000 Newtons, the highest estimated among terrestrial carnivores",
      ],
      adaptations: [
        "Osteophagy (bone-crushing capability) enabling complete consumption of ceratopsian and hadrosaur carcasses",
        "Extensive cranial pneumaticity reducing skull mass while maintaining rigidity under torsional bite stresses",
      ],
      traits: [
        { category: "cranial", trait: "Fused nasal bones and binocular visual field spanning ~55 degrees", isAutapomorphy: true },
        { category: "dentition", trait: "Deep-rooted, thickened incrassate teeth specialized for bone shattering", isAutapomorphy: true },
      ],
    },
    stratigraphy: {
      fadMya: 68,
      ladMya: 66,
      eon: "Phanerozoic",
      era: "Mesozoic",
      period: "Cretaceous",
      epoch: "Late Cretaceous",
      icsStage: "Maastrichtian",
      datingMethod: "radiometric",
      datingUncertainty: "High-precision ⁴⁰Ar/³⁹Ar radiometric calibration of tonstein volcanic ashes in the Hell Creek Formation",
    },
    ecology: {
      habitat: "Subtropical to temperate coastal plains, river floodplains, and forested river basins.",
      trophicLevel: "apex_predator",
      paleoEnvironment: "Humid subtropical alluvial plains bordered by the Western Interior Seaway.",
      paleoContinentOrRegion: "Laramidia (western North America).",
    },
    specimens: [
      {
        catalogNumber: "CM 9380 (Holotype)",
        museumOrRepository: "Carnegie Museum of Natural History",
        locationCityCountry: "Pittsburgh, USA",
        discoveryYear: 1902,
        typeLocality: "Hell Creek Formation, Dawson County, Montana, USA",
        discoveryNotes: "Discovered by Barnum Brown; designated by Henry Fairfield Osborn as the type specimen of Tyrannosaurus rex in 1905.",
      },
      {
        catalogNumber: "FMNH PR 2081 ('Sue')",
        museumOrRepository: "Field Museum of Natural History",
        locationCityCountry: "Chicago, USA",
        discoveryYear: 1990,
        typeLocality: "Hell Creek Formation, Cheyenne River Indian Reservation, South Dakota, USA",
        discoveryNotes: "One of the largest, most extensive (~90% complete by bone count), and best-preserved T. rex skeletons discovered.",
      },
    ],
    innovations: [
      "Specialized osteophagous feeding biomechanics combining kinetic cranial joints and massive adductor musculature",
      "Apex predatory dominance over late Maastrichtian North American terrestrial food webs until the K-Pg impact extinction",
    ],
  },

  "mammuthus-primigenius": {
    taxonId: "mammuthus-primigenius",
    morphology: {
      bodyPlan: "Cold-adapted elephantid with long shaggy coat, high-peaked cranial dome, and extreme hypsodont lamellar molar dentition.",
      distinguishingFeatures: [
        "Dense dual-layer pelage: fine downy underwool (~5 cm) beneath coarse guard hairs up to 90 cm in length",
        "Subcutaneous adipose fat layer up to 10 cm thick across back and neck (adipose hump)",
        "Elongated, spirally curved tusks (up to 4.2 m length in males) used for sweeping snow and social display",
        "High-crowned (hypsodont) molars with up to 30 closely spaced enamel plates for masticating abrasive silica-rich tundra grasses",
        "Shortened tail and reduced pinnae (ears) minimizing heat loss in sub-zero environments",
      ],
      adaptations: [
        "Thermoregulatory cold-adapted hemoglobin containing chimeric mutations allowing oxygen offloading at near-freezing temperatures",
        "Enlarged sebaceous skin glands secreting lipids across dense fur for water repellency",
      ],
      sexualDimorphism: "Marked sexual dimorphism: adult bulls reached 3.0–3.4 m shoulder height and up to 6 metric tons, whereas cows reached 2.6–2.9 m and ~4 metric tons.",
      traits: [
        { category: "integument", trait: "Multi-layered winter wool pelage and lipid-secreting subcutaneous tissue", isAutapomorphy: true },
        { category: "dentition", trait: "Extreme molar hypsodonty with compressed enamel plates exceeding 25 lamellae", isAutapomorphy: true },
      ],
    },
    stratigraphy: {
      fadMya: 0.4,
      ladMya: 0.004, // Wrangel Island relicts ~4,000 YA
      eon: "Phanerozoic",
      era: "Cenozoic",
      period: "Quaternary",
      epoch: "Pleistocene to Holocene",
      icsStage: "Chibanian to Meghalayan",
      datingMethod: "radiometric",
      datingUncertainty: "High-precision AMS radiocarbon dating of bone collagen and soft tissues from permafrost mummies",
    },
    ecology: {
      habitat: "Periglacial dry mammoth-steppe (steppe-tundra) characterized by high herbaceous plant productivity and cold arid climate.",
      trophicLevel: "herbivore",
      paleoEnvironment: "Vast circum-polar Pleistocene mammoth steppe spanning from Ireland to the Yukon.",
      paleoContinentOrRegion: "Northern Holarctic (Eurasia, Beringia, and northern North America).",
    },
    specimens: [
      {
        catalogNumber: "Adams Mammoth (Holotype neotype specimen)",
        museumOrRepository: "Zoological Museum of the Zoological Institute of the Russian Academy of Sciences",
        locationCityCountry: "Saint Petersburg, Russia",
        discoveryYear: 1799,
        typeLocality: "Lena River delta, Siberia, Russia",
        discoveryNotes: "First complete mammoth skeleton recovered with soft tissues and fur; provided initial empirical proof of species extinction.",
      },
      {
        catalogNumber: "'Lyuba' (Baby Mammoth Mummy)",
        museumOrRepository: "Shemanovsky Museum and Exhibition Center",
        locationCityCountry: "Salekhard, Yamal-Nenets Autonomous Okrug, Russia",
        discoveryYear: 2007,
        typeLocality: "Yuribey River, Yamal Peninsula, Siberia (~41,800 YA)",
        discoveryNotes: "Near-pristine 1-month-old female permafrost mammoth calf preserving internal organs, trunk, eyes, and gastric contents.",
      },
    ],
    innovations: [
      "Specialized adaptation to the arid, high-biomass Pleistocene steppe-tundra biome",
      "Biochemical hemoglobin mutations enabling sustained peripheral aerobic metabolism in extreme Arctic cold",
    ],
  },

  "sahelanthropus-tchadensis": {
    taxonId: "sahelanthropus-tchadensis",
    morphology: {
      bodyPlan: "Basal hominin cranium exhibiting a mosaic of primitive ape-like and derived hominin features near the chimpanzee-human divergence.",
      distinguishingFeatures: [
        "Anteriorly positioned foramen magnum (underneath the skull base) suggesting habitual or facultative bipedal posture",
        "Small endocranial volume (~360–380 cm³) comparable to extant chimpanzees",
        "Continuous massive supraorbital torus larger than any extant ape relative to skull size",
        "Relatively flat facial profile (orthognathic lower face) lacking severe subnasal prognathism",
        "Canines with apical wear and absence of functional canine-premolar (C/P3) honing mechanism",
      ],
      adaptations: [
        "Incipient terrestrial bipedal locomotion combined with arboreal climbing capability in mixed woodland habitats",
      ],
      traits: [
        { category: "cranial", trait: "Anteriorly shifted foramen magnum and downward-inclined nuchal plane", isAutapomorphy: true },
        { category: "dentition", trait: "Reduced non-honing canines with apical tip wear", isAutapomorphy: false },
      ],
    },
    stratigraphy: {
      fadMya: 7.2,
      ladMya: 6.8,
      eon: "Phanerozoic",
      era: "Cenozoic",
      period: "Neogene",
      epoch: "Miocene",
      icsStage: "Messinian",
      datingMethod: "radiometric",
      datingUncertainty: "Dated via ¹⁰Be/⁹Be cosmogenic nuclide dating of sediment layers (~7.04 ± 0.18 MYA)",
    },
    ecology: {
      habitat: "Mosaic woodland, gallery forest, and open savanna bordering a major paleo-lake (Paleo-Lake Chad).",
      trophicLevel: "omnivore",
      paleoEnvironment: "Lake margin forest with alternating swamp, woodland, and nearby sand dunes.",
      paleoContinentOrRegion: "Central-North Africa (Djurab Desert, northern Chad).",
    },
    specimens: [
      {
        catalogNumber: "TM 266-01-060-1 ('Toumaï' - Holotype)",
        museumOrRepository: "Centre National de la Recherche pour le Développement (CNRD)",
        locationCityCountry: "N'Djamena, Chad",
        discoveryYear: 2001,
        typeLocality: "Toros-Menalla locality 266, Djurab Desert, Chad",
        discoveryNotes: "Nearly complete cranium discovered by the Mission Paléoanthropologique Franco-Tchadienne led by Michel Brunet.",
      },
    ],
    innovations: [
      "Earliest documented cranial fossil candidate displaying anterior basicranial flexion indicative of bipedal posture",
      "Early reduction of the canine-premolar honing complex near the base of the hominin lineage",
    ],
  },

  "australopithecus-afarensis": {
    taxonId: "australopithecus-afarensis",
    morphology: {
      bodyPlan: "Small-bodied, sexually dimorphic early hominin with obligate terrestrial bipedal adaptations coupled with retention of arboreal climbing traits.",
      distinguishingFeatures: [
        "Valgus knee joint (angled femur) and human-like reoriented pelvis confirming habitual upright bipedal walking",
        "Cranial capacity (~380–500 cm³) with prognathic face and subnasal hollow",
        "Apically wearing canines with parallel dental arcade (intermediate between U-shaped ape and parabolic human arcades)",
        "Curved manual and pedal phalanges indicating continued functional competence in arboreal locomotion",
      ],
      adaptations: [
        "Energy-efficient upright striding bipedalism across open Pliocene African woodland-savanna mosaics",
      ],
      sexualDimorphism: "Pronounced body size dimorphism (males estimated at ~151 cm / 42 kg; females at ~105 cm / 29 kg).",
      traits: [
        { category: "locomotion", trait: "Bicondylar valgus angle and short, broad iliac blades", isAutapomorphy: true },
        { category: "skeletal", trait: "Retention of curved phalanges and cranially oriented scapular glenoid cavity", isAutapomorphy: false },
      ],
    },
    stratigraphy: {
      fadMya: 3.85,
      ladMya: 2.95,
      eon: "Phanerozoic",
      era: "Cenozoic",
      period: "Neogene",
      epoch: "Pliocene",
      icsStage: "Zanclean to Piacenzian",
      datingMethod: "radiometric",
      datingUncertainty: "High-precision ⁴⁰Ar/³⁹Ar radiometric dating of volcanic tuffs (Kada Hadar, Sidi Hakoma, and Denen Dora Members)",
    },
    ecology: {
      habitat: "Mixed riverine gallery woodland, savanna grassland, and lake margin floodplains.",
      trophicLevel: "herbivore",
      paleoEnvironment: "East African Rift Valley riparian woodland with varied C3 and C4 dietary resources.",
      paleoContinentOrRegion: "East Africa (Afar Depression, Ethiopia; Laetoli, Tanzania; Turkana Basin, Kenya).",
    },
    specimens: [
      {
        catalogNumber: "AL 288-1 ('Lucy')",
        museumOrRepository: "National Museum of Ethiopia",
        locationCityCountry: "Addis Ababa, Ethiopia",
        discoveryYear: 1974,
        typeLocality: "Hadar, Afar Depression, Ethiopia (Hadar Formation, ~3.2 MYA)",
        discoveryNotes: "Approximately 40% complete adult female skeleton discovered by Donald Johanson; definitively proved bipedalism preceded brain expansion.",
      },
      {
        catalogNumber: "LH 4 (Holotype)",
        museumOrRepository: "National Museum of Tanzania",
        locationCityCountry: "Dar es Salaam, Tanzania",
        discoveryYear: 1974,
        typeLocality: "Laetoli, Tanzania (Laetolil Beds, ~3.6–3.8 MYA)",
        discoveryNotes: "Adult mandible with dentition designated as the holotype specimen of Australopithecus afarensis by Johanson, White, and Coppens in 1978.",
      },
    ],
    innovations: [
      "Definitive fossil establishment of terrestrial bipedal locomotion documented by both skeletal anatomy and the Laetoli trackways",
      "Adaptive exploitation of diverse savanna and woodland ecotones during Pliocene climate drying",
    ],
  },

  "homo-erectus": {
    taxonId: "homo-erectus",
    morphology: {
      bodyPlan: "Large-bodied, fully upright obligate bipedal hominin with modern human-like limb proportions and elongated legs.",
      distinguishingFeatures: [
        "Cranial capacity expanding through time (~700–1,100 cm³), with low vault and distinct sagittal keel",
        "Prominent continuous supraorbital torus with postorbital constriction and angled occipital torus",
        "Modern postcranial limb proportions: long femora and shortened upper limbs adapted for efficient long-distance striding",
        "Narrow pelvic canal and conical-to-barrel shaped thoracic cage reflecting modern energetic demands",
      ],
      adaptations: [
        "Endurance walking and persistent cursorial locomotion in open tropical and temperate environments",
        "Dietary shift toward calorically dense animal meat and marrow processed via stone tools and early thermal cooking",
      ],
      sexualDimorphism: "Moderate sexual dimorphism, noticeably reduced compared to Australopithecus lineages.",
      traits: [
        { category: "skeletal", trait: "Modern postcranial body stature and long-legged striding proportions", isAutapomorphy: true },
        { category: "cranial", trait: "Thick cranial vault with angular torus and distinct sagittal keel", isAutapomorphy: false },
      ],
    },
    stratigraphy: {
      fadMya: 1.89,
      ladMya: 0.11, // Ngandong, Java relicts ~110 ka
      eon: "Phanerozoic",
      era: "Cenozoic",
      period: "Quaternary",
      epoch: "Pleistocene",
      icsStage: "Early to Late Pleistocene (Gelasian to Late Pleistocene)",
      datingMethod: "radiometric",
      datingUncertainty: "Dated across Olduvai, Koobi Fora, Dmanisi, and Sangiran via ⁴⁰Ar/³⁹Ar and magnetostratigraphy",
    },
    ecology: {
      habitat: "Broad ecological tolerance: African savanna, Caucasian foothills, Southeast Asian tropical river valleys, and East Asian temperate loess plateaus.",
      trophicLevel: "omnivore",
      paleoEnvironment: "First hominin to expand beyond Africa into diverse Eurasian climate zones.",
      paleoContinentOrRegion: "Afro-Eurasia (East and South Africa, Georgia, China, and Indonesia).",
    },
    specimens: [
      {
        catalogNumber: "KNM-WT 15000 ('Turkana Boy' / 'Nariokotome Boy')",
        museumOrRepository: "National Museums of Kenya",
        locationCityCountry: "Nairobi, Kenya",
        discoveryYear: 1984,
        typeLocality: "Nariokotome, West Turkana, Kenya (Natoo Formation, ~1.6 MYA)",
        discoveryNotes: "Nearly complete juvenile skeleton discovered by Kamoya Kimeu; revealed modern human body proportions and linear stature.",
      },
      {
        catalogNumber: "Trinil 2 ('Java Man' - Holotype)",
        museumOrRepository: "Naturalis Biodiversity Center",
        locationCityCountry: "Leiden, Netherlands",
        discoveryYear: 1891,
        typeLocality: "Trinil, Solo River, Java, Indonesia",
        discoveryNotes: "Cranial calotte discovered by Eugène Dubois; original holotype specimen of Pithecanthropus erectus (now Homo erectus).",
      },
    ],
    innovations: [
      "Acheulean bifacial handaxe technology (standardized teardrop symmetrical stone tools)",
      "Controlled utilization of fire (documented at Wonderwerk Cave, Gesher Benot Ya'aqov, and Swartkrans)",
      "First documented hominin trans-continental dispersal out of Africa into Eurasia (~1.8 MYA at Dmanisi, Georgia)",
    ],
  },
};

/**
 * Retrieve curated scientific dossier for a taxon.
 * Returns null if no bespoke dossier exists.
 */
export function getTaxonDossier(taxonId: string): OrganismDossier | null {
  return ORGANISM_DOSSIERS[taxonId] ?? null;
}

