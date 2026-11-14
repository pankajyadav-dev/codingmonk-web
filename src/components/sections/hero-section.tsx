import { ButtonLink } from "@/components/atoms/button";
import { Eyebrow } from "@/components/atoms/eyebrow";
import { Heading } from "@/components/atoms/heading";
import { Text } from "@/components/atoms/text";
import { WhatsappIcon } from "@/components/atoms/whatsapp-icon";
import { FounderStrip } from "@/components/molecules/founder-strip";
import { HeroRing } from "@/components/organisms/hero-ring";
import { foundersContent, sharedUiCopy, siteContent } from "@/content";
import type { SectionOf } from "@/content/schemas";
import { buildWhatsappUrl } from "@/lib/whatsapp";

export function HeroSection({ section }: { section: SectionOf<"hero"> }) {
  const whatsappUrl = buildWhatsappUrl(siteContent.contact.whatsappNumber, siteContent.whatsappGreeting);
  return (
    <section className="relative w-full overflow-hidden px-gutter pt-10 pb-14 lg:pt-16 lg:pb-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-[30%] -right-[8%] h-[150%] w-[60%] bg-[radial-gradient(closest-side,var(--brand-glow),transparent)]"
      />
      <div className="relative grid items-center gap-12 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:gap-16">
        <div className="grid justify-items-start gap-6">
          <Eyebrow>{section.eyebrow}</Eyebrow>
          <Heading as="h1" size="display-xl" markedText={section.heading} className="max-w-[15ch]" />
          <Text size="lg" measure="readable">
            {section.description}
          </Text>
          <div className="flex w-full flex-wrap gap-3 max-sm:flex-col">
            <ButtonLink href={section.primaryCta.href}>{section.primaryCta.label} →</ButtonLink>
            <ButtonLink href={section.secondaryCta.href} variant="secondary">
              {section.secondaryCta.label}
            </ButtonLink>
            {section.showWhatsappCta ? (
              <ButtonLink href={whatsappUrl} variant="secondary">
                <WhatsappIcon size={18} />
                {sharedUiCopy.whatsappCtaLabel}
              </ButtonLink>
            ) : null}
          </div>
          <FounderStrip
            founders={foundersContent}
            title={section.founderStrip.title}
            description={section.founderStrip.description}
            href="/book-demo#demo-form"
          />
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-body-sm text-muted">
            {section.trustPoints.map((trustPoint) => (
              <li key={trustPoint} className="flex items-center gap-1.5">
                <span aria-hidden="true" className="font-bold text-success">
                  ✓
                </span>
                {trustPoint}
              </li>
            ))}
          </ul>
        </div>
        <HeroRing outerRingText={section.ringOuterText} innerRingText={section.ringInnerText} badges={section.badges} />
      </div>
    </section>
  );
}
