'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState<string | null>(null);
  const [emailSent, setEmailSent] = useState(false);

  const supabase = createClient();

  const oauthRedirectUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/auth/callback`;

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setLoading(true);

    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        },
        emailRedirectTo: oauthRedirectUrl,
      },
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    // If email confirmation is enabled, show a success message instead of redirecting
    setEmailSent(true);
    setLoading(false);
  }

  async function handleOAuthSignUp(provider: 'google' | 'apple' | 'facebook') {
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

  if (emailSent) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-tp-paper px-4 py-12">
        <div className="w-full max-w-md">
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
          </div>
          <div className="rounded-2xl border border-tp-line/60 bg-white p-8 shadow-sm text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-50">
              <svg className="h-7 w-7 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-tp-black mb-2">Check your email</h2>
            <p className="text-sm text-tp-muted mb-6">
              We&apos;ve sent a confirmation link to <strong className="text-tp-ink">{email}</strong>.
              Click the link to activate your account.
            </p>
            <Link
              href="/auth/login"
              className="text-sm font-medium text-tp-bronze-ink hover:text-tp-bronze transition-colors"
            >
              Back to sign in
            </Link>
          </div>
        </div>
      </div>
    );
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
          <p className="mt-3 text-sm text-tp-muted">Create your account</p>
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
              onClick={() => handleOAuthSignUp('google')}
              loading={oauthLoading === 'google'}
              disabled={loading || (oauthLoading !== null && oauthLoading !== 'google')}
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Sign up with Google
            </Button>

            {/* Apple */}
            <Button
              variant="outline"
              size="md"
              className="w-full border-tp-line text-tp-ink hover:bg-tp-paper"
              onClick={() => handleOAuthSignUp('apple')}
              loading={oauthLoading === 'apple'}
              disabled={loading || (oauthLoading !== null && oauthLoading !== 'apple')}
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
              </svg>
              Sign up with Apple
            </Button>

            {/* Facebook */}
            <Button
              variant="outline"
              size="md"
              className="w-full border-tp-line text-tp-ink hover:bg-tp-paper"
              onClick={() => handleOAuthSignUp('facebook')}
              loading={oauthLoading === 'facebook'}
              disabled={loading || (oauthLoading !== null && oauthLoading !== 'facebook')}
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="#1877F2" />
              </svg>
              Sign up with Facebook
            </Button>
          </div>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-tp-line/50" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-3 text-tp-muted">or register with email</span>
            </div>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-tp-ink mb-1">
                Full name
              </label>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="block w-full rounded-lg border border-tp-line px-3.5 py-2.5 text-sm text-tp-black placeholder-tp-muted/60 shadow-sm focus:border-tp-bronze focus:outline-none focus:ring-2 focus:ring-tp-bronze/20 transition-colors"
                placeholder="John Doe"
              />
            </div>

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
                className="block w-full rounded-lg border border-tp-line px-3.5 py-2.5 text-sm text-tp-black placeholder-tp-muted/60 shadow-sm focus:border-tp-bronze focus:outline-none focus:ring-2 focus:ring-tp-bronze/20 transition-colors"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-tp-ink mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-lg border border-tp-line px-3.5 py-2.5 text-sm text-tp-black placeholder-tp-muted/60 shadow-sm focus:border-tp-bronze focus:outline-none focus:ring-2 focus:ring-tp-bronze/20 transition-colors"
                placeholder="Min. 8 characters"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-tp-ink mb-1">
                Confirm password
              </label>
              <input
                id="confirmPassword"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="block w-full rounded-lg border border-tp-line px-3.5 py-2.5 text-sm text-tp-black placeholder-tp-muted/60 shadow-sm focus:border-tp-bronze focus:outline-none focus:ring-2 focus:ring-tp-bronze/20 transition-colors"
                placeholder="Repeat your password"
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
              Create account
            </Button>
          </form>

          <p className="mt-4 text-center text-xs text-tp-muted">
            By signing up, you agree to our{' '}
            <Link href="/terms" className="underline hover:text-tp-bronze-ink">Terms of Service</Link>
            {' '}and{' '}
            <Link href="/privacy" className="underline hover:text-tp-bronze-ink">Privacy Policy</Link>.
          </p>
        </div>

        {/* Login link */}
        <p className="mt-6 text-center text-sm text-tp-muted">
          Already have an account?{' '}
          <Link href="/auth/login" className="font-medium text-tp-bronze-ink hover:text-tp-bronze transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
