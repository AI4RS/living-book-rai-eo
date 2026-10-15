// Per-question copy. Question pages own the general guidance (concept, failure
// modes, best practices, recommendations), each stated once. Application pages
// link here instead of re-explaining.
//
// Built entries (status "built" in config/navigation.js) need: framing, summary,
// whyItMatters, failureModes, bestPractices, checklist, relatedQuestions.
// Draft entries carry the summary and design decisions from the original
// principle tabs so no content is lost while the chapter is written.

export const QUESTION_CONTENT = {
  fairness: {
    framing: "Does the model work equally well for everyone, everywhere?",
    summary:
      "EO systems must provide comparable utility across regions, livelihoods, and infrastructure maturity levels.",
    whyItMatters: [
      "EO models are usually trained where labelled data already exists and then applied far beyond it. A model that is accurate on average can still fail for the regions and groups it was never shown.",
      "Performance shifts with geography, climate, season, field and settlement structure, and sensor conditions. These differences often line up with existing inequality.",
      "EO outputs increasingly drive allocation: insurance payouts, relief, cooling resources, enforcement. An unequal error rate becomes an unequal distribution of money and protection.",
    ],
    failureModes: [
      {
        title: "Geographic training bias",
        text: "Training data concentrated in a few well-mapped regions; the model transfers poorly to different landscapes and practices.",
      },
      {
        title: "Averages hide gaps",
        text: "A strong overall accuracy masks much weaker performance for specific regions, seasons, or vulnerable segments.",
      },
      {
        title: "Data density follows privilege",
        text: "Areas with more historical sensors and records get better predictions, and therefore more resources.",
      },
      {
        title: "Unequal delivery",
        text: "Even a fair model fails people if outputs reach them late or in a form they cannot use, for example alerts in one language only.",
      },
      {
        title: "Automation without override",
        text: "Low-confidence predictions for underrepresented groups are acted on automatically, with no human check.",
      },
    ],
    bestPractices: [
      "Run a coverage parity check between urban, peri-urban, and remote areas, and between the regions the model will serve.",
      "Expand or reweight training data across geographies, seasons, and demographic and climate exposure strata.",
      "Report metrics per subgroup and set error budget targets by vulnerability segment, not only an overall score.",
      "Calibrate thresholds per subgroup and require local validation before automating high-stakes decisions.",
      "Provide a human override workflow for low-confidence predictions.",
    ],
    checklist: [
      "Training data coverage is mapped against every deployment region, and gaps are documented.",
      "Performance is reported per region and per vulnerable segment, not only overall.",
      "Error budgets per segment were agreed before release.",
      "Results were validated locally in each region where the model drives decisions.",
      "Low-confidence predictions are routed to human review.",
      "Delivery of outputs (language, timing, access) was checked for the affected groups.",
      "Fairness is monitored after deployment, not only at release.",
    ],
    relatedQuestions: ["training-data", "evaluation"],
  },

  "training-data": {
    framing: "Whose land, seasons, and labels does the training data actually represent?",
    summary:
      "Where training data comes from, how it was labelled, and under which licence it may be used shape everything downstream.",
    decisions: [
      "Expand annotation coverage across geographies, seasons, and demographics",
      "Policy gates in data onboarding with legal metadata validation",
    ],
    relatedQuestions: ["fairness", "evaluation"],
  },

  evaluation: {
    framing: "Does a good overall score hide where the model fails?",
    summary:
      "Accuracy alone is not enough: evaluation must show who and where the model fails, and keep checking after deployment.",
    decisions: [
      "Error budget targets by vulnerability segment",
      "Subgroup calibration thresholds before automation",
      "Named owners and response windows for drift alerts",
    ],
    relatedQuestions: ["fairness", "uncertainty-robustness"],
  },

  "uncertainty-robustness": {
    framing: "What happens when conditions change, data goes missing, or the model is unsure?",
    summary:
      "EO models should sustain acceptable performance across weather shifts, sensor outages, and degraded inputs.",
    decisions: [
      "Fallback logic when primary sensor feeds are unavailable",
      "Distribution-shift thresholds that trigger safe-mode behavior",
      "Stress-test matrix covering seasonality and atmospheric anomalies",
    ],
    scenes: ["robustness"],
    relatedQuestions: ["evaluation", "transparency-accountability"],
  },

  "transparency-accountability": {
    framing: "Can users see how an output was produced, and who answers for it when it goes wrong?",
    summary:
      "Decision users need confidence ranges, assumptions, and data lineage to interpret EO outputs responsibly. Clear ownership, escalation paths, and audit trails are essential when EO-driven decisions cause harm.",
    decisions: [
      "Model card publication scope for each release",
      "Uncertainty communication standards per stakeholder type",
      "Traceability from prediction to source imagery and preprocessing",
      "RACI definition for model owners and response operators",
      "Incident severity taxonomy tied to rollback authority",
      "Immutable logs for model version, data source, and human approval steps",
    ],
    scenes: ["transparency", "accountability"],
    relatedQuestions: ["uncertainty-robustness", "privacy"],
  },

  privacy: {
    framing: "Could the output expose people, routines, or sensitive sites?",
    summary:
      "High-resolution EO insight should not expose individuals, private routines, or critical assets to harm.",
    decisions: [
      "Minimum publishable spatial granularity by use case",
      "Role-based access for sensitive layers and coordinates",
      "Retention windows for raw versus aggregated tiles",
    ],
    scenes: ["privacy"],
    relatedQuestions: ["transparency-accountability"],
  },

  "green-ai": {
    framing: "What does the model cost in energy and emissions, and can we get the same result with less?",
    contributor: "aldino-rizaldy",
    summary:
      "I found that many deep learning models, especially large ones, consume a lot of energy and can waste it. Every training run uses electricity and emits CO₂. Responsible EO reports that cost next to accuracy and avoids paying it twice when a pretrained model already does the job.",
    whyItMatters: [
      "EO models are retrained often: for every new site, sensor, season, and task. Each run uses GPU hours and electricity and emits CO₂, and the total grows with every deployment.",
      "Large image archives and 3D point clouds make training heavy. When accuracy is the only number reported, the cost of a result stays invisible and methods cannot be compared on it.",
      "Pretrained and foundation models change the trade-off. The large pretraining cost is paid once, while each downstream user fine-tunes many times, for every new site and task, at a lower cost per run.",
    ],
    failureModes: [
      {
        title: "Retraining from scratch by default",
        text: "Every new site starts from random weights, even when a suitable pretrained model already exists.",
      },
      {
        title: "Energy is never measured",
        text: "Projects and papers report accuracy only, so nobody knows what a result cost or whether a cheaper route existed.",
      },
      {
        title: "Training past the target",
        text: "Runs continue for a fixed epoch budget long after the needed accuracy has been reached.",
      },
      {
        title: "Unequal comparisons",
        text: "Energy is compared between runs that reached different accuracy, so a saving cannot be separated from a worse model.",
      },
      {
        title: "Oversized for the task",
        text: "A large model is trained or run where a smaller or partly frozen one reaches the accuracy the application needs.",
      },
    ],
    bestPractices: [
      "Start from a pretrained or foundation model and fine-tune it. Train from scratch only when no suitable model exists.",
      "Set the target accuracy first, for example the best accuracy of a from-scratch model, and stop training as soon as it is reached.",
      "Measure time, energy, and estimated CO₂ for every run with a tool such as CodeCarbon, and state the hardware.",
      "Report energy and emissions next to accuracy, and compare methods at equal accuracy.",
      "Share pretrained weights and code so the one-off pretraining cost is reused rather than repeated.",
    ],
    checklist: [
      "A pretrained or foundation model was considered before training from scratch.",
      "The target accuracy and stopping rule were set before training.",
      "Time, energy, and estimated emissions were measured for each run, with the hardware stated.",
      "Energy and emissions are reported next to accuracy.",
      "Comparisons between methods are made at equal accuracy.",
      "Pretrained weights and code are shared for reuse.",
    ],
    relatedQuestions: ["genai", "training-data"],
  },

  genai: {
    framing: "What changes when the model is a large pretrained foundation model, or generates content?",
    summary: "Placeholder. This chapter has not been written yet.",
    guidingQuestions: [
      "Which regions, sensors, and seasons were foundation models pretrained on, and which are missing?",
      "How do we evaluate one general-purpose model across many downstream EO tasks and regions?",
      "How should generated or synthetic imagery be labelled so it is never mistaken for an observation?",
      "Who is accountable when a fine-tuned foundation model fails downstream: the provider or the adapter?",
    ],
    relatedQuestions: ["training-data", "evaluation", "green-ai"],
  },
};
