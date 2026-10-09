import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as formatInr, i as daysUntil } from "./format-D7enopbo.mjs";
import { S as ChartColumn, b as Download, d as RotateCcw } from "../_libs/lucide-react.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Button } from "./button-YfIMXCFs.mjs";
import { d as listAssets, n as PageHeader, r as RequireAuth, t as KpiCard, u as getReports, v as resetDemo } from "./require-auth-w5D_tWDt.mjs";
import { t as Badge } from "./badge-BzQb7lhS.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/reports-6tNz1orF.js
var import_jsx_runtime = require_jsx_runtime();
function Page() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireAuth, {
		role: "staff",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reports, {})
	});
}
function Reports() {
	const qc = useQueryClient();
	const q = useQuery({
		queryKey: ["reports"],
		queryFn: () => getReports()
	});
	const assets = useQuery({
		queryKey: ["assets"],
		queryFn: () => listAssets()
	});
	const d = q.data;
	const maxSpend = Math.max(1, ...d?.spendByVendor.map((v) => v.total) ?? [1]);
	const reset = useMutation({
		mutationFn: () => resetDemo(),
		onSuccess: async () => {
			toast.success("Demo data restored");
			await qc.invalidateQueries();
		},
		onError: (e) => toast.error(e.message)
	});
	function exportCsv() {
		const csv = [[
			"tag",
			"name",
			"vendor",
			"serial",
			"category",
			"status",
			"assigned_to",
			"location",
			"cost_inr",
			"warranty_until"
		], ...(assets.data ?? []).map((a) => [
			a.tag,
			a.name,
			a.vendor,
			a.serial,
			a.category,
			a.status,
			a.assignedToName ?? "",
			a.location,
			String(a.costInr),
			a.warrantyUntil ?? ""
		])].map((r) => r.map((c) => `"${String(c).replaceAll("\"", "\"\"")}"`).join(",")).join("\n");
		const blob = new Blob([csv], { type: "text/csv" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = "assetforge-assets.csv";
		a.click();
		URL.revokeObjectURL(url);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartColumn, { className: "size-7 text-primary" }),
			title: "Reports & Insights",
			subtitle: "Export inventory data and monitor operational health.",
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "outline",
				onClick: exportCsv,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-4" }), " Assets CSV"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "outline",
				onClick: () => {
					if (confirm("Reset the lab back to the demo inventory?")) reset.mutate();
				},
				disabled: reset.isPending,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-4" }), " Reset demo"]
			})] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-3 sm:grid-cols-2 xl:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
					label: "Hardware value",
					value: d ? formatInr(d.portfolioValue) : "—",
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-[10px] font-medium text-muted",
						children: [d?.totalAssets ?? 0, " assets"]
					}),
					iconClass: "bg-canvas"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
					label: "Assigned",
					value: d?.assigned ?? "—",
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[10px] text-muted",
						children: "with staff"
					}),
					iconClass: "bg-canvas"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
					label: "In stock",
					value: d?.inStock ?? "—",
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[10px] text-muted",
						children: "ready"
					}),
					iconClass: "bg-canvas"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
					label: "Open assignments",
					value: d?.openAssignments ?? "—",
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[10px] text-muted",
						children: "total"
					}),
					iconClass: "bg-canvas"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 grid gap-4 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-4 text-sm font-semibold",
					children: "Spend by vendor"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-3",
					children: (d?.spendByVendor ?? []).map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-1 flex items-baseline justify-between text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: v.vendor }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "tabular-nums text-muted",
							children: [
								formatInr(v.total),
								" · ",
								v.count
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-2 overflow-hidden rounded-full bg-track",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-full rounded-full bg-bar",
							style: { width: `${Math.max(4, v.total / maxSpend * 100)}%` }
						})
					})] }, v.vendor))
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-4 text-sm font-semibold",
					children: "Assets per department"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-3",
					children: (d?.assetsPerDept ?? []).map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center justify-between text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: row.department }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
							className: "bg-canvas text-muted",
							children: [row.count, " assets"]
						})]
					}, row.department))
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "panel mt-4 p-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-2 text-sm font-semibold",
				children: "Warranties expiring within 90 days"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "divide-y divide-border",
				children: (d?.warranties ?? []).map((a) => {
					const left = daysUntil(a.warrantyUntil);
					const overdue = (left ?? 0) < 0;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center justify-between gap-3 py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium",
							children: a.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted",
							children: [
								a.tag,
								" · ",
								a.vendor,
								" · ",
								formatInr(a.costInr)
							]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							className: overdue ? "bg-danger text-white" : "bg-warn-bg text-warn-fg",
							children: left == null ? "" : `${left}d left`
						})]
					}, a.id);
				})
			})]
		})
	] });
}
//#endregion
export { Page as component };
