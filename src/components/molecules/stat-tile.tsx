import { Badge } from "@/components/atoms/badge";
import type { Stat } from "@/content/schemas";
import { formatIndianNumber } from "@/lib/format";

export function StatTile({ stat, sampleBadgeLabel }: { stat: Stat; sampleBadgeLabel: string }) {
  return (
    <div className="flex h-full flex-col gap-2 rounded-lg border border-line bg-background p-5 lg:p-7">
      <p className="font-display text-stat font-extrabold tracking-[-0.03em] text-ink tabular-nums">
        {formatIndianNumber(stat.value)}
        {stat.suffix ? <span className="ml-0.5 text-[0.45em] text-brand-strong">{stat.suffix}</span> : null}
      </p>
      <p className="text-body text-ink">{stat.label}</p>
      <p className="mt-auto flex flex-wrap items-center gap-2 text-caption text-muted">
        {stat.footnote}
        {stat.isSample ? <Badge variant="sample">{sampleBadgeLabel}</Badge> : null}
      </p>
    </div>
  );
}
