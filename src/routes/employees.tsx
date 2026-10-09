import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus, Trash2, Users } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { RequireAuth } from "@/components/require-auth";
import { PageHeader } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { deleteEmployee, listEmployees, saveEmployee, listOnboarding } from "@/lib/inventory/server";
import { DEPARTMENTS, JOB_ROLES } from "@/lib/inventory/types";
import { initials } from "@/lib/utils";

export const Route = createFileRoute("/employees")({ component: Page });

function Page() {
  return (
    <RequireAuth role="staff">
      <Employees />
    </RequireAuth>
  );
}

function Employees() {
  const qc = useQueryClient();
  const q = useQuery({ queryKey: ["employees"], queryFn: () => listEmployees() });
  const ob = useQuery({ queryKey: ["onboarding"], queryFn: () => listOnboarding() });
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("Software Engineer");
  const [department, setDepartment] = useState("Engineering");

  const save = useMutation({
    mutationFn: () => saveEmployee({ data: { fullName: name, email, title, department } }),
    onSuccess: async () => {
      toast.success("Employee added");
      setOpen(false);
      setName("");
      setEmail("");
      await qc.invalidateQueries();
    },
    onError: (e) => toast.error(e.message),
  });

  const del = useMutation({
    mutationFn: (id: string) => deleteEmployee({ data: id }),
    onSuccess: async () => {
      toast.success("Removed");
      await qc.invalidateQueries();
    },
    onError: (e) => toast.error(e.message),
  });

  return (
    <>
      <PageHeader
        icon={<Users className="size-7 text-primary" />}
        title="Employees"
        actions={
          <Button onClick={() => setOpen(true)}>
            <Plus className="size-4" /> Add employee
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {(q.data ?? []).map((e) => (
          <article key={e.id} className="panel p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <div className="grid size-11 shrink-0 place-items-center rounded-full bg-primary text-sm font-semibold text-primary-fg">
                  {initials(e.fullName)}
                </div>
                <div className="min-w-0">
                  <p className="truncate font-semibold">{e.fullName}</p>
                  <p className="truncate text-xs text-muted">{e.title}</p>
                </div>
              </div>
              <button
                type="button"
                className="grid size-8 place-items-center rounded-md text-subtle hover:bg-danger-bg hover:text-danger"
                onClick={() => {
                  if (confirm(`Remove ${e.fullName} from the directory?`)) del.mutate(e.id);
                }}
                aria-label={`Remove ${e.fullName}`}
              >
                <Trash2 className="size-4" />
              </button>
            </div>
            <p className="mt-4 truncate text-sm text-muted">{e.email}</p>
            <Badge className="mt-2 bg-canvas text-muted">{e.department}</Badge>
            <div className="mt-4 flex items-center justify-between rounded-lg bg-canvas px-3 py-2 text-sm">
              <span className="text-muted">Assigned assets</span>
              <span className="tabular-nums font-medium">{e.assignedCount}</span>
            </div>
            {(() => {
              const reqs = (ob.data ?? []).filter(r => r.status === "open" && r.employeeId === e.id);
              if (reqs.length === 0) return null;
              return (
                <div className="mt-2 rounded-lg border border-warn/30 bg-warn-bg px-3 py-2 text-sm text-warn-fg">
                  <span className="font-semibold text-warn">Pending Request:</span>{" "}
                  {reqs.flatMap(r => r.hardwareNeeded).join(", ")}
                </div>
              );
            })()}
          </article>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent title="Add employee" description="People here can be looked up at check-in.">
          <form
            className="space-y-3"
            onSubmit={(e) => {
              e.preventDefault();
              save.mutate();
            }}
          >
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted">Full name</label>
              <Input value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted">Email</label>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted">Job role</label>
              <Select value={title} onChange={(e) => setTitle(e.target.value)}>
                {JOB_ROLES.map((r) => (
                  <option key={r}>{r}</option>
                ))}
              </Select>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted">Department</label>
              <Select value={department} onChange={(e) => setDepartment(e.target.value)}>
                {DEPARTMENTS.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </Select>
            </div>
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={save.isPending}>
                Add
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
