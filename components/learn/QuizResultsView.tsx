"use client";

import React from "react";
import type { QuizResultSummary, QuizQuestion } from "@/types/quiz";
import { useLanguage } from "@/lib/i18n";

interface QuizResultsViewProps {
  summary: QuizResultSummary;
  questions: QuizQuestion[];
  onRetry: () => void;
  onDashboard: () => void;
}

export default function QuizResultsView({
  summary,
  questions,
  onRetry,
  onDashboard,
}: QuizResultsViewProps) {
  const { ui } = useLanguage();
  const tQuiz = ui.quiz;

  const isFlawless = summary.accuracy === 100;
  const isPassing = summary.accuracy >= 60;

  // Build a lookup map for question details
  const qMap = new Map(questions.map((q) => [q.id, q]));

  return (
    <div className="space-y-6">
      {/* ── Results Banner ────────────────────────────────────── */}
      <div className="p-6 rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent text-center space-y-3">
        <div className="text-4xl select-none" aria-hidden="true">
          {isFlawless ? "🏆" : isPassing ? "🎓" : "🔬"}
        </div>

        <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          {tQuiz.resultsTitle}
        </h3>

        <div className="inline-flex items-baseline gap-1.5 px-4 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20">
          <span className="text-3xl font-extrabold text-sky-400">
            {summary.correctAnswers} / {summary.totalQuestions}
          </span>
          <span className="text-sm font-semibold text-sky-300/80">
            ({summary.accuracy}%)
          </span>
        </div>

        {isFlawless && (
          <p className="text-xs text-emerald-300 font-medium max-w-md mx-auto">
            {tQuiz.allCorrectCongratulations}
          </p>
        )}
      </div>

      {/* ── Action Buttons ────────────────────────────────────── */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={onRetry}
          className="py-3 px-4 rounded-xl border border-sky-500/40 bg-sky-500/10 hover:bg-sky-500/20 text-sky-300 font-bold text-xs sm:text-sm tracking-wide transition-all cursor-pointer flex items-center justify-center gap-2"
        >
          <span>↺</span>
          <span>{tQuiz.retryQuiz}</span>
        </button>

        <button
          onClick={onDashboard}
          className="py-3 px-4 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-xs sm:text-sm tracking-wide shadow-lg shadow-sky-900/30 transition-all cursor-pointer flex items-center justify-center gap-2"
        >
          <span>📊</span>
          <span>{tQuiz.returnToDashboard}</span>
        </button>
      </div>

      {/* ── Question Review Section ───────────────────────────── */}
      <div className="space-y-3 pt-4 border-t border-white/10">
        <h4 className="text-xs font-bold uppercase tracking-widest text-white/90">
          {tQuiz.reviewHeading}
        </h4>

        <div className="space-y-3">
          {summary.attempts.map((att, idx) => {
            const q = qMap.get(att.questionId);
            if (!q) return null;

            // Resolve human-readable text for options
            let userAnsText = String(att.userAnswer);
            let correctAnsText = String(q.correctAnswer);

            if (q.format === "multiple_choice" && q.options) {
              const userOpt = q.options.find((o) => o.id === att.userAnswer);
              const corrOpt = q.options.find((o) => o.id === q.correctAnswer);
              if (userOpt) userAnsText = userOpt.text;
              if (corrOpt) correctAnsText = corrOpt.text;
            } else if (q.format === "true_false") {
              userAnsText = att.userAnswer ? tQuiz.trueLabel : tQuiz.falseLabel;
              correctAnsText = q.correctAnswer ? tQuiz.trueLabel : tQuiz.falseLabel;
            }

            return (
              <div
                key={att.questionId}
                className={`p-4 rounded-xl border text-xs space-y-2 transition-all ${
                  att.isCorrect
                    ? "border-white/10 bg-white/[0.015]"
                    : "border-rose-500/30 bg-rose-500/[0.03]"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2 text-white font-medium">
                    <span className="shrink-0 mt-0.5 font-bold text-white/40">
                      {idx + 1}.
                    </span>
                    <span>{q.question}</span>
                  </div>
                  <span className="shrink-0 font-bold text-sm">
                    {att.isCorrect ? "✅" : "❌"}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] pt-1">
                  <div className="p-2 rounded-lg bg-white/[0.02] border border-white/5">
                    <span className="text-white/40 uppercase font-bold text-[9px] block">
                      {tQuiz.yourAnswer}:
                    </span>
                    <span
                      className={`font-semibold ${
                        att.isCorrect ? "text-emerald-400" : "text-rose-400"
                      }`}
                    >
                      {userAnsText}
                    </span>
                  </div>

                  <div className="p-2 rounded-lg bg-white/[0.02] border border-white/5">
                    <span className="text-white/40 uppercase font-bold text-[9px] block">
                      {tQuiz.correctAnswerLabel}:
                    </span>
                    <span className="text-emerald-300 font-semibold">
                      {correctAnsText}
                    </span>
                  </div>
                </div>

                {/* Explanation */}
                <div className="pt-2 text-white/70 leading-relaxed font-light text-[11px]">
                  {q.explanation}
                </div>

                {q.misconceptionClarification && (
                  <div className="text-[10px] text-amber-300/80 italic pt-1">
                    💡 {q.misconceptionClarification}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

