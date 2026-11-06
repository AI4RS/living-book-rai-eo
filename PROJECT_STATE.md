# PROJECT_STATE

## Executive Summary

The project is a deployed **Responsible AI (RAI) in Earth Observation (EO) Living Book** built with React + Vite and hosted on GitHub Pages.

The site is organized as **Home + Lifecycle + Principles + Applications + Simulator**:

- **Home** has the hero, then three sections: what Responsible AI in EO is, why it matters, how to read the book (entry cards for the three parts), and who we are (the people behind the book, plus a line on contributing).
- **Lifecycle** has a landing page and one chapter per lifecycle stage (seven stages, numbered).
- **Principles** has a landing page and one chapter per principle: Transparency, Fairness, Privacy, Robustness & security, Uncertainty & reliability, Energy efficiency (Green AI), Human oversight & agency, Social impact. It replaces the former Lifecycle Questions page.
- **Applications** has a landing page and one chapter per application domain.

Each part is navigated with a left-side chapter list (Overview + chapters) instead of a row of sub-tabs; see **Navigation pattern**.
- **Simulator** is the original Integrated Simulator. Its logic is unchanged; it has been restyled.

The book is currently an **outline**: every chapter page renders its section headings from one shared template, each with a "To be written." placeholder and a draft banner. All earlier chapter content (cases, question guidance, application copy) was removed in the restructure and can be recovered from git history (last present at `abe84e6`). That includes the evidence-backed tree-mapping case built on Rizaldy et al. (2026), which was the book's only cited case.

The site uses a light, publication-style design: white background, one blue accent, sharp corners, serif headings, and theme tokens kept in one place.

---

## Architecture and Tech Stack

- **Frontend:** React 19, Vite 7, JavaScript (no TypeScript)
- **Styling:** Tailwind CSS with design tokens (see Visual design system) + a few CSS keyframe animations
- **Icons:** Lucide React
- **Routing:** hash-based, no router dependency (`src/lib/router.js`)
- **Build/Deploy:** GitHub Actions (`.github/workflows/deploy.yml`): on every push to `main` (or a manual "Run workflow"), `npm ci` + `npm run build`, then `dist/` is published with `actions/deploy-pages`. Settings → Pages → Source is **GitHub Actions**.
- **Hosting:** GitHub Pages project site (`/living-book-rai-eo/`) at https://ai4rs.github.io/living-book-rai-eo/, repo https://github.com/ai4rs/living-book-rai-eo (moved to the ai4rs org, see Completed Tasks 10)
- **Local tooling:** Conda env (`rai-eo-node`) with Node.js 20 + npm

### Folder layout

```
src/
  App.jsx                 Shell: skip link, header, main nav, page banner, route switch;
                          PartPage = chapter list + landing page or chapter
  main.jsx
  index.css               Design tokens (CSS variables) and component classes
  config/navigation.js    Page names (working titles) and taglines, chapter ids, labels and
                          taglines (CHAPTERS), NUMBERED_PARTS, each part's chapter section
                          outline, page and chapter aliases, readingOrder, hrefFor
  lib/router.js           useHashRoute() + parseHash()
  lib/scoring.js          clamp, levelFromScore, barColor (simulator)
  content/
    contributors.js       People who can be credited on a chapter (by id)
    parts.js              PART_INTROS: intro text and references for each part's landing page
    team.js               WHO_WE_ARE: title, intro, contribute line, people (Home "Who we are")
  components/             ChapterSection/ChapterHeader, ChapterNav (sidebar + mobile Chapters
                          disclosure), DraftBanner, PageBanner, TeamList,
                          HomeHero, DottedEllipse, SiteFooter, MetricCard (simulator)
  pages/
    Home.jsx              Placeholder sections, entry cards, and Who we are
    PartLanding.jsx       The one landing page for Lifecycle, Principles and Applications
    ChapterPage.jsx       The one template for every chapter, ending with Previous / Next
  labs/
    IntegratedSimulatorTab.jsx
tailwind.config.js        Maps token names to the CSS variables; border radius overridden to 0
```

### Routes

