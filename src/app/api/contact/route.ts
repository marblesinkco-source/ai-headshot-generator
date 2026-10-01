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

      // Auto-reply to the person who submitted the form.
      try {
        await resend.emails.send({
          from: `${siteConfig.name} <${process.env.EMAIL_FROM || `noreply@${new URL(siteConfig.url).hostname}`}>`,
          to: email,
          subject: 'We received your message — TailorPic',
          html: `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" /><title>${siteConfig.name}</title></head>
<body style="margin:0;padding:0;background-color:#F8F5EF;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#F8F5EF;">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background-color:#FFFFFF;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.08);">
          <tr>
            <td style="background-color:#0B0B0B;padding:24px 32px;text-align:center;">
              <span style="color:#C9A98A;font-size:22px;font-weight:700;letter-spacing:0.5px;">${siteConfig.name}</span>
            </td>
          </tr>
          <tr>
            <td style="padding:32px;">
              <h2 style="margin:0 0 16px;font-size:22px;color:#171613;font-weight:700;">Thank you for reaching out!</h2>
              <p style="margin:0 0 16px;font-size:15px;color:#171613;line-height:1.6;">
                Hi ${escapeHtml(name)}, we've received your message and will get back to you within 24–48 hours.
              </p>
              <p style="margin:0 0 16px;font-size:15px;color:#5F5A54;line-height:1.6;">
                In the meantime, feel free to explore our site.
              </p>
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin:24px auto;">
                <tr>
                  <td style="background-color:#0B0B0B;border-radius:8px;">
                    <a href="${siteConfig.url}" style="display:inline-block;padding:14px 32px;color:#C9A98A;font-size:15px;font-weight:600;text-decoration:none;letter-spacing:0.3px;">
                      Visit TailorPic
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 32px;border-top:1px solid #DFD6CC;text-align:center;">
              <p style="margin:0;font-size:12px;color:#5F5A54;">&copy; ${new Date().getFullYear()} ${siteConfig.name}. All rights reserved.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`,
        });
      } catch (autoReplyErr) {
        console.error('Contact auto-reply email send failed:', autoReplyErr);
      }
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
