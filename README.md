# CodingMonk website

Marketing site for CodingMonk: 2-month and 6-month on-campus placement training for final and pre-final year engineering students in India, plus free project courses from the CodingMonk YouTube channel.

## Stack

| Area            | Choice                                                                                     |
| --------------- | ------------------------------------------------------------------------------------------ |
| Framework       | Next.js 16 (App Router, Turbopack, Cache Components, React Compiler, typed routes)         |
| Language        | TypeScript 7, strict                                                                       |
| Styling         | Tailwind CSS 4. Every color, font, spacing and radius token lives in `src/app/globals.css` |
| UI primitives   | Radix UI (dialog, tabs), lucide-react icons                                                |
| Forms           | Zod 4 validation shared by browser and server, React server action                         |
| Leads           | Postgres (Neon) through Drizzle ORM. Local development uses PGlite automatically           |
| Lint and format | Biome                                                                                      |
| Tests           | Playwright (layout, accessibility, SEO, interactions, form, visual) and `bun test`         |
| Runtime         | Bun locally. Node 24 on Vercel                                                             |

## Getting started

```bash
bun install          # installs packages and the git hooks
bun run dev          # http://localhost:3000
```

No database setup is needed locally. Leads are stored in `.data/pglite` the first time a form is submitted.

## Everyday commands

| Command                           | What it does                                                     |
| --------------------------------- | ---------------------------------------------------------------- |
| `bun run dev`                     | Development server on Bun                                        |
| `bun run build` / `bun run start` | Production build and server on Bun                               |
| `bun run build:node`              | Production build on Node 24, the same runtime as Vercel          |
| `bun run lint` / `bun run format` | Biome check / fix                                                |
| `bun run typecheck`               | TypeScript                                                       |
| `bun run check:content`           | Validates every JSON file in `content/`                          |
| `bun run check:tokens`            | Fails if a color is hardcoded outside `globals.css`              |
| `bun run check:spelling`          | Spell-checks all content                                         |
| `bun run test:unit`               | Unit tests                                                       |
| `bun run test:e2e`                | Full Playwright suite (desktop, tablet, mobile; light and dark)  |
| `bun run test:visual:update`      | Re-approve screenshots after an intended design change           |
| `bun run verify`                  | Everything above, in order. Runs automatically before every push |

## Editing content

All copy and data live in `content/`. You never need to touch code to:

- change any text, heading, button label or SEO title,
- add or remove founders, programs, placements, FAQs, testimonials, stats, logos, trainers,
- reorder or remove sections on a page (`content/pages/*.json`),
- add a new course or lesson (`content/courses.json`).

Wrap a word in `*asterisks*` inside a heading to show it in the saffron accent style. Every list renders at any length, and a section with an empty list hides itself. If a JSON file has a mistake, `bun run check:content` and the build explain exactly which field is wrong.

Some lesson videos are blocked from playing outside YouTube. Run `bun run content:sync-youtube` after blocking or unblocking videos: it asks YouTube which videos play on the website and sets `"canPlayOnWebsite"` for each lesson. Those lessons show a "Watch on YouTube" button instead of the player and stay out of the video sitemap. If a video gets blocked after deployment, the player detects YouTube's error and switches to the same button automatically.

## Environment variables

See `.env.example`. On Vercel set `DATABASE_URL` (Neon) and `LEAD_IP_HASH_SALT`. `SITE_URL` is optional there because the production domain is detected automatically, and preview deployments are kept out of search engines.

## Deploying (Vercel)

1. Import the repository in Vercel. It detects Bun from `bun.lock` and Node 24 from `package.json`.
2. Add a Neon Postgres database from the Vercel Marketplace (sets `DATABASE_URL`).
3. Run `bun run db:migrate` once against the production database.
4. Point the domain at Vercel, then submit `https://<domain>/sitemap.xml` in Google Search Console and Bing Webmaster Tools.

See [CONTRIBUTING.md](CONTRIBUTING.md) for the code structure, coding standards and copy guidelines.
