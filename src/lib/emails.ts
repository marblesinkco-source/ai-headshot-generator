/**
 * TailorPic — Email Templates
 * Branded HTML email templates for transactional emails
 */

import { createHmac, timingSafeEqual } from 'crypto';
import { siteConfig } from '@/config/site';
import { escapeHtml, formatPrice } from '@/lib/utils';

const BRAND = {
  black: '#0B0B0B',
  ink: '#171613',
  bronze: '#C9A98A',
  bronzeInk: '#76563D',
  paper: '#F8F5EF',
  beige: '#DCCDBB',
  muted: '#5F5A54',
  line: '#DFD6CC',
  white: '#FFFFFF',
};

// ─── Unsubscribe helpers ──────────────────────────────────────────────

function unsubscribeSecret(): string {
  return (
    process.env.RESEND_API_KEY ||
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    'tailorpic-unsubscribe-dev-secret'
  );
}

export function signUnsubscribeEmail(email: string): string {
  return createHmac('sha256', unsubscribeSecret())
    .update(email.trim().toLowerCase())
    .digest('hex');
}

export function verifyUnsubscribeToken(email: string, token: string): boolean {
  const expected = Buffer.from(signUnsubscribeEmail(email));
  const given = Buffer.from(token);
  return expected.length === given.length && timingSafeEqual(expected, given);
}

/** Builds the one-click unsubscribe URL (HMAC-signed) for use in email footers. */
export function buildUnsubscribeUrl(email: string): string {
  const normalized = email.trim().toLowerCase();
  const params = new URLSearchParams({
    email: normalized,
    token: signUnsubscribeEmail(normalized),
  });
  return `${siteConfig.url}/api/newsletter/unsubscribe?${params.toString()}`;
}

function emailWrapper(content: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${siteConfig.name}</title>
</head>
<body style="margin:0;padding:0;background-color:${BRAND.paper};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${BRAND.paper};">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background-color:${BRAND.white};border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.08);">
          <!-- Header -->
          <tr>
            <td style="background-color:${BRAND.black};padding:24px 32px;text-align:center;">
              <span style="color:${BRAND.bronze};font-size:22px;font-weight:700;letter-spacing:0.5px;">${siteConfig.name}</span>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:32px;">
              ${content}
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding:24px 32px;border-top:1px solid ${BRAND.line};text-align:center;">
              <p style="margin:0;font-size:12px;color:${BRAND.muted};">
                &copy; ${new Date().getFullYear()} ${siteConfig.name}. All rights reserved.
              </p>
              <p style="margin:8px 0 0;font-size:12px;color:${BRAND.muted};">
                <a href="${siteConfig.url}/privacy" style="color:${BRAND.muted};text-decoration:underline;">Privacy</a>
                &nbsp;&middot;&nbsp;
                <a href="${siteConfig.url}/terms" style="color:${BRAND.muted};text-decoration:underline;">Terms</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function ctaButton(text: string, href: string): string {
  return `
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin:24px auto;">
      <tr>
        <td style="background-color:${BRAND.black};border-radius:8px;">
          <a href="${href}" style="display:inline-block;padding:14px 32px;color:${BRAND.bronze};font-size:15px;font-weight:600;text-decoration:none;letter-spacing:0.3px;">
            ${text}
          </a>
        </td>
      </tr>
    </table>`;
}

// ─── Upgrade Email (48h after Express purchase) ───────────────────────

interface UpgradeEmailParams {
  customerName?: string;
  categoryName: string;
  expressPackageName: string;
  recommendedPackageName: string;
  recommendedPrice: number;     // cents
  expressPrice: number;         // cents
  outputCount: number;
  discountPercent: number;       // e.g. 25
  upgradeUrl: string;
  couponCode: string;
}

