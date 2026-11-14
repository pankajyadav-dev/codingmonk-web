import { ImageResponse } from "next/og";
import { siteContent } from "@/content";
import { ShareImageArtwork, shareImageFonts, shareImageSize } from "@/lib/brand-artwork";

export const alt = siteContent.tagline;
export const size = shareImageSize;
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <ShareImageArtwork
      eyebrow={siteContent.tagline}
      title="2-month and 6-month placement training, on your campus."
      footer="Final and pre-final year · AI-first, fundamentals always"
    />,
    { ...shareImageSize, fonts: shareImageFonts },
  );
}
