import type { MetadataRoute } from "next";
import { siteContent } from "@/content";
import { lightThemeTokens } from "@/lib/theme-tokens";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteContent.name,
    short_name: siteContent.name,
    description: siteContent.description,
    start_url: "/",
    scope: "/",
    display: "standalone",
    lang: siteContent.language,
    background_color: lightThemeTokens.background,
    theme_color: lightThemeTokens.brand,
    icons: [
      { src: "/icon/android-192", sizes: "192x192", type: "image/png" },
      { src: "/icon/android-512", sizes: "512x512", type: "image/png" },
      { src: "/icon/android-512", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
