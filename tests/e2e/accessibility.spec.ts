import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { openPageInTheme, type ThemeName } from "./page-helpers";
import { allPageRoutes } from "./site-routes";

const themes: ThemeName[] = ["light", "dark"];

for (const route of allPageRoutes) {
  for (const theme of themes) {
    test(`no accessibility violations on ${route} (${theme})`, async ({ page }) => {
      await openPageInTheme(page, route, theme);
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
        .analyze();
      const violations = results.violations.map((violation) => ({
        rule: violation.id,
        impact: violation.impact,
        targets: violation.nodes.slice(0, 3).map((node) => node.target.join(" ")),
      }));
      expect(violations).toEqual([]);
    });
  }
}

test("keyboard users can skip straight to the main content", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  const skipLink = page.getByRole("link", { name: "Skip to main content" });
  await expect(skipLink).toBeFocused();
  await expect(skipLink).toBeInViewport();
  await skipLink.press("Enter");
  await expect(page.locator("#main-content")).toBeFocused();
});
