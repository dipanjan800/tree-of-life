import type { TranslationDictionary } from "../types";
import { uiTranslations } from "./ui";
import { taxaFR } from "./taxa";
import { storyFR } from "./story";
import { prebioticFR } from "./prebiotic";
import { claimsFR } from "./claims";

export const frDictionary: TranslationDictionary = {
  locale: "fr",
  ui: uiTranslations.fr,
  taxa: taxaFR,
  storyStages: storyFR,
  prebioticStages: prebioticFR,
  claims: claimsFR,
};
