import type { Metadata } from "next";
import { ComposedPageSections } from "@/components/sections/composed-page-sections";
import { getComposedPage } from "@/content";
import { buildPageMetadata } from "@/lib/page-metadata";

const placementsPage = getComposedPage("placements");

export const metadata: Metadata = buildPageMetadata({ ...placementsPage.seo, path: "/placements" });

export default function PlacementsPage() {
  return <ComposedPageSections sections={placementsPage.sections} breadcrumbLabel={placementsPage.breadcrumbLabel} />;
}
