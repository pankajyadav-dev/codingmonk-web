import { readFileSync } from "node:fs";
import path from "node:path";

const globalStylesheet = readFileSync(path.join(process.cwd(), "src/app/globals.css"), "utf8");

function readTokenBlock(selector: string) {
  const blockStart = globalStylesheet.indexOf(`${selector} {`);
  if (blockStart === -1) throw new Error(`Missing "${selector}" block in globals.css`);
  return globalStylesheet.slice(blockStart, globalStylesheet.indexOf("}", blockStart));
}

function readToken(selector: string, tokenName: string) {
  const tokenValue = readTokenBlock(selector)
    .match(new RegExp(`--${tokenName}:\\s*([^;]+);`))?.[1]
    ?.trim();
  if (!tokenValue) throw new Error(`Missing --${tokenName} in "${selector}" block of globals.css`);
  return tokenValue;
}

export const lightThemeTokens = {
  background: readToken(":root", "background"),
  ink: readToken(":root", "ink"),
  muted: readToken(":root", "muted"),
  brand: readToken(":root", "brand"),
  onBrand: readToken(":root", "on-brand"),
  panel: readToken(":root", "panel"),
  panelInk: readToken(":root", "panel-ink"),
  panelMuted: readToken(":root", "panel-muted"),
};

export const darkThemeTokens = {
  background: readToken('[data-theme="dark"]', "background"),
  ink: readToken('[data-theme="dark"]', "ink"),
  brand: readToken('[data-theme="dark"]', "brand"),
};
