import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CourseOverviewSections } from "@/components/sections/course-sections";
import { coursesContent, getCourseBySlug, siteContent } from "@/content";
import { getYoutubeThumbnailUrl } from "@/lib/course-catalog";
import { buildPageMetadata } from "@/lib/page-metadata";

export function generateStaticParams() {
  return coursesContent.map((course) => ({ courseSlug: course.slug }));
}

export async function generateMetadata({ params }: PageProps<"/courses/[courseSlug]">): Promise<Metadata> {
  const course = getCourseBySlug((await params).courseSlug);
  if (!course) return {};
  const firstVideoId = course.modules[0]?.lessons[0]?.youtubeVideoId;
  return buildPageMetadata({
    title: `${course.title}: Free Course | ${siteContent.name}`,
    description: course.summary,
    path: `/courses/${course.slug}`,
    imageUrl: firstVideoId ? getYoutubeThumbnailUrl(firstVideoId) : undefined,
  });
}

export default async function CoursePage({ params }: PageProps<"/courses/[courseSlug]">) {
  const course = getCourseBySlug((await params).courseSlug);
  if (!course) notFound();
  return <CourseOverviewSections course={course} />;
}
