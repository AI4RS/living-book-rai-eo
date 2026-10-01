# PROJECT_STATE

## Executive Summary

The project is now a deployed **Responsible AI in Earth Observation (EO) Living Book** built with React + Vite and hosted on GitHub Pages.  
This session shifted the product from a single simulator into a multi-tab experience and introduced a dedicated, interactive **Fairness Lab** (training geography vs. India prediction quality) with scenario presets and dynamic raster-like visual feedback.

Deployment is functional, but GitHub Pages has shown intermittent serving/caching mismatch (live site sometimes serves older asset hashes despite newer `gh-pages` commits).

---

## Architecture and Tech Stack

- **Frontend:** React 19, Vite 7, JavaScript (no TypeScript)
- **Styling:** Tailwind CSS + custom CSS keyframe animations
- **Icons:** Lucide React
- **Build/Deploy:** `vite build` + `gh-pages -d dist`
- **Hosting:** GitHub Pages project site (`/living-book-rai-eo/`)
- **Local tooling:** Conda env (`rai-eo-node`) with Node.js 20 + npm

### Key Runtime Structure

- `src/App.jsx`
  - Tab routing (`fairness`, `privacy`, `transparency`, `accountability`, `robustness`, `simulator`)
  - Fairness-specific interactive component (`FairnessTrainingLab`)
  - Generic aspect tab component for non-fairness aspects (`AspectTab`)
  - Integrated simulator tab (`IntegratedSimulatorTab`)
- `src/index.css`
  - Base theme + map/fairness animation classes
- `package.json`
  - Deploy scripts (`predeploy`, `deploy`)
- `vite.config.js`
  - GitHub Pages base path: `/living-book-rai-eo/`

---

## Current Implementation Status

## Completed Tasks (Done)

1. **Project bootstrap and core stack setup**
   - Vite + React app created
   - Tailwind/PostCSS configured
   - Lucide React added
   - `gh-pages` deploy flow added

2. **GitHub Pages deployment pipeline**
   - `predeploy` + `deploy` scripts configured
   - `gh-pages` branch publish confirmed
   - README deployment and verification steps documented (including `curl -I -L`)

3. **Living Book expansion**
   - Multi-tab IA implemented:
     - Fairness
     - Privacy
     - Transparency
     - Accountability
     - Robustness & Safety
     - Integrated Simulator (existing simulator preserved as final tab)

4. **Fairness tab redesign (major feature)**
   - Replaced generic placeholder map with **interactive transfer-learning narrative**
   - Added preset scenarios:
     - Global North only
     - Balanced global
     - Monsoon-aware
   - Added region toggles for training data coverage
   - Added dummy world coverage visualization
   - Added dummy raster ground-truth vs prediction comparison over India
   - Added error heatmap and fairness outcome metrics

---

## In Progress

1. **Production parity verification between local and GitHub Pages**
   - App code and `gh-pages` branch are updated, but live URL has intermittently served older hashed assets.
   - Needs Pages source confirmation/reset and cache validation.

---

## Blocked

No hard engineering blockers in code.  
Operational friction remains around GitHub Pages serving stale assets (platform/config/cache behavior, not app runtime failure).

---

## Upcoming Tasks (Next)

1. **Stabilize GitHub Pages serving behavior**
   - Verify Pages source = `gh-pages` / root
   - If stale persists, toggle source to None then back to `gh-pages`
   - Re-deploy and verify newest JS/CSS hashes from live HTML

2. **Fairness lab quality pass**
   - Improve visual legend and explanatory copy for raster panels
   - Add explicit “before/after” diff indicator for preset changes
   - Add persisted URL state (query params) for shareable scenarios

3. **Other aspect tabs redesign**
   - Keep current fairness style as benchmark
   - Redesign Privacy/Transparency/Accountability/Robustness with distinct interaction models (not generic animated map placeholders)

4. **Data model refactor**
   - Split large `App.jsx` into feature modules/components
   - Move static scenario/config data into separate files

---

## Key Architectural Decisions

1. **Keep single-page, tab-driven UI instead of route-based pages**
   - Faster iteration and lower complexity for narrative prototyping.

2. **Preserve integrated simulator as final tab**
   - Existing functional logic retained while evolving content architecture.

3. **Use deterministic dummy simulation logic for Fairness lab**
   - Enables immediate interaction and causal storytelling without backend dependencies.

4. **Use lightweight SVG/CSS and grid-cell visualizations instead of map SDKs**
   - Reduces dependency weight and deployment complexity during early prototyping.

5. **Deploy via `gh-pages` branch from `dist/`**
   - Keeps delivery workflow simple and aligned with GitHub Pages project-site constraints.

---

## Technical Debt and Known Issues

1. **Monolithic `App.jsx`**
   - File is large and mixes data, UI, and simulation logic.
   - Risk: maintainability and onboarding cost.

2. **Mixed placeholder architectures**
   - Fairness tab now has rich interaction, while other aspect tabs still use generic placeholder map cards.
   - UX consistency gap.

3. **GitHub Pages live/stale mismatch**
   - At times, live `index.html` references older asset hashes than latest `gh-pages` tip.
   - Requires periodic source/cache verification.

4. **Metadata mismatch in `package.json`**
   - `homepage` still points to `john-smith` placeholder rather than active `aldinorizaldy` URL.
   - Should be updated to avoid deployment confusion.

5. **No automated tests yet**
   - Behavior changes are currently validated by manual build + visual checks.

---

## Handoff Notes for Next AI Agent

1. First, fix the deployment metadata mismatch:
   - Update `homepage` in `package.json` to `https://aldinorizaldy.github.io/living-book-rai-eo`.

2. Confirm live parity:
   - Deploy, then compare live index asset hashes vs `gh-pages` tip.

3. Keep Fairness tab architecture pattern:
   - Presets + controls + visual evidence + metrics + narrative guidance.
   - Apply the same pattern to Privacy tab next.

4. Prioritize decomposition:
   - Extract `FairnessTrainingLab`, `AspectTab`, `IntegratedSimulatorTab`, and content constants into separate files/components.
