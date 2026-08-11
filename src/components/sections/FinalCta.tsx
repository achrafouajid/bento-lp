import { finalCta } from "@/content/final-cta";
import { Section } from "@/components/ui/Section";
import { Chip } from "@/components/ui/Chip";
import { DemoForm } from "@/components/interactive/DemoForm";
import { Reveal } from "@/components/motion/Reveal";

export function FinalCta() {
  return (
    <Section id="demo" ariaLabel="Book a demo" band>
      <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
        <Reveal>
          <h2 id="demo-heading" className="text-3xl font-bold tracking-tight sm:text-4xl">
            {finalCta.h2}
          </h2>
          <p className="prose-measure mt-4 text-fg-muted">{finalCta.sub}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            {finalCta.riskChips.map((chip) => (
              <Chip key={chip} label={chip} />
            ))}
          </div>
        </Reveal>

        <Reveal
          index={1}
          className="spot rounded-2xl border border-ink-700 bg-ink-800 p-6 sm:p-8 shadow-[0_30px_80px_-50px_var(--color-accent)]"
        >
          <DemoForm submitLabel={finalCta.submitLabel} />
        </Reveal>
      </div>
    </Section>
  );
}
