import { SectionHeader } from "@/components/molecules/section-header";
import { TrainerCard } from "@/components/molecules/trainer-card";
import { CardGrid } from "@/components/organisms/card-grid";
import { PageSection, type SectionTone } from "@/components/organisms/page-section";
import { trainersContent } from "@/content";
import type { SectionOf } from "@/content/schemas";

export function TrainersSection({
  section,
  tone,
  headingId,
}: {
  section: SectionOf<"trainers">;
  tone: SectionTone;
  headingId: string;
}) {
  if (trainersContent.length === 0) return null;
  return (
    <PageSection tone={tone} labelledBy={headingId}>
      <SectionHeader
        eyebrow={section.eyebrow}
        heading={section.heading}
        description={section.description}
        headingId={headingId}
      />
      <CardGrid minimumCardSize="sm">
        {trainersContent.map((trainer) => (
          <li key={`${trainer.name}-${trainer.role}-${trainer.experienceLabel}`}>
            <TrainerCard trainer={trainer} />
          </li>
        ))}
      </CardGrid>
    </PageSection>
  );
}
