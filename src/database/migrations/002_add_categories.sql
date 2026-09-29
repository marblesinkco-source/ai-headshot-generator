-- ============================================================================
-- TailorPic - Add category support to orders
-- Migration 002: Multi-category AI photo platform
-- ============================================================================

-- Add category_id column to orders table
-- Defaults to 'headshots' for backward compatibility with existing orders
alter table public.orders
  add column category_id text not null default 'headshots';

-- Add output_count column (generic replacement for headshot_count)
-- Different categories produce different outputs (portraits, cards, photos, etc.)
alter table public.orders
  add column output_count integer not null default 0;

-- Backfill output_count from headshot_count for existing orders
update public.orders
  set output_count = headshot_count
  where output_count = 0 and headshot_count > 0;

-- Add index on category_id for filtering orders by category
create index idx_orders_category_id on public.orders(category_id);

-- Add composite index for user + category lookups
create index idx_orders_user_category on public.orders(user_id, category_id);

-- Update generated_headshots table to be more generic
-- Add category_id for easier querying without joining orders
alter table public.generated_headshots
  add column category_id text;

-- Backfill category_id in generated_headshots from their orders
update public.generated_headshots gh
  set category_id = o.category_id
  from public.orders o
  where gh.order_id = o.id
    and gh.category_id is null;

-- Add index for generated photos by category
create index idx_generated_headshots_category
  on public.generated_headshots(category_id)
  where category_id is not null;
