import { SectionHeader } from "@/components/molecules/section-header";
import { AiApproachPanel } from "@/components/organisms/ai-approach-panel";
import { PageSection, type SectionTone } from "@/components/organisms/page-section";
import { aiApproachContent } from "@/content";
import type { SectionOf } from "@/content/schemas";

export function AiApproachSection({
  section,
  tone,
  headingId,
}: {
  section: SectionOf<"aiApproach">;
  tone: SectionTone;
  headingId: string;
}) {
  return (
    <PageSection tone={tone} labelledBy={headingId}>
      <SectionHeader
        eyebrow={section.eyebrow}
        heading={section.heading}
        description={section.description}
        headingId={headingId}
      />
      <AiApproachPanel aiApproach={aiApproachContent} signalsHeading={section.signalsHeading} />
    </PageSection>
  );
}
