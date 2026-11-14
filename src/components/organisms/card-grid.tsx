import { cn } from "@/lib/class-names";

const minimumCardWidth = {
  sm: "minmax(min(240px,100%),1fr)",
  md: "minmax(min(300px,100%),1fr)",
  lg: "minmax(min(340px,100%),1fr)",
} as const;

type CardGridProps = {
  minimumCardSize?: keyof typeof minimumCardWidth;
  className?: string;
  children: React.ReactNode;
  as?: "ul" | "ol" | "div";
};

export function CardGrid({ minimumCardSize = "md", className, children, as: Tag = "ul" }: CardGridProps) {
  return (
    <Tag
      className={cn("grid gap-3 lg:gap-5 *:min-w-0", className)}
      style={{ gridTemplateColumns: `repeat(auto-fill, ${minimumCardWidth[minimumCardSize]})` }}
    >
      {children}
    </Tag>
  );
}
