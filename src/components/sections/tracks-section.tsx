import { SectionHeader } from "@/components/molecules/section-header";
import { TrackCard } from "@/components/molecules/track-card";
import { CardGrid } from "@/components/organisms/card-grid";
import { PageSection, type SectionTone } from "@/components/organisms/page-section";
import { tracksContent } from "@/content";
import type { CompanyType } from "@/content/schemas";

type TracksSectionProps = {
  eyebrow: string;
  heading: string;
  description?: string;
  tone: SectionTone;
  headingId: string;
  onlyTrackSlugs?: CompanyType[];
};

export function TracksSection({ eyebrow, heading, description, tone, headingId, onlyTrackSlugs }: TracksSectionProps) {
  const tracks = onlyTrackSlugs ? tracksContent.filter((track) => onlyTrackSlugs.includes(track.slug)) : tracksContent;
  if (tracks.length === 0) return null;
  return (
    <PageSection tone={tone} labelledBy={headingId}>
      <SectionHeader eyebrow={eyebrow} heading={heading} description={description} headingId={headingId} />
      <CardGrid minimumCardSize="lg">
        {tracks.map((track) => (
          <li key={track.slug}>
            <TrackCard track={track} />
          </li>
        ))}
      </CardGrid>
    </PageSection>
  );
}
