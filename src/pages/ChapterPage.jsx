import ChapterSection, { ChapterHeader } from "../components/ChapterSection";
import DraftBanner from "../components/DraftBanner";
import { CHAPTER_SECTIONS, SUB_TABS } from "../config/navigation";
import { CONTRIBUTORS } from "../content/contributors";

// One template for every Lifecycle, Principles and Applications chapter: the
// title, a draft banner, and the part's shared section outline from
// config/navigation.js, each with a placeholder until it is written.
export default function ChapterPage({ page, sub }) {
  const tab = SUB_TABS[page].find((t) => t.id === sub);

  return (
    <article className="space-y-10">
      <DraftBanner note="Only the section outline is in place." />
      <ChapterHeader title={tab.label} contributor={CONTRIBUTORS[tab.contributor]} />
      {CHAPTER_SECTIONS[page].map((title) => (
        <ChapterSection key={title} title={title} intro="To be written." />
      ))}
    </article>
  );
}
