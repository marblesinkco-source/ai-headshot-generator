/**
 * Account deletion endpoint.
 *
 * Deletes all user data from Supabase (storage, orders, models, etc.)
 * and then deletes the auth user. Requires an authenticated session.
 *
 * GDPR Article 17 — Right to Erasure
 */

import { NextResponse } from 'next/server';
import { createClient, createAdminClient } from '@/lib/supabase/server';

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

  const userId = user.id;
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

    return NextResponse.json({ success: true, errors: errors.length > 0 ? errors : undefined });
  } catch (err) {
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please contact support.' },
      { status: 500 }
    );
  }
}
