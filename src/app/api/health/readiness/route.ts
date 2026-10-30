import { NextResponse } from 'next/server';
import { CATEGORIES } from '@/config/categories';
import { getMissingPaddlePrices } from '@/config/paddle-prices';

export const dynamic = 'force-dynamic';

/**
 * Which services the money path can reach in this deployment.
 * Booleans and counts only — never a secret value. Read by
 * .github/workflows/funnel-audit.yml so the owner can see what is missing
 * without opening the Vercel dashboard.
 */
function has(name: string): boolean {
  const v = process.env[name];
  return typeof v === 'string' && v.trim() !== '';
}

export function GET() {
  const headshotIds = CATEGORIES.headshots.packages.map((p) => p.id);
  const missingHeadshotPrices = getMissingPaddlePrices(headshotIds);

  const checks = {
    supabase: has('NEXT_PUBLIC_SUPABASE_URL') && has('NEXT_PUBLIC_SUPABASE_ANON_KEY') && has('SUPABASE_SERVICE_ROLE_KEY'),
    paddleServer: has('PADDLE_API_KEY'),
    paddleWebhook: has('PADDLE_WEBHOOK_SECRET'),
    paddleClient: has('NEXT_PUBLIC_PADDLE_CLIENT_TOKEN'),
    paddleEnv: process.env.NEXT_PUBLIC_PADDLE_ENV || 'unset',
    headshotPricesConfigured: headshotIds.length - missingHeadshotPrices.length,
    headshotPricesTotal: headshotIds.length,
    replicate: has('REPLICATE_API_TOKEN'),
    replicateWebhook: has('REPLICATE_WEBHOOK_SECRET'),
    resend: has('RESEND_API_KEY'),
    upstash: has('UPSTASH_REDIS_REST_URL') && has('UPSTASH_REDIS_REST_TOKEN'),
    cronSecret: has('CRON_SECRET'),
    heroStoryModel: has('ANTHROPIC_API_KEY'),
    heroDigitalPrice: has('PADDLE_PRICE_HERO_DIGITAL'),
  };

  const ready =
    checks.supabase &&
    checks.paddleServer &&
    checks.paddleWebhook &&
    checks.paddleClient &&
    missingHeadshotPrices.length === 0 &&
    checks.replicate &&
    checks.replicateWebhook;

  return NextResponse.json(
    { funnelReady: ready, checks, version: process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) || 'dev' },
    { headers: { 'Cache-Control': 'no-store' } },
  );
}
