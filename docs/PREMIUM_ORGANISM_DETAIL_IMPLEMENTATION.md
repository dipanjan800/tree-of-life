# PREMIUM ORGANISM DETAIL PANEL — MILESTONE 2 IMPLEMENTATION
## Museum-Quality Organism Dossier Architecture & Epistemic Verification Report

**Project Root:** `tree-of-life`  
**Milestone:** 2 — Premium Organism Detail Panel  
**Date:** October 2026  
**Status:** COMPLETED & VERIFIED (Zero TypeScript errors, clean ESLint, 100% i18n parity, production build passing)  

---

## 1. Executive Summary

Milestone 2 transforms the slide-over `TaxonPanel` into a museum-quality, seven-section scientific dossier. The implementation adheres to the project's strict zero-fabrication epistemic standards:
- **No invented dates or numerical confidence scores**.
- **No fabricated specimen accessions, holotype numbers, or direct ancestor assertions**.
- **Transparent missing-data representation** via standardized, respectful notice cards (`MissingDataIndicator`).
- **Complete 5-language localization** (`en`, `bn-IN`, `hi-IN`, `es`, `fr`) with 100% key parity across all 95 UI strings in the `taxonPanel` category.

---

## 2. Architecture & File Structure

```
tree-of-life/
├── types/
│   ├── taxonomy.ts                       # Core 92 biological nodes (immutable)
│   ├── evidence.ts                       # Claim-level evidence models (Milestone 1)
│   └── dossier.ts                        # NEW: Organism dossier data models
├── data/
│   ├── tree.ts                           # Curated 92-node cladogram
│   ├── evidence/claims.ts                # Authoritative peer-reviewed claims
│   └── dossier.ts                        # NEW: Authentic holotype, morphologic & stratigraphic records
├── components/
│   ├── panel/
│   │   ├── TaxonPanel.tsx                # Refactored: Multi-tab museum dossier drawer
│   │   └── organism/                     # NEW: Specialized dossier tab views
│   │       ├── OrganismTabBar.tsx        # WAI-ARIA compliant keyboard-navigable tablist
│   │       ├── OverviewTab.tsx           # Nomenclature plaque, FAD/LAD, habitat & summary
│   │       ├── ClassificationTab.tsx     # 8-tier Linnaean ladder & complete cladistic path
│   │       ├── EvolutionTab.tsx          # Synapomorphies, parent, sister clades, descendants
│   │       ├── MorphologyTab.tsx         # Body plan, diagnostic traits, adaptations, dimorphism
│   │       ├── TimelineTab.tsx           # Chronostratigraphic horizon pins, ICS hierarchy
│   │       ├── EvidenceTab.tsx           # Claim cards, category filter, full inspector trigger
│   │       ├── SpecimensTab.tsx          # Authentic museum holotypes & accession records
│   │       └── MissingDataIndicator.tsx  # Standardized transparent missing-data cards
└── lib/i18n/
    ├── types.ts                          # Updated UIStrings type definitions (95 keys)
    └── translations/ui.ts                # Complete translations in en, bn-IN, hi-IN, es, fr
```

---

## 3. Implemented Sections & Features

### Section A: Overview
- **Museum Nomenclature Plaque**: Scientific name, rank badge, living/extinct status pill, and clade accent glow.
- **Estimated Origin & Horizon**: Displays First Appearance Datum (FAD) and Last Appearance Datum (LAD) in localized formats.
- **Ecological Profile**: Habitat, paleoenvironment, and paleocontinental range when documented.
- **Evidence Callout**: Direct counter badge showing verified claims with one-click access to the full modal.

### Section B: Classification
- **Linnaean Taxonomic Ladder**: Displays standard Linnaean ranks (Domain, Kingdom, Phylum, Class, Order, Family, Genus, Species) only where scientifically supported.
- **Missing Intermediate Ranks**: Transparently marked with `— (unranked / omitted in dataset)` rather than inventing arbitrary Linnaean ranks for cladistic nodes.
- **Interactive Navigation**: Every ancestor rank is clickable, updating the tree view and panel in place.
- **Complete Cladistic Lineage**: Horizontal breadcrumb trail showing the complete cladogram ancestry.

### Section C: Evolutionary History
- **Key Evolutionary Innovations (Synapomorphies)**: Authentic derived traits (e.g. bipedalism, asymmetric remiges, mobile neck).
- **Ancestral Placement**: Immediate parent clade with one-click drill-up.
- **Sister Clades (Neighbouring Lineages)**: Sibling branches sharing immediate common ancestry.
- **Descendant Radiations**: Direct child taxa in the current dataset.
- **Reticulate Introgression & Gene Flow**: Displays archaic admixture (e.g. Neanderthal-to-Homo sapiens gene flow) with genomic percentages and geographical significance.

