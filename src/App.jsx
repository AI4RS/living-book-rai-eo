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

const PLACEHOLDER_CASES = {
  fairness: {
    title: "Fairness",
    summary:
      "Placeholder EO use cases focused on equitable outcomes across regions and populations.",
    examples: [
      {
        name: "Disaster aid prioritization",
        scenario:
          "Flood severity model favors urban areas with richer training data and underestimates risk in rural districts.",
        prompt:
          "How should we rebalance data collection and validate parity before allocating aid?",
      },
      {
        name: "Crop advisory coverage",
        scenario:
          "Smallholder farms in cloudy tropical zones get lower-quality recommendations than temperate industrial farms.",
        prompt:
          "Which fairness metrics should gate release for each agro-climatic zone?",
      },
    ],
  },
  privacy: {
    title: "Privacy",
    summary:
      "Placeholder EO use cases about protecting people, property, and sensitive locations.",
    examples: [
      {
        name: "Settlement monitoring",
        scenario:
          "High-resolution imagery might reveal household-level activity patterns around vulnerable communities.",
        prompt:
          "Where should we enforce redaction, aggregation, or geofencing in the pipeline?",
      },
      {
        name: "Critical infrastructure mapping",
        scenario:
          "Open dashboards expose exact coordinates of strategic facilities and access routes.",
        prompt:
          "What access controls and data minimization policies should be mandatory?",
      },
    ],
  },
  transparency: {
    title: "Transparency",
    summary:
      "Placeholder EO use cases on model explainability, data lineage, and communication clarity.",
    examples: [
      {
        name: "Deforestation alert confidence",
        scenario:
          "Users receive binary alerts without confidence scores or clear explanation of uncertainty drivers.",
        prompt:
          "What explanation card should accompany each alert before stakeholder use?",
      },
      {
        name: "Public climate risk portal",
        scenario:
          "Different agencies interpret model outputs differently because assumptions are undocumented.",
        prompt:
          "Which metadata fields should be visible by default for every map layer?",
      },
    ],
  },
  accountability: {
    title: "Accountability",
    summary:
      "Placeholder EO use cases for ownership, escalation, and auditability when harms occur.",
    examples: [
      {
        name: "False evacuation trigger",
        scenario:
          "A model false positive triggers costly evacuation and no clear owner can explain the decision chain.",
        prompt:
          "What RACI and audit logs are required before production deployment?",
      },
      {
        name: "Data licensing breach",
        scenario:
          "A third-party dataset with restrictive terms is accidentally used in a released model.",
        prompt:
          "How should governance controls block non-compliant data from training jobs?",
      },
    ],
  },
  robustness: {
    title: "Robustness & Safety",
    summary:
      "Placeholder EO use cases for resilience to distribution shift, sensor issues, and adversarial conditions.",
    examples: [
      {
        name: "Wildfire smoke drift",
        scenario:
          "Model performance drops when dense smoke alters spectral signatures outside training distribution.",
        prompt:
          "Which drift detectors should trigger safe fallback behavior?",
      },
      {
        name: "Sensor outage fallback",
        scenario:
          "Primary satellite feed fails for 48 hours during a storm response operation.",
        prompt:
          "How do we degrade gracefully while preserving decision quality bounds?",
      },
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

function PlaceholderTab({ tabKey }) {
  const content = PLACEHOLDER_CASES[tabKey];

  return (
    <section className="space-y-4">
      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
        <h2 className="text-lg font-semibold text-slate-100">{content.title}</h2>
        <p className="mt-2 text-sm text-slate-300">{content.summary}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {content.examples.map((item) => (
          <article
            key={item.name}
            className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5"
          >
            <h3 className="text-sm font-semibold uppercase tracking-wide text-emerald-300">
              {item.name}
            </h3>
            <p className="mt-3 text-sm text-slate-300">{item.scenario}</p>
            <p className="mt-3 rounded-lg border border-emerald-700/40 bg-emerald-900/20 p-3 text-sm text-emerald-100">
              <span className="font-semibold">Design question:</span> {item.prompt}
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
            Explore practical responsibility aspects with placeholder EO use
            cases, then test trade-offs in the integrated simulator.
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
        ) : (
          <PlaceholderTab tabKey={activeTab} />
        )}
      </div>
    </main>
  );
}
