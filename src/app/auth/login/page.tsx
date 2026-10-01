'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';

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

  async function handleOAuthLogin(provider: 'google' | 'apple' | 'facebook') {
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

  return (
    <div className="flex min-h-screen items-center justify-center bg-tp-paper px-4 py-12">
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
        <div className="rounded-2xl border border-tp-line/60 bg-white p-8 shadow-sm">
          {/* OAuth Buttons */}
          <div className="space-y-3">
            {/* Google */}
            <Button
              variant="outline"
              size="md"
              className="w-full border-tp-line text-tp-ink hover:bg-tp-paper"
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
              Sign in with Google
            </Button>

            {/* Apple */}
            <Button
              variant="outline"
              size="md"
              className="w-full border-tp-line text-tp-ink hover:bg-tp-paper"
              onClick={() => handleOAuthLogin('apple')}
              loading={oauthLoading === 'apple'}
              disabled={loading || (oauthLoading !== null && oauthLoading !== 'apple')}
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
              </svg>
              Sign in with Apple
            </Button>

            {/* Facebook */}
            <Button
              variant="outline"
              size="md"
              className="w-full border-tp-line text-tp-ink hover:bg-tp-paper"
              onClick={() => handleOAuthLogin('facebook')}
              loading={oauthLoading === 'facebook'}
              disabled={loading || (oauthLoading !== null && oauthLoading !== 'facebook')}
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="#1877F2" />
              </svg>
              Sign in with Facebook
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
  );
}
