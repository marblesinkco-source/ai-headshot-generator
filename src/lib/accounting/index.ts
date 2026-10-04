/**
 * TailorPic Accounting Center — main barrel export
 */

export * from './services';
export * from './providers';

/**
 * Check whether an error indicates that accounting tables have not been created yet.
 * Supabase PostgREST errors are NOT standard Error instances — they are plain objects
 * with `message`, `code`, `details`, and `hint` properties.
 */
export function isTableMissingError(error: unknown): boolean {
  if (!error || typeof error !== 'object') return false;
  const e = error as Record<string, unknown>;
  const msg = typeof e.message === 'string' ? e.message : '';
  const code = typeof e.code === 'string' ? e.code : '';
  return (
    code === '42P01' ||
    code === 'PGRST205' ||
    msg.includes('42P01') ||
    msg.includes('Could not find the') ||
    (msg.includes('relation') && msg.includes('does not exist'))
  );
}
