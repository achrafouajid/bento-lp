import { modules } from "@/content/modules";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { ModuleTabs } from "@/components/interactive/ModuleTabs";
import { Reveal } from "@/components/motion/Reveal";

export function ModuleTabsSection() {
  return (
    <Section id="modules" ariaLabel="Module deep-dive">
      <Reveal className="mx-auto max-w-2xl text-center">
        <Badge>Product</Badge>
        <h2 id="modules-heading" className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
          Six modules. One record.
        </h2>
        <p className="prose-measure mx-auto mt-3 text-fg-muted">
          Not a bolt-on integration for each function — the same customer record, viewed from six angles.
        </p>
      </Reveal>

      <Reveal index={1} className="mt-12">
        <ModuleTabs tabs={modules} />
      </Reveal>
    </Section>
  );
}
