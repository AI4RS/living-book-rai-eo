import { CaseGrid } from "../components/CaseCard";
import ChapterSection, { ChapterHeader } from "../components/ChapterSection";
import { CrossLinkCard } from "../components/CrossLink";
import RelatedQuestions from "../components/RelatedQuestions";
import { PAGES, findApplication } from "../config/navigation";
import { APPLICATION_CONTENT } from "../content/applications";
import { casesForApplication } from "../content/cases";

// Built application page. Everything comes from APPLICATION_CONTENT[id].
export default function ApplicationChapter({ id }) {
  const content = APPLICATION_CONTENT[id];
  const cases = casesForApplication(id);

  return (
    <article className="space-y-10">
      <ChapterHeader
        kicker={PAGES.applications.label}
        title={findApplication(id).label}
        lead={content.intro}
      />

      <ChapterSection title={`What typically goes wrong in ${content.domainName}`}>
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
          {content.goDeeper.map((item) => (
            <CrossLinkCard key={item.question} {...item} />
          ))}
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
