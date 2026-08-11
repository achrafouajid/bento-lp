import { pricingH2, pricingSub, pricingTiers } from "@/content/pricing";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/Button";
import { CheckIcon } from "@/components/icons";
import { cn } from "@/lib/cn";
import { demoHref } from "@/content/nav";
import { Reveal } from "@/components/motion/Reveal";

export function PricingTeaser() {
  return (
    <Section id="pricing" ariaLabel="Pricing" band>
      <Reveal className="mx-auto max-w-2xl text-center">
        <h2 id="pricing-heading" className="text-3xl font-bold tracking-tight sm:text-4xl">
          {pricingH2}
        </h2>
      </Reveal>

      <Reveal stagger className="mt-12 grid gap-6 lg:grid-cols-3">
        {pricingTiers.map((tier) => (
          <Card
            key={tier.name}
            className={cn(
              "flex flex-col",
              tier.featured &&
                "border-accent shadow-[0_0_0_1px_var(--color-accent)] hover:shadow-[0_0_0_1px_var(--color-accent),0_24px_60px_-30px_var(--color-accent)]"
            )}
          >
            <h3 className="text-xl font-bold text-fg">{tier.name}</h3>
            <p className="mt-1.5 text-sm text-fg-muted">{tier.description}</p>
            <ul className="mt-6 flex flex-1 flex-col gap-2.5">
              {tier.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5 text-sm text-fg">
                  <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <ButtonLink
              href={demoHref}
              variant={tier.featured ? "primary" : "ghost"}
              className={cn("mt-8", !tier.featured && "border border-ink-700")}
            >
              Book a demo
            </ButtonLink>
          </Card>
        ))}
      </Reveal>

      <Reveal as="p" className="mt-8 text-center text-sm text-fg-muted">
        {pricingSub}
      </Reveal>
    </Section>
  );
}
