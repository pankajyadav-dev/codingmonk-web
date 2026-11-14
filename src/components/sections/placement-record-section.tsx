import { SectionHeader } from "@/components/molecules/section-header";
import { PageSection, type SectionTone } from "@/components/organisms/page-section";
import { PlacementRecord } from "@/components/organisms/placement-record";
import { getPlacementsNewestFirst, sharedUiCopy, siteContent } from "@/content";
import type { SectionOf } from "@/content/schemas";

type PlacementRecordSectionProps = { section: SectionOf<"placementRecord">; tone: SectionTone; headingId: string };

export function PlacementRecordSection({ section, tone, headingId }: PlacementRecordSectionProps) {
  const allPlacements = getPlacementsNewestFirst();
  if (allPlacements.length === 0) return null;
  const visiblePlacements = section.limit ? allPlacements.slice(0, section.limit) : allPlacements;
  const filterCopy = sharedUiCopy.placementFilters;
  return (
    <PageSection tone={tone} labelledBy={headingId}>
      <SectionHeader
        eyebrow={section.eyebrow}
        heading={section.heading}
        description={section.description}
        action={section.cta}
        headingId={headingId}
      />
      <PlacementRecord
        placements={visiblePlacements}
        showFilters={section.showFilters}
        labels={{
          title: section.eyebrow,
          sampleLabel: siteContent.sampleDataNotice,
          emptyMessage: sharedUiCopy.placementEmptyMessage,
          allBatchesLabel: filterCopy.allBatchesLabel,
          batchLabel: filterCopy.batchLabel,
          allCompanyTypesLabel: filterCopy.allCompanyTypesLabel,
          companyTypeLabels: filterCopy.companyTypeLabels,
        }}
      />
    </PageSection>
  );
}
