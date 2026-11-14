import { BatchResultCard } from "@/components/molecules/batch-result-card";
import { SectionHeader } from "@/components/molecules/section-header";
import { CardGrid } from "@/components/organisms/card-grid";
import { PageSection, type SectionTone } from "@/components/organisms/page-section";
import { batchResultsContent, sharedUiCopy } from "@/content";
import type { SectionOf } from "@/content/schemas";

export function BatchResultsSection({
  section,
  tone,
  headingId,
}: {
  section: SectionOf<"batchResults">;
  tone: SectionTone;
  headingId: string;
}) {
  if (batchResultsContent.length === 0) return null;
  return (
    <PageSection tone={tone} labelledBy={headingId}>
      <SectionHeader
        eyebrow={section.eyebrow}
        heading={section.heading}
        description={section.description}
        headingId={headingId}
      />
      <CardGrid>
        {batchResultsContent.map((batchResult) => (
          <li key={`${batchResult.collegeName}-${batchResult.batchYear}`}>
            <BatchResultCard batchResult={batchResult} labels={sharedUiCopy.batchResultLabels} />
          </li>
        ))}
      </CardGrid>
    </PageSection>
  );
}
