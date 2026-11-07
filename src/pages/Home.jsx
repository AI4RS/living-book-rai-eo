import { ArrowRight, BookOpen, Map, RefreshCw } from "lucide-react";
import ChapterSection from "../components/ChapterSection";
import TeamList from "../components/TeamList";
import { EXTERNAL_LINKS, PAGES, hrefFor } from "../config/navigation";
import { WHO_WE_ARE } from "../content/team";

const ENTRIES = [
  { page: PAGES.lifecycle, icon: RefreshCw },
  { page: PAGES.principles, icon: BookOpen },
  { page: PAGES.applications, icon: Map },
];

function EntryCard({ page, icon: Icon }) {
  return (
    <a href={hrefFor(page.id)} className="card card-interactive flex flex-col p-6">
      <div className="flex items-center gap-2">
        <Icon className="h-5 w-5 text-accent" aria-hidden="true" />
        <h3 className="font-serif text-2xl text-ink">{page.label}</h3>
      </div>
      <p className="mt-3 leading-relaxed text-muted">{page.tagline}</p>
      <span className="link mt-4 inline-flex items-center gap-1 text-sm font-semibold">
        Open {page.label}
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </span>
    </a>
  );
}

export default function Home() {
  return (
    <article className="space-y-10">
      <ChapterSection
        title="What Responsible AI in EO is"
        intro="To be written."
        className="border-t-0 pt-0"
      />
      <ChapterSection title="Why it matters" intro="To be written." />
      <ChapterSection title="How to read the book">
        <div className="grid gap-6 md:grid-cols-3">
          {ENTRIES.map((entry) => (
            <EntryCard key={entry.page.id} {...entry} />
          ))}
        </div>
      </ChapterSection>
      <ChapterSection title={WHO_WE_ARE.title} intro={WHO_WE_ARE.intro}>
        <TeamList people={WHO_WE_ARE.people} />
        <p className="mt-6 max-w-prose text-muted">
          {WHO_WE_ARE.contribute.text}{" "}
          <a
            href={EXTERNAL_LINKS.contributing}
            target="_blank"
            rel="noopener noreferrer"
            className="link"
          >
            {WHO_WE_ARE.contribute.linkLabel}
          </a>
          .
        </p>
      </ChapterSection>
    </article>
  );
}
