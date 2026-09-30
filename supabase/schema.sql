-- POLARIS: Polar Science Intelligence & Media Portal
-- Supabase PostgreSQL Database Schema
-- Problem Statement: PS 26063

-- 1. Enable UUID and Full-Text Search Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- 2. CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  icon TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. USERS / RESEARCHERS TABLE
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  institution TEXT,
  role TEXT DEFAULT 'contributor' CHECK (role IN ('admin', 'scientist', 'educator', 'contributor', 'public')),
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. SCIENTISTS DIRECTORY
CREATE TABLE IF NOT EXISTS scientists (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  institution TEXT NOT NULL,
  specialization TEXT NOT NULL,
  bio TEXT,
  avatar_url TEXT,
  publications_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. POLAR LOCATIONS TABLE
CREATE TABLE IF NOT EXISTS locations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  region TEXT NOT NULL CHECK (region IN ('Antarctica', 'Arctic', 'Global Polar')),
  category TEXT NOT NULL CHECK (category IN ('Glacier', 'Research Station', 'Expedition Site', 'Wildlife Habitat', 'Climate Observatory', 'Oceanographic Zone')),
  latitude NUMERIC(9, 6) NOT NULL,
  longitude NUMERIC(9, 6) NOT NULL,
  elevation_meters NUMERIC(7, 2),
  summary TEXT NOT NULL,
  scientific_significance TEXT NOT NULL,
  operating_country TEXT,
  established_year INT,
  current_status TEXT DEFAULT 'Active Monitoring',
  key_findings TEXT[] DEFAULT '{}',
  temperature_anomaly_c NUMERIC(4, 2),
  ice_velocity_m_per_year NUMERIC(8, 2),
  thumbnail_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. RESEARCH PAPERS & REPORTS TABLE
CREATE TABLE IF NOT EXISTS research (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  abstract TEXT NOT NULL,
  authors TEXT[] NOT NULL,
  institution TEXT NOT NULL,
  year INT NOT NULL,
  region TEXT NOT NULL CHECK (region IN ('Antarctica', 'Arctic', 'Global Polar')),
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  content_type TEXT NOT NULL CHECK (content_type IN ('Research Paper', 'Dataset', 'Satellite Data', 'Research Video', 'Photography', 'Scientific Report', 'Expedition Record')),
  doi TEXT,
  peer_reviewed BOOLEAN DEFAULT true,
  citation_count INT DEFAULT 0,
  topics TEXT[] DEFAULT '{}',
  key_takeaway TEXT,
  primary_location_id UUID REFERENCES locations(id) ON DELETE SET NULL,
  search_vector TSVECTOR,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. POLAR DATASETS TABLE
CREATE TABLE IF NOT EXISTS datasets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  provider TEXT NOT NULL,
  region TEXT NOT NULL CHECK (region IN ('Antarctica', 'Arctic', 'Global Polar')),
  temporal_coverage TEXT NOT NULL,
  update_frequency TEXT DEFAULT 'Monthly',
  parameters TEXT[] DEFAULT '{}',
  file_format TEXT NOT NULL,
  file_size_mb NUMERIC(8, 2),
  download_url TEXT,
  sample_points JSONB DEFAULT '[]',
  related_research_id UUID REFERENCES research(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. EXPEDITIONS TABLE
CREATE TABLE IF NOT EXISTS expeditions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  vessel_or_team TEXT NOT NULL,
  lead_scientist TEXT NOT NULL,
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

-- 9. MEDIA ASSETS TABLE
CREATE TABLE IF NOT EXISTS media (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL CHECK (category IN ('Videos', 'Photography', 'Scientist Stories', 'Expeditions', 'Satellite Imagery', 'Wildlife', 'Climate Stories')),
  media_type TEXT NOT NULL CHECK (media_type IN ('video', 'photo', 'audio')),
  region TEXT NOT NULL CHECK (region IN ('Antarctica', 'Arctic', 'Global Polar')),
  creator TEXT NOT NULL,
  publication_date DATE NOT NULL,
  duration TEXT,
  thumbnail_url TEXT NOT NULL,
  media_url TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  scientific_context TEXT,
  related_location_id UUID REFERENCES locations(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. SCIENCE STORIES (Science Outreach Generator)
CREATE TABLE IF NOT EXISTS stories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  source_research_id UUID REFERENCES research(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  original_scientific_headline TEXT NOT NULL,
  scientific_summary TEXT NOT NULL,
  student_explanation TEXT NOT NULL,
  public_story TEXT NOT NULL,
  social_media_thread JSONB DEFAULT '[]',
  key_metaphor TEXT,
  target_audience TEXT DEFAULT 'General Public',
  reading_level TEXT DEFAULT 'Grade 8',
  author_id UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. AI QUERIES & CITATION LOGS
CREATE TABLE IF NOT EXISTS ai_queries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_query TEXT NOT NULL,
  simple_explanation TEXT NOT NULL,
  scientific_explanation TEXT NOT NULL,
  key_facts TEXT[] DEFAULT '{}',
  sources_cited JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. INDEXES & FULL-TEXT SEARCH
CREATE INDEX IF NOT EXISTS idx_research_region ON research(region);
CREATE INDEX IF NOT EXISTS idx_research_year ON research(year);
CREATE INDEX IF NOT EXISTS idx_locations_category ON locations(category);
CREATE INDEX IF NOT EXISTS idx_datasets_provider ON datasets(provider);

-- Trigger for full-text search indexing on research
CREATE OR REPLACE FUNCTION update_research_search_vector() RETURNS trigger AS $$
BEGIN
  NEW.search_vector :=
    setweight(to_tsvector('english', coalesce(NEW.title, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(NEW.abstract, '')), 'B') ||
    setweight(to_tsvector('english', coalesce(NEW.key_takeaway, '')), 'C') ||
    setweight(to_tsvector('english', array_to_string(NEW.topics, ' ')), 'B');
  RETURN NEW;
END
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_research_search_vector ON research;
CREATE TRIGGER trg_research_search_vector
BEFORE INSERT OR UPDATE ON research
FOR EACH ROW EXECUTE FUNCTION update_research_search_vector();

-- 13. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE research ENABLE ROW LEVEL SECURITY;
ALTER TABLE datasets ENABLE ROW LEVEL SECURITY;
ALTER TABLE expeditions ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;
ALTER TABLE stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_queries ENABLE ROW LEVEL SECURITY;

-- Public Read Policies
CREATE POLICY "Allow public read access to categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Allow public read access to locations" ON locations FOR SELECT USING (true);
CREATE POLICY "Allow public read access to research" ON research FOR SELECT USING (true);
CREATE POLICY "Allow public read access to datasets" ON datasets FOR SELECT USING (true);
CREATE POLICY "Allow public read access to expeditions" ON expeditions FOR SELECT USING (true);
CREATE POLICY "Allow public read access to media" ON media FOR SELECT USING (true);
CREATE POLICY "Allow public read access to stories" ON stories FOR SELECT USING (true);

-- Authenticated / Contributor Write Policies
CREATE POLICY "Allow authenticated inserts to research" ON research FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow authenticated inserts to stories" ON stories FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow authenticated inserts to datasets" ON datasets FOR INSERT WITH CHECK (true);
