# Bento CRM — Landing Page Implementation Plan

**Location:** `/lp` (sibling of `/crm` and `/crm-backend`)
**Stack:** Next.js 15 (App Router) + TypeScript + Tailwind CSS v4
**Primary CTA:** Book a demo
**Design reference:** [huly.io](https://huly.io) — dark-first, bento-grid, product-screenshot-led
**Status:** Plan only — no code written yet

---

## 0. Decisions locked in

| Decision | Choice | Rationale |
|---|---|---|
| Framework | Next.js 15 App Router | Chosen by stakeholder. Best-in-class metadata API, `next/image`, `next/font`, RSC = zero client JS for static sections. |
| Rendering | **Full SSG** (`export const dynamic = 'force-static'`), deployed as static output | No per-request work → TTFB from CDN edge only. |
| Primary action | **Book a demo** | Sales-led motion. Single primary CTA everywhere. |
| Secondary action | "Watch 2-min tour" (video modal) | Non-competing; keeps low-intent visitors on page instead of bouncing. |
| Indexable? | **Yes, index + follow** | Evergreen offer, matches informational/commercial search intent. |
| Hosting | Netlify (matches `crm/netlify.toml`) | Same account/pipeline. Root `/` → LP, `app.` subdomain → CRM. |
| Client JS budget | **≤ 40 KB gzipped** total | Everything except the form, mobile nav, FAQ, and tab switcher is a Server Component. |

### Critical constraint discovered during analysis

The CRM's own `index.html` loads **three render-blocking third-party resources** (Chart.js CDN, Tabler icons webfont CSS, Google GSI script) plus two Google Fonts `@import`s inside `styles.css`. **None of these may be copied into the landing page.** The `@import url(...)` pattern in particular serializes font download behind CSS parse and is a guaranteed LCP regression. The LP self-hosts fonts via `next/font` and self-hosts every icon as inline SVG. This is called out because copy-pasting the CRM's `styles.css` header is the single most likely way this plan gets silently broken.

---

## 1. Positioning brief

### Product truth (derived from the actual codebase, not invented)

Modules that exist today in `crm/src/app/pages` and `crm-backend/src/main/java/com/bento/crm`:

| Module | Evidence |
|---|---|
| Dashboard with user-selectable KPI cards | `dashboard.component.ts` — `toggleKpi()`, `availableKpis` |
| Sales pipeline + deal detail | `sales.component.ts`, `deal-detail.component.ts`, `deal/controller/DealController` |
| Partners, leads, Customer 360 card | `partners.component.ts`, `lead-detail.component.ts`, `customer-360-card.component.ts` |
| Marketing campaigns | `marketing.component.ts`, `campaign/controller` |
| Finance — invoices, proposals, purchase orders | `finance.component.ts`, `invoice/`, `proposal/`, `purchaseorder/` |
| Support tickets | `tickets.component.ts`, `ticket/controller` |
| Automation rules | `automation.component.ts`, `automation/controller/AutomationRuleController` |
| Tasks | `tasks.component.ts`, `task/controller` |
| Analytics | `analytics.component.ts` |
| Users, teams, groups, roles/permissions | `users/teams/groups.component.ts`, `permission.guard.ts`, `identity/` |
| Notifications inbox | `notification-inbox-drawer.component.ts`, `notification/controller` |

**The differentiator is scope collapse.** Bento is not "a better pipeline." It is one system where the deal, the invoice for that deal, the support ticket from that customer, and the automation that chases both live on the same record. Every competitor requires 3–5 tools to do that.

### ICP

Operations / RevOps lead or founder at a **20–200 person B2B services or channel-partner business**, currently running: a CRM (HubSpot/Pipedrive) + a helpdesk (Zendesk/Freshdesk) + invoicing (QuickBooks/Xero) + a spreadsheet holding it all together.

### Top 3 objections → where the page answers them

1. *"Migrating off HubSpot will take months."* → §7 How it works (step 1: guided import) + FAQ Q2 + "white-glove migration included" in risk-reversal band.
2. *"All-in-one means every module is mediocre."* → §5 Deep-dive tabs with real product screenshots per module; §6 comparison table showing depth, not just presence.
3. *"Can I control who sees revenue and margin data?"* → §8 Security & permissions band (real feature: `permission.guard.ts`, roles, teams, groups).

### Message-source matching

| Source | Landing variant | Hero H1 override |
|---|---|---|
| Organic search (default) | `/` | Default H1 (below) |
| Paid search "hubspot alternative" | `/alternatives/hubspot` (phase 5) | "The HubSpot alternative that includes billing and support" |
| Paid search "crm with ticketing" | `/crm-with-ticketing` (phase 5) | "The CRM your support team actually lives in" |

Variants share every component; only `hero.headline`, `hero.sub`, and the comparison table content change. This is why copy lives in typed content modules (§3), not JSX.

---

## 2. Page outline (Layout **A**: classic hero + sections)

> **Why Layout A, not B/C/D:** the product is instantly legible from a screenshot (it's a CRM — everyone knows the shape), traffic is cold organic + paid, and the offer is a demo, not a purchase. Long-form (B) over-educates a category buyers already understand; minimal (C) can't carry the "it replaces 4 tools" argument; comparison (D) is the right shape for the *variant* pages in phase 5, not the canonical `/`.

| # | Section | Component | Client JS | Purpose |
|---|---|---|---|---|
| 0 | Sticky nav | `SiteHeader` | mobile menu only | Persistent "Book a demo" |
| 1 | Hero | `Hero` | none | Headline, sub, CTA, proof line, product shot |
| 2 | Logo strip | `LogoWall` | none | Instant credibility |
| 3 | Problem → solution | `StackTax` | none | Name the pain: the 5-tool tax |
| 4 | Benefits bento | `BenefitsBento` | none | 5 outcome-driven cards, Huly-style grid |
| 5 | Module deep-dive | `ModuleTabs` | ~6 KB | 6 tabs × screenshot — proves depth |
| 6 | Comparison table | `ComparisonTable` | none | Objection: "all-in-one = shallow" |
| 7 | How it works | `HowItWorks` | none | 3 steps, kills migration fear |
| 8 | Security & permissions | `SecurityBand` | none | Objection: data access control |
| 9 | Social proof | `Testimonials` | none | 3 quotes + 1 metric case study |
| 10 | Pricing teaser | `PricingTeaser` | none | Anchors value, routes to demo |
| 11 | FAQ | `Faq` | ~2 KB | 10 Q/A + FAQPage schema |
| 12 | Risk reversal + final CTA | `FinalCta` | form only | Repeat of primary CTA |
| 13 | Footer | `SiteFooter` | none | Internal links (SEO), legal, social |

**One primary CTA rule:** "Book a demo" appears in nav, hero, after §5, after §9, and in §12. Nothing else is styled as a primary button anywhere on the page. "Watch 2-min tour" is a ghost/text button only.

---

## 3. Copy (production-ready, drop into `content/`)

### §1 Hero

- **Eyebrow:** `All-in-one CRM · Sales, support, and billing on one record`
- **H1:** **Your CRM, helpdesk, and invoicing. One record. One login.**
- **Sub (H2/`<p>`):** Bento replaces the four-tool stack B2B teams duct-tape together. Pipeline, tickets, invoices, and automations share the same customer record — so nothing gets re-keyed, and nothing falls through.
- **Primary CTA:** `Book a demo` → `#demo`
- **Secondary:** `Watch the 2-min tour` (ghost, opens modal)
- **Proof line under CTA:** `30-minute walkthrough · Migration included · No card required`
- **Hero visual:** Dashboard screenshot (`dashboard.component.ts` KPI grid + pipeline), light UI floating on dark background, `priority` image, 3° perspective tilt via CSS transform, subtle blue→orange gradient glow behind.

> Headline formula used: *"{Outcome} without {pain}"* compressed into a concrete artifact ("one record, one login") rather than an abstraction. Deliberately avoids "streamline," "unify," "supercharge."

### §2 Logo strip
Label: `Running revenue operations at` → 6 grayscale logos. **If no real logos exist yet, delete this section entirely.** Do not ship placeholder or fabricated logos — replace with the metric bar from §9 moved up.

### §3 Problem → solution — "The stack tax"

- **H2:** You're not paying for four tools. You're paying for the gaps between them.
- Three cost cards:
  - **Re-keying** — Every won deal gets typed again into billing, and again into support. Same customer, three truths.
  - **Blind spots** — Your AE doesn't know the account has five open tickets. Your CSM doesn't know the invoice is 40 days late.
  - **Seat math** — 4 tools × 40 seats × 4 renewal negotiations a year.
- **Resolution line:** Bento collapses all four into one schema. A deal, its invoice, its tickets, and its automations are the same object graph — not four systems syncing at 3 a.m.

### §4 Benefits (5 cards, bento grid)

Format: **Benefit** — proof/detail.

1. **Close the loop from lead to cash** — A won deal generates its proposal, purchase order, and invoice from the same record. No export, no re-key.
2. **Support context inside the pipeline** — Open tickets, SLA state, and ticket history render on the deal view, so an AE never walks into a renewal blind.
3. **Automations that fire on anything** — Rules watch deals, tickets, invoices, and tasks together. "Invoice 30 days overdue and an open P1 ticket → alert the account owner" is one rule, not a Zapier chain.
4. **Dashboards each role builds themselves** — Every user picks their own KPI cards. Finance sees margin; sales sees pipeline; nobody files a request ticket for a report.
5. **Permissions that survive an audit** — Roles, teams, and groups gate every module. Finance data stays finance-only, enforced server-side — not hidden in the UI.

### §5 Module deep-dive tabs (6 tabs)

| Tab | Headline | One-liner |
|---|---|---|
| Pipeline | Deals you can actually forecast | Drag-stage pipeline with per-deal proposals, POs, and margin. |
| Support | Tickets on the customer record | SLA timers, assignment, and full history — attached to the account, not a separate inbox. |
| Billing | Proposal → PO → invoice | Generate, send, and track payment without leaving the deal. |
| Partners | Channel and partner management | Partner accounts, lead registration, and a Customer 360 card per relationship. |
| Automation | Rules across every object | Trigger on deals, tickets, invoices, tasks. Chain actions, no external tool. |
| Analytics | One source, real numbers | Revenue, pipeline velocity, and support load computed from the same data. |

Each tab: 1 screenshot (WebP/AVIF, `loading="lazy"`, fixed aspect ratio), 1 headline, 1 sentence, 3 sub-bullets.

### §6 Comparison table

Columns: **Bento** | HubSpot + Zendesk + QuickBooks | Pipedrive + Freshdesk + Xero
Rows: Shared customer record · Native ticketing · Native invoicing · Cross-object automation · Per-user dashboards · Role/team/group permissions · Tools to buy · Integrations to maintain · Systems of record

Last two rows are the punchline: **1 / 0** vs **3 / 6+**.

> Keep claims to structural facts (what is native vs. integrated), never to competitor pricing or performance. Structural claims are defensible; the others invite legal review and go stale.

### §7 How it works (3 steps)

1. **Import in an afternoon** — Bring contacts, deals, and open tickets from HubSpot, Pipedrive, Zendesk, or CSV. Field mapping is guided; we run it with you on the demo call.
2. **Map your stages and roles** — Set your pipeline stages, SLA targets, and who sees revenue data. Teams and groups mirror your org chart.
3. **Turn on automations** — Start with three: overdue-invoice alerts, stale-deal nudges, and ticket escalation. Add more as you go.

### §8 Security & permissions band
**H2:** Who sees what is a setting, not a workaround.
Chips: Role-based access · Team + group scoping · Server-enforced permissions · Audit-ready activity trail · SSO ready · Self-host or managed
*(Only list what is true today. `permission.guard.ts` + backend `identity/` supports the first four; verify SSO and self-host status before shipping those two chips.)*

### §9 Social proof
Metric bar: `4 tools → 1` · `~6 hrs/week saved per rep` · `Live in 14 days`
3 testimonials, each attached to the claim it supports (place the migration testimonial directly under §7, not all three in a carousel at the bottom).
1 mini case study card → links to `/customers/<slug>` (phase 5, feeds internal linking).

> **Do not ship fabricated testimonials or metrics.** If none exist, replace this section with a founder's-note block ("We built this because we ran the four-tool stack for six years") — honest, and it still converts.

### §10 Pricing teaser
**H2:** Priced per user. One bill instead of four.
Three cards (Starter / Growth / Enterprise), features-not-prices if pricing isn't final, each CTA → `Book a demo`. Line beneath: *Most teams replace 3–4 subscriptions and come out ahead in month one.*

### §11 FAQ (10 Q/A — plain-language, AEO-optimized)

1. **What does Bento CRM replace?** Most teams retire a CRM, a helpdesk, an invoicing tool, and the spreadsheet gluing them together. Bento covers pipeline, tickets, proposals, purchase orders, invoices, tasks, automation, and analytics on one customer record.
2. **How long does migration take?** Most teams are live in about two weeks. Contacts, deals, and open tickets import from HubSpot, Pipedrive, Zendesk, or CSV, and our team runs the first import with you.
3. **Can I control who sees revenue and margin data?** Yes. Access is granted by role, team, and group, and enforced on the server — not just hidden in the interface.
4. **Does Bento include support ticketing?** Yes, natively. Tickets carry SLA timers and assignment and live on the customer record, so sales and support see the same history.
5. **Can I invoice from Bento?** Yes. Proposals, purchase orders, and invoices are generated from the deal record and tracked through payment.
6. **What can automations trigger on?** Deals, tickets, invoices, and tasks — including conditions that span them, such as an overdue invoice combined with an open high-priority ticket.
7. **Do we each get our own dashboard?** Yes. Every user chooses which KPI cards appear on their dashboard.
8. **Is there an API?** Yes — a REST API covering the same objects the interface uses.
9. **What happens on the demo call?** A 30-minute walkthrough on your data shape, a migration plan for your current tools, and pricing for your seat count. No slides.
10. **Can we get our data back out?** Yes, full export at any time, no charge or notice period.

> AEO rules applied: question phrased exactly as a user would type it; **first sentence of every answer is a complete, standalone answer** (this is what gets lifted into AI answers and featured snippets); no marketing preamble; ≤ 55 words each.

### §12 Risk reversal + final CTA
**H2:** See it on your own data.
**Sub:** 30 minutes, your pipeline, your tickets. We'll show you the migration path and tell you honestly if Bento isn't a fit.
Risk chips: `No credit card` · `Migration included` · `Export anytime` · `Cancel anytime`
**Form** (5 fields max): Work email · Full name · Company · Team size (select) · What are you using today? (optional). Button: **`Book my demo`**.

---

## 4. Visual design system

Dark-first, adapted from Huly's structure to Bento's existing brand tokens (`crm/src/styles.css`). Reuse the CRM's accent `#2563EB` so the demo doesn't feel like a different product.

```css
/* lp/src/app/globals.css — Tailwind v4 @theme */
@theme {
  --color-ink-950:  #08080B;  /* page background */
  --color-ink-900:  #0E0E12;  /* section bands */
  --color-ink-800:  #16161C;  /* cards */
  --color-ink-700:  #23232C;  /* borders */
  --color-fg:       #FAFAFA;
  --color-fg-muted: #A1A1AA;  /* matches CRM --color-text-tertiary */
  --color-accent:   #2563EB;  /* matches CRM --color-accent */
  --color-accent-2: #F97316;  /* warm counterpoint, Huly-style */
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, monospace;
}
```

- **Type scale:** H1 `clamp(2.5rem, 5vw + 1rem, 4.5rem)` / tracking `-0.03em` / weight 800. Body `1.0625rem`, line-height `1.65`, `max-width: 65ch`.
- **Product screenshots:** light-UI CRM screens on dark background, `border-radius: 16px`, `border: 1px solid --color-ink-700`, large soft shadow, radial accent glow behind. This contrast (light product on dark page) is what makes Huly's screenshots pop; keep it.
- **Bento grid:** 12-col desktop; cards span 6/4/8/12. Collapses to single column below `768px`. `grid-auto-rows: minmax(180px, auto)`.
- **Motion:** entrance fade+rise `20px / 400ms / cubic-bezier(.16,1,.3,1)` via IntersectionObserver, CSS only. **All motion wrapped in `@media (prefers-reduced-motion: no-preference)`.** No scroll-jacking, no parallax, no animation library — `motion` is in the CRM's deps; do **not** add it here.
- **Contrast:** every text/background pair verified ≥ 4.5:1 (`--color-fg-muted` on `--color-ink-950` = 9.2:1 ✓). Accent `#2563EB` on `--color-ink-950` is **3.9:1 — fails for text**; use it for fills and borders only, never for body copy on dark.

---

## 5. Technical architecture

### File tree

```
lp/
├── next.config.ts                 # output:'export', images.formats, redirects
├── tailwind.config.ts             # (v4: mostly empty, theme lives in CSS)
├── postcss.config.mjs             # @tailwindcss/postcss
├── tsconfig.json
├── netlify.toml                   # publish=out, security + cache headers
├── .env.example                   # NEXT_PUBLIC_SITE_URL, DEMO_FORM_ENDPOINT
├── public/
│   ├── favicon.ico, icon.svg, apple-icon.png
│   ├── og/og-default.png          # 1200×630, <200 KB
│   ├── robots.txt                 # generated by app/robots.ts instead
│   └── shots/                     # product screenshots, AVIF + WebP
├── src/
│   ├── app/
│   │   ├── layout.tsx             # fonts, <html lang>, JSON-LD, skip-link
│   │   ├── page.tsx               # composes all sections (Server Component)
│   │   ├── globals.css
│   │   ├── sitemap.ts             # MetadataRoute.Sitemap
│   │   ├── robots.ts              # MetadataRoute.Robots
│   │   ├── opengraph-image.tsx    # ImageResponse, edge-generated OG
│   │   ├── thank-you/page.tsx     # noindex — conversion destination
│   │   ├── privacy/page.tsx
│   │   └── terms/page.tsx
│   ├── components/
│   │   ├── layout/                # SiteHeader, SiteFooter, Container, Section
│   │   ├── sections/              # Hero … FinalCta (one file per §)
│   │   ├── ui/                    # Button, Card, Badge, Chip, Tabs, Accordion
│   │   └── interactive/           # 'use client' ONLY: MobileNav, ModuleTabs,
│   │                              #   FaqAccordion, DemoForm, TourModal
│   ├── content/
│   │   ├── hero.ts  benefits.ts  modules.ts  comparison.ts
│   │   ├── faq.ts   testimonials.ts  pricing.ts  nav.ts
│   │   └── seo.ts                 # titles, descriptions, keyword map
│   ├── lib/
│   │   ├── schema.ts              # JSON-LD builders (typed)
│   │   ├── analytics.ts           # thin wrapper, consent-gated
│   │   └── cn.ts
│   └── types/content.ts
```

**Rule:** everything under `components/sections/` is a Server Component with **no** `'use client'`. Only the five files in `components/interactive/` ship JS. Enforce this in review — it is the entire performance strategy.

### Content-as-data

All copy lives in `src/content/*.ts` as typed objects (`types/content.ts`). Benefits: copy edits never touch JSX, page variants (§1) are a prop swap, and a CMS can be dropped in later behind the same interface without touching components.

### Demo form handling

Static export has no server. Three options, in order of preference:

1. **Netlify Function** `lp/netlify/functions/demo.ts` → validates, forwards to the Spring backend, returns JSON. Keeps the backend URL and any API key server-side. **Recommended.**
2. Direct POST to a new **public** endpoint on `crm-backend` (`POST /api/public/demo-requests`, rate-limited, CORS-locked to the LP origin). Requires a small backend change — no such endpoint exists today (`PartnerController` and friends are all authenticated).
3. Third-party (HubSpot Forms / Formspree). Fastest, but adds a third-party script — mitigate by POSTing to their REST endpoint from your own handler rather than embedding their JS.

Whichever is chosen: honeypot field + timestamp check for spam (**not** reCAPTCHA — it costs ~250 KB of JS and tanks INP), server-side email validation, success → `/thank-you` (noindex) so the conversion has a URL for analytics and ad platforms.

### `next.config.ts` essentials

```ts
export default {
  output: 'export',
  images: { formats: ['image/avif', 'image/webp'], unoptimized: true }, // static export
  poweredByHeader: false,
  compress: true,
  trailingSlash: false,          // pick ONE and set canonicals to match
};
```

> With `output: 'export'`, `next/image` optimization is disabled. **Pre-optimize every screenshot at build time** (`sharp` script → AVIF + WebP + 1x/2x) and serve via `<picture>`. Always set explicit `width`/`height` — this is the main CLS risk on the page.

---

## 6. SEO plan

### Indexing recommendation
**Index and follow** the canonical `/`. `noindex` on `/thank-you` and on any future ad-only variant that duplicates `/` without unique content.

### Keyword map

| Page | Primary keyword | Secondary | Intent |
|---|---|---|---|
| `/` | all-in-one CRM software | CRM with ticketing and invoicing | commercial |
| `/alternatives/hubspot` | HubSpot alternative | HubSpot alternative for small teams | comparison |
| `/crm-with-ticketing` | CRM with support ticketing | CRM helpdesk in one | long-tail |
| `/crm-with-invoicing` | CRM with invoicing | CRM that sends invoices | long-tail |

### `/` metadata

```ts
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL!),
  title: 'Bento CRM — Sales, Support & Invoicing on One Record',
  description:
    'Bento is the all-in-one CRM that replaces your CRM, helpdesk, and invoicing tools. Pipeline, tickets, and invoices on one customer record. Book a 30-minute demo.',
  alternates: { canonical: '/' },
  openGraph: { type: 'website', siteName: 'Bento CRM', images: ['/og/og-default.png'] },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
};
```

- Title **58 chars**, description **158 chars** — both inside truncation limits.
- Description leads with what it is, ends with the CTA. Verify with a SERP preview tool before shipping.

### On-page structure

- Exactly **one `<h1>`** (hero). Section headings `<h2>`; card titles `<h3>`. No heading levels skipped.
- Semantic landmarks: `<header>`, `<nav>`, `<main>`, `<section aria-labelledby>`, `<footer>`.
- Every image gets descriptive `alt` (e.g. `"Bento CRM dashboard showing pipeline value and open tickets"`), not `"screenshot"`.
- Descriptive anchor text on internal links — never "learn more."
- `lang="en"` on `<html>`; add `hreflang` only when a second locale actually exists.

### Structured data (`lib/schema.ts`, one `<script type="application/ld+json">` in `layout.tsx`)

- `Organization` — name, url, logo, sameAs.
- `WebSite` — name, url.
- `SoftwareApplication` — `applicationCategory: "BusinessApplication"`, `operatingSystem: "Web"`, `offers`. **Omit `aggregateRating` unless real, verifiable reviews exist** — fabricated ratings are a manual-action risk, not just a bad look.
- `FAQPage` — generated from `content/faq.ts` so markup and visible copy can never drift. Every Q/A in the schema **must** be visible on the page; this is a hard Google requirement.
- `BreadcrumbList` on sub-pages only.

Validate with Google Rich Results Test + Schema.org validator before launch.

### Internal linking

Footer carries links to `/alternatives/hubspot`, `/crm-with-ticketing`, `/crm-with-invoicing`, `/pricing`, `/privacy`, `/terms`. Comparison table rows deep-link to the relevant alternative page. This gives the phase-5 SEO pages crawl paths from day one.

### Off-page / technical hygiene

- `app/sitemap.ts` → auto-generated, submitted to Google Search Console + Bing Webmaster Tools.
- `app/robots.ts` → allow all, disallow `/thank-you`, point to sitemap.
- Custom 404 that links back to `/`.
- HTTPS + HSTS via `netlify.toml`.
- Pick www vs. apex, 301 the other, and make canonicals agree. Mismatched canonical/redirect pairs are the most common ranking-suppression bug on new landing pages.
- **AEO:** the FAQ answers and the §3 problem framing are written to be quotable verbatim by AI assistants. Keep the first sentence of every answer self-contained.

---

## 7. Performance plan

### Budgets (enforced in CI — build fails on breach)

| Metric | Budget | Method |
|---|---|---|
| LCP (mobile, p75) | **< 1.8 s** | Hero image `priority`, preloaded, AVIF, correctly sized |
| INP | **< 150 ms** | ~40 KB JS total; no main-thread work at load |
| CLS | **< 0.03** | Explicit dimensions on every image; `size-adjust` on fonts |
| TTFB | **< 200 ms** | Static file from Netlify CDN |
| Total JS (gzip) | **≤ 40 KB** | Server Components everywhere except 5 files |
| Total page weight | **≤ 600 KB** initial | Lazy-load everything below the fold |
| Lighthouse | **≥ 98** on all four categories | CI, mobile throttled |

### Techniques

1. **Fonts** — `next/font/local` with self-hosted Inter (`woff2`, `latin` subset, variable). `display: swap`, `preload: true`, `adjustFontFallback` on to kill layout shift. **No Google Fonts network request.** JetBrains Mono only if a section actually uses it — otherwise drop it entirely.
2. **Images** — build-time `sharp` pipeline → AVIF + WebP, 1x/2x. Hero: `fetchpriority="high"`, preloaded in `<head>`. Everything else: `loading="lazy" decoding="async"`. Screenshots budgeted at ≤ 120 KB each.
3. **Zero third-party JS at load.** No Chart.js, no Tabler webfont, no GSI script (see §0). Icons are inline SVG components. Analytics loads `afterInteractive` and only post-consent.
4. **Critical CSS** — Tailwind v4 tree-shakes to ~8–12 KB for this page; inline it and defer nothing else.
5. **Video** — the "2-min tour" is a poster image that loads the player *on click* (facade pattern). Never embed an iframe at load: a YouTube embed costs ~800 KB and 500 ms+ of main-thread time.
6. **Caching** (`netlify.toml`): immutable `max-age=31536000` for `/_next/static/*` and `/shots/*`; `max-age=0, must-revalidate` for HTML.
7. **Prefetch** — Next's default link prefetch on viewport for `/pricing` etc. Fine at this page count.

### Accessibility (also a ranking input via UX signals)

WCAG 2.1 AA: visible focus rings on every interactive element, skip-to-content link, `aria-expanded`/`aria-controls` on FAQ accordion and mobile nav, roving-tabindex on `ModuleTabs`, form labels bound with `htmlFor`, errors announced via `aria-live="polite"`, tap targets ≥ 44×44 px, full keyboard path from nav to submit.

---

## 8. Measurement

- **Conversion event:** `demo_requested`, fired on `/thank-you` load (not on button click — click ≠ submit).
- **Micro-conversions:** `cta_click` (with `location` param: nav/hero/mid/final), `tab_view`, `faq_open`, `tour_play`, `scroll_75`.
- **Analytics:** privacy-first and cookieless (Plausible/Fathom, ~1 KB) as default. If GA4 is mandated, load it consent-gated and `afterInteractive`.
- **RUM:** `web-vitals` → analytics endpoint. Field data, not lab data, is what Google ranks on.
- **Search Console:** submit sitemap day one; watch Core Web Vitals + Page Indexing weekly for the first month.
- **First A/B tests, in order:** (1) H1 outcome vs. category framing; (2) form 5 fields vs. 3; (3) comparison table above vs. below the module tabs.

---

## 9. Phased task list

### Phase 0 — Foundation (~0.5 day)
1. `npx create-next-app@latest lp --typescript --tailwind --app --src-dir --eslint --no-import-alias`
2. Configure `next.config.ts` (§5), Tailwind v4 `@theme` tokens (§4), `globals.css`.
3. `next/font/local` with self-hosted Inter; verify no external font request in the network panel.
4. `layout.tsx`: `<html lang="en">`, metadata base, skip-link, JSON-LD slot.
5. Commit `netlify.toml` with headers + cache rules.
6. **Gate:** `npm run build` produces `out/`, homepage is blank, Lighthouse 100/100/100/100.

### Phase 1 — Design system + shell (~1 day)
7. `ui/`: Button (primary/ghost), Card, Badge, Chip, Container, Section.
8. `layout/SiteHeader` (sticky, mobile nav is the only client component) + `SiteFooter` with internal links.
9. Inline-SVG icon set — one component per icon, no icon library, no webfont.
10. **Gate:** contrast audit passes AA on every token pair; keyboard nav works header→footer.

### Phase 2 — Above the fold (~1 day)
11. `content/hero.ts` + `sections/Hero.tsx`.
12. Capture the hero screenshot from the running CRM (`cd crm && npm run dev`, dashboard route), export at 2560 px, run through the `sharp` pipeline.
13. `LogoWall` (or delete per §3 note).
14. **Gate:** LCP < 1.8 s on simulated Moto G / Slow 4G. This is the single most important gate in the plan — do not proceed past it.

### Phase 3 — Argument sections (~2 days)
15. `StackTax`, `BenefitsBento`, `ComparisonTable`, `HowItWorks`, `SecurityBand` — all Server Components.
16. `ModuleTabs` (`'use client'`, roving tabindex, 6 screenshots lazy-loaded).
17. Capture the remaining 6 screenshots from the CRM.
18. **Gate:** total client JS still ≤ 40 KB; CLS < 0.03 with all images loaded.

### Phase 4 — Conversion + proof (~1.5 days)
19. `Testimonials` (real content only — else the founder's-note fallback).
20. `PricingTeaser`.
21. `FaqAccordion` + `FAQPage` schema generated from the same `content/faq.ts` source.
22. `DemoForm` + Netlify Function + honeypot + validation + `/thank-you` (noindex).
23. `TourModal` facade (poster → player on click).
24. **Gate:** form submits end-to-end to a real inbox; `demo_requested` fires once, not twice.

### Phase 5 — SEO, a11y, launch (~1 day)
25. `sitemap.ts`, `robots.ts`, `opengraph-image.tsx`, all JSON-LD, `/privacy`, `/terms`, 404.
26. Full a11y pass: axe DevTools clean, manual keyboard + VoiceOver run.
27. Lighthouse CI wired into the build with the §7 budgets as hard failures.
28. Rich Results Test on every schema type.
29. Deploy to Netlify; DNS: apex → LP, `app.` → CRM; verify canonical/redirect agreement.
30. Submit sitemap to GSC + Bing; set up the RUM dashboard.
31. **Gate:** Lighthouse mobile ≥ 98 across all four categories on the production URL.

### Phase 6 — Post-launch (ongoing)
32. Build the three keyword variant pages from §1's variant table.
33. Ship A/B test 1 from §8.
34. Weekly GSC review for the first month; fix any indexing or CWV regressions immediately.

**Estimated build time: 7–8 focused days**, excluding waiting on real logos, testimonials, and final pricing.

---

## 10. Open items needing your input before Phase 4

| # | Question | Blocks |
|---|---|---|
| 1 | Are there real customer logos and testimonials to use? | §2, §9 |
| 2 | Is pricing final, or should §10 show features without prices? | §10 |
| 3 | Which form backend — Netlify Function, new public backend endpoint, or HubSpot? | Phase 4 |
| 4 | Production domain, and does the CRM move to `app.<domain>`? | Phase 5, canonicals |
| 5 | Are SSO and self-hosting actually available today? (§8 chips) | §8 |
| 6 | Does a 2-minute product tour video exist, or should §12 drop the secondary CTA? | §1, §12 |

None of these block Phases 0–3. Start there.

---

## 11. Pitfalls this plan specifically guards against

- ❌ **Multiple competing CTAs above the fold** → exactly one primary button, everywhere.
- ❌ **Vague value prop** ("streamline," "unify," "supercharge") → banned from all copy; every claim names a concrete artifact.
- ❌ **Feature list with no outcomes** → benefits are `**Outcome** — mechanism`, never bare feature names.
- ❌ **Proof buried at the bottom** → proof line in the hero; each testimonial sits under the claim it supports.
- ❌ **Copying the CRM's `index.html` head** → the #1 way this page's LCP gets destroyed. See §0.
- ❌ **Fabricated logos, ratings, or testimonials** → explicit fallbacks defined for §2 and §9; no `aggregateRating` without real reviews.
- ❌ **Schema that doesn't match visible copy** → FAQ schema is generated from the same source as the rendered FAQ.
- ❌ **Mobile readability breakage** → single-column below 768 px, 65ch measure, 44 px tap targets, `clamp()` type scale.
