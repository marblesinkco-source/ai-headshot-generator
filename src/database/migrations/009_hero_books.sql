-- "Create a Hero" personalised story books + group-gift contributions.
-- All reads and writes go through server routes with the service role, so RLS
-- is enabled with owner-read policies only (no anon access at all).

CREATE TABLE IF NOT EXISTS hero_books (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  status text NOT NULL DEFAULT 'draft'
    CHECK (status IN ('draft', 'writing', 'preview_ready', 'paid', 'illustrating', 'ready', 'failed')),
  audience text NOT NULL CHECK (audience IN ('child', 'adult')),
  occasion text NOT NULL,
  universe text NOT NULL,
  answers jsonb NOT NULL DEFAULT '{}',
  -- photo storage paths in the private hero-photos bucket; emptied by cleanup
  photo_paths text[] NOT NULL DEFAULT '{}',
  photos_delete_after timestamptz NOT NULL,
  photos_deleted_at timestamptz,
  -- explicit consent: uploader confirms they are the person or have permission
  consent_at timestamptz NOT NULL,
  consent_text text NOT NULL,
  story jsonb,                          -- { title, dedication, pages: [{ text, scene }] }
  page_images jsonb NOT NULL DEFAULT '{}', -- { "<page index>": "<storage path in hero-pages>" }
  paid_digital boolean NOT NULL DEFAULT false,
  paid_at timestamptz,
  paddle_transaction_id text,
  -- group gift
  gift_token text UNIQUE,
  gift_note text,
  chipin_total_cents integer NOT NULL DEFAULT 0,
  error text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_hero_books_user ON hero_books(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_hero_books_photo_cleanup ON hero_books(photos_delete_after) WHERE photos_deleted_at IS NULL;

CREATE TABLE IF NOT EXISTS hero_contributions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  book_id uuid NOT NULL REFERENCES hero_books(id) ON DELETE CASCADE,
  contributor_name text NOT NULL,
  message text NOT NULL DEFAULT '',
  chipin_units integer NOT NULL DEFAULT 0,
  chipin_status text NOT NULL DEFAULT 'none' CHECK (chipin_status IN ('none', 'pending', 'paid')),
  paddle_transaction_id text UNIQUE,
  hidden boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_hero_contributions_book ON hero_contributions(book_id, created_at);

ALTER TABLE hero_books ENABLE ROW LEVEL SECURITY;
ALTER TABLE hero_contributions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Owners read their hero books" ON hero_books;
CREATE POLICY "Owners read their hero books" ON hero_books
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Owners read contributions to their books" ON hero_contributions;
CREATE POLICY "Owners read contributions to their books" ON hero_contributions
  FOR SELECT USING (EXISTS (SELECT 1 FROM hero_books b WHERE b.id = book_id AND b.user_id = auth.uid()));

-- Private buckets; files are served through short-lived signed URLs only.
INSERT INTO storage.buckets (id, name, public)
VALUES ('hero-photos', 'hero-photos', false), ('hero-pages', 'hero-pages', false)
ON CONFLICT (id) DO NOTHING;
