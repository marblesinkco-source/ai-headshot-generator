/**
 * Account deletion endpoint.
 *
 * Deletes all user data from Supabase (storage, orders, models, etc.)
 * and then deletes the auth user. Requires an authenticated session.
 *
 * GDPR Article 17 — Right to Erasure
 */

import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createClient, createAdminClient } from '@/lib/supabase/server';
import { siteConfig } from '@/config/site';
import { buildAccountDeletionEmail } from '@/lib/emails';
import { rateLimit } from '@/lib/rate-limit';

export async function POST() {
  // 1. Verify the user is authenticated
  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Rate limit: 3 requests per hour per user
  const rl = rateLimit({
    key: `account-delete:${user.id}`,
    limit: 3,
    windowMs: 60 * 60 * 1000,
  });
  if (!rl.success) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429, headers: { 'Retry-After': '3600' } },
    );
  }

  const userId = user.id;
  // Capture before deletion — the user record is gone afterwards.
  const userEmail = user.email;
  const customerName =
    typeof user.user_metadata?.full_name === 'string' ? user.user_metadata.full_name : undefined;
  const admin = createAdminClient();
  const errors: string[] = [];

  try {
    // 2. Delete user files from storage buckets
    for (const bucket of ['uploads', 'headshots']) {
      const { data: files } = await admin.storage.from(bucket).list(userId);
      if (files && files.length > 0) {
        const paths = files.map((f) => `${userId}/${f.name}`);
        const { error } = await admin.storage.from(bucket).remove(paths);
        if (error) errors.push(`storage/${bucket}: ${error.message}`);
      }
    }

    // 3. Delete user data from database tables (order matters for FK constraints)
    const tablesToDelete = [
      'generated_images',
      'training_jobs',
      'ai_models',
      'order_items',
      'orders',
      'credits',
      'contact_messages',
    ];

    for (const table of tablesToDelete) {
      try {
        // Use email for contact_messages, user_id for everything else
        if (table === 'contact_messages') {
          await admin.from(table).delete().eq('email', user.email ?? '');
        } else {
          await admin.from(table).delete().eq('user_id', userId);
        }
      } catch {
        // Table may not exist — non-fatal
      }
    }

    // 4. Delete the auth user (service role required)
    const { error: deleteUserError } = await admin.auth.admin.deleteUser(userId);
    if (deleteUserError) {
      errors.push(`auth: ${deleteUserError.message}`);
      return NextResponse.json(
        { error: 'Failed to delete account. Please contact support.', details: errors },
        { status: 500 }
      );
    }

    // 5. Send confirmation email (non-fatal — the account is already deleted)
    if (userEmail && process.env.RESEND_API_KEY) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        const { subject, html } = buildAccountDeletionEmail({ customerName });
        await resend.emails.send({
          from: `${siteConfig.name} <noreply@${new URL(siteConfig.url).hostname}>`,
          to: userEmail,
          subject,
          html,
        });
      } catch (emailErr) {
        console.error('Account deletion email failed:', emailErr);
      }
    }

    return NextResponse.json({ success: true, errors: errors.length > 0 ? errors : undefined });
  } catch (err) {
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please contact support.' },
      { status: 500 }
    );
  }
}