`#/home` (also empty hash), `#/lifecycle`, `#/principles`, `#/applications` (part landing pages), `#/lifecycle/<id>`, `#/principles/<id>`, `#/applications/<id>` (chapters), `#/simulator`.
`parseHash` returns `{ page, chapter }`. A part without a chapter id, or with an unknown one, opens the part's landing page (`chapter: null`); unknown pages fall back to Home.

- Lifecycle: `plan-design`, `collect-process-data`, `build-use-model`, `verify-validate`, `deploy-use`, `operate-monitor`, `people-planet` (ids follow the NIST AI RMF stage names; the visible labels are EO-specific, see Content schema)
- Principles: `transparency`, `fairness`, `privacy`, `robustness-security`, `uncertainty-reliability`, `energy-efficiency`, `human-oversight-agency`, `social-impact` (revised 2026-11-06, see Completed Tasks 15)
- Applications: `agriculture`, `forests`, `hazards`, `urban-health`, `climate`, `security-infrastructure`

**Old links.** `parseHash` first applies `PAGE_ALIASES` (page level: `questions` → `principles`), then `CHAPTER_ALIASES` for the resolved page (both in `config/navigation.js`):

- Retired principle ids (`#/principles/<old>`) and old question ids (`#/questions/<old>`) map through `CHAPTER_ALIASES.principles`:

  | Old id | Opens |
  |---|---|
  | `explainability-transparency` | `transparency` |
  | `reproducibility-documentation` | `transparency` |
  | `uncertainty-robustness` (also an old question id) | `uncertainty-reliability` |
  | `accountability` | `human-oversight-agency` |
  | `sustainability` | `energy-efficiency` |
  | `stakeholder-engagement` | `social-impact` |
  | `green-ai` (question) | `energy-efficiency` |
  | `transparency-accountability` (question) | `transparency` |
  | `fairness`, `privacy` (principle and question) | same id, unchanged |

- any other old question id (`training-data`, `evaluation`, `genai`) → the Principles landing page
- `#/applications/forests-climate` → `#/applications/forests`

### Content schema

There is no chapter content yet. Structure lives in `config/navigation.js`:

- `PAGES`: id, label, optional `longLabel`, and the one-line `tagline` shown in the page banner and on the Home entry cards.
- `LIFECYCLE_CHAPTERS`, `PRINCIPLE_CHAPTERS`, `APPLICATION_CHAPTERS` (collected in `CHAPTERS`), in reading order: `{ id, label, tagline?, nist?, contributor? }`. `tagline` shows as the lead under the chapter title and on the part's landing-page card (Lifecycle stages and principles have taglines; applications do not yet). `contributor` is an id in `content/contributors.js`; `ChapterPage` then shows "Contributor: name, role" under the title.
- **Lifecycle stages are EO-adapted labels over the seven NIST AI RMF 1.0 stages (Fig. 2).** Ids are unchanged from the NIST-named version, so routes did not change. Each stage's `nist` field holds the original NIST name, shown under the title as "NIST AI RMF stage: …":

  | id | Label | `nist` |
  |---|---|---|
  | `plan-design` | Define the EO problem | Plan & Design |
  | `collect-process-data` | Acquire imagery & reference data | Collect & Process Data |
  | `build-use-model` | Train & adapt models | Build & Use Model |
  | `verify-validate` | Validate across space & time | Verify & Validate |
  | `deploy-use` | Produce & deliver map products | Deploy & Use |
  | `operate-monitor` | Monitor & update | Operate & Monitor |
  | `people-planet` | People & planet | People & Planet (Use or Impacted by) |

- **Part landing pages:** `content/parts.js` (`PART_INTROS`, keyed by page id) holds each landing page's intro paragraphs and optional references. The Lifecycle intro's second paragraph says where the lifecycle comes from (NIST AI RMF 1.0 Fig. 2, adapted from the OECD Framework for the Classification of AI Systems, 2022; why NIST over ISO/IEC 22989 / 23894, the EU AI Act, the OECD AI Principles), followed by two references (doi:10.6028/NIST.AI.100-1, doi:10.1787/cb6d9eca-en). This replaced the former "Where this lifecycle comes from" box on the first stage page. The chapter list on each landing page comes from `CHAPTERS` in `config/navigation.js`.
- `CHAPTER_SECTIONS`: the section headings for each part, defined once and shared by every chapter of that part.
  - Lifecycle: What happens at this stage · Who is involved · Principles at this stage · In practice · Checklist
  - Principles: Opening · What it means in EO · Where it shows up in the lifecycle · Questions and how to address them · Cases · Checklist · References
  - Applications: Opening · Why it matters in this domain · Walk through the lifecycle · Principles most at stake · Cases · References

