-- =============================================================================
-- TailorPic — Combined Pending Migrations
-- =============================================================================
-- Run this via GitHub Actions:
--   gh workflow run db-migrate.yml -f mode=apply
--
-- This combines all pending migrations that haven't been applied yet:
-- - contact_messages table
-- - newsletter_subscribers table
-- - refunded status support
-- - retry/dedupe infrastructure
-- =============================================================================

-- ── 1. Contact Messages ─────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id         uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  name       text        NOT NULL,
  email      text        NOT NULL,
  subject    text        NOT NULL,
  message    text        NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  read       boolean     NOT NULL DEFAULT false,
  archived   boolean     NOT NULL DEFAULT false
);

ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'contact_messages' AND policyname = 'Allow public inserts on contact_messages'
  ) THEN
    CREATE POLICY "Allow public inserts on contact_messages"
      ON public.contact_messages FOR INSERT TO anon, authenticated WITH CHECK (true);
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'contact_messages' AND policyname = 'Allow service_role to select contact_messages'
  ) THEN
    CREATE POLICY "Allow service_role to select contact_messages"
      ON public.contact_messages FOR SELECT TO service_role USING (true);
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'contact_messages' AND policyname = 'Allow service_role to update contact_messages'
  ) THEN
    CREATE POLICY "Allow service_role to update contact_messages"
      ON public.contact_messages FOR UPDATE TO service_role USING (true) WITH CHECK (true);
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at
  ON public.contact_messages (created_at DESC);

-- ── 2. Newsletter Subscribers ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  subscribed_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  unsubscribed_at TIMESTAMPTZ,
  source TEXT DEFAULT 'website'
);

ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'newsletter_subscribers' AND policyname = 'Anyone can subscribe'
  ) THEN
    CREATE POLICY "Anyone can subscribe"
      ON public.newsletter_subscribers FOR INSERT TO anon, authenticated WITH CHECK (true);
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'newsletter_subscribers' AND policyname = 'Service role full access'
  ) THEN
    CREATE POLICY "Service role full access"
      ON public.newsletter_subscribers FOR ALL TO service_role USING (true) WITH CHECK (true);
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_email
  ON public.newsletter_subscribers (email);

-- ── 3. Refunded Status (005) ────────────────────────────────────────────────
-- Add 'refunded' as a valid order status if using a CHECK constraint
-- (Supabase uses TEXT type for status, so this is a no-op but kept for documentation)

-- ── 4. Retry & Deduplication Infrastructure (006) ───────────────────────────
-- Add retry columns to orders
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'orders' AND column_name = 'retry_count'
  ) THEN
    ALTER TABLE public.orders ADD COLUMN retry_count INTEGER DEFAULT 0;
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'orders' AND column_name = 'last_retry_at'
  ) THEN
    ALTER TABLE public.orders ADD COLUMN last_retry_at TIMESTAMPTZ;
  END IF;
END $$;

-- Stripe event deduplication table
CREATE TABLE IF NOT EXISTS public.processed_stripe_events (
  event_id TEXT PRIMARY KEY,
  event_type TEXT,
  processed_at TIMESTAMPTZ DEFAULT now()
);

-- Performance indexes
CREATE INDEX IF NOT EXISTS idx_orders_pending_retry
  ON public.orders (status, retry_count, last_retry_at)
  WHERE status IN ('pending', 'processing');

CREATE INDEX IF NOT EXISTS idx_orders_created_at
  ON public.orders (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_orders_stripe_payment_intent
  ON public.orders (stripe_payment_intent)
  WHERE stripe_payment_intent IS NOT NULL;

-- Auto-cleanup old dedup entries (> 48 hours)
-- Run via cron or Supabase scheduled function
CREATE OR REPLACE FUNCTION cleanup_old_stripe_events()
RETURNS void AS $$
BEGIN
  DELETE FROM public.processed_stripe_events
  WHERE processed_at < now() - interval '48 hours';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
