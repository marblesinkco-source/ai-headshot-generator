'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { FAQSchema, BreadcrumbSchema } from '@/components/structured-data';
import { siteConfig } from '@/config/site';
import {
  Search,
  Rocket,
  ImageUp,
  Images,
  CreditCard,
  Users,
  ShieldCheck,
  ChevronDown,
  Mail,
  ArrowRight,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Help Center Data                                                  */
/* ------------------------------------------------------------------ */

interface HelpItem {
  question: string;
  answer: string;
}

interface HelpCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  items: HelpItem[];
}

const helpCategories: HelpCategory[] = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    description: 'Create your account and generate your first headshot.',
    icon: Rocket,
    items: [
      {
        question: 'How do I get started with TailorPic?',
        answer:
          'Create an account, upload 4–10 selfies of yourself, choose a headshot style, and our AI will generate professional photos tailored to you. The whole process takes just a few minutes to set up.',
      },
      {
        question: 'Do I need to create an account?',
        answer:
          'Yes. A free account lets you upload photos and preview styles. You only pay when you are ready to generate your AI headshots.',
      },
      {
        question: 'How much does TailorPic cost?',
        answer:
          'TailorPic starts at a one-time payment of $1.99. There are no subscriptions or recurring fees — you pay once and keep your photos forever.',
      },
      {
        question: 'What packages are available?',
        answer:
          'We offer several packages with different numbers of generated headshots and style options. Visit our pricing page for the latest details on what each package includes.',
      },
    ],
  },
  {
    id: 'photo-upload',
    title: 'Photo Upload',
    description: 'Requirements, tips, and what to avoid for best results.',
    icon: ImageUp,
    items: [
      {
        question: 'How do I upload my photos?',
        answer:
          'After signing in, navigate to the upload area and drag-and-drop or select your selfies. You need a minimum of 4 photos and can upload up to 10; we recommend using all 10 for the best results. The uploader accepts JPEG, PNG, and HEIC formats.',
      },
      {
        question: 'What kind of photos should I upload?',
        answer:
          'Upload clear selfies and photos of your face from different angles. Include a mix of front-facing and slight side angles. Good lighting, a neutral background, and no sunglasses or heavy filters work best.',
      },
      {
        question: 'How many photos do I need to upload?',
        answer:
          'We require a minimum of 4 photos and accept up to 10; more variety gives the best results. More variety helps the AI learn your features accurately.',
      },
      {
        question: 'What should I avoid in my photos?',
        answer:
          'Avoid sunglasses, hats that cover your forehead, heavy makeup or face paint, group photos where your face is small, and heavily filtered or edited images.',
      },
      {
        question: 'Can I use photos taken with my phone?',
        answer:
          'Absolutely. Modern phone cameras are more than sufficient. Just make sure the photos are in focus and well-lit. Front-facing camera selfies work great.',
      },
    ],
  },
  {
    id: 'your-headshots',
    title: 'Your Headshots',
    description: 'Turnaround time, formats, and re-generating photos.',
    icon: Images,
    items: [
      {
        question: 'How long does it take to get my headshots?',
        answer:
          'AI headshot generation typically takes 30–90 minutes depending on current demand. You will receive an email notification when your photos are ready.',
      },
      {
        question: 'What format are the downloaded photos?',
        answer:
          'All headshots are delivered as high-resolution JPEG files suitable for LinkedIn, resumes, websites, and print. The resolution is optimized for both digital and print use.',
      },
      {
        question: 'Can I re-generate my headshots?',
        answer:
          'Yes. If you are not satisfied with the results, you can use your remaining credits to generate additional headshots with different styles or settings.',
      },
      {
        question: 'How do I download my photos?',
        answer:
          'Once your headshots are ready, visit your dashboard and click the download button on any photo. You can download individual images or all of them at once as a ZIP file.',
      },
    ],
  },
  {
    id: 'account-billing',
    title: 'Account & Billing',
    description: 'Managing your account, payments, and data export.',
    icon: CreditCard,
    items: [
      {
        question: 'How do I manage my account settings?',
        answer:
          'Sign in and navigate to your account settings from the dashboard. There you can update your email, password, notification preferences, and profile information.',
      },
      {
        question: 'What payment methods do you accept?',
        answer:
          'We accept all major credit and debit cards (Visa, Mastercard, American Express) through our secure payment processor. All transactions are encrypted.',
      },
      {
        question: 'Can I export my data?',
        answer:
          'Yes. You can request a full data export from your account settings. This includes your uploaded photos, generated headshots, and account information in a downloadable archive.',
      },
      {
        question: 'What is your satisfaction guarantee?',
        answer:
          'We offer a satisfaction guarantee. If you are not happy with the results, contact our support team and we will work with you to resolve the issue or process a refund.',
      },
      {
        question: 'How do I delete my account?',
        answer:
          'You can delete your account from the account settings page. Account deletion is permanent and will remove all your data, uploaded photos, and generated headshots from our servers.',
      },
    ],
  },
  {
    id: 'team-enterprise',
    title: 'Team & Enterprise',
    description: 'Bulk ordering, consistent team photos, and admin tools.',
    icon: Users,
    items: [
      {
        question: 'How does team ordering work?',
        answer:
          'An admin creates a team workspace, invites members via email, and each member uploads their own photos. The admin can choose a consistent style so all team headshots look cohesive.',
      },
      {
        question: 'Can we get consistent team photos?',
        answer:
          'Yes. Our team feature lets you select a unified background, lighting style, and dress code so every team member gets headshots that look like they were taken in the same session.',
      },
      {
        question: 'Is there team or bulk pricing?',
        answer:
          'Yes. We offer discounted rates for teams and organizations that need headshots for multiple people. Contact us or visit our Enterprise page for custom team pricing.',
      },
      {
        question: 'What admin features are available?',
        answer:
          'Team admins can manage members, track progress, set style guidelines, download all team photos in bulk, and manage billing from a central dashboard.',
      },
    ],
  },
  {
    id: 'privacy-security',
    title: 'Privacy & Security',
    description: 'Data handling, GDPR compliance, and photo deletion.',
    icon: ShieldCheck,
    items: [
      {
        question: 'How is my data handled?',
        answer:
          'Your photos and personal data are encrypted in transit and at rest. We use industry-standard security practices and share your photos only with our AI processing partner to generate your headshots. We never sell them.',
      },
      {
        question: 'Are you GDPR compliant?',
        answer:
          'Yes. TailorPic is fully GDPR compliant. You have the right to access, export, and delete your data at any time. We also support data portability requests.',
      },
      {
        question: 'When are my photos deleted?',
        answer:
          'Uploaded photos, your temporary AI model and generated photos are automatically deleted from our servers 30 days after delivery. You can also delete them sooner from your dashboard at any time.',
      },
      {
        question: 'Who can see my photos?',
        answer:
          'Only you can access your uploaded and generated photos. Our team does not view customer photos unless you explicitly share them with support for troubleshooting purposes.',
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export default function HelpCenterPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [openQuestions, setOpenQuestions] = useState<Set<string>>(new Set());

  // Flatten all Q&A for structured data
  const allFaqItems = useMemo(
    () =>
      helpCategories.flatMap((cat) =>
        cat.items.map((item) => ({
          question: item.question,
          answer: item.answer,
        }))
      ),
    []
  );

  // Client-side search filtering
  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return helpCategories;
    const q = searchQuery.toLowerCase();
    return helpCategories
      .map((cat) => ({
        ...cat,
        items: cat.items.filter(
          (item) =>
            item.question.toLowerCase().includes(q) ||
            item.answer.toLowerCase().includes(q)
        ),
      }))
      .filter((cat) => cat.items.length > 0);
  }, [searchQuery]);

  const totalResults = filteredCategories.reduce((sum, cat) => sum + cat.items.length, 0);

  const toggleQuestion = (key: string) => {
    setOpenQuestions((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  const scrollToCategory = (id: string) => {
    setSearchQuery('');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <main id="main-content" className="min-h-screen">
      <FAQSchema items={allFaqItems} />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'Help Center', url: `${siteConfig.url}/help` },
        ]}
      />
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden pt-16">
        <div className="pointer-events-none absolute inset-0 bg-grid" />
        <div className="pointer-events-none absolute -top-24 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-tp-bronze/10 blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 sm:py-24 lg:px-8">
          <h1 className="font-display font-normal text-4xl tracking-tight text-tp-black sm:text-5xl">
            How Can We{' '}
            <span className="bg-gradient-to-r from-tp-bronze-ink to-tp-bronze bg-clip-text text-transparent">
              Help?
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-tp-muted">
            Find answers to common questions about {siteConfig.name}, from getting started to managing your account.
          </p>

          {/* Search bar */}
          <div className="mx-auto mt-8 max-w-xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-tp-muted" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for help..."
                className="w-full rounded-tp-button border border-tp-line bg-white py-3.5 pl-12 pr-4 text-base text-tp-ink placeholder:text-tp-muted/80 focus:border-tp-bronze-ink focus:outline-none focus:ring-2 focus:ring-tp-bronze-ink/20"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-tp-muted hover:text-tp-ink"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Category cards grid (shown when no search query) */}
      {!searchQuery.trim() && (
        <section className="bg-tp-paper/40 py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {helpCategories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.id}
                    onClick={() => scrollToCategory(cat.id)}
                    className="group flex flex-col items-start rounded-tp-card border border-tp-line bg-white p-6 text-left transition-all hover:border-tp-bronze/40 hover:shadow-md"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-tp-button bg-tp-paper">
                      <Icon className="h-5 w-5 text-tp-bronze-ink" />
                    </div>
                    <h2 className="mt-4 font-display font-normal text-lg text-tp-black">{cat.title}</h2>
                    <p className="mt-1.5 text-sm leading-relaxed text-tp-muted">{cat.description}</p>
                    <ul className="mt-3 space-y-1">
                      {cat.items.slice(0, 4).map((item) => (
                        <li key={item.question} className="text-[13px] leading-snug text-tp-ink/70">
                          {item.question}
                        </li>
                      ))}
                    </ul>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-tp-bronze-ink transition-all group-hover:gap-2">
                      View answers <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Search results count */}
      {searchQuery.trim() && (
        <div className="bg-tp-paper/40 pt-8">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <p className="text-sm text-tp-muted">
              {totalResults} result{totalResults !== 1 ? 's' : ''} found
            </p>
          </div>
        </div>
      )}

      {/* Q&A sections */}
      <section className={searchQuery.trim() ? 'bg-tp-paper/40 pb-16 pt-4 sm:pb-20' : 'py-16 sm:py-20'}>
        <div className="mx-auto max-w-3xl space-y-14 px-4 sm:px-6 lg:px-8">
          {filteredCategories.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-lg text-tp-muted">No results found for &quot;{searchQuery}&quot;</p>
              <p className="mt-2 text-sm text-tp-muted">
                Try a different search term or{' '}
                <Link href="/contact" className="font-medium text-tp-bronze-ink underline underline-offset-2">
                  contact support
                </Link>
                .
              </p>
            </div>
          )}

          {filteredCategories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div key={cat.id} id={cat.id} className="scroll-mt-24">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-tp-paper">
                    <Icon className="h-4 w-4 text-tp-bronze-ink" />
                  </div>
                  <h2 className="font-display font-normal text-2xl text-tp-black sm:text-3xl">{cat.title}</h2>
                </div>
                <div className="mt-6 divide-y divide-tp-line/50 rounded-tp-card border border-tp-line bg-white">
                  {cat.items.map((item) => {
                    const key = `${cat.id}-${item.question}`;
                    const isOpen = openQuestions.has(key);
                    return (
                      <div key={key} className="group">
                        <button
                          onClick={() => toggleQuestion(key)}
                          className="flex w-full cursor-pointer items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-tp-paper/50"
                          aria-expanded={isOpen}
                        >
                          <span className="text-base font-medium text-tp-black">{item.question}</span>
                          <ChevronDown
                            className={`h-5 w-5 shrink-0 text-tp-bronze-ink transition-transform duration-200 ${
                              isOpen ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                        <div
                          className={`grid transition-all duration-200 ${
                            isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                          }`}
                        >
                          <div className="overflow-hidden">
                            <p className="px-6 pb-5 text-base leading-relaxed text-tp-muted">{item.answer}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Contact support CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <div className="rounded-tp-card border border-tp-line bg-white p-10 sm:p-14">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-tp-paper">
              <Mail className="h-6 w-6 text-tp-bronze-ink" />
            </div>
            <h2 className="font-display font-normal mt-6 text-3xl text-tp-black">Still Need Help?</h2>
            <p className="mt-4 text-tp-muted">
              Can&apos;t find what you&apos;re looking for? Our support team is happy to help.
            </p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-tp-button bg-tp-black px-8 py-3 text-sm font-semibold text-tp-bronze shadow-sm transition-all hover:bg-tp-black/90"
              >
                Contact Support
              </Link>
              <Link
                href="/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots"
                className="inline-flex items-center justify-center rounded-tp-button border border-tp-line px-8 py-3 text-sm font-semibold text-tp-ink transition-all hover:bg-tp-paper"
              >
                Get Started
              </Link>
            </div>
            <p className="mt-6 text-sm text-tp-muted">
              Or email us directly at{' '}
              <a
                href={`mailto:${siteConfig.supportEmail}`}
                className="font-medium text-tp-bronze-ink underline underline-offset-2"
              >
                {siteConfig.supportEmail}
              </a>
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
