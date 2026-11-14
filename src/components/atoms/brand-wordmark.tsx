import { cn } from "@/lib/class-names";

type BrandWordmarkProps = { lead: string; accent: string; isOnPanel?: boolean; className?: string };

export function BrandWordmark({ lead, accent, isOnPanel = false, className }: BrandWordmarkProps) {
  return (
    <span className={cn("font-display font-extrabold tracking-[-0.02em]", className)}>
      {lead}
      <span className={isOnPanel ? "text-brand" : "text-accent-text"}>{accent}</span>
    </span>
  );
}
