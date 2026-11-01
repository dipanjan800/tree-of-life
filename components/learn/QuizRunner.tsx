"use client";

import React, { useState, useRef } from "react";
import type { QuizQuestion, UserQuizAttempt } from "@/types/quiz";
import { useLanguage } from "@/lib/i18n";

interface QuizRunnerProps {
  questions: QuizQuestion[];
  onCompleteQuiz: (attempts: UserQuizAttempt[]) => void;
  onExit: () => void;
}

export default function QuizRunner({
  questions,
  onCompleteQuiz,
  onExit,
}: QuizRunnerProps) {
  const { ui } = useLanguage();
  const tQuiz = ui.quiz;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | boolean | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [, setAttempts] = useState<UserQuizAttempt[]>([]);
  const attemptsRef = useRef<UserQuizAttempt[]>([]);

  // Safe handling of empty or uninitialized question lists
  if (!questions || questions.length === 0) {
    return (
      <div className="p-8 text-center text-white/70 space-y-4">
        <p className="text-sm font-medium">
          {tQuiz.noAttemptsYet}
        </p>
        <button
          type="button"
          onClick={onExit}
          className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors cursor-pointer"
        >
          {ui.common.close}
        </button>
      </div>
    );
  }

  const currentQ = questions[currentIndex];
  if (!currentQ) return null;

  const categoryIcons: Record<string, string> = {
    evolution_knowledge: "🧬",
    taxonomy_classification: "🌳",
    fossil_identification: "🦴",
    geological_timeline: "⏳",
    cladistics_relationships: "🌿",
  };

  const isLastQuestion = currentIndex === questions.length - 1;
  const isCurrentCorrect = isSubmitted && selectedAnswer === currentQ.correctAnswer;

  const handleSubmit = () => {
    if (selectedAnswer === null || isSubmitted) return;

    const isCorrect = selectedAnswer === currentQ.correctAnswer;
    const attempt: UserQuizAttempt = {
      questionId: currentQ.id,
      userAnswer: selectedAnswer,
      isCorrect,
      timestamp: Date.now(),
    };

    attemptsRef.current = [...attemptsRef.current, attempt];
    setAttempts(attemptsRef.current);
    setIsSubmitted(true);
  };

  const handleNext = () => {
    if (isLastQuestion) {
      onCompleteQuiz(attemptsRef.current);
    } else {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsSubmitted(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* ── Top Runner Bar: Counter, Category, Difficulty & Exit ─────────── */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10 gap-2 flex-wrap">
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
            {tQuiz.questionCounter} {currentIndex + 1} / {questions.length}
          </span>
          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide bg-sky-500/20 text-sky-300 border border-sky-500/30 flex items-center gap-1">
            <span>{categoryIcons[currentQ.category] || "🔬"}</span>
            <span>{tQuiz.categories[currentQ.category]}</span>
          </span>
          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide bg-white/10 text-white/70">
            {tQuiz.difficultyLevels[currentQ.difficulty]}
          </span>
        </div>

        <button
          type="button"
          onClick={onExit}
          className="text-xs text-white/50 hover:text-white transition-colors cursor-pointer"
          aria-label={ui.common.close}
        >
          ✕ {ui.common.close}
        </button>
      </div>

      {/* ── Progress Bar ───────────────────────────────────────── */}
      <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
        <div
          className="h-full bg-sky-500 transition-all duration-300"
          style={{ width: `${((currentIndex + (isSubmitted ? 1 : 0)) / questions.length) * 100}%` }}
        />
      </div>

      {/* ── Question Statement ─────────────────────────────────── */}
      <div className="space-y-3">
        <h3 className="text-base sm:text-lg font-semibold text-white leading-relaxed">
          {currentQ.question}
        </h3>

        {/* Optional Image */}
        {currentQ.imageUrl && (
          <div className="rounded-xl overflow-hidden border border-white/10 max-h-64 bg-black/40 flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={currentQ.imageUrl}
              alt={currentQ.imageAlt || currentQ.question}
              className="max-h-64 object-contain"
            />
          </div>
        )}
      </div>

      {/* ── Answer Interaction Area ────────────────────────────── */}
      <div className="space-y-2.5">
        <div className="text-xs text-white/60 mb-1">
          {tQuiz.selectPrompt}
        </div>

        {/* Multiple Choice Options */}
        {currentQ.format === "multiple_choice" && currentQ.options && (
          <div className="grid grid-cols-1 gap-2.5">
            {currentQ.options.map((opt) => {
              const isSelected = selectedAnswer === opt.id;
              const isCorrectAnswer = currentQ.correctAnswer === opt.id;

              let btnStyle = "border-white/10 bg-white/[0.02] hover:bg-white/[0.04] text-white/80";

              if (isSubmitted) {
                if (isCorrectAnswer) {
                  btnStyle = "border-emerald-500 bg-emerald-500/20 text-emerald-200 font-semibold";
                } else if (isSelected && !isCorrectAnswer) {
                  btnStyle = "border-rose-500 bg-rose-500/20 text-rose-200 line-through";
                } else {
                  btnStyle = "border-white/5 bg-white/[0.01] text-white/30";
                }
              } else if (isSelected) {
                btnStyle = "border-sky-400 bg-sky-500/20 text-white font-semibold shadow-sm";
              }

              return (
                <button
                  type="button"
                  key={opt.id}
                  disabled={isSubmitted}
                  onClick={() => setSelectedAnswer(opt.id)}
                  className={`p-3.5 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between gap-3 ${btnStyle} ${isSubmitted ? "cursor-default" : "cursor-pointer"
                    }`}
                >
                  <span>{opt.text}</span>
                  {isSubmitted && isCorrectAnswer && (
                    <span className="text-emerald-400 font-bold" aria-hidden="true">✓</span>
                  )}
                  {isSubmitted && isSelected && !isCorrectAnswer && (
                    <span className="text-rose-400 font-bold" aria-hidden="true">✕</span>
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* True / False Options */}
        {currentQ.format === "true_false" && (
          <div className="grid grid-cols-2 gap-3">
            {[true, false].map((val) => {
              const isSelected = selectedAnswer === val;
              const isCorrectAnswer = currentQ.correctAnswer === val;

              let btnStyle = "border-white/10 bg-white/[0.02] hover:bg-white/[0.04] text-white/80";

              if (isSubmitted) {
                if (isCorrectAnswer) {
                  btnStyle = "border-emerald-500 bg-emerald-500/20 text-emerald-200 font-semibold";
                } else if (isSelected && !isCorrectAnswer) {
                  btnStyle = "border-rose-500 bg-rose-500/20 text-rose-200";
                } else {
                  btnStyle = "border-white/5 bg-white/[0.01] text-white/30";
                }
              } else if (isSelected) {
                btnStyle = "border-sky-400 bg-sky-500/20 text-white font-semibold";
              }

              return (
                <button
                  type="button"
                  key={String(val)}
                  disabled={isSubmitted}
                  onClick={() => setSelectedAnswer(val)}
                  className={`py-3.5 px-4 rounded-xl border text-center font-bold text-sm transition-all ${btnStyle} ${isSubmitted ? "cursor-default" : "cursor-pointer"
                    }`}
                >
                  {val ? tQuiz.trueLabel : tQuiz.falseLabel}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* ── Submit / Feedback & Next Action ───────────────────── */}
      {!isSubmitted ? (
        <button
          type="button"
          disabled={selectedAnswer === null}
          onClick={handleSubmit}
          className={`w-full py-3 px-4 rounded-xl font-bold text-sm tracking-wide transition-all ${selectedAnswer !== null
            ? "bg-sky-500 hover:bg-sky-400 text-white cursor-pointer shadow-lg shadow-sky-900/30"
            : "bg-white/5 text-white/30 border border-white/5 cursor-not-allowed"
            }`}
        >
          {tQuiz.submitAnswer}
        </button>
      ) : (
        <div className="space-y-4 animate-fade-in">
          {/* Feedback Banner */}
          <div
            className={`p-4 rounded-xl border flex items-start gap-3 ${isCurrentCorrect
              ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300"
              : "border-rose-500/40 bg-rose-500/10 text-rose-300"
              }`}
          >
            <span className="text-xl" aria-hidden="true">{isCurrentCorrect ? "✅" : "⚠️"}</span>
            <div>
              <div className="font-bold text-sm">
                {isCurrentCorrect ? tQuiz.correctFeedback : tQuiz.incorrectFeedback}
              </div>
            </div>
          </div>

          {/* Scientific Explanation & Misconception Breakdown */}
          <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02] space-y-3">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-sky-400 mb-1">
                {tQuiz.explanationHeading}
              </div>
              <p className="text-xs sm:text-sm text-white/85 leading-relaxed font-light">
                {currentQ.explanation}
              </p>
            </div>

            {currentQ.misconceptionClarification && (
              <div className="pt-2 border-t border-white/5">
                <div className="text-[10px] font-bold uppercase tracking-wider text-amber-400 mb-0.5">
                  💡 {tQuiz.misconceptionHeading}
                </div>
                <p className="text-xs text-amber-200/80 leading-relaxed italic">
                  {currentQ.misconceptionClarification}
                </p>
              </div>
            )}

            {currentQ.scientificSource && (
              <div className="pt-2 border-t border-white/5 text-[10px] text-white/40">
                <span className="font-semibold">{tQuiz.scientificSourceLabel}:</span>{" "}
                <span>{currentQ.scientificSource}</span>
              </div>
            )}
          </div>

          {/* Advance Action Button */}
          <button
            type="button"
            onClick={handleNext}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-sm tracking-wide shadow-lg shadow-sky-900/30 transition-all cursor-pointer"
          >
            {isLastQuestion ? tQuiz.finishQuiz : `${tQuiz.nextQuestion} →`}
          </button>
        </div>
      )}
    </div>
  );
}
