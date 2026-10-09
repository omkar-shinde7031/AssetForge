import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { s as formatStamp, u as overdueDays } from "./format-D7enopbo.mjs";
import { t as CATEGORIES } from "./types-CU6PpdZ1.mjs";
import { c as Send, h as Package } from "../_libs/lucide-react.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as cn } from "./utils-Bgaj78xo.mjs";
import { a as Textarea, t as Button } from "./button-YfIMXCFs.mjs";
import { S as stockByCategory, l as getMyKit, r as RequireAuth, w as submitSelfRequest } from "./require-auth-w5D_tWDt.mjs";
import { n as OverdueBadge, r as StatusBadge } from "./badge-BzQb7lhS.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/portal-D6z3D2QY.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Page() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireAuth, {
		preferredRole: "employee",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PortalHome, {})
	});
}
function PortalHome() {
	const qc = useQueryClient();
	const kit = useQuery({
		queryKey: ["my-kit"],
		queryFn: () => getMyKit()
	});
	const stock = useQuery({
		queryKey: ["stock-cat"],
		queryFn: () => stockByCategory()
	});
	const data = kit.data;
	const [needed, setNeeded] = (0, import_react.useState)([]);
	const [note, setNote] = (0, import_react.useState)("");
	const req = useMutation({
		mutationFn: () => submitSelfRequest({ data: {
			hardwareNeeded: needed,
			justification: note
		} }),
		onSuccess: async () => {
			toast.success("Request sent to IT");
			setNeeded([]);
			setNote("");
			await qc.invalidateQueries();
		},
		onError: (e) => toast.error(e.message)
	});
	if (data?.profile.role === "staff" && !data.employee) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "panel mx-auto max-w-lg p-8 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-2xl font-semibold",
				children: "You're on the staff side"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted",
				children: "Lab assistants manage inventory from the console. Employee kit view is for people who hold hardware."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "mt-6",
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					children: "Open staff console"
				})
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "Your kit"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-3xl font-semibold tracking-tight",
					children: data?.employee?.fullName ?? data?.profile.displayName ?? "Employee"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-sm text-muted",
					children: [
						data?.employee?.title,
						" · ",
						data?.employee?.department
					]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "panel p-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-3 flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "flex items-center gap-2 text-sm font-semibold",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "size-4 text-primary" }), " Assigned hardware"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-xs text-muted",
					children: [data?.held.length ?? 0, " items"]
				})]
			}), (data?.held ?? []).length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "py-8 text-center text-sm text-muted",
				children: "Nothing checked out to you yet."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "divide-y divide-border",
				children: (data?.held ?? []).map((a) => {
					const od = overdueDays(a.dueBack, a.returnedAt);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex flex-wrap items-center justify-between gap-3 py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium",
							children: a.assetName
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-mono text-xs text-muted",
							children: [
								a.assetTag,
								" · since ",
								a.assignedAt
							]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [od ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OverdueBadge, { days: od }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: "assigned" }), a.dueBack ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-xs text-muted",
								children: ["due ", a.dueBack]
							}) : null]
						})]
					}, a.id);
				})
			})]
		}),
		data?.employee ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "panel mt-4 p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-sm font-semibold",
					children: "Request more hardware"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: "IT matches this against live stock."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 flex flex-wrap gap-2",
					children: CATEGORIES.map((c) => {
						const on = needed.includes(c);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setNeeded((xs) => xs.includes(c) ? xs.filter((x) => x !== c) : [...xs, c]),
							className: cn("h-8 rounded-full px-3 text-xs font-medium shadow-[0_0_0_1px_var(--color-border)]", on ? "bg-primary text-primary-fg shadow-none" : "bg-surface text-muted"),
							children: [
								c,
								" · ",
								stock.data?.[c] ?? 0,
								" free"
							]
						}, c);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					className: "mt-3",
					value: note,
					onChange: (e) => setNote(e.target.value),
					placeholder: "Why do you need this?"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					className: "mt-3",
					disabled: req.isPending || needed.length === 0,
					onClick: () => req.mutate(),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "size-4" }), " Submit request"]
				})
			]
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "panel mt-4 p-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-sm font-semibold",
				children: "Recent activity"
			}), (data?.events ?? []).length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-sm text-muted",
				children: "No events on your kit yet."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-2 divide-y divide-border",
				children: (data?.events ?? []).map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "py-3 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-medium",
						children: e.summary
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted",
						children: formatStamp(e.createdAt)
					})]
				}, e.id))
			})]
		})
	] });
}
//#endregion
export { Page as component };
