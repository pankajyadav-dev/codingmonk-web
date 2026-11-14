import Image from "next/image";
import { ButtonLink } from "@/components/atoms/button";
import type { Founder } from "@/content/schemas";

export function FounderCard({ founder }: { founder: Founder }) {
  return (
    <article className="grid h-full gap-5 rounded-2xl border border-line bg-background p-3.5 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] sm:items-end lg:p-5">
      <div className="relative aspect-[4/5] overflow-hidden rounded-lg border border-line bg-surface-raised">
        <Image
          src={founder.photo.src}
          alt={founder.photo.alt}
          fill
          sizes="(min-width: 1024px) 22vw, (min-width: 640px) 40vw, 90vw"
          className="object-cover"
        />
        <span className="absolute bottom-3 left-3 rounded-sm bg-panel px-2.5 py-1 text-caption font-semibold text-panel-ink">
          {founder.badgeLabel}
        </span>
      </div>
      <div className="grid gap-2.5 pb-2">
        <p className="text-caption font-bold text-brand-strong">{founder.role}</p>
        <h3 className="font-display text-heading-lg font-bold">{founder.name}</h3>
        <p className="text-body text-muted">{founder.shortBio}</p>
        <div className="flex flex-wrap gap-2.5 pt-1">
          {founder.links.map((link) => (
            <ButtonLink key={link.url} href={link.url} variant="secondary" size="sm">
              {link.label}
            </ButtonLink>
          ))}
        </div>
      </div>
    </article>
  );
}
