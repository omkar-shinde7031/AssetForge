import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { c as Slot } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { t as authClient } from "./client-B40BzJxt.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as cn } from "./utils-Bgaj78xo.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/button-YfIMXCFs.js
var import_jsx_runtime = require_jsx_runtime();
/**
* Current user + loading state. Same behavior in live preview and when deployed:
*   - Auth enabled -> the real signed-in user; `user` is `null` while
*                            the session resolves (`isPending: true`) and when
*                            signed out (`isPending: false`). Session comes from
*                            Better Auth `useSession()` → `/api/auth/get-session`
*                            (cookie when deployed; bearer in live preview).
*   - Auth disabled (`VITE_AUTH_ENABLED=false`) -> `DEV_USER`, never pending.
*
* Protect a route by waiting out `isPending` before acting on `user` —
* redirecting on `user: null` alone bounces signed-in visitors to sign-in on
* every hard reload:
*
*   import { RedirectToSignIn } from "@/lib/auth/gates";
*   const { user, isPending } = useCurrentUserState();
*   if (isPending) return null;              // still resolving — don't redirect yet
*   if (!user) return <RedirectToSignIn />;  // definitely signed out
*
* `authEnabled` is a module-level constant fixed at load, so the guarded hook
* call keeps a stable hook order across every render of a given component.
*/
function useCurrentUserState() {
	const { data, isPending } = authClient.useSession();
	const user = data?.user;
	return {
		user: user ? {
			id: user.id,
			displayName: user.name ?? null,
			primaryEmail: user.email ?? null,
			profileImageUrl: user.image ?? null,
			isDevFallback: false
		} : null,
		isPending
	};
}
/**
* Convenience view of `useCurrentUserState().user` for display (e.g.
* `user?.displayName ?? "Guest"`). NOTE: `null` means *loading OR signed out* —
* for redirects/guards use `useCurrentUserState()` and check `isPending`.
*/
function useCurrentUser() {
	return useCurrentUserState().user;
}
function ForgeMark({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 32 32",
		className: cn("size-8", className),
		"aria-hidden": true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				width: "32",
				height: "32",
				rx: "8",
				fill: "currentColor"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "11",
				cy: "11",
				r: "3.1",
				fill: "#04332F"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "21",
				cy: "11",
				r: "3.1",
				fill: "#04332F"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "11",
				cy: "21",
				r: "3.1",
				fill: "#04332F"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "21",
				cy: "21",
				r: "3.1",
				fill: "#04332F"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M13.2 11h5.6M11 13.2v5.6M21 13.2v5.6M13.2 21h5.6",
				stroke: "#04332F",
				strokeWidth: "1.6",
				strokeLinecap: "round"
			})
		]
	});
}
function Input({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		className: cn("h-10 w-full rounded-lg bg-surface px-3 text-sm text-fg shadow-[0_0_0_1px_var(--color-border)] outline-none transition-[box-shadow] placeholder:text-subtle focus-visible:shadow-[0_0_0_2px_var(--color-ring)]", className),
		...props
	});
}
function Textarea({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("min-h-24 w-full rounded-lg bg-surface px-3 py-2 text-sm text-fg shadow-[0_0_0_1px_var(--color-border)] outline-none transition-[box-shadow] placeholder:text-subtle focus-visible:shadow-[0_0_0_2px_var(--color-ring)]", className),
		...props
	});
}
function Label({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
		className: cn("mb-1.5 block text-xs font-medium text-muted", className),
		...props
	});
}
function Field({ label, children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: label }), children]
	});
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-[background-color,box-shadow,transform,opacity] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0 active:scale-[0.98]", {
	variants: {
		variant: {
			default: "bg-primary text-primary-fg shadow-sm hover:bg-primary-hover",
			outline: "bg-surface text-fg shadow-[0_0_0_1px_var(--color-border)] hover:bg-canvas",
			ghost: "text-muted hover:bg-canvas hover:text-fg",
			danger: "bg-danger text-white hover:bg-danger-fg",
			brand: "bg-brand text-brand-ink hover:opacity-90"
		},
		size: {
			default: "h-10 px-4",
			sm: "h-8 rounded-md px-3 text-xs",
			lg: "h-11 px-5",
			icon: "size-10"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button({ className, variant, size, asChild, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size
		}), className),
		...props
	});
}
//#endregion
export { Textarea as a, Input as i, Field as n, useCurrentUser as o, ForgeMark as r, useCurrentUserState as s, Button as t };
