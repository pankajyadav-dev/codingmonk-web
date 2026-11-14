import { coursesContent, findContentIntegrityProblems, programsContent } from "@/content";

const integrityProblems = findContentIntegrityProblems();
if (integrityProblems.length > 0) {
  console.error(`Content problems:\n- ${integrityProblems.join("\n- ")}`);
  process.exit(1);
}
const lessonCount = coursesContent.reduce(
  (total, course) => total + course.modules.reduce((sum, courseModule) => sum + courseModule.lessons.length, 0),
  0,
);
console.log(`Content OK: ${programsContent.length} programs, ${coursesContent.length} courses, ${lessonCount} lessons`);
