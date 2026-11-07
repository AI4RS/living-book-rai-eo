// Single source for page names, chapter ids and labels, and chapter outlines.
// Page names are working titles: rename them here and the whole site follows.

export const SITE_TITLE = "Responsible AI in Earth Observation Living Book";

// Project links: the footer, chapter "Edit this chapter" links, and the
// contributor guide link on Home.
const GITHUB = "https://github.com/ai4rs/living-book-rai-eo";

export const EXTERNAL_LINKS = {
  github: GITHUB,
  contributing: `${GITHUB}/blob/main/CONTRIBUTING.md`,
};

export const PAGES = {
  home: { id: "home", label: "Home" },
  lifecycle: {
    id: "lifecycle",
    label: "Lifecycle",
    tagline: "Follow an EO project stage by stage, from planning to its effects on people and planet.",
  },
  principles: {
    id: "principles",
    label: "Principles",
    tagline: "Start from a principle and see the questions it raises across the lifecycle.",
  },
  applications: {
    id: "applications",
    label: "Applications",
    tagline: "Start from a domain and walk it through the lifecycle.",
  },
  simulator: {
    id: "simulator",
    label: "Simulator",
    tagline: "Interactive examples, coming soon.",
  },
};

// Top nav order.
export const MAIN_NAV = [
  PAGES.home,
  PAGES.lifecycle,
  PAGES.principles,
  PAGES.applications,
  PAGES.simulator,
];

// Chapters per part, in reading order (the order of the chapter list, and of
// Previous / Next). A chapter may have a one-line `tagline` shown under its
// title and in the part's chapter list. Each part opens on a landing page
// (pages/PartLanding.jsx; intro text in content/parts.js). A chapter's text,
// status and contributors live in its Markdown file,
// src/content/chapters/<part>/<id>.md (see CONTRIBUTING.md).
//
// Lifecycle stages are EO-specific names over the seven stages of the NIST AI
// RMF 1.0 lifecycle (Fig. 2); `nist` keeps the original NIST stage name. Ids
// stay as they were so links keep working.
export const LIFECYCLE_CHAPTERS = [
  {
    id: "plan-design",
    label: "Define the EO problem",
    tagline: "The decision the map supports, the area of interest, and the spatial and temporal scale.",
    nist: "Plan & Design",
  },
  {
    id: "collect-process-data",
    label: "Acquire imagery & reference data",
    tagline: "Sensors, revisit and cloud cover, preprocessing, and ground truth labels.",
    nist: "Collect & Process Data",
  },
  {
    id: "build-use-model",
    label: "Train & adapt models",
    tagline: "From task-specific networks to fine-tuned foundation models, across sensors and regions.",
    nist: "Build & Use Model",
  },
  {
    id: "verify-validate",
    label: "Validate across space & time",
    tagline: "Spatially independent test sets, accuracy assessment, uncertainty, and domain shift.",
    nist: "Verify & Validate",
  },
  {
    id: "deploy-use",
    label: "Produce & deliver map products",
    tagline: "Maps, area estimates, uncertainty layers, metadata, and how they reach users.",
    nist: "Deploy & Use",
  },
  {
    id: "operate-monitor",
    label: "Monitor & update",
    tagline: "Sensor changes, seasonal and long-term drift, model updates, and compute cost.",
    nist: "Operate & Monitor",
  },
  {
    id: "people-planet",
    label: "People & planet",
    tagline: "Communities who are mapped or affected, data sovereignty, dual use, and environmental footprint.",
    nist: "People & Planet (Use or Impacted by)",
  },
];

