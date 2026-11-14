import { Badge } from "@/components/atoms/badge";
import { ButtonLink } from "@/components/atoms/button";
import { Text } from "@/components/atoms/text";
import { Breadcrumbs } from "@/components/molecules/breadcrumbs";
import { CourseContentList } from "@/components/organisms/course-content-list";
import { LessonPlayer } from "@/components/organisms/lesson-player";
import { PageHeader } from "@/components/organisms/page-header";
import { PageSection } from "@/components/organisms/page-section";
import { StructuredData } from "@/components/organisms/structured-data";
import { courseDetailCopy, coursesPageCopy, sharedUiCopy, siteContent } from "@/content";
import type { Course } from "@/content/schemas";
import {
  countLessons,
  findLessonWithNeighbours,
  listLessonsInOrder,
  sumCourseDurationSeconds,
} from "@/lib/course-catalog";
import { fillTemplate, formatCourseLength } from "@/lib/format";
import { buildLessonDescription } from "@/lib/lesson-description";
import { buildBreadcrumbJsonLd, buildCourseJsonLd, buildLessonVideoJsonLd } from "@/lib/structured-data";

function courseBreadcrumbs(course: Course) {
  return [
    { name: sharedUiCopy.breadcrumbHomeLabel, path: "/" },
    { name: courseDetailCopy.breadcrumbLabel, path: "/courses" },
    { name: course.title, path: `/courses/${course.slug}` },
  ];
}

export function CourseOverviewSections({ course }: { course: Course }) {
  const [firstLesson] = listLessonsInOrder(course);
  return (
    <>
      <PageHeader
        breadcrumbs={courseBreadcrumbs(course).map((crumb, crumbIndex, crumbs) => ({
          label: crumb.name,
          href: crumbIndex < crumbs.length - 1 ? crumb.path : undefined,
        }))}
        breadcrumbAriaLabel={sharedUiCopy.breadcrumbAriaLabel}
        eyebrow={`${course.level} · ${countLessons(course)} ${courseDetailCopy.lessonCountLabel} · ${formatCourseLength(sumCourseDurationSeconds(course))}`}
        heading={course.title}
        description={course.summary}
        primaryCta={
          firstLesson
            ? { label: courseDetailCopy.startCourseLabel, href: `/courses/${course.slug}/${firstLesson.slug}` }
            : undefined
        }
      >
        <ul className="flex flex-wrap gap-2">
          <li>
            <Badge variant={course.seriesStatus === "complete" ? "success" : "soft"}>
              {coursesPageCopy.seriesStatusLabels[course.seriesStatus]}
            </Badge>
          </li>
          {course.techStack.map((technology) => (
            <li key={technology}>
              <Badge variant="tag">{technology}</Badge>
            </li>
          ))}
        </ul>
      </PageHeader>
      <PageSection className="pt-10 lg:pt-12">
        <div className="grid gap-6 lg:max-w-[880px]">
          {course.seriesStatus === "in-progress" ? <Text>{courseDetailCopy.inProgressNotice}</Text> : null}
          <CourseContentList
            course={course}
            labels={{
              heading: courseDetailCopy.courseContentHeading,
              progressTemplate: courseDetailCopy.progressLabel,
              youtubeOnlyLabel: courseDetailCopy.youtubeOnlyLessonLabel,
            }}
          />
          {course.youtubePlaylistUrl ? (
            <ButtonLink href={course.youtubePlaylistUrl} variant="secondary" className="justify-self-start">
              {courseDetailCopy.openPlaylistLabel}
            </ButtonLink>
          ) : null}
        </div>
      </PageSection>
      <StructuredData data={buildCourseJsonLd(course, siteContent.language)} />
      <StructuredData data={buildBreadcrumbJsonLd(courseBreadcrumbs(course))} />
    </>
  );
}

export function LessonSections({ course, lessonSlug }: { course: Course; lessonSlug: string }) {
  const lessonContext = findLessonWithNeighbours(course, lessonSlug);
  if (!lessonContext) return null;
  const { lesson, previousLesson, nextLesson, totalLessons } = lessonContext;
  const lessonPath = `/courses/${course.slug}/${lesson.slug}`;
  return (
    <>
      <div className="w-full px-gutter pt-6">
        <Breadcrumbs
          ariaLabel={sharedUiCopy.breadcrumbAriaLabel}
          items={[
            ...courseBreadcrumbs(course).map((crumb) => ({ label: crumb.name, href: crumb.path })),
            { label: lesson.title },
          ]}
        />
      </div>
      <section
        aria-labelledby="lesson-title"
        className="grid w-full items-start gap-6 px-gutter pt-5 pb-16 lg:grid-cols-[minmax(0,1fr)_clamp(320px,28vw,440px)] lg:gap-9"
      >
        <div className="grid gap-4">
          <LessonPlayer
            key={lesson.slug}
            courseSlug={course.slug}
            lesson={lesson}
            previousLesson={previousLesson}
            nextLesson={nextLesson}
            labels={{
              playVideoLabel: courseDetailCopy.playVideoLabel,
              previousLessonLabel: courseDetailCopy.previousLessonLabel,
              nextLessonLabel: courseDetailCopy.nextLessonLabel,
              markCompleteLabel: courseDetailCopy.markCompleteLabel,
              completedLabel: courseDetailCopy.completedLabel,
              openOnYoutubeLabel: courseDetailCopy.openOnYoutubeLabel,
              videoUnavailableHeading: courseDetailCopy.videoUnavailableHeading,
              videoUnavailableDescription: courseDetailCopy.videoUnavailableDescription,
            }}
          />
          <p className="text-caption font-bold text-brand-strong">
            {fillTemplate(courseDetailCopy.lessonPositionLabel, {
              current: lesson.positionInCourse,
              total: totalLessons,
            })}{" "}
            · {lesson.moduleTitle}
          </p>
          <h1 id="lesson-title" className="font-display text-heading-lg font-extrabold">
            {lesson.title}
          </h1>
          <Text measure="readable">{buildLessonDescription(course, lesson.slug)}</Text>
        </div>
        <CourseContentList
          course={course}
          currentLessonSlug={lesson.slug}
          labels={{
            heading: courseDetailCopy.courseContentHeading,
            progressTemplate: courseDetailCopy.progressLabel,
            youtubeOnlyLabel: courseDetailCopy.youtubeOnlyLessonLabel,
          }}
        />
      </section>
      {lesson.canPlayOnWebsite ? (
        <StructuredData
          data={buildLessonVideoJsonLd(
            course,
            lesson,
            buildLessonDescription(course, lesson.slug),
            siteContent.language,
          )}
        />
      ) : null}
      <StructuredData
        data={buildBreadcrumbJsonLd([...courseBreadcrumbs(course), { name: lesson.title, path: lessonPath }])}
      />
    </>
  );
}
