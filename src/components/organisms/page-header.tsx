import { ButtonLink } from "@/components/atoms/button";
import { Eyebrow } from "@/components/atoms/eyebrow";
import { Heading } from "@/components/atoms/heading";
import { Text } from "@/components/atoms/text";
import { type BreadcrumbItem, Breadcrumbs } from "@/components/molecules/breadcrumbs";
import type { InternalLink } from "@/content/schemas";

type PageHeaderProps = {
  breadcrumbs: BreadcrumbItem[];
  breadcrumbAriaLabel: string;
  eyebrow: string;
  heading: string;
  description?: string;
  primaryCta?: InternalLink;
  secondaryCta?: InternalLink;
  children?: React.ReactNode;
};

export function PageHeader(pageHeader: PageHeaderProps) {
  return (
    <section className="relative w-full overflow-hidden border-b border-line px-gutter pt-10 pb-12 lg:pt-14 lg:pb-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-1/2 -right-[10%] h-[180%] w-[55%] bg-[radial-gradient(closest-side,var(--brand-glow),transparent)]"
      />
      <div className="relative grid gap-5">
        <Breadcrumbs items={pageHeader.breadcrumbs} ariaLabel={pageHeader.breadcrumbAriaLabel} />
        <Eyebrow>{pageHeader.eyebrow}</Eyebrow>
        <Heading as="h1" size="display-lg" markedText={pageHeader.heading} className="max-w-[20ch]" />
        {pageHeader.description ? (
          <Text size="lg" measure="readable">
            {pageHeader.description}
          </Text>
        ) : null}
        {pageHeader.primaryCta || pageHeader.secondaryCta ? (
          <div className="flex flex-wrap gap-3 pt-1">
            {pageHeader.primaryCta ? (
              <ButtonLink href={pageHeader.primaryCta.href}>{pageHeader.primaryCta.label}</ButtonLink>
            ) : null}
            {pageHeader.secondaryCta ? (
              <ButtonLink href={pageHeader.secondaryCta.href} variant="secondary">
                {pageHeader.secondaryCta.label}
              </ButtonLink>
            ) : null}
          </div>
        ) : null}
        {pageHeader.children}
      </div>
    </section>
  );
}
