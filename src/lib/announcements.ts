import type { Announcement } from "@/content/schemas";

export function selectActiveAnnouncements(announcements: Announcement[], isoToday: string) {
  return announcements.filter((announcement) => announcement.startsOn <= isoToday && isoToday <= announcement.endsOn);
}
