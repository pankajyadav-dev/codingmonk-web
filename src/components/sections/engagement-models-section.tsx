import { ButtonLink } from "@/components/atoms/button";
import { Text } from "@/components/atoms/text";
import { EngagementModelCard } from "@/components/molecules/engagement-model-card";
import { SectionHeader } from "@/components/molecules/section-header";
import { CardGrid } from "@/components/organisms/card-grid";
import { PageSection, type SectionTone } from "@/components/organisms/page-section";
import { engagementModelsContent } from "@/content";
import type { SectionOf } from "@/content/schemas";

type EngagementModelsSectionProps = { section: SectionOf<"engagementModels">; tone: SectionTone; headingId: string };

export function EngagementModelsSection({ section, tone, headingId }: EngagementModelsSectionProps) {
  if (engagementModelsContent.length === 0) return null;
  return (
    <PageSection tone={tone} labelledBy={headingId}>
      <SectionHeader
        eyebrow={section.eyebrow}
        heading={section.heading}
        description={section.description}
        headingId={headingId}
      />
      <CardGrid>
        {engagementModelsContent.map((engagementModel) => (
          <li key={engagementModel.title}>
            <EngagementModelCard engagementModel={engagementModel} />
          </li>
        ))}
      </CardGrid>
      <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
        <ButtonLink href={section.cta.href}>{section.cta.label} →</ButtonLink>
        <Text size="sm">{section.footnote}</Text>
      </div>
    </PageSection>
  );
}
