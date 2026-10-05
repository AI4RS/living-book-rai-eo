import { CheckSquare } from "lucide-react";
import { CaseGrid } from "../components/CaseCard";
import ChapterSection, { ChapterHeader } from "../components/ChapterSection";
import RelatedQuestions from "../components/RelatedQuestions";
import { PAGES, findQuestion } from "../config/navigation";
import { casesForQuestion } from "../content/cases";
import { QUESTION_CONTENT } from "../content/questions";

const ID = "fairness";

export default function FairnessQuestion() {
  const content = QUESTION_CONTENT[ID];
  const cases = casesForQuestion(ID);

  return (
    <section className="space-y-4">
      <ChapterHeader
        kicker={`${PAGES.questions.label} · ${findQuestion(ID).label}`}
        title={content.framing}
        lead={content.summary}
      />

      <ChapterSection title="Why it matters in EO">
        <ul className="space-y-2 text-sm text-slate-300">
          {content.whyItMatters.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </ChapterSection>

      <ChapterSection title="Typical failure modes">
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {content.failureModes.map((mode) => (
            <div
              key={mode.title}
              className="rounded-lg border border-rose-700/30 bg-rose-900/10 p-3"
            >
              <p className="text-sm font-semibold text-rose-100">{mode.title}</p>
              <p className="mt-1 text-sm text-slate-300">{mode.text}</p>
            </div>
          ))}
        </div>
      </ChapterSection>

      <div className="grid gap-4 lg:grid-cols-2">
        <ChapterSection title="Best practices">
          <ul className="space-y-2 text-sm text-slate-300">
            {content.bestPractices.map((item) => (
              <li
                key={item}
                className="rounded-lg border border-slate-700 bg-slate-800/60 px-3 py-2"
              >
                {item}
              </li>
            ))}
          </ul>
        </ChapterSection>

        <ChapterSection title="Recommendation checklist">
          <ul className="space-y-2 text-sm text-slate-300">
            {content.checklist.map((item) => (
              <li key={item} className="flex gap-2">
                <CheckSquare className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </ChapterSection>
      </div>

      <h3 className="pt-2 text-sm font-semibold uppercase tracking-wide text-slate-300">
        Cases touching fairness
      </h3>
      <CaseGrid cases={cases} linkApplication currentQuestion={ID} />

      <RelatedQuestions ids={content.relatedQuestions} />
    </section>
  );
}
