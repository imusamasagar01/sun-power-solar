-- Sun Power Solar — database schema.
-- Run this once in the Supabase SQL editor (Dashboard → SQL Editor → New query).

create extension if not exists "pgcrypto";

create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  created_at timestamptz not null default now()
);

create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  title text not null default '',
  description text not null default '',
  price numeric not null default 0,
  discount_price numeric,
  category_id uuid references categories (id) on delete set null,
  images text[] not null default '{}',
  videos text[] not null default '{}',
  documents jsonb not null default '[]',
  features text[] not null default '{}',
  specifications jsonb not null default '[]',
  is_active boolean not null default true,
  is_featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists announcements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  message text not null default '',
  cta_label text,
  cta_href text,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  message text not null,
  product_name text,
  created_at timestamptz not null default now()
);

create index if not exists products_active_idx on products (is_active);
create index if not exists products_category_idx on products (category_id);

-- Row level security: the public site reads with the anon key, while every write
-- happens server-side with the service role key (which bypasses these policies).
alter table categories enable row level security;
alter table products enable row level security;
alter table announcements enable row level security;
alter table inquiries enable row level security;

drop policy if exists "public read categories" on categories;
create policy "public read categories" on categories for select using (true);

drop policy if exists "public read active products" on products;
create policy "public read active products" on products for select using (is_active);

drop policy if exists "public read active announcements" on announcements;
create policy "public read active announcements" on announcements for select using (is_active);

-- Media bucket for product images, videos and documents.
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

drop policy if exists "public read media" on storage.objects;
create policy "public read media" on storage.objects for select using (bucket_id = 'media');

-- Starter categories.
insert into categories (name, slug) values
  ('Solar Panels', 'solar-panels'),
  ('Inverters', 'inverters'),
  ('Batteries', 'batteries'),
  ('Complete Systems', 'complete-systems'),
  ('Accessories', 'accessories')
on conflict (slug) do nothing;
