'use client';

import { useEffect, useRef, type CSSProperties } from 'react';
import { Briefcase, Rocket, Users, Palette, Building2, GraduationCap } from 'lucide-react';

const USE_CASES = [
  {
    Icon: Briefcase,
    title: 'Job Seekers',
    description: 'Stand out on LinkedIn and job applications with a polished headshot.',
  },
  {
    Icon: Rocket,
    title: 'Entrepreneurs',
    description: 'Professional photos for your website, pitch deck and social media.',
  },
  {
    Icon: Users,
    title: 'Remote Teams',
    description: 'Consistent, professional team photos without scheduling a group shoot.',
  },
  {
    Icon: Palette,
    title: 'Content Creators',
    description: 'Fresh, versatile photos for social media, YouTube and blogs.',
  },
  {
    Icon: Building2,
    title: 'Real Estate Agents',
    description: 'Trustworthy headshots for listings, business cards and branding.',
  },
  {
    Icon: GraduationCap,
    title: 'Students & Graduates',
    description: 'Affordable professional photos for resumes and LinkedIn.',
  },
] as const;

/**
 * "Who Uses TailorPic?" — use-case cards (not testimonials).
 * Staggered reveal via IntersectionObserver; respects prefers-reduced-motion.
 */
export function UseCases() {
  const gridRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const items = Array.from(grid.querySelectorAll<HTMLElement>('[data-use-case]'));

    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      typeof IntersectionObserver === 'undefined'
    ) {
      items.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="relative overflow-hidden bg-tp-paper py-16 sm:py-20"
      aria-labelledby="use-cases-heading"
    >
      <div aria-hidden="true" className="tp-blob tp-blob-beige w-[500px] h-[500px] -top-40 -right-40" />
      <div aria-hidden="true" className="tp-blob tp-blob-bronze w-[350px] h-[350px] -bottom-28 -left-28" />
      <div className="relative mx-auto max-w-[1320px] px-4 sm:px-7 lg:px-14">
        <div className="scroll-fade-in mx-auto max-w-2xl text-center">
          <p className="uppercase text-[11px] font-semibold tracking-[0.25em] text-tp-bronze-ink">Who It&apos;s For</p>
          <h2
            id="use-cases-heading"
            className="mt-3 font-display text-[30px] sm:text-[40px] font-normal tracking-[-0.03em] text-tp-ink leading-tight"
          >
            Who Uses TailorPic?
          </h2>
          <p className="mt-3 text-base text-tp-muted sm:text-lg">
            From job seekers to creative professionals — TailorPic works for everyone.
          </p>
        </div>

        <ul
          ref={gridRef}
          className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3"
        >
          {USE_CASES.map(({ Icon, title, description }, i) => (
            <li
              key={title}
              data-use-case
              className="reveal"
              style={{ '--reveal-i': i } as CSSProperties}
            >
              <div className="group tp-lift h-full rounded-tp-card border border-tp-line bg-white p-6 transition-[border-color,box-shadow] duration-300 hover:border-tp-bronze/30 hover:shadow-md hover:shadow-tp-bronze/5 motion-reduce:transition-none">
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-tp-line bg-gradient-to-br from-tp-paper to-tp-beige/50 shadow-sm transition-all duration-300 group-hover:border-tp-bronze/40 text-tp-bronze-ink">
                  <Icon className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-lg font-semibold text-tp-ink">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-tp-muted">{description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
