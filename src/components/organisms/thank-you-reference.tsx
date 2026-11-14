"use client";

import { useSearchParams } from "next/navigation";
import { ButtonLink } from "@/components/atoms/button";
import { WhatsappIcon } from "@/components/atoms/whatsapp-icon";
import { buildWhatsappUrl } from "@/lib/whatsapp";

type ThankYouReferenceProps = {
  whatsappNumber: string;
  greeting: string;
  referenceLabel: string;
  openWhatsappLabel: string;
};

export function ThankYouReference({
  whatsappNumber,
  greeting,
  referenceLabel,
  openWhatsappLabel,
}: ThankYouReferenceProps) {
  const referenceCode = useSearchParams()
    .get("reference")
    ?.match(/^CM-[A-Z0-9]{6}$/)?.[0];
  const message = referenceCode ? `${greeting}\n${referenceLabel}: ${referenceCode}` : greeting;
  return (
    <div className="flex flex-wrap items-center gap-4">
      {referenceCode ? (
        <p className="rounded-md border border-line bg-surface px-4 py-2.5 text-body">
          {referenceLabel}: <strong className="font-display tabular-nums">{referenceCode}</strong>
        </p>
      ) : null}
      <ButtonLink href={buildWhatsappUrl(whatsappNumber, message)} variant="whatsapp">
        <WhatsappIcon size={18} />
        {openWhatsappLabel}
      </ButtonLink>
    </div>
  );
}
