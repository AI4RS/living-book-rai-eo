import { PenLine } from "lucide-react";

export default function DraftBanner({ note }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-amber-700/40 bg-amber-900/20 p-4 text-amber-100">
      <PenLine className="mt-0.5 h-4 w-4 shrink-0" />
      <div className="text-sm">
        <p className="font-semibold">Draft, content in progress</p>
        {note && <p className="mt-1 text-amber-100/80">{note}</p>}
      </div>
    </div>
  );
}
