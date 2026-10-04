// Standard titled panel used to lay out chapter pages.
export default function ChapterSection({ title, intro, children, className = "" }) {
  return (
    <section
      className={`rounded-2xl border border-slate-800 bg-slate-900/70 p-5 ${className}`}
    >
      {title && (
        <h3 className="text-sm font-semibold uppercase tracking-wide text-emerald-300">
          {title}
        </h3>
      )}
      {intro && <p className="mt-2 text-sm text-slate-300">{intro}</p>}
      {children && <div className={title || intro ? "mt-3" : ""}>{children}</div>}
    </section>
  );
}

// Page header: small kicker, framing question as title, optional lead.
export function ChapterHeader({ kicker, title, lead }) {
  return (
    <header className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
      {kicker && (
        <p className="text-xs font-semibold uppercase tracking-wide text-emerald-300">
          {kicker}
        </p>
      )}
      <h2 className="mt-1 text-xl font-semibold text-slate-100">{title}</h2>
      {lead && <p className="mt-2 text-sm text-slate-300">{lead}</p>}
    </header>
  );
}
