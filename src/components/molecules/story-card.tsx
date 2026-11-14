import { Play } from "lucide-react";
import type { StudentStory } from "@/content/schemas";
import { cn } from "@/lib/class-names";

const storyToneBackground = {
  saffron: "from-[var(--tone-saffron-start)] to-[var(--tone-saffron-end)]",
  maroon: "from-[var(--tone-maroon-start)] to-[var(--tone-maroon-end)]",
  ember: "from-[var(--tone-ember-start)] to-[var(--tone-ember-end)]",
  ink: "from-[var(--tone-ink-start)] to-[var(--tone-ink-end)]",
} as const;

type StoryCardProps = { story: StudentStory; playLabel: string; onPlay: () => void };

export function StoryCard({ story, playLabel, onPlay }: StoryCardProps) {
  return (
    <button
      type="button"
      onClick={onPlay}
      className={cn(
        "group relative aspect-[9/14] w-full overflow-hidden rounded-xl bg-linear-to-br text-left text-on-tone",
        storyToneBackground[story.tone],
      )}
    >
      <span className="absolute top-3 right-3 rounded-sm bg-overlay px-2 py-0.5 text-caption font-semibold tabular-nums">
        {story.durationLabel}
      </span>
      <span className="absolute top-1/2 left-1/2 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-background text-ink transition-transform duration-150 group-hover:scale-110">
        <Play aria-hidden="true" className="size-5 translate-x-0.5 fill-current" />
      </span>
      <span className="absolute inset-x-0 bottom-0 grid gap-0.5 bg-linear-to-t from-overlay to-transparent p-4 pt-10">
        <span className="sr-only">{playLabel}</span>
        <span className="font-display text-heading-sm font-bold">{story.studentName}</span>
        <span className="text-body-sm">{story.headline}</span>
      </span>
    </button>
  );
}
