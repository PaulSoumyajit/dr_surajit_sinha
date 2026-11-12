# 03 — INFORMATION ARCHITECTURE & SITEMAP SPECIFICATION

**Project:** Surojit Sinha — Advocate & Legal Counsel Personal Brand Website  
**Document Status:** Approved Information Architecture  
**Authoring Body:** UX Strategy & Full-Stack Architecture  

---

## 1. Global Sitemap & Route Hierarchy

The application is structured logically around the Next.js App Router, separating public-facing editorial pages from the protected administrative CMS.

```
/ (Root Layout: Warm Ivory canvas, Global Navigation, Sticky Header, Editorial Footer)
├── / (Homepage: Signature Split Hero, Pillars, Perspective, Practice Carousel, Process Accordion, Turning Point, CTA)
├── /about (Professional Profile, Legal Philosophy, Admissions, Academic Foundations)
├── /career (Chronological Career Timeline, Professional Appointments, Milestones)
├── /practice-areas (Overview of Verified Legal Competencies)
│   ├── /corporate-commercial (Corporate Advisory & Commercial Transactions)
│   ├── /dispute-resolution (Commercial Arbitration & Mediation)
│   ├── /appellate-litigation (Constitutional, High Court & Supreme Court Advocacy)
│   └── /real-estate-infrastructure (Land, Infrastructure & Regulatory Advisory)
├── /publications (Authored Books, Treatises, Law Review Articles & Citations)
├── /judgments (Selected Reported Judgments, Public Court Records & Neutral Citations)
├── /insights (Editorial Legal Journal, Essays & Commentary)
│   └── /[slug] (Long-Form Editorial Reading Experience)
├── /contact (Chambers Addresses, Clerking Contact, Consultation Enquiry Workflow)
├── /disclaimer (Mandatory Bar Council of India Non-Solicitation Notice)
├── /privacy-policy (Data Protection & Privacy Policy)
├── /terms (Website Terms of Use & Engagement Disclaimer)
└── /admin (Protected Admin Workstream)
    ├── /login (Supabase Authenticated Staff Entry)
    ├── /dashboard (Overview of Articles, Inquiries & FAQs)
    ├── /articles (Article Editor, Drafts & Publishing)
    └── /faqs (FAQ and Consultation Guidance Manager)
```

---

## 2. Page-by-Page Detailed Architecture & Section Breakdown

### 2.1 The Homepage (`/`)

The homepage acts as a dignified digital foyer that immediately establishes counsel’s intellectual pedigree, depth of practice, and client-centered approach.

```
+-----------------------------------------------------------------------------------+
| 1. GLOBAL HEADER & MONOGRAM NAVIGATION                                            |
+-----------------------------------------------------------------------------------+
| 2. SIGNATURE SPLIT HERO                                                           |
|    - Left: Deep Forest Green Card (Headline, Intro, Ivory "Start a conversation") |
|    - Right: Cinematic Architectural Motion Panel (Overlay caption, pause/play)    |
+-----------------------------------------------------------------------------------+
| 3. VALUE PILLARS                                                                  |
|    - Direct conversations  |  A connected perspective  |  Considered next steps   |
+-----------------------------------------------------------------------------------+
| 4. EDITORIAL PERSPECTIVE NARRATIVE                                                |
|    - Category Eyebrow: "THE SINHA PERSPECTIVE"                                    |
|    - Serif Display Statement: "The right answer starts with the right questions." |
|    - 2-Column Explanatory Prose & Micro-Pillars (Direction, Attention, Shield)   |
+-----------------------------------------------------------------------------------+
| 5. INTERACTIVE EXPERTISE CAROUSEL                                                 |
|    - Numerated Pagination (01/04), Next/Prev Arrows, Split Practice Card          |
+-----------------------------------------------------------------------------------+
| 6. PROCESS ACCORDION ("A Clear Path, Together")                                   |
|    - 4 Expanding Stage Panels: 01 Listen | 02 Clarify | 03 Act | 04 Stay Close    |
+-----------------------------------------------------------------------------------+
| 7. FULL-WIDTH ARCHITECTURAL PHOTOGRAPHIC BREAK                                    |
|    - Editorial Quote: "Counsel that sees the whole picture."                      |
+-----------------------------------------------------------------------------------+
| 8. CLIENT SCENARIO SELECTOR ("At a Turning Point")                                |
|    - 3 Interactive Scenarios: "Building something" | "Thinking ahead" | "Crossroads"|
|    - Synchronized Image Swap & Dynamic Advisory Guidance Panel                   |
+-----------------------------------------------------------------------------------+
| 9. CONSULTATION CONVERSION & CHAMBERS SECTION                                     |
|    - Chambers Photography + "Your priorities. Our full attention." + Action CTA  |
+-----------------------------------------------------------------------------------+
| 10. EDITORIAL FOOTER & REGULATORY DISCLOSURE                                      |
+-----------------------------------------------------------------------------------+
```

### 2.2 About / Professional Profile (`/about`)
1. **Hero Header:** Serif title *"The Counsel Behind the Practice"*, establishing counsel's intellectual foundations and background.
2. **Biographical Monograph:** 3-column asymmetric layout with portrait photography, biographical narrative, and core ethos.
3. **Philosophy of Legal Craft:** An editorial essay on diligence, strategic listening, and the duty of an advocate to both client and court.
4. **Admissions & Regulatory Standing:** Formal listing of Bar Council enrolment, State Bar Council affiliation, and High Court / Supreme Court Bar Association memberships.
5. **Academic Foundations:** Verified degrees (LL.B., LL.M.), university distinctions, and continuing legal education.

