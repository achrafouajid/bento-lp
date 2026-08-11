import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Terms of Service",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <main className="flex-1 py-20">
      <Container className="max-w-2xl">
        <h1 className="text-3xl font-extrabold tracking-tight">Terms of Service</h1>
        <p className="mt-2 text-sm text-fg-muted">
          Placeholder — replace with counsel-reviewed copy before launch.
        </p>
        <div className="prose-measure mt-8 flex flex-col gap-5 text-fg-muted">
          <p>
            These terms govern use of this marketing site. They do not yet reflect a legal review and must not be
            published as-is.
          </p>
          <p>Contact: legal@bentocrm.com</p>
        </div>
      </Container>
    </main>
  );
}
