import type { PricingTier } from "@/types/content";

export const pricingH2 = "Priced per user. One bill instead of four.";
export const pricingSub = "Most teams replace 3–4 subscriptions and come out ahead in month one.";

export const pricingTiers: PricingTier[] = [
  {
    name: "Starter",
    description: "For teams consolidating their first two tools.",
    features: ["Pipeline & deals", "Tasks & automation basics", "Per-user dashboards", "Email support"],
  },
  {
    name: "Growth",
    description: "For teams running sales, support, and billing together.",
    features: [
      "Everything in Starter",
      "Native ticketing with SLAs",
      "Proposals, POs & invoicing",
      "Cross-object automation",
      "Role, team & group permissions",
    ],
    featured: true,
  },
  {
    name: "Enterprise",
    description: "For multi-team orgs that need audit-ready controls.",
    features: [
      "Everything in Growth",
      "Partner & channel management",
      "Advanced analytics",
      "Audit-ready activity trail",
      "Dedicated migration support",
    ],
  },
];
