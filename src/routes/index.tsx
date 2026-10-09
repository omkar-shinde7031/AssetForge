import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  Cpu,
  Mouse,
  HardDrive,
  Laptop,
  Server,
  ArrowRight,
  Box,
  Briefcase,
  LayoutDashboard,
  Search,
  TrendingUp,
  TriangleAlert,
  Users,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { RequireAuth } from "@/components/require-auth";
import { KpiCard, PageHeader } from "@/components/app-shell";
import { Button } from "@/components/ui/button";

import { Badge, StatusBadge } from "@/components/ui/badge";
import { getDashboard, listOnboarding } from "@/lib/inventory/server";
import {
  daysUntil,
  formatInr,
  formatShortDate,
  monthsUntil,
  overdueDays,
} from "@/lib/inventory/format";
import type { DashboardData, Role } from "@/lib/inventory/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  validateSearch: (s: Record<string, unknown>): { role?: Role } => {
    if (s.role === "employee" || s.role === "staff") return { role: s.role };
    return {};
  },
  component: Home,
});

function Home() {
  const { role } = Route.useSearch();
  return (
    <RequireAuth role="staff" preferredRole={role === "employee" ? "employee" : "staff"}>
      <Dashboard />
    </RequireAuth>
  );
}

const STATUS_SLICES = [
  { key: "assigned" as const, label: "Assigned", color: "#F97316" },
  { key: "inStock" as const, label: "In Stock", color: "#FFB703" },
  { key: "repair" as const, label: "Under Repair", color: "#EF476F" },
  { key: "retired" as const, label: "Retired", color: "var(--color-subtle)" },
];

