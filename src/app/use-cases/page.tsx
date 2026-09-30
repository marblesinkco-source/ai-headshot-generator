import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { BreadcrumbSchema } from '@/components/structured-data';
import { siteConfig } from '@/config/site';
import {
  Briefcase, Heart, Dog, Users, Baby, GraduationCap,
  PartyPopper, Home as HomeIcon, Sparkles, Building2, ShoppingBag, ArrowRight,
  Presentation, FileText, Monitor, Target,
  Mic, CreditCard, Mail, BookOpen, TrendingUp, Shirt,
  Globe,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'AI Photo Use Cases | TailorPic',
  description:
    'Discover how professionals, families, and businesses use TailorPic AI photos. From LinkedIn headshots to pet portraits, find your perfect photo category.',
};

const useCases = [
  {
    icon: Briefcase,
    title: 'LinkedIn Headshots',
    description: 'Professional profile photos that make a strong first impression on recruiters and clients.',
    href: '/headshots',
    tag: 'Most Popular',
  },
  {
    icon: Building2,
    title: 'Corporate Team Photos',
    description: 'Consistent, branded headshots for your entire team. Perfect for company websites and directories.',
    href: '/linkedin-team',
    tag: 'Teams',
  },
  {
    icon: Heart,
    title: 'Dating Profile Photos',
    description: 'Natural, approachable photos that show the real you. Stand out on Tinder, Hinge, and Bumble.',
    href: '/dating',
    tag: 'Personal',
  },
  {
    icon: Dog,
    title: 'Pet Portraits',
    description: 'Turn your pet photos into stunning art. Custom styles from royal portraits to pop art.',
    href: '/pet-portraits',
    tag: 'Fun',
  },
  {
    icon: Baby,
    title: 'Baby Shower Invites',
    description: 'Beautiful, personalized baby shower invitation photos and announcement cards.',
    href: '/baby-shower',
    tag: 'Family',
  },
  {
    icon: GraduationCap,
    title: 'Graduation Photos',
    description: 'Celebrate your achievement with professional graduation portraits and announcements.',
    href: '/graduation',
    tag: 'Milestone',
  },
  {
    icon: PartyPopper,
    title: 'Holiday Cards',
    description: 'Festive, personalized holiday card photos for Christmas, Hanukkah, and New Year.',
    href: '/holiday-cards',
    tag: 'Seasonal',
  },
  {
    icon: Users,
    title: 'Family Portraits',
    description: 'Beautiful family portraits without the hassle of coordinating a professional shoot.',
    href: '/family-portraits',
    tag: 'Family',
  },
  {
    icon: Sparkles,
    title: 'Couple & Engagement',
    description: 'Romantic couple photos and engagement announcements. Save-the-dates made easy.',
    href: '/couple-engagement',
    tag: 'Love',
  },
  {
    icon: HomeIcon,
    title: 'Real Estate Agents',
    description: 'MLS-ready headshots that build trust with buyers and sellers. Professional, approachable.',
    href: '/real-estate',
    tag: 'Industry',
  },
  {
    icon: ShoppingBag,
    title: 'E-Commerce Products',
    description: 'White-background product photos for Amazon, Shopify, and Etsy. Marketplace-compliant.',
    href: '/ecommerce-product',
    tag: 'Business',
  },
  {
    icon: Users,
    title: 'Website Team Pages',
    description: 'Matching headshots for your About Us and Team page, even with a remote team.',
    href: '/use-cases/website-team-page',
    tag: 'Teams',
  },
  {
    icon: Presentation,
    title: 'Conference Speaker Bios',
    description: 'Speaker-ready photos for event sites, programs, and promo graphics.',
    href: '/use-cases/conference-speaker',
    tag: 'Professional',
  },
  {
    icon: FileText,
    title: 'Press Kits',
    description: 'High-resolution portraits journalists can publish with your story.',
    href: '/use-cases/press-kit',
    tag: 'Professional',
  },
  {
    icon: Monitor,
    title: 'Microsoft Teams Profile',
    description: 'A polished profile photo for Teams chats, meetings, and Outlook.',
    href: '/use-cases/microsoft-teams',
    tag: 'Business',
  },
  {
    icon: Target,
    title: 'Sales Decks & Proposals',
    description: 'Build trust on your pitch deck and proposal with a professional headshot.',
    href: '/use-cases/sales-deck',
    tag: 'Business',
  },
  {
    icon: Mic,
    title: "Podcast Cover Art",
    description: "Host portraits that stand out in Spotify and Apple Podcasts directories.",
    href: '/use-cases/podcast-cover',
    tag: 'Creators',
  },
  {
    icon: CreditCard,
    title: "Business Cards",
    description: "Print-ready headshots for business cards and digital card profiles.",
    href: '/use-cases/business-card',
    tag: 'Business',
  },
  {
    icon: GraduationCap,
    title: "Online Course Instructors",
    description: "Build student trust on Udemy, Teachable, and your own course site.",
    href: '/use-cases/online-course',
    tag: 'Creators',
  },
  {
    icon: Mail,
    title: "Newsletter Authors",
    description: "Put a face to your writing on Substack, Beehiiv, and Ghost.",
    href: '/use-cases/newsletter',
    tag: 'Creators',
  },
  {
    icon: FileText,
    title: "Annual Reports & Corporate Docs",
    description: "Consistent executive headshots for annual reports and investor materials.",
    href: '/use-cases/annual-report',
    tag: 'Business',
  },
  {
    icon: Heart,
    title: "Dating Profile Pictures",
    description: "Natural, flattering photos for Tinder, Hinge, and Bumble profiles.",
    href: '/use-cases/dating-profile-photo',
    tag: 'Personal',
  },
  {
    icon: GraduationCap,
    title: "Graduation Photo Headshots",
    description: "Polished portraits for graduation announcements and your first job search.",
    href: '/use-cases/graduation-photo',
    tag: 'Milestone',
  },
  {
    icon: Shirt,
    title: "Wedding & Event Guests",
    description: "Dressed-up portraits for weddings, parties, and celebrations.",
    href: '/use-cases/wedding-guest',
    tag: 'Events',
  },
  {
    icon: BookOpen,
    title: "Author Photos for Book Covers",
    description: "Author portraits for book jackets, Amazon author pages, and press.",
    href: '/use-cases/book-cover',
    tag: 'Creators',
  },
  {
    icon: TrendingUp,
    title: "Investor Pitch Decks",
    description: "Credible founder and team headshots for fundraising decks.",
    href: '/use-cases/investor-pitch',
    tag: 'Business',
  },
  {
    icon: Globe,
    title: "Portfolio Websites",
    description: "Professional portraits for your About page and personal site.",
    href: '/use-cases/portfolio-website',
    tag: 'Creators',
  },
  {
    icon: GraduationCap,
    title: "Alumni Directories",
    description: "Recognizable profile photos for alumni networks and reunions.",
    href: '/use-cases/alumni-directory',
    tag: 'Community',
  },
  {
    icon: Presentation,
    title: "Speaking Engagements",
    description: "Speaker-ready portraits for event pages, programs, and promo.",
    href: '/use-cases/speaking-engagement',
    tag: 'Professional',
  },
  {
    icon: Building2,
    title: "Company Intranets",
    description: "Consistent employee portraits for intranets and directories.",
    href: '/use-cases/company-intranet',
    tag: 'Teams',
  },
  {
    icon: Users,
    title: "Membership Directories",
    description: "Friendly, credible photos for associations and clubs.",
    href: '/use-cases/membership-directory',
    tag: 'Community',
  },
  {
    icon: HomeIcon,
    title: 'Real Estate Listing Photos',
    description: 'Agent headshots for listings, flyers and property pages that build trust with buyers.',
    href: '/use-cases/real-estate-listing',
    tag: 'Professional',
  },
  {
    icon: Heart,
    title: 'Nonprofit Fundraising',
    description: 'Approachable portraits for donor pages, appeals and board and staff bios.',
    href: '/use-cases/nonprofit-fundraising',
    tag: 'Community',
  },
  {
    icon: Users,
    title: 'Event Badge Photos',
    description: 'Clean, consistent portraits for conference badges, attendee profiles and speaker cards.',
    href: '/use-cases/event-badge',
    tag: 'Events',
  },
  {
    icon: BookOpen,
    title: 'Author Bio Photos',
    description: 'Polished author portraits for book jackets, publisher pages and Amazon profiles.',
    href: '/use-cases/author-bio',
    tag: 'Professional',
  },
  {
    icon: Briefcase,
    title: 'Job Application Photos',
    description: 'Professional portraits for applications, portfolios and career sites that help you stand out.',
    href: '/use-cases/job-application',
    tag: 'Career',
  },
  {
    icon: Target,
    title: 'Coaching Profile Photos',
    description: 'Warm, credible portraits for coaching sites, booking pages and program listings.',
    href: '/use-cases/coaching-profile',
    tag: 'Professional',
  },
  {
    icon: Heart,
    title: 'Volunteer Directory Photos',
    description: 'Friendly portraits for volunteer rosters, recognition pages and community directories.',
    href: '/use-cases/volunteer-directory',
    tag: 'Community',
  },
  {
    icon: Mic,
    title: 'Podcast Guest Bio Photos',
    description: 'Polished headshots ready for podcast guest pages, show notes and host requests.',
    href: '/use-cases/podcast-guest-bio',
    tag: 'Media',
  },
  {
    icon: Mail,
    title: 'Company Newsletter Photos',
    description: 'Consistent employee portraits for newsletters, spotlights and internal announcements.',
    href: '/use-cases/company-newsletter',
    tag: 'Teams',
  },
  {
    icon: Globe,
    title: 'Visa Application Photos',
    description: 'Clean, professional portraits for visa and immigration profiles. Always check official photo rules.',
    href: '/use-cases/visa-application',
    tag: 'Career',
  },
  {
    icon: Users,
    title: 'Church Directory Photos',
    description: 'Warm, consistent portraits for church and congregation directories.',
    href: '/use-cases/church-directory',
    tag: 'Directory',
  },
  {
    icon: Heart,
    title: 'Medical Staff Directory',
    description: 'Trustworthy headshots for hospital and clinic staff directories.',
    href: '/use-cases/medical-staff-directory',
    tag: 'Directory',
  },
  {
    icon: GraduationCap,
    title: 'School Yearbook Photos',
    description: 'Clean, consistent portraits for school yearbooks and staff pages.',
    href: '/use-cases/school-yearbook',
    tag: 'Directory',
  },
  {
    icon: Users,
    title: 'Sports Team Roster',
    description: 'Sharp, matching headshots for team rosters and league sites.',
    href: '/use-cases/sports-team-roster',
    tag: 'Directory',
  },
  {
    icon: Globe,
    title: 'Government ID Photos',
    description: 'Clean portraits for government profiles. Always check official photo rules.',
    href: '/use-cases/government-id-photo',
    tag: 'Directory',
  },
];

