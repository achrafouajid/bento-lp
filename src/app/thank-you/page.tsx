import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Thanks — we'll be in touch",
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <main className="flex flex-1 items-center justify-center py-24">
      <Container className="max-w-xl text-center">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">You&apos;re booked in.</h1>
        <p className="prose-measure mx-auto mt-4 text-fg-muted">
          Thanks for reaching out — someone from our team will confirm your demo time by email shortly. In the
          meantime, feel free to head back to the homepage.
        </p>
        <ButtonLink href="/" className="mt-8">
          Back to homepage
        </ButtonLink>
        <p className="mt-6 text-sm text-fg-muted">
          Wrong email or details?{" "}
          <Link href="/#demo" className="text-accent hover:underline">
            Submit again
          </Link>
          .
        </p>
      </Container>
    </main>
  );
}