function Dashboard() {
  const q = useQuery({ queryKey: ["dashboard"], queryFn: () => getDashboard() });
  const ob = useQuery({ queryKey: ["onboarding"], queryFn: () => listOnboarding() });
  const d = q.data;
  const navigate = useNavigate();


  const CAT_COLORS = ["#F97316", "#EF476F", "#FFB703"];

  return (
    <>
      <PageHeader
        title="Training Hardware Inventory"
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Link to="/assets" className="block transition-transform hover:scale-[1.02] active:scale-[0.98]">
          <KpiCard
            label="Total Assets"
            value={d?.totalAssets ?? "—"}
            icon={<Briefcase className="size-4" />}
            iconClass="bg-[#F97316]/20 text-[#F97316]"
            accentColor="#F97316"
          />
        </Link>
        <Link to="/assets" className="block transition-transform hover:scale-[1.02] active:scale-[0.98]">
          <KpiCard
            label="Assets In Stock"
            value={d?.inStock ?? "—"}
            icon={<Box className="size-4" />}
            iconClass="bg-[#FFB703]/20 text-[#FFB703]"
            accentColor="#FFB703"
          />
        </Link>
        <Link to="/employees" className="block transition-transform hover:scale-[1.02] active:scale-[0.98]">
          <KpiCard
            label="Active Employees"
            value={d?.activeEmployees ?? "—"}
            icon={<Users className="size-4" />}
            iconClass="bg-[#EF476F]/20 text-[#EF476F]"
            accentColor="#EF476F"
          />
        </Link>
        <Link to="/reports" className="block transition-transform hover:scale-[1.02] active:scale-[0.98]">
          <KpiCard
            label="Total Asset Value"
            value={d ? formatInr(d.portfolioValue) : "—"}
            icon={<TrendingUp className="size-4" />}
            iconClass="bg-[#F97316]/20 text-[#F97316]"
            accentColor="#F97316"
          />
        </Link>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <LowStockAlerts data={d} />

        <section className="panel p-5 flex flex-col h-full">
          <div className="mb-1 flex items-center justify-between">
            <h2 className="text-lg font-bold text-fg">Asset Status</h2>
            <div className="inline-flex items-center rounded-full bg-[#E8F5E9] px-2.5 py-1 text-xs font-medium text-[#2E7D32]">
              <span className="mr-1.5 size-1.5 rounded-full bg-[#4CAF50]" />
              Live
            </div>
          </div>
          <p className="mb-5 text-sm text-muted">Live mix of stock vs. assigned kit</p>
          <div className="flex-1 flex items-center justify-center">
            {d ? <StatusDonut data={d} /> : <div className="h-48 w-full animate-pulse rounded-lg bg-canvas" />}
          </div>
        </section>
      </div>

      {(() => {
        const reqs = (ob.data ?? []).filter(r => r.status === "open");
        if (reqs.length === 0) return null;
        return (
          <section className="panel mt-4 overflow-hidden">
            <div className="flex items-center justify-between border-b border-border px-5 py-4 bg-warn-bg">
              <h2 className="text-sm font-semibold text-warn">Pending Hardware Requests</h2>
              <Button variant="ghost" size="sm" className="text-warn hover:bg-warn/10" asChild>
                <Link to="/assignments">Review</Link>
              </Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] text-left text-sm">
                <thead>
                  <tr className="border-b border-border text-xs text-muted">
                    <th className="px-5 py-3 font-medium">Employee</th>
                    <th className="px-5 py-3 font-medium">Hardware Needed</th>
                    <th className="px-5 py-3 font-medium">Reason</th>
                  </tr>
                </thead>
                <tbody>
                  {reqs.slice(0, 5).map((r) => (
                    <tr key={r.id} className="border-b border-border last:border-0">
                      <td className="px-5 py-3">
                        <p className="font-medium">{r.fullName}</p>
                        <p className="text-xs text-muted">{r.department}</p>
                      </td>
                      <td className="px-5 py-3 font-medium">{r.hardwareNeeded.join(", ")}</td>
                      <td className="px-5 py-3 text-muted">{r.justification || "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        );
      })()}

      <section className="panel mt-4 overflow-hidden">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="text-sm font-semibold">Recent Assignments</h2>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/assignments">View all</Link>
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="border-b border-border text-xs text-muted">
                {["Asset Name", "Employee", "Department", "Assigned Date", "Return Date", "Status"].map(
                  (h) => (
                    <th key={h} className="px-5 py-3 font-medium">
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {(d?.recentAssignments ?? []).map((a) => {
                const late = overdueDays(a.dueBack, a.returnedAt);
                return (
                  <tr key={a.id} className="border-b border-border last:border-0">
                    <td className="px-5 py-3">
                      <p className="font-medium">{a.assetName}</p>
                      <p className="font-mono text-xs text-muted">{a.assetTag}</p>
                    </td>
                    <td className="px-5 py-3">{a.employeeName}</td>
                    <td className="px-5 py-3 text-muted">{a.department}</td>
                    <td className="px-5 py-3 tabular-nums text-muted">{formatShortDate(a.assignedAt)}</td>
                    <td className="px-5 py-3 tabular-nums text-muted">{formatShortDate(a.dueBack)}</td>
                    <td className="px-5 py-3">
                      <StatusBadge status={late ? "overdue" : "assigned"} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {d && d.recentAssignments.length === 0 ? (
            <p className="py-10 text-center text-sm text-muted">No open assignments yet.</p>
          ) : null}
          {!d ? <div className="h-32 animate-pulse bg-canvas" /> : null}
        </div>
      </section>

      <section className="panel mt-4 p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-sm font-semibold">
            <TriangleAlert className="size-4 text-warn" />
            Warranty Alerts
          </h2>
          <span className="text-xs text-muted">Next 180 days</span>
        </div>
        {(d?.warranties ?? []).length === 0 && d ? (
          <p className="py-6 text-center text-sm text-muted">No warranties in the next 180 days.</p>
        ) : null}
        <ul className="space-y-4">
          {(d?.warranties ?? []).map((a) => {
            const left = daysUntil(a.warrantyUntil);
            const months = monthsUntil(a.warrantyUntil);
            const pct = left == null ? 0 : Math.min(100, Math.max(6, (left / 180) * 100));
            const tone =
              left == null || left > 150 ? "bg-ok" : left > 90 ? "bg-warn" : "bg-danger";
            return (
              <li key={a.id}>
                <div className="mb-1.5 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{a.name}</p>
                    <p className="text-xs text-muted">
                      {a.tag} · {a.vendor}
                    </p>
                  </div>
                  <span
                    className={cn(
                      "shrink-0 text-xs font-medium tabular-nums",
                      left != null && left <= 90 ? "text-danger" : "text-muted",
                    )}
                  >
                    {months == null ? "" : `Expires in ${months} month${months === 1 ? "" : "s"}`}
                  </span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-track">
                  <div className={cn("h-full rounded-full", tone)} style={{ width: `${pct}%` }} />
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}

function StatusDonut({ data }: { data: DashboardData }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const slices = useMemo(() => {
    return STATUS_SLICES.map((s) => ({
      ...s,
      value: data[s.key],
    })).filter((s) => s.value > 0);
  }, [data]);
  const total = Math.max(1, data.totalAssets);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center">
        <div className="relative h-44 w-44 shrink-0">
          {mounted ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={slices}
                  dataKey="value"
                  nameKey="label"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={2}
                  stroke="none"
                >
                  {slices.map((s) => (
                    <Cell key={s.key} fill={s.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="size-full animate-pulse rounded-full bg-canvas" />
          )}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="font-display text-4xl font-bold tracking-tight text-fg">{data.totalAssets}</span>
            <span className="text-xs text-muted">Total assets</span>
          </div>
        </div>
        <div className="flex w-full flex-col gap-4">
          <ul className="space-y-3 text-sm">
            {STATUS_SLICES.map((s) => {
              const n = data[s.key];
              if (n === undefined || n === null || s.key === "retired") return null;
              return (
                <li key={s.key} className="flex items-center justify-between gap-3 text-base">
                  <span className="flex items-center gap-2">
                    <span className="size-3 rounded-full" style={{ background: s.color }} />
                    <span className="text-fg">{s.label}</span>
                  </span>
                  <span className="tabular-nums text-muted">{((n / total) * 100).toFixed(1)}%</span>
                </li>
              );
            })}
          </ul>
          <div className="text-sm font-medium text-[#2E7D32]">
            ▲ 2 new assets this week
          </div>
        </div>
      </div>
      
      <hr className="border-border" />
      
      <div className="grid grid-cols-3 gap-3">
        <div className="flex flex-col items-center justify-center gap-1 rounded-xl bg-canvas p-4 text-center">
          <p className="text-sm font-medium text-muted">Assigned</p>
          <p className="font-display text-3xl font-bold leading-none" style={{ color: "#F97316" }}>{data.assigned}</p>
        </div>
        <div className="flex flex-col items-center justify-center gap-1 rounded-xl bg-canvas p-4 text-center">
          <p className="text-sm font-medium text-muted">In Stock</p>
          <p className="font-display text-3xl font-bold leading-none" style={{ color: "#FFB703" }}>{data.inStock}</p>
        </div>
        <div className="flex flex-col items-center justify-center gap-1 rounded-xl bg-canvas p-4 text-center">
          <p className="text-sm font-medium text-muted">In Repair</p>
          <p className="font-display text-3xl font-bold leading-none" style={{ color: "#EF476F" }}>{data.repair}</p>
        </div>
      </div>
    </div>
  );
}

function LowStockAlerts({ data }: { data?: DashboardData }) {
  if (!data) return <div className="h-64 animate-pulse rounded-lg bg-canvas" />;

  const iconMap: Record<string, any> = {
    RAM: Cpu,
    Peripheral: Mouse,
    SSD: HardDrive,
    Laptop: Laptop,
    Server: Server,
  };

  const dynamicAlerts = data.byCategory.map((cat) => {
    const reorder = Math.max(1, Math.floor(cat.count * 0.4)); 
    const stock = cat.inStock;
    const shortfall = Math.max(0, reorder - stock);
    
    let status = "Sufficient";
    if (stock < reorder && shortfall > 1) status = "Urgent";
    else if (stock <= reorder) status = "Reorder Soon";

    const Icon = iconMap[cat.category] || Box;

    return {
      category: cat.category,
      icon: Icon,
      stock,
      reorder,
      status,
    };
  }).filter(a => a.status !== "Sufficient");

  return (
    <section className="panel p-5 flex flex-col h-full">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-lg font-bold text-fg">
          <TriangleAlert className="size-4 text-warn" />
          Low Stock Alerts
        </h2>
        {dynamicAlerts.length > 0 ? (
          <Badge className="bg-[#FCE8E8] text-[#EF476F] hover:bg-[#FCE8E8] rounded-full px-2 py-0.5 text-xs">
            {dynamicAlerts.length} Alerts
          </Badge>
        ) : (
          <Badge className="bg-[#E8F5E9] text-[#2E7D32] hover:bg-[#E8F5E9] rounded-full px-2 py-0.5 text-xs">
            All good
          </Badge>
        )}
      </div>

      {dynamicAlerts.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center py-6 text-muted text-sm">
          <Box className="size-8 mb-2 opacity-20" />
          <p>Inventory levels are optimal.</p>
        </div>
      ) : (
        <ul className="space-y-3">
          {dynamicAlerts.map((a, i) => (
            <li key={i} className="flex items-center justify-between gap-3 rounded-lg border border-border p-3">
              <div className="flex items-center gap-3">
                <div className={cn("size-8 rounded-lg flex items-center justify-center shrink-0", 
                  a.status === "Urgent" ? "bg-[#FCE8E8] text-[#EF476F]" : "bg-[#FFF4E5] text-[#F97316]"
                )}>
                  <a.icon className="size-4" />
                </div>
                <div>
                  <p className="text-sm font-medium text-fg">{a.category}</p>
                  <p className="text-xs text-muted">Stock: {a.stock} / {a.reorder} min</p>
                </div>
              </div>
              <Badge className={cn("rounded-full border-none px-2 py-0.5 font-bold text-[10px]", 
                a.status === "Urgent" ? "bg-[#FCE8E8] text-[#EF476F]" : "bg-[#FFF4E5] text-[#F97316]"
              )}>
                {a.status}
              </Badge>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

