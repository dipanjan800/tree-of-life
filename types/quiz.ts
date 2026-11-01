// ============================================================
// Tree of Life — Interactive Learning & Quiz Domain Types
// Milestone 4: Typed question engine, categories, difficulties,
// question formats, and privacy-first local persistence.
// ============================================================

export type QuizCategory =
  | "evolution_knowledge"
  | "taxonomy_classification"
  | "fossil_identification"
  | "geological_timeline"
  | "cladistics_relationships";

export type QuizDifficulty = "beginner" | "intermediate" | "advanced";

export type QuestionFormat =
  | "multiple_choice"
  | "true_false"
  | "image_identification"
  | "timeline_ordering"
  | "classification_matching"
  | "cladogram_interpretation";

export interface MultipleChoiceOption {
  id: string;
  text: string;
}

export interface TimelineOrderingItem {
  id: string;
  label: string;
  ageMya: number;
}

export interface ClassificationMatchPair {
  id: string;
  taxonName: string;
  rank: string;
}

export interface QuizQuestion {
  id: string;
  category: QuizCategory;
  difficulty: QuizDifficulty;
  format: QuestionFormat;
  question: string;
  options?: MultipleChoiceOption[];
  correctAnswer: string | boolean | string[]; // string for MC, boolean for TF, string[] for ordered items or match keys
  explanation: string;
  scientificSource: string;
  supportingTaxonId?: string;
  supportingClaimId?: string;
  imageUrl?: string;
  imageAlt?: string;
  imageAttribution?: string;
  misconceptionClarification?: string;
  timelineItems?: TimelineOrderingItem[]; // For timeline_ordering format
  matchPairs?: ClassificationMatchPair[]; // For classification_matching format
}

export interface UserQuizAttempt {
  questionId: string;
  userAnswer: string | boolean | string[];
  isCorrect: boolean;
  timestamp: number;
}

export interface QuizResultSummary {
  category: QuizCategory;
  difficulty: QuizDifficulty;
  totalQuestions: number;
  correctAnswers: number;
  accuracy: number;
  completedAt: number;
  attempts: UserQuizAttempt[];
}

export interface LearningProgressState {
  version: number;
  quizzesCompleted: number;
  totalQuestionsAnswered: number;
  totalCorrect: number;
  overallAccuracy: number;
  bestScores: Record<QuizCategory, { score: number; total: number; percentage: number }>;
  recentResults: QuizResultSummary[];
  completedCategories: Record<QuizCategory, number>;
  lastActive: number;
}

