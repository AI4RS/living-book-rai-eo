import { useMemo, useState } from "react";
import {
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Cpu,
  Info,
  Scale,
  ShieldAlert,
} from "lucide-react";

const RESOLUTION_OPTIONS = ["30m", "10m", "0.3m"];
const LABEL_OPTIONS = ["Biased", "Representative"];
const TAB_ITEMS = [
  { id: "fairness", label: "Fairness" },
  { id: "privacy", label: "Privacy" },
  { id: "transparency", label: "Transparency" },
  { id: "accountability", label: "Accountability" },
  { id: "robustness", label: "Robustness & Safety" },
  { id: "simulator", label: "Integrated Simulator" },
];

const FAIRNESS_REGION_META = {
  eu: {
    label: "EU",
    category: "Global North",
    map: { x: 160, y: 65, width: 125, height: 62 },
  },
  india: {
    label: "India",
    category: "Global South",
    map: { x: 320, y: 140, width: 90, height: 78 },
  },
  seAsia: {
    label: "SE Asia",
    category: "Global South",
    map: { x: 428, y: 162, width: 90, height: 72 },
  },
  africa: {
    label: "Africa",
    category: "Global South",
    map: { x: 248, y: 175, width: 108, height: 102 },
  },
  latAm: {
    label: "LatAm",
    category: "Global South",
    map: { x: 72, y: 185, width: 100, height: 95 },
  },
};

const FAIRNESS_PRESETS = {
  globalNorthOnly: {
    label: "Global North only",
    regions: { eu: true, india: false, seAsia: false, africa: false, latAm: false },
    note: "Strong bias risk: model learns from EU patterns and struggles on Indian farms.",
  },
  balancedGlobal: {
    label: "Balanced global",
    regions: { eu: true, india: true, seAsia: true, africa: true, latAm: true },
    note: "Best fairness baseline: broad climatic and cropping diversity in training.",
  },
  monsoonAware: {
    label: "Monsoon-aware",
    regions: { eu: true, india: true, seAsia: true, africa: false, latAm: false },
    note: "Good India transfer: monsoon and tropical signatures are partially covered.",
  },
};

