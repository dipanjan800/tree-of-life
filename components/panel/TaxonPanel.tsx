"use client";

import React, { useEffect, useState } from "react";
import type { TaxonNode, EvidenceType } from "@/types/taxonomy";
import {
  getNodeAccentColor,
  getRankDisplay,
  getStatusLabel,
  getStatusColor,
  formatMya,
} from "@/lib/tree-utils";
import { TREE_DATA } from "@/data/tree";
import { useLanguage } from "@/lib/i18n";

function getEvidenceInfo(type?: EvidenceType): { label: string; color: string } {
  switch (type) {
    case "fossil":
      return { label: "Fossil Record", color: "#10b981" };
    case "molecular_clock":
      return { label: "Molecular Clock", color: "#3d8ef8" };
    case "phylogenomic_inference":
      return { label: "Phylogenomic Inference", color: "#8b5cf6" };
    case "hypothesis":
      return { label: "Active Hypothesis", color: "#f59e0b" };
    default:
      return { label: "Phylogenetic Analysis", color: "#60a5fa" };
  }
}

interface TaxonPanelProps {
  node: TaxonNode | null;
  onClose: () => void;
  onNavigate: (nodeId: string) => void;
  onOpenPreLuca?: () => void;
}

interface ClassificationEntry {
  rank: string;
  name: string;
  id: string;
}

function getClassification(node: TaxonNode): ClassificationEntry[] {
  const chain: ClassificationEntry[] = [];
  let current: TaxonNode | null = node;

  while (current) {
    chain.unshift({
      rank: getRankDisplay(current.rank),
      name: current.name,
      id: current.id,
    });
    if (!current.parentId) break;
    current = TREE_DATA.nodes[current.parentId] ?? null;
  }

  return chain;
}

