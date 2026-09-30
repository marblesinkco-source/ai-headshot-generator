-- Migration 004: Add credits system and upgrade email tracking
-- TailorPic — Annual credit packages and Express upgrade funnel

-- 1. Add upgrade_email_sent to orders (for Express→upgrade email flow)
ALTER TABLE orders ADD COLUMN IF NOT EXISTS upgrade_email_sent timestamptz;

-- 2. Add order_type to distinguish category purchases from credit purchases
ALTER TABLE orders ADD COLUMN IF NOT EXISTS order_type text NOT NULL DEFAULT 'category'
  CHECK (order_type IN ('category', 'credits'));

-- 3. Create user_credits table
CREATE TABLE IF NOT EXISTS user_credits (
  id text PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  order_id text NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  package_id text NOT NULL,
  total_credits integer NOT NULL,
  used_credits integer NOT NULL DEFAULT 0,
  remaining_credits integer GENERATED ALWAYS AS (total_credits - used_credits) STORED,
  purchased_at timestamptz NOT NULL DEFAULT now(),
  expires_at timestamptz NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Index for quick balance lookups
CREATE INDEX IF NOT EXISTS idx_user_credits_user_id ON user_credits(user_id);
CREATE INDEX IF NOT EXISTS idx_user_credits_expires ON user_credits(expires_at);

-- 4. Create credit_transactions table (audit log)
CREATE TABLE IF NOT EXISTS credit_transactions (
  id text PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  credit_id text NOT NULL REFERENCES user_credits(id) ON DELETE CASCADE,
  order_id text REFERENCES orders(id) ON DELETE SET NULL,
  type text NOT NULL CHECK (type IN ('purchase', 'use', 'refund', 'expire')),
  amount integer NOT NULL, -- positive for additions, negative for usage
  balance_after integer NOT NULL,
  category_id text, -- which category the credit was used for
  description text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_credit_transactions_user ON credit_transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_credit_transactions_credit ON credit_transactions(credit_id);

-- 5. RLS policies for user_credits
ALTER TABLE user_credits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own credits"
  ON user_credits FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Service role can manage credits"
  ON user_credits FOR ALL
  USING (auth.role() = 'service_role');

-- 6. RLS policies for credit_transactions
ALTER TABLE credit_transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own transactions"
  ON credit_transactions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Service role can manage transactions"
  ON credit_transactions FOR ALL
  USING (auth.role() = 'service_role');

-- 7. Updated_at trigger for user_credits
CREATE OR REPLACE FUNCTION update_user_credits_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER user_credits_updated_at
  BEFORE UPDATE ON user_credits
  FOR EACH ROW
  EXECUTE FUNCTION update_user_credits_updated_at();
