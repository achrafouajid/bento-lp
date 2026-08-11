"use client";

import { useState } from "react";
import type { FaqItem } from "@/types/content";
import { ChevronDownIcon } from "@/components/icons";
import { cn } from "@/lib/cn";

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="flex flex-col divide-y divide-ink-700 border-y border-ink-700">
      {items.map((item, i) => {
        const open = openIndex === i;
        const panelId = `faq-panel-${i}`;
        const buttonId = `faq-button-${i}`;
        return (
          <div key={item.question}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenIndex(open ? null : i)}
                className="flex w-full items-center justify-between gap-4 py-5 text-left text-base font-semibold text-fg transition-colors duration-200 hover:text-accent focus-visible:outline-2 focus-visible:outline-accent sm:text-lg"
              >
                {item.question}
                <ChevronDownIcon
                  className={cn(
                    "h-5 w-5 shrink-0 text-fg-muted transition-[transform,color] duration-300 ease-[cubic-bezier(0.22,1.15,0.36,1)]",
                    open && "rotate-180 text-accent"
                  )}
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              data-open={open}
              className={cn("acc-panel", open && "pb-5")}
            >
              <div className="acc-inner">
                <p className="prose-measure text-fg-muted">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
