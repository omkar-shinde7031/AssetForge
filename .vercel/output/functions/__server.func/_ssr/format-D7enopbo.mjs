import { n as createMiddleware } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/format-D7enopbo.js
/**
* Auth middleware for server functions — the standard way to get the caller's
* verified user id. When deployed the session cookie is same-origin and rides
* along automatically. In the live preview the client also forwards the bearer
* token (partitioned cookies) via the `.client` hook below — call sites do not
* thread it themselves.
*
*   import { createServerFn } from "@tanstack/react-start";
*   import { getSql } from "@/lib/db";
*   import { authMiddleware } from "@/lib/auth/middleware";
*
*   export const listTodos = createServerFn({ method: "GET" })
*     .middleware([authMiddleware])
*     .handler(async ({ context }) => {
*       const sql = await getSql();
*       return sql`select * from todos where user_id = ${context.userId}`;
*     });
*
* Signed out with auth on (live preview included) -> throws `UnauthorizedError`
* (see `verify.server.ts`). With auth disabled (`VITE_AUTH_ENABLED=false`, the
* shipped default) it resolves the shared dev user — but throws instead when a
* `DATABASE_URL` is also set, so an app without sign-in must not use this at
* all. On the auth-on path, use it on every server function that touches
* per-user data and scope every query by `context.userId`.
*/
var authMiddleware = createMiddleware({ type: "function" }).client(async ({ next }) => {
	const { getBearerToken } = await import("./client-B40BzJxt.mjs").then((n) => n.n).then((n) => n.n);
	return next({ sendContext: { bearerToken: getBearerToken() ?? void 0 } });
}).server(async ({ next, context }) => {
	const { assertSameSiteRequest } = await import("./isolation.server-CGNg1r0B.mjs");
	const { requireUserId } = await import("./verify.server-eiLPkmxe.mjs");
	assertSameSiteRequest();
	return next({ context: { userId: await requireUserId(context.bearerToken) } });
});
function formatInr(n) {
	return new Intl.NumberFormat("en-IN", {
		style: "currency",
		currency: "INR",
		maximumFractionDigits: 0
	}).format(n);
}
function parseDate(value) {
	if (!value) return null;
	const iso = value.length === 10 ? `${value}T00:00:00` : value;
	const d = new Date(iso);
	return Number.isNaN(d.getTime()) ? null : d;
}
function asDateString(value) {
	if (value == null || value === "") return null;
	if (value instanceof Date) return value.toISOString().slice(0, 10);
	return String(value).slice(0, 10);
}
function asIso(value) {
	if (value instanceof Date) return value.toISOString();
	return String(value ?? "");
}
function startOfToday() {
	const d = /* @__PURE__ */ new Date();
	d.setHours(0, 0, 0, 0);
	return d;
}
function daysUntil(dateStr) {
	const d = parseDate(dateStr);
	if (!d) return null;
	const now = startOfToday();
	return Math.round((d.getTime() - now.getTime()) / 864e5);
}
function monthsUntil(dateStr) {
	const days = daysUntil(dateStr);
	if (days == null) return null;
	return Math.max(0, Math.round(days / 30.437));
}
function overdueDays(due, returned) {
	if (returned || !due) return null;
	const n = daysUntil(due);
	if (n === null || n >= 0) return null;
	return Math.abs(n);
}
function statusLabel(status) {
	switch (status) {
		case "assigned": return "Assigned";
		case "in_stock": return "In Stock";
		case "repair": return "Under Repair";
		case "retired": return "Retired";
		case "overdue": return "Overdue";
		default: return status;
	}
}
function formatStamp(iso) {
	const d = parseDate(iso) ?? new Date(iso);
	if (Number.isNaN(d.getTime())) return iso;
	return d.toLocaleString("en-US", {
		month: "numeric",
		day: "numeric",
		year: "numeric",
		hour: "numeric",
		minute: "2-digit",
		second: "2-digit",
		hour12: true
	});
}
function formatShortDate(value) {
	const d = parseDate(value);
	if (!d) return "—";
	return d.toLocaleDateString("en-GB", {
		day: "2-digit",
		month: "short",
		year: "numeric"
	});
}
function todayIso() {
	return startOfToday().toISOString().slice(0, 10);
}
function plusYearsIso(years) {
	const d = startOfToday();
	d.setFullYear(d.getFullYear() + years);
	return d.toISOString().slice(0, 10);
}
function nextTag(category, existing) {
	const prefix = {
		Laptop: "LAP",
		Desktop: "DSK",
		Monitor: "MON",
		RAM: "RAM",
		SSD: "SSD",
		Peripheral: "PER",
		Server: "SRV",
		Network: "NET"
	}[category] ?? "AST";
	let max = 0;
	for (const tag of existing) {
		if (!tag.startsWith(`${prefix}-`)) continue;
		const n = Number(tag.slice(prefix.length + 1));
		if (Number.isFinite(n) && n > max) max = n;
	}
	return `${prefix}-${String(max + 1).padStart(4, "0")}`;
}
//#endregion
export { formatInr as a, monthsUntil as c, plusYearsIso as d, statusLabel as f, daysUntil as i, nextTag as l, asIso as n, formatShortDate as o, todayIso as p, authMiddleware as r, formatStamp as s, asDateString as t, overdueDays as u };
