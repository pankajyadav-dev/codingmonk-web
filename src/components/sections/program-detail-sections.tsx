import { Badge } from "@/components/atoms/badge";
import { ButtonLink } from "@/components/atoms/button";
import { CurriculumStep } from "@/components/molecules/curriculum-step";
import { FactList } from "@/components/molecules/fact-list";
import { SectionHeader } from "@/components/molecules/section-header";
import { PageHeader } from "@/components/organisms/page-header";
import { PageSection } from "@/components/organisms/page-section";
import { StructuredData } from "@/components/organisms/structured-data";
import { programDetailCopy, sharedUiCopy } from "@/content";
import type { Program } from "@/content/schemas";
import { buildBreadcrumbJsonLd, buildProgramJsonLd } from "@/lib/structured-data";
import { CtaBandSection } from "./cta-band-section";
import { ProgramOverviewSection } from "./program-overview-section";
import { TracksSection } from "./tracks-section";

export function ProgramDetailSections({ program }: { program: Program }) {
  const copy = programDetailCopy;
  const facts = [
    { label: copy.factLabels.audience, value: `${program.audienceLabel} · ${program.semesterLabel}` },
    { label: copy.factLabels.eligibility, value: program.eligibility },
    { label: copy.factLabels.duration, value: `${program.durationLabel}, ${program.totalHours} ${copy.hoursUnit}` },
    { label: copy.factLabels.delivery, value: program.deliveryMode },
    { label: copy.factLabels.assessments, value: program.assessments },
    { label: copy.factLabels.certificate, value: program.certificate },
    { label: copy.factLabels.tools, value: program.tools.join(", ") },
  ];
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: sharedUiCopy.breadcrumbHomeLabel, href: "/" },
          { label: copy.breadcrumbLabel, href: "/programs" },
          { label: program.title },
        ]}
        breadcrumbAriaLabel={sharedUiCopy.breadcrumbAriaLabel}
        eyebrow={`${program.kind === "core" ? copy.coreProgramLabel : copy.addOnLabel} · ${program.durationLabel}`}
        heading={program.title}
        description={program.outcome}
        primaryCta={copy.primaryCta}
        secondaryCta={copy.secondaryCta}
      />
      <PageSection labelledBy="curriculum-heading">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.5fr)_minmax(300px,1fr)] lg:gap-16">
          <div>
            <SectionHeader
              eyebrow={copy.curriculumEyebrow}
              heading={copy.curriculumHeading}
              headingId="curriculum-heading"
            />
            <ol className="ml-2 border-l-[3px] border-line">
              {program.curriculum.map((curriculumStep) => (
                <CurriculumStep
                  key={curriculumStep.periodLabel}
                  {...curriculumStep}
                  aiPracticeLabel={copy.aiPracticeLabel}
                />
              ))}
            </ol>
          </div>
          <aside
            aria-label={copy.factsHeading}
            className="grid gap-5 rounded-xl border border-line bg-surface p-6 lg:sticky lg:top-24"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="font-display text-heading-md font-bold">{copy.factsHeading}</h2>
              <Badge variant="brand">{program.durationLabel}</Badge>
            </div>
            <FactList facts={facts} />
            <ButtonLink href={copy.primaryCta.href}>{copy.primaryCta.label}</ButtonLink>
          </aside>
        </div>
      </PageSection>
      <TracksSection
        eyebrow={copy.tracksEyebrow}
        heading={copy.tracksHeading}
        tone="soft"
        headingId="tracks-heading"
        onlyTrackSlugs={program.trackSlugs}
      />
      <ProgramOverviewSection
        eyebrow={copy.relatedEyebrow}
        heading={copy.relatedHeading}
        tone="plain"
        headingId="related-programs-heading"
        excludeProgramSlug={program.slug}
      />
      <CtaBandSection copy={copy.ctaBand} />
      <StructuredData data={buildProgramJsonLd(program)} />
      <StructuredData
        data={buildBreadcrumbJsonLd([
          { name: sharedUiCopy.breadcrumbHomeLabel, path: "/" },
          { name: copy.breadcrumbLabel, path: "/programs" },
          { name: program.title, path: `/programs/${program.slug}` },
        ])}
      />
    </>
  );
}
