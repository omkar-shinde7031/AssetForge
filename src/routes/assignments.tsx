import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeftRight, Plus, RotateCcw } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { RequireAuth } from "@/components/require-auth";
import { PageHeader } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { OverdueBadge } from "@/components/ui/badge";
import {
  createAssignment,
  listAssets,
  listAssignments,
  listEmployees,
  returnAsset,
  listOnboarding,
} from "@/lib/inventory/server";
import { overdueDays, plusYearsIso } from "@/lib/inventory/format";

export const Route = createFileRoute("/assignments")({ component: Page });

function Page() {
  return (
    <RequireAuth role="staff">
      <Assignments />
    </RequireAuth>
  );
}

function Assignments() {
  const qc = useQueryClient();
  const q = useQuery({ queryKey: ["assignments"], queryFn: () => listAssignments() });
  const ob = useQuery({ queryKey: ["onboarding"], queryFn: () => listOnboarding() });
  const [open, setOpen] = useState(false);
  const active = (q.data ?? []).filter((a) => !a.returnedAt);
  const returned = (q.data ?? []).filter((a) => a.returnedAt);

  const ret = useMutation({
    mutationFn: (id: string) => returnAsset({ data: id }),
    onSuccess: async () => {
      toast.success("Asset returned to stock");
      await qc.invalidateQueries();
    },
    onError: (e) => toast.error(e.message),
  });

  return (
    <>
      <PageHeader
        icon={<ArrowLeftRight className="size-7 text-primary" />}
        title="Assignments"
        actions={
          <Button className="w-full sm:w-auto" asChild>
            <Link to="/onboarding">
              <Plus className="size-4" /> New assignment
            </Link>
          </Button>
        }
      />

      {(() => {
        const reqs = (ob.data ?? []).filter(r => r.status === "open");
        if (reqs.length === 0) return null;
        return (
          <section className="panel overflow-hidden mb-6">
            <div className="flex items-center justify-between border-b border-border px-5 py-3 bg-warn-bg">
              <h2 className="text-sm font-semibold text-warn">Pending Requests</h2>
              <span className="rounded-full bg-warn/20 px-2 py-0.5 text-xs tabular-nums text-warn-fg">
                {reqs.length}
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px] text-left text-sm">
                <thead>
                  <tr className="border-b border-border text-xs text-muted">
                    <th className="px-5 py-3 font-medium">Employee</th>
                    <th className="px-5 py-3 font-medium">Requested Hardware</th>
                    <th className="px-5 py-3 font-medium">Reason</th>
                  </tr>
                </thead>
                <tbody>
                  {reqs.map((r) => (
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

      <section className="panel overflow-hidden">
        <div className="flex items-center justify-between border-b border-border px-5 py-3">
          <h2 className="text-sm font-semibold">Active</h2>
          <span className="rounded-full bg-canvas px-2 py-0.5 text-xs tabular-nums text-muted">
            {active.length}
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-left text-sm">
            <thead>
              <tr className="border-b border-border text-xs text-muted">
                {["Asset", "Assigned to", "Since", "Due back", "Note", "Action"].map((h) => (
                  <th key={h} className="px-5 py-3 font-medium">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {active.map((a) => {
                const od = overdueDays(a.dueBack, a.returnedAt);
                return (
                  <tr key={a.id} className="border-b border-border last:border-0">
                    <td className="px-5 py-3">
                      <p className="font-medium">{a.assetName}</p>
                      <p className="font-mono text-xs text-muted">{a.assetTag}</p>
                    </td>
                    <td className="px-5 py-3">
                      <p className="font-medium">{a.employeeName}</p>
                      <p className="text-xs text-muted">{a.department}</p>
                    </td>
                    <td className="px-5 py-3 tabular-nums text-muted">{a.assignedAt}</td>
                    <td className="px-5 py-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="tabular-nums">{a.dueBack ?? "—"}</span>
                        {od ? <OverdueBadge days={od} /> : null}
                      </div>
                    </td>
                    <td className="px-5 py-3 text-muted">{a.note || "—"}</td>
                    <td className="px-5 py-3">
                      <Button
                        size="sm"
                        variant="outline"
                        disabled={ret.isPending}
                        onClick={() => ret.mutate(a.id)}
                      >
                        <RotateCcw className="size-3.5" />
                        Return
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {active.length === 0 ? (
            <p className="py-10 text-center text-sm text-muted">No active assignments.</p>
          ) : null}
        </div>
      </section>

      <NewAssignmentDialog
        open={open}
        onClose={() => setOpen(false)}
        onSaved={async () => {
          setOpen(false);
          await qc.invalidateQueries();
        }}
      />
    </>
  );
}

function NewAssignmentDialog({
  open,
  onClose,
  onSaved,
}: {
  open: boolean;
  onClose: () => void;
  onSaved: () => void;
}) {
  const assets = useQuery({ queryKey: ["assets"], queryFn: () => listAssets(), enabled: open });
  const employees = useQuery({
    queryKey: ["employees"],
    queryFn: () => listEmployees(),
    enabled: open,
  });
  const stock = (assets.data ?? []).filter((a) => a.status === "in_stock");
  const [assetId, setAssetId] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [due, setDue] = useState(plusYearsIso(2));
  const [note, setNote] = useState("");
  const loc = stock.find((a) => a.id === assetId)?.location ?? "";

  const save = useMutation({
    mutationFn: () =>
      createAssignment({
        data: { assetId, employeeId, dueBack: due, note, location: loc },
      }),
    onSuccess: () => {
      toast.success("Assignment created");
      onSaved();
    },
    onError: (e) => toast.error(e.message),
  });

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent title="New assignment" description="Only in-stock hardware can be handed out.">
        <form
          className="space-y-3"
          onSubmit={(e) => {
            e.preventDefault();
            save.mutate();
          }}
        >
          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted">Asset</label>
            <Select value={assetId} onChange={(e) => setAssetId(e.target.value)} required>
              <option value="">Select in-stock asset</option>
              {stock.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.tag} · {a.name}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted">Employee</label>
            <Select value={employeeId} onChange={(e) => setEmployeeId(e.target.value)} required>
              <option value="">Select person</option>
              {(employees.data ?? []).map((e) => (
                <option key={e.id} value={e.id}>
                  {e.fullName} · {e.department}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted">Due back</label>
            <Input type="date" value={due} onChange={(e) => setDue(e.target.value)} />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted">Note</label>
            <Input value={note} onChange={(e) => setNote(e.target.value)} placeholder="Primary dev machine" />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={save.isPending || !assetId || !employeeId}>
              Assign
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
