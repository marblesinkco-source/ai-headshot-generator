'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Camera, Sparkles, ArrowRight, Zap, Clock } from 'lucide-react';
import { CATEGORIES } from '@/config/categories';

/* ------------------------------------------------------------------ */
/*  AI Headshot style showcase + Express Headshots banner               */
/* ------------------------------------------------------------------ */

/** Cache-busting version — increment when brand images are updated */
const V = '?v=5';

/** Express Headshots price — derived from categories.ts config */
const EXPRESS_PRICE = (() => {
  const cat = CATEGORIES['express-headshots'];
  const pkg = cat?.packages?.[0];
  return pkg ? `$${(pkg.price / 100).toFixed(2)}` : '$19.90';
})();

const STYLE_CATEGORIES = [
  {
    name: 'Professional',
    description: 'Clean, polished headshots for LinkedIn and resumes',
    samples: [
      { src: `/brand/tailorpic/web/after-ozlem.jpg${V}`, alt: 'AI headshot — professional style' },
      { src: `/brand/tailorpic/web/after-murat.jpg${V}`, alt: 'AI headshot — professional style' },
      { src: `/brand/tailorpic/web/after-ahmet.jpg${V}`, alt: 'AI headshot — professional style' },
    ],
  },
  {
    name: 'Corporate',
    description: 'Formal business headshots for company directories',
    samples: [
      { src: `/brand/tailorpic/web/after-mert.jpg${V}`, alt: 'AI headshot — corporate style' },
      { src: `/brand/tailorpic/web/after-halil.jpg${V}`, alt: 'AI headshot — corporate style' },
      { src: `/brand/tailorpic/web/after-alpaslan.jpg${V}`, alt: 'AI headshot — corporate style' },
    ],
  },
  {
    name: 'Creative',
    description: 'Expressive headshots for portfolios and social media',
    samples: [
      { src: `/brand/tailorpic/web/after-tarkan.jpg${V}`, alt: 'AI headshot — creative style' },
      { src: `/brand/tailorpic/web/after-ozan.jpg${V}`, alt: 'AI headshot — creative style' },
      { src: `/brand/tailorpic/web/after-mustafa.jpg${V}`, alt: 'AI headshot — creative style' },
    ],
  },
];

