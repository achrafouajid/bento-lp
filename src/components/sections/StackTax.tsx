import { stackTax } from "@/content/stack-tax";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/motion/Reveal";

export function StackTax() {
  return (
    <Section id="stack-tax" ariaLabel="The stack tax">
      <Reveal className="mx-auto max-w-2xl text-center">
        <Badge>{stackTax.eyebrow}</Badge>
        <h2 id="stack-tax-heading" className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
          {stackTax.h2}
        </h2>
      </Reveal>

      <Reveal stagger className="mt-12 grid gap-5 sm:grid-cols-3">
        {stackTax.cards.map((card) => (
          <Card key={card.title}>
            <h3 className="text-lg font-semibold text-fg">{card.title}</h3>
            <p className="mt-2 text-[0.95rem] text-fg-muted">{card.body}</p>
          </Card>
        ))}
      </Reveal>

      <Reveal as="p" className="prose-measure mx-auto mt-10 text-center text-lg font-medium text-fg">
        {stackTax.resolution}
      </Reveal>
    </Section>
  );
}
