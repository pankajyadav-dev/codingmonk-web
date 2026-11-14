import { ImageResponse } from "next/og";
import { BrandMarkArtwork } from "@/lib/brand-artwork";
import { lightThemeTokens } from "@/lib/theme-tokens";

const iconSizes = { favicon: 32, "android-192": 192, "android-512": 512 } as const;
type IconId = keyof typeof iconSizes;

export function generateImageMetadata() {
  return (Object.keys(iconSizes) as IconId[]).map((iconId) => ({
    id: iconId,
    size: { width: iconSizes[iconId], height: iconSizes[iconId] },
    contentType: "image/png",
  }));
}

export default async function Icon({ id }: { id: Promise<string | number> }) {
  const iconId = (await id) as IconId;
  const pixelSize = iconSizes[iconId] ?? iconSizes.favicon;
  const isHomeScreenIcon = iconId !== "favicon";
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: isHomeScreenIcon ? lightThemeTokens.background : "transparent",
      }}
    >
      <BrandMarkArtwork size={isHomeScreenIcon ? Math.round(pixelSize * 0.72) : pixelSize} />
    </div>,
    { width: pixelSize, height: pixelSize },
  );
}
