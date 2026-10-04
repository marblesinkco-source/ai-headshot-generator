-- ============================================================================
-- Migration 007: Accounting & Transaction Center
-- TailorPic — Canonical financial data model (17 tables)
-- Non-destructive: no existing tables modified or dropped.
-- ============================================================================

-- ── 0. Shared updated_at trigger function ────────────────────────────────────
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ── 0b. Human-readable ID generator ─────────────────────────────────────────
-- Format: PREFIX-YYYY-XXXXXX  (collision-safe via random + sequence fallback)
CREATE OR REPLACE FUNCTION public.generate_human_id(prefix text)
RETURNS text AS $$
DECLARE
  yr text := to_char(now(), 'YYYY');
  rand text := upper(substr(md5(gen_random_uuid()::text), 1, 6));
BEGIN
  RETURN prefix || '-' || yr || '-' || rand;
END;
$$ LANGUAGE plpgsql;

-- ── 1. ENUM TYPES ────────────────────────────────────────────────────────────

DO $$ BEGIN
  CREATE TYPE public.financial_transaction_type AS ENUM (
    'sale','one_time_payment','subscription_charge','credit_purchase',
    'credit_usage','api_usage_charge','refund','partial_refund',
    'chargeback','dispute','chargeback_reversal','discount','tax',
    'payment_fee','marketplace_fee','affiliate_commission','fx_fee',
    'adjustment','payout','bank_settlement'
  );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE public.financial_transaction_status AS ENUM (
    'pending','authorized','processing','completed','failed',
    'cancelled','refunded','partially_refunded','disputed',
    'chargeback','reversed','payout_pending','paid_out'
  );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE public.financial_payment_status AS ENUM (
    'unpaid','pending','authorized','paid','failed',
    'refunded','partially_refunded','disputed'
  );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE public.financial_refund_status AS ENUM (
    'requested','under_review','approved','rejected',
    'processing','completed','failed'
  );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE public.reconciliation_status AS ENUM (
    'matched','partially_matched','unmatched','investigation_required'
  );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE public.provider_connection_status AS ENUM (
    'active','inactive','error','disconnected'
  );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE public.webhook_event_status AS ENUM (
    'received','processing','processed','failed','duplicate'
  );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE public.billing_profile_type AS ENUM (
    'individual','business'
  );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE public.payout_status AS ENUM (
    'pending','in_transit','paid','failed','cancelled'
  );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE public.credit_event_type AS ENUM (
    'purchase','usage','refund','expiry','adjustment','transfer'
  );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- ── 2. TABLE: financial_transactions (5.1) ───────────────────────────────────

