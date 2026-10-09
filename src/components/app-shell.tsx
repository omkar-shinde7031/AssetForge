import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  ArrowLeftRight,
  BarChart3,
  Briefcase,
  ClipboardList,
  LayoutDashboard,
  Menu,
  PackagePlus,
  ScanLine,
  Search,
  Shield,
  Users,
  X,
} from "lucide-react";
import { useState, type FormEvent, type ReactNode } from "react";
import { UserButton } from "@/lib/auth/gates";
import { useCurrentUser } from "@/lib/auth/use-current-user";
import { initials, cn } from "@/lib/utils";
import { ForgeMark } from "@/components/forge-mark";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import type { Profile } from "@/lib/inventory/types";

const STAFF_NAV = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/check-in", label: "Check-In / Out", icon: ScanLine },
  { to: "/intake", label: "Intake Panel", icon: PackagePlus },
  { to: "/onboarding", label: "Onboarding Requests", icon: ClipboardList },
  { to: "/assets", label: "Assets", icon: Briefcase },
  { to: "/assignments", label: "Assignments", icon: ArrowLeftRight },
  { to: "/employees", label: "Employees", icon: Users },
  { to: "/audit", label: "Audit Trail", icon: Shield },
  { to: "/reports", label: "Reports", icon: BarChart3 },
] as const;

function navClass(active: boolean) {
  return cn(
    "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
    active
      ? "bg-sidebar-active text-white"
      : "text-sidebar-muted hover:bg-sidebar-hover hover:text-sidebar-fg",
  );
}

function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav className="flex flex-col gap-0.5 px-3">
      <p className="mb-2 px-3 text-xs font-medium tracking-wide text-sidebar-muted uppercase">
        Workspace
      </p>
      {STAFF_NAV.map((item) => {
        const Icon = item.icon;
        const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
        return (
          <Link key={item.to} to={item.to} onClick={onNavigate} className={navClass(active)}>
            <Icon className="size-4 shrink-0" strokeWidth={1.8} />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

function SidebarFooter({ profile }: { profile: Profile }) {
  const user = useCurrentUser();
  const name = profile.displayName || user?.displayName || "IT Admin";
  const email = profile.email || user?.primaryEmail || "";
  return (
    <div className="mt-auto border-t border-sidebar-fg/10 px-4 py-4">
      <div className="flex items-center gap-3">
        <div className="grid size-9 shrink-0 place-items-center rounded-full bg-brand/20 text-xs font-semibold text-brand">
          {initials(name)}
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-sidebar-fg">{name}</p>
          <p className="truncate text-xs text-sidebar-muted">{email}</p>
        </div>
      </div>
    </div>
  );
}



export function StaffShell({
  profile,
  children,
}: {
  profile: Profile;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  const sidebar = (
    <div className="flex h-full flex-col bg-sidebar text-sidebar-fg">
      <div className="flex items-center gap-3 px-5 py-5">
        <img src="/logo.png" alt="Logo" className="h-6 object-contain" />

      </div>
      <SidebarNav onNavigate={() => setOpen(false)} />
      <SidebarFooter profile={profile} />
    </div>
  );

  return (
    <div className="flex min-h-dvh bg-canvas">
      <aside className="sticky top-0 hidden h-dvh w-[248px] shrink-0 lg:block">{sidebar}</aside>
      {open ? (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-fg/40"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          />
          <div className="relative h-full w-[248px]">{sidebar}</div>
        </div>
      ) : null}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between gap-3 border-b border-border bg-surface px-4 backdrop-blur-md shadow-sm sm:px-6">
          <div className="flex min-w-0 items-center gap-4">
            <button
              type="button"
              className="grid size-9 place-items-center rounded-lg text-muted hover:bg-canvas lg:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-label="Open menu"
            >
              {open ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
            <div className="flex items-center gap-3">

              <Badge className="hidden sm:inline-flex bg-canvas text-muted-foreground font-medium rounded-full border border-border">
                Lab assistant
              </Badge>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <div className="[&_button]:text-sm [&_img]:size-8 [&_span.grid]:size-8">
              <UserButton />
            </div>
          </div>
        </header>
        <main className="min-w-0 flex-1 overflow-x-hidden px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}

export function EmployeeShell({
  profile,
  children,
}: {
  profile: Profile;
  children: ReactNode;
}) {
  const name = profile.displayName;
  return (
    <div className="min-h-dvh bg-canvas">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between gap-3 border-b border-border bg-surface px-4 backdrop-blur-md shadow-sm sm:px-6 lg:px-8">
        <Link to="/portal" className="flex items-center gap-3">
          <img src="/logo.png" alt="Logo" className="h-6 object-contain" />

          <Badge className="hidden sm:inline-flex bg-canvas text-muted-foreground font-medium rounded-full border border-border">
            Employee
          </Badge>
        </Link>
        <div className="flex items-center gap-5">
          {profile.role === "staff" ? (
            <Link to="/" className="text-sm font-medium text-primary hover:text-primary/80 transition-colors hover:underline">
              Staff console
            </Link>
          ) : null}
          <div className="h-5 w-px bg-border/60 hidden sm:block" />
          <div className="[&_button]:text-sm [&_img]:size-8 [&_span.grid]:size-8">
            <UserButton />
          </div>
        </div>
      </header>
      <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6">{children}</main>
    </div>
  );
}

export function PageHeader({
  icon,
  title,
  subtitle,
  actions,
}: {
  icon?: ReactNode;
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
      <div className="min-w-0">
        <h1 className="flex items-center gap-2.5 font-display text-2xl font-semibold tracking-tight text-fg">
          {icon}
          {title}
        </h1>
        {subtitle ? <p className="mt-1 text-sm text-muted">{subtitle}</p> : null}
      </div>
      {actions ? <div className="flex w-full shrink-0 flex-col gap-2 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center">{actions}</div> : null}
    </div>
  );
}

export function KpiCard({
  label,
  value,
  icon,
  iconClass,
  accentColor,
}: {
  label: string;
  value: ReactNode;
  icon: ReactNode;
  iconClass: string;
  accentColor?: string;
}) {
  return (
    <div 
      className="panel flex items-start justify-between gap-3 p-4 sm:p-5"
      style={{ borderBottom: accentColor ? `3px solid ${accentColor}` : undefined }}
    >
      <div className="min-w-0">
        <p className="text-xs font-medium text-muted">{label}</p>
        <p className="mt-2 font-display text-2xl font-semibold tracking-tight break-all tabular-nums">
          {value}
        </p>
      </div>
      <div className={cn("grid size-9 shrink-0 place-items-center rounded-lg", iconClass)}>{icon}</div>
    </div>
  );
}

export function AppSkeleton() {
  return (
    <div className="flex min-h-dvh bg-canvas">
      <div className="hidden w-[248px] bg-sidebar lg:block" />
      <div className="flex-1 p-8">
        <div className="h-8 w-64 animate-pulse rounded-lg bg-border" />
        <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="panel h-24 animate-pulse bg-surface" />
          ))}
        </div>
      </div>
    </div>
  );
}
