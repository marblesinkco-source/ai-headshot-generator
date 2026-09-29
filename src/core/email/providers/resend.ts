/**
 * Resend email provider.
 *
 * Implements the EmailProvider interface using the Resend transactional
 * email API. Includes built-in templates for the headshot generation
 * lifecycle.
 */

import { Resend } from "resend";
import type {
  EmailProvider,
  SendOptions,
  SendResult,
  SendTemplateOptions,
} from "../types";

// ---------------------------------------------------------------------------
// Email templates
// ---------------------------------------------------------------------------

interface TemplateDefinition {
  subject: (data: Record<string, unknown>) => string;
  html: (data: Record<string, unknown>) => string;
  text: (data: Record<string, unknown>) => string;
}

const TEMPLATES: Record<string, TemplateDefinition> = {
  "order-confirmation": {
    subject: () => "Your headshot order has been received!",
    html: (data) => `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #1a1a1a;">Order Confirmed</h1>
        <p>Hi ${data.name},</p>
        <p>Thank you for your order! We've received your payment and you're all set.</p>
        <div style="background: #f5f5f5; padding: 16px; border-radius: 8px; margin: 24px 0;">
          <p style="margin: 0;"><strong>Order ID:</strong> ${data.orderId}</p>
          <p style="margin: 8px 0 0;"><strong>Package:</strong> ${data.packageName}</p>
          <p style="margin: 8px 0 0;"><strong>Headshots:</strong> ${data.headshotCount}</p>
        </div>
        <p><strong>Next step:</strong> Upload your photos so we can start generating your headshots.</p>
        <a href="${data.uploadUrl}" style="display: inline-block; background: #2563eb; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; margin-top: 16px;">
          Upload Photos
        </a>
      </div>
    `,
    text: (data) =>
      `Hi ${data.name},\n\nYour order (${data.orderId}) has been confirmed! Package: ${data.packageName} (${data.headshotCount} headshots).\n\nNext step: Upload your photos at ${data.uploadUrl}`,
  },

  "upload-reminder": {
    subject: () => "Don't forget to upload your photos!",
    html: (data) => `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #1a1a1a;">Your Headshots Are Waiting</h1>
        <p>Hi ${data.name},</p>
        <p>You haven't uploaded your photos yet for order <strong>${data.orderId}</strong>.</p>
        <p>Upload 5-10 clear photos of yourself and we'll generate your professional headshots in minutes.</p>
        <a href="${data.uploadUrl}" style="display: inline-block; background: #2563eb; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; margin-top: 16px;">
          Upload Now
        </a>
        <p style="color: #666; font-size: 14px; margin-top: 24px;">
          Need help? Reply to this email and we'll assist you.
        </p>
      </div>
    `,
    text: (data) =>
      `Hi ${data.name},\n\nYou haven't uploaded your photos yet for order ${data.orderId}. Upload them at ${data.uploadUrl} to get started!`,
  },

  "headshots-ready": {
    subject: (data) =>
      `Your ${data.headshotCount} headshots are ready!`,
    html: (data) => `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #1a1a1a;">Your Headshots Are Ready!</h1>
        <p>Hi ${data.name},</p>
        <p>Great news! We've finished generating <strong>${data.headshotCount} professional headshots</strong> for you.</p>
        <p>Head to your dashboard to view, download, and share them.</p>
        <a href="${data.dashboardUrl}" style="display: inline-block; background: #2563eb; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; margin-top: 16px;">
          View Your Headshots
        </a>
        <p style="color: #666; font-size: 14px; margin-top: 24px;">
          Love your headshots? Share the love and tell a friend!
        </p>
      </div>
    `,
    text: (data) =>
      `Hi ${data.name},\n\nYour ${data.headshotCount} headshots are ready! View them at ${data.dashboardUrl}`,
  },

  "order-failed": {
    subject: () => "Issue with your headshot order",
    html: (data) => `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #1a1a1a;">We Hit a Snag</h1>
        <p>Hi ${data.name},</p>
        <p>Unfortunately, we encountered an issue processing your headshot order <strong>${data.orderId}</strong>.</p>
        <p>Our team has been notified and we'll look into it right away. You don't need to do anything -- we'll reach out with an update soon.</p>
        <p style="color: #666; font-size: 14px; margin-top: 24px;">
          If you have questions, just reply to this email.
        </p>
      </div>
    `,
    text: (data) =>
      `Hi ${data.name},\n\nWe hit a snag with your order ${data.orderId}. Our team has been notified and we'll follow up shortly.`,
  },
};

// ---------------------------------------------------------------------------
// Provider implementation
// ---------------------------------------------------------------------------

export class ResendProvider implements EmailProvider {
  public readonly name = "Resend";
  private client: Resend;
  private fromAddress: string;

  constructor(apiKey?: string, fromAddress?: string) {
    this.client = new Resend(apiKey ?? process.env.RESEND_API_KEY!);
    this.fromAddress =
      fromAddress ??
      process.env.EMAIL_FROM ??
      "AI Headshots <noreply@aiheadshots.com>";
  }

  async send(options: SendOptions): Promise<SendResult> {
    const { data, error } = await this.client.emails.send({
      from: options.from ?? this.fromAddress,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
      reply_to: options.replyTo,
    });

    if (error || !data) {
      throw new Error(`Failed to send email: ${error?.message ?? "Unknown error"}`);
    }

    return { messageId: data.id };
  }

  async sendTemplate(options: SendTemplateOptions): Promise<SendResult> {
    const template = TEMPLATES[options.template];

    if (!template) {
      throw new Error(
        `Unknown email template "${options.template}". Available: ${Object.keys(TEMPLATES).join(", ")}`,
      );
    }

    return this.send({
      to: options.to,
      from: options.from,
      subject: template.subject(options.data),
      html: template.html(options.data),
      text: template.text(options.data),
    });
  }
}
