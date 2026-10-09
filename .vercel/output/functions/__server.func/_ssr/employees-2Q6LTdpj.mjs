import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as DEPARTMENTS, r as JOB_ROLES } from "./types-CU6PpdZ1.mjs";
import { n as Users, o as Trash2, p as Plus } from "../_libs/lucide-react.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as initials } from "./utils-Bgaj78xo.mjs";
import { i as Input, t as Button } from "./button-YfIMXCFs.mjs";
import { n as PageHeader, o as deleteEmployee, p as listEmployees, r as RequireAuth, x as saveEmployee } from "./require-auth-w5D_tWDt.mjs";
import { t as Select } from "./select-e5mMcd1z.mjs";
import { n as DialogContent, t as Dialog } from "./dialog-BhWWDYc8.mjs";
import { t as Badge } from "./badge-BzQb7lhS.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/employees-2Q6LTdpj.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Page() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireAuth, {
		role: "staff",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Employees, {})
	});
}
function Employees() {
	const qc = useQueryClient();
	const q = useQuery({
		queryKey: ["employees"],
		queryFn: () => listEmployees()
	});
	const [open, setOpen] = (0, import_react.useState)(false);
	const [name, setName] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [title, setTitle] = (0, import_react.useState)("Software Engineer");
	const [department, setDepartment] = (0, import_react.useState)("Engineering");
	const save = useMutation({
		mutationFn: () => saveEmployee({ data: {
			fullName: name,
			email,
			title,
			department
		} }),
		onSuccess: async () => {
			toast.success("Employee added");
			setOpen(false);
			setName("");
			setEmail("");
			await qc.invalidateQueries();
		},
		onError: (e) => toast.error(e.message)
	});
	const del = useMutation({
		mutationFn: (id) => deleteEmployee({ data: id }),
		onSuccess: async () => {
			toast.success("Removed");
			await qc.invalidateQueries();
		},
		onError: (e) => toast.error(e.message)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-7 text-primary" }),
			title: "Employees",
			subtitle: `${q.data?.length ?? 0} team members with lab access`,
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				onClick: () => setOpen(true),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), " Add employee"]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-3",
			children: (q.data ?? []).map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "panel p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex min-w-0 items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid size-11 shrink-0 place-items-center rounded-full bg-primary text-sm font-semibold text-primary-fg",
								children: initials(e.fullName)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate font-semibold",
									children: e.fullName
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate text-xs text-muted",
									children: e.title
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "grid size-8 place-items-center rounded-md text-subtle hover:bg-danger-bg hover:text-danger",
							onClick: () => {
								if (confirm(`Remove ${e.fullName} from the directory?`)) del.mutate(e.id);
							},
							"aria-label": `Remove ${e.fullName}`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 truncate text-sm text-muted",
						children: e.email
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						className: "mt-2 bg-canvas text-muted",
						children: e.department
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex items-center justify-between rounded-lg bg-canvas px-3 py-2 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted",
							children: "Assigned assets"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "tabular-nums font-medium",
							children: e.assignedCount
						})]
					})
				]
			}, e.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open,
			onOpenChange: setOpen,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent, {
				title: "Add employee",
				description: "People here can be looked up at check-in.",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "space-y-3",
					onSubmit: (e) => {
						e.preventDefault();
						save.mutate();
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "mb-1.5 block text-xs font-medium text-muted",
							children: "Full name"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: name,
							onChange: (e) => setName(e.target.value),
							required: true
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "mb-1.5 block text-xs font-medium text-muted",
							children: "Email"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "email",
							value: email,
							onChange: (e) => setEmail(e.target.value),
							required: true
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "mb-1.5 block text-xs font-medium text-muted",
							children: "Job role"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
							value: title,
							onChange: (e) => setTitle(e.target.value),
							children: JOB_ROLES.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: r }, r))
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "mb-1.5 block text-xs font-medium text-muted",
							children: "Department"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
							value: department,
							onChange: (e) => setDepartment(e.target.value),
							children: DEPARTMENTS.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: d }, d))
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-end gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "outline",
								onClick: () => setOpen(false),
								children: "Cancel"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "submit",
								disabled: save.isPending,
								children: "Add"
							})]
						})
					]
				})
			})
		})
	] });
}
//#endregion
export { Page as component };
