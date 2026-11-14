import type { Metadata } from "next";
import { BookDemoSections } from "@/components/sections/book-demo-sections";
import { bookDemoCopy } from "@/content";
import { buildPageMetadata } from "@/lib/page-metadata";
import { submitDemoRequest } from "./submit-demo-request";

export const metadata: Metadata = buildPageMetadata({ ...bookDemoCopy.seo, path: "/book-demo" });

export default function BookDemoPage() {
  return <BookDemoSections submitAction={submitDemoRequest} />;
}
