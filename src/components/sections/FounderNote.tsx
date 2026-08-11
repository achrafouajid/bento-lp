import { founderNote } from "@/content/founder-note";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/motion/Reveal";

export function FounderNote() {
  return (
    <Section id="why" ariaLabel="Why we built this">
      <Reveal className="mx-auto max-w-2xl text-center">
        <Badge>{founderNote.eyebrow}</Badge>
        <h2 id="why-heading" className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
          {founderNote.h2}
        </h2>
        <p className="prose-measure mx-auto mt-5 text-[1.0625rem] leading-[1.65] text-fg-muted">{founderNote.body}</p>
      </Reveal>
    </Section>
  );
}
