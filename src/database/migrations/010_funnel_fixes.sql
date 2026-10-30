-- Funnel audit fixes (2026-10-30).

-- 1) Statuses the code already writes but the enum lacked: the Paddle webhook
--    writes 'partial_refund' and the expire-orders cron writes 'expired'.
ALTER TYPE order_status ADD VALUE IF NOT EXISTS 'partial_refund';
ALTER TYPE order_status ADD VALUE IF NOT EXISTS 'expired';

-- 2) 003 created this policy without a role, so ANY signed-in user could
--    update ANY user's generated_headshots row. The service role bypasses RLS
--    anyway; scope the policy to it explicitly.
DROP POLICY IF EXISTS "Service role can update generated headshots" ON public.generated_headshots;
CREATE POLICY "Service role can update generated headshots"
  ON public.generated_headshots FOR UPDATE
  TO service_role
  USING (true)
  WITH CHECK (true);
