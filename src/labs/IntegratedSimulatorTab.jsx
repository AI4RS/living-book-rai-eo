import { useMemo, useState } from "react";
import { AlertTriangle, ChevronDown, ChevronUp, Cpu, Info, Scale, ShieldAlert } from "lucide-react";
import MetricCard from "../components/MetricCard";
import { clamp, levelFromScore } from "../lib/scoring";

const RESOLUTION_OPTIONS = ["30m", "10m", "0.3m"];
const LABEL_OPTIONS = ["Biased", "Representative"];

const BASE_METRICS = {
  "30m": { privacy: 20, fairness: 58, compute: 25 },
  "10m": { privacy: 52, fairness: 67, compute: 55 },
  "0.3m": { privacy: 88, fairness: 73, compute: 92 },
};

const LABEL_MODIFIERS = {
  Biased: { privacy: 8, fairness: -28, compute: 6 },
  Representative: { privacy: 0, fairness: 14, compute: 10 },
};

export default function IntegratedSimulatorTab() {
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
    <section className="space-y-8">
      <header>
        <p className="section-label">Simulator</p>
        <h2 className="mt-2 font-serif text-3xl leading-tight text-ink md:text-4xl">
          Integrated Simulator
        </h2>
      </header>

      <section className="callout callout-info">
        <button
          onClick={() => setShowInfo((v) => !v)}
          aria-expanded={showInfo}
          className="flex min-h-11 w-full items-center justify-between text-left"
        >
          <span className="inline-flex items-center gap-2 font-semibold text-accent">
            <Info className="h-4 w-4" aria-hidden="true" />
            Why this simulator matters
          </span>
          {showInfo ? (
            <ChevronUp className="h-4 w-4 text-accent" aria-hidden="true" />
          ) : (
            <ChevronDown className="h-4 w-4 text-accent" aria-hidden="true" />
          )}
        </button>
        {showInfo && (
          <p className="mt-2 max-w-prose leading-relaxed">
            EO systems can improve climate resilience and public services, but
            deployment choices shape ethical impact. Use this tool to reason
            about Responsible AI design decisions before production rollout.
          </p>
        )}
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="card p-4">
          <h3 className="section-label mb-3">Spatial Resolution</h3>
          <div className="grid grid-cols-3 gap-2">
            {RESOLUTION_OPTIONS.map((option) => (
              <button
                key={option}
                onClick={() => setResolution(option)}
                aria-pressed={resolution === option}
                className="option-btn"
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="card p-4">
          <h3 className="section-label mb-3">Training Label Distribution</h3>
          <div className="grid grid-cols-2 gap-2">
            {LABEL_OPTIONS.map((option) => (
              <button
                key={option}
                onClick={() => setLabelDistribution(option)}
                aria-pressed={labelDistribution === option}
                className="option-btn"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
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
            danger: { box: "callout-risk", icon: "text-risk" },
            warning: { box: "callout-warn", icon: "text-warn" },
            success: { box: "callout-safe", icon: "text-safe" },
          };

          return (
            <div
              key={`${alert.tone}-${idx}`}
              className={`callout ${tones[alert.tone].box}`}
            >
              <p className="flex items-start gap-2">
                <AlertTriangle
                  className={`mt-0.5 h-4 w-4 shrink-0 ${tones[alert.tone].icon}`}
                  aria-hidden="true"
                />
                <span>{alert.text}</span>
              </p>
            </div>
          );
        })}
      </section>
    </section>
  );
}
