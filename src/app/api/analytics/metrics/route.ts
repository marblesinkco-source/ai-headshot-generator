import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();

    // Check auth
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const days = parseInt(searchParams.get('days') || '7', 10);
    const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();

    // Fetch all metrics in parallel — graceful fallback
    const [pageViewsRes, clicksRes, conversionsRes, optimizationsRes, abTestsRes] = await Promise.all([
      supabase
        .from('page_views')
        .select('page_path, device_type, created_at')
        .gte('created_at', since)
        .order('created_at', { ascending: false })
        .limit(1000),
      supabase
        .from('click_events')
        .select('element_id, element_type, page_path, created_at')
        .gte('created_at', since)
        .order('created_at', { ascending: false })
        .limit(1000),
      supabase
        .from('conversions')
        .select('event_type, category_id, package_id, revenue_cents, created_at')
        .gte('created_at', since)
        .order('created_at', { ascending: false })
        .limit(1000),
      supabase
        .from('optimization_log')
        .select('optimization_type, decision, reasoning, created_at')
        .order('created_at', { ascending: false })
        .limit(20),
      supabase
        .from('ab_tests')
        .select('test_name, description, variants, status, winner_variant, created_at')
        .order('created_at', { ascending: false }),
    ]);

    // Aggregate page views by page
    const pageViewsByPage: Record<string, number> = {};
    const pageViewsByDevice: Record<string, number> = { desktop: 0, mobile: 0, tablet: 0 };
    const pageViewsByDay: Record<string, number> = {};

    for (const pv of pageViewsRes.data || []) {
      const path = pv.page_path || '/';
      pageViewsByPage[path] = (pageViewsByPage[path] || 0) + 1;

      const device = pv.device_type || 'desktop';
      pageViewsByDevice[device] = (pageViewsByDevice[device] || 0) + 1;

      const day = pv.created_at?.substring(0, 10) || '';
      if (day) pageViewsByDay[day] = (pageViewsByDay[day] || 0) + 1;
    }

    // Aggregate conversions
    const conversionsByType: Record<string, number> = {};
    let totalRevenue = 0;
    for (const conv of conversionsRes.data || []) {
      const type = conv.event_type || 'unknown';
      conversionsByType[type] = (conversionsByType[type] || 0) + 1;
      totalRevenue += conv.revenue_cents || 0;
    }

    // Top clicked elements
    const clicksByElement: Record<string, number> = {};
    for (const click of clicksRes.data || []) {
      const el = click.element_id || 'unknown';
      clicksByElement[el] = (clicksByElement[el] || 0) + 1;
    }
    const topClicks = Object.entries(clicksByElement)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([element, count]) => ({ element, count }));

    return NextResponse.json({
      period: { days, since },
      summary: {
        totalPageViews: (pageViewsRes.data || []).length,
        totalClicks: (clicksRes.data || []).length,
        totalConversions: (conversionsRes.data || []).length,
        totalRevenue,
      },
      pageViews: {
        byPage: pageViewsByPage,
        byDevice: pageViewsByDevice,
        byDay: pageViewsByDay,
      },
      topClicks,
      conversions: conversionsByType,
      optimizations: (optimizationsRes.data || []).map(o => ({
        type: o.optimization_type,
        decision: o.decision,
        reasoning: o.reasoning,
        date: o.created_at,
      })),
      abTests: (abTestsRes.data || []).map(t => ({
        name: t.test_name,
        description: t.description,
        variants: t.variants,
        status: t.status,
        winner: t.winner_variant,
      })),
    });
  } catch (err) {
    console.error('[Analytics] Metrics error:', err);
    // Graceful fallback
    return NextResponse.json({
      period: { days: 7, since: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString() },
      summary: { totalPageViews: 0, totalClicks: 0, totalConversions: 0, totalRevenue: 0 },
      pageViews: { byPage: {}, byDevice: {}, byDay: {} },
      topClicks: [],
      conversions: {},
      optimizations: [],
      abTests: [],
    });
  }
}