export default function UseCasesPage() {
  return (
    <main className="min-h-screen">
      <BreadcrumbSchema items={[
        { name: 'Home', url: siteConfig.url },
        { name: 'Use Cases', url: `${siteConfig.url}/use-cases` },
      ]} />
      <Header />

      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-14">
            <p className="text-sm font-semibold uppercase tracking-widest text-tp-bronze">
              Use Cases
            </p>
            <h1 className="mt-3 font-display text-4xl sm:text-5xl text-tp-ink tracking-tight">
              AI Photos for Every Occasion
            </h1>
            <p className="mt-4 text-lg text-tp-muted max-w-2xl mx-auto">
              From professional headshots to family portraits, TailorPic creates
              studio-quality photos tailored to your needs.
            </p>
          </div>

          {/* Grid */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {useCases.map((uc) => (
              <Link
                key={uc.title}
                href={uc.href}
                className="group relative rounded-2xl border border-tp-line bg-white p-6 transition-all hover:border-tp-bronze/40 hover:shadow-md hover:-translate-y-1"
              >
                <span className="absolute top-4 right-4 rounded-full bg-tp-paper border border-tp-line px-2.5 py-0.5 text-[10px] font-semibold text-tp-muted">
                  {uc.tag}
                </span>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-tp-black mb-4">
                  <uc.icon className="h-5 w-5 text-tp-bronze" />
                </div>
                <h2 className="text-base font-semibold text-tp-ink pr-16">{uc.title}</h2>
                <p className="mt-2 text-sm text-tp-muted leading-relaxed">
                  {uc.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-tp-bronze-ink group-hover:gap-2.5 transition-all">
                  Get Started <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 text-center">
            <p className="text-tp-muted mb-4">
              Don&apos;t see your use case? We&apos;re always adding new categories.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl border border-tp-line px-6 py-3 text-sm font-semibold text-tp-ink transition-all hover:bg-tp-paper"
            >
              Request a Category <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
