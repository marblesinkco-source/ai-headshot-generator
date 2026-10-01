import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { BreadcrumbSchema } from '@/components/structured-data';
import { siteConfig } from '@/config/site';
import { Building2, Scale, ShoppingBag, Stethoscope, Lightbulb, Calculator, ArrowRight, Heart, Zap, Monitor, GraduationCap, Camera, Clapperboard, SmilePlus, TrendingUp, Ruler, Target, Brain, Dumbbell, Music, PawPrint, Users, Handshake, Mic, Palette, Newspaper, Shield, Plane, Calendar, BookOpen, Leaf, Globe, BarChart3, Award, Briefcase, FileCheck, UserCheck, Star } from 'lucide-react';

export const metadata: Metadata = {
  title: 'AI Photos by Industry | TailorPic',
  description:
    'Professional AI-generated photos tailored for your industry. Real estate, legal, healthcare, nursing, engineering, education, consulting, accounting, photography, acting, dental, financial advisory, architecture, coaching, therapy, fitness, music, veterinary, pharmacy, aviation, event planning, marketing, writing, chiropractic, insurance, nutrition, social work, translation, psychology, real estate brokerage, cabin crew, graphic design, data science, barbering, floristry, bartending, tattooing, security and more.',
};

const industries = [
  {
    icon: Building2,
    name: 'Real Estate',
    description:
      'Professional headshots that build trust with buyers and sellers. MLS-ready, team-consistent photos.',
    href: '/industries/real-estate',
    cta: 'For Agents',
  },
  {
    icon: Scale,
    name: 'Law Firms',
    description:
      'Authoritative portraits for attorneys and partners. Bar-compliant, firm-wide consistency.',
    href: '/industries/lawyers',
    cta: 'For Attorneys',
  },
  {
    icon: ShoppingBag,
    name: 'E-Commerce',
    description:
      'Studio-quality product photos for your online store. Marketplace-ready for Amazon, Shopify, Etsy.',
    href: '/industries/ecommerce',
    cta: 'For Sellers',
  },
  {
    icon: Stethoscope,
    name: 'Healthcare',
    description:
      'Trustworthy headshots for doctors, dentists, and medical professionals. HIPAA-conscious, patient-friendly.',
    href: '/industries/doctors',
    cta: 'For Doctors',
  },
  {
    icon: Lightbulb,
    name: 'Consultants',
    description:
      'Executive portraits that convey expertise and credibility. Perfect for advisory firms and freelance consultants.',
    href: '/industries/consultants',
    cta: 'For Consultants',
  },
  {
    icon: Calculator,
    name: 'Accountants',
    description:
      'Professional headshots for CPAs and financial professionals. Build client trust with polished, consistent imagery.',
    href: '/industries/accountants',
    cta: 'For Accountants',
  },
  {
    icon: Heart,
    name: 'Nurses',
    description:
      'Professional headshots for nurses and healthcare staff. Hospital ID-ready, LinkedIn-polished, team-consistent.',
    href: '/industries/nurses',
    cta: 'For Nurses',
  },
  {
    icon: Monitor,
    name: 'Engineers',
    description:
      'Professional headshots for software, civil and mechanical engineers. Perfect for LinkedIn, GitHub and conference bios.',
    href: '/industries/engineers',
    cta: 'For Engineers',
  },
  {
    icon: GraduationCap,
    name: 'Teachers',
    description:
      'Professional headshots for teachers and educators. School websites, academic profiles and conference materials.',
    href: '/industries/teachers',
    cta: 'For Teachers',
  },
  {
    icon: Camera,
    name: 'Photographers',
    description:
      'Professional headshots for photographers and creatives. Portfolio-ready, brand-consistent imagery for your own marketing.',
    href: '/industries/photographers',
    cta: 'For Photographers',
  },
  {
    icon: Clapperboard,
    name: 'Actors',
    description:
      'Casting-ready headshots for actors and performers. Multiple looks, expressions and styling for auditions and reels.',
    href: '/industries/actors',
    cta: 'For Actors',
  },
  {
    icon: SmilePlus,
    name: 'Dentists',
    description:
      'Trustworthy headshots for dentists and dental professionals. Patient-friendly portraits for practice websites and directories.',
    href: '/industries/dentists',
    cta: 'For Dentists',
  },
  {
    icon: TrendingUp,
    name: 'Financial Advisors',
    description:
      'Credible, polished headshots for financial advisors and wealth managers. Build client trust with professional imagery.',
    href: '/industries/financial-advisors',
    cta: 'For Advisors',
  },
  {
    icon: Ruler,
    name: 'Architects',
    description:
      'Professional headshots for architects and designers. Portfolio-ready imagery for firm websites and industry publications.',
    href: '/industries/architects',
    cta: 'For Architects',
  },
  {
    icon: Target,
    name: 'Coaches',
    description:
      'Professional headshots for life coaches and business consultants. Build credibility for your website, speaking engagements and social media.',
    href: '/industries/coaches',
    cta: 'For Coaches',
  },
  {
    icon: BookOpen,
    name: 'Professors',
    description:
      'Professional headshots for professors and academics. Polished portraits for faculty pages, conference bios and research profiles.',
    href: '/industries/professors',
    cta: 'For Professors',
  },
  {
    icon: UserCheck,
    name: 'Recruiters',
    description:
      'Approachable headshots for recruiters and talent professionals. Build candidate trust on LinkedIn and in every outreach message.',
    href: '/industries/recruiters',
    cta: 'For Recruiters',
  },
  {
    icon: Award,
    name: 'Public Speakers',
    description:
      'Media-kit-ready headshots for keynote speakers and trainers. Keep a polished portrait ready for event programs and speaker bureaus.',
    href: '/industries/public-speakers',
    cta: 'For Speakers',
  },
  {
    icon: Briefcase,
    name: 'Executives',
    description:
      'Authoritative headshots for C-suite executives. Leadership-page-ready portraits for investor materials, press and LinkedIn.',
    href: '/industries/executives',
    cta: 'For Executives',
  },
  {
    icon: FileCheck,
    name: 'Notaries',
    description:
      'Trustworthy headshots for notaries and legal professionals. Build client confidence on websites, directories and business cards.',
    href: '/industries/notaries',
    cta: 'For Notaries',
  },
  {
    icon: Brain,
    name: 'Therapists',
    description:
      'Warm, approachable headshots for therapists and counselors. Create trust before the first session with calming, professional portraits.',
    href: '/industries/therapists',
    cta: 'For Therapists',
  },
  {
    icon: Dumbbell,
    name: 'Fitness Trainers',
    description:
      'Dynamic headshots for personal trainers and fitness professionals. Energetic, confident portraits for gym profiles and social media.',
    href: '/industries/fitness-trainers',
    cta: 'For Trainers',
  },
  {
    icon: Music,
    name: 'Musicians',
    description:
      'Creative headshots for musicians and artists. Album-ready, press kit and social media portraits that capture your artistic identity.',
    href: '/industries/musicians',
    cta: 'For Musicians',
  },
  {
    icon: PawPrint,
    name: 'Veterinarians',
    description:
      'Trustworthy headshots for veterinarians and animal care professionals. Warm, approachable portraits for clinic websites and directories.',
    href: '/industries/veterinarians',
    cta: 'For Vets',
  },
  {
    icon: Users,
    name: 'HR Professionals',
    description:
      'Professional headshots for HR managers and recruiters. Build trust with candidates and colleagues through polished, approachable portraits.',
    href: '/industries/hr-professionals',
    cta: 'For HR',
  },
  {
    icon: Handshake,
    name: 'Sales Professionals',
    description:
      'Confident, trustworthy headshots for sales teams. Close more deals with professional portraits that build instant credibility.',
    href: '/industries/sales-professionals',
    cta: 'For Sales',
  },
  {
    icon: Mic,
    name: 'Podcasters',
    description:
      'Eye-catching headshots for podcasters and content creators. Perfect for show art, guest bios and social media promotion.',
    href: '/industries/podcasters',
    cta: 'For Podcasters',
  },
  {
    icon: Palette,
    name: 'Interior Designers',
    description:
      'Creative, polished headshots for interior designers. Portfolio-ready portraits for firm websites and design publications.',
    href: '/industries/interior-designers',
    cta: 'For Designers',
  },
  {
    icon: Newspaper,
    name: 'Journalists',
    description:
      'Professional headshots for journalists and media professionals. Byline-ready portraits for articles, broadcasts and press credentials.',
    href: '/industries/journalists',
    cta: 'For Journalists',
  },
  {
    icon: Shield,
    name: 'Pharmacists',
    description:
      'Trustworthy headshots for pharmacists and pharmacy teams. Patient-friendly portraits for pharmacy websites, directories and LinkedIn.',
    href: '/industries/pharmacists',
    cta: 'For Pharmacists',
  },
  {
    icon: Plane,
    name: 'Pilots & Aviation',
    description:
      'Confident headshots for pilots and aviation professionals. Sharp portraits for airline applications, crew profiles and LinkedIn.',
    href: '/industries/pilots',
    cta: 'For Pilots',
  },
  {
    icon: Calendar,
    name: 'Event Planners',
    description:
      'Polished, personable headshots for event and wedding planners. Win clients with portraits for your website, proposals and vendor listings.',
    href: '/industries/event-planners',
    cta: 'For Planners',
  },
  {
    icon: TrendingUp,
    name: 'Marketing Professionals',
    description:
      'Modern headshots for marketers and brand leaders. Build your personal brand on LinkedIn, speaker pages and agency sites.',
    href: '/industries/marketing-professionals',
    cta: 'For Marketers',
  },
  {
    icon: BookOpen,
    name: 'Authors & Writers',
    description:
      'Author photos for novelists, nonfiction writers and bloggers. Book-jacket, Amazon author page and press kit ready.',
    href: '/industries/authors',
    cta: 'For Authors',
  },
  {
    icon: Heart,
    name: 'Chiropractors',
    description:
      'Professional headshots for chiropractors and clinics. Patient-friendly portraits for practice websites and Google profiles.',
    href: '/industries/chiropractors',
    cta: 'For Chiropractors',
  },
  {
    icon: Shield,
    name: 'Insurance Agents',
    description:
      'Trustworthy headshots for insurance agents and brokers. Agency-ready portraits for websites, cards and LinkedIn.',
    href: '/industries/insurance-agents',
    cta: 'For Agents',
  },
  {
    icon: Leaf,
    name: 'Nutritionists',
    description:
      'Fresh, approachable headshots for nutritionists and dietitians. Ideal for practice sites, telehealth and social media.',
    href: '/industries/nutritionists',
    cta: 'For Nutritionists',
  },
  {
    icon: Users,
    name: 'Social Workers',
    description:
      'Warm, credible headshots for social workers and case managers. Polished for LinkedIn, agency pages and practice profiles.',
    href: '/industries/social-workers',
    cta: 'For Social Workers',
  },
  {
    icon: Globe,
    name: 'Translators',
    description:
      'Professional headshots for translators and interpreters. Marketplace-ready portraits for ProZ, LinkedIn and portfolio sites.',
    href: '/industries/translators',
    cta: 'For Translators',
  },
  {
    icon: Brain,
    name: "Psychologists",
    description:
      "Warm, credible headshots for clinical and counseling psychologists. Practice-website and directory ready.",
    href: '/industries/psychologists',
    cta: "For Psychologists",
  },
  {
    icon: Building2,
    name: "Real Estate Brokers",
    description:
      "Confident portraits for brokers and brokerage owners. Listings, signage and team pages.",
    href: '/industries/real-estate-brokers',
    cta: "For Brokers",
  },
  {
    icon: Plane,
    name: "Flight Attendants",
    description:
      "Polished, friendly headshots for cabin crew. Airline applications and LinkedIn ready.",
    href: '/industries/flight-attendants',
    cta: "For Cabin Crew",
  },
  {
    icon: Palette,
    name: "Graphic Designers",
    description:
      "Distinctive portraits for designers. Portfolio, Behance and LinkedIn ready.",
    href: '/industries/graphic-designers',
    cta: "For Designers",
  },
  {
    icon: BarChart3,
    name: "Data Scientists",
    description:
      "Sharp, approachable headshots for data scientists and ML engineers. LinkedIn, GitHub and conference bios.",
    href: '/industries/data-scientists',
    cta: "For Data Scientists",
  },
  {
    icon: Lightbulb,
    name: 'Scientists',
    description:
      'Professional headshots for scientists and researchers. Polished portraits for lab pages, grant applications and conference bios.',
    href: '/industries/scientists',
    cta: 'For Scientists',
  },
  {
    icon: Handshake,
    name: 'Politicians',
    description:
      'Professional headshots for politicians and candidates. Trustworthy portraits for campaign sites, official profiles and press kits.',
    href: '/industries/politicians',
    cta: 'For Politicians',
  },
  {
    icon: Heart,
    name: 'Chefs',
    description:
      'Professional headshots for chefs and culinary professionals. Portraits for restaurant sites, press features and social media.',
    href: '/industries/chefs',
    cta: 'For Chefs',
  },
  {
    icon: Camera,
    name: 'Models',
    description:
      'Professional headshots for models and talent. Clean portraits for agency submissions, portfolios and comp cards.',
    href: '/industries/models',
    cta: 'For Models',
  },
  {
    icon: Dumbbell,
    name: 'Personal Trainers',
    description:
      'Professional headshots for personal trainers. Energetic portraits for gym profiles, booking pages and social media.',
    href: '/industries/personal-trainers',
    cta: 'For Trainers',
  },
  {
    icon: BookOpen,
    name: 'Librarians',
    description:
      'Friendly headshots for public, academic and school librarians. Portraits for staff directories, library sites and LinkedIn.',
    href: '/industries/librarians',
    cta: 'For Librarians',
  },
  {
    icon: Shield,
    name: 'Firefighters',
    description:
      'Confident headshots for firefighters and fire officers. Portraits for department rosters, promotion packets and career profiles.',
    href: '/industries/firefighters',
    cta: 'For Firefighters',
  },
  {
    icon: Heart,
    name: 'Paramedics',
    description:
      'Credible headshots for paramedics and EMTs. Approachable portraits for agency pages, credentialing and job applications.',
    href: '/industries/paramedics',
    cta: 'For Paramedics',
  },
  {
    icon: Zap,
    name: 'Electricians',
    description:
      'Professional headshots for electricians and contractors. Build customer trust on your website, Google profile and estimates.',
    href: '/industries/electricians',
    cta: 'For Electricians',
  },
  {
    icon: Briefcase,
    name: 'Plumbers',
    description:
      'Professional headshots for plumbers and plumbing contractors. Friendly portraits for websites, local listings and quotes.',
    href: '/industries/plumbers',
    cta: 'For Plumbers',
  },
  {
    icon: Users,
    name: 'Barbers',
    description:
      'Professional headshots for barbers and barbershop owners. Sharp portraits for booking pages, shop websites and Instagram.',
    href: '/industries/barbers',
    cta: 'For Barbers',
  },
  {
    icon: Heart,
    name: 'Florists',
    description:
      'Professional headshots for florists and floral designers. Warm portraits for wedding inquiries, shop sites and social media.',
    href: '/industries/florists',
    cta: 'For Florists',
  },
  {
    icon: Star,
    name: 'Bartenders',
    description:
      'Professional headshots for bartenders and mixologists. Polished portraits for resumes, LinkedIn and event bookings.',
    href: '/industries/bartenders',
    cta: 'For Bartenders',
  },
  {
    icon: Award,
    name: 'Tattoo Artists',
    description:
      'Professional headshots for tattoo artists and studio owners. Confident portraits for portfolios, booking pages and social profiles.',
    href: '/industries/tattoo-artists',
    cta: 'For Tattoo Artists',
  },
  {
    icon: Shield,
    name: 'Security Guards',
    description:
      'Professional headshots for security guards and officers. Credible portraits for resumes, LinkedIn and company profiles.',
    href: '/industries/security-guards',
    cta: 'For Security Pros',
  },
  {
    icon: Music,
    name: 'DJs',
    description:
      'Professional headshots for DJs and producers. Press-kit ready portraits for booking pages, lineups and social profiles.',
    href: '/industries/djs',
    cta: 'For DJs',
  },
  {
    icon: Palette,
    name: 'Makeup Artists',
    description:
      'Professional headshots for makeup artists. Polished portraits for portfolios, booking pages and Instagram.',
    href: '/industries/makeup-artists',
    cta: 'For Makeup Artists',
  },
  {
    icon: Globe,
    name: 'Tour Guides',
    description:
      'Professional headshots for tour guides. Friendly portraits for booking platforms, guide profiles and websites.',
    href: '/industries/tour-guides',
    cta: 'For Tour Guides',
  },
  {
    icon: Heart,
    name: 'Life Coaches',
    description:
      'Professional headshots for life coaches. Warm, credible portraits for websites, programs and social media.',
    href: '/industries/life-coaches',
    cta: 'For Life Coaches',
  },
  {
    icon: Leaf,
    name: 'Yoga Instructors',
    description:
      'Professional headshots for yoga instructors. Calm, welcoming portraits for studio pages and class schedules.',
    href: '/industries/yoga-instructors',
    cta: 'For Yoga Instructors',
  },
];

