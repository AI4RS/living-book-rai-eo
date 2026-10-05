import { CaseGrid } from "../components/CaseCard";
import ChapterSection, { ChapterHeader } from "../components/ChapterSection";
import { CrossLinkCard } from "../components/CrossLink";
import RelatedQuestions from "../components/RelatedQuestions";
import { PAGES, findApplication } from "../config/navigation";
import { APPLICATION_CONTENT } from "../content/applications";
import { casesForApplication } from "../content/cases";

const ID = "agriculture";

export default function AgricultureApplication() {
  const content = APPLICATION_CONTENT[ID];
  const cases = casesForApplication(ID);

  return (
    <section className="space-y-4">
      <ChapterHeader
        kicker={PAGES.applications.label}
        title={findApplication(ID).label}
        lead={content.intro}
      />

      <ChapterSection title="What typically goes wrong in agriculture">
        <div className="grid gap-3 md:grid-cols-2">
          {content.whatGoesWrong.map((item) => (
            <div
              key={item.title}
              className="rounded-lg border border-slate-700 bg-slate-800/60 p-3"
            >
              <p className="text-sm font-semibold text-slate-100">{item.title}</p>
              <p className="mt-1 text-sm text-slate-300">{item.text}</p>
            </div>
          ))}
        </div>
      </ChapterSection>

      <ChapterSection
        title="Go deeper"
        intro="The general guidance for these problems lives on the question pages."
      >
        <div className="grid gap-3 md:grid-cols-2">
          <CrossLinkCard
            question="fairness"
            description="Why models trained in one region fail in another, and a checklist for catching it."
          />
          <CrossLinkCard
            question="uncertainty-robustness"
            description="What to do when clouds, sensor gaps, or shifting conditions degrade inputs."
          />
        </div>
      </ChapterSection>

      <h3 className="pt-2 text-sm font-semibold uppercase tracking-wide text-slate-300">
        Cases
      </h3>
      <CaseGrid cases={cases} />

      <RelatedQuestions
        ids={content.relatedQuestions}
        title="All questions this domain touches"
      />
    </section>
  );
}
