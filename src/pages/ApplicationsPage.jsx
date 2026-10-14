import { CaseGrid } from "../components/CaseCard";
import { ChapterHeader } from "../components/ChapterSection";
import DraftBanner from "../components/DraftBanner";
import RelatedQuestions from "../components/RelatedQuestions";
import { PAGES, findApplication } from "../config/navigation";
import { APPLICATION_CONTENT } from "../content/applications";
import { casesForApplication } from "../content/cases";
import AgricultureApplication from "./AgricultureApplication";

const BUILT_PAGES = {
  agriculture: AgricultureApplication,
};

export default function ApplicationsPage({ sub }) {
  const Built = BUILT_PAGES[sub];
  return Built ? <Built /> : <ApplicationDraft id={sub} />;
}

function ApplicationDraft({ id }) {
  const tab = findApplication(id);
  const content = APPLICATION_CONTENT[id];
  const cases = casesForApplication(id);

  return (
    <article className="space-y-10">
      <DraftBanner note="Domain framing is still to be written. The cases below are a starting point." />
      <ChapterHeader kicker={PAGES.applications.label} title={tab.label} lead={content.intro} />
      {cases.length > 0 && <CaseGrid title="Cases" cases={cases} />}
      <RelatedQuestions
        ids={content.relatedQuestions}
        title="Questions this domain touches"
      />
    </article>
  );
}
