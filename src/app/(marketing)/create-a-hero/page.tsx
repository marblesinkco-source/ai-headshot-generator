import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { buttonVariants } from '@/components/ui/button';
import { FAQSchema } from '@/components/structured-data';
import {
  HERO_DIGITAL_PRICE_CENTS,
  HERO_MAX_PAGES,
  HERO_MAX_PHOTOS,
  HERO_MIN_PAGES,
  HERO_MIN_PHOTOS,
  HERO_OCCASIONS,
  HERO_PHOTO_RETENTION_DAYS,
  HERO_PREVIEW_PAGES,
  HERO_UNIVERSES,
} from '@/config/hero';
import { formatPrice } from '@/lib/utils';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';
import { ArrowRight, BookOpen, Camera, Gift, MessageSquareHeart, Shield, Sparkles } from 'lucide-react';

const PRICE = formatPrice(HERO_DIGITAL_PRICE_CENTS);
const START_HREF = '/auth/register?redirect=/dashboard/hero/new';

export const metadata: Metadata = {
  title: { absolute: 'Create a Hero: A Personalised Hero Story Book Starring Them | TailorPic' },
  description: `Turn a friend, colleague or child into the hero of an illustrated ${HERO_MIN_PAGES}–${HERO_MAX_PAGES} page story book, drawn with their own face. Read the first ${HERO_PREVIEW_PAGES} pages free.`,
  alternates: { canonical: '/create-a-hero' },
  openGraph: generateOGMetadata({
    title: 'Create a Hero | TailorPic',
    description: 'A personalised illustrated story book where they are the hero. First pages free.',
    path: '/create-a-hero',
  }),
  twitter: generateTwitterMetadata({
    title: 'Create a Hero | TailorPic',
    description: 'A personalised illustrated story book where they are the hero. First pages free.',
  }),
};

const steps = [
  {
    icon: Camera,
    title: `Add ${HERO_MIN_PHOTOS}–${HERO_MAX_PHOTOS} photos`,
    body: 'Clear photos of their face from a few angles. You confirm you have their permission.',
  },
  {
    icon: MessageSquareHeart,
    title: 'Answer a few questions',
    body: 'Their job, hobbies, a funny habit, their "superpower", the thing they always say.',
  },
  {
    icon: Sparkles,
    title: 'Pick a universe',
    body: 'We write an original adventure and illustrate every page with their face.',
  },
  {
    icon: BookOpen,
    title: `Read ${HERO_PREVIEW_PAGES} pages free`,
    body: `Like it? Unlock the whole book for ${PRICE}.`,
  },
];

const faqs = [
  {
    question: 'Who is it for?',
    answer: `Children and adults. Occasions include ${HERO_OCCASIONS.map((o) => o.label.toLowerCase()).join(', ')}.`,
  },
  {
    question: 'What happens to the photos?',
    answer: `They are stored privately, used only to illustrate this book, never used to train AI models, and deleted ${HERO_PHOTO_RETENTION_DAYS} days after upload. You must be the person in the photos or have their permission.`,
  },
  {
    question: 'Can the team join in?',
    answer:
      'Yes. Share the group gift link and colleagues or family can add a memory or a message. Their messages are printed in a "From your team" section at the end of the book.',
  },
  {
    question: 'Are the characters from films or comics?',
    answer:
      'No. Every universe, character, costume and place is original. We do not use characters, names or logos from existing films, comics, games or brands.',
  },
  {
    question: 'Is there a printed hardcover?',
    answer: 'Not yet. A printed hardcover is in preparation; today you get the digital book, which you can read online and save as a PDF.',
  },
];

export default function CreateAHeroPage() {
  return (
    <>
      <Header />
      <FAQSchema items={faqs} />
      <main className="bg-tp-paper">
        <section className="mx-auto max-w-5xl px-4 pb-16 pt-16 text-center sm:px-6 sm:pt-24">
          <p className="text-sm font-medium uppercase tracking-wider text-tp-bronze-ink">Create a Hero</p>
          <h1 className="mt-4 font-display text-4xl font-normal leading-tight text-tp-ink sm:text-6xl">
            Make them the hero of their own story book
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-tp-muted">
            An original, illustrated {HERO_MIN_PAGES}–{HERO_MAX_PAGES} page adventure starring a friend, a colleague or your
            child, drawn with their own face and full of the details only you know.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href={START_HREF} className={buttonVariants({ variant: 'primary', size: 'lg' })}>
              Start your hero book <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
            </Link>
            <p className="text-sm text-tp-muted">
              First {HERO_PREVIEW_PAGES} pages free · full digital book {PRICE}
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-4 pb-16 sm:px-6" aria-labelledby="how">
          <h2 id="how" className="text-center font-display text-3xl font-normal text-tp-ink">
            How it works
          </h2>
          <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <li key={s.title} className="rounded-tp-card border border-tp-line bg-white p-6">
                <s.icon className="h-6 w-6 text-tp-bronze-ink" aria-hidden />
                <p className="mt-4 text-xs font-medium text-tp-muted">Step {i + 1}</p>
                <h3 className="mt-1 text-base font-semibold text-tp-ink">{s.title}</h3>
                <p className="mt-2 text-sm text-tp-muted">{s.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="bg-tp-beige/40 py-16" aria-labelledby="universes">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <h2 id="universes" className="text-center font-display text-3xl font-normal text-tp-ink">
              Six original universes
            </h2>
            <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {HERO_UNIVERSES.map((u) => (
                <li key={u.id} className="rounded-tp-card border border-tp-line bg-white p-6">
                  <h3 className="text-base font-semibold text-tp-ink">{u.name}</h3>
                  <p className="mt-2 text-sm text-tp-muted">{u.tagline}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6" aria-labelledby="group">
          <div className="grid items-center gap-8 rounded-tp-card border border-tp-line bg-white p-8 sm:grid-cols-[auto,1fr]">
            <Gift className="h-10 w-10 text-tp-bronze-ink" aria-hidden />
            <div>
              <h2 id="group" className="font-display text-3xl font-normal text-tp-ink">
                A group gift the whole team can sign
              </h2>
              <p className="mt-3 text-tp-muted">
                Leaving do, promotion or retirement? Start the book, share one link, and everyone adds a memory or a message
                without creating an account. Their words close the book in a &ldquo;From your team&rdquo; section.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-4 pb-16 sm:px-6" aria-labelledby="faq">
          <h2 id="faq" className="text-center font-display text-3xl font-normal text-tp-ink">
            Questions
          </h2>
          <dl className="mt-8 space-y-6">
            {faqs.map((f) => (
              <div key={f.question}>
                <dt className="font-semibold text-tp-ink">{f.question}</dt>
                <dd className="mt-1 text-tp-muted">{f.answer}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-10 flex items-center justify-center gap-2 text-center text-sm text-tp-muted">
            <Shield className="h-4 w-4" aria-hidden /> Photos are private and deleted after {HERO_PHOTO_RETENTION_DAYS} days.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
