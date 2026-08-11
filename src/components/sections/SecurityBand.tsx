import { securityH2, securityChips } from "@/content/security";
import { Section } from "@/components/ui/Section";
import { Chip } from "@/components/ui/Chip";
import { ShieldIcon } from "@/components/icons";
import { Reveal } from "@/components/motion/Reveal";

export function SecurityBand() {
  return (
    <Section id="security" ariaLabel="Security and permissions" band>
      <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
        <Reveal>
          <ShieldIcon className="h-9 w-9 text-accent" />
        </Reveal>
        <Reveal index={1}>
          <h2 id="security-heading" className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            {securityH2}
          </h2>
        </Reveal>
        <Reveal stagger className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {securityChips.map((chip) => (
            <Chip key={chip.label} label={chip.label} />
          ))}
        </Reveal>
      </div>
    </Section>
  );
}
