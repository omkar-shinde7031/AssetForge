import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ScanLine, QrCode } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { RequireAuth } from "@/components/require-auth";
import { PageHeader } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { OverdueBadge, StatusBadge } from "@/components/ui/badge";
import { Select } from "@/components/ui/select";
import { lookupPerson, createAssignment, returnAsset, reportDamagedAsset, handoverAsset } from "@/lib/inventory/server";
import { overdueDays, plusYearsIso } from "@/lib/inventory/format";
import { initials } from "@/lib/utils";
import type { Asset, Assignment, Employee } from "@/lib/inventory/types";

export const Route = createFileRoute("/check-in")({ component: Page });

function Page() {
  return (
    <RequireAuth role="staff">
      <CheckIn />
    </RequireAuth>
  );
}

const DEMO_BADGES = [
  { id: "e1", label: "Aarav Sharma", hint: "e1 / aarav@itlabs.io" },
  { id: "e2", label: "Priya Menon", hint: "e2 / priya@itlabs.io" },
  { id: "e3", label: "Rahul Verma", hint: "e3 / rahul@itlabs.io" },
  { id: "e4", label: "Sana Kapoor", hint: "e4 / sana@itlabs.io" },
  { id: "e5", label: "Vikram Iyer", hint: "e5 / vikram@itlabs.io" },
];

