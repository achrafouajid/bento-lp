import type { ModuleTab } from "@/types/content";

export const modules: ModuleTab[] = [
  {
    id: "pipeline",
    label: "Pipeline",
    headline: "Deals you can actually forecast",
    oneLiner: "Drag-stage pipeline with per-deal proposals, POs, and margin.",
    bullets: [
      "Stage-by-stage pipeline value, weighted and unweighted",
      "Proposal, PO, and margin visible on the deal card",
      "Full activity and ownership history in one timeline",
    ],
    mockup: "pipeline",
  },
  {
    id: "support",
    label: "Support",
    headline: "Tickets on the customer record",
    oneLiner: "SLA timers, assignment, and full history — attached to the account, not a separate inbox.",
    bullets: [
      "SLA countdown visible from the deal and the ticket",
      "Assignment and escalation without leaving the record",
      "Ticket history shared with sales, not siloed in a helpdesk",
    ],
    mockup: "support",
  },
  {
    id: "billing",
    label: "Billing",
    headline: "Proposal → PO → invoice",
    oneLiner: "Generate, send, and track payment without leaving the deal.",
    bullets: [
      "One click from won deal to proposal to invoice",
      "Payment status tracked against the original deal",
      "No export to a separate accounting tool required",
    ],
    mockup: "billing",
  },
  {
    id: "partners",
    label: "Partners",
    headline: "Channel and partner management",
    oneLiner: "Partner accounts, lead registration, and a Customer 360 card per relationship.",
    bullets: [
      "Partner-sourced leads tracked separately from direct",
      "Customer 360 card rolls up every touchpoint",
      "Registration and conflict rules built in",
    ],
    mockup: "partners",
  },
  {
    id: "automation",
    label: "Automation",
    headline: "Rules across every object",
    oneLiner: "Trigger on deals, tickets, invoices, tasks. Chain actions, no external tool.",
    bullets: [
      "Conditions can span multiple object types at once",
      "Actions chain: notify, assign, update, escalate",
      "No Zapier, no webhook maintenance",
    ],
    mockup: "automation",
  },
  {
    id: "analytics",
    label: "Analytics",
    headline: "One source, real numbers",
    oneLiner: "Revenue, pipeline velocity, and support load computed from the same data.",
    bullets: [
      "No sync lag between sales, support, and finance numbers",
      "Pipeline velocity and support load on one dashboard",
      "Every chart traces back to the underlying record",
    ],
    mockup: "analytics",
  },
];
