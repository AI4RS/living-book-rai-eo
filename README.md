# living-book-rai-eo

Responsible AI in Earth Observation Living Book built with Vite + React + Tailwind CSS.

## Structure

- **Home** (`#/home`): introduction and entry points
- **Lifecycle** (`#/lifecycle/<id>`): one chapter per lifecycle stage
- **Principles** (`#/principles/<id>`): one chapter per principle (replaces Lifecycle Questions; old `#/questions/<id>` links redirect)
- **Applications** (`#/applications/<id>`): one chapter per application domain
- **Simulator** (`#/simulator`): the Integrated Simulator

The chapters are currently an outline: each shows its section headings with placeholders. Page names, sub-tabs, taglines, and each part's section outline are configured in `src/config/navigation.js`, and every chapter renders through `src/pages/ChapterPage.jsx`. See `PROJECT_STATE.md` for the architecture and roadmap.

## Stack

- React + Vite
- Tailwind CSS
- Lucide React
- GitHub Pages deployment via `gh-pages`

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

Repository remote:

`https://github.com/ai4rs/living-book-rai-eo.git`

Push source branch:

```bash
git push -u origin main
```

Deploy static site:

```bash
conda activate rai-eo-node
cd .../living-book-rai-eo
npm run deploy
```

In GitHub repository settings:

1. Go to **Settings -> Pages**
2. Set **Source** to **Deploy from a branch**
3. Select branch **gh-pages** and folder **/ (root)**

Verify deployment from terminal:

```bash
curl -I -L https://ai4rs.github.io/living-book-rai-eo/
```

Expected result: `HTTP/2 200` (it may take 1-5 minutes after first publish).

Live URL:

`https://ai4rs.github.io/living-book-rai-eo/`