function CheckIn() {
  const qc = useQueryClient();
  const [q, setQ] = useState("");
  const [scanOpen, setScanOpen] = useState(false);
  const lookup = useMutation({
    mutationFn: (needle: string) => lookupPerson({ data: needle }),
    onError: (e) => toast.error(e.message),
  });
  const person = lookup.data ?? null;

  function run(needle: string) {
    setQ(needle);
    lookup.mutate(needle);
  }

  const checkout = useMutation({
    mutationFn: (d: { assetId: string; employeeId: string; dueBack: string; note: string }) =>
      createAssignment({ data: d }),
    onSuccess: async () => {
      toast.success("Checked out");
      await qc.invalidateQueries();
      if (person) lookup.mutate(person.employee.id);
    },
    onError: (e) => toast.error(e.message),
  });
  const ret = useMutation({
    mutationFn: (id: string) => returnAsset({ data: id }),
    onSuccess: async () => {
      toast.success("Returned to stock");
      await qc.invalidateQueries();
      if (person) lookup.mutate(person.employee.id);
    },
    onError: (e) => toast.error(e.message),
  });
  const damage = useMutation({
    mutationFn: (id: string) => reportDamagedAsset({ data: id }),
    onSuccess: async () => {
      toast.success("Asset reported damaged");
      await qc.invalidateQueries();
      if (person) lookup.mutate(person.employee.id);
    },
    onError: (e) => toast.error(e.message),
  });
  const handover = useMutation({
    mutationFn: (d: { assignmentId: string; newEmployeeId: string }) => handoverAsset({ data: d }),
    onSuccess: async () => {
      toast.success("Asset handed over");
      await qc.invalidateQueries();
      if (person) lookup.mutate(person.employee.id);
    },
    onError: (e) => toast.error(e.message),
  });

  return (
    <>
      <PageHeader
        icon={<ScanLine className="size-7 text-primary" />}
        title="Check-In / Check-Out"
      />

      <section className="panel p-5 sm:p-6">
        <p className="text-sm font-semibold">1 · Name</p>
        <p className="mt-1 text-sm text-muted">
          Scan the QR on the ID card, or type a name, email or ID number.
        </p>
        <form
          className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center"
          onSubmit={(e) => {
            e.preventDefault();
            run(q);
          }}
        >
          <Button type="button" onClick={() => setScanOpen(true)}>
            <QrCode className="size-4" />
            Scan ID card
          </Button>
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Name"
            className="sm:max-w-xs"
          />
          <Button type="submit" variant="outline" disabled={lookup.isPending}>
            {lookup.isPending ? "Looking up…" : "Look up"}
          </Button>
        </form>
        {lookup.isSuccess && !person ? (
          <p className="mt-3 text-sm text-danger">No matching badge or directory record.</p>
        ) : null}
      </section>

      {person ? (
        <PersonPanel
          employee={person.employee}
          held={person.held}
          stock={person.stock}
          onReturn={(id) => ret.mutate(id)}
          onDamage={(id) => damage.mutate(id)}
          onHandover={(d) => handover.mutate(d)}
          onCheckout={(d) => checkout.mutate({ ...d, employeeId: person.employee.id })}
          busy={checkout.isPending || ret.isPending || damage.isPending || handover.isPending}
        />
      ) : null}

      <Dialog open={scanOpen} onOpenChange={setScanOpen}>
        <DialogContent
          title="Scan a lab badge"
          description="Demo badges for the IT Labs directory. Pick one to look up custody."
        >
          <div className="grid gap-2">
            {DEMO_BADGES.map((b) => (
              <button
                key={b.id}
                type="button"
                className="flex items-center gap-3 rounded-xl p-3 text-left shadow-[0_0_0_1px_var(--color-border)] hover:bg-canvas"
                onClick={() => {
                  setScanOpen(false);
                  run(b.id);
                }}
              >
                <span className="grid size-10 place-items-center rounded-lg bg-brand/20 font-mono text-xs font-semibold text-brand-ink">
                  {b.id}
                </span>
                <span>
                  <span className="block text-sm font-medium">{b.label}</span>
                  <span className="block text-xs text-muted">{b.hint}</span>
                </span>
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

function PersonPanel({
  employee,
  held,
  stock,
  onReturn,
  onDamage,
  onHandover,
  onCheckout,
  busy,
}: {
  employee: Employee;
  held: Assignment[];
  stock: Asset[];
  onReturn: (id: string) => void;
  onDamage: (id: string) => void;
  onHandover: (d: { assignmentId: string; newEmployeeId: string }) => void;
  onCheckout: (d: { assetId: string; dueBack: string; note: string }) => void;
  busy: boolean;
}) {
  const [handoverAssetId, setHandoverAssetId] = useState<string | null>(null);
  const [newEmployeeQ, setNewEmployeeQ] = useState("");
  return (
    <>
      <div className="mt-4 grid gap-4 max-w-3xl">
      <section className="panel p-5">
        <div className="flex items-start gap-3">
          <div className="grid size-12 place-items-center rounded-full bg-primary text-sm font-semibold text-primary-fg">
            {initials(employee.fullName)}
          </div>
          <div>
            <p className="font-semibold">{employee.fullName}</p>
            <p className="text-sm text-muted">{employee.title} · {employee.department}</p>
            <p className="mt-1 font-mono text-xs text-subtle">
              {employee.id} · {employee.email} · {employee.assignedCount} asset{employee.assignedCount === 1 ? '' : 's'}
            </p>
          </div>
        </div>
        <p className="mt-4 text-xs font-medium text-muted">Currently holding</p>
        <ul className="mt-2 divide-y divide-border">
          {held.length === 0 ? (
            <li className="py-4 text-sm text-muted">Nothing checked out.</li>
          ) : (
            held.map((a) => {
              const od = overdueDays(a.dueBack, a.returnedAt);
              return (
                <li key={a.id} className="flex items-center justify-between gap-3 py-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{a.assetName}</p>
                    <p className="font-mono text-xs text-muted">{a.assetTag}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {od ? <OverdueBadge days={od} /> : <StatusBadge status="assigned" />}
                    <Button size="sm" variant="outline" disabled={busy} onClick={() => setHandoverAssetId(a.id)}>
                      Handover
                    </Button>
                    <Button size="sm" variant="outline" disabled={busy} onClick={() => onDamage(a.id)}>
                      Damaged
                    </Button>
                    <Button size="sm" variant="outline" disabled={busy} onClick={() => onReturn(a.id)}>
                      Return
                    </Button>
                  </div>
                </li>
              );
            })
          )}
        </ul>
      </section>
    </div>
      <Dialog open={!!handoverAssetId} onOpenChange={(o) => { if (!o) setHandoverAssetId(null) }}>
        <DialogContent title="Handover Asset" description="Enter the ID or email of the new assignee.">
          <form
            className="flex flex-col gap-3 mt-2"
            onSubmit={async (e) => {
              e.preventDefault();
              if (!handoverAssetId || !newEmployeeQ) return;
              try {
                const res = await lookupPerson({ data: newEmployeeQ });
                if (!res) {
                  toast.error("Person not found");
                  return;
                }
                onHandover({ assignmentId: handoverAssetId, newEmployeeId: res.employee.id });
                setHandoverAssetId(null);
                setNewEmployeeQ("");
              } catch (err: any) {
                toast.error(err.message);
              }
            }}
          >
            <Input 
              placeholder="e.g. e2 or email" 
              value={newEmployeeQ} 
              onChange={(e) => setNewEmployeeQ(e.target.value)} 
            />
            <Button type="submit" disabled={busy || !newEmployeeQ}>
              Confirm Handover
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
