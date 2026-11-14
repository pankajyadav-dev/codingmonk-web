import type {
  BreadcrumbList,
  Course as CourseSchema,
  EducationalOccupationalProgram,
  EducationalOrganization,
  FAQPage,
  VideoObject,
  WebSite,
  WithContext,
} from "schema-dts";
import type { Course, FaqItem, Founder, Program, Site } from "@/content/schemas";
import {
  countLessons,
  getYoutubeEmbedUrl,
  getYoutubeThumbnailUrl,
  getYoutubeWatchUrl,
  sumCourseDurationSeconds,
} from "./course-catalog";
import { toAbsoluteUrl } from "./site-url";

const organizationId = () => toAbsoluteUrl("/#organization");

export function toIsoDuration(totalSeconds: number) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `PT${hours ? `${hours}H` : ""}${minutes ? `${minutes}M` : ""}${seconds}S`;
}

export function buildOrganizationJsonLd(site: Site, founders: Founder[]): WithContext<EducationalOrganization> {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "@id": organizationId(),
    name: site.name,
    legalName: site.legalName,
    url: toAbsoluteUrl("/"),
    logo: toAbsoluteUrl("/icon/android-512"),
    description: site.description,
    slogan: site.tagline,
    email: site.contact.email,
    telephone: site.contact.phoneInternational,
    areaServed: { "@type": "Country", name: "India" },
    sameAs: [site.youtubeChannel.url, ...site.socialLinks.map((socialLink) => socialLink.url)],
    founder: founders.map((founder) => ({ "@type": "Person", name: founder.name, jobTitle: founder.role })),
  };
}

export function buildWebsiteJsonLd(site: Site): WithContext<WebSite> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": toAbsoluteUrl("/#website"),
    url: toAbsoluteUrl("/"),
    name: site.name,
    inLanguage: site.language,
    publisher: { "@id": organizationId() },
  };
}

export function buildBreadcrumbJsonLd(crumbs: { name: string; path: string }[]): WithContext<BreadcrumbList> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, crumbIndex) => ({
      "@type": "ListItem",
      position: crumbIndex + 1,
      name: crumb.name,
      item: toAbsoluteUrl(crumb.path),
    })),
  };
}

export function buildFaqPageJsonLd(faqItems: FaqItem[]): WithContext<FAQPage> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((faqItem) => ({
      "@type": "Question",
      name: faqItem.question,
      acceptedAnswer: { "@type": "Answer", text: faqItem.answer },
    })),
  };
}

export function buildProgramJsonLd(program: Program): WithContext<EducationalOccupationalProgram> {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOccupationalProgram",
    name: program.title,
    description: program.summary,
    url: toAbsoluteUrl(`/programs/${program.slug}`),
    provider: { "@id": organizationId() },
    educationalProgramMode: "in-person",
    timeToComplete: program.durationLabel,
    programPrerequisites: program.eligibility,
    occupationalCategory: "15-1252.00",
  };
}

export function buildCourseJsonLd(course: Course, language: string): WithContext<CourseSchema> {
  const totalDuration = toIsoDuration(sumCourseDurationSeconds(course));
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    "@id": toAbsoluteUrl(`/courses/${course.slug}#course`),
    name: course.title,
    description: course.summary,
    url: toAbsoluteUrl(`/courses/${course.slug}`),
    inLanguage: language,
    educationalLevel: course.level,
    teaches: course.techStack,
    isAccessibleForFree: true,
    numberOfCredits: countLessons(course),
    provider: { "@id": organizationId() },
    offers: { "@type": "Offer", category: "Free", price: 0, priceCurrency: "INR" },
    hasCourseInstance: { "@type": "CourseInstance", courseMode: "Online", courseWorkload: totalDuration },
  };
}

type LessonForStructuredData = {
  slug: string;
  title: string;
  youtubeVideoId: string;
  durationSeconds: number;
  publishedOn?: string;
};

export function buildLessonVideoJsonLd(
  course: Course,
  lesson: LessonForStructuredData,
  description: string,
  language: string,
): WithContext<VideoObject> {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: `${lesson.title} | ${course.title}`,
    description,
    thumbnailUrl: getYoutubeThumbnailUrl(lesson.youtubeVideoId),
    embedUrl: getYoutubeEmbedUrl(lesson.youtubeVideoId, { autoplay: false }),
    contentUrl: getYoutubeWatchUrl(lesson.youtubeVideoId),
    url: toAbsoluteUrl(`/courses/${course.slug}/${lesson.slug}`),
    inLanguage: language,
    isPartOf: { "@id": toAbsoluteUrl(`/courses/${course.slug}#course`) },
    publisher: { "@id": organizationId() },
    ...(lesson.durationSeconds > 0 ? { duration: toIsoDuration(lesson.durationSeconds) } : {}),
    ...(lesson.publishedOn ? { uploadDate: lesson.publishedOn } : {}),
  };
}
