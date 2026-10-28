// ============================================================
// Tree of Life — Internationalization Configuration
// Five supported locales: English (source), Bengali (West Bengal),
// Hindi (India), Spanish (neutral), French (neutral).
// ============================================================

export type Locale = "en" | "bn-IN" | "hi-IN" | "es" | "fr";

export interface LocaleMeta {
  code: Locale;
  name: string;        // English name
  nativeName: string;  // Native display name
  dir: "ltr" | "rtl";
  region: string;
}

export const SUPPORTED_LOCALES: Record<Locale, LocaleMeta> = {
  en: {
    code: "en",
    name: "English",
    nativeName: "English",
    dir: "ltr",
    region: "Global (Canonical)",
  },
  "bn-IN": {
    code: "bn-IN",
    name: "Bengali (West Bengal)",
    nativeName: "বাংলা",
    dir: "ltr",
    region: "West Bengal, India",
  },
  "hi-IN": {
    code: "hi-IN",
    name: "Hindi",
    nativeName: "हिन्दी",
    dir: "ltr",
    region: "India",
  },
  es: {
    code: "es",
    name: "Spanish",
    nativeName: "Español",
    dir: "ltr",
    region: "Internacional",
  },
  fr: {
    code: "fr",
    name: "French",
    nativeName: "Français",
    dir: "ltr",
    region: "International",
  },
};

export const LOCALES_LIST: LocaleMeta[] = Object.values(SUPPORTED_LOCALES);

export const DEFAULT_LOCALE: Locale = "en";
export const LOCALE_STORAGE_KEY = "tol_locale_preference";
export const LOCALE_COOKIE_NAME = "tol_locale";
