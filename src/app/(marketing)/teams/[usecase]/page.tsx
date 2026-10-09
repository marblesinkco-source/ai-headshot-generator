import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight, CheckCircle, AlertCircle, ChevronDown } from 'lucide-react';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { BreadcrumbSchema, FAQSchema } from '@/components/structured-data';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { siteConfig } from '@/config/site';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';
import { BASE_PRICE_DISPLAY, TEAM_PRICES } from '@/config/pricing';
import {
  TEAM_USE_CASES,
  getAllTeamUseCaseSlugs,
  getTeamUseCaseBySlug,
} from '@/config/team-use-cases';

interface Props {
  params: Promise<{ usecase: string }>;
}

const TEAMS_CTA = '/for-teams';
const REGISTER_CTA = '/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots';

const perPerson = (cents: number) => `$${Math.round(cents / 100)}`;

export const dynamicParams = false;

export async function generateStaticParams() {
  return getAllTeamUseCaseSlugs().map((usecase) => ({ usecase }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { usecase } = await params;
  const uc = getTeamUseCaseBySlug(usecase);
  if (!uc) return {};
  const path = `/teams/${uc.slug}`;
  return {
    title: { absolute: uc.metaTitle },
    description: uc.metaDescription,
    alternates: { canonical: path },
    openGraph: generateOGMetadata({
      title: uc.metaTitle,
      description: uc.metaDescription,
      type: 'usecase',
      path,
    }),
    twitter: generateTwitterMetadata({
      title: uc.metaTitle,
      description: uc.metaDescription,
      type: 'usecase',
    }),
  };
}

export default async function TeamUseCasePage({ params }: Props) {
  const { usecase } = await params;
  const uc = getTeamUseCaseBySlug(usecase);
  if (!uc) notFound();

  const small = TEAM_PRICES.small;
  const large = TEAM_PRICES.large;
  const others = TEAM_USE_CASES.filter((u) => u.slug !== uc.slug);

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'Teams', url: `${siteConfig.url}/teams` },
          { name: uc.title, url: `${siteConfig.url}/teams/${uc.slug}` },
        ]}
      />
      {uc.faqItems && uc.faqItems.length > 0 && (
        <FAQSchema
          items={uc.faqItems.map((faq) => ({ question: faq.q, answer: faq.a }))}
        />
      )}
      <Header />
      <main id="main-content">

      {/* Hero */}
      <section className="relative overflow-hidden bg-tp-black pt-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-tp-bronze/8 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex items-center rounded-full border border-tp-bronze/30 bg-tp-bronze/10 px-4 py-1.5 text-sm font-medium text-tp-bronze">
              {uc.title}
            </p>
            <h1 className="mt-8 font-display text-4xl font-normal leading-tight text-tp-paper sm:text-5xl lg:text-6xl">
              {uc.heroTitle}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-tp-beige/70">
              {uc.heroSubtitle}
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href={TEAMS_CTA}
                className={cn(
                  buttonVariants({ size: 'lg' }),
                  'bg-tp-bronze text-tp-black shadow-none hover:bg-tp-bronze/90',
                )}
              >
                Explore team plans <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href={REGISTER_CTA}
                className={cn(
                  buttonVariants({ variant: 'outline', size: 'lg' }),
                  'border-tp-beige/30 text-tp-beige hover:border-tp-beige/50 hover:bg-tp-beige/10',
                )}
              >
                Try it yourself
              </Link>
            </div>
            <p className="mt-6 text-sm text-tp-beige/50">
              Individual headshots from {BASE_PRICE_DISPLAY} · No subscription
            </p>
          </div>
        </div>
      </section>

      {/* Pain points */}
      <section className="py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-display text-3xl font-normal tracking-tight text-tp-ink sm:text-4xl">
            The problem with traditional photo shoots
          </h2>
          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {uc.painPoints.map((p) => (
              <div
                key={p.title}
                className="rounded-tp-card border border-tp-line bg-white p-6"
              >
                <AlertCircle className="h-5 w-5 text-tp-bronze" aria-hidden="true" />
                <h3 className="mt-4 text-lg font-semibold text-tp-ink">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-tp-muted">{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="border-y border-tp-line bg-tp-beige/30 py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-display text-3xl font-normal tracking-tight text-tp-ink sm:text-4xl">
            How TailorPic helps
          </h2>
          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {uc.benefits.map((b) => (
              <div
                key={b.title}
                className="rounded-tp-card border border-tp-line bg-tp-paper p-6"
              >
                <CheckCircle className="h-5 w-5 text-tp-bronze" aria-hidden="true" />
                <h3 className="mt-4 text-lg font-semibold text-tp-ink">{b.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-tp-muted">{b.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-display text-3xl font-normal tracking-tight text-tp-ink sm:text-4xl">
            How it works
          </h2>
          <div className="mt-14 grid gap-8 sm:grid-cols-3">
            {uc.howItWorks.map((item, i) => (
              <div key={item.step} className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-tp-bronze/10">
                  <span className="text-lg font-semibold text-tp-bronze-ink">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-tp-ink">{item.step}</h3>
                <p className="mt-2 text-sm leading-relaxed text-tp-muted">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team pricing */}
      <section className="border-y border-tp-line bg-white py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-display text-3xl font-normal tracking-tight text-tp-ink sm:text-4xl">
              Team pricing
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-tp-muted">
              Per-person pricing for teams, with no subscription.
            </p>
          </div>
          <div className="mx-auto mt-12 grid max-w-2xl gap-6 sm:grid-cols-2">
            <div className="rounded-tp-card border border-tp-line bg-tp-paper p-6 text-center">
              <p className="text-3xl font-semibold text-tp-bronze-ink">
                {perPerson(small.perPersonCents)}
                <span className="text-base font-normal text-tp-muted"> / person</span>
              </p>
              <p className="mt-2 text-sm text-tp-muted">
                Teams of {small.min} to {small.max}
              </p>
            </div>
            <div className="rounded-tp-card border border-tp-line bg-tp-paper p-6 text-center">
              <p className="text-3xl font-semibold text-tp-bronze-ink">
                {perPerson(large.perPersonCents)}
                <span className="text-base font-normal text-tp-muted"> / person</span>
              </p>
              <p className="mt-2 text-sm text-tp-muted">
                Teams of {large.min} to {large.max}
              </p>
            </div>
          </div>
          <p className="mt-6 text-center text-sm text-tp-muted">
            Just one person?{' '}
            <Link href="/pricing" className="font-medium text-tp-bronze-ink underline-offset-2 hover:underline">
              Individual packages start from {BASE_PRICE_DISPLAY}
            </Link>
            .
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-tp-paper py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-display text-3xl font-normal tracking-tight text-tp-ink sm:text-4xl">
            Frequently asked questions
          </h2>
          <div className="mt-12 space-y-4">
            {uc.faqItems.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-tp-card border border-tp-line bg-white p-6"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-lg font-semibold text-tp-ink [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <ChevronDown
                    className="h-5 w-5 flex-shrink-0 text-tp-bronze transition-transform group-open:rotate-180"
                    aria-hidden="true"
                  />
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-tp-muted">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Other use cases */}
      <section className="border-t border-tp-line py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-display text-2xl font-normal text-tp-ink">
            More team use cases
          </h2>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {others.map((o) => (
              <Link
                key={o.slug}
                href={`/teams/${o.slug}`}
                className="rounded-full border border-tp-line bg-white px-5 py-2.5 text-sm font-medium text-tp-ink shadow-sm transition-colors hover:border-tp-bronze/40 hover:bg-tp-beige"
              >
                {o.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-tp-black py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-normal tracking-tight text-tp-paper sm:text-4xl">
              Ready to photograph your team?
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-tp-beige/70">
              See team plans, or start with your own headshots from {BASE_PRICE_DISPLAY}.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href={TEAMS_CTA}
                className={cn(
                  buttonVariants({ size: 'lg' }),
                  'bg-tp-bronze text-tp-black shadow-none hover:bg-tp-bronze/90',
                )}
              >
                Explore team plans <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href={REGISTER_CTA}
                className={cn(
                  buttonVariants({ variant: 'outline', size: 'lg' }),
                  'border-tp-beige/30 text-tp-beige hover:border-tp-beige/50 hover:bg-tp-beige/10',
                )}
              >
                Get started
              </Link>
            </div>
          </div>
        </div>
      </section>

      </main>
      <Footer />
    </>
  );
}
