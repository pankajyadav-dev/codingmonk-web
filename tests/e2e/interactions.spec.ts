import { expect, test } from "@playwright/test";
import { allPageRoutes, countLessonsInCourse, youtubeOnlyLessonRoute } from "./site-routes";

test("theme follows the device by default, and the toggle switches and remembers it", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  const themeToggle = page.getByRole("button", { name: "Switch between light and dark theme" });
  await expect(themeToggle).toHaveAttribute("aria-pressed", "true");
  await themeToggle.click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await expect(themeToggle).toHaveAttribute("aria-pressed", "false");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.getByRole("button", { name: "Switch between light and dark theme" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
});

test("mobile menu opens, navigates and closes", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === "desktop", "The menu button only shows below 1024px");
  await page.goto("/");
  await page.getByRole("button", { name: "Open menu" }).click();
  const menu = page.getByRole("dialog");
  await expect(menu).toBeVisible();
  await menu.getByRole("link", { name: "Programs" }).click();
  await expect(page).toHaveURL(/\/programs$/);
  await expect(menu).toBeHidden();
  await page.getByRole("button", { name: "Open menu" }).click();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toBeHidden();
});

test("desktop navigation marks the current page", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "Desktop navigation only");
  await page.goto("/placements");
  await expect(
    page.getByRole("navigation", { name: "Main" }).getByRole("link", { name: "Placements" }),
  ).toHaveAttribute("aria-current", "page");
});

test("announcement bar can be dismissed and stays dismissed", async ({ page }) => {
  await page.goto("/");
  const announcement = page.getByRole("region", { name: /Pilot batches/ });
  await expect(announcement).toBeVisible();
  await announcement.getByRole("button", { name: "Dismiss announcement" }).click();
  await expect(announcement).toBeHidden();
  await page.reload();
  await expect(page.getByRole("region", { name: /Pilot batches/ })).toBeHidden();
});

test("logo wall switches between colleges and recruiters", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("tab", { name: "Recruiters" }).click();
  await expect(page.getByRole("tabpanel")).toContainText("Northwind Labs");
  await page.getByRole("tab", { name: "Partner colleges" }).click();
  await expect(page.getByRole("tabpanel")).toContainText("Sample Institute of Technology");
});

test("FAQ answers expand and collapse", async ({ page }) => {
  await page.goto("/");
  const question = page.getByText("Can we start with a pilot batch?");
  const answer = page.getByText("Most colleges start with one pilot batch");
  await expect(answer).toBeHidden();
  await question.click();
  await expect(answer).toBeVisible();
  await question.click();
  await expect(answer).toBeHidden();
});

test("placement filters narrow the record", async ({ page }) => {
  await page.goto("/placements");
  const record = page.locator("ul[aria-live='polite']");
  const allRows = await record.locator("li").count();
  await page.getByRole("button", { name: "2025 batch" }).click();
  await expect(record.locator("li")).not.toHaveCount(allRows);
  await expect(record).not.toContainText("2026");
  await page.getByRole("button", { name: "Service-based" }).click();
  await expect(record.locator("li")).toHaveCount(1);
  await page.getByRole("button", { name: "All batches" }).click();
  await page.getByRole("button", { name: "All companies" }).click();
  await expect(record.locator("li")).toHaveCount(allRows);
});

test("course catalog search and level filter work, including the empty state", async ({ page }) => {
  await page.goto("/courses");
  const searchBox = page.getByRole("searchbox", { name: "Search courses" });
  await searchBox.fill("webrtc");
  await expect(page.getByRole("link", { name: /WebRTC Video Call App/ })).toBeVisible();
  await searchBox.fill("no-such-course-xyz");
  await expect(page.getByRole("status")).toContainText("No courses match");
  await searchBox.fill("");
  await page.getByRole("button", { name: "Advanced" }).click();
  await expect(page.getByRole("link", { name: /Chati/ })).toBeVisible();
  await expect(page.getByRole("link", { name: /React UI Essentials/ })).toBeHidden();
});

