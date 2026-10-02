-- =============================================================================
-- TailorPic — PostgreSQL Init Script (Plan 2/3 self-hosted DB)
-- =============================================================================
-- This script runs on first container start (docker-entrypoint-initdb.d).
-- It creates the schema that Supabase manages in Plan 1.
-- =============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ── Orders ──────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS orders (
    id TEXT PRIMARY KEY,
    user_id UUID NOT NULL,
    package_id TEXT NOT NULL,
    category_id TEXT NOT NULL DEFAULT 'headshots',
    order_type TEXT DEFAULT 'standard',
    amount INTEGER NOT NULL,
    currency TEXT NOT NULL DEFAULT 'usd',
    headshot_count INTEGER NOT NULL DEFAULT 0,
    output_count INTEGER NOT NULL DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'pending',
    stripe_session_id TEXT,
    stripe_payment_intent TEXT,
    retry_count INTEGER DEFAULT 0,
    last_retry_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_stripe_payment_intent ON orders(stripe_payment_intent);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_pending_retry ON orders(status, retry_count, last_retry_at)
    WHERE status = 'pending' OR status = 'processing';

-- ── User Credits ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS user_credits (
    id TEXT PRIMARY KEY,
    user_id UUID NOT NULL,
    order_id TEXT REFERENCES orders(id),
    package_id TEXT NOT NULL,
    total_credits INTEGER NOT NULL DEFAULT 0,
    used_credits INTEGER NOT NULL DEFAULT 0,
    purchased_at TIMESTAMPTZ DEFAULT NOW(),
    expires_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_user_credits_user_id ON user_credits(user_id);
CREATE INDEX IF NOT EXISTS idx_user_credits_order_id ON user_credits(order_id);

-- ── Credit Transactions ─────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS credit_transactions (
    id TEXT PRIMARY KEY,
    user_id UUID NOT NULL,
    credit_id TEXT REFERENCES user_credits(id),
    order_id TEXT REFERENCES orders(id),
    type TEXT NOT NULL, -- 'purchase', 'usage', 'refund', 'expiry'
    amount INTEGER NOT NULL,
    balance_after INTEGER NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_credit_transactions_user_id ON credit_transactions(user_id);

-- ── Stripe Event Deduplication ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS processed_stripe_events (
    event_id TEXT PRIMARY KEY,
    event_type TEXT,
    processed_at TIMESTAMPTZ DEFAULT NOW()
);

-- ── Contact Messages ────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS contact_messages (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT,
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ── Newsletter Subscribers ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    subscribed_at TIMESTAMPTZ DEFAULT NOW(),
    unsubscribed_at TIMESTAMPTZ
);

-- ── Headshots (AI-generated photos) ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS headshots (
    id TEXT PRIMARY KEY,
    order_id TEXT REFERENCES orders(id),
    user_id UUID NOT NULL,
    url TEXT NOT NULL,
    thumbnail_url TEXT,
    is_favorite BOOLEAN DEFAULT false,
    style TEXT,
    background TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_headshots_order_id ON headshots(order_id);
CREATE INDEX IF NOT EXISTS idx_headshots_user_id ON headshots(user_id);

-- ── Updated-at trigger ──────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_orders_updated_at
    BEFORE UPDATE ON orders
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
