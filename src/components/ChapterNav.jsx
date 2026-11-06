import { ChevronDown } from "lucide-react";
import { NUMBERED_PARTS, PAGES, hrefFor, readingOrder } from "../config/navigation";

// A part's chapters: Overview first, then each chapter (numbered for the
// Lifecycle). From md up it is a sticky left column; below md it collapses
// into a "Chapters" disclosure at the top of the content.
export default function ChapterNav({ page, current }) {
  const items = readingOrder(page);
  const currentLabel = items.find((item) => item.id === current)?.label;
  const navLabel = `${PAGES[page].label} chapters`;

  return (
    <>
      {/* Keyed by the current chapter so it starts closed after navigating. */}
      <details key={current ?? "overview"} className="group mb-8 border border-line md:hidden">
        <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 px-4 py-2 text-sm [&::-webkit-details-marker]:hidden">
          <span>
            <span className="font-semibold text-ink">Chapters</span>
            {currentLabel && <span className="text-muted"> · {currentLabel}</span>}
          </span>
          <ChevronDown
            className="h-4 w-4 shrink-0 text-muted transition-transform group-open:rotate-180"
            aria-hidden="true"
          />
        </summary>
        <nav aria-label={navLabel} className="border-t border-line py-2">
          <ChapterList page={page} items={items} current={current} />
        </nav>
      </details>

      <nav
        aria-label={navLabel}
        className="hidden md:sticky md:top-6 md:block md:max-h-[calc(100vh-3rem)] md:self-start md:overflow-y-auto"
      >
        <p className="section-label mb-3 pl-3.5">{PAGES[page].label}</p>
        <ChapterList page={page} items={items} current={current} />
      </nav>
    </>
  );
}

function ChapterList({ page, items, current }) {
  const numbered = NUMBERED_PARTS.includes(page);

  return (
    <ul>
      {items.map((item, index) => (
        <li key={item.id ?? "overview"}>
          <a
            href={hrefFor(page, item.id)}
            aria-current={item.id === current ? "page" : undefined}
            className="chapter-link"
          >
            {numbered && item.id && <span className="w-4 shrink-0 tabular-nums">{index}.</span>}
            <span>{item.label}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
