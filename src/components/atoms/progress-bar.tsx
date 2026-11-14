import { cn } from "@/lib/class-names";

export function ProgressBar({
  percentComplete,
  label,
  className,
}: {
  percentComplete: number;
  label: string;
  className?: string;
}) {
  const clampedPercent = Math.min(100, Math.max(0, percentComplete));
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuenow={clampedPercent}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn("h-1.5 overflow-hidden rounded-full bg-line", className)}
    >
      <div
        className="h-full rounded-full bg-linear-to-r from-brand to-brand-secondary"
        style={{ width: `${clampedPercent}%` }}
      />
    </div>
  );
}
