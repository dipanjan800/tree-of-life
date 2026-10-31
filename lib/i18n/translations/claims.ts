// ============================================================
// Tree of Life — Localized Scientific Claims Registry
// Multi-language translations for Scientific Evidence Inspector
// Locales: en, bn-IN, hi-IN, es, fr
// ============================================================

import type { LocalizedEvidenceClaim } from "../types";

// ── ENGLISH (EN) ───────────────────────────────────────────────
export const claimsEN: Record<string, LocalizedEvidenceClaim> = {
  "claim-homo-sapiens-jebel-irhoud": {
    id: "claim-homo-sapiens-jebel-irhoud",
    statement:
      "Stratigraphically dated fossil cranial and mandibular remains from Jebel Irhoud, Morocco, establish the emergence of early anatomically modern Homo sapiens by approximately 315,000 years ago.",
    explanation:
      "Thermoluminescence dating of heated flints and coupled electron spin resonance / U-series dating of faunal tooth enamel at Jebel Irhoud demonstrated an age of ~315 ± 34 ka. The specimens exhibit modern facial morphology alongside an elongated (archaic) braincase, demonstrating an early phase of pan-African modern human evolution.",
    geologicalFormation: "Jebel Irhoud Cave Deposits",
    uncertaintyOrLimitations:
      "Dating uncertainty margin is ±34,000 years. Debates persist on whether Jebel Irhoud hominins represent anatomically modern humans sensu stricto or an immediate ancestral morphotype on the modern human evolutionary lineage.",
    referenceExplanations: {
      "ref-hublin-2017": "Discovery of early Homo sapiens fossils at Jebel Irhoud and pan-African morphological emergence.",
      "ref-richter-2017": "Thermoluminescence dating of heated flints establishing the ~315 ka timeline.",
    },
    referenceVerificationNotes: {
      "ref-hublin-2017": "DOI verified against Nature repository. Confirmed primary stratigraphic thermoluminescence and morphological cranial analysis.",
      "ref-richter-2017": "DOI verified against Nature repository. Confirmed thermoluminescence dating methodology on heated flints.",
    },
  },

  "claim-dickinsonia-biomarker-steranes": {
    id: "claim-dickinsonia-biomarker-steranes",
    statement:
      "Fossilized organic molecules (cholesteroid steranes) extracted from Ediacaran Dickinsonia specimens definitively confirm its biological affinity as a macroscopic multicellular animal.",
    explanation:
      "Organic geochemical extraction of hydrocarbon biomarkers from Dickinsonia costata fossils from the White Sea region of Russia revealed abundant cholesteroids (up to 93% of total steranes) and a stark depletion of ergosteroids. This geochemical signature is characteristic of Metazoa (animals) and rules out alternative classifications as giant fungi, lichens, or protists.",
    geologicalFormation: "Ust-Pinega Formation (Ediacaran, ~558 MYA)",
    uncertaintyOrLimitations:
      "Biomarker preservation requires exceptional taphonomic conditions where organic films are sealed between claystone laminae, limiting the geographical scope of verifiable specimens to exceptional Konservat-Lagerstätten.",
    referenceExplanations: {
      "ref-bobrovskiy-2018": "Identification of cholesterol biomarkers establishing Dickinsonia as one of Earth's earliest multicellular animals.",
    },
    referenceVerificationNotes: {
      "ref-bobrovskiy-2018": "DOI verified against AAAS Science archive. Confirmed gas chromatography-mass spectrometry (GC-MS) data on cholesterol sterane profiles.",
    },
  },

  "claim-tiktaalik-transitional-tetrapod": {
    id: "claim-tiktaalik-transitional-tetrapod",
    statement:
      "Tiktaalik roseae possesses intermediate skeletal adaptations between sarcopterygian lobe-finned fish and early tetrapods, including functional wrist joints, mobile neck, and overlapping ribs.",
    explanation:
      "Recovered from Late Devonian fluvial sediments (~375 MYA) on Ellesmere Island, Nunavut, Canada, Tiktaalik possesses fish-like scales and fin rays alongside tetrapod-like derived traits: a dorsoventrally flattened skull, loss of opercular bones allowing neck articulation, robust pectoral girdles, and fin bones homologous to the tetrapod humerus, radius, ulna, and wrist elements.",
    geologicalFormation: "Fram Formation (Late Devonian, Frasnian stage, ~375 MYA)",
    uncertaintyOrLimitations:
      "While an anatomical transitional grade, older trace fossils (e.g. Zachełmie tetrapod trackways, Poland, ~390 MYA) indicate that the divergence of stem-tetrapods from lobe-finned fish may precede the Fram Formation deposit.",
    referenceExplanations: {
      "ref-daeschler-2006": "Anatomical description of Tiktaalik roseae and the evolutionary origin of the tetrapod body architecture.",
      "ref-shubin-2006": "Functional morphology of the pectoral fin and homologies with terrestrial tetrapod limbs.",
    },
    referenceVerificationNotes: {
      "ref-daeschler-2006": "DOI verified against Nature repository. Confirmed cranial and pectoral girdle anatomy of holotype NUFV 108.",
      "ref-shubin-2006": "DOI verified against Nature repository. Confirmed distal endoskeletal radials and functional wrist joint homologies.",
    },
  },

  "claim-archaeopteryx-avialan-transition": {
    id: "claim-archaeopteryx-avialan-transition",
    statement:
      "Archaeopteryx lithographica represents a stem-avialan transitional grade demonstrating the co-occurrence of pennaceous aerodynamic flight feathers with non-avian theropod skeletal traits.",
    explanation:
      "Preserved in Late Jurassic (~150 MYA) Solnhofen lithographic limestone, Archaeopteryx exhibits asymmetric flight feathers and a furcula alongside non-avian theropod plesiomorphies: unfused three-fingered manual claws, a long bony tail (20+ caudal vertebrae), gastralia, and jaws lined with recurved teeth.",
    geologicalFormation: "Solnhofen Formation (Late Jurassic, Tithonian stage, ~150 MYA)",
    uncertaintyOrLimitations:
      "Debate continues over whether Archaeopteryx was capable of powered flapping flight or primarily aerodynamic gliding, based on humeral and pectoral skeletal mechanical analysis.",
    referenceExplanations: {
      "ref-foth-2014": "Plumage and pennaceous feather analysis from the 11th skeletal specimen of Archaeopteryx.",
    },
    referenceVerificationNotes: {
      "ref-foth-2014": "DOI verified against Nature. Confirmed plumage analysis of the 11th Archaeopteryx specimen.",
    },
  },

  "claim-neanderthal-human-admixture": {
    id: "claim-neanderthal-human-admixture",
    statement:
      "High-coverage whole-genome sequencing confirms 1–2% of the genetic ancestry of modern non-African human populations derives from ancient introgression and hybridization with Neanderthals.",
    explanation:
      "Comparison of Neanderthal draft and high-coverage genomes (Vindija, Altai) against diverse modern human genomes demonstrated that non-African individuals share significantly more derived alleles with Neanderthals than sub-Saharan African individuals do. This gene flow is dated to ~50,000–60,000 years ago, following the Out-of-Africa migration across western Eurasia.",
    uncertaintyOrLimitations:
      "Dating ranges depend on assumed human mutation rates (~0.5 × 10⁻⁹ per site per year) and generation times (~29 years). Subsequent back-migrations into Africa have introduced trace Neanderthal ancestry into some modern African populations.",
    referenceExplanations: {
      "ref-green-2010": "Draft whole-genome sequence of Neanderthals and discovery of archaic gene flow into modern humans.",
      "ref-prufer-2014": "High-coverage complete genome sequence of an Altai Neanderthal resolving fine-scale introgression history.",
    },
    referenceVerificationNotes: {
      "ref-green-2010": "DOI verified against AAAS Science archive. Confirmed D-statistic (ABBA-BABA) genomic tests demonstrating archaic gene flow.",
      "ref-prufer-2014": "DOI verified against Nature repository. Confirmed 52-fold coverage Denisova Cave Neanderthal genome analysis.",
    },
  },

  "claim-luca-molecular-homology": {
    id: "claim-luca-molecular-homology",
    statement:
      "Comparative phylogenomic reconstruction indicates LUCA was an anaerobic, thermophilic or mesophilic organism utilizing the universal genetic code, ribosomes, and a membrane-bound ATP synthase ~3.8–3.5 BYA.",
    explanation:
      "All known cellular life shares homologous core machinery: the same 20 canonical amino acids, stereospecific L-enantiomers, identical genetic code triplets, homologous 16S/18S and 23S/28S ribosomal RNAs, and rotary F-type/A-type ATP synthases. This universality demands descent from a common ancestral cellular population (LUCA). Phylogenomic analysis of ~6.1 million prokaryotic protein-coding genes identified 355 protein families specifically traceable to LUCA, pointing to an anaerobic, H₂-dependent, Wood-Ljungdahl metabolic pathway.",
    uncertaintyOrLimitations:
      "Extensive horizontal gene transfer (HGT) during early Archean evolution obscures whether specific metabolic genes were present in LUCA or acquired shortly thereafter by early Archaea and Bacteria. LUCA is strictly NOT the origin of life or first organism; it was preceded by earlier prebiotic and cellular lineages that left no surviving modern descendants.",
    referenceExplanations: {
      "ref-weiss-2016": "Phylogenomic identification of 355 ancestral protein families reconstructing LUCA's anaerobic autotrophic habitat.",
    },
    referenceVerificationNotes: {
      "ref-weiss-2016": "DOI verified against Nature Microbiology. Confirmed phylogenomic screen of 355 LUCA-specific ancestral protein clusters.",
    },
  },

  "claim-fuca-prebiotic-translation-candidate": {
    id: "claim-fuca-prebiotic-translation-candidate",
    statement:
      "Hypothetical models suggest that before LUCA, an earlier ancestral population (FUCA - First Universal Common Ancestor) originated the initial non-universal peptide synthesis mechanisms prior to the full establishment of the genetic code.",
    explanation:
      "Theoretical frameworks for early cellular evolution postulate FUCA as an intermediate stage between the abiotic RNA world and LUCA. Unlike LUCA, FUCA's genetic code may have been rudimentary or partially degenerate. However, empirical physical fossil traces from this era are completely unpreserved due to Hadean crustal recycling.",
    uncertaintyOrLimitations:
      "No direct fossil or undisputed biochemical trace survives from the pre-LUCA era. All models are theoretical constructs based on ribosomal evolution sequences and protein fold chronologies.",
    referenceExplanations: {
      "ref-prosdocimi-fuca-candidate": "Theoretical formulation of FUCA as the transitional ancestor preceding LUCA in deep prebiotic time.",
    },
    referenceVerificationNotes: {
      "ref-prosdocimi-fuca-candidate": "UNVERIFIED CANDIDATE: Citation and exact volume/DOI remain pending editorial verification against canonical publisher records before elevation to verified status.",
    },
  },
};

