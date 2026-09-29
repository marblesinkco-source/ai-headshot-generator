/**
 * Stripe payment provider.
 *
 * Implements the PaymentProvider interface using Stripe Checkout Sessions
 * and webhooks for payment lifecycle management.
 */

import Stripe from "stripe";
import type {
  PaymentProvider,
  CheckoutSessionOptions,
  CheckoutSessionResult,
  WebhookEvent,
  PaymentStatus,
  PaymentState,
} from "../types";

// ---------------------------------------------------------------------------
// Provider implementation
// ---------------------------------------------------------------------------

export class StripeProvider implements PaymentProvider {
  public readonly name = "Stripe";
  private stripe: Stripe;
  private webhookSecret: string;

  constructor(secretKey?: string, webhookSecret?: string) {
    this.stripe = new Stripe(secretKey ?? process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2024-12-18.acacia",
      typescript: true,
    });
    this.webhookSecret =
      webhookSecret ?? process.env.STRIPE_WEBHOOK_SECRET!;
  }

  /**
   * Create a Stripe Checkout Session.
   *
   * Embeds our orderId, userId, and packageId in the session metadata
   * so we can correlate the payment back to our order in webhooks.
   */
  async createCheckoutSession(
    options: CheckoutSessionOptions,
  ): Promise<CheckoutSessionResult> {
    const session = await this.stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: options.customerEmail,
      line_items: [
        {
          price_data: {
            currency: options.currency,
            unit_amount: options.amount,
            product_data: {
              name: options.packageName,
              description: `${options.headshotCount} AI-generated professional headshots`,
              metadata: {
                package_id: options.packageId,
              },
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        order_id: options.orderId,
        user_id: options.userId,
        package_id: options.packageId,
        headshot_count: String(options.headshotCount),
      },
      success_url: options.successUrl,
      cancel_url: options.cancelUrl,
    });

    if (!session.url) {
      throw new Error("Stripe did not return a checkout URL");
    }

    return {
      sessionId: session.id,
      checkoutUrl: session.url,
    };
  }

  /**
   * Verify and parse a Stripe webhook event.
   *
   * Handles:
   * - checkout.session.completed  -> triggers order processing
   * - payment_intent.succeeded    -> confirms payment
   * - payment_intent.payment_failed -> marks order as failed
   */
  async handleWebhook(
    body: string | Buffer,
    signature: string,
  ): Promise<WebhookEvent | null> {
    const event = this.stripe.webhooks.constructEvent(
      body,
      signature,
      this.webhookSecret,
    );

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        return {
          type: "checkout.completed",
          orderId: session.metadata?.order_id ?? "",
          paymentId: (session.payment_intent as string) ?? "",
          sessionId: session.id,
          customerEmail: session.customer_email ?? undefined,
          amount: session.amount_total ?? 0,
          currency: session.currency ?? "usd",
          raw: event,
        };
      }

      case "payment_intent.succeeded": {
        const intent = event.data.object as Stripe.PaymentIntent;
        return {
          type: "payment.succeeded",
          orderId: intent.metadata?.order_id ?? "",
          paymentId: intent.id,
          sessionId: "", // Not available directly from payment_intent
          customerEmail: intent.receipt_email ?? undefined,
          amount: intent.amount,
          currency: intent.currency,
          raw: event,
        };
      }

      case "payment_intent.payment_failed": {
        const intent = event.data.object as Stripe.PaymentIntent;
        return {
          type: "payment.failed",
          orderId: intent.metadata?.order_id ?? "",
          paymentId: intent.id,
          sessionId: "",
          customerEmail: intent.receipt_email ?? undefined,
          amount: intent.amount,
          currency: intent.currency,
          raw: event,
        };
      }

      default:
        // Unhandled event type -- safe to ignore
        return null;
    }
  }

  /**
   * Look up the payment status of a Checkout Session.
   */
  async getPaymentStatus(sessionId: string): Promise<PaymentStatus> {
    const session = await this.stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["payment_intent"],
    });

    const intent = session.payment_intent as Stripe.PaymentIntent | null;

    let state: PaymentState = "pending";
    if (intent) {
      state = mapIntentStatus(intent.status);
    } else if (session.payment_status === "paid") {
      state = "succeeded";
    }

    return {
      state,
      paymentId: intent?.id ?? "",
      amount: session.amount_total ?? 0,
      currency: session.currency ?? "usd",
    };
  }
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function mapIntentStatus(status: Stripe.PaymentIntent.Status): PaymentState {
  switch (status) {
    case "succeeded":
      return "succeeded";
    case "processing":
      return "processing";
    case "requires_payment_method":
    case "requires_confirmation":
    case "requires_action":
    case "requires_capture":
      return "pending";
    case "canceled":
      return "failed";
    default:
      return "pending";
  }
}
