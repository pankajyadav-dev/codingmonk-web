import Image from "next/image";
import { AppLink } from "@/components/atoms/app-link";
import { Badge } from "@/components/atoms/badge";
import { ProgressBar } from "@/components/atoms/progress-bar";
import type { Course } from "@/content/schemas";
import { countLessons, getYoutubeThumbnailUrl, sumCourseDurationSeconds } from "@/lib/course-catalog";
import { formatCourseLength } from "@/lib/format";

type CourseCardProps = {
  course: Course;
  lessonsUnit: string;
  seriesStatusLabel: string;
  percentWatched: number;
  progressLabel: string;
};

export function CourseCard({ course, lessonsUnit, seriesStatusLabel, percentWatched, progressLabel }: CourseCardProps) {
  const firstLesson = course.modules[0]?.lessons[0];
  return (
    <AppLink
      href={`/courses/${course.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-lg border border-line bg-background transition-[transform,border-color] duration-150 hover:-translate-y-1 hover:border-brand"
    >
      <span className="relative block aspect-video bg-surface">
        {firstLesson ? (
          <Image
            src={getYoutubeThumbnailUrl(firstLesson.youtubeVideoId)}
            alt=""
            fill
            sizes="(min-width: 1280px) 25vw, (min-width: 768px) 45vw, 100vw"
            className="object-cover"
          />
        ) : null}
        <Badge variant="brand" className="absolute bottom-3 left-3">
          {countLessons(course)} {lessonsUnit} · {formatCourseLength(sumCourseDurationSeconds(course))}
        </Badge>
      </span>
      <ProgressBar
        percentComplete={percentWatched}
        label={`${percentWatched}% ${progressLabel}`}
        className="rounded-none"
      />
      <span className="flex flex-1 flex-col gap-2 p-4">
        <span className="font-display text-heading-sm font-bold text-ink">{course.title}</span>
        <span className="line-clamp-3 text-body-sm text-muted">{course.summary}</span>
        <span className="mt-auto flex flex-wrap gap-1.5 pt-2">
          <Badge variant="soft">{course.level}</Badge>
          <Badge variant={course.seriesStatus === "complete" ? "success" : "soft"}>{seriesStatusLabel}</Badge>
        </span>
      </span>
    </AppLink>
  );
}
