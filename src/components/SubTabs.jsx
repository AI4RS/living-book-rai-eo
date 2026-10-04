import { hrefFor } from "../config/navigation";

// Sub-tab strip shown under the active main page.
export default function SubTabs({ page, tabs, active }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      {tabs.map((tab) => (
        <a
          key={tab.id}
          href={hrefFor(page, tab.id)}
          aria-current={active === tab.id ? "page" : undefined}
          className={`whitespace-nowrap rounded-lg border px-3 py-1.5 text-xs font-medium transition ${
            active === tab.id
              ? "border-emerald-500 bg-emerald-600/20 text-emerald-200"
              : "border-slate-800 bg-slate-900 text-slate-400 hover:border-slate-500 hover:text-slate-200"
          }`}
        >
          {tab.label}
          {tab.status === "draft" && (
            <span className="ml-1.5 text-[10px] uppercase tracking-wide text-amber-300/70">
              draft
            </span>
          )}
        </a>
      ))}
    </div>
  );
}
