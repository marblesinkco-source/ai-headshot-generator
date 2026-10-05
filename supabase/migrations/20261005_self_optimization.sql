-- page_views: tracks every page view
CREATE TABLE IF NOT EXISTS page_views (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text NOT NULL,
  user_id uuid,
  page_path text NOT NULL,
  referrer text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  device_type text DEFAULT 'desktop', -- desktop/mobile/tablet
  country text,
  duration_ms integer,
  created_at timestamptz DEFAULT now()
);
CREATE INDEX idx_page_views_path ON page_views(page_path, created_at DESC);
CREATE INDEX idx_page_views_session ON page_views(session_id);

-- click_events: tracks clicks on key UI elements
CREATE TABLE IF NOT EXISTS click_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text NOT NULL,
  user_id uuid,
  page_path text NOT NULL,
  element_id text NOT NULL, -- e.g. 'hero-cta', 'pricing-professional', 'category-headshots'
  element_type text NOT NULL, -- 'button', 'card', 'link', 'tab'
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);
CREATE INDEX idx_click_events_element ON click_events(element_id, created_at DESC);

-- conversions: tracks conversion funnel steps
CREATE TABLE IF NOT EXISTS conversions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text NOT NULL,
  user_id uuid,
  event_type text NOT NULL, -- 'signup', 'package_select', 'checkout_start', 'payment_complete', 'upload_start', 'generation_start', 'generation_complete'
  category_id text,
  package_id text,
  revenue_cents integer,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);
CREATE INDEX idx_conversions_type ON conversions(event_type, created_at DESC);
CREATE INDEX idx_conversions_category ON conversions(category_id, created_at DESC);

-- ab_tests: active A/B test configurations
CREATE TABLE IF NOT EXISTS ab_tests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  test_name text NOT NULL UNIQUE,
  description text,
  variants jsonb NOT NULL, -- [{"id": "control", "weight": 50}, {"id": "variant_a", "weight": 50}]
  target_page text, -- page path pattern, null = all pages
  status text DEFAULT 'active', -- active/paused/completed
  winner_variant text,
  start_date timestamptz DEFAULT now(),
  end_date timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- ab_test_assignments: which variant each session got
CREATE TABLE IF NOT EXISTS ab_test_assignments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  test_id uuid REFERENCES ab_tests(id) ON DELETE CASCADE,
  session_id text NOT NULL,
  variant_id text NOT NULL,
  converted boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  UNIQUE(test_id, session_id)
);
CREATE INDEX idx_ab_assignments_test ON ab_test_assignments(test_id, variant_id);

-- optimization_log: daily optimization decisions
CREATE TABLE IF NOT EXISTS optimization_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  optimization_type text NOT NULL, -- 'category_rank', 'package_highlight', 'hero_variant', 'cta_text'
  decision jsonb NOT NULL, -- what was decided
  reasoning text, -- why
  metrics_snapshot jsonb, -- data that informed the decision
  applied boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);
CREATE INDEX idx_optimization_log_type ON optimization_log(optimization_type, created_at DESC);

-- dynamic_rankings: current optimized rankings
CREATE TABLE IF NOT EXISTS dynamic_rankings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ranking_type text NOT NULL, -- 'category_order', 'package_highlight', 'hero_variant'
  ranking_data jsonb NOT NULL, -- the actual ranking/config
  valid_from timestamptz DEFAULT now(),
  valid_until timestamptz,
  created_at timestamptz DEFAULT now()
);
CREATE INDEX idx_rankings_type ON dynamic_rankings(ranking_type, valid_from DESC);

-- Enable RLS
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE click_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversions ENABLE ROW LEVEL SECURITY;
ALTER TABLE ab_tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE ab_test_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE optimization_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE dynamic_rankings ENABLE ROW LEVEL SECURITY;

-- RLS policies: service role can do everything, anon can insert tracking data
CREATE POLICY "Service role full access" ON page_views FOR ALL USING (true);
CREATE POLICY "Anon can insert page views" ON page_views FOR INSERT WITH CHECK (true);

CREATE POLICY "Service role full access" ON click_events FOR ALL USING (true);
CREATE POLICY "Anon can insert click events" ON click_events FOR INSERT WITH CHECK (true);

CREATE POLICY "Service role full access" ON conversions FOR ALL USING (true);
CREATE POLICY "Anon can insert conversions" ON conversions FOR INSERT WITH CHECK (true);

CREATE POLICY "Service role full access" ON ab_tests FOR ALL USING (true);
CREATE POLICY "Anon can read active tests" ON ab_tests FOR SELECT USING (status = 'active');

CREATE POLICY "Service role full access" ON ab_test_assignments FOR ALL USING (true);
CREATE POLICY "Anon can insert assignments" ON ab_test_assignments FOR INSERT WITH CHECK (true);
CREATE POLICY "Anon can read own assignments" ON ab_test_assignments FOR SELECT USING (true);

CREATE POLICY "Service role full access" ON optimization_log FOR ALL USING (true);
CREATE POLICY "Service role full access" ON dynamic_rankings FOR ALL USING (true);
CREATE POLICY "Anon can read rankings" ON dynamic_rankings FOR SELECT USING (true);
