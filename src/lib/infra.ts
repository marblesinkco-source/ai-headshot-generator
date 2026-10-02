/**
 * Infrastructure Abstraction Layer
 * =================================
 * Provides a unified interface for services that may run on managed
 * providers (Plan 1) or self-hosted (Plan 2/3).
 *
 * Usage:
 *   import { infra } from '@/lib/infra';
 *   const provider = infra.db;     // 'supabase' | 'postgres'
 *   const cacheType = infra.cache; // 'upstash' | 'redis'
 */

export type DbProvider = 'supabase' | 'postgres';
export type CacheProvider = 'upstash' | 'redis';
export type StorageProvider = 'supabase' | 's3';
export type AiProvider = 'replicate' | 'self-hosted';
export type EmailProvider = 'resend' | 'ses' | 'smtp';

export interface InfraConfig {
  /** Database provider */
  db: DbProvider;
  /** Cache/rate-limiting provider */
  cache: CacheProvider;
  /** File storage provider */
  storage: StorageProvider;
  /** AI/GPU provider */
  ai: AiProvider;
  /** Email provider */
  email: EmailProvider;
  /** Current deployment plan */
  plan: 1 | 2 | 3;
}

function detectPlan(): 1 | 2 | 3 {
  // Plan 3: self-hosted DB
  if (process.env.INFRA_DB === 'postgres' || process.env.POSTGRES_DB) {
    return 3;
  }
  // Plan 2: Docker/VPS but still using Supabase + Replicate
  if (process.env.REDIS_URL && !process.env.UPSTASH_REDIS_REST_URL) {
    return 2;
  }
  // Plan 1: fully managed
  return 1;
}

function getConfig(): InfraConfig {
  const plan = detectPlan();

  return {
    db: (process.env.INFRA_DB as DbProvider) || (plan >= 3 ? 'postgres' : 'supabase'),
    cache: (process.env.INFRA_CACHE as CacheProvider) || (plan >= 2 ? 'redis' : 'upstash'),
    storage: (process.env.INFRA_STORAGE as StorageProvider) || 'supabase',
    ai: (process.env.INFRA_AI as AiProvider) || (plan >= 3 ? 'self-hosted' : 'replicate'),
    email: (process.env.INFRA_EMAIL as EmailProvider) || 'resend',
    plan,
  };
}

/** Singleton infrastructure config — reads env once at startup */
export const infra: InfraConfig = getConfig();

/**
 * Check if a feature requires a specific provider.
 * Returns true if the current setup matches.
 */
export function requiresProvider(service: keyof Omit<InfraConfig, 'plan'>, provider: string): boolean {
  return infra[service] === provider;
}

/**
 * Get the database connection string for self-hosted PostgreSQL.
 * Returns undefined when using Supabase (Plan 1).
 */
export function getDirectDbUrl(): string | undefined {
  if (infra.db !== 'postgres') return undefined;

  const host = process.env.POSTGRES_HOST || 'localhost';
  const port = process.env.DB_PORT || '5432';
  const db = process.env.POSTGRES_DB || 'tailorpic';
  const user = process.env.POSTGRES_USER || 'tailorpic';
  const password = process.env.POSTGRES_PASSWORD || '';

  return `postgresql://${user}:${password}@${host}:${port}/${db}`;
}

/**
 * Get the Redis connection URL for self-hosted Redis.
 * Returns undefined when using Upstash (Plan 1).
 */
export function getRedisUrl(): string | undefined {
  if (infra.cache !== 'redis') return undefined;
  return process.env.REDIS_URL || 'redis://localhost:6379';
}
