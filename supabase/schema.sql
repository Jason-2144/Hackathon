-- POLARIS: Polar Science Knowledge, Outreach & Media Dissemination Platform
-- Official Problem Statement: PS 26063
-- Organization: Ministry of Earth Sciences (MoES), Government of India
-- Category: Software | Theme: Smart Education

-- 1. Enable UUID and Full-Text Search Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- 2. INSTITUTIONS TABLE (MoES, NCPOR, BAS, AWI, NSIDC, NASA JPL)
CREATE TABLE IF NOT EXISTS institutions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  acronym TEXT NOT NULL,
  country TEXT NOT NULL,
  headquarters TEXT,
  website_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. EXPEDITIONS TABLE
CREATE TABLE IF NOT EXISTS expeditions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  vessel_or_team TEXT NOT NULL,
  lead_scientist TEXT NOT NULL,
  institution_id UUID REFERENCES institutions(id) ON DELETE SET NULL,
  start_date DATE NOT NULL,
  end_date DATE,
  status TEXT DEFAULT 'Completed' CHECK (status IN ('Completed', 'Ongoing', 'Planned')),
  objective TEXT NOT NULL,
  region TEXT NOT NULL CHECK (region IN ('Antarctica', 'Arctic', 'Global Polar')),
  route_coordinates JSONB DEFAULT '[]',
  milestones TEXT[] DEFAULT '{}',
  findings_summary TEXT,
  thumbnail_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. EXPEDITION REPORTS TABLE (Central Source of Truth)
CREATE TABLE IF NOT EXISTS expedition_reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  expedition_id UUID REFERENCES expeditions(id) ON DELETE CASCADE,
  report_number TEXT NOT NULL UNIQUE, -- e.g. MoES-ISEA-44-CR-01
  title TEXT NOT NULL,
  lead_author TEXT NOT NULL,
  institution TEXT NOT NULL,
  publication_date DATE NOT NULL,
  summary TEXT NOT NULL,
  methodology TEXT NOT NULL,
  key_findings TEXT[] DEFAULT '{}',
  sections JSONB DEFAULT '[]',
  download_url TEXT,
  search_vector TSVECTOR,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. RESEARCH PUBLICATIONS TABLE
CREATE TABLE IF NOT EXISTS research_publications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  abstract TEXT NOT NULL,
  authors TEXT[] NOT NULL,
  institution TEXT NOT NULL,
  publication_year INT NOT NULL,
  region TEXT NOT NULL,
  category TEXT NOT NULL,
  doi TEXT,
  peer_reviewed BOOLEAN DEFAULT true,
  citation_count INT DEFAULT 0,
  topics TEXT[] DEFAULT '{}',
  key_takeaway TEXT,
  related_expedition_id UUID REFERENCES expeditions(id) ON DELETE SET NULL,
  search_vector TSVECTOR,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. SCIENTIFIC DATASETS TABLE
