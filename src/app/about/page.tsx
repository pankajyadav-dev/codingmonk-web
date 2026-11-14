import type { Metadata } from "next";
import { ComposedPageSections } from "@/components/sections/composed-page-sections";
import { getComposedPage } from "@/content";
import { buildPageMetadata } from "@/lib/page-metadata";

const aboutPage = getComposedPage("about");

export const metadata: Metadata = buildPageMetadata({ ...aboutPage.seo, path: "/about" });

export default function AboutPage() {
  return <ComposedPageSections sections={aboutPage.sections} breadcrumbLabel={aboutPage.breadcrumbLabel} />;
}
