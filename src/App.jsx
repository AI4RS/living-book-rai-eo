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
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-6">
          <a href={hrefFor(PAGES.home.id)}>
            <h1 className="text-2xl font-bold text-slate-100 md:text-3xl">{SITE_TITLE}</h1>
          </a>
          <p className="mt-2 text-sm text-slate-400 md:text-base">
            Explore Responsible AI in EO by application area or by the questions
            you face across the AI lifecycle, then test trade-offs in the simulator.
          </p>
        </header>

        <nav className="mb-6 space-y-3">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {MAIN_NAV.map((item) => (
              <a
                key={item.id}
                href={hrefFor(item.id)}
                aria-current={route.page === item.id ? "page" : undefined}
                className={`whitespace-nowrap rounded-xl border px-4 py-2 text-sm font-medium transition ${
                  route.page === item.id
                    ? "border-emerald-500 bg-emerald-600/20 text-emerald-200"
                    : "border-slate-700 bg-slate-800 text-slate-300 hover:border-slate-500"
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>
          {subTabs && <SubTabs page={route.page} tabs={subTabs} active={route.sub} />}
        </nav>

        {renderPage(route)}
      </div>
    </main>
  );
}
