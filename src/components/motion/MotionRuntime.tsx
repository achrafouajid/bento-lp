"use client";

import { useEffect } from "react";

const SUPPORTS_VIEW_TIMELINE =
  typeof CSS !== "undefined" && CSS.supports?.("animation-timeline", "view()");

/**
 * The only always-on client script on the page. It does two things and then
 * gets out of the way:
 *
 *  1. Reveal fallback — for browsers without scroll-driven animations, an
 *     IntersectionObserver flips `.is-in` once per element and then unobserves
 *     it. Skipped entirely where `animation-timeline: view()` is supported.
 *  2. Pointer spotlight — a single delegated `pointermove` listener, throttled
 *     to one rAF, writing two custom properties. Bound only on fine pointers,
 *     so phones never pay for it.
 *
 * Both bail out under `prefers-reduced-motion: reduce`.
 */
export function MotionRuntime() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const cleanups: Array<() => void> = [];

    if (!SUPPORTS_VIEW_TIMELINE) {
      const targets = document.querySelectorAll<HTMLElement>(".reveal, .reveal-stagger");
      const io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        },
        // Fire slightly before the element is fully on screen so the motion
        // finishes about when the reader's eye arrives.
        { rootMargin: "0px 0px -12% 0px", threshold: 0.08 }
      );
      targets.forEach((el) => io.observe(el));
      cleanups.push(() => io.disconnect());
    }

    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      let frame = 0;
      let pending: { el: HTMLElement; x: number; y: number } | null = null;

      const onMove = (event: PointerEvent) => {
        const el = (event.target as Element | null)?.closest<HTMLElement>(".spot");
        if (!el) return;
        const rect = el.getBoundingClientRect();
        pending = { el, x: event.clientX - rect.left, y: event.clientY - rect.top };
        if (frame) return;
        frame = requestAnimationFrame(() => {
          frame = 0;
          if (!pending) return;
          pending.el.style.setProperty("--mx", `${pending.x}px`);
          pending.el.style.setProperty("--my", `${pending.y}px`);
        });
      };

      window.addEventListener("pointermove", onMove, { passive: true });
      cleanups.push(() => {
        window.removeEventListener("pointermove", onMove);
        if (frame) cancelAnimationFrame(frame);
      });
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}
