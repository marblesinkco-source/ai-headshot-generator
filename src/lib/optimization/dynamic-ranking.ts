/**
 * Dynamic Ranking Service
 *
 * Reads optimized rankings from Supabase, falls back to static defaults.
 * Rankings are updated daily by the optimization cron job.
 */

import { createClient } from '@/lib/supabase/server';

export interface CategoryRanking {
  categoryId: string;
  score: number;
  conversions7d: number;
  views7d: number;
  conversionRate: number;
}

export interface PackageHighlight {
  packageId: string;
  highlighted: boolean;
  reason?: string;
}

// Static defaults
const DEFAULT_CATEGORY_ORDER = [
  'headshots', 'linkedin-team', 'dating', 'real-estate',
  'graduation', 'family-portraits', 'pet-portraits',
  'couple-engagement', 'baby-shower', 'holiday-cards',
  'ecommerce-product', 'avatars'
];

/**
 * Get optimized category order. Falls back to default if no optimization data.
 */
export async function getCategoryOrder(): Promise<string[]> {
  try {
    const supabase = await createClient();

    const { data } = await supabase
      .from('dynamic_rankings')
      .select('ranking_data')
      .eq('ranking_type', 'category_order')
      .order('valid_from', { ascending: false })
      .limit(1)
      .single();

    if (data?.ranking_data) {
      const rankingData = data.ranking_data as { order?: string[] };
      return rankingData.order || DEFAULT_CATEGORY_ORDER;
    }

    return DEFAULT_CATEGORY_ORDER;
  } catch {
    return DEFAULT_CATEGORY_ORDER;
  }
}

/**
 * Get highlighted package for a category
 */
export async function getHighlightedPackage(categoryId: string): Promise<string | null> {
  try {
    const supabase = await createClient();

    const { data } = await supabase
      .from('dynamic_rankings')
      .select('ranking_data')
      .eq('ranking_type', 'package_highlight')
      .order('valid_from', { ascending: false })
      .limit(1)
      .single();

    if (data?.ranking_data) {
      const rankingData = data.ranking_data as Record<string, string>;
      return rankingData[categoryId] || null;
    }

    return null;
  } catch {
    return null;
  }
}

/**
 * Get the current hero variant to display
 */
export async function getHeroVariant(): Promise<{ headline: string; subtext: string; ctaText: string } | null> {
  try {
    const supabase = await createClient();

    const { data } = await supabase
      .from('dynamic_rankings')
      .select('ranking_data')
      .eq('ranking_type', 'hero_variant')
      .order('valid_from', { ascending: false })
      .limit(1)
      .single();

    if (data?.ranking_data) {
      return data.ranking_data as { headline: string; subtext: string; ctaText: string };
    }

    return null;
  } catch {
    return null;
  }
}

/**
 * Get optimization insights for the dashboard
 */
export async function getOptimizationInsights(limit: number = 10): Promise<Array<{
  type: string;
  decision: Record<string, unknown>;
  reasoning: string;
  createdAt: string;
}>> {
  try {
    const supabase = await createClient();

    const { data } = await supabase
      .from('optimization_log')
      .select('optimization_type, decision, reasoning, created_at')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (!data) return [];

    return data.map(d => ({
      type: d.optimization_type,
      decision: d.decision as Record<string, unknown>,
      reasoning: d.reasoning || '',
      createdAt: d.created_at,
    }));
  } catch {
    return [];
  }
}
