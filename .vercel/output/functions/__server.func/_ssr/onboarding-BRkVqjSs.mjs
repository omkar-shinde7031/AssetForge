import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { i as STARTER_KITS, n as DEPARTMENTS, r as JOB_ROLES, t as CATEGORIES } from "./types-CU6PpdZ1.mjs";
import { r as UserPlus, x as ClipboardList } from "../_libs/lucide-react.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as cn } from "./utils-Bgaj78xo.mjs";
import { a as Textarea, i as Input, t as Button } from "./button-YfIMXCFs.mjs";
import { C as submitOnboarding, S as stockByCategory, h as listOnboarding, n as PageHeader, p as listEmployees, r as RequireAuth } from "./require-auth-w5D_tWDt.mjs";
import { t as Select } from "./select-e5mMcd1z.mjs";
import { r as StatusBadge } from "./badge-BzQb7lhS.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/onboarding-BRkVqjSs.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Page() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireAuth, {
		role: "staff",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Onboarding, {})
	});
}
function Onboarding() {
	const qc = useQueryClient();
	const stock = useQuery({
		queryKey: ["stock-cat"],
		queryFn: () => stockByCategory()
	});
	const employees = useQuery({
		queryKey: ["employees"],
		queryFn: () => listEmployees()
	});
	const reqs = useQuery({
		queryKey: ["onboarding"],
		queryFn: () => listOnboarding()
	});
	const open = (reqs.data ?? []).filter((r) => r.status !== "fulfilled").length;
	const [kind, setKind] = (0, import_react.useState)("new_joiner");
	const [fullName, setFullName] = (0, import_react.useState)("Neha Gupta");
	const [email, setEmail] = (0, import_react.useState)("neha@itlabs.io");
	const [department, setDepartment] = (0, import_react.useState)("Engineering");
	const [jobRole, setJobRole] = (0, import_react.useState)("");
	const [employeeId, setEmployeeId] = (0, import_react.useState)("");
	const [needed, setNeeded] = (0, import_react.useState)([]);
	const [justification, setJustification] = (0, import_react.useState)("Needs 32GB RAM for local builds");
	const [auto, setAuto] = (0, import_react.useState)(true);
	const kit = (0, import_react.useMemo)(() => STARTER_KITS[jobRole] ?? [], [jobRole]);
	const submit = useMutation({
		mutationFn: () => submitOnboarding({ data: {
			kind,
			employeeId: kind === "existing" ? employeeId : void 0,
			fullName,
			email,
			department,
			jobRole,
			hardwareNeeded: needed.length ? needed : kit,
			justification,
			autoAllocate: auto
		} }),
		onSuccess: async (r) => {
			toast.success(r.status === "fulfilled" ? "Kit allocated from live stock" : r.allocated ? `Partial kit allocated (${r.allocated})` : "Request saved — waiting on stock");
			await qc.invalidateQueries();
		},
		onError: (e) => toast.error(e.message)
	});
	function toggle(cat) {
		setNeeded((xs) => xs.includes(cat) ? xs.filter((c) => c !== cat) : [...xs, cat]);
	}
	const selected = needed.length ? needed : kit;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardList, { className: "size-7 text-primary" }),
			title: "Onboarding Requests",
			subtitle: `${open} open request${open === 1 ? "" : "s"} · requirements are matched against live hardware stock.`
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "panel p-5 sm:p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-sm font-semibold",
					children: "Requirement request"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: "New joiner states what they need — the system matches it against live hardware stock."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 inline-flex rounded-xl bg-canvas p-1 shadow-[0_0_0_1px_var(--color-border)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: cn("flex h-9 items-center gap-1.5 rounded-lg px-3 text-sm font-medium", kind === "new_joiner" ? "bg-surface text-fg shadow-sm" : "text-muted"),
						onClick: () => setKind("new_joiner"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { className: "size-3.5" }), "New joiner"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: cn("h-9 rounded-lg px-3 text-sm font-medium", kind === "existing" ? "bg-surface text-fg shadow-sm" : "text-muted"),
						onClick: () => setKind("existing"),
						children: "Existing employee"
					})]
				}),
				kind === "existing" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "mb-1.5 block text-xs font-medium text-muted",
						children: "Employee"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: employeeId,
						onChange: (e) => {
							const id = e.target.value;
							setEmployeeId(id);
							const emp = employees.data?.find((x) => x.id === id);
							if (emp) {
								setFullName(emp.fullName);
								setEmail(emp.email);
								setDepartment(emp.department);
								setJobRole(emp.title);
							}
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: "Select employee"
						}), (employees.data ?? []).map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
							value: e.id,
							children: [
								e.fullName,
								" · ",
								e.email
							]
						}, e.id))]
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 grid gap-3 sm:grid-cols-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "mb-1.5 block text-xs font-medium text-muted",
							children: "Full name"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: fullName,
							onChange: (e) => setFullName(e.target.value)
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "mb-1.5 block text-xs font-medium text-muted",
							children: "Email"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "email",
							value: email,
							onChange: (e) => setEmail(e.target.value)
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "mb-1.5 block text-xs font-medium text-muted",
							children: "Department"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
							value: department,
							onChange: (e) => setDepartment(e.target.value),
							children: DEPARTMENTS.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: d }, d))
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "mb-1.5 block text-xs font-medium text-muted",
							children: "Job role (auto-fills a starter kit)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: jobRole,
							onChange: (e) => {
								setJobRole(e.target.value);
								setNeeded([]);
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "Select role"
							}), JOB_ROLES.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: r }, r))]
						})] })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 mb-1.5 text-xs font-medium text-muted",
					children: "Hardware needed"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-2",
					children: CATEGORIES.map((c) => {
						const free = stock.data?.[c] ?? 0;
						const on = selected.includes(c);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => toggle(c),
							className: cn("h-8 rounded-full px-3 text-xs font-medium shadow-[0_0_0_1px_var(--color-border)]", on ? "bg-primary text-primary-fg shadow-none" : "bg-surface text-muted hover:text-fg"),
							children: [
								c,
								" · ",
								free,
								" free"
							]
						}, c);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "mb-1.5 block text-xs font-medium text-muted",
						children: "Justification / notes"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						value: justification,
						onChange: (e) => setJustification(e.target.value)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex items-center gap-2 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							checked: auto,
							onChange: (e) => setAuto(e.target.checked),
							className: "size-4 accent-primary"
						}), "Auto-allocate immediately"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						disabled: submit.isPending,
						onClick: () => submit.mutate(),
						children: "Submit requirement"
					})]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "panel mt-4 p-5",
			children: (reqs.data ?? []).length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "py-8 text-center text-sm text-muted",
				children: "No requests yet. Submit a new joiner's requirement above to auto-allocate their kit."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "divide-y divide-border",
				children: (reqs.data ?? []).map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex flex-wrap items-start justify-between gap-3 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium",
							children: r.fullName
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted",
							children: [
								r.email,
								" · ",
								r.department,
								" · ",
								r.jobRole || "No role"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-subtle",
							children: r.hardwareNeeded.join(", ") || "No hardware listed"
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: r.status })]
				}, r.id))
			})
		})
	] });
}
//#endregion
export { Page as component };
