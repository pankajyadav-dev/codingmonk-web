import { ButtonLink } from "@/components/atoms/button";
import { Eyebrow } from "@/components/atoms/eyebrow";
import { Heading } from "@/components/atoms/heading";
import type { CtaBandCopy } from "@/content/schemas";

export function CtaBand({ copy }: { copy: CtaBandCopy }) {
  return (
    <div className="relative grid gap-7 overflow-hidden rounded-2xl border border-transparent bg-panel p-7 dark:border-line text-panel-ink lg:grid-cols-[minmax(0,1.4fr)_auto] lg:items-center lg:p-14">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-24 size-96 rounded-full bg-[radial-gradient(closest-side,var(--brand-glow),transparent)]"
      />
      <div className="relative grid gap-3">
        <Eyebrow tone="panel">{copy.eyebrow}</Eyebrow>
        <Heading markedText={copy.heading} isOnPanel />
        <p className="max-w-[56ch] text-body-lg text-panel-muted">{copy.description}</p>
      </div>
      <div className="relative flex flex-wrap gap-3">
        <ButtonLink href={copy.primaryCta.href}>{copy.primaryCta.label} →</ButtonLink>
        <ButtonLink href={copy.secondaryCta.href} variant="onPanel">
          {copy.secondaryCta.label}
        </ButtonLink>
      </div>
    </div>
  );
}
