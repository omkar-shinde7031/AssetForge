import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { MapPin, Search, Shield } from "lucide-react";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { RequireAuth } from "@/components/require-auth";
import { KpiCard, PageHeader } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Badge, OverdueBadge } from "@/components/ui/badge";
import { getAudit } from "@/lib/inventory/server";
import { formatStamp, overdueDays } from "@/lib/inventory/format";

export const Route = createFileRoute("/audit")({ component: Page });

function Page() {
  return (
    <RequireAuth role="staff">
      <Audit />
    </RequireAuth>
  );
}

function Audit() {
  const q = useQuery({ queryKey: ["audit"], queryFn: () => getAudit() });
  const d = q.data;
  const [filter, setFilter] = useState<"all" | "dueSoon" | "overdue" | "events">("all");

  const displayedCustody = useMemo(() => {
    const todayIso = new Date().toISOString().slice(0, 10);
    const soon = new Date();
    soon.setDate(soon.getDate() + 14);
    const soonIso = soon.toISOString().slice(0, 10);

    return (d?.custody ?? []).filter((c) => {
      if (filter === "overdue") return c.dueBack && c.dueBack < todayIso;
      if (filter === "dueSoon") return c.dueBack && c.dueBack >= todayIso && c.dueBack <= soonIso;
      return true; // "all" or "events" shows all custody items for now since event log is removed
    });
  }, [d, filter]);


  return (
    <>
      <PageHeader
        icon={<Shield className="size-7 text-primary" />}
        title="Audit Trail"
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <button type="button" onClick={() => setFilter("events")} className={cn("text-left transition-all", filter === "events" ? "opacity-100 ring-2 ring-primary rounded-xl" : "opacity-70 hover:opacity-100")}>
          <KpiCard
            label="Recorded events"
            value={d?.recordedEvents ?? "—"}
            icon={<span className="text-[10px] font-semibold text-[#F97316]">LOG</span>}
            iconClass="bg-[#F97316]/20 text-[#F97316]"
            accentColor="#F97316"
          />
        </button>
        <button type="button" onClick={() => setFilter("all")} className={cn("text-left transition-all", filter === "all" ? "opacity-100 ring-2 ring-primary rounded-xl" : "opacity-70 hover:opacity-100")}>
          <KpiCard
            label="Assets in custody"
            value={d?.inCustody ?? "—"}
            icon={<span className="text-[10px] font-semibold text-[#FFB703]">KIT</span>}
            iconClass="bg-[#FFB703]/20 text-[#FFB703]"
            accentColor="#FFB703"
          />
        </button>
        <button type="button" onClick={() => setFilter("dueSoon")} className={cn("text-left transition-all", filter === "dueSoon" ? "opacity-100 ring-2 ring-primary rounded-xl" : "opacity-70 hover:opacity-100")}>
          <KpiCard
            label="Due within 14 days"
            value={d?.dueSoon ?? "—"}
            icon={<span className="text-xs font-semibold text-[#F97316]">DUE</span>}
            iconClass="bg-[#F97316]/20 text-[#F97316]"
            accentColor="#F97316"
          />
        </button>
        <button type="button" onClick={() => setFilter("overdue")} className={cn("text-left transition-all", filter === "overdue" ? "opacity-100 ring-2 ring-primary rounded-xl" : "opacity-70 hover:opacity-100")}>
          <KpiCard
            label="Overdue"
            value={<span className={d && d.overdue > 0 ? "text-[#EF476F]" : ""}>{d?.overdue ?? "—"}</span>}
            icon={<span className="text-xs font-semibold text-[#EF476F]">!</span>}
            iconClass="bg-[#EF476F]/20 text-[#EF476F]"
            accentColor="#EF476F"
          />
        </button>
      </div>

      <section className="panel mt-4 overflow-hidden">
        <div className="px-5 py-4">
          <h2 className="text-sm font-semibold">Current chain of custody</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="border-y border-border text-xs text-muted">
                {["Asset", "Holder", "Location", "Since", "Due back"].map((h) => (
                  <th key={h} className="px-5 py-3 font-medium">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {displayedCustody.map((c) => {
                const od = overdueDays(c.dueBack, c.returnedAt);
                return (
                  <tr key={c.id} className="border-b border-border last:border-0">
                    <td className="px-5 py-3">
                      <p className="font-medium">{c.assetName}</p>
                      <p className="font-mono text-xs text-muted">{c.assetTag}</p>
                    </td>
                    <td className="px-5 py-3">
                      <p className="font-medium">{c.employeeName}</p>
                      <p className="text-xs text-muted">{c.department}</p>
                    </td>
                    <td className="px-5 py-3 text-muted">{c.location || "—"}</td>
                    <td className="px-5 py-3 tabular-nums text-muted">{c.assignedAt}</td>
                    <td className="px-5 py-3">
                      <p className="tabular-nums">{c.dueBack}</p>
                      {od ? (
                        <OverdueBadge days={od} />
                      ) : c.dueBack ? (
                        <Badge className="mt-1 bg-canvas text-muted">Due {c.dueBack}</Badge>
                      ) : null}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>


    </>
  );
}
