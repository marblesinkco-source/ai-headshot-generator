'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const BRAND_WEB = '/brand/tailorpic/web';

interface ShowcaseStyle {
  id: string;
  name: string;
  tag: string;
  description: string;
  image: string;
  alt: string;
}

const STYLES: readonly ShowcaseStyle[] = [
  {
    id: 'business-formal',
    name: 'Business Formal',
    tag: 'Corporate',
    description: 'Corporate blue suit against a clean studio backdrop.',
    image: 'after-murat.jpg',
    alt: 'AI-generated concept of a man in a blue suit against a studio backdrop',
  },
  {
    id: 'smart-casual',
    name: 'Smart Casual',
    tag: 'Relaxed',
    description: 'A modern, relaxed professional look that still feels polished.',
    image: 'after-tarkan.jpg',
    alt: 'AI-generated concept of a professional headshot in a smart casual style',
  },
  {
    id: 'creative',
    name: 'Creative',
    tag: 'Expressive',
    description: 'Artistic and expressive, made for designers and makers.',
    image: 'after-mert.jpg',
    alt: 'AI-generated concept of an expressive creative-style headshot',
  },
  {
    id: 'executive',
    name: 'Executive',
    tag: 'Premium',
    description: 'Premium C-suite presence with a confident, composed pose.',
    image: 'after-alpaslan.jpg',
    alt: 'AI-generated concept of an executive-style headshot',
  },
  {
    id: 'tech-startup',
    name: 'Tech Startup',
    tag: 'Casual',
    description: 'Silicon Valley casual: approachable, sharp and current.',
    image: 'after-ozan.jpg',
    alt: 'AI-generated concept of a tech startup casual headshot',
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    tag: 'Trusted',
    description: 'A warm, trustworthy look for medical professionals.',
    image: 'after-isik.jpg',
    alt: 'AI-generated concept of a healthcare professional headshot',
  },
  {
    id: 'legal',
    name: 'Legal',
    tag: 'Confident',
    description: 'Confident attorney look with a serious, credible tone.',
    image: 'after-ahmet.jpg',
    alt: 'AI-generated concept of a legal professional headshot',
  },
  {
    id: 'academic',
    name: 'Academic',
    tag: 'Scholarly',
    description: 'Scholarly and intellectual, suited to faculty and researchers.',
    image: 'after-halil.jpg',
    alt: 'AI-generated concept of an academic-style headshot',
  },
];

export function StyleShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const active = STYLES[activeIndex];

  function onGridKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    const keys = ['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp'];
    if (!keys.includes(e.key)) return;
    e.preventDefault();
    const dir = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : -1;
    const next = (activeIndex + dir + STYLES.length) % STYLES.length;
    setActiveIndex(next);
    const btns = e.currentTarget.querySelectorAll<HTMLButtonElement>('button[role="radio"]');
    btns[next]?.focus();
  }

  return (
    <section
      ref={sectionRef}
      aria-labelledby="style-showcase-heading"
      className="relative overflow-hidden bg-tp-paper py-20 lg:py-24"
    >
      {/* Decorative blobs */}
      <div aria-hidden="true" className="tp-blob tp-blob-beige -top-40 -left-40 h-[500px] w-[500px]" />
      <div aria-hidden="true" className="tp-blob tp-blob-bronze -bottom-32 -right-32 h-[400px] w-[400px]" />

      <div className="relative mx-auto max-w-[1320px] px-4 sm:px-7 lg:px-14">
        {/* Header */}
        <div className="scroll-fade-in mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-tp-bronze-ink">
            Style Showcase
          </p>
          <h2
            id="style-showcase-heading"
            className="font-display mt-4 text-[30px] font-normal leading-tight tracking-[-0.03em] text-tp-ink sm:text-[40px]"
          >
            One Face, Every Style
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-[15px] leading-relaxed text-tp-muted">
            See how AI transforms your selfies into professional headshots for any industry
          </p>
        </div>

        <div
          className={`mt-10 grid items-start gap-8 transition-all duration-700 motion-reduce:transition-none sm:mt-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-12 ${
            visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
        >
          {/* Featured image */}
          <figure className="mx-auto w-full max-w-md lg:max-w-none">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-tp-dialog border border-tp-line bg-tp-beige shadow-[0_24px_48px_-24px_rgba(11,11,11,0.25)]">
              {STYLES.map((style, i) => {
                const isActive = i === activeIndex;
                return (
                  <Image
                    key={style.id}
                    src={`${BRAND_WEB}/${style.image}`}
                    alt={isActive ? style.alt : ''}
                    aria-hidden={!isActive}
                    fill
                    sizes="(min-width: 1024px) 520px, (min-width: 640px) 448px, 100vw"
                    priority={i === 0}
                    className={`object-cover transition-all duration-500 ease-out motion-reduce:transition-none ${
                      isActive ? 'scale-100 opacity-100' : 'scale-105 opacity-0'
                    }`}
                  />
                );
              })}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-tp-black/60 to-transparent"
              />
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                <span className="inline-block rounded-full bg-tp-paper/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-tp-bronze-ink">
                  {active.tag}
                </span>
              </div>
            </div>
            <figcaption className="mt-4 text-center lg:text-left" aria-live="polite">
              <p className="font-display text-[26px] font-normal leading-tight tracking-[-0.02em] text-tp-ink">
                {active.name}
              </p>
              <p className="mt-1 text-[14px] leading-relaxed text-tp-muted">{active.description}</p>
              <p className="mt-2 text-xs text-tp-muted">AI-generated concept portrait.</p>
            </figcaption>
          </figure>

          {/* Style grid */}
          <div
            role="radiogroup"
            aria-label="Choose a headshot style"
            onKeyDown={onGridKeyDown}
            className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4 lg:grid-cols-2 xl:grid-cols-3"
          >
            {STYLES.map((style, i) => {
              const isActive = i === activeIndex;
              return (
                <button
                  key={style.id}
                  type="button"
                  role="radio"
                  aria-checked={isActive}
                  aria-label={`${style.name}: ${style.description}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActiveIndex(i)}
                  className={`group relative m-1 flex flex-col overflow-hidden rounded-tp-card border bg-tp-paper text-left transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze focus-visible:ring-offset-2 motion-reduce:transition-none ${
                    isActive
                      ? 'z-10 scale-105 border-transparent shadow-lg ring-2 ring-tp-bronze'
                      : 'border-tp-line hover:-translate-y-0.5 hover:border-tp-bronze/50 hover:shadow-md'
                  }`}
                >
                  <div className="relative aspect-square w-full overflow-hidden bg-tp-beige">
                    <Image
                      src={`${BRAND_WEB}/${style.image}`}
                      alt=""
                      fill
                      sizes="(min-width: 1280px) 160px, (min-width: 640px) 140px, 45vw"
                      className={`object-cover transition-transform duration-500 motion-reduce:transition-none ${
                        isActive ? 'scale-100' : 'group-hover:scale-105'
                      }`}
                    />
                  </div>
                  <div className="px-3 py-2.5">
                    <p className="text-[13px] font-semibold leading-tight text-tp-ink">{style.name}</p>
                    <p
                      className={`mt-0.5 text-[11px] font-medium uppercase tracking-[0.12em] ${
                        isActive ? 'text-tp-bronze-ink' : 'text-tp-muted'
                      }`}
                    >
                      {style.tag}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
