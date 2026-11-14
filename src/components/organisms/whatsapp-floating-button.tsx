import { WhatsappIcon } from "@/components/atoms/whatsapp-icon";

export function WhatsappFloatingButton({ whatsappUrl, label }: { whatsappUrl: string; label: string }) {
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="fixed right-[clamp(14px,2vw,28px)] bottom-[calc(clamp(14px,2vw,28px)+env(safe-area-inset-bottom,0px))] z-30 grid size-14 place-items-center rounded-full bg-whatsapp text-on-whatsapp shadow-raised transition-transform duration-150 hover:scale-105"
    >
      <WhatsappIcon size={28} />
    </a>
  );
}
