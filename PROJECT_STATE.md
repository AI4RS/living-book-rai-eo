# PROJECT_STATE

## Executive Summary

The project is a deployed **Responsible AI (RAI) in Earth Observation (EO) Living Book** built with React + Vite and hosted on GitHub Pages.

The site is organized as **Home + Applications + Lifecycle Questions + Simulator**:

- **Home** introduces RAI in EO, explains the two main pages and how they connect, and links to the simulator.
- **Applications** has one sub-tab per application area. These pages give domain specifics and concrete cases.
- **Lifecycle Questions** has one sub-tab per question across the AI lifecycle. These pages give general guidance.
- **Simulator** is the original Integrated Simulator. Its logic is unchanged; it has been restyled.

The first finished pair is **Fairness** (question) and **Agriculture & food security** (application). Neither page currently has an interactive centerpiece: the earlier Fairness Lab and the EU-to-India crop-mapping running example were removed because they were not meaningful to readers. All other sub-pages are marked drafts that show the existing case content.

The site uses a light, publication-style design: white background, one blue accent, sharp corners, serif headings, and theme tokens kept in one place.

---

## Architecture and Tech Stack

- **Frontend:** React 19, Vite 7, JavaScript (no TypeScript)
- **Styling:** Tailwind CSS with design tokens (see Visual design system) + a few CSS keyframe animations
- **Icons:** Lucide React
- **Routing:** hash-based, no router dependency (`src/lib/router.js`)
- **Build/Deploy:** `vite build` + `gh-pages -d dist`
- **Hosting:** GitHub Pages project site (`/living-book-rai-eo/`)
- **Local tooling:** Conda env (`rai-eo-node`) with Node.js 20 + npm

### Folder layout

```
src/
  App.jsx                 Shell: header, main nav, sub-tab bar, route switch
  main.jsx
  index.css               Design tokens (CSS variables), component classes, map animations
  config/navigation.js    Page names (working titles), sub-tab ids/labels/status, href helpers,
                          SHOW_PLACEHOLDER_MAPS
  lib/router.js           useHashRoute() + parseHash()
  lib/scoring.js          clamp, levelFromScore, barColor (simulator)
  content/
    cases.js              All cases (single store) + casesForApplication / casesForQuestion
    questions.js          Per-question copy (framing, guidance, draft material)
    applications.js       Per-application copy (intro, what goes wrong, related questions)
    mapScenes.js          Placeholder map scenes for draft question pages (colors are token names)
  components/             CaseCard/CaseGrid, CrossLink/CrossLinkCard, DraftBanner,
                          ChapterSection/ChapterHeader/BulletList, SubTabs, RelatedQuestions,
                          MetricCard, DummyMapPanel
  pages/
    Home.jsx
    ApplicationsPage.jsx  Dispatches built page or generic ApplicationDraft
    QuestionsPage.jsx     Dispatches built page or generic QuestionDraft
    AgricultureApplication.jsx
    FairnessQuestion.jsx
  labs/
    IntegratedSimulatorTab.jsx
tailwind.config.js        Maps token names to the CSS variables; border radius overridden to 0
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

### Visual design system

- **Look:** white page, very light gray (`subtle`) bands for case sections, near-black navy text, muted slate secondary text, one blue accent (`#1d4ed8`, hover `#1e40af`, tint `#eff6ff`). There are no gradients, dark panels, or second accent.
- **Semantic colors**, used only where meaning requires it: `risk` (muted red) for Risk callouts and high-risk levels, `safe` (teal) for Responsible move callouts and good levels, `warn` (amber) for Draft banners and moderate levels. Callouts are a thin left border plus a light tint.
- **Shape:** sharp corners everywhere (Tailwind `borderRadius` is overridden to 0, with only a 2px `sm` available), 1px light-gray borders, and no heavy shadows. Interactive cards get a blue left edge on hover.
- **Typography:** system sans-serif for body and UI. A serif stack (Georgia / `ui-serif`) for page titles, chapter headings, and card titles. Muted uppercase section labels. Prose is capped at `max-w-prose`.
- **Navigation:** text tabs with a 2px blue underline for the active main page and sub-tab. Both rows scroll horizontally on narrow screens, and the active sub-tab scrolls into view.
- **Accessibility:** a visible `:focus-visible` outline in the accent color, AA-contrast text tokens, `aria-current` on active tabs, `aria-pressed` on simulator options, and placeholder animations disabled under `prefers-reduced-motion`.
- **Where tokens live:** CSS variables in `:root` in `src/index.css` (change the accent there), mapped to Tailwind color names in `tailwind.config.js`. Shared component classes (`card`, `card-interactive`, `section-label`, `link`, `btn-primary`, `btn-secondary`, `option-btn`, `tab`, `callout-*`) are in `@layer components` in `index.css`.
- **Placeholder maps** on draft question pages are restyled for the light theme. `SHOW_PLACEHOLDER_MAPS` in `src/config/navigation.js` turns them off everywhere.

---

## Current Implementation Status

## Completed Tasks (Done)

1. **Project bootstrap and core stack setup**
   - Vite + React app, Tailwind/PostCSS, Lucide React, `gh-pages` deploy flow

2. **GitHub Pages deployment pipeline**
   - `predeploy` + `deploy` scripts; README documents deploy and `curl -I -L` verification

