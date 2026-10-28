# SCIENTIFIC DATA POLICY & EPISTEMOLOGICAL GUIDELINES
## TREE OF LIFE — Scientific Integrity, Taxonomy & Chronology Standards

**Document Version:** 1.0.0  
**Scope:** All datasets, narratives, UI descriptions, and external integrations in `tree-of-life`  

---

## 1. Foundational Epistemological Principles

The Tree of Life visualization represents evolutionary biology and paleontology for public, educational, and research audiences. To prevent the spread of scientific misconceptions, all contributors and algorithms must adhere to the following core tenets:

### 1.1 LUCA is NOT the Origin of Life
- **Definition**: **LUCA** stands for the **Last Universal Common Ancestor**. It refers to the most recent ancestral population of cellular organisms from which all currently living (extant) cellular organisms on Earth share descent.
- **Estimated Age**: Approximately 3.8 to 3.5 billion years ago (Archean Eon).
- **Misconception to Avoid**: LUCA was **neither the first living organism nor the only organism alive at that time**. It was preceded by hundreds of millions of years of prebiotic chemistry, self-replicating molecular systems (such as the hypothesized RNA world), and early cellular lineages that went extinct without leaving surviving modern descendants.
- **Enforcement**: Any text, narrative, or UI tooltip must never describe LUCA as "the first life form on Earth" or equate LUCA with the moment of abiogenesis.

### 1.2 Non-Directionality of Evolution (Rejecting the Scala Naturae)
- Evolution is not a linear ladder of "progress" leading to humans (*Homo sapiens*).
- Lineages adapt to their local ecological niches over deep time. Microorganisms (Bacteria, Archaea, single-celled Eukaryotes) are just as modern and evolutionarily successful as multicellular vertebrates.
- Humans must be accurately depicted as one contemporary terminal branch among primates and placental mammals, not as an "apex" or "crown" organism.

### 1.3 Fact vs. Hypothesis vs. Dating Precision
Scientific conclusions are graded by levels of empirical certainty:

| Tier | Category | Scientific Basis | Display Convention | Example in System |
| :---: | :--- | :--- | :--- | :--- |
| **Tier 1** | **Verified Fossil Evidence** | Stratigraphically verified, radiometrically dated fossils. | Concrete date ranges with geological stage attribution. | *Tyrannosaurus rex* (68–66 MYA, Late Cretaceous) |
| **Tier 2** | **Molecular Clock Estimate** | Calibrated genetic divergence models using mutation rates. | Approximate prefix `~` with acknowledged margins of error. | Mammalia / Sauropsida split (~312 MYA) |
| **Tier 3** | **Scientific Hypothesis / Active Debate** | Competing models with plausible geochemical or molecular data. | Explicitly flagged as "Hypothesis" or "Active Investigation". | RNA World model for abiogenesis; Two-domain vs. Three-domain tree topologies. |

---

## 2. Distinction of Data Facets

To ensure architectural separation and maintainable code, scientific data must never be conflated into a single monolithic string. The data architecture enforces strict separation across six distinct facets:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        DATA ARCHITECTURE MODEL                         │
├─────────────────────────┬──────────────────────────────────────────────┤
│ 1. Taxonomic Hierarchy  │ Linnaean ranks (Kingdom, Phylum, Class, etc.)│
├─────────────────────────┼──────────────────────────────────────────────┤
│ 2. Phylogenetics        │ Cladistic tree topology (ancestor-descendant)│
├─────────────────────────┼──────────────────────────────────────────────┤
│ 3. Chronostratigraphy   │ Geological Eon / Era / Period / Epoch & MYA │
├─────────────────────────┼──────────────────────────────────────────────┤
│ 4. Extinction Status    │ Extant (living) vs. Extinct (†) with dates   │
├─────────────────────────┼──────────────────────────────────────────────┤
│ 5. Visual Metadata      │ Verified asset URLs, dimensions, license tags│
├─────────────────────────┼──────────────────────────────────────────────┤
│ 6. Scientific Provenance│ DOI, museum accession, fossil specimen refs  │
└─────────────────────────┴──────────────────────────────────────────────┘
```

### 2.1 Taxonomy vs. Phylogeny
- **Taxonomic Classification**: Traditional Linnaean taxonomy groups organisms by shared morphological features. It is often non-monophyletic (e.g., traditional "Reptilia" excludes birds, whereas cladistically, birds are living theropod dinosaurs).
- **Phylogenetic Relationships**: The application tree represents **cladistics (common descent)**. A clade includes an ancestor and all its descendants. Where traditional ranks conflict with cladistics, cladistic topology is displayed in the tree branching, while Linnaean ranks are displayed as educational tags.

### 2.2 Time Ranges and Geological Mapping
- Time is expressed uniformly in **MYA** (Millions of Years Ago) or **BYA** (Billions of Years Ago) as positive scalar offsets from the present ($0 \text{ MYA}$).
- Standard ICS (International Commission on Stratigraphy) geological divisions:
  - **Hadean**: 4,567 – 4,000 MYA
  - **Archean**: 4,000 – 2,500 MYA (Origin of life, LUCA, early Archaea/Bacteria)
  - **Proterozoic**: 2,500 – 541 MYA (Great Oxidation Event, Eukaryogenesis, Ediacaran)
  - **Paleozoic**: 541 – 252 MYA (Cambrian explosion, land colonization, Permian mass extinction)
  - **Mesozoic**: 252 – 66 MYA (Triassic, Jurassic, Cretaceous; dinosaurs, early mammals)
  - **Cenozoic**: 66 MYA – Present (Paleogene, Neogene, Quaternary; mammal & angiosperm radiation)

---

## 3. Strict Prohibitions

1. **Zero Fabrication Policy**: Never fabricate scientific citations, fossil specimen accession numbers, phylogenetic relationships, or extinction dates.
2. **No Uncalibrated Branch Lengths as Time**: Branch lengths in pixel coordinates reflect aesthetic readability unless explicitly scaled to a time axis. The UI clearly clarifies when tree layout is topological rather than proportional chronograms.
3. **Reconstructions vs. Photographs**: Artistic paleoart reconstructions must always be explicitly labeled as *"Artistic reconstruction"* and never presented as literal photographic records of prehistoric life.

---

## 4. External Data Provider Roadmap

Integration with authoritative external scientific taxonomy and phylogenetic providers will proceed in a controlled, phased architecture:

1. **Phase 1 (Current)**: High-quality curated internal dataset (64 representative taxa covering major evolutionary landmarks).
2. **Phase 2 (Architecture Review)**: Evaluation of Open Tree of Life (OToL) Synthetic Tree API, NCBI Taxonomy, and Paleobiology Database (PBDB).
3. **Phase 3 (Ingestion & Caching)**: Offline ETL pipeline with local caching to prevent rate-limit throttling and ensure zero runtime latency for end users.
