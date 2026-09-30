/**
 * TailorPic — Email Templates
 * Branded HTML email templates for transactional emails
 */

import { siteConfig } from '@/config/site';
import { formatPrice } from '@/lib/utils';

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
