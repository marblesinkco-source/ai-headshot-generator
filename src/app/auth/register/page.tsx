'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Check, Star } from 'lucide-react';

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center bg-tp-paper"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-tp-bronze" /></div>}>
      <RegisterContent />
    </Suspense>
  );
}

function RegisterContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rawRedirect = searchParams.get('redirect');
  // Only allow same-site relative paths (prevents open redirects like //evil.com)
  const redirectTo =
    rawRedirect && rawRedirect.startsWith('/') && !rawRedirect.startsWith('//')
      ? rawRedirect
      : '/dashboard';
  const loginHref =
    redirectTo === '/dashboard'
      ? '/auth/login'
      : `/auth/login?redirect=${encodeURIComponent(redirectTo)}`;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState<string | null>(null);
  const [emailSent, setEmailSent] = useState(false);

  const supabase = createClient();

  const oauthRedirectUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/auth/callback?redirect=${encodeURIComponent(redirectTo)}`;

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

    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
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

    // If email confirmation is disabled, a session exists already: go straight to the target
    if (signUpData?.session) {
      router.push(redirectTo);
      router.refresh();
      return;
    }

    // If email confirmation is enabled, show a success message instead of redirecting
    setEmailSent(true);
    setLoading(false);
  }

  async function handleOAuthSignUp(provider: 'google' | 'azure' | 'facebook' | 'linkedin_oidc') {
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
          <div className="rounded-tp-card border border-tp-line/60 bg-white p-8 shadow-sm text-center">
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
              href={loginHref}
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
    <div className="flex min-h-screen bg-tp-paper">
      {/* Left side - Auth form */}
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
            <h1 className="mt-6 font-display font-normal text-4xl text-tp-black">Create your account</h1>
            <p className="mt-2 text-sm text-tp-muted">Your professional headshots are one step away.</p>
          </div>

          {/* Card */}
          <div className="rounded-tp-card border border-tp-line bg-white p-6 sm:p-8 shadow-[0_1px_2px_rgba(11,11,11,0.04),0_12px_32px_-12px_rgba(118,86,61,0.18)]">
            {/* OAuth Buttons */}
            <div className="space-y-3">
              {/* Google */}
              <Button
                variant="outline"
                size="md"
                className="w-full gap-3 rounded-tp-button border-tp-line bg-white font-medium text-tp-ink hover:bg-tp-paper"
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
                Continue with Google
              </Button>
              {/* Microsoft */}
              <Button
                variant="outline"
                size="md"
                className="w-full gap-3 rounded-tp-button border-tp-line bg-white font-medium text-tp-ink hover:bg-tp-paper"
                onClick={() => handleOAuthSignUp('azure')}
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
                className="w-full gap-3 rounded-tp-button border-tp-line bg-white font-medium text-tp-ink hover:bg-tp-paper"
                onClick={() => handleOAuthSignUp('facebook')}
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
                className="w-full gap-3 rounded-tp-button border-tp-line bg-white font-medium text-tp-ink hover:bg-tp-paper"
                onClick={() => handleOAuthSignUp('linkedin_oidc')}
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

            {/* Trust signals */}
            <ul className="mt-5 grid grid-cols-1 gap-2 rounded-tp-button border border-tp-line bg-tp-paper px-4 py-3 text-xs text-tp-ink sm:grid-cols-3 sm:gap-1 sm:text-center">
              {['Secure checkout', 'Ready in under 2 hours'].map((t) => (
                <li key={t} className="flex items-center gap-1.5 sm:flex-col sm:gap-1">
                  <Check className="h-3.5 w-3.5 shrink-0 text-tp-bronze-ink" aria-hidden="true" />
                  <span className="font-medium">{t}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-center text-xs text-tp-muted">256-bit encryption &middot; Your photos stay private</p>

            <p className="mt-3 text-center text-xs text-tp-muted">
              By signing up, you agree to our{' '}
              <Link href="/terms" className="underline hover:text-tp-bronze-ink">Terms of Service</Link>
              {' '}and{' '}
              <Link href="/privacy" className="underline hover:text-tp-bronze-ink">Privacy Policy</Link>.
            </p>
          </div>

          {/* Login link */}
          <p className="mt-6 text-center text-sm text-tp-muted">
            Already have an account?{' '}
            <Link href={loginHref} className="font-medium text-tp-bronze-ink hover:text-tp-bronze transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {/* Right side - Trust/marketing panel (desktop only) */}
      <div className="hidden lg:flex lg:w-[480px] xl:w-[540px] bg-tp-black flex-col items-center justify-center px-12 relative overflow-hidden">
        {/* Decorative bronze gradient accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-tp-bronze/0 via-tp-bronze to-tp-bronze/0" />
        <div className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full bg-gradient-to-br from-tp-bronze/10 to-tp-bronze/0 blur-3xl" />

        <div className="relative z-10 w-full max-w-sm">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-tp-bronze">AI headshots, tailored</p>
          <h2 className="font-display font-normal text-4xl leading-tight text-tp-paper mb-8">
            Look like your best professional self
          </h2>

          <ul className="space-y-5 mb-10">
            {['Upload selfies, get professional photos', '40+ photos per session', 'Ready in under 2 hours'].map((t) => (
              <li key={t} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-tp-bronze/20">
                  <Check className="h-3 w-3 text-tp-bronze" />
                </span>
                <span className="text-sm text-tp-beige">{t}</span>
              </li>
            ))}
          </ul>

          {/* Value card */}
          <figure className="rounded-tp-card border border-white/10 bg-white/5 p-6">
            <div className="flex items-center gap-1 mb-3" aria-label="5 out of 5 stars">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-tp-bronze text-tp-bronze" />
              ))}
            </div>
            <blockquote className="font-display font-normal text-xl leading-snug text-tp-paper">
              &ldquo;Studio-quality headshots without the studio. Skip the photographer, keep the polish.&rdquo;
            </blockquote>
            <figcaption className="mt-4 text-xs text-tp-beige/80">
              From $1.99 &middot; No subscription
            </figcaption>
          </figure>
          <p className="mt-6 text-sm text-tp-beige/70">Trusted by professionals worldwide</p>
        </div>
      </div>
    </div>
  );
}
