"use server";

import { createHash, getRandomValues } from "node:crypto";
import { headers } from "next/headers";
import { bookDemoCopy, programsContent, siteContent } from "@/content";
import { countRecentLeadsFromNetwork, saveLead } from "@/db/leads-repository";
import {
  collectFieldErrorCodes,
  composeWhatsappMessage,
  type DemoRequestResult,
  demoRequestSchema,
  generateReferenceCode,
  honeypotFieldName,
  notSureProgramValue,
} from "@/lib/demo-request";
import { buildWhatsappUrl } from "@/lib/whatsapp";

const rateLimitWindowMinutes = 10;
const maximumRequestsPerWindow = 5;

function hashNetworkAddress(networkAddress: string) {
  const salt = process.env.LEAD_IP_HASH_SALT ?? "codingmonk-local-salt";
  return createHash("sha256").update(`${salt}:${networkAddress}`).digest("hex");
}

export async function submitDemoRequest(
  _previousResult: DemoRequestResult,
  formData: FormData,
): Promise<DemoRequestResult> {
  if (String(formData.get(honeypotFieldName) ?? "").length > 0) {
    return {
      status: "saved",
      referenceCode: "CM-000000",
      whatsappUrl: buildWhatsappUrl(siteContent.contact.whatsappNumber, siteContent.whatsappGreeting),
    };
  }

  const parsedRequest = demoRequestSchema.safeParse(Object.fromEntries(formData));
  if (!parsedRequest.success) {
    return { status: "invalid", fieldErrorCodes: collectFieldErrorCodes(parsedRequest.error.issues) };
  }
  const demoRequest = parsedRequest.data;

  const requestHeaders = await headers();
  const networkAddress =
    requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() || requestHeaders.get("x-real-ip") || "unknown";
  const ipHash = hashNetworkAddress(networkAddress);

  try {
    const windowStart = new Date(Date.now() - rateLimitWindowMinutes * 60_000);
    if ((await countRecentLeadsFromNetwork(ipHash, windowStart)) >= maximumRequestsPerWindow) {
      return { status: "rate-limited" };
    }

    const referenceCode = generateReferenceCode(getRandomValues(new Uint8Array(6)));
    await saveLead({
      ...demoRequest,
      referenceCode,
      ipHash,
      userAgent: requestHeaders.get("user-agent")?.slice(0, 300) ?? "",
      consentGivenAt: new Date(),
    });

    const fieldCopy = bookDemoCopy.form.fields;
    const selectedProgram = programsContent.find((program) => program.slug === demoRequest.programInterest);
    const whatsappMessage = composeWhatsappMessage(
      bookDemoCopy.whatsappMessage.intro,
      bookDemoCopy.whatsappMessage.labels,
      demoRequest,
      {
        requestType: fieldCopy.requestType.options[demoRequest.requestType],
        studentsYear: fieldCopy.studentsYear.options[demoRequest.studentsYear],
        programInterest:
          demoRequest.programInterest === notSureProgramValue
            ? fieldCopy.programInterest.notSureLabel
            : (selectedProgram?.title ?? demoRequest.programInterest),
        placementSeason: fieldCopy.placementSeason.options[demoRequest.placementSeason],
        designation: fieldCopy.designation.options[demoRequest.designation],
      },
      referenceCode,
    );
    return {
      status: "saved",
      referenceCode,
      whatsappUrl: buildWhatsappUrl(siteContent.contact.whatsappNumber, whatsappMessage),
    };
  } catch (saveError) {
    console.error("Failed to save demo request", saveError);
    return { status: "failed" };
  }
}
