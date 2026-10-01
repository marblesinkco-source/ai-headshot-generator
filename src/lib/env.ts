/**
 * Environment variable validation.
 *
 * Error messages name the missing variable but never print any values.
 */

export class MissingEnvError extends Error {
  constructor(public readonly names: string[]) {
    super(`Missing required environment variable(s): ${names.join(', ')}`);
    this.name = 'MissingEnvError';
  }
}

/** Returns the value or throws MissingEnvError (message contains only the name). */
export function requireEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new MissingEnvError([name]);
  return v;
}

/** Throws one MissingEnvError listing every unset variable. */
export function requireEnvs(names: string[]): void {
  const missing = names.filter((n) => !process.env[n]);
  if (missing.length) throw new MissingEnvError(missing);
}