When chapters get written, add a content store keyed by part and chapter id and render it in `ChapterPage` in place of the placeholder, keeping the shared section outline.

### Visual design system

- **Branding:** none. The book names no working group, organization, or initiative. All IEEE GRSS and IADF identification (logos, links, names) was removed on 2026-10-26, and the WG-RAI credit on 2026-11-06; the logo files (`src/assets/IADF.webp`, `src/assets/grss-logo.svg`) and the earlier wording are in git history.
- **Layout:**
  - **Header (all pages):** white bar with the serif bold site title and a muted description line ("by lifecycle stage, by principle, or by application area"; hidden on phone). The title links Home. The main nav sits below. A "Skip to content" link appears on keyboard focus and moves focus to `<main>` (it does not change the hash route).
  - **Home hero:** full-width accent band (`components/HomeHero.jsx`). It has an eyebrow, serif H1, lead, three square buttons (Lifecycle, Principles, Applications; the first is filled), and a decorative dotted ellipse (`aria-hidden`). The ellipse is full size and 0.4 opacity at ≥1280px and smaller and fainter below that, so text stays legible.
  - **Page banner (all other pages):** a slim accent band (`components/PageBanner.jsx`) under the header, showing the page name (`longLabel` or `label`) and its `tagline` from `config/navigation.js`, with a smaller dotted ellipse. Every page therefore has white header → blue band → content; Home's band is the tall hero. The ellipse is shared with the hero (`components/DottedEllipse.jsx`).
  - **Footer (all pages):** navy band (`components/SiteFooter.jsx`). The site title as text. Page links and GitHub are on the right. Everything stacks on phone. The GitHub URL lives in `EXTERNAL_LINKS` in `config/navigation.js`.
- **Colors:** white page, very light gray (`subtle`) for alternate sections, near-black navy text, muted slate secondary text.
  - Blue accent `#2a4a9c` (hover `#1f3a80`, tint `#eaf1fb`), `navy` `#0b1f4b` for the footer, `accent-soft` `#d8e8f8` for dots and light text on blue or navy, `line-strong` `#c5d1e3`. There are no gradients and no second accent.
  - Contrast: white on accent is about 8.2:1, `accent-soft` on accent about 6.6:1, and white on navy about 16:1.
- **Semantic colors**, used only where meaning requires it: `risk` (muted red) for Risk callouts and high-risk levels, `safe` (teal) for Responsible move callouts and good levels, `warn` (amber) for Draft banners and moderate levels. Callouts are a thin left border plus a light tint.
- **Shape:** sharp corners everywhere (Tailwind `borderRadius` is overridden to 0, with only a 2px `sm` available), 1px light-gray borders, and no heavy shadows. Interactive cards get an accent left edge on hover.
- **Typography:** Source Sans 3 for body and UI and Source Serif 4 for titles and headings, loaded from Google Fonts in `index.html`. They fall back to the system sans stack and to Georgia / `ui-serif`. Section labels are muted uppercase, and prose is capped at `max-w-prose`.
- **Navigation pattern:**
  - **Top nav:** text tabs with a 2px accent underline for the active page (`.tab`). The row uses `.scroll-row`: it fits without scrolling on desktop; on narrow screens it scrolls sideways with the scrollbar hidden, and never vertically. (The earlier vertical scrollbar came from a `-mb-px` on `.tab` inside an `overflow-x: auto` row.)
  - **No sub-tab row.** Lifecycle, Principles and Applications each open on a landing page (`pages/PartLanding.jsx`): intro from `content/parts.js`, then the chapters as cards with label and tagline (numbered for the Lifecycle).
  - **Chapter list** (`components/ChapterNav.jsx`) on landing and chapter pages: "Overview" (the landing page) first, then the chapters, in `readingOrder(page)`. The current item has the active-tab accent and weight (`.chapter-link`, `aria-current="page"`). Lifecycle stages are numbered 1–7 (`NUMBERED_PARTS`). From `md` up it is a sticky left column (15rem, 16rem from `lg`); labels wrap, no truncation. Below `md` it is a native `<details>` "Chapters · <current>" disclosure at the top of the content, holding the same list; it closes after navigating.
  - **Previous / Next** links at the end of every chapter, in the chapter list's order (the first chapter's Previous is the part overview).
