import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { d as plusYearsIso, u as overdueDays } from "./format-D7enopbo.mjs";
import { f as QrCode, u as ScanLine } from "../_libs/lucide-react.mjs";
import { i as useQueryClient, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as initials } from "./utils-Bgaj78xo.mjs";
import { i as Input, t as Button } from "./button-YfIMXCFs.mjs";
import { g as lookupPerson, i as createAssignment, n as PageHeader, r as RequireAuth, y as returnAsset } from "./require-auth-w5D_tWDt.mjs";
import { t as Select } from "./select-e5mMcd1z.mjs";
import { n as DialogContent, t as Dialog } from "./dialog-BhWWDYc8.mjs";
import { n as OverdueBadge } from "./badge-BzQb7lhS.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/check-in-Cye6t2Ys.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Page() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireAuth, {
		role: "staff",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckIn, {})
	});
}
var DEMO_BADGES = [
	{
		id: "e1",
		label: "Aarav Sharma",
		hint: "e1 / aarav@itlabs.io"
	},
	{
		id: "e2",
		label: "Priya Menon",
		hint: "e2 / priya@itlabs.io"
	},
	{
		id: "e3",
		label: "Rahul Verma",
		hint: "e3 / rahul@itlabs.io"
	},
	{
		id: "e4",
		label: "Sana Kapoor",
		hint: "e4 / sana@itlabs.io"
	},
	{
		id: "e5",
		label: "Vikram Iyer",
		hint: "e5 / vikram@itlabs.io"
	}
];
function CheckIn() {
	const qc = useQueryClient();
	const [q, setQ] = (0, import_react.useState)("e1 / aarav@itlabs.io");
	const [scanOpen, setScanOpen] = (0, import_react.useState)(false);
	const lookup = useMutation({
		mutationFn: (needle) => lookupPerson({ data: needle }),
		onError: (e) => toast.error(e.message)
	});
	const person = lookup.data ?? null;
	function run(needle) {
		setQ(needle);
		lookup.mutate(needle);
	}
	const checkout = useMutation({
		mutationFn: (d) => createAssignment({ data: d }),
		onSuccess: async () => {
			toast.success("Checked out");
			await qc.invalidateQueries();
			if (person) lookup.mutate(person.employee.id);
		},
		onError: (e) => toast.error(e.message)
	});
	const ret = useMutation({
		mutationFn: (id) => returnAsset({ data: id }),
		onSuccess: async () => {
			toast.success("Returned to stock");
			await qc.invalidateQueries();
			if (person) lookup.mutate(person.employee.id);
		},
		onError: (e) => toast.error(e.message)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScanLine, { className: "size-7 text-primary" }),
			title: "Check-In / Check-Out",
			subtitle: "Scan a student or staff ID badge to hand out lab hardware or take it back — every action is written to the audit trail."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "panel p-5 sm:p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-semibold",
					children: "1 · Scan ID"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: "Scan the QR on the ID card, or type a name, email or ID number."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "mt-4 flex flex-col gap-2 sm:flex-row sm:items-center",
					onSubmit: (e) => {
						e.preventDefault();
						run(q);
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "button",
							onClick: () => setScanOpen(true),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QrCode, { className: "size-4" }), "Scan ID card"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: q,
							onChange: (e) => setQ(e.target.value),
							placeholder: "e1 / aarav@itlabs.io",
							className: "sm:max-w-xs"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							variant: "outline",
							disabled: lookup.isPending,
							children: lookup.isPending ? "Looking up…" : "Look up"
						})
					]
				}),
				lookup.isSuccess && !person ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-danger",
					children: "No matching badge or directory record."
				}) : null
			]
		}),
		person ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PersonPanel, {
			employee: person.employee,
			held: person.held,
			stock: person.stock,
			onReturn: (id) => ret.mutate(id),
			onCheckout: (d) => checkout.mutate({
				...d,
				employeeId: person.employee.id
			}),
			busy: checkout.isPending || ret.isPending
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open: scanOpen,
			onOpenChange: setScanOpen,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent, {
				title: "Scan a lab badge",
				description: "Demo badges for the IT Labs directory. Pick one to look up custody.",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-2",
					children: DEMO_BADGES.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "flex items-center gap-3 rounded-xl p-3 text-left shadow-[0_0_0_1px_var(--color-border)] hover:bg-canvas",
						onClick: () => {
							setScanOpen(false);
							run(b.id);
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "grid size-10 place-items-center rounded-lg bg-brand/20 font-mono text-xs font-semibold text-brand-ink",
							children: b.id
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block text-sm font-medium",
							children: b.label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block text-xs text-muted",
							children: b.hint
						})] })]
					}, b.id))
				})
			})
		})
	] });
}
function PersonPanel({ employee, held, stock, onReturn, onCheckout, busy }) {
	const [assetId, setAssetId] = (0, import_react.useState)(stock[0]?.id ?? "");
	const [due, setDue] = (0, import_react.useState)(plusYearsIso(2));
	const [note, setNote] = (0, import_react.useState)("");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-4 grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "panel p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid size-12 place-items-center rounded-full bg-primary text-sm font-semibold text-primary-fg",
						children: initials(employee.fullName)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-semibold",
							children: employee.fullName
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: employee.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 font-mono text-xs text-subtle",
							children: [
								employee.id,
								" · ",
								employee.email
							]
						})
					] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-xs font-medium text-muted",
					children: "Currently holding"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-2 divide-y divide-border",
					children: held.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "py-4 text-sm text-muted",
						children: "Nothing checked out."
					}) : held.map((a) => {
						const od = overdueDays(a.dueBack, a.returnedAt);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center justify-between gap-3 py-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate text-sm font-medium",
									children: a.assetName
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-mono text-xs text-muted",
									children: a.assetTag
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [od ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OverdueBadge, { days: od }) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									variant: "outline",
									disabled: busy,
									onClick: () => onReturn(a.id),
									children: "Return"
								})]
							})]
						}, a.id);
					})
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "panel p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-semibold",
					children: "2 · Check out hardware"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: "Hand a free item to this person and set a due date."
				}),
				stock.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-sm text-muted",
					children: "No in-stock hardware to allocate."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "mt-4 space-y-3",
					onSubmit: (e) => {
						e.preventDefault();
						if (!assetId) return;
						onCheckout({
							assetId,
							dueBack: due,
							note
						});
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "mb-1.5 block text-xs font-medium text-muted",
							children: "Asset"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
							value: assetId,
							onChange: (e) => setAssetId(e.target.value),
							children: stock.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
								value: a.id,
								children: [
									a.tag,
									" · ",
									a.name
								]
							}, a.id))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "mb-1.5 block text-xs font-medium text-muted",
							children: "Due back"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "date",
							value: due,
							onChange: (e) => setDue(e.target.value)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "mb-1.5 block text-xs font-medium text-muted",
							children: "Note"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: note,
							onChange: (e) => setNote(e.target.value),
							placeholder: "Optional"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							disabled: busy || !assetId,
							children: "Check out"
						})
					]
				})
			]
		})]
	});
}
//#endregion
export { Page as component };
