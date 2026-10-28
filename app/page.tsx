"use client";

import React, { useState, useEffect } from "react";
import ExplorerView from "@/components/ExplorerView";
import StoryOfLife from "@/components/story/StoryOfLife";
import LanguageSelector from "@/components/ui/LanguageSelector";
import { useLanguage } from "@/lib/i18n";

// Particle animation component for the hero background
function HeroParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <svg width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
        <defs>
          <radialGradient id="heroGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#3d8ef8" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#3d8ef8" stopOpacity="0" />
          </radialGradient>
        </defs>
        <ellipse cx="50%" cy="50%" rx="45%" ry="40%" fill="url(#heroGlow)" />
      </svg>

      {/* Subtle tree structure in the background */}
      <svg
        width="100%"
        height="100%"
        style={{ position: "absolute", inset: 0, opacity: 0.06 }}
      >
        {/* Root */}
        <circle cx="22%" cy="50%" r="4" fill="#3d8ef8" />
        {/* Level 1 */}
        <circle cx="38%" cy="32%" r="3.5" fill="#4ade80" />
        <circle cx="38%" cy="50%" r="3.5" fill="#60a5fa" />
        <circle cx="38%" cy="68%" r="3.5" fill="#a78bfa" />
        {/* Level 2 */}
        <circle cx="52%" cy="24%" r="3" fill="#4ade80" />
        <circle cx="52%" cy="38%" r="3" fill="#4ade80" />
        <circle cx="52%" cy="55%" r="3" fill="#60a5fa" />
        <circle cx="52%" cy="65%" r="3" fill="#a78bfa" />
        {/* Connecting lines */}
        <line x1="22%" y1="50%" x2="38%" y2="32%" stroke="#ffffff" strokeWidth="1" strokeDasharray="3 3" />
        <line x1="22%" y1="50%" x2="38%" y2="50%" stroke="#ffffff" strokeWidth="1" />
        <line x1="22%" y1="50%" x2="38%" y2="68%" stroke="#ffffff" strokeWidth="1" strokeDasharray="3 3" />
        <line x1="38%" y1="32%" x2="52%" y2="24%" stroke="#ffffff" strokeWidth="0.8" />
        <line x1="38%" y1="32%" x2="52%" y2="38%" stroke="#ffffff" strokeWidth="0.8" />
        <line x1="38%" y1="50%" x2="52%" y2="55%" stroke="#ffffff" strokeWidth="0.8" />
        <line x1="38%" y1="68%" x2="52%" y2="65%" stroke="#ffffff" strokeWidth="0.8" />
      </svg>
    </div>
  );
}

