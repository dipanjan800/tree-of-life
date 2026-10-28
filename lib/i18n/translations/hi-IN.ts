import type { TranslationDictionary } from "../types";
import { uiTranslations } from "./ui";
import { taxaHI } from "./taxa";
import { storyHI } from "./story";
import { prebioticHI } from "./prebiotic";

export const hiINDictionary: TranslationDictionary = {
  locale: "hi-IN",
  ui: uiTranslations["hi-IN"],
  taxa: taxaHI,
  storyStages: storyHI,
  prebioticStages: prebioticHI,
};
