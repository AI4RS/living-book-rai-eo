# PROJECT_STATE

## Executive Summary

The project is a deployed **Responsible AI (RAI) in Earth Observation (EO) Living Book** built with React + Vite and hosted on GitHub Pages.

The site is organized as **Home + Lifecycle + Principles + Applications + Simulator**:

- **Home** has the hero, then three sections: what Responsible AI in EO is, why it matters, and how to read the book (entry cards for the three parts).
- **Lifecycle** has one sub-tab per lifecycle stage, from Plan & Design to People & Planet.
- **Principles** has one sub-tab per principle (fairness, explainability, uncertainty, privacy, accountability, sustainability, reproducibility, stakeholder engagement). It replaces the former Lifecycle Questions page.
- **Applications** has one sub-tab per application domain.
- **Simulator** is the original Integrated Simulator. Its logic is unchanged; it has been restyled.

The book is currently an **outline**: every chapter page renders its section headings from one shared template, each with a "To be written." placeholder and a draft banner. All earlier chapter content (cases, question guidance, application copy) was removed in the restructure and can be recovered from git history (last present at `abe84e6`). That includes the evidence-backed tree-mapping case built on Rizaldy et al. (2026), which was the book's only cited case.

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
  App.jsx                 Shell: header, main nav, page banner, sub-tab bar, route switch
  main.jsx
  index.css               Design tokens (CSS variables) and component classes
  config/navigation.js    Page names (working titles) and taglines, sub-tab ids and labels,
                          each part's chapter section outline, page and sub-tab aliases, hrefFor
  lib/router.js           useHashRoute() + parseHash()
  lib/scoring.js          clamp, levelFromScore, barColor (simulator)
  content/
    contributors.js       People who can be credited on a chapter (by id)
  components/             ChapterSection/ChapterHeader, DraftBanner, SubTabs, PageBanner,
                          HomeHero, DottedEllipse, SiteFooter, MetricCard (simulator)
  pages/
    Home.jsx              Three placeholder sections and entry cards
    ChapterPage.jsx       The one template for every Lifecycle, Principles and Applications chapter
  labs/
    IntegratedSimulatorTab.jsx
tailwind.config.js        Maps token names to the CSS variables; border radius overridden to 0
```

### Routes

`#/home` (also empty hash), `#/lifecycle/<id>`, `#/principles/<id>`, `#/applications/<id>`, `#/simulator`.
A page without a sub-tab opens its first sub-tab; unknown pages fall back to Home and unknown sub-tab ids to the page's first sub-tab.

- Lifecycle: `plan-design`, `collect-process-data`, `build-use-model`, `verify-validate`, `deploy-use`, `operate-monitor`, `people-planet`
- Principles: `fairness`, `explainability-transparency`, `uncertainty-robustness`, `privacy`, `accountability`, `sustainability`, `reproducibility-documentation`, `stakeholder-engagement`
- Applications: `agriculture`, `forests`, `hazards`, `urban-health`, `climate`, `security-infrastructure`

**Old links.** `parseHash` first applies `PAGE_ALIASES` (page level: `questions` → `principles`), then `SUB_TAB_ALIASES` for the resolved page (both in `config/navigation.js`):

- `#/questions/fairness`, `uncertainty-robustness`, `privacy` → the principle with the same id
- `#/questions/green-ai` → `#/principles/sustainability`
- `#/questions/transparency-accountability` → `#/principles/explainability-transparency`
- any other old question id (`training-data`, `evaluation`, `genai`) → the first principle (Fairness)
- `#/applications/forests-climate` → `#/applications/forests`

### Content schema

There is no chapter content yet. Structure lives in `config/navigation.js`:

- `PAGES`: id, label, optional `longLabel`, and the one-line `tagline` shown in the page banner and on the Home entry cards.
- `LIFECYCLE_TABS`, `PRINCIPLE_TABS`, `APPLICATION_TABS`: `{ id, label, contributor? }`. `contributor` is an id in `content/contributors.js`; `ChapterPage` then shows "Contributor: name, role" under the title.
- `CHAPTER_SECTIONS`: the section headings for each part, defined once and shared by every chapter of that part.
  - Lifecycle: What happens at this stage · Who is involved · Principles at this stage · In practice · Checklist
  - Principles: Opening · What it means in EO · Where it shows up in the lifecycle · Questions and how to address them · Cases · Checklist · References
  - Applications: Opening · Why it matters in this domain · Walk through the lifecycle · Principles most at stake · Cases · References

