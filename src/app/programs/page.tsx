import type { Metadata } from "next";
import { ComposedPageSections } from "@/components/sections/composed-page-sections";
import { getComposedPage } from "@/content";
import { buildPageMetadata } from "@/lib/page-metadata";

const programsPage = getComposedPage("programs");

export const metadata: Metadata = buildPageMetadata({ ...programsPage.seo, path: "/programs" });

export default function ProgramsPage() {
  return <ComposedPageSections sections={programsPage.sections} breadcrumbLabel={programsPage.breadcrumbLabel} />;
}
