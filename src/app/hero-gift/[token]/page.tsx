import type { Metadata } from 'next';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import HeroGiftClient from './HeroGiftClient';

export const metadata: Metadata = {
  title: 'Add your message to a hero book | TailorPic',
  robots: { index: false, follow: false },
};

export default function HeroGiftPage({ params }: { params: { token: string } }) {
  return (
    <>
      <Header />
      <main className="min-h-[60vh] bg-tp-paper px-4 py-16 sm:px-6">
        <HeroGiftClient token={params.token} />
      </main>
      <Footer />
    </>
  );
}
