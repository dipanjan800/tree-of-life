// ============================================================
// Tree of Life — Chemical Elements & Molecular Full Formats
// Supports multilingual full names and chemical formulas
// ============================================================

import type { Locale } from "./config";

export interface ElementFormat {
  symbol: string;
  names: Record<Locale, string>;
}

export const KEY_ELEMENTS_MAP: Record<string, ElementFormat> = {
  H: {
    symbol: "H",
    names: {
      en: "Hydrogen (H)",
      "bn-IN": "হাইড্রোজেন (H)",
      "hi-IN": "हाइड्रोजन (H)",
      es: "Hidrógeno (H)",
      fr: "Hydrogène (H)",
    },
  },
  He: {
    symbol: "He",
    names: {
      en: "Helium (He)",
      "bn-IN": "হিলিয়াম (He)",
      "hi-IN": "हीलियम (He)",
      es: "Helio (He)",
      fr: "Hélium (He)",
    },
  },
  Li: {
    symbol: "Li",
    names: {
      en: "Lithium (Li)",
      "bn-IN": "লিথিয়াম (Li)",
      "hi-IN": "लिथियम (Li)",
      es: "Litio (Li)",
      fr: "Lithium (Li)",
    },
  },
  C: {
    symbol: "C",
    names: {
      en: "Carbon (C)",
      "bn-IN": "কার্বন (C)",
      "hi-IN": "कार्बन (C)",
      es: "Carbono (C)",
      fr: "Carbone (C)",
    },
  },
  N: {
    symbol: "N",
    names: {
      en: "Nitrogen (N)",
      "bn-IN": "নাইট্রোজেন (N)",
      "hi-IN": "नाइट्रोजन (N)",
      es: "Nitrógeno (N)",
      fr: "Azote (N)",
    },
  },
  O: {
    symbol: "O",
    names: {
      en: "Oxygen (O)",
      "bn-IN": "অক্সিজেন (O)",
      "hi-IN": "ऑक्सीजन (O)",
      es: "Oxígeno (O)",
      fr: "Oxygène (O)",
    },
  },
  Fe: {
    symbol: "Fe",
    names: {
      en: "Iron (Fe)",
      "bn-IN": "লোহা / আয়রন (Fe)",
      "hi-IN": "आयरन / लोहा (Fe)",
      es: "Hierro (Fe)",
      fr: "Fer (Fe)",
    },
  },
  Si: {
    symbol: "Si",
    names: {
      en: "Silicon (Si)",
      "bn-IN": "সিলিকন (Si)",
      "hi-IN": "सिलिकॉन (Si)",
      es: "Silicio (Si)",
      fr: "Silicium (Si)",
    },
  },
  Ni: {
    symbol: "Ni",
    names: {
      en: "Nickel (Ni)",
      "bn-IN": "নিকেল (Ni)",
      "hi-IN": "निकल (Ni)",
      es: "Níquel (Ni)",
      fr: "Nickel (Ni)",
    },
  },
  Mg: {
    symbol: "Mg",
    names: {
      en: "Magnesium (Mg)",
      "bn-IN": "ম্যাগনেসিয়াম (Mg)",
      "hi-IN": "मैग्नीशियम (Mg)",
      es: "Magnesio (Mg)",
      fr: "Magnésium (Mg)",
    },
  },
  P: {
    symbol: "P",
    names: {
      en: "Phosphorus (P)",
      "bn-IN": "ফসফরাস (P)",
      "hi-IN": "फॉस्फोरस (P)",
      es: "Fósforo (P)",
      fr: "Phosphore (P)",
    },
  },
  S: {
    symbol: "S",
    names: {
      en: "Sulfur (S)",
      "bn-IN": "সালফার (S)",
      "hi-IN": "सल्फर (S)",
      es: "Azufre (S)",
      fr: "Soufre (S)",
    },
  },
  RNA: {
    symbol: "RNA",
    names: {
      en: "Ribonucleic Acid (RNA)",
      "bn-IN": "রাইবোনিউক্লিক অ্যাসিড (RNA)",
      "hi-IN": "राइबोन्यूक्लिक एसिड (RNA)",
      es: "Ácido Ribonucleico (RNA)",
      fr: "Acide Ribonucléique (RNA)",
    },
  },
  DNA: {
    symbol: "DNA",
    names: {
      en: "Deoxyribonucleic Acid (DNA)",
      "bn-IN": "ডিঅক্সিরাইবোনিউক্লিক অ্যাসিড (DNA)",
      "hi-IN": "डीऑक्सीराइबोन्यूक्लिक एसिड (DNA)",
      es: "Ácido Desoxirribonucleico (DNA)",
      fr: "Acide Désoxyribonucléique (DNA)",
    },
  },
  Lipids: {
    symbol: "Lipids",
    names: {
      en: "Lipids (Fatty Acids & Membranes)",
      "bn-IN": "লিপিড (Lipids)",
      "hi-IN": "लिपिड्स (Lipids)",
      es: "Lípidos (Lipids)",
      fr: "Lipides (Lipids)",
    },
  },
  Peptides: {
    symbol: "Peptides",
    names: {
      en: "Peptides (Amino Acid Chains)",
      "bn-IN": "পেপটাইড (Peptides)",
      "hi-IN": "पेप्टाइड्स (Peptides)",
      es: "Péptidos (Peptides)",
      fr: "Peptides (Peptides)",
    },
  },
  ATP: {
    symbol: "ATP",
    names: {
      en: "Adenosine Triphosphate (ATP)",
      "bn-IN": "অ্যাডিনোসিন ট্রাইফসফেট (ATP)",
      "hi-IN": "एडेनोसिन ट्राइफॉस्फेट (ATP)",
      es: "Trifosfato de Adenosina (ATP)",
      fr: "Adénosine Triphosphate (ATP)",
    },
  },
  Ribosomes: {
    symbol: "Ribosomes",
    names: {
      en: "Ribosomes (Protein Machinery)",
      "bn-IN": "রাইবোজোম (Ribosomes)",
      "hi-IN": "राइबोसोम (Ribosomes)",
      es: "Ribosomas (Ribosomes)",
      fr: "Ribosomes (Ribosomes)",
    },
  },
  "ATP Synthase": {
    symbol: "ATP Synthase",
    names: {
      en: "ATP Synthase (Rotary Molecular Motor)",
      "bn-IN": "এটিপি সিন্থেস (ATP Synthase)",
      "hi-IN": "एटीपी सिंथेस (ATP Synthase)",
      es: "ATP Sintasa (ATP Synthase)",
      fr: "ATP Synthase (ATP Synthase)",
    },
  },
  Proteins: {
    symbol: "Proteins",
    names: {
      en: "Proteins (Functional Macromolecules)",
      "bn-IN": "প্রোটিন (Proteins)",
      "hi-IN": "प्रोटीन (Proteins)",
      es: "Proteínas (Proteins)",
      fr: "Protéines (Proteins)",
    },
  },
};

/**
 * Returns full format representation for an element or biomolecule
 */
export function getElementFullName(symbol: string, locale: Locale): string {
  const item = KEY_ELEMENTS_MAP[symbol] || KEY_ELEMENTS_MAP[symbol.trim()];
  if (!item) return symbol;

  return item.names[locale] || item.names.en || symbol;
}