const RESPONSIBILITY_CONTENT = {
  fairness: {
    title: "Fairness in Impact Distribution",
    summary:
      "EO systems must provide comparable utility across regions, livelihoods, and infrastructure maturity levels.",
    decisions: [
      "Coverage parity check between urban, peri-urban, and remote areas",
      "Error budget targets by vulnerability segment",
      "Human override workflow for low-confidence predictions",
    ],
    cases: [
      {
        name: "Heatwave support allocation",
        context:
          "A municipal heat-risk model favors dense downtown blocks due to more historical sensor data.",
        risk:
          "Peripheral low-income neighborhoods receive fewer cooling resources despite higher vulnerability.",
        move:
          "Reweight training by demographic and climate exposure strata before dispatch planning.",
      },
      {
        name: "Crop insurance payout model",
        context:
          "Satellite crop-loss estimates underperform in mixed-cropping smallholder zones.",
        risk:
          "Farmers in underrepresented geographies are systematically undercompensated.",
        move:
          "Set subgroup calibration thresholds and require local agronomy validation before payout automation.",
      },
      {
        name: "Flood warning dissemination",
        context:
          "Multilingual communities receive delayed alerts because model confidence translation is manual.",
        risk:
          "Language access becomes a hidden fairness bottleneck in emergency response.",
        move:
          "Bind alert release to synchronized multilingual templates and regional escalation owners.",
      },
    ],
  },
  privacy: {
    title: "Privacy and Sensitive Location Protection",
    summary:
      "High-resolution EO insight should not expose individuals, private routines, or critical assets to harm.",
    decisions: [
      "Minimum publishable spatial granularity by use case",
      "Role-based access for sensitive layers and coordinates",
      "Retention windows for raw versus aggregated tiles",
    ],
    cases: [
      {
        name: "Informal settlement health map",
        context:
          "Public cholera-risk overlays are generated with 0.3m building footprints and movement proxies.",
        risk:
          "Household-level targeting could be inferred by actors outside public health teams.",
        move:
          "Release only aggregated risk bands and store identifiable features in a private enclave.",
      },
      {
        name: "Critical infrastructure inventory",
        context:
          "Open dashboard includes exact substation and water-control gate coordinates.",
        risk:
          "Operational security and public safety risks increase with unrestricted map export.",
        move:
          "Introduce coordinate fuzzing, download controls, and just-in-time approval for precise views.",
      },
      {
        name: "Border activity trend reporting",
        context:
          "Analytic snapshots capture recurring travel routes and timing patterns.",
        risk:
          "Temporal signatures may enable re-identification of specific groups.",
        move:
          "Apply temporal coarsening and access audits with differential-privacy style aggregation.",
      },
    ],
  },
  transparency: {
    title: "Transparency and Explainability",
    summary:
      "Decision users need confidence ranges, assumptions, and data lineage to interpret EO outputs responsibly.",
    decisions: [
      "Model card publication scope for each release",
      "Uncertainty communication standards per stakeholder type",
      "Traceability from prediction to source imagery and preprocessing",
    ],
    cases: [
      {
        name: "Landslide susceptibility ranking",
        context:
          "District officials receive rankings without confidence intervals or terrain feature attribution.",
        risk:
          "Over-trust in deterministic scores drives premature relocation decisions.",
        move:
          "Add confidence bands, factor attribution, and known-failure zones to every ranking view.",
      },
      {
        name: "Deforestation enforcement trigger",
        context:
          "Enforcement teams cannot verify whether alerts came from cloudy scenes or stale baselines.",
        risk:
          "Insufficient traceability reduces procedural fairness and legal defensibility.",
        move:
          "Attach scene timestamp, cloud mask score, and baseline version to each alert package.",
      },
      {
        name: "Climate adaptation budget planning",
        context:
          "Finance teams see summary maps but not assumptions about socioeconomic vulnerability weighting.",
        risk:
          "Policy trade-offs are debated without shared understanding of model intent.",
        move:
          "Publish assumption sheets and scenario toggles alongside map outputs.",
      },
    ],
  },
  accountability: {
    title: "Accountability and Governance",
    summary:
      "Clear ownership, escalation paths, and audit trails are essential when EO-driven decisions cause harm.",
    decisions: [
      "RACI definition for model owners and response operators",
      "Incident severity taxonomy tied to rollback authority",
      "Immutable logs for model version, data source, and human approval steps",
    ],
    cases: [
      {
        name: "False evacuation order",
        context:
          "An EO landslide alert cascade triggers evacuation and transport shutdowns.",
        risk:
          "No single accountable owner can reconstruct who approved release thresholds.",
        move:
          "Require sign-off checkpoints and append-only approval logs before high-impact alerts go live.",
      },
      {
        name: "Unauthorized dataset ingestion",
        context:
          "A contractor uploads imagery with restrictive licensing into training storage.",
        risk:
          "Compliance violations propagate into released models and downstream partners.",
        move:
          "Enforce policy gates in data onboarding with legal metadata validation.",
      },
      {
        name: "Model drift left untriaged",
        context:
          "Performance decay alerts are visible but no team owns remediation deadlines.",
        risk:
          "Known inaccuracies persist in mission-critical workflows.",
        move:
          "Route drift alerts to named incident owners with SLA-backed response windows.",
      },
    ],
  },
  robustness: {
    title: "Robustness, Reliability, and Safety",
    summary:
      "EO models should sustain acceptable performance across weather shifts, sensor outages, and degraded inputs.",
    decisions: [
      "Fallback logic when primary sensor feeds are unavailable",
      "Distribution-shift thresholds that trigger safe-mode behavior",
      "Stress-test matrix covering seasonality and atmospheric anomalies",
    ],
    cases: [
      {
        name: "Wildfire smoke optical degradation",
        context:
          "Smoke plumes distort spectral signals and reduce classifier confidence in fire-edge mapping.",
        risk:
          "Response teams receive unstable perimeter estimates during peak urgency.",
        move:
          "Switch to multi-sensor fusion and confidence-gated perimeter smoothing under smoke conditions.",
      },
      {
        name: "Monsoon cloud persistence",
        context:
          "Flood nowcasting misses updates for days when optical coverage is saturated by cloud.",
        risk:
          "Communities lose situational awareness during prolonged extreme weather.",
        move:
          "Trigger SAR-first fallback policy with explicit uncertainty badges.",
      },
      {
        name: "Telemetry pipeline outage",
        context:
          "Ground-station delay causes stale tiles to be scored as current-state observations.",
        risk:
          "Decision-makers act on outdated risk maps without noticing timeliness drift.",
        move:
          "Publish freshness indicators and hard-stop scoring when latency exceeds tolerance.",
      },
    ],
  },
};

