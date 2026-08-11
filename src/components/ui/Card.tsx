import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "spot lift rounded-2xl border border-ink-700 bg-ink-800 p-6 sm:p-8",
        "hover:border-accent/40 hover:shadow-[0_18px_40px_-24px_rgba(37,99,235,0.8)]",
        className
      )}
    >
      {children}
    </div>
  );
}
