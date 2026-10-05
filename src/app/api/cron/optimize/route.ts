import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

interface CategoryMetrics {
  categoryId: string;
  views: number;
  clicks: number;
  conversions: number;
  revenue: number;
  conversionRate: number;
  revenuePerView: number;
}

interface PackageMetrics {
  packageId: string;
  categoryId: string;
  selects: number;
  completions: number;
  revenue: number;
  conversionRate: number;
}

export async function GET() {
  const startTime = Date.now();

  try {
    const supabase = createAdminClient();
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

    // 1. Fetch metrics
    const [pageViewsRes, clicksRes, conversionsRes] = await Promise.all([
      supabase
        .from('page_views')
        .select('page_path, created_at')
        .gte('created_at', sevenDaysAgo),
      supabase
        .from('click_events')
        .select('element_id, element_type, page_path, created_at')
        .gte('created_at', sevenDaysAgo),
      supabase
        .from('conversions')
        .select('event_type, category_id, package_id, revenue_cents, created_at')
        .gte('created_at', sevenDaysAgo),
    ]);

    // Graceful fallback if tables don't exist
    const pageViews = pageViewsRes.data || [];
    const clicks = clicksRes.data || [];
    const conversions = conversionsRes.data || [];

    if (pageViews.length === 0 && clicks.length === 0 && conversions.length === 0) {
      return NextResponse.json({
        ok: true,
        message: 'No data to optimize yet',
        duration: Date.now() - startTime,
      });
    }

    // 2. Calculate category metrics
    const categoryMetrics = new Map<string, CategoryMetrics>();
    const categories = [
      'headshots', 'dating', 'pet-portraits', 'linkedin-team',
      'baby-shower', 'graduation', 'holiday-cards', 'family-portraits',
      'couple-engagement', 'real-estate', 'ecommerce-product', 'avatars'
    ];

    // Initialize
    for (const cat of categories) {
      categoryMetrics.set(cat, {
        categoryId: cat,
        views: 0,
        clicks: 0,
        conversions: 0,
        revenue: 0,
        conversionRate: 0,
        revenuePerView: 0,
      });
    }

    // Count page views per category
    for (const pv of pageViews) {
      const match = pv.page_path?.match(/^\/([a-z-]+)$/);
      if (match && categoryMetrics.has(match[1])) {
        const m = categoryMetrics.get(match[1])!;
        m.views++;
      }
    }

    // Count clicks per category
    for (const click of clicks) {
      const catMatch = click.element_id?.match(/^category-(.+)$/);
      if (catMatch && categoryMetrics.has(catMatch[1])) {
        const m = categoryMetrics.get(catMatch[1])!;
        m.clicks++;
      }
    }

    // Count conversions per category
    for (const conv of conversions) {
      if (conv.category_id && categoryMetrics.has(conv.category_id)) {
        const m = categoryMetrics.get(conv.category_id)!;
        m.conversions++;
        m.revenue += conv.revenue_cents || 0;
      }
    }

    // Calculate rates
    for (const m of categoryMetrics.values()) {
      m.conversionRate = m.views > 0 ? m.conversions / m.views : 0;
      m.revenuePerView = m.views > 0 ? m.revenue / m.views : 0;
    }

    // 3. Calculate package metrics
    const packageMetrics = new Map<string, PackageMetrics>();
    for (const conv of conversions) {
      if (conv.package_id) {
        const key = conv.package_id;
        if (!packageMetrics.has(key)) {
          packageMetrics.set(key, {
            packageId: conv.package_id,
            categoryId: conv.category_id || 'headshots',
            selects: 0,
            completions: 0,
            revenue: 0,
            conversionRate: 0,
          });
        }
        const pm = packageMetrics.get(key)!;
        if (conv.event_type === 'package_select') pm.selects++;
        if (conv.event_type === 'payment_complete') {
          pm.completions++;
          pm.revenue += conv.revenue_cents || 0;
        }
      }
    }

    for (const pm of packageMetrics.values()) {
      pm.conversionRate = pm.selects > 0 ? pm.completions / pm.selects : 0;
    }

    // 4. Determine optimal category order (by conversion rate, then revenue)
    const sortedCategories = Array.from(categoryMetrics.values())
      .sort((a, b) => {
        // Primary: conversion rate
        if (b.conversionRate !== a.conversionRate) return b.conversionRate - a.conversionRate;
        // Secondary: revenue per view
        return b.revenuePerView - a.revenuePerView;
      })
      .map(m => m.categoryId);

    // 5. Determine best package to highlight per category
    const packageHighlights: Record<string, string> = {};
    for (const [, pm] of packageMetrics) {
      const current = packageHighlights[pm.categoryId];
      if (!current) {
        packageHighlights[pm.categoryId] = pm.packageId;
      } else {
        const currentPm = packageMetrics.get(current);
        if (currentPm && pm.revenue > currentPm.revenue) {
          packageHighlights[pm.categoryId] = pm.packageId;
        }
      }
    }

    // 6. Log decisions
    const metricsSnapshot = {
      totalPageViews: pageViews.length,
      totalClicks: clicks.length,
      totalConversions: conversions.length,
      categoryMetrics: Object.fromEntries(categoryMetrics),
      packageMetrics: Object.fromEntries(packageMetrics),
    };

    await supabase.from('optimization_log').insert([
      {
        optimization_type: 'category_rank',
        decision: { order: sortedCategories },
        reasoning: `Sorted ${categories.length} categories by 7-day conversion rate. Top: ${sortedCategories[0]} (${(categoryMetrics.get(sortedCategories[0])?.conversionRate || 0 * 100).toFixed(1)}%)`,
        metrics_snapshot: metricsSnapshot,
        applied: true,
      },
      {
        optimization_type: 'package_highlight',
        decision: packageHighlights,
        reasoning: `Highlighted highest-revenue package per category based on ${conversions.length} conversions`,
        metrics_snapshot: metricsSnapshot,
        applied: true,
      },
    ]);

    // 7. Write new rankings
    const now = new Date().toISOString();
    await supabase.from('dynamic_rankings').insert([
      {
        ranking_type: 'category_order',
        ranking_data: { order: sortedCategories },
        valid_from: now,
      },
      {
        ranking_type: 'package_highlight',
        ranking_data: packageHighlights,
        valid_from: now,
      },
    ]);

    const duration = Date.now() - startTime;

    return NextResponse.json({
      ok: true,
      optimized: {
        categoryOrder: sortedCategories,
        packageHighlights,
        dataPoints: {
          pageViews: pageViews.length,
          clicks: clicks.length,
          conversions: conversions.length,
        },
      },
      duration,
    });
  } catch (err) {
    console.error('[Optimize] Cron error:', err);
    // Return 200 even on error — Vercel cron retries on non-200
    return NextResponse.json({
      ok: false,
      error: 'Optimization failed — tables may not exist yet',
      duration: Date.now() - startTime,
    });
  }
}
