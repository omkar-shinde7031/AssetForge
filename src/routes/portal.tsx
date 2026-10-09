import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Package, Send, ClipboardList, UserPlus } from "lucide-react";
import { useState, useMemo } from "react";
import { toast } from "sonner";
import { RequireAuth } from "@/components/require-auth";
import { Button } from "@/components/ui/button";
import { Textarea, Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { OverdueBadge, StatusBadge } from "@/components/ui/badge";
import { getMyKit, stockByCategory, submitSelfRequest, listEmployees, submitOnboarding, listOnboarding } from "@/lib/inventory/server";
import { CATEGORIES, DEPARTMENTS, JOB_ROLES, STARTER_KITS } from "@/lib/inventory/types";
import { formatStamp, overdueDays } from "@/lib/inventory/format";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/portal")({ component: Page });

function Page() {
  return (
    <RequireAuth preferredRole="employee">
      <PortalHome />
    </RequireAuth>
  );
}

function PortalHome() {
  const qc = useQueryClient();
  const kit = useQuery({ queryKey: ["my-kit"], queryFn: () => getMyKit() });
  const stock = useQuery({ queryKey: ["stock-cat"], queryFn: () => stockByCategory() });
  const data = kit.data;
  const [needed, setNeeded] = useState<string[]>([]);
  const [note, setNote] = useState("");

  const req = useMutation({
    mutationFn: () =>
      submitSelfRequest({ data: { hardwareNeeded: needed, justification: note } }),
    onSuccess: async () => {
      toast.success("Request sent to IT");
      setNeeded([]);
      setNote("");
      await qc.invalidateQueries();
    },
    onError: (e) => toast.error(e.message),
  });

  const employees = useQuery({ queryKey: ["employees"], queryFn: () => listEmployees() });
  const reqs = useQuery({ queryKey: ["onboarding"], queryFn: () => listOnboarding() });
  const open = (reqs.data ?? []).filter((r) => r.status !== "fulfilled").length;

  const [kind, setKind] = useState<"new_joiner" | "existing">("new_joiner");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("Engineering");
  const [jobRole, setJobRole] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [obNeeded, setObNeeded] = useState<string[]>([]);
  const [justification, setJustification] = useState("");
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

  const obKit = useMemo(() => STARTER_KITS[jobRole] ?? [], [jobRole]);

  const submitOb = useMutation({
    mutationFn: () => {
      const details = [
        `Display: ${opts.monitorCount} monitor(s) / ${opts.monitorSize} / ${opts.monitorType}`,
        `Input: KB: ${opts.keyboard} / Mouse: ${opts.mouse} / Trackpad: ${opts.trackpad}`,
        `Audio/Video: Headset: ${opts.headset} / Webcam: ${opts.webcam} / Speaker: ${opts.speaker}`,
        `Accessories: Dock: ${opts.docking} / Stand: ${opts.stand} / Charger: ${opts.charger} / Drive: ${opts.drive} / Bag: ${opts.bag}`,
        `Mobile: ${opts.phone}`
      ].join("\n");
      const combined = justification ? `${justification}\n\n${details}` : details;

      return submitSelfRequest({
        data: {
          hardwareNeeded: obNeeded.length ? obNeeded : obKit,
          justification: combined,
        },
      });
    },
    onSuccess: async () => {
      toast.success("Request sent to IT");
      await qc.invalidateQueries();
      setJustification("");
    },
    onError: (e) => toast.error(e.message),
  });

  function toggleOb(cat: string) {
    setObNeeded((xs) => (xs.includes(cat) ? xs.filter((c) => c !== cat) : [...xs, cat]));
  }

  const selectedOb = obNeeded.length ? obNeeded : obKit;

  if (data?.profile.role === "staff" && !data.employee) {
    return (
      <div className="panel mx-auto max-w-lg p-8 text-center">
        <h1 className="font-display text-2xl font-semibold">You're on the staff side</h1>
        <p className="mt-2 text-sm text-muted">
          Lab assistants manage inventory from the console. Employee kit view is for people who hold
          hardware.
        </p>
        <Button className="mt-6" asChild>
          <Link to="/">Open staff console</Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="mb-6">
        <p className="text-sm text-muted">Your kit</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight">
          {data?.employee?.fullName ?? data?.profile.displayName ?? "Employee"}
        </h1>
        <p className="mt-1 text-sm text-muted">
          {data?.employee?.title} · {data?.employee?.department}
        </p>
      </div>

      <section className="panel p-5">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-sm font-semibold">
            <Package className="size-4 text-primary" /> Assigned hardware
          </h2>
          <span className="text-xs text-muted">{data?.held.length ?? 0} items</span>
        </div>
        {(data?.held ?? []).length === 0 ? (
          <p className="py-8 text-center text-sm text-muted">Nothing checked out to you yet.</p>
        ) : (
          <ul className="divide-y divide-border">
            {(data?.held ?? []).map((a) => {
              const od = overdueDays(a.dueBack, a.returnedAt);
              return (
                <li key={a.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
                  <div>
                    <p className="font-medium">{a.assetName}</p>
                    <p className="font-mono text-xs text-muted">
                      {a.assetTag} · since {a.assignedAt}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {od ? <OverdueBadge days={od} /> : <StatusBadge status="assigned" />}
                    {a.dueBack ? <span className="text-xs text-muted">due {a.dueBack}</span> : null}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>



      <div className="mt-8 mb-4">
        <h1 className="font-display flex items-center gap-2 text-2xl font-semibold">
          <ClipboardList className="size-6 text-primary" /> Onboarding Requests
        </h1>
        <p className="mt-1 text-sm text-muted">
          {open} open request{open === 1 ? "" : "s"} · requirements are matched against live hardware stock.
        </p>
      </div>

      <section className="panel p-5 sm:p-6">
        <h2 className="text-sm font-semibold">Requirement request</h2>
        <p className="mt-1 text-sm text-muted">
          New joiner states what they need — the system matches it against live hardware stock.
        </p>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted">Department</label>
              <Select value={department} onChange={(e) => setDepartment(e.target.value)}>
                {DEPARTMENTS.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </Select>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted">
                Job role (auto-fills a starter kit)
              </label>
              <Select
                value={jobRole}
                onChange={(e) => {
                  setJobRole(e.target.value);
                  setObNeeded([]);
                }}
              >
                <option value="">Select role</option>
                {JOB_ROLES.map((r) => (
                  <option key={r}>{r}</option>
                ))}
              </Select>
            </div>
          </div>

        <p className="mt-4 mb-1.5 text-xs font-medium text-muted">Hardware needed</p>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => {
            const free = stock.data?.[c] ?? 0;
            const on = selectedOb.includes(c);
            return (
              <button
                key={c}
                type="button"
                onClick={() => toggleOb(c)}
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
          <Button type="button" disabled={submitOb.isPending} onClick={() => submitOb.mutate()}>
            Submit requirement
          </Button>
        </div>
      </section>

      <section className="panel mt-4 p-5">
        <h2 className="text-sm font-semibold">Recent activity</h2>
        {(data?.events ?? []).length === 0 ? (
          <p className="mt-4 text-sm text-muted">No events on your kit yet.</p>
        ) : (
          <ul className="mt-2 divide-y divide-border">
            {(data?.events ?? []).map((e) => (
              <li key={e.id} className="py-3 text-sm">
                <p className="font-medium">{e.summary}</p>
                <p className="text-xs text-muted">{formatStamp(e.createdAt)}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
