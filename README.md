# Responsible AI in Earth Observation Living Book

An open, living book on using AI responsibly in Earth observation. It explains Responsible AI in three ways: stage by stage through the lifecycle of an EO project, principle by principle, and one application domain at a time. Read it at **https://ai4rs.github.io/living-book-rai-eo/**.

## Contributing

Each chapter is one Markdown file in `src/content/chapters/`. You can write or improve a chapter without knowing any code, directly in the GitHub web editor or on your own computer, and then open a pull request. Start with **[CONTRIBUTING.md](CONTRIBUTING.md)**.

## Run locally

Install [Node.js](https://nodejs.org/) 20, then in the repository folder:

```bash
npm install
npm run dev
```

Open the address Vite prints (usually `http://localhost:5173/living-book-rai-eo/`).

Alternatively, use the project's Conda environment, which provides Node.js 20: `conda activate rai-eo-node`, then the same commands.

## Project structure

- **Home** (`#/home`): introduction, entry points, and who we are
- **Lifecycle** (`#/lifecycle`, `#/lifecycle/<id>`): landing page, then one chapter per lifecycle stage
- **Principles** (`#/principles`, `#/principles/<id>`): landing page, then one chapter per principle (old `#/questions/<id>` links redirect)
- **Applications** (`#/applications`, `#/applications/<id>`): landing page, then one chapter per application domain
- **Simulator** (`#/simulator`): placeholder; an interactive simulator is coming soon

Where things live:

- `src/content/chapters/<part>/<chapter-id>.md`: the text of each chapter (front matter with status and contributors, then one `##` heading per section). Rendered by `src/pages/ChapterPage.jsx`.
- `public/figures/<part>/<chapter-id>/`: chapter figures.
- `src/config/navigation.js`: page names, chapter ids, titles, taglines, and each part's section outline.
- `src/content/parts.js`: landing-page intros. Every landing page renders through `src/pages/PartLanding.jsx`.
- `scripts/check-chapters.mjs`: checks the chapter files against the outline (`npm run check:chapters`).

The chapters are currently an outline: each shows its section headings with placeholders. See `PROJECT_STATE.md` for the architecture and roadmap.

Stack: React, Vite, Tailwind CSS, Lucide React, `marked` for Markdown, GitHub Pages via GitHub Actions.

## For maintainers

### Build

```bash
npm run build
```

This runs the chapter check first and then builds into `dist/`. `npm run preview` serves the build under the `/living-book-rai-eo/` base path.

### Deploy

The site deploys itself. Every push to `main` (including a merged pull request) runs the **Deploy to GitHub Pages** workflow (`.github/workflows/deploy.yml`), which runs `npm ci` and `npm run build` and publishes `dist/`. It usually goes live within one to two minutes.

- Pull requests to `main` run the **Check pull request** workflow (`.github/workflows/check.yml`): chapter check and build, no deploy.
- Follow a deploy in the repository's **Actions** tab. To redeploy without a new commit, open **Deploy to GitHub Pages** there and click **Run workflow**.
- Repository setting this relies on: **Settings → Pages → Source: GitHub Actions**.

### Verify the deploy

```bash
curl -I -L https://ai4rs.github.io/living-book-rai-eo/
```

Expected result: `HTTP/2 200`. To confirm the live site matches your build, compare the asset file names in the live `index.html` with those in a local `dist/index.html`.

## License

To be decided by the maintainers.
