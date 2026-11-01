"use client";

import React, { useState, useEffect, useCallback } from "react";
import type { QuizCategory, QuizDifficulty, UserQuizAttempt, QuizResultSummary } from "@/types/quiz";
import {
  loadLearningProgress,
  recordQuizCompletion,
  resetLearningProgress,
  INITIAL_PROGRESS_STATE,
} from "@/data/quiz/progress-storage";
import { getQuestionsForQuiz } from "@/data/quiz/curriculum";
import { useLanguage } from "@/lib/i18n";
import LearningDashboard from "./LearningDashboard";
import QuizRunner from "./QuizRunner";
import QuizResultsView from "./QuizResultsView";

interface LearningModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type ModalView = "dashboard" | "runner" | "results";

export default function LearningModal({ isOpen, onClose }: LearningModalProps) {
  const { ui } = useLanguage();
  const tQuiz = ui.quiz;

  const [currentView, setCurrentView] = useState<ModalView>("dashboard");
  const [progress, setProgress] = useState(INITIAL_PROGRESS_STATE);
  const [selectedCategory, setSelectedCategory] = useState<QuizCategory>("evolution_knowledge");
  const [selectedDifficulty, setSelectedDifficulty] = useState<QuizDifficulty>("intermediate");
  const [activeQuestions, setActiveQuestions] = useState(getQuestionsForQuiz("evolution_knowledge", "intermediate"));
  const [latestSummary, setLatestSummary] = useState<QuizResultSummary | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);

  // Sync state when modal transitions from closed to open
  if (isOpen !== prevIsOpen) {
    setPrevIsOpen(isOpen);
    if (isOpen) {
      setProgress(loadLearningProgress());
      setCurrentView("dashboard");
      setShowResetConfirm(false);
    }
  }

  // Keyboard navigation: Escape closes modal
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (showResetConfirm) {
          setShowResetConfirm(false);
        } else if (currentView === "runner") {
          setCurrentView("dashboard");
        } else {
          onClose();
        }
      }
    },
    [onClose, currentView, showResetConfirm]
  );

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  // Actions
  const handleStartQuiz = (category?: QuizCategory, difficulty?: QuizDifficulty) => {
    const cat = category ?? selectedCategory;
    const diff = difficulty ?? selectedDifficulty;
    if (category) setSelectedCategory(category);
    if (difficulty) setSelectedDifficulty(difficulty);
    const qList = getQuestionsForQuiz(cat, diff);
    setActiveQuestions(qList);
    setCurrentView("runner");
  };

  const handleCompleteQuiz = (attempts: UserQuizAttempt[]) => {
    const total = attempts.length;
    const correct = attempts.filter((a) => a.isCorrect).length;
    const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;

    // Use current active questions to reliably determine category and difficulty
    const activeCategory = activeQuestions[0]?.category || selectedCategory;
    const activeDifficulty = activeQuestions[0]?.difficulty || selectedDifficulty;

    const summary: QuizResultSummary = {
      category: activeCategory,
      difficulty: activeDifficulty,
      totalQuestions: total,
      correctAnswers: correct,
      accuracy,
      completedAt: Date.now(),
      attempts,
    };

    const updatedProgress = recordQuizCompletion(summary);
    setProgress(updatedProgress);
    setLatestSummary(summary);
    setCurrentView("results");
  };

  const handleResetProgress = () => {
    resetLearningProgress();
    setProgress(INITIAL_PROGRESS_STATE);
    setShowResetConfirm(false);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="learning-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-fade-in"
    >
      <div
        className="relative w-full max-w-3xl max-h-[92vh] flex flex-col rounded-2xl border border-white/10 bg-[rgba(10,15,24,0.96)] shadow-2xl overflow-hidden"
        style={{
          boxShadow: "0 24px 64px rgba(0, 0, 0, 0.8), 0 0 32px rgba(56, 189, 248, 0.1)",
        }}
      >
        {/* ── Modal Header ──────────────────────────────────────── */}
        <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between gap-4 shrink-0 bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <span className="text-2xl select-none" aria-hidden="true">
              🎓
            </span>
            <div>
              <h2
                id="learning-modal-title"
                className="text-base sm:text-lg font-bold text-white tracking-tight leading-tight"
              >
                {tQuiz.title}
              </h2>
              <p className="text-[11px] text-white/50 hidden sm:block">
                {tQuiz.subtitle}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label={tQuiz.closeAria}
            className="p-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all cursor-pointer"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M2 2l10 10M12 2L2 12"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* ── Modal Body (Scrollable) ───────────────────────────── */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 no-scrollbar">
          {currentView === "dashboard" && (
            <LearningDashboard
              progress={progress}
              selectedCategory={selectedCategory}
              selectedDifficulty={selectedDifficulty}
              onSelectCategory={setSelectedCategory}
              onSelectDifficulty={setSelectedDifficulty}
              onStartQuiz={() => handleStartQuiz(selectedCategory, selectedDifficulty)}
              onResetProgress={() => setShowResetConfirm(true)}
            />
          )}

          {currentView === "runner" && (
            <QuizRunner
              questions={activeQuestions}
              onCompleteQuiz={handleCompleteQuiz}
              onExit={() => setCurrentView("dashboard")}
            />
          )}

          {currentView === "results" && latestSummary && (
            <QuizResultsView
              summary={latestSummary}
              questions={activeQuestions}
              onRetry={() => handleStartQuiz(latestSummary.category, latestSummary.difficulty)}
              onDashboard={() => setCurrentView("dashboard")}
            />
          )}
        </div>

        {/* ── Reset Confirmation Modal Overlay ──────────────────── */}
        {showResetConfirm && (
          <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="max-w-md w-full p-5 rounded-2xl border border-rose-500/40 bg-zinc-950 text-center space-y-4 shadow-2xl">
              <div className="text-3xl">⚠️</div>
              <h4 className="text-base font-bold text-white">
                {tQuiz.resetConfirmTitle}
              </h4>
              <p className="text-xs text-white/70 leading-relaxed font-light">
                {tQuiz.resetConfirmDesc}
              </p>
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="py-2.5 px-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white/80 font-semibold text-xs transition-colors cursor-pointer"
                >
                  {tQuiz.cancelBtn}
                </button>
                <button
                  onClick={handleResetProgress}
                  className="py-2.5 px-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition-colors cursor-pointer"
                >
                  {tQuiz.resetConfirmBtn}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
