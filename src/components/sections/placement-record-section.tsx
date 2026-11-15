import { SectionHeader } from "@/components/molecules/section-header";
import { PageSection, type SectionTone } from "@/components/organisms/page-section";
import { PlacementRecord } from "@/components/organisms/placement-record";
import { getPlacementsByPackage, sharedUiCopy } from "@/content";
import type { SectionOf } from "@/content/schemas";

type PlacementRecordSectionProps = { section: SectionOf<"placementRecord">; tone: SectionTone; headingId: string };

export function PlacementRecordSection({ section, tone, headingId }: PlacementRecordSectionProps) {
  const allPlacements = getPlacementsByPackage();
  if (allPlacements.length === 0) return null;
  const visiblePlacements = section.limit ? allPlacements.slice(0, section.limit) : allPlacements;
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
        labels={{
          title: section.eyebrow,
          packageLabel: sharedUiCopy.placementPackageLabel,
          placedAtLabel: sharedUiCopy.placedAtLabel,
        }}
      />
    </PageSection>
  );
}
