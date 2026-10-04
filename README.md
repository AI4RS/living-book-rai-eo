# living-book-rai-eo

Responsible AI in Earth Observation Living Book built with Vite + React + Tailwind CSS.

## Structure

- **Home** (`#/home`): introduction and entry points
- **Applications** (`#/applications/<id>`): domain specifics and cases (Agriculture is built, the others are drafts)
- **Lifecycle Questions** (`#/questions/<id>`): general guidance per question (Fairness is built, the others are drafts)
- **Simulator** (`#/simulator`): the Integrated Simulator

Both main pages are views over one case store (`src/content/cases.js`). Page names and sub-tabs are configured in `src/config/navigation.js`. See `PROJECT_STATE.md` for the architecture and roadmap.

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

`https://github.com/aldinorizaldy/living-book-rai-eo.git`

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
curl -I -L https://aldinorizaldy.github.io/living-book-rai-eo/
```

Expected result: `HTTP/2 200` (it may take 1-5 minutes after first publish).

Live URL:

`https://aldinorizaldy.github.io/living-book-rai-eo/`
