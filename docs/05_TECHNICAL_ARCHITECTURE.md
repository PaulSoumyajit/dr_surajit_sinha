# 05 — TECHNICAL ARCHITECTURE & INFRASTRUCTURE SPECIFICATION

**Project:** Surojit Sinha — Advocate & Legal Counsel Personal Brand Website  
**Document Status:** Approved Technical Architecture  
**Authoring Body:** Full-Stack & Security Architecture  

---

## 1. Technology Stack Decisions & Evaluation

The tech stack is selected for supreme reliability, speed, type safety, low operating cost, and zero architectural bloat.

```
+-----------------------------------------------------------------------------------+
| Next.js 15 (App Router) + React 19 + TypeScript 5                                  |
| Statically Rendered & Server-Side Hydrated Editorial Framework                    |
+-----------------------------------------------------------------------------------+
| Styling: Tailwind CSS v4 + Custom Tokens  |  Motion: Motion for React (`motion`) (EASE_LUXE) |
| Lucide React (Minimalist Icons)          |  Form Validation: Zod + Server Actions  |
+-----------------------------------------------------------------------------------+
| Data Layer & Auth: Supabase (PostgreSQL 15 + Row Level Security + Storage)        |
+-----------------------------------------------------------------------------------+
| Hosting: Vercel Edge Network              |  DNS & WAF: Cloudflare                 |
+-----------------------------------------------------------------------------------+
```

### 1.1 Rationalized Technology Matrix

| Technology | Selection Decision | Architectural Justification |
|---|---|---|
| **Framework** | Next.js 15 (App Router) | Server Components ensure zero client JS for static legal prose, maximizing SEO and speed. |
| **Language** | TypeScript 5 (Strict Mode) | Complete type safety eliminates runtime defects in legal citations and publishing workflows. |
| **Styling** | Tailwind CSS v4 | Compile-time CSS generation ensures zero runtime styling overhead; uses CSS variables for tokens. |
| **Motion** | Motion for React (`motion`) | Official modern package of Framer Motion (`motion/react`). Precision animation primitives (`motion.div`, `AnimatePresence`) utilizing `EASE_LUXE` curve and React 19 support. |
| **Smooth Scroll** | Native CSS / Optional Lenis | Lightweight smooth scrolling without breaking browser history, accessibility, or page search. |
| **Backend & Auth** | Supabase (PostgreSQL) | Managed database, enterprise Row Level Security (RLS), and secure admin authentication. |
| **Icons** | Lucide React | Clean, tree-shakeable SVG icons; used sparingly with strict 1.25px stroke weights. |
| **Hosting** | Vercel Edge Platform | Global CDN distribution with automatic SSL, instant preview deployments, and sub-100ms TTFB. |
| **Edge Security** | Cloudflare | DNS management, DDoS mitigation, and SSL termination. |

---

## 2. Codebase Organization & Directory Structure

```
c:\Users\Soumyajit\OneDrive\Desktop\surojit_sinha_website\
├── docs/                        # Complete project documentation suite
├── public/                      # Static assets, fonts, icons, legal seals
│   ├── images/                  # Architectural photography & portrait assets
│   ├── books/                   # Publication cover previews
│   └── favicon.ico              # Bespoke monogram favicon
├── src/
│   ├── app/                     # Next.js App Router root
│   │   ├── (public)/            # Public website route group
│   │   │   ├── page.tsx         # Homepage
│   │   │   ├── about/page.tsx   # About / Professional Profile
│   │   │   ├── career/page.tsx  # Career Journey Timeline
│   │   │   ├── practice-areas/  # Practice Areas overview & dynamic slug
│   │   │   ├── publications/    # Published treatises & papers
│   │   │   ├── judgments/       # Selected reported judgments
│   │   │   ├── insights/        # Editorial journal listing & article slug
│   │   │   ├── contact/page.tsx # Chambers & consultation inquiry
│   │   │   ├── disclaimer/      # BCI Rule 36 compliance page
│   │   │   ├── privacy-policy/  # Privacy documentation
│   │   │   └── terms/page.tsx   # Terms of engagement
│   │   ├── (admin)/admin/       # Protected Admin CMS route group
│   │   │   ├── login/page.tsx   # Secure authentication
│   │   │   ├── dashboard/       # Overview metrics & quick actions
│   │   │   ├── articles/        # Article creator & Markdown editor
│   │   │   └── faqs/page.tsx    # FAQ manager
│   │   ├── api/                 # Secure API routes (Inquiries, Webhooks)
│   │   ├── globals.css          # Tailwind v4 import & custom CSS tokens
│   │   ├── layout.tsx           # Root HTML, Google Fonts injection, SiteShell
│   │   ├── not-found.tsx        # Editorial 404 error screen
│   │   ├── robots.ts            # Dynamic robots.txt
│   │   └── sitemap.ts           # Dynamic XML sitemap
│   ├── components/
│   │   ├── ui/                  # Primitives (Button, Reveal, AnimatedHeading, Accordion)
│   │   ├── layout/              # Navbar, MobileNav, Footer, SiteShell, DisclaimerModal
│   │   ├── sections/            # Hero, Perspective, PracticeCarousel, ProcessAccordion, ScenarioSwitcher
│   │   └── cms/                 # Admin data tables, Markdown editor, form handlers
│   ├── lib/
│   │   ├── supabase/            # Client, server, and middleware Supabase instances
│   │   ├── data/                # Fallback static datasets (Practice, Profile, Citations)
│   │   ├── utils.ts             # Tailwind class merging (cn) & EASE_LUXE constants
│   │   └── seo.ts               # Structured Data (JSON-LD) generators
│   └── types/                   # Unified TypeScript definitions (Article, Publication, Judgment)
├── .env.example                 # Sanitized environment variable template
├── next.config.ts               # Next.js configuration (Image domains, headers)
├── package.json                 # Dependency manifest
└── tsconfig.json                # Strict TypeScript configuration
```

