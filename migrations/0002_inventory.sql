-- AssetForge lab inventory. Org-wide rows; access is gated by profiles.role
-- (staff see everything, employees see their own kit). user_id on profiles
-- is the Better Auth id (text). Seeded demo rows are unowned lab stock.

create table if not exists employees (
  id          text primary key,
  user_id     text,
  full_name   text not null,
  email       text not null unique,
  title       text not null default '',
  department  text not null default '',
  created_at  timestamptz not null default now()
);

create table if not exists assets (
  id              text primary key,
  tag             text not null unique,
  name            text not null,
  vendor          text not null default '',
  serial          text not null default '',
  category        text not null,
  status          text not null,
  location        text not null default '',
  cost_inr        integer not null default 0,
  warranty_until  date,
  notes           text not null default '',
  created_at      timestamptz not null default now()
);

create table if not exists assignments (
  id           text primary key,
  asset_id     text not null references assets (id) on delete cascade,
  employee_id  text not null references employees (id) on delete cascade,
  assigned_at  date not null,
  due_back     date,
  returned_at  date,
  note         text not null default '',
  assigned_by  text not null default '',
  created_at   timestamptz not null default now()
);

create table if not exists onboarding_requests (
  id                text primary key,
  kind              text not null,
  employee_id       text,
  full_name         text not null,
  email             text not null,
  department        text not null default '',
  job_role          text not null default '',
  hardware_needed   text not null default '[]',
  justification     text not null default '',
  auto_allocate     boolean not null default true,
  status            text not null default 'open',
  created_by        text not null,
  created_at        timestamptz not null default now()
);

create table if not exists audit_events (
  id           text primary key,
  action       text not null,
  asset_id     text,
  employee_id  text,
  location     text not null default '',
  actor        text not null,
  summary      text not null,
  due_back     date,
  created_at   timestamptz not null default now()
);

create table if not exists intake_lots (
  id            text primary key,
  vendor        text not null,
  packing_ref   text not null default '',
  notes         text not null default '',
  received_by   text not null,
  item_count    integer not null default 0,
  created_at    timestamptz not null default now()
);

create table if not exists profiles (
  user_id       text primary key,
  role          text not null,
  employee_id   text,
  display_name  text,
  created_at    timestamptz not null default now()
);

create index if not exists assets_status_idx on assets (status);
create index if not exists assets_category_idx on assets (category);
create index if not exists assignments_open_idx on assignments (returned_at);
create index if not exists assignments_employee_idx on assignments (employee_id);
create index if not exists audit_created_idx on audit_events (created_at desc);
create index if not exists employees_email_idx on employees (email);
