import { PenLine } from "lucide-react";

export default function DraftBanner({ note }) {
  return (
    <div className="callout callout-warn flex items-start gap-3">
      <PenLine className="mt-0.5 h-4 w-4 shrink-0 text-warn" />
      <div>
        <p className="font-semibold text-warn">Draft, content in progress</p>
        {note && <p className="mt-1">{note}</p>}
      </div>
    </div>
  );
}