---

## 3. Data Model & Database Architecture (Supabase PostgreSQL)

The database schema supports the editorial publishing workflow, consultation inquiries, and static fallbacks.

```
+--------------------+        +---------------------+
|     categories     |        |      articles       |
|--------------------|        |---------------------|
| id (UUID, PK)      |1      *| id (UUID, PK)       |
| name (VARCHAR)     |--------| category_id (FK)    |
| slug (VARCHAR, UQ) |        | title (VARCHAR)     |
+--------------------+        | slug (VARCHAR, UQ)  |
                              | excerpt (TEXT)      |
+--------------------+        | content_md (TEXT)   |
|   contact_inquiries|        | status (ENUM)       |
|--------------------|        | published_at (TS)   |
| id (UUID, PK)      |        +---------------------+
| full_name (VARCHAR)|
| email (VARCHAR)    |        +---------------------+
| category (VARCHAR) |        |    publications     |
| message (TEXT)     |        |---------------------|
| disclaimer_agreed  |        | id (UUID, PK)       |
| created_at (TS)    |        | title, publisher    |
+--------------------+        | year, isbn, link    |
                              +---------------------+
```

### 3.1 SQL Schema DDL & Row Level Security (RLS)

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Article Categories
CREATE TABLE public.categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Articles (Insights & Essays)
CREATE TYPE article_status AS ENUM ('draft', 'published', 'archived');

CREATE TABLE public.articles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    excerpt TEXT NOT NULL,
    content_md TEXT NOT NULL,
    cover_image_url TEXT,
    reading_time_min INTEGER DEFAULT 5,
    status article_status DEFAULT 'draft',
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Published Treatises & Books
CREATE TABLE public.publications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
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

-- 4. Selected Reported Judgments
CREATE TABLE public.judgments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
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

-- 5. FAQs & Practice Guidance
CREATE TABLE public.faqs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    category VARCHAR(100) DEFAULT 'General',
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Consultation Inquiries (Private Log)
CREATE TABLE public.contact_inquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name VARCHAR(150) NOT NULL,
    organization VARCHAR(150),
    email VARCHAR(150) NOT NULL,
    telephone VARCHAR(50),
    category VARCHAR(100) NOT NULL,
    message TEXT NOT NULL,
    disclaimer_accepted BOOLEAN NOT NULL DEFAULT FALSE,
    ip_hash VARCHAR(64),
    status VARCHAR(50) DEFAULT 'unread',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.publications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.judgments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_inquiries ENABLE ROW LEVEL SECURITY;

-- Public READ access for published editorial content
CREATE POLICY "Public Read Categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Public Read Articles" ON public.articles FOR SELECT USING (status = 'published');
CREATE POLICY "Public Read Publications" ON public.publications FOR SELECT USING (true);
CREATE POLICY "Public Read Judgments" ON public.judgments FOR SELECT USING (true);
CREATE POLICY "Public Read FAQs" ON public.faqs FOR SELECT USING (true);

-- Authenticated Admin FULL access
CREATE POLICY "Admin All Categories" ON public.categories FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin All Articles" ON public.articles FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin All Publications" ON public.publications FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin All Judgments" ON public.judgments FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin All FAQs" ON public.faqs FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin All Inquiries" ON public.contact_inquiries FOR ALL TO authenticated USING (true);

-- Public INSERT for Contact Inquiries (No SELECT for public)
CREATE POLICY "Public Insert Inquiry" ON public.contact_inquiries FOR INSERT WITH CHECK (disclaimer_accepted = true);
```

---

## 4. Security Architecture & Threat Mitigation

1. **Strict Key Isolation:**
   - `NEXT_PUBLIC_SUPABASE_URL`: Publicly accessible.
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Publicly accessible; strictly locked down by Row Level Security (read-only for published content, insert-only for contact form).
   - `SUPABASE_SERVICE_ROLE_KEY`: Server-side only. Never prefixed with `NEXT_PUBLIC_`. Never imported into client components.
2. **Content Security Policy (CSP):** Strict HTTP headers configured in `next.config.ts` blocking inline malicious scripts and untrusted iframes.
3. **Form Sanitization & Rate Limiting:** All consultation submissions validated via Zod schema. IP addresses are hashed (`SHA-256`) before storage to respect privacy while enforcing a maximum limit of 5 requests per IP per hour.

---

## 5. SEO & Structured Data Architecture

Search engine crawlers and legal citation engines will index the site using Schema.org JSON-LD structured data:
- **Homepage:** `Attorney` / `LegalService` schema declaring verified bar affiliations, areas of practice, and chamber coordinates.
- **Publication Pages:** `Book` and `ScholarlyArticle` schema including ISBN, publisher, and author references.
- **Article Pages:** `Article` schema with author byline, datePublished, dateModified, and canonical URL.

