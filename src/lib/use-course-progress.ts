"use client";

import { useSyncExternalStore } from "react";

const storageKey = "codingmonk.completed-lessons";
const changeEventName = "codingmonk:course-progress";
const emptyCompletion: ReadonlySet<string> = new Set();

let cachedRawValue: string | null = null;
let cachedCompletion: ReadonlySet<string> = emptyCompletion;

function readCompletedLessonIds(): ReadonlySet<string> {
  let rawValue: string | null = null;
  try {
    rawValue = window.localStorage.getItem(storageKey);
  } catch {
    return emptyCompletion;
  }
  if (rawValue === cachedRawValue) return cachedCompletion;
  cachedRawValue = rawValue;
  try {
    const parsedValue: unknown = rawValue ? JSON.parse(rawValue) : [];
    cachedCompletion = new Set(Array.isArray(parsedValue) ? parsedValue.filter((id) => typeof id === "string") : []);
  } catch {
    cachedCompletion = emptyCompletion;
  }
  return cachedCompletion;
}

function subscribeToProgress(onProgressChange: () => void) {
  window.addEventListener("storage", onProgressChange);
  window.addEventListener(changeEventName, onProgressChange);
  return () => {
    window.removeEventListener("storage", onProgressChange);
    window.removeEventListener(changeEventName, onProgressChange);
  };
}

export function setLessonCompleted(lessonKey: string, isCompleted: boolean) {
  const nextCompletion = new Set(readCompletedLessonIds());
  if (isCompleted) nextCompletion.add(lessonKey);
  else nextCompletion.delete(lessonKey);
  try {
    window.localStorage.setItem(storageKey, JSON.stringify([...nextCompletion]));
  } catch {
    return;
  }
  window.dispatchEvent(new Event(changeEventName));
}

export function buildLessonKey(courseSlug: string, lessonSlug: string) {
  return `${courseSlug}/${lessonSlug}`;
}

export function useCompletedLessons() {
  return useSyncExternalStore(subscribeToProgress, readCompletedLessonIds, () => emptyCompletion);
}
