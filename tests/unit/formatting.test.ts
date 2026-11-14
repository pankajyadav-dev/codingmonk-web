import { describe, expect, test } from "bun:test";
import { splitAccentedText, stripAccentMarks } from "@/lib/accented-text";
import { selectActiveAnnouncements } from "@/lib/announcements";
import {
  fillTemplate,
  formatCourseLength,
  formatIndianNumber,
  formatPackageLpa,
  formatVideoDuration,
} from "@/lib/format";
import { toIsoDuration } from "@/lib/structured-data";
import { buildWhatsappUrl } from "@/lib/whatsapp";

describe("formatting", () => {
  test("numbers use the Indian grouping", () => {
    expect(formatIndianNumber(120000)).toBe("1,20,000");
    expect(formatIndianNumber(18000)).toBe("18,000");
  });
  test("packages read as LPA", () => {
    expect(formatPackageLpa(9)).toBe("9 LPA");
    expect(formatPackageLpa(14.5)).toBe("14.5 LPA");
  });
  test("durations", () => {
    expect(formatVideoDuration(65)).toBe("1:05");
    expect(formatVideoDuration(3725)).toBe("1:02:05");
    expect(formatCourseLength(5400)).toBe("1.5 h");
    expect(formatCourseLength(1500)).toBe("25 min");
    expect(toIsoDuration(3725)).toBe("PT1H2M5S");
  });
  test("templates fill named values and keep unknown ones", () => {
    expect(fillTemplate("Lesson {current} of {total}", { current: 2, total: 50 })).toBe("Lesson 2 of 50");
    expect(fillTemplate("{missing}", {})).toBe("{missing}");
  });
});

describe("accented headings", () => {
  test("marks the words wrapped in asterisks", () => {
    expect(splitAccentedText("Train with *focus.* Get *placed.*")).toEqual([
      { text: "Train with ", isAccent: false },
      { text: "focus.", isAccent: true },
      { text: " Get ", isAccent: false },
      { text: "placed.", isAccent: true },
    ]);
    expect(stripAccentMarks("Get *placed.*")).toBe("Get placed.");
  });
});

describe("announcements", () => {
  const announcement = {
    id: "a",
    message: "m",
    linkLabel: "l",
    linkHref: "/",
    startsOn: "2026-11-01",
    endsOn: "2027-03-31",
  };
  test("only shows announcements inside their dates", () => {
    expect(selectActiveAnnouncements([announcement], "2026-10-31")).toEqual([]);
    expect(selectActiveAnnouncements([announcement], "2026-11-01")).toEqual([announcement]);
    expect(selectActiveAnnouncements([announcement], "2027-04-01")).toEqual([]);
  });
});

describe("whatsapp", () => {
  test("encodes the message", () => {
    expect(buildWhatsappUrl("910000000000", "Hi & hello")).toBe("https://wa.me/910000000000?text=Hi%20%26%20hello");
  });
});
