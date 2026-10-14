import { CaseGrid } from "../components/CaseCard";
import ChapterSection, { BulletList, ChapterHeader } from "../components/ChapterSection";
import DraftBanner from "../components/DraftBanner";
import DummyMapPanel from "../components/DummyMapPanel";
import RelatedQuestions from "../components/RelatedQuestions";
import { PAGES, SHOW_PLACEHOLDER_MAPS, findQuestion } from "../config/navigation";
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
  const scenes = SHOW_PLACEHOLDER_MAPS ? content.scenes ?? [] : [];

  return (
    <article className="space-y-10">
      <DraftBanner note="This chapter is still being written. The material below is a starting point." />
      <ChapterHeader
        kicker={`${PAGES.questions.label} · ${tab.label}`}
        title={content.framing}
        lead={content.summary}
      />

      {content.guidingQuestions && (
        <ChapterSection title="Guiding questions for this chapter">
          <BulletList items={content.guidingQuestions} />
        </ChapterSection>
      )}

      {(scenes.length > 0 || content.decisions) && (
        <div
          className={`grid gap-10 ${scenes.length > 0 ? "lg:grid-cols-[1.15fr,1fr]" : ""}`}
        >
          {content.decisions && (
            <ChapterSection title="Key design decisions" className="lg:order-2">
              <ul className="max-w-prose divide-y divide-line border-y border-line">
                {content.decisions.map((item) => (
                  <li key={item} className="py-3 leading-relaxed text-ink">
                    {item}
                  </li>
                ))}
              </ul>
            </ChapterSection>
          )}
          {scenes.length > 0 && (
            <div className="space-y-4 lg:order-1">
              {scenes.map((scene) => (
                <DummyMapPanel key={scene} sceneKey={scene} />
              ))}
            </div>
          )}
        </div>
      )}

      {cases.length > 0 && (
        <CaseGrid
          title="Cases touching this question"
          cases={cases}
          linkApplication
          currentQuestion={id}
        />
      )}

      <RelatedQuestions ids={content.relatedQuestions} />
    </article>
  );
}
