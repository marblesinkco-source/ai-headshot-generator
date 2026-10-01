/**
 * Data export endpoint.
 *
 * Returns a JSON file containing all personal data associated with the
 * authenticated user. Streams as a downloadable JSON file.
 *
 * GDPR Article 20 — Right to Data Portability
 */

import { NextResponse } from 'next/server';
import { createClient, createAdminClient } from '@/lib/supabase/server';
import { rateLimit, getClientIp } from '@/lib/rate-limit';
import { logger } from '@/lib/logger';

export async function GET(request: Request) {
  // Rate limit: 3 exports per hour per IP
  const ip = getClientIp(request);
  const { success } = rateLimit({ key: `export:${ip}`, limit: 3, windowMs: 60 * 60 * 1000 });
  if (!success) {
    return NextResponse.json({ error: 'Too many requests. Try again later.' }, { status: 429 });
  }

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

  // 2. Collect all user data
  const exportData: Record<string, unknown> = {
    exported_at: new Date().toISOString(),
    account: {
      id: user.id,
      email: user.email,
      full_name: user.user_metadata?.full_name || null,
      created_at: user.created_at,
      last_sign_in_at: user.last_sign_in_at,
      provider: user.app_metadata?.provider || 'email',
    },
  };

  // Fetch data from each table (non-fatal if table doesn't exist)
  const tables = [
    { name: 'orders', key: 'orders' },
    { name: 'order_items', key: 'order_items' },
    { name: 'credits', key: 'credits' },
    { name: 'ai_models', key: 'ai_models' },
    { name: 'training_jobs', key: 'training_jobs' },
    { name: 'generated_images', key: 'generated_images' },
  ];

  const incomplete: string[] = [];
  for (const { name, key } of tables) {
    try {
      const { data, error } = await admin.from(name).select('*').eq('user_id', userId);
      if (error) {
        logger.warn(`Data export: query failed for table ${name}`, error);
        exportData[key] = [];
        incomplete.push(name);
      } else {
        exportData[key] = data || [];
      }
    } catch (err) {
      logger.warn(`Data export: error reading table ${name}`, err);
      exportData[key] = [];
      incomplete.push(name);
    }
  }

  // 3. List storage files (metadata only — not the actual files)
  for (const bucket of ['uploads', 'headshots']) {
    try {
      const { data: files, error: listError } = await admin.storage.from(bucket).list(userId);
      if (listError) {
        logger.warn(`Data export: storage list failed for ${bucket}`, listError);
        incomplete.push(`storage:${bucket}`);
      }
      exportData[`storage_${bucket}`] = (files || []).map((f) => ({
        name: f.name,
        created_at: f.created_at,
        size: (f.metadata as Record<string, unknown>)?.size || null,
        mimetype: (f.metadata as Record<string, unknown>)?.mimetype || null,
      }));
    } catch (err) {
      logger.warn(`Data export: error listing storage ${bucket}`, err);
      incomplete.push(`storage:${bucket}`);
      exportData[`storage_${bucket}`] = [];
    }
  }

  if (incomplete.length) exportData.incomplete_sections = incomplete;

  // 4. Return as downloadable JSON
  const json = JSON.stringify(exportData, null, 2);

  return new NextResponse(json, {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
      'Content-Disposition': `attachment; filename="tailorpic-data-export-${new Date().toISOString().slice(0, 10)}.json"`,
    },
  });
}
