"use client";

import { ArrowLeft, ArrowRight, Check, ExternalLink, Play } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Button, ButtonLink } from "@/components/atoms/button";
import {
  getYoutubeEmbedUrl,
  getYoutubeThumbnailUrl,
  getYoutubeWatchUrl,
  youtubeEmbedOrigin,
} from "@/lib/course-catalog";
import { fillTemplate } from "@/lib/format";
import { buildLessonKey, setLessonCompleted, useCompletedLessons } from "@/lib/use-course-progress";

type LessonLink = { slug: string; title: string };

type LessonPlayerProps = {
  courseSlug: string;
  lesson: { slug: string; title: string; youtubeVideoId: string; canPlayOnWebsite: boolean };
  previousLesson?: LessonLink;
  nextLesson?: LessonLink;
  labels: {
    playVideoLabel: string;
    previousLessonLabel: string;
    nextLessonLabel: string;
    markCompleteLabel: string;
    completedLabel: string;
    openOnYoutubeLabel: string;
    videoUnavailableHeading: string;
    videoUnavailableDescription: string;
  };
};

type PlayerView = "poster" | "embedded" | "youtube-only";

function isYoutubeErrorMessage(messageData: unknown) {
  if (typeof messageData !== "string") return false;
  try {
    return (JSON.parse(messageData) as { event?: string }).event === "onError";
  } catch {
    return false;
  }
}

export function LessonPlayer({ courseSlug, lesson, previousLesson, nextLesson, labels }: LessonPlayerProps) {
  const [playerView, setPlayerView] = useState<PlayerView>(lesson.canPlayOnWebsite ? "poster" : "youtube-only");
  const embeddedPlayerRef = useRef<HTMLIFrameElement>(null);
  const playerFrameRef = useRef<HTMLDivElement>(null);
  const completedLessonKeys = useCompletedLessons();
  const lessonKey = buildLessonKey(courseSlug, lesson.slug);
  const isCompleted = completedLessonKeys.has(lessonKey);
  const youtubeWatchUrl = getYoutubeWatchUrl(lesson.youtubeVideoId);

  useEffect(() => {
    if (playerView !== "embedded") return;
    const switchToYoutubeWhenBlocked = (messageEvent: MessageEvent) => {
      if (messageEvent.origin === youtubeEmbedOrigin && isYoutubeErrorMessage(messageEvent.data))
        setPlayerView("youtube-only");
    };
    window.addEventListener("message", switchToYoutubeWhenBlocked);
    return () => window.removeEventListener("message", switchToYoutubeWhenBlocked);
  }, [playerView]);

  useEffect(() => {
    const playerFrame = playerFrameRef.current;
    return () => {
      playerFrame
        ?.querySelector("iframe")
        ?.contentWindow?.postMessage(
          JSON.stringify({ event: "command", func: "pauseVideo", args: [] }),
          youtubeEmbedOrigin,
        );
      setPlayerView((currentView) => (currentView === "embedded" ? "poster" : currentView));
    };
  }, []);

  const subscribeToPlayerEvents = () => {
    embeddedPlayerRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: "listening", id: lesson.youtubeVideoId, channel: "widget" }),
      youtubeEmbedOrigin,
    );
  };

  return (
    <div className="grid gap-4">
      <div ref={playerFrameRef} className="relative aspect-video w-full overflow-hidden rounded-lg bg-panel">
        {playerView === "embedded" ? (
          <iframe
            ref={embeddedPlayerRef}
            src={getYoutubeEmbedUrl(lesson.youtubeVideoId, { listenForErrors: true })}
            title={lesson.title}
            onLoad={subscribeToPlayerEvents}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="size-full"
          />
        ) : null}
        {playerView === "poster" ? (
          <button
            type="button"
            onClick={() => setPlayerView("embedded")}
            aria-label={fillTemplate(labels.playVideoLabel, { title: lesson.title })}
            className="group absolute inset-0 grid place-items-center"
          >
            <Image
              src={getYoutubeThumbnailUrl(lesson.youtubeVideoId)}
              alt=""
              fill
              sizes="(min-width: 1000px) 70vw, 100vw"
              className="object-cover"
              preload
            />
            <span className="relative grid size-20 place-items-center rounded-full bg-brand text-on-brand shadow-brand transition-transform duration-150 group-hover:scale-105">
              <Play aria-hidden="true" className="size-8 translate-x-0.5 fill-current" />
            </span>
          </button>
        ) : null}
        {playerView === "youtube-only" ? (
          <div role="status" className="absolute inset-0 grid place-items-center">
            <Image
              src={getYoutubeThumbnailUrl(lesson.youtubeVideoId)}
              alt=""
              fill
              sizes="(min-width: 1000px) 70vw, 100vw"
              className="object-cover"
            />
            <span aria-hidden="true" className="absolute inset-0 bg-panel/85" />
            <div className="relative grid max-w-[46ch] justify-items-center gap-3 p-6 text-center text-panel-ink">
              <p className="font-display text-heading-md font-bold">{labels.videoUnavailableHeading}</p>
              <p className="text-body-sm text-panel-muted">{labels.videoUnavailableDescription}</p>
              <ButtonLink href={youtubeWatchUrl}>
                <ExternalLink aria-hidden="true" className="size-4" />
                {labels.openOnYoutubeLabel}
              </ButtonLink>
            </div>
          </div>
        ) : null}
      </div>
      <div className="flex flex-wrap gap-2.5">
        {previousLesson ? (
          <ButtonLink href={`/courses/${courseSlug}/${previousLesson.slug}`} variant="secondary">
            <ArrowLeft aria-hidden="true" className="size-4" />
            {labels.previousLessonLabel}
          </ButtonLink>
        ) : null}
        <Button
          variant="secondary"
          aria-pressed={isCompleted}
          onClick={() => setLessonCompleted(lessonKey, !isCompleted)}
        >
          {isCompleted ? <Check aria-hidden="true" className="size-4 text-success" /> : null}
          {isCompleted ? labels.completedLabel : labels.markCompleteLabel}
        </Button>
        {nextLesson ? (
          <ButtonLink
            href={`/courses/${courseSlug}/${nextLesson.slug}`}
            onClick={() => setLessonCompleted(lessonKey, true)}
          >
            {labels.nextLessonLabel}
            <ArrowRight aria-hidden="true" className="size-4" />
          </ButtonLink>
        ) : null}
        {playerView !== "youtube-only" ? (
          <ButtonLink href={youtubeWatchUrl} variant="secondary">
            <ExternalLink aria-hidden="true" className="size-4" />
            {labels.openOnYoutubeLabel}
          </ButtonLink>
        ) : null}
      </div>
    </div>
  );
}