- **Mobile:**
  - Viewport meta is `width=device-width, initial-scale=1`.
  - Buttons, tabs, chapter-list items, the Chapters disclosure, simulator options, and footer links are at least 44px tall. Home entry cards are whole-card links.
  - Every multi-column grid collapses to one column below `md`.
  - Verified with no horizontal page scroll at 390 and 1280px after the restructure (320 and 768px before it).
- **Accessibility:** a visible `:focus-visible` outline (accent, or white on the blue and navy bands), AA-contrast tokens, `aria-current` on the active tab and chapter-list item, a skip link, `aria-pressed` on simulator options. On Home the hero holds the page `h1`; on other pages the header title is the `h1`.
- **Where tokens live:** CSS variables in `:root` in `src/index.css` (change the accent there), mapped to Tailwind color names in `tailwind.config.js`. Shared component classes (`card`, `card-interactive`, `section-label`, `link`, `btn-primary`, `btn-secondary`, `option-btn`, `tab`, `chapter-link`, `scroll-row`, `skip-link`, `callout-*`) are in `@layer components` in `index.css`.

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
   - `package.json` `homepage` fixed to `https://ai4rs.github.io/living-book-rai-eo`

4. **Removed the Fairness Lab and the agriculture running example**
   - The interactive "Fairness Lab: Crop Insurance Transfer Across Regions" and the EU-trained crop mapping running example were not meaningful to readers.
   - Deleted `FairnessTrainingLab`, its presets and region data, and the fairness raster CSS. Git history keeps them recoverable.
   - No replacement interactive content has been added yet.

5. **Visual redesign** (see Visual design system)
   - Light theme, blue accent, sharp corners, serif headings, centralized tokens
   - Simulator restyled with logic unchanged

6. **Branding and mobile polish** (later stripped of GRSS / IADF identification, see Branding)
   - Logo lockup in the header, Home hero band, navy footer with logos and a group credit (both since removed)
   - Blue accent, navy and accent-soft tokens, Source Serif 4 / Source Sans 3
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

10. **Repo moved to the ai4rs organization** (2026-10-26)
   - The repository moved from the personal `aldinorizaldy` account to the `ai4rs` organization; the repo name is unchanged.
   - New URLs: repo https://github.com/ai4rs/living-book-rai-eo, site https://ai4rs.github.io/living-book-rai-eo/.
   - Updated `package.json` `homepage`, the footer GitHub link (`EXTERNAL_LINKS` in `config/navigation.js`), and README. `vite.config.js` `base: "/living-book-rai-eo/"` is unchanged because the repo name is the same.

11. **"Who we are" section on Home** (after "How to read the book")
   - Data in `src/content/team.js` (`WHO_WE_ARE`: title, intro, contribute line, `people: [{ name, role, affiliation, link? }]`, where `link` is `{ label, href }`, and without `href` the label shows as plain text). Rendered by `components/TeamList.jsx`; the contribute line links to `EXTERNAL_LINKS.github`.
   - The three people are **placeholders** (`[Name]`, `[Role in the book]`, `[Affiliation]`, `[Link]`) to be replaced. `content/contributors.js` (chapter credits) is separate and not pulled in.
   - The section names no working group, organization, or initiative.
   - Built to move later: a separate "Who we are" tab only needs a page in `config/navigation.js` and a route that renders `WHO_WE_ARE` with `TeamList`, then the Home section can be removed or shortened to a link.

12. **Lifecycle adapted to EO, with its source cited**
   - Seven stages keep the NIST AI RMF spine and ids; labels and one-line taglines are EO-specific, and `nist` keeps the NIST name (see Content schema).
   - "Where this lifecycle comes from" note with NIST and OECD references on the first stage page (since moved into the Lifecycle landing page, see 14).
   - `ChapterHeader` gained an optional `note` line under the title.

