import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';
import { rateLimit } from '@/lib/rate-limit';

export const dynamic = 'force-dynamic';

const trackSchema = z.object({
  type: z.enum(['page_view', 'click', 'conversion']),
  sessionId: z.string().min(1).max(128),
  pagePath: z.string().min(1).max(500),
  // page_view
  referrer: z.string().max(2000).optional(),
  utmSource: z.string().max(200).optional(),
  utmMedium: z.string().max(200).optional(),
  utmCampaign: z.string().max(200).optional(),
  deviceType: z.enum(['desktop', 'mobile', 'tablet']).optional(),
  durationMs: z.number().int().min(0).max(3_600_000).optional(),
  // click
  elementId: z.string().max(200).optional(),
  elementType: z.string().max(100).optional(),
  // conversion — revenueCents removed: server must look up the real value
  eventType: z.string().max(100).optional(),
  categoryId: z.string().max(100).optional(),
  packageId: z.string().max(100).optional(),
  // metadata
  metadata: z.record(z.unknown()).optional(),
});

export async function POST(request: NextRequest) {
  try {
    // IP-based rate limit: 120 events per minute
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    const rl = await rateLimit({ key: `analytics-track:${ip}`, limit: 120, windowMs: 60 * 1000 });
    if (!rl.success) {
      return NextResponse.json({ ok: true }); // silent drop
    }

    let rawBody: unknown;
    try { rawBody = await request.json(); } catch {
      return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
    }

    const parsed = trackSchema.safeParse(rawBody);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    const body = parsed.data;
    const supabase = await createClient();

    switch (body.type) {
      case 'page_view': {
        const { error } = await supabase.from('page_views').insert({
          session_id: body.sessionId,
          page_path: body.pagePath,
          referrer: body.referrer || null,
          utm_source: body.utmSource || null,
          utm_medium: body.utmMedium || null,
          utm_campaign: body.utmCampaign || null,
          device_type: body.deviceType || 'desktop',
          duration_ms: body.durationMs || null,
        });
        if (error) throw error;
        break;
      }
      case 'click': {
        if (!body.elementId) {
          return NextResponse.json({ error: 'elementId required for click events' }, { status: 400 });
        }
        const { error } = await supabase.from('click_events').insert({
          session_id: body.sessionId,
          page_path: body.pagePath,
          element_id: body.elementId,
          element_type: body.elementType || 'button',
          metadata: body.metadata || {},
        });
        if (error) throw error;
        break;
      }
      case 'conversion': {
        if (!body.eventType) {
          return NextResponse.json({ error: 'eventType required for conversions' }, { status: 400 });
        }
        const { error } = await supabase.from('conversions').insert({
          session_id: body.sessionId,
          event_type: body.eventType,
          category_id: body.categoryId || null,
          package_id: body.packageId || null,
          revenue_cents: null, // never trust client-supplied revenue
          metadata: body.metadata || {},
        });
        if (error) throw error;
        break;
      }
      default:
        return NextResponse.json({ error: 'Unknown event type' }, { status: 400 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    // Graceful fallback: don't break the site if tables don't exist
    console.error('[Analytics] Track error:', err);
    return NextResponse.json({ ok: true }); // Silent fail — analytics should never block UX
  }
}
