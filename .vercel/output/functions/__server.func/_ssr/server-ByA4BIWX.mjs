import { i as TSS_SERVER_FUNCTION, r as createServerFn } from "./ssr.mjs";
import { d as plusYearsIso, l as nextTag, n as asIso, p as todayIso, r as authMiddleware, t as asDateString } from "./format-D7enopbo.mjs";
import { i as STARTER_KITS, n as DEPARTMENTS, t as CATEGORIES } from "./types-CU6PpdZ1.mjs";
import { r as getSql } from "./db-DD9pPUch.mjs";
import { r as newId } from "./utils-Bgaj78xo.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/server-ByA4BIWX.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var EMPLOYEES = [
	{
		id: "e1",
		full_name: "Aarav Sharma",
		email: "aarav@itlabs.io",
		title: "Senior Developer",
		department: "Engineering"
	},
	{
		id: "e2",
		full_name: "Priya Menon",
		email: "priya@itlabs.io",
		title: "Product Designer",
		department: "Design"
	},
	{
		id: "e3",
		full_name: "Rahul Verma",
		email: "rahul@itlabs.io",
		title: "SRE",
		department: "DevOps"
	},
	{
		id: "e4",
		full_name: "Sana Kapoor",
		email: "sana@itlabs.io",
		title: "QA Engineer",
		department: "QA"
	},
	{
		id: "e5",
		full_name: "Vikram Iyer",
		email: "vikram@itlabs.io",
		title: "IT Admin",
		department: "IT Support"
	},
	{
		id: "e6",
		full_name: "Meera Joshi",
		email: "meera@itlabs.io",
		title: "Product Manager",
		department: "Marketing"
	},
	{
		id: "e7",
		full_name: "Arjun Rao",
		email: "arjun@itlabs.io",
		title: "Product Manager",
		department: "Sales"
	},
	{
		id: "e8",
		full_name: "Diya Nair",
		email: "diya@itlabs.io",
		title: "Software Engineer",
		department: "Engineering"
	}
];
var ASSETS = [
	{
		id: "LAP-0001",
		tag: "LAP-0001",
		name: "MacBook Pro 16 M3",
		vendor: "Apple",
		serial: "C02XL0AAJG5H",
		category: "Laptop",
		status: "assigned",
		location: "HQ - Floor 3",
		cost_inr: 249e3,
		warranty_until: "2027-05-20"
	},
	{
		id: "LAP-0002",
		tag: "LAP-0002",
		name: "Dell XPS 15",
		vendor: "Dell",
		serial: "DXP15-99231",
		category: "Laptop",
		status: "assigned",
		location: "HQ - Floor 2",
		cost_inr: 145e3,
		warranty_until: "2027-02-16"
	},
	{
		id: "LAP-0003",
		tag: "LAP-0003",
		name: "ThinkPad X1 Carbon",
		vendor: "Lenovo",
		serial: "TP-X1C-3391",
		category: "Laptop",
		status: "assigned",
		location: "HQ - Floor 1",
		cost_inr: 165e3,
		warranty_until: "2026-12-16"
	},
	{
		id: "LAP-0004",
		tag: "LAP-0004",
		name: "MacBook Air M2",
		vendor: "Apple",
		serial: "MBA-M2-4482",
		category: "Laptop",
		status: "in_stock",
		location: "Storage A",
		cost_inr: 11e4,
		warranty_until: "2027-11-01"
	},
	{
		id: "LAP-0005",
		tag: "LAP-0005",
		name: "HP EliteBook 840",
		vendor: "HP",
		serial: "HP840-1182",
		category: "Laptop",
		status: "in_stock",
		location: "Storage A",
		cost_inr: 98e3,
		warranty_until: "2028-01-08"
	},
	{
		id: "DSK-0001",
		tag: "DSK-0001",
		name: "iMac 27\"",
		vendor: "Apple",
		serial: "IMAC27-4401",
		category: "Desktop",
		status: "assigned",
		location: "HQ - Design Studio",
		cost_inr: 189e3,
		warranty_until: "2026-10-16"
	},
	{
		id: "DSK-0002",
		tag: "DSK-0002",
		name: "Dell OptiPlex 7010",
		vendor: "Dell",
		serial: "OPT7010-882",
		category: "Desktop",
		status: "in_stock",
		location: "Storage A",
		cost_inr: 72e3,
		warranty_until: "2028-03-12"
	},
	{
		id: "MON-0011",
		tag: "MON-0011",
		name: "LG UltraFine 27\"",
		vendor: "LG",
		serial: "LGU27-4421",
		category: "Monitor",
		status: "in_stock",
		location: "Storage A",
		cost_inr: 38e3,
		warranty_until: "2027-06-01"
	},
	{
		id: "MON-0012",
		tag: "MON-0012",
		name: "Dell U2723QE",
		vendor: "Dell",
		serial: "DU27-88123",
		category: "Monitor",
		status: "assigned",
		location: "HQ - Floor 3",
		cost_inr: 62e3,
		warranty_until: "2027-11-20"
	},
	{
		id: "MON-0013",
		tag: "MON-0013",
		name: "Samsung Odyssey G7",
		vendor: "Samsung",
		serial: "SOG7-2291",
		category: "Monitor",
		status: "in_stock",
		location: "Storage A",
		cost_inr: 54e3,
		warranty_until: "2027-09-01"
	},
	{
		id: "RAM-0044",
		tag: "RAM-0044",
		name: "Corsair Vengeance 32GB DDR5",
		vendor: "Corsair",
		serial: "CV32-DDR5-77",
		category: "RAM",
		status: "in_stock",
		location: "Storage B",
		cost_inr: 12500,
		warranty_until: "2029-03-04"
	},
	{
		id: "RAM-0045",
		tag: "RAM-0045",
		name: "Kingston Fury 16GB DDR5",
		vendor: "Kingston",
		serial: "KF16-DDR5-02",
		category: "RAM",
		status: "in_stock",
		location: "Storage B",
		cost_inr: 6200,
		warranty_until: "2029-01-20"
	},
	{
		id: "SSD-0032",
		tag: "SSD-0032",
		name: "Samsung 990 Pro 2TB",
		vendor: "Samsung",
		serial: "S990-99A21",
		category: "SSD",
		status: "in_stock",
		location: "Storage B",
		cost_inr: 18500,
		warranty_until: "2028-01-12"
	},
	{
		id: "SSD-0033",
		tag: "SSD-0033",
		name: "WD Black SN850X 1TB",
		vendor: "Western Digital",
		serial: "WDB-SN850-11",
		category: "SSD",
		status: "in_stock",
		location: "Storage B",
		cost_inr: 9800,
		warranty_until: "2028-06-01"
	},
	{
		id: "PER-0001",
		tag: "PER-0001",
		name: "Logitech MX Keys",
		vendor: "Logitech",
		serial: "MXK-44821",
		category: "Peripheral",
		status: "in_stock",
		location: "Storage B",
		cost_inr: 9500,
		warranty_until: "2027-08-01"
	},
	{
		id: "PER-0002",
		tag: "PER-0002",
		name: "Logitech MX Master 3S",
		vendor: "Logitech",
		serial: "MXM-33910",
		category: "Peripheral",
		status: "repair",
		location: "IT Repair Bench",
		cost_inr: 8200,
		warranty_until: "2027-04-18"
	},
	{
		id: "SRV-0002",
		tag: "SRV-0002",
		name: "Dell PowerEdge R750",
		vendor: "Dell",
		serial: "PE750-8821",
		category: "Server",
		status: "assigned",
		location: "Data Center",
		cost_inr: 48e4,
		warranty_until: "2027-07-15"
	},
	{
		id: "NET-0001",
		tag: "NET-0001",
		name: "Ubiquiti UDM Pro",
		vendor: "Ubiquiti",
		serial: "UDMP-3382",
		category: "Network",
		status: "in_stock",
		location: "Data Center",
		cost_inr: 42e3,
		warranty_until: "2027-01-10"
	}
];
var ASSIGNMENTS = [
	{
		id: "as1",
		asset_id: "LAP-0001",
		employee_id: "e1",
		assigned_at: "2026-01-15",
		due_back: "2027-01-15",
		note: "Primary engineering kit",
		assigned_by: "IT Admin"
	},
	{
		id: "as2",
		asset_id: "LAP-0002",
		employee_id: "e6",
		assigned_at: "2026-02-20",
		due_back: "2027-02-20",
		note: "",
		assigned_by: "IT Admin"
	},
	{
		id: "as3",
		asset_id: "LAP-0003",
		employee_id: "e7",
		assigned_at: "2026-03-10",
		due_back: "2026-06-10",
		note: "Field kit — overdue for return",
		assigned_by: "IT Admin"
	},
	{
		id: "as4",
		asset_id: "DSK-0001",
		employee_id: "e2",
		assigned_at: "2026-04-05",
		due_back: "2027-04-05",
		note: "Design studio workstation",
		assigned_by: "IT Admin"
	},
	{
		id: "as5",
		asset_id: "MON-0012",
		employee_id: "e1",
		assigned_at: "2026-01-25",
		due_back: "2027-01-25",
		note: "Secondary display",
		assigned_by: "IT Admin"
	},
	{
		id: "as6",
		asset_id: "SRV-0002",
		employee_id: "e3",
		assigned_at: "2025-11-20",
		due_back: "2027-11-20",
		note: "DC steward",
		assigned_by: "IT Admin"
	}
];
var AUDIT = [
	{
		id: "ae1",
		action: "assigned",
		asset_id: "LAP-0001",
		employee_id: "e1",
		location: "HQ - Floor 3",
		actor: "IT Admin",
		summary: "LAP-0001 · MacBook Pro 16 M3 handed to Aarav Sharma at HQ - Floor 3",
		due_back: "2027-01-15",
		created_at: "2026-01-15T10:30:00+05:30"
	},
	{
		id: "ae2",
		action: "assigned",
		asset_id: "LAP-0002",
		employee_id: "e6",
		location: "HQ - Floor 2",
		actor: "IT Admin",
		summary: "LAP-0002 · Dell XPS 15 handed to Meera Joshi at HQ - Floor 2",
		due_back: "2027-02-20",
		created_at: "2026-02-20T11:10:00+05:30"
	},
	{
		id: "ae3",
		action: "assigned",
		asset_id: "LAP-0003",
		employee_id: "e7",
		location: "HQ - Floor 1",
		actor: "IT Admin",
		summary: "LAP-0003 · ThinkPad X1 Carbon handed to Arjun Rao at HQ - Floor 1",
		due_back: "2026-06-10",
		created_at: "2026-03-10T09:42:00+05:30"
	},
	{
		id: "ae4",
		action: "assigned",
		asset_id: "DSK-0001",
		employee_id: "e2",
		location: "HQ - Design Studio",
		actor: "IT Admin",
		summary: "DSK-0001 · iMac 27\" handed to Priya Menon at HQ - Design Studio",
		due_back: "2027-04-05",
		created_at: "2026-04-05T14:05:00+05:30"
	},
	{
		id: "ae5",
		action: "assigned",
		asset_id: "MON-0012",
		employee_id: "e1",
		location: "HQ - Floor 3",
		actor: "IT Admin",
		summary: "MON-0012 · Dell U2723QE handed to Aarav Sharma at HQ - Floor 3",
		due_back: "2027-01-25",
		created_at: "2026-01-25T16:12:00+05:30"
	},
	{
		id: "ae6",
		action: "assigned",
		asset_id: "SRV-0002",
		employee_id: "e3",
		location: "Data Center",
		actor: "IT Admin",
		summary: "SRV-0002 · Dell PowerEdge R750 handed to Rahul Verma at Data Center",
		due_back: "2027-11-20",
		created_at: "2025-11-20T08:00:00+05:30"
	}
];
var DEMO_SEED_MARKER = "DSK-0001";
async function applySeed(sql, force = false) {
	const counts = await sql`select count(*)::int as n from assets`;
	const marker = await sql.query(`select id from assets where id = $1`, [DEMO_SEED_MARKER]);
	const stale = (counts[0]?.n ?? 0) > 0 && marker.length === 0;
	if ((counts[0]?.n ?? 0) > 0 && !force && !stale) return;
	if (force || stale) {
		await sql`delete from audit_events`;
		await sql`delete from assignments`;
		await sql`delete from onboarding_requests`;
		await sql`delete from intake_lots`;
		await sql`delete from assets`;
		await sql`delete from employees`;
	}
	for (const e of EMPLOYEES) await sql.query(`insert into employees (id, full_name, email, title, department)
       values ($1,$2,$3,$4,$5)
       on conflict (id) do update set
         full_name = excluded.full_name,
         email = excluded.email,
         title = excluded.title,
         department = excluded.department`, [
		e.id,
		e.full_name,
		e.email,
		e.title,
		e.department
	]);
	for (const a of ASSETS) await sql.query(`insert into assets
         (id, tag, name, vendor, serial, category, status, location, cost_inr, warranty_until)
       values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
       on conflict (id) do update set
         tag = excluded.tag,
         name = excluded.name,
         vendor = excluded.vendor,
         serial = excluded.serial,
         category = excluded.category,
         status = excluded.status,
         location = excluded.location,
         cost_inr = excluded.cost_inr,
         warranty_until = excluded.warranty_until`, [
		a.id,
		a.tag,
		a.name,
		a.vendor,
		a.serial,
		a.category,
		a.status,
		a.location,
		a.cost_inr,
		a.warranty_until
	]);
	for (const s of ASSIGNMENTS) await sql.query(`insert into assignments
         (id, asset_id, employee_id, assigned_at, due_back, note, assigned_by)
       values ($1,$2,$3,$4,$5,$6,$7)
       on conflict (id) do update set
         asset_id = excluded.asset_id,
         employee_id = excluded.employee_id,
         assigned_at = excluded.assigned_at,
         due_back = excluded.due_back,
         note = excluded.note,
         assigned_by = excluded.assigned_by`, [
		s.id,
		s.asset_id,
		s.employee_id,
		s.assigned_at,
		s.due_back,
		s.note,
		s.assigned_by
	]);
	for (const ev of AUDIT) await sql.query(`insert into audit_events
         (id, action, asset_id, employee_id, location, actor, summary, due_back, created_at)
       values ($1,$2,$3,$4,$5,$6,$7,$8,$9)
       on conflict (id) do update set
         action = excluded.action,
         asset_id = excluded.asset_id,
         employee_id = excluded.employee_id,
         location = excluded.location,
         actor = excluded.actor,
         summary = excluded.summary,
         due_back = excluded.due_back`, [
		ev.id,
		ev.action,
		ev.asset_id,
		ev.employee_id,
		ev.location,
		ev.actor,
		ev.summary,
		ev.due_back,
		ev.created_at
	]);
}
async function actorOf(sql, userId) {
	const u = (await sql.query(`select id, name, email from "user" where id = $1`, [userId]))[0];
	return {
		name: u?.name || "IT Admin",
		email: u?.email ?? null
	};
}
async function getProfileRow(sql, userId) {
	return (await sql.query(`select user_id, role, employee_id, display_name from profiles where user_id = $1`, [userId]))[0] ?? null;
}
async function ensureReady(sql) {
	await applySeed(sql, false);
}
async function loadProfile(sql, userId, preferred) {
	await ensureReady(sql);
	const actor = await actorOf(sql, userId);
	let row = await getProfileRow(sql, userId);
	if (!row) {
		const role = preferred ?? "staff";
		let employeeId = null;
		if (role === "employee" && actor.email) {
			const existing = await sql.query(`select id from employees where lower(email) = lower($1)`, [actor.email]);
			if (existing[0]) {
				employeeId = existing[0].id;
				await sql.query(`update employees set user_id = $1 where id = $2`, [userId, employeeId]);
			} else {
				employeeId = await nextEmployeeId(sql);
				await sql.query(`insert into employees (id, user_id, full_name, email, title, department)
           values ($1,$2,$3,$4,$5,$6)`, [
					employeeId,
					userId,
					actor.name,
					actor.email,
					"Team member",
					"Engineering"
				]);
			}
		}
		await sql.query(`insert into profiles (user_id, role, employee_id, display_name)
       values ($1,$2,$3,$4)
       on conflict (user_id) do nothing`, [
			userId,
			role,
			employeeId,
			actor.name
		]);
		row = await getProfileRow(sql, userId);
	}
	if (!row) throw new Error("Failed to create profile");
	return {
		userId,
		role: row.role,
		employeeId: row.employee_id,
		displayName: row.display_name || actor.name,
		email: actor.email
	};
}
async function requireStaff(sql, userId) {
	const p = await loadProfile(sql, userId);
	if (p.role !== "staff") throw new Error("Staff only");
	return p;
}
async function nextEmployeeId(sql) {
	const rows = await sql`select id from employees`;
	let max = 0;
	for (const r of rows) {
		const n = Number(String(r.id).replace(/^e/i, ""));
		if (Number.isFinite(n) && n > max) max = n;
	}
	return `e${max + 1}`;
}
function mapAsset(r) {
	return {
		id: String(r.id),
		tag: String(r.tag),
		name: String(r.name),
		vendor: String(r.vendor ?? ""),
		serial: String(r.serial ?? ""),
		category: String(r.category),
		status: String(r.status),
		location: String(r.location ?? ""),
		costInr: Number(r.cost_inr ?? 0),
		warrantyUntil: asDateString(r.warranty_until),
		notes: String(r.notes ?? ""),
		assignedToId: r.assigned_to_id ? String(r.assigned_to_id) : null,
		assignedToName: r.assigned_to_name ? String(r.assigned_to_name) : null
	};
}
var ASSET_SELECT = `
  select a.id, a.tag, a.name, a.vendor, a.serial, a.category, a.status, a.location,
         a.cost_inr, a.warranty_until, a.notes,
         e.id as assigned_to_id, e.full_name as assigned_to_name
  from assets a
  left join assignments s on s.asset_id = a.id and s.returned_at is null
  left join employees e on e.id = s.employee_id
`;
async function listAssetRows(sql) {
	return (await sql.query(`${ASSET_SELECT} order by a.tag`)).map(mapAsset);
}
function mapEmployee(r) {
	return {
		id: String(r.id),
		userId: r.user_id ? String(r.user_id) : null,
		fullName: String(r.full_name),
		email: String(r.email),
		title: String(r.title ?? ""),
		department: String(r.department ?? ""),
		assignedCount: Number(r.assigned_count ?? 0)
	};
}
function mapAssignment(r) {
	return {
		id: String(r.id),
		assetId: String(r.asset_id),
		assetTag: String(r.asset_tag),
		assetName: String(r.asset_name),
		employeeId: String(r.employee_id),
		employeeName: String(r.employee_name),
		department: String(r.department ?? ""),
		assignedAt: asDateString(r.assigned_at) ?? "",
		dueBack: asDateString(r.due_back),
		returnedAt: asDateString(r.returned_at),
		note: String(r.note ?? ""),
		assignedBy: String(r.assigned_by ?? ""),
		location: String(r.location ?? "")
	};
}
var ASSIGN_SELECT = `
  select s.id, s.asset_id, a.tag as asset_tag, a.name as asset_name, a.location,
         s.employee_id, e.full_name as employee_name, e.department,
         s.assigned_at, s.due_back, s.returned_at, s.note, s.assigned_by
  from assignments s
  join assets a on a.id = s.asset_id
  join employees e on e.id = s.employee_id
`;
async function writeAudit(sql, ev) {
	await sql.query(`insert into audit_events
       (id, action, asset_id, employee_id, location, actor, summary, due_back)
     values ($1,$2,$3,$4,$5,$6,$7,$8)`, [
		newId("ae"),
		ev.action,
		ev.assetId ?? null,
		ev.employeeId ?? null,
		ev.location ?? "",
		ev.actor,
		ev.summary,
		ev.dueBack ?? null
	]);
}
async function assignAsset(sql, opts) {
	const asset = (await sql.query(`select * from assets where id = $1`, [opts.assetId]))[0];
	if (!asset) throw new Error("Asset not found");
	if (String(asset.status) !== "in_stock") throw new Error("Asset is not in stock");
	const emp = (await sql.query(`select full_name from employees where id = $1`, [opts.employeeId]))[0];
	if (!emp) throw new Error("Employee not found");
	const location = opts.location || String(asset.location ?? "");
	await sql.query(`insert into assignments (id, asset_id, employee_id, assigned_at, due_back, note, assigned_by)
     values ($1,$2,$3,$4,$5,$6,$7)`, [
		newId("as"),
		opts.assetId,
		opts.employeeId,
		todayIso(),
		opts.dueBack,
		opts.note,
		opts.actor
	]);
	await sql.query(`update assets set status = 'assigned', location = $1 where id = $2`, [location, opts.assetId]);
	await writeAudit(sql, {
		action: "assigned",
		assetId: opts.assetId,
		employeeId: opts.employeeId,
		location,
		actor: opts.actor,
		summary: `${asset.tag} · ${asset.name} handed to ${emp.full_name} at ${location}`,
		dueBack: opts.dueBack
	});
}
async function returnAssignment(sql, assignmentId, actor) {
	const row = (await sql.query(`${ASSIGN_SELECT} where s.id = $1`, [assignmentId]))[0];
	if (!row) throw new Error("Assignment not found");
	if (row.returned_at) throw new Error("Already returned");
	await sql.query(`update assignments set returned_at = $1 where id = $2`, [todayIso(), assignmentId]);
	await sql.query(`update assets set status = 'in_stock', location = 'Storage A' where id = $1`, [row.asset_id]);
	await writeAudit(sql, {
		action: "returned",
		assetId: String(row.asset_id),
		employeeId: String(row.employee_id),
		location: "Storage A",
		actor,
		summary: `${row.asset_tag} · ${row.asset_name} returned by ${row.employee_name} to Storage A`
	});
}
var getProfile_createServerFn_handler = createServerRpc({
	id: "f0b6ae6881717710a319a23be38619f896f2f1b4e77dfa6f8f1f2c225c8d2e1b",
	name: "getProfile",
	filename: "src/lib/inventory/server.ts"
}, (opts) => getProfile.__executeServer(opts));
var getProfile = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((d) => d ?? {}).handler(getProfile_createServerFn_handler, async ({ context, data }) => {
	return loadProfile(await getSql(), context.userId, data.role);
});
var getDashboard_createServerFn_handler = createServerRpc({
	id: "2834875938522524f82d22285f32ee725ef8521dd02e4911423f3fe6a1ffa75d",
	name: "getDashboard",
	filename: "src/lib/inventory/server.ts"
}, (opts) => getDashboard.__executeServer(opts));
var getDashboard = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(getDashboard_createServerFn_handler, async ({ context }) => {
	const sql = await getSql();
	await requireStaff(sql, context.userId);
	const assets = await listAssetRows(sql);
	const employees = await sql`select count(*)::int as n from employees`;
	const open = await sql`select count(*)::int as n from assignments where returned_at is null`;
	const byMap = /* @__PURE__ */ new Map();
	for (const a of assets) byMap.set(a.category, (byMap.get(a.category) ?? 0) + 1);
	const total = assets.length || 1;
	const byCategory = [...byMap.entries()].map(([category, count]) => ({
		category,
		count,
		pct: Math.round(count / total * 100)
	})).sort((a, b) => b.count - a.count);
	const today = todayIso();
	const horizon = /* @__PURE__ */ new Date();
	horizon.setDate(horizon.getDate() + 180);
	const horizonIso = horizon.toISOString().slice(0, 10);
	const warranties = assets.filter((a) => a.warrantyUntil && a.warrantyUntil >= today && a.warrantyUntil <= horizonIso).sort((a, b) => (a.warrantyUntil ?? "").localeCompare(b.warrantyUntil ?? ""));
	const recentRows = await sql.query(`${ASSIGN_SELECT} where s.returned_at is null order by s.assigned_at desc limit 8`);
	return {
		totalAssets: assets.length,
		inStock: assets.filter((a) => a.status === "in_stock").length,
		assigned: assets.filter((a) => a.status === "assigned").length,
		repair: assets.filter((a) => a.status === "repair").length,
		retired: assets.filter((a) => a.status === "retired").length,
		activeEmployees: employees[0]?.n ?? 0,
		portfolioValue: assets.reduce((s, a) => s + a.costInr, 0),
		openAssignments: open[0]?.n ?? 0,
		byCategory,
		warranties,
		recentAssignments: recentRows.map(mapAssignment)
	};
});
var listAssets_createServerFn_handler = createServerRpc({
	id: "84675fe8b9b796d741f99781c87c984ffbe5c42f9441201e02842b6146a03389",
	name: "listAssets",
	filename: "src/lib/inventory/server.ts"
}, (opts) => listAssets.__executeServer(opts));
var listAssets = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listAssets_createServerFn_handler, async ({ context }) => {
	const sql = await getSql();
	await requireStaff(sql, context.userId);
	return listAssetRows(sql);
});
var saveAsset_createServerFn_handler = createServerRpc({
	id: "d43ce82de04c8c3a8033efe2ef57b2b34d1d8ff8fd4df2054146c3543287524a",
	name: "saveAsset",
	filename: "src/lib/inventory/server.ts"
}, (opts) => saveAsset.__executeServer(opts));
var saveAsset = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((d) => d).handler(saveAsset_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	const profile = await requireStaff(sql, context.userId);
	const tag = data.tag.trim().toUpperCase();
	const name = data.name.trim();
	if (!tag || !name) throw new Error("Tag and name are required");
	if (data.id) {
		await sql.query(`update assets set tag=$1, name=$2, vendor=$3, serial=$4, category=$5,
           status=$6, location=$7, cost_inr=$8, warranty_until=$9, notes=$10
         where id=$11`, [
			tag,
			name,
			data.vendor.trim(),
			data.serial.trim(),
			data.category,
			data.status,
			data.location.trim(),
			Math.max(0, Math.round(data.costInr)),
			data.warrantyUntil,
			data.notes ?? "",
			data.id
		]);
		await writeAudit(sql, {
			action: "updated",
			assetId: data.id,
			actor: profile.displayName,
			summary: `${tag} · ${name} updated`,
			location: data.location.trim()
		});
		return { id: data.id };
	}
	const id = tag;
	await sql.query(`insert into assets (id, tag, name, vendor, serial, category, status, location, cost_inr, warranty_until, notes)
       values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)`, [
		id,
		tag,
		name,
		data.vendor.trim(),
		data.serial.trim(),
		data.category,
		data.status,
		data.location.trim(),
		Math.max(0, Math.round(data.costInr)),
		data.warrantyUntil,
		data.notes ?? ""
	]);
	await writeAudit(sql, {
		action: "created",
		assetId: id,
		actor: profile.displayName,
		summary: `${tag} · ${name} added to inventory`,
		location: data.location.trim()
	});
	return { id };
});
var deleteAsset_createServerFn_handler = createServerRpc({
	id: "19b66e9c71d04f7ee18b216fb42dc8234e99d9bfd6b94a2e2cf7be06c3922aea",
	name: "deleteAsset",
	filename: "src/lib/inventory/server.ts"
}, (opts) => deleteAsset.__executeServer(opts));
var deleteAsset = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((id) => id).handler(deleteAsset_createServerFn_handler, async ({ context, data: id }) => {
	const sql = await getSql();
	const profile = await requireStaff(sql, context.userId);
	const rows = await sql.query(`select tag, name from assets where id = $1`, [id]);
	await sql.query(`delete from assets where id = $1`, [id]);
	if (rows[0]) await writeAudit(sql, {
		action: "deleted",
		actor: profile.displayName,
		summary: `${rows[0].tag} · ${rows[0].name} removed from inventory`
	});
});
var suggestTag_createServerFn_handler = createServerRpc({
	id: "c58fb9d047b5ea3d044be6feef4ddf557e12d6fa64db2b14bb4deccf1035a92e",
	name: "suggestTag",
	filename: "src/lib/inventory/server.ts"
}, (opts) => suggestTag.__executeServer(opts));
var suggestTag = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((category) => category).handler(suggestTag_createServerFn_handler, async ({ context, data: category }) => {
	const sql = await getSql();
	await requireStaff(sql, context.userId);
	const rows = await sql`select tag from assets`;
	return nextTag(category, rows.map((r) => r.tag));
});
var listEmployees_createServerFn_handler = createServerRpc({
	id: "75240540a0ae7cf435b13ced621e1061b32951f47fd74d799c0767f1b34501d3",
	name: "listEmployees",
	filename: "src/lib/inventory/server.ts"
}, (opts) => listEmployees.__executeServer(opts));
var listEmployees = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listEmployees_createServerFn_handler, async ({ context }) => {
	const sql = await getSql();
	await requireStaff(sql, context.userId);
	return (await sql.query(`select e.*,
              (select count(*)::int from assignments s where s.employee_id = e.id and s.returned_at is null) as assigned_count
       from employees e
       order by e.full_name`)).map(mapEmployee);
});
var saveEmployee_createServerFn_handler = createServerRpc({
	id: "07df3212f89499219b011ac70ba11d5db2cd71b13ebe6c7f40c2200ceeb6229b",
	name: "saveEmployee",
	filename: "src/lib/inventory/server.ts"
}, (opts) => saveEmployee.__executeServer(opts));
var saveEmployee = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((d) => d).handler(saveEmployee_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	await requireStaff(sql, context.userId);
	const fullName = data.fullName.trim();
	const email = data.email.trim().toLowerCase();
	if (!fullName || !email) throw new Error("Name and email are required");
	if (data.id) {
		await sql.query(`update employees set full_name=$1, email=$2, title=$3, department=$4 where id=$5`, [
			fullName,
			email,
			data.title.trim(),
			data.department,
			data.id
		]);
		return { id: data.id };
	}
	const id = await nextEmployeeId(sql);
	await sql.query(`insert into employees (id, full_name, email, title, department) values ($1,$2,$3,$4,$5)`, [
		id,
		fullName,
		email,
		data.title.trim(),
		data.department
	]);
	return { id };
});
var deleteEmployee_createServerFn_handler = createServerRpc({
	id: "b236670fe39c6e10ea152047eb695fc4f59b788ed3f57b4516e955f38e3a9090",
	name: "deleteEmployee",
	filename: "src/lib/inventory/server.ts"
}, (opts) => deleteEmployee.__executeServer(opts));
var deleteEmployee = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((id) => id).handler(deleteEmployee_createServerFn_handler, async ({ context, data: id }) => {
	const sql = await getSql();
	await requireStaff(sql, context.userId);
	if (((await sql.query(`select count(*)::int as n from assignments where employee_id = $1 and returned_at is null`, [id]))[0]?.n ?? 0) > 0) throw new Error("Return assigned assets before removing this person");
	await sql.query(`delete from employees where id = $1`, [id]);
});
var listAssignments_createServerFn_handler = createServerRpc({
	id: "0bdb611d096d9acc51da2c2d0372b9d72afde51ef087d04a676f4d22dc476205",
	name: "listAssignments",
	filename: "src/lib/inventory/server.ts"
}, (opts) => listAssignments.__executeServer(opts));
var listAssignments = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listAssignments_createServerFn_handler, async ({ context }) => {
	const sql = await getSql();
	await requireStaff(sql, context.userId);
	return (await sql.query(`${ASSIGN_SELECT} order by s.returned_at nulls first, s.assigned_at desc`)).map(mapAssignment);
});
var createAssignment_createServerFn_handler = createServerRpc({
	id: "7acf4855e884e75ab879179a3785a1032bcbc680b1b41dc3c45de277481ecab6",
	name: "createAssignment",
	filename: "src/lib/inventory/server.ts"
}, (opts) => createAssignment.__executeServer(opts));
var createAssignment = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((d) => d).handler(createAssignment_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	const profile = await requireStaff(sql, context.userId);
	await assignAsset(sql, {
		assetId: data.assetId,
		employeeId: data.employeeId,
		dueBack: data.dueBack || plusYearsIso(2),
		note: data.note,
		actor: profile.displayName,
		location: data.location
	});
});
var returnAsset_createServerFn_handler = createServerRpc({
	id: "a941496e82aa6fe23cb236fc9e8ce27eb2dfb11b0028a49503ab656562b03b33",
	name: "returnAsset",
	filename: "src/lib/inventory/server.ts"
}, (opts) => returnAsset.__executeServer(opts));
var returnAsset = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((assignmentId) => assignmentId).handler(returnAsset_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	await returnAssignment(sql, data, (await requireStaff(sql, context.userId)).displayName);
});
var lookupPerson_createServerFn_handler = createServerRpc({
	id: "3814186c45112e3773f4a75dd734688a0c6b7e4290691c9646145226e7ebba27",
	name: "lookupPerson",
	filename: "src/lib/inventory/server.ts"
}, (opts) => lookupPerson.__executeServer(opts));
var lookupPerson = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((q) => q.trim()).handler(lookupPerson_createServerFn_handler, async ({ context, data: q }) => {
	const sql = await getSql();
	await requireStaff(sql, context.userId);
	if (!q) return null;
	const needle = q.replace(/\s+/g, " ").trim();
	const rows = await sql.query(`select e.*,
              (select count(*)::int from assignments s where s.employee_id = e.id and s.returned_at is null) as assigned_count
       from employees e
       where lower(e.id) = lower($1)
          or lower(e.email) = lower($1)
          or lower(e.full_name) = lower($1)
          or lower(e.email) like lower($2)
          or lower(e.full_name) like lower($2)
          or lower(e.id || ' / ' || e.email) = lower($1)
       order by e.full_name
       limit 1`, [needle, `%${needle}%`]);
	if (!rows[0]) return null;
	const employee = mapEmployee(rows[0]);
	const held = await sql.query(`${ASSIGN_SELECT} where s.employee_id = $1 and s.returned_at is null order by s.assigned_at`, [employee.id]);
	const stock = await sql.query(`${ASSET_SELECT} where a.status = 'in_stock' order by a.category, a.tag`);
	return {
		employee,
		held: held.map(mapAssignment),
		stock: stock.map(mapAsset)
	};
});
var listOnboarding_createServerFn_handler = createServerRpc({
	id: "14c4933d14dec372a3bfc1e00bf1765793e99561e15081507b5584e43068735c",
	name: "listOnboarding",
	filename: "src/lib/inventory/server.ts"
}, (opts) => listOnboarding.__executeServer(opts));
var listOnboarding = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listOnboarding_createServerFn_handler, async ({ context }) => {
	const sql = await getSql();
	await requireStaff(sql, context.userId);
	return (await sql.query(`select * from onboarding_requests order by created_at desc`)).map(mapOnboarding);
});
function mapOnboarding(r) {
	let hardware = [];
	try {
		hardware = JSON.parse(String(r.hardware_needed || "[]"));
	} catch {
		hardware = [];
	}
	return {
		id: String(r.id),
		kind: r.kind === "existing" ? "existing" : "new_joiner",
		employeeId: r.employee_id ? String(r.employee_id) : null,
		fullName: String(r.full_name),
		email: String(r.email),
		department: String(r.department ?? ""),
		jobRole: String(r.job_role ?? ""),
		hardwareNeeded: hardware,
		justification: String(r.justification ?? ""),
		autoAllocate: Boolean(r.auto_allocate),
		status: String(r.status),
		createdBy: String(r.created_by),
		createdAt: asIso(r.created_at)
	};
}
var stockByCategory_createServerFn_handler = createServerRpc({
	id: "e1169e489bc0c3b7ecc9d310959652cc85e974b34b4e423f79c6991860b64a47",
	name: "stockByCategory",
	filename: "src/lib/inventory/server.ts"
}, (opts) => stockByCategory.__executeServer(opts));
var stockByCategory = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(stockByCategory_createServerFn_handler, async ({ context }) => {
	const sql = await getSql();
	await loadProfile(sql, context.userId);
	const rows = await sql.query(`select category, count(*)::int as n from assets where status = 'in_stock' group by category`);
	const map = {};
	for (const c of CATEGORIES) map[c] = 0;
	for (const r of rows) map[r.category] = r.n;
	return map;
});
var submitOnboarding_createServerFn_handler = createServerRpc({
	id: "b683c8859b9c219731d9d6b163f5dd06cd67a782bd773a8dd86ead15b1f30431",
	name: "submitOnboarding",
	filename: "src/lib/inventory/server.ts"
}, (opts) => submitOnboarding.__executeServer(opts));
var submitOnboarding = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((d) => d).handler(submitOnboarding_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	const profile = await requireStaff(sql, context.userId);
	const fullName = data.fullName.trim();
	const email = data.email.trim().toLowerCase();
	if (!fullName || !email) throw new Error("Name and email are required");
	let employeeId = data.employeeId ?? null;
	if (data.kind === "new_joiner") {
		const existing = await sql.query(`select id from employees where lower(email) = lower($1)`, [email]);
		if (existing[0]) employeeId = existing[0].id;
		else {
			employeeId = await nextEmployeeId(sql);
			const title = data.jobRole || "Team member";
			await sql.query(`insert into employees (id, full_name, email, title, department) values ($1,$2,$3,$4,$5)`, [
				employeeId,
				fullName,
				email,
				title,
				data.department || "Engineering"
			]);
		}
	}
	if (!employeeId) throw new Error("Pick an existing employee");
	let allocated = 0;
	const needed = data.hardwareNeeded.length ? data.hardwareNeeded : STARTER_KITS[data.jobRole] ?? [];
	if (data.autoAllocate && needed.length && employeeId) for (const cat of needed) {
		const free = await sql.query(`select id from assets where category = $1 and status = 'in_stock' order by tag limit 1`, [cat]);
		if (!free[0]) continue;
		await assignAsset(sql, {
			assetId: free[0].id,
			employeeId,
			dueBack: plusYearsIso(2),
			note: `Onboarding kit · ${data.jobRole || cat}`,
			actor: profile.displayName
		});
		allocated += 1;
	}
	const status = needed.length === 0 ? "open" : allocated === 0 ? "open" : allocated >= needed.length ? "fulfilled" : "partial";
	const id = newId("ob");
	await sql.query(`insert into onboarding_requests
         (id, kind, employee_id, full_name, email, department, job_role, hardware_needed,
          justification, auto_allocate, status, created_by)
       values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)`, [
		id,
		data.kind,
		employeeId,
		fullName,
		email,
		data.department,
		data.jobRole,
		JSON.stringify(needed),
		data.justification,
		data.autoAllocate,
		status,
		profile.displayName
	]);
	return {
		id,
		status,
		allocated
	};
});
var getAudit_createServerFn_handler = createServerRpc({
	id: "fec46e84e56b428ff533f1dca7e8a85a820a046681444eefa02e5f2b3db2ee05",
	name: "getAudit",
	filename: "src/lib/inventory/server.ts"
}, (opts) => getAudit.__executeServer(opts));
var getAudit = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(getAudit_createServerFn_handler, async ({ context }) => {
	const sql = await getSql();
	await requireStaff(sql, context.userId);
	const events = await sql.query(`select * from audit_events order by created_at desc limit 200`);
	const custody = (await sql.query(`${ASSIGN_SELECT} where s.returned_at is null order by s.due_back nulls last`)).map(mapAssignment);
	const today = todayIso();
	const soon = /* @__PURE__ */ new Date();
	soon.setDate(soon.getDate() + 14);
	const soonIso = soon.toISOString().slice(0, 10);
	return {
		recordedEvents: events.length,
		inCustody: custody.length,
		dueSoon: custody.filter((c) => c.dueBack && c.dueBack >= today && c.dueBack <= soonIso).length,
		overdue: custody.filter((c) => c.dueBack && c.dueBack < today).length,
		custody,
		events: events.map(mapAudit)
	};
});
function mapAudit(r) {
	return {
		id: String(r.id),
		action: String(r.action),
		assetId: r.asset_id ? String(r.asset_id) : null,
		employeeId: r.employee_id ? String(r.employee_id) : null,
		location: String(r.location ?? ""),
		actor: String(r.actor ?? ""),
		summary: String(r.summary ?? ""),
		dueBack: asDateString(r.due_back),
		createdAt: asIso(r.created_at)
	};
}
var getReports_createServerFn_handler = createServerRpc({
	id: "5280f1dcf8ccbeb0f0f0451c1617cdc88d344532b79a32184d0f43bdc365e0ea",
	name: "getReports",
	filename: "src/lib/inventory/server.ts"
}, (opts) => getReports.__executeServer(opts));
var getReports = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(getReports_createServerFn_handler, async ({ context }) => {
	const sql = await getSql();
	await requireStaff(sql, context.userId);
	const assets = await listAssetRows(sql);
	const vendorMap = /* @__PURE__ */ new Map();
	for (const a of assets) {
		const cur = vendorMap.get(a.vendor) ?? {
			total: 0,
			count: 0
		};
		cur.total += a.costInr;
		cur.count += 1;
		vendorMap.set(a.vendor || "Unknown", cur);
	}
	const spendByVendor = [...vendorMap.entries()].map(([vendor, v]) => ({
		vendor,
		total: v.total,
		count: v.count
	})).sort((a, b) => b.total - a.total);
	const deptMap = /* @__PURE__ */ new Map();
	for (const d of DEPARTMENTS) deptMap.set(d, 0);
	const assigned = assets.filter((a) => a.status === "assigned");
	const empRows = await sql.query(`select id, department from employees`);
	const empDept = new Map(empRows.map((e) => [e.id, e.department]));
	for (const a of assigned) {
		const dept = a.assignedToId && empDept.get(a.assignedToId) || "Engineering";
		deptMap.set(dept, (deptMap.get(dept) ?? 0) + 1);
	}
	const horizon = /* @__PURE__ */ new Date();
	horizon.setDate(horizon.getDate() + 90);
	const horizonIso = horizon.toISOString().slice(0, 10);
	const warranties = assets.filter((a) => a.warrantyUntil && a.warrantyUntil <= horizonIso).sort((a, b) => (a.warrantyUntil ?? "").localeCompare(b.warrantyUntil ?? ""));
	const open = await sql`select count(*)::int as n from assignments where returned_at is null`;
	return {
		portfolioValue: assets.reduce((s, a) => s + a.costInr, 0),
		totalAssets: assets.length,
		assigned: assigned.length,
		inStock: assets.filter((a) => a.status === "in_stock").length,
		openAssignments: open[0]?.n ?? 0,
		spendByVendor,
		assetsPerDept: [...deptMap.entries()].map(([department, count]) => ({
			department,
			count
		})),
		warranties
	};
});
var listIntake_createServerFn_handler = createServerRpc({
	id: "48ceaf63a96b36ada27bd8081d26440a197d8bcb73b0d16d25f992273539b7e5",
	name: "listIntake",
	filename: "src/lib/inventory/server.ts"
}, (opts) => listIntake.__executeServer(opts));
var listIntake = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listIntake_createServerFn_handler, async ({ context }) => {
	const sql = await getSql();
	await requireStaff(sql, context.userId);
	return (await sql.query(`select * from intake_lots order by created_at desc limit 50`)).map((r) => ({
		id: String(r.id),
		vendor: String(r.vendor),
		packingRef: String(r.packing_ref ?? ""),
		notes: String(r.notes ?? ""),
		receivedBy: String(r.received_by),
		itemCount: Number(r.item_count ?? 0),
		createdAt: asIso(r.created_at)
	}));
});
var receiveIntake_createServerFn_handler = createServerRpc({
	id: "591b347809589d78158f7f9c3887d08a1c480bfbf564a3ebfe73dfbfabba9639",
	name: "receiveIntake",
	filename: "src/lib/inventory/server.ts"
}, (opts) => receiveIntake.__executeServer(opts));
var receiveIntake = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((d) => d).handler(receiveIntake_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	const profile = await requireStaff(sql, context.userId);
	if (!data.vendor.trim()) throw new Error("Vendor is required");
	if (data.items.length === 0) throw new Error("Add at least one item");
	const existing = (await sql`select tag from assets`).map((t) => t.tag);
	let count = 0;
	for (const item of data.items) {
		if (!item.name.trim()) continue;
		const tag = nextTag(item.category, existing);
		existing.push(tag);
		await sql.query(`insert into assets (id, tag, name, vendor, serial, category, status, location, cost_inr, warranty_until)
         values ($1,$2,$3,$4,$5,$6,'in_stock',$7,$8,$9)`, [
			tag,
			tag,
			item.name.trim(),
			data.vendor.trim(),
			item.serial.trim(),
			item.category,
			item.location.trim() || "Storage A",
			Math.max(0, Math.round(item.costInr)),
			item.warrantyUntil
		]);
		await writeAudit(sql, {
			action: "intake",
			assetId: tag,
			location: item.location.trim() || "Storage A",
			actor: profile.displayName,
			summary: `${tag} · ${item.name.trim()} received from ${data.vendor.trim()}`
		});
		count += 1;
	}
	const id = newId("in");
	await sql.query(`insert into intake_lots (id, vendor, packing_ref, notes, received_by, item_count)
       values ($1,$2,$3,$4,$5,$6)`, [
		id,
		data.vendor.trim(),
		data.packingRef.trim(),
		data.notes.trim(),
		profile.displayName,
		count
	]);
	return {
		id,
		count
	};
});
var resetDemo_createServerFn_handler = createServerRpc({
	id: "fbbb87873f0519a07605bb7fd6c00f6f2a5bb49e4f42bf99eb953fa8a57a5114",
	name: "resetDemo",
	filename: "src/lib/inventory/server.ts"
}, (opts) => resetDemo.__executeServer(opts));
var resetDemo = createServerFn({ method: "POST" }).middleware([authMiddleware]).handler(resetDemo_createServerFn_handler, async ({ context }) => {
	const sql = await getSql();
	await requireStaff(sql, context.userId);
	await applySeed(sql, true);
	return { ok: true };
});
var getMyKit_createServerFn_handler = createServerRpc({
	id: "b11e3b3772f52a2f898579851fa26118b0beb83abeaec1df786536bf8e5c98ed",
	name: "getMyKit",
	filename: "src/lib/inventory/server.ts"
}, (opts) => getMyKit.__executeServer(opts));
var getMyKit = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(getMyKit_createServerFn_handler, async ({ context }) => {
	const sql = await getSql();
	const profile = await loadProfile(sql, context.userId);
	if (!profile.employeeId) return {
		profile,
		employee: null,
		held: [],
		events: []
	};
	const empRows = await sql.query(`select e.*,
              (select count(*)::int from assignments s where s.employee_id = e.id and s.returned_at is null) as assigned_count
       from employees e where e.id = $1`, [profile.employeeId]);
	const held = await sql.query(`${ASSIGN_SELECT} where s.employee_id = $1 and s.returned_at is null order by s.assigned_at`, [profile.employeeId]);
	const events = await sql.query(`select * from audit_events where employee_id = $1 order by created_at desc limit 20`, [profile.employeeId]);
	return {
		profile,
		employee: empRows[0] ? mapEmployee(empRows[0]) : null,
		held: held.map(mapAssignment),
		events: events.map(mapAudit)
	};
});
var submitSelfRequest_createServerFn_handler = createServerRpc({
	id: "40dd0918d248d2618aabc14f963e0d505fad98cd5746c91f482b931c75374b1f",
	name: "submitSelfRequest",
	filename: "src/lib/inventory/server.ts"
}, (opts) => submitSelfRequest.__executeServer(opts));
var submitSelfRequest = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((d) => d).handler(submitSelfRequest_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	const profile = await loadProfile(sql, context.userId);
	if (!profile.employeeId) throw new Error("No employee record linked to this account");
	const e = (await sql.query(`select * from employees where id = $1`, [profile.employeeId]))[0];
	if (!e) throw new Error("Employee not found");
	const id = newId("ob");
	await sql.query(`insert into onboarding_requests
         (id, kind, employee_id, full_name, email, department, job_role, hardware_needed,
          justification, auto_allocate, status, created_by)
       values ($1,'existing',$2,$3,$4,$5,$6,$7,$8,false,'open',$9)`, [
		id,
		profile.employeeId,
		e.full_name,
		e.email,
		e.department,
		e.title,
		JSON.stringify(data.hardwareNeeded),
		data.justification,
		profile.displayName
	]);
	return { id };
});
//#endregion
export { createAssignment_createServerFn_handler, deleteAsset_createServerFn_handler, deleteEmployee_createServerFn_handler, getAudit_createServerFn_handler, getDashboard_createServerFn_handler, getMyKit_createServerFn_handler, getProfile_createServerFn_handler, getReports_createServerFn_handler, listAssets_createServerFn_handler, listAssignments_createServerFn_handler, listEmployees_createServerFn_handler, listIntake_createServerFn_handler, listOnboarding_createServerFn_handler, lookupPerson_createServerFn_handler, receiveIntake_createServerFn_handler, resetDemo_createServerFn_handler, returnAsset_createServerFn_handler, saveAsset_createServerFn_handler, saveEmployee_createServerFn_handler, stockByCategory_createServerFn_handler, submitOnboarding_createServerFn_handler, submitSelfRequest_createServerFn_handler, suggestTag_createServerFn_handler };
