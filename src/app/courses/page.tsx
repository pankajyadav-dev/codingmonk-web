import type { Metadata } from "next";
import { CoursesCatalogSections } from "@/components/sections/courses-sections";
import { coursesPageCopy } from "@/content";
import { buildPageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = buildPageMetadata({ ...coursesPageCopy.seo, path: "/courses" });

export default function CoursesPage() {
  return <CoursesCatalogSections />;
}
