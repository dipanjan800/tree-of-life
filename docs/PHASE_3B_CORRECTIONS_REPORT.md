# PHASE 3B CORRECTIONS REPORT
## Implementation & Verification of Approved Scientific, Cladistic, and Chronological Corrections

**Date:** 2026-10-25  
**Project Phase:** Phase 3B Scientific Corrections (Post-Audit Review)  
**Status:** Complete & Fully Verified  
**Dataset Scale:** 92 Nodes (84 Phase 3A + 6 Phase 3B Baseline + 2 Elephantidae Enrichment)  
**Root Node:** `luca` (Single Root, Zero Cycles, 100% Reachable, Zero Date Inversions)  

---

## 1. Executive Summary

Following the completion of the read-only scientific audit ([`docs/PHASE_3B_SCIENTIFIC_AUDIT.md`](file:///c:/Users/HP/Downloads/antigravity/TREE-OF-LIFE/tree-of-life/docs/PHASE_3B_SCIENTIFIC_AUDIT.md)), this review and corrections phase systematically addressed all critical, high, and medium scientific inconsistencies across the Tree of Life dataset.

Key scientific, taxonomic, and chronological outcomes:
1. **Chronological Consistency & Elimination of Date Inversions**:
   - Resolved the parent-child date inversion where `vertebrata` (~525 MYA) was listed as younger than its child `fish` (~530 MYA). Calibrated Subphylum `vertebrata` to **~535 MYA** (calibrated to the early Cambrian molecular/stem divergence within Chordata) and `fish` to **~525 MYA** (calibrated to the earliest fossil stem-vertebrates from Chengjiang, such as *Haikouichthys*).
   - Resolved the parent-child date inversion where Kingdom `plantae` (~470 MYA) was listed as younger than its child `green-algae` (~750 MYA). Calibrated Kingdom `plantae` to **~1.0 BYA** (origin of Archaeplastida/Viridiplantae via primary plastid endosymbiosis), preserving ~470 MYA for the terrestrial colonization of land plants (`bryophytes`).
   - Integrated an automated invariant assertion into `scripts/verify-phase3b.ts` verifying that **zero chronological inversions exist across all 92 parent-child relationships**.
2. **Aves / Dinosauria Cladistic Alignment**:
   - Resolved the contradiction between narrative text and tree topology by nesting `aves` (Birds) directly within `dinosauria` under `reptilia` (Sauropsida). Aves is no longer depicted as an independent 370 MYA branch off Tetrapoda.
   - Evaluated the missing intermediate clade **Theropoda** (uniting *T. rex*, *Archaeopteryx*, and *Aves*) versus **Ornithischia** (*Triceratops*). Documented why the current 4-node arrangement under `dinosauria` is a defensible educational simplification while preserving existing node IDs and avoiding unnecessary node inflation.
3. **Tiktaalik & Zachelmie Epistemic Rigor**:
   - Qualified *Tiktaalik roseae* as an elpistostegalian stem-tetrapodomorph transitional grade rather than an established direct ancestor or singular sister taxon to all Tetrapoda.
   - Formally designated the ~390 MYA Zachelmie quarry evidence as trace fossils (ichnotaxa) subject to ongoing debate regarding tracemaker identity.
4. **Elephas maximus Speciation Calibration**:
   - Corrected the origin date of *Elephas maximus* from `~2.6 MYA` to `~0.6–1.0 MYA` (`0.8 MYA`, Middle Pleistocene), distinguishing ancestral Siwalik dispersal (*Elephas hysudricus*) from modern species emergence.
5. **Elephantidae Radiation Enrichment**:
   - Integrated Genus `loxodonta` (African Elephants, ~7.6 MYA) and Species `loxodonta-africana` (African Bush Elephant, ~1.5 MYA), completing the crown Elephantidae radiation alongside Asian elephants and mammoths.
6. **Taxonomic Rank Harmonization**:
   - Added `subphylum` to `TaxonomicRank` schema and `RANK_DISPLAY`, assigned `subphylum` to `vertebrata`, and reclassified `synapsida` and `dinosauria` as phylogenetic `group` clades.

---

## 2. Inventory of Modified and Added Nodes

### 2.1 Newly Added Nodes (2 Taxa)

| Node ID | Scientific Name | Common Name | Rank | Parent ID | Origin (MYA) | Status | Evidence Type |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `loxodonta` | *Loxodonta* | African Elephants | `genus` | `elephantidae` | 7.6 | Living | Fossil Record |
| `loxodonta-africana` | *Loxodonta africana* | African Bush Elephant | `species` | `loxodonta` | 1.5 | Living | Fossil Record |

### 2.2 Modified Nodes: Detailed Before-and-After Comparison

| Node ID | Scientific Name | Field | Before Correction | After Correction | Rationale & Evidence |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `plantae` | *Plantae* | `estimatedOrigin` | `"~470 MYA"` | `"~1.0 BYA"` | 470 MYA was land colonization. Kingdom Plantae (Archaeplastida) originated ~1.0–1.2 BYA. Resolves inversion with `green-algae` (~750 MYA). |
| `plantae` | *Plantae* | `estimatedOriginMya`| `470` | `1000` | Chronological consistency. |
| `plantae` | *Plantae* | `confidenceNotes` | *(empty)* | Documented primary plastid endosymbiosis ~1.0–1.2 BYA. | Epistemic transparency. |
| `vertebrata` | *Vertebrata* | `rank` | `"class"` | `"subphylum"` | Vertebrata is a subphylum of Chordata, not a class. |
| `vertebrata` | *Vertebrata* | `estimatedOrigin` | `"~525 MYA"` | `"~535 MYA"` | Molecular clock and early Cambrian chordate calibration (~535–540 MYA). Resolves inversion with `fish` (~525 MYA). |
| `vertebrata` | *Vertebrata* | `estimatedOriginMya`| `525` | `535` | Molecular divergence calibration. |
| `vertebrata` | *Vertebrata* | `confidenceNotes` | *(empty)* | Documented ~535–540 MYA molecular calibration and ~525 MYA Chengjiang fossil record. | Chronological semantics. |
| `fish` | *Pisces* | `scientificName` | `"Actinopterygii & allies"` | `"Pisces (non-tetrapod vertebrates)"` | Sharks and Placoderms are not Actinopterygii or actinopterygian allies. |
| `fish` | *Pisces* | `rank` | `"class"` | `"group"` | Fish is an informal paraphyletic grade, not a Linnaean class. |
| `fish` | *Pisces* | `estimatedOrigin` | `"~530 MYA"` | `"~525 MYA"` | Chengjiang aquatic stem-vertebrate fossil calibration (*Haikouichthys* ~525–518 MYA). |
| `fish` | *Pisces* | `estimatedOriginMya`| `530` | `525` | Fossil record calibration. |
| `fish` | *Pisces* | `description` | *"including both ray-finned fish and lobe-finned fish..."* | Updated to state lobe-finned fish are placed on the tetrapod stem. | Sarcopterygii was separated from `fish` in Phase 3B; text now matches topology. |
| `fish` | *Pisces* | `confidenceNotes` | *(empty)* | Documented paraphyletic educational grade. | Epistemic transparency per scientific policy. |
| `tiktaalik-roseae` | *Tiktaalik roseae* | `description` | *"transitional 'fishapod'"* | *"elpistostegalian stem-tetrapodomorph ('fishapod')"* | Precise phylogenetic clade specification. |
| `tiktaalik-roseae` | *Tiktaalik roseae* | `confidenceNotes` | Stated Zachelmie tracks "demonstrate" early tetrapods. | Formally qualified Zachelmie tracks as trace fossils without associated skeletal remains. | Epistemic grading: ichnofossils carry higher uncertainty than body fossils. |
| `dinosauria` | *Dinosauria* | `name` | `"Non-Avian Dinosaurs"` | `"Dinosaurs"` | Cladistically includes living birds. |
| `dinosauria` | *Dinosauria* | `scientificName` | `"Dinosauria (non-avian)"` | `"Dinosauria"` | Restores monophyletic clade designation. |
| `dinosauria` | *Dinosauria* | `rank` | `"order"` | `"group"` | Major archosaurian clade encompassing extinct and extant forms. |
| `dinosauria` | *Dinosauria* | `status` | `"extinct"` (`extinctionDateMya: 66`) | `"living"` | Dinosauria survives today via modern birds (Aves). |
| `archaeopteryx-lithographica` | *Archaeopteryx lithographica* | `confidenceNotes` | Standard fossil description | Qualified as stem-avialan transitional grade near flight origin, not confirmed direct ancestor. | Epistemic guardrail against linear March of Progress misinterpretation. |
| `aves` | *Aves* | `parentId` | `"tetrapoda"` | `"dinosauria"` | Birds are living theropod dinosaurs nested within Archosauria / Dinosauria. |
| `aves` | *Aves* | `confidenceNotes` | *(empty)* | Documented divergence from maniraptoran theropods in the Jurassic (~150–165 MYA). | Factual grounding in paleontology. |
| `synapsida` | *Synapsida* | `rank` | `"class"` | `"group"` | Major amniote clade; prevents Class parenting Class (`synapsida` → `mammalia`). |
| `elephas-maximus` | *Elephas maximus* | `estimatedOrigin` | `"~2.6 MYA"` | `"~0.6–1.0 MYA"` | 2.6 MYA represents ancestral *E. hysudricus*; modern species emerged ~0.6–1.0 MYA. |
| `elephas-maximus` | *Elephas maximus* | `estimatedOriginMya`| `2.6` | `0.8` | Calibrated to Middle Pleistocene speciation. |
| `elephas-maximus` | *Elephas maximus* | `confidenceNotes` | Mentions 99% synteny with mammoth | Added explicit distinction between ~2.6 MYA Siwalik dispersal and Middle Pleistocene dental speciation. | Distinguishes lineage divergence from crown species emergence. |

---

## 3. Cladistic Topology After Corrections

```
[chordata] (Phylum: Chordata, ~540 MYA)
   └── [vertebrata] (Subphylum: Vertebrata, ~535 MYA)
          ├── [fish] (Group: Pisces, ~525 MYA)
          │      ├── [sharks] (Class: Chondrichthyes, ~450 MYA)
          │      ├── [ray-finned-fish] (Class: Actinopterygii, ~400 MYA)
          │      └── [dunkleosteus-terrelli] (Species: Dunkleosteus, ~382 MYA [† 358 MYA])
          │
          └── [sarcopterygii] (Class: Sarcopterygii, ~420 MYA)
                 ├── [tiktaalik-roseae] (Species, ~375 MYA [† 370 MYA], stem-tetrapodomorph)
                 └── [tetrapoda] (Group: Tetrapoda, ~370 MYA)
                        ├── [amphibia] (Class: Amphibia, ~370 MYA)
                        │      ├── [frogs] (Order: Anura, ~265 MYA)
                        │      └── [salamanders] (Order: Urodela, ~165 MYA)
                        │
                        ├── [reptilia] (Class: Reptilia / Sauropsida, ~312 MYA)
                        │      ├── [squamata] (Order: Squamata, ~240 MYA)
                        │      ├── [testudines] (Order: Testudines, ~220 MYA)
                        │      ├── [crocodilia] (Order: Crocodilia, ~235 MYA)
                        │      └── [dinosauria] (Group: Dinosauria, ~230 MYA, Living)
                        │             ├── [tyrannosaurus-rex] (Species, ~68 MYA [† 66 MYA])
                        │             ├── [triceratops-horridus] (Species, ~68 MYA [† 66 MYA])
                        │             ├── [archaeopteryx-lithographica] (Species, ~150 MYA [† 148 MYA])
                        │             └── [aves] (Class: Aves, ~150 MYA, Living)
                        │                    ├── [passeriformes] (Order, ~52 MYA)
                        │                    ├── [raptors] (Order, ~50 MYA)
                        │                    └── [waterfowl] (Order, ~66 MYA)
                        │
                        └── [synapsida] (Group: Synapsida, ~318 MYA)
                               ├── [dimetrodon-limbatus] (Species, ~295 MYA [† 272 MYA])
                               └── [mammalia] (Class: Mammalia, ~225 MYA)
                                      └── [placentalia] (Infraclass, ~90 MYA)
                                             └── [proboscidea] (Order, ~60 MYA)
                                                    └── [elephantidae] (Family, ~8.0 MYA)
                                                           ├── [mammuthus] (Genus, ~5.0 MYA [† 0.004 MYA])
                                                           │      └── [mammuthus-primigenius] (Species, ~0.4 MYA [† 0.004 MYA])
                                                           ├── [elephas] (Genus, ~5.5 MYA)
                                                           │      └── [elephas-maximus] (Species, ~0.8 MYA)
                                                           └── [loxodonta] (Genus, ~7.6 MYA)
                                                                  └── [loxodonta-africana] (Species, ~1.5 MYA)
```

---

## 4. Deep-Dive Scientific Investigations

### 4.1 Chronological Consistency & Date Semantics
During the post-audit review, two apparent chronological inversions were investigated across the dataset:

1. **`vertebrata` (~535 MYA) vs. `fish` (~525 MYA)**:
   - *Previous state*: `vertebrata` was dated at ~525 MYA while `fish` was dated at ~530 MYA.
   - *Root cause*: `fish` had been assigned ~530 MYA based on early Chengjiang stem-vertebrates (*Haikouichthys*), while `vertebrata` had been assigned ~525 MYA based on younger strata.
   - *Date Semantics*: Subphylum Vertebrata represents the divergence of vertebrates from other chordates (cephalochordates/urochordates), which molecular clocks place at **~535–540 MYA** (Peterson et al. 2008; Dos Reis et al. 2015). In contrast, the earliest macrofossil body evidence of aquatic stem-vertebrates (Chengjiang biota) dates stratigraphically to Cambrian Stage 3 (**~525–518 MYA**). Calibrating `vertebrata` to ~535 MYA and `fish` to ~525 MYA accurately reflects the relationship between lineage origin and earliest fossil occurrence while eliminating the chronological inversion.

2. **`plantae` (~1.0 BYA) vs. `green-algae` (~750 MYA)**:
   - *Previous state*: `plantae` was dated at ~470 MYA while `green-algae` was dated at ~750 MYA.
   - *Root cause*: `plantae` had been assigned ~470 MYA representing the terrestrial colonization of land plants (embryophytes), whereas Kingdom Plantae (Archaeplastida/Viridiplantae) encompasses green algae and originated via primary plastid endosymbiosis in the Proterozoic.
   - *Date Semantics*: Proterozoic multi-cellular green algae fossils (*Proterocladus antiquus*) are documented at ~1.0 BYA (Tang et al. 2020), and molecular clocks date Viridiplantae to ~1.0–1.2 BYA. Calibrating Kingdom `plantae` to **~1.0 BYA** (`1000 MYA`) while retaining ~470 MYA for early land plants (`bryophytes`) eliminates the inversion and establishes taxonomic fidelity.

3. **Parent-Child Invariant Verification**:
   - An automated invariant assertion was added to `scripts/verify-phase3b.ts`. It iterates through all 92 nodes and verifies that for every non-root node, $\text{estimatedOriginMya}_{child} \le \text{estimatedOriginMya}_{parent}$. The test confirmed **exactly 0 inversions across all 92 nodes**.

---

### 4.2 Dinosauria Topology & Missing Intermediate Clades
The audit and review examined the branching structure under node `dinosauria`:

1. **Current Placement & Soundness**:
   - `dinosauria` directly parents:
     - `triceratops-horridus` (Ornithischia)
     - `tyrannosaurus-rex` (Theropoda - Coelurosauria)
     - `archaeopteryx-lithographica` (Theropoda - stem Avialae)
     - `aves` (Theropoda - crown Neornithes)
   - This topology does **not** contradict the nesting of birds within dinosaurs: birds are explicitly classified as dinosaurs (`aves.parentId === "dinosauria"`).
   - In the text metadata, `aves` is explicitly described as maniraptoran theropods, and `archaeopteryx` is identified as a stem-avialan.

2. **Identified Missing Intermediate Clades**:
   - **Clade Theropoda**: In cladistics, *T. rex*, *Archaeopteryx*, and *Aves* form the monophyletic clade Theropoda (characterized by hollow bones, bipedal stance, and three-toed pes), while *Triceratops* belongs to Ornithischia.
   - **Clade Ornithischia**: Encompasses bird-hipped herbivorous dinosaurs (ceratopsians, stegosaurs, ankylosaurs, hadrosaurs).

3. **Evaluation of Intermediate Clade Addition**:
   - Introducing `theropoda` would nest *T. rex*, *Archaeopteryx*, and *Aves* together. However:
     - Adding `theropoda` without adding `ornithischia` or `sauropodomorpha` creates an asymmetric tree where one major dinosaur suborder is named while others remain represented by single species.
     - Adding both suborders increases node depth and expands horizontal layout width by +220px.
   - **Conclusion**: The current 4-child polytomy under `dinosauria` is an **acceptable and defensible educational simplification for the 92-node benchmark**. The evolutionary relationship to Theropoda is preserved in descriptions and confidence notes without inflating node count. Formal insertion of `theropoda` is documented as a candidate enhancement for future macro-enrichment.

---

### 4.3 Elephantidae Dating Semantics & Uncertainty Table
The six elephantid taxa were audited to distinguish lineage divergence, earliest macrofossil occurrence, species emergence, and extinction:

| Taxon | Node ID | Model Origin Date | Date Semantic | Earliest Fossil Evidence | Lineage Divergence (Molecular Clock) | Extinction / Last Occurrence | Epistemic Uncertainty & Notes |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Elephantidae** | `elephantidae` | ~8.0 MYA | Radiation / Stem origin | *Stegotetrabelodon* & *Primelephas* (~7.0–8.0 MYA, Late Miocene) | ~7.6–9.0 MYA (*Loxodonta* split from *Elephas*/*Mammuthus*) | Extant | Midpoint of Late Miocene radiation; uncertainty margin ±1.0 Myr. |
| **Mammuthus** | `mammuthus` | ~5.0 MYA | Genus fossil emergence | *Mammuthus subplanifrons* (~4.5–5.0 MYA, South/East Africa) | ~5.5–6.0 MYA (split from *Elephas*) | ~0.004 MYA (~4,000 BP, Wrangel Island) | Genus lifespan spans Early Pliocene to mid-Holocene. |
| **Woolly Mammoth**| `mammuthus-primigenius`| ~0.4 MYA | Species speciation | Middle Pleistocene Olyorian fauna (~0.4–0.3 MYA, Siberia) | Derived anagenetically from *M. trogontherii* | ~0.004 MYA (~3,700–4,000 BP) | Tier 1 fossil and ancient nuclear DNA confirmation. |
| **Elephas** | `elephas` | ~5.5 MYA | Genus fossil emergence | *Elephas ekorensis* (~5.0–5.5 MYA, Lothagam, Kenya) | ~5.5–6.0 MYA (sister to *Mammuthus*) | Extant | Genus originated in Africa before Late Pliocene Asian radiation. |
| **Asian Elephant** | `elephas-maximus` | ~0.6–1.0 MYA (`0.8 MYA`)| Crown species speciation | Middle Pleistocene high-crowned dental fossils (~0.6–0.8 MYA, Asia) | Lineage entered Asia ~2.6 MYA (*E. hysudricus*) | Extant | Modern species emergence (~0.8 MYA) distinguished from ~2.6 MYA Siwalik dispersal. |
| **Loxodonta** | `loxodonta` | ~7.6 MYA | Lineage divergence | *Loxodonta cookei* & *L. adaurora* (~4.5–5.0 MYA, Pliocene) | ~7.6–9.0 MYA (basal crown split) | Extant | Earliest diverging living genus of Elephantidae. |
| **African Bush Elephant**| `loxodonta-africana`| ~1.5 MYA | Species fossil emergence | Early Pleistocene Olduvai Bed IV & Koobi Fora (~1.5–1.9 MYA) | Forest/bush elephant divergence ~2.0–5.0 MYA | Extant | Species morphology stabilized by ~1.5 MYA. |

---

## 5. Verification Commands & Actual Test Results

### 5.1 Algorithmic Verification Suite (`scripts/verify-phase3b.ts`)
```powershell
npx tsx scripts/verify-phase3b.ts
```
**Actual Output & Results:**
- **Node Count**: Exactly 92 nodes checked (92/92). PASS.
- **Single Root**: Exactly 1 root (`luca`). PASS.
- **Cycle Detection**: Depth-first search visited all 92 nodes with 0 cycles. PASS.
- **Node Reachability**: 92/92 nodes reachable from `luca` (100.0%). PASS.
- **Bidirectional Links**: 92/92 nodes have verified parent-child references. PASS.
- **Cladistics Verified**:
  - `vertebrata` (`subphylum`, 535 MYA) → `fish` (`group: Pisces`, 525 MYA) & `sarcopterygii` (`class`, 420 MYA). PASS.
  - `sarcopterygii` → `tiktaalik-roseae` & `tetrapoda`. PASS.
  - `tetrapoda` → `amphibia`, `reptilia`, `synapsida`. PASS.
  - `reptilia` → `dinosauria` (`group`, living) → `aves` (`class`, living). PASS.
  - `synapsida` (`group`) → `mammalia` (`class`). PASS.
  - `elephantidae` → `mammuthus`, `elephas`, and `loxodonta`. PASS.
  - `loxodonta` → `loxodonta-africana`. PASS.
- **Parent-Child Chronological Invariants**: Tested all 92 parent-child pairs. **0 chronological inversions detected** ($\forall child: \text{origin}_{child} \le \text{origin}_{parent}$). PASS.
- **Taxonomy Search**: Queries for "Birds", "Archaeopteryx", "Dinosaurs", "Tiktaalik", "Fish", "Woolly Mammoth", "Asian Elephant", "African Elephant", "Loxodonta" all returned accurate top hits. PASS.
- **Layout Geometry**: Computed tree bounds: Width = 3,140px, Height = 3,272px. Strict invariant $\forall child: x_{child} > x_{parent}$ confirmed. Zero NaN or negative coordinates. PASS.

### 5.2 TypeScript Compilation
```powershell
npx tsc --noEmit
```
**Actual Result**: Exit code 0 (0 errors). PASS.

### 5.3 ESLint Linting
```powershell
npm run lint
```
**Actual Result**: Exit code 0 (0 errors, 0 warnings). PASS.

### 5.4 Next.js Production Build
```powershell
npm run build
```
**Actual Result**: 
- Turbopack compiled successfully in 9.6s.
- TypeScript check completed in 13.3s.
- 6/6 static routes prerendered (`/`, `/_not-found`, `/explorer`, `/story`).
- Zero build warnings or errors. PASS.

### 5.5 Live HTTP Verification
```powershell
Invoke-WebRequest -Uri "http://localhost:3000/explorer?node=aves" -UseBasicParsing | Select-Object StatusCode
```
**Actual Result**: HTTP 200 OK. Node "Birds" and Latin binomial "Aves" verified in served DOM. PASS.

---

## 6. Verification Limitations & Environmental Constraints

1. **Automated Playwright Browser Runner**:
   - Playwright Chromium driver download is blocked in this Windows sandbox environment due to an external Azure CDN 404 response (`https://playwright.azureedge.net/builds/driver/playwright-1.57.0-win32_x64.zip`).
   - *Mitigation*: End-to-end verification was conducted via headless local Google Chrome, automated TypeScript test scripts, and live HTTP request validation. Per project epistemics, Playwright browser test passes are **not** claimed.
2. **Physical Touch Screen Gestures**:
   - Touch event listeners are bound and verified in code; continuous physical pointer multi-touch gestures require testing on physical hardware.

---

## 7. Unresolved Issues & Epistemic Limitations

The following items are intentionally recorded as open scientific topics rather than claiming complete resolution:

1. **Reticulate Evolution in Elephantidae**:
   - Modern paleogenomics (Palkopoulou et al. 2018) demonstrates that extinct straight-tusked elephants (*Palaeoloxodon*) and Pleistocene mammoths engaged in ancient inter-lineage gene flow. Bifurcating trees cannot natively depict reticulate anastomoses; this remains an intrinsic limitation of 2D tree visualizations.
2. **Trackway vs. Skeletal Body Fossil Uncertainty (Zachelmie)**:
   - While Zachelmie trackways (~390 MYA) indicate tetrapod-like locomotion preceded *Tiktaalik* body fossils (~375 MYA), no associated skeletal fossils exist in Eifelian strata. The possibility of trace misattribution or stem-locomotion convergence remains an active scientific discussion.
3. **Formal Suborder Clade Resolution in Dinosauria**:
   - Intermediate clades *Theropoda*, *Sauropodomorpha*, and *Ornithischia* remain candidates for future macro-enrichment when dataset scale expands beyond 92 taxa.
4. **Non-Tetrapod Sarcopterygii Representation**:
   - Coelacanths (Actinistia) and lungfishes (Dipnoi) are currently omitted from the tree, meaning *Sarcopterygii* branches directly into *Tiktaalik* and *Tetrapoda*. Adding living non-tetrapod sarcopterygians remains an approved candidate for future expansion.
