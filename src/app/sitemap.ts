import type { MetadataRoute } from "next";
import { coursesContent, foundersContent, navigationContent, programsContent } from "@/content";
import {
  getYoutubeEmbedUrl,
  getYoutubeThumbnailUrl,
  isLessonPlayableOnWebsite,
  listLessonsInOrder,
} from "@/lib/course-catalog";
import { buildLessonDescription } from "@/lib/lesson-description";
import { toAbsoluteUrl } from "@/lib/site-url";

const marketingPaths = [
  "/",
  "/for-colleges",
  "/programs",
  "/courses",
  "/placements",
  "/about",
  "/book-demo",
  "/privacy",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const navigationPaths = navigationContent.headerLinks.map((link) => link.href);
  const pageEntries = [...new Set([...marketingPaths, ...navigationPaths])].map((pagePath) => ({
    url: toAbsoluteUrl(pagePath),
    changeFrequency: "monthly" as const,
    priority: pagePath === "/" ? 1 : 0.8,
    images: pagePath === "/" ? foundersContent.map((founder) => toAbsoluteUrl(founder.photo.src)) : undefined,
  }));
  const programEntries = programsContent.map((program) => ({
    url: toAbsoluteUrl(`/programs/${program.slug}`),
    changeFrequency: "monthly" as const,
    priority: program.kind === "core" ? 0.9 : 0.7,
  }));
  const courseEntries = coursesContent.flatMap((course) => {
    const lessons = listLessonsInOrder(course);
    const courseEntry = {
      url: toAbsoluteUrl(`/courses/${course.slug}`),
      changeFrequency: "weekly" as const,
      priority: 0.7,
      images: lessons[0] ? [getYoutubeThumbnailUrl(lessons[0].youtubeVideoId)] : undefined,
    };
    const lessonEntries = lessons.filter(isLessonPlayableOnWebsite).map((lesson) => ({
      url: toAbsoluteUrl(`/courses/${course.slug}/${lesson.slug}`),
      changeFrequency: "monthly" as const,
      priority: 0.5,
      videos: [
        {
          title: `${lesson.title} | ${course.title}`,
          thumbnail_loc: getYoutubeThumbnailUrl(lesson.youtubeVideoId),
          description: buildLessonDescription(course, lesson.slug),
          player_loc: getYoutubeEmbedUrl(lesson.youtubeVideoId, { autoplay: false }),
          ...(lesson.durationSeconds > 0 ? { duration: lesson.durationSeconds } : {}),
          ...(lesson.publishedOn ? { publication_date: lesson.publishedOn } : {}),
        },
      ],
    }));
    return [courseEntry, ...lessonEntries];
  });
  return [...pageEntries, ...programEntries, ...courseEntries];
}
