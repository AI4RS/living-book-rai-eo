import { useEffect, useState } from "react";
import { MAIN_NAV, PAGES, SUB_TABS } from "../config/navigation";

// Resolve a hash like "#/questions/fairness" into a valid { page, sub }.
// Unknown pages fall back to Home; unknown or missing sub-tabs fall back to the
// page's first sub-tab.
export function parseHash(hash) {
  const [page, sub] = hash.replace(/^#\/?/, "").split("/").filter(Boolean);
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
