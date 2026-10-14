import { ArrowRight, Gauge, HelpCircle, Map } from "lucide-react";
import ChapterSection, { BulletList } from "../components/ChapterSection";
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
    <article className="card card-interactive flex flex-col p-6">
      <div className="flex items-center gap-2">
        <Icon className="h-5 w-5 text-accent" aria-hidden="true" />
        <h3 className="font-serif text-2xl text-ink">{page.label}</h3>
      </div>
      <p className="mt-3 leading-relaxed text-muted">{description}</p>
      <ul className="mb-6 mt-5 divide-y divide-line border-y border-line text-sm">
        {tabs.map((tab) => (
          <li key={tab.id} className="flex items-center justify-between gap-3">
            <a href={tabHref(tab.id)} className="link flex min-h-11 flex-1 items-center py-2">
              {tab.label}
            </a>
            <span
              className={`text-xs uppercase tracking-wide ${
                tab.status === "draft" ? "text-muted" : "font-semibold text-accent"
              }`}
            >
              {tab.status === "draft" ? "draft" : "ready"}
            </span>
          </li>
        ))}
      </ul>
      <a href={href} className="btn-primary mt-auto self-start">
        Open {page.label}
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </a>
    </article>
  );
}

export default function Home() {
  return (
    <article className="space-y-10">
      <ChapterSection title="Why it matters" className="border-t-0 pt-0">
        <BulletList items={WHY_IT_MATTERS} />
      </ChapterSection>

      <ChapterSection title="Two ways in">
        <div className="grid gap-6 md:grid-cols-2">
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
      </ChapterSection>

      <ChapterSection title="How the two views connect">
        <div className="max-w-prose space-y-3 leading-relaxed text-ink">
          <p>
            Both views read from the same set of cases. {PAGES.questions.label} pages
            hold the general guidance, stated once. {PAGES.applications.label} pages
            hold the domain specifics and link to the questions they raise instead
            of repeating them.
          </p>
          <p>
            Start with the finished pairs:{" "}
            <a href={questionHref("fairness")} className="link">
              Fairness
            </a>{" "}
            with{" "}
            <a href={applicationHref("agriculture")} className="link">
              Agriculture & food security
            </a>
            , and{" "}
            <a href={questionHref("green-ai")} className="link">
              Green AI & energy
            </a>{" "}
            with{" "}
            <a href={applicationHref("forests")} className="link">
              Forests
            </a>
            . Pages marked draft collect existing material while they are written.
          </p>
        </div>
      </ChapterSection>

      <section className="flex flex-col gap-4 border border-line bg-subtle p-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-3">
          <Gauge className="mt-1 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
          <div>
            <h3 className="font-serif text-xl text-ink">{PAGES.simulator.longLabel}</h3>
            <p className="mt-1 text-sm text-muted">
              Test how resolution and label choices trade off privacy, fairness, and compute.
            </p>
          </div>
        </div>
        <a href={hrefFor(PAGES.simulator.id)} className="btn-secondary shrink-0 self-start md:self-auto">
          Open the simulator
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </section>
    </article>
  );
}
