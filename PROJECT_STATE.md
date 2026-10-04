# PROJECT_STATE

## Executive Summary

The project is a deployed **Responsible AI (RAI) in Earth Observation (EO) Living Book** built with React + Vite and hosted on GitHub Pages.

The site is organized as **Home + Applications + Lifecycle Questions + Simulator**:

- **Home** introduces RAI in EO, explains the two main pages and how they connect, and links to the simulator.
- **Applications** has one sub-tab per application area. These pages give domain specifics and concrete cases.
- **Lifecycle Questions** has one sub-tab per question across the AI lifecycle. These pages give general guidance.
- **Simulator** is the original Integrated Simulator, unchanged.

The first finished pair is **Fairness** (question) and **Agriculture & food security** (application). Both are built around the interactive Fairness Lab (EU-trained crop model transferred to India). All other sub-pages are marked drafts that show the existing case content, so nothing from the earlier principle tabs was lost.

GitHub Pages has shown intermittent stale-asset serving in the past (see In Progress).

---

## Architecture and Tech Stack

- **Frontend:** React 19, Vite 7, JavaScript (no TypeScript)
- **Styling:** Tailwind CSS + custom CSS keyframe animations (dark slate/emerald theme)
- **Icons:** Lucide React
- **Routing:** hash-based, no router dependency (`src/lib/router.js`)
- **Build/Deploy:** `vite build` + `gh-pages -d dist`
- **Hosting:** GitHub Pages project site (`/living-book-rai-eo/`)
- **Local tooling:** Conda env (`rai-eo-node`) with Node.js 20 + npm

### Folder layout

```
src/
  App.jsx                 Shell: header, top nav, sub-tabs, route switch
  main.jsx, index.css
  config/navigation.js    Page names (working titles), sub-tab ids/labels/status, href helpers
  lib/router.js           useHashRoute() + parseHash()
  lib/scoring.js          clamp, levelFromScore, barColor
  content/
    cases.js              All cases (single store) + casesForApplication / casesForQuestion
    questions.js          Per-question copy (framing, guidance, draft material)
    applications.js       Per-application copy (intro, running example, what goes wrong)
    mapScenes.js          Animated placeholder map scenes used on draft question pages
  components/             CaseCard/CaseGrid, CrossLink/CrossLinkCard, DraftBanner,
                          ChapterSection/ChapterHeader, SubTabs, RelatedQuestions,
                          MetricCard, DummyMapPanel
  pages/
    Home.jsx
    ApplicationsPage.jsx  Dispatches built page or generic ApplicationDraft
    QuestionsPage.jsx     Dispatches built page or generic QuestionDraft
    AgricultureApplication.jsx
    FairnessQuestion.jsx
  labs/
    FairnessTrainingLab.jsx   `framing` prop ("question" | "application") swaps header copy only
    IntegratedSimulatorTab.jsx
```

### Routes

`#/home` (also empty hash), `#/applications/<id>`, `#/questions/<id>`, `#/simulator`.
`#/applications` and `#/questions` open their first sub-tab; unknown routes fall back to Home.

- Applications: `agriculture`, `hazards`, `urban-health`, `forests-climate`, `security-infrastructure`
- Questions: `fairness`, `training-data`, `evaluation`, `uncertainty-robustness`, `transparency-accountability`, `privacy`, `genai`

### Content schema

Each case in `src/content/cases.js`:

```js
{ id, title, application, questions: [], principles: [], context, risk, move }
```

- `application`: an application sub-tab id, or `null` for cross-cutting operational cases (data onboarding, drift, telemetry), which only appear on question pages.
- `questions`: the question sub-tab ids the case touches.
- `principles`: the original five-principle tag (fairness, privacy, transparency, accountability, robustness), kept for traceability.

Application pages filter by `application`, and question pages filter by `questions`.

---

## Current Implementation Status

## Completed Tasks (Done)

1. **Project bootstrap and core stack setup**
   - Vite + React app, Tailwind/PostCSS, Lucide React, `gh-pages` deploy flow

2. **GitHub Pages deployment pipeline**
   - `predeploy` + `deploy` scripts; README documents deploy and `curl -I -L` verification

3. **Fairness Lab** (interactive transfer-learning narrative)
   - Presets (Global North only / Balanced global / Monsoon-aware), region toggles, world coverage map, India raster ground truth vs prediction, error heatmap, fairness metrics

4. **Restructure into two complementary views** (branch `restructure-two-pages`)
   - Home page, Applications page, Lifecycle Questions page, Simulator
   - Hash routing, navigation config, shared case store and schema
   - `App.jsx` decomposed into config / content / components / pages / labs
   - Fairness question page fully built (framing, why it matters, lab, failure modes, best practices, checklist, cross-links)
   - Agriculture application page fully built (running example, lab in application framing, domain failure points, two cases, cross-links)
   - All remaining sub-pages render as drafts with `DraftBanner` and the existing case content
   - `package.json` `homepage` fixed to `https://aldinorizaldy.github.io/living-book-rai-eo`

