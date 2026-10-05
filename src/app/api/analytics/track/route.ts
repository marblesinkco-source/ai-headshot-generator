import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

interface TrackEvent {
  type: 'page_view' | 'click' | 'conversion';
  sessionId: string;
  pagePath: string;
  // page_view specific
  referrer?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  deviceType?: string;
  durationMs?: number;
  // click specific
  elementId?: string;
  elementType?: string;
  // conversion specific
  eventType?: string;
  categoryId?: string;
  packageId?: string;
  revenueCents?: number;
  // shared
  metadata?: Record<string, unknown>;
}

export async function POST(request: NextRequest) {
  try {
    const body: TrackEvent = await request.json();

    if (!body.type || !body.sessionId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

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
          revenue_cents: body.revenueCents || null,
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
