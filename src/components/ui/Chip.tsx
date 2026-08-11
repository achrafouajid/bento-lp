import { CheckIcon } from "@/components/icons";

export function Chip({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-ink-700 bg-ink-800 px-3.5 py-2 text-sm text-fg transition-colors duration-200 hover:border-accent/50 hover:bg-ink-700">
      <CheckIcon className="h-4 w-4 shrink-0 text-accent" />
      {label}
    </span>
  );
}
