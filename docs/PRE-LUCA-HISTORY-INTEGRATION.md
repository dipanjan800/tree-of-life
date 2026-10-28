# PRE-LUCA HISTORY INTEGRATION REPORT
## Tree of Life — Dedicated Non-Cladistic Historical Layer & Cosmochemical Antecedents

**Version:** 1.0.0  
**Status:** IMPLEMENTED & VERIFIED  
**Dataset Invariant:** 92 Biological Nodes Maintained; Root `luca` Untouched in `data/tree.ts`  

---

## 1. Executive Summary

This integration introduces a dedicated **Pre-LUCA History Layer** into the TREE OF LIFE project, connecting the deep-time chronological sequence:
$$\text{Cosmic Origins} \longrightarrow \text{Solar System \& Earth} \longrightarrow \text{Prebiotic Chemistry} \longrightarrow \text{Early Replicating Systems / FUCA Concept} \longrightarrow \text{LUCA}$$

### Absolute Non-Cladistic Separation
The historical layer is engineered as an **upstream non-cladistic educational timeline and drawer**. It is strictly separated from the biological phylogeny:
- Stars, planets, mineral catalysts, and hypothetical replicators are **never** represented as biological ancestor nodes or parents of LUCA.
- `data/tree.ts` remains 100% untouched.
- `luca` remains the sole biological root (`rootId: "luca"`) of the 92-node biological dataset.
- The Reingold-Tilford biological tree layout and horizontal camera coordinates remain uncompromised.

---

## 2. Five Pre-LUCA Historical Stages (`data/prebiotic.ts`)

| Stage | Period / Display | Scientific Status | Key Chemical / Physical Entities | Core Empirical Basis |
| :--- | :--- | :--- | :--- | :--- |
| **Stage A: Cosmic Origins** | ~13.8 – 5.0 BYA | Established Cosmology & Astrophysics | H, He, Li, C, N, O, Fe | Cosmic Microwave Background (Planck/WMAP), B²FH stellar nucleosynthesis, binary neutron star kilonovae (GW170817). |
| **Stage B: Solar System & Earth** | ~4.6 – 4.4 BYA | Established Geochemistry | Si, Fe, Ni, Mg, O, H, C | Radiometric isochron dating of chondrites (4.567 BYA), Jack Hills detrital zircons (4.404 BYA), oxygen isotope δ¹⁸O low-temperature ocean alteration. |
| **Stage C: Prebiotic Chemistry** | ~4.4 – 4.0 BYA | Active Research Frontier | C, H, N, O, P, S | Murchison meteorite carbonaceous organics (>70 abiotic amino acids & nucleobases), inorganic hydrothermal vent precipitates, in vitro non-enzymatic nucleotide synthesis. |
| **Stage D: Early Replicating Systems / FUCA Concept** | **Date Uncertain** (Hypothetical Pre-LUCA) | Theoretical Evolutionary Construct | RNA, Lipids, Peptides, ATP | Universal ribosomal peptidyl transferase center homologies, Woese's Darwinian threshold, hypothetical lost pre-LUCA sister branches. |
| **Stage E: LUCA & Biological Threshold** | ~3.8 – 3.5 BYA | Established Phylogenomic Inference (Root of Tree) | DNA, RNA, 64 Codons, ATP Synthase | Universal genetic cipher across all 92 taxa, homologous rRNA, ~355 reconstructed ancestral gene families (Weiss et al. 2016), Pilbara stromatolites. |

---

## 3. Discoverability & User Experience Pathways

Users exploring the Tree of Life can discover Pre-LUCA history through three distinct, non-intrusive pathways:

```
[ Top Bar Header ] ──▶ "Pre-LUCA History ✨" Button
                                │
[ Tree Canvas ]    ──▶ Dashed Upstream Connector & Beacon left of LUCA (x = -170)
                                │
[ Taxon Panel ]    ──▶ Educational "Deep-Time Antecedents" Card when LUCA is selected
                                │
                                ▼
                   ┌───────────────────────────┐
                   │    PreLucaPanel.tsx       │
                   │ (5-Stage Cinematic Drawer)│
                   └───────────────────────────┘
```

