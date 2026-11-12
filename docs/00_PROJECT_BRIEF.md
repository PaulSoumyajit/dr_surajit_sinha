# 00 — MASTER PROJECT BRIEF: LAWYER PERSONAL BRAND WEBSITE

**Project:** Surojit Sinha — Advocate & Legal Counsel Personal Brand Website  
**Creative Direction:** Editorial Legal Minimalism  
**Document Status:** Approved Architecture & Specification  
**Authoring Body:** Product Design & Full-Stack Architecture  
**Target Implementation Engine:** Gemini 3.8 / Gemini Flash  

---

## 1. Executive Summary & Vision

The objective of this project is to conceive, design, and engineer an elite personal professional website for **Surojit Sinha**, an individual advocate and legal counsel. 

Unlike contemporary legal-technology platforms, law firm directory portals, or corporate SaaS marketing sites, this website functions as a dignified digital monograph and personal professional identity. It reflects intellectual gravitas, rigorous legal craftsmanship, mature advocacy, and quiet authority.

Every design, typographic, structural, and technical decision is guided by the philosophy of **Editorial Legal Minimalism**:
- Prioritizing content clarity, typography, and calm visual hierarchy over ornamental digital trends.
- Evoking the physical quality of fine legal treatises, judicial opinions, and high-end editorial publications.
- Integrating subtle, purposeful modern interactions that enhance comprehension without feeling trendy or gratuitously animated.

---

## 2. Project Boundaries: What This Website Is and Is NOT

To preserve absolute design integrity and prevent "vibecoding" degradation, strict boundaries are established:

| What This Website IS | What This Website IS NOT |
|---|---|
| A bespoke personal professional identity for an experienced advocate. | A legal-tech startup or software product landing page. |
| An intellectual repository for published books, legal essays, and reported judgments. | A high-volume marketing funnel with aggressive conversion popups. |
| An editorial reading experience built around warm ivory surfaces and deep forest green accents. | A dark-mode cybernetic dashboard with neon cyan accents, terminal windows, or holographic shaders. |
| A restrained, accessible, fast-loading digital chamber. | A WebGL/Three.js 3D showpiece that hijacks scrolling or overheats mobile devices. |
| Strictly compliant with Bar Council regulations regarding professional dignity and non-solicitation. | An aggressive direct-response advertising website promising guaranteed results or comparative rankings. |

---

## 3. Primary Target Audiences

The website is engineered to address four distinct stakeholder personas:

1. **Corporate Counsel & Senior Executives:**  
   General counsel, legal directors, and business founders evaluating senior legal counsel for complex commercial advisory, corporate disputes, and appellate representation. They demand immediate proof of intellectual depth, clarity of thinking, and discreet professionalism.
2. **High-Net-Worth Individuals & Family Offices:**  
   Clients navigating sensitive estate, property, regulatory, or civil disputes who require trusted, bespoke legal counsel rather than an impersonal mega-firm assembly line.
3. **Judicial, Academic & Professional Peers:**  
   Judges, fellow advocates, law faculty, and legal researchers seeking verified citations of published treatises, journal articles, and notable reported judgments.
4. **Prospective Junior Counsel & Researchers:**  
   Talented young lawyers seeking to understand the chamber’s philosophy, ethos, and standards of legal scholarship.

---

## 4. Scope of Deliverables

The project scope encompasses two interconnected workstreams:

### Workstream A: Public-Facing Editorial Website
A statically generated, server-rendered Next.js web application comprising:
1. **Homepage (`/`):** Signature split-screen hero, value pillars, editorial perspective narrative, interactive areas of practice carousel, interactive 4-stage process accordion, full-width architectural photographic break, client situation turning-point selector, and chamber consultation prompt.
2. **About / Professional Profile (`/about`):** Detailed biographical monograph, professional admissions, judicial clerkships, legal philosophy, and chamber history.
3. **Career Journey (`/career`):** Chronological interactive milestone timeline charting professional progression, court admissions, and notable appointments.
4. **Practice Areas (`/practice-areas` & `/[slug]`):** Objective, dignified overviews of core advisory and dispute competencies.
5. **Publications & Treatises (`/publications`):** Curated bibliography of authored textbooks, commentaries, and journal contributions with citation data and purchase/library links.
6. **Selected Reported Judgments (`/judgments`):** Objective, neutrally cited summaries of landmark reported decisions in which counsel appeared, linked to public court records.
7. **Insights & Essays (`/insights` & `/insights/[slug]`):** Long-form editorial legal publication engine with category filtering, reading time estimates, and typography optimized for sustained reading.
8. **Contact & Chambers (`/contact`):** Chamber addresses, clerking contact details, scheduling enquiry workflow, and interactive location references.
9. **Regulatory Disclaimers & Policies (`/disclaimer`, `/privacy-policy`, `/terms`):** Mandatory Bar Council non-solicitation compliance notice and privacy statements.

