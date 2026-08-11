import { faq } from "@/content/faq";
import { Section } from "@/components/ui/Section";
import { FaqAccordion } from "@/components/interactive/FaqAccordion";
import { Reveal } from "@/components/motion/Reveal";

export function Faq() {
  return (
    <Section id="faq" ariaLabel="Frequently asked questions">
      <Reveal className="mx-auto max-w-2xl text-center">
        <h2 id="faq-heading" className="text-3xl font-bold tracking-tight sm:text-4xl">
          Frequently asked questions
        </h2>
      </Reveal>

      <Reveal index={1} className="prose-measure mx-auto mt-10 w-full max-w-3xl">
        <FaqAccordion items={faq} />
      </Reveal>
    </Section>
  );
}
