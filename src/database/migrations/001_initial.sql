-- ============================================================================
-- AI Headshot Generator - Initial Database Schema
-- Supabase PostgreSQL migration
-- ============================================================================

-- Enable required extensions
create extension if not exists "pgcrypto";

-- ============================================================================
-- Custom types
-- ============================================================================

create type order_status as enum (
  'pending',
  'paid',
  'uploading',
  'processing',
  'completed',
  'failed'
);

-- ============================================================================
-- Profiles table
-- Linked 1:1 with auth.users via FK on id
-- ============================================================================

create table public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  full_name   text,
  avatar_url  text,
  email       text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

comment on table public.profiles is 'User profile data, auto-created on signup.';

-- ============================================================================
-- Orders table
-- Uses nanoid text PK for URL-friendly, non-guessable order identifiers
-- ============================================================================

create table public.orders (
  id                     text primary key,  -- nanoid generated in application
  user_id                uuid not null references auth.users(id) on delete cascade,
  package_id             text not null,
  status                 order_status not null default 'pending',
  stripe_session_id      text,
  stripe_payment_intent  text,
  amount                 integer not null,    -- amount in cents
  currency               text not null default 'usd',
  headshot_count         integer not null default 0,
  created_at             timestamptz not null default now(),
  updated_at             timestamptz not null default now(),
  completed_at           timestamptz
);

comment on table public.orders is 'Purchase orders for headshot generation packages.';

-- ============================================================================
-- Uploaded photos table
-- Raw selfies/photos the user uploads for model training
-- ============================================================================

create table public.uploaded_photos (
  id                uuid primary key default gen_random_uuid(),
  order_id          text not null references public.orders(id) on delete cascade,
  storage_path      text not null,
  original_filename text not null,
  file_size         integer not null,        -- bytes
  mime_type         text not null,
  created_at        timestamptz not null default now()
);

comment on table public.uploaded_photos is 'User-uploaded training photos for a given order.';

-- ============================================================================
-- Generated headshots table
-- AI-generated headshot images produced from the trained model
-- ============================================================================

create table public.generated_headshots (
  id              uuid primary key default gen_random_uuid(),
  order_id        text not null references public.orders(id) on delete cascade,
  storage_path    text not null,
  thumbnail_path  text,
  style           text not null,
  background      text not null,
  resolution      text not null default '1024x1024',
  is_favorite     boolean not null default false,
  created_at      timestamptz not null default now()
);

comment on table public.generated_headshots is 'AI-generated headshot results for a given order.';

-- ============================================================================
-- Indexes
-- ============================================================================

-- Orders: look up by user, filter by status, find by Stripe session
create index idx_orders_user_id on public.orders(user_id);
create index idx_orders_status on public.orders(status);
create index idx_orders_stripe_session_id on public.orders(stripe_session_id)
  where stripe_session_id is not null;

-- Uploaded photos: look up by order
create index idx_uploaded_photos_order_id on public.uploaded_photos(order_id);

-- Generated headshots: look up by order, filter favorites
create index idx_generated_headshots_order_id on public.generated_headshots(order_id);
create index idx_generated_headshots_favorites on public.generated_headshots(order_id)
  where is_favorite = true;

-- ============================================================================
-- Updated_at trigger function
-- Automatically sets updated_at on row modification
-- ============================================================================

create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql security definer;

create trigger set_profiles_updated_at
  before update on public.profiles
  for each row execute function public.handle_updated_at();

create trigger set_orders_updated_at
  before update on public.orders
  for each row execute function public.handle_updated_at();

-- ============================================================================
-- Auto-create profile on auth.users insert
-- ============================================================================

create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url, email)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'name'),
    new.raw_user_meta_data ->> 'avatar_url',
    new.email
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================================================
-- Row Level Security (RLS)
-- Users can only read/write their own data
-- ============================================================================

alter table public.profiles enable row level security;
alter table public.orders enable row level security;
alter table public.uploaded_photos enable row level security;
alter table public.generated_headshots enable row level security;

-- Profiles: users can view and update their own profile
create policy "Users can view their own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Orders: users can view and insert their own orders
create policy "Users can view their own orders"
  on public.orders for select
  using (auth.uid() = user_id);

create policy "Users can create their own orders"
  on public.orders for insert
  with check (auth.uid() = user_id);

-- Service role can update orders (status changes happen server-side)
create policy "Service role can update orders"
  on public.orders for update
  using (auth.role() = 'service_role');

-- Uploaded photos: users can manage photos on their own orders
create policy "Users can view their own uploaded photos"
  on public.uploaded_photos for select
  using (
    exists (
      select 1 from public.orders
      where orders.id = uploaded_photos.order_id
        and orders.user_id = auth.uid()
    )
  );

create policy "Users can upload photos to their own orders"
  on public.uploaded_photos for insert
  with check (
    exists (
      select 1 from public.orders
      where orders.id = uploaded_photos.order_id
        and orders.user_id = auth.uid()
    )
  );

create policy "Users can delete their own uploaded photos"
  on public.uploaded_photos for delete
  using (
    exists (
      select 1 from public.orders
      where orders.id = uploaded_photos.order_id
        and orders.user_id = auth.uid()
    )
  );

-- Generated headshots: users can view their own, update favorites
create policy "Users can view their own generated headshots"
  on public.generated_headshots for select
  using (
    exists (
      select 1 from public.orders
      where orders.id = generated_headshots.order_id
        and orders.user_id = auth.uid()
    )
  );

create policy "Users can update favorite status on their own headshots"
  on public.generated_headshots for update
  using (
    exists (
      select 1 from public.orders
      where orders.id = generated_headshots.order_id
        and orders.user_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from public.orders
      where orders.id = generated_headshots.order_id
        and orders.user_id = auth.uid()
    )
  );

-- Service role can insert generated headshots (pipeline creates them)
create policy "Service role can insert generated headshots"
  on public.generated_headshots for insert
  with check (auth.role() = 'service_role');
