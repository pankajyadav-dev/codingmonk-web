import { Heading } from "@/components/atoms/heading";
import { Text } from "@/components/atoms/text";
import type { TitledItem } from "@/content/schemas";

export function TitledItemCard({ item, accentLabel }: { item: TitledItem; accentLabel?: string }) {
  return (
    <div className="flex h-full flex-col gap-2 border-t-[3px] border-brand pt-5">
      {accentLabel ? <p className="text-caption font-bold text-brand-strong">{accentLabel}</p> : null}
      <Heading as="h3" size="heading-md" markedText={item.title} />
      <Text>{item.description}</Text>
    </div>
  );
}
