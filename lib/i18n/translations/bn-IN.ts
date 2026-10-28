import type { TranslationDictionary } from "../types";
import { uiTranslations } from "./ui";
import { taxaBN } from "./taxa";
import { storyBN } from "./story";
import { prebioticBN } from "./prebiotic";

export const bnINDictionary: TranslationDictionary = {
  locale: "bn-IN",
  ui: uiTranslations["bn-IN"],
  taxa: taxaBN,
  storyStages: storyBN,
  prebioticStages: prebioticBN,
};
