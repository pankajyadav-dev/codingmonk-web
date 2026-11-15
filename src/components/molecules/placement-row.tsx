import type { Placement } from "@/content/schemas";
import { fillTemplate, formatPackageLpa } from "@/lib/format";

export function PlacementRow({ placement, placedAtLabel }: { placement: Placement; placedAtLabel: string }) {
  return (
    <li className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-6 border-b border-dashed border-panel-line px-5 py-4 last:border-b-0">
      <span className="min-w-0">
        <span className="font-bold text-panel-ink">{placement.studentName}</span>
        <span className="block text-panel-muted">
          {fillTemplate(placedAtLabel, { company: placement.companyName })}
        </span>
      </span>
      <span className="font-display text-heading-md font-extrabold whitespace-nowrap text-brand tabular-nums">
        {formatPackageLpa(placement.packageLpa)}
      </span>
    </li>
  );
}
