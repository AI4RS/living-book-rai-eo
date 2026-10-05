// Standard titled section used to lay out chapter pages: a thin top rule, a
// muted uppercase label, optional intro prose, then content.
export default function ChapterSection({ title, intro, children, className = "" }) {
  return (
    <section className={`border-t border-line pt-6 ${className}`}>
      {title && <h3 className="section-label">{title}</h3>}
      {intro && <p className="mt-2 max-w-prose text-muted">{intro}</p>}
      {children && <div className={title || intro ? "mt-4" : ""}>{children}</div>}
    </section>
  );
}

// Page header: small kicker, serif title (often the framing question), lead.
export function ChapterHeader({ kicker, title, lead }) {
  return (
    <header>
      {kicker && <p className="section-label">{kicker}</p>}
      <h2 className="mt-2 max-w-3xl font-serif text-3xl leading-tight text-ink md:text-4xl">
        {title}
      </h2>
      {lead && <p className="mt-4 max-w-prose text-lg leading-relaxed text-muted">{lead}</p>}
    </header>
  );
}

// Bulleted prose list with square accent markers.
export function BulletList({ items }) {
  return (
    <ul className="max-w-prose space-y-3 leading-relaxed text-ink">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span className="mt-2.5 h-1.5 w-1.5 shrink-0 bg-accent" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
