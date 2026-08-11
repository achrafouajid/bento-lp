import type { ComparisonContent } from "@/types/content";

export const comparison: ComparisonContent = {
  columns: ["Bento", "HubSpot + Zendesk + QuickBooks", "Pipedrive + Freshdesk + Xero"],
  rows: [
    { label: "Shared customer record", bento: true, stackA: false, stackB: false },
    { label: "Native ticketing", bento: true, stackA: false, stackB: false },
    { label: "Native invoicing", bento: true, stackA: false, stackB: false },
    { label: "Cross-object automation", bento: true, stackA: "Partial", stackB: "Partial" },
    { label: "Per-user dashboards", bento: true, stackA: true, stackB: "Partial" },
    { label: "Role / team / group permissions", bento: true, stackA: "Partial", stackB: "Partial" },
    { label: "Tools to buy", bento: "1", stackA: "3", stackB: "3", highlight: true },
    { label: "Integrations to maintain", bento: "0", stackA: "6+", stackB: "6+", highlight: true },
    { label: "Systems of record", bento: "1", stackA: "3", stackB: "3", highlight: true },
  ],
};
