import { comparison } from "@/content/comparison";
import { Section } from "@/components/ui/Section";
import { CheckIcon, CrossIcon } from "@/components/icons";
import { cn } from "@/lib/cn";
import { Reveal } from "@/components/motion/Reveal";

function Cell({ value }: { value: string | boolean }) {
  if (value === true) return <CheckIcon className="mx-auto h-5 w-5 text-accent" />;
  if (value === false) return <CrossIcon className="mx-auto h-4 w-4 text-fg-muted" />;
  return <span className="text-sm font-medium text-fg">{value}</span>;
}

export function ComparisonTable() {
  return (
    <Section id="compare" ariaLabel="Comparison" band>
      <Reveal className="mx-auto max-w-2xl text-center">
        <h2 id="compare-heading" className="text-3xl font-bold tracking-tight sm:text-4xl">
          Depth, not just presence
        </h2>
        <p className="prose-measure mx-auto mt-3 text-fg-muted">
          Structural differences only — what&apos;s native to one record versus what you have to integrate and maintain
          yourself.
        </p>
      </Reveal>

      <Reveal index={1} className="mt-12 overflow-x-auto">
        <table className="w-full min-w-[640px] border-separate border-spacing-0 text-left">
          <thead>
            <tr>
              <th scope="col" className="border-b border-ink-700 py-4 pr-4 text-sm font-medium text-fg-muted">
                &nbsp;
              </th>
              {comparison.columns.map((col, i) => (
                <th
                  key={col}
                  scope="col"
                  className={cn(
                    "border-b py-4 px-4 text-center text-sm font-semibold",
                    i === 0 ? "border-accent text-accent" : "border-ink-700 text-fg-muted"
                  )}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {comparison.rows.map((row) => (
              <tr
                key={row.label}
                className={cn(
                  "transition-colors duration-200 hover:bg-ink-800",
                  row.highlight && "bg-ink-800/60"
                )}
              >
                <th scope="row" className="border-b border-ink-700 py-3.5 pr-4 text-sm font-medium text-fg">
                  {row.label}
                </th>
                <td className="border-b border-accent/30 py-3.5 px-4 text-center">
                  <Cell value={row.bento} />
                </td>
                <td className="border-b border-ink-700 py-3.5 px-4 text-center">
                  <Cell value={row.stackA} />
                </td>
                <td className="border-b border-ink-700 py-3.5 px-4 text-center">
                  <Cell value={row.stackB} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Reveal>
    </Section>
  );
}
