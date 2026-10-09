import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { s as formatStamp, u as overdueDays } from "./format-D7enopbo.mjs";
import { b as Download, l as Search, s as Shield, v as MapPin } from "../_libs/lucide-react.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { i as Input, t as Button } from "./button-YfIMXCFs.mjs";
import { n as PageHeader, r as RequireAuth, s as getAudit, t as KpiCard } from "./require-auth-w5D_tWDt.mjs";
import { t as Select } from "./select-e5mMcd1z.mjs";
import { n as OverdueBadge, t as Badge } from "./badge-BzQb7lhS.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/audit-B9MA26_P.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Page() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireAuth, {
		role: "staff",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Audit, {})
	});
}
function Audit() {
	const d = useQuery({
		queryKey: ["audit"],
		queryFn: () => getAudit()
	}).data;
	const [search, setSearch] = (0, import_react.useState)("");
	const [action, setAction] = (0, import_react.useState)("all");
	const events = (0, import_react.useMemo)(() => {
		const needle = search.trim().toLowerCase();
		return (d?.events ?? []).filter((e) => {
			if (action !== "all" && e.action !== action) return false;
			if (!needle) return true;
			return `${e.summary} ${e.actor} ${e.location}`.toLowerCase().includes(needle);
		});
	}, [
		d,
		search,
		action
	]);
	function exportCsv() {
		const csv = [[
			"when",
			"action",
			"actor",
			"summary",
			"location",
			"due_back"
		], ...(d?.events ?? []).map((e) => [
			e.createdAt,
			e.action,
			e.actor,
			e.summary,
			e.location,
			e.dueBack ?? ""
		])].map((r) => r.map((c) => `"${String(c).replaceAll("\"", "\"\"")}"`).join(",")).join("\n");
		const blob = new Blob([csv], { type: "text/csv" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = "assetforge-audit.csv";
		a.click();
		URL.revokeObjectURL(url);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "size-7 text-primary" }),
			title: "Audit Trail",
			subtitle: "Append-only record of every action — who has what, where it lives, and when it is due back.",
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "outline",
				onClick: exportCsv,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-4" }), " Export log"]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-3 sm:grid-cols-2 xl:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
					label: "Recorded events",
					value: d?.recordedEvents ?? "—",
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[10px] font-semibold text-muted",
						children: "LOG"
					}),
					iconClass: "bg-canvas text-muted"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
					label: "Assets in custody",
					value: d?.inCustody ?? "—",
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[10px] font-semibold text-muted",
						children: "KIT"
					}),
					iconClass: "bg-canvas text-muted"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
					label: "Due within 14 days",
					value: d?.dueSoon ?? "—",
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs font-semibold text-muted",
						children: "DUE"
					}),
					iconClass: "bg-canvas text-muted"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
					label: "Overdue",
					value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: d && d.overdue > 0 ? "text-danger" : "",
						children: d?.overdue ?? "—"
					}),
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs font-semibold text-danger",
						children: "!"
					}),
					iconClass: "bg-danger-bg"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "panel mt-4 overflow-hidden",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "px-5 py-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-sm font-semibold",
					children: "Current chain of custody"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full min-w-[720px] text-left text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
						className: "border-y border-border text-xs text-muted",
						children: [
							"Asset",
							"Holder",
							"Location",
							"Since",
							"Due back"
						].map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-5 py-3 font-medium",
							children: h
						}, h))
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: (d?.custody ?? []).map((c) => {
						const od = overdueDays(c.dueBack, c.returnedAt);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-b border-border last:border-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "px-5 py-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-medium",
										children: c.assetName
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-mono text-xs text-muted",
										children: c.assetTag
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "px-5 py-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-medium",
										children: c.employeeName
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted",
										children: c.department
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-5 py-3 text-muted",
									children: c.location || "—"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-5 py-3 tabular-nums text-muted",
									children: c.assignedAt
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "px-5 py-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "tabular-nums",
										children: c.dueBack
									}), od ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OverdueBadge, { days: od }) : c.dueBack ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
										className: "mt-1 bg-canvas text-muted",
										children: ["Due ", c.dueBack]
									}) : null]
								})
							]
						}, c.id);
					}) })]
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "panel mt-4 p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-sm font-semibold",
					children: "Event log"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex flex-col gap-2 sm:flex-row",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-subtle" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							className: "pl-9",
							value: search,
							onChange: (e) => setSearch(e.target.value),
							placeholder: "Search asset, person, location…"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: action,
						onChange: (e) => setAction(e.target.value),
						className: "sm:w-40",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "all",
							children: "All actions"
						}), [
							"assigned",
							"returned",
							"intake",
							"created",
							"updated",
							"deleted"
						].map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: a,
							children: a
						}, a))]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-2 divide-y divide-border",
					children: events.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "py-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-start justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										className: "mr-2 bg-info-bg text-info-fg capitalize",
										children: e.action
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-muted",
										children: ["by ", e.actor]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm font-medium",
									children: e.summary
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 flex flex-wrap items-center gap-3 text-xs text-muted",
									children: [e.location ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "inline-flex items-center gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-3" }), e.location]
									}) : null, e.dueBack ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["due ", e.dueBack] }) : null]
								})
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-subtle",
								children: formatStamp(e.createdAt)
							})]
						})
					}, e.id))
				})
			]
		})
	] });
}
//#endregion
export { Page as component };
