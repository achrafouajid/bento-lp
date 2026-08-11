import type { StackTaxContent } from "@/types/content";

export const stackTax: StackTaxContent = {
  eyebrow: "The stack tax",
  h2: "You're not paying for four tools. You're paying for the gaps between them.",
  cards: [
    {
      title: "Re-keying",
      body: "Every won deal gets typed again into billing, and again into support. Same customer, three truths.",
    },
    {
      title: "Blind spots",
      body: "Your AE doesn't know the account has five open tickets. Your CSM doesn't know the invoice is 40 days late.",
    },
    {
      title: "Seat math",
      body: "4 tools × 40 seats × 4 renewal negotiations a year.",
    },
  ],
  resolution:
    "Bento collapses all four into one schema. A deal, its invoice, its tickets, and its automations are the same object graph — not four systems syncing at 3 a.m.",
};
