import { describe, expect, test } from "bun:test";
import {
  composeWhatsappMessage,
  demoRequestSchema,
  generateReferenceCode,
  normalizeIndianMobileNumber,
} from "@/lib/demo-request";

const validRequest = {
  requestType: "campus-demo",
  collegeName: "Sample Institute of Technology",
  city: "Hyderabad",
  state: "Telangana",
  studentsYear: "final-year",
  programInterest: "2-month-placement-sprint",
  batchSize: "240",
  placementSeason: "2026-27",
  contactName: "Dr. A. Rao",
  designation: "tpo",
  phone: "+91 98765 43210",
  email: "tpo@sample.edu.in",
  consent: "on",
};

describe("normalizeIndianMobileNumber", () => {
  test.each([
    ["9876543210", "9876543210"],
    ["+91 98765 43210", "9876543210"],
    ["09876543210", "9876543210"],
    ["98765-43210", "9876543210"],
  ])("%s becomes %s", (rawPhone, expectedPhone) => {
    expect(normalizeIndianMobileNumber(rawPhone)).toBe(expectedPhone);
  });
});

describe("demoRequestSchema", () => {
  test("accepts a complete request and normalizes it", () => {
    const parsed = demoRequestSchema.parse(validRequest);
    expect(parsed.phone).toBe("9876543210");
    expect(parsed.batchSize).toBe(240);
    expect(parsed.message).toBe("");
  });

  test.each([
    ["phone", "5123456789", "phone"],
    ["phone", "12345", "phone"],
    ["email", "not-an-email", "email"],
    ["batchSize", "5", "batchSize"],
    ["batchSize", "9000", "batchSize"],
    ["state", "Atlantis", "required"],
    ["collegeName", "   ", "required"],
  ])("rejects %s = %p with the %s message", (fieldName, fieldValue, expectedCode) => {
    const parsed = demoRequestSchema.safeParse({ ...validRequest, [fieldName]: fieldValue });
    expect(parsed.success).toBe(false);
    expect(parsed.error?.issues[0]?.message).toBe(expectedCode);
  });

  test("requires consent", () => {
    const { consent: _consent, ...withoutConsent } = validRequest;
    expect(demoRequestSchema.safeParse(withoutConsent).error?.issues[0]?.message).toBe("consent");
  });
});

describe("generateReferenceCode", () => {
  test("creates a readable code without confusing characters", () => {
    const referenceCode = generateReferenceCode(new Uint8Array([0, 1, 2, 3, 30, 31]));
    expect(referenceCode).toMatch(/^CM-[A-HJ-NP-Z2-9]{6}$/);
  });
});

describe("composeWhatsappMessage", () => {
  test("lists every detail on its own line", () => {
    const message = composeWhatsappMessage(
      "Hi CodingMonk",
      {
        requestType: "Request",
        collegeName: "College",
        location: "Location",
        studentsYear: "Students",
        programInterest: "Program",
        batchSize: "Batch size",
        placementSeason: "Season",
        contactName: "Name",
        designation: "Designation",
        reference: "Reference",
      },
      demoRequestSchema.parse(validRequest),
      {
        requestType: "Campus demo",
        studentsYear: "Final year",
        programInterest: "2-Month Placement Sprint",
        placementSeason: "2026–27",
        designation: "TPO",
      },
      "CM-ABCDEF",
    );
    expect(message.split("\n")).toEqual([
      "Hi CodingMonk",
      "",
      "Request: Campus demo",
      "College: Sample Institute of Technology",
      "Location: Hyderabad, Telangana",
      "Students: Final year",
      "Program: 2-Month Placement Sprint",
      "Batch size: 240",
      "Season: 2026–27",
      "Name: Dr. A. Rao",
      "Designation: TPO",
      "Reference: CM-ABCDEF",
    ]);
  });
});
