# IMAGE ATTRIBUTION POLICY & SCIENTIFIC ASSET MANIFEST
## TREE OF LIFE — Licensing, Provenance & Asset Standards

**Document Version:** 1.0.0  
**Scope:** All visual assets, illustrations, paleoart, and scientific photography utilized in `tree-of-life`  

---

## 1. Asset Acquisition & Licensing Rules

1. **Reputable Scientific Sources Only**:
   - **NASA Astrobiology & NASA Goddard / JPL**: Prebiotic Earth, planetary habitability, early solar system conditions.
   - **Smithsonian National Museum of Natural History (Human Origins Program)**: Hominin fossil casts, cranial evolution, archaeological artifacts.
   - **Wikimedia Commons**: Verified Creative Commons (CC0, CC-BY, CC-BY-SA) media with clear author provenance.
   - **Open-Access Museums & Collections**: The Field Museum, American Museum of Natural History, Natural History Museum (London), when openly licensed.
2. **Strict Licensing Verification**:
   - Never assume an image is in the public domain simply because it appears on an educational or scientific website.
   - Check license terms, required credit lines, and whether modifications must be shared under identical terms (CC-BY-SA).
   - Never use "All Rights Reserved" copyrighted imagery without explicit written licensing.
3. **Local Bundling over Hotlinking**:
   - Hotlinking to external museum servers is strictly forbidden to prevent broken images, CORS failures, bandwidth leeching, and security risks.
   - All approved assets must be cataloged in `public/assets/` or an asset manifest and served locally or via optimized Next.js image pipelines.
4. **Artistic Reconstructions vs. Photographs**:
   - Reconstructions of extinct organisms must be clearly tagged with metadata: `type: "reconstruction"` and labeled as *"Artistic reconstruction"* to prevent public confusion.
   - Procedural vector illustrations (such as Stage 0 Cosmic Origins) are educational conceptual models and are never presented as authentic telescope photographs or raw observatory captures.
5. **Graceful Fallbacks**:
   - If an asset fails to load, the interface must gracefully fall back to clade-themed SVG iconography and color accents without causing layout shift or rendering broken image icons.

---

## 2. Scientific Visual Asset Manifest

The following assets have been vetted, attributed, and cataloged for the introductory story and explorer components:

