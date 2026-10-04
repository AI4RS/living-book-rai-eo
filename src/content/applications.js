// Per-application copy. Application pages own domain specifics only: what
// typically goes wrong in that domain plus concrete cases. They link to
// question pages for the general guidance and must not restate it.

export const APPLICATION_CONTENT = {
  agriculture: {
    intro:
      "EO crop maps and yield estimates feed insurance payouts, subsidies, and food-security early warning. When they are wrong, the error turns directly into money that does or does not reach farmers.",
    runningExample: {
      title: "Crop mapping across regions",
      text: "A crop-type model trained on EU parcels is applied to smallholder farms in India. The two settings differ in almost every way the model relies on, so its accuracy drops exactly where farmers are most exposed.",
    },
    whatGoesWrong: [
      {
        title: "Small, mixed fields",
        text: "Smallholder plots are often smaller than a few pixels and intercropped, while EU training parcels are large and uniform.",
      },
      {
        title: "Different crop calendars",
        text: "Monsoon (kharif) and winter (rabi) seasons follow phenology the EU-trained model has never seen.",
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

  "forests-climate": {
    intro:
      "Deforestation alerts and climate-risk layers trigger enforcement and shape adaptation budgets.",
    relatedQuestions: ["transparency-accountability", "uncertainty-robustness"],
  },

  "security-infrastructure": {
    intro:
      "Infrastructure inventories and activity monitoring touch on public safety and the exposure of sensitive sites and people.",
    relatedQuestions: ["privacy", "transparency-accountability"],
  },
};
