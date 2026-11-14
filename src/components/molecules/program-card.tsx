import { AppLink } from "@/components/atoms/app-link";
import { Badge } from "@/components/atoms/badge";
import type { Program } from "@/content/schemas";

type ProgramCardProps = { program: Program; kindLabel: string; linkLabel: string; hoursLabel: string };

export function ProgramCard({ program, kindLabel, linkLabel, hoursLabel }: ProgramCardProps) {
  return (
    <AppLink
      href={`/programs/${program.slug}`}
      className="group flex h-full flex-col gap-3 rounded-xl border border-line bg-background p-5 transition-[transform,border-color] duration-150 hover:-translate-y-1 hover:border-brand lg:p-7"
    >
      <span className="flex flex-wrap items-center justify-between gap-2">
        <Badge variant={program.kind === "core" ? "brand" : "soft"}>{program.durationLabel}</Badge>
        <span className="text-caption font-bold text-brand-strong uppercase tracking-[0.08em]">{kindLabel}</span>
      </span>
      <span className="font-display text-heading-lg font-bold text-ink">{program.title}</span>
      <span className="text-body text-muted">{program.summary}</span>
      <span className="flex flex-wrap gap-x-4 gap-y-1 text-body-sm font-semibold text-muted">
        <span>{program.audienceLabel}</span>
        <span>{program.semesterLabel}</span>
        <span>
          {program.totalHours} {hoursLabel}
        </span>
      </span>
      <span className="mt-auto pt-2 font-display text-body-sm font-bold text-brand-strong group-hover:underline">
        {linkLabel} →
      </span>
    </AppLink>
  );
}
