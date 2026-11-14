import { readFileSync } from "node:fs";
import path from "node:path";
import {
  brandMarkViewBox,
  leftBracketPath,
  monkArmsPath,
  monkArmsStrokeWidth,
  monkCrossedLegsPath,
  monkHead,
  monkTorsoPath,
  rightBracketPath,
} from "./brand-geometry";
import { darkThemeTokens, lightThemeTokens } from "./theme-tokens";

const bracketsPath = `${leftBracketPath}${rightBracketPath}`;

export const shareImageSize = { width: 1200, height: 630 };

export const shareImageFonts = [
  {
    name: "Sora",
    data: readFileSync(path.join(process.cwd(), "assets/fonts/sora-extrabold.ttf")),
    weight: 800 as const,
    style: "normal" as const,
  },
  {
    name: "Source Sans",
    data: readFileSync(path.join(process.cwd(), "assets/fonts/source-sans-semibold.ttf")),
    weight: 600 as const,
    style: "normal" as const,
  },
];

export function BrandMarkArtwork({
  size,
  bracketColor = lightThemeTokens.ink,
}: {
  size: number;
  bracketColor?: string;
}) {
  return (
    <svg width={size} height={size} viewBox={brandMarkViewBox} role="img" aria-label="CodingMonk">
      <path
        d={bracketsPath}
        fill="none"
        stroke={bracketColor}
        strokeWidth="4.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d={monkArmsPath}
        fill="none"
        stroke={lightThemeTokens.brand}
        strokeWidth={monkArmsStrokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d={monkCrossedLegsPath} fill={lightThemeTokens.brand} />
      <circle {...monkHead} fill={lightThemeTokens.brand} />
      <path d={monkTorsoPath} fill={lightThemeTokens.brand} />
    </svg>
  );
}

export function buildAdaptiveBrandIconSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${brandMarkViewBox}"><style>.brackets{stroke:${lightThemeTokens.ink}}.monk{fill:${lightThemeTokens.brand}}.arms{stroke:${lightThemeTokens.brand}}@media (prefers-color-scheme: dark){.brackets{stroke:${darkThemeTokens.ink}}.monk{fill:${darkThemeTokens.brand}}.arms{stroke:${darkThemeTokens.brand}}}</style><path class="brackets" d="${bracketsPath}" fill="none" stroke-width="4.8" stroke-linecap="round" stroke-linejoin="round"/><path class="arms" d="${monkArmsPath}" fill="none" stroke-width="${monkArmsStrokeWidth}" stroke-linecap="round" stroke-linejoin="round"/><path class="monk" d="${monkCrossedLegsPath}"/><circle class="monk" cx="${monkHead.cx}" cy="${monkHead.cy}" r="${monkHead.r}"/><path class="monk" d="${monkTorsoPath}"/></svg>`;
}

type ShareImageArtworkProps = { eyebrow: string; title: string; footer: string };

export function ShareImageArtwork({ eyebrow, title, footer }: ShareImageArtworkProps) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        background: lightThemeTokens.panel,
        color: lightThemeTokens.panelInk,
        fontFamily: "Source Sans",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 14, fontFamily: "Sora", fontSize: 38 }}>
        <BrandMarkArtwork size={68} bracketColor={lightThemeTokens.panelInk} />
        <span style={{ display: "flex" }}>
          Coding<span style={{ color: lightThemeTokens.brand }}>Monk</span>
        </span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ fontSize: 28, color: lightThemeTokens.brand, textTransform: "uppercase", letterSpacing: 3 }}>
          {eyebrow}
        </div>
        <div style={{ fontFamily: "Sora", fontSize: 68, lineHeight: 1.05, letterSpacing: -2, maxWidth: 980 }}>
          {title}
        </div>
      </div>
      <div style={{ display: "flex", fontSize: 28, color: lightThemeTokens.panelMuted }}>{footer}</div>
    </div>
  );
}
