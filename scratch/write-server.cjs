const fs = require('fs');
const path = require('path');

const newServerTs = `import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "@/lib/auth/middleware";
import { getSql, type Sql } from "@/lib/db";
import { newId } from "@/lib/utils";
import { applySeed } from "./seed";
import { asDateString, asIso, nextTag, plusYearsIso, todayIso } from "./format";
import { 
  connectMongo, EmployeeModel, ProfileModel,
  AssetModel, AssignmentModel, OnboardingRequestModel, AuditEventModel, IntakeLotModel
} from "./db-mongo";
import {
  CATEGORIES,
  DEPARTMENTS,
  STARTER_KITS,
  type Asset,
  type AssetStatus,
  type Assignment,
  type AuditEvent,
  type AuditSummary,
  type DashboardData,
  type Employee,
  type IntakeLot,
  type OnboardingRequest,
  type Profile,
  type ReportsData,
  type Role,
} from "./types";

type UserRow = { id: string; name: string; email: string };

async function actorOf(sql: Sql, userId: string): Promise<{ name: string; email: string | null }> {
  const rows = await sql.query<UserRow>(
    \`select id, name, email from "user" where id = $1\`,
    [userId],
  );
  const u = rows[0];
  return { name: u?.name || "IT Admin", email: u?.email ?? null };
}

async function ensureReady(sql: Sql): Promise<void> {
  await applySeed(sql, false);
}

async function loadProfile(sql: Sql, userId: string, preferred?: Role): Promise<Profile> {
  await ensureReady(sql);
  await connectMongo();
  const actor = await actorOf(sql, userId);
  let profileDoc = await ProfileModel.findOne({ userId });
  
  if (!profileDoc) {
    const role: Role = preferred ?? "staff";
    let employeeId: string | null = null;
    
    if (role === "employee" && actor.email) {
      let existing = await EmployeeModel.findOne({ email: new RegExp(\`^\${actor.email}$\`, 'i') });
      if (existing) {
        employeeId = existing.id;
        existing.userId = userId;
        await existing.save();
      } else {
        employeeId = await nextEmployeeId();
        await EmployeeModel.create({
          id: employeeId,
          userId,
          fullName: actor.name,
          email: actor.email,
          title: "Team member",
          department: "Engineering",
        });
      }
    }
    
    profileDoc = await ProfileModel.create({
      userId,
      role,
      employeeId,
      displayName: actor.name,
      email: actor.email,
    });
  }
  
  return {
    userId,
    role: profileDoc.role as Role,
    employeeId: profileDoc.employeeId,
    displayName: profileDoc.displayName || actor.name,
    email: actor.email,
  };
}

async function requireStaff(sql: Sql, userId: string): Promise<Profile> {
  const p = await loadProfile(sql, userId);
  if (p.role !== "staff") throw new Error("Staff only");
  return p;
}

async function nextEmployeeId(): Promise<string> {
  await connectMongo();
  const emps = await EmployeeModel.find({}, 'id');
  let max = 0;
  for (const r of emps) {
    const n = Number(String(r.id).replace(/^e/i, ""));
    if (Number.isFinite(n) && n > max) max = n;
  }
  return \`e\${max + 1}\`;
}

async function listAssetRows(): Promise<Asset[]> {
  await connectMongo();
  const assets = await AssetModel.find().lean();
  const assignments = await AssignmentModel.find({ returnedAt: null }).lean();
  
  const assignedMap = new Map(assignments.map((a: any) => [a.assetId, a.employeeId]));
  const empIds = [...new Set(assignments.map((a: any) => a.employeeId))];
  const emps = await EmployeeModel.find({ id: { $in: empIds } }, 'id fullName').lean();
  const empMap = new Map(emps.map((e: any) => [e.id, e.fullName]));
  
  return assets.map((a: any) => {
    const assignedToId = assignedMap.get(a.id) || null;
    const assignedToName = assignedToId ? (empMap.get(assignedToId) || null) : null;
    return {
      id: a.id, tag: a.tag, name: a.name, vendor: a.vendor, serial: a.serial,
      category: a.category, status: a.status, location: a.location, costInr: a.costInr,
      warrantyUntil: a.warrantyUntil, notes: a.notes, assignedToId, assignedToName
    };
  }).sort((a,b) => a.tag.localeCompare(b.tag));
}

async function populateEmployeeDataForAssignments(assignments: any[]) {
  if (assignments.length === 0) return;
  await connectMongo();
  const empIds = [...new Set(assignments.map(r => r.employeeId).filter(Boolean))];
  const emps = await EmployeeModel.find({ id: { $in: empIds } }, 'id fullName department').lean();
  const empMap = new Map(emps.map((e: any) => [e.id, { name: e.fullName, dept: e.department }]));
  for (const r of assignments) {
    if (r.employeeId) {
      const e = empMap.get(r.employeeId);
      r.employeeName = e?.name || "Unknown";
      r.department = e?.dept || "";
    }
  }
}

async function writeAudit(ev: {
  action: string;
  assetId?: string | null;
  employeeId?: string | null;
  location?: string;
  actor: string;
  summary: string;
  dueBack?: string | null;
}): Promise<void> {
  await connectMongo();
  await AuditEventModel.create({
    id: newId("ae"),
    action: ev.action,
    assetId: ev.assetId || null,
    employeeId: ev.employeeId || null,
    location: ev.location || "",
    actor: ev.actor,
    summary: ev.summary,
    dueBack: ev.dueBack || null,
  });
}

async function assignAsset(opts: {
  assetId: string;
  employeeId: string;
  dueBack: string | null;
  note: string;
  actor: string;
  location?: string;
}): Promise<void> {
  await connectMongo();
  const asset = await AssetModel.findOne({ id: opts.assetId });
  if (!asset) throw new Error("Asset not found");
  if (asset.status !== "in_stock") throw new Error("Asset is not in stock");
  
  const emp = await EmployeeModel.findOne({ id: opts.employeeId }).lean();
  if (!emp) throw new Error("Employee not found");
  
  const location = opts.location || asset.location || "";
  
  await AssignmentModel.create({
    id: newId("as"),
    assetId: opts.assetId,
    employeeId: opts.employeeId,
    assignedAt: todayIso(),
    dueBack: opts.dueBack,
    note: opts.note,
    assignedBy: opts.actor,
  });
  
  asset.status = 'assigned';
  asset.location = location;
  await asset.save();
  
  await writeAudit({
    action: "assigned",
    assetId: opts.assetId,
    employeeId: opts.employeeId,
    location,
    actor: opts.actor,
    summary: \`\${asset.tag} · \${asset.name} handed to \${emp.fullName} at \${location}\`,
    dueBack: opts.dueBack,
  });
}

async function returnAssignment(assignmentId: string, actor: string): Promise<void> {
  await connectMongo();
  const assignment = await AssignmentModel.findOne({ id: assignmentId });
  if (!assignment) throw new Error("Assignment not found");
  if (assignment.returnedAt) throw new Error("Already returned");
  
  const asset = await AssetModel.findOne({ id: assignment.assetId });
  if (!asset) throw new Error("Asset not found");
  
  const emp = await EmployeeModel.findOne({ id: assignment.employeeId }).lean();
  const empName = emp ? emp.fullName : "Unknown";
  
  assignment.returnedAt = todayIso();
  await assignment.save();
  
  asset.status = 'in_stock';
  asset.location = 'Storage A';
  await asset.save();
  
  await writeAudit({
    action: "returned",
    assetId: asset.id,
    employeeId: assignment.employeeId,
    location: "Storage A",
    actor,
    summary: \`\${asset.tag} · \${asset.name} returned by \${empName} to Storage A\`,
  });
}

export const getProfile = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((d: { role?: Role } | undefined) => d ?? {})
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    return loadProfile(sql, context.userId, data.role);
  });

export const getDashboard = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    await requireStaff(sql, context.userId);
    await connectMongo();
    
    const assets = await listAssetRows();
    const empCount = await EmployeeModel.countDocuments();
    const open = await AssignmentModel.countDocuments({ returnedAt: null });
    
    const byMap = new Map<string, number>();
    for (const a of assets) byMap.set(a.category, (byMap.get(a.category) ?? 0) + 1);
    const total = assets.length || 1;
    const byCategory = [...byMap.entries()]
      .map(([category, count]) => ({ category, count, pct: Math.round((count / total) * 100) }))
      .sort((a, b) => b.count - a.count);
      
    const today = todayIso();
    const soon = new Date();
    soon.setDate(soon.getDate() + 90);
    const soonIso = soon.toISOString().slice(0, 10);
    
    const warranties = assets
      .filter((a) => a.warrantyUntil && a.warrantyUntil >= today && a.warrantyUntil <= soonIso)
      .sort((a, b) => (a.warrantyUntil ?? "").localeCompare(b.warrantyUntil ?? ""));
      
    const recentDocs = await AssignmentModel.find({ returnedAt: null }).sort({ assignedAt: -1 }).limit(8).lean();
    
    const recentAssignments = await Promise.all(recentDocs.map(async (doc: any) => {
       const asset = await AssetModel.findOne({ id: doc.assetId }).lean();
       return {
         id: doc.id, assetId: doc.assetId, assetTag: asset?.tag || "", assetName: asset?.name || "",
         location: asset?.location || "", employeeId: doc.employeeId, assignedAt: doc.assignedAt,
         dueBack: doc.dueBack, returnedAt: doc.returnedAt, note: doc.note, assignedBy: doc.assignedBy
       };
    }));
    await populateEmployeeDataForAssignments(recentAssignments);
    
    const data: DashboardData = {
      totalAssets: assets.length,
      inStock: assets.filter((a) => a.status === "in_stock").length,
      assigned: assets.filter((a) => a.status === "assigned").length,
      repair: assets.filter((a) => a.status === "repair").length,
      retired: assets.filter((a) => a.status === "retired").length,
      activeEmployees: empCount,
      portfolioValue: assets.reduce((s, a) => s + a.costInr, 0),
      openAssignments: open,
      byCategory,
      warranties,
      recentAssignments: recentAssignments as Assignment[],
    };
    return data;
  });

export const listAssets = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    await requireStaff(sql, context.userId);
    return listAssetRows();
  });

export const saveAsset = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((d: {
    id?: string;
    tag: string;
    name: string;
    vendor: string;
    serial: string;
    category: string;
    status: AssetStatus;
    location: string;
    costInr: number;
    warrantyUntil: string | null;
    notes?: string;
  }) => d)
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    const profile = await requireStaff(sql, context.userId);
    await connectMongo();
    
    const tag = data.tag.trim().toUpperCase();
    const name = data.name.trim();
    if (!tag || !name) throw new Error("Tag and name are required");
    
    if (data.id) {
      await AssetModel.updateOne(
        { id: data.id },
        {
          tag, name, vendor: data.vendor.trim(), serial: data.serial.trim(),
          category: data.category, status: data.status, location: data.location.trim(),
          costInr: Math.max(0, Math.round(data.costInr)), warrantyUntil: data.warrantyUntil, notes: data.notes ?? ""
        }
      );
      await writeAudit({
        action: "updated",
        assetId: data.id,
        actor: profile.displayName,
        summary: \`\${tag} · \${name} updated\`,
        location: data.location.trim(),
      });
      return { id: data.id };
    }
    
    const id = tag;
    await AssetModel.create({
      id, tag, name, vendor: data.vendor.trim(), serial: data.serial.trim(),
      category: data.category, status: data.status, location: data.location.trim(),
      costInr: Math.max(0, Math.round(data.costInr)), warrantyUntil: data.warrantyUntil, notes: data.notes ?? ""
    });
    
    await writeAudit({
      action: "created",
      assetId: id,
      actor: profile.displayName,
      summary: \`\${tag} · \${name} added to inventory\`,
      location: data.location.trim(),
    });
    return { id };
  });

export const deleteAsset = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((id: string) => id)
  .handler(async ({ context, data: id }) => {
    const sql = await getSql();
    const profile = await requireStaff(sql, context.userId);
    await connectMongo();
    const asset = await AssetModel.findOne({ id }).lean();
    await AssetModel.deleteOne({ id });
    if (asset) {
      await writeAudit({
        action: "deleted",
        actor: profile.displayName,
        summary: \`\${asset.tag} · \${asset.name} removed from inventory\`,
      });
    }
  });

export const suggestTag = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((category: string) => category)
  .handler(async ({ context, data: category }) => {
    const sql = await getSql();
    await requireStaff(sql, context.userId);
    await connectMongo();
    const assets = await AssetModel.find({}, 'tag').lean();
    return nextTag(category, assets.map((r: any) => r.tag));
  });

export const listEmployees = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    await loadProfile(sql, context.userId);
    await connectMongo();
    
    const emps = await EmployeeModel.find({}).sort({ fullName: 1 }).lean();
    const assignments = await AssignmentModel.find({ returnedAt: null }).lean();
    
    const countMap = new Map();
    for (const a of assignments) {
      countMap.set(a.employeeId, (countMap.get(a.employeeId) || 0) + 1);
    }
    
    return emps.map((e: any) => ({
      id: e.id, userId: e.userId, fullName: e.fullName, email: e.email,
      title: e.title, department: e.department, assignedCount: countMap.get(e.id) || 0,
    }));
  });

export const saveEmployee = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((d: { id?: string; fullName: string; email: string; title: string; department: string }) => d)
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    await requireStaff(sql, context.userId);
    await connectMongo();
    
    const fullName = data.fullName.trim();
    const email = data.email.trim().toLowerCase();
    if (!fullName || !email) throw new Error("Name and email are required");
    
    if (data.id) {
      await EmployeeModel.updateOne(
        { id: data.id },
        { fullName, email, title: data.title.trim(), department: data.department }
      );
      return { id: data.id };
    }
    const id = await nextEmployeeId();
    await EmployeeModel.create({
      id, fullName, email, title: data.title.trim(), department: data.department,
    });
    return { id };
  });

export const deleteEmployee = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((id: string) => id)
  .handler(async ({ context, data: id }) => {
    const sql = await getSql();
    await requireStaff(sql, context.userId);
    await connectMongo();
    
    const openCount = await AssignmentModel.countDocuments({ employeeId: id, returnedAt: null });
    if (openCount > 0) throw new Error("Return assigned assets before removing this person");
    await EmployeeModel.deleteOne({ id });
  });

export const listAssignments = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    await requireStaff(sql, context.userId);
    await connectMongo();
    
    const docs = await AssignmentModel.find().sort({ returnedAt: 1, assignedAt: -1 }).lean();
    
    const assignments = await Promise.all(docs.map(async (doc: any) => {
       const asset = await AssetModel.findOne({ id: doc.assetId }).lean();
       return {
         id: doc.id, assetId: doc.assetId, assetTag: asset?.tag || "", assetName: asset?.name || "",
         location: asset?.location || "", employeeId: doc.employeeId, assignedAt: doc.assignedAt,
         dueBack: doc.dueBack, returnedAt: doc.returnedAt, note: doc.note, assignedBy: doc.assignedBy
       };
    }));
    await populateEmployeeDataForAssignments(assignments);
    
    return assignments as Assignment[];
  });

export const createAssignment = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((d: { assetId: string; employeeId: string; dueBack: string | null; note: string; location?: string }) => d)
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    const profile = await requireStaff(sql, context.userId);
    await assignAsset({
      assetId: data.assetId, employeeId: data.employeeId, dueBack: data.dueBack || plusYearsIso(2),
      note: data.note, actor: profile.displayName, location: data.location,
    });
  });

export const returnAsset = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((assignmentId: string) => assignmentId)
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    const profile = await requireStaff(sql, context.userId);
    await returnAssignment(data, profile.displayName);
  });

export const lookupPerson = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((q: string) => q.trim())
  .handler(async ({ context, data: q }) => {
    const sql = await getSql();
    await requireStaff(sql, context.userId);
    if (!q) return null;
    await connectMongo();
    const needle = q.replace(/\\s+/g, " ").trim();
    const needleRegex = new RegExp(needle.replace(/[-[\\]{}()*+?.,\\\\^$|#\\s]/g, '\\\\$&'), 'i');
    
    const empDoc = await EmployeeModel.findOne({
      $or: [
        { id: { $regex: new RegExp(\`^\${needle}$\`, 'i') } },
        { email: { $regex: new RegExp(\`^\${needle}$\`, 'i') } },
        { fullName: { $regex: new RegExp(\`^\${needle}$\`, 'i') } },
        { email: needleRegex },
        { fullName: needleRegex }
      ]
    }).lean();
    
    if (!empDoc) return null;
    
    const counts = await AssignmentModel.countDocuments({ employeeId: empDoc.id, returnedAt: null });
    
    const employee: Employee = {
      id: empDoc.id, userId: empDoc.userId, fullName: empDoc.fullName,
      email: empDoc.email, title: empDoc.title, department: empDoc.department, assignedCount: counts,
    };
    
    const heldDocs = await AssignmentModel.find({ employeeId: employee.id, returnedAt: null }).sort({ assignedAt: 1 }).lean();
    const held = await Promise.all(heldDocs.map(async (doc: any) => {
       const asset = await AssetModel.findOne({ id: doc.assetId }).lean();
       return {
         id: doc.id, assetId: doc.assetId, assetTag: asset?.tag || "", assetName: asset?.name || "",
         location: asset?.location || "", employeeId: doc.employeeId, assignedAt: doc.assignedAt,
         dueBack: doc.dueBack, returnedAt: doc.returnedAt, note: doc.note, assignedBy: doc.assignedBy
       };
    }));
    await populateEmployeeDataForAssignments(held);
    
    const stock = await AssetModel.find({ status: 'in_stock' }).sort({ category: 1, tag: 1 }).lean();
    
    return {
      employee, held: held as Assignment[],
      stock: stock.map((a: any) => ({
        id: a.id, tag: a.tag, name: a.name, vendor: a.vendor, serial: a.serial, category: a.category,
        status: a.status, location: a.location, costInr: a.costInr, warrantyUntil: a.warrantyUntil, notes: a.notes,
        assignedToId: null, assignedToName: null
      })),
    };
  });

export const listOnboarding = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    await requireStaff(sql, context.userId);
    await connectMongo();
    const docs = await OnboardingRequestModel.find().sort({ createdAt: -1 }).lean();
    return docs.map((r: any) => ({
      id: r.id, kind: r.kind as "new_joiner" | "existing", employeeId: r.employeeId,
      fullName: r.fullName, email: r.email, department: r.department, jobRole: r.jobRole,
      hardwareNeeded: r.hardwareNeeded, justification: r.justification, autoAllocate: r.autoAllocate,
      status: r.status as "open" | "fulfilled" | "partial" | "cancelled",
      createdBy: r.createdBy, createdAt: r.createdAt.toISOString()
    })) as OnboardingRequest[];
  });

export const stockByCategory = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    await loadProfile(sql, context.userId);
    await connectMongo();
    
    const assets = await AssetModel.find({ status: 'in_stock' }, 'category').lean();
    const map: Record<string, number> = {};
    for (const c of CATEGORIES) map[c] = 0;
    for (const a of assets) map[a.category as string] = (map[a.category as string] || 0) + 1;
    return map;
  });

export const submitOnboarding = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((d: {
    kind: "new_joiner" | "existing";
    employeeId?: string;
    fullName: string;
    email: string;
    department: string;
    jobRole: string;
    hardwareNeeded: string[];
    justification: string;
    autoAllocate: boolean;
  }) => d)
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    const profile = await loadProfile(sql, context.userId);
    await connectMongo();
    
    const fullName = data.fullName.trim();
    const email = data.email.trim().toLowerCase();
    if (!fullName || !email) throw new Error("Name and email are required");
    
    let employeeId = data.employeeId ?? null;
    if (data.kind === "new_joiner") {
      const existing = await EmployeeModel.findOne({ email: new RegExp(\`^\${email}$\`, 'i') });
      if (existing) employeeId = existing.id;
      else {
        employeeId = await nextEmployeeId();
        await EmployeeModel.create({
          id: employeeId, fullName, email, title: data.jobRole || "Team member",
          department: data.department || "Engineering",
        });
      }
    }
    if (!employeeId) throw new Error("Pick an existing employee");
    
    let allocated = 0;
    const needed = data.hardwareNeeded.length ? data.hardwareNeeded : (STARTER_KITS[data.jobRole] ?? []);
    
    if (data.autoAllocate && needed.length && employeeId) {
      for (const cat of needed) {
        const free = await AssetModel.findOne({ category: cat, status: 'in_stock' }).sort({ tag: 1 }).lean();
        if (!free) continue;
        await assignAsset({
          assetId: free.id, employeeId, dueBack: plusYearsIso(2),
          note: \`Onboarding kit · \${data.jobRole || cat}\`, actor: profile.displayName,
        });
        allocated += 1;
      }
    }
    
    const status = needed.length === 0 ? "open" : (allocated === 0 ? "open" : (allocated >= needed.length ? "fulfilled" : "partial"));
    const id = newId("ob");
    
    await OnboardingRequestModel.create({
      id, kind: data.kind, employeeId, fullName, email, department: data.department,
      jobRole: data.jobRole, hardwareNeeded: needed, justification: data.justification,
      autoAllocate: data.autoAllocate, status, createdBy: profile.displayName,
    });
    
    return { id, status, allocated };
  });

export const getAudit = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    await requireStaff(sql, context.userId);
    await connectMongo();
    
    const eventsDocs = await AuditEventModel.find().sort({ createdAt: -1 }).limit(200).lean();
    
    const custodyDocs = await AssignmentModel.find({ returnedAt: null }).lean(); // due back sorting
    // sort in js
    custodyDocs.sort((a: any, b: any) => {
       if (!a.dueBack) return 1;
       if (!b.dueBack) return -1;
       return a.dueBack.localeCompare(b.dueBack);
    });
    
    const custodyAssignments = await Promise.all(custodyDocs.map(async (doc: any) => {
       const asset = await AssetModel.findOne({ id: doc.assetId }).lean();
       return {
         id: doc.id, assetId: doc.assetId, assetTag: asset?.tag || "", assetName: asset?.name || "",
         location: asset?.location || "", employeeId: doc.employeeId, assignedAt: doc.assignedAt,
         dueBack: doc.dueBack, returnedAt: doc.returnedAt, note: doc.note, assignedBy: doc.assignedBy
       };
    }));
    await populateEmployeeDataForAssignments(custodyAssignments);
    const custody = custodyAssignments as Assignment[];
    
    const today = todayIso();
    const soon = new Date();
    soon.setDate(soon.getDate() + 14);
    const soonIso = soon.toISOString().slice(0, 10);
    
    const summary: AuditSummary = {
      recordedEvents: eventsDocs.length,
      inCustody: custody.length,
      dueSoon: custody.filter((c) => c.dueBack && c.dueBack >= today && c.dueBack <= soonIso).length,
      overdue: custody.filter((c) => c.dueBack && c.dueBack < today).length,
      custody,
      events: eventsDocs.map((r: any) => ({
        id: r.id, action: r.action, assetId: r.assetId, employeeId: r.employeeId,
        location: r.location, actor: r.actor, summary: r.summary, dueBack: r.dueBack,
        createdAt: r.createdAt.toISOString()
      })),
    };
    return summary;
  });

export const getReports = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    await requireStaff(sql, context.userId);
    await connectMongo();
    
    const assets = await listAssetRows();
    const vendorMap = new Map<string, { total: number; count: number }>();
    for (const a of assets) {
      const cur = vendorMap.get(a.vendor) ?? { total: 0, count: 0 };
      cur.total += a.costInr;
      cur.count += 1;
      vendorMap.set(a.vendor || "Unknown", cur);
    }
    const spendByVendor = [...vendorMap.entries()]
      .map(([vendor, v]) => ({ vendor, total: v.total, count: v.count }))
      .sort((a, b) => b.total - a.total);
      
    const deptMap = new Map<string, number>();
    for (const d of DEPARTMENTS) deptMap.set(d, 0);
    
    const assigned = assets.filter((a) => a.status === "assigned");
    const empRows = await EmployeeModel.find({}, 'id department').lean();
    const empDept = new Map(empRows.map((e: any) => [e.id, e.department]));
    for (const a of assigned) {
      const dept = (a.assignedToId && empDept.get(a.assignedToId)) || "Engineering";
      deptMap.set(dept, (deptMap.get(dept) ?? 0) + 1);
    }
    
    const horizon = new Date();
    horizon.setDate(horizon.getDate() + 90);
    const horizonIso = horizon.toISOString().slice(0, 10);
    const warranties = assets
      .filter((a) => a.warrantyUntil && a.warrantyUntil <= horizonIso)
      .sort((a, b) => (a.warrantyUntil ?? "").localeCompare(b.warrantyUntil ?? ""));
      
    const open = await AssignmentModel.countDocuments({ returnedAt: null });
    
    const data: ReportsData = {
      portfolioValue: assets.reduce((s, a) => s + a.costInr, 0),
      totalAssets: assets.length,
      assigned: assigned.length,
      inStock: assets.filter((a) => a.status === "in_stock").length,
      openAssignments: open,
      spendByVendor,
      assetsPerDept: [...deptMap.entries()].map(([department, count]) => ({ department, count })),
      warranties,
    };
    return data;
  });

export const listIntake = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    await requireStaff(sql, context.userId);
    await connectMongo();
    const docs = await IntakeLotModel.find().sort({ createdAt: -1 }).limit(50).lean();
    return docs.map((r: any): IntakeLot => ({
      id: r.id, vendor: r.vendor, packingRef: r.packingRef, notes: r.notes,
      receivedBy: r.receivedBy, itemCount: r.itemCount, createdAt: r.createdAt.toISOString()
    }));
  });

export const receiveIntake = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((d: { vendor: string; packingRef: string; notes: string; items: any[] }) => d)
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    const profile = await requireStaff(sql, context.userId);
    await connectMongo();
    
    if (!data.vendor.trim()) throw new Error("Vendor is required");
    if (data.items.length === 0) throw new Error("Add at least one item");
    
    const assets = await AssetModel.find({}, 'tag').lean();
    const existing = assets.map((t: any) => t.tag);
    let count = 0;
    
    for (const item of data.items) {
      if (!item.name.trim()) continue;
      const tag = nextTag(item.category, existing);
      existing.push(tag);
      
      await AssetModel.create({
        id: tag, tag, name: item.name.trim(), vendor: data.vendor.trim(), serial: item.serial.trim(),
        category: item.category, status: 'in_stock', location: item.location.trim() || "Storage A",
        costInr: Math.max(0, Math.round(item.costInr)), warrantyUntil: item.warrantyUntil
      });
      
      await writeAudit({
        action: "intake", assetId: tag, location: item.location.trim() || "Storage A",
        actor: profile.displayName, summary: \`\${tag} · \${item.name.trim()} received from \${data.vendor.trim()}\`
      });
      count += 1;
    }
    const id = newId("in");
    await IntakeLotModel.create({
      id, vendor: data.vendor.trim(), packingRef: data.packingRef.trim(),
      notes: data.notes.trim(), receivedBy: profile.displayName, itemCount: count
    });
    return { id, count };
  });

export const resetDemo = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    await requireStaff(sql, context.userId);
    await applySeed(sql, true);
    return { ok: true };
  });

export const getMyKit = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    const profile = await loadProfile(sql, context.userId);
    if (!profile.employeeId) {
      return { profile, employee: null as Employee | null, held: [] as Assignment[], events: [] as AuditEvent[] };
    }
    await connectMongo();
    
    const empDoc = await EmployeeModel.findOne({ id: profile.employeeId }).lean();
    let empRes: Employee | null = null;
    if (empDoc) {
      const counts = await AssignmentModel.countDocuments({ employeeId: profile.employeeId, returnedAt: null });
      empRes = {
        id: empDoc.id, userId: empDoc.userId, fullName: empDoc.fullName,
        email: empDoc.email, title: empDoc.title, department: empDoc.department, assignedCount: counts
      };
    }
    
    const heldDocs = await AssignmentModel.find({ employeeId: profile.employeeId, returnedAt: null }).sort({ assignedAt: 1 }).lean();
    const heldAssignments = await Promise.all(heldDocs.map(async (doc: any) => {
       const asset = await AssetModel.findOne({ id: doc.assetId }).lean();
       return {
         id: doc.id, assetId: doc.assetId, assetTag: asset?.tag || "", assetName: asset?.name || "",
         location: asset?.location || "", employeeId: doc.employeeId, assignedAt: doc.assignedAt,
         dueBack: doc.dueBack, returnedAt: doc.returnedAt, note: doc.note, assignedBy: doc.assignedBy
       };
    }));
    await populateEmployeeDataForAssignments(heldAssignments);
    
    const eventsDocs = await AuditEventModel.find({ employeeId: profile.employeeId }).sort({ createdAt: -1 }).limit(20).lean();
    
    return {
      profile,
      employee: empRes,
      held: heldAssignments as Assignment[],
      events: eventsDocs.map((r: any) => ({
        id: r.id, action: r.action, assetId: r.assetId, employeeId: r.employeeId,
        location: r.location, actor: r.actor, summary: r.summary, dueBack: r.dueBack,
        createdAt: r.createdAt.toISOString()
      })),
    };
  });

export const submitSelfRequest = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((d: { hardwareNeeded: string[]; justification: string }) => d)
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    const profile = await loadProfile(sql, context.userId);
    if (!profile.employeeId) throw new Error("No employee record linked to this account");
    await connectMongo();
    const e = await EmployeeModel.findOne({ id: profile.employeeId }).lean();
    if (!e) throw new Error("Employee not found");
    
    const id = newId("ob");
    await OnboardingRequestModel.create({
      id, kind: 'existing', employeeId: profile.employeeId, fullName: e.fullName,
      email: e.email, department: e.department, jobRole: e.title,
      hardwareNeeded: data.hardwareNeeded, justification: data.justification,
      autoAllocate: false, status: 'open', createdBy: profile.displayName
    });
    
    await writeAudit({
      action: "requested", employeeId: profile.employeeId, actor: profile.displayName,
      summary: \`Requested hardware: \${data.hardwareNeeded.join(", ")}\`
    });
    return { id };
  });

export const fulfillOnboardingRequest = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((requestId: string) => requestId)
  .handler(async ({ context, data: requestId }) => {
    const sql = await getSql();
    const profile = await requireStaff(sql, context.userId);
    await connectMongo();
    
    const req = await OnboardingRequestModel.findOne({ id: requestId });
    if (!req) throw new Error("Request not found");
    if (req.status !== "open" && req.status !== "partial") throw new Error("Request already fulfilled");
    
    const employeeId = req.employeeId;
    const hardwareNeeded = req.hardwareNeeded || [];
    let allocated = 0;
    
    for (const cat of hardwareNeeded) {
      const free = await AssetModel.findOne({ category: cat, status: 'in_stock' }).sort({ tag: 1 }).lean();
      if (!free) continue;
      await assignAsset({
        assetId: free.id, employeeId, dueBack: plusYearsIso(2),
        note: \`Hardware request fulfillment\`, actor: profile.displayName,
      });
      allocated += 1;
    }
    
    if (allocated === 0 && hardwareNeeded.length > 0) {
      throw new Error("No requested hardware available in stock");
    }
    
    const newStatus = allocated >= hardwareNeeded.length ? "fulfilled" : "partial";
    req.status = newStatus;
    await req.save();
    return { allocated, status: newStatus };
  });

export const cancelOnboardingRequest = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((requestId: string) => requestId)
  .handler(async ({ context, data: requestId }) => {
    const sql = await getSql();
    const profile = await requireStaff(sql, context.userId);
    await connectMongo();
    
    const req = await OnboardingRequestModel.findOne({ id: requestId });
    if (!req) throw new Error("Request not found");
    if (req.status !== "open") throw new Error("Request already processed");
    
    req.status = 'cancelled';
    await req.save();
    
    if (req.employeeId) {
      await writeAudit({
        action: "cancelled", employeeId: req.employeeId, actor: profile.displayName,
        summary: \`Hardware request for \${(req.hardwareNeeded || []).join(", ")} was cancelled/declined by \${profile.displayName}\`
      });
    }
    return { status: "cancelled" };
  });
`;

fs.writeFileSync(path.join('d:/OMK/Desktop/AssetForge', 'src/lib/inventory/server.ts'), newServerTs, 'utf8');
console.log('Successfully wrote server.ts');
