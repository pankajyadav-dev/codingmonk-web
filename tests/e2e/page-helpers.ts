import type { Page } from "@playwright/test";

export type ThemeName = "light" | "dark";

export async function openPageInTheme(page: Page, route: string, theme: ThemeName) {
  await page.addInitScript((themeName) => {
    window.localStorage.setItem("theme", themeName);
    window.localStorage.setItem("codingmonk.dismissed-announcement", "none");
  }, theme);
  await page.goto(route, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
}

export async function findHorizontalOverflow(page: Page) {
  return page.evaluate(() => {
    const viewportWidth = document.documentElement.clientWidth;
    const pageOverflows = document.documentElement.scrollWidth > viewportWidth + 1;
    const offenders = [...document.querySelectorAll<HTMLElement>("body *")]
      .filter((element) => {
        const box = element.getBoundingClientRect();
        if (box.width === 0 || box.height === 0) return false;
        const insideScrollArea = element.closest(
          "[class*='overflow-x-auto'], [class*='overflow-hidden'], [aria-hidden='true'], dialog, svg",
        );
        return !insideScrollArea && (box.right > viewportWidth + 1 || box.left < -1);
      })
      .slice(0, 5)
      .map((element) => `${element.tagName.toLowerCase()}.${(element.getAttribute("class") ?? "").slice(0, 60)}`);
    return { pageOverflows, offenders };
  });
}

export async function findClippedText(page: Page) {
  return page.evaluate(() =>
    [...document.querySelectorAll<HTMLElement>("h1, h2, h3, p, a, button, span, li, dd, dt, label")]
      .filter((element) => {
        if (
          element.closest(
            "[class*='overflow-x-auto'], [class*='line-clamp'], [class*='overflow-y-auto'], .sr-only, svg",
          )
        )
          return false;
        const styles = getComputedStyle(element);
        const clipsHorizontally =
          styles.overflowX === "hidden" || styles.overflowX === "clip" || styles.textOverflow === "ellipsis";
        return clipsHorizontally && element.scrollWidth > element.clientWidth + 1 && element.clientWidth > 0;
      })
      .slice(0, 5)
      .map((element) => `${element.tagName.toLowerCase()}: ${element.textContent?.trim().slice(0, 50)}`),
  );
}

export async function findUnequalCardRows(page: Page) {
  return page.evaluate(() => {
    const problems: string[] = [];
    for (const grid of document.querySelectorAll<HTMLElement>("ul.grid, ol.grid")) {
      const cards = [...grid.children]
        .filter((item) => !item.getAttribute("class")?.includes("row-span"))
        .map((item) => item.firstElementChild as HTMLElement | null)
        .filter((card): card is HTMLElement => Boolean(card?.getAttribute("class")?.includes("h-full")));
      const rows = new Map<number, number[]>();
      for (const card of cards) {
        const box = card.getBoundingClientRect();
        if (box.height === 0) continue;
        const rowKey = Math.round(box.top);
        rows.set(rowKey, [...(rows.get(rowKey) ?? []), Math.round(box.height)]);
      }
      for (const heights of rows.values()) {
        if (Math.max(...heights) - Math.min(...heights) > 1)
          problems.push(`${(grid.getAttribute("class") ?? "").slice(0, 40)} → ${heights.join(",")}`);
      }
    }
    return problems;
  });
}

export async function findSmallTapTargets(page: Page) {
  return page.evaluate(() =>
    [...document.querySelectorAll<HTMLElement>("button, a[class*='inline-flex'], [role='tab'], summary, input, select")]
      .filter((element) => {
        const box = element.getBoundingClientRect();
        if (box.width === 0 || box.height === 0 || element.closest(".sr-only, [aria-hidden='true']")) return false;
        if (element instanceof HTMLInputElement && element.type === "checkbox")
          return box.width < 20 || box.height < 20;
        return box.width < 24 || box.height < 24;
      })
      .slice(0, 5)
      .map(
        (element) =>
          `${element.tagName.toLowerCase()}: ${element.textContent?.trim().slice(0, 30) || element.getAttribute("aria-label")}`,
      ),
  );
}

export async function findBrokenImages(page: Page) {
  await page.evaluate(async () => {
    for (const image of document.querySelectorAll("img")) image.loading = "eager";
    await Promise.all(
      [...document.images].map((image) =>
        image.complete
          ? null
          : new Promise((resolve) => {
              image.onload = image.onerror = resolve;
            }),
      ),
    );
  });
  return page.evaluate(() =>
    [...document.images].filter((image) => image.naturalWidth === 0).map((image) => image.currentSrc || image.src),
  );
}
