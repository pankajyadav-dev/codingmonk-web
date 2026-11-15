import { PlacementRow } from "@/components/molecules/placement-row";
import type { Placement } from "@/content/schemas";

type PlacementRecordLabels = { title: string; packageLabel: string; placedAtLabel: string };

export function PlacementRecord({ placements, labels }: { placements: Placement[]; labels: PlacementRecordLabels }) {
  return (
    <div className="overflow-hidden rounded-xl bg-panel text-panel-ink">
      <div className="flex items-center justify-between gap-4 border-b border-panel-line px-5 py-3.5">
        <p className="font-display text-body font-bold">{labels.title}</p>
        <p className="text-caption font-semibold text-panel-success">{labels.packageLabel}</p>
      </div>
      <ul>
        {placements.map((placement) => (
          <PlacementRow
            key={`${placement.studentName}-${placement.companyName}`}
            placement={placement}
            placedAtLabel={labels.placedAtLabel}
          />
        ))}
      </ul>
    </div>
  );
}
