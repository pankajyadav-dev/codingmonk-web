import type { MetadataRoute } from "next";
import { isSearchIndexingAllowed, toAbsoluteUrl } from "@/lib/site-url";

const aiSearchCrawlers = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "PerplexityBot",
  "Google-Extended",
  "Applebot-Extended",
];

export default function robots(): MetadataRoute.Robots {
  if (!isSearchIndexingAllowed()) return { rules: { userAgent: "*", disallow: "/" } };
  const privatePaths = ["/thank-you", "/api/"];
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: privatePaths },
      { userAgent: aiSearchCrawlers, allow: "/", disallow: privatePaths },
    ],
    sitemap: toAbsoluteUrl("/sitemap.xml"),
  };
}
