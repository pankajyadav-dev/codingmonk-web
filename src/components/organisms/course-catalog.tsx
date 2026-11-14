"use client";

import { useState } from "react";
import { Chip } from "@/components/atoms/chip";
import { TextInput } from "@/components/atoms/form-controls";
import type { Course } from "@/content/schemas";
import { CourseGrid } from "./course-grid";

type CourseCatalogProps = {
  courses: Course[];
  labels: {
    searchLabel: string;
    searchPlaceholder: string;
    levelFilterLabel: string;
    allLevelsLabel: string;
    emptyStateMessage: string;
    lessonsUnit: string;
    progressLabel: string;
    seriesStatusLabels: Record<Course["seriesStatus"], string>;
  };
};

export function CourseCatalog({ courses, labels }: CourseCatalogProps) {
  const [searchText, setSearchText] = useState("");
  const [selectedLevel, setSelectedLevel] = useState<Course["level"] | "all">("all");
  const availableLevels = (["Beginner", "Intermediate", "Advanced"] as const).filter((level) =>
    courses.some((course) => course.level === level),
  );
  const normalizedSearch = searchText.trim().toLowerCase();
  const matchingCourses = courses.filter(
    (course) =>
      (selectedLevel === "all" || course.level === selectedLevel) &&
      (normalizedSearch === "" ||
        [course.title, course.summary, ...course.techStack].join(" ").toLowerCase().includes(normalizedSearch)),
  );
  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap items-center gap-3">
        <label htmlFor="course-search" className="sr-only">
          {labels.searchLabel}
        </label>
        <TextInput
          id="course-search"
          type="search"
          value={searchText}
          onChange={(changeEvent) => setSearchText(changeEvent.target.value)}
          placeholder={labels.searchPlaceholder}
          className="max-w-[460px] flex-[1_1_260px]"
        />
        <fieldset className="flex flex-wrap gap-2">
          <legend className="sr-only">{labels.levelFilterLabel}</legend>
          <Chip isSelected={selectedLevel === "all"} onClick={() => setSelectedLevel("all")}>
            {labels.allLevelsLabel}
          </Chip>
          {availableLevels.map((level) => (
            <Chip key={level} isSelected={selectedLevel === level} onClick={() => setSelectedLevel(level)}>
              {level}
            </Chip>
          ))}
        </fieldset>
      </div>
      {matchingCourses.length > 0 ? (
        <CourseGrid
          courses={matchingCourses}
          lessonsUnit={labels.lessonsUnit}
          seriesStatusLabels={labels.seriesStatusLabels}
          progressLabel={labels.progressLabel}
        />
      ) : (
        <p role="status" className="text-body text-muted">
          {labels.emptyStateMessage}
        </p>
      )}
    </div>
  );
}