export function buildUpgradeEmail(params: UpgradeEmailParams) {
  const {
    customerName,
    categoryName,
    expressPackageName,
    recommendedPackageName,
    recommendedPrice,
    expressPrice,
    outputCount,
    discountPercent,
    upgradeUrl,
    couponCode,
  } = params;

  const discountedPrice = Math.round(recommendedPrice * (1 - discountPercent / 100));
  const savings = recommendedPrice - discountedPrice;
  const greeting = customerName ? `Hi ${customerName},` : 'Hi there,';

  const subject = `Your ${categoryName} results are ready — unlock more with ${discountPercent}% off`;

  const html = emailWrapper(`
    <h2 style="margin:0 0 8px;font-size:22px;color:${BRAND.ink};font-weight:700;">
      Love your ${categoryName.toLowerCase()} results?
    </h2>
    <p style="margin:0 0 20px;font-size:15px;color:${BRAND.muted};line-height:1.6;">
      ${greeting}
    </p>
    <p style="margin:0 0 16px;font-size:15px;color:${BRAND.ink};line-height:1.6;">
      Your <strong>${expressPackageName}</strong> photos are looking great! Now imagine what you could do with our full
      <strong>${recommendedPackageName}</strong> package — <strong>${outputCount}+ photos</strong>, more styles,
      and more backgrounds to choose from.
    </p>

    <!-- Upgrade offer box -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:20px 0;background-color:${BRAND.paper};border-radius:10px;border:1px solid ${BRAND.line};">
      <tr>
        <td style="padding:20px 24px;">
          <p style="margin:0 0 4px;font-size:13px;font-weight:600;color:${BRAND.bronzeInk};text-transform:uppercase;letter-spacing:1px;">
            Exclusive Upgrade Offer
          </p>
          <p style="margin:0 0 12px;font-size:24px;font-weight:800;color:${BRAND.ink};">
            <span style="text-decoration:line-through;color:${BRAND.muted};font-size:18px;">${formatPrice(recommendedPrice)}</span>
            &nbsp;${formatPrice(discountedPrice)}
          </p>
          <p style="margin:0;font-size:14px;color:${BRAND.muted};">
            Save ${formatPrice(savings)} with code <strong style="color:${BRAND.bronzeInk};">${couponCode}</strong>
          </p>
        </td>
      </tr>
    </table>

    ${ctaButton(`Upgrade to ${recommendedPackageName} →`, upgradeUrl)}

    <p style="margin:16px 0 0;font-size:13px;color:${BRAND.muted};text-align:center;line-height:1.5;">
      This offer expires in 48 hours. Your Express payment (${formatPrice(expressPrice)})
      will be deducted from the upgrade price.
    </p>
  `);

  return { subject, html };
}

// ─── Order Confirmation Email ─────────────────────────────────────────

interface OrderConfirmationParams {
  categoryName: string;
  packageName: string;
  outputCount: number;
  outputLabel: string;
  features: string[];
  orderId: string;
}

export function buildOrderConfirmationEmail(params: OrderConfirmationParams) {
  const { categoryName, packageName, outputCount, outputLabel, features, orderId } = params;

  const subject = `Order confirmed — ${categoryName} ${packageName} Package`;
  const uploadUrl = `${siteConfig.url}/dashboard/upload?orderId=${orderId}`;

  const html = emailWrapper(`
    <h2 style="margin:0 0 16px;font-size:22px;color:${BRAND.ink};font-weight:700;">
      Thank you for your purchase!
    </h2>
    <p style="margin:0 0 16px;font-size:15px;color:${BRAND.ink};line-height:1.6;">
      Your <strong>${categoryName} — ${packageName}</strong> package has been confirmed.
      You can now upload your photos to start generating your ${outputLabel}.
    </p>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:16px 0;background-color:${BRAND.paper};border-radius:10px;padding:16px 20px;">
      <tr>
        <td style="padding:16px 20px;">
          <p style="margin:0 0 8px;font-size:14px;color:${BRAND.ink};">
            <strong>${outputCount} ${outputLabel}</strong>
          </p>
          ${features.map((f) => `
          <p style="margin:4px 0;font-size:13px;color:${BRAND.muted};">
            ✓ ${f}
          </p>`).join('')}
        </td>
      </tr>
    </table>

    ${ctaButton('Upload Your Photos', uploadUrl)}
  `);

  return { subject, html };
}

