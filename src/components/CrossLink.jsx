import { ArrowRight } from "lucide-react";
import {
  PAGES,
  applicationHref,
  findApplication,
  findQuestion,
  questionHref,
} from "../config/navigation";

// Inline link chip to another page. Pass either `question` or `application`.
export default function CrossLink({ question, application }) {
  const target = question ? findQuestion(question) : findApplication(application);
  if (!target) return null;
  const href = question ? questionHref(question) : applicationHref(application);
  const kind = question ? PAGES.questions.label : PAGES.applications.label;

  return (
    <a
      href={href}
      title={`${kind}: ${target.label}`}
      className="inline-flex min-h-9 items-center gap-1 border border-line-strong bg-surface px-2.5 py-1.5 text-xs font-medium text-accent transition-colors hover:border-accent hover:bg-accent-tint"
    >
      {target.label}
      {target.status === "draft" && <span className="text-muted">(draft)</span>}
      <ArrowRight className="h-3 w-3" aria-hidden="true" />
    </a>
  );
}

// Card-sized link used in "Go deeper" blocks.
export function CrossLinkCard({ question, application, description }) {
  const target = question ? findQuestion(question) : findApplication(application);
  if (!target) return null;
  const href = question ? questionHref(question) : applicationHref(application);
  const kind = question ? PAGES.questions.label : PAGES.applications.label;

  return (
    <a href={href} className="card card-interactive group block p-4">
      <p className="section-label">
        {kind}
        {target.status === "draft" && <span className="text-warn"> · draft</span>}
      </p>
      <p className="mt-1 flex items-center gap-1 font-semibold text-accent group-hover:text-accent-hover">
        {target.label}
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </p>
      {description && <p className="mt-1 text-sm text-muted">{description}</p>}
    </a>
  );
}
