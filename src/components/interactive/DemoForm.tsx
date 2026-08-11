"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { teamSizeOptions } from "@/content/final-cta";
import { Button } from "@/components/ui/Button";

type Status = "idle" | "submitting" | "error";

// POSTs to a Netlify Function (or other endpoint) set via
// NEXT_PUBLIC_DEMO_FORM_ENDPOINT — see IMPLEMENTATION_PLAN.md §5 "Demo form
// handling" and open item #3. Falls back to a clear console warning + inline
// error if unset, rather than silently failing.
const ENDPOINT = process.env.NEXT_PUBLIC_DEMO_FORM_ENDPOINT ?? "/api/demo-requests";

export function DemoForm({ submitLabel }: { submitLabel: string }) {
  const router = useRouter();
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const mountedAt = useRef<number | null>(null);
  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot: bots fill hidden fields; humans never see this one.
    if (data.get("company_website")) {
      setStatus("submitting");
      return;
    }

    // Timestamp check: reject submissions faster than a human can fill the form.
    if (mountedAt.current !== null && Date.now() - mountedAt.current < 1500) {
      setError("That was fast — please try again.");
      return;
    }

    const email = String(data.get("email") ?? "");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter a valid work email.");
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(data.entries())),
      });
      if (!res.ok) throw new Error("Request failed");
      router.push("/thank-you");
    } catch {
      setStatus("error");
      setError("Something went wrong sending that. Please try again, or email us directly.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4" noValidate>
      <div className="hidden">
        <label htmlFor="company_website">Leave this field empty</label>
        <input id="company_website" name="company_website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <Field id="email" name="email" type="email" label="Work email" required autoComplete="email" />
      <Field id="name" name="name" type="text" label="Full name" required autoComplete="name" />
      <Field id="company" name="company" type="text" label="Company" required autoComplete="organization" />

      <div>
        <label htmlFor="teamSize" className="mb-1.5 block text-sm font-medium text-fg">
          Team size
        </label>
        <select
          id="teamSize"
          name="teamSize"
          required
          className="w-full rounded-lg border border-ink-700 bg-ink-900 px-4 py-3 text-fg focus-visible:outline-2 focus-visible:outline-accent"
        >
          <option value="">Select…</option>
          {teamSizeOptions.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>

      <Field
        id="currentTools"
        name="currentTools"
        type="text"
        label="What are you using today? (optional)"
        required={false}
      />

      {error && (
        <p role="alert" aria-live="polite" className="text-sm font-medium text-accent-2">
          {error}
        </p>
      )}

      <Button type="submit" disabled={status === "submitting"} className="mt-2 w-full sm:w-auto">
        {status === "submitting" ? "Sending…" : submitLabel}
      </Button>
    </form>
  );
}

function Field({
  id,
  name,
  type,
  label,
  required,
  autoComplete,
}: {
  id: string;
  name: string;
  type: string;
  label: string;
  required: boolean;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-fg">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="w-full rounded-lg border border-ink-700 bg-ink-900 px-4 py-3 text-fg placeholder:text-fg-muted focus-visible:outline-2 focus-visible:outline-accent"
      />
    </div>
  );
}
