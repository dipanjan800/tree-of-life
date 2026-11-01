import fs from "fs";
import path from "path";

const uiFilePath = path.join(__dirname, "../lib/i18n/translations/ui.ts");
let content = fs.readFileSync(uiFilePath, "utf8");

// Topbar button additions
content = content.replace(
  'storyBtnAria: "Launch The Story of Life cinematic narrative",',
  `storyBtnAria: "Launch The Story of Life cinematic narrative",\n      conservationBtn: "Conservation & Extinction",\n      conservationShort: "Extinction",\n      conservationBtnAria: "Explore Mass Extinctions, Extinct Species, and Modern IUCN Red List Statuses",`
);
content = content.replace(
  'storyBtnAria: "জীবনের মহাকাহিনির আখ্যান শুরু করুন",',
  `storyBtnAria: "জীবনের মহাকাহিনির আখ্যান শুরু করুন",\n      conservationBtn: "সংরক্ষণ ও বিলুপ্তি",\n      conservationShort: "বিলুপ্তি",\n      conservationBtnAria: "গণবিলুপ্তি, বিলুপ্ত প্রজাতি ও আধুনিক আইইউসিএন লাল তালিকা অন্বেষণ করুন",`
);
content = content.replace(
  'storyBtnAria: "जीवन की कहानी का वृत्तांत प्रारंभ करें",',
  `storyBtnAria: "जीवन की कहानी का वृत्तांत प्रारंभ करें",\n      conservationBtn: "संरक्षण एवं विलुप्ति",\n      conservationShort: "विलुप्ति",\n      conservationBtnAria: "महाविलुप्ति, विलुप्त प्रजातियों और आधुनिक आईयूसीएन रेड लिस्ट की स्थिति का अन्वेषण करें",`
);
content = content.replace(
  'storyBtnAria: "Iniciar la narrativa cinematográfica de La Historia de la Vida",',
  `storyBtnAria: "Iniciar la narrativa cinematográfica de La Historia de la Vida",\n      conservationBtn: "Conservación y Extinción",\n      conservationShort: "Extinción",\n      conservationBtnAria: "Explorar las Grandes Extinciones en Masa, Especies Extintas y Estado en la Lista Roja de la UICN",`
);
content = content.replace(
  'storyBtnAria: "Lancer le récit cinématographique de L\'Histoire de la Vie",',
  `storyBtnAria: "Lancer le récit cinématographique de L'Histoire de la Vie",\n      conservationBtn: "Conservation et Extinction",\n      conservationShort: "Extinction",\n      conservationBtnAria: "Explorer les Grandes Extinctions Massives, les Espèces Éteintes et les Statuts UICN",`
);