3. **Restructure into two complementary views**
   - Home page, Applications page, Lifecycle Questions page, Simulator
   - Hash routing, navigation config, shared case store and schema
   - `App.jsx` decomposed into config / content / components / pages / labs
   - Fairness question page built (framing, why it matters, failure modes, best practices, checklist, cases, related questions)
   - Agriculture application page built (intro, domain failure points, go-deeper links, two cases, related questions)
   - All remaining sub-pages render as drafts with `DraftBanner` and the existing case content
   - `package.json` `homepage` fixed to `https://aldinorizaldy.github.io/living-book-rai-eo`

4. **Removed the Fairness Lab and the agriculture running example**
   - The interactive "Fairness Lab: Crop Insurance Transfer Across Regions" and the EU-trained crop mapping running example were not meaningful to readers.
   - Deleted `FairnessTrainingLab`, its presets and region data, and the fairness raster CSS. Git history keeps them recoverable.
   - No replacement interactive content has been added yet.

5. **Visual redesign** (see Visual design system)
   - Light theme, blue accent, sharp corners, serif headings, centralized tokens
   - Simulator restyled with logic unchanged

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

1. **Design a meaningful interactive centerpiece** for the Fairness and Agriculture pages (to replace the removed lab)

2. **Draft pages to build** (using the Fairness / Agriculture pair as the template)
   - Applications: Hazards & disaster response, Urban & public health, Forests & climate, Security & critical infrastructure
   - Questions: Training data, Evaluation beyond accuracy, Uncertainty & robustness, Transparency & accountability, Privacy & sensitive data
   - Generative AI & foundation models: currently guiding questions only

3. **References**: add citations to question pages (best practices, checklists)

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

5. **Centralized design tokens**
   - Colors live as CSS variables in `src/index.css` and are consumed through Tailwind token names. Components use tokens and shared classes, not hard-coded hex values. Changing the accent takes one edit.

6. **No interactive content unless it is meaningful to readers**
   - The Fairness Lab was removed rather than kept as filler. Built pages may have no centerpiece until a better one is designed.

7. **Preserve the Integrated Simulator's logic**
   - Reachable from the top nav and Home; only its styling has changed.

8. **Lightweight SVG/CSS visualizations instead of map SDKs**

9. **Deploy via `gh-pages` branch from `dist/`**

---

## Technical Debt and Known Issues

1. **Draft pages**
   - 10 of 12 sub-pages are drafts that reuse the earlier principle-tab material. Some still show animated placeholder maps (toggle: `SHOW_PLACEHOLDER_MAPS`).

2. **No interactive centerpiece on the built pages**
   - Fairness and Agriculture are text and cases only since the lab was removed.

3. **Content still partly placeholder**
   - Case text is illustrative, not sourced. There are no references yet.

4. **No automated tests**
   - Changes are validated by `npm run build`, a server-side render of every route, and manual visual checks.

5. **GitHub Pages live/stale mismatch** (see In Progress)

### Open questions

- **Monsoon cloud persistence:** the case text is about flood nowcasting but is filed under Agriculture. Reword it for crop monitoring, or move it to Hazards?
- **Heatwave "Training data" tag:** the Heatwave case is also tagged with Training data (uneven historical sensor data). Keep or drop?
- **New text needs review:** Fairness why-it-matters, failure modes, best practices, and checklist; the Agriculture "what goes wrong" list; the GenAI guiding questions.
- **Placeholder maps:** keep them on the draft pages until each chapter is written, or switch them off now with `SHOW_PLACEHOLDER_MAPS`?

---

## Early Ideas alignment

The original brief (Early Ideas) proposed two ways to organize the book:

- **Application-driven**: start from an EO application domain (agriculture, hazards, urban, forests, security) and show which responsibility issues arise there. → **Applications** page.
- **Question-driven**: start from questions a practitioner faces across the AI lifecycle (data, fairness, evaluation, uncertainty, transparency, privacy, GenAI). → **Lifecycle Questions** page.

The two views complement each other through the shared case store and the division of labor (decisions 1 and 2): readers can enter from either side and cross over through links on every case and page.

The **paper** needs a separate, narrower storyline than the Living Book, for example one question traced through one or two applications. It has not been started.

---

## Handoff Notes for Next AI Agent

1. **The Fairness and Agriculture pages currently have no interactive centerpiece.** The next step is to design a better one that is genuinely meaningful to readers, rather than restoring the removed Fairness Lab.

2. **Build the next pair using Fairness + Agriculture as the template.**
   - Question page: framing question → why it matters → failure modes → best practices → checklist → cases → related questions.
   - Application page: intro → domain "what goes wrong" → go deeper (links) → cases → related questions.
   - A natural next pair: Uncertainty & robustness + Hazards & disaster response.
   - To promote a draft: write a page component in `src/pages/`, register it in `BUILT_PAGES` in `ApplicationsPage.jsx` / `QuestionsPage.jsx`, and set `status: "built"` in `config/navigation.js`.

3. **Use the design tokens and shared classes** (`card`, `section-label`, `callout-*`, `btn-*`, `tab`) for new UI. Do not hard-code colors or add rounded corners.

4. **Add the Generative AI & foundation models chapter**, starting from the guiding questions in `content/questions.js`.

5. **Add references** to question-page guidance and checklists.

6. **Start a paper track** with its own, narrower storyline.

7. **After each deploy, confirm live parity**: compare the asset hashes in the live `index.html` with the local `dist/index.html`.
