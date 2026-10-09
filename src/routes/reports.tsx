import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BarChart3, Download, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { RequireAuth } from "@/components/require-auth";
import { KpiCard, PageHeader } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getReports, listAssets, resetDemo } from "@/lib/inventory/server";
import { daysUntil, formatInr } from "@/lib/inventory/format";

export const Route = createFileRoute("/reports")({ component: Page });

function Page() {
  return (
    <RequireAuth role="staff">
      <Reports />
    </RequireAuth>
  );
}

function Reports() {
  const qc = useQueryClient();
  const q = useQuery({ queryKey: ["reports"], queryFn: () => getReports() });
  const assets = useQuery({ queryKey: ["assets"], queryFn: () => listAssets() });
  const d = q.data;
  const maxSpend = Math.max(1, ...(d?.spendByVendor.map((v) => v.total) ?? [1]));

  const reset = useMutation({
    mutationFn: () => resetDemo(),
    onSuccess: async () => {
      toast.success("Demo data restored");
      await qc.invalidateQueries();
    },
    onError: (e) => toast.error(e.message),
  });

  function exportCsv() {
    const rows = [
      ["tag", "name", "vendor", "serial", "category", "status", "assigned_to", "location", "cost_inr", "warranty_until"],
      ...(assets.data ?? []).map((a) => [
        a.tag,
        a.name,
        a.vendor,
        a.serial,
        a.category,
        a.status,
        a.assignedToName ?? "",
        a.location,
        String(a.costInr),
        a.warrantyUntil ?? "",
      ]),
    ];
    const csv = rows.map((r) => r.map((c) => `"${String(c).replaceAll('"', '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "assetforge-assets.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  const CAT_COLORS = ["#F97316", "#EF476F", "#FFB703"];

  return (
    <>
      <PageHeader
        icon={<BarChart3 className="size-7 text-primary" />}
        title="Reports & Insights"
        subtitle="Export inventory data and monitor operational health."
        actions={
          <>
            <Button variant="outline" onClick={exportCsv}>
              <Download className="size-4" /> Assets CSV
            </Button>

          </>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          label="Hardware value"
          value={d ? formatInr(d.portfolioValue) : "—"}
          icon={<span className="text-[10px] font-medium text-[#F97316]">{d?.totalAssets ?? 0} assets</span>}
          iconClass="bg-[#F97316]/20 text-[#F97316]"
          accentColor="#F97316"
        />
        <KpiCard
          label="Assigned"
          value={d?.assigned ?? "—"}
          icon={<span className="text-[10px] text-[#FFB703]">with staff</span>}
          iconClass="bg-[#FFB703]/20 text-[#FFB703]"
          accentColor="#FFB703"
        />
        <KpiCard
          label="In stock"
          value={d?.inStock ?? "—"}
          icon={<span className="text-[10px] text-[#EF476F]">ready</span>}
          iconClass="bg-[#EF476F]/20 text-[#EF476F]"
          accentColor="#EF476F"
        />
        <KpiCard
          label="Open assignments"
          value={d?.openAssignments ?? "—"}
          icon={<span className="text-[10px] text-[#F97316]">total</span>}
          iconClass="bg-[#F97316]/20 text-[#F97316]"
          accentColor="#F97316"
        />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <section className="panel p-5">
          <h2 className="mb-4 text-sm font-semibold">Spend by vendor</h2>
          <div className="space-y-3">
            {(d?.spendByVendor ?? []).map((v, i) => (
              <div key={v.vendor}>
                <div className="mb-1 flex items-baseline justify-between text-sm">
                  <span>{v.vendor}</span>
                  <span className="tabular-nums text-muted">
                    {formatInr(v.total)} · {v.count}
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-track">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${Math.max(4, (v.total / maxSpend) * 100)}%`, backgroundColor: CAT_COLORS[i % 3] }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="panel p-5">
          <h2 className="mb-4 text-sm font-semibold">Assets per department</h2>
          <ul className="space-y-3">
            {(d?.assetsPerDept ?? []).map((row) => (
              <li key={row.department} className="flex items-center justify-between text-sm">
                <span>{row.department}</span>
                <Badge className="bg-canvas text-muted">{row.count} assets</Badge>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="panel mt-4 p-5">
        <h2 className="mb-2 text-sm font-semibold">Warranties expiring within 90 days</h2>
        <ul className="divide-y divide-border">
          {(d?.warranties ?? []).map((a) => {
            const left = daysUntil(a.warrantyUntil);
            const overdue = (left ?? 0) < 0;
            return (
              <li key={a.id} className="flex items-center justify-between gap-3 py-3">
                <div>
                  <p className="text-sm font-medium">{a.name}</p>
                  <p className="text-xs text-muted">
                    {a.tag} · {a.vendor} · {formatInr(a.costInr)}
                  </p>
                </div>
                <Badge className={overdue ? "bg-danger text-white" : "bg-warn-bg text-warn-fg"}>
                  {left == null ? "" : `${left}d left`}
                </Badge>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}
