import { z } from "zod";

const nonEmptyText = z.string().trim().min(1);
const internalPath = z.string().regex(/^\/[^\s]*$/, "Must be an internal path starting with /");
const externalUrl = z.url({ protocol: /^https$/ });
const isoDate = z.iso.date();

export const linkSchema = z.object({ label: nonEmptyText, href: z.union([internalPath, externalUrl]) });
export const internalLinkSchema = z.object({ label: nonEmptyText, href: internalPath });
export const externalLinkSchema = z.object({ label: nonEmptyText, url: externalUrl });

export const siteSchema = z.object({
  name: nonEmptyText,
  legalName: nonEmptyText,
  tagline: nonEmptyText,
  description: nonEmptyText,
  locale: nonEmptyText,
  language: nonEmptyText,
  contact: z.object({
    email: z.email(),
    phoneDisplay: nonEmptyText,
    phoneInternational: z.string().regex(/^\+\d{10,15}$/),
    whatsappNumber: z.string().regex(/^\d{10,15}$/),
    officeHours: nonEmptyText,
  }),
  youtubeChannel: z.object({ name: nonEmptyText, url: externalUrl }),
  socialLinks: z.array(externalLinkSchema.extend({ url: externalUrl })),
  whatsappGreeting: nonEmptyText,
  copyrightStartYear: z.number().int().min(2000),
  wordmark: z.object({ lead: nonEmptyText, accent: nonEmptyText }),
});

export const navigationSchema = z.object({
  headerLinks: z.array(internalLinkSchema).min(1),
  headerCta: internalLinkSchema,
  footerGroups: z.array(z.object({ title: nonEmptyText, links: z.array(internalLinkSchema).min(1) })),
});

export const founderSchema = z.object({
  id: nonEmptyText,
  name: nonEmptyText,
  role: nonEmptyText,
  photo: z.object({ src: internalPath, alt: nonEmptyText }),
  badgeLabel: nonEmptyText,
  shortBio: nonEmptyText,
  links: z.array(externalLinkSchema),
});

export const companyTypeSchema = z.enum(["service-based", "product-based"]);

export const programSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  kind: z.enum(["core", "add-on"]),
  title: nonEmptyText,
  audienceLabel: nonEmptyText,
  semesterLabel: nonEmptyText,
  durationLabel: nonEmptyText,
  totalHours: z.number().int().positive(),
  deliveryMode: nonEmptyText,
  summary: nonEmptyText,
  outcome: nonEmptyText,
  eligibility: nonEmptyText,
  trackSlugs: z.array(companyTypeSchema).min(1),
  curriculum: z
    .array(
      z.object({ periodLabel: nonEmptyText, title: nonEmptyText, description: nonEmptyText, aiPractice: nonEmptyText }),
    )
    .min(1),
  tools: z.array(nonEmptyText),
  assessments: nonEmptyText,
  certificate: nonEmptyText,
  timelineMilestones: z.array(z.object({ shortLabel: nonEmptyText, title: nonEmptyText })),
});

export const trackSchema = z.object({
  slug: companyTypeSchema,
  title: nonEmptyText,
  description: nonEmptyText,
  companyTests: z.array(nonEmptyText).min(1),
});

export const statSchema = z.object({
  value: z.number().nonnegative(),
  suffix: z.string(),
  label: nonEmptyText,
  footnote: nonEmptyText,
});

export const organizationNameSchema = z.object({ name: nonEmptyText });

export const placementSchema = z.object({
  studentName: nonEmptyText,
  companyName: nonEmptyText,
  packageLpa: z.number().positive(),
});

export const batchResultSchema = z.object({
  collegeName: nonEmptyText,
  batchYear: z.number().int().min(2000),
  programSlug: nonEmptyText,
  studentsTrained: z.number().int().positive(),
  offers: z.number().int().nonnegative(),
  recruiters: z.number().int().nonnegative(),
  placementPercentBefore: z.number().min(0).max(100),
  placementPercentAfter: z.number().min(0).max(100),
});

export const testimonialSchema = z.object({
  quote: nonEmptyText,
  studentName: nonEmptyText,
  companyName: nonEmptyText,
  packageLpa: z.number().positive(),
});

