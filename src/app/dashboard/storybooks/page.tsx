import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { HERO_UNIVERSES, HERO_OCCASIONS } from '@/config/hero-storybook';

export const metadata: Metadata = {
  title: 'My Storybooks',
};

export const dynamic = 'force-dynamic';

interface StoryRow {
  id: string;
  hero_name: string | null;
  universe_id: string | null;
  occasion_id: string | null;
  status: string | null;
  created_at: string;
  generation_progress: number | null;
}

const STATUS_STYLES: Record<string, { label: string; className: string }> = {
  draft: { label: 'Draft', className: 'bg-tp-beige text-tp-muted border-tp-line' },
  preview: { label: 'Preview', className: 'bg-amber-50 text-tp-bronze-ink border-tp-bronze/40' },
  paid: { label: 'Paid', className: 'bg-blue-50 text-blue-700 border-blue-200' },
  generating: {
    label: 'Generating',
    className: 'bg-yellow-50 text-yellow-800 border-yellow-200 animate-pulse',
  },
  completed: { label: 'Completed', className: 'bg-green-50 text-green-700 border-green-200' },
  failed: { label: 'Failed', className: 'bg-red-50 text-red-700 border-red-200' },
};

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

export default async function StorybooksPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth/login');
  }

  const { data, error } = await supabase
    .from('hero_stories')
    .select('id, hero_name, universe_id, occasion_id, status, created_at, generation_progress')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  const stories = (data ?? []) as StoryRow[];

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display font-normal text-3xl text-tp-black sm:text-4xl">
            My Storybooks
          </h1>
          <p className="mt-1 text-sm text-tp-muted">
            Personalized hero stories you have created.
          </p>
        </div>
        <Link
          href="/create-a-hero/start"
          className="inline-flex items-center justify-center rounded-tp-button bg-tp-black px-5 py-3 text-sm font-semibold text-tp-paper transition-colors hover:bg-tp-ink"
        >
          Create New Story
        </Link>
      </div>

      {error && (
        <div
          role="alert"
          className="mb-6 rounded-tp-card border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          We could not load your storybooks. Please refresh the page.
        </div>
      )}

      {stories.length === 0 && !error ? (
        <div className="rounded-tp-card border border-tp-line bg-tp-paper px-6 py-16 text-center">
          <div className="text-5xl" aria-hidden="true">
            📖
          </div>
          <h2 className="mt-4 font-display font-normal text-2xl text-tp-black">
            No storybooks yet
          </h2>
          <p className="mx-auto mt-2 max-w-sm text-sm text-tp-muted">
            Turn someone into the hero of their own illustrated adventure.
          </p>
          <Link
            href="/create-a-hero/start"
            className="mt-6 inline-flex items-center justify-center rounded-tp-button bg-tp-black px-5 py-3 text-sm font-semibold text-tp-paper transition-colors hover:bg-tp-ink"
          >
            Create your first story
          </Link>
        </div>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2">
          {stories.map((story) => {
            const universe = HERO_UNIVERSES.find((u) => u.id === story.universe_id);
            const occasion = HERO_OCCASIONS.find((o) => o.id === story.occasion_id);
            const status = STATUS_STYLES[story.status ?? 'draft'] ?? STATUS_STYLES.draft;
            const heroName = story.hero_name?.trim() || 'Untitled hero';
            const title = universe ? `${heroName} · ${universe.name}` : heroName;

            return (
              <li key={story.id}>
                <Link
                  href={`/create-a-hero/preview/${story.id}`}
                  className="group flex h-full items-start gap-4 rounded-tp-card border border-tp-line bg-tp-paper p-5 transition-colors hover:border-tp-bronze"
                >
                  <div
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-tp-button bg-tp-beige text-3xl"
                    aria-hidden="true"
                  >
                    {universe?.icon ?? '📖'}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <h2 className="truncate text-base font-semibold text-tp-black group-hover:text-tp-bronze-ink">
                        {title}
                      </h2>
                      <span
                        className={`shrink-0 rounded-full border px-2.5 py-0.5 text-xs font-medium ${status.className}`}
                      >
                        {status.label}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-tp-muted">
                      {occasion ? `${occasion.icon} ${occasion.name} · ` : ''}
                      {formatDate(story.created_at)}
                    </p>
                    {story.status === 'generating' && typeof story.generation_progress === 'number' && (
                      <p className="mt-2 text-xs text-tp-muted">
                        {Math.round(story.generation_progress)}% complete
                      </p>
                    )}
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
