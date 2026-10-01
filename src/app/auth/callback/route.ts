import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { Resend } from 'resend';
import { siteConfig } from '@/config/site';
import { logger } from '@/lib/logger';

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const rawRedirect = searchParams.get('redirect');
  // Prevent open redirects: only allow same-origin relative paths
  const redirectTo =
    rawRedirect &&
    rawRedirect.startsWith('/') &&
    !rawRedirect.startsWith('//') &&
    !rawRedirect.includes('://') &&
    !rawRedirect.includes('\\')
      ? rawRedirect
      : '/dashboard/overview';

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      logger.warn('Auth callback: code exchange failed', { status: error.status, name: error.name });
    }

    if (!error) {
      // Send welcome email for new users (fire-and-forget)
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (user) {
          const createdAt = new Date(user.created_at);
          const isNewUser =
            Date.now() - createdAt.getTime() < 2 * 60 * 1000; // within 2 min

          if (isNewUser && resend && user.email) {
            const firstName =
              user.user_metadata?.full_name?.split(' ')[0] || '';
            resend.emails
              .send({
                from: `${siteConfig.name} <noreply@tailorpic.com>`,
                to: user.email,
                subject: `Welcome to ${siteConfig.name}!`,
                html: getWelcomeEmailHtml(firstName),
              })
              .catch((emailErr: unknown) => {
                logger.warn('Auth callback: welcome email failed', emailErr);
              });
          }
        }
      } catch (postAuthErr) {
        // never block auth callback for email, but record it
        logger.warn('Auth callback: post-login step failed', postAuthErr);
      }

      return NextResponse.redirect(new URL(redirectTo, origin));
    }
  }

  if (!code) logger.warn('Auth callback: missing code parameter');

  // If code exchange failed or no code, redirect to login with error
  return NextResponse.redirect(
    new URL('/auth/login?error=auth_failed', origin)
  );
}

function getWelcomeEmailHtml(firstName: string) {
  const greeting = firstName ? `Hi ${firstName},` : 'Welcome,';
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width"></head>
<body style="margin:0;padding:0;background:#F8F5EF;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F8F5EF;padding:40px 20px">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #DFD6CC">
        <!-- Header -->
        <tr><td style="background:#0B0B0B;padding:28px 32px;text-align:center">
          <span style="color:#C9A98A;font-size:22px;font-weight:600;letter-spacing:0.02em">${siteConfig.name}</span>
        </td></tr>
        <!-- Body -->
        <tr><td style="padding:32px 32px 24px">
          <h1 style="color:#171613;font-size:22px;margin:0 0 16px">${greeting}</h1>
          <p style="color:#5F5A54;font-size:15px;line-height:1.7;margin:0 0 16px">
            Welcome to ${siteConfig.name}! You are all set to create stunning AI-powered photos tailored just for you.
          </p>
          <p style="color:#5F5A54;font-size:15px;line-height:1.7;margin:0 0 24px">
            Here is how to get started:
          </p>
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px">
            <tr><td style="padding:10px 0;border-bottom:1px solid #DFD6CC">
              <strong style="color:#76563D">1.</strong>
              <span style="color:#171613;margin-left:8px">Choose a photo category</span>
            </td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #DFD6CC">
              <strong style="color:#76563D">2.</strong>
              <span style="color:#171613;margin-left:8px">Select your package and pay securely</span>
            </td></tr>
            <tr><td style="padding:10px 0">
              <strong style="color:#76563D">3.</strong>
              <span style="color:#171613;margin-left:8px">Upload your photos and get results in hours</span>
            </td></tr>
          </table>
          <a href="${siteConfig.url}/dashboard" style="display:inline-block;background:#0B0B0B;color:#C9A98A;padding:14px 28px;border-radius:12px;text-decoration:none;font-weight:600;font-size:14px">
            Go to Dashboard &rarr;
          </a>
        </td></tr>
        <!-- Footer -->
        <tr><td style="padding:20px 32px;background:#F8F5EF;border-top:1px solid #DFD6CC">
          <p style="color:#5F5A54;font-size:11px;margin:0;text-align:center">
            &copy; ${new Date().getFullYear()} ${siteConfig.name} &middot; ${siteConfig.tagline}
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}