13. **Deploys moved to GitHub Actions** (2026-11-06)
   - `.github/workflows/deploy.yml` builds and publishes on every push to `main`; Pages source switched to GitHub Actions. First manual run succeeded and the live site matched the local build.

14. **Landing pages and a chapter sidebar instead of sub-tabs**
   - `#/lifecycle`, `#/principles`, `#/applications` open a landing page per part (`PartLanding.jsx`, intro in `content/parts.js`); unknown chapter ids and `#/questions` open the landing page.
   - Sub-tab row removed; left chapter list (`ChapterNav.jsx`) with Overview + chapters, numbered for the Lifecycle, sticky on desktop and a "Chapters" disclosure on phone. Previous / Next at the end of each chapter.
   - Lifecycle source note moved from a box on the first stage into the Lifecycle landing intro, at the normal reading width.
   - Top nav scrollbar fixed and hidden when the row scrolls; skip link added.
   - Removed `SubTabs.jsx`, `SourceNote.jsx`, `content/lifecycle.js`; renamed `*_TABS` → `*_CHAPTERS`, `SUB_TABS` → `CHAPTERS`, `SUB_TAB_ALIASES` → `CHAPTER_ALIASES`.

15. **Revised principle list** (2026-11-06)
   - Eight principles, in order: Transparency, Fairness, Privacy, Robustness & security, Uncertainty & reliability, Energy efficiency (Green AI), Human oversight & agency, Social impact, each with a one-line tagline in `PRINCIPLE_CHAPTERS`. No source note.
   - Removed `explainability-transparency`, `uncertainty-robustness`, `accountability`, `sustainability`, `reproducibility-documentation`, `stakeholder-engagement`; old ids and question ids redirect (see Routes).
   - Chapter template and placeholders unchanged; nothing else referenced principles by id.

---

## In Progress

1. **Production parity verification between local and GitHub Pages**
   - Under the old `gh-pages` branch flow the live URL intermittently served older hashed assets. Since 2026-11-06 deploys go through GitHub Actions; keep checking parity for a few deploys to see whether that is resolved.
   - After each deploy, check the workflow run is green in the Actions tab and compare the asset hashes in the live `index.html` with a local `npm run build`.

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
   - `src/config/navigation.js` holds main page names and taglines, chapter ids and labels, chapter section outlines, and route aliases. Renaming happens there.

5. **Centralized design tokens**
   - Colors live as CSS variables in `src/index.css` and are consumed through Tailwind token names. Components use tokens and shared classes, not hard-coded hex values. Changing the accent takes one edit.

6. **No interactive content unless it is meaningful to readers**
   - The Fairness Lab was removed rather than kept as filler. Chapters get an interactive element only when one is genuinely useful to readers.

7. **Preserve the Integrated Simulator's logic**
   - Reachable from the top nav and Home; only its styling has changed.

8. **Lightweight SVG/CSS visualizations instead of map SDKs**

9. **Deploy with GitHub Actions on push to `main`**
   - Replaced the `gh-pages` branch flow (`npm run deploy`) on 2026-11-06, so pushing and going live are one step. The `gh-pages` branch, the `deploy` / `predeploy` scripts and the `gh-pages` package were removed the same day.

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

2. **To write a chapter:** add a content store keyed by part and chapter id, and render it in `ChapterPage` in place of the "To be written." placeholder. Keep the shared outline and the division of labor in decision 1. Credit an author with `contributor` on the sub-tab entry.

3. **Recover old material from git** where useful: `git show abe84e6:src/content/cases.js` (including the tree-mapping case with its evidence table), `questions.js`, `applications.js`, and `src/components/CaseEvidence.jsx`.

4. **Use the design tokens and shared classes** (`card`, `section-label`, `callout-*`, `btn-*`, `tab`) for new UI. Do not hard-code colors or add rounded corners.

5. **Start a paper track** with its own, narrower storyline.

6. **Pushing to `main` deploys the site.** Push only when the user asks, since a push is also a release. After the workflow run finishes, confirm live parity: compare the asset hashes in the live `index.html` with a local `npm run build`.
