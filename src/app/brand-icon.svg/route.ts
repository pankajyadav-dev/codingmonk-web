import { buildAdaptiveBrandIconSvg } from "@/lib/brand-artwork";

export function GET() {
  return new Response(buildAdaptiveBrandIconSvg(), {
    headers: { "Content-Type": "image/svg+xml", "Cache-Control": "public, max-age=86400" },
  });
}
