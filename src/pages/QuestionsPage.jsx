import { CaseGrid } from "../components/CaseCard";
import ChapterSection, { ChapterHeader } from "../components/ChapterSection";
import DraftBanner from "../components/DraftBanner";
import DummyMapPanel from "../components/DummyMapPanel";
import RelatedQuestions from "../components/RelatedQuestions";
import { PAGES, findQuestion } from "../config/navigation";
import { casesForQuestion } from "../content/cases";
import { QUESTION_CONTENT } from "../content/questions";
import FairnessQuestion from "./FairnessQuestion";

const BUILT_PAGES = {
  fairness: FairnessQuestion,
};

export default function QuestionsPage({ sub }) {
  const Built = BUILT_PAGES[sub];
  return Built ? <Built /> : <QuestionDraft id={sub} />;
}

function QuestionDraft({ id }) {
  const tab = findQuestion(id);
  const content = QUESTION_CONTENT[id];
  const cases = casesForQuestion(id);

  return (
    <section className="space-y-4">
      <DraftBanner note="Existing material from the earlier principle tabs is collected below until this chapter is written." />
      <ChapterHeader
        kicker={`${PAGES.questions.label} · ${tab.label}`}
        title={content.framing}
        lead={content.summary}
      />

      {content.guidingQuestions && (
        <ChapterSection title="Guiding questions for this chapter">
          <ul className="list-disc space-y-2 pl-5 text-sm text-slate-300">
            {content.guidingQuestions.map((q) => (
              <li key={q}>{q}</li>
            ))}
          </ul>
        </ChapterSection>
      )}

      {(content.scenes?.length > 0 || content.decisions) && (
        <div className="grid gap-4 lg:grid-cols-[1.15fr,1fr]">
          {content.scenes?.length > 0 && (
            <div className="space-y-4">
              {content.scenes.map((scene) => (
                <DummyMapPanel key={scene} sceneKey={scene} />
              ))}
            </div>
          )}
          {content.decisions && (
            <ChapterSection title="Key design decisions">
              <ul className="space-y-3 text-sm text-slate-300">
                {content.decisions.map((item) => (
                  <li
                    key={item}
                    className="rounded-lg border border-slate-700 bg-slate-800/60 px-3 py-2"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </ChapterSection>
          )}
        </div>
      )}

      {cases.length > 0 && (
        <>
          <h3 className="pt-2 text-sm font-semibold uppercase tracking-wide text-slate-300">
            Cases touching this question
          </h3>
          <CaseGrid cases={cases} linkApplication currentQuestion={id} />
        </>
      )}

      <RelatedQuestions ids={content.relatedQuestions} />
    </section>
  );
}
