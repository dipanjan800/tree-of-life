"use client";

import React, { useState } from "react";
import type { ScientificClaim, EvidenceCategory, ScientificReference } from "@/types/evidence";
import { useLanguage } from "@/lib/i18n";

interface ClaimCardProps {
  claim: ScientificClaim;
  taxonName?: string;
}

export function getCategoryColor(category: EvidenceCategory): string {
  switch (category) {
    case "fossil":
      return "#10b981"; // Emerald
    case "molecular_clock":
      return "#3d8ef8"; // Blue
    case "geochemical_biomarkers":
      return "#06b6d4"; // Cyan
    case "hypothesis":
      return "#f59e0b"; // Amber
    case "phylogenomic_inference":
      return "#8b5cf6"; // Purple
    case "comparative_anatomy":
      return "#ec4899"; // Pink
    default:
      return "#64748b"; // Slate
  }
}

export function getCategoryIcon(category: EvidenceCategory): string {
  switch (category) {
    case "fossil":
      return "🦴";
    case "molecular_clock":
      return "⏱️";
    case "geochemical_biomarkers":
      return "🧪";
    case "hypothesis":
      return "💡";
    case "phylogenomic_inference":
      return "🧬";
    case "comparative_anatomy":
      return "🔬";
    default:
      return "📄";
  }
}

