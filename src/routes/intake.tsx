import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PackagePlus, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { RequireAuth } from "@/components/require-auth";
import { PageHeader } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { listIntake, receiveIntake } from "@/lib/inventory/server";
import { CATEGORIES } from "@/lib/inventory/types";
import { formatStamp } from "@/lib/inventory/format";

export const Route = createFileRoute("/intake")({ component: Page });

function Page() {
  return (
    <RequireAuth role="staff">
      <Intake />
    </RequireAuth>
  );
}

type Line = {
  name: string;
  category: string;
  serial: string;
  costInr: string;
  location: string;
  warrantyUntil: string;
};

const emptyLine = (): Line => ({
  name: "",
  category: "Laptop",
  serial: "",
  costInr: "",
  location: "Storage A",
  warrantyUntil: "",
});

function Intake() {
  const qc = useQueryClient();
  const lots = useQuery({ queryKey: ["intake"], queryFn: () => listIntake() });
  const [vendor, setVendor] = useState("");
  const [packing, setPacking] = useState("");
  const [notes, setNotes] = useState("");

  const [opts, setOpts] = useState({
    monitorCount: "none",
    monitorSize: "24\"",
    monitorType: "standard",
    keyboard: "none",
    mouse: "none",
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

  const receive = useMutation({
    mutationFn: () => {
      const parsedItems: any[] = [];
      const add = (name: string, category: string, qty: number = 1, costInr: number = 5000) => {
        for(let i = 0; i < qty; i++) {
          parsedItems.push({
            name,
            category,
            serial: "",
            costInr,
            location: "Storage A",
            warrantyUntil: null
          });
        }
      }

      if (opts.monitorCount !== "none") {
        add(`Monitor ${opts.monitorSize} ${opts.monitorType}`, "Monitor", opts.monitorCount === "dual" ? 2 : 1, 15000);
      }
      if (opts.keyboard !== "none") add(`Keyboard ${opts.keyboard}`, "Peripheral", 1, 2500);
      if (opts.mouse !== "none") add(`Mouse ${opts.mouse}`, "Peripheral", 1, 1500);
      if (opts.trackpad !== "none") add(`Trackpad/Tablet ${opts.trackpad}`, "Peripheral", 1, 8000);
      if (opts.headset !== "none") add(`Headset ${opts.headset}`, "Peripheral", 1, 4000);
      if (opts.webcam !== "none") add(`Webcam ${opts.webcam}`, "Peripheral", 1, 6000);
      if (opts.speaker !== "none") add(`Audio ${opts.speaker}`, "Peripheral", 1, 5000);
      if (opts.docking !== "none") add(`Docking/Hub ${opts.docking}`, "Peripheral", 1, 12000);
      if (opts.stand !== "none") add(`Laptop Stand`, "Peripheral", 1, 3000);
      if (opts.charger !== "none") add(`Spare Charger`, "Peripheral", 1, 4500);
      if (opts.drive !== "none") add(`Drive ${opts.drive}`, "SSD", 1, 8000);
      if (opts.bag !== "none") add(`Bag ${opts.bag}`, "Peripheral", 1, 2000);
      if (opts.phone !== "none") add(`Phone ${opts.phone}`, "Peripheral", 1, 50000);

      return receiveIntake({
        data: {
          vendor,
          packingRef: packing,
          notes,
          items: parsedItems,
        },
      });
    },
    onSuccess: async (r) => {
      toast.success(`Received ${r.count} item${r.count === 1 ? "" : "s"} into stock`);
      setVendor("");
      setPacking("");
      setNotes("");
      setOpts({
        monitorCount: "none",
        monitorSize: "24\"",
        monitorType: "standard",
        keyboard: "none",
        mouse: "none",
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
      await qc.invalidateQueries();
    },
    onError: (e) => toast.error(e.message),
  });

  return (
    <>
      <PageHeader
        icon={<PackagePlus className="size-7 text-primary" />}
        title="Intake Panel"
      />

      <section className="panel p-5 sm:p-6">
        <h2 className="text-sm font-semibold">New receipt</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted">Vendor</label>
            <Input value={vendor} onChange={(e) => setVendor(e.target.value)} placeholder="Vendor" />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted">Packing slip / PO</label>
            <Input value={packing} onChange={(e) => setPacking(e.target.value)} placeholder="Packing slip / PO" />
          </div>
        </div>
        <div className="mt-3">
          <label className="mb-1.5 block text-xs font-medium text-muted">Notes</label>
          <Input value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Notes" />
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
                  <option value="none">None</option>
                  <option value="standard, wired">Standard, Wired</option>
                  <option value="standard, wireless">Standard, Wireless</option>
                  <option value="ergonomic, wired">Ergonomic, Wired</option>
                  <option value="ergonomic, wireless">Ergonomic, Wireless</option>
                </Select>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-muted">Mouse</label>
                <Select value={opts.mouse} onChange={e => setOpts({...opts, mouse: e.target.value})}>
                  <option value="none">None</option>
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
                  <option value="none">None</option>
                  <option value="android">Android</option>
                  <option value="iphone">iPhone</option>
                </Select>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <Button type="button" disabled={receive.isPending} onClick={() => receive.mutate()}>
            Receive into stock
          </Button>
        </div>
      </section>

      <section className="panel mt-4 p-5">
        <h2 className="text-sm font-semibold">Recent receipts</h2>
        {(lots.data ?? []).length === 0 ? (
          <p className="mt-4 text-sm text-muted">No intake lots yet.</p>
        ) : (
          <ul className="mt-3 divide-y divide-border">
            {(lots.data ?? []).map((lot) => (
              <li key={lot.id} className="flex flex-wrap items-center justify-between gap-2 py-3 text-sm">
                <div>
                  <p className="font-medium">{lot.vendor}</p>
                  <p className="text-xs text-muted">
                    {lot.packingRef || "No packing ref"} · {lot.itemCount} items · {lot.receivedBy}
                  </p>
                </div>
                <span className="text-xs text-subtle">{formatStamp(lot.createdAt)}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
