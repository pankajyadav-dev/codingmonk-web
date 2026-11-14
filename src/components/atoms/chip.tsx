import type { ComponentProps } from "react";
import { cn } from "@/lib/class-names";

export function Chip({ isSelected, className, ...buttonProps }: ComponentProps<"button"> & { isSelected: boolean }) {
  return (
    <button
      type="button"
      aria-pressed={isSelected}
      className={cn(
        "min-h-10 rounded-full border px-4 py-1.5 text-body-sm font-semibold transition-colors",
        isSelected ? "border-ink bg-ink text-background" : "border-line bg-background text-ink hover:border-brand",
        className,
      )}
      {...buttonProps}
    />
  );
}
