/**
 * A/B Testing Framework for TailorPic Self-Optimization Engine
 *
 * Assigns visitors to test variants based on session ID hashing.
 * Reads active tests from Supabase, falls back to defaults if tables don't exist.
 */

import { createClient } from '@/lib/supabase/server';

export interface ABTestVariant {
  id: string;
  weight: number; // 0-100
  config?: Record<string, unknown>;
}

export interface ABTest {
  id: string;
  testName: string;
  description: string;
  variants: ABTestVariant[];
  targetPage: string | null;
  status: 'active' | 'paused' | 'completed';
}

// Default tests that run without DB
const DEFAULT_TESTS: Record<string, ABTestVariant[]> = {
  'hero-cta-text': [
    { id: 'control', weight: 50, config: { text: 'Create Your Perfect Headshot', subtext: 'AI-powered professional photos within hours' } },
    { id: 'variant_a', weight: 50, config: { text: 'Professional Photos, Zero Hassle', subtext: 'Upload selfies, get studio-quality headshots' } },
  ],
  'pricing-highlight': [
    { id: 'control', weight: 50, config: { highlighted: 'headshots-professional' } },
    { id: 'variant_a', weight: 50, config: { highlighted: 'headshots-starter' } },
  ],
  'category-order': [
    { id: 'control', weight: 50, config: { order: 'default' } },
    { id: 'variant_a', weight: 50, config: { order: 'conversion-optimized' } },
  ],
};

/**
 * Simple hash function to deterministically assign sessions to variants
 */
function hashSessionToVariant(sessionId: string, testName: string, variants: ABTestVariant[]): ABTestVariant {
  let hash = 0;
  const str = `${sessionId}:${testName}`;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }

  const bucket = Math.abs(hash) % 100;
  let cumulative = 0;

  for (const variant of variants) {
    cumulative += variant.weight;
    if (bucket < cumulative) {
      return variant;
    }
  }

  return variants[0]; // fallback
}

/**
 * Get the assigned variant for a session in a specific test
 */
export async function getVariant(sessionId: string, testName: string): Promise<ABTestVariant | null> {
  // Use default tests as fallback
  const defaultVariants = DEFAULT_TESTS[testName];
  if (!defaultVariants) return null;

  try {
    const supabase = await createClient();

    // Try to get from DB first
    const { data: test } = await supabase
      .from('ab_tests')
      .select('*')
      .eq('test_name', testName)
      .eq('status', 'active')
      .single();

    const variants = test?.variants as ABTestVariant[] || defaultVariants;

    // Check if session already has an assignment
    if (test) {
      const { data: existing } = await supabase
        .from('ab_test_assignments')
        .select('variant_id')
        .eq('test_id', test.id)
        .eq('session_id', sessionId)
        .single();

      if (existing) {
        return variants.find(v => v.id === existing.variant_id) || variants[0];
      }

      // Assign new variant
      const variant = hashSessionToVariant(sessionId, testName, variants);

      await supabase.from('ab_test_assignments').insert({
        test_id: test.id,
        session_id: sessionId,
        variant_id: variant.id,
      }).select().single(); // ignore errors — graceful fallback

      return variant;
    }

    // No DB test found, use hash-based assignment with defaults
    return hashSessionToVariant(sessionId, testName, defaultVariants);
  } catch {
    // Graceful fallback: use default tests with hash assignment
    return hashSessionToVariant(sessionId, testName, defaultVariants);
  }
}

/**
 * Get all active A/B tests
 */
export async function getActiveTests(): Promise<ABTest[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('ab_tests')
      .select('*')
      .eq('status', 'active');

    if (error || !data) return [];

    return data.map(t => ({
      id: t.id,
      testName: t.test_name,
      description: t.description,
      variants: t.variants as ABTestVariant[],
      targetPage: t.target_page,
      status: t.status,
    }));
  } catch {
    return [];
  }
}

/**
 * Record a conversion for an A/B test
 */
export async function recordTestConversion(sessionId: string, testName: string): Promise<void> {
  try {
    const supabase = await createClient();

    const { data: test } = await supabase
      .from('ab_tests')
      .select('id')
      .eq('test_name', testName)
      .single();

    if (test) {
      await supabase
        .from('ab_test_assignments')
        .update({ converted: true })
        .eq('test_id', test.id)
        .eq('session_id', sessionId);
    }
  } catch {
    // Silent fail
  }
}
