"use client";

import { X } from "lucide-react";
import { Dialog } from "radix-ui";
import { useState } from "react";
import { StoryCard } from "@/components/molecules/story-card";
import type { StudentStory } from "@/content/schemas";
import { getYoutubeEmbedUrl } from "@/lib/course-catalog";
import { fillTemplate } from "@/lib/format";
import { CardGrid } from "./card-grid";

type StoryGridProps = {
  stories: StudentStory[];
  playLabelTemplate: string;
  comingSoonMessage: string;
  closeLabel: string;
};

export function StoryGrid({ stories, playLabelTemplate, comingSoonMessage, closeLabel }: StoryGridProps) {
  const [openStory, setOpenStory] = useState<StudentStory | null>(null);
  return (
    <>
      <CardGrid minimumCardSize="sm">
        {stories.map((story) => (
          <li key={story.studentName}>
            <StoryCard
              story={story}
              playLabel={fillTemplate(playLabelTemplate, { name: story.studentName })}
              onPlay={() => setOpenStory(story)}
            />
          </li>
        ))}
      </CardGrid>
      <Dialog.Root open={openStory !== null} onOpenChange={(isOpen) => !isOpen && setOpenStory(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-overlay" />
          <Dialog.Content className="fixed top-1/2 left-1/2 z-50 grid w-[min(720px,calc(100vw-32px))] -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl bg-background p-5 shadow-raised focus:outline-none">
            <div className="flex items-start justify-between gap-4">
              <Dialog.Title className="font-display text-heading-md font-bold">
                {openStory?.studentName}: {openStory?.headline}
              </Dialog.Title>
              <Dialog.Close
                aria-label={closeLabel}
                className="grid size-10 shrink-0 place-items-center rounded-md border border-line"
              >
                <X aria-hidden="true" className="size-5" />
              </Dialog.Close>
            </div>
            {openStory?.youtubeVideoId ? (
              <iframe
                src={getYoutubeEmbedUrl(openStory.youtubeVideoId)}
                title={openStory.headline}
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="aspect-video w-full rounded-md"
              />
            ) : (
              <Dialog.Description className="rounded-md border border-dashed border-brand bg-brand-glow p-4 text-body text-muted">
                {comingSoonMessage}
              </Dialog.Description>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
