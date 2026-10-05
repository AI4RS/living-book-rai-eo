import { CheckSquare } from "lucide-react";
import { CaseGrid } from "../components/CaseCard";
import ChapterSection, { BulletList, ChapterHeader } from "../components/ChapterSection";
import RelatedQuestions from "../components/RelatedQuestions";
import { PAGES, findQuestion } from "../config/navigation";
import { casesForQuestion } from "../content/cases";
import { QUESTION_CONTENT } from "../content/questions";

const ID = "fairness";

export default function FairnessQuestion() {
  const content = QUESTION_CONTENT[ID];
  const cases = casesForQuestion(ID);

  return (
    <article className="space-y-10">
      <ChapterHeader
        kicker={`${PAGES.questions.label} · ${findQuestion(ID).label}`}
        title={content.framing}
        lead={content.summary}
      />

      <ChapterSection title="Why it matters in EO">
        <BulletList items={content.whyItMatters} />
      </ChapterSection>

      <ChapterSection title="Typical failure modes">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {content.failureModes.map((mode) => (
            <div key={mode.title} className="card p-4">
              <p className="font-serif text-lg font-semibold text-ink">{mode.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted">{mode.text}</p>
            </div>
          ))}
        </div>
      </ChapterSection>

      <div className="grid gap-10 lg:grid-cols-2">
        <ChapterSection title="Best practices">
          <ol className="space-y-3 leading-relaxed text-ink">
            {content.bestPractices.map((item, index) => (
              <li key={item} className="flex gap-3">
                <span className="w-5 shrink-0 font-serif font-semibold text-accent">
                  {index + 1}.
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
        </ChapterSection>

        <ChapterSection title="Recommendation checklist">
          <ul className="space-y-3 leading-relaxed text-ink">
            {content.checklist.map((item) => (
              <li key={item} className="flex gap-3">
                <CheckSquare className="mt-1 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </ChapterSection>
      </div>

      <CaseGrid
        title="Cases touching fairness"
        cases={cases}
        linkApplication
        currentQuestion={ID}
      />

      <RelatedQuestions ids={content.relatedQuestions} />
    </article>
  );
}
