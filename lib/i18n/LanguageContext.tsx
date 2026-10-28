"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";
import {
  type Locale,
  SUPPORTED_LOCALES,
  DEFAULT_LOCALE,
  LOCALE_STORAGE_KEY,
  LOCALE_COOKIE_NAME,
} from "./config";
import type {
  TranslationDictionary,
  UIStrings,
  LocalizedTaxon,
  LocalizedStoryStage,
  LocalizedPrebioticStage,
} from "./types";
import { DICTIONARIES, enDictionary } from "./translations";
import type { TaxonNode } from "@/types/taxonomy";
import type { StoryStage } from "@/data/story";
import type { PrebioticStage } from "@/data/prebiotic";

interface LanguageContextType {
  locale: Locale;
  setLocale: (newLocale: Locale) => void;
  t: (path: string, fallback?: string) => string;
  dict: TranslationDictionary;
  ui: UIStrings;
  localizeTaxon: (node: TaxonNode | null | undefined) => LocalizedTaxon | null;
  localizeStoryStage: (stage: StoryStage | null | undefined) => LocalizedStoryStage | null;
  localizePrebioticStage: (stage: PrebioticStage | null | undefined) => LocalizedPrebioticStage | null;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

function getInitialLocale(): Locale {
  if (typeof window === "undefined") return DEFAULT_LOCALE;

  try {
    // 1. Check URL query param ?lang= if present
    const params = new URLSearchParams(window.location.search);
    const queryLang = params.get("lang") as Locale | null;
    if (queryLang && queryLang in SUPPORTED_LOCALES) {
      return queryLang;
    }

    // 2. Check localStorage
    const saved = localStorage.getItem(LOCALE_STORAGE_KEY) as Locale | null;
    if (saved && saved in SUPPORTED_LOCALES) {
      return saved;
    }

    // 3. Check Cookie
    const match = document.cookie.match(new RegExp("(^| )" + LOCALE_COOKIE_NAME + "=([^;]+)"));
    if (match) {
      const cookieVal = decodeURIComponent(match[2]) as Locale;
      if (cookieVal in SUPPORTED_LOCALES) {
        return cookieVal;
      }
    }

    // 4. Check navigator.language prefix match
    const nav = navigator.language?.toLowerCase() || "";
    if (nav.startsWith("bn")) return "bn-IN";
    if (nav.startsWith("hi")) return "hi-IN";
    if (nav.startsWith("es")) return "es";
    if (nav.startsWith("fr")) return "fr";
  } catch {
    // Ignore storage/cookie access errors
  }

  return DEFAULT_LOCALE;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);
  const [mounted, setMounted] = useState(false);

  // Read initial locale on client mount
  useEffect(() => {
    const init = getInitialLocale();
    setLocaleState(init);
    setMounted(true);

    // Apply document lang and dir
    if (typeof document !== "undefined") {
      document.documentElement.lang = init;
      document.documentElement.dir = SUPPORTED_LOCALES[init]?.dir || "ltr";
    }
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    if (!(newLocale in SUPPORTED_LOCALES)) return;
    setLocaleState(newLocale);

    try {
      localStorage.setItem(LOCALE_STORAGE_KEY, newLocale);
      document.cookie = `${LOCALE_COOKIE_NAME}=${encodeURIComponent(
        newLocale
      )}; path=/; max-age=31536000; SameSite=Lax`;
    } catch {
      // Ignore storage restrictions
    }

    if (typeof document !== "undefined") {
      document.documentElement.lang = newLocale;
      document.documentElement.dir = SUPPORTED_LOCALES[newLocale]?.dir || "ltr";
    }
  }, []);

  const dict = useMemo<TranslationDictionary>(() => {
    return DICTIONARIES[locale] || enDictionary;
  }, [locale]);

  const ui = dict.ui;

  // t('hero.mainTitle1')
  const t = useCallback(
    (keyPath: string, fallback?: string): string => {
      const parts = keyPath.split(".");
      let current: any = dict.ui;
      for (const p of parts) {
        if (current && typeof current === "object" && p in current) {
          current = current[p];
        } else {
          current = undefined;
          break;
        }
      }

      if (typeof current === "string") return current;

      // Fallback to English dictionary
      let enCurrent: any = enDictionary.ui;
      for (const p of parts) {
        if (enCurrent && typeof enCurrent === "object" && p in enCurrent) {
          enCurrent = enCurrent[p];
        } else {
          enCurrent = undefined;
          break;
        }
      }

      if (typeof enCurrent === "string") return enCurrent;
      return fallback !== undefined ? fallback : keyPath;
    },
    [dict]
  );

  const localizeTaxon = useCallback(
    (node: TaxonNode | null | undefined): LocalizedTaxon | null => {
      if (!node) return null;
      const localized = dict.taxa[node.id];
      if (localized) return localized;

      const fallback = enDictionary.taxa[node.id];
      if (fallback) return fallback;

      return {
        id: node.id,
        name: node.name,
        description: node.description,
        confidenceNotes: node.confidenceNotes,
        commonNames: [node.name],
      };
    },
    [dict]
  );

  const localizeStoryStage = useCallback(
    (stage: StoryStage | null | undefined): LocalizedStoryStage | null => {
      if (!stage) return null;
      const localized = dict.storyStages[stage.id];
      if (localized) return localized;

      const fallback = enDictionary.storyStages[stage.id];
      if (fallback) return fallback;

      return {
        id: stage.id,
        title: stage.title,
        subtitle: stage.subtitle,
        timeRange: stage.timeRange,
        eonOrEra: stage.eonOrEra,
        narrativeParagraphs: stage.narrativeParagraphs,
        keyMilestones: stage.keyMilestones || [],
        scientificNotes: stage.scientificNotes || [],
      };
    },
    [dict]
  );

  const localizePrebioticStage = useCallback(
    (stage: PrebioticStage | null | undefined): LocalizedPrebioticStage | null => {
      if (!stage) return null;
      const localized = dict.prebioticStages[stage.id];
      if (localized) return localized;

      const fallback = enDictionary.prebioticStages[stage.id];
      if (fallback) return fallback;

      return {
        id: stage.id,
        stageNumber: stage.stageNumber,
        title: stage.title,
        subtitle: stage.subtitle,
        timeRangeDisplay: stage.timeRangeDisplay,
        statusLabel: stage.statusLabel,
        narrativeOverview: stage.narrativeOverview,
        empiricalEvidence: stage.empiricalEvidence || [],
        uncertaintyNotes: stage.uncertaintyNotes || [],
        certitudeNote: "Established consensus or active hypothesis.",
      };
    },
    [dict]
  );

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      t,
      dict,
      ui,
      localizeTaxon,
      localizeStoryStage,
      localizePrebioticStage,
    }),
    [locale, setLocale, t, dict, ui, localizeTaxon, localizeStoryStage, localizePrebioticStage]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
