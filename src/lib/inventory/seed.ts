import type { Sql } from "@/lib/db";
import { connectMongo, EmployeeModel, AssetModel, AssignmentModel, AuditEventModel } from "./db-mongo";

type Emp = {
  id: string;
  full_name: string;
  email: string;
  title: string;
  department: string;
};

type Ast = {
  id: string;
  tag: string;
  name: string;
  vendor: string;
  serial: string;
  category: string;
  status: string;
  location: string;
  cost_inr: number;
  warranty_until: string | null;
};

type Asn = {
  id: string;
  asset_id: string;
  employee_id: string;
  assigned_at: string;
  due_back: string;
  note: string;
  assigned_by: string;
};

type Aud = {
  id: string;
  action: string;
  asset_id: string;
  employee_id: string;
  location: string;
  actor: string;
  summary: string;
  due_back: string;
  created_at: string;
};

const EMPLOYEES: Emp[] = [
  { id: "e1", full_name: "Aarav Sharma", email: "aarav@itlabs.io", title: "Senior Developer", department: "Engineering" },
  { id: "e2", full_name: "Priya Menon", email: "priya@itlabs.io", title: "Product Designer", department: "Design" },
  { id: "e3", full_name: "Rahul Verma", email: "rahul@itlabs.io", title: "SRE", department: "DevOps" },
  { id: "e4", full_name: "Sana Kapoor", email: "sana@itlabs.io", title: "QA Engineer", department: "QA" },
  { id: "e5", full_name: "Vikram Iyer", email: "vikram@itlabs.io", title: "IT Admin", department: "IT Support" },
  { id: "e6", full_name: "Meera Joshi", email: "meera@itlabs.io", title: "Product Manager", department: "Marketing" },
  { id: "e7", full_name: "Arjun Rao", email: "arjun@itlabs.io", title: "Product Manager", department: "Sales" },
  { id: "e8", full_name: "Diya Nair", email: "diya@itlabs.io", title: "Software Engineer", department: "Engineering" },
];

