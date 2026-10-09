import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as useNavigate, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as formatInr, c as monthsUntil, i as daysUntil, o as formatShortDate, u as overdueDays } from "./format-D7enopbo.mjs";
import { C as Briefcase, T as ArrowRight, a as TrendingUp, i as TriangleAlert, l as Search, n as Users, w as Box, y as LayoutDashboard } from "../_libs/lucide-react.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { i as Route$11 } from "./router-BYz0bZbH.mjs";
import { t as cn } from "./utils-Bgaj78xo.mjs";
import { i as Input, t as Button } from "./button-YfIMXCFs.mjs";
import { c as getDashboard, n as PageHeader, r as RequireAuth, t as KpiCard } from "./require-auth-w5D_tWDt.mjs";
import { r as StatusBadge } from "./badge-BzQb7lhS.mjs";
import { i as ResponsiveContainer, n as Pie, r as Cell, t as PieChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-7s2LY-BR.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Home() {
	const { role } = Route$11.useSearch();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireAuth, {
		role: "staff",
		preferredRole: role === "employee" ? "employee" : "staff",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dashboard, {})
	});
}
var STATUS_SLICES = [
	{
		key: "assigned",
		label: "Assigned",
		color: "var(--color-ok)"
	},
	{
		key: "inStock",
		label: "In Stock",
		color: "var(--color-warn)"
	},
	{
		key: "repair",
		label: "Under Repair",
		color: "var(--color-info)"
	},
	{
		key: "retired",
		label: "Retired",
		color: "var(--color-subtle)"
	}
];
function Dashboard() {
	const d = useQuery({
		queryKey: ["dashboard"],
		queryFn: () => getDashboard()
	}).data;
	const navigate = useNavigate();
	const [query, setQuery] = (0, import_react.useState)("");
	function onSearch(e) {
		e.preventDefault();
		const needle = query.trim();
		navigate({
			to: "/assets",
			search: { q: needle || void 0 }
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Training Hardware Inventory",
			subtitle: "For Internal Training Team",
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: onSearch,
					className: "relative w-full sm:w-64",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-subtle" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						className: "pl-9",
						value: query,
						onChange: (e) => setQuery(e.target.value),
						placeholder: "Search assets, employees…",
						"aria-label": "Search assets"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/portal",
						children: "Employee Portal"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/assignments",
						children: ["New Assignment ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
					})
				})
			] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-3 sm:grid-cols-2 xl:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
					label: "Total Assets",
					value: d?.totalAssets ?? "—",
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Briefcase, { className: "size-4" }),
					iconClass: "bg-info-bg text-info"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
					label: "Assets In Stock",
					value: d?.inStock ?? "—",
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, { className: "size-4" }),
					iconClass: "bg-warn-bg text-warn"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
					label: "Active Employees",
					value: d?.activeEmployees ?? "—",
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-4" }),
					iconClass: "bg-info-bg text-info"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
					label: "Total Asset Value",
					value: d ? formatInr(d.portfolioValue) : "—",
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "size-4" }),
					iconClass: "bg-ok-bg text-ok"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 grid gap-4 lg:grid-cols-[minmax(0,1.55fr)_minmax(280px,1fr)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-4 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-semibold",
						children: "Asset Distribution by Category"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayoutDashboard, { className: "size-4 text-subtle" })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3",
					children: [(d?.byCategory ?? []).map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-1 flex items-baseline justify-between text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-fg",
							children: row.category
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "tabular-nums text-muted",
							children: [
								row.count,
								" · ",
								row.pct,
								"%"
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-2 overflow-hidden rounded-full bg-track",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-full rounded-full bg-bar",
							style: { width: `${Math.max(row.pct, 2)}%` }
						})
					})] }, row.category)), !d ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-40 animate-pulse rounded-lg bg-canvas" }) : null]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mb-1 text-sm font-semibold",
						children: "Asset Status"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-3 text-xs text-muted",
						children: "Live mix of stock vs. assigned kit"
					}),
					d ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusDonut, { data: d }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-48 animate-pulse rounded-lg bg-canvas" })
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "panel mt-4 overflow-hidden",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between border-b border-border px-5 py-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-sm font-semibold",
					children: "Recent Assignments"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "sm",
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/assignments",
						children: "View all"
					})
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "overflow-x-auto",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full min-w-[720px] text-left text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
							className: "border-b border-border text-xs text-muted",
							children: [
								"Asset Name",
								"Employee",
								"Department",
								"Assigned Date",
								"Return Date",
								"Status"
							].map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-5 py-3 font-medium",
								children: h
							}, h))
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: (d?.recentAssignments ?? []).map((a) => {
							const late = overdueDays(a.dueBack, a.returnedAt);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "border-b border-border last:border-0",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
										className: "px-5 py-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-medium",
											children: a.assetName
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-mono text-xs text-muted",
											children: a.assetTag
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-5 py-3",
										children: a.employeeName
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-5 py-3 text-muted",
										children: a.department
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-5 py-3 tabular-nums text-muted",
										children: formatShortDate(a.assignedAt)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-5 py-3 tabular-nums text-muted",
										children: formatShortDate(a.dueBack)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-5 py-3",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: late ? "overdue" : "assigned" })
									})
								]
							}, a.id);
						}) })]
					}),
					d && d.recentAssignments.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "py-10 text-center text-sm text-muted",
						children: "No open assignments yet."
					}) : null,
					!d ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-32 animate-pulse bg-canvas" }) : null
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "panel mt-4 p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-4 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "flex items-center gap-2 text-sm font-semibold",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "size-4 text-warn" }), "Warranty Alerts"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-muted",
						children: "Next 180 days"
					})]
				}),
				(d?.warranties ?? []).length === 0 && d ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "py-6 text-center text-sm text-muted",
					children: "No warranties in the next 180 days."
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-4",
					children: (d?.warranties ?? []).map((a) => {
						const left = daysUntil(a.warrantyUntil);
						const months = monthsUntil(a.warrantyUntil);
						const pct = left == null ? 0 : Math.min(100, Math.max(6, left / 180 * 100));
						const tone = left == null || left > 150 ? "bg-ok" : left > 90 ? "bg-warn" : "bg-danger";
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-1.5 flex items-center justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate text-sm font-medium",
									children: a.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-muted",
									children: [
										a.tag,
										" · ",
										a.vendor
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: cn("shrink-0 text-xs font-medium tabular-nums", left != null && left <= 90 ? "text-danger" : "text-muted"),
								children: months == null ? "" : `Expires in ${months} month${months === 1 ? "" : "s"}`
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-1.5 overflow-hidden rounded-full bg-track",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: cn("h-full rounded-full", tone),
								style: { width: `${pct}%` }
							})
						})] }, a.id);
					})
				})
			]
		})
	] });
}
function StatusDonut({ data }) {
	const [mounted, setMounted] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setMounted(true);
	}, []);
	const slices = (0, import_react.useMemo)(() => {
		return STATUS_SLICES.map((s) => ({
			...s,
			value: data[s.key]
		})).filter((s) => s.value > 0);
	}, [data]);
	const total = Math.max(1, data.totalAssets);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col items-center gap-4 sm:flex-row sm:items-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "h-44 w-44 shrink-0",
			children: mounted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
				width: "100%",
				height: "100%",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PieChart, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pie, {
					data: slices,
					dataKey: "value",
					nameKey: "label",
					innerRadius: 52,
					outerRadius: 74,
					paddingAngle: 2,
					stroke: "none",
					children: slices.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: s.color }, s.key))
				}) })
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "size-full animate-pulse rounded-full bg-canvas" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "w-full space-y-2.5 text-sm",
			children: STATUS_SLICES.map((s) => {
				const n = data[s.key];
				if (!n) return null;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "size-2.5 rounded-full",
							style: { background: s.color }
						}), s.label]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "tabular-nums text-muted",
						children: [(n / total * 100).toFixed(1), "%"]
					})]
				}, s.key);
			})
		})]
	});
}
//#endregion
export { Home as component };
