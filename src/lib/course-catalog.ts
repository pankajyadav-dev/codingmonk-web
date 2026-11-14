import type { Course, CourseModule, Lesson } from "@/content/schemas";

export type LessonInCourse = Lesson & { moduleTitle: string; positionInCourse: number };

export function listLessonsInOrder(course: Course): LessonInCourse[] {
  let positionInCourse = 0;
  return course.modules.flatMap((courseModule: CourseModule) =>
    courseModule.lessons.map((lesson) => {
      positionInCourse += 1;
      return { ...lesson, moduleTitle: courseModule.title, positionInCourse };
    }),
  );
}

export function countLessons(course: Course) {
  return course.modules.reduce((total, courseModule) => total + courseModule.lessons.length, 0);
}

export function sumCourseDurationSeconds(course: Course) {
  return listLessonsInOrder(course).reduce((total, lesson) => total + lesson.durationSeconds, 0);
}

export function findLessonWithNeighbours(course: Course, lessonSlug: string) {
  const lessons = listLessonsInOrder(course);
  const lessonIndex = lessons.findIndex((lesson) => lesson.slug === lessonSlug);
  if (lessonIndex === -1) return undefined;
  return {
    lesson: lessons[lessonIndex] as LessonInCourse,
    previousLesson: lessons[lessonIndex - 1],
    nextLesson: lessons[lessonIndex + 1],
    totalLessons: lessons.length,
  };
}

export function getYoutubeThumbnailUrl(youtubeVideoId: string) {
  return `https://i.ytimg.com/vi/${youtubeVideoId}/hqdefault.jpg`;
}

export function getYoutubeWatchUrl(youtubeVideoId: string) {
  return `https://www.youtube.com/watch?v=${youtubeVideoId}`;
}

export const youtubeEmbedOrigin = "https://www.youtube-nocookie.com";

type EmbedOptions = { autoplay?: boolean; listenForErrors?: boolean };

export function getYoutubeEmbedUrl(
  youtubeVideoId: string,
  { autoplay = true, listenForErrors = false }: EmbedOptions = {},
) {
  const embedParameters = new URLSearchParams({ rel: "0", modestbranding: "1" });
  if (autoplay) embedParameters.set("autoplay", "1");
  if (listenForErrors && typeof window !== "undefined") {
    embedParameters.set("enablejsapi", "1");
    embedParameters.set("origin", window.location.origin);
  }
  return `${youtubeEmbedOrigin}/embed/${youtubeVideoId}?${embedParameters.toString()}`;
}

export function isLessonPlayableOnWebsite(lesson: Lesson) {
  return lesson.canPlayOnWebsite;
}