const ASSETS: Ast[] = [
  { id: "LAP-0001", tag: "LAP-0001", name: "MacBook Pro 16 M3", vendor: "Apple", serial: "C02XL0AAJG5H", category: "Laptop", status: "assigned", location: "HQ - Floor 3", cost_inr: 249000, warranty_until: "2027-05-20" },
  { id: "LAP-0002", tag: "LAP-0002", name: "Dell XPS 15", vendor: "Dell", serial: "DXP15-99231", category: "Laptop", status: "assigned", location: "HQ - Floor 2", cost_inr: 145000, warranty_until: "2027-02-16" },
  { id: "LAP-0003", tag: "LAP-0003", name: "ThinkPad X1 Carbon", vendor: "Lenovo", serial: "TP-X1C-3391", category: "Laptop", status: "assigned", location: "HQ - Floor 1", cost_inr: 165000, warranty_until: "2026-12-16" },
  { id: "LAP-0004", tag: "LAP-0004", name: "MacBook Air M2", vendor: "Apple", serial: "MBA-M2-4482", category: "Laptop", status: "in_stock", location: "Storage A", cost_inr: 110000, warranty_until: "2027-11-01" },
  { id: "LAP-0005", tag: "LAP-0005", name: "HP EliteBook 840", vendor: "HP", serial: "HP840-1182", category: "Laptop", status: "in_stock", location: "Storage A", cost_inr: 98000, warranty_until: "2028-01-08" },
  { id: "DSK-0001", tag: "DSK-0001", name: 'iMac 27"', vendor: "Apple", serial: "IMAC27-4401", category: "Desktop", status: "assigned", location: "HQ - Design Studio", cost_inr: 189000, warranty_until: "2026-10-16" },
  { id: "DSK-0002", tag: "DSK-0002", name: "Dell OptiPlex 7010", vendor: "Dell", serial: "OPT7010-882", category: "Desktop", status: "in_stock", location: "Storage A", cost_inr: 72000, warranty_until: "2028-03-12" },
  { id: "MON-0011", tag: "MON-0011", name: 'LG UltraFine 27"', vendor: "LG", serial: "LGU27-4421", category: "Monitor", status: "in_stock", location: "Storage A", cost_inr: 38000, warranty_until: "2027-06-01" },
  { id: "MON-0012", tag: "MON-0012", name: "Dell U2723QE", vendor: "Dell", serial: "DU27-88123", category: "Monitor", status: "assigned", location: "HQ - Floor 3", cost_inr: 62000, warranty_until: "2027-11-20" },
  { id: "MON-0013", tag: "MON-0013", name: "Samsung Odyssey G7", vendor: "Samsung", serial: "SOG7-2291", category: "Monitor", status: "in_stock", location: "Storage A", cost_inr: 54000, warranty_until: "2027-09-01" },
  { id: "RAM-0044", tag: "RAM-0044", name: "Corsair Vengeance 32GB DDR5", vendor: "Corsair", serial: "CV32-DDR5-77", category: "RAM", status: "in_stock", location: "Storage B", cost_inr: 12500, warranty_until: "2029-03-04" },
  { id: "RAM-0045", tag: "RAM-0045", name: "Kingston Fury 16GB DDR5", vendor: "Kingston", serial: "KF16-DDR5-02", category: "RAM", status: "in_stock", location: "Storage B", cost_inr: 6200, warranty_until: "2029-01-20" },
  { id: "SSD-0032", tag: "SSD-0032", name: "Samsung 990 Pro 2TB", vendor: "Samsung", serial: "S990-99A21", category: "SSD", status: "in_stock", location: "Storage B", cost_inr: 18500, warranty_until: "2028-01-12" },
  { id: "SSD-0033", tag: "SSD-0033", name: "WD Black SN850X 1TB", vendor: "Western Digital", serial: "WDB-SN850-11", category: "SSD", status: "in_stock", location: "Storage B", cost_inr: 9800, warranty_until: "2028-06-01" },
  { id: "PER-0001", tag: "PER-0001", name: "Logitech MX Keys", vendor: "Logitech", serial: "MXK-44821", category: "Peripheral", status: "in_stock", location: "Storage B", cost_inr: 9500, warranty_until: "2027-08-01" },
  { id: "PER-0002", tag: "PER-0002", name: "Logitech MX Master 3S", vendor: "Logitech", serial: "MXM-33910", category: "Peripheral", status: "repair", location: "IT Repair Bench", cost_inr: 8200, warranty_until: "2027-04-18" },
  { id: "SRV-0002", tag: "SRV-0002", name: "Dell PowerEdge R750", vendor: "Dell", serial: "PE750-8821", category: "Server", status: "assigned", location: "Data Center", cost_inr: 480000, warranty_until: "2027-07-15" },
  { id: "NET-0001", tag: "NET-0001", name: "Ubiquiti UDM Pro", vendor: "Ubiquiti", serial: "UDMP-3382", category: "Network", status: "in_stock", location: "Data Center", cost_inr: 42000, warranty_until: "2027-01-10" },
];

const ASSIGNMENTS: Asn[] = [
  { id: "as1", asset_id: "LAP-0001", employee_id: "e1", assigned_at: "2026-01-15", due_back: "2027-01-15", note: "Primary engineering kit", assigned_by: "IT Admin" },
  { id: "as2", asset_id: "LAP-0002", employee_id: "e6", assigned_at: "2026-02-20", due_back: "2027-02-20", note: "", assigned_by: "IT Admin" },
  { id: "as3", asset_id: "LAP-0003", employee_id: "e7", assigned_at: "2026-03-10", due_back: "2026-06-10", note: "Field kit — overdue for return", assigned_by: "IT Admin" },
  { id: "as4", asset_id: "DSK-0001", employee_id: "e2", assigned_at: "2026-04-05", due_back: "2027-04-05", note: "Design studio workstation", assigned_by: "IT Admin" },
  { id: "as5", asset_id: "MON-0012", employee_id: "e1", assigned_at: "2026-01-25", due_back: "2027-01-25", note: "Secondary display", assigned_by: "IT Admin" },
  { id: "as6", asset_id: "SRV-0002", employee_id: "e3", assigned_at: "2025-11-20", due_back: "2027-11-20", note: "DC steward", assigned_by: "IT Admin" },
];

