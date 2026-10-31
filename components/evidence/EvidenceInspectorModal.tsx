"use client";

import React, { useEffect, useRef, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import type { ScientificClaim } from "@/types/evidence";
import { getClaimsForTaxon } from "@/data/evidence/claims";
import ClaimCard from "./ClaimCard";
import { useLanguage } from "@/lib/i18n";

const emptySubscribe = () => () => {};

interface EvidenceInspectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  taxonId?: string;
  taxonName?: string;
  customClaims?: ScientificClaim[];
}

export default function EvidenceInspectorModal({
  isOpen,
  onClose,
  taxonId,
  taxonName,
  customClaims,
}: EvidenceInspectorModalProps) {
  const { ui } = useLanguage();
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const tEvidence = ui.evidenceInspector;

  // Resolve claims: either passed directly or retrieved via taxonId
  const claims = customClaims ?? (taxonId ? getClaimsForTaxon(taxonId) : []);

  // Keyboard accessibility: Escape closes modal, focus management
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    // Focus the close button for accessibility
    setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !mounted) return null;

  const modalContent = (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
        background: "rgba(0, 0, 0, 0.78)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="evidence-inspector-title"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: "680px",
          maxHeight: "88vh",
          display: "flex",
          flexDirection: "column",
          background: "rgba(10, 15, 26, 0.96)",
          border: "1px solid var(--surface-border)",
          borderRadius: "16px",
          boxShadow: "0 24px 64px rgba(0, 0, 0, 0.75), 0 0 0 1px rgba(255, 255, 255, 0.05)",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "20px 24px 16px",
            borderBottom: "1px solid var(--surface-border)",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: "16px",
            background: "rgba(255, 255, 255, 0.02)",
          }}
        >
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "10.5px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "var(--accent-primary)",
                marginBottom: "4px",
              }}
            >
              <span>🔬</span>
              <span>{tEvidence.modalTitle}</span>
              {taxonName && (
                <>
                  <span style={{ color: "var(--text-tertiary)" }}>·</span>
                  <span style={{ color: "var(--text-primary)" }}>{taxonName}</span>
                </>
              )}
            </div>
            <h3
              id="evidence-inspector-title"
              style={{
                fontSize: "18px",
                fontWeight: 600,
                color: "var(--text-primary)",
                margin: 0,
                letterSpacing: "-0.01em",
              }}
            >
              {taxonName ? `${taxonName}` : tEvidence.modalTitle}
            </h3>
            <p
              style={{
                fontSize: "12px",
                color: "var(--text-tertiary)",
                margin: "4px 0 0 0",
                lineHeight: 1.4,
              }}
            >
              {tEvidence.modalSubtitle}
            </p>
          </div>

          {/* Close button */}
          <button
            ref={closeButtonRef}
            onClick={onClose}
            aria-label={tEvidence.closeBtn}
            style={{
              background: "rgba(255, 255, 255, 0.06)",
              border: "1px solid var(--surface-border)",
              borderRadius: "8px",
              width: "32px",
              height: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "var(--text-secondary)",
              transition: "all 150ms ease",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.12)";
              e.currentTarget.style.color = "var(--text-primary)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.06)";
              e.currentTarget.style.color = "var(--text-secondary)";
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M3 3l8 8M11 3L3 11"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Scrollable Content */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "20px 24px",
          }}
        >
          {claims.length > 0 ? (
            <div>
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  color: "var(--text-tertiary)",
                  marginBottom: "12px",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                }}
              >
                {claims.length} {tEvidence.viewEvidenceCount}
              </div>
              {claims.map((claim) => (
                <ClaimCard key={claim.id} claim={claim} taxonName={taxonName} />
              ))}
            </div>
          ) : (
            /* Transparent, Honest Empty State */
            <div
              style={{
                padding: "36px 20px",
                textAlign: "center",
                background: "rgba(255, 255, 255, 0.015)",
                border: "1px dashed var(--surface-border)",
                borderRadius: "12px",
                margin: "12px 0",
              }}
            >
              <div style={{ fontSize: "32px", marginBottom: "12px" }}>🔍</div>
              <h4
                style={{
                  fontSize: "15px",
                  fontWeight: 600,
                  color: "var(--text-primary)",
                  marginBottom: "8px",
                }}
              >
                {tEvidence.emptyTitle}
              </h4>
              <p
                style={{
                  fontSize: "12.5px",
                  lineHeight: 1.6,
                  color: "var(--text-secondary)",
                  maxWidth: "460px",
                  margin: "0 auto 16px",
                }}
              >
                {tEvidence.emptyDescription}
              </p>
              <div
                style={{
                  fontSize: "11px",
                  color: "var(--text-tertiary)",
                  background: "rgba(0, 0, 0, 0.25)",
                  padding: "8px 14px",
                  borderRadius: "6px",
                  display: "inline-block",
                }}
              >
                Zero-Fabrication Policy: No synthetic citations or arbitrary confidence scores are fabricated.
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            padding: "14px 24px",
            borderTop: "1px solid var(--surface-border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "rgba(255, 255, 255, 0.015)",
          }}
        >
          <div style={{ fontSize: "11px", color: "var(--text-tertiary)" }}>
            Standard: Peer-Reviewed Literature &amp; Stratigraphic Formations
          </div>
          <button
            onClick={onClose}
            style={{
              padding: "6px 14px",
              borderRadius: "8px",
              background: "rgba(255, 255, 255, 0.08)",
              border: "1px solid var(--surface-border)",
              color: "var(--text-primary)",
              fontSize: "12px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            {tEvidence.closeBtn}
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