export default function Home() {
  const { t } = useLanguage();
  const [phase, setPhase] = useState<"hero" | "story" | "explorer">(() => {
    if (typeof window === "undefined") return "hero";
    const params = new URLSearchParams(window.location.search);
    if (params.get("view") === "story" || params.get("story") === "true") {
      return "story";
    }
    if (
      params.get("view") === "tree" ||
      params.get("view") === "explorer" ||
      params.get("node") ||
      params.get("layer") === "pre-luca"
    ) {
      return "explorer";
    }
    return "hero";
  });
  const [heroVisible, setHeroVisible] = useState(true);

  const handleStartStory = () => {
    setHeroVisible(false);
    setTimeout(() => {
      setPhase("story");
    }, 380);
  };

  const handleExplore = () => {
    setHeroVisible(false);
    setTimeout(() => {
      setPhase("explorer");
    }, 380);
  };

  const handleStoryComplete = () => {
    setPhase("explorer");
  };

  const handleStorySkip = () => {
    setPhase("explorer");
  };

  // Keyboard shortcut: Press Enter to launch story, or 'E' to explore
  useEffect(() => {
    if (phase !== "hero") return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === "Enter") {
        e.preventDefault();
        handleStartStory();
      } else if (e.key === "e" || e.key === "E") {
        e.preventDefault();
        handleExplore();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [phase]);

  if (phase === "story") {
    return (
      <div className="h-full w-full animate-fade-in">
        <StoryOfLife
          onComplete={handleStoryComplete}
          onSkip={handleStorySkip}
        />
      </div>
    );
  }

  if (phase === "explorer") {
    return (
      <div className="h-full w-full animate-fade-in">
        <ExplorerView
          onBack={() => {
            setPhase("hero");
            setHeroVisible(true);
          }}
          onOpenStory={() => setPhase("story")}
        />
      </div>
    );
  }

  return (
    <main
      id="hero"
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--bg-primary)",
        overflow: "hidden",
        position: "relative",
        opacity: heroVisible ? 1 : 0,
        transition: "opacity 450ms cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      }}
    >
      <HeroParticles />

      {/* Top right language selector header */}
      <header
        className="absolute top-5 right-6 z-20 flex items-center gap-3 animate-fade-in"
      >
        <LanguageSelector align="right" />
      </header>

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          textAlign: "center",
          padding: "0 24px",
          maxWidth: "680px",
        }}
      >
        {/* Pre-title label */}
        <div
          className="animate-fade-up"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "5px 14px",
            borderRadius: "100px",
            background: "rgba(61,142,248,0.1)",
            border: "1px solid rgba(61,142,248,0.25)",
            marginBottom: "28px",
          }}
        >
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "var(--accent-primary)",
              boxShadow: "0 0 8px rgba(61,142,248,0.6)",
            }}
          />
          <span
            style={{
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--accent-primary)",
            }}
          >
            {t("hero.phaseBadge", "Phase 1 · Interactive Visualization")}
          </span>
        </div>

        {/* Main title */}
        <h1
          className="animate-fade-up-delay-1"
          style={{
            fontSize: "clamp(48px, 8vw, 84px)",
            fontWeight: 300,
            letterSpacing: "-0.04em",
            lineHeight: 0.95,
            color: "var(--text-primary)",
            marginBottom: "8px",
          }}
        >
          {t("hero.mainTitle1", "Tree of")}
          <br />
          <span
            style={{
              fontWeight: 700,
              background:
                "linear-gradient(135deg, #e8edf2 0%, #a8c4e8 50%, #6aa3d8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {t("hero.mainTitle2", "Life")}
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className="animate-fade-up-delay-2"
          style={{
            fontSize: "clamp(15px, 2vw, 18px)",
            color: "var(--text-secondary)",
            lineHeight: 1.6,
            marginTop: "24px",
            marginBottom: "8px",
            fontWeight: 300,
          }}
        >
          {t("hero.subtitle1", "Explore the known diversity of life")}
        </p>
        <p
          className="animate-fade-up-delay-2"
          style={{
            fontSize: "clamp(15px, 2vw, 18px)",
            color: "var(--text-tertiary)",
            lineHeight: 1.6,
            marginBottom: "48px",
            fontWeight: 300,
          }}
        >
          {t("hero.subtitle2Prefix", "from")}{" "}
          <span style={{ color: "var(--accent-living)", fontStyle: "italic" }}>
            LUCA
          </span>{" "}
          {t("hero.subtitle2Suffix", "— Last Universal Common Ancestor — to today.")}
        </p>

        {/* CTA Buttons */}
        <div className="animate-fade-up-delay-3 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            id="story-btn"
            onClick={handleStartStory}
            aria-label={t("hero.storyCtaAria", "Begin The Story of Life cinematic experience")}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "15px 34px",
              background: "var(--text-primary)",
              color: "var(--bg-primary)",
              border: "none",
              borderRadius: "100px",
              fontSize: "13.5px",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              cursor: "pointer",
              transition: "all 200ms ease",
              outline: "none",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "scale(1.04)";
              (e.currentTarget as HTMLElement).style.boxShadow =
                "0 0 35px rgba(232,237,242,0.2)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "scale(1)";
              (e.currentTarget as HTMLElement).style.boxShadow = "none";
            }}
            onFocus={(e) => {
              (e.currentTarget as HTMLElement).style.outline =
                "2px solid var(--accent-primary)";
              (e.currentTarget as HTMLElement).style.outlineOffset = "4px";
            }}
            onBlur={(e) => {
              (e.currentTarget as HTMLElement).style.outline = "none";
            }}
          >
            <span>{t("hero.storyCta", "The Story of Life")}</span>
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
              <path
                d="M3.5 8h9M9 4.5L12.5 8 9 11.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <button
            id="explore-btn"
            onClick={handleExplore}
            aria-label={t("hero.exploreCtaAria", "Explore the interactive Tree of Life directly")}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "14px 30px",
              background: "rgba(255,255,255,0.06)",
              color: "var(--text-primary)",
              border: "1px solid var(--surface-border)",
              borderRadius: "100px",
              fontSize: "13.5px",
              fontWeight: 500,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              cursor: "pointer",
              transition: "all 200ms ease",
              outline: "none",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.12)";
              (e.currentTarget as HTMLElement).style.borderColor = "var(--surface-border-hover)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)";
              (e.currentTarget as HTMLElement).style.borderColor = "var(--surface-border)";
            }}
          >
            <span>{t("hero.exploreCta", "Explore Tree Directly")}</span>
          </button>
        </div>

        <p
          className="animate-fade-up-delay-3"
          style={{
            marginTop: "18px",
            fontSize: "12px",
            color: "var(--text-tertiary)",
            letterSpacing: "0.04em",
          }}
        >
          {t("hero.shortcutHint", "Press Enter for Story · Press E for Tree Explorer")}
        </p>
      </div>

      {/* Bottom metadata strip */}
      <div
        className="animate-fade-up-delay-3"
        style={{
          position: "absolute",
          bottom: "24px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          alignItems: "center",
          gap: "20px",
          fontSize: "11px",
          color: "var(--text-tertiary)",
          letterSpacing: "0.06em",
          whiteSpace: "nowrap",
        }}
      >
        <span>{t("hero.taxaCountBadge", "92 Verified Taxa")}</span>
        <span style={{ color: "var(--surface-border-hover)" }}>·</span>
        <span>{t("hero.timeScaleBadge", "3.8 Billion Years of Evolution")}</span>
        <span style={{ color: "var(--surface-border-hover)" }}>·</span>
        <span>{t("hero.interactiveBadge", "Interactive Exploration")}</span>
      </div>
    </main>
  );
}