// ── BENGALI (BN-IN) ────────────────────────────────────────────
export const claimsBN: Record<string, LocalizedEvidenceClaim> = {
  "claim-homo-sapiens-jebel-irhoud": {
    id: "claim-homo-sapiens-jebel-irhoud",
    statement:
      "মরক্কোর জেবেল ইরহৌদে স্তরীভূতভাবে প্রাপ্ত করোটি ও চোয়ালের জীবাশ্ম প্রমাণ করে যে প্রায় ৩,১৫,০০০ বছর আগেই শারীরস্থানিকভাবে আধুনিক আদি হোমো সেপিয়েন্সের (Homo sapiens) উৎপত্তি ঘটেছিল।",
    explanation:
      "জেবেল ইরহৌদে প্রাপ্ত উত্তপ্ত চকচকে চকমকি পাথরের থার্মোলুমিনেসেন্স ডেটিং এবং প্রাণিজ দাঁতের এনামেলের সম্মিলিত ইলেকট্রন স্পিন রেজোন্যান্স / ইউরেনিয়াম সিরিজ পরীক্ষার মাধ্যমে বয়স প্রায় ৩১৫ ± ৩৪ হাজার বছর নির্ধারণ করা হয়। এই নমুনাগুলিতে আধুনিক চেহারার মুখের গঠন এবং আদিম দীর্ঘায়িত মস্তিষ্কের প্রকোষ্ঠের সহাবস্থান দেখা যায়, যা মানব বিবর্তনের সর্ব-আফ্রিকান বিস্তৃত প্রেক্ষাপট প্রমাণ করে।",
    geologicalFormation: "জেবেল ইরহৌদ গুহা পলল স্তর",
    uncertaintyOrLimitations:
      "কালনির্ধারণের অনিশ্চয়তার সীমা ±৩৪,০০০ বছর। জেবেল ইরহৌদের এই হোমিনিডরা একদম খাঁটি আধুনিক মানুষ নাকি আধুনিক মানব বংশধারার পূর্বসূরি রূপতাত্ত্বিক ধাপ, তা নিয়ে বিতর্ক চলমান।",
    referenceExplanations: {
      "ref-hublin-2017": "জেবেল ইরহৌদে প্রাপ্ত নতুন জীবাশ্ম এবং হোমো সেপিয়েন্সের সর্ব-আফ্রিকান উৎপত্তি সংক্রান্ত গবেষণা।",
      "ref-richter-2017": "জেবেল ইরহৌদের জীবাশ্মের কালনির্ধারণ ও মধ্য প্রস্তর যুগের সূচনা সংক্রান্ত থার্মোলুমিনেসেন্স গবেষণা।",
    },
    referenceVerificationNotes: {
      "ref-hublin-2017": "নেচার (Nature) ডিজিটাল ভাণ্ডার থেকে DOI যাচাইকৃত। স্তরীভূত থার্মোলুমিনেসেন্স এবং করোটির রূপতাত্ত্বিক বিশ্লেষণ নিশ্চিত।",
      "ref-richter-2017": "নেচার (Nature) ডিজিটাল ভাণ্ডার থেকে DOI যাচাইকৃত। উত্তপ্ত পাথরের উপর থার্মোলুমিনেসেন্স কালনির্ধারণ পদ্ধতি নিশ্চিত।",
    },
  },

  "claim-dickinsonia-biomarker-steranes": {
    id: "claim-dickinsonia-biomarker-steranes",
    statement:
      "এডিয়াকারান ডিকিনসোনিয়া (Dickinsonia) জীবাশ্ম থেকে নিষ্কাশিত জৈব অণু (কোলেস্টেরয়েড স্টেরেন) নিশ্চিতভাবে প্রমাণ করে যে এটি একটি বহুকোষী প্রাণী ছিল।",
    explanation:
      "রাশিয়ার শ্বেত সাগর অঞ্চলের ডিকিনসোনিয়া কস্টাটা (Dickinsonia costata) জীবাশ্মের জৈব ভূ-রাসায়নিক বিশ্লেষণে বিপুল পরিমাণ কোলেস্টেরয়েড (মোট স্টেরেনের প্রায় ৯৩%) পাওয়া গেছে এবং ছত্রাকজাত আর্গোস্টেরেনের স্পষ্ট অনুপস্থিতি ধরা পড়েছে। এই ভূ-রাসায়নিক স্বাক্ষর বহুকোষী প্রাণীর (Metazoa) অনন্য বৈশিষ্ট্য, যা এটিকে দৈত্যাকার ছত্রাক, লাইকেন বা প্রটিস্ট হওয়ার সম্ভাবনা বাতিল করে।",
    geologicalFormation: "উস্ত-পিনেগা গঠন (এডিয়াকারান যুগ, ~৫৫ কোটি ৮০ লাখ বছর আগে)",
    uncertaintyOrLimitations:
      "জৈব অণুর টিকে থাকার জন্য বিশেষ জীবাশ্মভবন পরিবেশের প্রয়োজন হয়, যেখানে কাদার স্তরের মাঝে জৈব ঝিল্লি সিল হয়ে থাকে। তাই কেবল সংরক্ষিত ব্যতিক্রমী জীবাশ্মক্ষেত্রেই এটি প্রমাণ করা সম্ভব।",
    referenceExplanations: {
      "ref-bobrovskiy-2018": "প্রাচীন স্টেরয়েড গবেষণার মাধ্যমে ডিকিনসোনিয়াকে পৃথিবীর অন্যতম প্রাচীন বহুকোষী প্রাণী হিসেবে প্রতিষ্ঠা।",
    },
    referenceVerificationNotes: {
      "ref-bobrovskiy-2018": "সায়েন্স (Science/AAAS) আর্কাইভ থেকে DOI যাচাইকৃত। কোলেস্টেরল স্টেরেন প্রোফাইলের GC-MS গ্যাস ক্রোমাটোগ্রাফি ডেটা নিশ্চিত।",
    },
  },

  "claim-tiktaalik-transitional-tetrapod": {
    id: "claim-tiktaalik-transitional-tetrapod",
    statement:
      "টিকটালিক রোজে (Tiktaalik roseae) মাংসল-পাখনাযুক্ত মাছ এবং আদি চতুষ্পদীদের (Tetrapods) মধ্যবর্তী রূপান্তরকারী কঙ্কাল বৈশিষ্ট্য বহন করে, যার মধ্যে রয়েছে কব্জির সন্ধি, নড়নক্ষম ঘাড় এবং পার্শ্বীয় পাঁজর।",
    explanation:
      "কানাডার নুনাভুট অঞ্চলের এলসমেয়ার দ্বীপে লেট ডেভোনিয়ান পলল স্তর (~৩৭ কোটি ৫০ লাখ বছর আগে) থেকে আবিষ্কৃত টিকটালিকে মাছের আঁইশ ও পাখনার রশ্মির পাশাপাশি চতুষ্পদ প্রাণীর মতো চ্যাপ্টা মাথা, আলাদা ঘাড়ের সন্ধি এবং কব্জি ও অগ্রপদের অনুরূপ কঙ্কাল উপাদান বিদ্যমান।",
    geologicalFormation: "ফ্র্যাম গঠন (লেট ডেভোনিয়ান, ফ্রাসনিয়ান পর্যায়, ~৩৭ কোটি ৫০ লাখ বছর আগে)",
    uncertaintyOrLimitations:
      "শারীরস্থানিকভাবে এটি রূপান্তরকারী ধাপ হলেও, পোল্যান্ডে প্রাপ্ত আরও প্রাচীন পদচিহ্ন (~৩৯ কোটি বছর আগে) ইঙ্গিত করে যে স্থলচর চতুষ্পদীদের উৎপত্তি হয়তো আরও আগে ঘটেছিল।",
    referenceExplanations: {
      "ref-daeschler-2006": "ডেভোনিয়ান যুগের চতুষ্পদী সদৃশ মাছ এবং চতুষ্পদীদের শারীরিক গঠনের বিবর্তন সংক্রান্ত গবেষণা।",
      "ref-shubin-2006": "টিকটালিক রোজের বক্ষপাখনা এবং চতুষ্পদী অঙ্গপ্রত্যঙ্গের উৎস সংক্রান্ত গবেষণা।",
    },
    referenceVerificationNotes: {
      "ref-daeschler-2006": "নেচার (Nature) ভাণ্ডার থেকে DOI যাচাইকৃত। হলোটাইপ NUFV 108-এর করোটি ও পেক্টোরাল কঙ্কাল শারীরস্থান নিশ্চিত।",
      "ref-shubin-2006": "নেচার (Nature) ভাণ্ডার থেকে DOI যাচাইকৃত। দূরবর্তী রেডিয়াল অস্থি ও কার্যকর কব্জির সন্ধির সমসংস্থতা নিশ্চিত।",
    },
  },

  "claim-archaeopteryx-avialan-transition": {
    id: "claim-archaeopteryx-avialan-transition",
    statement:
      "আর্কিওপ্টেরিক্স লিথোগ্রাফিকা (Archaeopteryx lithographica) পক্ষীকূলের আদি রূপান্তরকারী ধাপ নির্দেশ করে, যেখানে অ-পক্ষী থেরোপড ডাইনোসরের কঙ্কালের সাথে উড্ডয়নক্ষম পালকের সহাবস্থান দেখা যায়।",
    explanation:
      "জার্মানির সোলেনহোফেন চুনাপাথরে (~১৫ কোটি বছর আগে) সংরক্ষিত এই জীবাশ্মে অপ্রতিসম উড্ডয়ন পালক এবং ফারকুলা (উইশবোন) রয়েছে, যার সাথে রয়েছে ডাইনোসরের দাঁতযুক্ত চোয়াল, নখরযুক্ত তিনটি আঙুল এবং দীর্ঘ অস্থিময় লেজ।",
    geologicalFormation: "সোলেনহোফেন চুনাপাথর গঠন (লেট জুরাসিক, টিথোনিয়ান পর্যায়, ~১৫ কোটি বছর আগে)",
    uncertaintyOrLimitations:
      "আর্কিওপ্টেরিক্স পেশিচালিত ডানার সাহায্যে পূর্ণাঙ্গ উড়তে পারত নাকি মূলত বাতাসে ভেসে গ্লাইডিং করত, তা নিয়ে কঙ্কালের যান্ত্রিক বিশ্লেষণে বিতর্ক বিদ্যমান।",
    referenceExplanations: {
      "ref-foth-2014": "আর্কিওপ্টেরিক্সের ১১তম নমুনায় উড্ডয়ন পালকের বিন্যাস ও বিবর্তনীয় বিশ্লেষণ।",
    },
    referenceVerificationNotes: {
      "ref-foth-2014": "নেচার (Nature) জার্নাল থেকে DOI যাচাইকৃত। ১১তম আর্কিওপ্টেরিক্স নমুনার পালকের বিশ্লেষণ নিশ্চিত।",
    },
  },

  "claim-neanderthal-human-admixture": {
    id: "claim-neanderthal-human-admixture",
    statement:
      "উচ্চ-কভারেজ সম্পূর্ণ জিনোম সিকোয়েন্সিং নিশ্চিত করে যে বর্তমান অ-আফ্রিকান মানব জনসংখ্যার জিনোমের প্রায় ১-২% প্রাচীন নিয়ানডার্থালদের সাথে সংকরায়নের মাধ্যমে এসেছে।",
    explanation:
      "আলতাই ও ভিন্দিজা গুহায় প্রাপ্ত নিয়ানডার্থাল জিনোমের সাথে আধুনিক মানুষের জিনোম তুলনা করে দেখা গেছে যে অ-আফ্রিকানদের মধ্যে নিয়ানডার্থালদের অ্যালিলের স্পষ্ট উপস্থিতি রয়েছে। এই জিন প্রবাহ প্রায় ৫০,০০০ থেকে ৬০,০০০ বছর আগে ইউরেশিয়ায় ঘটেছিল।",
    uncertaintyOrLimitations:
      "কালনির্ধারণের ব্যাপ্তি মানব জিনগত মিউটেশন হারের অনুমানের উপর নির্ভরশীল। পরবর্তীতে আফ্রিকায় অভিবাসনের ফলে কিছু আধুনিক আফ্রিকান জনগোষ্ঠীর মধ্যেও স্বল্পমাত্রার নিয়ানডার্থাল জিন অনুপ্রবেশ করেছে।",
    referenceExplanations: {
      "ref-green-2010": "নিয়ানডার্থাল জিনোমের খসড়া সিকোয়েন্স এবং আধুনিক মানুষের মধ্যে জিন প্রবাহের প্রমাণ।",
      "ref-prufer-2014": "আলতাই পর্বতের নিয়ানডার্থালের উচ্চ-কভারেজ জিনোম সিকোয়েন্স এবং প্রাচীন সংকরায়নের ইতিহাস।",
    },
    referenceVerificationNotes: {
      "ref-green-2010": "সায়েন্স (Science/AAAS) আর্কাইভ থেকে DOI যাচাইকৃত। D-পরিসংখ্যান (ABBA-BABA) জিনোমিক পরীক্ষা নিশ্চিত।",
      "ref-prufer-2014": "নেচার (Nature) ভাণ্ডার থেকে DOI যাচাইকৃত। ৫২-গুণ কভারেজের ডেনিসোভা গুহার নিয়ানডার্থাল জিনোম বিশ্লেষণ নিশ্চিত।",
    },
  },

  "claim-luca-molecular-homology": {
    id: "claim-luca-molecular-homology",
    statement:
      "তুলনামূলক ফাইলোজেনোমিক পুনর্গঠন ইঙ্গিত করে যে লুকা (LUCA) ছিল একটি অবাত (অ্যানেরোবিক) অণুজীব, যা সার্বজনীন জেনেটিক কোড, রাইবোজোম এবং মেমব্রেন-সংযুক্ত ATP সিন্থেস ব্যবহার করত (~৩৮০-৩৫০ কোটি বছর আগে)।",
    explanation:
      "পৃথিবীর সমস্ত পরিচিত কোষীয় জীব একই সার্বজনীন ২০টি অ্যামিনো অ্যাসিড, জেনেটিক কোড ট্রিপলেট, ১৬S/১৮S রাইবোজোমাল RNA এবং F-টাইপ ATP সিন্থেস ব্যবহার করে। প্রায় ৬১ লাখ প্রোক্যারিয়োটিক প্রোটিন জিন বিশ্লেষণের মাধ্যমে লুকার সাথে সরাসরি সম্পর্কিত ৩৫৫টি প্রোটিন পরিবার চিহ্নিত করা হয়েছে, যা নির্দেশ করে যে এটি হাইড্রোজেন-নির্ভর উড-লাংডাহল বিপাকীয় পথ ব্যবহার করত।",
    uncertaintyOrLimitations:
      "আর্কিয়ান যুগে ব্যাপক পার্শ্বীয় জিন স্থানান্তর (HGT)-এর কারণে নির্দিষ্ট বিপাকীয় জিনগুলো লুকায় উপস্থিত ছিল নাকি পরবর্তীতে যুক্ত হয়েছিল, তা নিয়ে অনিশ্চয়তা রয়েছে। লুকা জীবনের উৎপত্তি নয়; এর আগেও বহু রূপ ছিল যা বিলুপ্ত হয়েছে।",
    referenceExplanations: {
      "ref-weiss-2016": "৩৫৫টি পূর্বপুরুষ প্রোটিন ক্লাস্টার বিশ্লেষণের মাধ্যমে লুকার শারীরতত্ত্ব ও বাসস্থানের ফাইলোজেনোমিক পুনর্গঠন।",
    },
    referenceVerificationNotes: {
      "ref-weiss-2016": "নেচার মাইক্রোবায়োলজি থেকে DOI যাচাইকৃত। ৩৫৫টি লুকা-নির্দিষ্ট আদি প্রোটিন পরিবারের ফাইলোজেনোমিক স্ক্রিন নিশ্চিত।",
    },
  },

  "claim-fuca-prebiotic-translation-candidate": {
    id: "claim-fuca-prebiotic-translation-candidate",
    statement:
      "তাত্ত্বিক কাঠামো অনুসারে লুকার পূর্বে একটি প্রাচীন আদি জনগোষ্ঠী (ফুকা - FUCA) জেনেটিক কোড সম্পূর্ণ প্রতিষ্ঠিত হওয়ার আগে প্রাথমিক অ-সার্বজনীন পেপটাইড সংশ্লেষণ প্রক্রিয়ার সূচনা করেছিল।",
    explanation:
      "কোষীয় বিবর্তনের তাত্ত্বিক কাঠামোতে ফুকা-কে অজৈব আরএনএ বিশ্ব এবং লুকার মধ্যবর্তী রূপ হিসেবে বিবেচনা করা হয়। হেডিয়ান যুগে টেকটনিক পাত ও শিলা পরিবর্তনের কারণে এই যুগের কোনো প্রত্যক্ষ জীবাশ্ম সংরক্ষিত নেই।",
    uncertaintyOrLimitations:
      "প্রাক-লুকা যুগের কোনো প্রত্যক্ষ জীবাশ্ম বা অবিকৃত জৈব রাসায়নিক প্রমাণ অবশিষ্ট নেই। সমস্ত মডেল রাইবোজোমের বিবর্তন ও প্রোটিন ভাঁজের কালানুক্রমের উপর ভিত্তি করে তৈরি তাত্ত্বিক ধারণা।",
    referenceExplanations: {
      "ref-prosdocimi-fuca-candidate": "সুদূর প্রিবায়োটিক কালে লুকার আদি পূর্বসূরি হিসেবে ফুকার তাত্ত্বিক রূপরেখা।",
    },
    referenceVerificationNotes: {
      "ref-prosdocimi-fuca-candidate": "অযাচাইকৃত প্রার্থী নথি: প্রকাশকের ক্যানোনিকাল রেকর্ডের বিপরীতে পূর্ণাঙ্গ সম্পাদকীয় নিরীক্ষা অপেক্ষমাণ।",
    },
  },
};

