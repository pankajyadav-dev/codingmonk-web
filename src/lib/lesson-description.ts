import { courseDetailCopy } from "@/content";
import type { Course } from "@/content/schemas";
import { findLessonWithNeighbours } from "./course-catalog";
import { fillTemplate } from "./format";

export function buildLessonDescription(course: Course, lessonSlug: string) {
  const lessonContext = findLessonWithNeighbours(course, lessonSlug);
  if (!lessonContext) return course.summary;
  return fillTemplate(courseDetailCopy.lessonDescriptionTemplate, {
    current: lessonContext.lesson.positionInCourse,
    total: lessonContext.totalLessons,
    course: course.title,
    module: lessonContext.lesson.moduleTitle,
  });
}
