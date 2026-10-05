'use client';

import { useState, useEffect } from 'react';

interface ABVariant {
  id: string;
  weight: number;
  config?: Record<string, unknown>;
}

/**
 * Client-side A/B test hook.
 * Uses session-based hash to deterministically assign variants.
 * No server round-trip needed for assignment.
 */
export function useABTest(testName: string, variants: ABVariant[]): ABVariant | null {
  const [variant, setVariant] = useState<ABVariant | null>(null);

  useEffect(() => {
    try {
      let sessionId = sessionStorage.getItem('tp_session_id');
      if (!sessionId) {
        sessionId = crypto.randomUUID();
        sessionStorage.setItem('tp_session_id', sessionId);
      }

      // Simple hash
      let hash = 0;
      const str = `${sessionId}:${testName}`;
      for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
      }

      const bucket = Math.abs(hash) % 100;
      let cumulative = 0;

      for (const v of variants) {
        cumulative += v.weight;
        if (bucket < cumulative) {
          setVariant(v);
          return;
        }
      }

      setVariant(variants[0]);
    } catch {
      setVariant(variants[0]);
    }
  }, [testName, variants]);

  return variant;
}