// ── HINDI (HI-IN) ──────────────────────────────────────────────
export const claimsHI: Record<string, LocalizedEvidenceClaim> = {
  "claim-homo-sapiens-jebel-irhoud": {
    id: "claim-homo-sapiens-jebel-irhoud",
    statement:
      "मोरक्को के जेबेल इरहौद से स्तरित रूप से प्राप्त कपाल और जबड़े के जीवाश्म लगभग ३,१५,००० वर्ष पूर्व शारीरिक रूप से आधुनिक प्रारंभिक होमो सेपियन्स (Homo sapiens) के उद्भव की पुष्टि करते हैं।",
    explanation:
      "जेबेल इरहौद में तप्त चकमक पत्थरों की थर्मोल्यूमिनेसेंस डेटिंग और दंत इनेमल की इलेक्ट्रॉन स्पिन रेजोनेंस / यू-सीरीज डेटिंग से लगभग ३१५ ± ३४ हजार वर्ष की आयु सिद्ध हुई। इन नमूनों में आधुनिक चेहरे की संरचना के साथ लंबी आदिम कपाल गुहा पाई गई है, जो आधुनिक मानव के अखिल अफ्रीकी विकास को दर्शाती है।",
    geologicalFormation: "जेबेल इरहौद गुफा निक्षेप",
    uncertaintyOrLimitations:
      "कालनिर्धारण अनिश्चितता सीमा ±३४,००० वर्ष है। इस बात पर बहस जारी है कि क्या ये होमिनिन पूर्ण आधुनिक मानव हैं या आधुनिक मानव विकास रेखा के निकटवर्ती पूर्वज रूप हैं।",
    referenceExplanations: {
      "ref-hublin-2017": "जेबेल इरहौद से नए जीवाश्म और होमो सेपियन्स की अखिल अफ्रीकी उत्पत्ति पर शोध।",
      "ref-richter-2017": "थर्मोल्यूमिनेसेंस डेटिंग द्वारा जेबेल इरहौद जीवाश्मों और मध्य पाषाण काल की कालसीमा।",
    },
    referenceVerificationNotes: {
      "ref-hublin-2017": "नेचर (Nature) से DOI सत्यापित। स्तरित थर्मोल्यूमिनेसेंस एवं कपाल रूपरेखा विश्लेषण पुष्ट।",
      "ref-richter-2017": "नेचर (Nature) से DOI सत्यापित। तप्त चकमक पत्थरों पर थर्मोल्यूमिनेसेंस पद्धति पुष्ट।",
    },
  },

  "claim-dickinsonia-biomarker-steranes": {
    id: "claim-dickinsonia-biomarker-steranes",
    statement:
      "एडियाकरन डिकिनसोनिया (Dickinsonia) नमूनों से प्राप्त जीवाश्मीकृत जैविक अणु (कोलेस्टेरॉइड स्टेरेन) निश्चित रूप से इसे एक बहुकोशिकीय जंतु सिद्ध करते हैं।",
    explanation:
      "रूस के श्वेत सागर क्षेत्र से प्राप्त डिकिनसोनिया जीवाश्मों के भू-रासायनिक विश्लेषण में प्रचुर मात्रा में कोलेस्टेरॉइड (कुल स्टेरेन का ९३% तक) पाए गए और अर्गोस्टेरोल अनुपस्थित मिला। यह हस्ताक्षर केवल बहुकोशिकीय जंतुओं (Metazoa) में पाया जाता है और कवक या लाइकेन होने की संभावना को खारिज करता है।",
    geologicalFormation: "उस्त-पिेनेगा संरचना (एडियाकरन काल, ~५५.८ करोड़ वर्ष पूर्व)",
    uncertaintyOrLimitations:
      "बायोमार्कर संरक्षण के लिए असाधारण जीवाश्मीकरण परिस्थितियों की आवश्यकता होती है, जिससे सत्यापन योग्य नमूने केवल विशेष लेगरस्टैटन क्षेत्रों तक सीमित हैं।",
    referenceExplanations: {
      "ref-bobrovskiy-2018": "प्राचीन स्टेरॉयड द्वारा डिकिनसोनिया को प्रारंभिक बहुकोशिकीय जंतु के रूप में स्थापित करने वाला शोध।",
    },
    referenceVerificationNotes: {
      "ref-bobrovskiy-2018": "साइंस (Science/AAAS) से DOI सत्यापित। कोलेस्ट्रॉल स्टेरेन प्रोफाइल का GC-MS डेटा पुष्ट।",
    },
  },

  "claim-tiktaalik-transitional-tetrapod": {
    id: "claim-tiktaalik-transitional-tetrapod",
    statement:
      "टिकटालिक रोसी (Tiktaalik roseae) मांसल-पंख वाली मछलियों और प्रारंभिक चौपायों (Tetrapods) के बीच मध्यवर्ती कंकाल अनुकूलन प्रदर्शित करता है, जिसमें कलाई के जोड़ और गतिशील गर्दन शामिल हैं।",
    explanation:
      "कनाडा के नुनावुत स्थित एलेस्मेरे द्वीप से प्राप्त लेट डेवोनियन तलछट (~३७.५ करोड़ वर्ष पूर्व) में टिकटालिक मछली जैसे शल्क और पंखों के साथ चपटी खोपड़ी, गर्दन का जोड़ और कलाई के प्रारंभिक कंकाल तत्व प्रदर्शित करता है।",
    geologicalFormation: "फ्राम संरचना (उत्तर डेवोनियन काल, ~३७.५ करोड़ वर्ष पूर्व)",
    uncertaintyOrLimitations:
      "यद्यपि यह एक शारीरिक संक्रमणकालीन रूप है, पोलैंड में मिले पुराने पदचिह्न (~३९ करोड़ वर्ष पूर्व) संकेत देते हैं कि चौपायों का उद्भव और पूर्व में हुआ हो सकता है।",
    referenceExplanations: {
      "ref-daeschler-2006": "डेवोनियन चौपाया-समान मछली और चौपाया शारीरिक संरचना का विकास।",
      "ref-shubin-2006": "टिकटालिक रोसी के अंस-पंख और स्थलीय चौपायों के अंगों की उत्पत्ति।",
    },
    referenceVerificationNotes: {
      "ref-daeschler-2006": "नेचर (Nature) से DOI सत्यापित। होलोटाइप NUFV 108 का कपाल और अंस-मेखला शरीर रचना विज्ञान पुष्ट।",
      "ref-shubin-2006": "नेचर (Nature) से DOI सत्यापित। कलाई के जोड़ों और रेडियल हड्डियों की समरूपता पुष्ट।",
    },
  },

  "claim-archaeopteryx-avialan-transition": {
    id: "claim-archaeopteryx-avialan-transition",
    statement:
      "आर्कियोप्टेरिक्स लिथोग्राफिका (Archaeopteryx lithographica) पक्षियों और गैर-पक्षी थेरोपोड डायनासोर के बीच संक्रमणकालीन कड़ी है, जिसमें उड़ने योग्य पंखों के साथ डायनासोर के कंकाल लक्षण मौजूद हैं।",
    explanation:
      "जर्मनी के सोलनहोफेन चूना पत्थर (~१५ करोड़ वर्ष पूर्व) में संरक्षित आर्कियोप्टेरिक्स में विषम पंख और विशबोन के साथ-साथ दांतदार जबड़े, पंजे और लंबी अस्थिमय पूंछ पाई जाती है।",
    geologicalFormation: "सोलनहोफेन चूना पत्थर संरचना (उत्तर जुरासिक, ~१५ करोड़ वर्ष पूर्व)",
    uncertaintyOrLimitations:
      "इस पर वैज्ञानिक बहस जारी है कि क्या यह सक्रिय पंख फड़फड़ाने वाली उड़ान में सक्षम था या मुख्य रूप से ग्लाइडिंग करता था।",
    referenceExplanations: {
      "ref-foth-2014": "आर्कियोप्टेरिक्स के ११वें नमूने से पंखों के विकास पर अंतर्दृष्टि।",
    },
    referenceVerificationNotes: {
      "ref-foth-2014": "नेचर (Nature) से DOI सत्यापित। ११वें नमूने के पंखों का विश्लेषण पुष्ट।",
    },
  },

  "claim-neanderthal-human-admixture": {
    id: "claim-neanderthal-human-admixture",
    statement:
      "उच्च-कवरेज संपूर्ण जीनोम अनुक्रमण पुष्टि करता है कि आधुनिक गैर-अफ्रीकी मानव आबादी के जीनोम का १–२% प्राचीन निएंडरथल संकरण से प्राप्त हुआ है।",
    explanation:
      "अल्ताई और विंदिजा निएंडरथल जीनोम की तुलना आधुनिक मानव जीनोम से करने पर स्पष्ट हुआ कि गैर-अफ्रीकी लोगों में निएंडरथल एलील अधिक मात्रा में साझा होते हैं। यह जीन प्रवाह लगभग ५०,०००–६०,००० वर्ष पूर्व यूरेशिया में हुआ था।",
    uncertaintyOrLimitations:
      "कालनिर्धारण मानव उत्परिवर्तन दर के अनुमानों पर निर्भर करता है। बाद में अफ्रीका में हुए प्रवास से कुछ आधुनिक अफ्रीकी समूहों में भी अल्प मात्रा में निएंडरथल डीएनए पहुंचा है।",
    referenceExplanations: {
      "ref-green-2010": "निएंडरथल जीनोम का मसौदा अनुक्रम और आधुनिक मानव में प्राचीन जीन प्रवाह की खोज।",
      "ref-prufer-2014": "अल्ताई निएंडरथल का उच्च-कवरेज संपूर्ण जीनोम अनुक्रम।",
    },
    referenceVerificationNotes: {
      "ref-green-2010": "साइंस (Science/AAAS) से DOI सत्यापित। D-सांख्यिकी (ABBA-BABA) जीनोमिक परीक्षण पुष्ट।",
      "ref-prufer-2014": "नेचर (Nature) से DOI सत्यापित। डेनिसोवा गुफा निएंडरथल जीनोम का ५२-गुना कवरेज पुष्ट।",
    },
  },

  "claim-luca-molecular-homology": {
    id: "claim-luca-molecular-homology",
    statement:
      "तुलनात्मक फाइलोजेनोमिक पुनर्निर्माण दर्शाता है कि लूका (LUCA) एक अवायवीय जीव था, जो सार्वभौमिक आनुवंशिक कोड, राइबोसोम और झिल्ली-बद्ध ATP सिंथेस का उपयोग करता था (~३.८–३.५ अरब वर्ष पूर्व)।",
    explanation:
      "पृथ्वी का समस्त ज्ञात कोशिकीय जीवन एक समान २० अमीनो एसिड, जेनेटिक कोड और F-प्रकार के ATP सिंथेस साझा करता है। लगभग ६१ लाख प्रोकैरियोटिक जीनों के विश्लेषण से लूका से जुड़े ३५५ पैतृक प्रोटीन परिवार पहचाने गए हैं, जो हाइड्रोजन-निर्भर वुड-जुंगडाहल चयापचय पथ की ओर संकेत करते हैं।",
    uncertaintyOrLimitations:
      "आर्कियन काल में क्षैतिज जीन स्थानांतरण (HGT) के कारण यह स्पष्ट करना कठिन है कि विशिष्ट जीन लूका में थे या बाद में प्राप्त हुए। लूका जीवन की पहली शुरुआत नहीं था; उससे पहले भी आदिम रूप मौजूद थे।",
    referenceExplanations: {
      "ref-weiss-2016": "३५५ पैतृक प्रोटीन समूहों द्वारा लूका के चयापचय और आवास का फाइलोजेनोमिक विश्लेषण।",
    },
    referenceVerificationNotes: {
      "ref-weiss-2016": "नेचर माइक्रोबायोलॉजी से DOI सत्यापित। ३५५ लूका-विशिष्ट पैतृक प्रोटीन क्लस्टर का विश्लेषण पुष्ट।",
    },
  },

  "claim-fuca-prebiotic-translation-candidate": {
    id: "claim-fuca-prebiotic-translation-candidate",
    statement:
      "सैद्धांतिक मॉडल सुझाते हैं कि लूका से पूर्व एक प्रारंभिक आबादी (फूका - FUCA) ने आनुवंशिक कोड के पूर्ण विकास से पहले गैर-सार्वभौमिक पेप्टाइड संश्लेषण की शुरुआत की थी।",
    explanation:
      "कोशिकीय विकास के सैद्धांतिक ढांचे में फूका को अजैविक आरएनए दुनिया और लूका के बीच का मध्यवर्ती चरण माना जाता है। हेडियन काल के चट्टानी पुनर्चक्रण के कारण इस काल का कोई प्रत्यक्ष जीवाश्म संरक्षित नहीं है।",
    uncertaintyOrLimitations:
      "प्री-लूका काल का कोई प्रत्यक्ष जीवाश्म या रासायनिक साक्ष्य शेष नहीं है। सभी मॉडल राइबोसोम और प्रोटीन संरचनाओं के आधार पर बने सैद्धांतिक अनुमान हैं।",
    referenceExplanations: {
      "ref-prosdocimi-fuca-candidate": "गहन प्रीबायोटिक काल में लूका के पूर्वज के रूप में फूका का सैद्धांतिक ढांचा।",
    },
    referenceVerificationNotes: {
      "ref-prosdocimi-fuca-candidate": "असत्यापित उम्मीदवार रिकॉर्ड: प्रकाशक के आधिकारिक रिकॉर्ड से पूर्ण संपादकीय सत्यापन लंबित है।",
    },
  },
};

