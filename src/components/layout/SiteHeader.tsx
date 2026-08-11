import Link from "next/link";
import { primaryNav, demoHref } from "@/content/nav";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { MobileNav } from "@/components/interactive/MobileNav";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink-700 bg-ink-950/85 backdrop-blur">
      {/* Fades in as the page scrolls, driven by a native scroll timeline.
          Without timeline support it simply stays at its opaque base state. */}
      <div
        aria-hidden="true"
        className="header-shade pointer-events-none absolute inset-0 -z-10 bg-ink-950 shadow-[0_10px_30px_-20px_rgba(0,0,0,0.9)]"
      />

      <Container className="relative flex h-16 items-center justify-between sm:h-[72px]">
        <Link
          href="/"
          className="group text-lg font-extrabold tracking-tight text-fg transition-opacity duration-200 hover:opacity-80"
        >
          Bento
          <span className="inline-block text-accent transition-transform duration-300 ease-out group-hover:translate-y-[-2px]">
            .
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {primaryNav.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="underline-fx block rounded-lg px-3.5 py-2 text-sm font-medium text-fg-muted transition-colors duration-200 hover:text-fg"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden md:block">
          <ButtonLink href={demoHref}>Book a demo</ButtonLink>
        </div>

        <MobileNav links={primaryNav} demoHref={demoHref} />
      </Container>

      {/* Reading progress. Base state is scaleX(0), so browsers without
          scroll-driven animations show nothing rather than a stuck full bar. */}
      <div
        aria-hidden="true"
        className="scroll-progress absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-accent to-accent-2"
      />
    </header>
  );
}
