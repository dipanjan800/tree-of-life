import type { TranslationDictionary } from "../types";
import { uiTranslations } from "./ui";
import { taxaEN } from "./taxa";
import { storyEN } from "./story";
import { prebioticEN } from "./prebiotic";
import { claimsEN } from "./claims";

export const enDictionary: TranslationDictionary = {
  locale: "en",
  ui: uiTranslations.en,
  taxa: taxaEN,
  storyStages: storyEN,
  prebioticStages: prebioticEN,
  claims: claimsEN,
};
