import { barColor } from "../lib/scoring";

export default function MetricCard({ icon: Icon, title, score, level, reverse = false }) {
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