// ── SPANISH (ES) ───────────────────────────────────────────────
export const claimsES: Record<string, LocalizedEvidenceClaim> = {
  "claim-homo-sapiens-jebel-irhoud": {
    id: "claim-homo-sapiens-jebel-irhoud",
    statement:
      "Los restos fósiles craneales y mandibulares estratigráficamente datados de Jebel Irhoud, Marruecos, establecen el surgimiento de Homo sapiens anatómicamente moderno temprano hace aproximadamente 315.000 años.",
    explanation:
      "La datación por termoluminiscencia de sílex calentados y la resonancia de espín electrónico en esmalte dental en Jebel Irhoud demostraron una antigüedad de ~315 ± 34 ka. Los especímenes presentan una morfología facial moderna junto con una caja craneal alargada y arcaica, lo que demuestra una fase temprana de evolución panafricana de los humanos modernos.",
    geologicalFormation: "Depósitos de la Cueva de Jebel Irhoud",
    uncertaintyOrLimitations:
      "El margen de incertidumbre en la datación es de ±34.000 años. Continúan los debates sobre si representan humanos anatómicamente modernos sensu stricto o un morfotipo ancestral inmediato en el linaje humano moderno.",
    referenceExplanations: {
      "ref-hublin-2017": "Nuevos fósiles de Jebel Irhoud, Marruecos, y el origen panafricano de Homo sapiens.",
      "ref-richter-2017": "Edad de los fósiles de Jebel Irhoud y los orígenes de la Edad de Piedra Media mediante termoluminiscencia.",
    },
    referenceVerificationNotes: {
      "ref-hublin-2017": "DOI verificado en el repositorio de Nature. Análisis estratigráfico y morfológico craneal confirmado.",
      "ref-richter-2017": "DOI verificado en el repositorio de Nature. Metodología de datación por termoluminiscencia en sílex confirmada.",
    },
  },

  "claim-dickinsonia-biomarker-steranes": {
    id: "claim-dickinsonia-biomarker-steranes",
    statement:
      "Las moléculas orgánicas fosilizadas (esteranos colesteroides) extraídas de especímenes de Dickinsonia del Ediacárico confirman definitivamente su afinidad biológica como animal multicelular macroscópico.",
    explanation:
      "La extracción geoquímica orgánica de biomarcadores de hidrocarburos en fósiles de Dickinsonia costata del Mar Blanco (Rusia) reveló abundantes colesteroides (hasta el 93% de los esteranos totales) y una marcada ausencia de ergosteroides. Esta firma geoquímica es característica de los metazoos (animales) y descarta clasificaciones alternativas como hongos gigantes o líquenes.",
    geologicalFormation: "Formación Ust-Pinega (Ediacárico, ~558 Ma)",
    uncertaintyOrLimitations:
      "La preservación de biomarcadores requiere condiciones tafonómicas excepcionales donde las películas orgánicas quedan selladas entre láminas de arcilla, lo que restringe el alcance geográfico a yacimientos tipo Konservat-Lagerstätten.",
    referenceExplanations: {
      "ref-bobrovskiy-2018": "Esteroides antiguos confirman que el fósil ediacárico Dickinsonia es uno de los primeros animales de la Tierra.",
    },
    referenceVerificationNotes: {
      "ref-bobrovskiy-2018": "DOI verificado en el archivo de Science/AAAS. Datos de cromatografía de gases-espectrometría de masas (GC-MS) confirmados.",
    },
  },

  "claim-tiktaalik-transitional-tetrapod": {
    id: "claim-tiktaalik-transitional-tetrapod",
    statement:
      "Tiktaalik roseae presenta adaptaciones esqueléticas intermedias entre los peces sarcopterigios de aletas lobuladas y los primeros tetrápodos, incluidas articulaciones de muñeca funcionales y cuello móvil.",
    explanation:
      "Recuperado de sedimentos fluviales del Devónico Tardío (~375 Ma) en la isla de Ellesmere, Canadá, Tiktaalik posee escamas y radios de aleta pisciformes junto con rasgos derivados de tetrápodo: cráneo aplanado dorsoventralmente, cuello articulado y huesos homólogos al húmero, radio, cúbito y elementos de la muñeca de tetrápodos.",
    geologicalFormation: "Formación Fram (Devónico Tardío, Frasniense, ~375 Ma)",
    uncertaintyOrLimitations:
      "Aunque es un grado de transición anatómico, huellas fósiles más antiguas (p. ej., huellas de Zachełmie, Polonia, ~390 Ma) indican que la divergencia de los tetrápodos basales podría ser anterior al depósito de la Formación Fram.",
    referenceExplanations: {
      "ref-daeschler-2006": "Un pez similar a tetrápodo del Devónico y la evolución del plan corporal de los tetrápodos.",
      "ref-shubin-2006": "La aleta pectoral de Tiktaalik roseae y el origen de las extremidades de los tetrápodos.",
    },
    referenceVerificationNotes: {
      "ref-daeschler-2006": "DOI verificado en Nature. Anatomía craneal y cintura pectoral del holotipo NUFV 108 confirmadas.",
      "ref-shubin-2006": "DOI verificado en Nature. Homologías de radiales endoesqueléticos y articulación funcional de muñeca confirmadas.",
    },
  },

  "claim-archaeopteryx-avialan-transition": {
    id: "claim-archaeopteryx-avialan-transition",
    statement:
      "Archaeopteryx lithographica representa un grado de transición que demuestra la coexistencia de plumas de vuelo aerodinámicas con rasgos esqueléticos de dinosaurios terópodos no aviares.",
    explanation:
      "Preservado en la caliza litográfica de Solnhofen del Jurásico Tardío (~150 Ma), Archaeopteryx exhibe plumas de vuelo asimétricas y fúrcula junto con plesiomorfías terópodas: garras manuales de tres dedos no fusionadas, mandíbulas dentadas y una larga cola ósea.",
    geologicalFormation: "Formación Solnhofen (Jurásico Tardío, Titoniense, ~150 Ma)",
    uncertaintyOrLimitations:
      "Continúa el debate sobre si Archaeopteryx era capaz de un vuelo propulsado por aleteo o principalmente planeo aerodinámico, según el análisis mecánico esquelético pectoral.",
    referenceExplanations: {
      "ref-foth-2014": "Nuevo espécimen de Archaeopteryx aporta información clave sobre la evolución de las plumas de vuelo.",
    },
    referenceVerificationNotes: {
      "ref-foth-2014": "DOI verificado en Nature. Análisis del plumaje del undécimo espécimen confirmado.",
    },
  },

  "claim-neanderthal-human-admixture": {
    id: "claim-neanderthal-human-admixture",
    statement:
      "La secuenciación del genoma completo confirma que entre el 1% y el 2% de la ascendencia genética de las poblaciones humanas no africanas modernas proviene de la introgresión e hibridación antigua con neandertales.",
    explanation:
      "La comparación de genomas neandertales (Vindija, Altai) con genomas humanos modernos demostró que los individuos no africanos comparten significativamente más alelos derivados con los neandertales. Este flujo génico se data en hace ~50.000–60.000 años tras la migración fuera de África.",
    uncertaintyOrLimitations:
      "Los rangos temporales dependen de las tasas de mutación humana asumidas. Migraciones posteriores de retorno a África introdujeron trazas de ascendencia neandertal en algunas poblaciones africanas modernas.",
    referenceExplanations: {
      "ref-green-2010": "Secuencia preliminar del genoma neandertal y evidencia de flujo génico hacia los humanos modernos.",
      "ref-prufer-2014": "Secuencia completa de alta cobertura del genoma de un neandertal de las montañas de Altai.",
    },
    referenceVerificationNotes: {
      "ref-green-2010": "DOI verificado en Science/AAAS. Pruebas estadísticas genómicas D (ABBA-BABA) confirmadas.",
      "ref-prufer-2014": "DOI verificado en Nature. Análisis de genoma neandertal de la cueva de Denisova con cobertura 52x confirmado.",
    },
  },

  "claim-luca-molecular-homology": {
    id: "claim-luca-molecular-homology",
    statement:
      "La reconstrucción filogenómica comparativa indica que LUCA era un organismo anaeróbico que utilizaba el código genético universal, ribosomas y una ATP sintasa de membrana hace ~3.800–3.500 Ma.",
    explanation:
      "Toda la vida celular conocida comparte la misma maquinaria central: 20 aminoácidos estándar, código genético universal y ATP sintasas homólogas. El análisis filogenómico de ~6,1 millones de genes procariotas identificó 355 familias de proteínas atribuibles a LUCA, lo que sugiere una vía metabólica de Wood-Ljungdahl dependiente de H₂.",
    uncertaintyOrLimitations:
      "La amplia transferencia horizontal de genes (HGT) en el Arcaico temprano dificulta discernir si genes específicos estaban en LUCA o se adquirieron poco después. LUCA no es el origen de la vida; estuvo precedido por linajes prebióticos previos.",
    referenceExplanations: {
      "ref-weiss-2016": "Fisiología y hábitat del último ancestro común universal basados en 355 grupos de proteínas ancestrales.",
    },
    referenceVerificationNotes: {
      "ref-weiss-2016": "DOI verificado en Nature Microbiology. Confirmado el análisis filogenómico de 355 grupos de proteínas específicas de LUCA.",
    },
  },

  "claim-fuca-prebiotic-translation-candidate": {
    id: "claim-fuca-prebiotic-translation-candidate",
    statement:
      "Los modelos hipotéticos sugieren que antes de LUCA, una población ancestral previa (FUCA) originó los primeros mecanismos de síntesis de péptidos antes de la consolidación total del código genético.",
    explanation:
      "Los marcos teóricos de la evolución celular temprana postulan a FUCA como una etapa intermedia entre el mundo de ARN y LUCA. No se conservan restos fósiles directos de esta época debido al reciclaje de la corteza durante el Hádico.",
    uncertaintyOrLimitations:
      "No sobrevive ningún rastro fósil ni bioquímico indiscutible de la era pre-LUCA. Todos los modelos son construcciones teóricas basadas en la evolución ribosómica.",
    referenceExplanations: {
      "ref-prosdocimi-fuca-candidate": "Formulación teórica de FUCA como el ancestro de transición previo a LUCA.",
    },
    referenceVerificationNotes: {
      "ref-prosdocimi-fuca-candidate": "CANDIDATO NO VERIFICADO: Citación y volumen/DOI pendientes de verificación editorial ante registros canónicos.",
    },
  },
};

