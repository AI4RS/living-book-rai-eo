import ChapterSection from "../components/ChapterSection";
import { CHAPTERS, NUMBERED_PARTS, PAGES, hrefFor } from "../config/navigation";
import { PART_INTROS } from "../content/parts";

// Landing page of a part (#/lifecycle, #/principles, #/applications): intro
// text and references from content/parts.js, then the part's chapters from
// config/navigation.js. One component for all three parts.
export default function PartLanding({ page }) {
  const { intro, references } = PART_INTROS[page];
  const numbered = NUMBERED_PARTS.includes(page);

  return (
    <article className="space-y-10">
      <header>
        <h2 className="sr-only">{PAGES[page].label} overview</h2>
        <div className="max-w-prose space-y-4 text-lg leading-relaxed text-ink">
          {intro.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        {references && (
          <div className="mt-6 max-w-prose">
            <h3 className="section-label">References</h3>
            <ul className="mt-2 space-y-1 text-sm leading-relaxed text-muted">
              {references.map((ref) => (
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
            </ul>
          </div>
        )}
      </header>

      <ChapterSection title="Chapters">
        <ul className="grid gap-4 lg:grid-cols-2">
          {CHAPTERS[page].map((chapter, index) => (
            <li key={chapter.id} className="flex">
              <a
                href={hrefFor(page, chapter.id)}
                className="card card-interactive flex w-full gap-3 p-5"
              >
                {numbered && (
                  <span className="w-5 shrink-0 font-serif text-xl font-semibold text-accent">
                    {index + 1}.
                  </span>
                )}
                <span>
                  <span className="block font-serif text-xl text-ink">{chapter.label}</span>
                  {chapter.tagline && (
                    <span className="mt-1 block text-sm leading-relaxed text-muted">
                      {chapter.tagline}
                    </span>
                  )}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </ChapterSection>
    </article>
  );
}
