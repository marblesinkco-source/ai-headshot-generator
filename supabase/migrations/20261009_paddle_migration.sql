-- Migration: Stripe → Paddle payment provider migration
-- Date: 2026-10-09
-- Description: Adds Paddle-specific columns to orders, creates Paddle event dedup table,
--              and updates accounting_center default provider.
--              Stripe columns are RETAINED for historical data — no destructive changes.

-- ── 1. Add Paddle columns to orders table ─────────────────────────────────────
-- Paddle transaction IDs: txn_... format
ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS paddle_transaction_id TEXT,
  ADD COLUMN IF NOT EXISTS paddle_subscription_id TEXT;

-- Index for webhook lookups by Paddle transaction ID
CREATE INDEX IF NOT EXISTS idx_orders_paddle_transaction_id
  ON public.orders (paddle_transaction_id)
  WHERE paddle_transaction_id IS NOT NULL;

-- ── 2. Create Paddle webhook event deduplication table ────────────────────────
-- Mirrors processed_stripe_events structure
CREATE TABLE IF NOT EXISTS public.processed_paddle_events (
  event_id    TEXT        PRIMARY KEY,
  event_type  TEXT        NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Auto-cleanup: remove events older than 30 days (prevents table bloat)
-- Same pattern as processed_stripe_events
CREATE INDEX IF NOT EXISTS idx_processed_paddle_events_created_at
  ON public.processed_paddle_events (created_at);

-- ── 3. Update accounting_center default provider ──────────────────────────────
-- Only update the default; existing Stripe records keep their provider value
UPDATE public.accounting_center
  SET default_provider = 'paddle'
  WHERE default_provider = 'stripe';

-- If accounting_center doesn't have a default_provider column, add it
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'accounting_center'
      AND column_name = 'default_provider'
  ) THEN
    ALTER TABLE public.accounting_center
      ADD COLUMN default_provider TEXT NOT NULL DEFAULT 'paddle';
  END IF;
END $$;

-- ── 4. Add payment_provider column to financial_transactions ──────────────────
-- Allow tracking which provider processed each transaction
-- Existing records keep 'stripe', new ones default to 'paddle'
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'financial_transactions'
      AND column_name = 'payment_provider'
  ) THEN
    ALTER TABLE public.financial_transactions
      ADD COLUMN payment_provider TEXT NOT NULL DEFAULT 'paddle';
    -- Backfill existing records as Stripe
    UPDATE public.financial_transactions
      SET payment_provider = 'stripe'
      WHERE source_provider = 'stripe' OR payment_provider = 'paddle';
  END IF;
END $$;

-- ── 5. Comment for documentation ─────────────────────────────────────────────
COMMENT ON COLUMN public.orders.paddle_transaction_id IS 'Paddle transaction ID (txn_...) — set by webhook on successful payment';
COMMENT ON COLUMN public.orders.paddle_subscription_id IS 'Paddle subscription ID (sub_...) — for future subscription support';
COMMENT ON TABLE public.processed_paddle_events IS 'Deduplication table for Paddle webhook events — mirrors processed_stripe_events';
