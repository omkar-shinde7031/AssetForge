import { createFileRoute, Navigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";

import { authClient, authEnabled, signIn } from "@/lib/auth/client";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { Button } from "@/components/ui/button";
import { Field, Input } from "@/components/ui/input";
import { ForgeMark } from "@/components/forge-mark";
import { cn } from "@/lib/utils";
import type { Role } from "@/lib/inventory/types";

export const Route = createFileRoute("/login")({
  validateSearch: (s: Record<string, unknown>): { role?: Role } => {
    if (s.role === "employee" || s.role === "staff") return { role: s.role };
    return {};
  },
  component: Login,
});

function Login() {
  const { user, isPending } = useCurrentUserState();
  const search = Route.useSearch();
  const [role, setRole] = useState<Role>(search.role ?? "staff");
  const [mode, setMode] = useState<"in" | "up">("in");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  if (isPending) {
    return <div className="min-h-dvh bg-canvas" />;
  }
  if (user) {
    if (role === "employee") return <Navigate to="/portal" />;
    return <Navigate to="/" search={{ role }} />;
  }

  const dest = role === "employee" ? "/portal" : `/?role=${role}`;

  async function onEmail(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      if (mode === "up") {
        const { error: err } = await authClient.signUp.email({
          email,
          password,
          name: name || (role === "staff" ? "Lab assistant" : "Employee"),
          callbackURL: dest,
        });
        if (err) throw new Error(err.message || "Could not create account");
      } else {
        const { error: err } = await authClient.signIn.email({
          email,
          password,
          callbackURL: dest,
        });
        if (err) throw new Error(err.message || "Could not sign in");
      }
      window.location.href = dest;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setBusy(false);
    }
  }

  return (
    <div className="grid min-h-dvh lg:grid-cols-[1.05fr_1fr]">
      <section className="relative hidden overflow-hidden bg-sidebar text-sidebar-fg lg:flex lg:flex-col lg:justify-between lg:p-12">
        <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:radial-gradient(circle_at_1px_1px,rgb(255_255_255/0.08)_1px,transparent_0)] [background-size:22px_22px]" />
        <div className="relative">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Logo" className="h-7 object-contain" />

          </div>
          <h1 className="mt-14 max-w-md font-display text-4xl font-semibold tracking-tight">
            Your assets, under control 😉
          </h1>
          <p className="mt-4 max-w-sm text-xl leading-relaxed text-sidebar-muted">
            Create it. Manage it. Ship it
          </p>
        </div>
      </section>

      <section className="flex items-center justify-center bg-canvas px-4 py-10">
        <div className="w-full max-w-[400px]">
          <div className="mb-8 flex items-center gap-3 lg:hidden">
            <img src="/logo.png" alt="Logo" className="h-6 object-contain" />

          </div>
          <h2 className="font-display text-2xl font-semibold tracking-tight">
            {mode === "in" ? "Sign in" : "Create an account"}
          </h2>
          <p className="mt-1 text-sm text-muted">
            Lab assistants run the console. Employees see their assigned kit.
          </p>

          <div className="mt-6 grid grid-cols-2 rounded-xl bg-surface p-1 shadow-[0_0_0_1px_var(--color-border)]">
            {(
              [
                { id: "staff", label: "Lab assistant" },
                { id: "employee", label: "Employee" },
              ] as const
            ).map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setRole(opt.id)}
                className={cn(
                  "h-9 rounded-lg text-sm font-medium transition-colors",
                  role === opt.id ? "bg-primary text-primary-fg shadow-sm" : "text-muted hover:text-fg",
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {authEnabled ? (
            <>
              <form onSubmit={onEmail} className="mt-6 space-y-3">
                {mode === "up" ? (
                  <Field label="Full name">
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={role === "staff" ? "Vikram Iyer" : "Aarav Sharma"}
                      autoComplete="name"
                    />
                  </Field>
                ) : null}
                <Field label="Work email">
                  <Input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    autoComplete="email"
                  />
                </Field>
                <Field label="Password">
                  <Input
                    type="password"
                    required
                    minLength={8}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 8 characters"
                    autoComplete={mode === "up" ? "new-password" : "current-password"}
                  />
                </Field>
                {error ? <p className="text-sm text-danger">{error}</p> : null}
                <Button type="submit" className="w-full" disabled={busy}>
                  {busy
                    ? "Please wait…"
                    : mode === "in"
                      ? role === "staff"
                        ? "Staff sign in"
                        : "Employee sign in"
                      : "Create account"}
                </Button>
              </form>



              <p className="mt-6 text-center text-sm text-muted">
                {mode === "in" ? "New to the lab?" : "Already have an account?"}{" "}
                <button
                  type="button"
                  className="font-medium text-primary hover:underline"
                  onClick={() => {
                    setMode(mode === "in" ? "up" : "in");
                    setError(null);
                  }}
                >
                  {mode === "in" ? "Create an account" : "Sign in"}
                </button>
              </p>
            </>
          ) : (
            <p className="mt-6 text-sm text-muted">Sign-in is disabled.</p>
          )}
        </div>
      </section>
    </div>
  );
}
