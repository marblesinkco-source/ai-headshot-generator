import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createAdminClient } from '@/lib/supabase/server';
import { rateLimit, getClientIp } from '@/lib/rate-limit';
import { siteConfig } from '@/config/site';
import { buildContactAutoReplyEmail } from '@/lib/emails';
import { csrfGuard } from '@/lib/security';
import { logger } from '@/lib/logger';
import { EMAIL_RE, escapeHtml } from '@/lib/utils';

export const maxDuration = 10;

const HOUR_MS = 60 * 60 * 1000;

export async function POST(request: Request) {
  const csrf = csrfGuard(request);
  if (csrf) return csrf;
  const ip = getClientIp(request);
  const rl = await rateLimit({ key: `contact:${ip}`, limit: 3, windowMs: HOUR_MS });
  if (!rl.success) {
    return NextResponse.json(
      { error: 'Too many messages. Please try again later.' },
      { status: 429, headers: { 'Retry-After': '3600' } },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const DEPARTMENTS = ['General', 'Sales / Enterprise', 'Support', 'Press / Media', 'Partnerships'];
  const department =
    typeof body.department === 'string' && DEPARTMENTS.includes(body.department) ? body.department : 'General';
  const subject = typeof body.subject === 'string' ? body.subject.trim() : '';
  const message = typeof body.message === 'string' ? body.message.trim() : '';

  if (!name || !email || !subject || !message) {
    return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
  }
  if (email.length > 254 || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
  }
  if (name.length > 100 || subject.length > 200 || message.length > 5000) {
    return NextResponse.json({ error: 'One or more fields are too long' }, { status: 400 });
  }

  let stored = false;
  let emailed = false;

  // Store in Supabase (table may not exist yet).
  try {
    const supabase = createAdminClient();
    const { error } = await supabase
      .from('contact_messages')
      .insert({ name, email, subject: `[${department}] ${subject}`, message });
    if (error) {
      logger.error('contact_messages insert failed:', error.message);
    } else {
      stored = true;
    }
  } catch (err) {
    logger.error('contact_messages insert error:', err);
  }

  // Email notification via Resend (optional: skipped when not configured).
  if (process.env.RESEND_API_KEY) {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const from = `${siteConfig.name} <${process.env.EMAIL_FROM || `noreply@${new URL(siteConfig.url).hostname}`}>`;

    try {
      await resend.emails.send({
        from,
        to: siteConfig.supportEmail,
        replyTo: email,
        subject: `[Contact · ${department}] ${subject}`,
        html: `<p><strong>From:</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p>
<p><strong>Department:</strong> ${escapeHtml(department)}</p>
<p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
<p style="white-space:pre-wrap">${escapeHtml(message)}</p>`,
      });
      emailed = true;
    } catch (err) {
      logger.error('Contact email send failed:', err);
    }

    // Auto-reply to the sender. Independent of the team notification; never fails the request.
    try {
      const reply = buildContactAutoReplyEmail({ name, subject });
      await resend.emails.send({
        from,
        to: email,
        replyTo: siteConfig.supportEmail,
        subject: reply.subject,
        html: reply.html,
      });
    } catch (autoReplyErr) {
      logger.error('Contact auto-reply email send failed:', autoReplyErr);
    }
  }

  if (!stored && !emailed) {
    return NextResponse.json(
      { error: 'Could not send your message. Please email us directly.' },
      { status: 500 },
    );
  }

  return NextResponse.json({ success: true });
}
