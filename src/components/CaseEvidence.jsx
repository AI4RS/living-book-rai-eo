import { ExternalLink } from "lucide-react";

// Measured numbers behind a case (optional `evidence` field in content/cases.js).
// Compares a baseline column with an improved column; `change` is shown under
// the improved value.
export default function CaseEvidence({ evidence, className = "" }) {
  const [baseline, improved] = evidence.columns;

  return (
    <div className={`mt-4 border-t border-line pt-4 ${className}`}>
      <p className="section-label">Evidence</p>
      <p className="mt-1 text-xs text-muted">{evidence.setting}</p>
      <table className="mt-3 w-full text-left text-xs">
        <thead>
          <tr className="border-b border-line-strong text-muted">
            <th scope="col" className="py-1.5 pr-2 font-semibold">Metric</th>
            <th scope="col" className="py-1.5 pr-2 font-semibold">{baseline}</th>
            <th scope="col" className="py-1.5 font-semibold">{improved}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {evidence.rows.map((row) => (
            <tr key={row.label} className="align-top">
              <th scope="row" className="py-1.5 pr-2 font-normal text-ink">{row.label}</th>
              <td className="py-1.5 pr-2 tabular-nums text-ink">{row.values[0]}</td>
              <td className="py-1.5 tabular-nums">
                <span className="font-semibold text-ink">{row.values[1]}</span>
                {row.change && <span className="block text-safe">{row.change}</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {evidence.notes && (
        <ul className="mt-3 list-disc space-y-1 pl-4 text-xs leading-relaxed text-muted">
          {evidence.notes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      )}
      <a
        href={evidence.source.href}
        target="_blank"
        rel="noopener noreferrer"
        className="link mt-3 inline-flex min-h-9 items-center gap-1 text-xs"
      >
        {evidence.source.label}
        <ExternalLink className="h-3 w-3" aria-hidden="true" />
      </a>
    </div>
  );
}
