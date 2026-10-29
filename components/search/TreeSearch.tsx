"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import type { TaxonNode, SearchResult } from "@/types/taxonomy";
import { searchNodes } from "@/lib/tree-utils";
import { getNodeAccentColor, getRankDisplay } from "@/lib/tree-utils";
import { useLanguage } from "@/lib/i18n";

interface TreeSearchProps {
  onSelectResult: (node: TaxonNode) => void;
  onClose?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export default function TreeSearch({
  onSelectResult,
  onClose,
  className,
  style,
}: TreeSearchProps) {
  const { dict, localizeTaxon, t, ui } = useLanguage();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Debounce search with multilingual support
  useEffect(() => {
    if (!query.trim()) return;
    const timer = setTimeout(() => {
      const r = searchNodes(query, 8, dict.taxa);
      setResults(r);
      setIsOpen(r.length > 0);
      setActiveIndex(-1);
    }, 80);
    return () => clearTimeout(timer);
  }, [query, dict.taxa]);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSelect = useCallback(
    (node: TaxonNode) => {
      const loc = localizeTaxon(node);
      setQuery(loc?.name || node.name);
      setIsOpen(false);
      setResults([]);
      onSelectResult(node);
    },
    [onSelectResult, localizeTaxon]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!isOpen) return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, results.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, -1));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (activeIndex >= 0 && results[activeIndex]) {
          handleSelect(results[activeIndex].node);
        } else if (results[0]) {
          handleSelect(results[0].node);
        }
      } else if (e.key === "Escape") {
        setIsOpen(false);
        setQuery("");
        inputRef.current?.blur();
        onClose?.();
      }
    },
    [isOpen, results, activeIndex, handleSelect, onClose]
  );

  const handleClear = useCallback(() => {
    setQuery("");
    setResults([]);
    setIsOpen(false);
    inputRef.current?.focus();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${className || ""}`}
      style={style}
    >
      {/* Search input */}
      <div
        className="relative flex items-center w-full"
        style={{
          background: "rgba(255,255,255,0.05)",
          border: `1px solid ${isOpen ? "rgba(61,142,248,0.4)" : "var(--surface-border)"}`,
          borderRadius: "var(--radius-md)",
          transition: "border-color 200ms ease",
        }}
      >
        {/* Search icon */}
        <div
          className="absolute left-3 flex items-center pointer-events-none"
          style={{ color: "var(--text-tertiary)" }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.3" />
            <path d="M9.5 9.5L12.5 12.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
        </div>

        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => {
            const val = e.target.value;
            setQuery(val);
            if (!val.trim()) {
              setResults([]);
              setIsOpen(false);
            }
          }}
          onKeyDown={handleKeyDown}
          onFocus={() => query && setIsOpen(results.length > 0)}
          placeholder={t("search.placeholder", "Search species, genus, family...")}
          aria-label={t("search.searchAria", "Search the tree of life")}
          aria-autocomplete="list"
          aria-controls={isOpen ? "search-results" : undefined}
          aria-activedescendant={activeIndex >= 0 ? `result-${activeIndex}` : undefined}
          style={{
            background: "transparent",
            border: "none",
            outline: "none",
            width: "100%",
            minWidth: 0,
            padding: "8px 34px 8px 34px",
            color: "var(--text-primary)",
            fontSize: "13px",
            fontFamily: "inherit",
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        />

        {/* Clear button */}
        {query && (
          <button
            className="absolute right-2.5 flex items-center justify-center"
            style={{
              color: "var(--text-tertiary)",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "4px",
              borderRadius: "4px",
            }}
            onClick={handleClear}
            aria-label={t("common.clear", "Clear search")}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </button>
        )}
      </div>

      {/* Results dropdown */}
      {isOpen && results.length > 0 && (
        <div
          id="search-results"
          role="listbox"
          aria-label={t("search.matchingTaxa", "Matching Taxa")}
          className="absolute top-full mt-1.5 w-full glass-panel rounded-xl overflow-hidden shadow-2xl"
          style={{
            zIndex: 100,
            border: "1px solid var(--surface-border)",
          }}
        >
          <div style={{ maxHeight: "min(360px, 60vh)", overflowY: "auto" }}>
            {results.map((result, i) => {
              const { node } = result;
              const loc = localizeTaxon(node);
              const displayName = loc?.name || node.name;
              const displayRank = ui.ranks[node.rank] || getRankDisplay(node.rank);
              const accentColor = getNodeAccentColor(node);
              const isActive = i === activeIndex;

              return (
                <button
                  key={node.id}
                  id={`result-${i}`}
                  role="option"
                  aria-selected={isActive}
                  className="search-result-item w-full text-left"
                  style={{
                    padding: "11px 16px",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    background: isActive ? "rgba(61,142,248,0.08)" : "transparent",
                    border: "none",
                    cursor: "pointer",
                    borderBottom: i < results.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                  }}
                  onClick={() => handleSelect(node)}
                  onMouseEnter={() => setActiveIndex(i)}
                >
                  {/* Color dot */}
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: accentColor,
                      flexShrink: 0,
                    }}
                  />

                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                      <span
                        style={{
                          fontSize: "13px",
                          fontWeight: 500,
                          color: "var(--text-primary)",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {displayName}
                      </span>
                      {node.status === "extinct" && (
                        <span style={{ fontSize: "11px", color: "var(--accent-extinct)" }}>†</span>
                      )}
                    </div>
                    {node.scientificName && (
                      <div
                        style={{
                          fontSize: "11px",
                          color: "var(--text-tertiary)",
                          fontStyle: "italic",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {node.scientificName}
                      </div>
                    )}
                  </div>

                  {/* Rank badge */}
                  <span
                    style={{
                      fontSize: "10px",
                      fontWeight: 600,
                      letterSpacing: "0.06em",
                      color: "var(--text-tertiary)",
                      background: "rgba(255,255,255,0.06)",
                      padding: "2px 6px",
                      borderRadius: "4px",
                      textTransform: "uppercase",
                      flexShrink: 0,
                    }}
                  >
                    {displayRank}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* No results */}
      {isOpen && results.length === 0 && query.trim() && (
        <div
          className="absolute top-full mt-1.5 w-full glass-panel rounded-xl"
          style={{
            zIndex: 100,
            padding: "16px",
            textAlign: "center",
            color: "var(--text-tertiary)",
            fontSize: "13px",
          }}
        >
          {t("search.noResultsFor", "No results for")} &quot;{query}&quot;
        </div>
      )}
    </div>
  );
}
