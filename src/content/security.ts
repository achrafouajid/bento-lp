import type { SecurityChip } from "@/types/content";

export const securityH2 = "Who sees what is a setting, not a workaround.";

// SSO and self-host chips omitted until confirmed — see IMPLEMENTATION_PLAN.md §10 open item 5.
export const securityChips: SecurityChip[] = [
  { label: "Role-based access" },
  { label: "Team + group scoping" },
  { label: "Server-enforced permissions" },
  { label: "Audit-ready activity trail" },
];
