import { FounderCard } from "@/components/molecules/founder-card";
import { SectionHeader } from "@/components/molecules/section-header";
import { CardGrid } from "@/components/organisms/card-grid";
import { PageSection, type SectionTone } from "@/components/organisms/page-section";
import { foundersContent } from "@/content";
import type { SectionOf } from "@/content/schemas";

export function FoundersSection({
  section,
  tone,
  headingId,
}: {
  section: SectionOf<"founders">;
  tone: SectionTone;
  headingId: string;
}) {
  if (foundersContent.length === 0) return null;
  return (
    <PageSection tone={tone} labelledBy={headingId}>
      <SectionHeader
        eyebrow={section.eyebrow}
        heading={section.heading}
        description={section.description}
        headingId={headingId}
      />
      <CardGrid minimumCardSize="lg" className="lg:grid-cols-2!">
        {foundersContent.map((founder) => (
          <li key={founder.id}>
            <FounderCard founder={founder} />
          </li>
        ))}
      </CardGrid>
    </PageSection>
  );
}
