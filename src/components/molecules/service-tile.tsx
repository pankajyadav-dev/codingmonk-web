import type { Service } from "@/content/schemas";
import { cn } from "@/lib/class-names";

const tileTone = {
  feature: "bg-panel text-panel-ink border-transparent",
  highlight: "bg-brand text-on-brand border-transparent",
  standard: "bg-background text-ink border-line",
} as const;

const labelTone = { feature: "text-brand", highlight: "text-on-brand", standard: "text-brand-strong" } as const;
const descriptionTone = { feature: "text-panel-muted", highlight: "text-on-brand", standard: "text-muted" } as const;

export function ServiceTile({
  service,
  className,
  children,
}: {
  service: Service;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <article
      className={cn(
        "flex h-full min-w-0 flex-col gap-2 rounded-xl border p-5 lg:p-7",
        tileTone[service.variant],
        className,
      )}
    >
      <p className={cn("text-caption font-bold", labelTone[service.variant])}>{service.label}</p>
      <h3 className="font-display text-heading-md font-bold tracking-[-0.01em]">{service.title}</h3>
      <p className={cn("text-body", descriptionTone[service.variant])}>{service.description}</p>
      {children}
    </article>
  );
}
