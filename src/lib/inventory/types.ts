export const CATEGORIES = [
  "Laptop",
  "Desktop",
  "Monitor",
  "RAM",
  "SSD",
  "Peripheral",
  "Server",
  "Network",
] as const;

export type Category = (typeof CATEGORIES)[number];

export const STATUSES = ["assigned", "in_stock", "repair", "retired", "deleted"] as const;
export type AssetStatus = (typeof STATUSES)[number];

export const DEPARTMENTS = [
  "Engineering",
  "Design",
  "DevOps",
  "QA",
  "IT Support",
  "Marketing",
  "Sales",
] as const;

export const JOB_ROLES = [
  "Software Engineer",
  "Senior Developer",
  "Product Designer",
  "SRE",
  "QA Engineer",
  "Data Engineer",
  "Product Manager",
  "IT Admin",
  "IT Support",
] as const;

export const STARTER_KITS: Record<string, Category[]> = {
  "Software Engineer": ["Laptop"],
  "Senior Developer": ["Laptop"],
  "Product Designer": ["Laptop", "Monitor"],
  SRE: ["Laptop"],
  "QA Engineer": ["Laptop"],
  "Data Engineer": ["Laptop", "Monitor"],
  "Product Manager": ["Laptop"],
  "IT Admin": ["Laptop"],
  "IT Support": ["Laptop"],
};

export type Role = "staff" | "employee";

export type Profile = {
  userId: string;
  role: Role;
  employeeId: string | null;
  displayName: string;
  email: string | null;
};

export type Employee = {
  id: string;
  userId: string | null;
  fullName: string;
  email: string;
  title: string;
  department: string;
  assignedCount: number;
};

export type Asset = {
  id: string;
  tag: string;
  name: string;
  vendor: string;
  serial: string;
  category: string;
  status: AssetStatus;
  location: string;
  costInr: number;
  warrantyUntil: string | null;
  notes: string;
  assignedToId: string | null;
  assignedToName: string | null;
};

export type Assignment = {
  id: string;
  assetId: string;
  assetTag: string;
  assetName: string;
  employeeId: string;
  employeeName: string;
  department: string;
  assignedAt: string;
  dueBack: string | null;
  returnedAt: string | null;
  note: string;
  assignedBy: string;
  location: string;
};

export type AuditEvent = {
  id: string;
  action: string;
  assetId: string | null;
  employeeId: string | null;
  location: string;
  actor: string;
  summary: string;
  dueBack: string | null;
  createdAt: string;
};

export type OnboardingRequest = {
  id: string;
  kind: "new_joiner" | "existing" | "lab_assistant";
  employeeId: string | null;
  fullName: string;
  email: string;
  department: string;
  jobRole: string;
  hardwareNeeded: string[];
  justification: string;
  autoAllocate: boolean;
  status: "open" | "fulfilled" | "partial" | "cancelled";
  createdBy: string;
  createdAt: string;
};

export type IntakeLot = {
  id: string;
  vendor: string;
  packingRef: string;
  notes: string;
  receivedBy: string;
  itemCount: number;
  createdAt: string;
};

export type DashboardData = {
  totalAssets: number;
  inStock: number;
  assigned: number;
  repair: number;
  retired: number;
  activeEmployees: number;
  portfolioValue: number;
  openAssignments: number;
  byCategory: { category: string; count: number; inStock: number; pct: number }[];
  warranties: Asset[];
  recentAssignments: Assignment[];
};

export type ReportsData = {
  portfolioValue: number;
  totalAssets: number;
  assigned: number;
  inStock: number;
  openAssignments: number;
  spendByVendor: { vendor: string; total: number; count: number }[];
  assetsPerDept: { department: string; count: number }[];
  warranties: Asset[];
};

export type AuditSummary = {
  recordedEvents: number;
  inCustody: number;
  dueSoon: number;
  overdue: number;
  custody: Assignment[];
  events: AuditEvent[];
};