// ── FRENCH (FR) ────────────────────────────────────────────────
export const claimsFR: Record<string, LocalizedEvidenceClaim> = {
  "claim-homo-sapiens-jebel-irhoud": {
    id: "claim-homo-sapiens-jebel-irhoud",
    statement:
      "Les restes fossiles crâniens et mandibulaires datés stratigraphiquement de Djebel Irhoud, au Maroc, établissent l'émergence d'Homo sapiens anatomiquement moderne dès environ 315 000 ans avant le présent.",
    explanation:
      "La datation par thermoluminescence de silex chauffés et la résonance de spin électronique sur l'émail dentaire à Djebel Irhoud ont établi un âge de ~315 ± 34 ka. Les spécimens présentent une morphologie faciale moderne associée à une boîte crânienne allongée et archaïque, démontrant une phase précoce de l'évolution panafricaine des humains modernes.",
    geologicalFormation: "Dépôts de la Grotte de Djebel Irhoud",
    uncertaintyOrLimitations:
      "La marge d'incertitude de datation est de ±34 000 ans. Les débats se poursuivent pour déterminer si ces hominines représentent des humains modernes sensu stricto ou un morphotype ancestral immédiat sur la lignée humaine moderne.",
    referenceExplanations: {
      "ref-hublin-2017": "Nouveaux fossiles de Djebel Irhoud, Maroc, et origine panafricaine d'Homo sapiens.",
      "ref-richter-2017": "Âge des fossiles d'hominines de Djebel Irhoud et débuts du Middle Stone Age par thermoluminescence.",
    },
    referenceVerificationNotes: {
      "ref-hublin-2017": "DOI vérifié auprès de Nature. Analyse stratigraphique et morphologique crânienne confirmée.",
      "ref-richter-2017": "DOI vérifié auprès de Nature. Méthode de datation par thermoluminescence sur silex chauffés confirmée.",
    },
  },

  "claim-dickinsonia-biomarker-steranes": {
    id: "claim-dickinsonia-biomarker-steranes",
    statement:
      "Des molécules organiques fossilisées (stéranes cholestéroïdes) extraites de spécimens édiacariens de Dickinsonia confirment définitivement son affinité biologique en tant qu'animal multicellulaire macroscopique.",
    explanation:
      "L'extraction géochimique organique de biomarqueurs d'hydrocarbures sur des fossiles de Dickinsonia costata de la mer Blanche (Russie) a révélé d'abondants cholestéroïdes (jusqu'à 93 % des stéranes totaux) et une absence quasi-totale d'ergostéroïdes. Cette signature est caractéristique des métazoaires (animaux) et écarte les classifications alternatives en tant que champignons géants ou lichens.",
    geologicalFormation: "Formation d'Oust-Pinega (Édiacarien, ~558 Ma)",
    uncertaintyOrLimitations:
      "La préservation des biomarqueurs nécessite des conditions taphonomiques exceptionnelles où les films organiques sont scellés entre des couches d'argile, limitant la portée géographique à des gisements de type Konservat-Lagerstätten.",
    referenceExplanations: {
      "ref-bobrovskiy-2018": "Les stéroïdes anciens établissent le fossile édiacarien Dickinsonia comme l'un des premiers animaux sur Terre.",
    },
    referenceVerificationNotes: {
      "ref-bobrovskiy-2018": "DOI vérifié auprès de Science/AAAS. Données GC-MS sur les profils de stéranes cholestérol confirmées.",
    },
  },

  "claim-tiktaalik-transitional-tetrapod": {
    id: "claim-tiktaalik-transitional-tetrapod",
    statement:
      "Tiktaalik roseae possède des adaptations squelettiques intermédiaires entre les poissons sarcoptérygiens à nageoires charnues et les premiers tétrapodes, notamment des poignets fonctionnels et un cou mobile.",
    explanation:
      "Découvert dans des sédiments fluviaux du Dévonien supérieur (~375 Ma) sur l'île d'Ellesmere au Canada, Tiktaalik associe des écailles et des rayons de nageoire pisciformes à des caractères dérivés de tétrapodes : crâne aplati, cou articulé et os homologues à l'humérus, au radius, à l'ulna et aux éléments du poignet des tétrapodes.",
    geologicalFormation: "Formation de Fram (Dévonien supérieur, Frasnien, ~375 Ma)",
    uncertaintyOrLimitations:
      "Bien qu'il s'agisse d'un grade de transition anatomique, des traces de pas plus anciennes (p. ex. Zachełmie, Pologne, ~390 Ma) indiquent que l'émergence des tétrapodes pourrait précéder le dépôt de la formation de Fram.",
    referenceExplanations: {
      "ref-daeschler-2006": "Un poisson dévonien proche des tétrapodes et l'évolution du plan corporel tétrapode.",
      "ref-shubin-2006": "La nageoire pectorale de Tiktaalik roseae et l'origine des membres des tétrapodes.",
    },
    referenceVerificationNotes: {
      "ref-daeschler-2006": "DOI vérifié auprès de Nature. Anatomie crânienne et ceinture scapulaire de l'holotype NUFV 108 confirmées.",
      "ref-shubin-2006": "DOI vérifié auprès de Nature. Homologies des rayons endosquelettiques et du poignet fonctionnel confirmées.",
    },
  },

  "claim-archaeopteryx-avialan-transition": {
    id: "claim-archaeopteryx-avialan-transition",
    statement:
      "Archaeopteryx lithographica représente un grade avien souche intermédiaire illustrant la coexistence de plumes de vol aérodynamiques avec des caractères squelettiques de dinosaures théropodes non aviaires.",
    explanation:
      "Préservé dans le calcaire lithographique de Solnhofen du Jurassique supérieur (~150 Ma), Archaeopteryx présente des rémiges asymétriques et une furcula aux côtés de plésiomorphies théropodes : griffes manuelles non fusionnées, mâchoires pourvues de dents et longue queue osseuse.",
    geologicalFormation: "Formation de Solnhofen (Jurassique supérieur, Tithonien, ~150 Ma)",
    uncertaintyOrLimitations:
      "Le débat persiste sur la question de savoir si Archaeopteryx était capable d'un vol battu autonome ou principalement d'un vol plané, d'après les contraintes mécaniques du squelette pectoral.",
    referenceExplanations: {
      "ref-foth-2014": "Un nouveau spécimen d'Archaeopteryx apporte un éclairage sur l'évolution des plumes pennacées.",
    },
    referenceVerificationNotes: {
      "ref-foth-2014": "DOI vérifié auprès de Nature. Analyse du plumage du 11e spécimen confirmée.",
    },
  },

  "claim-neanderthal-human-admixture": {
    id: "claim-neanderthal-human-admixture",
    statement:
      "Le séquençage à haute couverture du génome complet confirme que 1 à 2 % du patrimoine génétique des populations humaines modernes non africaines découle d'une introgression et d'une hybridation anciennes avec les Néandertaliens.",
    explanation:
      "La comparaison des génomes néandertaliens (Vindija, Altaï) avec divers génomes humains actuels a démontré que les populations non africaines partagent significativement plus d'allèles dérivés avec Néandertal que les populations subsahariennes. Ce flux génétique est daté d'environ 50 000 à 60 000 ans en Eurasie.",
    uncertaintyOrLimitations:
      "Les plages de datation dépendent des taux de mutation humaine estimés. Des migrations de retour ultérieures vers l'Afrique ont également introduit de faibles traces d'ascendance néandertalienne dans certaines populations africaines modernes.",
    referenceExplanations: {
      "ref-green-2010": "Séquence préliminaire du génome néandertalien et mise en évidence d'un flux génétique vers l'humain moderne.",
      "ref-prufer-2014": "Séquence génomique complète à haute couverture d'un Néandertalien des montagnes de l'Altaï.",
    },
    referenceVerificationNotes: {
      "ref-green-2010": "DOI vérifié auprès de Science/AAAS. Tests génomiques statistiques D (ABBA-BABA) confirmés.",
      "ref-prufer-2014": "DOI vérifié auprès de Nature. Analyse du génome néandertalien de la grotte de Denisova à une couverture 52x confirmée.",
    },
  },

  "claim-luca-molecular-homology": {
    id: "claim-luca-molecular-homology",
    statement:
      "La phylogénomique comparative indique que LUCA était un organisme anaérobie utilisant le code génétique universel, des ribosomes et une ATP synthase membranaire il y a ~3,8 à 3,5 milliards d'années.",
    explanation:
      "Tous les organismes cellulaires connus partagent les mêmes 20 acides aminés canoniques, le même code génétique triplet et des ATP synthases homologues. L'analyse phylogénomique de ~6,1 millions de gènes procaryotes a identifié 355 familles de protéines directement traçables jusqu'à LUCA, suggérant une voie métabolique de Wood-Ljungdahl dépendante de H₂.",
    uncertaintyOrLimitations:
      "Les transferts horizontaux de gènes (HGT) intenses au début de l'Archéen masquent si certains gènes métaboliques étaient présents chez LUCA ou acquis peu après. LUCA ne constitue pas l'origine de la vie mais l'ancêtre commun universel des formes actuelles.",
    referenceExplanations: {
      "ref-weiss-2016": "Physiologie et habitat du dernier ancêtre commun universel déduits de 355 familles de protéines ancestrales.",
    },
    referenceVerificationNotes: {
      "ref-weiss-2016": "DOI vérifié auprès de Nature Microbiology. Criblage phylogénomique de 355 clusters de protéines de LUCA confirmé.",
    },
  },

  "claim-fuca-prebiotic-translation-candidate": {
    id: "claim-fuca-prebiotic-translation-candidate",
    statement:
      "Des modèles théoriques suggèrent qu'avant LUCA, une population ancestrale précoce (FUCA) a initié les premiers mécanismes de synthèse peptidique non universels avant l'établissement complet du code génétique.",
    explanation:
      "Les cadres théoriques de l'évolution cellulaire considèrent FUCA comme une transition intermédiaire entre le monde de l'ARN et LUCA. Aucun vestige fossile physique direct n'a subsisté de l'Hadéen en raison du recyclage de la croûte terrestre.",
    uncertaintyOrLimitations:
      "Aucune trace fossile ou biochimique indiscutable ne subsiste de l'époque pré-LUCA. Tous les modèles sont des constructions théoriques déduites de l'évolution ribosomique.",
    referenceExplanations: {
      "ref-prosdocimi-fuca-candidate": "Formulation théorique de FUCA comme premier ancêtre universel précédant LUCA.",
    },
    referenceVerificationNotes: {
      "ref-prosdocimi-fuca-candidate": "CANDIDAT NON VÉRIFIÉ : Référence et DOI en attente de vérification éditoriale auprès des registres officiels.",
    },
  },
};

