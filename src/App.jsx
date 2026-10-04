import { useState } from "react";
import DummyMapPanel from "./components/DummyMapPanel";
import FairnessTrainingLab from "./labs/FairnessTrainingLab";
import IntegratedSimulatorTab from "./labs/IntegratedSimulatorTab";

const TAB_ITEMS = [
  { id: "fairness", label: "Fairness" },
  { id: "privacy", label: "Privacy" },
  { id: "transparency", label: "Transparency" },
  { id: "accountability", label: "Accountability" },
  { id: "robustness", label: "Robustness & Safety" },
  { id: "simulator", label: "Integrated Simulator" },
];


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

function AspectTab({ tabKey }) {
  const content = RESPONSIBILITY_CONTENT[tabKey];

  return (
    <section className="space-y-4">
      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
        <h2 className="text-lg font-semibold text-slate-100">{content.title}</h2>
        <p className="mt-2 text-sm text-slate-300">{content.summary}</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.15fr,1fr]">
        <DummyMapPanel sceneKey={tabKey} />
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