// ─── Payment Failed Email ─────────────────────────────────────────────

interface PaymentFailedParams {
  customerName?: string;
  orderId: string;
  categoryName: string;
  amount: number;       // cents
  currency?: string;    // defaults to usd
}

export function buildPaymentFailedEmail(params: PaymentFailedParams) {
  const { customerName, orderId, categoryName, amount, currency } = params;
  const greeting = customerName ? `Hi ${customerName},` : 'Hi there,';
  const retryUrl = `${siteConfig.url}/dashboard/orders/${orderId}`;

  const subject = `Your ${categoryName} payment didn't go through`;

  const html = emailWrapper(`
    <h2 style="margin:0 0 16px;font-size:22px;color:${BRAND.ink};font-weight:700;">
      We couldn't process your payment
    </h2>
    <p style="margin:0 0 16px;font-size:15px;color:${BRAND.muted};line-height:1.6;">
      ${greeting}
    </p>
    <p style="margin:0 0 16px;font-size:15px;color:${BRAND.ink};line-height:1.6;">
      Your payment of <strong>${formatPrice(amount, currency)}</strong> for your
      <strong>${categoryName}</strong> order was not completed, and you haven't been charged.
      This can happen because of an expired card, insufficient funds, or a bank security check.
    </p>
    <p style="margin:0 0 8px;font-size:15px;color:${BRAND.ink};line-height:1.6;">
      Your order is waiting — you can try again with the same or a different payment method.
    </p>

    ${ctaButton('Try Again', retryUrl)}

    <p style="margin:16px 0 0;font-size:13px;color:${BRAND.muted};text-align:center;line-height:1.5;">
      Need help? Contact us at
      <a href="mailto:${siteConfig.supportEmail}" style="color:${BRAND.bronzeInk};">${siteConfig.supportEmail}</a>
    </p>
  `);

  return { subject, html };
}

// ─── Abandoned Checkout Email ─────────────────────────────────────────

interface AbandonedCheckoutParams {
  customerName?: string;
  categoryName: string;
  packageName: string;
  checkoutUrl: string;
}

export function buildAbandonedCheckoutEmail(params: AbandonedCheckoutParams) {
  const { customerName, categoryName, packageName, checkoutUrl } = params;
  const greeting = customerName ? `Hi ${customerName},` : 'Hi there,';

  const subject = `Your ${categoryName} order is waiting`;

  const html = emailWrapper(`
    <h2 style="margin:0 0 16px;font-size:22px;color:${BRAND.ink};font-weight:700;">
      You left something behind
    </h2>
    <p style="margin:0 0 16px;font-size:15px;color:${BRAND.muted};line-height:1.6;">
      ${greeting}
    </p>
    <p style="margin:0 0 16px;font-size:15px;color:${BRAND.ink};line-height:1.6;">
      You started an order for the <strong>${categoryName} — ${packageName}</strong> package
      but didn't finish checking out. Pick up right where you left off.
    </p>

    ${ctaButton('Complete Your Order', checkoutUrl)}

    <p style="margin:16px 0 0;font-size:13px;color:${BRAND.muted};text-align:center;line-height:1.5;">
      Questions before you buy? Reach us at
      <a href="mailto:${siteConfig.supportEmail}" style="color:${BRAND.bronzeInk};">${siteConfig.supportEmail}</a>
    </p>
  `);

  return { subject, html };
}

// ─── Refund Confirmation Email ────────────────────────────────────────

