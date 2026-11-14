import { SectionHeader } from "@/components/molecules/section-header";
import { PageSection, type SectionTone } from "@/components/organisms/page-section";
import { ServicesBento } from "@/components/organisms/services-bento";
import { sampleReportContent, servicesContent } from "@/content";
import type { SectionOf } from "@/content/schemas";

export function ServicesSection({
  section,
  tone,
  headingId,
}: {
  section: SectionOf<"services">;
  tone: SectionTone;
  headingId: string;
}) {
  if (servicesContent.length === 0) return null;
  return (
    <PageSection tone={tone} labelledBy={headingId}>
      <SectionHeader
        eyebrow={section.eyebrow}
        heading={section.heading}
        description={section.description}
        headingId={headingId}
      />
      <ServicesBento services={servicesContent} sampleReport={sampleReportContent} />
    </PageSection>
  );
}
