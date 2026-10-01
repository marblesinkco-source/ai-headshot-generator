import type { Metadata } from 'next';
import Link from 'next/link';
import { MailX } from 'lucide-react';
import { EmailCapture } from '@/components/marketing/email-capture';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Unsubscribed — TailorPic',
  robots: { index: false },
};

export default function UnsubscribedPage() {
  return (
    <main
      id="main-content"
      className="flex min-h-screen items-center justify-center bg-tp-paper px-4 py-16"
    >
      <div className="w-full max-w-md rounded-tp-card border border-tp-line bg-white p-8 text-center shadow-sm sm:p-10">
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-tp-card bg-tp-black">
          <MailX className="h-7 w-7 text-tp-bronze" aria-hidden="true" />
        </div>
        <h1 className="text-2xl font-display font-normal tracking-tight text-tp-ink sm:text-3xl">
          You&apos;ve been unsubscribed
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-tp-muted">
          You won&apos;t receive any more newsletter emails from {siteConfig.name}. Transactional
          emails about your orders will still reach you.
        </p>

        <div className="mt-8 border-t border-tp-line pt-6 text-left">
          <p className="mb-3 text-center text-sm font-semibold text-tp-ink">
            Changed your mind? Resubscribe
          </p>
          <EmailCapture />
        </div>

        <Link
          href="/"
          className="mt-6 inline-flex items-center justify-center rounded-xl bg-tp-black px-6 py-3 text-sm font-semibold text-tp-bronze transition-colors hover:bg-tp-ink"
        >
          Back to {siteConfig.name}
        </Link>
      </div>
    </main>
  );
}
