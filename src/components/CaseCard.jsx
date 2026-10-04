import CrossLink from "./CrossLink";

// One case from content/cases.js. On application pages it links out to the
// questions it touches; on question pages it links back to its application.
export default function CaseCard({ item, linkQuestions = true, linkApplication = false, currentQuestion }) {
  const questions = item.questions.filter((q) => q !== currentQuestion);
  const showApplication = linkApplication && item.application;
  const showQuestions = linkQuestions && questions.length > 0;

  return (
    <article className="flex flex-col rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-emerald-300">
        {item.title}
      </h3>
      <p className="mt-3 text-sm text-slate-300">{item.context}</p>
      <p className="mt-3 rounded-lg border border-rose-700/40 bg-rose-900/20 p-3 text-sm text-rose-100">
        <span className="font-semibold">Risk:</span> {item.risk}
      </p>
      <p className="mt-3 rounded-lg border border-emerald-700/40 bg-emerald-900/20 p-3 text-sm text-emerald-100">
        <span className="font-semibold">Responsible move:</span> {item.move}
      </p>
      {(showApplication || showQuestions) && (
        <div className="mt-auto space-y-2 pt-4">
          {showApplication && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-slate-500">Application:</span>
              <CrossLink application={item.application} />
            </div>
          )}
          {showQuestions && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-slate-500">
                {linkApplication ? "Also touches:" : "Touches:"}
              </span>
              {questions.map((q) => (
                <CrossLink key={q} question={q} />
              ))}
            </div>
          )}
        </div>
      )}
    </article>
  );
}

export function CaseGrid({ cases, ...cardProps }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {cases.map((item) => (
        <CaseCard key={item.id} item={item} {...cardProps} />
      ))}
    </div>
  );
}