export const faqItemSchema = z.object({ id: nonEmptyText, question: nonEmptyText, answer: nonEmptyText });

export const serviceSchema = z.object({
  label: nonEmptyText,
  title: nonEmptyText,
  description: nonEmptyText,
  variant: z.enum(["feature", "highlight", "standard"]),
});

export const sampleReportSchema = z.object({
  caption: nonEmptyText,
  columns: z.array(nonEmptyText).length(5),
  rows: z.array(
    z.object({
      studentName: nonEmptyText,
      attendancePercent: z.number().min(0).max(100),
      contestScore: z.number().min(0).max(100),
      mocksCompleted: nonEmptyText,
      status: z.enum(["ready", "needs-work"]),
    }),
  ),
  statusLabels: z.object({ ready: nonEmptyText, "needs-work": nonEmptyText }),
});

export const titledItemSchema = z.object({ title: nonEmptyText, description: nonEmptyText });

export const processStepSchema = titledItemSchema.extend({ timingLabel: nonEmptyText });

export const engagementModelSchema = titledItemSchema.extend({
  badgeLabel: nonEmptyText,
  points: z.array(nonEmptyText).min(1),
  isHighlighted: z.boolean(),
});

export const trainerSchema = z.object({
  name: nonEmptyText,
  role: nonEmptyText,
  experienceLabel: nonEmptyText,
  bio: nonEmptyText,
});

export const aiApproachSchema = z.object({
  principles: z.array(titledItemSchema).min(1),
  industrySignals: z.array(z.object({ source: nonEmptyText, finding: nonEmptyText, url: externalUrl })),
});

export const announcementSchema = z.object({
  id: nonEmptyText,
  message: nonEmptyText,
  linkLabel: nonEmptyText,
  linkHref: internalPath,
  startsOn: isoDate,
  endsOn: isoDate,
});

export const lessonSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  title: nonEmptyText,
  youtubeVideoId: z.string().regex(/^[\w-]{11}$/),
  durationSeconds: z.number().int().nonnegative(),
  publishedOn: isoDate.optional(),
  canPlayOnWebsite: z.boolean().default(true),
});

export const courseSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  title: nonEmptyText,
  summary: nonEmptyText,
  level: z.enum(["Beginner", "Intermediate", "Advanced"]),
  seriesStatus: z.enum(["complete", "in-progress"]),
  techStack: z.array(nonEmptyText).min(1),
  youtubePlaylistUrl: externalUrl.nullable(),
  modules: z.array(z.object({ title: nonEmptyText, lessons: z.array(lessonSchema).min(1) })).min(1),
});

const sectionCopy = {
  eyebrow: nonEmptyText,
  heading: nonEmptyText,
  description: nonEmptyText.optional(),
};

