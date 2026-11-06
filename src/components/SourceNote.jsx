// Short note on where a part's structure comes from, with a small reference
// list: { title, text, references: [{ text, href }] }.
export default function SourceNote({ source }) {
  return (
    <aside className="callout callout-info" aria-labelledby="source-note-title">
      <h3 id="source-note-title" className="section-label">
        {source.title}
      </h3>
      <p className="mt-2 max-w-prose leading-relaxed text-ink">{source.text}</p>
      <ol className="mt-3 space-y-1 text-sm leading-relaxed text-muted">
        {source.references.map((ref) => (
          <li key={ref.href}>
            {ref.text}{" "}
            <a
              href={ref.href}
              target="_blank"
              rel="noopener noreferrer"
              className="link break-words"
            >
              {ref.href}
            </a>
          </li>
        ))}
      </ol>
    </aside>
  );
}