interface RefundConfirmationParams {
  customerName?: string;
  orderId: string;
  amount: number;       // cents (amount refunded)
  categoryName: string;
  currency?: string;    // defaults to usd
}

export function buildRefundConfirmationEmail(params: RefundConfirmationParams) {
  const { customerName, orderId, amount, categoryName, currency } = params;
  const greeting = customerName ? `Hi ${customerName},` : 'Hi there,';

  const subject = `Refund confirmed — ${categoryName} order`;

  const html = emailWrapper(`
    <h2 style="margin:0 0 16px;font-size:22px;color:${BRAND.ink};font-weight:700;">
      Your refund has been issued
    </h2>
    <p style="margin:0 0 16px;font-size:15px;color:${BRAND.muted};line-height:1.6;">
      ${greeting}
    </p>
    <p style="margin:0 0 16px;font-size:15px;color:${BRAND.ink};line-height:1.6;">
      We've refunded <strong>${formatPrice(amount, currency)}</strong> for your
      <strong>${categoryName}</strong> order.
    </p>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:16px 0;background-color:${BRAND.paper};border-radius:10px;">
      <tr>
        <td style="padding:16px 20px;">
          <p style="margin:0 0 4px;font-size:13px;color:${BRAND.muted};">Order</p>
          <p style="margin:0 0 12px;font-size:14px;color:${BRAND.ink};font-weight:600;">${orderId}</p>
          <p style="margin:0 0 4px;font-size:13px;color:${BRAND.muted};">Refunded amount</p>
          <p style="margin:0;font-size:14px;color:${BRAND.ink};font-weight:600;">${formatPrice(amount, currency)}</p>
        </td>
      </tr>
    </table>

    <p style="margin:0;font-size:14px;color:${BRAND.muted};line-height:1.6;">
      Depending on your bank, it may take 5–10 business days for the funds to appear on your statement.
      If you have questions, contact us at
      <a href="mailto:${siteConfig.supportEmail}" style="color:${BRAND.bronzeInk};">${siteConfig.supportEmail}</a>.
    </p>
  `);

  return { subject, html };
}

// ─── Account Deletion Email ───────────────────────────────────────────

interface AccountDeletionParams {
  customerName?: string;
}

export function buildAccountDeletionEmail(params: AccountDeletionParams = {}) {
  const { customerName } = params;
  const greeting = customerName ? `Hi ${customerName},` : 'Hi there,';

  const subject = `Your ${siteConfig.name} account has been deleted`;

  const html = emailWrapper(`
    <h2 style="margin:0 0 16px;font-size:22px;color:${BRAND.ink};font-weight:700;">
      Your account has been deleted
    </h2>
    <p style="margin:0 0 16px;font-size:15px;color:${BRAND.muted};line-height:1.6;">
      ${greeting}
    </p>
    <p style="margin:0 0 16px;font-size:15px;color:${BRAND.ink};line-height:1.6;">
      This confirms that your ${siteConfig.name} account and the data associated with it have been deleted
      at your request.
    </p>
    <p style="margin:0 0 16px;font-size:15px;color:${BRAND.ink};line-height:1.6;">
      If you didn't request this, please contact us right away at
      <a href="mailto:${siteConfig.supportEmail}" style="color:${BRAND.bronzeInk};">${siteConfig.supportEmail}</a>.
    </p>
    <p style="margin:0;font-size:14px;color:${BRAND.muted};line-height:1.6;">
      You're always welcome to come back and create a new account.
    </p>
  `);

  return { subject, html };
}

// ─── Newsletter Welcome Email ────────────────────────────────────────

export function buildNewsletterWelcomeEmail() {
  const subject = `Welcome to ${siteConfig.name}!`;

  const html = emailWrapper(`
    <h2 style="margin:0 0 16px;font-size:22px;color:${BRAND.ink};font-weight:700;">
      You're in!
    </h2>
    <p style="margin:0 0 16px;font-size:15px;color:${BRAND.ink};line-height:1.6;">
      Thanks for subscribing to the <strong>${siteConfig.name}</strong> newsletter.
      We'll keep you in the loop with tips, updates, and exclusive offers.
    </p>

    ${ctaButton(`Visit ${siteConfig.name}`, siteConfig.url)}
  `);

  return { subject, html };
}

