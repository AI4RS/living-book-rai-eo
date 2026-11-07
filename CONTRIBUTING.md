# Contributing a chapter

Thank you for helping write the Responsible AI in Earth Observation Living Book.

Each chapter is one Markdown file in `src/content/chapters/`. You don't need to know React or touch any code: you edit a text file and open a pull request. You can do everything in the browser on GitHub (Option A) or on your own computer (Option B).

## 1. Before you start

[Open an issue](https://github.com/ai4rs/living-book-rai-eo/issues/new/choose) with the **Write or improve a chapter** template. Say which chapter you want to write, who you are, and roughly what you plan for each section. This stops two people from writing the same chapter, and lets a maintainer answer questions before you put in the work.

## 2. Find your file

| Part | Chapter | File in `src/content/chapters/` |
| --- | --- | --- |
| Lifecycle | Define the EO problem | [`lifecycle/plan-design.md`](src/content/chapters/lifecycle/plan-design.md) |
| Lifecycle | Acquire imagery & reference data | [`lifecycle/collect-process-data.md`](src/content/chapters/lifecycle/collect-process-data.md) |
| Lifecycle | Train & adapt models | [`lifecycle/build-use-model.md`](src/content/chapters/lifecycle/build-use-model.md) |
| Lifecycle | Validate across space & time | [`lifecycle/verify-validate.md`](src/content/chapters/lifecycle/verify-validate.md) |
| Lifecycle | Produce & deliver map products | [`lifecycle/deploy-use.md`](src/content/chapters/lifecycle/deploy-use.md) |
| Lifecycle | Monitor & update | [`lifecycle/operate-monitor.md`](src/content/chapters/lifecycle/operate-monitor.md) |
| Lifecycle | People & planet | [`lifecycle/people-planet.md`](src/content/chapters/lifecycle/people-planet.md) |
| Principles | Transparency | [`principles/transparency.md`](src/content/chapters/principles/transparency.md) |
| Principles | Fairness | [`principles/fairness.md`](src/content/chapters/principles/fairness.md) |
| Principles | Privacy | [`principles/privacy.md`](src/content/chapters/principles/privacy.md) |
| Principles | Robustness & security | [`principles/robustness-security.md`](src/content/chapters/principles/robustness-security.md) |
| Principles | Uncertainty & reliability | [`principles/uncertainty-reliability.md`](src/content/chapters/principles/uncertainty-reliability.md) |
| Principles | Energy efficiency (Green AI) | [`principles/energy-efficiency.md`](src/content/chapters/principles/energy-efficiency.md) |
| Principles | Human oversight & agency | [`principles/human-oversight-agency.md`](src/content/chapters/principles/human-oversight-agency.md) |
| Principles | Social impact | [`principles/social-impact.md`](src/content/chapters/principles/social-impact.md) |
| Applications | Agriculture & food security | [`applications/agriculture.md`](src/content/chapters/applications/agriculture.md) |
| Applications | Forests | [`applications/forests.md`](src/content/chapters/applications/forests.md) |
| Applications | Hazards & disaster response | [`applications/hazards.md`](src/content/chapters/applications/hazards.md) |
| Applications | Urban & public health | [`applications/urban-health.md`](src/content/chapters/applications/urban-health.md) |
| Applications | Climate | [`applications/climate.md`](src/content/chapters/applications/climate.md) |
| Applications | Security & critical infrastructure | [`applications/security-infrastructure.md`](src/content/chapters/applications/security-infrastructure.md) |

The chapter's title, its one-line summary under the title and (for the Lifecycle) its NIST stage are not in the file. The maintainers keep them with the site's structure. If you think one should change, say so in your issue.

## 3. What goes in each section

Every chapter file already has its section headings (the `##` lines). Write under them. Don't rename, remove or reorder the `##` headings: every chapter of a part has the same shape, so readers can compare them. If a heading doesn't fit your chapter, ask in your issue. A section you haven't written yet keeps the text `To be written.`, and the site shows it as a placeholder.

**How the three parts fit together.** The Principles hold the general guidance, each piece stated once: every question in a principle chapter names the lifecycle stage where it comes up. Lifecycle chapters point to those principle questions for their stage instead of repeating them. Applications walk one domain through the lifecycle stages and name the principles most at stake there. So when you write a Lifecycle or Applications chapter, link to the Principles instead of copying their guidance.

### Lifecycle chapters

- **What happens at this stage:** the work done at this stage of an Earth observation project, in concrete terms (data, tools, decisions).
- **Who is involved:** the people and organizations who act or decide here, and who carries responsibility.
- **Principles at this stage:** which principles matter most here, with links to the principle questions for this stage. Don't repeat their guidance.
- **In practice:** a short, real example of this stage, with sources.
- **Checklist:** a short list of things to check before moving to the next stage.

### Principles chapters

- **Opening:** a short paragraph, ideally a concrete situation, that shows why this principle matters in Earth observation.
- **What it means in EO:** what the principle means for satellite and airborne data, models and maps, in contrast with its general meaning.
- **Where it shows up in the lifecycle:** at which stages the principle comes up and how, linking to the Lifecycle chapters.
- **Questions and how to address them:** the questions a team should ask. Give each question its own `###` sub-heading, then explain how to address it, and name the lifecycle stage where it comes up (with a link).
- **Cases:** real projects or studies where the principle was handled well or badly, with sources.
- **Checklist:** a short list a team can work through.
- **References:** the sources cited in the chapter.

### Applications chapters

- **Opening:** a short paragraph on the domain and what Earth observation AI is used for there.
- **Why it matters in this domain:** what is at stake for people and the environment, and who uses the results.
- **Walk through the lifecycle:** the domain stage by stage, from defining the problem to its effects on people and planet, with links to the Lifecycle chapters.
- **Principles most at stake:** the principles that matter most in this domain and why, with links to the Principles chapters.
- **Cases:** real projects or studies in this domain, with sources.
- **References:** the sources cited in the chapter.

## 4. Writing in Markdown

Markdown is plain text with a few symbols for formatting.

````md
A paragraph is plain text. Leave an empty line between paragraphs.
Use **bold** for emphasis, sparingly.

### A sub-heading inside a section

- An item in a list
- Another item

1. A numbered step
2. The next step

A link to a website: [NIST AI RMF](https://doi.org/10.6028/NIST.AI.100-1).

| Region | Overall accuracy | Source |
| --- | --- | --- |
| Region A | 0.91 | Doe et al. (2024) |
| Region B | 0.78 | Doe et al. (2024) |

![A land cover map of the study area with three classes](figures/principles/fairness/land-cover-map.png)
````

- **Sub-headings:** use `###` inside a section. Don't use `#` or `##`, which are reserved for the page.
- **Checklists:** write them as a plain list (`- Report accuracy per region.`).
- **Link to another chapter:** use `#/` followed by the part and the chapter's file name without `.md`. For example, `[Fairness](#/principles/fairness)` or `[Validate across space & time](#/lifecycle/verify-validate)`. `[Principles](#/principles)` links to a part's overview page.
- **Figures:** put the image in `public/figures/<part>/<chapter-file-name>/`, for example `public/figures/principles/fairness/land-cover-map.png`. Refer to it as `figures/principles/fairness/land-cover-map.png`, without `public/`. Always write alt text inside the brackets that describes what the figure shows, for readers who can't see it. Use PNG, JPG or SVG, under about 1 MB. Only use figures you are allowed to reuse, and cite the source below the figure. GitHub's Preview tab won't show these figures, but the site will.
- **References:** a plain list under the `## References` heading, one source per item, with a DOI link where there is one. For example: `- Doe, J. et al. (2024). Title of the paper. Journal. https://doi.org/10.xxxx/xxxxx`. In the text, cite as (Doe et al., 2024).
- **No made-up numbers.** The site never shows invented or illustrative numbers. Every number, in text, tables or figures, needs a source in the References.
- **HTML** isn't supported. It shows up as plain text.

## 5. Credit yourself

Each file starts with a short block between two `---` lines, called front matter:

```md
---
status: draft
contributors:
  - name: Jane Doe
    role: Researcher, Example University
---
```

- **contributors:** add yourself with your name and a short role and affiliation, indented exactly as shown (two spaces before `-`, four before `role`). Add one `- name:` entry per person. An empty list is written `contributors: []`. Replace the `[]` when you add the first person.
- **status:** keep `draft` while the chapter is in progress; the page then shows a "Draft" banner. Change it to `ready` when the chapter is done, and the banner disappears.

## 6. Option A: edit in the browser

You only need a GitHub account.

1. Open the chapter on the [live site](https://ai4rs.github.io/living-book-rai-eo/) and click **Edit this chapter on GitHub** at the bottom. You can also open the file from the table above and click the pencil icon.
2. If GitHub asks, click **Fork this repository**. This makes your own copy, so you can propose changes without write access.
3. Edit the text. Use the **Preview** tab to check your formatting. It shows the Markdown, not the site's styling.
4. To add a figure, open the folder `public/figures/` in your fork, create the folder `<part>/<chapter-file-name>/` in it, and use **Add file → Upload files**.
5. Click **Commit changes** (or **Propose changes**), write a short description, and then click **Create pull request**. Fill in the short checklist in the description.

## 7. Option B: edit on your computer

1. Install [Node.js](https://nodejs.org/) version 20 and Git.
2. Fork the repository on GitHub, then clone your fork and install:

   ```bash
   git clone https://github.com/<your-username>/living-book-rai-eo.git
   cd living-book-rai-eo
   npm install
   npm run dev
   ```

3. Open the address it prints (usually `http://localhost:5173/living-book-rai-eo/`) and go to your chapter. The page updates each time you save the file.
4. Before you open the pull request, run `npm run check:chapters`. It names any problem in your file and says how to fix it.
5. Commit your changes on a new branch, push them to your fork, and open a pull request on GitHub.

If you use Conda, you can use the project's Conda environment `rai-eo-node` instead of installing Node.js yourself (`conda activate rai-eo-node`).

## 8. What happens next

A maintainer reviews your pull request and may suggest changes in the comments. GitHub also runs an automatic check on every pull request: it checks the chapter files and builds the site. Maintainers merge only when it shows a green tick. If it fails, click **Details** to read the message, which names the file and the fix. Once the pull request is merged into `main`, the site updates within a couple of minutes.
