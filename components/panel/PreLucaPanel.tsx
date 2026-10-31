"use client";

import React, { useState } from "react";
import { PRE_LUCA_STAGES, type PrebioticStage } from "@/data/prebiotic";
import { useLanguage } from "@/lib/i18n";
import { getElementFullName } from "@/lib/i18n/elements";

interface PreLucaPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onFocusLuca: () => void;
  onOpenStory?: () => void;
}

export default function PreLucaPanel({
  isOpen,
  onClose,
  onFocusLuca,
  onOpenStory,
}: PreLucaPanelProps) {
  const { t, locale, localizePrebioticStage, ui } = useLanguage();
  const [selectedStageId, setSelectedStageId] = useState<string>("cosmic-origins");
  const [showCitationsFor, setShowCitationsFor] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentStage: PrebioticStage =
    PRE_LUCA_STAGES.find((s) => s.id === selectedStageId) ?? PRE_LUCA_STAGES[0];

  const getCertitudeBadge = (certitude: string) => {
    switch (certitude) {
      case "established_consensus":
        return {
          label: ui.certitudes?.established_consensus || "Established Science",
          color: "#10b981",
          bg: "rgba(16, 185, 129, 0.12)",
          border: "rgba(16, 185, 129, 0.3)",
        };
      case "active_hypothesis":
        return {
          label: ui.certitudes?.active_hypothesis || "Active Hypothesis",
          color: "#38bdf8",
          bg: "rgba(56, 189, 248, 0.12)",
          border: "rgba(56, 189, 248, 0.3)",
        };
      case "theoretical_construct":
      default:
        return {
          label: ui.certitudes?.theoretical_construct || "Theoretical Construct (Date Uncertain)",
          color: "#f43f5e",
          bg: "rgba(244, 63, 94, 0.12)",
          border: "rgba(244, 63, 94, 0.3)",
        };
    }
  };

  const locStage = localizePrebioticStage(currentStage);
  const badgeInfo = getCertitudeBadge(currentStage.scientificCertitude);
  const theme = currentStage.visualTheme;
  const stageTitle = locStage?.title || currentStage.title;
  const stageSubtitle = locStage?.subtitle || currentStage.subtitle;
  const stageTimeRange = locStage?.timeRangeDisplay || currentStage.timeRangeDisplay;
  const stageNarrative = locStage?.narrativeOverview || currentStage.narrativeOverview;
  const stageEvidence = locStage?.empiricalEvidence || currentStage.empiricalEvidence;
  const stageUncertainty = locStage?.uncertaintyNotes || currentStage.uncertaintyNotes || [];
  const stageHypotheses = locStage?.activeHypotheses || currentStage.activeHypotheses || [];

  return (
    <div
      className="fixed inset-0 z-50 flex items-stretch justify-start animate-fade-in"
      style={{
        background: "rgba(4, 7, 12, 0.75)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="pre-luca-title"
    >
      {/* Background click dismiss */}
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />

      {/* Main Panel Content Drawer */}
      <aside
        className="relative w-full max-w-2xl h-full flex flex-col z-10 glass-panel shadow-2xl overflow-hidden"
        style={{
          background: "linear-gradient(180deg, rgba(12, 17, 26, 0.98) 0%, rgba(7, 10, 16, 0.99) 100%)",
          borderRight: "1px solid var(--surface-border)",
          boxShadow: "0 25px 60px -15px rgba(0, 0, 0, 0.7)",
        }}
      >
        {/* ── Top Header ────────────────────────────────────────── */}
        <header
          className="flex items-center justify-between px-6 py-4.5 shrink-0"
          style={{
            borderBottom: "1px solid var(--surface-border)",
            background: "rgba(14, 20, 30, 0.75)",
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-sm"
              style={{
                background: "rgba(168, 85, 247, 0.15)",
                border: "1px solid rgba(168, 85, 247, 0.35)",
              }}
            >
              ✨
            </div>
            <div>
              <h2
                id="pre-luca-title"
                className="text-[14px] font-bold text-white tracking-tight leading-snug flex items-center gap-2"
              >
                <span>{t("preLuca.panelTitle", "Pre-LUCA History & Antecedents")}</span>
                <span
                  className="text-[9.5px] font-medium tracking-wide uppercase px-2 py-0.5 rounded-full"
                  style={{
                    background: "rgba(255, 255, 255, 0.06)",
                    border: "1px solid var(--surface-border)",
                    color: "var(--text-tertiary)",
                  }}
                >
                  {ui.preLuca.badge || "Non-Cladistic Layer"}
                </span>
              </h2>
              <p className="text-[11px] text-[var(--text-tertiary)] tracking-wide">
                {t("preLuca.flowSubtitle", "Cosmic Origins → Earth Accretion → Prebiotic Chemistry → FUCA Concept → LUCA")}
              </p>
            </div>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            aria-label={t("preLuca.closeAria", "Close pre-LUCA history panel")}
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid var(--surface-border)",
              color: "var(--text-secondary)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--text-primary)";
              e.currentTarget.style.borderColor = "var(--surface-border-hover)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--text-secondary)";
              e.currentTarget.style.borderColor = "var(--surface-border)";
            }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M2 2l8 8M10 2l-8 8"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </header>

        {/* ── Stage Selector Pills (Horizontal Track) ───────────── */}
        <nav
          aria-label={t("preLuca.stagesAria", "Pre-LUCA Historical Stages")}
          className="flex items-center gap-2 px-6 py-3 shrink-0 overflow-x-auto no-scrollbar"
          style={{
            borderBottom: "1px solid var(--surface-border)",
            background: "rgba(10, 14, 22, 0.5)",
          }}
        >
          {PRE_LUCA_STAGES.map((stg) => {
            const isSelected = stg.id === selectedStageId;
            const locStg = localizePrebioticStage(stg);
            const stgLabel = locStg?.stageNumber || stg.stageNumber;
            return (
              <button
                key={stg.id}
                onClick={() => setSelectedStageId(stg.id)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium transition-all shrink-0"
                style={{
                  background: isSelected
                    ? `${stg.visualTheme.accentColor}20`
                    : "rgba(255, 255, 255, 0.04)",
                  border: isSelected
                    ? `1px solid ${stg.visualTheme.accentColor}60`
                    : "1px solid var(--surface-border)",
                  color: isSelected ? "#ffffff" : "var(--text-secondary)",
                  boxShadow: isSelected
                    ? `0 0 12px ${stg.visualTheme.accentColor}25`
                    : "none",
                }}
              >
                <span>{stg.visualTheme.icon}</span>
                <span>{stgLabel}</span>
              </button>
            );
          })}
        </nav>

        {/* ── Scrollable Body Area ──────────────────────────────── */}
        <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-5">
          {/* Stage Header Block */}
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider"
                style={{
                  background: badgeInfo.bg,
                  border: `1px solid ${badgeInfo.border}`,
                  color: badgeInfo.color,
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: badgeInfo.color }}
                />
                <span>{ui.certitudes[currentStage.scientificCertitude] || badgeInfo.label}</span>
              </span>

              <span
                className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10.5px] font-mono"
                style={{
                  background: "rgba(255, 255, 255, 0.04)",
                  border: "1px solid var(--surface-border)",
                  color: "var(--text-secondary)",
                }}
              >
                <span>{stageTimeRange}</span>
              </span>
            </div>

            <h3 className="text-xl font-bold text-white tracking-tight mt-1 leading-snug">
              {stageTitle}
            </h3>
            <p className="text-[13px] text-slate-300 font-light leading-relaxed">
              {stageSubtitle}
            </p>
          </div>

          {/* Narrative Overview Card */}
          <div
            className="rounded-xl p-4.5 flex flex-col gap-3"
            style={{
              background: "rgba(16, 22, 32, 0.7)",
              border: "1px solid var(--surface-border)",
              borderLeft: `3px solid ${theme.accentColor}`,
            }}
          >
            {stageNarrative.map((para, pIdx) => (
              <p
                key={pIdx}
                className="text-[13px] leading-relaxed text-slate-200/90 font-light"
                style={{ margin: 0 }}
              >
                {para}
              </p>
            ))}
          </div>

          {/* Chemical Elements / Molecular Palette (Full Format) */}
          {currentStage.relevantElements && currentStage.relevantElements.length > 0 && (
            <div
              className="flex flex-col gap-2.5 p-3.5 rounded-xl"
              style={{
                background: "rgba(16, 22, 32, 0.55)",
                border: "1px solid var(--surface-border)",
              }}
            >
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: theme.accentColor }} />
                <span className="text-[10.5px] font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                  {ui.preLuca.keyElements || t("preLuca.keyElements", "Key Elements / Molecules:")}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {currentStage.relevantElements.map((el, elIdx) => (
                  <span
                    key={elIdx}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[11.5px] font-medium transition-all"
                    style={{
                      background: "rgba(255, 255, 255, 0.05)",
                      border: "1px solid rgba(255, 255, 255, 0.12)",
                      color: theme.accentColor,
                    }}
                  >
                    <span>{getElementFullName(el, locale)}</span>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Empirical Evidence */}
          <div className="flex flex-col gap-2">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <circle cx="6" cy="6" r="4.5" stroke="#10b981" strokeWidth="1.2" />
                <path d="M4 6l1.5 1.5L8 4.5" stroke="#10b981" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
              <span>{ui.preLuca.empiricalEvidenceTitle || t("preLuca.empiricalEvidenceTitle", "Empirical Scientific Evidence")}</span>
            </h4>
            <ul className="flex flex-col gap-2 pl-4 text-[12.5px] text-slate-300 font-light list-disc">
              {stageEvidence.map((ev, evIdx) => (
                <li key={evIdx} className="leading-relaxed">
                  {ev}
                </li>
              ))}
            </ul>
          </div>

          {/* Active Hypotheses */}
          <div className="flex flex-col gap-2">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <circle cx="6" cy="6" r="4.5" stroke="#38bdf8" strokeWidth="1.2" />
                <path d="M6 3.5v3M6 8.5h.01" stroke="#38bdf8" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
              <span>{ui.preLuca.activeHypothesesTitle || t("preLuca.activeHypothesesTitle", "Active Research Hypotheses")}</span>
            </h4>
            <ul className="flex flex-col gap-2 pl-4 text-[12.5px] text-slate-300 font-light list-disc">
              {stageHypotheses.map((hyp, hIdx) => (
                <li key={hIdx} className="leading-relaxed">
                  {hyp}
                </li>
              ))}
            </ul>
          </div>

          {/* Uncertainty Callouts */}
          <div
            className="rounded-lg p-3.5 flex flex-col gap-1.5"
            style={{
              background: "rgba(244, 63, 94, 0.08)",
              border: "1px solid rgba(244, 63, 94, 0.25)",
            }}
          >
            <div className="text-[10px] font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path
                  d="M6 1.5l4.5 8H1.5L6 1.5z"
                  stroke="#fb7185"
                  strokeWidth="1.2"
                  strokeLinejoin="round"
                />
                <path d="M6 4.5v2.5M6 8.5h.01" stroke="#fb7185" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
              <span>{ui.preLuca.guardrailsTitle || t("preLuca.guardrailsTitle", "Scientific Uncertainty & Non-Cladistic Guardrails")}</span>
            </div>
            {stageUncertainty.map((unc, uIdx) => (
              <p
                key={uIdx}
                className="text-[12px] leading-relaxed text-rose-200/90 font-light"
                style={{ margin: 0 }}
              >
                {unc}
              </p>
            ))}
          </div>

          {/* Peer-Reviewed Scholarly Citations Drawer */}
          <div
            className="rounded-lg overflow-hidden"
            style={{
              background: "rgba(255, 255, 255, 0.02)",
              border: "1px solid var(--surface-border)",
            }}
          >
            <button
              onClick={() =>
                setShowCitationsFor(
                  showCitationsFor === currentStage.id ? null : currentStage.id
                )
              }
              className="w-full flex items-center justify-between px-3.5 py-2.5 text-[11px] font-semibold text-slate-300 hover:text-white transition-colors"
            >
              <span className="flex items-center gap-1.5">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2.5 2h7v8h-7z" stroke="currentColor" strokeWidth="1.2" />
                  <path d="M4.5 4.5h3M4.5 7h2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
                <span>{ui.preLuca.scientificCitations || t("preLuca.scientificCitations", "Peer-Reviewed Scientific Citations")} ({currentStage.citations.length})</span>
              </span>
              <span className="text-[10px] text-slate-400 font-mono">
                {showCitationsFor === currentStage.id ? (ui.preLuca.hideCitations || "Hide") : (ui.preLuca.showCitations || "Show")}
              </span>
            </button>

            {showCitationsFor === currentStage.id && (
              <div
                className="px-4 py-3 flex flex-col gap-2.5 text-[11px] text-slate-300"
                style={{ borderTop: "1px solid var(--surface-border)" }}
              >
                {currentStage.citations.map((cit, cIdx) => (
                  <div key={cIdx} className="flex flex-col gap-0.5">
                    <span className="font-semibold text-white/95">{cit.authorYear}</span>
                    <span className="italic text-slate-300">{cit.title}</span>
                    <span className="font-mono text-[10px] text-slate-400">{cit.source}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── Bottom Action Footer ──────────────────────────────── */}
        <footer
          className="px-6 py-4 flex items-center justify-between shrink-0"
          style={{
            borderTop: "1px solid var(--surface-border)",
            background: "rgba(10, 14, 22, 0.9)",
          }}
        >
          {onOpenStory && (
            <button
              onClick={() => {
                onClose();
                onOpenStory();
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[11.5px] font-medium transition-colors"
              style={{
                background: "rgba(168, 85, 247, 0.12)",
                border: "1px solid rgba(168, 85, 247, 0.35)",
                color: "#c084fc",
              }}
            >
              <span>{t("preLuca.exploreStoryBtn", "Launch Story of Life")}</span>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M2 5h6M5 2l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </button>
          )}

          <button
            onClick={() => {
              onClose();
              onFocusLuca();
            }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-[12px] font-semibold transition-all ml-auto"
            style={{
              background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
              color: "#ffffff",
              boxShadow: "0 0 15px rgba(16, 185, 129, 0.35)",
            }}
          >
            <span>{t("preLuca.focusLucaBtn", "Focus LUCA in Tree")}</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2.5 6h7M6.5 3L9.5 6 6.5 9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </footer>
      </aside>
    </div>
  );
}