export default function TaxonPanel({
  node,
  onClose,
  onNavigate,
  onOpenPreLuca,
}: TaxonPanelProps) {
  const { t, localizeTaxon, ui } = useLanguage();
  const [displayNode, setDisplayNode] = useState<TaxonNode | null>(node);
  const [prevNode, setPrevNode] = useState<TaxonNode | null>(node);
  const [isClosing, setIsClosing] = useState(false);

  if (node !== prevNode) {
    setPrevNode(node);
    if (node) {
      setDisplayNode(node);
      setIsClosing(false);
    } else {
      setIsClosing(true);
    }
  }

  useEffect(() => {
    if (isClosing) {
      const timer = setTimeout(() => {
        setDisplayNode(null);
        setIsClosing(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isClosing]);

  if (!displayNode) return null;

  const isVisible = Boolean(node) && !isClosing;

  const loc = localizeTaxon(displayNode);
  const displayName = loc?.name || displayNode.name;
  const displayDescription = loc?.description || displayNode.description;
  const displayConfidence = loc?.confidenceNotes || displayNode.confidenceNotes;
  const rankLabel = ui.ranks[displayNode.rank] || getRankDisplay(displayNode.rank);
  const statusText = displayNode.status ? (ui.organismStatus[displayNode.status] || getStatusLabel(displayNode.status)) : "";
  const evidenceText = displayNode.evidenceType ? (ui.evidenceTypes[displayNode.evidenceType] || getEvidenceInfo(displayNode.evidenceType).label) : "";

  const accentColor = getNodeAccentColor(displayNode);
  const classification = getClassification(displayNode);
  const children = displayNode.childIds?.map((id: string) => TREE_DATA.nodes[id]).filter((n): n is TaxonNode => n !== undefined) ?? [];
  const statusColor = getStatusColor(displayNode.status);

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        width: "min(100%, 360px)",
        maxWidth: "100%",
        zIndex: 30,
        transform: isVisible ? "translateX(0)" : "translateX(100%)",
        opacity: isVisible ? 1 : 0,
        transition: "transform 320ms cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 280ms ease",
        display: "flex",
        flexDirection: "column",
        background: "rgba(8, 12, 16, 0.94)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        borderLeft: "1px solid var(--surface-border)",
        boxShadow: "-8px 0 32px rgba(0, 0, 0, 0.6)",
      }}
      role="complementary"
      aria-label={`Information panel for ${displayName}`}
    >
      {/* Header */}
      <div
        style={{
          padding: "20px 22px 16px",
          borderBottom: "1px solid var(--surface-border)",
          position: "relative",
          flexShrink: 0,
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label={t("taxonPanel.closeAria", "Close information panel")}
          style={{
            position: "absolute",
            top: "14px",
            right: "14px",
            background: "rgba(255,255,255,0.08)",
            border: "1px solid var(--surface-border)",
            borderRadius: "6px",
            width: "36px",
            height: "36px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "var(--text-secondary)",
            fontSize: "14px",
            zIndex: 10,
            transition: "all 150ms ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.color = "var(--text-primary)";
            (e.currentTarget as HTMLElement).style.borderColor = "var(--surface-border-hover)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.color = "var(--text-tertiary)";
            (e.currentTarget as HTMLElement).style.borderColor = "var(--surface-border)";
          }}
        >
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
            <path
              d="M1.5 1.5l8 8M9.5 1.5l-8 8"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {/* Emoji + Rank badge */}
        <div className="flex items-center gap-2.5 mb-3">
          {displayNode.iconEmoji && (
            <span style={{ fontSize: "24px", lineHeight: 1 }}>{displayNode.iconEmoji}</span>
          )}
          <div
            style={{
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: accentColor,
              background: `${accentColor}18`,
              padding: "3px 8px",
              borderRadius: "4px",
              border: `1px solid ${accentColor}30`,
            }}
          >
            {rankLabel}
          </div>
        </div>

        {/* Name */}
        <h2
          style={{
            fontSize: "22px",
            fontWeight: 600,
            color: "var(--text-primary)",
            letterSpacing: "-0.02em",
            lineHeight: 1.2,
            marginBottom: "4px",
            paddingRight: "36px",
          }}
        >
          {displayNode.name}
        </h2>

        {/* Scientific name */}
        {displayNode.scientificName && displayNode.scientificName !== displayNode.name && (
          <p
            style={{
              fontSize: "13px",
              fontStyle: "italic",
              color: "var(--text-secondary)",
              marginBottom: "8px",
            }}
          >
            {displayNode.scientificName}
          </p>
        )}

        {/* Status & Date row */}
        <div className="flex items-center gap-3 mt-2">
          <div className="flex items-center gap-1.5">
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: statusColor,
                boxShadow: `0 0 6px ${statusColor}`,
              }}
            />
            <span
              style={{
                fontSize: "11.5px",
                fontWeight: 500,
                color: statusColor,
              }}
            >
              {statusText}
            </span>
          </div>
          {displayNode.estimatedOrigin && (
            <>
              <span style={{ color: "var(--surface-border-hover)", fontSize: "11px" }}>·</span>
              <span style={{ fontSize: "11.5px", color: "var(--text-tertiary)" }}>
                {displayNode.estimatedOrigin}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Scrollable content */}
      <div style={{ flex: 1, overflowY: "auto", padding: "0" }}>
        {/* Pre-LUCA Antecedents Educational Discovery Card (LUCA only) */}
        {displayNode.id === "luca" && onOpenPreLuca && (
          <div
            style={{
              padding: "16px 22px",
              background: "linear-gradient(135deg, rgba(168, 85, 247, 0.08) 0%, rgba(6, 182, 212, 0.05) 100%)",
              borderBottom: "1px solid var(--surface-border)",
              borderLeft: "3px solid #a855f7",
            }}
          >
            <div className="flex items-center gap-1.5 mb-1.5">
              <span className="text-xs">✨</span>
              <span
                style={{
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#c084fc",
                }}
              >
                Deep-Time Antecedents
              </span>
            </div>
            <p
              style={{
                fontSize: "12.5px",
                lineHeight: "1.6",
                color: "var(--text-secondary)",
                marginBottom: "12px",
              }}
            >
              LUCA is the inferred common ancestor of all modern surviving cellular life (~3.8 BYA), but was preceded by billions of years of cosmic history, planetary accretion, and prebiotic chemistry.
            </p>
            <button
              onClick={onOpenPreLuca}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "7px 15px",
                borderRadius: "100px",
                background: "rgba(168, 85, 247, 0.15)",
                border: "1px solid rgba(168, 85, 247, 0.35)",
                color: "#e9d5ff",
                fontSize: "11px",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 150ms ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(168, 85, 247, 0.25)";
                e.currentTarget.style.borderColor = "#c084fc";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(168, 85, 247, 0.15)";
                e.currentTarget.style.borderColor = "rgba(168, 85, 247, 0.35)";
              }}
            >
              <span>{t("taxonPanel.exploreAntecedents", "Explore Pre-LUCA History")}</span>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M2 5h6M5 2l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        )}

        {/* Description */}
        {displayNode.description && (
          <div
            style={{
              padding: "18px 22px",
              borderBottom: "1px solid var(--surface-border)",
            }}
          >
            <h3
              style={{
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--text-tertiary)",
                marginBottom: "10px",
              }}
            >
              About
            </h3>
            <p
              style={{
                fontSize: "13px",
                lineHeight: "1.65",
                color: "var(--text-secondary)",
              }}
            >
              {displayDescription}
            </p>
          </div>
        )}

        {/* Scientific Basis & Evidence */}
        {(displayNode.evidenceType || displayNode.confidenceNotes) && (
          <div
            style={{
              padding: "16px 22px",
              borderBottom: "1px solid var(--surface-border)",
              background: "rgba(255, 255, 255, 0.015)",
            }}
          >
            <div className="flex items-center justify-between mb-2">
              <h3
                style={{
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--text-tertiary)",
                }}
              >
                Scientific Basis
              </h3>
              {displayNode.evidenceType && (
                <span
                  style={{
                    fontSize: "9.5px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    padding: "2px 7px",
                    borderRadius: "4px",
                    color: getEvidenceInfo(displayNode.evidenceType).color,
                    background: `${getEvidenceInfo(displayNode.evidenceType).color}15`,
                    border: `1px solid ${getEvidenceInfo(displayNode.evidenceType).color}30`,
                  }}
                >
                  {evidenceText}
                </span>
              )}
            </div>
            {displayNode.confidenceNotes && (
              <p
                style={{
                  fontSize: "12px",
                  lineHeight: "1.6",
                  color: "var(--text-secondary)",
                  borderLeft: "2px solid var(--surface-border)",
                  paddingLeft: "8px",
                  marginTop: "6px",
                }}
              >
                {displayConfidence}
              </p>
            )}
          </div>
        )}

        {/* Ancient Admixture & Gene Flow */}
        {displayNode.admixtureEvents && displayNode.admixtureEvents.length > 0 && (
          <div
            style={{
              padding: "16px 22px",
              borderBottom: "1px solid var(--surface-border)",
              background: "rgba(245, 158, 11, 0.03)",
            }}
          >
            <div className="flex items-center justify-between mb-2">
              <h3
                style={{
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#f59e0b",
                }}
              >
                Ancient Admixture & Gene Flow
              </h3>
              <span
                style={{
                  fontSize: "9px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  padding: "2px 6px",
                  borderRadius: "4px",
                  color: "#f59e0b",
                  background: "rgba(245, 158, 11, 0.12)",
                  border: "1px solid rgba(245, 158, 11, 0.25)",
                }}
              >
                Reticulate Introgression
              </span>
            </div>
            {displayNode.admixtureEvents.map((evt, idx) => (
              <div
                key={idx}
                style={{
                  marginTop: idx > 0 ? "10px" : "6px",
                  padding: "10px 12px",
                  borderRadius: "6px",
                  background: "rgba(255, 255, 255, 0.025)",
                  border: "1px solid rgba(245, 158, 11, 0.2)",
                }}
              >
                <div className="flex items-center justify-between mb-1">
                  <button
                    onClick={() => onNavigate(evt.targetTaxonId)}
                    style={{
                      fontSize: "12px",
                      fontWeight: 600,
                      color: "#fbbf24",
                      textAlign: "left",
                      cursor: "pointer",
                      background: "none",
                      border: "none",
                      padding: 0,
                      textDecoration: "underline",
                      textUnderlineOffset: "2px",
                    }}
                    title={`View ${evt.targetTaxonName}`}
                  >
                    {evt.targetTaxonName} →
                  </button>
                  <span
                    style={{
                      fontSize: "9.5px",
                      fontWeight: 700,
                      color: "#fef3c7",
                      background: "rgba(245, 158, 11, 0.2)",
                      padding: "1px 5px",
                      borderRadius: "3px",
                    }}
                  >
                    {evt.percentageRange}
                  </span>
                </div>
                <div
                  style={{
                    fontSize: "11px",
                    color: "var(--text-tertiary)",
                    marginBottom: "4px",
                  }}
                >
                  {evt.period} · {evt.geography}
                </div>
                <p
                  style={{
                    fontSize: "11.5px",
                    lineHeight: "1.5",
                    color: "var(--text-secondary)",
                    margin: 0,
                  }}
                >
                  {evt.significance}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Visual Context & Provenance */}
        {displayNode.visualAsset && (
          <div
            style={{
              padding: "14px 22px",
              borderBottom: "1px solid var(--surface-border)",
            }}
          >
            <div className="flex items-center justify-between mb-2">
              <h3
                style={{
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--text-tertiary)",
                }}
              >
                Visual Provenance
              </h3>
              <span
                style={{
                  fontSize: "9px",
                  padding: "2px 6px",
                  borderRadius: "4px",
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid var(--surface-border)",
                  color: "var(--text-tertiary)",
                }}
              >
                {displayNode.visualAsset.license}
              </span>
            </div>
            {displayNode.visualAsset.isReconstruction && (
              <div
                style={{
                  display: "inline-block",
                  fontSize: "9.5px",
                  fontWeight: 600,
                  color: "var(--accent-extinct)",
                  marginBottom: "4px",
                }}
              >
                * Artistic reconstruction (not a photograph)
              </div>
            )}
            <div style={{ fontSize: "11px", color: "var(--text-secondary)", lineHeight: 1.4 }}>
              {displayNode.visualAsset.caption || displayNode.visualAsset.altText}
            </div>
            <div style={{ fontSize: "10px", color: "var(--text-tertiary)", marginTop: "3px" }}>
              Source: {displayNode.visualAsset.sourceName} · {displayNode.visualAsset.authorCredit}
            </div>
          </div>
        )}

        {/* Classification — Vertical Ancestry Trail */}
        <div
          style={{
            padding: "18px 22px",
            borderBottom: "1px solid var(--surface-border)",
          }}
        >
          <h3
            style={{
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--text-tertiary)",
              marginBottom: "14px",
            }}
          >
            Evolutionary Lineage
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {classification.map((entry, i) => {
              const isCurrentNode = entry.id === displayNode.id;
              const isLast = i === classification.length - 1;
              return (
                <div key={entry.id} style={{ display: "flex", alignItems: "stretch", minHeight: 0 }}>
                  {/* Left: Connector rail with node dot and vertical line */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      width: "20px",
                      flexShrink: 0,
                      marginRight: "10px",
                    }}
                  >
                    {/* Dot */}
                    <div
                      style={{
                        width: isCurrentNode ? 10 : 8,
                        height: isCurrentNode ? 10 : 8,
                        borderRadius: "50%",
                        background: isCurrentNode ? accentColor : "rgba(255,255,255,0.18)",
                        border: isCurrentNode ? `2px solid ${accentColor}` : "2px solid rgba(255,255,255,0.12)",
                        boxShadow: isCurrentNode ? `0 0 8px ${accentColor}60` : "none",
                        flexShrink: 0,
                        marginTop: "8px",
                        transition: "all 150ms ease",
                      }}
                    />
                    {/* Vertical connector line (except on last item) */}
                    {!isLast && (
                      <div
                        style={{
                          flex: 1,
                          width: "1.5px",
                          background: isCurrentNode
                            ? `linear-gradient(to bottom, ${accentColor}50, rgba(255,255,255,0.08))`
                            : "rgba(255,255,255,0.08)",
                          minHeight: "8px",
                        }}
                      />
                    )}
                  </div>

                  {/* Right: Rank badge + Name as clickable button */}
                  <button
                    onClick={() => !isCurrentNode && onNavigate(entry.id)}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "2px",
                      background: isCurrentNode ? `${accentColor}10` : "transparent",
                      border: isCurrentNode ? `1px solid ${accentColor}20` : "1px solid transparent",
                      borderRadius: "8px",
                      padding: "5px 10px 8px",
                      marginBottom: isLast ? 0 : "2px",
                      cursor: isCurrentNode ? "default" : "pointer",
                      textAlign: "left",
                      transition: "all 150ms ease",
                      flex: 1,
                      minWidth: 0,
                    }}
                    onMouseEnter={(e) => {
                      if (!isCurrentNode) {
                        (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
                        (e.currentTarget as HTMLElement).style.borderColor = "var(--surface-border)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isCurrentNode) {
                        (e.currentTarget as HTMLElement).style.background = "transparent";
                        (e.currentTarget as HTMLElement).style.borderColor = "transparent";
                      }
                    }}
                  >
                    {/* Rank badge */}
                    <span
                      style={{
                        fontSize: "9px",
                        fontWeight: 700,
                        color: isCurrentNode ? accentColor : "var(--text-tertiary)",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        lineHeight: 1.3,
                      }}
                    >
                      {(TREE_DATA.nodes[entry.id] ? ui.ranks[TREE_DATA.nodes[entry.id].rank] : null) || entry.rank}
                    </span>
                    {/* Name */}
                    <span
                      style={{
                        fontSize: "13px",
                        fontWeight: isCurrentNode ? 600 : 400,
                        color: isCurrentNode ? accentColor : "var(--text-secondary)",
                        lineHeight: 1.3,
                        wordBreak: "break-word",
                      }}
                    >
                      {localizeTaxon(TREE_DATA.nodes[entry.id])?.name || entry.name}
                    </span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Children / Descendants */}
        {children.length > 0 && (
          <div style={{ padding: "18px 22px", borderBottom: "1px solid var(--surface-border)" }}>
            <h3
              style={{
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--text-tertiary)",
                marginBottom: "10px",
              }}
            >
              Includes ({children.length})
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              {children.slice(0, 8).map((child: TaxonNode) => {
                if (!child) return null;
                const childAccent = getNodeAccentColor(child);
                return (
                  <button
                    key={child.id}
                    onClick={() => onNavigate(child.id)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      background: "transparent",
                      border: "1px solid transparent",
                      borderRadius: "7px",
                      padding: "6px 10px",
                      cursor: "pointer",
                      textAlign: "left",
                      transition: "all 150ms ease",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
                      (e.currentTarget as HTMLElement).style.borderColor = "var(--surface-border)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background = "transparent";
                      (e.currentTarget as HTMLElement).style.borderColor = "transparent";
                    }}
                  >
                    <div
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: childAccent,
                        flexShrink: 0,
                      }}
                    />
                    <span style={{ fontSize: "13px", color: "var(--text-secondary)" }}>
                      {localizeTaxon(child)?.name || child.name}
                    </span>
                    {child.iconEmoji && (
                      <span style={{ marginLeft: "auto", fontSize: "13px" }}>{child.iconEmoji}</span>
                    )}
                  </button>
                );
              })}
              {children.length > 8 && (
                <p style={{ fontSize: "11px", color: "var(--text-tertiary)", padding: "4px 10px" }}>
                  + {children.length - 8} more…
                </p>
              )}
            </div>
          </div>
        )}

        {/* Estimated origin detail */}
        {displayNode.estimatedOriginMya !== undefined && (
          <div style={{ padding: "18px 22px", borderBottom: "1px solid var(--surface-border)" }}>
            <h3
              style={{
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--text-tertiary)",
                marginBottom: "8px",
              }}
            >
              Evolutionary Origin
            </h3>
            <p style={{ fontSize: "13px", color: "var(--text-secondary)" }}>
              {formatMya(displayNode.estimatedOriginMya)}
            </p>
          </div>
        )}


      </div>
    </div>
  );
}
