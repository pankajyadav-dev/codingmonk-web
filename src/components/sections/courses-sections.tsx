import { CourseCatalog } from "@/components/organisms/course-catalog";
import { PageHeader } from "@/components/organisms/page-header";
import { PageSection } from "@/components/organisms/page-section";
import { coursesContent, coursesPageCopy, sharedUiCopy } from "@/content";
import { CtaBandSection } from "./cta-band-section";

export function CoursesCatalogSections() {
  const copy = coursesPageCopy;
  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: sharedUiCopy.breadcrumbHomeLabel, href: "/" }, { label: copy.hero.eyebrow }]}
        breadcrumbAriaLabel={sharedUiCopy.breadcrumbAriaLabel}
        eyebrow={copy.hero.eyebrow}
        heading={copy.hero.heading}
        description={copy.hero.description}
      />
      <PageSection className="pt-10 lg:pt-12">
        <CourseCatalog
          courses={coursesContent}
          labels={{
            searchLabel: copy.searchLabel,
            searchPlaceholder: copy.searchPlaceholder,
            levelFilterLabel: copy.levelFilterLabel,
            allLevelsLabel: copy.allLevelsLabel,
            emptyStateMessage: copy.emptyStateMessage,
            lessonsUnit: copy.lessonsUnit,
            progressLabel: copy.progressLabel,
            seriesStatusLabels: copy.seriesStatusLabels,
          }}
        />
      </PageSection>
      <CtaBandSection copy={copy.ctaBand} />
    </>
  );
}
