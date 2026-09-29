import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';
import { Resend } from 'resend';
import { siteConfig } from '@/config/site';

const resend = new Resend(process.env.RESEND_API_KEY);

const replicateWebhookSchema = z.object({
  id: z.string(),
  status: z.enum(['starting', 'processing', 'succeeded', 'failed', 'canceled']),
  output: z.union([z.array(z.string()), z.string(), z.null()]).optional(),
  error: z.string().nullable().optional(),
});

export async function POST(request: NextRequest) {
  try {
    // Optionally verify Replicate webhook signature
    const webhookSecret = process.env.REPLICATE_WEBHOOK_SECRET;
    if (webhookSecret) {
      const signature = request.headers.get('webhook-signature');
      if (!signature) {
        return NextResponse.json(
          { error: 'Missing webhook signature' },
          { status: 401 }
        );
      }
      // In production, verify HMAC signature here
    }

    const body = await request.json();
    const parsed = replicateWebhookSchema.safeParse(body);

    if (!parsed.success) {
      console.error('Invalid webhook payload:', parsed.error.flatten());
      return NextResponse.json(
        { error: 'Invalid payload' },
        { status: 400 }
      );
    }

    const { id: predictionId, status, output, error: predictionError } = parsed.data;

    const supabase = await createClient();

    // Look up the generation record
    const { data: headshot, error: lookupError } = await supabase
      .from('generated_headshots')
      .select('id, order_id, user_id')
      .eq('prediction_id', predictionId)
      .single();

    if (lookupError || !headshot) {
      console.error('Headshot not found for prediction:', predictionId);
      return NextResponse.json({ received: true }, { status: 200 });
    }

    if (status === 'succeeded') {
      // Get the output URL(s)
      const outputUrl = Array.isArray(output) ? output[0] : output;

      if (!outputUrl) {
        console.error('No output URL for prediction:', predictionId);
        await supabase
          .from('generated_headshots')
          .update({ status: 'failed', error: 'No output generated' })
          .eq('id', headshot.id);
      } else {
        // Download the generated image and upload to our storage
        const response = await fetch(outputUrl);
        const imageBuffer = Buffer.from(await response.arrayBuffer());
        const storagePath = `${headshot.user_id}/${headshot.order_id}/generated/${headshot.id}.png`;

        const { error: uploadError } = await supabase.storage
          .from('headshots')
          .upload(storagePath, imageBuffer, {
            contentType: 'image/png',
            upsert: true,
          });

        if (uploadError) {
          console.error('Failed to upload generated headshot:', uploadError);
          await supabase
            .from('generated_headshots')
            .update({ status: 'failed', error: 'Storage upload failed' })
            .eq('id', headshot.id);
        } else {
          await supabase
            .from('generated_headshots')
            .update({
              status: 'completed',
              storage_path: storagePath,
              completed_at: new Date().toISOString(),
            })
            .eq('id', headshot.id);
        }
      }
    } else if (status === 'failed' || status === 'canceled') {
      await supabase
        .from('generated_headshots')
        .update({
          status: 'failed',
          error: predictionError || `Prediction ${status}`,
        })
        .eq('id', headshot.id);
    } else {
      // Still processing, just acknowledge
      return NextResponse.json({ received: true }, { status: 200 });
    }

    // Check if all headshots for this order are done
    const { count: pendingCount } = await supabase
      .from('generated_headshots')
      .select('id', { count: 'exact', head: true })
      .eq('order_id', headshot.order_id)
      .eq('status', 'processing');

    if (pendingCount === 0) {
      // All generations complete - update order status
      const { count: completedCount } = await supabase
        .from('generated_headshots')
        .select('id', { count: 'exact', head: true })
        .eq('order_id', headshot.order_id)
        .eq('status', 'completed');

      const finalStatus = (completedCount || 0) > 0 ? 'completed' : 'failed';

      await supabase
        .from('orders')
        .update({
          status: finalStatus,
          completed_at: new Date().toISOString(),
        })
        .eq('id', headshot.order_id);

      // Send completion email
      if (finalStatus === 'completed') {
        const { data: orderUser } = await supabase.auth.admin.getUserById(headshot.user_id);

        if (orderUser?.user?.email) {
          try {
            await resend.emails.send({
              from: `${siteConfig.name} <noreply@${new URL(siteConfig.url).hostname}>`,
              to: orderUser.user.email,
              subject: 'Your AI headshots are ready!',
              html: `
                <h2>Your headshots are ready!</h2>
                <p>We've finished generating ${completedCount} professional headshots for you.</p>
                <p><a href="${siteConfig.url}/dashboard/orders/${headshot.order_id}">View your headshots</a></p>
                <p>You can download them individually or as a ZIP file from your dashboard.</p>
              `,
            });
          } catch (emailError) {
            console.error('Failed to send completion email:', emailError);
          }
        }
      }
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error('AI webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}
