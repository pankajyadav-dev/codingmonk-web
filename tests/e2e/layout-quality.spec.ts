import { expect, test } from "@playwright/test";
import {
  findBrokenImages,
  findClippedText,
  findHorizontalOverflow,
  findSmallTapTargets,
  findUnequalCardRows,
  openPageInTheme,
  type ThemeName,
} from "./page-helpers";
import { allPageRoutes } from "./site-routes";

const themes: ThemeName[] = ["light", "dark"];

for (const route of allPageRoutes) {
  for (const theme of themes) {
    test(`layout is clean on ${route} (${theme})`, async ({ page }) => {
      const consoleErrors: string[] = [];
      page.on("console", (message) => {
        if (message.type() === "error") consoleErrors.push(message.text());
      });
      page.on("pageerror", (pageError) => consoleErrors.push(pageError.message));
      await openPageInTheme(page, route, theme);

      await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
      expect(await findHorizontalOverflow(page), "nothing may stick out of the viewport").toEqual({
        pageOverflows: false,
        offenders: [],
      });
      expect(await findClippedText(page), "no text may be cut off").toEqual([]);
      expect(await findUnequalCardRows(page), "cards in the same row must be the same height").toEqual([]);
      expect(await findSmallTapTargets(page), "tap targets must be at least 24px").toEqual([]);
      expect(await findBrokenImages(page), "every image must load").toEqual([]);
      expect(consoleErrors, "the browser console must stay clean").toEqual([]);
    });
  }
}

test("content uses the full width with side gutters instead of a centred column", async ({ page }, testInfo) => {
  await page.goto("/");
  const heroHeading = page.getByRole("heading", { level: 1 });
  const headingBox = await heroHeading.boundingBox();
  const viewportWidth = page.viewportSize()?.width ?? 0;
  expect(headingBox).not.toBeNull();
  const leftGutter = headingBox?.x ?? 0;
  const expectedGutter = Math.min(96, Math.max(16, viewportWidth * 0.05));
  expect(
    Math.abs(leftGutter - expectedGutter),
    `${testInfo.project.name}: heading starts at the page gutter`,
  ).toBeLessThanOrEqual(2);
});
