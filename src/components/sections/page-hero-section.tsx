import { PageHeader } from "@/components/organisms/page-header";
import { sharedUiCopy } from "@/content";
import type { SectionOf } from "@/content/schemas";

export function PageHeroSection({
  section,
  breadcrumbLabel,
}: {
  section: SectionOf<"pageHero">;
  breadcrumbLabel: string;
}) {
  return (
    <PageHeader
      breadcrumbs={[{ label: sharedUiCopy.breadcrumbHomeLabel, href: "/" }, { label: breadcrumbLabel }]}
      breadcrumbAriaLabel={sharedUiCopy.breadcrumbAriaLabel}
      eyebrow={section.eyebrow}
      heading={section.heading}
      description={section.description}
      primaryCta={section.primaryCta}
      secondaryCta={section.secondaryCta}
    />
  );
}
