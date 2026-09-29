/**
 * Email provider abstraction.
 *
 * Every transactional email service (Resend, SendGrid, Postmark, etc.)
 * implements this interface so email logic is provider-agnostic.
 */

// ---------------------------------------------------------------------------
// Send options
// ---------------------------------------------------------------------------

export interface SendOptions {
  /** Recipient email address */
  to: string;
  /** Email subject line */
  subject: string;
  /** HTML body */
  html: string;
  /** Plain text fallback */
  text?: string;
  /** Sender address (defaults to provider config) */
  from?: string;
  /** Reply-to address */
  replyTo?: string;
}

export interface SendResult {
  /** Provider-assigned message ID */
  messageId: string;
}

// ---------------------------------------------------------------------------
// Template options
// ---------------------------------------------------------------------------

export interface SendTemplateOptions {
  /** Recipient email address */
  to: string;
  /** Template identifier */
  template: string;
  /** Data to interpolate into the template */
  data: Record<string, unknown>;
  /** Sender address override */
  from?: string;
}

// ---------------------------------------------------------------------------
// Provider interface
// ---------------------------------------------------------------------------

export interface EmailProvider {
  /** Human-readable provider name */
  name: string;

  /**
   * Send a raw email with explicit subject and HTML body.
   */
  send(options: SendOptions): Promise<SendResult>;

  /**
   * Send an email using a named template with dynamic data.
   *
   * The provider resolves the template name to the appropriate
   * subject line, HTML, and text content.
   */
  sendTemplate(options: SendTemplateOptions): Promise<SendResult>;
}
