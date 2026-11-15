import { z } from "zod";
import { ctaBandCopySchema, internalLinkSchema, pageSeoSchema, titledItemSchema } from "./schemas";

const nonEmptyText = z.string().trim().min(1);
function labelMap<const Keys extends readonly [string, ...string[]]>(keys: Keys) {
  const shape = Object.fromEntries(keys.map((key) => [key, nonEmptyText])) as {
    [Key in Keys[number]]: typeof nonEmptyText;
  };
  return z.object(shape);
}

export const programDetailCopySchema = z.object({
  seoTitleSuffix: nonEmptyText,
  breadcrumbLabel: nonEmptyText,
  coreProgramLabel: nonEmptyText,
  addOnLabel: nonEmptyText,
  curriculumEyebrow: nonEmptyText,
  curriculumHeading: nonEmptyText,
  aiPracticeLabel: nonEmptyText,
  factsHeading: nonEmptyText,
  factLabels: labelMap(["audience", "eligibility", "duration", "delivery", "assessments", "certificate", "tools"]),
  hoursUnit: nonEmptyText,
  primaryCta: internalLinkSchema,
  secondaryCta: internalLinkSchema,
  tracksEyebrow: nonEmptyText,
  tracksHeading: nonEmptyText,
  relatedEyebrow: nonEmptyText,
  relatedHeading: nonEmptyText,
  ctaBand: ctaBandCopySchema,
});

export const coursesPageCopySchema = z.object({
  seo: pageSeoSchema,
  hero: z.object({ eyebrow: nonEmptyText, heading: nonEmptyText, description: nonEmptyText }),
  searchLabel: nonEmptyText,
  searchPlaceholder: nonEmptyText,
  levelFilterLabel: nonEmptyText,
  allLevelsLabel: nonEmptyText,
  emptyStateMessage: nonEmptyText,
  lessonsUnit: nonEmptyText,
  seriesStatusLabels: labelMap(["complete", "in-progress"]),
  progressLabel: nonEmptyText,
  ctaBand: ctaBandCopySchema,
});

export const courseDetailCopySchema = labelMap([
  "breadcrumbLabel",
  "startCourseLabel",
  "continueCourseLabel",
  "courseContentHeading",
  "lessonCountLabel",
  "lessonPositionLabel",
  "previousLessonLabel",
  "nextLessonLabel",
  "markCompleteLabel",
  "completedLabel",
  "openOnYoutubeLabel",
  "playVideoLabel",
  "openPlaylistLabel",
  "inProgressNotice",
  "progressLabel",
  "lessonDescriptionTemplate",
  "videoUnavailableHeading",
  "videoUnavailableDescription",
  "youtubeOnlyLessonLabel",
]);

const fieldCopy = z.object({ label: nonEmptyText, placeholder: nonEmptyText.optional() });
function choiceFieldCopy<const Keys extends readonly [string, ...string[]]>(keys: Keys) {
  return z.object({ label: nonEmptyText, options: labelMap(keys) });
}

export const requestTypeKeys = ["campus-demo", "sample-report", "proposal"] as const;
export const studentsYearKeys = ["final-year", "pre-final-year", "both"] as const;
export const placementSeasonKeys = ["2026-27", "2027-28", "not-sure"] as const;
export const designationKeys = ["tpo", "principal", "dean", "hod", "director", "faculty", "other"] as const;

export const bookDemoCopySchema = z.object({
  seo: pageSeoSchema,
  hero: z.object({
    eyebrow: nonEmptyText,
    heading: nonEmptyText,
    description: nonEmptyText,
    founderStrip: titledItemSchema,
  }),
  founderCard: z.object({ eyebrow: nonEmptyText, heading: nonEmptyText, description: nonEmptyText }),
  contactMethods: labelMap([
    "whatsappTitle",
    "whatsappDescription",
    "whatsappButtonLabel",
    "emailTitle",
    "emailDescription",
    "phoneTitle",
  ]),
  form: z.object({
    steps: z
      .array(z.object({ id: z.enum(["college", "batch", "contact"]), title: nonEmptyText, heading: nonEmptyText }))
      .length(3),
    fields: z.object({
      requestType: choiceFieldCopy(requestTypeKeys),
      collegeName: fieldCopy,
      city: fieldCopy,
      state: fieldCopy,
      studentsYear: choiceFieldCopy(studentsYearKeys),
      programInterest: z.object({ label: nonEmptyText, notSureLabel: nonEmptyText }),
      batchSize: fieldCopy,
      placementSeason: choiceFieldCopy(placementSeasonKeys),
      contactName: fieldCopy,
      designation: choiceFieldCopy(designationKeys),
      phone: fieldCopy,
      email: fieldCopy,
      message: fieldCopy,
      consent: z.object({ label: nonEmptyText }),
    }),
    optionalLabel: nonEmptyText,
    honeypotLabel: nonEmptyText,
    selectPlaceholder: nonEmptyText,
    backLabel: nonEmptyText,
    continueLabel: nonEmptyText,
    submitLabel: nonEmptyText,
    submittingLabel: nonEmptyText,
    errors: labelMap(["required", "phone", "email", "batchSize", "consent", "tooManyRequests", "serverError"]),
  }),
  whatsappMessage: z.object({
    intro: nonEmptyText,
    labels: labelMap([
      "requestType",
      "collegeName",
      "location",
      "studentsYear",
      "programInterest",
      "batchSize",
      "placementSeason",
      "contactName",
      "designation",
      "reference",
    ]),
  }),
});

