import type { BenefitCard } from "@/types/content";

export const benefits: BenefitCard[] = [
  {
    title: "Close the loop from lead to cash",
    body: "A won deal generates its proposal, purchase order, and invoice from the same record. No export, no re-key.",
    span: "lg",
  },
  {
    title: "Support context inside the pipeline",
    body: "Open tickets, SLA state, and ticket history render on the deal view, so an AE never walks into a renewal blind.",
    span: "md",
  },
  {
    title: "Automations that fire on anything",
    body: "Rules watch deals, tickets, invoices, and tasks together. “Invoice 30 days overdue and an open P1 ticket → alert the account owner” is one rule, not a Zapier chain.",
    span: "md",
  },
  {
    title: "Dashboards each role builds themselves",
    body: "Every user picks their own KPI cards. Finance sees margin; sales sees pipeline; nobody files a request ticket for a report.",
    span: "sm",
  },
  {
    title: "Permissions that survive an audit",
    body: "Roles, teams, and groups gate every module. Finance data stays finance-only, enforced server-side — not hidden in the UI.",
    span: "sm",
  },
];
