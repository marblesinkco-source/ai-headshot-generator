/**
 * Payment provider abstraction.
 *
 * Every payment gateway (Stripe, Lemon Squeezy, Paddle, etc.) implements
 * this interface so billing logic stays gateway-agnostic.
 */

// ---------------------------------------------------------------------------
// Checkout types
// ---------------------------------------------------------------------------

export interface CheckoutSessionOptions {
  /** Internal order ID (nanoid) to correlate with our database */
  orderId: string;
  /** ID of the user making the purchase */
  userId: string;
  /** Package being purchased */
  packageId: string;
  /** Amount in smallest currency unit (e.g. cents) */
  amount: number;
  /** ISO 4217 currency code */
  currency: string;
  /** Human-readable package name shown at checkout */
  packageName: string;
  /** Number of headshots included in this package */
  headshotCount: number;
  /** Customer email for receipts */
  customerEmail?: string;
  /** URL to redirect to after successful payment */
  successUrl: string;
  /** URL to redirect to if the customer cancels */
  cancelUrl: string;
}

export interface CheckoutSessionResult {
  /** Provider's session/checkout ID */
  sessionId: string;
  /** URL to redirect the user to for payment */
  checkoutUrl: string;
}

// ---------------------------------------------------------------------------
// Webhook types
// ---------------------------------------------------------------------------

export interface WebhookEvent {
  /** Normalized event type */
  type: "checkout.completed" | "payment.succeeded" | "payment.failed";
  /** Our internal order ID (from metadata) */
  orderId: string;
  /** Provider's payment intent or transaction ID */
  paymentId: string;
  /** Provider's checkout session ID */
  sessionId: string;
  /** Customer email from the payment */
  customerEmail?: string;
  /** Amount paid in smallest currency unit */
  amount: number;
  /** ISO 4217 currency code */
  currency: string;
  /** Full raw event for logging/debugging */
  raw: unknown;
}

// ---------------------------------------------------------------------------
// Payment status
// ---------------------------------------------------------------------------

export type PaymentState =
  | "pending"
  | "processing"
  | "succeeded"
  | "failed"
  | "refunded";

export interface PaymentStatus {
  state: PaymentState;
  paymentId: string;
  amount: number;
  currency: string;
}

// ---------------------------------------------------------------------------
// Provider interface
// ---------------------------------------------------------------------------

export interface PaymentProvider {
  /** Human-readable provider name */
  name: string;

  /**
   * Create a checkout session and return the URL to redirect the user to.
   */
  createCheckoutSession(
    options: CheckoutSessionOptions,
  ): Promise<CheckoutSessionResult>;

  /**
   * Parse and verify an incoming webhook payload.
   *
   * @param body - Raw request body (string or Buffer)
   * @param signature - Webhook signature header value
   * @returns Normalized webhook event, or null if the event type is unhandled
   */
  handleWebhook(
    body: string | Buffer,
    signature: string,
  ): Promise<WebhookEvent | null>;

  /**
   * Look up the current status of a payment by its provider session ID.
   */
  getPaymentStatus(sessionId: string): Promise<PaymentStatus>;
}
