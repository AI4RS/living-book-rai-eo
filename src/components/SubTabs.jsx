import { useEffect, useRef } from "react";
import { hrefFor } from "../config/navigation";

// Text-tab row shown under the active main page. Scrolls horizontally on
// narrow screens, keeping the active tab in view.
export default function SubTabs({ page, tabs, active }) {
  const activeRef = useRef(null);

  useEffect(() => {
    activeRef.current?.scrollIntoView({ block: "nearest", inline: "center" });
  }, [page, active]);

  return (
    <div className="flex gap-6 overflow-x-auto">
      {tabs.map((tab) => (
        <a
          key={tab.id}
          ref={active === tab.id ? activeRef : undefined}
          href={hrefFor(page, tab.id)}
          aria-current={active === tab.id ? "page" : undefined}
          className="tab"
        >
          {tab.label}
          {tab.status === "draft" && (
            <span className="ml-1.5 text-[10px] font-normal uppercase tracking-wide text-muted">
              draft
            </span>
          )}
        </a>
      ))}
    </div>
  );
}