CREATE TABLE IF NOT EXISTS scientific_datasets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  provider TEXT NOT NULL,
  region TEXT NOT NULL,
  temporal_coverage TEXT NOT NULL,
  update_frequency TEXT DEFAULT 'Monthly',
  parameters TEXT[] DEFAULT '{}',
  file_format TEXT NOT NULL,
  file_size_mb NUMERIC(8, 2),
  download_url TEXT,
  sample_points JSONB DEFAULT '[]',
  related_expedition_id UUID REFERENCES expeditions(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. MEDIA ASSETS TABLE (Connected to Science & Metadata)
CREATE TABLE IF NOT EXISTS media_assets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL CHECK (category IN ('Videos', 'Photography', 'Scientist Stories', 'Expeditions', 'Satellite Imagery', 'Wildlife', 'Climate Stories')),
  media_type TEXT NOT NULL CHECK (media_type IN ('video', 'photo', 'audio')),
  region TEXT NOT NULL,
  creator TEXT NOT NULL,
  institution TEXT NOT NULL,
  publication_date DATE NOT NULL,
  duration TEXT,
  thumbnail_url TEXT NOT NULL,
  media_url TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  scientific_context TEXT,
  related_expedition_id UUID REFERENCES expeditions(id) ON DELETE SET NULL,
  resolution TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. INSTITUTIONAL ACTIVITIES TABLE (MoES Events, Conferences, Milestones)
CREATE TABLE IF NOT EXISTS institutional_activities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  activity_type TEXT NOT NULL CHECK (activity_type IN ('Expedition', 'Conference', 'Research Event', 'Outreach Program', 'Announcement', 'Workshop', 'Scientific Achievement', 'Institutional Update')),
  institution TEXT NOT NULL,
  event_date DATE NOT NULL,
  location TEXT NOT NULL,
  summary TEXT NOT NULL,
  description TEXT NOT NULL,
  lead_coordinator TEXT NOT NULL,
  participants_count INT,
  status TEXT DEFAULT 'Completed' CHECK (status IN ('Completed', 'Ongoing', 'Upcoming')),
  related_expedition_id UUID REFERENCES expeditions(id) ON DELETE SET NULL,
  badge_text TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. OUTREACH CONTENT & HUMAN REVIEW PIPELINE (Content Studio)
CREATE TABLE IF NOT EXISTS outreach_content (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  source_id TEXT NOT NULL,
  source_title TEXT NOT NULL,
  source_type TEXT NOT NULL CHECK (source_type IN ('Expedition Report', 'Publication', 'Dataset', 'Activity', 'Expedition')),
  source_institution TEXT NOT NULL,
  format TEXT NOT NULL CHECK (format IN ('website_article', 'public_article', 'student_explanation', 'instagram_post', 'linkedin_post', 'x_post', 'youtube_description', 'video_script', 'infographic_content')),
  format_label TEXT NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  review_status TEXT DEFAULT 'ai_generated' CHECK (review_status IN ('draft', 'ai_generated', 'under_review', 'approved', 'published')),
  attached_media_ids TEXT[] DEFAULT '{}',
  attached_dataset_id TEXT,
  review_notes TEXT,
  reviewed_by TEXT,
  published_channels TEXT[] DEFAULT '{}',
  published_at TIMESTAMPTZ,
  target_audience TEXT DEFAULT 'General Public',
  reading_level TEXT DEFAULT 'Grade 8',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. POLAR LOCATIONS TABLE
CREATE TABLE IF NOT EXISTS polar_locations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  region TEXT NOT NULL CHECK (region IN ('Antarctica', 'Arctic', 'Global Polar')),
  category TEXT NOT NULL,
  latitude NUMERIC(9, 6) NOT NULL,
  longitude NUMERIC(9, 6) NOT NULL,
  elevation_meters NUMERIC(7, 2),
  summary TEXT NOT NULL,
  scientific_significance TEXT NOT NULL,
  operating_country TEXT,
  temperature_anomaly_c NUMERIC(4, 2),
  ice_velocity_m_per_year NUMERIC(8, 2),
  thumbnail_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. INDEXES & SEARCH VECTORS
CREATE INDEX IF NOT EXISTS idx_exp_reports_expedition ON expedition_reports(expedition_id);
CREATE INDEX IF NOT EXISTS idx_research_pub_expedition ON research_publications(related_expedition_id);
CREATE INDEX IF NOT EXISTS idx_datasets_expedition ON scientific_datasets(related_expedition_id);
CREATE INDEX IF NOT EXISTS idx_media_expedition ON media_assets(related_expedition_id);
CREATE INDEX IF NOT EXISTS idx_outreach_status ON outreach_content(review_status);

-- 12. ROW LEVEL SECURITY (RLS)
ALTER TABLE institutions ENABLE ROW LEVEL SECURITY;
ALTER TABLE expeditions ENABLE ROW LEVEL SECURITY;
ALTER TABLE expedition_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE research_publications ENABLE ROW LEVEL SECURITY;
ALTER TABLE scientific_datasets ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE institutional_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE outreach_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE polar_locations ENABLE ROW LEVEL SECURITY;

-- Open Read Access for Public Outreach
CREATE POLICY "Public read expeditions" ON expeditions FOR SELECT USING (true);
CREATE POLICY "Public read reports" ON expedition_reports FOR SELECT USING (true);
CREATE POLICY "Public read publications" ON research_publications FOR SELECT USING (true);
CREATE POLICY "Public read datasets" ON scientific_datasets FOR SELECT USING (true);
CREATE POLICY "Public read media" ON media_assets FOR SELECT USING (true);
CREATE POLICY "Public read activities" ON institutional_activities FOR SELECT USING (true);
CREATE POLICY "Public read published outreach" ON outreach_content FOR SELECT USING (true);
CREATE POLICY "Public read locations" ON polar_locations FOR SELECT USING (true);