const MAP_SCENES = {
  fairness: {
    title: "Coverage parity map",
    subtitle: "Urban/rural service balance",
    routes: [
      { x1: 90, y1: 75, x2: 300, y2: 170, color: "#34d399", duration: "8s" },
      { x1: 300, y1: 170, x2: 520, y2: 95, color: "#f59e0b", duration: "6s" },
      { x1: 140, y1: 250, x2: 430, y2: 230, color: "#22d3ee", duration: "7s" },
    ],
    nodes: [
      { x: 90, y: 75, color: "#34d399", delay: "0s", label: "Urban" },
      { x: 300, y: 170, color: "#22d3ee", delay: "0.8s", label: "Peri-urban" },
      { x: 520, y: 95, color: "#f59e0b", delay: "1.4s", label: "Remote" },
      { x: 140, y: 250, color: "#34d399", delay: "2s", label: "Rural" },
    ],
    hotzones: [
      { x: 510, y: 88, r: 40, color: "rgba(245, 158, 11, 0.25)", delay: "0s" },
      { x: 160, y: 245, r: 34, color: "rgba(16, 185, 129, 0.22)", delay: "1.2s" },
    ],
  },
  privacy: {
    title: "Redaction boundary map",
    subtitle: "Sensitive-area masking",
    routes: [
      { x1: 120, y1: 80, x2: 470, y2: 90, color: "#22d3ee", duration: "6s" },
      { x1: 470, y1: 90, x2: 470, y2: 250, color: "#f43f5e", duration: "4s" },
      { x1: 120, y1: 250, x2: 470, y2: 250, color: "#34d399", duration: "7s" },
    ],
    nodes: [
      { x: 120, y: 80, color: "#22d3ee", delay: "0s", label: "Public layer" },
      { x: 470, y: 90, color: "#f43f5e", delay: "0.9s", label: "Restricted" },
      { x: 470, y: 250, color: "#f43f5e", delay: "1.6s", label: "Critical site" },
      { x: 120, y: 250, color: "#34d399", delay: "2.1s", label: "Aggregate view" },
    ],
    hotzones: [
      { x: 470, y: 170, r: 55, color: "rgba(244, 63, 94, 0.24)", delay: "0.5s" },
      { x: 270, y: 250, r: 36, color: "rgba(16, 185, 129, 0.2)", delay: "1.4s" },
    ],
  },
  transparency: {
    title: "Lineage trace map",
    subtitle: "Input-to-output explainability",
    routes: [
      { x1: 80, y1: 90, x2: 250, y2: 90, color: "#22d3ee", duration: "5s" },
      { x1: 250, y1: 90, x2: 400, y2: 170, color: "#34d399", duration: "7s" },
      { x1: 400, y1: 170, x2: 530, y2: 235, color: "#a78bfa", duration: "6s" },
      { x1: 250, y1: 90, x2: 250, y2: 230, color: "#f59e0b", duration: "8s" },
    ],
    nodes: [
      { x: 80, y: 90, color: "#22d3ee", delay: "0s", label: "Raw scene" },
      { x: 250, y: 90, color: "#f59e0b", delay: "0.7s", label: "Preprocess" },
      { x: 400, y: 170, color: "#34d399", delay: "1.4s", label: "Model output" },
      { x: 530, y: 235, color: "#a78bfa", delay: "2s", label: "Decision card" },
    ],
    hotzones: [
      { x: 250, y: 165, r: 46, color: "rgba(245, 158, 11, 0.2)", delay: "0.3s" },
      { x: 408, y: 168, r: 36, color: "rgba(16, 185, 129, 0.2)", delay: "1.2s" },
    ],
  },
  accountability: {
    title: "Escalation ownership map",
    subtitle: "RACI and incident routing",
    routes: [
      { x1: 90, y1: 160, x2: 240, y2: 85, color: "#22d3ee", duration: "7s" },
      { x1: 240, y1: 85, x2: 390, y2: 160, color: "#34d399", duration: "5s" },
      { x1: 390, y1: 160, x2: 540, y2: 85, color: "#f59e0b", duration: "6s" },
      { x1: 390, y1: 160, x2: 540, y2: 245, color: "#f43f5e", duration: "4s" },
    ],
    nodes: [
      { x: 90, y: 160, color: "#22d3ee", delay: "0s", label: "Detection" },
      { x: 240, y: 85, color: "#34d399", delay: "0.8s", label: "Model owner" },
      { x: 390, y: 160, color: "#a78bfa", delay: "1.5s", label: "Risk board" },
      { x: 540, y: 85, color: "#f59e0b", delay: "2.2s", label: "Operations" },
      { x: 540, y: 245, color: "#f43f5e", delay: "2.8s", label: "Legal/compliance" },
    ],
    hotzones: [
      { x: 390, y: 160, r: 52, color: "rgba(167, 139, 250, 0.22)", delay: "0.5s" },
      { x: 540, y: 245, r: 42, color: "rgba(244, 63, 94, 0.2)", delay: "1.5s" },
    ],
  },
  robustness: {
    title: "Fallback resilience map",
    subtitle: "Sensor-switching under disruption",
    routes: [
      { x1: 95, y1: 90, x2: 280, y2: 90, color: "#22d3ee", duration: "6s" },
      { x1: 95, y1: 230, x2: 280, y2: 230, color: "#a78bfa", duration: "7s" },
      { x1: 280, y1: 90, x2: 470, y2: 160, color: "#34d399", duration: "5s" },
      { x1: 280, y1: 230, x2: 470, y2: 160, color: "#f59e0b", duration: "8s" },
      { x1: 470, y1: 160, x2: 540, y2: 160, color: "#34d399", duration: "4s" },
    ],
    nodes: [
      { x: 95, y: 90, color: "#22d3ee", delay: "0s", label: "Optical feed" },
      { x: 95, y: 230, color: "#a78bfa", delay: "0.7s", label: "SAR feed" },
      { x: 280, y: 90, color: "#f43f5e", delay: "1.4s", label: "Cloud risk" },
      { x: 280, y: 230, color: "#f59e0b", delay: "2s", label: "Fallback trigger" },
      { x: 470, y: 160, color: "#34d399", delay: "2.6s", label: "Fusion model" },
      { x: 540, y: 160, color: "#34d399", delay: "3.2s", label: "Safe output" },
    ],
    hotzones: [
      { x: 280, y: 90, r: 40, color: "rgba(244, 63, 94, 0.2)", delay: "0.2s" },
      { x: 470, y: 160, r: 48, color: "rgba(16, 185, 129, 0.22)", delay: "1.1s" },
    ],
  },
};

