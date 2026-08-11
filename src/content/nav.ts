import type { NavLink } from "@/types/content";

export const primaryNav: NavLink[] = [
  { label: "Product", href: "#modules" },
  { label: "Compare", href: "#compare" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export const footerProductLinks: NavLink[] = [
  { label: "Pipeline", href: "#modules" },
  { label: "Support", href: "#modules" },
  { label: "Billing", href: "#modules" },
  { label: "Automation", href: "#modules" },
  { label: "Pricing", href: "#pricing" },
];

export const footerCompareLinks: NavLink[] = [
  { label: "Bento vs. HubSpot + Zendesk + QuickBooks", href: "/alternatives/hubspot" },
  { label: "CRM with ticketing", href: "/crm-with-ticketing" },
  { label: "CRM with invoicing", href: "/crm-with-invoicing" },
];

export const footerLegalLinks: NavLink[] = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

export const demoHref = "#demo";