When chapters get written, add a content store keyed by part and sub-tab id and render it in `ChapterPage` in place of the placeholder, keeping the shared section outline.

### Visual design system

- **Branding:** the book is published under the IEEE GRSS Image Analysis and Data Fusion Technical Committee (IADF), through its Working Group on Responsible AI for Earth Observation (WG-RAI). WG-RAI has no logo, so it is named in text only.
- **Logos** (`src/assets/`, imported so Vite applies the `/living-book-rai-eo/` base path):
  - `IADF.webp`: the IADF logo, with transparent background.
  - `grss-logo.svg`: the GRSS logo. This is a copy of the supplied `grss_logo.svg` (a letter-size page export) with only its `viewBox` tightened to the artwork plus a small clear margin. The artwork is not altered, cropped, or recolored.
  - Logos are never recolored, stretched, cropped, or placed on imagery. Alt texts: "IEEE GRSS Image Analysis and Data Fusion logo" and "IEEE Geoscience and Remote Sensing Society logo".
- **Logo placement:**
  - **Header (all pages):** white bar. IADF logo (56px desktop / 40px phone), a 1px × 44px divider, then the serif bold site title with a muted description line ("by lifecycle stage, by principle, or by application area"; hidden on phone). The whole lockup links Home. The main nav and sub-tabs sit below.
  - **Home hero:** full-width accent band (`components/HomeHero.jsx`) with no logos. It has an eyebrow, serif H1, lead, three square buttons (Lifecycle, Principles, Applications; the first is filled), the WG-RAI credit line, and a decorative dotted ellipse (`aria-hidden`). The ellipse is full size and 0.4 opacity at ≥1280px and smaller and fainter below that, so text stays legible.
  - **Page banner (all other pages):** a slim accent band (`components/PageBanner.jsx`) between the header and the sub-tabs, showing the page name (`longLabel` or `label`) and its `tagline` from `config/navigation.js`, with a smaller dotted ellipse. Every page therefore has white header → blue band → content; Home's band is the tall hero. The ellipse is shared with the hero (`components/DottedEllipse.jsx`). The header stays white so the IADF logo needs no tile.
  - **Footer (all pages):** navy band (`components/SiteFooter.jsx`). The IADF and GRSS logos sit on white tiles (12px padding, 64px / 48px phone), linking to the IADF TC page and grss-ieee.org, next to the "Living Book of the IEEE GRSS IADF… (WG-RAI)" credit. Page links and GitHub are on the right. Everything stacks on phone. External URLs live in `EXTERNAL_LINKS` in `config/navigation.js`.
- **Colors:** white page, very light gray (`subtle`) for the sub-tab bar, near-black navy text, muted slate secondary text.
  - IADF blue accent `#2a4a9c` (hover `#1f3a80`, tint `#eaf1fb`), `navy` `#0b1f4b` for the footer, `iadf-tint` `#d8e8f8` for dots and light text on blue or navy, `line-strong` `#c5d1e3`. There are no gradients and no second accent.
  - Contrast: white on accent is about 8.2:1, `iadf-tint` on accent about 6.6:1, and white on navy about 16:1.
- **Semantic colors**, used only where meaning requires it: `risk` (muted red) for Risk callouts and high-risk levels, `safe` (teal) for Responsible move callouts and good levels, `warn` (amber) for Draft banners and moderate levels. Callouts are a thin left border plus a light tint.
- **Shape:** sharp corners everywhere (Tailwind `borderRadius` is overridden to 0, with only a 2px `sm` available), 1px light-gray borders, and no heavy shadows. Interactive cards get an accent left edge on hover.
- **Typography:** Source Sans 3 for body and UI and Source Serif 4 for titles and headings, loaded from Google Fonts in `index.html`. They fall back to the system sans stack and to Georgia / `ui-serif`. Section labels are muted uppercase, and prose is capped at `max-w-prose`.
- **Navigation:** text tabs with a 2px accent underline for the active main page and sub-tab. Both rows scroll horizontally on narrow screens, and the active sub-tab scrolls into view.
- **Mobile:**
  - Viewport meta is `width=device-width, initial-scale=1`.
  - Buttons, tabs, sub-tabs, simulator options, and footer links are at least 44px tall. Home entry cards are whole-card links.
  - Every multi-column grid collapses to one column below `md`.
  - Verified with no horizontal page scroll at 390 and 1280px after the restructure (320 and 768px before it).
