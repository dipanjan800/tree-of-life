import type { Locale } from "../config";
import type { TranslationDictionary } from "../types";
import { enDictionary } from "./en";
import { bnINDictionary } from "./bn-IN";
import { hiINDictionary } from "./hi-IN";
import { esDictionary } from "./es";
import { frDictionary } from "./fr";

export const DICTIONARIES: Record<Locale, TranslationDictionary> = {
  en: enDictionary,
  "bn-IN": bnINDictionary,
  "hi-IN": hiINDictionary,
  es: esDictionary,
  fr: frDictionary,
};

export { enDictionary, bnINDictionary, hiINDictionary, esDictionary, frDictionary };
export * from "./ui";
export * from "./taxa";
export * from "./story";
export * from "./prebiotic";
export * from "./claims";
