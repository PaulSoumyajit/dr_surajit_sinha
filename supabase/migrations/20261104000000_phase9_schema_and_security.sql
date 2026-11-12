-- ==============================================================================
-- Migration: 20261104000000_phase9_schema_and_security.sql
-- Project: Surojit Sinha — Advocate & Legal Counsel Personal Brand Website
-- Phase: 9 — Database Schema, Row Level Security & Atomic Rate Limiting
-- ==============================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. Categories Taxonomy Table
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(150) NOT NULL,
    slug VARCHAR(150) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Seed initial approved categories if not present
INSERT INTO public.categories (name, slug)
VALUES 
    ('Corporate Advisory', 'corporate-advisory'),
    ('Commercial Arbitration', 'commercial-arbitration'),
    ('Appellate Advocacy', 'appellate-advocacy'),
    ('Constitutional Law', 'constitutional-law')
ON CONFLICT (slug) DO NOTHING;

-- 2. Articles & Legal Monographs Table
CREATE TABLE IF NOT EXISTS public.articles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    excerpt TEXT NOT NULL,
    content_md TEXT NOT NULL,
    cover_image_url TEXT,
    reading_time_min INTEGER DEFAULT 5,
    status VARCHAR(50) DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_articles_slug ON public.articles(slug);
CREATE INDEX IF NOT EXISTS idx_articles_status ON public.articles(status);
CREATE INDEX IF NOT EXISTS idx_articles_category ON public.articles(category_id);

-- 3. Published Treatises & Textbooks Table
CREATE TABLE IF NOT EXISTS public.publications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    subtitle VARCHAR(255),
    publisher VARCHAR(150) NOT NULL,
    publication_year INTEGER NOT NULL,
    isbn VARCHAR(30),
    cover_image_url TEXT,
    purchase_url TEXT,
    description TEXT NOT NULL,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Selected Reported Judgments Table
CREATE TABLE IF NOT EXISTS public.judgments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    case_title VARCHAR(255) NOT NULL,
    neutral_citation VARCHAR(150) NOT NULL,
    court_bench VARCHAR(150) NOT NULL,
    legal_subject VARCHAR(150) NOT NULL,
    counsel_role VARCHAR(100) NOT NULL,
    decision_date DATE,
    official_report_url TEXT,
    ratio_summary TEXT NOT NULL,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. FAQs & Practice Guidance Table
