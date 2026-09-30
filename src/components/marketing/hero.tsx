import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-16">
      {/* Background — luxury warm gradient */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-tailor-cream via-white to-brand-50" />
      <div className="pointer-events-none absolute inset-0 bg-grid" />
      <div className="pointer-events-none absolute -top-32 right-0 h-[600px] w-[600px] rounded-full bg-brand-400/8 blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-32 left-0 h-[500px] w-[500px] rounded-full bg-brand-300/8 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: Copy */}
          <div className="max-w-2xl animate-fade-up">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-300/50 bg-white/80 px-4 py-1.5 text-sm font-medium text-brand-700 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-500" />
              </span>
              Tailoring &middot; Technology &middot; Your Picture
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight text-tailor-black sm:text-5xl lg:text-6xl">
              Your Best Photo,{' '}
              <span className="text-gradient-gold">Tailored by AI.</span>
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-gray-600 sm:text-xl">
              Professional headshots, pet portraits, dating photos, holiday cards &amp; more.
              Upload a few photos, get stunning results tailored to you.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link href="/auth/login">
                <Button size="lg">Get Started</Button>
              </Link>
              <a href="#how-it-works">
                <Button variant="outline" size="lg">
                  See How it Works
                </Button>
              </a>
            </div>

            {/* Social proof */}
            <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 text-sm text-gray-500">
              <span className="flex items-center gap-1.5">
                <svg className="h-4 w-4 text-brand-500" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                    clipRule="evenodd"
                  />
                </svg>
                Beautiful Results
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="h-4 w-4 text-brand-500" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                    clipRule="evenodd"
                  />
                </svg>
                Fast &amp; Easy
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="h-4 w-4 text-brand-500" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                    clipRule="evenodd"
                  />
                </svg>
                Made for Everyone
              </span>
            </div>
          </div>

          {/* Right: Before/After Grid */}
          <div className="relative animate-fade-in lg:pl-8">
            <div className="grid grid-cols-2 gap-3">
              {/* "Before" selfies */}
              <div className="space-y-3">
                <div className="overflow-hidden rounded-2xl">
                  <div className="flex aspect-square items-center justify-center bg-gradient-to-br from-brand-100 to-brand-200 p-4 text-center text-sm font-medium text-brand-600">
                    Casual Selfie
                  </div>
                </div>
                <div className="overflow-hidden rounded-2xl">
                  <div className="flex aspect-square items-center justify-center bg-gradient-to-br from-brand-100 to-brand-200 p-4 text-center text-sm font-medium text-brand-600">
                    Phone Photo
                  </div>
                </div>
              </div>

              {/* "After" headshots */}
              <div className="space-y-3 pt-6">
                <div className="overflow-hidden rounded-2xl shadow-xl shadow-brand-400/15 ring-2 ring-brand-400/30">
                  <div className="flex aspect-square items-center justify-center bg-gradient-to-br from-tailor-black to-gray-800 p-4 text-center text-sm font-semibold text-tailor-gold">
                    Professional Headshot
                  </div>
                </div>
                <div className="overflow-hidden rounded-2xl shadow-xl shadow-brand-400/15 ring-2 ring-brand-400/30">
                  <div className="flex aspect-square items-center justify-center bg-gradient-to-br from-tailor-black to-gray-800 p-4 text-center text-sm font-semibold text-tailor-gold">
                    Corporate Portrait
                  </div>
                </div>
              </div>
            </div>

            {/* Floating label */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white px-5 py-2 shadow-lg shadow-brand-400/10 ring-1 ring-brand-200">
              <div className="flex items-center gap-3 text-xs font-medium text-gray-500">
                <span>Before</span>
                <svg
                  className="h-4 w-4 text-brand-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
                <span className="font-semibold text-brand-600">After</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
