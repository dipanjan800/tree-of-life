"use client";

import React, { useState, useEffect, useCallback, useSyncExternalStore } from "react";
import { STORY_STAGES, type StoryStage } from "@/data/story";
import StageArtwork from "./StageArtwork";
import LanguageSelector from "@/components/ui/LanguageSelector";
import { useLanguage } from "@/lib/i18n";

function subscribeReducedMotion(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

interface StoryOfLifeProps {
  onComplete: () => void;
  onSkip: () => void;
}

export default function StoryOfLife({ onComplete, onSkip }: StoryOfLifeProps) {
  const { t, localizeStoryStage, ui } = useLanguage();
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  const currentStage: StoryStage = STORY_STAGES[currentStageIndex];
  const locStage = localizeStoryStage(currentStage);
  const stageTitle = locStage?.title || currentStage.title;
  const stageSubtitle = locStage?.subtitle || currentStage.subtitle;
  const stageTimeRange = locStage?.timeRange || currentStage.timeRange;
  const stageEon = locStage?.eonOrEra || currentStage.eonOrEra;
  const stageNarrative = locStage?.narrativeParagraphs || currentStage.narrativeParagraphs;
  const stageMilestones = locStage?.keyMilestones || currentStage.keyMilestones || [];
  const stageNotes = locStage?.scientificNotes || currentStage.scientificNotes || [];
  const totalStages = STORY_STAGES.length;
  const isFinalStage = currentStageIndex === totalStages - 1;

  const goToStage = useCallback(
    (index: number) => {
      if (index === currentStageIndex || index < 0 || index >= totalStages) return;
      if (prefersReducedMotion) {
        setCurrentStageIndex(index);
      } else {
        setIsTransitioning(true);
        setTimeout(() => {
          setCurrentStageIndex(index);
          setIsTransitioning(false);
        }, 220);
      }
    },
    [currentStageIndex, totalStages, prefersReducedMotion]
  );

  const handleNext = useCallback(() => {
    if (isFinalStage) {
      onComplete();
    } else {
      goToStage(currentStageIndex + 1);
    }
  }, [isFinalStage, onComplete, goToStage, currentStageIndex]);

  const handlePrev = useCallback(() => {
    if (currentStageIndex > 0) {
      goToStage(currentStageIndex - 1);
    }
  }, [currentStageIndex, goToStage]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onSkip();
      } else if (e.key === "ArrowRight" || e.key === "PageDown" || e.key === " ") {
        if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
        e.preventDefault();
        handleNext();
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
        e.preventDefault();
        handlePrev();
      } else if (e.key === "Enter" && isFinalStage) {
        onComplete();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev, isFinalStage, onComplete, onSkip]);

  const accent = currentStage.visualTheme.accentColor;

  return (
    <div
      className="relative flex flex-col justify-between w-full"
      style={{
        height: "100vh",
        background: "var(--bg-primary)",
        color: "var(--text-primary)",
        overflow: "hidden",
      }}
      role="region"
      aria-label="The Story of Life Cinematic Narrative"
    >
      {/* ── Ambient Radial Glow tailored to stage theme ───────── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 transition-all duration-700 ease-out z-0"
        style={{
          background: currentStage.visualTheme.ambientGradient,
          opacity: 0.9,
        }}
      />

      {/* Subtle background coordinate grid lines */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-40 z-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* ── Top Navigation Bar (Fixed 64px Height, z-30) ────────────────── */}
      <header
        className="flex items-center justify-between px-6 md:px-10 h-16 relative z-30 flex-shrink-0"
        style={{
          borderBottom: "1px solid var(--surface-border)",
          background: "rgba(8, 12, 18, 0.85)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
      >
        {/* Left: Project title & subtitle */}
        <div className="flex items-center gap-3">
          <div
            className="w-2.5 h-2.5 rounded-full transition-all duration-500"
            style={{
              backgroundColor: accent,
              boxShadow: `0 0 12px ${accent}`,
            }}
          />
          <div>
            <div className="text-[12px] font-bold tracking-[0.14em] uppercase text-white/95 leading-none">
              {t("common.treeOfLife", "Tree of Life")}
            </div>
            <div className="text-[10.5px] text-[var(--text-tertiary)] tracking-wide mt-0.5">
              {t("common.tagline", "Scientific Chronicle of Earth's History")}
            </div>
          </div>
        </div>

        {/* Center: Interactive Stage Segmented Timeline */}
        <nav
          aria-label="Story stages"
          className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] backdrop-blur-md"
        >
          {STORY_STAGES.map((stage, idx) => {
            const isActive = idx === currentStageIndex;
            const isPast = idx < currentStageIndex;
            return (
              <button
                key={stage.id}
                onClick={() => goToStage(idx)}
                aria-label={
                  stage.stageNumber === 0
                    ? `Jump to Stage 0: ${stage.title} (Prologue)`
                    : `Jump to Stage ${stage.stageNumber}: ${stage.title}`
                }
                aria-current={isActive ? "step" : undefined}
                className="group relative flex items-center justify-center py-1 px-1 transition-all"
              >
                <div
                  style={{
                    height: "5px",
                    width: isActive ? "36px" : "18px",
                    borderRadius: "100px",
                    backgroundColor: isActive
                      ? accent
                      : isPast
                      ? "rgba(255, 255, 255, 0.35)"
                      : "rgba(255, 255, 255, 0.12)",
                    boxShadow: isActive ? `0 0 10px ${accent}` : "none",
                    transition: prefersReducedMotion
                      ? "none"
                      : "all 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                  }}
                />
                {/* Tooltip on hover */}
                <div className="pointer-events-none absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-[10px] font-medium text-white/90 whitespace-nowrap px-2 py-0.5 rounded bg-black/80 border border-white/10 z-40">
                  {stage.stageNumber === 0 ? `0. ${stage.title} (Prologue)` : `${stage.stageNumber}. ${stage.title}`}
                </div>
              </button>
            );
          })}
        </nav>

        {/* Right: Skip / Direct Explorer Link */}
        <div className="flex items-center gap-3">
          <LanguageSelector compact align="right" />
          <button
            id="skip-story-btn"
            onClick={onSkip}
            aria-label="Skip narrative and explore tree directly"
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[12px] font-medium transition-all duration-200"
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid var(--surface-border)",
              color: "var(--text-secondary)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
              e.currentTarget.style.color = "var(--text-primary)";
              e.currentTarget.style.borderColor = "var(--surface-border-hover)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
              e.currentTarget.style.color = "var(--text-secondary)";
              e.currentTarget.style.borderColor = "var(--surface-border)";
            }}
          >
            <span>{t("story.skipToExplorer", "Skip to Explorer")}</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M2.5 6h7M6.5 3L9.5 6 6.5 9"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </header>

      {/* ── Main Scrollable Content Container (Guaranteed No Top-Overflow) ──── */}
      <main
        className="flex-1 min-h-0 overflow-y-auto px-6 md:px-12 lg:px-16 py-6 md:py-8 relative z-10 w-full"
        style={{
          height: "auto",
        }}
      >
        <div
          className="max-w-7xl mx-auto w-full transition-all duration-300 pb-8"
          style={{
            opacity: isTransitioning ? 0 : 1,
            transform: isTransitioning && !prefersReducedMotion ? "translateY(8px)" : "translateY(0)",
          }}
        >
          {/* Header Badges: Stage Number & Time Range Coordinates */}
          <div className="flex flex-wrap items-center gap-2.5 mb-3.5">
            <div
              className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase backdrop-blur-sm"
              style={{
                backgroundColor: `${accent}18`,
                border: `1px solid ${accent}45`,
                color: accent,
                boxShadow: `0 0 16px ${accent}20`,
              }}
            >
              <span>{currentStage.visualTheme.icon}</span>
              <span>
                {currentStage.stageNumber === 0
                  ? (ui.story.stage0Notice || t("story.stage0Notice", "Stage 0 · Prologue (Cosmic Origins)"))
                  : `${ui.story.stageCounter || t("story.stageCounter", "Stage")} ${currentStage.stageNumber} / 7`}
              </span>
            </div>

            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11.5px] font-medium"
              style={{
                background: "rgba(255, 255, 255, 0.04)",
                border: "1px solid var(--surface-border)",
                color: "var(--text-secondary)",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accent, opacity: 0.8 }} />
              <span className="text-white/90 font-mono tracking-tight">{stageTimeRange}</span>
              <span className="text-white/30">·</span>
              <span className="text-slate-300">{stageEon}</span>
            </div>
          </div>

          {/* Stage Title & Subtitle */}
          <div className="mb-7">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-2.5 leading-[1.12]">
              {stageTitle}
            </h1>
            <p className="text-base sm:text-lg text-slate-300/80 font-light leading-relaxed max-w-3xl">
              {stageSubtitle}
            </p>
          </div>

          {/* ── 2-Column Responsive Exhibition Grid ────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Left Column: Narrative & Scientific Consensus/Hypothesis (7 cols) */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              {/* Narrative Editorial Card */}
              <div
                className="rounded-2xl glass-panel relative overflow-hidden"
                style={{
                  padding: "32px 36px 32px 40px",
                  background: "linear-gradient(180deg, rgba(16, 22, 32, 0.75) 0%, rgba(10, 15, 22, 0.85) 100%)",
                  border: "1px solid var(--surface-border)",
                  boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.5)",
                }}
              >
                {/* Subtle luminous accent bar on left */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-1 transition-all duration-500"
                  style={{
                    backgroundColor: accent,
                    boxShadow: `0 0 12px ${accent}`,
                  }}
                />

                <div className="flex flex-col gap-5 text-slate-300">
                  {stageNarrative.map((paragraph, pIdx) => (
                    <p
                      key={pIdx}
                      style={{ margin: 0 }}
                      className={
                        pIdx === 0
                          ? "text-[16px] sm:text-[16.5px] leading-[1.8] text-slate-100 font-normal"
                          : "text-[14.5px] sm:text-[15px] leading-[1.8] text-slate-300/90 font-light"
                      }
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* Scientific Notes (Consensus vs Hypothesis vs Uncertainty) */}
              {stageNotes && stageNotes.length > 0 && (
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2 px-1">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accent }} />
                    <span className="text-[11px] font-bold tracking-widest uppercase text-slate-400">
                      {ui.story.scientificNotes || t("story.scientificNotes", "Scientific Verification & Active Research")}
                    </span>
                  </div>

                  <div className="flex flex-col gap-3">
                    {stageNotes.map((note, nIdx) => {
                      const isConsensus =
                        note.label === "Established Consensus" ||
                        note.label?.includes("ঐকমত্য") ||
                        note.label?.includes("सहमति") ||
                        note.label?.includes("Consenso") ||
                        note.label?.includes("Consensus");
                      const isHypothesis =
                        note.label === "Active Hypothesis" ||
                        note.label?.includes("অনুমান") ||
                        note.label?.includes("परिकल्पना") ||
                        note.label?.includes("Hipótesis") ||
                        note.label?.includes("Hypothèse");
                      const badgeColor = isConsensus
                        ? "#10b981"
                        : isHypothesis
                        ? "#38bdf8"
                        : "#f43f5e";
                      const badgeBg = isConsensus
                        ? "rgba(16, 185, 129, 0.12)"
                        : isHypothesis
                        ? "rgba(56, 189, 248, 0.12)"
                        : "rgba(244, 63, 94, 0.12)";
                      const badgeBorder = isConsensus
                        ? "rgba(16, 185, 129, 0.3)"
                        : isHypothesis
                        ? "rgba(56, 189, 248, 0.3)"
                        : "rgba(244, 63, 94, 0.3)";

                      return (
                        <div
                          key={nIdx}
                          className="rounded-xl transition-all duration-200"
                          style={{
                            padding: "20px 24px",
                            background: "rgba(14, 20, 29, 0.75)",
                            border: "1px solid var(--surface-border)",
                            borderLeft: `3px solid ${badgeColor}`,
                          }}
                        >
                          <div className="flex items-center gap-2 mb-2.5">
                            <span
                              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10.5px] font-bold tracking-wider uppercase"
                              style={{
                                backgroundColor: badgeBg,
                                border: `1px solid ${badgeBorder}`,
                                color: badgeColor,
                              }}
                            >
                              <span
                                className="w-1.5 h-1.5 rounded-full"
                                style={{ backgroundColor: badgeColor, boxShadow: `0 0 6px ${badgeColor}` }}
                              />
                              <span>{note.label}</span>
                            </span>
                          </div>
                          <p
                            className="text-[13.5px] leading-relaxed text-slate-200/90 font-light"
                            style={{ margin: 0 }}
                          >
                            {note.text}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Stage Artwork & Key Milestones (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {/* Cinematic Stage Artwork Card */}
              <StageArtwork stage={currentStage} />

              {/* Key Evolutionary Milestones Card */}
              <div
                className="rounded-2xl glass-panel relative overflow-hidden"
                style={{
                  padding: "24px 28px",
                  background: "linear-gradient(180deg, rgba(14, 19, 28, 0.85) 0%, rgba(10, 14, 22, 0.95) 100%)",
                  border: "1px solid var(--surface-border)",
                  boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.5)",
                }}
              >
                <div
                  className="flex items-center justify-between mb-4 pb-3"
                  style={{
                    borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
                    marginBottom: "16px",
                    paddingBottom: "12px",
                  }}
                >
                  <h3 className="text-[11px] font-bold tracking-widest uppercase text-slate-300 flex items-center gap-2">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ color: accent }}>
                      <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.3" />
                      <path d="M7 4V7L9 9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                    </svg>
                    <span>{ui.story.keyMilestones || t("story.keyMilestones", "Key Evolutionary Milestones")}</span>
                  </h3>
                  <span
                    className="text-[10px] font-mono px-2 py-0.5 rounded-full text-slate-400"
                    style={{ background: "rgba(255, 255, 255, 0.05)", border: "1px solid rgba(255, 255, 255, 0.08)" }}
                  >
                    {stageMilestones.length} {ui.story.events || t("story.events", "Events")}
                  </span>
                </div>

                {/* Milestone Vertical Chain */}
                <div className="relative flex flex-col gap-4">
                  {/* Vertical connector line */}
                  <div
                    className="absolute left-[13px] top-3 bottom-3 w-[1.5px] bg-white/[0.08]"
                    aria-hidden="true"
                  />

                  {stageMilestones.map((milestone, mIdx) => (
                    <div
                      key={mIdx}
                      className="relative flex items-start gap-3.5 text-[13px] text-slate-200 leading-snug group"
                      style={{ padding: "4px 0" }}
                    >
                      {/* Milestone Step Node */}
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 z-10 transition-transform duration-200 group-hover:scale-110"
                        style={{
                          background: "rgba(18, 24, 36, 0.95)",
                          border: `1.5px solid ${accent}80`,
                          boxShadow: `0 0 10px ${accent}30`,
                        }}
                      >
                        <span className="text-[10.5px] font-mono font-bold" style={{ color: accent }}>
                          0{mIdx + 1}
                        </span>
                      </div>

                      {/* Milestone Description */}
                      <div className="pt-0.5 flex-1">
                        <span className="text-slate-200 font-normal">
                          {milestone}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ── Bottom Controls Bar ────────────────── */}
      <footer
        className="flex items-center justify-between px-6 sm:px-8 md:px-12 h-20 relative z-30 flex-shrink-0"
        style={{
          borderTop: "1px solid var(--surface-border)",
          background: "rgba(8, 12, 18, 0.95)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
      >
        {/* Left: Previous Stage Button (Cleanly offset by ml-20 so Next.js dev overlay never covers it) */}
        <div className="flex items-center gap-4 ml-20">
          <button
            onClick={handlePrev}
            disabled={currentStageIndex === 0}
            aria-label="Previous story stage"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[12.5px] font-medium transition-all duration-200"
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid var(--surface-border)",
              color: currentStageIndex === 0 ? "var(--text-tertiary)" : "var(--text-primary)",
              cursor: currentStageIndex === 0 ? "not-allowed" : "pointer",
              opacity: currentStageIndex === 0 ? 0.35 : 1,
            }}
            onMouseEnter={(e) => {
              if (currentStageIndex > 0) {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                e.currentTarget.style.borderColor = "var(--surface-border-hover)";
              }
            }}
            onMouseLeave={(e) => {
              if (currentStageIndex > 0) {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                e.currentTarget.style.borderColor = "var(--surface-border)";
              }
            }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M9.5 6h-7M5.5 3L2.5 6 5.5 9"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>{t("story.previousStage", "Previous")}</span>
          </button>

          <span className="hidden xl:inline text-[11px] text-[var(--text-tertiary)] tracking-wide">
            {ui.story.keyboardHint || t("story.keyboardHint", "Keyboard:")} <span className="text-white/60 font-mono">←</span> / <span className="text-white/60 font-mono">→</span> {ui.story.or || t("story.or", "or")} <span className="text-white/60 font-mono">Space</span>
          </span>
        </div>

        {/* Center: Stage Progress Tracker */}
        <div className="hidden sm:flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06]">
          <span className="text-xs text-slate-400 font-medium">{ui.story.stageCounter || t("story.stageCounter", "Stage")}</span>
          <div className="flex items-center gap-1.5">
            {STORY_STAGES.map((_, i) => (
              <span
                key={i}
                className="w-2 h-2 rounded-full transition-all duration-300"
                style={{
                  backgroundColor:
                    i === currentStageIndex
                      ? accent
                      : i < currentStageIndex
                      ? "rgba(255, 255, 255, 0.35)"
                      : "rgba(255, 255, 255, 0.12)",
                  boxShadow: i === currentStageIndex ? `0 0 8px ${accent}` : "none",
                  transform: i === currentStageIndex ? "scale(1.2)" : "scale(1)",
                }}
              />
            ))}
          </div>
          <span className="text-xs font-mono font-semibold text-white/90">
            {currentStage.stageNumber === 0
              ? `0 / 7 (${ui.story.prologue || t("story.prologue", "Prologue")})`
              : `${currentStage.stageNumber} / 7`}
          </span>
        </div>

        {/* Right: Continue Journey / Explore Tree Button */}
        <div className="flex items-center gap-4">
          <button
            id="next-story-btn"
            onClick={handleNext}
            aria-label={isFinalStage ? "Enter Tree Explorer" : "Continue to next stage"}
            className="group inline-flex items-center gap-2.5 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-[13px] font-semibold tracking-wide transition-all duration-300"
            style={{
              background: isFinalStage
                ? "linear-gradient(135deg, #ffffff 0%, #cbd5e1 100%)"
                : `linear-gradient(135deg, ${accent} 0%, ${accent}dd 100%)`,
              color: isFinalStage ? "#0f172a" : "#ffffff",
              boxShadow: isFinalStage
                ? "0 0 25px rgba(255, 255, 255, 0.35)"
                : `0 0 25px ${accent}45`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-1px) scale(1.02)";
              e.currentTarget.style.boxShadow = isFinalStage
                ? "0 0 35px rgba(255, 255, 255, 0.55)"
                : `0 0 35px ${accent}65`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0) scale(1)";
              e.currentTarget.style.boxShadow = isFinalStage
                ? "0 0 25px rgba(255, 255, 255, 0.35)"
                : `0 0 25px ${accent}45`;
            }}
          >
            <span>{isFinalStage ? t("story.enterExplorer", "Explore the Tree of Life") : t("story.nextStage", "Continue Journey")}</span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              className="transition-transform duration-200 group-hover:translate-x-1"
            >
              <path
                d="M3 7h8M7.5 3.5L11 7 7.5 10.5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </footer>
    </div>
  );
}
