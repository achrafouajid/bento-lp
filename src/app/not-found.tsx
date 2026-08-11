import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main className="flex flex-1 items-center justify-center py-24">
      <Container className="max-w-xl text-center">
        <p className="text-sm font-semibold text-accent">404</p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">Page not found</h1>
        <p className="prose-measure mx-auto mt-4 text-fg-muted">
          The page you&apos;re looking for doesn&apos;t exist or has moved.
        </p>
        <ButtonLink href="/" className="mt-8">
          Back to homepage
        </ButtonLink>
      </Container>
    </main>
  );
}
