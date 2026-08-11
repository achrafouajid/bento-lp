import { hero } from "@/content/hero";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { ProductMockup } from "@/components/ui/ProductMockup";

export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="relative overflow-hidden pt-16 pb-20 sm:pt-24 sm:pb-28">
      <div
        aria-hidden="true"
        className="hero-aurora pointer-events-none absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/3 rounded-full opacity-30 blur-[120px] will-change-transform"
        style={{ background: "radial-gradient(circle, var(--color-accent) 0%, var(--color-accent-2) 60%, transparent 70%)" }}
      />
      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center">
          <p className="hero-in mb-5 inline-flex items-center rounded-full border border-ink-700 bg-ink-900 px-4 py-1.5 text-xs font-medium text-fg-muted sm:text-sm">
            {hero.eyebrow}
          </p>
          {/* `hero-lcp` animates transform only — the LCP candidate is never
              painted at opacity 0, so the entrance costs nothing in LCP. */}
          <h1
            id="hero-heading"
            className="hero-lcp text-[clamp(2.5rem,5vw+1rem,4.5rem)] font-extrabold tracking-[-0.03em] text-fg"
          >
            {hero.headline}
          </h1>
          <p
            className="hero-in prose-measure mx-auto mt-6 text-[1.0625rem] leading-[1.65] text-fg-muted"
            style={{ "--i": 2 } as React.CSSProperties}
          >
            {hero.sub}
          </p>

          <div
            className="hero-in mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
            style={{ "--i": 3 } as React.CSSProperties}
          >
            <ButtonLink href={hero.primaryCtaHref}>{hero.primaryCta}</ButtonLink>
            <ButtonLink href="#modules" variant="ghost">
              {hero.secondaryCta}
            </ButtonLink>
          </div>

          <p className="hero-in mt-5 text-sm text-fg-muted" style={{ "--i": 4 } as React.CSSProperties}>
            {hero.proofLine}
          </p>
        </div>

        <div className="hero-mockup relative mx-auto mt-16 max-w-4xl">
          <div className="float-slow">
            <ProductMockup
              variant="dashboard"
              className="[transform:perspective(1400px)_rotateX(3deg)] shadow-[0_50px_120px_-30px_rgba(37,99,235,0.45)]"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
