import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { d as plusYearsIso, u as overdueDays } from "./format-D7enopbo.mjs";
import { E as ArrowLeftRight, d as RotateCcw, p as Plus } from "../_libs/lucide-react.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { i as Input, t as Button } from "./button-YfIMXCFs.mjs";
import { d as listAssets, f as listAssignments, i as createAssignment, n as PageHeader, p as listEmployees, r as RequireAuth, y as returnAsset } from "./require-auth-w5D_tWDt.mjs";
import { t as Select } from "./select-e5mMcd1z.mjs";
import { n as DialogContent, t as Dialog } from "./dialog-BhWWDYc8.mjs";
import { n as OverdueBadge } from "./badge-BzQb7lhS.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/assignments--6bE9POm.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Page() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireAuth, {
		role: "staff",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Assignments, {})
	});
}
function Assignments() {
	const qc = useQueryClient();
	const q = useQuery({
		queryKey: ["assignments"],
		queryFn: () => listAssignments()
	});
	const [open, setOpen] = (0, import_react.useState)(false);
	const active = (q.data ?? []).filter((a) => !a.returnedAt);
	const returned = (q.data ?? []).filter((a) => a.returnedAt);
	const ret = useMutation({
		mutationFn: (id) => returnAsset({ data: id }),
		onSuccess: async () => {
			toast.success("Asset returned to stock");
			await qc.invalidateQueries();
		},
		onError: (e) => toast.error(e.message)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeftRight, { className: "size-7 text-primary" }),
			title: "Assignments",
			subtitle: `${active.length} active · ${returned.length} returned`,
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				onClick: () => setOpen(true),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), " New assignment"]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "panel overflow-hidden",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between border-b border-border px-5 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-sm font-semibold",
					children: "Active"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "rounded-full bg-canvas px-2 py-0.5 text-xs tabular-nums text-muted",
					children: active.length
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "overflow-x-auto",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full min-w-[800px] text-left text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
						className: "border-b border-border text-xs text-muted",
						children: [
							"Asset",
							"Assigned to",
							"Since",
							"Due back",
							"Note",
							"Action"
						].map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-5 py-3 font-medium",
							children: h
						}, h))
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: active.map((a) => {
						const od = overdueDays(a.dueBack, a.returnedAt);
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
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "px-5 py-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-medium",
										children: a.employeeName
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted",
										children: a.department
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-5 py-3 tabular-nums text-muted",
									children: a.assignedAt
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-5 py-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-wrap items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "tabular-nums",
											children: a.dueBack ?? "—"
										}), od ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OverdueBadge, { days: od }) : null]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-5 py-3 text-muted",
									children: a.note || "—"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-5 py-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										size: "sm",
										variant: "outline",
										disabled: ret.isPending,
										onClick: () => ret.mutate(a.id),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-3.5" }), "Return"]
									})
								})
							]
						}, a.id);
					}) })]
				}), active.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "py-10 text-center text-sm text-muted",
					children: "No active assignments."
				}) : null]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NewAssignmentDialog, {
			open,
			onClose: () => setOpen(false),
			onSaved: async () => {
				setOpen(false);
				await qc.invalidateQueries();
			}
		})
	] });
}
function NewAssignmentDialog({ open, onClose, onSaved }) {
	const assets = useQuery({
		queryKey: ["assets"],
		queryFn: () => listAssets(),
		enabled: open
	});
	const employees = useQuery({
		queryKey: ["employees"],
		queryFn: () => listEmployees(),
		enabled: open
	});
	const stock = (assets.data ?? []).filter((a) => a.status === "in_stock");
	const [assetId, setAssetId] = (0, import_react.useState)("");
	const [employeeId, setEmployeeId] = (0, import_react.useState)("");
	const [due, setDue] = (0, import_react.useState)(plusYearsIso(2));
	const [note, setNote] = (0, import_react.useState)("");
	const loc = stock.find((a) => a.id === assetId)?.location ?? "";
	const save = useMutation({
		mutationFn: () => createAssignment({ data: {
			assetId,
			employeeId,
			dueBack: due,
			note,
			location: loc
		} }),
		onSuccess: () => {
			toast.success("Assignment created");
			onSaved();
		},
		onError: (e) => toast.error(e.message)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange: (v) => !v && onClose(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent, {
			title: "New assignment",
			description: "Only in-stock hardware can be handed out.",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "space-y-3",
				onSubmit: (e) => {
					e.preventDefault();
					save.mutate();
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "mb-1.5 block text-xs font-medium text-muted",
						children: "Asset"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: assetId,
						onChange: (e) => setAssetId(e.target.value),
						required: true,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: "Select in-stock asset"
						}), stock.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
							value: a.id,
							children: [
								a.tag,
								" · ",
								a.name
							]
						}, a.id))]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "mb-1.5 block text-xs font-medium text-muted",
						children: "Employee"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: employeeId,
						onChange: (e) => setEmployeeId(e.target.value),
						required: true,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: "Select person"
						}), (employees.data ?? []).map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
							value: e.id,
							children: [
								e.fullName,
								" · ",
								e.department
							]
						}, e.id))]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "mb-1.5 block text-xs font-medium text-muted",
						children: "Due back"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "date",
						value: due,
						onChange: (e) => setDue(e.target.value)
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "mb-1.5 block text-xs font-medium text-muted",
						children: "Note"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: note,
						onChange: (e) => setNote(e.target.value),
						placeholder: "Primary dev machine"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-end gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "outline",
							onClick: onClose,
							children: "Cancel"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							disabled: save.isPending || !assetId || !employeeId,
							children: "Assign"
						})]
					})
				]
			})
		})
	});
}
//#endregion
export { Page as component };
