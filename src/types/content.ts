export interface NavLink {
  label: string;
  href: string;
}

export interface HeroContent {
  eyebrow: string;
  headline: string;
  sub: string;
  primaryCta: string;
  primaryCtaHref: string;
  secondaryCta: string;
  proofLine: string;
}

export interface CostCard {
  title: string;
  body: string;
}

export interface StackTaxContent {
  eyebrow: string;
  h2: string;
  cards: CostCard[];
  resolution: string;
}

export interface BenefitCard {
  title: string;
  body: string;
  span: "sm" | "md" | "lg";
}

export interface ModuleTab {
  id: string;
  label: string;
  headline: string;
  oneLiner: string;
  bullets: string[];
  mockup: "pipeline" | "support" | "billing" | "partners" | "automation" | "analytics";
}

export interface ComparisonRow {
  label: string;
  bento: string | boolean;
  stackA: string | boolean;
  stackB: string | boolean;
  highlight?: boolean;
}

export interface ComparisonContent {
  columns: [string, string, string];
  rows: ComparisonRow[];
}

export interface HowItWorksStep {
  step: number;
  title: string;
  body: string;
}

export interface SecurityChip {
  label: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  supports: string;
}

export interface PricingTier {
  name: string;
  description: string;
  features: string[];
  featured?: boolean;
}

export interface FaqItem {
  question: string;
  answer: string;
}
