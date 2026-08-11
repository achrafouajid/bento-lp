import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Scroll reveal wrapper. Intentionally a plain server component — it renders a
 * class and a `--i` stagger index, nothing more. All behaviour lives in
 * globals.css (native scroll-driven animation) with a JS fallback wired up
 * globally by MotionRuntime, so wrapping a section costs zero client bytes.
 */
export function Reveal({
  as: Tag = "div",
  index = 0,
  stagger = false,
  className,
  style,
  children,
}: {
  as?: ElementType;
  /** Shifts the animation range so siblings cascade instead of firing together. */
  index?: number;
  /** Cascade direct children instead of animating this element as one block. */
  stagger?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children: ReactNode;
}) {
  return (
    <Tag
      className={cn(stagger ? "reveal-stagger" : "reveal", className)}
      style={index ? ({ ...style, "--i": index } as React.CSSProperties) : style}
    >
      {children}
    </Tag>
  );
}
