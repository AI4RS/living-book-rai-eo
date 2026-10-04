import { useMemo, useState } from "react";
import { AlertTriangle, Scale, ShieldAlert } from "lucide-react";
import MetricCard from "../components/MetricCard";
import { clamp, levelFromScore } from "../lib/scoring";

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

// Header copy per page context. Only the framing changes; the lab logic is shared.
const FRAMING_COPY = {
  question: {
    title: "Fairness Lab: Crop Insurance Transfer Across Regions",
    body: "Scenario: a payout model trained mostly on EU imagery performs poorly in India. Expand training geography to improve transfer performance and reduce payout inequity.",
  },
  application: {
    title: "Running example: EU-trained crop mapping on Indian smallholder farms",
    body: "A crop map that feeds insurance payouts is trained on EU parcels and applied to monsoon-season smallholder fields in India. Change where the training data comes from and watch prediction quality, and the share of underpaid farmers, shift.",
  },
};

const gridCells = Array.from({ length: 48 }, (_, i) => i);

const getGroundTruthValue = (idx) => {
  const row = Math.floor(idx / 8);
  const col = idx % 8;
  const base = (Math.sin((row + 1) * 0.9) + Math.cos((col + 2) * 0.7) + 2) / 4;
  return Math.round(base * 100);
};

export default function FairnessTrainingLab({ framing = "question" }) {
  const copy = FRAMING_COPY[framing] ?? FRAMING_COPY.question;
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
        <h2 className="text-lg font-semibold text-slate-100">{copy.title}</h2>
        <p className="mt-2 text-sm text-slate-300">{copy.body}</p>
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
