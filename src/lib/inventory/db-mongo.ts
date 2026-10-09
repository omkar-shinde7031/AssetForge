import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/assetforge";

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function connectMongo() {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, { bufferCommands: false }).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

const employeeSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  userId: { type: String, default: null },
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  title: { type: String, required: true },
  department: { type: String, required: true },
});

export const EmployeeModel = mongoose.models.Employee || mongoose.model("Employee", employeeSchema);

const profileSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  role: { type: String, required: true },
  employeeId: { type: String, default: null },
  displayName: { type: String, required: true },
  email: { type: String, default: null },
});

export const ProfileModel = mongoose.models.Profile || mongoose.model("Profile", profileSchema);

const assetSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  tag: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  vendor: { type: String, default: "" },
  serial: { type: String, default: "" },
  category: { type: String, required: true },
  status: { type: String, required: true },
  location: { type: String, default: "" },
  costInr: { type: Number, default: 0 },
  warrantyUntil: { type: String, default: null },
  notes: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
});

export const AssetModel = mongoose.models.Asset || mongoose.model("Asset", assetSchema);

const assignmentSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  assetId: { type: String, required: true }, // Refers to asset.id
  employeeId: { type: String, required: true }, // Refers to employee.id
  assignedAt: { type: String, required: true }, // ISO Date string for consistency with original sql (date not datetime)
  dueBack: { type: String, default: null },
  returnedAt: { type: String, default: null },
  note: { type: String, default: "" },
  assignedBy: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
});

export const AssignmentModel = mongoose.models.Assignment || mongoose.model("Assignment", assignmentSchema);

const onboardingRequestSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  kind: { type: String, required: true },
  employeeId: { type: String, default: null },
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  department: { type: String, default: "" },
  jobRole: { type: String, default: "" },
  hardwareNeeded: { type: [String], default: [] },
  justification: { type: String, default: "" },
  autoAllocate: { type: Boolean, default: true },
  status: { type: String, default: "open" },
  createdBy: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const OnboardingRequestModel = mongoose.models.OnboardingRequest || mongoose.model("OnboardingRequest", onboardingRequestSchema);

const auditEventSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  action: { type: String, required: true },
  assetId: { type: String, default: null },
  employeeId: { type: String, default: null },
  location: { type: String, default: "" },
  actor: { type: String, required: true },
  summary: { type: String, required: true },
  dueBack: { type: String, default: null },
  createdAt: { type: Date, default: Date.now },
});

export const AuditEventModel = mongoose.models.AuditEvent || mongoose.model("AuditEvent", auditEventSchema);

const intakeLotSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  vendor: { type: String, required: true },
  packingRef: { type: String, default: "" },
  notes: { type: String, default: "" },
  receivedBy: { type: String, required: true },
  itemCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

export const IntakeLotModel = mongoose.models.IntakeLot || mongoose.model("IntakeLot", intakeLotSchema);
