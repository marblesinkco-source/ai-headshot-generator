import Link from 'next/link';
import { redirect } from 'next/navigation';
import { buttonVariants } from '@/components/ui/button';
import { getHeroUniverse } from '@/config/hero';
import { createClient } from '@/lib/supabase/server';
import { heroDb } from '@/lib/hero/db';

export const metadata = { title: 'Hero books' };
export const dynamic = 'force-dynamic';

export default async function HeroBooksPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect('/auth/login?redirect=/dashboard/hero');

  const { data: books } = await heroDb()
    .from('hero_books')
    .select('id, status, universe, answers, story, paid_digital, created_at')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(50);

  return (
    <div className="mx-auto max-w-3xl">
      <div className="flex items-center justify-between gap-4">
        <h1 className="font-display text-3xl font-normal text-tp-ink">Hero books</h1>
        <Link href="/dashboard/hero/new" className={buttonVariants({ variant: 'primary', size: 'md' })}>
          New hero book
        </Link>
      </div>
      {!books?.length ? (
        <p className="mt-8 text-tp-muted">
          No books yet. Turn someone into the hero of an illustrated story book; the first pages are free.
        </p>
      ) : (
        <ul className="mt-8 divide-y divide-tp-line rounded-tp-card border border-tp-line bg-white">
          {books.map((b) => (
            <li key={b.id}>
              <Link href={`/dashboard/hero/${b.id}`} className="flex items-center justify-between gap-4 p-4 hover:bg-tp-paper">
                <span>
                  <span className="block font-medium text-tp-ink">
                    {(b.story as { title?: string } | null)?.title ?? `${(b.answers as Record<string, string>)?.name ?? 'Untitled'}'s hero book`}
                  </span>
                  <span className="text-sm text-tp-muted">{getHeroUniverse(b.universe)?.name}</span>
                </span>
                <span className="text-xs text-tp-muted">{b.paid_digital ? 'Full book' : 'Preview'}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
