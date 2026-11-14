"use client";

import { Check, ExternalLink } from "lucide-react";
import { AppLink } from "@/components/atoms/app-link";
import { ProgressBar } from "@/components/atoms/progress-bar";
import type { Course } from "@/content/schemas";
import { cn } from "@/lib/class-names";
import { fillTemplate, formatVideoDuration } from "@/lib/format";
import { buildLessonKey, useCompletedLessons } from "@/lib/use-course-progress";

type CourseContentListProps = {
  course: Course;
  currentLessonSlug?: string;
  labels: { heading: string; progressTemplate: string; youtubeOnlyLabel: string };
};

export function CourseContentList({ course, currentLessonSlug, labels }: CourseContentListProps) {
  const completedLessonKeys = useCompletedLessons();
  const allLessons = course.modules.flatMap((courseModule) => courseModule.lessons);
  const completedCount = allLessons.filter((lesson) =>
    completedLessonKeys.has(buildLessonKey(course.slug, lesson.slug)),
  ).length;
  const progressText = fillTemplate(labels.progressTemplate, { completed: completedCount, total: allLessons.length });
  return (
    <aside
      aria-label={labels.heading}
      className="flex max-h-[calc(100vh-110px)] flex-col overflow-hidden rounded-lg border border-line bg-background lg:sticky lg:top-24"
    >
      <div className="grid gap-2 border-b border-line p-4">
        <h2 className="font-display text-heading-sm font-bold">{labels.heading}</h2>
        <p className="text-body-sm text-muted">{progressText}</p>
        <ProgressBar
          percentComplete={allLessons.length ? (100 * completedCount) / allLessons.length : 0}
          label={progressText}
        />
      </div>
      <div className="overflow-y-auto">
        {course.modules.map((courseModule) => {
          const containsCurrentLesson = courseModule.lessons.some((lesson) => lesson.slug === currentLessonSlug);
          return (
            <details
              key={courseModule.title}
              open={containsCurrentLesson || !currentLessonSlug}
              className="border-b border-line last:border-b-0"
            >
              <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 bg-surface px-4 py-3 text-body-sm font-bold [&::-webkit-details-marker]:hidden">
                <span>{courseModule.title}</span>
                <span className="text-caption font-semibold text-muted tabular-nums">
                  {courseModule.lessons.length}
                </span>
              </summary>
              <ol>
                {courseModule.lessons.map((lesson) => {
                  const isCurrent = lesson.slug === currentLessonSlug;
                  const isCompleted = completedLessonKeys.has(buildLessonKey(course.slug, lesson.slug));
                  return (
                    <li key={lesson.slug}>
                      <AppLink
                        href={`/courses/${course.slug}/${lesson.slug}`}
                        aria-current={isCurrent ? "page" : undefined}
                        className={cn(
                          "grid grid-cols-[20px_minmax(0,1fr)_auto] items-start gap-3 border-t border-line px-4 py-3 text-body-sm transition-colors hover:bg-brand-glow",
                          isCurrent && "bg-brand-glow shadow-[inset_3px_0_0_var(--brand)]",
                        )}
                      >
                        <span
                          className={cn(
                            "mt-0.5 grid size-5 place-items-center rounded-full border-[1.5px]",
                            isCompleted ? "border-success bg-success text-background" : "border-line",
                          )}
                        >
                          {isCompleted ? <Check aria-hidden="true" className="size-3" /> : null}
                        </span>
                        <span className="leading-snug">
                          {lesson.title}
                          {lesson.canPlayOnWebsite ? null : (
                            <span className="mt-1 flex items-center gap-1 text-caption font-semibold text-muted">
                              <ExternalLink aria-hidden="true" className="size-3" />
                              {labels.youtubeOnlyLabel}
                            </span>
                          )}
                        </span>
                        <span className="text-caption text-muted tabular-nums">
                          {formatVideoDuration(lesson.durationSeconds)}
                        </span>
                      </AppLink>
                    </li>
                  );
                })}
              </ol>
            </details>
          );
        })}
      </div>
    </aside>
  );
}
