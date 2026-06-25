-- SQL Schema for Digital Ads World Supabase Tables
-- Paste this script into your Supabase SQL Editor to initialize the database tables.

-- 1. LEADS TABLE
CREATE TABLE IF NOT EXISTS leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT,
    phone TEXT NOT NULL,
    service TEXT,
    message TEXT,
    status TEXT NOT NULL DEFAULT 'new',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (public leads submissions)
CREATE POLICY "Allow public submissions" ON leads 
    FOR INSERT WITH CHECK (true);

-- Allow authenticated read/write/delete (admin backend)
CREATE POLICY "Allow admin access" ON leads 
    FOR ALL USING (true);


-- 2. SERVICES TABLE
CREATE TABLE IF NOT EXISTS services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT NOT NULL,
    benefits TEXT[] NOT NULL DEFAULT '{}',
    icon TEXT NOT NULL,
    order_index INTEGER DEFAULT 0
);

ALTER TABLE services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read services" ON services 
    FOR SELECT USING (true);

CREATE POLICY "Allow admin manage services" ON services 
    FOR ALL USING (true);


-- 3. GALLERY TABLE
CREATE TABLE IF NOT EXISTS gallery (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    image_url TEXT NOT NULL,
    video_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read gallery" ON gallery 
    FOR SELECT USING (true);

CREATE POLICY "Allow admin manage gallery" ON gallery 
    FOR ALL USING (true);


-- 4. TEAM TABLE
CREATE TABLE IF NOT EXISTS team (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    designation TEXT NOT NULL,
    bio TEXT NOT NULL,
    image_url TEXT NOT NULL,
    social_links JSONB DEFAULT '{"linkedin": "", "twitter": "", "facebook": ""}'::jsonb,
    order_index INTEGER DEFAULT 0
);

ALTER TABLE team ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read team" ON team 
    FOR SELECT USING (true);

CREATE POLICY "Allow admin manage team" ON team 
    FOR ALL USING (true);


-- 5. TESTIMONIALS TABLE
CREATE TABLE IF NOT EXISTS testimonials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    designation TEXT NOT NULL,
    company TEXT,
    feedback TEXT NOT NULL,
    rating INTEGER DEFAULT 5,
    image_url TEXT,
    order_index INTEGER DEFAULT 0
);

ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read testimonials" ON testimonials 
    FOR SELECT USING (true);

CREATE POLICY "Allow admin manage testimonials" ON testimonials 
    FOR ALL USING (true);


-- 6. CASE_STUDIES TABLE
CREATE TABLE IF NOT EXISTS case_studies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    client TEXT NOT NULL,
    challenge TEXT NOT NULL,
    solution TEXT NOT NULL,
    results JSONB DEFAULT '[]'::jsonb,
    image_url TEXT NOT NULL
);

ALTER TABLE case_studies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read case_studies" ON case_studies 
    FOR SELECT USING (true);

CREATE POLICY "Allow admin manage case_studies" ON case_studies 
    FOR ALL USING (true);


-- 7. SETTINGS TABLE
CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL
);

ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read settings" ON settings 
    FOR SELECT USING (true);

CREATE POLICY "Allow admin manage settings" ON settings 
    FOR ALL USING (true);


-- Seed default settings row if it doesn't exist
INSERT INTO settings (key, value)
VALUES ('agency_info', '{
    "phone": "9381723378",
    "whatsapp": "9381723378",
    "email": "digitaladsworld.co@gmail.com",
    "address": "Hyderabad, Telangana, India",
    "googleMapsEmbedUrl": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.757962453676!2d78.3840243!3d17.4357497!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb93f5b7468165%3A0xe543e06180360a0f!2sHitech%20City!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
    "social": {
        "linkedin": "https://linkedin.com/company/digitaladsworld",
        "instagram": "https://instagram.com/digitaladsworld",
        "facebook": "https://facebook.com/digitaladsworld"
    },
    "seo": {
        "title": "Digital Ads World | We Don''t Run Ads, We Drive Results.",
        "description": "Premium Performance Marketing Agency helping businesses scale with Google Ads, Meta Ads, SEO, Social Media Marketing, and high-converting Website Development.",
        "keywords": ["Digital Marketing", "Google Ads", "Meta Ads", "Performance Marketing", "SEO Services", "Website Development", "Lead Generation"]
    }
}'::jsonb)
ON CONFLICT (key) DO NOTHING;