export const PRINCIPLE_CHAPTERS = [
  {
    id: "transparency",
    label: "Transparency",
    tagline: "Data, models, assumptions and outputs can be inspected and understood by the people who use or are affected by them.",
  },
  {
    id: "fairness",
    label: "Fairness",
    tagline: "Models and services don't systematically disadvantage regions, communities or user groups.",
  },
  {
    id: "privacy",
    label: "Privacy",
    tagline: "Personal and sensitive information, including locations seen from space, stays protected from collection to reporting.",
  },
  {
    id: "robustness-security",
    label: "Robustness & security",
    tagline: "Reliable under clouds, sensor changes and shifts in region or season, and resistant to deliberate manipulation.",
  },
  {
    id: "uncertainty-reliability",
    label: "Uncertainty & reliability",
    tagline: "Every output carries a trustworthy indication of how far it can be relied on.",
  },
  {
    id: "energy-efficiency",
    label: "Energy efficiency (Green AI)",
    tagline: "The energy and emissions of training and running models are measured, reduced and reported.",
  },
  {
    id: "human-oversight-agency",
    label: "Human oversight & agency",
    tagline: "People can understand, supervise, override or stop the system, and responsibility stays with people.",
  },
  {
    id: "social-impact",
    label: "Social impact",
    tagline: "Effects on people, institutions and society, and the engagement needed to keep them beneficial.",
  },
];

export const APPLICATION_CHAPTERS = [
  { id: "agriculture", label: "Agriculture & food security" },
  { id: "forests", label: "Forests" },
  { id: "hazards", label: "Hazards & disaster response" },
  { id: "urban-health", label: "Urban & public health" },
  { id: "climate", label: "Climate" },
  { id: "security-infrastructure", label: "Security & critical infrastructure" },
];

export const CHAPTERS = {
  lifecycle: LIFECYCLE_CHAPTERS,
  principles: PRINCIPLE_CHAPTERS,
  applications: APPLICATION_CHAPTERS,
};

// Lifecycle stages are a sequence, so their chapter lists are numbered.
export const NUMBERED_PARTS = ["lifecycle"];

// Section headings every chapter of a part shares, in order. Each chapter file
// has one "## " heading per entry; scripts/check-chapters.mjs checks them.
export const CHAPTER_SECTIONS = {
  lifecycle: [
    "What happens at this stage",
    "Who is involved",
    "Principles at this stage",
    "In practice",
    "Checklist",
  ],
  principles: [
    "Opening",
    "What it means in EO",
    "Where it shows up in the lifecycle",
    "Questions and how to address them",
    "Cases",
    "Checklist",
    "References",
  ],
  applications: [
    "Opening",
    "Why it matters in this domain",
    "Walk through the lifecycle",
    "Principles most at stake",
    "Cases",
    "References",
  ],
};

// Retired page ids that should still open their successor: { oldPage: newPage }.
export const PAGE_ALIASES = {
  questions: "principles",
};

// Retired chapter ids that should still open their successor, so old links
// keep working: { page: { oldId: newId } }. Keyed by the page after
// PAGE_ALIASES. Unknown ids open the part's landing page.
export const CHAPTER_ALIASES = {
  applications: { "forests-climate": "forests" },
  // Retired principle ids, and question ids from the former Lifecycle
  // Questions page (#/questions/<id> resolves through PAGE_ALIASES first).
  // fairness and privacy kept their ids.
  principles: {
    "explainability-transparency": "transparency",
    "reproducibility-documentation": "transparency",
    "uncertainty-robustness": "uncertainty-reliability",
    accountability: "human-oversight-agency",
    sustainability: "energy-efficiency",
    "stakeholder-engagement": "social-impact",
    "green-ai": "energy-efficiency",
    "transparency-accountability": "transparency",
  },
};

// A part's chapter list in reading order: its landing page ("Overview",
// id null) first, then its chapters. Drives the chapter sidebar and
// Previous / Next.
export const readingOrder = (page) => [{ id: null, label: "Overview" }, ...CHAPTERS[page]];

// Hash helpers. Routes look like #/home, #/simulator, #/principles/fairness.
export const hrefFor = (page, chapter) => (chapter ? `#/${page}/${chapter}` : `#/${page}`);
