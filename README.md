# living-book-rai-eo

Responsible AI in Earth Observation Living Book built with Vite + React + Tailwind CSS.

## Structure

- **Home** (`#/home`): introduction and entry points
- **Lifecycle** (`#/lifecycle`, `#/lifecycle/<id>`): landing page, then one chapter per lifecycle stage
- **Principles** (`#/principles`, `#/principles/<id>`): landing page, then one chapter per principle (replaces Lifecycle Questions; old `#/questions/<id>` links redirect)
- **Applications** (`#/applications`, `#/applications/<id>`): landing page, then one chapter per application domain
- **Simulator** (`#/simulator`): placeholder, an interactive simulator is coming soon

The chapters are currently an outline: each shows its section headings with placeholders. Lifecycle, Principles, and Applications each open on a landing page (`#/lifecycle` etc.) with a left-side chapter list. Page names, chapters, taglines, and each part's section outline are configured in `src/config/navigation.js`; landing-page intros live in `src/content/parts.js`. Every landing page renders through `src/pages/PartLanding.jsx` and every chapter through `src/pages/ChapterPage.jsx`. See `PROJECT_STATE.md` for the architecture and roadmap.

## Stack

- React + Vite
- Tailwind CSS
- Lucide React
- GitHub Pages deployment via GitHub Actions

## Local development (Conda)

This project is set up to use the Conda environment `rai-eo-node`.

```bash
conda activate rai-eo-node
cd .../living-book-rai-eo
npm run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173/`).

## Build

```bash
conda activate rai-eo-node
cd .../living-book-rai-eo
npm run build
```

## Deploy to GitHub Pages

Repository: `https://github.com/ai4rs/living-book-rai-eo.git`

The site deploys itself. Every push to `main` runs the **Deploy to GitHub Pages** workflow (`.github/workflows/deploy.yml`), which runs `npm ci` and `npm run build` and publishes `dist/`. It usually goes live within one to two minutes.

```bash
git push origin main
```

- Follow a deploy in the repository's **Actions** tab. To redeploy without a new commit, open **Deploy to GitHub Pages** there and click **Run workflow**.
- Repository setting this relies on: **Settings -> Pages -> Source: GitHub Actions**.

Verify deployment from terminal:

```bash
curl -I -L https://ai4rs.github.io/living-book-rai-eo/
```

Expected result: `HTTP/2 200`.

Live URL:

`https://ai4rs.github.io/living-book-rai-eo/`
