import { ProgramCard } from "@/components/molecules/program-card";
import { SectionHeader } from "@/components/molecules/section-header";
import { CardGrid } from "@/components/organisms/card-grid";
import { PageSection, type SectionTone } from "@/components/organisms/page-section";
import { programDetailCopy, programsContent, sharedUiCopy } from "@/content";

type ProgramOverviewSectionProps = {
  eyebrow: string;
  heading: string;
  description?: string;
  tone: SectionTone;
  headingId: string;
  excludeProgramSlug?: string;
};

export function ProgramOverviewSection({
  eyebrow,
  heading,
  description,
  tone,
  headingId,
  excludeProgramSlug,
}: ProgramOverviewSectionProps) {
  const programs = programsContent.filter((program) => program.slug !== excludeProgramSlug);
  if (programs.length === 0) return null;
  return (
    <PageSection tone={tone} labelledBy={headingId}>
      <SectionHeader eyebrow={eyebrow} heading={heading} description={description} headingId={headingId} />
      <CardGrid minimumCardSize="md">
        {programs.map((program) => (
          <li key={program.slug}>
            <ProgramCard
              program={program}
              kindLabel={program.kind === "core" ? programDetailCopy.coreProgramLabel : programDetailCopy.addOnLabel}
              linkLabel={sharedUiCopy.programCardLinkLabel}
              hoursLabel={sharedUiCopy.programCardHoursLabel}
            />
          </li>
        ))}
      </CardGrid>
    </PageSection>
  );
}
