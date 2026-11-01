// ============================================================
// Tree of Life — Local Learning Progress Storage Service
// Privacy-First Progress Tracking: 100% Client-Side Storage
// Zero external tracking, zero cloud telemetry, schema-versioned.
// ============================================================

import type { LearningProgressState, QuizResultSummary } from "@/types/quiz";

const STORAGE_KEY = "tree_of_life_learning_progress_v1";
const CURRENT_VERSION = 1;

export const INITIAL_PROGRESS_STATE: LearningProgressState = {
  version: CURRENT_VERSION,
  quizzesCompleted: 0,
  totalQuestionsAnswered: 0,
  totalCorrect: 0,
  overallAccuracy: 0,
  bestScores: {
    evolution_knowledge: { score: 0, total: 0, percentage: 0 },
    taxonomy_classification: { score: 0, total: 0, percentage: 0 },
    fossil_identification: { score: 0, total: 0, percentage: 0 },
    geological_timeline: { score: 0, total: 0, percentage: 0 },
    cladistics_relationships: { score: 0, total: 0, percentage: 0 },
  },
  recentResults: [],
  completedCategories: {
    evolution_knowledge: 0,
    taxonomy_classification: 0,
    fossil_identification: 0,
    geological_timeline: 0,
    cladistics_relationships: 0,
  },
  lastActive: Date.now(),
};

let memoryProgressState: LearningProgressState = { ...INITIAL_PROGRESS_STATE };

/**
 * Safely load learning progress from localStorage (with memory fallback).
 */
export function loadLearningProgress(): LearningProgressState {
  if (typeof window === "undefined") {
    return memoryProgressState;
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL_PROGRESS_STATE;
    const parsed = JSON.parse(raw);
    if (parsed.version !== CURRENT_VERSION) {
      return INITIAL_PROGRESS_STATE;
    }
    return {
      ...INITIAL_PROGRESS_STATE,
      ...parsed,
      bestScores: {
        ...INITIAL_PROGRESS_STATE.bestScores,
        ...(parsed.bestScores || {}),
      },
      completedCategories: {
        ...INITIAL_PROGRESS_STATE.completedCategories,
        ...(parsed.completedCategories || {}),
      },
    };
  } catch (e) {
    console.warn("Failed to load learning progress from localStorage:", e);
    return INITIAL_PROGRESS_STATE;
  }
}

/**
 * Record a newly completed quiz session into persistent state.
 */
export function recordQuizCompletion(result: QuizResultSummary): LearningProgressState {
  const current = loadLearningProgress();

  const totalAnswered = current.totalQuestionsAnswered + result.totalQuestions;
  const totalCorrect = current.totalCorrect + result.correctAnswers;
  const overallAccuracy = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;

  const prevBest = current.bestScores[result.category] || { score: 0, total: 0, percentage: 0 };
  const newPercentage = result.totalQuestions > 0 ? Math.round((result.correctAnswers / result.totalQuestions) * 100) : 0;
  const updatedBest = newPercentage > prevBest.percentage
    ? { score: result.correctAnswers, total: result.totalQuestions, percentage: newPercentage }
    : prevBest;

  const updatedRecent = [result, ...current.recentResults].slice(0, 10);

  const updatedCategories = {
    ...current.completedCategories,
    [result.category]: (current.completedCategories[result.category] || 0) + 1,
  };

  const updatedState: LearningProgressState = {
    version: CURRENT_VERSION,
    quizzesCompleted: current.quizzesCompleted + 1,
    totalQuestionsAnswered: totalAnswered,
    totalCorrect: totalCorrect,
    overallAccuracy: overallAccuracy,
    bestScores: {
      ...current.bestScores,
      [result.category]: updatedBest,
    },
    recentResults: updatedRecent,
    completedCategories: updatedCategories,
    lastActive: Date.now(),
  };

  memoryProgressState = updatedState;

  try {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedState));
    }
  } catch (e) {
    console.warn("Failed to save learning progress to localStorage:", e);
  }

  return updatedState;
}

/**
 * Reset all user learning progress to blank slate.
 */
export function resetLearningProgress(): LearningProgressState {
  memoryProgressState = { ...INITIAL_PROGRESS_STATE };
  try {
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEY);
    }
  } catch (e) {
    console.warn("Failed to reset learning progress:", e);
  }
  return INITIAL_PROGRESS_STATE;
}

