# Contributing

## Code structure

```
content/                 all copy and data (JSON). Pages are ordered lists of sections.
src/
  app/                   routes, metadata, sitemap, robots, manifest, icons, server actions
  components/
    atoms/               smallest pieces: Button, Heading, Badge, Avatar, form controls
    molecules/           small combinations: cards, rows, form fields, section header
    organisms/           page parts: header, footer, timeline, demo form, lesson player
    sections/            full-width page sections and the JSON section registry
  content/               Zod schemas and typed loaders for content/
  db/                    Drizzle schema, database client, lead repository
  lib/                   pure logic: formatting, structured data, WhatsApp, course catalog
tests/
  unit/                  bun test
  e2e/                   Playwright
```

### Layer rules (enforced by Biome)

| Layer                  | May import                    |
| ---------------------- | ----------------------------- |
| atoms                  | other atoms, `lib`, `content` |
| molecules              | atoms, molecules              |
| organisms              | atoms, molecules, organisms   |
| sections               | anything in `components`      |
| routes (`src/app`)     | sections and organisms only   |
| `lib`, `content`, `db` | never UI                      |

Adding a new section type: add its schema to `sectionSchema` in `src/content/schemas.ts`, create the section component, register it in `src/components/sections/composed-page-sections.tsx`. TypeScript fails until every type is handled.

## Coding standards

- **Names explain themselves.** `formatPackageLpa`, `findLessonWithNeighbours`, `canPlayOnWebsite`. No abbreviations like `btn`, `idx`, `cfg`.
- **Comments only for the "why"** that the code cannot say. No comments that repeat the code.
- **No copy in components.** Every visible string comes from `content/`.
- **No colors outside `globals.css`.** Use the Tailwind token classes (`bg-surface`, `text-accent-text`, …). `bun run check:tokens` enforces it.
- **Text colors must pass WCAG AA in both themes.** Use `text-accent-text` (not `text-brand`) for saffron text on light backgrounds. `text-brand` is for fills and for text on dark panels.
- **Full-width layout.** Sections use `px-gutter` and fill the screen. Never centre content in a narrow column. Limit only reading width (`max-w-[64ch]`) and keep it left-aligned.
- **Grids accept any number of items.** Use `CardGrid` or auto-fit columns, and make cards `h-full` so rows line up.
- **No Bun-only APIs in `src/`.** Production runs on Node 24. Biome blocks the `Bun` global.
- **One component per file**, named exports, no `any`, no non-null assertions.
- **Dates and random values** at render time must go through `"use cache"` helpers (see `src/lib/request-time-values.ts`) because of Cache Components.

## Before you commit

Git hooks run automatically:

- **pre-commit:** Biome (auto-fixes staged files), type check, content and token checks, spell check, unit tests.
- **pre-push:** `bun run verify`, which builds the site and runs the full Playwright suite.

When a design change is intended, update the screenshots with `bun run test:visual:update`, review the changed images, and commit them with the change.

## Copy guidelines (India)

- **Audience first:** write for TPOs, principals, deans and HoDs. Students and parents get their own short block.
- **American spelling** ("program", "customized") with **Indian number format**: ₹4.5 LPA, 1,20,000, lakh.
- **Use the words colleges use:** campus recruitment training (CRT), batch, placement season, placement drive, mass recruiters, service-based and product-based companies, freshers, GD, technical and HR rounds, pre-final year.
- **Proof needs a source:** every number carries its batch year and college. Mark sample figures with `"isSample": true`.
- **Never write** "100% placement", "guaranteed job", fake urgency, or "Us vs Others" comparison grids.
- **AI:** describe it as how we train ("AI-first, fundamentals always"). Do not claim AI product features we do not offer.
- **Announcements** must have an `endsOn` date so they expire on their own.
