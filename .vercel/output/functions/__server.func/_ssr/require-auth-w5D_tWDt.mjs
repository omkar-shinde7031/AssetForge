import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as useNavigate, d as useRouterState, v as Link, y as Navigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as getServerFnById, i as TSS_SERVER_FUNCTION, r as createServerFn } from "./ssr.mjs";
import { r as authMiddleware } from "./format-D7enopbo.mjs";
import { a as hasGateSessionMarker } from "./server-DvH8Kmt4.mjs";
import { C as Briefcase, E as ArrowLeftRight, S as ChartColumn, _ as Menu, g as PackagePlus, l as Search, n as Users, s as Shield, t as X, u as ScanLine, x as ClipboardList, y as LayoutDashboard } from "../_libs/lucide-react.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { i as signOut } from "./client-B40BzJxt.mjs";
import { n as initials, t as cn } from "./utils-Bgaj78xo.mjs";
import { i as Input, o as useCurrentUser, r as ForgeMark, s as useCurrentUserState } from "./button-YfIMXCFs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/require-auth-w5D_tWDt.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var subscribeToNothing = () => () => {};
var noGateSessionOnServer = () => false;
/**
* Auth state components — plain wrappers around `useCurrentUserState()`.
*
* With auth on, visitors are signed out until they authenticate — in the sandbox
* live preview too, which does real sign-in. The shared dev user appears only
* when auth is disabled (`VITE_AUTH_ENABLED=false`, the shipped default).
* While the session is still resolving, gates that care about signed-out state
* render nothing so there's no signed-out flash on hard reload.
*/
/** Where `RedirectToSignIn` sends signed-out visitors. Create this route. */
var SIGN_IN_PATH = "/login";
/**
* Client-side redirect to the sign-in route (TanStack `<Navigate>` — NOT a full
* `window.location` reload). A hard navigation re-bootstraps the SPA and re-runs
* session loading, which feels like a second "Loading…" on /login.
*
* Guard routes by waiting out `isPending` first (see `use-current-user`), then
* render this.
*/
function RedirectToSignIn({ to = SIGN_IN_PATH }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to });
}
/**
* Minimal signed-in identity chip + sign-out. Restyle freely (see the
* `design-ui` skill). Sign-out is only shown when auth is enabled (the
* disabled-auth dev user has nothing to sign out of) and the session is not
* gate-materialized — behind the gate the next request signs the viewer
* straight back in, so a sign-out control there is a broken loop.
*/
function UserButton() {
	const user = useCurrentUser();
	const [signingOut, setSigningOut] = (0, import_react.useState)(false);
	const gateSession = (0, import_react.useSyncExternalStore)(subscribeToNothing, hasGateSessionMarker, noGateSessionOnServer);
	if (!user) return null;
	const label = user.displayName ?? user.primaryEmail ?? "Account";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2",
		children: [
			user.profileImageUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: user.profileImageUrl,
				alt: "",
				className: "h-8 w-8 rounded-full object-cover"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "grid h-8 w-8 place-items-center rounded-full bg-black/10 text-sm font-medium dark:bg-white/20",
				children: label.charAt(0).toUpperCase()
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-sm font-medium",
				children: label
			}),
			!gateSession && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				disabled: signingOut,
				onClick: () => {
					setSigningOut(true);
					signOut().catch(() => setSigningOut(false));
				},
				className: "cursor-pointer text-sm underline-offset-4 opacity-70 hover:underline disabled:cursor-wait disabled:no-underline",
				children: signingOut ? "Signing out…" : "Sign out"
			})
		]
	});
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var getProfile = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((d) => d ?? {}).handler(createSsrRpc("f0b6ae6881717710a319a23be38619f896f2f1b4e77dfa6f8f1f2c225c8d2e1b"));
var getDashboard = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("2834875938522524f82d22285f32ee725ef8521dd02e4911423f3fe6a1ffa75d"));
var listAssets = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("84675fe8b9b796d741f99781c87c984ffbe5c42f9441201e02842b6146a03389"));
var saveAsset = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((d) => d).handler(createSsrRpc("d43ce82de04c8c3a8033efe2ef57b2b34d1d8ff8fd4df2054146c3543287524a"));
var deleteAsset = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((id) => id).handler(createSsrRpc("19b66e9c71d04f7ee18b216fb42dc8234e99d9bfd6b94a2e2cf7be06c3922aea"));
var suggestTag = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((category) => category).handler(createSsrRpc("c58fb9d047b5ea3d044be6feef4ddf557e12d6fa64db2b14bb4deccf1035a92e"));
var listEmployees = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("75240540a0ae7cf435b13ced621e1061b32951f47fd74d799c0767f1b34501d3"));
var saveEmployee = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((d) => d).handler(createSsrRpc("07df3212f89499219b011ac70ba11d5db2cd71b13ebe6c7f40c2200ceeb6229b"));
var deleteEmployee = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((id) => id).handler(createSsrRpc("b236670fe39c6e10ea152047eb695fc4f59b788ed3f57b4516e955f38e3a9090"));
var listAssignments = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("0bdb611d096d9acc51da2c2d0372b9d72afde51ef087d04a676f4d22dc476205"));
var createAssignment = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((d) => d).handler(createSsrRpc("7acf4855e884e75ab879179a3785a1032bcbc680b1b41dc3c45de277481ecab6"));
var returnAsset = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((assignmentId) => assignmentId).handler(createSsrRpc("a941496e82aa6fe23cb236fc9e8ce27eb2dfb11b0028a49503ab656562b03b33"));
var lookupPerson = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((q) => q.trim()).handler(createSsrRpc("3814186c45112e3773f4a75dd734688a0c6b7e4290691c9646145226e7ebba27"));
var listOnboarding = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("14c4933d14dec372a3bfc1e00bf1765793e99561e15081507b5584e43068735c"));
var stockByCategory = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("e1169e489bc0c3b7ecc9d310959652cc85e974b34b4e423f79c6991860b64a47"));
var submitOnboarding = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((d) => d).handler(createSsrRpc("b683c8859b9c219731d9d6b163f5dd06cd67a782bd773a8dd86ead15b1f30431"));
var getAudit = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("fec46e84e56b428ff533f1dca7e8a85a820a046681444eefa02e5f2b3db2ee05"));
var getReports = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("5280f1dcf8ccbeb0f0f0451c1617cdc88d344532b79a32184d0f43bdc365e0ea"));
var listIntake = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("48ceaf63a96b36ada27bd8081d26440a197d8bcb73b0d16d25f992273539b7e5"));
var receiveIntake = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((d) => d).handler(createSsrRpc("591b347809589d78158f7f9c3887d08a1c480bfbf564a3ebfe73dfbfabba9639"));
var resetDemo = createServerFn({ method: "POST" }).middleware([authMiddleware]).handler(createSsrRpc("fbbb87873f0519a07605bb7fd6c00f6f2a5bb49e4f42bf99eb953fa8a57a5114"));
var getMyKit = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("b11e3b3772f52a2f898579851fa26118b0beb83abeaec1df786536bf8e5c98ed"));
var submitSelfRequest = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((d) => d).handler(createSsrRpc("40dd0918d248d2618aabc14f963e0d505fad98cd5746c91f482b931c75374b1f"));
var STAFF_NAV = [
	{
		to: "/",
		label: "Dashboard",
		icon: LayoutDashboard
	},
	{
		to: "/check-in",
		label: "Check-In / Out",
		icon: ScanLine
	},
	{
		to: "/intake",
		label: "Intake Panel",
		icon: PackagePlus
	},
	{
		to: "/onboarding",
		label: "Onboarding Requests",
		icon: ClipboardList
	},
	{
		to: "/assets",
		label: "Assets",
		icon: Briefcase
	},
	{
		to: "/assignments",
		label: "Assignments",
		icon: ArrowLeftRight
	},
	{
		to: "/employees",
		label: "Employees",
		icon: Users
	},
	{
		to: "/audit",
		label: "Audit Trail",
		icon: Shield
	},
	{
		to: "/reports",
		label: "Reports",
		icon: ChartColumn
	}
];
function navClass(active) {
	return cn("flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors", active ? "bg-sidebar-active text-sidebar-fg" : "text-sidebar-muted hover:bg-sidebar-hover hover:text-sidebar-fg");
}
function SidebarNav({ onNavigate }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
		className: "flex flex-col gap-0.5 px-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mb-2 px-3 text-xs font-medium tracking-wide text-sidebar-muted uppercase",
			children: "Workspace"
		}), STAFF_NAV.map((item) => {
			const Icon = item.icon;
			const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: item.to,
				onClick: onNavigate,
				className: navClass(active),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
					className: "size-4 shrink-0",
					strokeWidth: 1.8
				}), item.label]
			}, item.to);
		})]
	});
}
function SidebarFooter({ profile }) {
	const user = useCurrentUser();
	const name = profile.displayName || user?.displayName || "IT Admin";
	const email = profile.email || user?.primaryEmail || "";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-auto border-t border-sidebar-fg/10 px-4 py-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid size-9 shrink-0 place-items-center rounded-full bg-brand/20 text-xs font-semibold text-brand",
				children: initials(name)
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "truncate text-sm font-medium text-sidebar-fg",
					children: name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "truncate text-xs text-sidebar-muted",
					children: email
				})]
			})]
		})
	});
}
function HeaderSearch() {
	const navigate = useNavigate();
	const [q, setQ] = (0, import_react.useState)("");
	function onSubmit(e) {
		e.preventDefault();
		navigate({
			to: "/assets",
			search: { q: q.trim() || void 0 }
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit,
		className: "relative hidden min-w-0 max-w-md flex-1 md:block",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-subtle" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
			className: "h-9 pl-9",
			value: q,
			onChange: (e) => setQ(e.target.value),
			placeholder: "Search assets, employees…",
			"aria-label": "Search inventory"
		})]
	});
}
function StaffShell({ profile, children }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const sidebar = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full flex-col bg-sidebar text-sidebar-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3 px-5 py-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ForgeMark, { className: "size-9 text-brand" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-semibold tracking-tight",
						children: "AssetForge"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-sidebar-muted",
						children: "Training Hardware"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarNav, { onNavigate: () => setOpen(false) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarFooter, { profile })
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-dvh overflow-x-hidden bg-canvas",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
				className: "sticky top-0 hidden h-dvh w-[248px] shrink-0 lg:block",
				children: sidebar
			}),
			open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "fixed inset-0 z-40 lg:hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "absolute inset-0 bg-fg/40",
					"aria-label": "Close menu",
					onClick: () => setOpen(false)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative h-full w-[248px]",
					children: sidebar
				})]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-w-0 flex-1 flex-col",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "sticky top-0 z-20 flex h-14 items-center justify-between gap-3 border-b border-border bg-surface/90 px-4 backdrop-blur-sm sm:px-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex min-w-0 items-center gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "grid size-9 place-items-center rounded-lg text-muted hover:bg-canvas lg:hidden",
								onClick: () => setOpen((v) => !v),
								"aria-label": "Open menu",
								children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-4" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate text-sm text-muted lg:hidden",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold text-fg",
									children: "AssetForge"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeaderSearch, {})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/portal",
							className: "hidden text-sm font-medium text-muted hover:text-fg sm:inline",
							children: "Employee Portal"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "[&_button]:text-xs [&_img]:size-7 [&_span.grid]:size-7",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserButton, {})
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					className: "min-w-0 flex-1 overflow-x-hidden px-4 py-6 sm:px-6 lg:px-8",
					children
				})]
			})
		]
	});
}
function EmployeeShell({ profile, children }) {
	const name = profile.displayName;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-canvas",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "sticky top-0 z-20 flex h-14 items-center justify-between border-b border-border bg-surface/90 px-4 backdrop-blur-sm sm:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/portal",
				className: "flex items-center gap-2.5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ForgeMark, { className: "size-8 text-brand" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm font-semibold",
						children: "AssetForge"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "hidden text-sm text-muted sm:inline",
						children: "Employee kit"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3",
				children: [
					profile.role === "staff" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "text-sm font-medium text-primary hover:underline",
						children: "Staff console"
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "hidden text-sm text-muted sm:inline",
						children: name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserButton, {})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
			className: "mx-auto w-full max-w-5xl px-4 py-8 sm:px-6",
			children
		})]
	});
}
function PageHeader({ icon, title, subtitle, actions }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-6 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
				className: "flex items-center gap-2.5 font-display text-2xl font-semibold tracking-tight text-fg",
				children: [icon, title]
			}), subtitle ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: subtitle
			}) : null]
		}), actions ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex shrink-0 flex-wrap items-center gap-2",
			children: actions
		}) : null]
	});
}
function KpiCard({ label, value, icon, iconClass }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "panel flex items-start justify-between gap-3 p-4 sm:p-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-medium text-muted",
				children: label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 font-display text-2xl font-semibold tracking-tight break-all tabular-nums",
				children: value
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("grid size-9 shrink-0 place-items-center rounded-lg", iconClass),
			children: icon
		})]
	});
}
function AppSkeleton() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-dvh bg-canvas",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "hidden w-[248px] bg-sidebar lg:block" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex-1 p-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-8 w-64 animate-pulse rounded-lg bg-border" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4",
				children: [
					0,
					1,
					2,
					3
				].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "panel h-24 animate-pulse bg-surface" }, i))
			})]
		})]
	});
}
function RequireAuth({ role, preferredRole, children }) {
	const { user, isPending } = useCurrentUserState();
	const profileQuery = useQuery({
		queryKey: ["profile", preferredRole ?? "auto"],
		queryFn: () => getProfile({ data: preferredRole ? { role: preferredRole } : {} }),
		enabled: Boolean(user)
	});
	if (isPending || user && profileQuery.isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppSkeleton, {});
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RedirectToSignIn, {});
	if (profileQuery.error) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid min-h-dvh place-items-center p-8 text-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted",
			children: "Could not load your workspace. Try signing in again."
		})
	});
	const profile = profileQuery.data;
	if (!profile) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppSkeleton, {});
	if (role === "staff" && profile.role !== "staff") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/portal" });
	const body = typeof children === "function" ? children(profile) : children;
	if (role === "employee" || profile.role === "employee" && role !== "staff") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmployeeShell, {
		profile,
		children: body
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StaffShell, {
		profile,
		children: body
	});
}
//#endregion
export { submitOnboarding as C, stockByCategory as S, suggestTag as T, receiveIntake as _, deleteAsset as a, saveAsset as b, getDashboard as c, listAssets as d, listAssignments as f, lookupPerson as g, listOnboarding as h, createAssignment as i, getMyKit as l, listIntake as m, PageHeader as n, deleteEmployee as o, listEmployees as p, RequireAuth as r, getAudit as s, KpiCard as t, getReports as u, resetDemo as v, submitSelfRequest as w, saveEmployee as x, returnAsset as y };
