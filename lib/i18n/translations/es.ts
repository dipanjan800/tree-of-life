import type { TranslationDictionary } from "../types";
import { uiTranslations } from "./ui";
import { taxaES } from "./taxa";
import { storyES } from "./story";
import { prebioticES } from "./prebiotic";

export const esDictionary: TranslationDictionary = {
  locale: "es",
  ui: uiTranslations.es,
  taxa: taxaES,
  storyStages: storyES,
  prebioticStages: prebioticES,
};
