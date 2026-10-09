import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as formatInr, f as statusLabel } from "./format-D7enopbo.mjs";
import { a as STATUSES, t as CATEGORIES } from "./types-CU6PpdZ1.mjs";
import { C as Briefcase, l as Search, m as Pencil, o as Trash2, p as Plus } from "../_libs/lucide-react.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { r as Route$10 } from "./router-BYz0bZbH.mjs";
import { i as Input, t as Button } from "./button-YfIMXCFs.mjs";
import { T as suggestTag, a as deleteAsset, b as saveAsset, d as listAssets, n as PageHeader, r as RequireAuth } from "./require-auth-w5D_tWDt.mjs";
import { t as Select } from "./select-e5mMcd1z.mjs";
import { n as DialogContent, t as Dialog } from "./dialog-BhWWDYc8.mjs";
import { r as StatusBadge } from "./badge-BzQb7lhS.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/assets-BGtJq_9Q.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Page() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireAuth, {
		role: "staff",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Assets, {})
	});
}
function Assets() {
	const qc = useQueryClient();
	const { q: qParam } = Route$10.useSearch();
	const q = useQuery({
		queryKey: ["assets"],
		queryFn: () => listAssets()
	});
	const [search, setSearch] = (0, import_react.useState)(qParam ?? "");
	const [cat, setCat] = (0, import_react.useState)("all");
	const [status, setStatus] = (0, import_react.useState)("all");
	const [editing, setEditing] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		setSearch(qParam ?? "");
	}, [qParam]);
	const rows = (0, import_react.useMemo)(() => {
		const needle = search.trim().toLowerCase();
		return (q.data ?? []).filter((a) => {
			if (cat !== "all" && a.category !== cat) return false;
			if (status !== "all" && a.status !== status) return false;
			if (!needle) return true;
			return `${a.tag} ${a.name} ${a.vendor} ${a.serial} ${a.assignedToName ?? ""}`.toLowerCase().includes(needle);
		});
	}, [
		q.data,
		search,
		cat,
		status
	]);
	const total = (q.data ?? []).reduce((s, a) => s + a.costInr, 0);
	const del = useMutation({
		mutationFn: (id) => deleteAsset({ data: id }),
		onSuccess: async () => {
			toast.success("Asset removed");
			await qc.invalidateQueries();
		},
		onError: (e) => toast.error(e.message)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Briefcase, { className: "size-7 text-primary" }),
			title: "Hardware Assets",
			subtitle: `${q.data?.length ?? 0} items · ${formatInr(total)} portfolio value`,
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				onClick: () => setEditing("new"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), " Add asset"]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "panel mb-4 flex flex-col gap-2 p-3 sm:flex-row",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-subtle" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						className: "pl-9",
						value: search,
						onChange: (e) => setSearch(e.target.value),
						placeholder: "Search name, tag, serial, vendor…"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
					value: cat,
					onChange: (e) => setCat(e.target.value),
					className: "sm:w-44",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "all",
						children: "All categories"
					}), CATEGORIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: c }, c))]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
					value: status,
					onChange: (e) => setStatus(e.target.value),
					className: "sm:w-40",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "all",
						children: "All statuses"
					}), STATUSES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: s,
						children: statusLabel(s)
					}, s))]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "panel overflow-x-auto",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full min-w-[960px] text-left text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
					className: "border-b border-border text-xs text-muted",
					children: [
						"Tag",
						"Asset",
						"Category",
						"Status",
						"Assigned To",
						"Location",
						"Cost",
						"Actions"
					].map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "px-4 py-3 font-medium",
						children: h
					}, h))
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: rows.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-b border-border last:border-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3 font-mono text-xs text-muted",
							children: a.tag
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
							className: "px-4 py-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium",
								children: a.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted",
								children: [
									a.vendor,
									" · ",
									a.serial
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3",
							children: a.category
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: a.status })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3 text-muted",
							children: a.assignedToName ?? "—"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3 text-muted",
							children: a.location
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3 tabular-nums",
							children: formatInr(a.costInr)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "grid size-8 place-items-center rounded-md text-muted hover:bg-canvas hover:text-fg",
									onClick: () => setEditing(a),
									"aria-label": "Edit",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-4" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "grid size-8 place-items-center rounded-md text-muted hover:bg-danger-bg hover:text-danger",
									onClick: () => {
										if (confirm(`Remove ${a.tag}?`)) del.mutate(a.id);
									},
									"aria-label": "Delete",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
								})]
							})
						})
					]
				}, a.id)) })]
			}), rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "py-10 text-center text-sm text-muted",
				children: "No assets match those filters."
			}) : null]
		}),
		editing !== null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AssetDialog, {
			asset: editing === "new" ? null : editing,
			onClose: () => setEditing(null),
			onSaved: async () => {
				setEditing(null);
				await qc.invalidateQueries();
			}
		}, editing === "new" ? "new" : editing.id) : null
	] });
}
function AssetDialog({ asset, onClose, onSaved }) {
	const [tag, setTag] = (0, import_react.useState)(asset?.tag ?? "");
	const [name, setName] = (0, import_react.useState)(asset?.name ?? "");
	const [vendor, setVendor] = (0, import_react.useState)(asset?.vendor ?? "");
	const [serial, setSerial] = (0, import_react.useState)(asset?.serial ?? "");
	const [category, setCategory] = (0, import_react.useState)(asset?.category ?? "Laptop");
	const [status, setStatus] = (0, import_react.useState)(asset?.status ?? "in_stock");
	const [location, setLocation] = (0, import_react.useState)(asset?.location ?? "Storage A");
	const [cost, setCost] = (0, import_react.useState)(asset ? String(asset.costInr) : "");
	const [warranty, setWarranty] = (0, import_react.useState)(asset?.warrantyUntil ?? "");
	const isNew = !asset;
	const save = useMutation({
		mutationFn: () => saveAsset({ data: {
			id: asset?.id,
			tag,
			name,
			vendor,
			serial,
			category,
			status,
			location,
			costInr: Number(cost) || 0,
			warrantyUntil: warranty || null
		} }),
		onSuccess: () => {
			toast.success(isNew ? "Asset added" : "Asset updated");
			onSaved();
		},
		onError: (e) => toast.error(e.message)
	});
	async function onCategory(c) {
		setCategory(c);
		if (isNew && !tag) {
			const next = await suggestTag({ data: c });
			setTag(next);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open: true,
		onOpenChange: (v) => !v && onClose(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent, {
			title: isNew ? "Add asset" : "Edit asset",
			description: "Tags should be unique across the lab.",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "grid gap-3 sm:grid-cols-2",
				onSubmit: (e) => {
					e.preventDefault();
					save.mutate();
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "mb-1.5 block text-xs font-medium text-muted",
						children: "Tag"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: tag,
						onChange: (e) => setTag(e.target.value),
						required: true,
						placeholder: "LAP-0005"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "mb-1.5 block text-xs font-medium text-muted",
						children: "Name"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: name,
						onChange: (e) => setName(e.target.value),
						required: true
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "mb-1.5 block text-xs font-medium text-muted",
						children: "Vendor"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: vendor,
						onChange: (e) => setVendor(e.target.value)
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "mb-1.5 block text-xs font-medium text-muted",
						children: "Serial"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: serial,
						onChange: (e) => setSerial(e.target.value)
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "mb-1.5 block text-xs font-medium text-muted",
						children: "Category"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
						value: category,
						onChange: (e) => void onCategory(e.target.value),
						children: CATEGORIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: c }, c))
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "mb-1.5 block text-xs font-medium text-muted",
						children: "Status"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
						value: status,
						onChange: (e) => setStatus(e.target.value),
						children: STATUSES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: s,
							children: statusLabel(s)
						}, s))
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "mb-1.5 block text-xs font-medium text-muted",
						children: "Location"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: location,
						onChange: (e) => setLocation(e.target.value)
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "mb-1.5 block text-xs font-medium text-muted",
						children: "Cost (₹)"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						inputMode: "numeric",
						value: cost,
						onChange: (e) => setCost(e.target.value)
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "sm:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "mb-1.5 block text-xs font-medium text-muted",
							children: "Warranty until"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "date",
							value: warranty,
							onChange: (e) => setWarranty(e.target.value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-end gap-2 sm:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "outline",
							onClick: onClose,
							children: "Cancel"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							disabled: save.isPending,
							children: "Save"
						})]
					})
				]
			})
		})
	});
}
//#endregion
export { Page as component };
