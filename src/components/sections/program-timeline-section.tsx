import { SectionHeader } from "@/components/molecules/section-header";
import { PageSection, type SectionTone } from "@/components/organisms/page-section";
import { ProgramTimeline } from "@/components/organisms/program-timeline";
import { programsContent, sharedUiCopy } from "@/content";
import type { SectionOf } from "@/content/schemas";

type ProgramTimelineSectionProps = { section: SectionOf<"programTimeline">; tone: SectionTone; headingId: string };

export function ProgramTimelineSection({ section, tone, headingId }: ProgramTimelineSectionProps) {
  return (
    <PageSection tone={tone} labelledBy={headingId}>
      <SectionHeader
        eyebrow={section.eyebrow}
        heading={section.heading}
        description={section.description}
        action={section.cta}
        headingId={headingId}
      />
      <ProgramTimeline
        corePrograms={programsContent.filter((program) => program.kind === "core")}
        finishLabel={section.finishLabel}
        finishNodeLabel={section.finishNodeLabel}
        columnLabels={sharedUiCopy.timelineColumnLabels}
      />
    </PageSection>
  );
}
