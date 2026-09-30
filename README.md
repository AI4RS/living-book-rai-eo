# living-book-rai-eo

Responsible AI in Earth Observation simulator built with Vite + React + Tailwind CSS.

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
