import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { f as statusLabel } from "./format-D7enopbo.mjs";
import { t as cn } from "./utils-Bgaj78xo.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/badge-BzQb7lhS.js
var import_jsx_runtime = require_jsx_runtime();
function Badge({ className, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium", className),
		children
	});
}
function StatusBadge({ status }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
		className: {
			assigned: "bg-ok-bg text-ok-fg",
			in_stock: "bg-info-bg text-info-fg",
			repair: "bg-warn-bg text-warn-fg",
			retired: "bg-canvas text-muted",
			overdue: "bg-danger-bg text-danger-fg",
			fulfilled: "bg-ok-bg text-ok-fg",
			partial: "bg-warn-bg text-warn-fg",
			open: "bg-info-bg text-info-fg"
		}[status] ?? "bg-canvas text-muted",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("size-1.5 rounded-full", {
			assigned: "bg-ok",
			in_stock: "bg-info",
			repair: "bg-warn",
			retired: "bg-subtle",
			overdue: "bg-danger",
			fulfilled: "bg-ok",
			partial: "bg-warn",
			open: "bg-info"
		}[status] ?? "bg-subtle") }), statusLabel(status)]
	});
}
function OverdueBadge({ days }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
		className: "bg-danger text-primary-fg",
		children: [days, "d overdue"]
	});
}
//#endregion
export { OverdueBadge as n, StatusBadge as r, Badge as t };
