import { SectionHeader } from "@/components/molecules/section-header";
import { CourseGrid } from "@/components/organisms/course-grid";
import { PageSection, type SectionTone } from "@/components/organisms/page-section";
import { coursesContent, coursesPageCopy } from "@/content";
import type { SectionOf } from "@/content/schemas";

type CourseShowcaseSectionProps = { section: SectionOf<"courseShowcase">; tone: SectionTone; headingId: string };

export function CourseShowcaseSection({ section, tone, headingId }: CourseShowcaseSectionProps) {
  return (
    <PageSection tone={tone} labelledBy={headingId}>
      <SectionHeader
        eyebrow={section.eyebrow}
        heading={section.heading}
        description={section.description}
        action={section.cta}
        headingId={headingId}
      />
      <CourseGrid
        courses={coursesContent.slice(0, section.limit)}
        lessonsUnit={coursesPageCopy.lessonsUnit}
        seriesStatusLabels={coursesPageCopy.seriesStatusLabels}
        progressLabel={coursesPageCopy.progressLabel}
      />
    </PageSection>
  );
}
