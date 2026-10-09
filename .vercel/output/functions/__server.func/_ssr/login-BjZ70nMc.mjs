import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { y as Navigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as GROK_PROVIDERS } from "./server-DvH8Kmt4.mjs";
import { C as Briefcase, n as Users, s as Shield, u as ScanLine } from "../_libs/lucide-react.mjs";
import { n as Route$4 } from "./router-BYz0bZbH.mjs";
import { r as signIn, t as authClient } from "./client-B40BzJxt.mjs";
import { t as cn } from "./utils-Bgaj78xo.mjs";
import { i as Input, n as Field, r as ForgeMark, s as useCurrentUserState, t as Button } from "./button-YfIMXCFs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-BjZ70nMc.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Login() {
	const { user, isPending } = useCurrentUserState();
	const search = Route$4.useSearch();
	const [role, setRole] = (0, import_react.useState)(search.role ?? "staff");
	const [mode, setMode] = (0, import_react.useState)("in");
	const [name, setName] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "min-h-dvh bg-canvas" });
	if (user) {
		if (role === "employee") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/portal" });
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, {
			to: "/",
			search: { role }
		});
	}
	const dest = role === "employee" ? "/portal" : `/?role=${role}`;
	async function onEmail(e) {
		e.preventDefault();
		setError(null);
		setBusy(true);
		try {
			if (mode === "up") {
				const { error: err } = await authClient.signUp.email({
					email,
					password,
					name: name || (role === "staff" ? "Lab assistant" : "Employee"),
					callbackURL: dest
				});
				if (err) throw new Error(err.message || "Could not create account");
			} else {
				const { error: err } = await authClient.signIn.email({
					email,
					password,
					callbackURL: dest
				});
				if (err) throw new Error(err.message || "Could not sign in");
			}
			window.location.href = dest;
		} catch (err) {
			setError(err instanceof Error ? err.message : "Something went wrong");
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid min-h-dvh lg:grid-cols-[1.05fr_1fr]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative hidden overflow-hidden bg-sidebar text-sidebar-fg lg:flex lg:flex-col lg:justify-between lg:p-12",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-0 opacity-40 [background-image:radial-gradient(circle_at_1px_1px,rgb(255_255_255/0.08)_1px,transparent_0)] [background-size:22px_22px]" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ForgeMark, { className: "size-10 text-brand" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-semibold",
								children: "AssetForge"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-sidebar-muted",
								children: "Training Hardware Inventory"
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-14 max-w-md font-display text-4xl font-semibold tracking-tight",
							children: "Hardware you can see. Custody you can prove."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 max-w-sm text-sm leading-relaxed text-sidebar-muted",
							children: "Scan a badge, hand out a laptop, take it back. Every move lands on an append-only audit trail for the training lab."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "relative grid gap-3 text-sm",
					children: [
						{
							icon: ScanLine,
							t: "Badge check-in / out"
						},
						{
							icon: Briefcase,
							t: "Live stock vs. assigned kit"
						},
						{
							icon: Shield,
							t: "Chain of custody + warranties"
						},
						{
							icon: Users,
							t: "Onboarding matched to free hardware"
						}
					].map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center gap-3 text-sidebar-muted",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "grid size-8 place-items-center rounded-lg bg-white/5",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(f.icon, { className: "size-4 text-brand" })
						}), f.t]
					}, f.t))
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "flex items-center justify-center bg-canvas px-4 py-10",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "w-full max-w-[400px]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-8 flex items-center gap-3 lg:hidden",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ForgeMark, { className: "size-9 text-brand" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-semibold",
							children: "AssetForge"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted",
							children: "Training Hardware Inventory"
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl font-semibold tracking-tight",
						children: mode === "in" ? "Sign in" : "Create an account"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: "Lab assistants run the console. Employees see their assigned kit."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 grid grid-cols-2 rounded-xl bg-surface p-1 shadow-[0_0_0_1px_var(--color-border)]",
						children: [{
							id: "staff",
							label: "Lab assistant"
						}, {
							id: "employee",
							label: "Employee"
						}].map((opt) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setRole(opt.id),
							className: cn("h-9 rounded-lg text-sm font-medium transition-colors", role === opt.id ? "bg-primary text-primary-fg shadow-sm" : "text-muted hover:text-fg"),
							children: opt.label
						}, opt.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: onEmail,
							className: "mt-6 space-y-3",
							children: [
								mode === "up" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Full name",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: name,
										onChange: (e) => setName(e.target.value),
										placeholder: role === "staff" ? "Vikram Iyer" : "Aarav Sharma",
										autoComplete: "name"
									})
								}) : null,
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Work email",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										type: "email",
										required: true,
										value: email,
										onChange: (e) => setEmail(e.target.value),
										placeholder: role === "staff" ? "admin@itlabs.io" : "aarav@itlabs.io",
										autoComplete: "email"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Password",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										type: "password",
										required: true,
										minLength: 8,
										value: password,
										onChange: (e) => setPassword(e.target.value),
										placeholder: "At least 8 characters",
										autoComplete: mode === "up" ? "new-password" : "current-password"
									})
								}),
								error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-danger",
									children: error
								}) : null,
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "submit",
									className: "w-full",
									disabled: busy,
									children: busy ? "Please wait…" : mode === "in" ? role === "staff" ? "Staff sign in" : "Employee sign in" : "Create account"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative my-6 text-center text-xs text-subtle",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "relative z-10 bg-canvas px-2",
								children: "or continue with"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-x-0 top-1/2 h-px bg-border" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid gap-2",
							children: GROK_PROVIDERS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "button",
								variant: "outline",
								onClick: () => signIn(p.providerId, { callbackURL: dest }),
								children: ["Continue with ", p.label]
							}, p.providerId))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-6 text-center text-sm text-muted",
							children: [
								mode === "in" ? "New to the lab?" : "Already have an account?",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "font-medium text-primary hover:underline",
									onClick: () => {
										setMode(mode === "in" ? "up" : "in");
										setError(null);
									},
									children: mode === "in" ? "Create an account" : "Sign in"
								})
							]
						})
					] })
				]
			})
		})]
	});
}
//#endregion
export { Login as component };
