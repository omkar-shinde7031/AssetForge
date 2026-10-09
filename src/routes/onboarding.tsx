import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ClipboardList, UserPlus } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { RequireAuth } from "@/components/require-auth";
import { PageHeader } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { StatusBadge } from "@/components/ui/badge";
import { listEmployees, listOnboarding, stockByCategory, submitOnboarding } from "@/lib/inventory/server";
import { CATEGORIES, DEPARTMENTS, JOB_ROLES, STARTER_KITS } from "@/lib/inventory/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/onboarding")({ component: Page });

function Page() {
  return (
    <RequireAuth role="staff">
      <Onboarding />
    </RequireAuth>
  );
}

function Onboarding() {
  const qc = useQueryClient();
  const stock = useQuery({ queryKey: ["stock-cat"], queryFn: () => stockByCategory() });
  const employees = useQuery({ queryKey: ["employees"], queryFn: () => listEmployees() });
  const reqs = useQuery({ queryKey: ["onboarding"], queryFn: () => listOnboarding() });
  const open = (reqs.data ?? []).filter((r) => r.status !== "fulfilled").length;

  const [kind, setKind] = useState<"new_joiner" | "existing" | "lab_assistant">("new_joiner");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("Engineering");
  const [jobRole, setJobRole] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [needed, setNeeded] = useState<string[]>([]);
  const [justification, setJustification] = useState("Needs 32GB RAM for local builds");
  const [auto, setAuto] = useState(true);

  const [opts, setOpts] = useState({
    monitorCount: "none",
    monitorSize: "24\"",
    monitorType: "standard",
    keyboard: "standard, wired",
    mouse: "standard, wired",
    trackpad: "none",
    headset: "none",
    webcam: "none",
    speaker: "none",
    docking: "none",
    stand: "none",
    charger: "none",
    drive: "none",
    bag: "none",
    phone: "none",
  });

  const kit = useMemo(() => STARTER_KITS[jobRole] ?? [], [jobRole]);

  const submit = useMutation({
    mutationFn: () => {
      const details = [
        `Display: ${opts.monitorCount} monitor(s) / ${opts.monitorSize} / ${opts.monitorType}`,
        `Input: KB: ${opts.keyboard} / Mouse: ${opts.mouse} / Trackpad: ${opts.trackpad}`,
        `Audio/Video: Headset: ${opts.headset} / Webcam: ${opts.webcam} / Speaker: ${opts.speaker}`,
        `Accessories: Dock: ${opts.docking} / Stand: ${opts.stand} / Charger: ${opts.charger} / Drive: ${opts.drive} / Bag: ${opts.bag}`,
        `Mobile: ${opts.phone}`
      ].join("\n");
      const combined = justification ? `${justification}\n\n${details}` : details;

      return submitOnboarding({
        data: {
          kind,
          employeeId: kind === "existing" ? employeeId : undefined,
          fullName,
          email,
          department,
          jobRole,
          hardwareNeeded: needed.length ? needed : kit,
          justification: combined,
          autoAllocate: auto,
        },
      });
    },
    onSuccess: async (r) => {
      toast.success(
        r.status === "fulfilled"
          ? "Kit allocated from live stock"
          : r.allocated
            ? `Partial kit allocated (${r.allocated})`
            : "Request saved — waiting on stock",
      );
      await qc.invalidateQueries();
    },
    onError: (e) => toast.error(e.message),
  });

  function toggle(cat: string) {
    setNeeded((xs) => (xs.includes(cat) ? xs.filter((c) => c !== cat) : [...xs, cat]));
  }

  const selected = needed.length ? needed : kit;

  return (
    <>
      <PageHeader
        icon={<ClipboardList className="size-7 text-primary" />}
        title="Onboarding Requests"
      />

      <section className="panel p-5 sm:p-6">
        <h2 className="text-sm font-semibold">Requirement request</h2>


        <div className="mt-4 inline-flex flex-wrap rounded-xl bg-canvas p-1 shadow-[0_0_0_1px_var(--color-border)] gap-1">
          <button
            type="button"
            className={cn(
              "flex h-9 items-center gap-1.5 rounded-lg px-3 text-sm font-medium",
              kind === "new_joiner" ? "bg-surface text-fg shadow-sm" : "text-muted",
            )}
            onClick={() => setKind("new_joiner")}
          >
            <UserPlus className="size-3.5" />
            New joiner
          </button>
          <button
            type="button"
            className={cn(
              "h-9 rounded-lg px-3 text-sm font-medium",
              kind === "lab_assistant" ? "bg-surface text-fg shadow-sm" : "text-muted",
            )}
            onClick={() => setKind("lab_assistant")}
          >
            Lab assistant
          </button>
          <button
            type="button"
            className={cn(
              "h-9 rounded-lg px-3 text-sm font-medium",
              kind === "existing" ? "bg-surface text-fg shadow-sm" : "text-muted",
            )}
            onClick={() => setKind("existing")}
          >
            Existing employee
          </button>
        </div>

        {kind === "existing" ? (
          <div className="mt-4">
            <label className="mb-1.5 block text-xs font-medium text-muted">Employee</label>
            <Select
              value={employeeId}
              onChange={(e) => {
                const id = e.target.value;
                setEmployeeId(id);
                const emp = employees.data?.find((x) => x.id === id);
                if (emp) {
                  setFullName(emp.fullName);
                  setEmail(emp.email);
                  setDepartment(emp.department);
                  setJobRole(emp.title);
                }
              }}
            >
              <option value="">Select employee</option>
              {(employees.data ?? []).map((e) => (
                <option key={e.id} value={e.id}>
                  {e.fullName} · {e.email}
                </option>
              ))}
            </Select>
          </div>
        ) : (
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted">Full name</label>
              <Input value={fullName} onChange={(e) => setFullName(e.target.value)} />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted">Email</label>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted">Department</label>
              <Select value={department} onChange={(e) => setDepartment(e.target.value)}>
                {DEPARTMENTS.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </Select>
            </div>
            {kind !== "lab_assistant" && (
              <div>
                <label className="mb-1.5 block text-xs font-medium text-muted">
                  Job role (auto-fills a starter kit)
                </label>
                <Select
                  value={jobRole}
                  onChange={(e) => {
                    setJobRole(e.target.value);
                    setNeeded([]);
                  }}
                >
                  <option value="">Select role</option>
                  {JOB_ROLES.map((r) => (
                    <option key={r}>{r}</option>
                  ))}
                </Select>
              </div>
            )}
          </div>
        )}

        <p className="mt-4 mb-1.5 text-xs font-medium text-muted">Hardware needed</p>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => {
            const free = stock.data?.[c] ?? 0;
            const on = selected.includes(c);
            return (
              <button
                key={c}
                type="button"
                onClick={() => toggle(c)}
                className={cn(
                  "h-8 rounded-full px-3 text-xs font-medium shadow-[0_0_0_1px_var(--color-border)]",
                  on ? "bg-primary text-primary-fg shadow-none" : "bg-surface text-muted hover:text-fg",
                )}
              >
                {c} · {free} free
              </button>
            );
          })}
        </div>

        <div className="mt-6 space-y-6">
          <div>
            <h3 className="text-sm font-semibold mb-2">2. Display</h3>
            <div className="grid gap-3 sm:grid-cols-3">
              <div>
                <label className="mb-1 block text-xs font-medium text-muted">Monitor</label>
                <Select value={opts.monitorCount} onChange={e => setOpts({...opts, monitorCount: e.target.value})}>
                  <option value="none">None</option>
                  <option value="single">Single</option>
                  <option value="dual">Dual</option>
                </Select>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-muted">Monitor size</label>
                <Select value={opts.monitorSize} onChange={e => setOpts({...opts, monitorSize: e.target.value})}>
                  <option value='24"'>24"</option>
                  <option value='27"'>27"</option>
                  <option value='32"'>32"</option>
                </Select>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-muted">Monitor type</label>
                <Select value={opts.monitorType} onChange={e => setOpts({...opts, monitorType: e.target.value})}>
                  <option value="standard">Standard</option>
                  <option value="ultrawide">Ultrawide</option>
                  <option value="4K">High-resolution (4K)</option>
                </Select>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-2">3. Input devices</h3>
            <div className="grid gap-3 sm:grid-cols-3">
              <div>
                <label className="mb-1 block text-xs font-medium text-muted">Keyboard</label>
                <Select value={opts.keyboard} onChange={e => setOpts({...opts, keyboard: e.target.value})}>
                  <option value="standard, wired">Standard, Wired</option>
                  <option value="standard, wireless">Standard, Wireless</option>
                  <option value="ergonomic, wired">Ergonomic, Wired</option>
                  <option value="ergonomic, wireless">Ergonomic, Wireless</option>
                </Select>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-muted">Mouse</label>
                <Select value={opts.mouse} onChange={e => setOpts({...opts, mouse: e.target.value})}>
                  <option value="standard, wired">Standard, Wired</option>
                  <option value="standard, wireless">Standard, Wireless</option>
                  <option value="ergonomic, wired">Ergonomic, Wired</option>
                  <option value="ergonomic, wireless">Ergonomic, Wireless</option>
                </Select>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-muted">Trackpad/Tablet</label>
                <Select value={opts.trackpad} onChange={e => setOpts({...opts, trackpad: e.target.value})}>
                  <option value="none">None</option>
                  <option value="trackpad">Trackpad</option>
                  <option value="drawing tablet">Drawing Tablet</option>
                </Select>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-2">4. Audio and video</h3>
            <div className="grid gap-3 sm:grid-cols-3">
              <div>
                <label className="mb-1 block text-xs font-medium text-muted">Headset</label>
                <Select value={opts.headset} onChange={e => setOpts({...opts, headset: e.target.value})}>
                  <option value="none">None</option>
                  <option value="wired">Wired</option>
                  <option value="wireless">Wireless</option>
                  <option value="noise-cancelling">Noise-cancelling</option>
                </Select>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-muted">Webcam</label>
                <Select value={opts.webcam} onChange={e => setOpts({...opts, webcam: e.target.value})}>
                  <option value="none">None</option>
                  <option value="standard">Standard</option>
                  <option value="high-res">High-res</option>
                </Select>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-muted">Speaker/Mic</label>
                <Select value={opts.speaker} onChange={e => setOpts({...opts, speaker: e.target.value})}>
                  <option value="none">None</option>
                  <option value="speaker">External Speaker</option>
                  <option value="mic">External Microphone</option>
                  <option value="both">Both</option>
                </Select>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-2">5. Connectivity & accessories</h3>
            <div className="grid gap-3 sm:grid-cols-3">
              <div>
                <label className="mb-1 block text-xs font-medium text-muted">Docking/Hub</label>
                <Select value={opts.docking} onChange={e => setOpts({...opts, docking: e.target.value})}>
                  <option value="none">None</option>
                  <option value="dock">Docking Station</option>
                  <option value="usb-c hub">USB-C Hub</option>
                </Select>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-muted">Laptop stand</label>
                <Select value={opts.stand} onChange={e => setOpts({...opts, stand: e.target.value})}>
                  <option value="none">None</option>
                  <option value="yes">Yes</option>
                </Select>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-muted">Spare charger</label>
                <Select value={opts.charger} onChange={e => setOpts({...opts, charger: e.target.value})}>
                  <option value="none">None</option>
                  <option value="yes">Yes</option>
                </Select>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-muted">External drive</label>
                <Select value={opts.drive} onChange={e => setOpts({...opts, drive: e.target.value})}>
                  <option value="none">None</option>
                  <option value="hard drive">External Hard Drive</option>
                  <option value="usb">USB Drive</option>
                </Select>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-muted">Bag</label>
                <Select value={opts.bag} onChange={e => setOpts({...opts, bag: e.target.value})}>
                  <option value="none">None</option>
                  <option value="laptop bag">Laptop Bag</option>
                  <option value="backpack">Backpack</option>
                </Select>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-2">6. Mobile devices</h3>
            <div className="grid gap-3 sm:grid-cols-3">
              <div>
                <label className="mb-1 block text-xs font-medium text-muted">Company phone</label>
                <Select value={opts.phone} onChange={e => setOpts({...opts, phone: e.target.value})}>
                  <option value="none">None (BYOD)</option>
                  <option value="android">Android</option>
                  <option value="iphone">iPhone</option>
                </Select>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <label className="mb-1.5 block text-xs font-medium text-muted">Justification / notes</label>
          <Textarea value={justification} onChange={(e) => setJustification(e.target.value)} />
        </div>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={auto}
              onChange={(e) => setAuto(e.target.checked)}
              className="size-4 accent-primary"
            />
            Auto-allocate immediately
          </label>
          <Button type="button" disabled={submit.isPending} onClick={() => submit.mutate()}>
            Submit requirement
          </Button>
        </div>
      </section>

      <section className="panel mt-4 p-5">
        {(reqs.data ?? []).length === 0 ? (
          <p className="py-8 text-center text-sm text-muted">
            No requests yet. Submit a new joiner's requirement above to auto-allocate their kit.
          </p>
        ) : (
          <ul className="divide-y divide-border">
            {(reqs.data ?? []).map((r) => (
              <li key={r.id} className="flex flex-wrap items-start justify-between gap-3 py-3">
                <div>
                  <p className="text-sm font-medium">{r.fullName}</p>
                  <p className="text-xs text-muted">
                    {r.email} · {r.department} · {r.jobRole || "No role"}
                  </p>
                  <p className="mt-1 text-xs text-subtle">{r.hardwareNeeded.join(", ") || "No hardware listed"}</p>
                </div>
                <StatusBadge status={r.status} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
