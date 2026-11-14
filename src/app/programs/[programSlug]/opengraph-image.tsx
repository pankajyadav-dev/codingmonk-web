import { ImageResponse } from "next/og";
import { getProgramBySlug, siteContent } from "@/content";
import { ShareImageArtwork, shareImageFonts, shareImageSize } from "@/lib/brand-artwork";

export const alt = "CodingMonk placement program";
export const size = shareImageSize;
export const contentType = "image/png";

export default async function ProgramOpenGraphImage({ params }: { params: Promise<{ programSlug: string }> }) {
  const program = getProgramBySlug((await params).programSlug);
  return new ImageResponse(
    <ShareImageArtwork
      eyebrow={program ? `${program.audienceLabel} · ${program.durationLabel}` : siteContent.tagline}
      title={program?.title ?? siteContent.name}
      footer={program ? `${program.totalHours} hours · ${program.semesterLabel}` : siteContent.tagline}
    />,
    { ...shareImageSize, fonts: shareImageFonts },
  );
}
