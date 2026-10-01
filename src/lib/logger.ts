/**
 * Minimal structured logger.
 *
 * - Levels: info, warn, error (+ debug in development only).
 * - Never logs secrets: values under sensitive keys are redacted and
 *   token-looking strings are masked.
 * - Errors are normalised to { name, message } (stack only outside production).
 * - Output is one JSON line in production, readable text in development.
 */

type Level = 'debug' | 'info' | 'warn' | 'error';
export type LogContext = Record<string, unknown>;

const IS_PROD = process.env.NODE_ENV === 'production';
const SENSITIVE_KEY_RE =
  /pass(word)?|secret|token|api[-_]?key|authorization|cookie|signature|service[-_]?role|credential|^key$/i;
const SECRET_VALUE_RE =
  /\b(sk|pk|rk|whsec|r8|re|eyJ)[_A-Za-z0-9-]{0,4}[_.]?[A-Za-z0-9_-]{20,}\b/g;
const MAX_DEPTH = 4;

function scrubString(s: string): string {
  return s.replace(SECRET_VALUE_RE, '[REDACTED]');
}

function sanitize(value: unknown, depth = 0): unknown {
  if (value instanceof Error) {
    return {
      name: value.name,
      message: scrubString(value.message),
      ...(IS_PROD ? {} : { stack: value.stack ? scrubString(value.stack) : undefined }),
    };
  }
  if (typeof value === 'string') return scrubString(value);
  if (value === null || typeof value !== 'object') return value;
  if (depth >= MAX_DEPTH) return '[Truncated]';
  if (Array.isArray(value)) return value.slice(0, 50).map((v) => sanitize(v, depth + 1));

  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
    out[k] = SENSITIVE_KEY_RE.test(k) ? '[REDACTED]' : sanitize(v, depth + 1);
  }
  return out;
}

function emit(level: Level, context: LogContext, message: string, details: unknown[]) {
  if (level === 'debug' && IS_PROD) return;
  const entry = {
    level,
    time: new Date().toISOString(),
    message: scrubString(message),
    ...(Object.keys(context).length ? { context: sanitize(context) } : {}),
    ...(details.length ? { details: details.map((d) => sanitize(d)) } : {}),
  };
  const sink = level === 'error' ? console.error : level === 'warn' ? console.warn : console.log;
  if (IS_PROD) {
    sink(JSON.stringify(entry));
  } else {
    sink(`[${level}] ${entry.message}`, ...(entry.context ? [entry.context] : []), ...(entry.details ?? []));
  }
}

export interface Logger {
  debug(message: string, ...details: unknown[]): void;
  info(message: string, ...details: unknown[]): void;
  warn(message: string, ...details: unknown[]): void;
  error(message: string, ...details: unknown[]): void;
  /** Returns a logger that attaches `context` to every entry. */
  with(context: LogContext): Logger;
}

function create(context: LogContext): Logger {
  return {
    debug: (m, ...d) => emit('debug', context, m, d),
    info: (m, ...d) => emit('info', context, m, d),
    warn: (m, ...d) => emit('warn', context, m, d),
    error: (m, ...d) => emit('error', context, m, d),
    with: (extra) => create({ ...context, ...extra }),
  };
}

export const logger: Logger = create({});
