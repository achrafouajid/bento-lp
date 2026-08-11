import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

const base =
  "press relative overflow-hidden inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-[0.95rem] font-semibold min-h-11 transition-[background-color,color,box-shadow,translate,scale] duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

const variants = {
  primary:
    "btn-sheen bg-accent text-white hover:bg-blue-600 hover:shadow-[0_10px_30px_-10px_var(--color-accent)] hover:-translate-y-0.5",
  ghost: "text-fg hover:text-accent bg-transparent hover:bg-ink-800/70",
};

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: keyof typeof variants;
  href: string;
};

export function ButtonLink({ variant = "primary", className, children, ...props }: LinkProps) {
  return (
    <a className={cn(base, variants[variant], className)} {...props}>
      {children}
    </a>
  );
}

type BtnProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants;
};

export function Button({ variant = "primary", className, children, ...props }: BtnProps) {
  return (
    <button className={cn(base, variants[variant], className)} {...props}>
      {children}
    </button>
  );
}
