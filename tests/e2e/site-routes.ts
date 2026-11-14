import courses from "../../content/courses.json";
import programs from "../../content/programs.json";

const lessonsOf = (course: (typeof courses)[number]) => course.modules.flatMap((courseModule) => courseModule.lessons);
const playableLessonsOf = (course: (typeof courses)[number]) =>
  lessonsOf(course).filter((lesson) => lesson.canPlayOnWebsite !== false);

const firstCourse = courses[0];
const firstLessonOfFirstCourse = firstCourse ? playableLessonsOf(firstCourse)[0] : undefined;

export function countLessonsInCourse(courseSlug: string) {
  const course = courses.find((candidate) => candidate.slug === courseSlug);
  return course ? lessonsOf(course).length : 0;
}

export const youtubeOnlyLessonRoute = courses
  .flatMap((course) =>
    lessonsOf(course)
      .filter((lesson) => lesson.canPlayOnWebsite === false)
      .map((lesson) => `/courses/${course.slug}/${lesson.slug}`),
  )
  .at(0);

export const marketingRoutes = [
  "/",
  "/for-colleges",
  "/programs",
  "/courses",
  "/placements",
  "/about",
  "/book-demo",
  "/privacy",
];

export const detailRoutes = [
  ...programs.map((program) => `/programs/${program.slug}`),
  ...(firstCourse ? [`/courses/${firstCourse.slug}`] : []),
  ...(firstCourse && firstLessonOfFirstCourse ? [`/courses/${firstCourse.slug}/${firstLessonOfFirstCourse.slug}`] : []),
];

export const allPageRoutes = [...marketingRoutes, ...detailRoutes, "/thank-you"];

export const allCourseAndLessonRoutes = courses.flatMap((course) => [
  `/courses/${course.slug}`,
  ...playableLessonsOf(course).map((lesson) => `/courses/${course.slug}/${lesson.slug}`),
]);
