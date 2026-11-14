import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

const sourceDirectory = path.join(process.cwd(), "src");
const allowedFiles = new Set([path.join(sourceDirectory, "app", "globals.css")]);
const hardcodedColorPattern = /#[0-9a-fA-F]{3,8}\b(?![\w-]*["']?\s*:)|\brgba?\(|\bhsla?\(|\boklch\(/g;

function listSourceFiles(directory: string): string[] {
  return readdirSync(directory).flatMap((entryName) => {
    const entryPath = path.join(directory, entryName);
    if (statSync(entryPath).isDirectory()) return listSourceFiles(entryPath);
    return /\.(tsx?|css)$/.test(entryName) ? [entryPath] : [];
  });
}

const violations = listSourceFiles(sourceDirectory)
  .filter((filePath) => !allowedFiles.has(filePath))
  .flatMap((filePath) =>
    readFileSync(filePath, "utf8")
      .split("\n")
      .flatMap((line, lineIndex) =>
        [...line.matchAll(hardcodedColorPattern)]
          .filter(
            (match) =>
              !line.slice(0, match.index).includes("href") &&
              !line.includes("#main-content") &&
              !/#[a-z-]+"/.test(match[0]),
          )
          .map((match) => `${path.relative(process.cwd(), filePath)}:${lineIndex + 1}  ${match[0]}`),
      ),
  );

if (violations.length > 0) {
  console.error(`Colors must come from src/app/globals.css tokens. Found hardcoded colors:\n${violations.join("\n")}`);
  process.exit(1);
}
console.log("Design tokens OK: no hardcoded colors outside globals.css");
