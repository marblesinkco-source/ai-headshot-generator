import type { Metadata } from 'next';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { HeroWizard } from './HeroWizard';

export const metadata: Metadata = {
  title: 'Create a Hero — Personalized AI Storybook | TailorPic',
  description:
    'Turn anyone into the hero of their own epic story. AI-generated personalized storybooks — the perfect gift for birthdays, promotions, retirements, and more.',
  alternates: { canonical: '/create-a-hero' },
};

export default function CreateAHeroPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-tp-paper pt-24 pb-16">
        <HeroWizard />
      </main>
      <Footer />
    </>
  );
}
