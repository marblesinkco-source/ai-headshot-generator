import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createAdminClient } from '@/lib/supabase/server';
import { rateLimit, getClientIp } from '@/lib/rate-limit';
import { siteConfig } from '@/config/site';
import { buildNewsletterWelcomeEmail } from '@/lib/emails';
import { csrfGuard } from '@/lib/security';
import { logger } from '@/lib/logger';
import { EMAIL_RE } from '@/lib/utils';

export const maxDuration = 10;


export async function POST(request: Request) {
  const csrf = csrfGuard(request);
  if (csrf) return csrf;
  const rl = await rateLimit({
    key: `newsletter:${getClientIp(request)}`,
    limit: 5,
    windowMs: 60 * 60 * 1000,
  });
  if (!rl.success) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429, headers: { 'Retry-After': '3600' } },
    );
  }

  let email: unknown;
  try {
    ({ email } = await request.json());
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  if (typeof email !== 'string' || email.length > 254 || !EMAIL_RE.test(email.trim())) {
    return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
  }

  const normalizedEmail = email.trim().toLowerCase();

  // Store subscriber in Supabase (upsert to handle duplicates + resubscriptions).
  let stored = false;
  try {
    const supabase = createAdminClient();
    const { error } = await supabase
      .from('newsletter_subscribers')
      .upsert(
        {
          email: normalizedEmail,
          subscribed_at: new Date().toISOString(),
          unsubscribed_at: null, // clears previous unsubscription on resubscribe
        },
        { onConflict: 'email' },
      );
    if (error) {
      logger.error('newsletter_subscribers upsert failed:', error.message);
    } else {
      stored = true;
    }
  } catch (err) {
    logger.error('newsletter_subscribers upsert error:', err);
  }

  // Send welcome email via Resend.
  let emailed = false;
  if (process.env.RESEND_API_KEY) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const fromAddress = `${siteConfig.name} <${process.env.EMAIL_FROM || `noreply@${new URL(siteConfig.url).hostname}`}>`;
      const { subject, html } = buildNewsletterWelcomeEmail();

      await resend.emails.send({
        from: fromAddress,
        to: normalizedEmail,
        subject,
        html,
      });
      emailed = true;
    } catch (err) {
      logger.error('Newsletter welcome email send failed:', err);
    }
  }

  if (!stored && !emailed) {
    return NextResponse.json(
      { error: 'Could not subscribe. Please try again later.' },
      { status: 500 },
    );
  }

  return NextResponse.json({ success: true });
}
