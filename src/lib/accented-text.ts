export type TextSegment = { text: string; isAccent: boolean };

export function splitAccentedText(markedText: string): TextSegment[] {
  return markedText
    .split(/(\*[^*]+\*)/g)
    .filter((part) => part.length > 0)
    .map((part) =>
      part.startsWith("*") && part.endsWith("*")
        ? { text: part.slice(1, -1), isAccent: true }
        : { text: part, isAccent: false },
    );
}

export function stripAccentMarks(markedText: string) {
  return markedText.replaceAll("*", "");
}
