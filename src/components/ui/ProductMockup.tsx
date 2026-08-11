import { cn } from "@/lib/cn";

type Variant = "dashboard" | "pipeline" | "support" | "billing" | "partners" | "automation" | "analytics";

/**
 * Abstract, illustrative stand-in for real product screenshots (none captured
 * yet — see IMPLEMENTATION_PLAN.md Phase 2/3 step 12/17). Deliberately uses
 * generic bars/rows rather than invented numbers, so nothing here reads as a
 * real metric. Swap for actual `<picture>` screenshots per §5/§7 before launch.
 */
export function ProductMockup({ variant, className }: { variant: Variant; className?: string }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-ink-700 bg-[#F5F5F7] shadow-[0_30px_80px_-20px_rgba(37,99,235,0.35)]",
        className
      )}
      aria-hidden="true"
    >
      <div className="flex items-center gap-1.5 border-b border-black/5 bg-white px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
      </div>
      <div className="flex min-h-[260px]">
        <div className="hidden w-14 shrink-0 flex-col gap-3 border-r border-black/5 bg-white p-3 sm:flex">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="h-6 w-6 rounded-md bg-black/[0.06]" />
          ))}
        </div>
        <div className="flex-1 p-4 sm:p-5">
          <MockupBody variant={variant} />
        </div>
      </div>
    </div>
  );
}

function MockupBody({ variant }: { variant: Variant }) {
  switch (variant) {
    case "pipeline":
      return (
        <div className="grid h-full grid-cols-3 gap-3">
          {["Qualified", "Proposal", "Won"].map((col) => (
            <div key={col} className="flex flex-col gap-2">
              <div className="h-2 w-16 rounded bg-black/10" />
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="rounded-lg border border-black/5 bg-white p-2.5 shadow-sm">
                  <div className="mb-2 h-2 w-4/5 rounded bg-black/10" />
                  <div className="h-2 w-1/2 rounded bg-accent/30" />
                </div>
              ))}
            </div>
          ))}
        </div>
      );
    case "support":
      return (
        <div className="flex flex-col gap-2.5">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3 rounded-lg border border-black/5 bg-white p-3">
              <span className={cn("h-2 w-2 shrink-0 rounded-full", i === 0 ? "bg-accent-2" : "bg-black/15")} />
              <div className="h-2 flex-1 rounded bg-black/10" />
              <div className="h-2 w-10 shrink-0 rounded bg-black/10" />
            </div>
          ))}
        </div>
      );
    case "billing":
      return (
        <div className="flex flex-col gap-3">
          <div className="flex gap-2">
            {["Proposal", "PO", "Invoice"].map((s, i) => (
              <div key={s} className={cn("h-1.5 flex-1 rounded-full", i === 0 ? "bg-accent" : "bg-black/10")} />
            ))}
          </div>
          <div className="rounded-lg border border-black/5 bg-white p-4">
            <div className="mb-3 h-2.5 w-1/3 rounded bg-black/10" />
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="mb-2 flex justify-between">
                <div className="h-2 w-1/2 rounded bg-black/[0.08]" />
                <div className="h-2 w-12 rounded bg-black/[0.08]" />
              </div>
            ))}
          </div>
        </div>
      );
    case "partners":
      return (
        <div className="grid grid-cols-2 gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-lg border border-black/5 bg-white p-3">
              <span className="mb-2 block h-6 w-6 rounded-full bg-accent/20" />
              <div className="mb-1.5 h-2 w-3/4 rounded bg-black/10" />
              <div className="h-2 w-1/2 rounded bg-black/[0.06]" />
            </div>
          ))}
        </div>
      );
    case "automation":
      return (
        <div className="flex h-full flex-col justify-center gap-3">
          {["Trigger", "Condition", "Action"].map((label, i) => (
            <div key={label} className="flex items-center gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-accent/15 text-[10px] font-semibold text-accent">
                {i + 1}
              </div>
              <div className="h-2 flex-1 rounded bg-black/10" />
            </div>
          ))}
        </div>
      );
    case "analytics":
      return (
        <div className="flex h-full items-end gap-2 px-2">
          {[40, 65, 50, 80, 60, 90, 70].map((h, i) => (
            <div
              key={i}
              className={cn("flex-1 rounded-t-md", i === 5 ? "bg-accent" : "bg-black/10")}
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      );
    default:
      return (
        <div className="grid h-full grid-cols-3 gap-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="rounded-lg border border-black/5 bg-white p-3">
              <div className="mb-2 h-2 w-1/2 rounded bg-black/10" />
              <div className="h-6 w-3/4 rounded bg-accent/20" />
            </div>
          ))}
          <div className="col-span-3 rounded-lg border border-black/5 bg-white p-3">
            <div className="flex h-24 items-end gap-2">
              {[30, 55, 40, 70, 50, 85, 60, 45].map((h, i) => (
                <div key={i} className="flex-1 rounded-t-md bg-accent/25" style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>
        </div>
      );
  }
}