const BASE_METRICS = {
  "30m": { privacy: 20, fairness: 58, compute: 25 },
  "10m": { privacy: 52, fairness: 67, compute: 55 },
  "0.3m": { privacy: 88, fairness: 73, compute: 92 },
};

const LABEL_MODIFIERS = {
  Biased: { privacy: 8, fairness: -28, compute: 6 },
  Representative: { privacy: 0, fairness: 14, compute: 10 },
};

const clamp = (n, min = 0, max = 100) => Math.min(max, Math.max(min, n));

const levelFromScore = (score) => {
  if (score < 34) return "Low";
  if (score < 67) return "Moderate";
  return "High";
};

const barColor = (score, reverse = false) => {
  if (!reverse) {
    if (score < 34) return "bg-emerald-500";
    if (score < 67) return "bg-amber-500";
    return "bg-rose-500";
  }

  if (score < 34) return "bg-rose-500";
  if (score < 67) return "bg-amber-500";
  return "bg-emerald-500";
};

const gridCells = Array.from({ length: 48 }, (_, i) => i);

const getGroundTruthValue = (idx) => {
  const row = Math.floor(idx / 8);
  const col = idx % 8;
  const base = (Math.sin((row + 1) * 0.9) + Math.cos((col + 2) * 0.7) + 2) / 4;
  return Math.round(base * 100);
};

