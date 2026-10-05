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
      className="inline-flex items-center gap-1 rounded-lg border border-slate-700 bg-slate-800/70 px-2.5 py-1 text-xs font-medium text-slate-200 transition hover:border-emerald-500 hover:text-emerald-200"
    >
      {target.label}
      {target.status === "draft" && <span className="text-amber-300/80">(draft)</span>}
      <ArrowRight className="h-3 w-3" />
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
    <a
      href={href}
      className="group block rounded-xl border border-slate-700 bg-slate-800/60 p-4 transition hover:border-emerald-500"
    >
      <p className="text-xs uppercase tracking-wide text-slate-400">
        {kind}
        {target.status === "draft" && <span className="text-amber-300/80"> · draft</span>}
      </p>
      <p className="mt-1 flex items-center gap-1 font-semibold text-slate-100 group-hover:text-emerald-200">
        {target.label}
        <ArrowRight className="h-4 w-4" />
      </p>
      {description && <p className="mt-1 text-sm text-slate-400">{description}</p>}
    </a>
  );
}
