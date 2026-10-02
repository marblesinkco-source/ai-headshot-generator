'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center bg-tp-paper"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-tp-bronze" /></div>}>
      <LoginContent />
    </Suspense>
  );
}

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirect') || '/dashboard';
  const authError = searchParams.get('error');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(
    authError === 'auth_failed' ? 'Authentication failed. Please try again.' : null
  );
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState<string | null>(null);

  const supabase = createClient();

  const oauthRedirectUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/auth/callback?redirect=${encodeURIComponent(redirectTo)}`;

  async function handleEmailLogin(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError(signInError.message);
      setLoading(false);
      return;
    }

    router.push(redirectTo);
    router.refresh();
  }

  async function handleOAuthLogin(provider: 'google' | 'azure' | 'facebook' | 'linkedin_oidc') {
    setError(null);
    setOauthLoading(provider);

    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: oauthRedirectUrl,
      },
    });

    if (oauthError) {
      setError(oauthError.message);
      setOauthLoading(null);
    }
  }

  const bulletPoints = [
    'Studio-quality headshots in under 2 hours',
    '11 photo categories for every occasion',
    '14-day money-back guarantee',
  ];

  return (
    <div className="flex min-h-screen bg-tp-paper">
      {/* Left side — auth form */}
      <div className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Logo / Brand */}
          <div className="mb-8 text-center">
            <Link href="/" aria-label="TailorPic home">
              <Image
                src="/brand/tailorpic/logo/tailorpic-horizontal-bronze.svg"
                alt="TailorPic"
                width={180}
                height={42}
                className="h-9 w-auto mx-auto"
                priority
              />
            </Link>
            <p className="mt-3 text-sm text-tp-muted">Sign in to your account</p>
          </div>

          {/* Card */}
          <div className="rounded-tp-card border border-tp-line/60 bg-white p-8 shadow-sm">
            {/* OAuth Buttons */}
            <div className="space-y-3">
              {/* Google */}
              <Button
                variant="outline"
                size="md"
                className="w-full gap-3 border-tp-line text-tp-ink hover:bg-tp-paper"
                onClick={() => handleOAuthLogin('google')}
                loading={oauthLoading === 'google'}
                disabled={loading || (oauthLoading !== null && oauthLoading !== 'google')}
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Continue with Google
              </Button>
              {/* Microsoft */}
              <Button
                variant="outline"
                size="md"
                className="w-full gap-3 border-tp-line text-tp-ink hover:bg-tp-paper"
                onClick={() => handleOAuthLogin('azure')}
                loading={oauthLoading === 'azure'}
                disabled={loading || (oauthLoading !== null && oauthLoading !== 'azure')}
              >
                <svg className="h-5 w-5" viewBox="0 0 23 23">
                  <path fill="#f35325" d="M1 1h10v10H1z"/>
                  <path fill="#81bc06" d="M12 1h10v10H12z"/>
                  <path fill="#05a6f0" d="M1 12h10v10H1z"/>
                  <path fill="#ffba08" d="M12 12h10v10H12z"/>
                </svg>
                Continue with Microsoft
              </Button>
              {/* Facebook */}
              <Button
                variant="outline"
                size="md"
                className="w-full gap-3 border-tp-line text-tp-ink hover:bg-tp-paper"
                onClick={() => handleOAuthLogin('facebook')}
                loading={oauthLoading === 'facebook'}
                disabled={loading || (oauthLoading !== null && oauthLoading !== 'facebook')}
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="#1877F2">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Continue with Facebook
              </Button>
              {/* LinkedIn */}
              <Button
                variant="outline"
                size="md"
                className="w-full gap-3 border-tp-line text-tp-ink hover:bg-tp-paper"
                onClick={() => handleOAuthLogin('linkedin_oidc')}
                loading={oauthLoading === 'linkedin_oidc'}
                disabled={loading || (oauthLoading !== null && oauthLoading !== 'linkedin_oidc')}
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="#0A66C2">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                Continue with LinkedIn
              </Button>
            </div>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-tp-line/50" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-3 text-tp-muted">or continue with email</span>
              </div>
            </div>

            {/* Email/Password Form */}
            <form onSubmit={handleEmailLogin} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-tp-ink mb-1">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-lg border border-tp-line px-3.5 py-2.5 text-sm text-tp-ink placeholder-tp-muted/60 shadow-sm focus:border-tp-bronze focus:outline-none focus:ring-2 focus:ring-tp-bronze/20 transition-colors"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label htmlFor="password" className="block text-sm font-medium text-tp-ink">
                    Password
                  </label>
                  <Link
                    href="/auth/forgot-password"
                    className="text-xs font-medium text-tp-bronze-ink hover:text-tp-bronze transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-lg border border-tp-line px-3.5 py-2.5 text-sm text-tp-ink placeholder-tp-muted/60 shadow-sm focus:border-tp-bronze focus:outline-none focus:ring-2 focus:ring-tp-bronze/20 transition-colors"
                  placeholder="Enter your password"
                />
              </div>

              {error && (
                <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                variant="primary"
                size="md"
                className="w-full"
                loading={loading}
                disabled={oauthLoading}
              >
                Sign in
              </Button>
            </form>

            {/* Trust signals */}
            <p className="mt-6 pt-5 border-t border-tp-line/40 text-center text-xs text-tp-muted">
              256-bit encryption · 14-day money-back guarantee · No subscription required
            </p>
          </div>

          {/* Register link */}
          <p className="mt-6 text-center text-sm text-tp-muted">
            Don&apos;t have an account?{' '}
            <Link href="/auth/register" className="font-medium text-tp-bronze-ink hover:text-tp-bronze transition-colors">
              Create one
            </Link>
          </p>
        </div>
      </div>

      {/* Right side — trust/marketing panel (desktop only) */}
      <div className="hidden lg:flex lg:w-[480px] xl:w-[520px] flex-col items-center justify-center bg-tp-black p-12 relative overflow-hidden">
        {/* Decorative bronze gradient accent */}
        <div
          className="absolute top-0 right-0 w-72 h-72 rounded-full opacity-15 blur-3xl"
          style={{
            background: 'radial-gradient(circle, #C9A98A 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-56 h-56 rounded-full opacity-10 blur-3xl"
          style={{
            background: 'radial-gradient(circle, #C9A98A 0%, transparent 70%)',
          }}
        />

        <div className="relative z-10 max-w-sm">
          <h2 className="font-display text-3xl text-tp-paper leading-tight mb-8">
            Transform Your Photos with AI
          </h2>

          <ul className="space-y-5">
            {bulletPoints.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-tp-bronze/20">
                  <Check className="h-3 w-3 text-tp-bronze" />
                </span>
                <span className="text-sm text-tp-beige leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>

          {/* Bronze gradient accent line */}
          <div
            className="mt-10 h-px w-full"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, #C9A98A 50%, transparent 100%)',
            }}
          />
        </div>
      </div>
    </div>
  );
}
