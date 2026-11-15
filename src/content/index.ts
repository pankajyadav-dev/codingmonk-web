import aiApproach from "@content/ai-approach.json";
import announcements from "@content/announcements.json";
import batchResults from "@content/batch-results.json";
import collegeChallenges from "@content/college-challenges.json";
import colleges from "@content/colleges.json";
import courses from "@content/courses.json";
import engagementModels from "@content/engagement-models.json";
import faq from "@content/faq.json";
import founders from "@content/founders.json";
import navigation from "@content/navigation.json";
import aboutPage from "@content/pages/about.json";
import bookDemoPage from "@content/pages/book-demo.json";
import courseDetailPage from "@content/pages/course-detail.json";
import coursesPage from "@content/pages/courses.json";
import errorPage from "@content/pages/error.json";
import forCollegesPage from "@content/pages/for-colleges.json";
import homePage from "@content/pages/home.json";
import notFoundPage from "@content/pages/not-found.json";
import placementsPage from "@content/pages/placements.json";
import privacyPage from "@content/pages/privacy.json";
import programDetailPage from "@content/pages/program-detail.json";
import programsPage from "@content/pages/programs.json";
import sharedCopy from "@content/pages/shared.json";
import thankYouPage from "@content/pages/thank-you.json";
import placements from "@content/placements.json";
import processSteps from "@content/process-steps.json";
import programs from "@content/programs.json";
import recruiters from "@content/recruiters.json";
import sampleReport from "@content/sample-report.json";
import services from "@content/services.json";
import site from "@content/site.json";
import stats from "@content/stats.json";
import studentBenefits from "@content/student-benefits.json";
import testimonials from "@content/testimonials.json";
import tracks from "@content/tracks.json";
import trainers from "@content/trainers.json";
import values from "@content/values.json";
import { z } from "zod";
import {
  bookDemoCopySchema,
  courseDetailCopySchema,
  coursesPageCopySchema,
  errorCopySchema,
  notFoundCopySchema,
  privacyCopySchema,
  programDetailCopySchema,
  sharedCopySchema,
  thankYouCopySchema,
} from "./page-template-schemas";
import {
  aiApproachSchema,
  announcementSchema,
  batchResultSchema,
  composedPageSchema,
  courseSchema,
  engagementModelSchema,
  faqItemSchema,
  founderSchema,
  navigationSchema,
  organizationNameSchema,
  placementSchema,
  processStepSchema,
  programSchema,
  sampleReportSchema,
  serviceSchema,
  siteSchema,
  statSchema,
  testimonialSchema,
  titledItemSchema,
  trackSchema,
  trainerSchema,
} from "./schemas";

function parseContent<Schema extends z.ZodType>(schema: Schema, data: unknown, fileName: string): z.infer<Schema> {
  const result = schema.safeParse(data);
  if (!result.success) {
    throw new Error(`Invalid content in ${fileName}:\n${z.prettifyError(result.error)}`);
  }
  return result.data;
}

const composedPages = {
  home: parseContent(composedPageSchema, homePage, "content/pages/home.json"),
  forColleges: parseContent(composedPageSchema, forCollegesPage, "content/pages/for-colleges.json"),
  programs: parseContent(composedPageSchema, programsPage, "content/pages/programs.json"),
  placements: parseContent(composedPageSchema, placementsPage, "content/pages/placements.json"),
  about: parseContent(composedPageSchema, aboutPage, "content/pages/about.json"),
};

export type ComposedPageName = keyof typeof composedPages;

export const siteContent = parseContent(siteSchema, site, "content/site.json");
export const navigationContent = parseContent(navigationSchema, navigation, "content/navigation.json");
export const foundersContent = parseContent(z.array(founderSchema), founders, "content/founders.json");
export const programsContent = parseContent(z.array(programSchema).min(1), programs, "content/programs.json");
export const tracksContent = parseContent(z.array(trackSchema), tracks, "content/tracks.json");
export const statsContent = parseContent(z.array(statSchema), stats, "content/stats.json");
export const collegesContent = parseContent(z.array(organizationNameSchema), colleges, "content/colleges.json");
export const recruitersContent = parseContent(z.array(organizationNameSchema), recruiters, "content/recruiters.json");
export const placementsContent = parseContent(z.array(placementSchema), placements, "content/placements.json");
export const batchResultsContent = parseContent(z.array(batchResultSchema), batchResults, "content/batch-results.json");
export const testimonialsContent = parseContent(z.array(testimonialSchema), testimonials, "content/testimonials.json");
export const faqContent = parseContent(z.array(faqItemSchema), faq, "content/faq.json");
export const servicesContent = parseContent(z.array(serviceSchema), services, "content/services.json");
export const sampleReportContent = parseContent(sampleReportSchema, sampleReport, "content/sample-report.json");
export const processStepsContent = parseContent(z.array(processStepSchema), processSteps, "content/process-steps.json");
export const engagementModelsContent = parseContent(
  z.array(engagementModelSchema),
  engagementModels,
  "content/engagement-models.json",
);
export const collegeChallengesContent = parseContent(
  z.array(titledItemSchema),
  collegeChallenges,
  "content/college-challenges.json",
);
export const studentBenefitsContent = parseContent(
  z.array(titledItemSchema),
  studentBenefits,
  "content/student-benefits.json",
);
export const trainersContent = parseContent(z.array(trainerSchema), trainers, "content/trainers.json");
export const valuesContent = parseContent(z.array(titledItemSchema), values, "content/values.json");
export const aiApproachContent = parseContent(aiApproachSchema, aiApproach, "content/ai-approach.json");
export const announcementsContent = parseContent(
  z.array(announcementSchema),
  announcements,
  "content/announcements.json",
);
export const coursesContent = parseContent(z.array(courseSchema).min(1), courses, "content/courses.json");

