import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/class-names";

const textStyles = cva("", {
  variants: {
    size: { lg: "text-body-lg", md: "text-body", sm: "text-body-sm", caption: "text-caption" },
    tone: {
      ink: "text-ink",
      muted: "text-muted",
      panel: "text-panel-ink",
      panelMuted: "text-panel-muted",
      danger: "text-danger",
    },
    measure: { readable: "max-w-[64ch]", none: "" },
  },
  defaultVariants: { size: "md", tone: "muted", measure: "none" },
});

type TextProps = VariantProps<typeof textStyles> & { children: React.ReactNode; className?: string; as?: "p" | "span" };

export function Text({ as: Tag = "p", size, tone, measure, className, children }: TextProps) {
  return <Tag className={cn(textStyles({ size, tone, measure }), className)}>{children}</Tag>;
}
