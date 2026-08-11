import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Privacy Policy",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <main className="flex-1 py-20">
      <Container className="max-w-2xl">
        <h1 className="text-3xl font-extrabold tracking-tight">Privacy Policy</h1>
        <p className="mt-2 text-sm text-fg-muted">
          Placeholder — replace with counsel-reviewed copy before launch.
        </p>
        <div className="prose-measure mt-8 flex flex-col gap-5 text-fg-muted">
          <p>
            This page describes how Bento CRM collects, uses, and protects information submitted through this site,
            including demo request forms. It does not yet reflect a legal review and must not be published as-is.
          </p>
          <p>
            Information you submit (name, work email, company, and team size) is used solely to schedule and follow
            up on your requested demo. It is not sold to third parties.
          </p>
          <p>Contact: privacy@bentocrm.com</p>
        </div>
      </Container>
    </main>
  );
}
