"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { ModuleTab } from "@/types/content";
import { cn } from "@/lib/cn";
import { CheckIcon } from "@/components/icons";
import { ProductMockup } from "@/components/ui/ProductMockup";

type Indicator = { x: number; y: number; w: number; h: number } | null;

export function ModuleTabs({ tabs }: { tabs: ModuleTab[] }) {
  const [activeId, setActiveId] = useState(tabs[0].id);
  const [indicator, setIndicator] = useState<Indicator>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const listRef = useRef<HTMLDivElement>(null);
  const active = tabs.find((t) => t.id === activeId) ?? tabs[0];
  const activeIndex = tabs.findIndex((t) => t.id === activeId);

  // The pill slides between tabs instead of hard-switching background colours.
  // Positions are measured rather than hard-coded because the list wraps onto
  // multiple rows on narrow screens.
  const measure = useCallback(() => {
    const el = tabRefs.current[activeIndex];
    const list = listRef.current;
    if (!el || !list) return;
    setIndicator({
      x: el.offsetLeft,
      y: el.offsetTop,
      w: el.offsetWidth,
      h: el.offsetHeight,
    });
  }, [activeIndex]);

  useEffect(measure, [measure]);

  useEffect(() => {
    const list = listRef.current;
    if (!list || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(measure);
    ro.observe(list);
    return () => ro.disconnect();
  }, [measure]);

  function onKeyDown(e: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex: number | null = null;
    if (e.key === "ArrowRight") nextIndex = (index + 1) % tabs.length;
    if (e.key === "ArrowLeft") nextIndex = (index - 1 + tabs.length) % tabs.length;
    if (e.key === "Home") nextIndex = 0;
    if (e.key === "End") nextIndex = tabs.length - 1;
    if (nextIndex !== null) {
      e.preventDefault();
      setActiveId(tabs[nextIndex].id);
      tabRefs.current[nextIndex]?.focus();
    }
  }

  return (
    <div>
      <div
        ref={listRef}
        role="tablist"
        aria-label="Product modules"
        className="relative flex flex-wrap gap-2 border-b border-ink-700 pb-4"
      >
        {indicator && (
          <span
            aria-hidden="true"
            className="tab-indicator pointer-events-none absolute left-0 top-0 rounded-lg bg-accent shadow-[0_8px_24px_-12px_var(--color-accent)]"
            style={{
              width: indicator.w,
              height: indicator.h,
              transform: `translate3d(${indicator.x}px, ${indicator.y}px, 0)`,
            }}
          />
        )}

        {tabs.map((tab, i) => (
          <button
            key={tab.id}
            ref={(el) => {
              tabRefs.current[i] = el;
            }}
            role="tab"
            id={`tab-${tab.id}`}
            aria-selected={tab.id === activeId}
            aria-controls={`panel-${tab.id}`}
            tabIndex={tab.id === activeId ? 0 : -1}
            onClick={() => setActiveId(tab.id)}
            onKeyDown={(e) => onKeyDown(e, i)}
            className={cn(
              "press relative z-10 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-accent",
              tab.id === activeId
                ? "text-white"
                : "text-fg-muted hover:bg-ink-800 hover:text-fg",
              // Until the indicator is measured (first paint, or no JS), the
              // active tab carries its own background so it never looks unset.
              tab.id === activeId && !indicator && "bg-accent"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div
        role="tabpanel"
        id={`panel-${active.id}`}
        aria-labelledby={`tab-${active.id}`}
        tabIndex={0}
        key={active.id}
        className="panel-in mt-10 grid gap-10 lg:grid-cols-2 lg:items-center"
      >
        <div className="order-2 lg:order-1">
          <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">{active.headline}</h3>
          <p className="prose-measure mt-3 text-fg-muted">{active.oneLiner}</p>
          <ul className="mt-6 flex flex-col gap-3">
            {active.bullets.map((bullet) => (
              <li key={bullet} className="flex items-start gap-2.5 text-[0.95rem] text-fg">
                <CheckIcon className="mt-1 h-4 w-4 shrink-0 text-accent" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="order-1 lg:order-2">
          <ProductMockup variant={active.mockup} />
        </div>
      </div>

      <span className="sr-only" aria-live="polite">
        {active.label} tab selected. {activeIndex + 1} of {tabs.length}.
      </span>
    </div>
  );
}
