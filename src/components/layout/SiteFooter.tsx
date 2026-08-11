import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { footerProductLinks, footerCompareLinks, footerLegalLinks } from "@/content/nav";

function FooterCol({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h3 className="mb-3 text-sm font-semibold text-fg">{title}</h3>
      <ul className="flex flex-col gap-2.5">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="inline-block text-sm text-fg-muted transition-[color,translate] duration-200 hover:translate-x-0.5 hover:text-fg"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-ink-700 bg-ink-900">
      <Container className="py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="text-lg font-extrabold tracking-tight text-fg">
              Bento<span className="text-accent">.</span>
            </Link>
            <p className="prose-measure mt-3 text-sm text-fg-muted">
              The all-in-one CRM for pipeline, support, and billing on one customer record.
            </p>
          </div>
          <FooterCol title="Product" links={footerProductLinks} />
          <FooterCol title="Compare" links={footerCompareLinks} />
          <FooterCol title="Legal" links={footerLegalLinks} />
        </div>
        <div className="mt-12 flex flex-col gap-4 border-t border-ink-700 pt-8 text-sm text-fg-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Bento CRM. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
}
