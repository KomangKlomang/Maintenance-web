-- OpsTrack + Master Toko (initial migration)

create extension if not exists "pgcrypto";

create table if not exists workspaces (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null default 'OpsTrack',
  created_at timestamptz not null default now()
);

create table if not exists stores (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references workspaces (id) on delete cascade,
  store_code text not null,
  name text not null,
  origin text,
  address text,
  region text,
  province text,
  city text,
  district text,
  zip_code text,
  status text,
  area_coordinator text,
  area_manager text,
  latitude double precision,
  longitude double precision,
  go_live_date date,
  phone text,
  open_hours text,
  closed_date date,
  store_type text,
  notes text,
  open_time text,
  close_time text,
  raw jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  unique (workspace_id, store_code)
);

create index if not exists stores_workspace_code_idx on stores (workspace_id, store_code);
create index if not exists stores_region_idx on stores (workspace_id, region);
create index if not exists stores_status_idx on stores (workspace_id, status);

create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references workspaces (id) on delete cascade,
  store_code text,
  title text not null,
  kind text not null,
  status text not null default 'active',
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists projects_workspace_status_idx on projects (workspace_id, status);

create table if not exists store_documents (
  id uuid primary key default gen_random_uuid(),
  store_id uuid not null references stores (id) on delete cascade,
  label text not null,
  storage_path text not null,
  mime_type text,
  uploaded_at timestamptz not null default now()
);

insert into workspaces (slug, name)
values ('default', 'OpsTrack')
on conflict (slug) do nothing;
