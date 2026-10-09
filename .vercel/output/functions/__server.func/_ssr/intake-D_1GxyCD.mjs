import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { s as formatStamp } from "./format-D7enopbo.mjs";
import { t as CATEGORIES } from "./types-CU6PpdZ1.mjs";
import { g as PackagePlus, o as Trash2, p as Plus } from "../_libs/lucide-react.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { i as Input, t as Button } from "./button-YfIMXCFs.mjs";
import { _ as receiveIntake, m as listIntake, n as PageHeader, r as RequireAuth } from "./require-auth-w5D_tWDt.mjs";
import { t as Select } from "./select-e5mMcd1z.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/intake-D_1GxyCD.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Page() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireAuth, {
		role: "staff",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Intake, {})
	});
}
var emptyLine = () => ({
	name: "",
	category: "Laptop",
	serial: "",
	costInr: "",
	location: "Storage A",
	warrantyUntil: ""
});
function Intake() {
	const qc = useQueryClient();
	const lots = useQuery({
		queryKey: ["intake"],
		queryFn: () => listIntake()
	});
	const [vendor, setVendor] = (0, import_react.useState)("");
	const [packing, setPacking] = (0, import_react.useState)("");
	const [notes, setNotes] = (0, import_react.useState)("");
	const [lines, setLines] = (0, import_react.useState)([emptyLine()]);
	const receive = useMutation({
		mutationFn: () => receiveIntake({ data: {
			vendor,
			packingRef: packing,
			notes,
			items: lines.filter((l) => l.name.trim()).map((l) => ({
				name: l.name,
				category: l.category,
				serial: l.serial,
				costInr: Number(l.costInr) || 0,
				location: l.location,
				warrantyUntil: l.warrantyUntil || null
			}))
		} }),
		onSuccess: async (r) => {
			toast.success(`Received ${r.count} item${r.count === 1 ? "" : "s"} into stock`);
			setVendor("");
			setPacking("");
			setNotes("");
			setLines([emptyLine()]);
			await qc.invalidateQueries();
		},
		onError: (e) => toast.error(e.message)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PackagePlus, { className: "size-7 text-primary" }),
			title: "Intake Panel",
			subtitle: "Receive a shipment into live stock. Tags are generated from category."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "panel p-5 sm:p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-sm font-semibold",
					children: "New receipt"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 grid gap-3 sm:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "mb-1.5 block text-xs font-medium text-muted",
						children: "Vendor"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: vendor,
						onChange: (e) => setVendor(e.target.value),
						placeholder: "Dell"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "mb-1.5 block text-xs font-medium text-muted",
						children: "Packing slip / PO"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: packing,
						onChange: (e) => setPacking(e.target.value),
						placeholder: "PO-2041"
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "mb-1.5 block text-xs font-medium text-muted",
						children: "Notes"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: notes,
						onChange: (e) => setNotes(e.target.value),
						placeholder: "Dock delivery, floor 3"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-5 overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full min-w-[720px] text-left text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
							className: "text-xs text-muted",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "pb-2 font-medium",
									children: "Item"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "pb-2 font-medium",
									children: "Category"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "pb-2 font-medium",
									children: "Serial"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "pb-2 font-medium",
									children: "Cost (₹)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "pb-2 font-medium",
									children: "Location"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "pb-2 font-medium",
									children: "Warranty"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "pb-2" })
							] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: lines.map((line, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "align-top",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-1.5 pr-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: line.name,
										onChange: (e) => setLines((xs) => xs.map((x, j) => j === i ? {
											...x,
											name: e.target.value
										} : x)),
										placeholder: "MacBook Pro 14"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-1.5 pr-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
										value: line.category,
										onChange: (e) => setLines((xs) => xs.map((x, j) => j === i ? {
											...x,
											category: e.target.value
										} : x)),
										children: CATEGORIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: c }, c))
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-1.5 pr-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: line.serial,
										onChange: (e) => setLines((xs) => xs.map((x, j) => j === i ? {
											...x,
											serial: e.target.value
										} : x))
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-1.5 pr-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										inputMode: "numeric",
										value: line.costInr,
										onChange: (e) => setLines((xs) => xs.map((x, j) => j === i ? {
											...x,
											costInr: e.target.value
										} : x))
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-1.5 pr-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: line.location,
										onChange: (e) => setLines((xs) => xs.map((x, j) => j === i ? {
											...x,
											location: e.target.value
										} : x))
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-1.5 pr-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										type: "date",
										value: line.warrantyUntil,
										onChange: (e) => setLines((xs) => xs.map((x, j) => j === i ? {
											...x,
											warrantyUntil: e.target.value
										} : x))
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-1.5",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "grid size-10 place-items-center text-subtle hover:text-danger",
										onClick: () => setLines((xs) => xs.length === 1 ? [emptyLine()] : xs.filter((_, j) => j !== i)),
										"aria-label": "Remove line",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
									})
								})
							]
						}, i)) })]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex flex-wrap gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						type: "button",
						onClick: () => setLines((xs) => [...xs, emptyLine()]),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), " Add line"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						disabled: receive.isPending,
						onClick: () => receive.mutate(),
						children: "Receive into stock"
					})]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "panel mt-4 p-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-sm font-semibold",
				children: "Recent receipts"
			}), (lots.data ?? []).length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-sm text-muted",
				children: "No intake lots yet."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 divide-y divide-border",
				children: (lots.data ?? []).map((lot) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex flex-wrap items-center justify-between gap-2 py-3 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-medium",
						children: lot.vendor
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted",
						children: [
							lot.packingRef || "No packing ref",
							" · ",
							lot.itemCount,
							" items · ",
							lot.receivedBy
						]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-subtle",
						children: formatStamp(lot.createdAt)
					})]
				}, lot.id))
			})]
		})
	] });
}
//#endregion
export { Page as component };