const AUDIT: Aud[] = [
  { id: "ae1", action: "assigned", asset_id: "LAP-0001", employee_id: "e1", location: "HQ - Floor 3", actor: "IT Admin", summary: "LAP-0001 · MacBook Pro 16 M3 handed to Aarav Sharma at HQ - Floor 3", due_back: "2027-01-15", created_at: "2026-01-15T10:30:00+05:30" },
  { id: "ae2", action: "assigned", asset_id: "LAP-0002", employee_id: "e6", location: "HQ - Floor 2", actor: "IT Admin", summary: "LAP-0002 · Dell XPS 15 handed to Meera Joshi at HQ - Floor 2", due_back: "2027-02-20", created_at: "2026-02-20T11:10:00+05:30" },
  { id: "ae3", action: "assigned", asset_id: "LAP-0003", employee_id: "e7", location: "HQ - Floor 1", actor: "IT Admin", summary: "LAP-0003 · ThinkPad X1 Carbon handed to Arjun Rao at HQ - Floor 1", due_back: "2026-06-10", created_at: "2026-03-10T09:42:00+05:30" },
  { id: "ae4", action: "assigned", asset_id: "DSK-0001", employee_id: "e2", location: "HQ - Design Studio", actor: "IT Admin", summary: 'DSK-0001 · iMac 27" handed to Priya Menon at HQ - Design Studio', due_back: "2027-04-05", created_at: "2026-04-05T14:05:00+05:30" },
  { id: "ae5", action: "assigned", asset_id: "MON-0012", employee_id: "e1", location: "HQ - Floor 3", actor: "IT Admin", summary: "MON-0012 · Dell U2723QE handed to Aarav Sharma at HQ - Floor 3", due_back: "2027-01-25", created_at: "2026-01-25T16:12:00+05:30" },
  { id: "ae6", action: "assigned", asset_id: "SRV-0002", employee_id: "e3", location: "Data Center", actor: "IT Admin", summary: "SRV-0002 · Dell PowerEdge R750 handed to Rahul Verma at Data Center", due_back: "2027-11-20", created_at: "2025-11-20T08:00:00+05:30" },
];

export const DEMO_SEED_MARKER = "DSK-0001";

export async function applySeed(sql: Sql, force = false): Promise<void> {
  await connectMongo();
  
  const counts = await AssetModel.countDocuments();
  const stale = counts > 0 && !(await AssetModel.exists({ id: DEMO_SEED_MARKER }));
  
  if (counts > 0 && !force && !stale) return;

  if (force || stale) {
    await AssetModel.deleteMany({});
    await EmployeeModel.deleteMany({});
    await AssignmentModel.deleteMany({});
    await AuditEventModel.deleteMany({});
  }

  for (const e of EMPLOYEES) {
    await EmployeeModel.updateOne(
      { id: e.id },
      { $set: { id: e.id, fullName: e.full_name, email: e.email, title: e.title, department: e.department } },
      { upsert: true }
    );
  }

  for (const a of ASSETS) {
    await AssetModel.updateOne(
      { id: a.id },
      { $set: { 
        id: a.id, tag: a.tag, name: a.name, vendor: a.vendor, serial: a.serial,
        category: a.category, status: a.status, location: a.location, costInr: a.cost_inr,
        warrantyUntil: a.warranty_until 
      } },
      { upsert: true }
    );
  }

  for (const s of ASSIGNMENTS) {
    await AssignmentModel.updateOne(
      { id: s.id },
      { $set: {
        id: s.id, assetId: s.asset_id, employeeId: s.employee_id, assignedAt: s.assigned_at,
        dueBack: s.due_back, note: s.note, assignedBy: s.assigned_by
      } },
      { upsert: true }
    );
  }

  for (const ev of AUDIT) {
    await AuditEventModel.updateOne(
      { id: ev.id },
      { $set: {
        id: ev.id, action: ev.action, assetId: ev.asset_id, employeeId: ev.employee_id,
        location: ev.location, actor: ev.actor, summary: ev.summary, dueBack: ev.due_back,
        createdAt: new Date(ev.created_at)
      } },
      { upsert: true }
    );
  }
}
