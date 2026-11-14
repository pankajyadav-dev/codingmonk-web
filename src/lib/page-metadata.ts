import type { Metadata } from "next";
import { siteContent } from "@/content";
import { stripAccentMarks } from "./accented-text";
import { isSearchIndexingAllowed } from "./site-url";

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  imageUrl?: string;
  isIndexable?: boolean;
  openGraphType?: "website" | "video.other";
};

export function buildPageMetadata({
  title,
  description,
  path,
  imageUrl,
  isIndexable = true,
  openGraphType = "website",
}: PageMetadataInput): Metadata {
  const plainTitle = stripAccentMarks(title);
  const shareImageUrl = imageUrl ?? "/opengraph-image";
  const images = [{ url: shareImageUrl, alt: plainTitle }];
  const shouldIndex = isIndexable && isSearchIndexingAllowed();
  return {
    title: { absolute: plainTitle },
    description,
    alternates: { canonical: path },
    robots: shouldIndex
      ? {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        }
      : { index: false, follow: true },
    openGraph: {
      type: openGraphType,
      url: path,
      title: plainTitle,
      description,
      siteName: siteContent.name,
      locale: siteContent.locale,
      images,
    },
    twitter: { card: "summary_large_image", title: plainTitle, description, images: [shareImageUrl] },
  };
}
