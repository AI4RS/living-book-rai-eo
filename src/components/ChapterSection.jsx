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

// Page header: small kicker, serif title (often the framing question), optional
// contributor credit, and a lead: one string or an array of paragraphs.
export function ChapterHeader({ kicker, title, contributor, lead }) {
  return (
    <header>
      {kicker && <p className="section-label">{kicker}</p>}
      <h2 className="mt-2 max-w-3xl font-serif text-3xl leading-tight text-ink md:text-4xl">
        {title}
      </h2>
      {contributor && (
        <p className="mt-3 text-sm text-muted">
          Contributor: <span className="font-semibold text-ink">{contributor.name}</span>,{" "}
          {contributor.role}
        </p>
      )}
      {[lead].flat().filter(Boolean).map((paragraph) => (
        <p key={paragraph} className="mt-4 max-w-prose text-lg leading-relaxed text-muted">
          {paragraph}
        </p>
      ))}
    </header>
  );
}

