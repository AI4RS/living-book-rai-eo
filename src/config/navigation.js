// Single source for page names, sub-tab ids and labels, and chapter outlines.
// Page names are working titles: rename them here and the whole site follows.

export const SITE_TITLE = "Responsible AI in Earth Observation Living Book";

// Publisher and project links (footer).
export const EXTERNAL_LINKS = {
  grss: "https://www.grss-ieee.org",
  iadf: "https://www.grss-ieee.org/technical-committees/image-analysis-and-data-fusion/",
  github: "https://github.com/aldinorizaldy/living-book-rai-eo",
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
    longLabel: "Integrated Simulator",
    tagline: "Test how resolution and label choices trade off privacy, fairness, and compute.",
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

// Sub-tabs per page. First entry is the default sub-tab. A tab may name a
// `contributor` (an id in content/contributors.js) to credit on its chapter.
export const LIFECYCLE_TABS = [
  { id: "plan-design", label: "Plan & Design" },
  { id: "collect-process-data", label: "Collect & Process Data" },
  { id: "build-use-model", label: "Build & Use Model" },
  { id: "verify-validate", label: "Verify & Validate" },
  { id: "deploy-use", label: "Deploy & Use" },
  { id: "operate-monitor", label: "Operate & Monitor" },
  { id: "people-planet", label: "People & Planet" },
];

export const PRINCIPLE_TABS = [
  { id: "fairness", label: "Fairness" },
  { id: "explainability-transparency", label: "Explainability & transparency" },
  { id: "uncertainty-robustness", label: "Uncertainty & robustness" },
  { id: "privacy", label: "Privacy" },
  { id: "accountability", label: "Accountability" },
  { id: "sustainability", label: "Sustainability (Green AI)" },
  { id: "reproducibility-documentation", label: "Reproducibility & documentation" },
  { id: "stakeholder-engagement", label: "Stakeholder engagement" },
];

export const APPLICATION_TABS = [
  { id: "agriculture", label: "Agriculture & food security" },
  { id: "forests", label: "Forests" },
  { id: "hazards", label: "Hazards & disaster response" },
  { id: "urban-health", label: "Urban & public health" },
  { id: "climate", label: "Climate" },
  { id: "security-infrastructure", label: "Security & critical infrastructure" },
];

export const SUB_TABS = {
  lifecycle: LIFECYCLE_TABS,
  principles: PRINCIPLE_TABS,
  applications: APPLICATION_TABS,
};

// Section headings every chapter of a part shares, in order.
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

// Retired sub-tab ids that should still open their successor, so old links keep
// working: { page: { oldId: newId } }. Keyed by the page after PAGE_ALIASES.
// Unknown ids open the page's first sub-tab.
export const SUB_TAB_ALIASES = {
  applications: { "forests-climate": "forests" },
  principles: {
    "green-ai": "sustainability",
    "transparency-accountability": "explainability-transparency",
  },
};

// Hash helpers. Routes look like #/home, #/simulator, #/principles/fairness.
export const hrefFor = (page, sub) => (sub ? `#/${page}/${sub}` : `#/${page}`);
