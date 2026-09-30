/**
 * POST /api/emails/upgrade
 *
 * Sends upgrade-offer emails to Express buyers whose orders are 48+ hours old
 * and who haven't purchased a higher-tier package yet.
 *
 * Designed to be called by a cron job (e.g. Vercel Cron) once per hour.
 * Protected by CRON_SECRET to prevent unauthorized access.
 */

import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';
import { Resend } from 'resend';
import { getCategoryById, getPackageById, type CategoryId } from '@/config/categories';
import { siteConfig } from '@/config/site';
import { buildUpgradeEmail } from '@/lib/emails';

const resend = new Resend(process.env.RESEND_API_KEY);

const UPGRADE_DELAY_HOURS = 48;
const DISCOUNT_PERCENT = 25;
const COUPON_CODE = 'UPGRADE25';

export async function POST(request: NextRequest) {
  // Verify cron secret
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;

  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = createAdminClient();

  // Find Express orders that are 48+ hours old and haven't been sent an upgrade email
  const cutoffDate = new Date(Date.now() - UPGRADE_DELAY_HOURS * 60 * 60 * 1000).toISOString();

  const { data: expressOrders, error: queryError } = await supabase
    .from('orders')
    .select('id, user_id, package_id, category_id, created_at, stripe_session_id')
    .like('package_id', '%-express')
    .in('status', ['paid', 'uploading', 'processing', 'completed'])
    .lt('created_at', cutoffDate)
    .is('upgrade_email_sent', null);

  if (queryError) {
    console.error('Failed to query express orders:', queryError);
    return NextResponse.json({ error: 'Query failed' }, { status: 500 });
  }

  if (!expressOrders || expressOrders.length === 0) {
    return NextResponse.json({ sent: 0, message: 'No eligible orders' });
  }

  let sentCount = 0;
  const errors: string[] = [];

  for (const order of expressOrders) {
    try {
      // Get user email
      const { data: profile } = await supabase
        .from('profiles')
        .select('email, full_name')
        .eq('id', order.user_id)
        .single();

      if (!profile?.email) {
        continue;
      }

      // Check if user already bought a non-express package in the same category
      const { data: existingUpgrade } = await supabase
        .from('orders')
        .select('id')
        .eq('user_id', order.user_id)
        .eq('category_id', order.category_id)
        .not('package_id', 'like', '%-express')
        .in('status', ['paid', 'uploading', 'processing', 'completed'])
        .limit(1);

      if (existingUpgrade && existingUpgrade.length > 0) {
        // Already upgraded — mark as sent so we don't check again
        await supabase
          .from('orders')
          .update({ upgrade_email_sent: new Date().toISOString() })
          .eq('id', order.id);
        continue;
      }

      const categoryId = (order.category_id || 'headshots') as CategoryId;
      const category = getCategoryById(categoryId);
      if (!category) continue;

      const expressPkg = getPackageById(categoryId, order.package_id);
      if (!expressPkg) continue;

      // Find the recommended package
      const recommendedPkg = category.packages.find((p) => p.recommended);
      if (!recommendedPkg) continue;

      const upgradeUrl = `${siteConfig.url}/${category.slug}?upgrade=true&coupon=${COUPON_CODE}`;

      const { subject, html } = buildUpgradeEmail({
        customerName: profile.full_name || undefined,
        categoryName: category.name,
        expressPackageName: expressPkg.name,
        recommendedPackageName: recommendedPkg.name,
        recommendedPrice: recommendedPkg.price,
        expressPrice: expressPkg.price,
        outputCount: recommendedPkg.outputCount,
        discountPercent: DISCOUNT_PERCENT,
        upgradeUrl,
        couponCode: COUPON_CODE,
      });

      await resend.emails.send({
        from: `${siteConfig.name} <noreply@${new URL(siteConfig.url).hostname}>`,
        to: profile.email,
        subject,
        html,
      });

      // Mark email as sent
      await supabase
        .from('orders')
        .update({ upgrade_email_sent: new Date().toISOString() })
        .eq('id', order.id);

      sentCount++;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      errors.push(`Order ${order.id}: ${msg}`);
      console.error(`Failed to send upgrade email for order ${order.id}:`, err);
    }
  }

  return NextResponse.json({
    sent: sentCount,
    total: expressOrders.length,
    errors: errors.length > 0 ? errors : undefined,
  });
}
