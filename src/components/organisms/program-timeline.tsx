import { AppLink } from "@/components/atoms/app-link";
import type { Program } from "@/content/schemas";
import { cn } from "@/lib/class-names";
import { fillTemplate } from "@/lib/format";

type ProgramTimelineProps = {
  corePrograms: Program[];
  finishLabel: string;
  finishNodeLabel: string;
  columnLabels: { monthsBefore: string; oneMonthBefore: string };
};

function buildColumnLabels(columnCount: number, columnLabels: ProgramTimelineProps["columnLabels"]) {
  return Array.from({ length: columnCount }, (_, columnIndex) => {
    const monthsBefore = columnCount - columnIndex;
    return monthsBefore === 1
      ? columnLabels.oneMonthBefore
      : fillTemplate(columnLabels.monthsBefore, { count: monthsBefore });
  });
}

export function ProgramTimeline({ corePrograms, finishLabel, finishNodeLabel, columnLabels }: ProgramTimelineProps) {
  const lanes = corePrograms.filter((program) => program.timelineMilestones.length > 0);
  const columnCount = Math.max(...lanes.map((program) => program.timelineMilestones.length));
  if (lanes.length === 0) return null;
  const laneGridStyle = {
    gridTemplateColumns: `clamp(180px,16vw,240px) repeat(${columnCount + 1}, minmax(110px,1fr))`,
  };
  return (
    <div className="grid gap-2.5 overflow-x-auto pb-1">
      <div aria-hidden="true" className="grid min-w-[900px] max-md:hidden" style={laneGridStyle}>
        <span />
        {buildColumnLabels(columnCount, columnLabels).map((columnLabel) => (
          <span key={columnLabel} className="pb-1.5 text-caption font-semibold text-muted">
            {columnLabel}
          </span>
        ))}
        <span className="pb-1.5 text-caption font-bold text-brand-strong">{finishLabel}</span>
      </div>
      <ol className="grid gap-2.5">
        {lanes.map((program) => {
          const emptyColumns = columnCount - program.timelineMilestones.length;
          return (
            <li key={program.slug}>
              <AppLink
                href={`/programs/${program.slug}`}
                className="grid gap-4 rounded-lg border border-line bg-background p-4 transition-colors hover:border-brand md:min-w-[900px] md:gap-0 md:py-5 md:pr-0 md:pl-0 md:[grid-template-columns:var(--lane-columns)]"
                style={{ "--lane-columns": laneGridStyle.gridTemplateColumns } as React.CSSProperties}
              >
                <span className="grid content-start gap-0.5 border-line md:border-r md:border-dashed md:px-4">
                  <span className="font-display text-heading-sm font-bold">{program.title}</span>
                  <span className="text-body-sm text-muted">{program.audienceLabel}</span>
                </span>
                {Array.from({ length: emptyColumns }, (_, emptyIndex) => (
                  <span
                    // biome-ignore lint/suspicious/noArrayIndexKey: placeholder columns have no identity
                    key={emptyIndex}
                    aria-hidden="true"
                    className="relative max-md:hidden before:absolute before:inset-x-0 before:top-[15px] before:h-[3px] before:bg-[repeating-linear-gradient(90deg,var(--line)_0_6px,transparent_6px_12px)]"
                  />
                ))}
                {program.timelineMilestones.map((milestone, milestoneIndex) => (
                  <span
                    key={milestone.shortLabel}
                    className={cn(
                      "relative flex items-center gap-3 md:grid md:content-start md:gap-2 md:px-3 md:pl-3.5",
                      "md:before:absolute md:before:top-[15px] md:before:right-0 md:before:h-[3px] md:before:bg-brand/55",
                      milestoneIndex === 0 ? "md:before:left-3.5" : "md:before:left-0",
                    )}
                  >
                    <span className="relative z-10 grid h-8 min-w-[34px] shrink-0 place-items-center justify-self-start rounded-full border-[3px] border-brand bg-background px-1.5 text-[0.7rem] font-bold text-brand-strong">
                      {milestone.shortLabel}
                    </span>
                    <span className="text-body-sm text-muted">{milestone.title}</span>
                  </span>
                ))}
                <span className="relative flex items-center gap-3 md:grid md:content-start md:gap-2 md:pl-3.5">
                  <span className="relative z-10 grid size-8 shrink-0 place-items-center justify-self-start rounded-full bg-brand text-body-sm font-bold text-on-brand">
                    ✓
                  </span>
                  <span className="text-body-sm font-bold text-ink">{finishNodeLabel}</span>
                </span>
              </AppLink>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
