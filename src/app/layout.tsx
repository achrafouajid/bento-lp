import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { homeMeta, siteName } from "@/content/seo";
import { organizationSchema, websiteSchema, softwareApplicationSchema } from "@/lib/schema";
import { MotionRuntime } from "@/components/motion/MotionRuntime";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://bentocrm.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: homeMeta.title,
    template: `%s — ${siteName}`,
  },
  description: homeMeta.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName,
    title: homeMeta.title,
    description: homeMeta.description,
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
};

const jsonLd = [organizationSchema(), websiteSchema(), softwareApplicationSchema()];

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: the pre-paint script below adds `js` to this
    // element's class list before React hydrates, which is an expected diff.
    <html lang="en" className={`${inter.variable} h-full`} suppressHydrationWarning>
      <head>
        {/* Runs before first paint. Only a client that executes scripts gets the
            `.js` class, and only `.js` unlocks the hidden-until-revealed state
            in the no-scroll-timeline fallback — so crawlers and no-JS visitors
            always receive fully visible content. */}
        <script
          dangerouslySetInnerHTML={{ __html: `document.documentElement.classList.add('js')` }}
        />
      </head>
      <body className="flex min-h-full flex-col">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {children}
        <MotionRuntime />
        {jsonLd.map((schema, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      </body>
    </html>
  );
}