export const sectionSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("hero"),
    ...sectionCopy,
    description: nonEmptyText,
    primaryCta: internalLinkSchema,
    secondaryCta: internalLinkSchema,
    showWhatsappCta: z.boolean(),
    founderStrip: titledItemSchema,
    trustPoints: z.array(nonEmptyText),
    ringOuterText: nonEmptyText,
    ringInnerText: nonEmptyText,
    badges: z.array(z.object({ value: nonEmptyText, label: nonEmptyText })).max(2),
  }),
  z.object({
    type: z.literal("pageHero"),
    ...sectionCopy,
    primaryCta: internalLinkSchema.optional(),
    secondaryCta: internalLinkSchema.optional(),
  }),
  z.object({
    type: z.literal("logoWall"),
    eyebrow: nonEmptyText,
    groups: z.array(z.object({ label: nonEmptyText, source: z.enum(["colleges", "recruiters"]) })).min(1),
  }),
  z.object({ type: z.literal("stats"), ...sectionCopy }),
  z.object({
    type: z.literal("programTimeline"),
    ...sectionCopy,
    cta: internalLinkSchema.optional(),
    finishLabel: nonEmptyText,
    finishNodeLabel: nonEmptyText,
  }),
  z.object({ type: z.literal("aiApproach"), ...sectionCopy, signalsHeading: nonEmptyText }),
  z.object({ type: z.literal("services"), ...sectionCopy }),
  z.object({ type: z.literal("process"), ...sectionCopy }),
  z.object({
    type: z.literal("placementRecord"),
    ...sectionCopy,
    limit: z.number().int().positive().nullable(),
    cta: internalLinkSchema.optional(),
  }),
  z.object({
    type: z.literal("testimonials"),
    ...sectionCopy,
    limit: z.number().int().positive().nullable(),
  }),
  z.object({
    type: z.literal("courseShowcase"),
    ...sectionCopy,
    limit: z.number().int().positive(),
    cta: internalLinkSchema.optional(),
  }),
  z.object({ type: z.literal("founders"), ...sectionCopy }),
  z.object({
    type: z.literal("engagementModels"),
    ...sectionCopy,
    footnote: nonEmptyText,
    cta: internalLinkSchema,
  }),
  z.object({ type: z.literal("faq"), ...sectionCopy, faqIds: z.array(nonEmptyText).min(1) }),
  z.object({
    type: z.literal("ctaBand"),
    ...sectionCopy,
    description: nonEmptyText,
    primaryCta: internalLinkSchema,
    secondaryCta: internalLinkSchema,
  }),
  z.object({ type: z.literal("collegeChallenges"), ...sectionCopy }),
  z.object({ type: z.literal("programOverview"), ...sectionCopy }),
  z.object({ type: z.literal("tracks"), ...sectionCopy }),
  z.object({ type: z.literal("batchResults"), ...sectionCopy }),
  z.object({ type: z.literal("studentBenefits"), ...sectionCopy }),
  z.object({ type: z.literal("values"), ...sectionCopy }),
  z.object({ type: z.literal("trainers"), ...sectionCopy }),
]);

export const pageSeoSchema = z.object({ title: nonEmptyText.max(70), description: nonEmptyText.max(160) });

export const composedPageSchema = z.object({
  seo: pageSeoSchema,
  breadcrumbLabel: nonEmptyText.optional(),
  sections: z.array(sectionSchema).min(1),
});

export const ctaBandCopySchema = z.object({
  eyebrow: nonEmptyText,
  heading: nonEmptyText,
  description: nonEmptyText,
  primaryCta: internalLinkSchema,
  secondaryCta: internalLinkSchema,
});

export type Site = z.infer<typeof siteSchema>;
export type Navigation = z.infer<typeof navigationSchema>;
export type Founder = z.infer<typeof founderSchema>;
export type Program = z.infer<typeof programSchema>;
export type Track = z.infer<typeof trackSchema>;
export type CompanyType = z.infer<typeof companyTypeSchema>;
export type Stat = z.infer<typeof statSchema>;
export type Placement = z.infer<typeof placementSchema>;
export type BatchResult = z.infer<typeof batchResultSchema>;
export type Testimonial = z.infer<typeof testimonialSchema>;
export type FaqItem = z.infer<typeof faqItemSchema>;
export type Service = z.infer<typeof serviceSchema>;
export type SampleReport = z.infer<typeof sampleReportSchema>;
export type TitledItem = z.infer<typeof titledItemSchema>;
export type ProcessStep = z.infer<typeof processStepSchema>;
export type EngagementModel = z.infer<typeof engagementModelSchema>;
export type Trainer = z.infer<typeof trainerSchema>;
export type AiApproach = z.infer<typeof aiApproachSchema>;
export type Announcement = z.infer<typeof announcementSchema>;
export type Course = z.infer<typeof courseSchema>;
export type CourseModule = Course["modules"][number];
export type Lesson = z.infer<typeof lessonSchema>;
export type Section = z.infer<typeof sectionSchema>;
export type SectionType = Section["type"];
export type SectionOf<Type extends SectionType> = Extract<Section, { type: Type }>;
export type ComposedPage = z.infer<typeof composedPageSchema>;
export type PageSeo = z.infer<typeof pageSeoSchema>;
export type InternalLink = z.infer<typeof internalLinkSchema>;
export type ExternalLink = z.infer<typeof externalLinkSchema>;
export type CtaBandCopy = z.infer<typeof ctaBandCopySchema>;
