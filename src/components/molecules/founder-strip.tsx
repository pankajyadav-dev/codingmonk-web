import { AppLink } from "@/components/atoms/app-link";
import { Avatar } from "@/components/atoms/avatar";
import type { Founder } from "@/content/schemas";
import { cn } from "@/lib/class-names";

type FounderStripProps = { founders: Founder[]; title: string; description: string; href?: string };

export function FounderStrip({ founders, title, description, href }: FounderStripProps) {
  const content = (
    <>
      <span className="flex shrink-0">
        {founders.map((founder, founderIndex) => (
          <Avatar
            key={founder.id}
            name={founder.name}
            photoSrc={founder.photo.src}
            size="md"
            className={cn("border-[3px] border-background", founderIndex > 0 && "-ml-3.5")}
          />
        ))}
      </span>
      <span className="grid min-w-0 gap-0.5">
        <span className="font-display text-body-sm font-bold text-ink">{title}</span>
        <span className="text-body-sm text-muted">{description}</span>
      </span>
    </>
  );
  const stripStyles =
    "flex w-fit max-w-full items-center gap-3.5 rounded-2xl border border-line bg-background py-2.5 pr-5 pl-2.5 sm:rounded-full";
  if (founders.length === 0) return null;
  return href ? (
    <AppLink href={href} className={cn(stripStyles, "transition-colors hover:border-brand")}>
      {content}
    </AppLink>
  ) : (
    <div className={stripStyles}>{content}</div>
  );
}
