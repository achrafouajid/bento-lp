"use client";

import { useEffect, useRef, useState } from "react";
import { PlayIcon, CloseIcon } from "@/components/icons";

// Facade pattern: no iframe/player loads until the user clicks play, so the
// "2-min tour" never costs main-thread time or bytes at page load (§7.5).
export function TourModal({
  trigger,
  videoId,
}: {
  trigger: React.ReactNode;
  videoId?: string;
}) {
  const [open, setOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open) closeRef.current?.focus();
  }, [open]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  if (!videoId) {
    return <>{trigger}</>;
  }

  return (
    <>
      <span onClick={() => setOpen(true)}>{trigger}</span>
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Product tour video"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative aspect-video w-full max-w-3xl overflow-hidden rounded-xl bg-ink-900"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              ref={closeRef}
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close video"
              className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80"
            >
              <CloseIcon className="h-5 w-5" />
            </button>
            {playing ? (
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`}
                title="Bento CRM product tour"
                allow="autoplay; encrypted-media"
                allowFullScreen
                className="h-full w-full"
              />
            ) : (
              <button
                type="button"
                onClick={() => setPlaying(true)}
                className="flex h-full w-full items-center justify-center bg-ink-800"
              >
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-accent text-white">
                  <PlayIcon className="h-7 w-7 translate-x-0.5" />
                </span>
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
