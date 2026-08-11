import type { FaqItem } from "@/types/content";

export const faq: FaqItem[] = [
  {
    question: "What does Bento CRM replace?",
    answer:
      "Most teams retire a CRM, a helpdesk, an invoicing tool, and the spreadsheet gluing them together. Bento covers pipeline, tickets, proposals, purchase orders, invoices, tasks, automation, and analytics on one customer record.",
  },
  {
    question: "How long does migration take?",
    answer:
      "Most teams are live in about two weeks. Contacts, deals, and open tickets import from HubSpot, Pipedrive, Zendesk, or CSV, and our team runs the first import with you.",
  },
  {
    question: "Can I control who sees revenue and margin data?",
    answer:
      "Yes. Access is granted by role, team, and group, and enforced on the server — not just hidden in the interface.",
  },
  {
    question: "Does Bento include support ticketing?",
    answer:
      "Yes, natively. Tickets carry SLA timers and assignment and live on the customer record, so sales and support see the same history.",
  },
  {
    question: "Can I invoice from Bento?",
    answer:
      "Yes. Proposals, purchase orders, and invoices are generated from the deal record and tracked through payment.",
  },
  {
    question: "What can automations trigger on?",
    answer:
      "Deals, tickets, invoices, and tasks — including conditions that span them, such as an overdue invoice combined with an open high-priority ticket.",
  },
  {
    question: "Do we each get our own dashboard?",
    answer: "Yes. Every user chooses which KPI cards appear on their dashboard.",
  },
  {
    question: "Is there an API?",
    answer: "Yes — a REST API covering the same objects the interface uses.",
  },
  {
    question: "What happens on the demo call?",
    answer:
      "A 30-minute walkthrough on your data shape, a migration plan for your current tools, and pricing for your seat count. No slides.",
  },
  {
    question: "Can we get our data back out?",
    answer: "Yes, full export at any time, no charge or notice period.",
  },
];
