import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/class-names";

const badgeStyles = cva("inline-flex w-fit items-center gap-1 whitespace-nowrap font-display font-bold", {
  variants: {
    variant: {
      brand: "rounded-sm bg-brand px-2.5 py-1 text-caption text-on-brand",
      soft: "rounded-sm bg-surface-raised px-2.5 py-1 text-caption text-brand-strong",
      success: "rounded-sm bg-surface-raised px-2.5 py-1 text-caption text-success",
      tag: "rounded-[6px] border border-line bg-surface px-2 py-1 font-body text-caption font-semibold text-ink",
    },
  },
  defaultVariants: { variant: "soft" },
});

export function Badge({
  variant,
  className,
  children,
}: VariantProps<typeof badgeStyles> & { className?: string; children: React.ReactNode }) {
  return <span className={cn(badgeStyles({ variant }), className)}>{children}</span>;
}
