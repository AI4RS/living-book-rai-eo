import { barColor } from "../lib/scoring";

export default function MetricCard({ icon: Icon, title, score, level, reverse = false }) {
  return (
    <div className="card p-4">
      <div className="mb-3 flex items-center gap-2">
        <Icon className="h-4 w-4 text-accent" />
        <h3 className="text-sm font-semibold text-ink">{title}</h3>
      </div>
      <div className="mb-2 flex items-end justify-between">
        <span className="text-2xl font-bold text-ink">{score}%</span>
        <span className="section-label">{level}</span>
      </div>
      <div className="h-2 overflow-hidden border border-line bg-subtle">
        <div
          className={`h-full ${barColor(score, reverse)} transition-all duration-300`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}