export const thankYouCopySchema = z.object({
  seo: pageSeoSchema,
  eyebrow: nonEmptyText,
  heading: nonEmptyText,
  description: nonEmptyText,
  referenceLabel: nonEmptyText,
  openWhatsappLabel: nonEmptyText,
  browseProgramsLabel: nonEmptyText,
  watchCoursesLabel: nonEmptyText,
});

export const privacyCopySchema = z.object({
  seo: pageSeoSchema,
  eyebrow: nonEmptyText,
  heading: nonEmptyText,
  lastUpdated: z.iso.date(),
  lastUpdatedLabel: nonEmptyText,
  sections: z.array(z.object({ heading: nonEmptyText, paragraphs: z.array(nonEmptyText).min(1) })).min(1),
});

export const notFoundCopySchema = z.object({
  eyebrow: nonEmptyText,
  heading: nonEmptyText,
  description: nonEmptyText,
  links: z.array(internalLinkSchema).min(1),
});

export const errorCopySchema = z.object({
  eyebrow: nonEmptyText,
  heading: nonEmptyText,
  description: nonEmptyText,
  retryLabel: nonEmptyText,
  homeLabel: nonEmptyText,
});

export const sharedCopySchema = z.object({
  skipToContentLabel: nonEmptyText,
  openMenuLabel: nonEmptyText,
  closeMenuLabel: nonEmptyText,
  themeToggleLabel: nonEmptyText,
  whatsappButtonLabel: nonEmptyText,
  whatsappCtaLabel: nonEmptyText,
  dismissAnnouncementLabel: nonEmptyText,
  breadcrumbHomeLabel: nonEmptyText,
  placementPackageLabel: nonEmptyText,
  placedAtLabel: nonEmptyText,
  stepLabel: nonEmptyText,
  mainNavigationLabel: nonEmptyText,
  mobileNavigationLabel: nonEmptyText,
  timelineColumnLabels: labelMap(["monthsBefore", "oneMonthBefore"]),
  laneLinkLabel: nonEmptyText,
  breadcrumbAriaLabel: nonEmptyText,
  batchResultLabels: labelMap([
    "batchYear",
    "studentsTrained",
    "offers",
    "recruiters",
    "placementBefore",
    "placementAfter",
    "placementPercent",
  ]),
  programCardLinkLabel: nonEmptyText,
  programCardHoursLabel: nonEmptyText,
  footerTagline: nonEmptyText,
  footerContactHeading: nonEmptyText,
  copyrightLabel: nonEmptyText,
});

export type ProgramDetailCopy = z.infer<typeof programDetailCopySchema>;
export type CoursesPageCopy = z.infer<typeof coursesPageCopySchema>;
export type CourseDetailCopy = z.infer<typeof courseDetailCopySchema>;
export type BookDemoCopy = z.infer<typeof bookDemoCopySchema>;
export type ThankYouCopy = z.infer<typeof thankYouCopySchema>;
export type PrivacyCopy = z.infer<typeof privacyCopySchema>;
export type NotFoundCopy = z.infer<typeof notFoundCopySchema>;
export type ErrorCopy = z.infer<typeof errorCopySchema>;
export type SharedCopy = z.infer<typeof sharedCopySchema>;
export type RequestType = (typeof requestTypeKeys)[number];
export type StudentsYear = (typeof studentsYearKeys)[number];
export type PlacementSeason = (typeof placementSeasonKeys)[number];
export type Designation = (typeof designationKeys)[number];