function FairnessTrainingLab() {
  const [selectedPreset, setSelectedPreset] = useState("globalNorthOnly");
  const [trainRegions, setTrainRegions] = useState(
    FAIRNESS_PRESETS.globalNorthOnly.regions
  );

  const setPreset = (presetKey) => {
    setSelectedPreset(presetKey);
    setTrainRegions(FAIRNESS_PRESETS[presetKey].regions);
  };

  const toggleRegion = (regionKey) => {
    setSelectedPreset("custom");
    setTrainRegions((prev) => ({ ...prev, [regionKey]: !prev[regionKey] }));
  };

  const fairnessState = useMemo(() => {
    const selectedRegions = Object.entries(trainRegions)
      .filter(([, enabled]) => enabled)
      .map(([key]) => key);

    const globalSouthCount = selectedRegions.filter((region) =>
      ["india", "seAsia", "africa", "latAm"].includes(region)
    ).length;

    const indiaPredictionQuality = clamp(
      24 +
        (trainRegions.eu ? 8 : 0) +
        (trainRegions.india ? 34 : 0) +
        (trainRegions.seAsia ? 17 : 0) +
        (trainRegions.africa ? 10 : 0) +
        (trainRegions.latAm ? 7 : 0)
    );

    const fairnessScore = clamp(
      30 +
        selectedRegions.length * 8 +
        globalSouthCount * 9 +
        (trainRegions.india ? 10 : 0)
    );

    const equityGap = clamp(62 - fairnessScore * 0.58, 6, 60);
    const underpaidSmallholders = clamp(52 - indiaPredictionQuality * 0.42, 7, 58);

    const riskLabel =
      fairnessScore >= 72 ? "Low fairness risk" : fairnessScore >= 50 ? "Moderate fairness risk" : "High fairness risk";

    const riskTone =
      fairnessScore >= 72
        ? "border-emerald-700/40 bg-emerald-900/20 text-emerald-100"
        : fairnessScore >= 50
          ? "border-amber-700/40 bg-amber-900/20 text-amber-100"
          : "border-rose-700/40 bg-rose-900/20 text-rose-100";

    return {
      selectedRegions,
      indiaPredictionQuality,
      fairnessScore,
      equityGap,
      underpaidSmallholders,
      riskLabel,
      riskTone,
    };
  }, [trainRegions]);

  const rasterData = useMemo(() => {
    return gridCells.map((idx) => {
      const truth = getGroundTruthValue(idx);
      const shiftMagnitude = (100 - fairnessState.indiaPredictionQuality) * 0.36;
      const shiftWave =
        Math.sin((idx + 3) * 0.85) * shiftMagnitude +
        Math.cos((Math.floor(idx / 8) + 1) * 0.9) * (shiftMagnitude * 0.45);
      const prediction = clamp(Math.round(truth + shiftWave));
      const error = Math.abs(prediction - truth);

      return { idx, truth, prediction, error };
    });
  }, [fairnessState.indiaPredictionQuality]);

  return (
    <section className="space-y-4">
      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
        <h2 className="text-lg font-semibold text-slate-100">
          Fairness Lab: Crop Insurance Transfer Across Regions
        </h2>
        <p className="mt-2 text-sm text-slate-300">
          Scenario: a payout model trained mostly on EU imagery performs poorly in
          India. Expand training geography to improve transfer performance and
          reduce payout inequity.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-emerald-300">
          Scenario presets
        </h3>
        <div className="mt-3 grid gap-2 md:grid-cols-3">
          {Object.entries(FAIRNESS_PRESETS).map(([key, preset]) => (
            <button
              key={key}
              onClick={() => setPreset(key)}
              className={`rounded-xl border px-3 py-2 text-left text-sm transition ${
                selectedPreset === key
                  ? "border-emerald-500 bg-emerald-600/20 text-emerald-200"
                  : "border-slate-700 bg-slate-800 text-slate-300 hover:border-slate-500"
              }`}
            >
              <p className="font-semibold">{preset.label}</p>
              <p className="mt-1 text-xs text-slate-400">{preset.note}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.15fr,1fr]">
        <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-emerald-300">
            1) Training data coverage
          </h3>
          <p className="mt-2 text-sm text-slate-300">
            Toggle regions used for model training.
          </p>
          <div className="mt-3 grid gap-2 md:grid-cols-2">
            {Object.entries(FAIRNESS_REGION_META).map(([regionKey, region]) => (
              <button
                key={regionKey}
                onClick={() => toggleRegion(regionKey)}
                className={`rounded-lg border px-3 py-2 text-left text-sm transition ${
                  trainRegions[regionKey]
                    ? "border-emerald-500 bg-emerald-600/20 text-emerald-100"
                    : "border-slate-700 bg-slate-800 text-slate-300 hover:border-slate-500"
                }`}
              >
                <p className="font-semibold">{region.label}</p>
                <p className="text-xs text-slate-400">{region.category}</p>
              </button>
            ))}
          </div>
          <div className="mt-4 overflow-hidden rounded-xl border border-slate-800 bg-slate-950 p-3">
            <svg viewBox="0 0 620 320" className="h-56 w-full">
              <rect width="620" height="320" fill="#020617" />
              <g opacity="0.4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <line
                    key={`world-lat-${i}`}
                    x1="0"
                    y1={i * 60}
                    x2="620"
                    y2={i * 60}
                    stroke="#1e293b"
                    strokeWidth="1"
                  />
                ))}
                {Array.from({ length: 8 }).map((_, i) => (
                  <line
                    key={`world-lon-${i}`}
                    x1={i * 85}
                    y1="0"
                    x2={i * 85}
                    y2="320"
                    stroke="#1e293b"
                    strokeWidth="1"
                  />
                ))}
              </g>
              {Object.entries(FAIRNESS_REGION_META).map(([regionKey, region]) => {
                const active = trainRegions[regionKey];
                return (
                  <g key={regionKey}>
                    <rect
                      x={region.map.x}
                      y={region.map.y}
                      width={region.map.width}
                      height={region.map.height}
                      rx="8"
                      fill={active ? "rgba(16,185,129,0.30)" : "rgba(100,116,139,0.24)"}
                      stroke={active ? "#34d399" : "#64748b"}
                      strokeWidth={active ? "2.4" : "1.3"}
                      className={active ? "fairness-region-active" : ""}
                    />
                    <text
                      x={region.map.x + 8}
                      y={region.map.y + 20}
                      fill={active ? "#a7f3d0" : "#cbd5e1"}
                      fontSize="12"
                      fontFamily="ui-sans-serif, system-ui"
                    >
                      {region.label}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </article>

        <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-emerald-300">
            2) India prediction quality
          </h3>
          <p className="mt-2 text-sm text-slate-300">
            Compare model output against a dummy ground-truth raster over India.
          </p>
          <div className="mt-3 grid gap-4 md:grid-cols-2">
            <div>
              <p className="mb-2 text-xs uppercase tracking-wide text-slate-400">
                Ground truth
              </p>
              <div className="grid grid-cols-8 gap-1 rounded-lg border border-slate-800 bg-slate-950 p-2">
                {rasterData.map((cell) => (
                  <div
                    key={`truth-${cell.idx}`}
                    className="fairness-cell"
                    style={{
                      backgroundColor: `hsl(${120 - cell.truth * 0.8} 75% 36%)`,
                    }}
                  />
                ))}
              </div>
            </div>
            <div>
              <p className="mb-2 text-xs uppercase tracking-wide text-slate-400">
                Model prediction
              </p>
              <div className="grid grid-cols-8 gap-1 rounded-lg border border-slate-800 bg-slate-950 p-2">
                {rasterData.map((cell) => (
                  <div
                    key={`pred-${cell.idx}`}
                    className="fairness-cell"
                    style={{
                      backgroundColor: `hsl(${120 - cell.prediction * 0.8} 75% 36%)`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
          <p className="mb-2 mt-4 text-xs uppercase tracking-wide text-slate-400">
            Error heatmap (red = poor generalization)
          </p>
          <div className="grid grid-cols-8 gap-1 rounded-lg border border-slate-800 bg-slate-950 p-2">
            {rasterData.map((cell) => (
              <div
                key={`error-${cell.idx}`}
                className="fairness-cell"
                style={{
                  backgroundColor: `hsl(${25 - cell.error * 0.45} 85% ${34 + cell.error * 0.35}%)`,
                }}
              />
            ))}
          </div>
        </article>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <MetricCard
          icon={Scale}
          title="India Prediction Quality"
          score={fairnessState.indiaPredictionQuality}
          level={levelFromScore(fairnessState.indiaPredictionQuality)}
          reverse
        />
        <MetricCard
          icon={ShieldAlert}
          title="Overall Fairness Score"
          score={fairnessState.fairnessScore}
          level={levelFromScore(fairnessState.fairnessScore)}
          reverse
        />
        <MetricCard
          icon={AlertTriangle}
          title="Estimated Underpaid Smallholders"
          score={fairnessState.underpaidSmallholders}
          level={levelFromScore(fairnessState.underpaidSmallholders)}
        />
      </div>

      <div className={`rounded-xl border p-4 ${fairnessState.riskTone}`}>
        <p className="text-sm">
          <span className="font-semibold">{fairnessState.riskLabel}.</span>{" "}
          Current equity gap between best-performing and worst-performing regions
          is <span className="font-semibold">{fairnessState.equityGap.toFixed(1)} pts</span>.
          Include more Global South coverage to improve payout parity.
        </p>
      </div>
    </section>
  );
}

function MetricCard({ icon: Icon, title, score, level, reverse = false }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 shadow-lg shadow-slate-950/40">
      <div className="mb-3 flex items-center gap-2">
        <Icon className="h-4 w-4 text-emerald-400" />
        <h3 className="text-sm font-semibold text-slate-200">{title}</h3>
      </div>
      <div className="mb-2 flex items-end justify-between">
        <span className="text-2xl font-bold">{score}%</span>
        <span className="text-xs uppercase tracking-wide text-slate-400">
          {level}
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-slate-800">
        <div
          className={`h-full ${barColor(score, reverse)} transition-all duration-300`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}

function DummyMapPanel({ tabKey }) {
  const scene = MAP_SCENES[tabKey];

  return (
    <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-emerald-300">
        {scene.title}
      </h3>
      <p className="mb-3 mt-1 text-xs text-slate-400">{scene.subtitle}</p>
      <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-950">
        <svg viewBox="0 0 620 320" className="h-60 w-full">
          <defs>
            <linearGradient id="map-bg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#020617" />
            </linearGradient>
          </defs>
          <rect x="0" y="0" width="620" height="320" fill="url(#map-bg)" />
          {Array.from({ length: 8 }).map((_, i) => (
            <line
              key={`grid-v-${i}`}
              x1={i * 88}
              y1="0"
              x2={i * 88}
              y2="320"
              stroke="rgba(148,163,184,0.12)"
              strokeWidth="1"
            />
          ))}
          {Array.from({ length: 5 }).map((_, i) => (
            <line
              key={`grid-h-${i}`}
              x1="0"
              y1={i * 70}
              x2="620"
              y2={i * 70}
              stroke="rgba(148,163,184,0.12)"
              strokeWidth="1"
            />
          ))}
          {scene.hotzones.map((zone, index) => (
            <circle
              key={`zone-${index}`}
              cx={zone.x}
              cy={zone.y}
              r={zone.r}
              fill={zone.color}
              className="map-heat"
              style={{ animationDelay: zone.delay }}
            />
          ))}
          {scene.routes.map((route, index) => (
            <line
              key={`route-${index}`}
              x1={route.x1}
              y1={route.y1}
              x2={route.x2}
              y2={route.y2}
              stroke={route.color}
              strokeWidth="2.5"
              className="map-track"
              style={{ animationDuration: route.duration }}
            />
          ))}
          {scene.nodes.map((node) => (
            <g key={node.label}>
              <circle
                cx={node.x}
                cy={node.y}
                r="6"
                fill={node.color}
                className="map-node"
                style={{ animationDelay: node.delay }}
              />
              <text
                x={node.x + 10}
                y={node.y - 10}
                fill="#cbd5e1"
                fontSize="11"
                fontFamily="ui-sans-serif, system-ui"
              >
                {node.label}
              </text>
            </g>
          ))}
          <rect x="-200" y="0" width="160" height="320" className="map-scanline" />
        </svg>
      </div>
      <p className="mt-2 text-xs text-slate-500">
        Dummy animated map placeholder for discussion and future real EO layer
        integration.
      </p>
    </article>
  );
}

function AspectTab({ tabKey }) {
  const content = RESPONSIBILITY_CONTENT[tabKey];

  return (
    <section className="space-y-4">
      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
        <h2 className="text-lg font-semibold text-slate-100">{content.title}</h2>
        <p className="mt-2 text-sm text-slate-300">{content.summary}</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.15fr,1fr]">
        <DummyMapPanel tabKey={tabKey} />
        <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-emerald-300">
            Key design decisions
          </h3>
          <ul className="mt-3 space-y-3 text-sm text-slate-300">
            {content.decisions.map((item) => (
              <li
                key={item}
                className="rounded-lg border border-slate-700 bg-slate-800/60 px-3 py-2"
              >
                {item}
              </li>
            ))}
          </ul>
        </article>
      </div>

      <div className="grid gap-4 xl:grid-cols-3 md:grid-cols-2">
        {content.cases.map((item) => (
          <article
            key={item.name}
            className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5"
          >
            <h3 className="text-sm font-semibold uppercase tracking-wide text-emerald-300">
              {item.name}
            </h3>
            <p className="mt-3 text-sm text-slate-300">{item.context}</p>
            <p className="mt-3 rounded-lg border border-rose-700/40 bg-rose-900/20 p-3 text-sm text-rose-100">
              <span className="font-semibold">Risk:</span> {item.risk}
            </p>
            <p className="mt-3 rounded-lg border border-emerald-700/40 bg-emerald-900/20 p-3 text-sm text-emerald-100">
              <span className="font-semibold">Responsible move:</span>{" "}
              {item.move}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

function IntegratedSimulatorTab() {
  const [resolution, setResolution] = useState("10m");
  const [labelDistribution, setLabelDistribution] = useState("Representative");
  const [showInfo, setShowInfo] = useState(true);

  const metrics = useMemo(() => {
    const base = BASE_METRICS[resolution];
    const modifier = LABEL_MODIFIERS[labelDistribution];
    const privacy = clamp(base.privacy + modifier.privacy);
    const fairness = clamp(base.fairness + modifier.fairness);
    const compute = clamp(base.compute + modifier.compute);

    return {
      privacy,
      fairness,
      compute,
      privacyLevel: levelFromScore(privacy),
      fairnessLevel: levelFromScore(fairness),
      computeLevel: levelFromScore(compute),
    };
  }, [resolution, labelDistribution]);

  const alerts = useMemo(() => {
    const out = [];

    if (resolution === "0.3m" && metrics.privacy >= 80) {
      out.push({
        tone: "danger",
        text: "Very high spatial detail can expose sensitive locations. Use minimization, masking, and strict access controls.",
      });
    }

    if (labelDistribution === "Biased" && metrics.fairness < 50) {
      out.push({
        tone: "warning",
        text: "Biased labels reduce equity outcomes. Expand annotation coverage across geographies, seasons, and demographics.",
      });
    }

    if (metrics.compute >= 80) {
      out.push({
        tone: "warning",
        text: "Compute overhead is high. Consider model distillation, tiling strategy optimization, and greener inference scheduling.",
      });
    }

    if (out.length === 0) {
      out.push({
        tone: "success",
        text: "Current setup is comparatively balanced. Continue monitoring fairness drift and privacy risk during deployment.",
      });
    }

    return out;
  }, [resolution, labelDistribution, metrics]);

  return (
    <section>
      <section className="mb-6 rounded-2xl border border-emerald-700/30 bg-emerald-900/20 p-4">
        <button
          onClick={() => setShowInfo((v) => !v)}
          className="flex w-full items-center justify-between text-left"
        >
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-300">
            <Info className="h-4 w-4" />
            Why this simulator matters
          </span>
          {showInfo ? (
            <ChevronUp className="h-4 w-4 text-emerald-300" />
          ) : (
            <ChevronDown className="h-4 w-4 text-emerald-300" />
          )}
        </button>
        {showInfo && (
          <p className="mt-3 text-sm text-emerald-100/90">
            EO systems can improve climate resilience and public services, but
            deployment choices shape ethical impact. Use this tool to reason
            about Responsible AI design decisions before production rollout.
          </p>
        )}
      </section>

      <section className="mb-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-300">
            Spatial Resolution
          </h2>
          <div className="grid grid-cols-3 gap-2">
            {RESOLUTION_OPTIONS.map((option) => (
              <button
                key={option}
                onClick={() => setResolution(option)}
                className={`rounded-xl border px-3 py-2 text-sm font-medium transition ${
                  resolution === option
                    ? "border-emerald-500 bg-emerald-600/20 text-emerald-200"
                    : "border-slate-700 bg-slate-800 text-slate-300 hover:border-slate-500"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-300">
            Training Label Distribution
          </h2>
          <div className="grid grid-cols-2 gap-2">
            {LABEL_OPTIONS.map((option) => (
              <button
                key={option}
                onClick={() => setLabelDistribution(option)}
                className={`rounded-xl border px-3 py-2 text-sm font-medium transition ${
                  labelDistribution === option
                    ? "border-emerald-500 bg-emerald-600/20 text-emerald-200"
                    : "border-slate-700 bg-slate-800 text-slate-300 hover:border-slate-500"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mb-6 grid gap-4 md:grid-cols-3">
        <MetricCard
          icon={ShieldAlert}
          title="Privacy Risk Level"
          score={metrics.privacy}
          level={metrics.privacyLevel}
        />
        <MetricCard
          icon={Scale}
          title="Model Fairness & Equity"
          score={metrics.fairness}
          level={metrics.fairnessLevel}
          reverse
        />
        <MetricCard
          icon={Cpu}
          title="Compute Overhead"
          score={metrics.compute}
          level={metrics.computeLevel}
        />
      </section>

      <section className="space-y-3">
        {alerts.map((alert, idx) => {
          const tones = {
            danger: "border-rose-700/40 bg-rose-900/30 text-rose-100",
            warning: "border-amber-700/40 bg-amber-900/30 text-amber-100",
            success: "border-emerald-700/40 bg-emerald-900/30 text-emerald-100",
          };

          return (
            <div
              key={`${alert.tone}-${idx}`}
              className={`rounded-xl border p-4 ${tones[alert.tone]}`}
            >
              <p className="flex items-start gap-2 text-sm">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{alert.text}</span>
              </p>
            </div>
          );
        })}
      </section>
    </section>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState("fairness");

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-slate-100 md:text-3xl">
            Responsible AI in Earth Observation Living Book
          </h1>
          <p className="mt-2 text-sm text-slate-400 md:text-base">
            Explore five responsibility aspects through realistic EO cases and
            animated map placeholders, then test trade-offs in the simulator.
          </p>
        </header>

        <nav className="mb-6">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {TAB_ITEMS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`whitespace-nowrap rounded-xl border px-4 py-2 text-sm font-medium transition ${
                  activeTab === tab.id
                    ? "border-emerald-500 bg-emerald-600/20 text-emerald-200"
                    : "border-slate-700 bg-slate-800 text-slate-300 hover:border-slate-500"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </nav>

        {activeTab === "simulator" ? (
          <IntegratedSimulatorTab />
        ) : activeTab === "fairness" ? (
          <FairnessTrainingLab />
        ) : (
          <AspectTab tabKey={activeTab} />
        )}
      </div>
    </main>
  );
}
