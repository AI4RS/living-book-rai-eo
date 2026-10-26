import HomeHero from "./components/HomeHero";
import PageBanner from "./components/PageBanner";
import SiteFooter from "./components/SiteFooter";
import SubTabs from "./components/SubTabs";
import { MAIN_NAV, PAGES, SITE_TITLE, SUB_TABS, hrefFor } from "./config/navigation";
import IntegratedSimulatorTab from "./labs/IntegratedSimulatorTab";
import { useHashRoute } from "./lib/router";
import ChapterPage from "./pages/ChapterPage";
import Home from "./pages/Home";

function renderPage({ page, sub }) {
  if (SUB_TABS[page]) return <ChapterPage page={page} sub={sub} />;
  if (page === PAGES.simulator.id) return <IntegratedSimulatorTab />;
  return <Home />;
}

export default function App() {
  const route = useHashRoute();
  const subTabs = SUB_TABS[route.page];
  const isHome = route.page === PAGES.home.id;
  // On Home the hero holds the page's h1, so the header title is plain text.
  const TitleTag = isHome ? "p" : "h1";

  return (
    <div className="flex min-h-screen flex-col bg-surface">
      <header className="bg-surface">
        <div className="mx-auto max-w-6xl px-4 pt-5">
          <a href={hrefFor(PAGES.home.id)} className="block">
            <TitleTag className="font-serif text-lg font-bold leading-tight text-ink md:text-2xl">
              {SITE_TITLE}
            </TitleTag>
            <span className="mt-0.5 hidden max-w-prose text-sm text-muted sm:block">
              Explore Responsible AI in EO by lifecycle stage, by principle, or by
              application area.
            </span>
          </a>
          <nav aria-label="Main" className="mt-3 flex gap-6 overflow-x-auto">
            {MAIN_NAV.map((item) => (
              <a
                key={item.id}
                href={hrefFor(item.id)}
                aria-current={route.page === item.id ? "page" : undefined}
                className="tab text-base"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {isHome ? <HomeHero /> : <PageBanner page={PAGES[route.page]} />}

      {subTabs && (
        <div className="border-b border-line bg-subtle">
          <nav aria-label="Sections" className="mx-auto max-w-6xl px-4">
            <SubTabs page={route.page} tabs={subTabs} active={route.sub} />
          </nav>
        </div>
      )}

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10">{renderPage(route)}</main>

      <SiteFooter />
    </div>
  );
}
