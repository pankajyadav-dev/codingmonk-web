import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LessonSections } from "@/components/sections/course-sections";
import { coursesContent, getCourseBySlug } from "@/content";
import { findLessonWithNeighbours, getYoutubeThumbnailUrl, listLessonsInOrder } from "@/lib/course-catalog";
import { buildLessonDescription } from "@/lib/lesson-description";
import { buildPageMetadata } from "@/lib/page-metadata";

export function generateStaticParams() {
  return coursesContent.flatMap((course) =>
    listLessonsInOrder(course).map((lesson) => ({ courseSlug: course.slug, lessonSlug: lesson.slug })),
  );
}

export async function generateMetadata({ params }: PageProps<"/courses/[courseSlug]/[lessonSlug]">): Promise<Metadata> {
  const { courseSlug, lessonSlug } = await params;
  const course = getCourseBySlug(courseSlug);
  const lessonContext = course ? findLessonWithNeighbours(course, lessonSlug) : undefined;
  if (!course || !lessonContext) return {};
  return buildPageMetadata({
    title: `${lessonContext.lesson.title} | ${course.title}`,
    description: buildLessonDescription(course, lessonSlug),
    path: `/courses/${course.slug}/${lessonSlug}`,
    imageUrl: getYoutubeThumbnailUrl(lessonContext.lesson.youtubeVideoId),
    openGraphType: "video.other",
    isIndexable: lessonContext.lesson.canPlayOnWebsite,
  });
}

export default async function LessonPage({ params }: PageProps<"/courses/[courseSlug]/[lessonSlug]">) {
  const { courseSlug, lessonSlug } = await params;
  const course = getCourseBySlug(courseSlug);
  if (!course || !findLessonWithNeighbours(course, lessonSlug)) notFound();
  return <LessonSections course={course} lessonSlug={lessonSlug} />;
}