export function InstantPreviewDemo() {
  const [activeStyle, setActiveStyle] = useState(0);
  const [activeSample, setActiveSample] = useState(0);

  const category = STYLE_CATEGORIES[activeStyle];

  return (
    <section className="bg-tp-black py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6 md:px-8">

        {/* ── Express Headshots Banner ── */}
        <div className="mb-16 md:mb-20 rounded-tp-dialog border border-tp-bronze/20 bg-gradient-to-br from-tp-ink to-tp-black p-6 sm:p-8 md:p-10">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            {/* Left: Copy */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-tp-bronze/30 bg-tp-bronze/10 px-4 py-1.5 text-sm text-tp-bronze mb-5">
                <Zap className="h-4 w-4" />
                <span>New: Express Headshots</span>
              </div>
              <h2 className="font-display font-normal text-3xl md:text-4xl text-tp-paper mb-3">
                Professional Headshot
                <br />
                <span className="text-tp-bronze">in 15 Seconds</span>
              </h2>
              <p className="text-tp-beige/70 leading-relaxed mb-4">
                Upload a single selfie and get 5 studio-quality headshots instantly.
                No photo training, no waiting — just results.
              </p>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-tp-beige/60 mb-6">
                <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5 text-tp-bronze" /> 15 seconds</span>
                <span className="flex items-center gap-1.5"><Camera className="h-3.5 w-3.5 text-tp-bronze" /> 1 selfie</span>
                <span className="flex items-center gap-1.5"><Sparkles className="h-3.5 w-3.5 text-tp-bronze" /> 5 styles</span>
              </div>
              <Link
                href="/express-headshots"
                className="inline-flex items-center gap-2 bg-tp-bronze text-tp-black py-3 px-6 rounded-tp-button font-medium hover:bg-tp-beige transition-colors"
              >
                Get Express Headshots — {EXPRESS_PRICE}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Right: Video placeholder */}
            <div className="relative aspect-video rounded-tp-card overflow-hidden bg-tp-black border border-tp-line">
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-tp-bronze/20 border border-tp-bronze/40">
                  <svg className="h-6 w-6 text-tp-bronze ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <span className="text-tp-beige/50 text-xs">Demo video coming soon</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Style Showcase Header ── */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-tp-bronze/30 bg-tp-bronze/10 px-4 py-1.5 text-sm text-tp-bronze mb-6">
            <Sparkles className="h-4 w-4" />
            <span>Multiple Styles, One Selfie</span>
          </div>
          <h2 className="font-display font-normal text-3xl md:text-5xl text-tp-paper mb-4">
            Choose Your <span className="text-tp-bronze">Headshot Style</span>
          </h2>
          <p className="text-tp-beige/70 text-lg md:text-xl max-w-2xl mx-auto mb-3">
            Upload your selfies and our AI generates studio-quality headshots
            in the style you need — from corporate to creative.
          </p>
          <p className="text-tp-bronze/80 text-sm font-medium tracking-wide uppercase">
            AI-Generated Headshots
          </p>
        </div>

        {/* Content */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Left: Main image */}
          <div>
            <div className="rounded-tp-card overflow-hidden bg-tp-ink mb-4 relative">
              <div className="relative aspect-[3/4] w-full">
                <Image
                  src={category.samples[activeSample].src}
                  alt={category.samples[activeSample].alt}
                  fill
                  className="object-cover object-[50%_25%]"
                  sizes="(min-width: 768px) 40vw, 90vw"
                />
                {/* Style label */}
                <div className="absolute top-3 left-3 bg-tp-bronze/20 backdrop-blur-sm text-tp-bronze-ink text-xs font-semibold px-3 py-1 rounded-tp-button border border-tp-bronze/30">
                  {category.name} Style
                </div>
                {/* Disclosure */}
                <span className="absolute bottom-3 right-3 bg-tp-black/60 backdrop-blur-sm text-tp-paper/80 text-[10px] px-2 py-0.5 rounded-tp-button">
                  AI-generated concept image
                </span>
              </div>
            </div>

            {/* Sample thumbnail strip */}
            <div className="flex gap-2">
              {category.samples.map((sample, i) => (
                <button
                  key={sample.src}
                  type="button"
                  onClick={() => setActiveSample(i)}
                  className={`relative flex-1 aspect-[3/4] rounded-lg overflow-hidden border-2 transition-colors ${
                    i === activeSample
                      ? 'border-tp-bronze'
                      : 'border-tp-line hover:border-tp-muted'
                  }`}
                >
                  <Image
                    src={sample.src}
                    alt={`${category.name} example ${i + 1}`}
                    fill
                    className="object-cover object-[50%_25%]"
                    sizes="100px"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Style picker + CTA */}
          <div className="flex flex-col gap-6">
            {/* Style tabs */}
            <div className="flex flex-col gap-3">
              {STYLE_CATEGORIES.map((style, i) => (
                <button
                  key={style.name}
                  type="button"
                  onClick={() => {
                    setActiveStyle(i);
                    setActiveSample(0);
                  }}
                  className={`text-left px-5 py-4 rounded-tp-card border transition-colors ${
                    i === activeStyle
                      ? 'border-tp-bronze bg-tp-bronze/10'
                      : 'border-tp-line hover:border-tp-muted bg-tp-ink'
                  }`}
                >
                  <span
                    className={`block text-sm font-medium mb-1 ${
                      i === activeStyle ? 'text-tp-bronze' : 'text-tp-paper'
                    }`}
                  >
                    {style.name}
                  </span>
                  <span className="block text-xs text-tp-beige/60">
                    {style.description}
                  </span>
                </button>
              ))}
            </div>

            {/* How it works */}
            <div className="border border-tp-line rounded-tp-card p-5 bg-tp-ink">
              <h3 className="text-tp-paper font-medium text-sm mb-3">How It Works</h3>
              <ol className="space-y-3">
                {[
                  { step: '1', text: 'Upload your selfies' },
                  { step: '2', text: 'Choose your style and preferences' },
                  { step: '3', text: 'AI generates your headshots in minutes' },
                ].map(({ step, text }) => (
                  <li key={step} className="flex items-center gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-tp-bronze/20 flex items-center justify-center text-[11px] font-semibold text-tp-bronze">
                      {step}
                    </span>
                    <span className="text-sm text-tp-beige/80">{text}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* CTA */}
            <Link
              href="/auth/register"
              className="flex items-center justify-center gap-2 w-full bg-tp-bronze text-tp-black py-4 rounded-tp-button font-medium hover:bg-tp-bronze/90 transition-colors"
            >
              <Camera className="h-4 w-4" />
              Get Your AI Headshots
              <ArrowRight className="h-4 w-4" />
            </Link>
            <p className="text-center text-tp-beige/70 text-xs">
              Packages include up to 160 photos with multiple styles &amp; backgrounds
            </p>
          </div>
        </div>

        {/* Feature highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 md:mt-16">
          {[
            {
              icon: Camera,
              title: 'Multiple Styles',
              desc: 'Professional, Corporate, and Creative — get the right look for every platform.',
            },
            {
              icon: Sparkles,
              title: 'AI-Generated Quality',
              desc: 'Our AI creates studio-quality headshots with professional lighting and composition.',
            },
            {
              icon: ArrowRight,
              title: 'Ready in Minutes',
              desc: 'Upload your selfies and receive polished headshots — no studio visit needed.',
            },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="text-center p-6">
              <div className="mx-auto mb-4 w-10 h-10 rounded-full bg-tp-bronze/15 flex items-center justify-center">
                <Icon className="h-5 w-5 text-tp-bronze" />
              </div>
              <h3 className="text-tp-paper font-medium mb-2">{title}</h3>
              <p className="text-tp-beige/70 text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