// ─── Contact Form Auto-Reply Email ────────────────────────────────────

interface ContactAutoReplyParams {
  name: string;
  subject: string;
}

export function buildContactAutoReplyEmail(params: ContactAutoReplyParams) {
  const name = escapeHtml(params.name);
  const topic = escapeHtml(params.subject);

  const subject = `We received your message — ${siteConfig.name}`;

  const html = emailWrapper(`
    <h2 style="margin:0 0 16px;font-size:22px;color:${BRAND.ink};font-weight:700;">
      Thank you for reaching out!
    </h2>
    <p style="margin:0 0 16px;font-size:15px;color:${BRAND.ink};line-height:1.6;">
      Hi ${name}, we've received your message about <strong>${topic}</strong>.
      Our team will review it and respond within 24–48 hours.
    </p>
    <p style="margin:0 0 16px;font-size:15px;color:${BRAND.muted};line-height:1.6;">
      There's no need to send it again. If you'd like to add anything, just reply to this email
      or write to
      <a href="mailto:${siteConfig.supportEmail}" style="color:${BRAND.bronzeInk};">${siteConfig.supportEmail}</a>.
    </p>

    ${ctaButton(`Visit ${siteConfig.name}`, siteConfig.url)}
  `);

  return { subject, html };
}

// ─── Photos Ready Email (AI generation completed) ─────────────────────

interface PhotosReadyParams {
  orderId: string;
  count: number;
}

export function buildPhotosReadyEmail(params: PhotosReadyParams) {
  const { orderId, count } = params;
  const ordersUrl = `${siteConfig.url}/dashboard/orders/${orderId}`;

  const subject = `Your ${count} AI photos are ready!`;

  const html = emailWrapper(`
    <h2 style="margin:0 0 16px;font-size:22px;color:${BRAND.ink};font-weight:700;">
      Your photos are ready! 🎉
    </h2>
    <p style="margin:0 0 16px;font-size:15px;color:${BRAND.ink};line-height:1.6;">
      We've finished generating <strong>${count}</strong> photos for you using our AI model trained specifically on your images.
    </p>

    ${ctaButton('View Your Photos', ordersUrl)}

    <p style="margin:16px 0 0;font-size:13px;color:${BRAND.muted};text-align:center;line-height:1.5;">
      You can download them individually or as a ZIP file from your dashboard.
    </p>
  `);

  return { subject, html };
}

// ─── Generation Failed Email (AI training/generation failed) ──────────

interface GenerationFailedParams {
  errorMessage: string;
}

export function buildGenerationFailedEmail(params: GenerationFailedParams) {
  const { errorMessage } = params;

  const subject = 'Issue with your AI photo generation';

  const html = emailWrapper(`
    <h2 style="margin:0 0 16px;font-size:22px;color:${BRAND.ink};font-weight:700;">
      We ran into an issue
    </h2>
    <p style="margin:0 0 16px;font-size:15px;color:${BRAND.ink};line-height:1.6;">
      Unfortunately, there was a problem generating your AI photos. Our team has been notified and we'll look into it.
    </p>
    <p style="margin:0 0 16px;font-size:13px;color:${BRAND.muted};line-height:1.5;">
      Error: ${escapeHtml(errorMessage)}
    </p>
    <p style="margin:0;font-size:14px;color:${BRAND.muted};line-height:1.6;">
      If you need help, please contact us at
      <a href="mailto:${siteConfig.supportEmail}" style="color:${BRAND.bronzeInk};">${siteConfig.supportEmail}</a>
    </p>
  `);

  return { subject, html };
}
