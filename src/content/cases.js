// Single case store. Application pages and question pages are both views over
// this list: filter by `application` or by membership in `questions`.
//
// Schema: { id, title, application, questions: [], principles: [], context, risk, move }
// - application: an application sub-tab id from config/navigation.js, or null
//   for cross-cutting operational cases that only appear on question pages.
// - questions: lifecycle question sub-tab ids the case touches.
// - principles: the original five RAI principles the case was filed under.
// - evidence (optional): measured numbers from a published source, shown as a
//   small table on the card. Only real, cited values go here:
//   { setting, columns: [baseline, improved], rows: [{ label, values: [a, b], change }],
//     notes: [], source: { label, href } }

export const CASES = [
  // Agriculture & food security
  {
    id: "crop-insurance-payout",
    title: "Crop insurance payout model",
    application: "agriculture",
    questions: ["fairness", "evaluation"],
    principles: ["fairness"],
    context:
      "Satellite crop-loss estimates underperform in mixed-cropping smallholder zones.",
    risk: "Farmers in underrepresented geographies are systematically undercompensated.",
    move: "Set subgroup calibration thresholds and require local agronomy validation before payout automation.",
  },
  {
    id: "monsoon-cloud-persistence",
    title: "Monsoon cloud persistence",
    application: "agriculture",
    questions: ["uncertainty-robustness"],
    principles: ["robustness"],
    context:
      "Flood nowcasting misses updates for days when optical coverage is saturated by cloud.",
    risk: "Communities lose situational awareness during prolonged extreme weather.",
    move: "Trigger SAR-first fallback policy with explicit uncertainty badges.",
  },

  // Hazards & disaster response
  {
    id: "flood-warning-dissemination",
    title: "Flood warning dissemination",
    application: "hazards",
    questions: ["fairness", "transparency-accountability"],
    principles: ["fairness"],
    context:
      "Multilingual communities receive delayed alerts because model confidence translation is manual.",
    risk: "Language access becomes a hidden fairness bottleneck in emergency response.",
    move: "Bind alert release to synchronized multilingual templates and regional escalation owners.",
  },
  {
    id: "landslide-susceptibility-ranking",
    title: "Landslide susceptibility ranking",
    application: "hazards",
    questions: ["transparency-accountability", "uncertainty-robustness"],
    principles: ["transparency"],
    context:
      "District officials receive rankings without confidence intervals or terrain feature attribution.",
    risk: "Over-trust in deterministic scores drives premature relocation decisions.",
    move: "Add confidence bands, factor attribution, and known-failure zones to every ranking view.",
  },
  {
    id: "false-evacuation-order",
    title: "False evacuation order",
    application: "hazards",
    questions: ["transparency-accountability"],
    principles: ["accountability"],
    context: "An EO landslide alert cascade triggers evacuation and transport shutdowns.",
    risk: "No single accountable owner can reconstruct who approved release thresholds.",
    move: "Require sign-off checkpoints and append-only approval logs before high-impact alerts go live.",
  },
  {
    id: "wildfire-smoke-degradation",
    title: "Wildfire smoke optical degradation",
    application: "hazards",
    questions: ["uncertainty-robustness"],
    principles: ["robustness"],
    context:
      "Smoke plumes distort spectral signals and reduce classifier confidence in fire-edge mapping.",
    risk: "Response teams receive unstable perimeter estimates during peak urgency.",
    move: "Switch to multi-sensor fusion and confidence-gated perimeter smoothing under smoke conditions.",
  },

  // Urban & public health
  {
    id: "heatwave-support-allocation",
    title: "Heatwave support allocation",
    application: "urban-health",
    questions: ["fairness", "training-data"],
    principles: ["fairness"],
    context:
      "A municipal heat-risk model favors dense downtown blocks due to more historical sensor data.",
    risk: "Peripheral low-income neighborhoods receive fewer cooling resources despite higher vulnerability.",
    move: "Reweight training by demographic and climate exposure strata before dispatch planning.",
  },
  {
    id: "informal-settlement-health-map",
    title: "Informal settlement health map",
    application: "urban-health",
    questions: ["privacy"],
    principles: ["privacy"],
    context:
      "Public cholera-risk overlays are generated with 0.3m building footprints and movement proxies.",
    risk: "Household-level targeting could be inferred by actors outside public health teams.",
    move: "Release only aggregated risk bands and store identifiable features in a private enclave.",
  },

  // Forests
  {
    id: "deforestation-enforcement-trigger",
    title: "Deforestation enforcement trigger",
    application: "forests",
    questions: ["transparency-accountability"],
    principles: ["transparency"],
    context:
      "Enforcement teams cannot verify whether alerts came from cloudy scenes or stale baselines.",
    risk: "Insufficient traceability reduces procedural fairness and legal defensibility.",
    move: "Attach scene timestamp, cloud mask score, and baseline version to each alert package.",
  },
  {
    id: "pretrained-tree-mapping",
    title: "Pretrained model for 3D tree mapping",
    application: "forests",
    questions: ["green-ai", "genai", "training-data"],
    principles: [],
    context:
      "Individual trees are mapped from drone LiDAR point clouds to feed forest inventories. The usual approach trains a new deep model from scratch for each site.",
    risk: "Training from scratch for every site repeats the full energy and emissions cost and needs dense labels. With 0.01% of points labelled, the scratch model failed completely (mAP 0).",
    move: "Fine-tune a backbone pretrained with self-supervision on unlabelled LiDAR, and measure and report energy and estimated CO₂ for every run.",
    evidence: {
      setting:
        "Tree instance segmentation, SCION site (FOR-instance), one node with 4× NVIDIA A100, measured with CodeCarbon.",
      columns: ["From scratch", "Pretrained + fine-tune"],
      rows: [
        { label: "Training time", values: ["44.51 min", "35.56 min"], change: "−20%" },
        { label: "Energy", values: ["0.5813 kWh", "0.4605 kWh"], change: "−21%" },
        { label: "Est. emissions", values: ["0.2215 kg CO₂", "0.1754 kg CO₂"], change: "−21%" },
        {
          label: "mAP, 1% of labels",
          values: ["45.56", "76.77"],
          change: "matches 76.72 with all labels",
        },
      ],
      notes: [
        "The paper reports that both energy runs reached similar accuracy, but gives no accuracy figures for them.",
        "The mAP row comes from a separate label-reduction experiment on the same site.",
        "Not counted: the one-off self-supervised pretraining (1200 epochs on about 2.3 billion unlabelled LiDAR points), whose energy the paper does not report. The saving pays off when the pretrained model is reused.",
      ],
      source: {
        label: "Rizaldy et al. (2026), Remote Sensing of Environment 345, 115564",
        href: "https://doi.org/10.1016/j.rse.2026.115564",
      },
    },
  },

  // Climate
  {
    id: "climate-adaptation-budget",
    title: "Climate adaptation budget planning",
    application: "climate",
    questions: ["transparency-accountability"],
    principles: ["transparency"],
    context:
      "Finance teams see summary maps but not assumptions about socioeconomic vulnerability weighting.",
    risk: "Policy trade-offs are debated without shared understanding of model intent.",
    move: "Publish assumption sheets and scenario toggles alongside map outputs.",
  },

  // Security & critical infrastructure
  {
    id: "critical-infrastructure-inventory",
    title: "Critical infrastructure inventory",
    application: "security-infrastructure",
    questions: ["privacy"],
    principles: ["privacy"],
    context: "Open dashboard includes exact substation and water-control gate coordinates.",
    risk: "Operational security and public safety risks increase with unrestricted map export.",
    move: "Introduce coordinate fuzzing, download controls, and just-in-time approval for precise views.",
  },
  {
    id: "border-activity-reporting",
    title: "Border activity trend reporting",
    application: "security-infrastructure",
    questions: ["privacy"],
    principles: ["privacy"],
    context: "Analytic snapshots capture recurring travel routes and timing patterns.",
    risk: "Temporal signatures may enable re-identification of specific groups.",
    move: "Apply temporal coarsening and access audits with differential-privacy style aggregation.",
  },

  // Cross-cutting operational cases (question pages only)
  {
    id: "unauthorized-dataset-ingestion",
    title: "Unauthorized dataset ingestion",
    application: null,
    questions: ["training-data", "transparency-accountability"],
    principles: ["accountability"],
    context: "A contractor uploads imagery with restrictive licensing into training storage.",
    risk: "Compliance violations propagate into released models and downstream partners.",
    move: "Enforce policy gates in data onboarding with legal metadata validation.",
  },
  {
    id: "model-drift-untriaged",
    title: "Model drift left untriaged",
    application: null,
    questions: ["evaluation", "transparency-accountability"],
    principles: ["accountability"],
    context: "Performance decay alerts are visible but no team owns remediation deadlines.",
    risk: "Known inaccuracies persist in mission-critical workflows.",
    move: "Route drift alerts to named incident owners with SLA-backed response windows.",
  },
  {
    id: "telemetry-pipeline-outage",
    title: "Telemetry pipeline outage",
    application: null,
    questions: ["uncertainty-robustness"],
    principles: ["robustness"],
    context: "Ground-station delay causes stale tiles to be scored as current-state observations.",
    risk: "Decision-makers act on outdated risk maps without noticing timeliness drift.",
    move: "Publish freshness indicators and hard-stop scoring when latency exceeds tolerance.",
  },
];

export const casesForApplication = (applicationId) =>
  CASES.filter((c) => c.application === applicationId);

export const casesForQuestion = (questionId) =>
  CASES.filter((c) => c.questions.includes(questionId));
