import { howItWorks } from "@/content/how-it-works";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";

export function HowItWorks() {
  return (
    <Section id="how-it-works" ariaLabel="How it works">
      <Reveal className="mx-auto max-w-2xl text-center">
        <h2 id="how-it-works-heading" className="text-3xl font-bold tracking-tight sm:text-4xl">
          Live in about two weeks, not two quarters
        </h2>
      </Reveal>

      <Reveal as="ol" stagger className="mt-12 grid gap-8 sm:grid-cols-3">
        {howItWorks.map((step, i) => (
          <li key={step.step} className="group relative">
            {/* Connector between steps, drawn only where the columns sit
                side by side. scaleX on a 1px rule — pure compositor work. */}
            {i < howItWorks.length - 1 && (
              <span
                aria-hidden="true"
                className="line-draw absolute left-12 right-0 top-5 hidden h-px bg-gradient-to-r from-accent/60 to-transparent sm:block"
              />
            )}
            <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-accent text-sm font-bold text-white shadow-[0_0_0_0_rgba(37,99,235,0.5)] transition-shadow duration-300 group-hover:shadow-[0_0_0_8px_rgba(37,99,235,0.14)]">
              {step.step}
            </span>
            <h3 className="mt-4 text-lg font-semibold text-fg">{step.title}</h3>
            <p className="mt-2 text-[0.95rem] text-fg-muted">{step.body}</p>
          </li>
        ))}
      </Reveal>
    </Section>
  );
}
