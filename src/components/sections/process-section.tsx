import { SectionHeader } from "@/components/molecules/section-header";
import { PageSection, type SectionTone } from "@/components/organisms/page-section";
import { ProcessSteps } from "@/components/organisms/process-steps";
import { processStepsContent, sharedUiCopy } from "@/content";
import type { SectionOf } from "@/content/schemas";

export function ProcessSection({
  section,
  tone,
  headingId,
}: {
  section: SectionOf<"process">;
  tone: SectionTone;
  headingId: string;
}) {
  if (processStepsContent.length === 0) return null;
  return (
    <PageSection tone={tone} labelledBy={headingId}>
      <SectionHeader
        eyebrow={section.eyebrow}
        heading={section.heading}
        description={section.description}
        headingId={headingId}
      />
      <ProcessSteps steps={processStepsContent} stepLabelTemplate={sharedUiCopy.stepLabel} />
    </PageSection>
  );
}
