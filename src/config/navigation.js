// Single source for page names, sub-tab ids and labels, and chapter outlines.
// Page names are working titles: rename them here and the whole site follows.

export const SITE_TITLE = "Responsible AI in Earth Observation Living Book";

// Project links (footer).
export const EXTERNAL_LINKS = {
  github: "https://github.com/ai4rs/living-book-rai-eo",
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
// `contributor` (an id in content/contributors.js) to credit on its chapter,
// and a one-line `tagline` shown under its title.
//
// Lifecycle stages are EO-specific names over the seven stages of the NIST AI
// RMF 1.0 lifecycle (Fig. 2); `nist` keeps the original NIST stage name. Ids
// stay as they were so links keep working.
export const LIFECYCLE_TABS = [
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