### Workstream B: Lightweight Content Management Dashboard (CMS)
A protected, server-authenticated back-office interface designed for low-friction maintenance (5–8 articles/month):
1. **Secure Admin Authentication:** Supabase Auth with strict email/password or magic link access.
2. **Article Management Engine:** Markdown/rich-text publishing, draft saving, publishing scheduling, category management, and OpenGraph/SEO tag generation.
3. **FAQ & Consultation Guidance Manager:** Real-time updates to prospective client FAQs and practice guidelines.
4. **Contact Inquiry Log:** Secure, encrypted viewer for consultation requests with audit logging.

---

## 5. Architectural & Design Foundations

- **Visual Baseline:** Derived from the primary video reference (`c78519fad1f246263d5dc30c53229345.mp4`), featuring warm ivory foundations (`#F8F6F0`), deep forest-green accents (`#1B3B2B`), muted sage secondary tones (`#D3DDD6`), and deep ebony-charcoal typography (`#1B1D1C`).
- **Typography:** An intentional pairing of an editorial serif typeface (e.g., *Newsreader* or *Cormorant Garamond*) for headlines and display text, paired with a clean, high-legibility sans-serif (e.g., *Plus Jakarta Sans*) for body copy, data, and metadata.
- **Motion & Interaction:** Restrained, purposeful Framer Motion transitions utilizing the custom cubic-bezier curve `EASE_LUXE` (`[0.22, 1, 0.36, 1]`). Scroll-driven reveals, expandable panels, and smooth transitions occur with zero scroll hijacking.
- **Engineering Stack:** Next.js 15 (App Router), React 19, TypeScript 5, Tailwind CSS v4, Supabase (Database, Auth, Storage), Vercel edge deployment, Cloudflare DNS.

---

## 6. Regulatory & Ethical Compliance (Bar Council of India)

As a practicing advocate subject to the Advocates Act, 1961 and the Bar Council of India (BCI) Rules (specifically Rule 36, Section IV, Chapter II, Part VI):
1. **Strict Non-Solicitation:** The website must not serve as an advertisement or solicitation of professional work.
2. **Mandatory Entry Disclaimer:** The site must feature an explicit disclaimer modal or header declaration confirming that the visitor is accessing information solely of their own volition.
3. **Permissible Disclosures Only:** Information presented is strictly limited to verified factual details: name, contact coordinates, bar council enrolment date/number, verified academic qualifications, areas of practice, and published legal works.
4. **No Comparative Claims:** Zero use of superlative terminology (e.g., "leading advocate," "best lawyer in India," "expert litigator," "guaranteed outcomes").

---

## 7. Success Criteria & KPIs

The implementation will be judged complete and successful when:
1. **Design Authenticity:** The rendered website flawlessly mirrors the restrained luxury and editorial elegance of the reference materials without generic UI clichés.
2. **Code Quality:** Zero TypeScript compilation errors, zero ESLint warnings, 100% type safety, clean Server Component / Client Component boundaries.
3. **Performance:** Google Lighthouse scores $\ge 95$ across Performance, Accessibility, Best Practices, and SEO on mobile and desktop profiles.
4. **Accessibility:** Full WCAG 2.1 AA compliance, including keyboard accessibility, screen-reader semantics, and full respect for `prefers-reduced-motion`.
5. **Security:** Complete Row Level Security (RLS) enforcement on all database tables; zero public exposure of service-role keys.

