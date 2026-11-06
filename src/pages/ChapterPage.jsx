import { ArrowLeft, ArrowRight } from "lucide-react";
import ChapterSection, { ChapterHeader } from "../components/ChapterSection";
import DraftBanner from "../components/DraftBanner";
import { CHAPTER_SECTIONS, PAGES, hrefFor, readingOrder } from "../config/navigation";
import { CONTRIBUTORS } from "../content/contributors";

// One template for every Lifecycle, Principles and Applications chapter: the
// title, a draft banner, and the part's shared section outline from
// config/navigation.js, each with a placeholder until it is written. Ends with
// Previous / Next links in the chapter list's order.
export default function ChapterPage({ page, chapter: id }) {
  const order = readingOrder(page);
  const index = order.findIndex((item) => item.id === id);
  const chapter = order[index];

  return (
    <article className="space-y-10">
      <DraftBanner note="Only the section outline is in place." />
      <ChapterHeader
        title={chapter.label}
        note={chapter.nist && `NIST AI RMF stage: ${chapter.nist}`}
        contributor={CONTRIBUTORS[chapter.contributor]}
        lead={chapter.tagline}
      />
      {CHAPTER_SECTIONS[page].map((title) => (
        <ChapterSection key={title} title={title} intro="To be written." />
      ))}
      <PrevNext page={page} prev={order[index - 1]} next={order[index + 1]} />
    </article>
  );
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
