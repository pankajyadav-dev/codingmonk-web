import { z } from "zod";

export const requestTypes = ["campus-demo", "sample-report", "proposal"] as const;
export const studentsYears = ["final-year", "pre-final-year", "both"] as const;
export const placementSeasons = ["2026-27", "2027-28", "not-sure"] as const;
export const designations = ["tpo", "principal", "dean", "hod", "director", "faculty", "other"] as const;
export const notSureProgramValue = "not-sure";

export const indianStatesAndTerritories = [
  "Andaman and Nicobar Islands",
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chandigarh",
  "Chhattisgarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Ladakh",
  "Lakshadweep",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Puducherry",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
] as const;

export type DemoRequestErrorCode = "required" | "phone" | "email" | "batchSize" | "consent";

export function normalizeIndianMobileNumber(rawPhone: string) {
  const digitsOnly = rawPhone.replace(/\D/g, "");
  const withoutCountryCode = digitsOnly.length === 12 && digitsOnly.startsWith("91") ? digitsOnly.slice(2) : digitsOnly;
  return withoutCountryCode.length === 11 && withoutCountryCode.startsWith("0")
    ? withoutCountryCode.slice(1)
    : withoutCountryCode;
}

const requiredText = z.string().trim().min(1, "required").max(200);

export const demoRequestSchema = z.object({
  requestType: z.enum(requestTypes, "required"),
  collegeName: requiredText,
  city: requiredText,
  state: z.enum(indianStatesAndTerritories, "required"),
  studentsYear: z.enum(studentsYears, "required"),
  programInterest: requiredText,
  batchSize: z.coerce.number("batchSize").int("batchSize").min(10, "batchSize").max(5000, "batchSize"),
  placementSeason: z.enum(placementSeasons, "required"),
  contactName: requiredText,
  designation: z.enum(designations, "required"),
  phone: z
    .string()
    .trim()
    .min(1, "required")
    .transform(normalizeIndianMobileNumber)
    .pipe(z.string().regex(/^[6-9]\d{9}$/, "phone")),
  email: z.string().trim().min(1, "required").pipe(z.email("email")),
  message: z.string().trim().max(1000).optional().default(""),
  consent: z.literal("on", "consent"),
  sourcePath: z.string().max(200).optional().default("/book-demo"),
});

export type DemoRequest = z.infer<typeof demoRequestSchema>;
export type DemoRequestField = keyof DemoRequest;

export const demoRequestFieldsByStep = {
  college: ["requestType", "collegeName", "city", "state"],
  batch: ["studentsYear", "programInterest", "batchSize", "placementSeason"],
  contact: ["contactName", "designation", "phone", "email", "message", "consent"],
} as const satisfies Record<string, readonly DemoRequestField[]>;

export function collectFieldErrorCodes(issues: z.core.$ZodIssue[]) {
  const fieldErrorCodes: Partial<Record<DemoRequestField, DemoRequestErrorCode>> = {};
  for (const issue of issues) {
    const fieldName = issue.path[0] as DemoRequestField | undefined;
    if (!fieldName || fieldErrorCodes[fieldName]) continue;
    const knownCodes: DemoRequestErrorCode[] = ["required", "phone", "email", "batchSize", "consent"];
    fieldErrorCodes[fieldName] = knownCodes.includes(issue.message as DemoRequestErrorCode)
      ? (issue.message as DemoRequestErrorCode)
      : "required";
  }
  return fieldErrorCodes;
}

export function generateReferenceCode(randomValues: Uint8Array) {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const characters = [...randomValues.slice(0, 6)].map((randomValue) => alphabet[randomValue % alphabet.length]);
  return `CM-${characters.join("")}`;
}

export type WhatsappMessageLabels = Record<
  | "requestType"
  | "collegeName"
  | "location"
  | "studentsYear"
  | "programInterest"
  | "batchSize"
  | "placementSeason"
  | "contactName"
  | "designation"
  | "reference",
  string
>;

export type DemoRequestDisplayValues = {
  requestType: string;
  studentsYear: string;
  programInterest: string;
  placementSeason: string;
  designation: string;
};

export function composeWhatsappMessage(
  intro: string,
  labels: WhatsappMessageLabels,
  demoRequest: DemoRequest,
  displayValues: DemoRequestDisplayValues,
  referenceCode: string,
) {
  const lines: [string, string][] = [
    [labels.requestType, displayValues.requestType],
    [labels.collegeName, demoRequest.collegeName],
    [labels.location, `${demoRequest.city}, ${demoRequest.state}`],
    [labels.studentsYear, displayValues.studentsYear],
    [labels.programInterest, displayValues.programInterest],
    [labels.batchSize, String(demoRequest.batchSize)],
    [labels.placementSeason, displayValues.placementSeason],
    [labels.contactName, demoRequest.contactName],
    [labels.designation, displayValues.designation],
    [labels.reference, referenceCode],
  ];
  return [intro, "", ...lines.map(([label, value]) => `${label}: ${value}`)].join("\n");
}

export const honeypotFieldName = "companyWebsite";

export type DemoRequestResult =
  | { status: "idle" }
  | { status: "saved"; referenceCode: string; whatsappUrl: string }
  | { status: "invalid"; fieldErrorCodes: Partial<Record<DemoRequestField, DemoRequestErrorCode>> }
  | { status: "rate-limited" }
  | { status: "failed" };

export type DemoRequestAction = (previousResult: DemoRequestResult, formData: FormData) => Promise<DemoRequestResult>;
