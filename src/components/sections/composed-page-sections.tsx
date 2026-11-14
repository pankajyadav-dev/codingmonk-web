import { Fragment } from "react";
import type { SectionTone } from "@/components/organisms/page-section";
import { collegeChallengesContent, studentBenefitsContent, valuesContent } from "@/content";
import type { Section } from "@/content/schemas";
import { AiApproachSection } from "./ai-approach-section";
import { BatchResultsSection } from "./batch-results-section";
import { CourseShowcaseSection } from "./course-showcase-section";
import { CtaBandSection } from "./cta-band-section";
import { EngagementModelsSection } from "./engagement-models-section";
import { FaqSection } from "./faq-section";
import { FoundersSection } from "./founders-section";
import { HeroSection } from "./hero-section";
import { LogoWallSection } from "./logo-wall-section";
import { PageHeroSection } from "./page-hero-section";
import { PlacementRecordSection } from "./placement-record-section";
import { ProcessSection } from "./process-section";
import { ProgramOverviewSection } from "./program-overview-section";
import { ProgramTimelineSection } from "./program-timeline-section";
import { buildSectionHeadingId } from "./section-heading-id";
import { ServicesSection } from "./services-section";
import { StatsSection } from "./stats-section";
import { TestimonialsSection } from "./testimonials-section";
import { TitledItemsSection } from "./titled-items-section";
import { TracksSection } from "./tracks-section";
import { TrainersSection } from "./trainers-section";

const sectionsWithOwnBackground = new Set<Section["type"]>(["hero", "pageHero", "logoWall", "ctaBand"]);

function renderSection(section: Section, tone: SectionTone, headingId: string, breadcrumbLabel: string) {
  switch (section.type) {
    case "hero":
      return <HeroSection section={section} />;
    case "pageHero":
      return <PageHeroSection section={section} breadcrumbLabel={breadcrumbLabel} />;
    case "logoWall":
      return <LogoWallSection section={section} />;
    case "stats":
      return <StatsSection section={section} tone={tone} headingId={headingId} />;
    case "programTimeline":
      return <ProgramTimelineSection section={section} tone={tone} headingId={headingId} />;
    case "aiApproach":
      return <AiApproachSection section={section} tone={tone} headingId={headingId} />;
    case "services":
      return <ServicesSection section={section} tone={tone} headingId={headingId} />;
    case "process":
      return <ProcessSection section={section} tone={tone} headingId={headingId} />;
    case "placementRecord":
      return <PlacementRecordSection section={section} tone={tone} headingId={headingId} />;
    case "testimonials":
      return <TestimonialsSection section={section} tone={tone} headingId={headingId} />;
    case "courseShowcase":
      return <CourseShowcaseSection section={section} tone={tone} headingId={headingId} />;
    case "founders":
      return <FoundersSection section={section} tone={tone} headingId={headingId} />;
    case "engagementModels":
      return <EngagementModelsSection section={section} tone={tone} headingId={headingId} />;
    case "faq":
      return <FaqSection section={section} tone={tone} headingId={headingId} />;
    case "ctaBand":
      return <CtaBandSection copy={section} />;
    case "collegeChallenges":
      return <TitledItemsSection {...section} items={collegeChallengesContent} tone={tone} headingId={headingId} />;
    case "studentBenefits":
      return <TitledItemsSection {...section} items={studentBenefitsContent} tone={tone} headingId={headingId} />;
    case "values":
      return <TitledItemsSection {...section} items={valuesContent} tone={tone} headingId={headingId} />;
    case "programOverview":
      return <ProgramOverviewSection {...section} tone={tone} headingId={headingId} />;
    case "tracks":
      return <TracksSection {...section} tone={tone} headingId={headingId} />;
    case "batchResults":
      return <BatchResultsSection section={section} tone={tone} headingId={headingId} />;
    case "trainers":
      return <TrainersSection section={section} tone={tone} headingId={headingId} />;
  }
}

export function ComposedPageSections({
  sections,
  breadcrumbLabel = "",
}: {
  sections: Section[];
  breadcrumbLabel?: string;
}) {
  let contentSectionCount = 0;
  return sections.map((section, sectionIndex) => {
    const hasOwnBackground = sectionsWithOwnBackground.has(section.type);
    const tone: SectionTone = !hasOwnBackground && contentSectionCount++ % 2 === 1 ? "soft" : "plain";
    const headingId = buildSectionHeadingId(section.type, sectionIndex);
    return <Fragment key={headingId}>{renderSection(section, tone, headingId, breadcrumbLabel)}</Fragment>;
  });
}
