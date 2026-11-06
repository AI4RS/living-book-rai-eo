import ChapterSection, { ChapterHeader } from "../components/ChapterSection";
import DraftBanner from "../components/DraftBanner";
import SourceNote from "../components/SourceNote";
import { CHAPTER_SECTIONS, PAGES, SUB_TABS } from "../config/navigation";
import { CONTRIBUTORS } from "../content/contributors";
import { LIFECYCLE_SOURCE } from "../content/lifecycle";

// One template for every Lifecycle, Principles and Applications chapter: the
// title, a draft banner, and the part's shared section outline from
// config/navigation.js, each with a placeholder until it is written. The first
// Lifecycle stage also carries the note on where the lifecycle comes from.
export default function ChapterPage({ page, sub }) {
  const tabs = SUB_TABS[page];
  const tab = tabs.find((t) => t.id === sub);
  const showLifecycleSource = page === PAGES.lifecycle.id && tab === tabs[0];

  return (
    <article className="space-y-10">
      {showLifecycleSource && <SourceNote source={LIFECYCLE_SOURCE} />}
      <DraftBanner note="Only the section outline is in place." />
      <ChapterHeader
        title={tab.label}
        note={tab.nist && `NIST AI RMF stage: ${tab.nist}`}
        contributor={CONTRIBUTORS[tab.contributor]}
        lead={tab.tagline}
      />
      {CHAPTER_SECTIONS[page].map((title) => (
        <ChapterSection key={title} title={title} intro="To be written." />
      ))}
    </article>
  );
}
