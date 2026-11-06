import { useEffect, useState } from "react";
import { CHAPTERS, CHAPTER_ALIASES, MAIN_NAV, PAGES, PAGE_ALIASES } from "../config/navigation";

// Resolve a hash like "#/principles/fairness" into a valid { page, chapter }.
// Retired page and chapter ids map to their successor; unknown pages fall back
// to Home. For a part, a missing or unknown chapter gives chapter: null, which
// opens the part's landing page.
export function parseHash(hash) {
  const [rawPage, rawChapter] = hash.replace(/^#\/?/, "").split("/").filter(Boolean);
  const page = PAGE_ALIASES[rawPage] ?? rawPage;
  const known = MAIN_NAV.some((p) => p.id === page);
  if (!known) return { page: PAGES.home.id, chapter: null };

  const chapters = CHAPTERS[page];
  const id = CHAPTER_ALIASES[page]?.[rawChapter] ?? rawChapter;
  return { page, chapter: chapters?.some((c) => c.id === id) ? id : null };
}

export function useHashRoute() {
  const [route, setRoute] = useState(() => parseHash(window.location.hash));

  useEffect(() => {
    const onChange = () => {
      setRoute(parseHash(window.location.hash));
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);

  return route;
}
