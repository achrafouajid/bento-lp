import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Container } from "./Container";

export function Section({
  id,
  ariaLabel,
  children,
  className,
  band = false,
}: {
  id?: string;
  ariaLabel: string;
  children: ReactNode;
  className?: string;
  band?: boolean;
}) {
  return (
    <section
      id={id}
      aria-labelledby={id ? `${id}-heading` : undefined}
      aria-label={id ? undefined : ariaLabel}
      className={cn("py-20 sm:py-28", band && "bg-ink-900 border-y border-ink-700", className)}
    >
      <Container>{children}</Container>
    </section>
  );
}
