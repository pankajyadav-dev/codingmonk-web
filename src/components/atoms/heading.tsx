import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/class-names";
import { AccentedText } from "./accented-text";

const headingStyles = cva("font-display font-extrabold text-ink", {
  variants: {
    size: {
      "display-xl": "text-display-xl",
      "display-lg": "text-display-lg",
      "display-md": "text-display-md font-bold",
      "heading-lg": "text-heading-lg font-bold tracking-[-0.015em]",
      "heading-md": "text-heading-md font-bold tracking-[-0.01em]",
      "heading-sm": "text-heading-sm font-bold",
    },
  },
  defaultVariants: { size: "display-md" },
});

type HeadingProps = VariantProps<typeof headingStyles> & {
  as?: "h1" | "h2" | "h3" | "h4";
  markedText: string;
  className?: string;
  id?: string;
  isOnPanel?: boolean;
};

export function Heading({ as: Tag = "h2", size, markedText, className, id, isOnPanel = false }: HeadingProps) {
  return (
    <Tag id={id} className={cn(headingStyles({ size }), isOnPanel && "text-panel-ink", className)}>
      <AccentedText markedText={markedText} isOnPanel={isOnPanel} />
    </Tag>
  );
}
