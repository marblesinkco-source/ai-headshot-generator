import type { Metadata } from 'next';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { ContributionForm } from './ContributionForm';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Contribute to a Hero Story — TailorPic',
  description:
    'Share a memory, funny story, or heartfelt message to be included in a personalized storybook.',
};

interface Props {
  params: Promise<{ token: string }>;
}

export default async function GroupGiftPage({ params }: Props) {
  const { token } = await params;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-tp-paper pt-24 pb-16">
        <ContributionForm token={token} />
      </main>
      <Footer />
    </>
  );
}
