import { ArrowLeft, ArrowRight, Pencil } from "lucide-react";
import ChapterSection, { ChapterHeader } from "../components/ChapterSection";
import DraftBanner from "../components/DraftBanner";
import { CHAPTER_SECTIONS, EXTERNAL_LINKS, PAGES, hrefFor, readingOrder } from "../config/navigation";
import { PLACEHOLDER, chapterPath, isPlaceholder } from "../lib/chapterFile";
import { loadChapter } from "../lib/chapters";
import { renderMarkdown } from "../lib/markdown";

// One template for every Lifecycle, Principles and Applications chapter. The
// title, tagline and NIST note come from config/navigation.js; the status,
// contributors and section text come from the chapter's Markdown file
// (src/content/chapters/<part>/<id>.md), one "##" heading per section. An
// unwritten section, or a chapter with no file, shows a placeholder. Ends with
// an "Edit this chapter" link and Previous / Next in the chapter list's order.
export default function ChapterPage({ page, chapter: id }) {
  const order = readingOrder(page);
  const index = order.findIndex((item) => item.id === id);
  const chapter = order[index];

  const file = loadChapter(page, id);
  const sections =
    file?.sections ?? CHAPTER_SECTIONS[page].map((title) => ({ title, body: PLACEHOLDER }));
  const outlineOnly = sections.every((section) => isPlaceholder(section.body)) && !file?.preamble;
  const draft = file?.status !== "ready";

  return (
    <article className="space-y-10">
      {draft && (
        <DraftBanner note={outlineOnly ? "Only the section outline is in place." : undefined} />
      )}
      <ChapterHeader
        title={chapter.label}
        note={chapter.nist && `NIST AI RMF stage: ${chapter.nist}`}
        contributors={file?.contributors}
        lead={chapter.tagline}
      />
      {file?.preamble && <Prose text={file.preamble} />}
      {sections.map((section, i) => (
        <ChapterSection
          key={`${i}-${section.title}`}
          title={section.title}
          intro={isPlaceholder(section.body) ? PLACEHOLDER : undefined}
        >
          {!isPlaceholder(section.body) && <Prose text={section.body} />}
        </ChapterSection>
      ))}
      <div className="space-y-6">
        <p className="text-sm">
          <a
            href={`${EXTERNAL_LINKS.github}/edit/main/${chapterPath(page, id)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-muted underline-offset-2 hover:text-ink hover:underline"
          >
            <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
            Edit this chapter on GitHub
          </a>
        </p>
        <PrevNext page={page} prev={order[index - 1]} next={order[index + 1]} />
      </div>
    </article>
  );
}

function Prose({ text }) {
  return <div className="chapter-prose" dangerouslySetInnerHTML={{ __html: renderMarkdown(text) }} />;
}

function PrevNext({ page, prev, next }) {
  const label = (item) => (item.id ? item.label : `${PAGES[page].label} overview`);

  return (
    <nav aria-label="Previous and next chapter" className="grid gap-4 border-t border-line pt-6 sm:grid-cols-2">
      {prev && (
        <a href={hrefFor(page, prev.id)} className="card card-interactive flex flex-col p-4">
          <span className="section-label inline-flex items-center gap-1">
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            Previous
          </span>
          <span className="mt-1 font-serif text-lg leading-snug text-ink">{label(prev)}</span>
        </a>
      )}
      {next && (
        <a
          href={hrefFor(page, next.id)}
          className="card card-interactive flex flex-col p-4 sm:col-start-2 sm:items-end sm:text-right"
        >
          <span className="section-label inline-flex items-center gap-1">
            Next
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </span>
          <span className="mt-1 font-serif text-lg leading-snug text-ink">{label(next)}</span>
        </a>
      )}
    </nav>
  );
}