const conservationBlocks: Record<string, string> = {
  en: `    conservation: {
      title: "Conservation & Extinction Explorer",
      subtitle: "Connecting Earth's Big Five Mass Extinction Crises with Contemporary Biodiversity Preservation",
      tabTimeline: "Mass Extinction Timeline",
      tabExtinctSpecies: "Extinct Species Profiles",
      tabModernIucn: "Modern IUCN Red List",
      filterAll: "All Lineages",
      filterMassExtinctions: "Mass Extinction Victims",
      filterThreatened: "IUCN Threatened Taxa",
      filterRelicts: "Ancient Relicts",
      bigFiveTitle: "The Big Five Mass Extinctions",
      extinctTitle: "Deep-Time Extinct Taxa",
      modernTitle: "Modern Extant Conservation Status",
      geologicalAge: "Geological Horizon",
      extinctionDate: "Last Fossil Occurrence",
      killRateSpecies: "Estimated Species Loss",
      killRateGenera: "Estimated Genera Loss",
      environmentalMechanisms: "Environmental & Geochemical Mechanisms",
      affectedGroups: "Severely Affected Taxa",
      survivingRadiations: "Surviving Radiations & Recovery",
      primaryTriggers: "Primary Trigger Mechanisms",
      scientificUncertainty: "Scientific Uncertainty & Consensus",
      fossilHorizon: "Stratigraphic Type Horizon",
      datingMethod: "Geochronological Dating Method",
      dossierLink: "Open Organism Dossier",
      assessmentYear: "IUCN Assessment Year",
      populationTrend: "Wild Population Trend",
      geographicRange: "Documented Geographic Range",
      primaryThreats: "Primary Anthropogenic Threats",
      conservationActions: "Active Conservation Interventions",
      authorityProvenance: "Data Provenance",
      lastVerified: "Verification Date",
      iucnProfileLink: "View Official IUCN Red List Assessment",
      trends: {
        increasing: "Increasing",
        decreasing: "Decreasing",
        stable: "Stable",
        unknown: "Unknown",
      },
      threatCategories: {
        habitat_loss: "Habitat Loss & Fragmentation",
        climate_change: "Climate Change & Thermal Stress",
        overexploitation: "Poaching & Overexploitation",
        invasive_species: "Invasive Species & Competition",
        pollution: "Chemical Pollution & Toxins",
        disease: "Pathogens & Emerging Diseases",
        human_conflict: "Human-Wildlife Conflict",
      },
      iucnCategories: {
        EX: "Extinct (EX)",
        EW: "Extinct in the Wild (EW)",
        CR: "Critically Endangered (CR)",
        EN: "Endangered (EN)",
        VU: "Vulnerable (VU)",
        NT: "Near Threatened (NT)",
        LC: "Least Concern (LC)",
        DD: "Data Deficient (DD)",
        NE: "Not Evaluated (NE)",
      },
      extinctionDemarcationNote:
        "Epistemological Demarcation: Deep-time prehistoric fossils are categorized strictly by chronological occurrence and geological horizons. They are never assigned modern IUCN categories.",
      modernDemarcationNote:
        "All modern conservation ratings are derived directly from the official IUCN Red List of Threatened Species (v2024-2). Provenance and assessment years are strictly recorded.",
      close: "Close Explorer",
    },`,

  "bn-IN": `    conservation: {
      title: "সংরক্ষণ ও বিলুপ্তি অন্বেষক",
      subtitle: "পৃথিবীর পাঁচটি প্রধান গণবিলুপ্তির সাথে সমসাময়িক জীববৈচিত্র্য সংরক্ষণের বৈজ্ঞানিক মেলবন্ধন",
      tabTimeline: "গণবিলুপ্তির কালরেখা",
      tabExtinctSpecies: "বিলুপ্ত প্রজাতির বিবরণ",
      tabModernIucn: "আধুনিক আইইউসিএন লাল তালিকা",
      filterAll: "সকল বংশধারা",
      filterMassExtinctions: "গণবিলুপ্তির শিকার",
      filterThreatened: "আইইউসিএন বিপন্ন প্রজাতি",
      filterRelicts: "প্রাচীন অবশিষ্টাংশ",
      bigFiveTitle: "পৃথিবীর পাঁচটি মহাগণবিলুপ্তি",
      extinctTitle: "প্রাগৈতিহাসিক বিলুপ্ত ট্যাক্সন",
      modernTitle: "বর্তমান জীবিত প্রজাতির সংরক্ষণ অবস্থা",
      geologicalAge: "ভূতাত্ত্বিক সময়কাল",
      extinctionDate: "সর্বশেষ জীবাশ্ম প্রমাণ",
      killRateSpecies: "আনুমানিক প্রজাতিগত অবলুপ্তি",
      killRateGenera: "আনুমানিক গণগত অবলুপ্তি",
      environmentalMechanisms: "পরিবেশগত ও ভূ-রাসায়নিক প্রক্রিয়া",
      affectedGroups: "মারাত্মকভাবে ক্ষতিগ্রস্ত জীবগোষ্ঠী",
      survivingRadiations: "টিকে থাকা বংশধর ও বিবর্তনীয় বিস্তার",
      primaryTriggers: "মূল প্ররোচক কারণসমূহ",
      scientificUncertainty: "বৈজ্ঞানিক অনিশ্চয়তা ও ঐক্যমত্য",
      fossilHorizon: "জীবাশ্ম স্তরবিন্যাস",
      datingMethod: "ভূতাত্ত্বিক সময় নির্ধারণ পদ্ধতি",
      dossierLink: "জীববিজ্ঞানিক নথি খুলুন",
      assessmentYear: "আইইউসিএন মূল্যায়নের বছর",
      populationTrend: "বন্য জনসংখ্যার গতিধারা",
      geographicRange: "নথিভুক্ত ভৌগোলিক বিস্তার",
      primaryThreats: "প্রধান মানবসৃষ্ট হুমকি",
      conservationActions: "সক্রিয় সংরক্ষণমূলক পদক্ষেপ",
      authorityProvenance: "তথ্যের উৎস ও নির্ভরযোগ্যতা",
      lastVerified: "যাচাইকরণের তারিখ",
      iucnProfileLink: "অফিসিয়াল আইইউসিএন মূল্যায়ন দেখুন",
      trends: {
        increasing: "ক্রমবর্ধমান",
        decreasing: "হ্রাসমান",
        stable: "স্থিতিশীল",
        unknown: "অজ্ঞাত",
      },
      threatCategories: {
        habitat_loss: "আবাসস্থল ধ্বংস ও খণ্ডীকরণ",
        climate_change: "জলবায়ু পরিবর্তন ও তাপীয় চাপ",
        overexploitation: "চোরাশিকার ও অতিরিক্ত শিকার",
        invasive_species: "আক্রমণাত্মক প্রজাতি ও প্রতিযোগিতা",
        pollution: "রাসায়নিক দূষণ ও বিষাক্ত বর্জ্য",
        disease: "রোগজীবাণু ও সংক্রমণ",
        human_conflict: "মানুষ-বন্যপ্রাণী সংঘাত",
      },
      iucnCategories: {
        EX: "বিলুপ্ত (EX)",
        EW: "বন্য পরিবেশে বিলুপ্ত (EW)",
        CR: "চরম বিপন্ন (CR)",
        EN: "বিপন্ন (EN)",
        VU: "ঝুঁকিপূর্ণ (VU)",
        NT: "বিপদের কাছাকাছি (NT)",
        LC: "ন্যূনতম উদ্বেগের (LC)",
        DD: "তথ্যের ঘাটতি (DD)",
        NE: "মূল্যায়নহীন (NE)",
      },
      extinctionDemarcationNote:
        "জ্ঞানতাত্ত্বিক সীমানা: প্রাগৈতিহাসিক গভীর সময়ের জীবাশ্মগুলি ভূতাত্ত্বিক স্তর ও সময়ের ভিত্তিতে শ্রেণীবদ্ধ। এগুলিতে কখনই আধুনিক আইইউসিএন ক্যাটাগরি প্রয়োগ করা হয় না।",
      modernDemarcationNote:
        "সমস্ত আধুনিক সংরক্ষণ মান সরাসরি আইইউসিএন রেড লিস্ট (v2024-2) থেকে সংগৃহীত। মূল্যায়নের বছর এবং প্রমাণ কঠোরভাবে নথিভুক্ত।",
      close: "বন্ধ করুন",
    },`,

  "hi-IN": `    conservation: {
      title: "संरक्षण एवं विलुप्ति अन्वेषक",
      subtitle: "पृथ्वी के पांच प्रमुख महाविलुप्ति संकटों को समकालीन जैव विविधता संरक्षण से जोड़ना",
      tabTimeline: "महाविलुप्ति समयरेखा",
      tabExtinctSpecies: "विलुप्त प्रजातियों का विवरण",
      tabModernIucn: "आधुनिक आईयूसीएन रेड लिस्ट",
      filterAll: "सभी वंशक्रम",
      filterMassExtinctions: "महाविलुप्ति के शिकार",
      filterThreatened: "आईयूसीएन संकटग्रस्त टैक्सन",
      filterRelicts: "प्राचीन अवशेष",
      bigFiveTitle: "पृथ्वी की पांच प्रमुख महाविलुप्तियाँ",
      extinctTitle: "प्रागैतिहासिक विलुप्त टैक्सन",
      modernTitle: "वर्तमान जीवित प्रजातियों की संरक्षण स्थिति",
      geologicalAge: "भूवैज्ञानिक काल",
      extinctionDate: "अंतिम जीवाश्म उपस्थिति",
      killRateSpecies: "अनुमानित प्रजाति क्षति",
      killRateGenera: "अनुमानित वंश क्षति",
      environmentalMechanisms: "पर्यावरणीय और भू-रासायनिक तंत्र",
      affectedGroups: "गंभीर रूप से प्रभावित समूह",
      survivingRadiations: "जीवित वंशज और पुनर्प्राप्ति",
      primaryTriggers: "प्राथमिक प्रेरक कारण",
      scientificUncertainty: "वैज्ञानिक अनिश्चितता और आम सहमति",
      fossilHorizon: "जीवाश्म संस्तर",
      datingMethod: "भू-कालानुक्रमिक डेटिंग विधि",
      dossierLink: "जीव वैज्ञानिक दस्तावेज़ खोलें",
      assessmentYear: "आईयूसीएन मूल्यांकन वर्ष",
      populationTrend: "जंगली आबादी की प्रवृत्ति",
      geographicRange: "दस्तावेजी भौगोलिक दायरा",
      primaryThreats: "प्रमुख मानवजनित खतरे",
      conservationActions: "सक्रिय संरक्षण कार्य",
      authorityProvenance: "डेटा स्रोत और प्रामाणिकता",
      lastVerified: "सत्यापन तिथि",
      iucnProfileLink: "आधिकारिक आईयूसीएन मूल्यांकन देखें",
      trends: {
        increasing: "बढ़ती हुई",
        decreasing: "घटती हुई",
        stable: "स्थिर",
        unknown: "अज्ञात",
      },
      threatCategories: {
        habitat_loss: "आवास विनाश और विखंडन",
        climate_change: "जलवायु परिवर्तन और थर्मल तनाव",
        overexploitation: "अवैध शिकार और अत्यधिक दोहन",
        invasive_species: "आक्रामक प्रजातियाँ और प्रतिस्पर्धा",
        pollution: "रासायनिक प्रदूषण और विषाक्त पदार्थ",
        disease: "रोगज़नक़ और उभरती बीमारियाँ",
        human_conflict: "मानव-वन्यजीव संघर्ष",
      },
      iucnCategories: {
        EX: "विलुप्त (EX)",
        EW: "जंगल में विलुप्त (EW)",
        CR: "गंभीर रूप से संकटग्रस्त (CR)",
        EN: "संकटग्रस्त (EN)",
        VU: "अतिसंवेदनशील (VU)",
        NT: "संकट के निकट (NT)",
        LC: "कम चिंताजनक (LC)",
        DD: "डेटा की कमी (DD)",
        NE: "मूल्यांकन नहीं किया गया (NE)",
      },
      extinctionDemarcationNote:
        "ज्ञानमीमांसीय सीमांकन: प्रागैतिहासिक गहरे समय के जीवाश्मों को भूवैज्ञानिक संस्तरों के आधार पर वर्गीकृत किया जाता है। उन्हें कभी भी आधुनिक आईयूसीएन श्रेणियां नहीं दी जाती हैं।",
      modernDemarcationNote:
        "सभी आधुनिक संरक्षण रेटिंग आधिकारिक आईयूसीएन रेड लिस्ट (v2024-2) से प्राप्त हैं। मूल्यांकन वर्ष और साक्ष्य सख्ती से दर्ज हैं।",
      close: "अन्वेषक बंद करें",
    },`,

  es: `    conservation: {
      title: "Explorador de Conservación y Extinción",
      subtitle: "Conectando las Cinco Grandes Extinciones en Masa de la Tierra con la Preservación Contemporánea de la Biodiversidad",
      tabTimeline: "Línea de Tiempo de Extinciones Masivas",
      tabExtinctSpecies: "Perfiles de Especies Extintas",
      tabModernIucn: "Lista Roja de la UICN Moderna",
      filterAll: "Todos los Linajes",
      filterMassExtinctions: "Víctimas de Extinciones Masivas",
      filterThreatened: "Taxones Amenazados UICN",
      filterRelicts: "Reliquias Antiguas",
      bigFiveTitle: "Las Cinco Grandes Extinciones en Masa",
      extinctTitle: "Taxones Extintos del Tiempo Profundo",
      modernTitle: "Estado de Conservación Actual",
      geologicalAge: "Horizonte Geológico",
      extinctionDate: "Última Aparición Fósil",
      killRateSpecies: "Pérdida Estimada de Especies",
      killRateGenera: "Pérdida Estimada de Géneros",
      environmentalMechanisms: "Mecanismos Ambientales y Geoquímicos",
      affectedGroups: "Grupos Severamente Afectados",
      survivingRadiations: "Radiaciones Supervivientes y Recuperación",
      primaryTriggers: "Desencadenantes Primarios",
      scientificUncertainty: "Incertidumbre Científica y Consenso",
      fossilHorizon: "Horizonte Estratigráfico Tipo",
      datingMethod: "Método de Datación Geocronológica",
      dossierLink: "Abrir Expediente del Organismo",
      assessmentYear: "Año de Evaluación UICN",
      populationTrend: "Tendencia de la Población Silvestre",
      geographicRange: "Rango Geográfico Documentado",
      primaryThreats: "Amenazas Antropogénicas Principales",
      conservationActions: "Intervenciones Activas de Conservación",
      authorityProvenance: "Procedencia de los Datos",
      lastVerified: "Fecha de Verificación",
      iucnProfileLink: "Ver Evaluación Oficial en la Lista Roja de la UICN",
      trends: {
        increasing: "Creciente",
        decreasing: "Decreciente",
        stable: "Estable",
        unknown: "Desconocida",
      },
      threatCategories: {
        habitat_loss: "Pérdida y Fragmentación del Hábitat",
        climate_change: "Cambio Climático y Estrés Térmico",
        overexploitation: "Caza Furtiva y Sobreexplotación",
        invasive_species: "Especies Invasoras y Competencia",
        pollution: "Contaminación Química y Toxinas",
        disease: "Patógenos y Enfermedades Emergentes",
        human_conflict: "Conflicto Humano-Vida Silvestre",
      },
      iucnCategories: {
        EX: "Extinto (EX)",
        EW: "Extinto en Estado Silvestre (EW)",
        CR: "En Peligro Crítico (CR)",
        EN: "En Peligro (EN)",
        VU: "Vulnerable (VU)",
        NT: "Casi Amenazado (NT)",
        LC: "Preocupación Menor (LC)",
        DD: "Datos Insuficientes (DD)",
        NE: "No Evaluado (NE)",
      },
      extinctionDemarcationNote:
        "Demarcación Epistemológica: Los fósiles prehistóricos del tiempo profundo se clasifican estrictamente por horizontes geológicos. Nunca se les asignan categorías modernas de la UICN.",
      modernDemarcationNote:
        "Todas las evaluaciones modernas provienen directamente de la Lista Roja de Especies Amenazadas de la UICN (v2024-2). Los años de evaluación y fuentes están registrados.",
      close: "Cerrar Explorador",
    },`,

  fr: `    conservation: {
      title: "Explorateur de Conservation et d'Extinction",
      subtitle: "Relier les Cinq Grandes Extinctions Massives de la Terre à la Préservation Contemporaine de la Biodiversité",
      tabTimeline: "Chronologie des Extinctions Massives",
      tabExtinctSpecies: "Profils des Espèces Éteintes",
      tabModernIucn: "Liste Rouge de l'UICN Moderne",
      filterAll: "Toutes les Lignées",
      filterMassExtinctions: "Victimes d'Extinctions Massives",
      filterThreatened: "Taxons Menacés UICN",
      filterRelicts: "Reliques Anciennes",
      bigFiveTitle: "Les Cinq Grandes Extinctions Massives",
      extinctTitle: "Taxons Éteints des Temps Profonds",
      modernTitle: "Statuts de Conservation Actuels",
      geologicalAge: "Horizon Géologique",
      extinctionDate: "Dernière Occurrence Fossile",
      killRateSpecies: "Perte Estimée d'Espèces",
      killRateGenera: "Perte Estimée de Genres",
      environmentalMechanisms: "Mécanismes Environnementaux et Géochimiques",
      affectedGroups: "Groupes Gravement Touchés",
      survivingRadiations: "Radiations Survivantes et Récupération",
      primaryTriggers: "Déclencheurs Primaires",
      scientificUncertainty: "Incertitude Scientifique et Consensus",
      fossilHorizon: "Horizon Stratigraphique Type",
      datingMethod: "Méthode de Datation Géochronologique",
      dossierLink: "Ouvrir le Dossier de l'Organisme",
      assessmentYear: "Année d'Évaluation UICN",
      populationTrend: "Tendance de la Population Sauvage",
      geographicRange: "Aire de Répartition Documentée",
      primaryThreats: "Principales Menaces Anthropiques",
      conservationActions: "Interventions Actives de Conservation",
      authorityProvenance: "Provenance des Données",
      lastVerified: "Date de Vérification",
      iucnProfileLink: "Voir l'Évaluation Officielle de la Liste Rouge UICN",
      trends: {
        increasing: "En augmentation",
        decreasing: "En déclin",
        stable: "Stable",
        unknown: "Inconnue",
      },
      threatCategories: {
        habitat_loss: "Perte et Fragmentation des Habitats",
        climate_change: "Changement Climatique et Stress Thermique",
        overexploitation: "Braconnage et Surexploitation",
        invasive_species: "Espèces Invasives et Compétition",
        pollution: "Pollution Chimique et Toxines",
        disease: "Pathogènes et Maladies Émergentes",
        human_conflict: "Conflits Homme-Faune Sauvage",
      },
      iucnCategories: {
        EX: "Éteint (EX)",
        EW: "Éteint à l'État Sauvage (EW)",
        CR: "En Danger Critique (CR)",
        EN: "En Danger (EN)",
        VU: "Vulnerable (VU)",
        NT: "Quasi Menacé (NT)",
        LC: "Préoccupation Mineure (LC)",
        DD: "Données Insuffisantes (DD)",
        NE: "Non Évalué (NE)",
      },
      extinctionDemarcationNote:
        "Démarcation Épistémologique : Les fossiles préhistoriques des temps profonds sont catégorisés strictement selon les horizons géologiques. Les catégories modernes de l'UICN ne leur sont jamais appliquées.",
      modernDemarcationNote:
        "Toutes les évaluations modernes proviennent directement de la Liste Rouge officielle de l'UICN (v2024-2). Les années d'évaluation et sources sont strictement consignées.",
      close: "Fermer l'Explorateur",
    },`,
};

// Locate `organismStatus: {\n      living: ...,\n      extinct: ...,\n      unknown: ...,\n    },` in each locale and insert `conservation` block right after it
const lines = content.split("\n");
const resultLines: string[] = [];
let localeIdx = 0;
const localeKeys = ["en", "bn-IN", "hi-IN", "es", "fr"];

for (let i = 0; i < lines.length; i++) {
  resultLines.push(lines[i]);
  if (lines[i].includes("organismStatus: {")) {
    // Collect the closing `},` for organismStatus
    let j = i + 1;
    while (j < lines.length && !lines[j].trim().startsWith("},")) {
      resultLines.push(lines[j]);
      j++;
    }
    if (j < lines.length) {
      resultLines.push(lines[j]); // the `},`
      const currentLocale = localeKeys[localeIdx];
      resultLines.push(conservationBlocks[currentLocale]);
      localeIdx++;
      i = j;
    }
  }
}

fs.writeFileSync(uiFilePath, resultLines.join("\n"), "utf8");
console.log(`Successfully spliced conservation into all ${localeIdx} locales!`);
