import { cn } from "@/lib/class-names";

export function Eyebrow({
  children,
  className,
  tone = "brand",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "brand" | "panel";
}) {
  return (
    <p
      className={cn(
        "font-body text-eyebrow font-bold uppercase",
        tone === "brand" ? "text-brand-strong" : "text-panel-muted",
        className,
      )}
    >
      {children}
    </p>
  );
}
