-- ============================================================================
-- TailorPic - Add AI training pipeline fields
-- Migration 003: Support LoRA fine-tuning workflow
-- ============================================================================

-- Add training-related columns to orders table
-- These track the LoRA fine-tuning process

-- The Replicate training run ID
alter table public.orders
  add column if not exists training_id text;

-- The trigger word used for the trained LoRA model
alter table public.orders
  add column if not exists trigger_word text;

-- URL of the trained LoRA weights (set after training completes)
alter table public.orders
  add column if not exists lora_url text;

-- When processing started
alter table public.orders
  add column if not exists started_at timestamptz;

-- Index on training_id for webhook lookups
create index if not exists idx_orders_training_id
  on public.orders(training_id)
  where training_id is not null;

-- ============================================================================
-- Update generated_headshots table for the new pipeline
-- ============================================================================

-- Add columns that the new generation pipeline uses
-- prediction_id: Replicate prediction ID (for webhook matching)
alter table public.generated_headshots
  add column if not exists prediction_id text;

-- user_id: denormalized for easier storage path construction
alter table public.generated_headshots
  add column if not exists user_id uuid references auth.users(id);

-- style_id and background_id: the specific style/background used
alter table public.generated_headshots
  add column if not exists style_id text;

alter table public.generated_headshots
  add column if not exists background_id text;

-- status: track individual generation progress
alter table public.generated_headshots
  add column if not exists status text not null default 'pending';

-- error: store error message if generation fails
alter table public.generated_headshots
  add column if not exists error text;

-- prompt: the actual prompt used for generation
alter table public.generated_headshots
  add column if not exists prompt text;

-- completed_at: when this individual generation finished
alter table public.generated_headshots
  add column if not exists completed_at timestamptz;

-- Make storage_path nullable since it's set after generation completes
alter table public.generated_headshots
  alter column storage_path drop not null;

-- Make style nullable (using style_id instead)
alter table public.generated_headshots
  alter column style drop not null;

-- Make background nullable (using background_id instead)
alter table public.generated_headshots
  alter column background drop not null;

-- Index on prediction_id for webhook lookups
create index if not exists idx_generated_headshots_prediction_id
  on public.generated_headshots(prediction_id)
  where prediction_id is not null;

-- Index on status for progress queries
create index if not exists idx_generated_headshots_status
  on public.generated_headshots(order_id, status);

-- ============================================================================
-- RLS policies for the new columns
-- ============================================================================

-- Service role needs to insert generated headshots (webhook creates them)
-- The existing policy already covers service_role inserts.
-- We need to also allow service_role to update generated headshots (for webhook)
create policy "Service role can update generated headshots"
  on public.generated_headshots for update
  using (true)
  with check (true);

-- Drop the overly restrictive update policy and replace it
-- (the existing one requires auth.uid() match which blocks webhook updates)
-- We keep the user-facing update policy for favorites and add a service role one
