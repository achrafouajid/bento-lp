"use client";

import { useEffect, useState } from "react";
import type { NavLink } from "@/types/content";
import { MenuIcon, CloseIcon } from "@/components/icons";
import { ButtonLink } from "@/components/ui/Button";

export function MobileNav({ links, demoHref }: { links: NavLink[]; demoHref: string }) {
  const [open, setOpen] = useState(false);

  // Keep the page behind the sheet still while it is open.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
        className="press flex h-11 w-11 items-center justify-center rounded-lg text-fg transition-colors duration-200 hover:text-accent focus-visible:outline-2 focus-visible:outline-accent"
      >
        {open ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
      </button>

      {open && (
        <div
          id="mobile-nav-panel"
          className="sheet-in absolute inset-x-0 top-full border-t border-ink-700 bg-ink-950 px-6 py-6"
        >
          <nav aria-label="Mobile">
            <ul className="flex flex-col gap-1">
              {links.map((link, i) => (
                <li key={link.href} style={{ animationDelay: `${40 + i * 45}ms` }}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-3 text-base font-medium text-fg transition-colors duration-200 hover:bg-ink-800 hover:text-accent"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <ButtonLink
            href={demoHref}
            onClick={() => setOpen(false)}
            className="mt-4 w-full"
            style={{ animationDelay: `${40 + links.length * 45}ms` }}
          >
            Book a demo
          </ButtonLink>
        </div>
      )}
    </div>
  );
}
