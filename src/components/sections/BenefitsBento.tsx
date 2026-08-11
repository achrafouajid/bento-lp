import { benefits } from "@/content/benefits";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/cn";
import { Reveal } from "@/components/motion/Reveal";

const spanClass = {
  sm: "lg:col-span-4",
  md: "lg:col-span-4",
  lg: "lg:col-span-8",
};

export function BenefitsBento() {
  return (
    <Section id="benefits" ariaLabel="Benefits" band>
      <Reveal className="mx-auto max-w-2xl text-center">
        <h2 id="benefits-heading" className="text-3xl font-bold tracking-tight sm:text-4xl">
          Everything a lead-to-cash motion needs, sharing one record
        </h2>
      </Reveal>

      <Reveal
        stagger
        className="mt-12 grid gap-5 lg:grid-cols-12"
        style={{ gridAutoRows: "minmax(180px, auto)" }}
      >
        {benefits.map((benefit) => (
          <Card key={benefit.title} className={cn("flex flex-col justify-center", spanClass[benefit.span])}>
            <h3 className="text-xl font-semibold text-fg">{benefit.title}</h3>
            <p className="prose-measure mt-2.5 text-[0.95rem] text-fg-muted">{benefit.body}</p>
          </Card>
        ))}
      </Reveal>
    </Section>
  );
}
