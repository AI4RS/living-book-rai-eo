import CrossLink from "./CrossLink";

// One case from content/cases.js. On application pages it links out to the
// questions it touches; on question pages it links back to its application.
export default function CaseCard({ item, linkQuestions = true, linkApplication = false, currentQuestion }) {
  const questions = item.questions.filter((q) => q !== currentQuestion);
  const showApplication = linkApplication && item.application;
  const showQuestions = linkQuestions && questions.length > 0;

  return (
    <article className="card card-interactive flex flex-col p-5">
      <h4 className="font-serif text-lg font-semibold leading-snug text-ink">{item.title}</h4>
      <p className="mt-2 text-sm leading-relaxed text-muted">{item.context}</p>
      <p className="callout callout-risk mt-4">
        <span className="font-semibold text-risk">Risk:</span> {item.risk}
      </p>
      <p className="callout callout-safe mt-2">
        <span className="font-semibold text-safe">Responsible move:</span> {item.move}
      </p>
      {(showApplication || showQuestions) && (
        <div className="mt-auto space-y-2 pt-4">
          {showApplication && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-muted">Application:</span>
              <CrossLink application={item.application} />
            </div>
          )}
          {showQuestions && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-muted">
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

// Cases sit on a light gray band to separate them from the chapter prose.
export function CaseGrid({ cases, title, ...cardProps }) {
  return (
    <section className="border border-line bg-subtle p-4 md:p-6">
      {title && <h3 className="section-label mb-4">{title}</h3>}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {cases.map((item) => (
          <CaseCard key={item.id} item={item} {...cardProps} />
        ))}
      </div>
    </section>
  );
}
