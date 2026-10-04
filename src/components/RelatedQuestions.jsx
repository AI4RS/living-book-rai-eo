import ChapterSection from "./ChapterSection";
import CrossLink from "./CrossLink";

export default function RelatedQuestions({ ids, title = "Related questions" }) {
  if (!ids?.length) return null;
  return (
    <ChapterSection title={title}>
      <div className="flex flex-wrap gap-2">
        {ids.map((q) => (
          <CrossLink key={q} question={q} />
        ))}
      </div>
    </ChapterSection>
  );
}
