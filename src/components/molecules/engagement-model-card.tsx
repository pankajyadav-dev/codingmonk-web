import { Check } from "lucide-react";
import { Badge } from "@/components/atoms/badge";
import type { EngagementModel } from "@/content/schemas";
import { cn } from "@/lib/class-names";

export function EngagementModelCard({ engagementModel }: { engagementModel: EngagementModel }) {
  return (
    <article
      className={cn(
        "flex h-full flex-col gap-3 rounded-xl border bg-background p-5 lg:p-7",
        engagementModel.isHighlighted ? "border-brand shadow-[0_0_0_3px_var(--brand-glow)]" : "border-line",
      )}
    >
      <Badge variant={engagementModel.isHighlighted ? "brand" : "soft"}>{engagementModel.badgeLabel}</Badge>
      <h3 className="font-display text-heading-lg font-bold">{engagementModel.title}</h3>
      <p className="text-body text-muted">{engagementModel.description}</p>
      <ul className="grid gap-2 pt-1">
        {engagementModel.points.map((point) => (
          <li key={point} className="flex items-start gap-2.5 text-body">
            <Check aria-hidden="true" className="mt-1 size-4 shrink-0 text-success" />
            {point}
          </li>
        ))}
      </ul>
    </article>
  );
}
