import { splitAccentedText } from "@/lib/accented-text";

export function AccentedText({ markedText, isOnPanel = false }: { markedText: string; isOnPanel?: boolean }) {
  return splitAccentedText(markedText).map((segment, segmentIndex) =>
    segment.isAccent ? (
      <em
        // biome-ignore lint/suspicious/noArrayIndexKey: segments are static and never reordered
        key={segmentIndex}
        className={`font-accent font-normal italic tracking-[-0.01em] ${isOnPanel ? "text-brand" : "text-accent-text"}`}
      >
        {segment.text}
      </em>
    ) : (
      segment.text
    ),
  );
}