export const programDetailCopy = parseContent(
  programDetailCopySchema,
  programDetailPage,
  "content/pages/program-detail.json",
);
export const coursesPageCopy = parseContent(coursesPageCopySchema, coursesPage, "content/pages/courses.json");
export const courseDetailCopy = parseContent(
  courseDetailCopySchema,
  courseDetailPage,
  "content/pages/course-detail.json",
);
export const bookDemoCopy = parseContent(bookDemoCopySchema, bookDemoPage, "content/pages/book-demo.json");
export const thankYouCopy = parseContent(thankYouCopySchema, thankYouPage, "content/pages/thank-you.json");
export const privacyCopy = parseContent(privacyCopySchema, privacyPage, "content/pages/privacy.json");
export const notFoundCopy = parseContent(notFoundCopySchema, notFoundPage, "content/pages/not-found.json");
export const errorCopy = parseContent(errorCopySchema, errorPage, "content/pages/error.json");
export const sharedUiCopy = parseContent(sharedCopySchema, sharedCopy, "content/pages/shared.json");

export function getComposedPage(pageName: ComposedPageName) {
  return composedPages[pageName];
}

export function getProgramBySlug(programSlug: string) {
  return programsContent.find((program) => program.slug === programSlug);
}

export function getCourseBySlug(courseSlug: string) {
  return coursesContent.find((course) => course.slug === courseSlug);
}

export function getFaqItemsByIds(faqIds: readonly string[]) {
  return faqIds.flatMap((faqId) => faqContent.filter((faqItem) => faqItem.id === faqId));
}

export function getPlacementsByPackage() {
  return [...placementsContent].sort((first, second) => second.packageLpa - first.packageLpa);
}

export function findContentIntegrityProblems(): string[] {
  const problems: string[] = [];
  const knownFaqIds = new Set(faqContent.map((faqItem) => faqItem.id));
  const knownProgramSlugs = new Set(programsContent.map((program) => program.slug));
  const reportDuplicates = (label: string, keys: string[]) => {
    const seen = new Set<string>();
    for (const key of keys) {
      if (seen.has(key)) problems.push(`Duplicate ${label}: ${key}`);
      seen.add(key);
    }
  };

  for (const [pageName, page] of Object.entries(composedPages)) {
    for (const section of page.sections) {
      if (section.type !== "faq") continue;
      for (const faqId of section.faqIds) {
        if (!knownFaqIds.has(faqId)) problems.push(`Page "${pageName}" references unknown FAQ id "${faqId}"`);
      }
    }
  }
  for (const batchResult of batchResultsContent) {
    if (!knownProgramSlugs.has(batchResult.programSlug)) {
      problems.push(
        `Batch result for ${batchResult.collegeName} references unknown program "${batchResult.programSlug}"`,
      );
    }
  }
  reportDuplicates(
    "FAQ id",
    faqContent.map((faqItem) => faqItem.id),
  );
  reportDuplicates(
    "program slug",
    programsContent.map((program) => program.slug),
  );
  reportDuplicates(
    "course slug",
    coursesContent.map((course) => course.slug),
  );
  for (const course of coursesContent) {
    reportDuplicates(
      `lesson slug in ${course.slug}`,
      course.modules.flatMap((courseModule) => courseModule.lessons.map((lesson) => lesson.slug)),
    );
  }
  if (!programsContent.some((program) => program.kind === "core"))
    problems.push("At least one core program is required");
  return problems;
}

const integrityProblems = findContentIntegrityProblems();
if (integrityProblems.length > 0) {
  throw new Error(`Content integrity problems:\n- ${integrityProblems.join("\n- ")}`);
}
