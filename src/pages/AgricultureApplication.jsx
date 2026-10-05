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
    <article className="space-y-10">
      <ChapterHeader
        kicker={PAGES.applications.label}
        title={findApplication(ID).label}
        lead={content.intro}
      />

      <ChapterSection title="What typically goes wrong in agriculture">
        <div className="grid gap-4 md:grid-cols-2">
          {content.whatGoesWrong.map((item) => (
            <div key={item.title} className="card p-4">
              <p className="font-serif text-lg font-semibold text-ink">{item.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted">{item.text}</p>
            </div>
          ))}
        </div>
      </ChapterSection>

      <ChapterSection
        title="Go deeper"
        intro="The general guidance for these problems lives on the question pages."
      >
        <div className="grid gap-4 md:grid-cols-2">
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

      <CaseGrid title="Cases" cases={cases} />

      <RelatedQuestions
        ids={content.relatedQuestions}
        title="All questions this domain touches"
      />
    </article>
  );
}
