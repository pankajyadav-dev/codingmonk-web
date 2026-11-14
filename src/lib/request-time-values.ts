import { cacheLife } from "next/cache";
import { announcementsContent } from "@/content";
import { selectActiveAnnouncements } from "./announcements";

export async function getActiveAnnouncement() {
  "use cache";
  cacheLife("hours");
  const isoToday = new Date().toISOString().slice(0, 10);
  return selectActiveAnnouncements(announcementsContent, isoToday)[0] ?? null;
}

export async function getCurrentYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}
