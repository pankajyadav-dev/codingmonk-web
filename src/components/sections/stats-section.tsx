import { SectionHeader } from "@/components/molecules/section-header";
import { PageSection, type SectionTone } from "@/components/organisms/page-section";
import { StatsGrid } from "@/components/organisms/stats-grid";
import { statsContent } from "@/content";
import type { SectionOf } from "@/content/schemas";

export function StatsSection({
  section,
  tone,
  headingId,
}: {
  section: SectionOf<"stats">;
  tone: SectionTone;
  headingId: string;
}) {
  if (statsContent.length === 0) return null;
  return (
    <PageSection tone={tone} labelledBy={headingId}>
      <SectionHeader
        eyebrow={section.eyebrow}
        heading={section.heading}
        description={section.description}
        headingId={headingId}
      />
      <StatsGrid stats={statsContent} />
    </PageSection>
  );
}