export default function IndustriesPage() {
  return (
    <main id="main-content" className="min-h-screen">
      <BreadcrumbSchema items={[
        { name: 'Home', url: siteConfig.url },
        { name: 'Industries', url: `${siteConfig.url}/industries` },
      ]} />
      <Header />

      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold uppercase tracking-widest text-tp-bronze">
              Industries
            </p>
            <h1 className="mt-3 font-display text-4xl sm:text-5xl text-tp-ink tracking-tight">
              AI Photos for Every Industry
            </h1>
            <p className="mt-4 text-lg text-tp-muted max-w-2xl mx-auto">
              Tailored solutions for professionals who need studio-quality photos without the studio.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((ind) => (
              <Link
                key={ind.name}
                href={ind.href}
                className="group rounded-2xl border border-tp-line bg-white p-7 transition-all hover:border-tp-bronze/40 hover:shadow-md hover:-translate-y-1"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-tp-black mb-5">
                  <ind.icon className="h-6 w-6 text-tp-bronze" />
                </div>
                <h2 className="text-xl font-semibold text-tp-ink">{ind.name}</h2>
                <p className="mt-2 text-sm text-tp-muted leading-relaxed">
                  {ind.description}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-tp-bronze-ink group-hover:gap-2.5 transition-all">
                  {ind.cta} <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
