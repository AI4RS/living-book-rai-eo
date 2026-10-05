// Single source for page names, sub-tab ids and labels.
// Page names are working titles: rename them here and the whole site follows.

export const SITE_TITLE = "Responsible AI in Earth Observation Living Book";

// Animated placeholder maps on draft question pages. Set to false to hide them
// everywhere.
export const SHOW_PLACEHOLDER_MAPS = true;

export const PAGES = {
  home: { id: "home", label: "Home" },
  applications: {
    id: "applications",
    label: "Applications",
    tagline: "Start from a domain and see what goes wrong there.",
  },
  questions: {
    id: "questions",
    label: "Lifecycle Questions",
    tagline: "Start from a question you face while building an EO model.",
  },
  simulator: { id: "simulator", label: "Simulator", longLabel: "Integrated Simulator" },
};

// Top nav order.
export const MAIN_NAV = [PAGES.home, PAGES.applications, PAGES.questions, PAGES.simulator];

// status: "built" | "draft". First entry is the default sub-tab.
export const APPLICATION_TABS = [
  { id: "agriculture", label: "Agriculture & food security", status: "built" },
  { id: "hazards", label: "Hazards & disaster response", status: "draft" },
  { id: "urban-health", label: "Urban & public health", status: "draft" },
  { id: "forests-climate", label: "Forests & climate", status: "draft" },
  { id: "security-infrastructure", label: "Security & critical infrastructure", status: "draft" },
];

export const QUESTION_TABS = [
  { id: "fairness", label: "Fairness", status: "built" },
  { id: "training-data", label: "Training data", status: "draft" },
  { id: "evaluation", label: "Evaluation beyond accuracy", status: "draft" },
  { id: "uncertainty-robustness", label: "Uncertainty & robustness", status: "draft" },
  { id: "transparency-accountability", label: "Transparency & accountability", status: "draft" },
  { id: "privacy", label: "Privacy & sensitive data", status: "draft" },
  { id: "genai", label: "Generative AI & foundation models", status: "draft" },
];

export const SUB_TABS = {
  applications: APPLICATION_TABS,
  questions: QUESTION_TABS,
};

export const findApplication = (id) => APPLICATION_TABS.find((t) => t.id === id);
export const findQuestion = (id) => QUESTION_TABS.find((t) => t.id === id);

// Hash helpers. Routes look like #/home, #/simulator, #/questions/fairness.
export const hrefFor = (page, sub) => (sub ? `#/${page}/${sub}` : `#/${page}`);
export const applicationHref = (id) => hrefFor(PAGES.applications.id, id);
export const questionHref = (id) => hrefFor(PAGES.questions.id, id);
