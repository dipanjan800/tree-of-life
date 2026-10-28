"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { useLanguage, LOCALES_LIST, type Locale } from "@/lib/i18n";

interface LanguageSelectorProps {
  compact?: boolean;
  align?: "left" | "right";
  className?: string;
}

export default function LanguageSelector({
  compact = false,
  align = "right",
  className = "",
}: LanguageSelectorProps) {
  const { locale, setLocale, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listboxRef = useRef<HTMLUListElement>(null);

  const currentLocaleMeta = LOCALES_LIST.find((l) => l.code === locale) || LOCALES_LIST[0];

  // Close when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isOpen]);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!isOpen) {
        if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setIsOpen(true);
          const currentIdx = LOCALES_LIST.findIndex((l) => l.code === locale);
          setFocusedIndex(currentIdx >= 0 ? currentIdx : 0);
        }
        return;
      }

      switch (e.key) {
        case "Escape":
          e.preventDefault();
          setIsOpen(false);
          buttonRef.current?.focus();
          break;
        case "ArrowDown":
          e.preventDefault();
          setFocusedIndex((prev) => (prev + 1) % LOCALES_LIST.length);
          break;
        case "ArrowUp":
          e.preventDefault();
          setFocusedIndex((prev) => (prev - 1 + LOCALES_LIST.length) % LOCALES_LIST.length);
          break;
        case "Enter":
        case " ":
          e.preventDefault();
          if (focusedIndex >= 0 && focusedIndex < LOCALES_LIST.length) {
            setLocale(LOCALES_LIST[focusedIndex].code);
            setIsOpen(false);
            buttonRef.current?.focus();
          }
          break;
        case "Tab":
          setIsOpen(false);
          break;
      }
    },
    [isOpen, focusedIndex, locale, setLocale]
  );

  const handleSelect = (code: Locale) => {
    setLocale(code);
    setIsOpen(false);
    buttonRef.current?.focus();
  };

  return (
    <div
      ref={containerRef}
      className={`relative inline-block text-left ${className}`}
      onKeyDown={handleKeyDown}
    >
      {/* Selector Button */}
      <button
        ref={buttonRef}
        type="button"
        id="language-selector-button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={t("common.selectLanguage", "Select Language")}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all duration-200 outline-none"
        style={{
          background: isOpen ? "rgba(255, 255, 255, 0.12)" : "rgba(255, 255, 255, 0.05)",
          border: "1px solid var(--surface-border)",
          color: "var(--text-primary)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
          e.currentTarget.style.borderColor = "var(--surface-border-hover)";
        }}
        onMouseLeave={(e) => {
          if (!isOpen) {
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
            e.currentTarget.style.borderColor = "var(--surface-border)";
          }
        }}
      >
        {/* Globe Icon */}
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-cyan-400 shrink-0"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>

        <span className="font-semibold tracking-wide">
          {compact ? currentLocaleMeta.nativeName : currentLocaleMeta.nativeName}
        </span>

        {/* Dropdown Chevron */}
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`opacity-60 transition-transform duration-200 shrink-0 ${
            isOpen ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        >
          <path d="M2 3.5L5 6.5L8 3.5" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <ul
          ref={listboxRef}
          role="listbox"
          aria-label={t("common.selectLanguage", "Select Language")}
          aria-activedescendant={`lang-option-${focusedIndex}`}
          tabIndex={-1}
          className="absolute z-50 mt-1.5 w-52 py-1.5 rounded-xl shadow-2xl overflow-hidden animate-fade-in"
          style={{
            [align === "right" ? "right" : "left"]: 0,
            background: "linear-gradient(180deg, rgba(14, 20, 30, 0.98) 0%, rgba(9, 13, 20, 0.99) 100%)",
            border: "1px solid var(--surface-border)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.8)",
          }}
        >
          {LOCALES_LIST.map((loc, idx) => {
            const isSelected = loc.code === locale;
            const isFocused = idx === focusedIndex;

            return (
              <li
                key={loc.code}
                id={`lang-option-${idx}`}
                role="option"
                aria-selected={isSelected}
                onClick={() => handleSelect(loc.code)}
                onMouseEnter={() => setFocusedIndex(idx)}
                className="flex items-center justify-between px-3.5 py-2 cursor-pointer transition-colors text-[12.5px]"
                style={{
                  background: isFocused
                    ? "rgba(255, 255, 255, 0.08)"
                    : isSelected
                    ? "rgba(61, 142, 248, 0.12)"
                    : "transparent",
                  color: isSelected ? "#38bdf8" : "var(--text-primary)",
                }}
              >
                <div className="flex flex-col">
                  <span className="font-semibold">{loc.nativeName}</span>
                  <span className="text-[10px] text-[var(--text-tertiary)]">
                    {loc.name} · {loc.region}
                  </span>
                </div>

                {isSelected && (
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-cyan-400 shrink-0"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