test("lesson player loads the video only when asked and tracks progress", async ({ page }) => {
  await page.goto("/courses/webrtc-video-call-app");
  await page.getByRole("link", { name: "Start course" }).click();
  await expect(page).toHaveURL(/\/courses\/webrtc-video-call-app\/.+/);
  await expect(page.locator("iframe")).toHaveCount(0);
  await page.getByRole("button", { name: /Play video/ }).click();
  await expect(page.locator("iframe[src*='youtube-nocookie.com/embed/']")).toHaveCount(1);
  await page.getByRole("button", { name: "Mark as complete" }).click();
  await expect(page.getByRole("button", { name: "Completed" })).toBeVisible();
  const totalLessons = countLessonsInCourse("webrtc-video-call-app");
  await expect(page.getByText(`1 of ${totalLessons} done`)).toBeVisible();
  await page.getByRole("link", { name: "Next lesson" }).click();
  await expect(page.getByText(new RegExp(`^Lesson 2 of ${totalLessons} ·`))).toBeVisible();
  await page.goto("/courses");
  const expectedPercent = String(Math.round(100 / totalLessons));
  await expect(page.getByRole("link", { name: /WebRTC Video Call App/ }).getByRole("progressbar")).toHaveAttribute(
    "aria-valuenow",
    expectedPercent,
  );
});

test("student story opens in a dialog and closes with Escape", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Play Aarav S.'s story" }).click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toContainText("This video will be added soon.");
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
});

test("WhatsApp buttons open a pre-filled chat", async ({ page }) => {
  await page.goto("/");
  const floatingButton = page.getByRole("link", { name: "Chat with us on WhatsApp" });
  await expect(floatingButton).toHaveAttribute("href", /^https:\/\/wa\.me\/\d+\?text=/);
  await expect(floatingButton).toHaveAttribute("target", "_blank");
});

test("every internal link on every page works", async ({ page, request }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "Links are the same at every width");
  const checkedPaths = new Set<string>();
  for (const route of allPageRoutes) {
    await page.goto(route);
    const hrefs = await page
      .locator("a[href^='/']")
      .evaluateAll((links) => links.map((link) => link.getAttribute("href") ?? ""));
    for (const href of hrefs) {
      const pathOnly = href.split("#")[0] ?? href;
      if (checkedPaths.has(pathOnly)) continue;
      checkedPaths.add(pathOnly);
      expect((await request.get(pathOnly)).status(), `${pathOnly} linked from ${route}`).toBe(200);
    }
  }
});

test("lessons blocked from embedding send visitors to YouTube instead of a broken player", async ({ page }) => {
  test.skip(!youtubeOnlyLessonRoute, "Every lesson currently plays on the website");
  await page.goto(youtubeOnlyLessonRoute ?? "/");
  await expect(page.locator("iframe")).toHaveCount(0);
  await expect(page.getByRole("status")).toContainText("Watch this lesson on YouTube");
  await expect(page.getByRole("status").getByRole("link", { name: "Open on YouTube" })).toHaveAttribute(
    "href",
    /youtube\.com\/watch\?v=/,
  );
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  await expect(page.getByRole("link", { name: /Plays on YouTube/ }).first()).toBeVisible();
});

test("a video that fails inside the player switches to the YouTube button", async ({ page }) => {
  await page.goto("/courses/webrtc-video-call-app");
  await page.getByRole("link", { name: "Start course" }).click();
  await page.getByRole("button", { name: /Play video/ }).click();
  await expect(page.locator("iframe[src*='enablejsapi=1']")).toHaveCount(1);
  await page.evaluate(() => {
    window.dispatchEvent(
      new MessageEvent("message", {
        origin: "https://www.youtube-nocookie.com",
        data: JSON.stringify({ event: "onError", info: 150 }),
      }),
    );
  });
  await expect(page.locator("iframe")).toHaveCount(0);
  await expect(page.getByRole("status")).toContainText("Watch this lesson on YouTube");
});
