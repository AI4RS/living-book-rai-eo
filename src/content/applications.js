// Per-application copy. Application pages own domain specifics only: what
// typically goes wrong in that domain plus concrete cases. They link to
// question pages for the general guidance and must not restate it.
//
// Built entries (status "built" in config/navigation.js) need: domainName,
// intro, whatGoesWrong, goDeeper, relatedQuestions. Drafts need intro and
// relatedQuestions.

export const APPLICATION_CONTENT = {
  agriculture: {
    domainName: "agriculture",
    intro:
      "EO crop maps and yield estimates feed insurance payouts, subsidies, and food-security early warning. When they are wrong, the error turns directly into money that does or does not reach farmers.",
    whatGoesWrong: [
      {
        title: "Small, mixed fields",
        text: "Smallholder plots are often smaller than a few pixels and intercropped, while the parcels that dominate many training sets are large and uniform.",
      },
      {
        title: "Different crop calendars",
        text: "Monsoon (kharif) and winter (rabi) seasons follow phenology that models trained elsewhere may never have seen.",
      },
      {
        title: "Clouds in the growing season",
        text: "Monsoon cloud cover blocks optical imagery during the very weeks the crop develops.",
      },
      {
        title: "Scarce local labels",
        text: "Ground truth is concentrated in commercial or well-surveyed areas, so errors elsewhere go unnoticed.",
      },
    ],
    goDeeper: [
      {
        question: "fairness",
        description: "Why models trained in one region fail in another, and a checklist for catching it.",
      },
      {
        question: "uncertainty-robustness",
        description: "What to do when clouds, sensor gaps, or shifting conditions degrade inputs.",
      },
    ],
    relatedQuestions: ["fairness", "uncertainty-robustness", "training-data", "evaluation"],
  },

  hazards: {
    intro:
      "Flood, landslide, and wildfire products drive alerts, evacuations, and response deployment, often under time pressure.",
    relatedQuestions: ["uncertainty-robustness", "transparency-accountability", "fairness"],
  },

  "urban-health": {
    intro:
      "Heat, settlement, and health-risk maps steer city services and public health interventions at neighbourhood scale.",
    relatedQuestions: ["fairness", "privacy", "training-data"],
  },

  forests: {
    domainName: "forests",
    intro:
      "Tree-level maps from LiDAR point clouds and imagery feed forest inventories, biomass, and carbon estimates. They are produced site by site, so how a model is trained for each new forest matters.",
    whatGoesWrong: [
      {
        title: "Dense, overlapping canopies",
        text: "Interlocking crowns and hidden stems make individual trees hard to separate, so trees are merged or missed and counts and biomass are biased.",
      },
      {
        title: "Every site is different",
        text: "Sensor (terrestrial, drone, or airborne LiDAR), point density, forest type, and species mix change from site to site, and a model trained on one forest transfers poorly to the next.",
      },
      {
        title: "3D labels are costly",
        text: "Annotating point clouds tree by tree takes hours per plot, so labelled data covers few sites and species.",
      },
      {
        title: "Retraining for every site",
        text: "Each new site or task triggers another training run from scratch, and the GPU time, energy, and emissions add up with every deployment.",
      },
    ],
    goDeeper: [
      {
        question: "green-ai",
        description: "How to reach the same accuracy with less energy by fine-tuning a pretrained model, and how to report it.",
      },
      {
        question: "training-data",
        description: "Which sites, sensors, and species the labelled data actually represents.",
      },
    ],
    relatedQuestions: ["green-ai", "training-data", "genai", "uncertainty-robustness"],
  },

  climate: {
    intro:
      "Climate-risk layers and scenario maps shape adaptation budgets and long-term planning.",
    relatedQuestions: ["transparency-accountability", "uncertainty-robustness"],
  },

  "security-infrastructure": {
    intro:
      "Infrastructure inventories and activity monitoring touch on public safety and the exposure of sensitive sites and people.",
    relatedQuestions: ["privacy", "transparency-accountability"],
  },
};
