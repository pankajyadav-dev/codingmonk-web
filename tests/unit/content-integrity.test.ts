import { describe, expect, test } from "bun:test";
import { coursesContent, findContentIntegrityProblems, navigationContent, programsContent } from "@/content";
import { findLessonWithNeighbours, listLessonsInOrder } from "@/lib/course-catalog";

describe("content", () => {
  test("has no broken references or duplicates", () => {
    expect(findContentIntegrityProblems()).toEqual([]);
  });
  test("footer program links point at real programs", () => {
    const programPaths = new Set(programsContent.map((program) => `/programs/${program.slug}`));
    const footerProgramLinks = navigationContent.footerGroups
      .flatMap((group) => group.links)
      .filter((link) => link.href.startsWith("/programs/"));
    for (const link of footerProgramLinks) expect(programPaths.has(link.href)).toBe(true);
  });
  test("lesson navigation walks the whole course in order", () => {
    for (const course of coursesContent) {
      const lessons = listLessonsInOrder(course);
      expect(findLessonWithNeighbours(course, lessons[0]?.slug ?? "")?.previousLesson).toBeUndefined();
      expect(findLessonWithNeighbours(course, lessons.at(-1)?.slug ?? "")?.nextLesson).toBeUndefined();
      expect(lessons.map((lesson) => lesson.positionInCourse)).toEqual(lessons.map((_, index) => index + 1));
    }
  });
});
