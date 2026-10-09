import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Briefcase, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { RequireAuth } from "@/components/require-auth";
import { PageHeader } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { StatusBadge } from "@/components/ui/badge";
import { deleteAsset, listAssets, saveAsset, suggestTag, listOnboarding, fulfillOnboardingRequest, cancelOnboardingRequest } from "@/lib/inventory/server";
import { CATEGORIES, STATUSES, type Asset, type AssetStatus } from "@/lib/inventory/types";
import { formatInr, statusLabel } from "@/lib/inventory/format";

export const Route = createFileRoute("/assets")({
  validateSearch: (s: Record<string, unknown>): { q?: string } => {
    if (typeof s.q === "string" && s.q.length > 0) return { q: s.q };
    return {};
  },
  component: Page,
});

function Page() {
  return (
    <RequireAuth role="staff">
      <Assets />
    </RequireAuth>
  );
}

function Assets() {
  const qc = useQueryClient();
  const { q: qParam } = Route.useSearch();
  const q = useQuery({ queryKey: ["assets"], queryFn: () => listAssets() });
  const ob = useQuery({ queryKey: ["onboarding"], queryFn: () => listOnboarding() });
  const [search, setSearch] = useState(qParam ?? "");
  const [cat, setCat] = useState("all");
  const [status, setStatus] = useState("all");
  const [editing, setEditing] = useState<Asset | null | "new">(null);

  useEffect(() => {
    setSearch(qParam ?? "");
  }, [qParam]);

  const rows = useMemo(() => {
    const needle = search.trim().toLowerCase();
    return (q.data ?? []).filter((a) => {
      if (a.status === "deleted") return false;
      if (cat !== "all" && a.category !== cat) return false;
      if (status !== "all" && a.status !== status) return false;
      if (!needle) return true;
      const blob = `${a.tag} ${a.name} ${a.vendor} ${a.serial} ${a.assignedToName ?? ""}`.toLowerCase();
      return blob.includes(needle);
    });
  }, [q.data, search, cat, status]);

  const deletedRows = useMemo(() => {
    return (q.data ?? []).filter((a) => a.status === "deleted");
  }, [q.data]);

  const total = (q.data ?? []).reduce((s, a) => s + a.costInr, 0);

  const del = useMutation({
    mutationFn: (id: string) => deleteAsset({ data: id }),
    onSuccess: async () => {
      toast.success("Asset removed");
      await qc.invalidateQueries();
    },
    onError: (e) => toast.error(e.message),
  });

  return (
    <>
      <PageHeader
        icon={<Briefcase className="size-7 text-primary" />}
        title="Hardware Assets"
        actions={
          <Button className="w-full sm:w-auto" asChild>
            <Link to="/intake">
              <Plus className="size-4" /> Add asset
            </Link>
          </Button>
        }
      />

      {(() => {
        const reqs = (ob.data ?? []).filter(r => r.status === "open");
        if (reqs.length === 0) return null;
        
        const ActionButtons = ({ id }: { id: string }) => {
          const qc = useQueryClient();
          const fulfillMut = useMutation({
            mutationFn: () => fulfillOnboardingRequest({ data: id }),
            onSuccess: async () => {
              toast.success("Hardware assigned from available stock");
              await qc.invalidateQueries();
            },
            onError: (e) => toast.error(e.message),
          });
          const cancelMut = useMutation({
            mutationFn: () => cancelOnboardingRequest({ data: id }),
            onSuccess: async () => {
              toast.success("Hardware request cancelled");
              await qc.invalidateQueries();
            },
            onError: (e) => toast.error(e.message),
          });
          return (
            <div className="flex justify-end gap-2">
              <Button size="sm" variant="outline" className="text-danger border-danger/30 hover:bg-danger-bg hover:text-danger" disabled={cancelMut.isPending || fulfillMut.isPending} onClick={() => cancelMut.mutate()}>
                {cancelMut.isPending ? "Cancelling..." : "Cancel"}
              </Button>
              <Button size="sm" disabled={fulfillMut.isPending || cancelMut.isPending} onClick={() => fulfillMut.mutate()}>
                {fulfillMut.isPending ? "Assigning..." : "Assign Hardware"}
              </Button>
            </div>
          );
        };

        return (
          <section className="panel overflow-hidden mb-4">
            <div className="flex items-center justify-between border-b border-border px-5 py-3 bg-warn-bg">
              <h2 className="text-sm font-semibold text-warn">Pending Requests</h2>
              <span className="rounded-full bg-warn/20 px-2 py-0.5 text-xs tabular-nums text-warn-fg">
                {reqs.length}
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] text-left text-sm">
                <thead>
                  <tr className="border-b border-border text-xs text-muted">
                    <th className="px-5 py-3 font-medium">Employee</th>
                    <th className="px-5 py-3 font-medium">Requested Hardware</th>
                    <th className="px-5 py-3 font-medium">Reason</th>
                    <th className="px-5 py-3 font-medium text-right">Action</th>
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
                      <td className="px-5 py-3 text-right">
                        <ActionButtons id={r.id} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        );
      })()}

      <div className="panel mb-4 flex flex-col gap-2 p-3 sm:flex-row">
        <div className="relative min-w-0 flex-1">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-subtle" />
          <Input
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, tag, serial, vendor…"
          />
        </div>
        <Select value={cat} onChange={(e) => setCat(e.target.value)} className="sm:w-44">
          <option value="all">All categories</option>
          {CATEGORIES.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </Select>
        <Select value={status} onChange={(e) => setStatus(e.target.value)} className="sm:w-40">
          <option value="all">All statuses</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {statusLabel(s)}
            </option>
          ))}
        </Select>
      </div>

      <div className="panel overflow-x-auto">
        <table className="w-full min-w-[960px] text-left text-sm">
          <thead>
            <tr className="border-b border-border text-xs text-muted">
              {["Tag", "Asset", "Category", "Status", "Assigned To", "Location", "Cost", "Actions"].map(
                (h) => (
                  <th key={h} className="px-4 py-3 font-medium">
                    {h}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {rows.map((a) => (
              <tr key={a.id} className="border-b border-border last:border-0">
                <td className="px-4 py-3 font-mono text-xs text-muted">{a.tag}</td>
                <td className="px-4 py-3">
                  <p className="font-medium">{a.name}</p>
                  <p className="text-xs text-muted">
                    {a.vendor} · {a.serial}
                  </p>
                </td>
                <td className="px-4 py-3">{a.category}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={a.status} />
                </td>
                <td className="px-4 py-3 text-muted">{a.assignedToName ?? "—"}</td>
                <td className="px-4 py-3 text-muted">{a.location}</td>
                <td className="px-4 py-3 tabular-nums">{formatInr(a.costInr)}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      className="grid size-8 place-items-center rounded-md text-muted hover:bg-canvas hover:text-fg"
                      onClick={() => setEditing(a)}
                      aria-label="Edit"
                    >
                      <Pencil className="size-4" />
                    </button>
                    <button
                      type="button"
                      className="grid size-8 place-items-center rounded-md text-muted hover:bg-danger-bg hover:text-danger"
                      onClick={() => {
                        if (confirm(`Remove ${a.tag}?`)) del.mutate(a.id);
                      }}
                      aria-label="Delete"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {rows.length === 0 ? (
          <p className="py-10 text-center text-sm text-muted">No assets match those filters.</p>
        ) : null}
      </div>

      {deletedRows.length > 0 && (
        <section className="panel mt-8 overflow-hidden">
          <div className="flex items-center justify-between border-b border-border px-5 py-4 bg-danger/10">
            <h2 className="text-sm font-semibold text-danger">Deleted Assets</h2>
            <span className="rounded-full bg-danger/20 px-2 py-0.5 text-xs tabular-nums text-danger">
              {deletedRows.length}
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead>
                <tr className="border-b border-border text-xs text-muted">
                  <th className="px-5 py-3 font-medium">Tag</th>
                  <th className="px-5 py-3 font-medium">Asset</th>
                  <th className="px-5 py-3 font-medium">Category</th>
                  <th className="px-5 py-3 font-medium">Cost</th>
                </tr>
              </thead>
              <tbody>
                {deletedRows.map((a) => (
                  <tr key={a.id} className="border-b border-border last:border-0 opacity-70">
                    <td className="px-5 py-3 font-mono text-xs text-muted">{a.tag}</td>
                    <td className="px-5 py-3">
                      <p className="font-medium text-muted-fg">{a.name}</p>
                      <p className="text-xs text-muted">
                        {a.vendor} · {a.serial}
                      </p>
                    </td>
                    <td className="px-5 py-3 text-muted-fg">{a.category}</td>
                    <td className="px-5 py-3 tabular-nums text-muted-fg">{formatInr(a.costInr)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {editing !== null ? (
        <AssetDialog
          key={editing === "new" ? "new" : editing.id}
          asset={editing === "new" ? null : editing}
          onClose={() => setEditing(null)}
          onSaved={async () => {
            setEditing(null);
            await qc.invalidateQueries();
          }}
        />
      ) : null}
    </>
  );
}

function AssetDialog({
  asset,
  onClose,
  onSaved,
}: {
  asset: Asset | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [tag, setTag] = useState(asset?.tag ?? "");
  const [name, setName] = useState(asset?.name ?? "");
  const [vendor, setVendor] = useState(asset?.vendor ?? "");
  const [serial, setSerial] = useState(asset?.serial ?? "");
  const [category, setCategory] = useState(asset?.category ?? "Laptop");
  const [status, setStatus] = useState<AssetStatus>(asset?.status ?? "in_stock");
  const [location, setLocation] = useState(asset?.location ?? "Storage A");
  const [cost, setCost] = useState(asset ? String(asset.costInr) : "");
  const [warranty, setWarranty] = useState(asset?.warrantyUntil ?? "");
  const isNew = !asset;

  const save = useMutation({
    mutationFn: () =>
      saveAsset({
        data: {
          id: asset?.id,
          tag,
          name,
          vendor,
          serial,
          category,
          status,
          location,
          costInr: Number(cost) || 0,
          warrantyUntil: warranty || null,
        },
      }),
    onSuccess: () => {
      toast.success(isNew ? "Asset added" : "Asset updated");
      onSaved();
    },
    onError: (e) => toast.error(e.message),
  });

  async function onCategory(c: string) {
    setCategory(c);
    if (isNew && !tag) {
      const next = await suggestTag({ data: c });
      setTag(next);
    }
  }

  return (
    <Dialog open onOpenChange={(v) => !v && onClose()}>
      <DialogContent title={isNew ? "Add asset" : "Edit asset"} description="Tags should be unique across the lab.">
        <form
          className="grid gap-3 sm:grid-cols-2"
          onSubmit={(e) => {
            e.preventDefault();
            save.mutate();
          }}
        >
          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted">Tag</label>
            <Input value={tag} onChange={(e) => setTag(e.target.value)} required placeholder="LAP-0005" />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted">Name</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted">Vendor</label>
            <Input value={vendor} onChange={(e) => setVendor(e.target.value)} />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted">Serial</label>
            <Input value={serial} onChange={(e) => setSerial(e.target.value)} />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted">Category</label>
            <Select value={category} onChange={(e) => void onCategory(e.target.value)}>
              {CATEGORIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </Select>
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted">Status</label>
            <Select value={status} onChange={(e) => setStatus(e.target.value as AssetStatus)}>
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {statusLabel(s)}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted">Location</label>
            <Input value={location} onChange={(e) => setLocation(e.target.value)} />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted">Cost (₹)</label>
            <Input inputMode="numeric" value={cost} onChange={(e) => setCost(e.target.value)} />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-xs font-medium text-muted">Warranty until</label>
            <Input type="date" value={warranty} onChange={(e) => setWarranty(e.target.value)} />
          </div>
          <div className="flex justify-end gap-2 sm:col-span-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={save.isPending}>
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
