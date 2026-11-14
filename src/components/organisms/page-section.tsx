import { cn } from "@/lib/class-names";

export type SectionTone = "plain" | "soft";

type PageSectionProps = {
  id?: string;
  tone?: SectionTone;
  labelledBy?: string;
  className?: string;
  children: React.ReactNode;
};

export function PageSection({ id, tone = "plain", labelledBy, className, children }: PageSectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(
        "w-full scroll-mt-20 px-gutter py-section",
        tone === "soft" ? "bg-surface" : "bg-background",
        className,
      )}
    >
      {children}
    </section>
  );
}
