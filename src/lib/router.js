import { useEffect, useState } from "react";
import { MAIN_NAV, PAGES, PAGE_ALIASES, SUB_TAB_ALIASES, SUB_TABS } from "../config/navigation";

// Resolve a hash like "#/principles/fairness" into a valid { page, sub }.
// Retired page and sub-tab ids map to their successor; unknown pages fall back
// to Home; unknown or missing sub-tabs fall back to the page's first sub-tab.
export function parseHash(hash) {
  const [rawPage, rawSub] = hash.replace(/^#\/?/, "").split("/").filter(Boolean);
  const page = PAGE_ALIASES[rawPage] ?? rawPage;
  const sub = SUB_TAB_ALIASES[page]?.[rawSub] ?? rawSub;
  const known = MAIN_NAV.some((p) => p.id === page);
  if (!known) return { page: PAGES.home.id, sub: null };

  const tabs = SUB_TABS[page];
  if (!tabs) return { page, sub: null };
  return { page, sub: tabs.some((t) => t.id === sub) ? sub : tabs[0].id };
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