| Asset ID | Subject & Context | Source & Institution | Author / Creditor | License | Local Path / Manifest Reference |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `cosmic-origins` | Cosmic nucleosynthesis, stellar dispersal & protoplanetary accretion disk | NASA Astrobiology & Astrophysical Concepts (Scientific Reference) | Original Procedural Vector Asset (Tree of Life Project) | CC-BY-4.0 (Project Original Vector) | `components/story/StageArtwork.tsx` |
| `pre-luca-layer` | Conceptual pre-LUCA history timeline & non-cladistic astrochemical models | NASA Astrobiology, Valley et al. (Jack Hills), Weiss et al. (LUCA) | Original Procedural Glass Interface (Tree of Life Project) | CC-BY-4.0 (Project Original UI) | `components/panel/PreLucaPanel.tsx` |
| `hadean-earth` | Early prebiotic Earth, volcanic activity & oceans | NASA / JPL-Caltech / Tim Pyle | Tim Pyle / NASA | Public Domain (NASA) | `/assets/story/hadean-earth.jpg` |
| `hydrothermal-vent` | Deep sea hydrothermal vent & prebiotic chemistry | NOAA Ocean Exploration / Wikimedia | NOAA / OER | Public Domain (US Govt) | `/assets/story/hydrothermal-vent.jpg` |
| `stromatolite-fossil` | Archean microbial stromatolites (~3.4–3.7 BYA) | Wikimedia Commons / Shark Bay | Paul Harrison | CC-BY-SA 3.0 | `/assets/story/stromatolites.jpg` |
| `cyanobacteria-bloom` | Oxygenic photosynthesis & Great Oxidation Event | NASA Earth Observatory | Norman Kuring / NASA | Public Domain (NASA) | `/assets/story/cyanobacteria.jpg` |
| `ediacaran-biota` | Pre-Cambrian soft-bodied macroorganisms (*Dickinsonia*) | Wikimedia Commons / South Australia Museum | Verisimilus / Museum | CC-BY-SA 3.0 | `/assets/story/ediacaran.jpg` |
| `cambrian-fauna` | Cambrian explosion marine radiation (*Anomalocaris*, trilobites) | Wikimedia Commons / Field Museum | Nobu Tamura (Reconstruction) | CC-BY-SA 4.0 | `/assets/story/cambrian.jpg` |
| `hominin-evolution` | Hominin skull progression (*Australopithecus* to *H. sapiens*) | Smithsonian Human Origins Program | Chip Clark / Smithsonian | Open Access Educational / CC0 | `/assets/story/hominin-skulls.jpg` |
| `luca-diagram` | Last Universal Common Ancestor root branching | Tree of Life Project Core | Internal Vector Asset | CC0 (Project Original) | `/assets/tree/luca-root.svg` |
| `asgard-cell-model` | Asgard archaeon cellular model with eukaryotic proteins | Wikimedia Commons / WikiJournal of Science | Thomas Shafee | CC-BY-4.0 | `/assets/tree/asgard-archaea.svg` |
| `tiktaalik-reconstruction`| Sarcopterygian-tetrapod transitional 'fishapod' | National Science Foundation | Zina Deretsky / NSF | Public Domain (NSF) | `/assets/tree/tiktaalik.jpg` |
| `sahelanthropus-cranium` | Toumaï fossil cranium cast (TM 266-01-060-1) | Wikimedia Commons / Muséum de Toulouse | Didier Descouens | CC-BY-SA-4.0 | `/assets/tree/sahelanthropus.jpg` |
| `lucy-skeleton` | Partial composite skeleton of AL 288-1 (*Lucy*) | Houston Museum of Natural Science / Wikimedia | 120 / Wikimedia Commons | CC-BY-SA-3.0 | `/assets/tree/lucy.jpg` |
| `turkana-boy` | KNM-WT 15000 juvenile *Homo erectus* skeleton | Smithsonian Human Origins Program | Chip Clark / Smithsonian | CC0 / Public Domain | `/assets/tree/turkana-boy.jpg` |
| `neanderthal-reconstruction` | Neandertal facial reconstruction | Neanderthal Museum / Wikimedia Commons | Stefan Scheer | CC-BY-SA-3.0 | `/assets/tree/neanderthal.jpg` |
| `archaeopteryx-fossil` | Berlin specimen of *Archaeopteryx lithographica* | Museum für Naturkunde Berlin / Wikimedia | H. Raab | CC-BY-SA-3.0 | `/assets/tree/archaeopteryx.jpg` |

---

## 3. Metadata Structure for Asset Manifest

Each taxon or narrative slide referencing visual media must adhere to the following TypeScript interface in `types/taxonomy.ts`:

```typescript
export interface VisualAsset {
  id: string;
  url: string;
  altText: string;
  caption?: string;
  sourceName: string;
  sourceUrl: string;
  license: "Public Domain" | "CC0" | "CC-BY-4.0" | "CC-BY-SA-4.0" | "CC-BY-SA-3.0" | "NASA Educational";
  authorCredit: string;
  isReconstruction: boolean;
  width?: number;
  height?: number;
}
```

---

## 4. Attribution Display Standards

In any modal, panel, or slide where an image is rendered:
1. The **author credit** and **source collection** must be visible or accessible via a subtle info button `(i)`.
2. Clicking the credit must link to the original verified repository or license terms with `target="_blank" rel="noopener noreferrer"`.
3. If an image is an artistic reconstruction, a label reading *"Artistic reconstruction"* must accompany the credit.
