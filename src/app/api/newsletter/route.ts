import { NextResponse } from 'next/server';
import { rateLimit, getClientIp } from '@/lib/rate-limit';

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

  // TODO: Connect to an email service (Resend audiences / Mailchimp) to store the
  // subscriber and send the welcome email. Until then this is a placeholder.
  return NextResponse.json({ success: true });
}
