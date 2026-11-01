"use client";

import React from "react";
import type { QuizCategory, QuizDifficulty, LearningProgressState } from "@/types/quiz";
import { useLanguage } from "@/lib/i18n";

interface LearningDashboardProps {
  progress: LearningProgressState;
  selectedCategory: QuizCategory;
  selectedDifficulty: QuizDifficulty;
  onSelectCategory: (cat: QuizCategory) => void;
  onSelectDifficulty: (diff: QuizDifficulty) => void;
  onStartQuiz: () => void;
  onResetProgress: () => void;
}

export default function LearningDashboard({
  progress,
  selectedCategory,
  selectedDifficulty,
  onSelectCategory,
  onSelectDifficulty,
  onStartQuiz,
  onResetProgress,
}: LearningDashboardProps) {
  const { ui } = useLanguage();
  const tQuiz = ui.quiz;

  const categories: QuizCategory[] = [
    "evolution_knowledge",
    "taxonomy_classification",
    "fossil_identification",
    "geological_timeline",
    "cladistics_relationships",
  ];

  const difficulties: QuizDifficulty[] = ["beginner", "intermediate", "advanced"];

  // Category Icons & Badges
  const categoryIcons: Record<QuizCategory, string> = {
    evolution_knowledge: "🧬",
    taxonomy_classification: "🌳",
    fossil_identification: "🦴",
    geological_timeline: "⏳",
    cladistics_relationships: "🌿",
  };

  // Identify recommended category (lowest accuracy or fewest completed)
  const recommendedCategory = [...categories].sort((a, b) => {
    const accA = progress.bestScores[a]?.percentage || 0;
    const accB = progress.bestScores[b]?.percentage || 0;
    return accA - accB;
  })[0];

  return (
    <div className="space-y-6">
      {/* ── Key Metrics Overview ──────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-xl border border-white/10 bg-white/[0.03]">
          <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-tertiary)]">
            {tQuiz.totalCompleted}
          </div>
          <div className="text-2xl font-bold text-white mt-1">
            {progress.quizzesCompleted}
          </div>
        </div>

        <div className="p-3.5 rounded-xl border border-white/10 bg-white/[0.03]">
          <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-tertiary)]">
            {tQuiz.overallAccuracy}
          </div>
          <div className="text-2xl font-bold text-sky-400 mt-1">
            {progress.overallAccuracy}%
          </div>
        </div>

        <div className="p-3.5 rounded-xl border border-white/10 bg-white/[0.03]">
          <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-tertiary)]">
            {tQuiz.questionScore}
          </div>
          <div className="text-2xl font-bold text-emerald-400 mt-1">
            {progress.totalCorrect} / {progress.totalQuestionsAnswered}
          </div>
        </div>

        <div className="p-3.5 rounded-xl border border-white/10 bg-white/[0.03] flex flex-col justify-between">
          <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-tertiary)]">
            {tQuiz.resetProgress}
          </div>
          <button
            onClick={onResetProgress}
            className="text-xs text-rose-400 hover:text-rose-300 transition-colors font-medium text-left mt-1 cursor-pointer"
          >
            {tQuiz.resetProgress} ↺
          </button>
        </div>
      </div>

      {/* ── Topic / Category Selector ─────────────────────────── */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-widest text-white/90">
            {tQuiz.categorySelect}
          </h3>
          {recommendedCategory && (
            <button
              type="button"
              onClick={() => onSelectCategory(recommendedCategory)}
              className="text-[11px] text-amber-400 hover:text-amber-300 font-medium transition-all cursor-pointer flex items-center gap-1 bg-amber-400/10 hover:bg-amber-400/20 border border-amber-400/30 px-2 py-0.5 rounded-full"
              title={`${tQuiz.recommendedTopics}: ${tQuiz.categories[recommendedCategory]}`}
            >
              ★ {tQuiz.recommendedTopics}: {tQuiz.categories[recommendedCategory]}
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {categories.map((catKey) => {
            const isSelected = selectedCategory === catKey;
            const best = progress.bestScores[catKey] || { score: 0, total: 0, percentage: 0 };
            const completedCount = progress.completedCategories[catKey] || 0;

            return (
              <button
                type="button"
                key={catKey}
                onClick={() => onSelectCategory(catKey)}
                className={`p-3.5 rounded-xl text-left border transition-all cursor-pointer relative overflow-hidden ${
                  isSelected
                    ? "border-sky-500 bg-sky-500/15 shadow-[0_0_15px_rgba(56,189,248,0.2)] ring-1 ring-sky-500/50"
                    : "border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/20"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl select-none" aria-hidden="true">
                      {categoryIcons[catKey]}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-white">
                          {tQuiz.categories[catKey]}
                        </span>
                        {isSelected && (
                          <span className="text-[10px] font-bold text-sky-400 bg-sky-500/20 border border-sky-400/40 px-1.5 py-0.2 rounded leading-tight">
                            ✓
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-white/50 line-clamp-2 mt-0.5">
                        {tQuiz.categoryDescriptions[catKey]}
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-xs font-bold text-sky-400">
                      {best.percentage}%
                    </span>
                    <div className="text-[10px] text-white/40">
                      {completedCount} {tQuiz.totalCompleted.toLowerCase()}
                    </div>
                  </div>
                </div>

                {/* Progress bar inside card */}
                <div className="w-full bg-white/5 h-1 rounded-full mt-3 overflow-hidden">
                  <div
                    className="h-full bg-sky-400 transition-all duration-300"
                    style={{ width: `${best.percentage}%` }}
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Difficulty & Action Controls ──────────────────────── */}
      <div className="p-4 rounded-xl border border-white/10 bg-white/[0.03] space-y-4">
        <div>
          <label className="text-xs font-bold uppercase tracking-widest text-white/90 block mb-2">
            {tQuiz.difficultySelect}
          </label>
          <div className="grid grid-cols-3 gap-2">
            {difficulties.map((diff) => {
              const isSelected = selectedDifficulty === diff;
              return (
                <button
                  key={diff}
                  onClick={() => onSelectDifficulty(diff)}
                  className={`py-2 px-3 rounded-lg text-xs font-semibold capitalize border transition-all cursor-pointer ${
                    isSelected
                      ? "border-sky-400 bg-sky-500/20 text-white shadow-sm"
                      : "border-white/10 text-white/60 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {tQuiz.difficultyLevels[diff]}
                </button>
              );
            })}
          </div>
        </div>

        <button
          type="button"
          onClick={onStartQuiz}
          className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-sm tracking-wide shadow-lg shadow-sky-900/30 transition-all cursor-pointer flex items-center justify-center gap-2"
        >
          <span>🚀</span>
          <span>
            {tQuiz.startQuiz}: {tQuiz.categories[selectedCategory]} ({tQuiz.difficultyLevels[selectedDifficulty]})
          </span>
        </button>
      </div>

      {/* ── Recent Quiz History ───────────────────────────────── */}
      <div className="space-y-2.5">
        <h3 className="text-xs font-bold uppercase tracking-widest text-white/90">
          {tQuiz.recentQuizzes}
        </h3>
        {progress.recentResults.length === 0 ? (
          <p className="text-xs text-white/40 italic p-4 rounded-xl border border-white/5 bg-white/[0.01]">
            {tQuiz.noAttemptsYet}
          </p>
        ) : (
          <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
            {progress.recentResults.slice(0, 5).map((res, idx) => (
              <div
                key={idx}
                className="p-3 rounded-lg border border-white/5 bg-white/[0.02] flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2">
                  <span>{categoryIcons[res.category]}</span>
                  <div>
                    <span className="font-semibold text-white">
                      {tQuiz.categories[res.category]}
                    </span>
                    <span className="text-[10px] text-white/40 ml-2 capitalize">
                      ({tQuiz.difficultyLevels[res.difficulty]})
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-white/60">
                    {res.correctAnswers} / {res.totalQuestions}
                  </span>
                  <span
                    className={`font-bold ${
                      res.accuracy >= 80
                        ? "text-emerald-400"
                        : res.accuracy >= 50
                        ? "text-amber-400"
                        : "text-rose-400"
                    }`}
                  >
                    {res.accuracy}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

