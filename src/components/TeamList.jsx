import { ExternalLink } from "lucide-react";

// Grid of people (content/team.js): name, role in the book, affiliation, and
// an optional link. Used on Home; reusable on a future "Who we are" tab.
export default function TeamList({ people }) {
  return (
    <ul className="grid gap-6 md:grid-cols-3">
      {people.map((person, index) => (
        <li key={`${person.name}-${index}`} className="card flex flex-col p-6">
          <p className="font-serif text-xl text-ink">{person.name}</p>
          <p className="mt-1 text-sm font-semibold text-accent">{person.role}</p>
          <p className="mt-1 text-sm leading-relaxed text-muted">{person.affiliation}</p>
          {person.link &&
            (person.link.href ? (
              <a
                href={person.link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="link mt-2 inline-flex min-h-11 items-center gap-1 self-start text-sm"
              >
                {person.link.label}
                <ExternalLink className="h-3 w-3" aria-hidden="true" />
              </a>
            ) : (
              <p className="mt-2 inline-flex min-h-11 items-center text-sm text-muted">
                {person.link.label}
              </p>
            ))}
        </li>
      ))}
    </ul>
  );
}
