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

  return (
    <div className="min-h-screen bg-surface">
      <header className="border-b border-line bg-surface">
        <div className="mx-auto max-w-6xl px-4 pt-6">
          <a href={hrefFor(PAGES.home.id)} className="inline-block">
            <h1 className="font-serif text-2xl leading-tight text-ink md:text-3xl">
              {SITE_TITLE}
            </h1>
          </a>
          <p className="mt-1 max-w-prose text-sm text-muted">
            Explore Responsible AI in EO by application area or by the questions
            you face across the AI lifecycle.
          </p>
          <nav aria-label="Main" className="mt-4 flex gap-6 overflow-x-auto">
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

      <main className="mx-auto max-w-6xl px-4 py-10">{renderPage(route)}</main>
    </div>
  );
}
