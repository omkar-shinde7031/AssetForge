import type { AssetStatus } from "./types";

export function formatInr(n: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);
}

export function parseDate(value: string | null | undefined): Date | null {
  if (!value) return null;
  const iso = value.length === 10 ? `${value}T00:00:00` : value;
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? null : d;
}

export function asDateString(value: unknown): string | null {
  if (value == null || value === "") return null;
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  const s = String(value);
  return s.slice(0, 10);
}

export function asIso(value: unknown): string {
  if (value instanceof Date) return value.toISOString();
  return String(value ?? "");
}

export function startOfToday(): Date {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

export function daysUntil(dateStr: string | null): number | null {
  const d = parseDate(dateStr);
  if (!d) return null;
  const now = startOfToday();
  return Math.round((d.getTime() - now.getTime()) / 86_400_000);
}

export function monthsUntil(dateStr: string | null): number | null {
  const days = daysUntil(dateStr);
  if (days == null) return null;
  return Math.max(0, Math.round(days / 30.437));
}

export function overdueDays(due: string | null, returned: string | null): number | null {
  if (returned || !due) return null;
  const n = daysUntil(due);
  if (n === null || n >= 0) return null;
  return Math.abs(n);
}

export function statusLabel(status: AssetStatus | string): string {
  switch (status) {
    case "assigned":
      return "Assigned";
    case "in_stock":
      return "In Stock";
    case "repair":
      return "Under Repair";
    case "retired":
      return "Retired";
    case "overdue":
      return "Overdue";
    default:
      return status;
  }
}

export function formatStamp(iso: string): string {
  const d = parseDate(iso) ?? new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString("en-US", {
    month: "numeric",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
}

export function formatShortDate(value: string | null | undefined): string {
  const d = parseDate(value);
  if (!d) return "—";
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

export function todayIso(): string {
  return startOfToday().toISOString().slice(0, 10);
}

export function plusYearsIso(years: number): string {
  const d = startOfToday();
  d.setFullYear(d.getFullYear() + years);
  return d.toISOString().slice(0, 10);
}

export function nextTag(category: string, existing: string[]): string {
  const prefixes: Record<string, string> = {
    Laptop: "LAP",
    Desktop: "DSK",
    Monitor: "MON",
    RAM: "RAM",
    SSD: "SSD",
    Peripheral: "PER",
    Server: "SRV",
    Network: "NET",
  };
  const prefix = prefixes[category] ?? "AST";
  let max = 0;
  for (const tag of existing) {
    if (!tag.startsWith(`${prefix}-`)) continue;
    const n = Number(tag.slice(prefix.length + 1));
    if (Number.isFinite(n) && n > max) max = n;
  }
  return `${prefix}-${String(max + 1).padStart(4, "0")}`;
}
