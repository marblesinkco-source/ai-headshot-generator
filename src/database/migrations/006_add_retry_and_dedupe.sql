-- ============================================================================
-- Migration 006: Add retry tracking and Stripe event deduplication
-- ============================================================================

-- Add retry tracking columns to orders
ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS retry_count integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS last_retry_at timestamptz;

-- Create index for stuck order queries
CREATE INDEX IF NOT EXISTS idx_orders_status_started_at
  ON public.orders (status, started_at)
  WHERE status = 'processing';

-- Stripe event deduplication table
CREATE TABLE IF NOT EXISTS public.processed_stripe_events (
  event_id   text PRIMARY KEY,
  event_type text NOT NULL,
  processed_at timestamptz NOT NULL DEFAULT now()
);

-- Auto-cleanup old events (keep 7 days)
CREATE INDEX IF NOT EXISTS idx_processed_stripe_events_processed_at
  ON public.processed_stripe_events (processed_at);

-- RLS: Only service role can access (no client access needed)
ALTER TABLE public.processed_stripe_events ENABLE ROW LEVEL SECURITY;

-- Performance indexes for common queries
CREATE INDEX IF NOT EXISTS idx_orders_user_status_created
  ON public.orders (user_id, status, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_generated_headshots_order_status
  ON public.generated_headshots (order_id, status);

COMMENT ON TABLE public.processed_stripe_events IS 'Tracks processed Stripe webhook events for idempotent handling.';
