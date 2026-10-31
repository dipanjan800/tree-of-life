"use client";

import React, { useEffect, useState } from "react";
import type { TaxonNode } from "@/types/taxonomy";
import {
  getNodeAccentColor,
  getRankDisplay,
  getStatusLabel,
  getStatusColor,
} from "@/lib/tree-utils";
import { useLanguage } from "@/lib/i18n";
import TaxonIcon from "@/components/ui/TaxonIcon";
import { getClaimsForTaxon } from "@/data/evidence/claims";
import { getTaxonDossier } from "@/data/dossier";
import EvidenceInspectorModal from "@/components/evidence/EvidenceInspectorModal";
import OrganismTabBar, { type OrganismTabId } from "./organism/OrganismTabBar";
import OverviewTab from "./organism/OverviewTab";
import ClassificationTab from "./organism/ClassificationTab";
import EvolutionTab from "./organism/EvolutionTab";
import MorphologyTab from "./organism/MorphologyTab";
import TimelineTab from "./organism/TimelineTab";
import EvidenceTab from "./organism/EvidenceTab";
import SpecimensTab from "./organism/SpecimensTab";

interface TaxonPanelProps {
  node: TaxonNode | null;
  onClose: () => void;
  onNavigate: (nodeId: string) => void;
  onOpenPreLuca?: () => void;
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
  const [isEvidenceModalOpen, setIsEvidenceModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<OrganismTabId>("overview");

  if (node !== prevNode) {
    setPrevNode(node);
    if (node) {
      setDisplayNode(node);
      setIsClosing(false);
      // Reset to overview when opening a new taxon
      setActiveTab("overview");
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
  const rankLabel = ui.ranks[displayNode.rank] || getRankDisplay(displayNode.rank);
  const statusColor = getStatusColor(displayNode.status);
  const accentColor = getNodeAccentColor(displayNode);

  // Retrieve curated scientific dossier and linked claims
  const dossier = getTaxonDossier(displayNode.id);
  const taxonClaims = getClaimsForTaxon(displayNode.id);

  const hasEvidence = taxonClaims.length > 0;
  const hasSpecimens = Boolean(dossier?.specimens && dossier.specimens.length > 0);
  const hasMorphology = Boolean(
    dossier?.morphology?.bodyPlan ||
      (dossier?.morphology?.distinguishingFeatures && dossier.morphology.distinguishingFeatures.length > 0) ||
      displayNode.visualAsset
  );

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        width: "min(100%, 380px)",
        maxWidth: "100%",
        zIndex: 30,
        transform: isVisible ? "translateX(0)" : "translateX(100%)",
        opacity: isVisible ? 1 : 0,
        transition: "transform 320ms cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 280ms ease",
        display: "flex",
        flexDirection: "column",
        background: "rgba(8, 12, 16, 0.96)",
        backdropFilter: "blur(24px) saturate(180%)",
        WebkitBackdropFilter: "blur(24px) saturate(180%)",
        borderLeft: "1px solid var(--surface-border)",
        boxShadow: "-12px 0 36px rgba(0, 0, 0, 0.65)",
      }}
      role="complementary"
      aria-label={`${t("taxonPanel.panelAria", "Information panel for")} ${displayName}`}
    >
      {/* ── Top Header ────────────────────────────────────────── */}
      <div
        style={{
          padding: "16px 18px 12px",
          borderBottom: "1px solid var(--surface-border)",
          position: "relative",
          flexShrink: 0,
          background: "linear-gradient(180deg, rgba(255,255,255,0.03) 0%, transparent 100%)",
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
            width: "32px",
            height: "32px",
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
            e.currentTarget.style.color = "var(--text-primary)";
            e.currentTarget.style.borderColor = "var(--surface-border-hover)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "var(--text-secondary)";
            e.currentTarget.style.borderColor = "var(--surface-border)";
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

        {/* Icon + Rank badge */}
        <div className="flex items-center gap-2 mb-2 pr-10">
          <TaxonIcon node={displayNode} size={22} />
          <div
            style={{
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: accentColor,
              background: `${accentColor}18`,
              padding: "2px 7px",
              borderRadius: "4px",
              border: `1px solid ${accentColor}30`,
            }}
          >
            {rankLabel}
          </div>
          {displayNode.status && (
            <div
              className="flex items-center gap-1.5"
              style={{
                fontSize: "10px",
                color: statusColor,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              <div
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  background: statusColor,
                  flexShrink: 0,
                }}
              />
              <span>{ui.organismStatus[displayNode.status] || getStatusLabel(displayNode.status)}</span>
            </div>
          )}
        </div>

        {/* Taxon Titles */}
        <h2
          style={{
            fontSize: "18px",
            fontWeight: 700,
            color: "var(--text-primary)",
            lineHeight: 1.2,
            letterSpacing: "-0.02em",
            margin: 0,
            paddingRight: "36px",
          }}
        >
          {displayName}
        </h2>

        {displayNode.scientificName && displayNode.scientificName !== displayName && (
          <p
            style={{
              fontSize: "13.5px",
              fontStyle: "italic",
              color: "var(--text-accent)",
              margin: "3px 0 0",
              fontWeight: 500,
              letterSpacing: "0.01em",
            }}
          >
            {displayNode.scientificName}
          </p>
        )}
      </div>

      {/* ── Multi-Tab Dossier Bar ─────────────────────────────── */}
      <OrganismTabBar
        activeTab={activeTab}
        onChangeTab={setActiveTab}
        hasEvidence={hasEvidence}
        hasSpecimens={hasSpecimens}
        hasMorphology={hasMorphology}
      />

      {/* ── Tab Content Container (Scrollable) ────────────────── */}
      <div
        id={`dossier-panel-${activeTab}`}
        role="tabpanel"
        aria-labelledby={`dossier-tab-${activeTab}`}
        className="flex-1 overflow-y-auto"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "rgba(255,255,255,0.1) transparent",
        }}
      >
        {activeTab === "overview" && (
          <OverviewTab
            node={displayNode}
            dossier={dossier}
            displayName={displayName}
            displayDescription={displayDescription}
            accentColor={accentColor}
            onOpenEvidence={() => setIsEvidenceModalOpen(true)}
            evidenceCount={taxonClaims.length}
          />
        )}

        {activeTab === "classification" && (
          <ClassificationTab
            node={displayNode}
            onNavigate={onNavigate}
            accentColor={accentColor}
          />
        )}

        {activeTab === "evolution" && (
          <EvolutionTab
            node={displayNode}
            dossier={dossier}
            onNavigate={onNavigate}
            onOpenPreLuca={onOpenPreLuca}
            accentColor={accentColor}
          />
        )}

        {activeTab === "morphology" && (
          <MorphologyTab
            node={displayNode}
            dossier={dossier}
            accentColor={accentColor}
          />
        )}

        {activeTab === "timeline" && (
          <TimelineTab
            node={displayNode}
            dossier={dossier}
            accentColor={accentColor}
          />
        )}

        {activeTab === "evidence" && (
          <EvidenceTab
            node={displayNode}
            claims={taxonClaims}
            accentColor={accentColor}
            onOpenInspectorModal={() => setIsEvidenceModalOpen(true)}
          />
        )}

        {activeTab === "specimens" && (
          <SpecimensTab
            node={displayNode}
            dossier={dossier}
            accentColor={accentColor}
          />
        )}
      </div>

      {/* ── Scientific Evidence Inspector Modal ───────────────── */}
      <EvidenceInspectorModal
        isOpen={isEvidenceModalOpen}
        onClose={() => setIsEvidenceModalOpen(false)}
        taxonId={displayNode.id}
        taxonName={displayName}
        customClaims={taxonClaims}
      />
    </div>
  );
}
