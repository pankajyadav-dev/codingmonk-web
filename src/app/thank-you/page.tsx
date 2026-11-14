import type { Metadata } from "next";
import { ThankYouSection } from "@/components/sections/thank-you-section";
import { thankYouCopy } from "@/content";
import { buildPageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = buildPageMetadata({ ...thankYouCopy.seo, path: "/thank-you", isIndexable: false });

export default function ThankYouPage() {
  return <ThankYouSection />;
}
