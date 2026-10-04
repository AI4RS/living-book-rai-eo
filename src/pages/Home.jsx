import { ArrowRight, Compass, Gauge, HelpCircle, Map } from "lucide-react";
import ChapterSection from "../components/ChapterSection";
import {
  APPLICATION_TABS,
  PAGES,
  QUESTION_TABS,
  applicationHref,
  hrefFor,
  questionHref,
} from "../config/navigation";

const WHY_IT_MATTERS = [
  "Earth Observation (EO) models now inform insurance payouts, disaster alerts, enforcement, and public spending, often for people who never see the model.",
  "They are trained on imagery and labels from some places and seasons, and then applied everywhere. Errors are rarely random: they follow geography, climate, and inequality.",
  "Responsible AI (RAI) in EO asks how to build, evaluate, and deploy these systems so their benefits and failures are fairly shared, understood, and owned.",
];

function EntryCard({ icon: Icon, page, href, description, tabs, tabHref }) {
  return (
    <article className="flex flex-col rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
      <div className="flex items-center gap-2">
        <Icon className="h-5 w-5 text-emerald-400" />
        <h3 className="text-lg font-semibold text-slate-100">{page.label}</h3>
      </div>
      <p className="mt-2 text-sm text-slate-300">{description}</p>
      <ul className="mt-4 space-y-1.5 text-sm">
        {tabs.map((tab) => (
          <li key={tab.id}>
            <a
              href={tabHref(tab.id)}
              className="text-slate-300 underline-offset-2 hover:text-emerald-200 hover:underline"
            >
              {tab.label}
            </a>
            {tab.status === "draft" ? (
              <span className="ml-2 text-xs text-amber-300/70">draft</span>
            ) : (
              <span className="ml-2 text-xs text-emerald-300">ready</span>
            )}
          </li>
        ))}
      </ul>
      <a
        href={href}
        className="mt-5 inline-flex items-center gap-1 self-start rounded-xl border border-emerald-500 bg-emerald-600/20 px-4 py-2 text-sm font-medium text-emerald-200 transition hover:bg-emerald-600/30"
      >
        Open {page.label}
        <ArrowRight className="h-4 w-4" />
      </a>
    </article>
  );
}

export default function Home() {
  return (
    <section className="space-y-4">
      <ChapterSection title="Why Responsible AI matters in Earth Observation">
        <ul className="space-y-2 text-sm text-slate-300">
          {WHY_IT_MATTERS.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </ChapterSection>

      <div className="grid gap-4 md:grid-cols-2">
        <EntryCard
          icon={Map}
          page={PAGES.applications}
          href={hrefFor(PAGES.applications.id)}
          description={`${PAGES.applications.tagline} Each application page describes what typically goes wrong in that domain, with concrete cases.`}
          tabs={APPLICATION_TABS}
          tabHref={applicationHref}
        />
        <EntryCard
          icon={HelpCircle}
          page={PAGES.questions}
          href={hrefFor(PAGES.questions.id)}
          description={`${PAGES.questions.tagline} Each question page explains the concept, failure modes, best practices, and a checklist.`}
          tabs={QUESTION_TABS}
          tabHref={questionHref}
        />
      </div>

      <ChapterSection title="How the two views connect">
        <div className="flex items-start gap-3 text-sm text-slate-300">
          <Compass className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
          <div className="space-y-2">
            <p>
              Both views read from the same set of cases. {PAGES.questions.label} pages
              hold the general guidance, stated once. {PAGES.applications.label} pages
              hold the domain specifics and link to the questions they raise instead
              of repeating them.
            </p>
            <p>
              Start with the first finished pair:{" "}
              <a href={questionHref("fairness")} className="text-emerald-300 hover:underline">
                Fairness
              </a>{" "}
              and{" "}
              <a href={applicationHref("agriculture")} className="text-emerald-300 hover:underline">
                Agriculture & food security
              </a>
              . Pages marked draft collect existing material while they are written.
            </p>
          </div>
        </div>
      </ChapterSection>

      <a
        href={hrefFor(PAGES.simulator.id)}
        className="group flex items-center justify-between rounded-2xl border border-emerald-700/30 bg-emerald-900/20 p-5 transition hover:border-emerald-500"
      >
        <span className="flex items-start gap-3">
          <Gauge className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" />
          <span>
            <span className="block font-semibold text-emerald-200">
              {PAGES.simulator.longLabel}
            </span>
            <span className="mt-1 block text-sm text-emerald-100/80">
              Test how resolution and label choices trade off privacy, fairness, and compute.
            </span>
          </span>
        </span>
        <ArrowRight className="h-5 w-5 text-emerald-300 transition group-hover:translate-x-0.5" />
      </a>
    </section>
  );
}
