# Scientific Evidence & Confidence Engine (Milestone 1) — Implementation Report

**Project:** TREE OF LIFE – FUCA  
**Milestone:** 1 — Scientific Evidence & Confidence Engine  
**Status:** Completed & Fully Verified  
**Date:** 2026-10-31  

---

## 1. Executive Summary

Milestone 1 introduces the **Scientific Evidence & Confidence Engine** to the Tree of Life interactive application. The engine establishes an epistemologically rigorous, strongly typed scientific claim model and interactive Evidence Inspector interface without inventing DOIs, publication years, or confidence scores, and without disrupting the existing 92-node cladogram, mobile responsive interactions, or localization architecture.

---

## 2. Files Created and Modified

### Created Files
1. [`types/evidence.ts`](file:///c:/Users/HP/Downloads/antigravity/TREE-OF-LIFE/tree-of-life/types/evidence.ts)  
   - Strong TypeScript types for evidence claims, bibliographic references, verification states, and query filters.
2. [`data/evidence/claims.ts`](file:///c:/Users/HP/Downloads/antigravity/TREE-OF-LIFE/tree-of-life/data/evidence/claims.ts)  
   - Curated evidence claim registry with real peer-reviewed scientific citations and explicit candidate separation.
   - Query helper functions: `getClaimsForTaxon`, `getAllClaims`, `getClaimById`, `getClaimsByCategory`, `getClaimsByVerificationStatus`.
3. [`components/evidence/ClaimCard.tsx`](file:///c:/Users/HP/Downloads/antigravity/TREE-OF-LIFE/tree-of-life/components/evidence/ClaimCard.tsx)  
   - Reusable claim card component displaying category badges, verification status, scientific statements, explanations, geological formation and specimen catalog IDs, uncertainty caveats, and interactive reference cards with direct DOI links.
4. [`components/evidence/EvidenceInspectorModal.tsx`](file:///c:/Users/HP/Downloads/antigravity/TREE-OF-LIFE/tree-of-life/components/evidence/EvidenceInspectorModal.tsx)  
   - Accessible modal dialog using React `createPortal` and `useSyncExternalStore` for clean SSR/hydration boundary handling.
   - Features backdrop blur, keyboard `Escape` dismissal, focus trap, and transparent localized empty states.
5. [`scripts/verify-evidence.ts`](file:///c:/Users/HP/Downloads/antigravity/TREE-OF-LIFE/tree-of-life/scripts/verify-evidence.ts)  
   - Comprehensive automated test suite auditing claim uniqueness, schema integrity, DOI formatting (`10.*`), candidate reference notes, query helpers, and 100% i18n string parity across all 5 supported locales.

### Modified Files
1. [`types/taxonomy.ts`](file:///c:/Users/HP/Downloads/antigravity/TREE-OF-LIFE/tree-of-life/types/taxonomy.ts)  
   - Added optional non-breaking `claimIds?: string[];` property to `TaxonNode` interface.
2. [`lib/i18n/types.ts`](file:///c:/Users/HP/Downloads/antigravity/TREE-OF-LIFE/tree-of-life/lib/i18n/types.ts)  
   - Added `EvidenceCategory` import and `evidenceInspector` interface to `UIStrings`.
3. [`lib/i18n/translations/ui.ts`](file:///c:/Users/HP/Downloads/antigravity/TREE-OF-LIFE/tree-of-life/lib/i18n/translations/ui.ts)  
   - Added full translations for `evidenceInspector` across all 5 supported locales: `en` (English), `bn-IN` (Bengali), `hi-IN` (Hindi), `es` (Spanish), and `fr` (French).
4. [`components/panel/TaxonPanel.tsx`](file:///c:/Users/HP/Downloads/antigravity/TREE-OF-LIFE/tree-of-life/components/panel/TaxonPanel.tsx)  
   - Integrated `taxonClaims` resolution for the selected taxon.
   - Added the interactive `🔬 Inspect Scientific Evidence (N)` button in the Scientific Basis card.
   - Integrated `<EvidenceInspectorModal>` at root portal level.

---

## 3. Implemented Functionality

### 3.1 Strongly Typed Scientific Evidence Data Model
The engine is structured around extensible TypeScript schemas in [`types/evidence.ts`](file:///c:/Users/HP/Downloads/antigravity/TREE-OF-LIFE/tree-of-life/types/evidence.ts):
- **Evidence Categories (`EvidenceCategory`)**:
  - `fossil`: Stratigraphic and morphological fossil records.
  - `molecular_clock`: Genomic divergence estimations and sequencing introgression.
  - `geochemical_biomarkers`: Stable isotopes, diagnostic steranes, and lipid biomarkers.
  - `hypothesis`: Peer-reviewed speculative evolutionary models.
  - `phylogenomic_inference`: Multi-locus sequence alignment and tree reconciliation.
  - `comparative_anatomy`: Homologous synapomorphies and morphological transition series.
- **Scientific Claim (`ScientificClaim`)**:
  - Stable unique identifier (`id`).
  - Related taxon identifiers (`taxonIds`).
  - Concise scientific statement (`statement`).
  - Supporting contextual explanation (`explanation`).
  - Evidence category (`category`).
  - Specific uncertainty or limitations (`uncertaintyOrLimitations`).
  - Verification state (`verificationStatus`: `'verified' | 'unverified_candidate' | 'disputed'`).
  - Geological formation name (`geologicalFormation`) & Specimen catalog IDs (`specimenIds`) where applicable.
  - Genuine review timestamp (`lastReviewedDate`).
  - Supporting bibliographic references (`references`).
- **Bibliographic Reference (`ScientificReference`)**:
  - Author list, publication year, title, journal/publisher, DOI or URL.
  - Verification status (`verificationStatus`: `'verified' | 'unverified_candidate'`).
  - Verification audit notes (`verificationNotes`) detailing what remains to be checked for candidate records.

### 3.2 Epistemological Strictness (Zero Fabrication)
- **No Invented Confidence Scores**: Avoided pseudoscientific numerical percentages (e.g. "97.4% confidence"). Instead, confidence is articulated through verifiable empirical categories, explicit uncertainty notes, and peer-reviewed citations.
- **Demarcation of Candidates**: Unverified hypotheses (such as the First Universal Common Ancestor [FUCA] model) are explicitly flagged with `unverified_candidate` and mandatory `verificationNotes` explaining remaining research requirements.

### 3.3 Evidence Inspector UI & TaxonPanel Integration
- **Contextual Access**: When a taxon is selected in the Tree Explorer (e.g. *Homo sapiens*, *Dickinsonia costata*, *Tiktaalik roseae*), the Scientific Basis section displays an active badge button indicating available evidence records.
- **Portaled Modal Window**: Renders directly via `createPortal` to `document.body`, eliminating CSS stacking-context clipping from the panel's CSS transform rules.
- **Full Accessibility**: Keyboard `Escape` key closes the modal, focus is automatically managed, and `aria-modal="true"` dialog attributes are preserved.
- **Transparent Empty State**: Taxa without curated claims display a localized empty state explaining ongoing provenance indexing, without inventing dummy data.

### 3.4 Complete Internationalization (i18n)
Full localized strings and category badges are provided across all 5 supported application languages:
- English (`en`)
- Bengali (`bn-IN`)
- Hindi (`hi-IN`)
- Spanish (`es`)
- French (`fr`)

---

## 4. Bibliographic Audit: Verified Peer-Reviewed References

All verified references link to confirmed peer-reviewed publications with genuine DOIs:

1. **Jebel Irhoud Modern Humans (~315 ka)**
   - *Hublin, J.-J. et al. (2017)*: "New fossils from Jebel Irhoud, Morocco and the pan-African origin of *Homo sapiens*." *Nature*, 546(7657), 289–296. [DOI: 10.1038/nature22336](https://doi.org/10.1038/nature22336).
   - *Richter, D. et al. (2017)*: "The age of the hominin fossils from Jebel Irhoud, Morocco, and the origins of the Middle Stone Age." *Nature*, 546(7657), 293–296. [DOI: 10.1038/nature22335](https://doi.org/10.1038/nature22335).

2. **Dickinsonia Cholesterol Biomarkers (558 Ma)**
   - *Bobrovskiy, I. et al. (2018)*: "Ancient steroids establish the Ediacaran fossil *Dickinsonia* as one of the earliest animals." *Science*, 361(6408), 1246–1249. [DOI: 10.1126/science.aat7228](https://doi.org/10.1126/science.aat7228).

3. **Tiktaalik Transitional Tetrapod (375 Ma)**
   - *Daeschler, E. B., Shubin, N. H. & Jenkins, F. A. (2006)*: "A Devonian tetrapod-like fish and the evolution of the tetrapod body plan." *Nature*, 440(7085), 757–763. [DOI: 10.1038/nature04639](https://doi.org/10.1038/nature04639).
   - *Shubin, N. H., Daeschler, E. B. & Jenkins, F. A. (2006)*: "The pectoral fin of *Tiktaalik roseae* and the origin of the tetrapod limb." *Nature*, 440(7085), 764–771. [DOI: 10.1038/nature04637](https://doi.org/10.1038/nature04637).

4. **Archaeopteryx Avialan Feathers & Transitional Grade**
   - *Foth, C., Tischlinger, H. & Rauhut, O. W. M. (2014)*: "New specimen of *Archaeopteryx* provides insights into the evolution of pennaceous feathers." *Nature*, 511(7507), 79–82. [DOI: 10.1038/nature13467](https://doi.org/10.1038/nature13467).

5. **Neanderthal-Modern Human Genomic Introgression**
   - *Green, R. E. et al. (2010)*: "A draft sequence of the Neandertal genome." *Science*, 328(5979), 710–722. [DOI: 10.1126/science.1188021](https://doi.org/10.1126/science.1188021).
   - *Prüfer, K. et al. (2014)*: "The complete genome sequence of a Neanderthal from the Altai Mountains." *Nature*, 505(7481), 43–49. [DOI: 10.1038/nature12886](https://doi.org/10.1038/nature12886).

6. **LUCA Genomic Reconstruction & Hydrothermal Setting**
   - *Weiss, M. C. et al. (2016)*: "The physiology and habitat of the last universal common ancestor." *Nature Microbiology*, 1(9), 16116. [DOI: 10.1038/nmicrobiol.2016.116](https://doi.org/10.1038/nmicrobiol.2016.116).

---

## 5. Unverified Candidate References & Remaining Research Requirements

1. **First Universal Common Ancestor (FUCA) Pre-LUCA Hypotheses**
   - **Candidate Source:** *Prosdocimi, F. & José, M. V. (2019)*: "The First Universal Common Ancestor (FUCA) as the bridge between prebiotic chemistry and the Last Universal Common Ancestor (LUCA)." (Preprint / theoretical proposal).
   - **Verification Status:** `unverified_candidate`.
   - **Verification Notes / Remaining Research:**
     1. Cross-reference preprint assertions against peer-reviewed biophysical and biochemical literature regarding the transition from the RNA world to ribonucleoprotein replication machines.
     2. Verify whether consensus exists on the term "FUCA" vs. "protogenote" or "urancestor" in evolutionary biochemistry.
     3. Identify peer-reviewed journal DOI before upgrading claim to `verified`.

---

## 6. Verification and Quality Assurance Results

| Test / Check | Tool / Script | Result | Details |
| :--- | :--- | :--- | :--- |
| **TypeScript Typecheck** | `npx tsc --noEmit` | **PASS (0 errors)** | Strict types, zero type assertions bypassed |
| **ESLint Static Analysis** | `npx eslint` | **PASS (0 errors, 0 warnings)** | Clean hooks, zero `setState` cascading renders |
| **Automated Evidence Tests** | `npx tsx scripts/verify-evidence.ts` | **PASS (100%)** | 7 claims, 10 citations (9 verified DOIs, 1 candidate), 5-locale i18n parity |
| **Phase 3B Data Integrity** | `npx tsx scripts/verify-phase3b.ts` | **PASS (100%)** | 92 nodes intact, single root `luca`, zero cycles |
| **Browser UI / Escape Modal** | Headless Chrome CDP (1280x800) | **PASS (100%)** | Modal opened via trigger, DOIs rendered, closed via `Escape` |
| **Production Build** | `npm run build` | **PASS (Code 0)** | All 4 static routes (`/`, `/_not-found`, `/explorer`, `/story`) prerendered |

---

## 7. Known Limitations & Roadmap Integration

1. **Curated Coverage Scope**: The evidence registry currently includes 7 reference claims covering key benchmark taxa (*Homo sapiens*, *Homo neanderthalensis*, *Dickinsonia costata*, *Tiktaalik roseae*, *Archaeopteryx lithographica*, and *LUCA*). Subsequent milestones will expand this registry across all 92 nodes using the established schema.
2. **Read-Only Modal**: The inspector modal is currently read-only. Milestone 2 (Premium Organism Detail Panel) and Milestone 4 (Interactive Learning & Quiz) will reuse this schema for deep interactive explorations and quiz verification.
3. **External DOI Resolving**: Clicking DOIs opens the genuine publisher page in a new secure tab (`rel="noopener noreferrer"`). No external API dependencies or client-side secret keys are required.

