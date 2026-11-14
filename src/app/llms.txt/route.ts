import { coursesContent, programsContent, siteContent } from "@/content";
import { countLessons } from "@/lib/course-catalog";
import { toAbsoluteUrl } from "@/lib/site-url";

export function GET() {
  const programLines = programsContent.map(
    (program) => `- [${program.title}](${toAbsoluteUrl(`/programs/${program.slug}`)}): ${program.summary}`,
  );
  const courseLines = coursesContent.map(
    (course) =>
      `- [${course.title}](${toAbsoluteUrl(`/courses/${course.slug}`)}): ${course.summary} ${countLessons(course)} free lessons.`,
  );
  const body = [
    `# ${siteContent.name}`,
    "",
    `> ${siteContent.description}`,
    "",
    "## Placement programs for colleges",
    ...programLines,
    "",
    "## Free courses",
    ...courseLines,
    "",
    "## Contact",
    `- [Book a campus demo](${toAbsoluteUrl("/book-demo")})`,
    `- [YouTube channel](${siteContent.youtubeChannel.url})`,
    "",
  ].join("\n");
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