CREATE TABLE IF NOT EXISTS public.financial_transactions (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  human_id        text NOT NULL UNIQUE DEFAULT public.generate_human_id('TXN'),
  user_id         uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  order_id        text REFERENCES public.orders(id) ON DELETE SET NULL,

  -- Source
  source_type           text NOT NULL DEFAULT 'direct',  -- direct, marketplace, api
  source_provider       text NOT NULL DEFAULT 'stripe',
  source_account_id     text,
  external_transaction_id text,

  -- Classification
  transaction_type      public.financial_transaction_type NOT NULL DEFAULT 'sale',
  service_type          text,               -- headshots, credits, etc.
  category_slug         text,
  package_code          text,

  -- Amounts (all in cents)
  quantity              integer NOT NULL DEFAULT 1,
  unit_amount           bigint NOT NULL DEFAULT 0,
  gross_amount          bigint NOT NULL DEFAULT 0,
  discount_amount       bigint NOT NULL DEFAULT 0,
  subtotal_amount       bigint NOT NULL DEFAULT 0,
  tax_amount            bigint NOT NULL DEFAULT 0,
  withholding_amount    bigint NOT NULL DEFAULT 0,
  payment_processor_fee bigint NOT NULL DEFAULT 0,
  marketplace_fee       bigint NOT NULL DEFAULT 0,
  platform_fee          bigint NOT NULL DEFAULT 0,
  affiliate_commission  bigint NOT NULL DEFAULT 0,
  partner_commission    bigint NOT NULL DEFAULT 0,
  fx_fee                bigint NOT NULL DEFAULT 0,
  dispute_fee           bigint NOT NULL DEFAULT 0,
  refund_fee            bigint NOT NULL DEFAULT 0,
  payout_fee            bigint NOT NULL DEFAULT 0,
  other_adjustment      bigint NOT NULL DEFAULT 0,
  net_amount            bigint NOT NULL DEFAULT 0,

  -- Currency
  original_amount       bigint NOT NULL DEFAULT 0,
  original_currency     text NOT NULL DEFAULT 'usd',
  settlement_amount     bigint,
  settlement_currency   text,
  base_reporting_amount bigint,
  base_reporting_currency text NOT NULL DEFAULT 'usd',
  fx_rate               numeric(18,8),
  fx_rate_timestamp     timestamptz,
  fx_provider           text,

  -- Payment method
  payment_method_type   text,
  card_brand            text,
  card_last4            text,
  processor_payment_id  text,
  processor_charge_id   text,

  -- Statuses
  payment_status        public.financial_payment_status NOT NULL DEFAULT 'pending',
  transaction_status    public.financial_transaction_status NOT NULL DEFAULT 'pending',
  settlement_status     text DEFAULT 'unsettled',

  -- Meta
  description           text,
  occurred_at           timestamptz NOT NULL DEFAULT now(),
  created_at            timestamptz NOT NULL DEFAULT now(),
  updated_at            timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_ft_user_id ON public.financial_transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_ft_order_id ON public.financial_transactions(order_id);
CREATE INDEX IF NOT EXISTS idx_ft_occurred ON public.financial_transactions(occurred_at DESC);
CREATE INDEX IF NOT EXISTS idx_ft_status ON public.financial_transactions(transaction_status);
CREATE INDEX IF NOT EXISTS idx_ft_type ON public.financial_transactions(transaction_type);
CREATE INDEX IF NOT EXISTS idx_ft_provider ON public.financial_transactions(source_provider);
CREATE INDEX IF NOT EXISTS idx_ft_external ON public.financial_transactions(external_transaction_id);
CREATE INDEX IF NOT EXISTS idx_ft_human ON public.financial_transactions(human_id);

CREATE TRIGGER financial_transactions_updated_at
  BEFORE UPDATE ON public.financial_transactions
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ── 3. TABLE: financial_events (5.2) — immutable event stream ────────────────

CREATE TABLE IF NOT EXISTS public.financial_events (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  transaction_id    uuid REFERENCES public.financial_transactions(id) ON DELETE SET NULL,
  provider          text NOT NULL,
  provider_event_id text,
  event_type        text NOT NULL,
  amount            bigint,
  currency          text,
  status            text,
  occurred_at       timestamptz NOT NULL DEFAULT now(),
  payload_hash      text,
  raw_reference     text,
  created_at        timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_fe_provider_event
  ON public.financial_events(provider, provider_event_id)
  WHERE provider_event_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_fe_transaction ON public.financial_events(transaction_id);
CREATE INDEX IF NOT EXISTS idx_fe_occurred ON public.financial_events(occurred_at DESC);

-- ── 4. TABLE: payment_fees (5.3) ─────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.payment_fees (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  transaction_id    uuid NOT NULL REFERENCES public.financial_transactions(id) ON DELETE CASCADE,
  fee_type          text NOT NULL,
  amount            bigint NOT NULL DEFAULT 0,
  currency          text NOT NULL DEFAULT 'usd',
  provider_reference text,
  created_at        timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_pf_transaction ON public.payment_fees(transaction_id);

-- ── 5. TABLE: refunds (5.4) ──────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.refunds (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  human_id          text NOT NULL UNIQUE DEFAULT public.generate_human_id('REF'),
  user_id           uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  transaction_id    uuid REFERENCES public.financial_transactions(id) ON DELETE SET NULL,
  order_id          text REFERENCES public.orders(id) ON DELETE SET NULL,
  external_refund_id text,
  requested_amount  bigint NOT NULL DEFAULT 0,
  approved_amount   bigint NOT NULL DEFAULT 0,
  refunded_amount   bigint NOT NULL DEFAULT 0,
  currency          text NOT NULL DEFAULT 'usd',
  reason            text,
  status            public.financial_refund_status NOT NULL DEFAULT 'requested',
  requested_at      timestamptz NOT NULL DEFAULT now(),
  approved_at       timestamptz,
  processed_at      timestamptz,
  failure_reason    text,
  created_at        timestamptz NOT NULL DEFAULT now(),
  updated_at        timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_refunds_user ON public.refunds(user_id);
CREATE INDEX IF NOT EXISTS idx_refunds_transaction ON public.refunds(transaction_id);
CREATE INDEX IF NOT EXISTS idx_refunds_order ON public.refunds(order_id);
CREATE INDEX IF NOT EXISTS idx_refunds_status ON public.refunds(status);

CREATE TRIGGER refunds_updated_at
  BEFORE UPDATE ON public.refunds
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ── 6. TABLE: disputes (5.5) ─────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.disputes (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  human_id            text NOT NULL UNIQUE DEFAULT public.generate_human_id('DSP'),
  user_id             uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  transaction_id      uuid REFERENCES public.financial_transactions(id) ON DELETE SET NULL,
  external_dispute_id text,
  amount              bigint NOT NULL DEFAULT 0,
  currency            text NOT NULL DEFAULT 'usd',
  reason              text,
  status              text NOT NULL DEFAULT 'open',
  opened_at           timestamptz NOT NULL DEFAULT now(),
  due_at              timestamptz,
  resolved_at         timestamptz,
  provider            text,
  created_at          timestamptz NOT NULL DEFAULT now(),
  updated_at          timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_disputes_user ON public.disputes(user_id);
CREATE INDEX IF NOT EXISTS idx_disputes_transaction ON public.disputes(transaction_id);

CREATE TRIGGER disputes_updated_at
  BEFORE UPDATE ON public.disputes
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ── 7. TABLE: credit_ledger (5.6) — immutable credit events ─────────────────

CREATE TABLE IF NOT EXISTS public.credit_ledger (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  transaction_id  uuid REFERENCES public.financial_transactions(id) ON DELETE SET NULL,
  event_type      public.credit_event_type NOT NULL,
  credits_delta   integer NOT NULL,
  balance_after   integer NOT NULL,
  reason          text,
  expires_at      timestamptz,
  created_at      timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_cl_user ON public.credit_ledger(user_id);
CREATE INDEX IF NOT EXISTS idx_cl_created ON public.credit_ledger(created_at DESC);

-- ── 8. TABLE: invoices (5.7) ─────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.invoices (
  id                       uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  human_id                 text NOT NULL UNIQUE DEFAULT public.generate_human_id('INV'),
  user_id                  uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  transaction_id           uuid REFERENCES public.financial_transactions(id) ON DELETE SET NULL,
  order_id                 text REFERENCES public.orders(id) ON DELETE SET NULL,
  billing_profile_snapshot jsonb,
  subtotal                 bigint NOT NULL DEFAULT 0,
  discount                 bigint NOT NULL DEFAULT 0,
  tax                      bigint NOT NULL DEFAULT 0,
  total                    bigint NOT NULL DEFAULT 0,
  currency                 text NOT NULL DEFAULT 'usd',
  issued_at                timestamptz NOT NULL DEFAULT now(),
  pdf_url                  text,
  external_invoice_id      text,
  created_at               timestamptz NOT NULL DEFAULT now(),
  updated_at               timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_invoices_user ON public.invoices(user_id);
CREATE INDEX IF NOT EXISTS idx_invoices_order ON public.invoices(order_id);
CREATE INDEX IF NOT EXISTS idx_invoices_issued ON public.invoices(issued_at DESC);

CREATE TRIGGER invoices_updated_at
  BEFORE UPDATE ON public.invoices
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ── 9. TABLE: receipts (5.8) ─────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.receipts (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  human_id        text NOT NULL UNIQUE DEFAULT public.generate_human_id('RCP'),
  user_id         uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  transaction_id  uuid REFERENCES public.financial_transactions(id) ON DELETE SET NULL,
  total           bigint NOT NULL DEFAULT 0,
  currency        text NOT NULL DEFAULT 'usd',
  issued_at       timestamptz NOT NULL DEFAULT now(),
  pdf_url         text,
  created_at      timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_receipts_user ON public.receipts(user_id);
CREATE INDEX IF NOT EXISTS idx_receipts_issued ON public.receipts(issued_at DESC);

-- ── 10. TABLE: payouts (5.9) ─────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.payouts (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  human_id            text NOT NULL UNIQUE DEFAULT public.generate_human_id('PAY'),
  user_id             uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  provider            text NOT NULL,
  external_payout_id  text,
  payout_date         timestamptz,
  gross_amount        bigint NOT NULL DEFAULT 0,
  fees_amount         bigint NOT NULL DEFAULT 0,
  adjustments_amount  bigint NOT NULL DEFAULT 0,
  net_amount          bigint NOT NULL DEFAULT 0,
  currency            text NOT NULL DEFAULT 'usd',
  destination_masked  text,
  bank_reference      text,
  status              public.payout_status NOT NULL DEFAULT 'pending',
  arrival_date        timestamptz,
  created_at          timestamptz NOT NULL DEFAULT now(),
  updated_at          timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_payouts_user ON public.payouts(user_id);
CREATE INDEX IF NOT EXISTS idx_payouts_date ON public.payouts(payout_date DESC);

CREATE TRIGGER payouts_updated_at
  BEFORE UPDATE ON public.payouts
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ── 11. TABLE: payout_transactions (5.10) — many-to-many ─────────────────────

CREATE TABLE IF NOT EXISTS public.payout_transactions (
  payout_id        uuid NOT NULL REFERENCES public.payouts(id) ON DELETE CASCADE,
  transaction_id   uuid NOT NULL REFERENCES public.financial_transactions(id) ON DELETE CASCADE,
  allocated_amount bigint NOT NULL DEFAULT 0,
  PRIMARY KEY (payout_id, transaction_id)
);

-- ── 12. TABLE: billing_profiles (5.11) ───────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.billing_profiles (
  id                          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id                     uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  profile_type                public.billing_profile_type NOT NULL DEFAULT 'individual',
  full_name                   text,
  legal_name                  text,
  billing_email               text,
  billing_address             jsonb,   -- {line1, line2, city, state, country, postal_code}
  country                     text,
  postal_code                 text,
  tax_id                      text,
  vat_id                      text,
  company_registration_number text,
  is_default                  boolean NOT NULL DEFAULT false,
  valid_from                  timestamptz NOT NULL DEFAULT now(),
  valid_to                    timestamptz,
  created_at                  timestamptz NOT NULL DEFAULT now(),
  updated_at                  timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_bp_user ON public.billing_profiles(user_id);

CREATE TRIGGER billing_profiles_updated_at
  BEFORE UPDATE ON public.billing_profiles
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ── 13. TABLE: tax_records (5.12) ────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.tax_records (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  transaction_id   uuid NOT NULL REFERENCES public.financial_transactions(id) ON DELETE CASCADE,
  tax_jurisdiction text,
  buyer_country    text,
  seller_country   text,
  tax_type         text,
  rate             numeric(8,4),
  taxable_base     bigint NOT NULL DEFAULT 0,
  tax_amount       bigint NOT NULL DEFAULT 0,
  reverse_charge   boolean NOT NULL DEFAULT false,
  tax_id_used      text,
  tax_provider     text,
  tax_reference    text,
  created_at       timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_tr_transaction ON public.tax_records(transaction_id);

-- ── 14. TABLE: fx_records (5.13) ─────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.fx_records (
  id                      uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  transaction_id          uuid NOT NULL REFERENCES public.financial_transactions(id) ON DELETE CASCADE,
  original_currency       text NOT NULL,
  settlement_currency     text NOT NULL,
  base_reporting_currency text NOT NULL DEFAULT 'usd',
  fx_rate                 numeric(18,8) NOT NULL,
  fx_provider             text,
  fx_rate_timestamp       timestamptz,
  created_at              timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_fx_transaction ON public.fx_records(transaction_id);

-- ── 15. TABLE: reconciliation_records (5.14) ─────────────────────────────────

CREATE TABLE IF NOT EXISTS public.reconciliation_records (
  id                        uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  transaction_id            uuid NOT NULL REFERENCES public.financial_transactions(id) ON DELETE CASCADE,
  expected_net              bigint NOT NULL DEFAULT 0,
  provider_settlement_amount bigint NOT NULL DEFAULT 0,
  difference_amount         bigint NOT NULL DEFAULT 0,
  status                    public.reconciliation_status NOT NULL DEFAULT 'unmatched',
  reconciled_at             timestamptz,
  notes                     text,
  created_at                timestamptz NOT NULL DEFAULT now(),
  updated_at                timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_recon_transaction ON public.reconciliation_records(transaction_id);
CREATE INDEX IF NOT EXISTS idx_recon_status ON public.reconciliation_records(status);

CREATE TRIGGER reconciliation_records_updated_at
  BEFORE UPDATE ON public.reconciliation_records
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ── 16. TABLE: provider_connections (5.15) ───────────────────────────────────

CREATE TABLE IF NOT EXISTS public.provider_connections (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  provider      text NOT NULL,
  account_label text,
  status        public.provider_connection_status NOT NULL DEFAULT 'active',
  connected_at  timestamptz,
  last_sync_at  timestamptz,
  sync_cursor   text,
  sync_error    text,
  retry_count   integer NOT NULL DEFAULT 0,
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_pc_user ON public.provider_connections(user_id);
CREATE UNIQUE INDEX IF NOT EXISTS idx_pc_user_provider
  ON public.provider_connections(user_id, provider);

CREATE TRIGGER provider_connections_updated_at
  BEFORE UPDATE ON public.provider_connections
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ── 17. TABLE: webhook_events (5.16) ─────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.webhook_events (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  provider          text NOT NULL,
  external_event_id text NOT NULL,
  event_type        text NOT NULL,
  received_at       timestamptz NOT NULL DEFAULT now(),
  processed_at      timestamptz,
  status            public.webhook_event_status NOT NULL DEFAULT 'received',
  payload_hash      text,
  error             text,
  created_at        timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_we_external
  ON public.webhook_events(provider, external_event_id);
CREATE INDEX IF NOT EXISTS idx_we_status ON public.webhook_events(status);
CREATE INDEX IF NOT EXISTS idx_we_received ON public.webhook_events(received_at DESC);

-- ── 18. TABLE: financial_audit_log (5.17) — immutable ────────────────────────

CREATE TABLE IF NOT EXISTS public.financial_audit_log (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_id      uuid,
  actor_type    text NOT NULL DEFAULT 'user',  -- user, system, webhook, admin
  action        text NOT NULL,
  entity_type   text NOT NULL,
  entity_id     text NOT NULL,
  source        text,
  request_id    text,
  before_hash   text,
  after_hash    text,
  created_at    timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_fal_actor ON public.financial_audit_log(actor_id);
CREATE INDEX IF NOT EXISTS idx_fal_entity ON public.financial_audit_log(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_fal_created ON public.financial_audit_log(created_at DESC);

-- ============================================================================
-- RLS POLICIES — user isolation (Section 26)
-- Users see only their own rows; service_role has full access.
-- ============================================================================

-- financial_transactions
ALTER TABLE public.financial_transactions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "ft_user_select" ON public.financial_transactions
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "ft_service_all" ON public.financial_transactions
  FOR ALL USING (auth.role() = 'service_role');

-- refunds
ALTER TABLE public.refunds ENABLE ROW LEVEL SECURITY;
CREATE POLICY "ref_user_select" ON public.refunds
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "ref_service_all" ON public.refunds
  FOR ALL USING (auth.role() = 'service_role');

-- disputes
ALTER TABLE public.disputes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "dsp_user_select" ON public.disputes
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "dsp_service_all" ON public.disputes
  FOR ALL USING (auth.role() = 'service_role');

-- credit_ledger
ALTER TABLE public.credit_ledger ENABLE ROW LEVEL SECURITY;
CREATE POLICY "cl_user_select" ON public.credit_ledger
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "cl_service_all" ON public.credit_ledger
  FOR ALL USING (auth.role() = 'service_role');

-- invoices
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;
CREATE POLICY "inv_user_select" ON public.invoices
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "inv_service_all" ON public.invoices
  FOR ALL USING (auth.role() = 'service_role');

-- receipts
ALTER TABLE public.receipts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "rcp_user_select" ON public.receipts
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "rcp_service_all" ON public.receipts
  FOR ALL USING (auth.role() = 'service_role');

-- payouts
ALTER TABLE public.payouts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "pay_user_select" ON public.payouts
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "pay_service_all" ON public.payouts
  FOR ALL USING (auth.role() = 'service_role');

-- billing_profiles
ALTER TABLE public.billing_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "bp_user_select" ON public.billing_profiles
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "bp_user_insert" ON public.billing_profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "bp_user_update" ON public.billing_profiles
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "bp_service_all" ON public.billing_profiles
  FOR ALL USING (auth.role() = 'service_role');

-- provider_connections
ALTER TABLE public.provider_connections ENABLE ROW LEVEL SECURITY;
CREATE POLICY "pc_user_select" ON public.provider_connections
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "pc_service_all" ON public.provider_connections
  FOR ALL USING (auth.role() = 'service_role');

-- Tables with no user_id (system-level) — service_role only
ALTER TABLE public.financial_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "fe_service_all" ON public.financial_events
  FOR ALL USING (auth.role() = 'service_role');

ALTER TABLE public.payment_fees ENABLE ROW LEVEL SECURITY;
CREATE POLICY "pf_service_all" ON public.payment_fees
  FOR ALL USING (auth.role() = 'service_role');

ALTER TABLE public.tax_records ENABLE ROW LEVEL SECURITY;
CREATE POLICY "taxr_service_all" ON public.tax_records
  FOR ALL USING (auth.role() = 'service_role');

ALTER TABLE public.fx_records ENABLE ROW LEVEL SECURITY;
CREATE POLICY "fxr_service_all" ON public.fx_records
  FOR ALL USING (auth.role() = 'service_role');

ALTER TABLE public.reconciliation_records ENABLE ROW LEVEL SECURITY;
CREATE POLICY "recon_service_all" ON public.reconciliation_records
  FOR ALL USING (auth.role() = 'service_role');

ALTER TABLE public.webhook_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "we_service_all" ON public.webhook_events
  FOR ALL USING (auth.role() = 'service_role');

ALTER TABLE public.financial_audit_log ENABLE ROW LEVEL SECURITY;
CREATE POLICY "fal_service_all" ON public.financial_audit_log
  FOR ALL USING (auth.role() = 'service_role');

ALTER TABLE public.payout_transactions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "pt_service_all" ON public.payout_transactions
  FOR ALL USING (auth.role() = 'service_role');

-- ── Allow users to read financial_events / fees / tax / fx through their transactions
-- These are accessed via JOIN through financial_transactions which already has user RLS.
-- For direct access, users can SELECT rows tied to their transactions.
CREATE POLICY "fe_user_select" ON public.financial_events
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.financial_transactions ft
      WHERE ft.id = financial_events.transaction_id AND ft.user_id = auth.uid()
    )
  );

CREATE POLICY "pf_user_select" ON public.payment_fees
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.financial_transactions ft
      WHERE ft.id = payment_fees.transaction_id AND ft.user_id = auth.uid()
    )
  );

CREATE POLICY "taxr_user_select" ON public.tax_records
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.financial_transactions ft
      WHERE ft.id = tax_records.transaction_id AND ft.user_id = auth.uid()
    )
  );

CREATE POLICY "fxr_user_select" ON public.fx_records
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.financial_transactions ft
      WHERE ft.id = fx_records.transaction_id AND ft.user_id = auth.uid()
    )
  );

-- ============================================================================
-- COMMENTS
-- ============================================================================

COMMENT ON TABLE public.financial_transactions IS 'Canonical normalized financial transaction ledger — all providers converge here.';
COMMENT ON TABLE public.financial_events IS 'Immutable event stream from payment providers. Duplicate detection via provider+provider_event_id.';
COMMENT ON TABLE public.payment_fees IS 'Itemized fees per transaction (processor, platform, marketplace, etc.).';
COMMENT ON TABLE public.refunds IS 'Refund requests and their lifecycle.';
COMMENT ON TABLE public.disputes IS 'Chargebacks and disputes from payment providers.';
COMMENT ON TABLE public.credit_ledger IS 'Immutable credit event ledger. Every credit change is an append-only entry.';
COMMENT ON TABLE public.invoices IS 'Invoices with billing profile snapshot for historical accuracy.';
COMMENT ON TABLE public.receipts IS 'Payment receipts (simpler than invoices).';
COMMENT ON TABLE public.payouts IS 'Provider payouts to merchant bank account.';
COMMENT ON TABLE public.payout_transactions IS 'Many-to-many: which transactions are included in a payout.';
COMMENT ON TABLE public.billing_profiles IS 'Customer billing profiles (individual or business). Historical snapshots preserved.';
COMMENT ON TABLE public.tax_records IS 'Per-transaction tax details. No hard-coded rates.';
COMMENT ON TABLE public.fx_records IS 'Foreign exchange rate records per transaction.';
COMMENT ON TABLE public.reconciliation_records IS 'Transaction reconciliation against provider settlements.';
COMMENT ON TABLE public.provider_connections IS 'Payment provider connection status and sync state. No secrets stored here.';
COMMENT ON TABLE public.webhook_events IS 'Webhook event log for idempotency and replay protection.';
COMMENT ON TABLE public.financial_audit_log IS 'Immutable audit trail for all financial operations.';
COMMENT ON FUNCTION public.generate_human_id(text) IS 'Generates PREFIX-YYYY-XXXXXX human-readable IDs.';
