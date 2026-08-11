import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Hero } from "@/components/sections/Hero";
import { StackTax } from "@/components/sections/StackTax";
import { BenefitsBento } from "@/components/sections/BenefitsBento";
import { ModuleTabsSection } from "@/components/sections/ModuleTabsSection";
import { ComparisonTable } from "@/components/sections/ComparisonTable";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { SecurityBand } from "@/components/sections/SecurityBand";
import { FounderNote } from "@/components/sections/FounderNote";
import { PricingTeaser } from "@/components/sections/PricingTeaser";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { faqPageSchema } from "@/lib/schema";

export const dynamic = "force-static";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="flex-1">
        <Hero />
        <StackTax />
        <BenefitsBento />
        <ModuleTabsSection />
        <ComparisonTable />
        <HowItWorks />
        <SecurityBand />
        <FounderNote />
        <PricingTeaser />
        <Faq />
        <FinalCta />
      </main>
      <SiteFooter />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema()) }}
      />
    </>
  );
}
