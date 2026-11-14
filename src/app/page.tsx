import type { Metadata } from "next";
import { ComposedPageSections } from "@/components/sections/composed-page-sections";
import { getComposedPage } from "@/content";
import { buildPageMetadata } from "@/lib/page-metadata";

const homePage = getComposedPage("home");

export const metadata: Metadata = buildPageMetadata({ ...homePage.seo, path: "/" });

export default function HomePage() {
  return <ComposedPageSections sections={homePage.sections} />;
}
