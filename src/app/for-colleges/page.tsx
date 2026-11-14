import type { Metadata } from "next";
import { ComposedPageSections } from "@/components/sections/composed-page-sections";
import { getComposedPage } from "@/content";
import { buildPageMetadata } from "@/lib/page-metadata";

const forCollegesPage = getComposedPage("forColleges");

export const metadata: Metadata = buildPageMetadata({ ...forCollegesPage.seo, path: "/for-colleges" });

export default function ForCollegesPage() {
  return <ComposedPageSections sections={forCollegesPage.sections} breadcrumbLabel={forCollegesPage.breadcrumbLabel} />;
}