---

## In Progress

1. **Production parity verification between local and GitHub Pages**
   - The live URL has intermittently served older hashed assets than the `gh-pages` tip.
   - After each deploy, compare the asset hashes in the live `index.html` with `dist/index.html`.

---

## Blocked

No hard engineering blockers.

---

## Upcoming Tasks (Next)

1. **Draft pages to build** (using the Fairness / Agriculture pair as the template)
   - Applications: Hazards & disaster response, Urban & public health, Forests & climate, Security & critical infrastructure
   - Questions: Training data, Evaluation beyond accuracy, Uncertainty & robustness, Transparency & accountability, Privacy & sensitive data
   - Generative AI & foundation models: currently guiding questions only

2. **References**: add citations to question pages (best practices, checklists)

3. **Fairness lab quality pass**
   - Clearer legend for raster panels, before/after diff indicator, shareable scenario state in the URL

4. **Paper track**: separate, narrower storyline (see Early Ideas alignment)

5. **Stabilize GitHub Pages serving** (see In Progress)

---

## Key Architectural Decisions

1. **Two entry views over one content set**
   - Applications (application-driven) and Lifecycle Questions (question-driven) are both views over the same case store in `content/cases.js`. A case is written once and appears wherever it is relevant.

2. **Division of labor between question and application pages (no repetition)**
   - Question pages own the general guidance: concept, failure modes, best practices, recommendations, each stated once.
   - Application pages own domain specifics: what typically goes wrong in the domain and concrete cases. They link to question pages instead of re-explaining concepts.

3. **Hash routing without react-router**
   - `#/page/sub` routes are linkable and work on GitHub Pages without 404 fallbacks or new dependencies. This replaces the earlier decision to use a single-page, tab-driven UI without routes: the site is still a single-page app, but every page now has a shareable URL.

4. **Page names are working titles kept in one config file**
   - `src/config/navigation.js` holds main page names, sub-tab ids, labels, and built/draft status. Renaming happens there.

5. **Preserve the Integrated Simulator unchanged**
   - Reachable from the top nav and Home.

6. **Reuse labs across pages via framing, not duplication**
   - `FairnessTrainingLab` is used on both the Fairness and Agriculture pages. A `framing` prop changes only the header copy.

7. **Deterministic dummy simulation logic for labs**
   - Immediate interaction and causal storytelling without backend dependencies.

8. **Lightweight SVG/CSS and grid-cell visualizations instead of map SDKs**

9. **Deploy via `gh-pages` branch from `dist/`**

---

## Technical Debt and Known Issues

1. **Draft pages**
   - 10 of 12 sub-pages are drafts that reuse the earlier principle-tab material and animated placeholder maps. The UX is inconsistent with the built pair.

2. **Content still partly placeholder**
   - Case text is illustrative, not sourced. There are no references yet.
   - The "Monsoon cloud persistence" case text is about flood nowcasting but is filed under Agriculture. Its wording should be adapted to crop monitoring, or the case should move to Hazards.

3. **No automated tests**
   - Changes are validated by `npm run build` plus a manual check of each route.

4. **GitHub Pages live/stale mismatch** (see In Progress)

---

## Early Ideas alignment

The original brief (Early Ideas) proposed two ways to organize the book:

- **Application-driven**: start from an EO application domain (agriculture, hazards, urban, forests, security) and show which responsibility issues arise there. → **Applications** page.
- **Question-driven**: start from questions a practitioner faces across the AI lifecycle (data, fairness, evaluation, uncertainty, transparency, privacy, GenAI). → **Lifecycle Questions** page.

The two views complement each other through the shared case store and the division of labor (decisions 1 and 2): readers can enter from either side and cross over through links on every case and page.

The **paper** needs a separate, narrower storyline than the Living Book, for example one question traced through one or two applications. It has not been started.

---

## Handoff Notes for Next AI Agent

1. **Build the next pair using Fairness + Agriculture as the template.**
   - Question page: framing question → why it matters → interactive lab (if any) → failure modes → best practices → checklist → see it in practice.
   - Application page: intro → running example → domain "what goes wrong" → go deeper (links) → cases.
   - A natural next pair: Uncertainty & robustness + Hazards & disaster response.
   - To promote a draft: write a page component in `src/pages/`, register it in `BUILT_PAGES` in `ApplicationsPage.jsx` / `QuestionsPage.jsx`, and set `status: "built"` in `config/navigation.js`.

2. **Add the Generative AI & foundation models chapter**, starting from the guiding questions in `content/questions.js`.

3. **Add references** to question-page guidance and checklists.

4. **Start a paper track** with its own, narrower storyline.

5. **After each deploy, confirm live parity**: compare the asset hashes in the live `index.html` with the local `dist/index.html`.
