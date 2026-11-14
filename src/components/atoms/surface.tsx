import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/class-names";

const surfaceStyles = cva("rounded-lg border", {
  variants: {
    tone: {
      plain: "border-line bg-background",
      soft: "border-line bg-surface",
      highlighted: "border-brand bg-background shadow-[0_0_0_3px_var(--brand-glow)]",
      panel: "border-transparent bg-panel text-panel-ink",
      brand: "border-transparent bg-brand text-on-brand",
    },
    padding: { none: "", md: "p-5 lg:p-6", lg: "p-6 lg:p-8" },
  },
  defaultVariants: { tone: "plain", padding: "md" },
});

type SurfaceProps = VariantProps<typeof surfaceStyles> & {
  as?: "div" | "article" | "li" | "aside" | "figure";
  className?: string;
  children: React.ReactNode;
};

export function Surface({ as: Tag = "div", tone, padding, className, children }: SurfaceProps) {
  return <Tag className={cn(surfaceStyles({ tone, padding }), className)}>{children}</Tag>;
}
