import type { Placement } from "@/content/schemas";
import { formatPackageLpa } from "@/lib/format";

export function PlacementRow({ placement }: { placement: Placement }) {
  return (
    <li className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-6 gap-y-1 border-b border-dashed border-panel-line px-5 py-4 last:border-b-0 sm:grid-cols-[110px_minmax(0,1fr)_auto]">
      <span className="col-span-2 text-caption font-bold text-brand sm:col-span-1">
        {placement.branch} {placement.batchYear}
      </span>
      <span className="min-w-0">
        <span className="font-bold text-panel-ink">{placement.studentName}</span>
        <span className="text-panel-muted"> · {placement.collegeName}</span>
        <span className="block text-panel-ink">
          {placement.role} at {placement.companyName}
        </span>
      </span>
      <span className="font-display text-heading-md font-extrabold whitespace-nowrap text-brand tabular-nums">
        {formatPackageLpa(placement.packageLpa)}
      </span>
    </li>
  );
}
