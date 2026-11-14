import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

type LessonRecord = { youtubeVideoId: string; title: string; canPlayOnWebsite?: boolean };
type CourseRecord = { slug: string; modules: { lessons: LessonRecord[] }[] };

const coursesFilePath = path.join(process.cwd(), "content", "courses.json");
const parallelRequests = 4;

async function readPlayabilityStatus(youtubeVideoId: string) {
  const watchPage = await fetch(`https://www.youtube.com/watch?v=${youtubeVideoId}`, {
    headers: { "Accept-Language": "en", "User-Agent": "Mozilla/5.0 (compatible; CodingMonkContentCheck/1.0)" },
  });
  const pageHtml = await watchPage.text();
  return pageHtml.match(/"playabilityStatus":\{"status":"([A-Z_]+)"/)?.[1] ?? "UNKNOWN";
}

const courses: CourseRecord[] = JSON.parse(readFileSync(coursesFilePath, "utf8"));
const lessons = courses.flatMap((course) =>
  course.modules.flatMap((courseModule) => courseModule.lessons.map((lesson) => ({ course, lesson }))),
);
const changes: string[] = [];
const unknownLessons: string[] = [];

for (let batchStart = 0; batchStart < lessons.length; batchStart += parallelRequests) {
  await Promise.all(
    lessons.slice(batchStart, batchStart + parallelRequests).map(async ({ course, lesson }) => {
      const playabilityStatus = await readPlayabilityStatus(lesson.youtubeVideoId);
      if (playabilityStatus === "UNKNOWN") {
        unknownLessons.push(`${course.slug}: ${lesson.title}`);
        return;
      }
      const isPlayable = playabilityStatus === "OK";
      if ((lesson.canPlayOnWebsite ?? true) !== isPlayable) {
        changes.push(`${isPlayable ? "plays on website" : "YouTube only    "}  ${course.slug}: ${lesson.title}`);
      }
      lesson.canPlayOnWebsite = isPlayable;
    }),
  );
}

writeFileSync(coursesFilePath, `${JSON.stringify(courses, null, 2)}\n`);
const youtubeOnlyCount = lessons.filter(({ lesson }) => lesson.canPlayOnWebsite === false).length;
console.log(
  `Checked ${lessons.length} lessons: ${lessons.length - youtubeOnlyCount} play on the website, ${youtubeOnlyCount} link out to YouTube.`,
);
for (const change of changes) console.log(`  ${change}`);
if (unknownLessons.length > 0)
  console.warn(`Could not read status (left unchanged):\n  ${unknownLessons.join("\n  ")}`);
