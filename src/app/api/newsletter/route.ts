import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createAdminClient } from '@/lib/supabase/server';
import { rateLimit, getClientIp } from '@/lib/rate-limit';
import { siteConfig } from '@/config/site';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const rl = rateLimit({
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

  // Store subscriber in Supabase (upsert to handle duplicates gracefully).
  let stored = false;
  try {
    const supabase = createAdminClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase as any)
      .from('newsletter_subscribers')
      .upsert(
        { email: normalizedEmail, subscribed_at: new Date().toISOString() },
        { onConflict: 'email', ignoreDuplicates: true },
      );
    if (error) {
      console.error('newsletter_subscribers upsert failed:', error.message);
    } else {
      stored = true;
    }
  } catch (err) {
    console.error('newsletter_subscribers upsert error:', err);
  }

  // Send welcome email via Resend.
  let emailed = false;
  if (process.env.RESEND_API_KEY) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const fromAddress = `${siteConfig.name} <${process.env.EMAIL_FROM || `noreply@${new URL(siteConfig.url).hostname}`}>`;

      await resend.emails.send({
        from: fromAddress,
        to: normalizedEmail,
        subject: `Welcome to ${siteConfig.name}!`,
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
              <h2 style="margin:0 0 16px;font-size:22px;color:#171613;font-weight:700;">You're in!</h2>
              <p style="margin:0 0 16px;font-size:15px;color:#171613;line-height:1.6;">
                Thanks for subscribing to the <strong>${siteConfig.name}</strong> newsletter. We'll keep you in the loop with tips, updates, and exclusive offers.
              </p>
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin:24px auto;">
                <tr>
                  <td style="background-color:#0B0B0B;border-radius:8px;">
                    <a href="${siteConfig.url}" style="display:inline-block;padding:14px 32px;color:#C9A98A;font-size:15px;font-weight:600;text-decoration:none;letter-spacing:0.3px;">
                      Visit ${siteConfig.name}
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
      emailed = true;
    } catch (err) {
      console.error('Newsletter welcome email send failed:', err);
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
