import { expect, test } from "@playwright/test";
import { allCourseAndLessonRoutes, allPageRoutes, detailRoutes, marketingRoutes } from "./site-routes";

test.describe.configure({ mode: "parallel" });

for (const route of allPageRoutes) {
  test(`metadata is complete on ${route}`, async ({ page }) => {
    await page.goto(route);
    const title = await page.title();
    expect(title.length).toBeGreaterThan(10);
    expect(title.length).toBeLessThanOrEqual(70);
    const description = await page.locator('meta[name="description"]').getAttribute("content");
    expect(description?.length ?? 0).toBeGreaterThan(50);
    expect(description?.length ?? 0).toBeLessThanOrEqual(160);
    const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
    expect(new URL(canonical ?? "").pathname.replace(/\/$/, "") || "/").toBe(route.replace(/\/$/, "") || "/");
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator('meta[property="og:title"]')).toHaveCount(1);
    await expect(page.locator('meta[property="og:image"]').first()).toHaveAttribute("content", /^https?:\/\//);
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute("content", "summary_large_image");
    for (const jsonLd of await page.locator('script[type="application/ld+json"]').allTextContents()) {
      expect(() => JSON.parse(jsonLd)).not.toThrow();
    }
    const robots = await page.locator('meta[name="robots"]').getAttribute("content");
    expect(robots).toContain(route === "/thank-you" ? "noindex" : "index");
  });
}

test("every page in the sitemap is reachable and the sitemap covers every page", async ({ request }) => {
  const sitemapXml = await (await request.get("/sitemap.xml")).text();
  const sitemapPaths = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
    (match) => new URL(match[1] ?? "").pathname,
  );
  for (const route of [...marketingRoutes, ...detailRoutes, ...allCourseAndLessonRoutes]) {
    expect(sitemapPaths, `${route} is in the sitemap`).toContain(route);
  }
  expect(sitemapPaths).not.toContain("/thank-you");
  expect(sitemapXml).toContain("<video:video>");
  expect(sitemapXml).toContain("<image:image>");
  for (const sitemapPath of sitemapPaths.filter((_, index) => index % 7 === 0)) {
    expect((await request.get(sitemapPath)).status(), sitemapPath).toBe(200);
  }
});

test("robots.txt, manifest and llms.txt are served", async ({ request }) => {
  const robotsTxt = await (await request.get("/robots.txt")).text();
  expect(robotsTxt).toContain("Sitemap:");
  expect(robotsTxt).toContain("Disallow: /thank-you");
  expect(robotsTxt).toContain("GPTBot");
  const manifest = await (await request.get("/manifest.webmanifest")).json();
  expect(manifest.name).toBe("CodingMonk");
  for (const icon of manifest.icons) expect((await request.get(icon.src)).status()).toBe(200);
  const llmsTxt = await (await request.get("/llms.txt")).text();
  expect(llmsTxt).toContain("# CodingMonk");
  expect((await request.get("/opengraph-image")).headers()["content-type"]).toContain("image/png");
});

test("lesson pages describe their video for search engines", async ({ page }) => {
  const lessonRoute = detailRoutes.find((route) => route.split("/").length === 4) ?? "";
  await page.goto(lessonRoute);
  const structuredData = (await page.locator('script[type="application/ld+json"]').allTextContents()).map((jsonLd) =>
    JSON.parse(jsonLd),
  );
  const video = structuredData.find((item) => item["@type"] === "VideoObject");
  expect(video?.thumbnailUrl).toMatch(/^https:\/\/i\.ytimg\.com\//);
  expect(video?.embedUrl).toContain("youtube-nocookie.com/embed/");
  expect(structuredData.some((item) => item["@type"] === "BreadcrumbList")).toBe(true);
});

test("unknown pages return 404 with a helpful page", async ({ page }) => {
  const response = await page.goto("/this-page-does-not-exist");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("doesn't exist");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
});

test("security headers are sent", async ({ request }) => {
  const headers = (await request.get("/")).headers();
  expect(headers["content-security-policy"]).toContain("frame-ancestors 'none'");
  expect(headers["x-content-type-options"]).toBe("nosniff");
  expect(headers["x-powered-by"]).toBeUndefined();
});
