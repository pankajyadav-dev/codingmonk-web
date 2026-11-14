import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const customFontSizes = [
  "display-xl",
  "display-lg",
  "display-md",
  "heading-lg",
  "heading-md",
  "heading-sm",
  "stat",
  "body-lg",
  "body",
  "body-sm",
  "caption",
  "eyebrow",
];

const mergeTailwindClasses = extendTailwindMerge({
  extend: { classGroups: { "font-size": [{ text: customFontSizes }] } },
});

export function cn(...classValues: ClassValue[]) {
  return mergeTailwindClasses(clsx(classValues));
}
