import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createAdminClient } from '@/lib/supabase/server';
import { rateLimit, getClientIp } from '@/lib/rate-limit';
import { siteConfig } from '@/config/site';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const HOUR_MS = 60 * 60 * 1000;

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const rl = rateLimit({ key: `contact:${ip}`, limit: 3, windowMs: HOUR_MS });
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase as any)
      .from('contact_messages')
      .insert({ name, email, subject, message });
    if (error) {
      console.error('contact_messages insert failed:', error.message);
    } else {
      stored = true;
    }
  } catch (err) {
    console.error('contact_messages insert error:', err);
  }

  // Email notification via Resend.
  if (process.env.RESEND_API_KEY) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: `${siteConfig.name} <${process.env.EMAIL_FROM || `noreply@${new URL(siteConfig.url).hostname}`}>`,
        to: siteConfig.supportEmail,
        replyTo: email,
        subject: `[Contact] ${subject}`,
        html: `<p><strong>From:</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p>
<p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
<p style="white-space:pre-wrap">${escapeHtml(message)}</p>`,
      });
      emailed = true;
    } catch (err) {
      console.error('Contact email send failed:', err);
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