### 2.3 Career Journey & Milestones (`/career`)
1. **Header:** Title *"A Disciplined Path in Advocacy"*.
2. **Interactive Chronological Timeline:** A vertical chronological track with year markers, detailing:
   - Early training and judicial clerkships.
   - Independent chamber establishment.
   - Significant reported matters and institutional counsel appointments.
   - Academic visiting lectures and monograph releases.
3. **Milestone Detail Panel:** Clicking or focusing on any timeline year expands verified historical records without leaving the page.

### 2.4 Areas of Practice (`/practice-areas`)
1. **Practice Overview:** Introduction detailing counsel’s focus areas, avoiding comparative or superlative claims.
2. **Practice Domain Cards (Editorial Layout):**
   - *Corporate Advisory & Commercial Transactions:* Contracts, mergers, corporate governance, shareholder agreements.
   - *Commercial Dispute Resolution:* Arbitration (domestic and international), mediation, dispute strategy.
   - *Appellate Advocacy & Litigation:* High Court and Supreme Court appellate advocacy, constitutional writs.
   - *Real Estate, Infrastructure & Land Law:* Property acquisitions, title due diligence, regulatory clearances.
3. **Individual Practice Pages (`/[slug]`):** Dedicated deep dives into statutory frameworks, advisory methodologies, and typical client mandates.

### 2.5 Publications & Authored Treatises (`/publications`)
1. **Header:** Title *"Authored Works & Legal Commentary"*.
2. **Curated Books Showcase:** Realistic book cover cards featuring:
   - Book title and subtitle.
   - Publisher name and publication year.
   - ISBN number.
   - Analytical abstract of the treatise.
   - External acquisition links (e.g., Eastern Book Company, LexisNexis, Thomson Reuters).
3. **Journal Articles & Law Reviews:** Filterable catalog of academic papers, peer-reviewed articles, and seminar addresses with downloadable PDF links or public citations.

### 2.6 Selected Reported Judgments (`/judgments`)
1. **Ethical Disclaimer Banner:** Factual declaration noting that past matters do not guarantee future outcomes and are presented solely as a matter of public judicial record.
2. **Judgment Cards:**
   - Formal Case Title (e.g., *Petitioner v. Respondent*).
   - Neutral Citation (e.g., *2024 SCC OnLine SC 1234*).
   - Court / Bench (e.g., *Supreme Court of India, Division Bench*).
   - Legal Subject Matter (e.g., *Section 11, Arbitration & Conciliation Act*).
   - Role of Counsel (e.g., *Appeared for Petitioner*).
   - Core Legal Ratio / Principle Decided.
   - External link to the official High Court or Supreme Court judgment repository.

### 2.7 Insights & Legal Journal (`/insights` & `/insights/[slug]`)
1. **Listing Page (`/insights`):**
   - Featured Essay: Large editorial split card highlighting the most recent analysis.
   - Category Filters: *Corporate Law*, *Arbitration*, *Constitutional Law*, *Regulatory Trends*.
   - Article Cards: Clean title, excerpt, publication date, reading time estimate, and author byline.
2. **Individual Article Page (`/insights/[slug]`):**
   - High-readability single-column layout (max-w-prose / 680px).
   - Clear typographic hierarchy with drop-caps option for leading paragraph.
   - Table of contents side-rail (sticky on desktop).
   - Verified statutory citations and footnotes.
   - Related insights recommendation module at base.

### 2.8 Contact & Chambers (`/contact`)
1. **Chambers Information:**
   - Primary Chamber Address (e.g., New Delhi / High Court premises).
   - Registered Clerk Contact details for matter listing and conferences.
   - Dedicated consultation enquiry email and telephone.
2. **Consultation Scheduling Enquiry Form:**
   - Client Name, Organization, Email, Telephone.
   - Matter Category (Dropdown: Corporate Advisory, Arbitration, Litigation, Other).
   - Brief Overview of Query (with caution against transmitting confidential details prior to conflict check).
   - Mandatory Checkbox: *"I understand that submitting this enquiry does not create an advocate-client relationship."*
3. **Chambers Location Map:** Minimal, styled static map card showing chamber proximity to court complexes.

### 2.9 Regulatory Compliance Pages
1. **Disclaimer (`/disclaimer`):** Explicit Bar Council of India Rule 36 compliance declaration with a "Proceed" confirmation for initial visitors.
2. **Privacy Policy (`/privacy-policy`):** Information regarding data minimization, form inquiry handling, cookie-free analytics, and data retention.
3. **Terms of Engagement (`/terms`):** Terms governing website browsing, intellectual property of publications, and lack of legal advice on the public site.

---

## 3. Global Navigation & User Flows

```
[ Visitor Enters Site ]
          │
          ▼
[ Bar Council Non-Solicitation Notice ] ──► Confirms & Proceeds
          │
          ├──► Explores Homepage Split Hero & Value Pillars
          ├──► Explores Interactive Practice Carousel & Process Accordion
          ├──► Selects Immediate Situation via "At a Turning Point" Selector
          ├──► Navigates to About & Verified Career Journey
          ├──► Inspects Published Treatises & Reported Judgments
          ├──► Reads In-Depth Insights on /insights/[slug]
          └──► Initiates Professional Consultation via /contact
```

### 3.1 Desktop Navigation Bar
- Fixed header with subtle backdrop blur and warm ivory wash.
- Left: Monogram emblem + Advocate Name.
- Center: *About*, *Practice Areas*, *Publications*, *Judgments*, *Insights*.
- Right: Deep forest green action button: `Start a conversation ↗`.

### 3.2 Mobile Navigation Drawer
- Full-screen sheet with warm ivory canvas (`#F8F6F0`).
- Large serif typography for primary navigation links.
- Direct quick links to Chambers Contact and Bar Council Disclaimer.

