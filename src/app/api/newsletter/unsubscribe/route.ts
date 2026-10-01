import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';
import { verifyUnsubscribeToken } from '@/lib/emails';
import { siteConfig } from '@/config/site';
import { logger } from '@/lib/logger';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email')?.trim().toLowerCase();
  const token = searchParams.get('token');

  if (!email || !token || email.length > 254 || !verifyUnsubscribeToken(email, token)) {
    return NextResponse.json({ error: 'Invalid unsubscribe link' }, { status: 400 });
  }

  try {
    const supabase = createAdminClient();
    const { error } = await supabase
      .from('newsletter_subscribers')
      .update({ unsubscribed_at: new Date().toISOString() })
      .eq('email', email);
    if (error) {
      logger.error('newsletter unsubscribe failed:', error.message);
      return NextResponse.json({ error: 'Could not unsubscribe. Please try again.' }, { status: 500 });
    }
  } catch (err) {
    logger.error('newsletter unsubscribe error:', err);
    return NextResponse.json({ error: 'Could not unsubscribe. Please try again.' }, { status: 500 });
  }

  return NextResponse.redirect(new URL('/newsletter/unsubscribed', siteConfig.url));
}
