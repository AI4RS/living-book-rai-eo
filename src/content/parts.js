// Intro text for each part's landing page (pages/PartLanding.jsx), keyed by
// page id. `intro` is a list of paragraphs; `references` (optional) is a short
// list of { text, href } shown below them. The chapter list itself comes from
// CHAPTERS in config/navigation.js.
export const PART_INTROS = {
  lifecycle: {
    intro: [
      "An Earth observation AI project moves through a series of stages, from defining the problem to producing maps and watching how they are used. Responsible AI questions come up at every stage, and different people are responsible at each one. This part walks through the stages one by one.",
      "The stages follow the AI system lifecycle in the NIST AI Risk Management Framework (AI RMF 1.0, Fig. 2), which NIST adapted from the OECD Framework for the Classification of AI Systems (2022). NIST's lifecycle is general purpose, so we rename and describe each stage for Earth observation. Other frameworks describe the lifecycle differently, for example ISO/IEC 22989 and ISO/IEC 23894, the EU AI Act, and the OECD AI Principles; we use NIST because it links each stage to the people involved and to risk management functions (Govern, Map, Measure, Manage).",
    ],
    references: [
      {
        text: "NIST (2023). Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1.",
        href: "https://doi.org/10.6028/NIST.AI.100-1",
      },
      {
        text: "OECD (2022). OECD Framework for the Classification of AI Systems. OECD Digital Economy Papers No. 323.",
        href: "https://doi.org/10.1787/cb6d9eca-en",
      },
    ],
  },
  principles: {
    intro: [
      "Responsible AI is usually described through a small set of principles, such as fairness, transparency, robustness, privacy, and accountability. This part explains what each principle means for Earth observation, where it shows up in the lifecycle, and which questions to ask to put it into practice.",
    ],
  },
  applications: {
    intro: [
      "Each application area brings its own data, users, and risks. This part follows one domain at a time through the lifecycle and highlights the principles most at stake there.",
    ],
  },
};
