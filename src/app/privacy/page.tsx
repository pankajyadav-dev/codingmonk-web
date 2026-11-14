import type { Metadata } from "next";
import { PrivacySection } from "@/components/sections/privacy-section";
import { privacyCopy } from "@/content";
import { buildPageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = buildPageMetadata({ ...privacyCopy.seo, path: "/privacy" });

export default function PrivacyPage() {
  return <PrivacySection />;
}
