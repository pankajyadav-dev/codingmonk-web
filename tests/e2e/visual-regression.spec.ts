import { expect, test } from "@playwright/test";
import { openPageInTheme, type ThemeName } from "./page-helpers";
import { marketingRoutes } from "./site-routes";

const themes: ThemeName[] = ["light", "dark"];

for (const route of [...marketingRoutes, "/programs/6-month-placement-program"]) {
  for (const theme of themes) {
    test(`looks the same as the approved design: ${route} (${theme})`, async ({ page }) => {
      await openPageInTheme(page, route, theme);
      await expect(page).toHaveScreenshot(
        `${route === "/" ? "home" : route.slice(1).replaceAll("/", "-")}-${theme}.png`,
        {
          fullPage: true,
          mask: [page.locator("img[src*='ytimg'], img[srcset*='ytimg']")],
        },
      );
    });
  }
}
