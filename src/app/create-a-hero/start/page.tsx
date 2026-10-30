import type { Metadata } from 'next';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { HeroWizard } from '../HeroWizard';

export const metadata: Metadata = {
  title: 'Start Your Story — Create a Hero | TailorPic',
  description:
    'Choose a universe, tell us about your hero, upload photos, and we\'ll create a personalized AI storybook in minutes.',
  alternates: { canonical: '/create-a-hero/start' },
};

export default function CreateAHeroStartPage() {
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
