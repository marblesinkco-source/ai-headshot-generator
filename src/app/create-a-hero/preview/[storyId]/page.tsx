import type { Metadata } from 'next';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { StoryPreview } from './StoryPreview';

export const metadata: Metadata = {
  title: 'Preview Your Story — Create a Hero | TailorPic',
  description: 'Preview the first pages of your personalized AI storybook before purchasing.',
};

interface Props {
  params: Promise<{ storyId: string }>;
}

export default async function PreviewPage({ params }: Props) {
  const { storyId } = await params;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-tp-paper pt-24 pb-16">
        <StoryPreview storyId={storyId} />
      </main>
      <Footer />
    </>
  );
}