### Section D: Morphology & Anatomy
- **High-Resolution Specimen / Reconstruction Media**: Respects `docs/IMAGE_ATTRIBUTION.md`. Artistic reconstructions are explicitly flagged with `* Artistic reconstruction (not a photograph)`.
- **Diagnostic Traits & Body Plan**: Structural adaptations and distinguishing autapomorphies.
- **Sexual Dimorphism**: Displayed strictly when scientifically documented (e.g., Australopithecus afarensis body mass dimorphism, Homo sapiens canine dimorphism); transparently marked as undocumented when inapplicable.

### Section E: Geological Timeline
- **Dual Horizon Pins**: First Appearance Datum (FAD) and Last Appearance Datum (LAD) with vertical timeline rail.
- **ICS Chronostratigraphic Placement**: Eon, Era, Period, Epoch, and ICS Stage.
- **Dating Methodology & Precision**: Transparently states calibration method (e.g., thermoluminescence, U-Pb zircon, biostratigraphy) and margin of error.

### Section F: Scientific Evidence Engine Integration
- Reuses Milestone 1's `ClaimCard` components.
- Live category filtering: Fossil Record, Molecular Clock, Geochemical Biomarkers, and Hypotheses.
- Seamless trigger for `EvidenceInspectorModal` to audit DOIs, authors, and verification logs.

### Section G: Fossils & Museum Specimens
- Authentic holotype specimen accession records:
  - *Homo sapiens*: Irhoud 1, Omo I, Herto BOU-VP-16/1
  - *Dickinsonia costata*: PIN 3993/632, SAM P40101
  - *Tiktaalik roseae*: NUFV 108 (Holotype), NUFV 110 (Paratype)
  - *Archaeopteryx lithographica*: MB.Av.100 (Berlin), NHMUK PV OR 37007 (London)
  - *Homo neanderthalensis*: Neanderthal 1 (Feldhofer 1), La Ferrassie 1
  - *Tyrannosaurus rex*: CM 9380 (Holotype), FMNH PR 2081 ('Sue')
  - *Mammuthus primigenius*: Adams Mammoth, 'Lyuba' permafrost mummy
  - *Sahelanthropus tchadensis*: TM 266-01-060-1 ('Toumaï')
  - *Australopithecus afarensis*: AL 288-1 ('Lucy'), LH 4 (Holotype)
  - *Homo erectus*: KNM-WT 15000 ('Turkana Boy'), Trinil 2 ('Java Man')
- Curating repositories, discovery years, and type localities.

### Section H: Missing-Data Transparency
- When data is not preserved in the rock record (e.g. soft tissues for deep fossil taxa) or has not yet been accessioned into the repository, a `MissingDataIndicator` is displayed explaining the epistemic reason rather than showing blank fields or inventing placeholders.

---

## 4. Multilingual Localization Coverage

Every tab label, field name, fallback note, and button is translated across all 5 supported locales:

| Locale Code | Language Name | Key Parity | Status |
| :--- | :--- | :---: | :---: |
| `en` | English | 95 / 95 keys | Verified |
| `bn-IN` | বাংলা (West Bengal) | 95 / 95 keys | Verified |
| `hi-IN` | हिन्दी | 95 / 95 keys | Verified |
| `es` | Español | 95 / 95 keys | Verified |
| `fr` | Français | 95 / 95 keys | Verified |

---

## 5. Verification & Test Suite Results

| Test / Command | Result | Notes |
| :--- | :---: | :--- |
| `npx tsx scripts/verify-i18n.ts` | **PASS (182/182 checks)** | 100% key parity across all 5 locales; all searches, claims, and taxa pass |
| `npx tsx scripts/verify-evidence.ts` | **PASS (100%)** | All 7 claims, 10 bibliographic DOIs, and claim queries verified |
| `npx tsx scripts/verify-phase3b.ts` | **PASS (100%)** | 92 nodes intact, single LUCA root, 0 cycles, tree hierarchy intact |
| `npx tsc --noEmit` | **PASS (Exit 0)** | Zero TypeScript compilation errors |
| ESLint Audit | **PASS (0 errors)** | Clean linting on all new panel and dossier components |
| `npm run build` | **PASS (Exit 0)** | Next.js 16.4.3 Turbopack build succeeded, static routes generated |