- **Accessibility:** a visible `:focus-visible` outline (accent, or white on the blue and navy bands), AA-contrast tokens, `aria-current` on active tabs, `aria-pressed` on simulator options. On Home the hero holds the page `h1`; on other pages the header title is the `h1`.
- **Where tokens live:** CSS variables in `:root` in `src/index.css` (change the accent there), mapped to Tailwind color names in `tailwind.config.js`. Shared component classes (`card`, `card-interactive`, `section-label`, `link`, `btn-primary`, `btn-secondary`, `option-btn`, `tab`, `callout-*`) are in `@layer components` in `index.css`.

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

6. **IEEE GRSS IADF branding and mobile polish** (branch `iadf-branding`)
   - IADF logo lockup in the header, Home hero band, navy footer with IADF and GRSS logos and the WG-RAI credit
   - IADF blue accent, navy and iadf-tint tokens, Source Serif 4 / Source Sans 3
   - 44px tap targets, one-column grids on phone, overflow checked from 320px up

7. **Forests / Climate split and the first evidence-backed case** (branch `forests-green-ai`)
   - "Forests & climate" split into separate Forests and Climate drafts; existing cases moved accordingly
   - New question draft **Green AI & energy** (`green-ai`): framing, guiding questions (incl. training with less energy by fine-tuning pretrained / foundation models), key decisions
   - New Forests case **Pretrained model for 3D tree mapping**, tagged Green AI, GenAI, and Training data, with real numbers from Rizaldy et al. (2026), *Remote Sensing of Environment* 345, 115564 (doi:10.1016/j.rse.2026.115564), checked against arXiv 2511.06331v3: training time 44.51 → 35.56 min, energy 0.5813 → 0.4605 kWh, estimated emissions 0.2215 → 0.1754 kg CO₂ (about −21%); mAP with 1% of labels 45.56 (scratch) vs 76.77 (pretrained), versus 76.72 with all labels
   - Notes shown on the card: the energy comparison is at equal accuracy (the fine-tuned run stops once it reaches the from-scratch model's best accuracy; clarified by the first author, the paper says "similar accuracy"); the mAP row comes from the same SCION experiments; pretraining energy is not reported or counted, framed from the end-user view (pretraining runs once, fine-tuning repeats per site and task)

8. **Forests and Green AI & energy built as second tabs**
   - Forests: intro, four forest-specific failure points, go-deeper links to Green AI and Training data, and the tree-mapping case on its own
   - Green AI & energy: why it matters, five failure modes, best practices (fine-tune a pretrained or foundation model; stop at the target accuracy; measure and report energy at equal accuracy; share weights), checklist
   - The deforestation enforcement case left Forests (`application: null`); it still appears on the Transparency & accountability question page
   - Built pages are now two content-driven templates (`ApplicationChapter`, `QuestionChapter`); setting `status: "built"` in `config/navigation.js` switches a page to the full layout
   - A case that is alone in its band spans the full width, with its evidence in a second column on large screens

9. **Restructure into Lifecycle, Principles and Applications (outline only)**
   - Top nav: Home · Lifecycle · Principles · Applications · Simulator. Principles replaces Lifecycle Questions.
   - Pages, sub-tabs, taglines and each part's section outline in `config/navigation.js`; one template (`pages/ChapterPage.jsx`) renders every chapter with a draft banner and a placeholder per section.
   - Home rewritten as three placeholder sections with entry cards; hero has three buttons; header description updated.
   - Removed the old content and the code that only served it: `content/cases.js`, `questions.js`, `applications.js`, `mapScenes.js`, the question and application chapter and draft pages, `CaseCard`, `CaseEvidence`, `CrossLink`, `RelatedQuestions`, `DummyMapPanel`, `BulletList`, `SHOW_PLACEHOLDER_MAPS` and the map animation CSS. All of it, including the evidence-backed tree-mapping case (Rizaldy et al., 2026, doi:10.1016/j.rse.2026.115564), is in git history; last present at `abe84e6`.
   - Old `#/questions/<id>` and `#/applications/forests-climate` links redirect (see Routes).

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

1. **Write the chapters** into the outline: Home sections, then Principles, Lifecycle and Applications. The removed Forests / Green AI material and the tree-mapping case (at `abe84e6`) are a natural starting point for Sustainability and Forests.

2. **References**: each principle and application chapter has a References section to fill.

3. **Paper track**: separate, narrower storyline (see Early Ideas alignment)

4. **Stabilize GitHub Pages serving** (see In Progress)

---

## Key Architectural Decisions

1. **Home + Lifecycle + Principles + Applications**
   - Principles hold the general guidance, each stated once. Each question in a principle chapter names the lifecycle stage where it arises.
   - Lifecycle chapters point to the principle questions for their stage instead of repeating them.
   - Applications walk one domain through the lifecycle stages and name the principles most at stake there.

2. **One outline per part, one chapter template**
   - Each part's section headings are defined once in `config/navigation.js` and rendered by `pages/ChapterPage.jsx`, so every chapter of a part has the same shape.

3. **Hash routing without react-router**
   - `#/page/sub` routes are linkable and work on GitHub Pages without 404 fallbacks or new dependencies. This replaces the earlier decision to use a single-page, tab-driven UI without routes: the site is still a single-page app, but every page now has a shareable URL.

4. **Page names are working titles kept in one config file**
   - `src/config/navigation.js` holds main page names and taglines, sub-tab ids and labels, chapter section outlines, and route aliases. Renaming happens there.

5. **Centralized design tokens**
   - Colors live as CSS variables in `src/index.css` and are consumed through Tailwind token names. Components use tokens and shared classes, not hard-coded hex values. Changing the accent takes one edit.

6. **No interactive content unless it is meaningful to readers**
   - The Fairness Lab was removed rather than kept as filler. Chapters get an interactive element only when one is genuinely useful to readers.

7. **Preserve the Integrated Simulator's logic**
   - Reachable from the top nav and Home; only its styling has changed.

8. **Lightweight SVG/CSS visualizations instead of map SDKs**

9. **Deploy via `gh-pages` branch from `dist/`**

---

## Technical Debt and Known Issues

1. **Every chapter is a placeholder**
   - All 21 chapter pages show only their section outline and a draft banner. Home's first two sections are placeholders too.

2. **No references yet**

3. **No automated tests**
   - Changes are validated by `npm run build`, a server-side render of every route (including the old aliases), and manual visual checks.

4. **GitHub Pages live/stale mismatch** (see In Progress)

### Open questions

- **Simulator:** keep or drop under the new structure? It is still in the top nav and footer but no longer linked from Home.

---

## Early Ideas alignment

The original brief (Early Ideas) proposed two ways to organize the book:

- **Application-driven**: start from an EO application domain (agriculture, hazards, urban, forests, security) and show which responsibility issues arise there. → **Applications** page.
- **Question-driven**: start from questions a practitioner faces across the AI lifecycle. → split into **Principles** (the questions, grouped by principle) and **Lifecycle** (the stages where they arise).

Decision 1 describes how the three parts refer to each other instead of repeating content.

The **paper** needs a separate, narrower storyline than the Living Book, for example one question traced through one or two applications. It has not been started.

---

## Handoff Notes for Next AI Agent

1. **The book is an outline.** Every chapter renders from `pages/ChapterPage.jsx` with the part's section list from `CHAPTER_SECTIONS` in `config/navigation.js`. Change a section heading there once and every chapter of that part follows.

2. **To write a chapter:** add a content store keyed by part and sub-tab id, and render it in `ChapterPage` in place of the "To be written." placeholder. Keep the shared outline and the division of labor in decision 1. Credit an author with `contributor` on the sub-tab entry.

3. **Recover old material from git** where useful: `git show abe84e6:src/content/cases.js` (including the tree-mapping case with its evidence table), `questions.js`, `applications.js`, and `src/components/CaseEvidence.jsx`.

4. **Use the design tokens and shared classes** (`card`, `section-label`, `callout-*`, `btn-*`, `tab`) for new UI. Do not hard-code colors or add rounded corners.

5. **Start a paper track** with its own, narrower storyline.

6. **After each deploy, confirm live parity**: compare the asset hashes in the live `index.html` with the local `dist/index.html`.
