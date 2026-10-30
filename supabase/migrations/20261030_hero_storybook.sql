-- 009_hero_storybook.sql
-- Create a Hero: personalized AI storybook tables
-- Applied via: gh workflow run db-migrate.yml -f mode=apply

-- Story projects (one per storybook)
CREATE TABLE IF NOT EXISTS hero_stories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  order_id UUID REFERENCES orders(id) ON DELETE SET NULL,

  -- Hero profile
  hero_name TEXT NOT NULL,
  universe_id TEXT NOT NULL,        -- space-captain, knight, detective, superhero, viking, fairy-tale
  occasion_id TEXT NOT NULL,        -- birthday, promotion, retirement, farewell, graduation, anniversary, just-because
  profile JSONB NOT NULL DEFAULT '{}',  -- answers from hero questions

  -- Story content
  cover_title TEXT,
  cover_subtitle TEXT,
  dedication TEXT,
  story_data JSONB,                 -- full StoryData JSON (pages, prompts, etc.)
  page_count INT NOT NULL DEFAULT 20,

  -- Status tracking
  status TEXT NOT NULL DEFAULT 'draft'
    CHECK (status IN ('draft','generating','preview','paid','completed','failed')),
  generation_progress INT DEFAULT 0,  -- 0-100
  error_message TEXT,

  -- Photo consent (KVKK/GDPR)
  consent_given BOOLEAN NOT NULL DEFAULT FALSE,
  consent_timestamp TIMESTAMPTZ,

  -- Group gift
  group_gift_token TEXT UNIQUE,     -- shareable token for group contributions
  is_group_gift BOOLEAN NOT NULL DEFAULT FALSE,
  organizer_name TEXT,

  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  completed_at TIMESTAMPTZ
);

-- Individual pages of a story (generated content)
CREATE TABLE IF NOT EXISTS hero_story_pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  story_id UUID NOT NULL REFERENCES hero_stories(id) ON DELETE CASCADE,
  page_number INT NOT NULL,
  title TEXT,
  text TEXT,
  scene_prompt TEXT,                -- flux-pulid prompt used
  illustration_url TEXT,            -- generated image URL
  is_cover BOOLEAN NOT NULL DEFAULT FALSE,
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending','generating','completed','failed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),

  UNIQUE(story_id, page_number)
);

-- Photos uploaded for a hero story
CREATE TABLE IF NOT EXISTS hero_story_photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  story_id UUID NOT NULL REFERENCES hero_stories(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  file_path TEXT NOT NULL,
  file_name TEXT,
  file_size INT,
  mime_type TEXT,
  uploaded_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  -- Auto-delete after retention period
  expires_at TIMESTAMPTZ NOT NULL DEFAULT (now() + INTERVAL '30 days')
);

-- Group gift contributions (Week 2, but create table now)
CREATE TABLE IF NOT EXISTS hero_group_contributions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  story_id UUID NOT NULL REFERENCES hero_stories(id) ON DELETE CASCADE,
  contributor_name TEXT NOT NULL,
  contributor_email TEXT,
  message TEXT,                     -- memory/anecdote they share
  question_answers JSONB,           -- their answers to hero questions
  payment_amount INT DEFAULT 0,     -- cents contributed
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_hero_stories_user ON hero_stories(user_id);
CREATE INDEX IF NOT EXISTS idx_hero_stories_status ON hero_stories(status);
CREATE INDEX IF NOT EXISTS idx_hero_stories_group_token ON hero_stories(group_gift_token) WHERE group_gift_token IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_hero_story_pages_story ON hero_story_pages(story_id);
CREATE INDEX IF NOT EXISTS idx_hero_story_photos_story ON hero_story_photos(story_id);
CREATE INDEX IF NOT EXISTS idx_hero_story_photos_expires ON hero_story_photos(expires_at);
CREATE INDEX IF NOT EXISTS idx_hero_group_contributions_story ON hero_group_contributions(story_id);

-- RLS policies
ALTER TABLE hero_stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE hero_story_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE hero_story_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE hero_group_contributions ENABLE ROW LEVEL SECURITY;

-- Users can read/write their own stories
CREATE POLICY hero_stories_user_policy ON hero_stories
  FOR ALL USING (auth.uid() = user_id);

-- Anyone with the group gift token can read the story
CREATE POLICY hero_stories_group_read ON hero_stories
  FOR SELECT USING (group_gift_token IS NOT NULL AND is_group_gift = TRUE);

-- Users can read/write pages of their own stories
CREATE POLICY hero_pages_user_policy ON hero_story_pages
  FOR ALL USING (
    EXISTS (SELECT 1 FROM hero_stories WHERE hero_stories.id = hero_story_pages.story_id AND hero_stories.user_id = auth.uid())
  );

-- Users can manage their own photos
CREATE POLICY hero_photos_user_policy ON hero_story_photos
  FOR ALL USING (auth.uid() = user_id);

-- Anyone can add group contributions (via token validation in API)
CREATE POLICY hero_contributions_insert ON hero_group_contributions
  FOR INSERT WITH CHECK (TRUE);

CREATE POLICY hero_contributions_read ON hero_group_contributions
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM hero_stories WHERE hero_stories.id = hero_group_contributions.story_id AND hero_stories.user_id = auth.uid())
  );

-- Updated_at trigger
CREATE OR REPLACE FUNCTION update_hero_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER hero_stories_updated_at
  BEFORE UPDATE ON hero_stories
  FOR EACH ROW EXECUTE FUNCTION update_hero_updated_at();

CREATE TRIGGER hero_story_pages_updated_at
  BEFORE UPDATE ON hero_story_pages
  FOR EACH ROW EXECUTE FUNCTION update_hero_updated_at();