1. **Top Bar Header Button:** A dedicated pill button `Pre-LUCA History ✨` in the upper-right toolbar allows immediate access from any camera position.
2. **Interactive Tree Beacon:** When navigating or zooming to LUCA in `TreeCanvas`, a dashed purple conceptual connector (`strokeDasharray: 4 4`) extends to the left ($x = -170$) with a pill beacon: `✨ Pre-LUCA History`. Clicking it opens the drawer.
3. **LUCA Taxon Panel Card:** When LUCA is clicked/selected, `TaxonPanel` displays a dedicated educational card explaining that LUCA is preceded by prebiotic chemistry, with an action button `Explore Pre-LUCA History`.
4. **Direct URL Deep Link:** Navigating to `/explorer?layer=pre-luca` or `/explorer?preluca=true` opens the historical drawer automatically upon mount.
5. **Default Focus Maintained:** Default `/explorer` navigation without query parameters continues to focus squarely on `homo-sapiens` (scale 0.85) with the Human details panel open.

---

## 4. Exact Files Created and Modified

### Created Files:
1. **`data/prebiotic.ts`**: Complete structured dataset of the 5 pre-LUCA historical stages, citations, empirical evidence, active hypotheses, and uncertainty guardrails.
2. **`components/panel/PreLucaPanel.tsx`**: Museum-grade sliding glass drawer with responsive tabs, color-coded certainty badges, citation accordion, and direct actions (`Focus LUCA in Tree` and `Launch Story of Life`).
3. **`docs/PRE-LUCA-HISTORY-INTEGRATION.md`**: This formal integration report.

### Modified Files:
1. **`components/panel/TaxonPanel.tsx`**: Added optional `onOpenPreLuca` prop and rendered the educational Antecedents card when `displayNode.id === "luca"`.
2. **`components/tree/TreeCanvas.tsx`**: Added `onOpenPreLuca` prop and rendered the dashed non-cladistic antecedent connector and interactive beacon upstream of LUCA.
3. **`components/ExplorerView.tsx`**: Added `showPreLuca` state, top bar launcher button, `handleFocusLuca` callback, and wired `PreLucaPanel`.
4. **`docs/IMAGE_ATTRIBUTION.md`**: Added `pre-luca-layer` asset manifest entry.
5. **`docs/COSMIC-ORIGINS-FUCA-ARCHITECTURE-PLAN.md`**: Formally recorded the scientific clarification regarding FUCA dating uncertainty and distinction from LUCA.

---

## 5. Verification & Regression Suite Results

All tests completed successfully with **exit code 0**:

| Test Suite | Command | Result |
| :--- | :--- | :--- |
| **ESLint** | `npm run lint` | **Passed (0 errors, 0 warnings)** |
| **TypeScript Typecheck** | `npx tsc --noEmit` | **Passed (0 errors)** |
| **Production Build** | `npm run build` | **Passed (Turbopack static build for all routes)** |
| **Scientific Verification** | `npx tsx scripts/verify-phase3b.ts` | **Passed (9/9 suites passed, 92 nodes intact)** |
| **HTTP Route Check** | `http://localhost:3000` | `/` (200 OK), `/story` (200 OK), `/explorer` (200 OK) |

---

## 6. Dataset Invariants Final Check

- **`data/tree.ts` Modification:** **Zero modifications.** File remains authoritative.
- **Node Count:** Exactly 92 verified biological taxa.
- **Root Taxon:** Strictly `luca`.
- **Acyclic Integrity:** Zero cycles; all 92 nodes reachable from `luca`.
- **Phylogenetic Invariants:** Sarcopterygii, Tetrapoda, Dinosauria, Aves, Proboscidea hierarchies completely intact.
