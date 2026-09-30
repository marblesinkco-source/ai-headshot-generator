import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createAdminClient } from '@/lib/supabase/server';
import { Resend } from 'resend';
import { PACKAGES, type PackageId } from '@/config/packages';
import { getCategoryById, getPackageById, type CategoryId } from '@/config/categories';
import { siteConfig } from '@/config/site';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia' as Stripe.LatestApiVersion,
});

const resend = new Resend(process.env.RESEND_API_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature');

    if (!signature) {
      return NextResponse.json(
        { error: 'Missing stripe-signature header' },
        { status: 400 }
      );
    }

    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const { orderId, packageId, userId } = session.metadata || {};

        if (!orderId || !packageId || !userId) {
          console.error('Missing metadata in checkout session:', session.id);
          return NextResponse.json({ received: true }, { status: 200 });
        }

        // Check current order status for idempotency — skip if already paid
        const { data: existingOrder } = await supabase
          .from('orders')
          .select('status')
          .eq('id', orderId)
          .single();

        if (existingOrder?.status === 'paid' || existingOrder?.status === 'uploading' || existingOrder?.status === 'processing' || existingOrder?.status === 'completed') {
          // Already processed — don't update or send duplicate email
          return NextResponse.json({ received: true }, { status: 200 });
        }

        const { error: updateError } = await supabase
          .from('orders')
          .update({
            status: 'paid',
            stripe_session_id: session.id,
            stripe_payment_intent: session.payment_intent as string,
          })
          .eq('id', orderId)
          .eq('user_id', userId);

        if (updateError) {
          console.error('Failed to update order:', updateError);
          return NextResponse.json(
            { error: 'Failed to update order' },
            { status: 500 }
          );
        }

        const categoryId = (session.metadata?.categoryId || 'headshots') as CategoryId;
        const category = getCategoryById(categoryId);
        const catPkg = category ? getPackageById(categoryId, packageId) : null;
        const legacyPkg = PACKAGES[packageId as PackageId];
        const customerEmail = session.customer_email || session.customer_details?.email;

        const pkgName = catPkg?.name || legacyPkg?.name || packageId;
        const categoryName = category?.name || 'AI Photos';
        const outputLabel = category?.outputLabel || 'AI photos';
        const outputCount = catPkg?.outputCount || legacyPkg?.headshots || 0;
        const features = catPkg?.features || [];

        if (customerEmail) {
          try {
            await resend.emails.send({
              from: `${siteConfig.name} <noreply@${new URL(siteConfig.url).hostname}>`,
              to: customerEmail,
              subject: `Order confirmed — ${categoryName} ${pkgName} Package`,
              html: `
                <h2>Thank you for your purchase!</h2>
                <p>Your <strong>${categoryName} — ${pkgName}</strong> package has been confirmed.</p>
                <p>You can now upload your photos to start generating your ${outputLabel}.</p>
                <ul>
                  <li>${outputCount} ${outputLabel}</li>
                  ${features.map((f) => `<li>${f}</li>`).join('')}
                </ul>
                <p><a href="${siteConfig.url}/dashboard/upload?orderId=${orderId}">Upload your photos now</a></p>
              `,
            });
          } catch (emailError) {
            console.error('Failed to send confirmation email:', emailError);
            // Don't fail the webhook for email errors
          }
        }

        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        const orderId = paymentIntent.metadata?.orderId;

        if (orderId) {
          const { error: updateError } = await supabase
            .from('orders')
            .update({
              status: 'failed',
            })
            .eq('id', orderId);

          if (updateError) {
            console.error('Failed to update order status:', updateError);
          }
        }

        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error('Stripe webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}