CREATE TABLE IF NOT EXISTS public.faqs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    category VARCHAR(100) DEFAULT 'General',
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Consultation Inquiries Log Table (Private Chambers Inbox)
CREATE TABLE IF NOT EXISTS public.contact_inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name VARCHAR(150) NOT NULL,
    organization VARCHAR(150),
    email VARCHAR(150) NOT NULL,
    telephone VARCHAR(50),
    category VARCHAR(100) NOT NULL,
    message TEXT NOT NULL,
    disclaimer_accepted BOOLEAN NOT NULL DEFAULT FALSE,
    ip_hash VARCHAR(64),
    status VARCHAR(50) DEFAULT 'unread' CHECK (status IN ('unread', 'reviewed', 'archived')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_contact_inquiries_status ON public.contact_inquiries(status);
CREATE INDEX IF NOT EXISTS idx_contact_inquiries_created_at ON public.contact_inquiries(created_at DESC);

-- 7. Atomic Rate Limiting Table (Persistent IP-hash throttling)
CREATE TABLE IF NOT EXISTS public.inquiry_rate_limits (
    ip_hash VARCHAR(64) PRIMARY KEY,
    request_count INTEGER NOT NULL DEFAULT 1,
    window_start TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Atomic Rate Limiter Stored Function
CREATE OR REPLACE FUNCTION public.check_and_increment_rate_limit(
    p_ip_hash VARCHAR(64),
    p_window_seconds INTEGER DEFAULT 3600,
    p_max_requests INTEGER DEFAULT 5
)
RETURNS TABLE (allowed BOOLEAN, retry_after_seconds INTEGER)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_record RECORD;
    v_now TIMESTAMP WITH TIME ZONE := NOW();
    v_elapsed_seconds NUMERIC;
    v_retry_after INTEGER;
BEGIN
    SELECT * INTO v_record FROM public.inquiry_rate_limits WHERE ip_hash = p_ip_hash FOR UPDATE;
    
    IF NOT FOUND THEN
        INSERT INTO public.inquiry_rate_limits (ip_hash, request_count, window_start, updated_at)
        VALUES (p_ip_hash, 1, v_now, v_now);
        RETURN QUERY SELECT true, 0;
        RETURN;
    END IF;

    v_elapsed_seconds := EXTRACT(EPOCH FROM (v_now - v_record.window_start));

    IF v_elapsed_seconds >= p_window_seconds THEN
        -- Window expired; reset window
        UPDATE public.inquiry_rate_limits
        SET request_count = 1,
            window_start = v_now,
            updated_at = v_now
        WHERE ip_hash = p_ip_hash;
        RETURN QUERY SELECT true, 0;
        RETURN;
    END IF;

    IF v_record.request_count >= p_max_requests THEN
        -- Quota exceeded
        v_retry_after := CEIL(p_window_seconds - v_elapsed_seconds)::INTEGER;
        RETURN QUERY SELECT false, v_retry_after;
        RETURN;
    END IF;

    -- Increment count
    UPDATE public.inquiry_rate_limits
    SET request_count = v_record.request_count + 1,
        updated_at = v_now
    WHERE ip_hash = p_ip_hash;
    
    RETURN QUERY SELECT true, 0;
END;
$$;

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- Hardened: Replaces insecure `TO authenticated USING (true)` with trusted app_metadata role
-- ==============================================================================

-- Security Helper Function: Validates that the active session has the 'admin' role in app_metadata
CREATE OR REPLACE FUNCTION public.is_chamber_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
    SELECT COALESCE(
        (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin',
        false
    );
$$;

-- Enable RLS on all tables
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.publications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.judgments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiry_rate_limits ENABLE ROW LEVEL SECURITY;

-- 1. Categories RLS
CREATE POLICY "Public Read Categories" ON public.categories 
    FOR SELECT USING (true);
CREATE POLICY "Admin Insert Categories" ON public.categories 
    FOR INSERT WITH CHECK (public.is_chamber_admin());
CREATE POLICY "Admin Update Categories" ON public.categories 
    FOR UPDATE USING (public.is_chamber_admin());
CREATE POLICY "Admin Delete Categories" ON public.categories 
    FOR DELETE USING (public.is_chamber_admin());

-- 2. Articles RLS
CREATE POLICY "Public Read Published Articles" ON public.articles 
    FOR SELECT USING (status = 'published');
CREATE POLICY "Admin Read All Articles" ON public.articles 
    FOR SELECT USING (public.is_chamber_admin());
CREATE POLICY "Admin Insert Articles" ON public.articles 
    FOR INSERT WITH CHECK (public.is_chamber_admin());
CREATE POLICY "Admin Update Articles" ON public.articles 
    FOR UPDATE USING (public.is_chamber_admin());
CREATE POLICY "Admin Delete Articles" ON public.articles 
    FOR DELETE USING (public.is_chamber_admin());

-- 3. Publications RLS
CREATE POLICY "Public Read Publications" ON public.publications 
    FOR SELECT USING (true);
CREATE POLICY "Admin Manage Publications" ON public.publications 
    FOR ALL USING (public.is_chamber_admin());

-- 4. Judgments RLS
CREATE POLICY "Public Read Judgments" ON public.judgments 
    FOR SELECT USING (true);
CREATE POLICY "Admin Manage Judgments" ON public.judgments 
    FOR ALL USING (public.is_chamber_admin());

-- 5. FAQs RLS
CREATE POLICY "Public Read FAQs" ON public.faqs 
    FOR SELECT USING (true);
CREATE POLICY "Admin Manage FAQs" ON public.faqs 
    FOR ALL USING (public.is_chamber_admin());

-- 6. Contact Inquiries RLS (ZERO public SELECT, UPDATE or DELETE)
CREATE POLICY "Admin Read Inquiries" ON public.contact_inquiries 
    FOR SELECT USING (public.is_chamber_admin());
CREATE POLICY "Admin Update Inquiries" ON public.contact_inquiries 
    FOR UPDATE USING (public.is_chamber_admin());
CREATE POLICY "Admin Delete Inquiries" ON public.contact_inquiries 
    FOR DELETE USING (public.is_chamber_admin());
-- Public Insert only with mandatory disclaimer acceptance
CREATE POLICY "Public Insert Inquiry" ON public.contact_inquiries 
    FOR INSERT WITH CHECK (disclaimer_accepted = true);

-- 7. Rate Limits RLS (Restricted strictly to security definer / service role)
-- No policies granted to anon or authenticated users.

