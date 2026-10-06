import type { Metadata } from 'next';
import Link from 'next/link';
import { Camera, Scissors, FileCheck, Calculator, Linkedin, Mail, Sparkles, SlidersHorizontal, Users, CheckSquare, CircleUser, AlignLeft } from 'lucide-react';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { ToolsIllustration } from '@/components/marketing/illustrations';
import { BreadcrumbSchema } from '@/components/structured-data';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: { absolute: 'Free AI Photo Tools: Background Remover, Resizer & More' },
  description:
    'Free online tools for professional photos: background remover, headshot resizer, resume photo checker, LinkedIn photo analyzer, email signature maker and more.',
  alternates: {
    canonical: '/tools',
  },
  openGraph: generateOGMetadata({
    title: 'Free AI Photo Tools',
    description:
      'Free online tools for professional photos — background remover, headshot resizer, resume photo checker, and more.',
    type: 'default',
    path: '/tools',
  }),
  twitter: generateTwitterMetadata({
    title: 'Free AI Photo Tools: Background Remover, Resizer & More',
    description:
      'Free online tools for professional photos — background remover, headshot resizer, resume photo checker, and more.',
  }),
};

const tools = [
  {
    title: 'AI Photo Editor',
    description:
      'Browse TailorPic\'s AI editing tools, including background changer, clothing changer, skin smoother, crop and resize, and more.',
    href: '/editor',
    icon: SlidersHorizontal,
  },
  {
    title: 'Background Remover',
    description:
      'Remove backgrounds from your photos instantly with AI. Perfect for creating professional headshots with clean backgrounds.',
    href: '/tools/background-remover',
    icon: Scissors,
  },
  {
    title: 'Headshot Resizer',
    description:
      'Resize and crop your headshots for LinkedIn, passports, company directories, and other platforms with pixel-perfect dimensions.',
    href: '/tools/headshot-resizer',
    icon: Camera,
  },
  {
    title: 'Resume Photo Checker',
    description:
      'Check if your photo meets professional standards for resumes and CVs. Get instant feedback on lighting, framing, and quality.',
    href: '/tools/resume-photo-checker',
    icon: FileCheck,
  },
  {
    title: 'LinkedIn Photo Analyzer',
    description:
      'Analyze your LinkedIn profile photo and get actionable tips to make a stronger first impression on recruiters and connections.',
    href: '/tools/linkedin-photo-analyzer',
    icon: Linkedin,
  },
  {
    title: 'Headshot Cost Calculator',
    description:
      'Compare the cost of traditional photography studios vs AI headshots. See how much you can save with TailorPic.',
    href: '/tools/headshot-cost-calculator',
    icon: Calculator,
  },
  {
    title: 'Email Signature Generator',
    description:
      'Create a professional email signature with your headshot, name, title, and contact info. Works with Gmail, Outlook, and more.',
    href: '/tools/email-signature-generator',
    icon: Mail,
  },
  {
    title: 'Team Headshot ROI Calculator',
    description:
      'Enter your team size and photographer quote to compare costs and time saved with TailorPic team pricing.',
    href: '/tools/team-headshot-calculator',
    icon: Users,
  },
  {
    title: 'LinkedIn Headline Generator',
    description:
      'Generate 5 LinkedIn headline ideas from your job title, industry and skills. Free, no account needed.',
    href: '/tools/linkedin-headline-generator',
    icon: Linkedin,
  },
  {
    title: 'LinkedIn About Generator',
    description:
      'Generate a professional LinkedIn About section from your job title, industry and skills. Pick a tone and get a polished draft.',
    href: '/tools/linkedin-about-generator',
    icon: AlignLeft,
  },
  {
    title: 'Photo Upload Checklist',
    description:
      'Go through 16 quick checks on lighting, composition, quality and subject before uploading your photos for AI headshots.',
    href: '/tools/photo-checklist',
    icon: CheckSquare,
  },
  {
    title: 'Profile Picture Maker',
    description:
      'Crop, resize and position your photo for any platform — LinkedIn, Instagram, Slack, Zoom and more. Download as PNG.',
    href: '/tools/pfp-maker',
    icon: CircleUser,
  },
];

export default function ToolsPage() {
  return (
    <>
      <Header />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'Free Tools', url: `${siteConfig.url}/tools` },
        ]}
      />
      <main id="main-content" className="min-h-screen bg-tp-paper">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-tp-line bg-tp-ink py-20 text-center">
          <div className="absolute inset-0 bg-grid opacity-30" />
          <div className="relative mx-auto max-w-3xl px-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-brand text-tp-bronze">
              Free Tools
            </p>
            <h1 className="font-display font-normal text-4xl italic text-tp-paper sm:text-5xl">
              Free AI Photo Tools
            </h1>
            <p className="mt-4 text-lg text-tp-beige/80">
              Professional photo tools you can use for free — no account
              needed.
            </p>
            <div className="mx-auto mt-8 max-w-sm">
              <ToolsIllustration className="w-full h-auto" />
            </div>
          </div>
        </section>

        {/* Tools Grid */}
        <section className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
          <Link
            href="/free-headshot-generator"
            className="group mb-6 flex flex-col gap-4 rounded-tp-card border border-tp-line bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-tp-bronze/10 sm:flex-row sm:items-center sm:p-8"
          >
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-tp-line bg-tp-paper/80 text-tp-bronze-ink">
              <Sparkles className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-semibold uppercase tracking-brand text-tp-bronze-ink">
                Featured
              </p>
              <h2 className="mt-1 font-display font-normal text-2xl text-tp-ink transition-colors group-hover:text-tp-bronze-ink">
                Free AI Headshot Generator
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-tp-muted">
                Upload a few selfies and get studio-style professional headshots
                for LinkedIn, resumes and more, without a photoshoot.
              </p>
            </div>
            <span className="inline-flex items-center gap-1 text-sm font-medium text-tp-bronze-ink">
              Try it free
              <svg
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </span>
          </Link>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool) => {
              const Icon = tool.icon;
              return (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="group rounded-tp-card border border-tp-line bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-tp-bronze/10"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-tp-line bg-tp-paper/80 text-tp-bronze-ink">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h2 className="font-display font-normal text-xl text-tp-ink group-hover:text-tp-bronze-ink transition-colors">
                    {tool.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-tp-muted">
                    {tool.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-tp-bronze-ink">
                    Try free
                    <svg
                      className="h-4 w-4 transition-transform group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                      />
                    </svg>
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-tp-line bg-white py-16 text-center">
          <div className="mx-auto max-w-2xl px-4">
            <h2 className="font-display font-normal text-3xl text-tp-ink sm:text-4xl">
              Want Studio-Quality AI Headshots?
            </h2>
            <p className="mt-3 text-tp-muted">
              Skip the photoshoot. Upload selfies and get 40+ professional
              headshots in hours, starting at just $1.99.
            </p>
            <Link
              href="/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots"
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-tp-button bg-tp-black px-8 py-3.5 text-sm font-semibold text-tp-bronze transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              Get Your AI Headshots
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