export default function ClaimCard({ claim }: ClaimCardProps) {
  const { ui, localizeClaim } = useLanguage();
  const [showNotesForRefId, setShowNotesForRefId] = useState<string | null>(null);

  const loc = localizeClaim(claim);
  const displayStatement = loc?.statement || claim.statement;
  const displayExplanation = loc?.explanation || claim.explanation;
  const displayFormation = loc?.geologicalFormation || claim.geologicalFormation;
  const displayUncertainty = loc?.uncertaintyOrLimitations || claim.uncertaintyOrLimitations;

  const tEvidence = ui.evidenceInspector;
  const categoryColor = getCategoryColor(claim.category);
  const categoryIcon = getCategoryIcon(claim.category);
  const categoryLabel =
    tEvidence.categories[claim.category] || claim.category.replace(/_/g, " ");

  const isVerifiedClaim = claim.verificationStatus === "verified";

  const toggleRefNotes = (refId: string) => {
    setShowNotesForRefId((prev) => (prev === refId ? null : refId));
  };

  return (
    <div
      style={{
        background: "rgba(15, 23, 42, 0.65)",
        border: "1px solid var(--surface-border)",
        borderRadius: "12px",
        padding: "18px 20px",
        marginBottom: "16px",
        boxShadow: "0 4px 16px rgba(0, 0, 0, 0.3)",
      }}
    >
      {/* Category & Status Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "8px",
          marginBottom: "12px",
        }}
      >
        {/* Category Pill */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            padding: "3px 10px",
            borderRadius: "6px",
            background: `${categoryColor}18`,
            border: `1px solid ${categoryColor}40`,
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            color: categoryColor,
          }}
        >
          <span aria-hidden="true">{categoryIcon}</span>
          <span>{categoryLabel}</span>
        </div>

        {/* Claim Verification Status Badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "5px",
            padding: "3px 9px",
            borderRadius: "100px",
            fontSize: "10.5px",
            fontWeight: 600,
            background: isVerifiedClaim ? "rgba(16, 185, 129, 0.12)" : "rgba(245, 158, 11, 0.12)",
            border: `1px solid ${isVerifiedClaim ? "rgba(16, 185, 129, 0.35)" : "rgba(245, 158, 11, 0.35)"}`,
            color: isVerifiedClaim ? "#34d399" : "#fbbf24",
          }}
        >
          <span>{isVerifiedClaim ? "✓" : "⏳"}</span>
          <span>{isVerifiedClaim ? tEvidence.verifiedClaim : tEvidence.underReview}</span>
        </div>
      </div>

      {/* Primary Scientific Statement */}
      <h4
        style={{
          fontSize: "14px",
          fontWeight: 600,
          color: "var(--text-primary)",
          lineHeight: 1.5,
          marginBottom: "10px",
          letterSpacing: "-0.01em",
        }}
      >
        {displayStatement}
      </h4>

      {/* Supporting Empirical Explanation */}
      <p
        style={{
          fontSize: "12.5px",
          lineHeight: 1.65,
          color: "var(--text-secondary)",
          marginBottom: "14px",
        }}
      >
        {displayExplanation}
      </p>

      {/* Geological Formation & Specimen Accessions (if available) */}
      {(displayFormation || (claim.specimenIds && claim.specimenIds.length > 0)) && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            padding: "10px 12px",
            background: "rgba(255, 255, 255, 0.025)",
            border: "1px solid var(--surface-border)",
            borderRadius: "8px",
            marginBottom: "14px",
            fontSize: "11.5px",
          }}
        >
          {displayFormation && (
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ color: "var(--text-tertiary)", fontWeight: 600 }}>
                {tEvidence.formationTitle}:
              </span>
              <span style={{ color: "var(--text-secondary)", fontWeight: 500 }}>
                {displayFormation}
              </span>
            </div>
          )}
          {claim.specimenIds && claim.specimenIds.length > 0 && (
            <div style={{ display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap" }}>
              <span style={{ color: "var(--text-tertiary)", fontWeight: 600 }}>
                {tEvidence.specimensTitle}:
              </span>
              <span style={{ color: "#93c5fd", fontFamily: "monospace", fontSize: "11px" }}>
                {claim.specimenIds.join(", ")}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Scientific Uncertainty & Limitations Callout */}
      {displayUncertainty && (
        <div
          style={{
            padding: "10px 14px",
            background: "rgba(245, 158, 11, 0.04)",
            borderLeft: "3px solid #f59e0b",
            borderRadius: "0 8px 8px 0",
            marginBottom: "14px",
          }}
        >
          <div
            style={{
              fontSize: "10.5px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              color: "#f59e0b",
              marginBottom: "4px",
            }}
          >
            {tEvidence.uncertaintyTitle}
          </div>
          <p
            style={{
              fontSize: "12px",
              lineHeight: 1.55,
              color: "var(--text-secondary)",
              margin: 0,
            }}
          >
            {displayUncertainty}
          </p>
        </div>
      )}

      {/* Peer-Reviewed Bibliographic References */}
      {claim.references && claim.references.length > 0 && (
        <div style={{ marginTop: "14px" }}>
          <div
            style={{
              fontSize: "10.5px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "var(--text-tertiary)",
              marginBottom: "8px",
            }}
          >
            {tEvidence.referencesTitle} ({claim.references.length})
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {claim.references.map((ref: ScientificReference) => {
              const isRefVerified = ref.verificationStatus === "verified";
              const showNotes = showNotesForRefId === ref.id;

              return (
                <div
                  key={ref.id}
                  style={{
                    padding: "10px 12px",
                    background: isRefVerified ? "rgba(255, 255, 255, 0.02)" : "rgba(245, 158, 11, 0.02)",
                    border: `1px solid ${isRefVerified ? "var(--surface-border)" : "rgba(245, 158, 11, 0.25)"}`,
                    borderRadius: "8px",
                    fontSize: "11.5px",
                  }}
                >
                  {/* Top Reference Metadata Row */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "8px",
                      marginBottom: "4px",
                    }}
                  >
                    <div style={{ fontWeight: 600, color: "var(--text-primary)" }}>
                      {ref.authors.join(", ")} {ref.year ? `(${ref.year})` : ""}
                    </div>

                    {/* Verified vs Unverified Pill */}
                    <div
                      style={{
                        fontSize: "9.5px",
                        fontWeight: 700,
                        padding: "2px 6px",
                        borderRadius: "4px",
                        background: isRefVerified
                          ? "rgba(16, 185, 129, 0.12)"
                          : "rgba(245, 158, 11, 0.12)",
                        color: isRefVerified ? "#34d399" : "#fbbf24",
                        border: `1px solid ${isRefVerified ? "rgba(16, 185, 129, 0.3)" : "rgba(245, 158, 11, 0.3)"}`,
                        flexShrink: 0,
                      }}
                    >
                      {isRefVerified ? `✓ ${tEvidence.verifiedSource}` : `⏳ ${tEvidence.unverifiedSource}`}
                    </div>
                  </div>

                  {/* Title & Journal */}
                  <div style={{ fontStyle: "italic", color: "var(--text-secondary)", marginBottom: "4px" }}>
                    &ldquo;{ref.title}&rdquo;
                  </div>
                  {loc?.referenceExplanations?.[ref.id] && (
                    <div style={{ color: "var(--accent-primary)", fontSize: "11px", marginBottom: "4px" }}>
                      <span style={{ color: "var(--text-tertiary)" }}>{tEvidence.translatedTitleLabel}: </span>
                      {loc.referenceExplanations[ref.id]}
                    </div>
                  )}
                  <div style={{ color: "var(--text-tertiary)", fontSize: "11px", marginBottom: "6px" }}>
                    {ref.journalOrPublisher}
                  </div>

                  {/* DOI Link & Verification Details Toggle */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                      gap: "8px",
                      marginTop: "6px",
                    }}
                  >
                    {ref.doi ? (
                      <a
                        href={`https://doi.org/${ref.doi}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "4px",
                          color: "var(--accent-primary)",
                          textDecoration: "none",
                          fontSize: "11px",
                          fontWeight: 500,
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.textDecoration = "underline";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.textDecoration = "none";
                        }}
                      >
                        <span>{tEvidence.doiLabel}: {ref.doi}</span>
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <path
                            d="M3 1h6v6M9 1L1 9"
                            stroke="currentColor"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </a>
                    ) : (
                      <span style={{ color: "var(--text-tertiary)", fontSize: "11px" }}>
                        {tEvidence.doiPending}
                      </span>
                    )}

                    {ref.verificationNotes && (
                      <button
                        onClick={() => toggleRefNotes(ref.id)}
                        style={{
                          background: "none",
                          border: "none",
                          color: "var(--text-tertiary)",
                          fontSize: "10.5px",
                          cursor: "pointer",
                          textDecoration: "underline",
                          padding: 0,
                        }}
                      >
                        {showNotes ? tEvidence.hideAuditDetails : tEvidence.showAuditDetails}
                      </button>
                    )}
                  </div>

                  {/* Verification Audit Notes (Expands when clicked) */}
                  {showNotes && ref.verificationNotes && (
                    <div
                      style={{
                        marginTop: "8px",
                        padding: "6px 10px",
                        background: "rgba(0, 0, 0, 0.35)",
                        borderLeft: `2px solid ${isRefVerified ? "#10b981" : "#f59e0b"}`,
                        borderRadius: "4px",
                        fontSize: "11px",
                        color: "var(--text-secondary)",
                        lineHeight: 1.45,
                      }}
                    >
                      <strong>{tEvidence.auditLogLabel}:</strong> {loc?.referenceVerificationNotes?.[ref.id] || ref.verificationNotes}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Review Date Footer */}
      {claim.lastReviewedDate && (
        <div
          style={{
            marginTop: "12px",
            fontSize: "10px",
            color: "var(--text-tertiary)",
            textAlign: "right",
          }}
        >
          {tEvidence.lastReviewed}: {claim.lastReviewedDate}
        </div>
      )}
    </div>
  );
}

