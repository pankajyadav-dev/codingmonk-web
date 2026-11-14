import { Badge } from "@/components/atoms/badge";
import type { BatchResult } from "@/content/schemas";
import { fillTemplate, formatIndianNumber } from "@/lib/format";

type BatchResultLabels = {
  batchYear: string;
  studentsTrained: string;
  offers: string;
  recruiters: string;
  placementBefore: string;
  placementAfter: string;
  placementPercent: string;
};

export function BatchResultCard({ batchResult, labels }: { batchResult: BatchResult; labels: BatchResultLabels }) {
  const figures = [
    { label: labels.studentsTrained, value: batchResult.studentsTrained },
    { label: labels.offers, value: batchResult.offers },
    { label: labels.recruiters, value: batchResult.recruiters },
  ];
  return (
    <article className="flex h-full flex-col gap-5 rounded-xl border border-line bg-background p-5 lg:p-7">
      <div className="grid gap-1.5">
        <Badge variant="soft">{fillTemplate(labels.batchYear, { year: batchResult.batchYear })}</Badge>
        <h3 className="font-display text-heading-md font-bold">{batchResult.collegeName}</h3>
      </div>
      <div className="flex items-end gap-4 font-display tabular-nums">
        <span className="grid gap-1">
          <span className="text-caption font-semibold text-muted">{labels.placementBefore}</span>
          <span className="text-heading-lg font-bold text-muted">{batchResult.placementPercentBefore}%</span>
        </span>
        <span aria-hidden="true" className="pb-1 text-heading-md text-muted">
          →
        </span>
        <span className="grid gap-1">
          <span className="text-caption font-semibold text-brand-strong">{labels.placementAfter}</span>
          <span className="text-stat font-extrabold text-accent-text">{batchResult.placementPercentAfter}%</span>
        </span>
        <span className="pb-1 text-body-sm text-muted">{labels.placementPercent}</span>
      </div>
      <dl className="mt-auto grid grid-cols-3 gap-3 border-t border-line pt-4">
        {figures.map((figure) => (
          <div key={figure.label} className="grid gap-0.5">
            <dt className="text-caption text-muted">{figure.label}</dt>
            <dd className="font-display text-heading-sm font-bold tabular-nums">{formatIndianNumber(figure.value)}</dd>
          </div>
        ))}
      </dl>
    </article>
  );
}
