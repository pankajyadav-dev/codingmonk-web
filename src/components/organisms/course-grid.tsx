"use client";

import { CourseCard } from "@/components/molecules/course-card";
import type { Course } from "@/content/schemas";
import { listLessonsInOrder } from "@/lib/course-catalog";
import { buildLessonKey, useCompletedLessons } from "@/lib/use-course-progress";
import { CardGrid } from "./card-grid";

type CourseGridProps = {
  courses: Course[];
  lessonsUnit: string;
  seriesStatusLabels: Record<Course["seriesStatus"], string>;
  progressLabel: string;
};

export function CourseGrid({ courses, lessonsUnit, seriesStatusLabels, progressLabel }: CourseGridProps) {
  const completedLessonKeys = useCompletedLessons();
  return (
    <CardGrid>
      {courses.map((course) => {
        const lessons = listLessonsInOrder(course);
        const completedCount = lessons.filter((lesson) =>
          completedLessonKeys.has(buildLessonKey(course.slug, lesson.slug)),
        ).length;
        return (
          <li key={course.slug}>
            <CourseCard
              course={course}
              lessonsUnit={lessonsUnit}
              seriesStatusLabel={seriesStatusLabels[course.seriesStatus]}
              percentWatched={lessons.length ? Math.round((100 * completedCount) / lessons.length) : 0}
              progressLabel={progressLabel}
            />
          </li>
        );
      })}
    </CardGrid>
  );
}
