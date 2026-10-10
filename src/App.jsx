import iadfLogo from "./assets/IADF.webp";
import HomeHero from "./components/HomeHero";
import SiteFooter from "./components/SiteFooter";
import SubTabs from "./components/SubTabs";
import { MAIN_NAV, PAGES, SITE_TITLE, SUB_TABS, hrefFor } from "./config/navigation";
import IntegratedSimulatorTab from "./labs/IntegratedSimulatorTab";
import { useHashRoute } from "./lib/router";
import ApplicationsPage from "./pages/ApplicationsPage";
import Home from "./pages/Home";
import QuestionsPage from "./pages/QuestionsPage";

function renderPage({ page, sub }) {
  switch (page) {
    case PAGES.applications.id:
      return <ApplicationsPage sub={sub} />;
    case PAGES.questions.id:
      return <QuestionsPage sub={sub} />;
    case PAGES.simulator.id:
      return <IntegratedSimulatorTab />;
    default:
      return <Home />;
  }
}

export default function App() {
  const route = useHashRoute();
  const subTabs = SUB_TABS[route.page];
  const isHome = route.page === PAGES.home.id;
  // On Home the hero holds the page's h1, so the header title is plain text.
  const TitleTag = isHome ? "p" : "h1";

  return (
    <div className="flex min-h-screen flex-col bg-surface">
      <header className="border-b border-line bg-surface">
        <div className="mx-auto max-w-6xl px-4 pt-5">
          <a
            href={hrefFor(PAGES.home.id)}
            className="flex items-center gap-3 md:gap-4"
          >
            <img
              src={iadfLogo}
              alt="IEEE GRSS Image Analysis and Data Fusion logo"
              className="h-10 w-auto shrink-0 md:h-14"
            />
            <span className="h-11 w-px shrink-0 bg-line-strong" aria-hidden="true" />
            <span className="min-w-0">
              <TitleTag className="font-serif text-lg font-bold leading-tight text-ink md:text-2xl">
                {SITE_TITLE}
              </TitleTag>
              <span className="mt-0.5 hidden max-w-prose text-sm text-muted sm:block">
                Explore Responsible AI in EO by application area or by the questions
                you face across the AI lifecycle.
              </span>
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

      {subTabs && (
        <div className="border-b border-line bg-subtle">
          <nav aria-label="Sections" className="mx-auto max-w-6xl px-4">
            <SubTabs page={route.page} tabs={subTabs} active={route.sub} />
          </nav>
        </div>
      )}

      {isHome && <HomeHero />}

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10">{renderPage(route)}</main>

      <SiteFooter />
    </div>
  );
}
