# 06 — MASTER IMPLEMENTATION ROADMAP FOR GEMINI

**Project:** Surojit Sinha — Advocate & Legal Counsel Personal Brand Website  
**Creative Direction:** Editorial Legal Minimalism  
**Document Status:** Approved Implementation Master Plan  
**Target Engine:** Gemini 3.8 / Gemini Flash  
**Execution Rule:** Strictly execute ONE step at a time. Do not jump ahead.  

---

## Roadmap Overview & Phase Index

| Phase | Title | Scope | Steps | Status |
|---|---|---|---|---|
| **Phase 1** | Foundation & Tooling | Next.js 15, TypeScript, Tailwind v4, linting & directory structure | P1-01 to P1-08 (8 steps) | **COMPLETED** |
| **Phase 2** | Design Tokens & Primitives | Editorial colors, Newsreader typography, buttons, reveals & cards | P2-01 to P2-08 (8 steps) | **COMPLETED** |
| **Phase 3** | Global Navigation & Shell | Header, monogram emblem, mobile drawer, footer & disclaimer bar | P3-01 to P3-08 (8 steps) | **COMPLETED** |
| **Phase 4** | Homepage Implementation | Split hero, pillars, perspective, carousel, accordion, scenarios | P4-01 to P4-10 (10 steps) | **READY** |
| **Phase 5** | About & Career Timeline | Counsel biography, legal philosophy, admissions & career journey | P5-01 to P5-08 (8 steps) | NOT STARTED |
| **Phase 6** | Practice, Publications & Cases | Practice domains, authored books showcase & reported judgments | P6-01 to P6-08 (8 steps) | NOT STARTED |
| **Phase 7** | Editorial Insights / Journal | Long-form reading engine, category filtering & article layout | P7-01 to P7-08 (8 steps) | NOT STARTED |
| **Phase 8** | Contact & Compliance | Consultation form, chambers addresses, BCI disclaimer modal | P8-01 to P8-08 (8 steps) | NOT STARTED |
| **Phase 9** | Admin CMS & Launch QA | Supabase auth, article editor, FAQ manager, SEO & Lighthouse audit | P9-01 to P9-10 (10 steps) | NOT STARTED |

---

## PHASE 1: Project Foundation, Tooling & Base Configuration

### [P1-01] Initialize Clean Next.js 15 Application with App Router & TypeScript
- **Task ID:** `P1-01`
- **Objective:** Establish the fresh Next.js 15 project skeleton at the project root with React 19, TypeScript strict mode, and App Router enabled.
- **Context:** Provides the modern, clean compilation foundation without any legacy boilerplate from the reference archive.
- **Files to create/modify:** `package.json`, `tsconfig.json`, `next.config.ts`, `.gitignore`
- **Implementation Instructions:** Configure `package.json` with Next.js 15, React 19, TypeScript, and core scripts (`dev`, `build`, `start`, `lint`). Configure `tsconfig.json` with strict type checking, path aliases (`@/*` pointing to `./src/*`), and ESNext module resolution.
- **Dependencies:** None.
- **Acceptance Criteria:**
  - [x] `package.json` contains Next 15 and React 19 dependencies.
  - [x] `tsconfig.json` enforces `strict: true` and `@/*` path mapping.
  - [x] Running `npm run build` or type check produces no configuration errors.
- **Testing Instructions:** Run `npm run build` or `npx tsc --noEmit`.
- **Status:** COMPLETED
- **Gemini Prompt:**
  ```markdown
  Implement step P1-01: Initialize the clean Next.js 15 application at the project root. Create package.json, tsconfig.json (with strict mode and @/* alias), next.config.ts, and .gitignore. Ensure dependencies include next@15, react@19, react-dom@19, and typescript@5. Verify with `npx tsc --noEmit`.
  ```

---

### [P1-02] Configure Tailwind CSS v4 & Core Styling Pipeline
- **Task ID:** `P1-02`
- **Objective:** Install and configure Tailwind CSS v4 with PostCSS and necessary utility extensions.
- **Context:** Foundation for compile-time CSS generation adhering to the Warm Ivory design system.
- **Files to create/modify:** `src/app/globals.css`, `postcss.config.mjs`
- **Implementation Instructions:** Configure Tailwind v4 in `globals.css` with `@import "tailwindcss";`. Ensure PostCSS configuration correctly bridges Tailwind with Next.js Turbopack compiler.
- **Dependencies:** `P1-01`
- **Acceptance Criteria:**
  - [x] Tailwind v4 compiles cleanly without PostCSS warnings.
  - [x] Standard utility classes (e.g. `flex`, `hidden`, `text-center`) are processed correctly.
- **Testing Instructions:** Run `npm run build`.
- **Status:** COMPLETED
- **Gemini Prompt:**
  ```markdown
  Implement step P1-02: Configure Tailwind CSS v4 for Next.js 15. Create postcss.config.mjs and src/app/globals.css with Tailwind v4 setup. Verify with `npm run build`.
  ```

---

### [P1-03] Establish Editorial Color Palette & CSS Variables
- **Task ID:** `P1-03`
- **Objective:** Inject the approved color tokens into `src/app/globals.css` as custom CSS properties and Tailwind utilities.
- **Context:** Implements the warm ivory, deep forest green, and muted sage color architecture defined in `02_DESIGN_PHILOSOPHY.md`.
- **Files to create/modify:** `src/app/globals.css`
- **Implementation Instructions:** Add `:root` CSS variables for `--bg-primary` (`#F8F6F0`), `--bg-surface` (`#F4F1EA`), `--bg-forest-deep` (`#142B20`), `--accent-forest` (`#1B3B2B`), `--accent-sage` (`#D3DDD6`), `--text-primary` (`#1B1D1C`), `--text-muted` (`#515652`), and `--border-subtle` (`#E5E0D6`). Create utility classes `.bg-primary-canvas`, `.bg-surface-card`, `.text-charcoal`, and `.text-forest`.
- **Dependencies:** `P1-02`
- **Acceptance Criteria:**
  - [x] All 8 primary color variables declared in `:root`.
  - [x] Contrast ratio between `--text-primary` and `--bg-primary` exceeds 10:1 (WCAG AAA).
- **Testing Instructions:** Verify CSS compilation via `npm run build`.
- **Status:** COMPLETED
- **Gemini Prompt:**
  ```markdown
  Implement step P1-03: Inject the complete Editorial Legal Minimalism color tokens and utility classes into src/app/globals.css according to docs/02_DESIGN_PHILOSOPHY.md.
  ```

---

### [P1-04] Configure Google Fonts (Newsreader Serif & Plus Jakarta Sans)
- **Task ID:** `P1-04`
- **Objective:** Load and configure *Newsreader* and *Plus Jakarta Sans* using `next/font/google` with optimal font-display and CSS variable binding.
- **Context:** Enforces the dual-font editorial identity, avoiding generic AI fonts.
- **Files to create/modify:** `src/app/layout.tsx`, `src/app/globals.css`
- **Implementation Instructions:** In `src/app/layout.tsx`, import `Newsreader` (weights 400, 500, 600, serif, italic) and `Plus Jakarta Sans` (weights 400, 500, 600, sans-serif). Expose them as `--font-serif` and `--font-sans`. Update `globals.css` font families.
- **Dependencies:** `P1-03`
- **Acceptance Criteria:**
  - [x] Fonts load with `display: swap` without layout shift.
  - [x] Body tag applies `font-sans` by default, serif utility available via `font-serif`.
- **Testing Instructions:** Run `npm run build` and inspect generated HTML font link tags.
- **Status:** COMPLETED
- **Gemini Prompt:**
  ```markdown
  Implement step P1-04: Configure Newsreader and Plus Jakarta Sans in src/app/layout.tsx using next/font/google. Bind them to CSS variables and test via `npm run build`.
  ```

---

### [P1-05] Install & Configure Class Utility Helper (`cn`) & Motion Constants
- **Task ID:** `P1-05`
- **Objective:** Implement `src/lib/utils.ts` with `clsx`, `tailwind-merge`, and the standard `EASE_LUXE` cubic-bezier motion curve.
- **Context:** Standardizes conditional class merging and animation timing across all components.
- **Files to create/modify:** `src/lib/utils.ts`, `package.json`
- **Implementation Instructions:** Install `clsx` and `tailwind-merge`. Export `cn(...inputs)` and constant `EASE_LUXE = [0.22, 1, 0.36, 1] as const`. Export duration constants `DURATION_STANDARD = 0.8` and `DURATION_FAST = 0.35`.
- **Dependencies:** `P1-01`
- **Acceptance Criteria:**
  - [x] `cn()` successfully merges conflicting Tailwind classes.
  - [x] `EASE_LUXE` exported with immutable tuple typing.
- **Testing Instructions:** Run TypeScript validation `npx tsc --noEmit`.
- **Status:** COMPLETED
- **Gemini Prompt:**
  ```markdown
  Implement step P1-05: Create src/lib/utils.ts exporting the `cn` function and the `EASE_LUXE` animation constants documented in docs/02_DESIGN_PHILOSOPHY.md.
  ```

---

### [P1-06] Establish Project Directory Structure & Barrel Exports
- **Task ID:** `P1-06`
- **Objective:** Scaffold the full directory structure for components, libraries, data, and types.
- **Context:** Guarantees architectural modularity and prevents disorganized file placement.
- **Files to create/modify:** Directory tree under `src/components/`, `src/lib/`, `src/types/`
- **Implementation Instructions:** Create `src/components/ui`, `src/components/layout`, `src/components/sections`, `src/components/cms`, `src/lib/data`, `src/lib/supabase`, and `src/types`. Add README or placeholder index files in each directory.
- **Dependencies:** `P1-01`
- **Acceptance Criteria:**
  - [x] Directory tree matches the technical architecture in `05_TECHNICAL_ARCHITECTURE.md`.
- **Testing Instructions:** Inspect directory listing via shell.
- **Status:** COMPLETED
- **Gemini Prompt:**
  ```markdown
  Implement step P1-06: Scaffold the complete directory hierarchy inside src/ matching the specification in docs/05_TECHNICAL_ARCHITECTURE.md.
  ```

---

### [P1-07] Create Unified TypeScript Domain Models
- **Task ID:** `P1-07`
- **Objective:** Define all core TypeScript interfaces: Article, Category, Publication, Judgment, FAQ, and ConsultationInquiry.
- **Context:** Enforces strict domain typing for data rendering and CMS operations.
- **Files to create/modify:** `src/types/index.ts`
- **Implementation Instructions:** Export strictly typed interfaces for `Article`, `Category`, `Publication`, `Judgment`, `FAQ`, `ConsultationInquiry`, and `CounselProfile`.
- **Dependencies:** `P1-06`
- **Acceptance Criteria:**
  - [x] All models contain required fields matching database schema in `05_TECHNICAL_ARCHITECTURE.md`.
  - [x] Zero `any` types.
- **Testing Instructions:** Run `npx tsc --noEmit`.
- **Status:** COMPLETED
- **Gemini Prompt:**
  ```markdown
  Implement step P1-07: Create src/types/index.ts with comprehensive TypeScript interfaces for Article, Publication, Judgment, FAQ, and ConsultationInquiry per docs/05_TECHNICAL_ARCHITECTURE.md.
  ```

---

### [P1-08] Setup Static Data Fallbacks & Profile Constants
- **Task ID:** `P1-08`
- **Objective:** Create verified baseline static data for Advocate Surojit Sinha, practice areas, treatises, and initial essays.
- **Context:** Ensures the website compiles and functions seamlessly with rich editorial content even prior to connecting a live Supabase database.
- **Files to create/modify:** `src/lib/data/profile.ts`, `src/lib/data/practice-areas.ts`, `src/lib/data/publications.ts`, `src/lib/data/judgments.ts`, `src/lib/data/articles.ts`
- **Implementation Instructions:** Populate typed static datasets using approved factual details and explicit bracketed placeholders for pending client inputs.
- **Dependencies:** `P1-07`
- **Acceptance Criteria:**
  - [x] All static data files export strictly typed arrays matching `src/types/index.ts`.
  - [x] Unverified credentials use `[Pending Verification]` placeholders.
- **Testing Instructions:** Run `npx tsc --noEmit`.
- **Status:** COMPLETED
- **Gemini Prompt:**
  ```markdown
  Implement step P1-08: Create static fallback datasets under src/lib/data/ adhering to docs/04_CONTENT_REQUIREMENTS.md with verified advocate data and clear placeholders.
  ```

---

## PHASE 2: Design System Tokens, Typography, Primitives & Animation Base

### [P2-01] Install & Configure Motion for React with Reduced Motion Wrapper
- **Task ID:** `P2-01`
- **Objective:** Install `motion` (Motion for React, official modern package of Framer Motion) and create an accessible motion boundary honoring `prefers-reduced-motion`.
- **Context:** Ensures all subsequent animations degrade gracefully for users sensitive to motion. Uses imports from `motion/react`.
- **Files to create/modify:** `src/components/ui/MotionProvider.tsx`, `package.json`, `src/app/layout.tsx`
- **Implementation Instructions:** Install `motion`. Create `MotionProvider` component and custom hook `useSafeAnimation` that evaluates `useReducedMotion()`. Configure `MotionConfig` with `reducedMotion="user"`.
- **Dependencies:** `P1-05`
- **Acceptance Criteria:**
  - [x] `motion` cleanly installed without peer dependency conflicts.
  - [x] Hook returns instant transitions when reduced motion is preferred.
- **Testing Instructions:** Run `npm run build`.
- **Status:** COMPLETED
- **Gemini Prompt:**
  ```markdown
  Implement step P2-01: Install motion and create src/components/ui/MotionProvider.tsx with reduced-motion accessibility support.
  ```

---

### [P2-02] Build Editorial Button Primitive (`Button.tsx`)
- **Task ID:** `P2-02`
- **Objective:** Develop the polymorphic button component supporting `primary` (deep forest green), `secondary` (warm ivory/stone), `outline`, and `editorial-text` variants.
- **Context:** Reusable interaction trigger observed in video reference (e.g. `Start a conversation ↗`).
- **Files to create/modify:** `src/components/ui/Button.tsx`
- **Implementation Instructions:** Support sizes `sm`, `md`, `lg`. Support optional trailing/leading diagonal arrow icon (`↗`) with smooth 2px hover translation. Support `asChild` or polymorphic `href` linking.
- **Dependencies:** `P1-05`
- **Acceptance Criteria:**
  - [x] Primary variant renders deep forest green (`#1B3B2B`) with warm ivory text.
  - [x] Hover state executes smooth transition with arrow micro-translation.
- **Testing Instructions:** Build a simple test page or story to verify styles and hover states.
- **Status:** COMPLETED
- **Gemini Prompt:**
  ```markdown
  Implement step P2-02: Create src/components/ui/Button.tsx supporting primary, secondary, outline, and editorial-text variants matching docs/02_DESIGN_PHILOSOPHY.md.
  ```

---

### [P2-03] Build Viewport Reveal Component (`Reveal.tsx`)
- **Task ID:** `P2-03`
- **Objective:** Refactor CITS `Reveal.tsx` into a lightweight, calm editorial reveal primitive without heavy blurs.
- **Context:** Used to smoothly reveal cards, editorial columns, and images upon scroll.
- **Files to create/modify:** `src/components/ui/Reveal.tsx`
- **Implementation Instructions:** Use `motion.div` with initial `opacity: 0, y: 18` to `opacity: 1, y: 0`. Transition with `EASE_LUXE` over `0.8s`. Trigger viewport `{ once: true, margin: "-10% 0px" }`. Honor `useSafeAnimation` for reduced-motion users.
- **Dependencies:** `P2-01`
- **Acceptance Criteria:**
  - [x] No mobile lag or blur-induced frame drops.
  - [x] Fires cleanly when elements scroll into view.
- **Testing Instructions:** Run `npm run build`.
- **Status:** COMPLETED
- **Gemini Prompt:**
  ```markdown
  Implement step P2-03: Create src/components/ui/Reveal.tsx using framer-motion and EASE_LUXE for calm, blur-free editorial viewport reveals.
  ```

---

### [P2-04] Build Editorial Heading with Word Reveal (`AnimatedHeading.tsx`)
- **Task ID:** `P2-04`
- **Objective:** Adapt CITS `AnimatedHeading.tsx` to support serif typography and understated upward reveals for monument headlines.
- **Context:** Delivers the sophisticated title animation seen in the reference video without gaudy cybernetic glows.
- **Files to create/modify:** `src/components/ui/AnimatedHeading.tsx`
- **Implementation Instructions:** Split string into words, wrapping each in overflow-hidden spans. Stagger children with `stagger: 0.045s`. Render using `font-serif` and high-contrast charcoal styling.
- **Dependencies:** `P2-01`
- **Acceptance Criteria:**
  - [x] Clean accessibility with proper `aria-label` matching full text.
  - [x] Words reveal smoothly without jitter or text layout shift.
- **Testing Instructions:** Verify via browser test and `npm run build`.
- **Status:** COMPLETED
- **Gemini Prompt:**
  ```markdown
  Implement step P2-04: Create src/components/ui/AnimatedHeading.tsx tailored for serif editorial headlines with staggered word reveals and accessible aria-labels.
  ```

---

### [P2-05] Build Responsive Content Container (`Container.tsx`)
- **Task ID:** `P2-05`
- **Objective:** Create the standardized site width wrapper enforcing `max-w-7xl`, `max-w-6xl`, and reading width `max-w-prose`.
- **Context:** Enforces consistent horizontal padding and alignment across all viewports.
- **Files to create/modify:** `src/components/ui/Container.tsx`
- **Implementation Instructions:** Responsive padding: `px-4 sm:px-6 lg:px-8`. Support size variants `default` (`max-w-7xl`), `narrow` (`max-w-6xl`), and `prose` (`max-w-prose`, aligned with `02_DESIGN_PHILOSOPHY.md` to preserve optimal 65–72ch reading length).
- **Dependencies:** `P1-05`
- **Acceptance Criteria:**
  - [x] Consistent margins maintained on mobile (360px) and wide desktop (1920px).
- **Testing Instructions:** Test across viewport widths.
- **Status:** COMPLETED
- **Gemini Prompt:**
  ```markdown
  Implement step P2-05: Create src/components/ui/Container.tsx with default, narrow, and prose width variants.
  ```

---

### [P2-06] Build Category Eyebrow & Badge Primitive (`Badge.tsx`)
- **Task ID:** `P2-06`
- **Objective:** Build the uppercase tracked eyebrow badge component (e.g. `• THE SINHA PERSPECTIVE`).
- **Context:** Essential visual marker observed in video reference for section categorization.
- **Files to create/modify:** `src/components/ui/Badge.tsx`
- **Implementation Instructions:** Render tracked uppercase text (`tracking-widest`, 11px/12px) with optional leading circular bullet or organic sage background pill.
- **Dependencies:** `P1-03`
- **Acceptance Criteria:**
  - [x] Crisp font rendering with proper letter-spacing (`0.12em`).
- **Testing Instructions:** Run `npm run build`.
- **Status:** COMPLETED
- **Gemini Prompt:**
  ```markdown
  Implement step P2-06: Create src/components/ui/Badge.tsx for uppercase editorial category labels and status pills.
  ```

---

### [P2-07] Build Expandable Accordion Primitive (`Accordion.tsx`)
- **Task ID:** `P2-07`
- **Objective:** Refactor CITS `Accordion.tsx` into a warm ivory card accordion with fluid height expansion.
- **Context:** Powers FAQ sections, practice details, and process panels.
- **Files to create/modify:** `src/components/ui/Accordion.tsx`
- **Implementation Instructions:** Use `AnimatePresence` for smooth height expansion. Style with subtle borders (`#E5E0D6`), warm ivory backgrounds, and refined rotating plus/chevron icon.
- **Dependencies:** `P2-01`
- **Acceptance Criteria:**
  - [x] Accessible ARIA attributes (`aria-expanded`, `aria-controls`).
  - [x] Height animation completes with `EASE_LUXE` with zero jump.
- **Testing Instructions:** Test keyboard navigation (Enter/Space toggles).
- **Status:** COMPLETED
- **Gemini Prompt:**
  ```markdown
  Implement step P2-07: Create src/components/ui/Accordion.tsx with warm ivory styling and fluid height transitions.
  ```

---

### [P2-08] Build Static Image Frame with Editorial Aspect Ratios (`EditorialImage.tsx`)
- **Task ID:** `P2-08`
- **Objective:** Create a wrapper around Next.js `Image` providing warm tint overlays, restrained corner radii, and caption typography.
- **Context:** Enforces uniform photographic treatment across portraits, architecture, and publications.
- **Files to create/modify:** `src/components/ui/EditorialImage.tsx`
- **Implementation Instructions:** Support aspect ratios `16/9`, `4/3`, `3/4`, and `1/1`. Apply subtle border (`border border-subtle`), `rounded-xl`, and optional overlay caption.
- **Dependencies:** `P1-05`
- **Acceptance Criteria:**
  - [x] Zero layout shift (`next/image` layout properties configured).
  - [x] Optional warm sepia/ivory wash on hover.
- **Testing Instructions:** Run `npm run build`.
- **Status:** COMPLETED
- **Gemini Prompt:**
  ```markdown
  Implement step P2-08: Create src/components/ui/EditorialImage.tsx wrapping Next.js Image with editorial aspect ratios, rounded corners, and captions.
  ```

---

## PHASE 3: Global Site Shell, Header Navigation & Footer

### [P3-01] Design Monogram Emblem & Brand Wordmark Component
- **Task ID:** `P3-01`
- **Objective:** Create the vector monogram emblem ("SS" for Surojit Sinha) and editorial wordmark component with title "Advocate & Legal Counsel".
- **Context:** Anchors the top-left navigation and footer branding, replacing reference brand "Alden & Vale".
- **Files to create/modify:** `src/components/layout/BrandLogo.tsx`
- **Implementation Instructions:** Vector SVG monogram using interlocking serif letters paired with clean wordmark: `SUROJIT SINHA` in serif caps and `ADVOCATE & LEGAL COUNSEL` in tracked uppercase sans.
- **Dependencies:** `P1-03`
- **Acceptance Criteria:**
  - [x] Scales crisply at 32px (mobile header) and 48px (footer).
  - [x] Accessible link to `/` with descriptive `aria-label`.
- **Testing Instructions:** Inspect SVG rendering across zoom levels.
- **Status:** COMPLETED
- **Gemini Prompt:**
  ```markdown
  Implement step P3-01: Create src/components/layout/BrandLogo.tsx with vector monogram emblem and editorial wordmark for Advocate Surojit Sinha.
  ```

---

### [P3-02] Build Desktop Sticky Navigation Bar
- **Task ID:** `P3-02`
- **Objective:** Build the fixed desktop navigation header with translucent warm ivory background and restrained link transitions.
- **Context:** Delivers the primary header observed in the video reference.
- **Files to create/modify:** `src/components/layout/Navbar.tsx`
- **Implementation Instructions:** Sticky positioning with `backdrop-blur-md` and `bg-primary-canvas/85`. Nav links: *About*, *Practice Areas*, *Publications*, *Judgments*, *Insights*. Right CTA button: `Contact details ↗` (compliant with BCI Rule 36 non-solicitation guidelines).
- **Dependencies:** `P2-02`, `P3-01`
- **Acceptance Criteria:**
  - [x] Header subtly borders on scroll via scroll-listener state.
  - [x] Active route highlighted with subtle ivory dot or underline.
- **Testing Instructions:** Scroll page and verify header behavior.
- **Status:** COMPLETED
- **Gemini Prompt:**
  ```markdown
  Implement step P3-02: Create src/components/layout/Navbar.tsx with sticky blur background, navigation links, and primary CTA button.
  ```

---

### [P3-03] Build Accessible Mobile Navigation Drawer
- **Task ID:** `P3-03`
- **Objective:** Create the full-screen mobile navigation overlay with smooth slide-in animation and keyboard focus trap.
- **Context:** Ensures effortless mobile navigation on 360px–768px viewports.
- **Files to create/modify:** `src/components/layout/MobileNav.tsx`
- **Implementation Instructions:** Hamburger trigger icon morphing to close icon. AnimatePresence slide/fade drawer. Large serif navigation links, direct telephone/clerk contact, and disclaimer link.
- **Dependencies:** `P3-02`
- **Acceptance Criteria:**
  - [x] Body scroll locked when drawer is open.
  - [x] Escape key closes drawer and returns focus to toggle button.
- **Testing Instructions:** Test drawer toggle on simulated mobile viewport in Chrome DevTools.
- **Status:** COMPLETED
- **Gemini Prompt:**
  ```markdown
  Implement step P3-03: Create src/components/layout/MobileNav.tsx with full-screen warm ivory sheet, keyboard trap, and smooth Motion for React transitions.
  ```

---

### [P3-04] Build Comprehensive Editorial Footer
- **Task ID:** `P3-04`
- **Objective:** Build the structured editorial footer matching the video reference composition.
- **Context:** Delivers bottom navigation, chambers coordinates, copyright, and regulatory compliance.
- **Files to create/modify:** `src/components/layout/Footer.tsx`
- **Implementation Instructions:** Top tier: Brand monogram, full wordmark, two-column navigation links, and `Back to top ↗` smooth scroll button. Bottom tier: Bar Council regulatory notice, copyright statement, disclaimer, and privacy policy links.
- **Dependencies:** `P3-01`
- **Acceptance Criteria:**
  - [x] `Back to top` triggers smooth window scroll to `(0, 0)`.
  - [x] Full compliance links present and navigable.
- **Testing Instructions:** Click `Back to top` and verify smooth scroll.
- **Status:** COMPLETED
- **Gemini Prompt:**
  ```markdown
  Implement step P3-04: Create src/components/layout/Footer.tsx with multi-column links, chamber information, Back to Top control, and regulatory notices.
  ```

---

### [P3-05] Build Persistent Bar Council Disclaimer Bar
- **Task ID:** `P3-05`
- **Objective:** Implement an understated, non-intrusive compliance banner/bar in the site shell declaring non-solicitation status.
- **Context:** Mandatory legal requirement under Bar Council of India Rule 36.
- **Files to create/modify:** `src/components/layout/RegulatoryNoticeBar.tsx`
- **Implementation Instructions:** Thin banner at top or bottom with muted text: *"Advocate profile published strictly for informational purposes under Bar Council of India rules."* Link to full `/disclaimer`.
- **Dependencies:** `P1-03`
- **Acceptance Criteria:**
  - [x] Clear readability without obstructing navigation.
  - [x] Dismissible with state remembered in sessionStorage.
- **Testing Instructions:** Verify dismissal persistence in browser.
- **Status:** COMPLETED
- **Gemini Prompt:**
  ```markdown
  Implement step P3-05: Create src/components/layout/RegulatoryNoticeBar.tsx providing understated BCI non-solicitation notice with session-based dismissal.
  ```

---

### [P3-06] Build Global SiteShell Wrapper Component
- **Task ID:** `P3-06`
- **Objective:** Combine Navbar, RegulatoryNoticeBar, main content area, and Footer into a unified `SiteShell` wrapper.
- **Context:** Wraps all public routes in `src/app/(public)/layout.tsx`.
- **Files to create/modify:** `src/components/layout/SiteShell.tsx`, `src/app/(public)/layout.tsx`
- **Implementation Instructions:** Compose layout components with `<main id="main-content" className="flex-1">` ensuring semantic HTML and skip-to-content accessibility link.
- **Dependencies:** `P3-02`, `P3-04`, `P3-05`
- **Acceptance Criteria:**
  - [x] Skip-to-content link visible on keyboard tab focus.
  - [x] Sticky footer stays at bottom on short pages (`min-h-screen flex flex-col`).
- **Testing Instructions:** Tab through page to test skip link.
- **Status:** COMPLETED
- **Gemini Prompt:**
  ```markdown
  Implement step P3-06: Create src/components/layout/SiteShell.tsx assembling the global layout with skip-to-content accessibility.
  ```

---

### [P3-07] Create Custom Editorial 404 Not Found Page
- **Task ID:** `P3-07`
- **Objective:** Design an elegant, dignified 404 error page matching the warm ivory theme.
- **Context:** Prevents abrupt default Next.js error screens when links are broken.
- **Files to create/modify:** `src/app/not-found.tsx`
- **Implementation Instructions:** Serif heading *"Page Not Located"*, gentle explanatory paragraph, and primary button `Return to Chambers Foyer ↗` leading to `/`.
- **Dependencies:** `P2-02`, `P3-06`
- **Acceptance Criteria:**
  - [x] Matches design tokens perfectly (warm ivory surface, forest green button).
- **Testing Instructions:** Navigate to `/non-existent-route` and verify.
- **Status:** COMPLETED
- **Gemini Prompt:**
  ```markdown
  Implement step P3-07: Create src/app/not-found.tsx with editorial typography and return navigation.
  ```

---

### [P3-08] Phase 3 Integration & Shell Verification Checkpoint
- **Task ID:** `P3-08`
- **Objective:** Verify global navigation, mobile drawer, footer, and responsive behavior across all standard breakpoints.
- **Context:** Ensures the outer layout is rock-solid before building page content.
- **Files to create/modify:** `docs/06_IMPLEMENTATION_ROADMAP.md` (status update)
- **Implementation Instructions:** Run build, test 360px, 768px, 1440px viewports. Confirm zero console errors.
- **Dependencies:** `P3-01` through `P3-07`
- **Acceptance Criteria:**
  - [x] `npm run build` succeeds with zero errors.
  - [x] Responsive navigation functions on mobile and desktop.
- **Testing Instructions:** Run `npm run build` and `npm run lint`.
- **Status:** COMPLETED
- **Gemini Prompt:**
  ```markdown
  Execute checkpoint P3-08: Run full build and lint checks, test mobile navigation toggle, and verify footer links across all breakpoints.
  ```

---

## PHASE 4: Homepage Implementation — Hero to Closing CTA

### [P4-01] Build Signature Split-Screen Hero Section
- **Task ID:** `P4-01`
- **Objective:** Construct the 50/50 split hero container observed in video frames 001 and 038.
- **Context:** The central visual centerpiece of the website establishing immediate credibility.
- **Files to create/modify:** `src/components/sections/HeroSplit.tsx`
- **Implementation Instructions:** Outer container `rounded-2xl overflow-hidden`.
  - Left Card: Deep forest green background (`#142B20`), uppercase tracked eyebrow `INDEPENDENT ADVOCACY. STRATEGIC COUNSEL`, large serif headline *"Your next move. On solid ground."*, muted ivory body text, and warm ivory pill button `Start a conversation ↗`.
  - Right Media Card: Architectural motion video/poster with overlay text `"A BROADER PERSPECTIVE. A CLEARER WAY FORWARD."`, and subtle play/pause control button in bottom-right.
- **Dependencies:** `P2-02`, `P2-04`, `P2-05`
- **Acceptance Criteria:**
  - [x] Flawless 50/50 desktop split, collapsing gracefully to stacked cards on mobile (<1024px).
  - [x] Headline renders in serif with high visual contrast.
- **Testing Instructions:** Inspect layout on 1440px desktop and 390px mobile.
- **Status:** COMPLETED
- **Gemini Prompt:**
  ```markdown
  Implement step P4-01: Create src/components/sections/HeroSplit.tsx matching the signature 50/50 split hero in video frames 001 & 038 per docs/01_REFERENCE_AUDIT.md.
  ```

---

### [P4-02] Build Value Pillars Section (Under-Hero)
- **Task ID:** `P4-02`
- **Objective:** Create the 3-column editorial text block situated directly beneath the hero.
- **Context:** Delivers the three pillars observed in video frame 038.
- **Files to create/modify:** `src/components/sections/ValuePillars.tsx`
- **Implementation Instructions:** 3-column grid (`grid-cols-1 md:grid-cols-3 gap-8`).
  1. *Direct conversations:* "Clear answers. An advocate who knows your matter intimately."
  2. *A connected perspective:* "Your commercial reality, your risks, and the judicial landscape."
  3. *Considered next steps:* "Pragmatic legal strategy with your overarching objectives in view."
  Include minimal line icons with 1.25px stroke weight.
- **Dependencies:** `P2-03`, `P2-05`
- **Acceptance Criteria:**
  - [x] Subtle top border dividing hero from pillars.
  - [x] Balanced editorial column rhythm.
- **Testing Instructions:** Test column wrapping on tablet (768px).
- **Status:** COMPLETED
- **Gemini Prompt:**
  ```markdown
  Implement step P4-02: Create src/components/sections/ValuePillars.tsx with 3 editorial columns beneath the hero per docs/01_REFERENCE_AUDIT.md.
  ```

---

### [P4-03] Build Editorial Perspective Section ("The Sinha Perspective")
- **Task ID:** `P4-03`
- **Objective:** Construct the asymmetric two-column perspective layout from video frame 005.
- **Context:** Introduces counsel's philosophy of legal craft and client engagement.
- **Files to create/modify:** `src/components/sections/PerspectiveSection.tsx`
- **Implementation Instructions:**
  - Left column: Category tag `• THE SINHA PERSPECTIVE`.
  - Right column: Large serif display statement *"The right answer starts with the right questions."*, followed by two-column explanatory prose, text action link `A more considered approach ↗`, and three micro-feature badges (*Clear direction*, *Personal attention*, *Thoughtful protection*).
- **Dependencies:** `P2-03`, `P2-06`
- **Acceptance Criteria:**
  - [x] Mirrors composition of video frame 005.
  - [x] Generous vertical padding (`py-28`).
- **Testing Instructions:** Run `npm run build` and inspect responsive wrap.
- **Status:** COMPLETED
- **Gemini Prompt:**
  ```markdown
  Implement step P4-03: Create src/components/sections/PerspectiveSection.tsx matching video frame 005 with editorial headline, dual-column prose, and micro-feature badges.
  ```

---

### [P4-04] Build Interactive Expertise Carousel Component
- **Task ID:** `P4-04`
- **Objective:** Build the interactive carousel from video frame 010 featuring practice domains, numeric pagination, and slide transitions.
- **Context:** Showcases core legal practice areas with high-end architectural imagery.
- **Files to create/modify:** `src/components/sections/PracticeCarousel.tsx`
- **Implementation Instructions:** Header with eyebrow `AREAS OF PRACTICE` and headline *"Disciplined counsel across commercial and appellate domains."* Top-right numeric index (`01 / 03`, reflecting the 3 confirmed practice disciplines) with circular arrow buttons. Split slide card: left content (domain name, editorial headline, substantive description, statutory touchpoint tags, button), right architectural photograph. Bottom segmented progress track.
- **Dependencies:** `P2-01`, `P2-03`, `P1-08`
- **Acceptance Criteria:**
  - [x] Arrow clicks advance slides with smooth cross-fade.
  - [x] Touch swipe supported on mobile viewports.
  - [x] Keyboard left/right arrow navigation supported.
- **Testing Instructions:** Click through all slides and verify progress track updates.
- **Status:** COMPLETED
- **Gemini Prompt:**
  ```markdown
  Implement step P4-04: Create src/components/sections/PracticeCarousel.tsx matching video frame 010 with numeric pagination (01/03), arrow buttons, split practice card, and progress track.
  ```

---

### [P4-05] Build Process Accordion / Multi-Panel ("A Clear Path, Together")
- **Task ID:** `P4-05`
- **Objective:** Construct the 4-stage horizontal expandable panel from video frame 015.
- **Context:** Details the four steps of engagement: 01 Listen, 02 Clarify, 03 Act, 04 Stay Close.
- **Files to create/modify:** `src/components/sections/ProcessAccordion.tsx`
- **Implementation Instructions:** Horizontal multi-panel on desktop, vertical stack on mobile. Active stage expands with dark photographic background and detailed prose. Collapsed stages display step number, label, and disclosure trigger. Bottom link: `EVERY STEP, IN PARTNERSHIP. Let's begin with you ↗`.
- **Dependencies:** `P2-01`, `P2-07`
- **Acceptance Criteria:**
  - [x] Clicking any collapsed stage smoothly expands it while collapsing others.
  - [x] Fluid transition with `EASE_LUXE`.
- **Testing Instructions:** Toggle all 4 stages and verify layout stability.
- **Status:** COMPLETED
- **Gemini Prompt:**
  ```markdown
  Implement step P4-05: Create src/components/sections/ProcessAccordion.tsx implementing the 4-stage expanding panel from video frame 015 with responsive horizontal/vertical behavior.
  ```

---

### [P4-06] Build Full-Width Photographic Editorial Quote Break
- **Task ID:** `P4-06`
- **Objective:** Construct the cinematic photographic section observed in video frame 022.
- **Context:** Visual pause providing narrative depth.
- **Files to create/modify:** `src/components/sections/PhotoQuoteBreak.tsx`
- **Implementation Instructions:** Full-width photographic container with rounded corners (`rounded-2xl`). High-resolution executive conference room image with dark scrim overlay. Left-aligned white serif display text: `THOUGHTFUL BY DESIGN`, *"Counsel that sees the whole picture."*, body copy, and link `Meet us in conversation ↗`.
- **Dependencies:** `P2-03`, `P2-08`
- **Acceptance Criteria:**
  - [x] Text legibility preserved against background image via graded overlay.
- **Testing Instructions:** Inspect across screen resolutions.
- **Status:** COMPLETED
- **Gemini Prompt:**
  ```markdown
  Implement step P4-06: Create src/components/sections/PhotoQuoteBreak.tsx matching video frame 022 with photographic backdrop and editorial quote overlay.
  ```

---

### [P4-07] Build Client Scenario Selector ("At a Turning Point")
- **Task ID:** `P4-07`
- **Objective:** Construct the 3-scenario interactive switcher from video frames 026 and 030.
- **Context:** Reorients legal advisory around client life/business turning points rather than statutory codes.
- **Files to create/modify:** `src/components/sections/ScenarioSwitcher.tsx`
- **Implementation Instructions:**
  - Left column: 3 interactive cards: `I'm building something`, `I'm thinking ahead`, `I'm at a crossroads`. Active card receives forest green background with white text.
  - Center column: Vertical architectural image that cross-fades when selection changes.
  - Right column: Dynamic guidance panel with contextual headline, strategic explanation, topical pills, and consultation button.
- **Dependencies:** `P2-01`, `P2-02`
- **Acceptance Criteria:**
  - [x] Clicking any card instantaneously switches center image and right content with 0.35s fade.
  - [x] Accessible as an ARIA tablist (`role="tablist"`).
- **Testing Instructions:** Click each scenario card and observe synchronized image/text updates.
- **Status:** COMPLETED
- **Gemini Prompt:**
  ```markdown
  Implement step P4-07: Create src/components/sections/ScenarioSwitcher.tsx matching video frames 026 & 030 with 3-tab scenario selector, dynamic imagery, and guidance panel.
  ```

---

### [P4-08] Build Consultation Conversion & Chambers Section
- **Task ID:** `P4-08`
- **Objective:** Construct the closing consultation section from video frame 034.
- **Context:** Converts visitor interest into a formal chambers inquiry.
- **Files to create/modify:** `src/components/sections/ChambersCta.tsx`
- **Implementation Instructions:** Asymmetric split container:
  - Left: Warm photograph of modern private legal chambers corridor.
  - Right: Warm parchment card featuring headline *"Your priorities. Our full attention."*, body *"Tell us where you are today. Let's discuss where you want to go next."*, forest green button `Start a conversation ↗`, and reassuring notice `• A thoughtful first step. Clear terms, transparent fees.`
- **Dependencies:** `P2-02`, `P2-08`
- **Acceptance Criteria:**
  - [x] Direct link to `/contact` route.
  - [x] Matches framing and typography of video frame 034.
- **Testing Instructions:** Run `npm run build`.
- **Status:** COMPLETED
- **Gemini Prompt:**
  ```markdown
  Implement step P4-08: Create src/components/sections/ChambersCta.tsx matching video frame 034 with chambers photography and primary consultation invitation.
  ```

---

### [P4-09] Assemble & Compose Full Homepage (`src/app/page.tsx`)
- **Task ID:** `P4-09`
- **Objective:** Integrate all homepage sections into `src/app/page.tsx` with proper section wrappers, anchors, and structured data.
- **Context:** Brings the entire homepage experience to life.
- **Files to create/modify:** `src/app/page.tsx`, `src/lib/seo.ts`
- **Implementation Instructions:** Sequentially render HeroSplit, ValuePillars, PerspectiveSection, PracticeCarousel, ProcessAccordion, PhotoQuoteBreak, ScenarioSwitcher, and ChambersCta within Container wrappers. Inject `LegalService` JSON-LD structured data.
- **Dependencies:** `P4-01` through `P4-08`
- **Acceptance Criteria:**
  - [x] Homepage renders complete visual journey from video reference.
  - [x] Zero hydration mismatches or console warnings.
- **Testing Instructions:** Navigate to `/` in browser and test full page scroll.
- **Status:** COMPLETED
- **Gemini Prompt:**
  ```markdown
  Implement step P4-09: Assemble the complete homepage in src/app/page.tsx integrating all 8 sections and JSON-LD structured data per docs/03_INFORMATION_ARCHITECTURE.md.
  ```

---

### [P4-10] Phase 4 Homepage Verification & Polish Checkpoint
- **Task ID:** `P4-10`
- **Objective:** Conduct full visual, interactive, and responsive verification of the homepage against video reference frames.
- **Context:** Guarantees design fidelity before proceeding to secondary pages.
- **Files to create/modify:** `docs/06_IMPLEMENTATION_ROADMAP.md` (status update)
- **Implementation Instructions:** Test homepage across 360px, 390px, 768px, 1024px, 1440px viewports. Confirm carousel, accordion, and scenario switcher operate smoothly.
- **Dependencies:** `P4-09`
- **Acceptance Criteria:**
  - [x] Visual hierarchy matches reference video.
  - [x] Zero layout shift or overflow bugs.
- **Testing Instructions:** Run `npm run build` and visual inspection.
- **Status:** COMPLETED
- **Gemini Prompt:**
  ```markdown
  Execute checkpoint P4-10: Test the complete homepage across all responsive viewports, verify all animations and interactive components, and resolve any layout inconsistencies.
  ```

---

## PHASE 5: About, Professional Profile & Career Journey

### [P5-01] Build About Page Hero & Biographical Monograph
- **Task ID:** `P5-01`
- **Objective:** Construct the editorial biography hero on `/about`.
- **Context:** Presents counsel's personal narrative, legal background, and professional ethos.
- **Files to create/modify:** `src/app/about/page.tsx`, `src/components/sections/AboutBio.tsx`
- **Implementation Instructions:** Monumental serif headline *"The Counsel Behind the Practice"*, executive portrait frame, biographical narrative in 2-column editorial prose, and prominent pull-quote on advocacy.
- **Dependencies:** `P2-03`, `P2-08`, `P1-08`
- **Acceptance Criteria:**
  - [x] Content adheres to verified facts in `04_CONTENT_REQUIREMENTS.md`.
  - [x] Clean reading column width (`max-w-prose`).
- **Testing Instructions:** Navigate to `/about` and verify layout.
- **Status:** COMPLETED
- **Gemini Prompt:**
  ```markdown
  Implement step P5-01: Create the biographical monograph section in src/app/about/page.tsx with portrait photography, editorial prose, and advocacy pull-quote.
  ```

---

### [P5-02] Build Philosophy of Legal Craft Module
- **Task ID:** `P5-02`
- **Objective:** Create the in-depth essay component exploring counsel's philosophy of strategic advocacy and judicial craft.
- **Context:** Reinforces intellectual depth for corporate counsel and judicial peers.
- **Files to create/modify:** `src/components/sections/LegalPhilosophy.tsx`
- **Implementation Instructions:** Asymmetrical card pairing: left card highlighting three core canons (Diligence, Strategic Listening, Institutional Integrity); right card with commentary on constitutional and commercial jurisprudence.
- **Dependencies:** `P2-03`
- **Acceptance Criteria:**
  - [x] Elegant typography with subtle stone borders.
- **Testing Instructions:** Run `npm run build`.
- **Status:** COMPLETED
- **Gemini Prompt:**
  ```markdown
  Implement step P5-02: Create src/components/sections/LegalPhilosophy.tsx detailing counsel's canons of practice per docs/03_INFORMATION_ARCHITECTURE.md.
  ```

---

### [P5-03] Build Formal Admissions & Bar Affiliations Table
- **Task ID:** `P5-03`
- **Objective:** Display formal Bar Council admissions, court bar associations, and enrolment details in a dignified table.
- **Context:** Essential regulatory and credential disclosure.
- **Files to create/modify:** `src/components/sections/AdmissionsTable.tsx`
- **Implementation Instructions:** Clean tabular layout with warm stone headers. Columns: Court/Body, Enrolment/Admissions Year, Standing, Jurisdiction. Integrates clear placeholders for pending verification.
- **Dependencies:** `P1-08`
- **Acceptance Criteria:**
  - [x] Discloses Bar Council enrolment details factually without promotional embellishment.
- **Testing Instructions:** Inspect table rendering on mobile and desktop.
- **Status:** COMPLETED
- **Gemini Prompt:**
  ```markdown
  Implement step P5-03: Create src/components/sections/AdmissionsTable.tsx with factual bar enrolment and court admissions data.
  ```

---

### [P5-04] Build Academic Foundations & Judicial Clerkships Section
- **Task ID:** `P5-04`
- **Objective:** Present university degrees, academic honors, and early judicial training.
- **Context:** Validates educational rigor and academic depth.
- **Files to create/modify:** `src/components/sections/AcademicFoundations.tsx`
- **Implementation Instructions:** Editorial cards detailing LL.B., LL.M., university institutions, research fellowships, and clerkships.
- **Dependencies:** `P1-08`
- **Acceptance Criteria:**
  - [x] Strict adherence to verified credentials from `04_CONTENT_REQUIREMENTS.md`.
- **Testing Instructions:** Run `npm run build`.
- **Status:** COMPLETED
- **Gemini Prompt:**
  ```markdown
  Implement step P5-04: Create src/components/sections/AcademicFoundations.tsx displaying verified academic credentials and judicial clerkship history.
  ```

---

### [P5-05] Build Interactive Career Timeline Component (`/career`)
- **Task ID:** `P5-05`
- **Objective:** Build the vertical interactive milestone timeline on `/career`.
- **Context:** Visualizes counsel's career progression chronologically.
- **Files to create/modify:** `src/app/career/page.tsx`, `src/components/sections/CareerTimeline.tsx`
- **Implementation Instructions:** Vertical track with year nodes (e.g. 2012, 2016, 2020, 2024). Clicking or scrolling to a node highlights milestone details: chamber establishment, landmark counsel appointments, and publications.
- **Dependencies:** `P2-01`, `P2-03`, `P1-08`
- **Acceptance Criteria:**
  - [x] Smooth line-drawing progress indicator on scroll.
  - [x] Keyboard accessible milestone navigation.
- **Testing Instructions:** Scroll down `/career` and verify milestone activations.
- **Status:** COMPLETED
- **Gemini Prompt:**
  ```markdown
  Implement step P5-05: Create src/app/career/page.tsx and src/components/sections/CareerTimeline.tsx with an interactive vertical chronological milestone tracker.
  ```

---

### [P5-06] Build Notable Appointments & Retainers Module
- **Task ID:** `P5-06`
- **Objective:** Present verified institutional appointments, arbitral panel empanelments, and advisory roles.
- **Context:** Demonstrates trusted standing in commercial and regulatory spheres.
- **Files to create/modify:** `src/components/sections/AppointmentsList.tsx`
- **Implementation Instructions:** Grid of structured cards displaying appointing authority, nature of empanelment, and tenure, strictly using factual language.
- **Dependencies:** `P1-08`
- **Acceptance Criteria:**
  - [x] Zero exaggerated or promotional descriptions.
- **Testing Instructions:** Run `npm run build`.
- **Status:** COMPLETED
- **Gemini Prompt:**
  ```markdown
  Implement step P5-06: Create src/components/sections/AppointmentsList.tsx displaying verified institutional empanelments and counsel roles.
  ```

---

### [P5-07] Build Chambers Culture & Mentorship Narrative
- **Task ID:** `P5-07`
- **Objective:** Present counsel's dedication to chamber scholarship, junior advocacy training, and pro bono contributions.
- **Context:** Attracts high-caliber junior researchers and illustrates chamber values.
- **Files to create/modify:** `src/components/sections/ChambersCulture.tsx`
- **Implementation Instructions:** Split card with interior chamber photography and narrative regarding legal research standards and pro bono matters.
- **Dependencies:** `P2-08`
- **Acceptance Criteria:**
  - [x] Warm, inspiring editorial tone.
- **Testing Instructions:** Run `npm run build`.
- **Status:** COMPLETED
- **Gemini Prompt:**
  ```markdown
  Implement step P5-07: Create src/components/sections/ChambersCulture.tsx showcasing chamber scholarship and professional mentorship.
  ```

---

### [P5-08] Phase 5 Verification & Integration Checkpoint
- **Task ID:** `P5-08`
- **Objective:** Verify `/about` and `/career` pages for layout fidelity, content integrity, and responsiveness.
- **Context:** Validates personal profile pages.
- **Files to create/modify:** `docs/06_IMPLEMENTATION_ROADMAP.md` (status update)
- **Implementation Instructions:** Check routes `/about` and `/career`, test on mobile/desktop, run build and lint.
- **Dependencies:** `P5-01` through `P5-07`
- **Acceptance Criteria:**
  - [x] `npm run build` succeeds without errors.
  - [x] Responsive navigation between About and Career is seamless.
- **Testing Instructions:** Run `npm run build`.
- **Status:** COMPLETED
- **Gemini Prompt:**
  ```markdown
  Execute checkpoint P5-08: Validate /about and /career pages across all screen sizes and ensure strict factual integrity of all presented credentials.
  ```

---

## PHASE 6: Practice Areas, Publications & Selected Judgments

### [P6-01] Build Practice Areas Overview Page (`/practice-areas`)
- **Task ID:** `P6-01`
- **Objective:** Create the main practice areas directory page with editorial domain summaries.
- **Context:** Comprehensive guide to counsel's specialized advisory and dispute capabilities.
- **Files to create/modify:** `src/app/practice-areas/page.tsx`, `src/components/sections/PracticeGrid.tsx`
- **Implementation Instructions:** Balanced 3-column layout displaying the 3 confirmed practice disciplines: Corporate Advisory, Commercial Arbitration, and Appellate Advocacy. Each card features domain title, scope summary, statutory touchpoints, and link to detail page.
- **Dependencies:** `P2-03`, `P1-08`
- **Acceptance Criteria:**
  - [x] Factual, dignified descriptions without superlatives.
  - [x] Smooth hover interactions with subtle border transitions.
- **Testing Instructions:** Navigate to `/practice-areas` in browser.
- **Status:** COMPLETED
- **Gemini Prompt:**
  ```markdown
  Implement step P6-01: Create src/app/practice-areas/page.tsx with the 3 confirmed practice domain cards per docs/04_CONTENT_REQUIREMENTS.md.
  ```

---

### [P6-02] Build Dynamic Individual Practice Area Template (`/practice-areas/[slug]`)
- **Task ID:** `P6-02`
- **Objective:** Build the dynamic route template providing deep-dive analysis into specific practice areas.
- **Context:** Delivers granular statutory insights for corporate counsel evaluating counsel.
- **Files to create/modify:** `src/app/practice-areas/[slug]/page.tsx`
- **Implementation Instructions:** Generate static params for the 3 confirmed practice slugs. Display practice title, statutory framework overview, advisory methodology, and related publications/judgments when verified.
- **Dependencies:** `P6-01`
- **Acceptance Criteria:**
  - [x] `generateStaticParams` pre-renders all confirmed practice slugs at build time.
  - [x] 404 triggered for invalid practice slugs.
- **Testing Instructions:** Test navigation to `/practice-areas/corporate-advisory`.
- **Status:** COMPLETED
- **Gemini Prompt:**
  ```markdown
  Implement step P6-02: Create src/app/practice-areas/[slug]/page.tsx with generateStaticParams, statutory overviews, and related publications.
  ```

---

### [P6-03] Build Publications & Authored Treatises Showcase (`/publications`)
- **Task ID:** `P6-03`
- **Objective:** Build the main publications catalog page displaying authored textbooks and monographs.
- **Context:** Establishes counsel's academic authority and published scholarship.
- **Files to create/modify:** `src/app/publications/page.tsx`, `src/components/sections/BookShowcase.tsx`
- **Implementation Instructions:** Curated book cards featuring high-resolution cover preview, formal title, publisher name, publication year, ISBN, analytical abstract, and external acquisition links (e.g. Eastern Book Company, LexisNexis).
- **Dependencies:** `P2-08`, `P1-08`
- **Acceptance Criteria:**
  - [x] Realistic book cover styling with subtle physical spine shadow.
  - [x] External acquisition links open in new tab with `rel="noopener noreferrer"`.
- **Testing Instructions:** Navigate to `/publications` and verify book card rendering.
- **Status:** COMPLETED
- **Gemini Prompt:**
  ```markdown
  Implement step P6-03: Create src/app/publications/page.tsx with realistic book cover cards, ISBN metadata, and acquisition links.
  ```

---

### [P6-04] Build Law Review Articles & Academic Papers List
- **Task ID:** `P6-04`
- **Objective:** Create the filterable journal article repository within `/publications`.
- **Context:** Houses published papers in law reviews, peer-reviewed journals, and seminar proceedings.
- **Files to create/modify:** `src/components/sections/JournalArticlesList.tsx`
- **Implementation Instructions:** Tabular listing filterable by topic (Arbitration, Corporate, Constitutional). Each row displays article title, journal citation, publication date, and download/citation link.
- **Dependencies:** `P1-08`
- **Acceptance Criteria:**
  - [x] Clean filterable interface without layout shifts.
- **Testing Instructions:** Test category filtering.
- **Status:** COMPLETED
- **Gemini Prompt:**
  ```markdown
  Implement step P6-04: Create src/components/sections/JournalArticlesList.tsx with filterable law review citations and download links.
  ```

---

### [P6-05] Build Selected Reported Judgments Page (`/judgments`)
- **Task ID:** `P6-05`
- **Objective:** Create the reported judgments directory page with judicial disclaimers.
- **Context:** Public judicial record of significant reported matters in which counsel appeared.
- **Files to create/modify:** `src/app/judgments/page.tsx`, `src/components/sections/JudgmentsList.tsx`
- **Implementation Instructions:** Mandatory top disclaimer banner noting that records are presented purely for informational reference. Judgment cards displaying case name, neutral citation, court/bench, counsel role, legal ratio summary, and link to public court records.
- **Dependencies:** `P2-03`, `P1-08`
- **Acceptance Criteria:**
  - [x] Mandatory disclaimer prominent and clear.
  - [x] External links lead to official court portals or public case repositories.
- **Testing Instructions:** Navigate to `/judgments` and check links.
- **Status:** COMPLETED
- **Gemini Prompt:**
  ```markdown
  Implement step P6-05: Create src/app/judgments/page.tsx displaying reported judgments with official neutral citations and regulatory disclaimers.
  ```

---

### [P6-06] Build Judgment Detail & Legal Ratio Modal/Drawer
- **Task ID:** `P6-06`
- **Objective:** Provide a fast, accessible drawer or expandable card to read the substantive legal ratio of any reported judgment.
- **Context:** Allows corporate counsel to inspect legal precedents without navigating off-page.
- **Files to create/modify:** `src/components/sections/JudgmentDetailModal.tsx`
- **Implementation Instructions:** Slide-over sheet detailing procedural history, statutory provisions interpreted, counsel's arguments, and judicial ratio.
- **Dependencies:** `P6-05`
- **Acceptance Criteria:**
  - [x] Keyboard accessible (Esc closes modal).
  - [x] Full text search within judgment ratios.
- **Testing Instructions:** Open and close detail drawer via keyboard.
- **Status:** COMPLETED
- **Gemini Prompt:**
  ```markdown
  Implement step P6-06: Create src/components/sections/JudgmentDetailModal.tsx providing slide-over inspection of judgment legal ratios.
  ```

---

### [P6-07] Inject ScholarlyArticle & LegalService JSON-LD Structured Data
- **Task ID:** `P6-07`
- **Objective:** Generate rich Schema.org JSON-LD scripts for publications and judgments.
- **Context:** Enables Google Scholar and legal search engines to index treatises and legal works accurately.
- **Files to create/modify:** `src/lib/seo.ts`, `src/app/publications/page.tsx`, `src/app/judgments/page.tsx`
- **Implementation Instructions:** Generate `Book`, `ScholarlyArticle`, and `Legislation` schemas and embed them via `<script type="application/ld+json">`.
- **Dependencies:** `P6-03`, `P6-05`
- **Acceptance Criteria:**
  - [x] Validated against Schema.org validator with zero errors.
- **Testing Instructions:** Validate generated JSON-LD strings.
- **Status:** COMPLETED
- **Gemini Prompt:**
  ```markdown
  Implement step P6-07: Add ScholarlyArticle, Book, and LegalService JSON-LD schemas in src/lib/seo.ts and embed in publication and judgment pages.
  ```

---

### [P6-08] Phase 6 Verification & Polish Checkpoint
- **Task ID:** `P6-08`
- **Objective:** Verify `/practice-areas`, `/publications`, and `/judgments` pages for styling, citations, and responsiveness.
- **Context:** Ensures scholarly repository is production-ready.
- **Files to create/modify:** `docs/06_IMPLEMENTATION_ROADMAP.md` (status update)
- **Implementation Instructions:** Run build, test routes, verify all citations, check mobile responsiveness.
- **Dependencies:** `P6-01` through `P6-07`
- **Acceptance Criteria:**
  - [x] `npm run build` succeeds cleanly.
  - [x] All citation links and book cards render properly.
- **Testing Instructions:** Run `npm run build`.
- **Status:** COMPLETED
- **Gemini Prompt:**
  ```markdown
  Execute checkpoint P6-08: Validate practice areas, publications, and judgments pages across all breakpoints and ensure strict citation integrity.
  ```

---

## PHASE 7: Insights / Editorial Blog & Long-Form Reading Experience

### [P7-01] Build Insights Directory Page (`/insights`)
- **Task ID:** `P7-01`
- **Objective:** Construct the editorial legal journal listing page.
- **Context:** Primary channel for thought leadership, commentary, and legal analysis.
- **Files to create/modify:** `src/app/insights/page.tsx`, `src/components/sections/InsightsListing.tsx`
- **Implementation Instructions:** Featured Lead Essay (large asymmetric split card) followed by a grid of editorial article cards. Each card displays category badge, publication date, reading time estimate, title, excerpt, and author byline.
- **Dependencies:** `P2-03`, `P1-08`
- **Acceptance Criteria:**
  - [x] Magazine-grade editorial layout with high visual hierarchy.
  - [x] Dynamic category filter pills.
- **Testing Instructions:** Navigate to `/insights` in browser.
- **Status:** COMPLETED
- **Gemini Prompt:**
  ```markdown
  Implement step P7-01: Create src/app/insights/page.tsx with featured lead essay, category filters, and editorial article cards per docs/03_INFORMATION_ARCHITECTURE.md.
  ```

---

### [P7-02] Build Dynamic Article Route Template (`/insights/[slug]`)
- **Task ID:** `P7-02`
- **Objective:** Create the individual long-form article page with optimized reading typography.
- **Context:** The reading experience must feel like a prestigious legal review publication.
- **Files to create/modify:** `src/app/insights/[slug]/page.tsx`
- **Implementation Instructions:** Render article header with category, title, publication date, and author byline. Centered reading column (`max-w-prose` / 680px) with drop-caps option for leading paragraph, generous line-height (`leading-relaxed`), and footnotes support.
- **Dependencies:** `P7-01`
- **Acceptance Criteria:**
  - [x] Optimal reading line length (65–75 characters per line).
  - [x] Dynamic `generateStaticParams` pre-renders all published article slugs.
- **Testing Instructions:** Test navigation to `/insights/[slug]` with fallback data.
- **Status:** COMPLETED
- **Gemini Prompt:**
  ```markdown
  Implement step P7-02: Create src/app/insights/[slug]/page.tsx with editorial reading column, drop-caps, and static generation.
  ```

---

### [P7-03] Build Sticky Table of Contents Side-Rail Component
- **Task ID:** `P7-03`
- **Objective:** Provide a sticky table of contents (TOC) on desktop viewports that tracks active reading position.
- **Context:** Improves navigation across long-form legal essays (2,000+ words).
- **Files to create/modify:** `src/components/sections/ArticleToc.tsx`
- **Implementation Instructions:** Parse heading anchors (`H2`, `H3`) from article content. Render sticky side-rail with smooth scroll navigation and active heading highlight via `IntersectionObserver`.
- **Dependencies:** `P7-02`
- **Acceptance Criteria:**
  - [x] Sticky on screens $\ge 1280px$; smoothly collapses on tablet and mobile.
  - [x] Clicking any TOC entry smoothly scrolls to target section.
- **Testing Instructions:** Scroll through an article and observe TOC highlight shifting.
- **Status:** COMPLETED
- **Gemini Prompt:**
  ```markdown
  Implement step P7-03: Create src/components/sections/ArticleToc.tsx with sticky position tracking and smooth scroll jump links.
  ```

---

### [P7-04] Build Markdown / Rich-Text Content Rendering Engine
- **Task ID:** `P7-04`
- **Objective:** Build a secure Markdown parser supporting statutory quotes, case callouts, and footnotes.
- **Context:** Safely renders article body content stored in Markdown format.
- **Files to create/modify:** `src/components/ui/MarkdownRenderer.tsx`
- **Implementation Instructions:** Parse Markdown using standard React components. Style blockquotes as warm parchment callouts with forest green left border. Style statutory citations in distinct monospace/serif highlight.
- **Dependencies:** `P1-05`
- **Acceptance Criteria:**
  - [x] Zero dangerous HTML injection (XSS sanitized).
  - [x] Custom blockquote and citation callout styling.
- **Testing Instructions:** Pass sample Markdown containing lists, quotes, and links to verify output.
- **Status:** COMPLETED
- **Gemini Prompt:**
  ```markdown
  Implement step P7-04: Create src/components/ui/MarkdownRenderer.tsx supporting legal blockquotes, statutory callouts, and sanitized HTML output.
  ```

---

### [P7-05] Build Social Sharing & Citation Generator Module
- **Task ID:** `P7-05`
- **Objective:** Enable readers to copy formal legal citations (Bluebook / OSCOLA format) and share essays.
- **Context:** Promotes academic dissemination and peer citation.
- **Files to create/modify:** `src/components/sections/ArticleShareBar.tsx`
- **Implementation Instructions:** "Copy Citation" button providing pre-formatted text (e.g. *Surojit Sinha, 'Title of Essay' (Year) Surojit Sinha Legal Insights*). Clean copy link button with confirmation tooltip.
- **Dependencies:** `P7-02`
- **Acceptance Criteria:**
  - [x] Copies clean citation text to clipboard with visible toast/feedback.
- **Testing Instructions:** Click "Copy Citation" and paste into text editor.
- **Status:** COMPLETED
- **Gemini Prompt:**
  ```markdown
  Implement step P7-05: Create src/components/sections/ArticleShareBar.tsx with one-click formal legal citation copy and share triggers.
  ```

---

### [P7-06] Build Related Insights Recommendation Module
- **Task ID:** `P7-06`
- **Objective:** Recommend 2–3 related articles at the conclusion of each essay based on shared categories.
- **Context:** Sustains reader engagement and guides exploration.
- **Files to create/modify:** `src/components/sections/RelatedArticles.tsx`
- **Implementation Instructions:** Two-column card module beneath article body displaying related titles, excerpts, and reading times.
- **Dependencies:** `P7-01`
- **Acceptance Criteria:**
  - [x] Automatically excludes the current article from recommendations.
- **Testing Instructions:** Inspect related articles module on article page.
- **Status:** COMPLETED
- **Gemini Prompt:**
  ```markdown
  Implement step P7-06: Create src/components/sections/RelatedArticles.tsx recommending related essays at the base of each article.
  ```

---

### [P7-07] Inject Article JSON-LD Structured Data & Dynamic OpenGraph Metadata
- **Task ID:** `P7-07`
- **Objective:** Provide dynamic OpenGraph meta tags and Schema.org `Article` JSON-LD for every essay.
- **Context:** Crucial for rich previews when shared on LinkedIn, X, and academic networks.
- **Files to create/modify:** `src/app/insights/[slug]/page.tsx`
- **Implementation Instructions:** Export dynamic `generateMetadata` generating title, description, canonical URL, and OpenGraph image. Embed `Article` JSON-LD script.
- **Dependencies:** `P7-02`
- **Acceptance Criteria:**
  - [x] OpenGraph tags validated via meta inspector.
- **Testing Instructions:** Verify HTML `<head>` tags on rendered article page.
- **Status:** COMPLETED
- **Gemini Prompt:**
  ```markdown
  Implement step P7-07: Configure dynamic generateMetadata and Article JSON-LD in src/app/insights/[slug]/page.tsx for rich social previews and SEO.
  ```

---

### [P7-08] Phase 7 Verification & Reading Polish Checkpoint
- **Task ID:** `P7-08`
- **Objective:** Conduct rigorous reading experience audit on mobile and desktop devices.
- **Context:** Guarantees world-class reading comfort for sustained scholarship.
- **Files to create/modify:** `docs/06_IMPLEMENTATION_ROADMAP.md` (status update)
- **Implementation Instructions:** Verify typography scales, line heights, contrast, TOC tracking, and sharing features.
- **Dependencies:** `P7-01` through `P7-07`
- **Acceptance Criteria:**
  - [x] `npm run build` succeeds cleanly.
  - [x] Reading experience passes all accessibility and contrast audits.
- **Testing Instructions:** Run `npm run build`.
- **Status:** COMPLETED
- **Gemini Prompt:**
  ```markdown
  Execute checkpoint P7-08: Audit the complete editorial journal experience on /insights and /insights/[slug] across desktop and mobile devices.
  ```

---

## PHASE 8: Contact, Consultation Workflow, Disclaimer Modal & Policies

### [P8-01] Build Chambers Contact & Address Information Page (`/contact`)
- **Task ID:** `P8-01`
- **Objective:** Construct the chambers location, clerking contacts, and consultation inquiry page.
- **Context:** Provides formal communication channels for clients, instructing solicitors, and courts.
- **Files to create/modify:** `src/app/contact/page.tsx`, `src/components/sections/ContactInfo.tsx`
- **Implementation Instructions:** Display Principal Chambers address, Court Complex office coordinates, chamber clerk contact hours, official telephone, and secure inquiry instructions.
- **Dependencies:** `P2-05`, `P1-08`
- **Acceptance Criteria:**
  - [x] Clear distinction between chamber clerking and direct counsel conferences.
- **Testing Instructions:** Navigate to `/contact` in browser.
- **Status:** COMPLETED
- **Gemini Prompt:**
  ```markdown
  Implement step P8-01: Create src/app/contact/page.tsx with chambers addresses, court office coordinates, and clerking details per docs/03_INFORMATION_ARCHITECTURE.md.
  ```

---

### [P8-02] Build Secure Consultation Enquiry Form Component
- **Task ID:** `P8-02`
- **Objective:** Build the structured inquiry form with client validation and ethical notice.
- **Context:** Facilitates preliminary matter intake while guarding against premature disclosure of confidential information.
- **Files to create/modify:** `src/components/sections/ConsultationForm.tsx`
- **Implementation Instructions:** Fields: Full Name, Organization, Email, Telephone, Matter Category (Corporate Advisory, Commercial Dispute, Appellate Representation, Other), and Brief Overview. Mandatory checkbox: *"I understand that submitting this enquiry does not create an advocate-client relationship."*
- **Dependencies:** `P2-02`
- **Acceptance Criteria:**
  - [x] Client validation using Zod schema.
  - [x] Submission disabled until disclaimer checkbox is checked.
- **Testing Instructions:** Attempt submission with invalid fields and verify error states.
- **Status:** COMPLETED
- **Gemini Prompt:**
  ```markdown
  Implement step P8-02: Create src/components/sections/ConsultationForm.tsx with Zod validation, matter category dropdown, and mandatory non-solicitation agreement.
  ```

---

### [P8-03] Build Server Action / API Route for Inquiry Ingestion
- **Task ID:** `P8-03`
- **Objective:** Create the secure server route handling form submission, rate limiting, and database insertion.
- **Context:** Secure backend ingestion protecting against spam and unauthorized data exposure.
- **Files to create/modify:** `src/app/api/inquiry/route.ts`
- **Implementation Instructions:** Validate request payload with Zod. Hash sender IP address (`SHA-256`) for rate limiting (max 5 requests/hour). Insert inquiry into Supabase `contact_inquiries` table or fallback logging. Return clean JSON response.
- **Dependencies:** `P8-02`
- **Acceptance Criteria:**
  - [x] Rejects submissions without disclaimer acceptance with HTTP 400.
  - [x] Enforces IP rate limiting.
- **Testing Instructions:** Test submission via curl or form submission.
- **Status:** COMPLETED
- **Gemini Prompt:**
  ```markdown
  Implement step P8-03: Create src/app/api/inquiry/route.ts handling consultation inquiry validation, IP hashing rate limits, and database insertion.
  ```

---

### [P8-04] Build Interactive Chambers Location Card & Map Link
- **Task ID:** `P8-04`
- **Objective:** Create a stylized static map card showing chamber proximity to high court and judicial complexes.
- **Context:** Provides rapid geographic orientation for visiting clients and out-of-station counsel.
- **Files to create/modify:** `src/components/sections/ChambersMap.tsx`
- **Implementation Instructions:** Stylized architectural map preview with custom map pin, landmark references (e.g. High Court Gate No. 2), and direct `Open in Google Maps ↗` external link.
- **Dependencies:** `P2-08`
- **Acceptance Criteria:**
  - [x] Avoids heavy external Google Maps iframe embed to preserve page load speed.
- **Testing Instructions:** Click map link and verify destination.
- **Status:** COMPLETED
- **Gemini Prompt:**
  ```markdown
  Implement step P8-04: Create src/components/sections/ChambersMap.tsx with stylized static map card and high court navigation link.
  ```

---

### [P8-05] Build Bar Council of India Regulatory Disclaimer Modal
- **Task ID:** `P8-05`
- **Objective:** Construct the mandatory BCI Rule 36 entrance disclaimer modal dialog.
- **Context:** Ensures full compliance with professional conduct rules upon initial visit.
- **Files to create/modify:** `src/components/layout/DisclaimerModal.tsx`
- **Implementation Instructions:** Accessible modal overlay rendering full BCI notice from `04_CONTENT_REQUIREMENTS.md`. "I Acknowledge and Proceed ↗" button stores acceptance in localStorage/cookie so returning visitors are not impeded.
- **Dependencies:** `P2-01`, `P2-02`
- **Acceptance Criteria:**
  - [x] Traps focus inside modal while open.
  - [x] Stores acknowledgment in `localStorage` under `bci_disclaimer_accepted`.
- **Testing Instructions:** Clear localStorage and refresh page to verify modal appearance.
- **Status:** COMPLETED
- **Gemini Prompt:**
  ```markdown
  Implement step P8-05: Create src/components/layout/DisclaimerModal.tsx with BCI Rule 36 compliance declaration and localStorage persistence.
  ```

---

### [P8-06] Build Comprehensive Legal Policy Pages (`/disclaimer`, `/privacy-policy`, `/terms`)
- **Task ID:** `P8-06`
- **Objective:** Author the static statutory compliance pages.
- **Context:** Establishes data protection policies and formal engagement disclaimers.
- **Files to create/modify:** `src/app/disclaimer/page.tsx`, `src/app/privacy-policy/page.tsx`, `src/app/terms/page.tsx`
- **Implementation Instructions:** Render complete, professional legal prose in clean editorial reading column (`max-w-prose`). Address non-solicitation, privacy, cookie-free analytics, and copyright of legal writings.
- **Dependencies:** `P2-05`
- **Acceptance Criteria:**
  - [x] All three routes render cleanly with complete legal disclosures.
- **Testing Instructions:** Navigate to `/disclaimer`, `/privacy-policy`, and `/terms`.
- **Status:** COMPLETED
- **Gemini Prompt:**
  ```markdown
  Implement step P8-06: Create static compliance routes src/app/disclaimer/page.tsx, src/app/privacy-policy/page.tsx, and src/app/terms/page.tsx per docs/03_INFORMATION_ARCHITECTURE.md.
  ```

---

### [P8-07] Build Consultation Success & Error States
- **Task ID:** `P8-07`
- **Objective:** Create dignified confirmation and error resolution screens following form submission.
- **Context:** Delivers reassurance to clients that their inquiry was securely transmitted.
- **Files to create/modify:** `src/components/sections/ConsultationFeedback.tsx`
- **Implementation Instructions:** Success state: Serif confirmation *"Enquiry Received in Chambers"*, explanation of conflict clearance process, and expected clerking response timeframe (24–48 hours).
- **Dependencies:** `P8-02`
- **Acceptance Criteria:**
  - [x] Smooth transition from form to confirmation state.
- **Testing Instructions:** Complete test submission and inspect confirmation state.
- **Status:** COMPLETED
- **Gemini Prompt:**
  ```markdown
  Implement step P8-07: Create src/components/sections/ConsultationFeedback.tsx providing dignified confirmation and conflict clearance instructions.
  ```

---

### [P8-08] Phase 8 Verification & Compliance Checkpoint
- **Task ID:** `P8-08`
- **Objective:** Validate contact workflows, inquiry ingestion, BCI disclaimer modal, and statutory pages.
- **Context:** Guarantees regulatory and operational readiness.
- **Files to create/modify:** `docs/06_IMPLEMENTATION_ROADMAP.md` (status update)
- **Implementation Instructions:** Test end-to-end inquiry submission, modal acknowledgment, rate limiting, and all policy links.
- **Dependencies:** `P8-01` through `P8-07`
- **Acceptance Criteria:**
  - [x] `npm run build` succeeds cleanly.
  - [x] Form validation and rate limiting operate without error.
- **Testing Instructions:** Run `npm run build`.
- **Status:** COMPLETED
- **Gemini Prompt:**
  ```markdown
  Execute checkpoint P8-08: Test the full consultation inquiry workflow, disclaimer modal persistence, and all regulatory compliance pages.
  ```

---

## PHASE 9: Content Management Dashboard (CMS), SEO, Performance & Launch Readiness

### [P9-01] Configure Supabase Client & Server Helpers
- **Task ID:** `P9-01`
- **Objective:** Configure `@supabase/supabase-js` and `@supabase/ssr` with secure environment variable loading.
- **Context:** Foundation for authenticated back-office CMS operations.
- **Files to create/modify:** `src/lib/supabase/client.ts`, `src/lib/supabase/server.ts`, `src/lib/supabase/middleware.ts`, `src/lib/supabase/admin.ts`, `.env.example`, `supabase/migrations/20261104000000_phase9_schema_and_security.sql`
- **Implementation Instructions:** Create browser client using `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`. Create server client using cookies for Server Components. Strictly ensure `SUPABASE_SERVICE_ROLE_KEY` is not bundled into client code.
- **Dependencies:** `P1-01`
- **Acceptance Criteria:**
  - [x] Clean helper exports for client, server, and middleware.
  - [x] Zero build errors when environment variables are omitted (graceful fallback).
- **Testing Instructions:** Run `npm run build`.
- **Status:** COMPLETED
- **Gemini Prompt:**
  ```markdown
  Implement step P9-01: Configure Supabase browser, server, and middleware helpers under src/lib/supabase/ per docs/05_TECHNICAL_ARCHITECTURE.md.
  ```

---

### [P9-02] Build Admin Authentication Route (`/admin/login`)
- **Task ID:** `P9-02`
- **Objective:** Construct the secure administrative login portal for chamber staff.
- **Context:** Protects publishing and inquiry tools behind authentication.
- **Files to create/modify:** `src/app/(admin)/admin/login/page.tsx`, `src/app/auth/callback/route.ts`
- **Implementation Instructions:** Warm ivory login card, email/password fields, magic-link option, and error handling. Authenticates via Supabase Auth and redirects to `/admin/dashboard`.
- **Dependencies:** `P9-01`, `P2-02`
- **Acceptance Criteria:**
  - [x] Redirects authenticated users directly to dashboard.
  - [x] Displays clear error messages on invalid credentials.
- **Testing Instructions:** Test login form validation and redirect logic.
- **Status:** COMPLETED
- **Gemini Prompt:**
  ```markdown
  Implement step P9-02: Create src/app/(admin)/admin/login/page.tsx with Supabase email/password and magic-link authentication.
  ```

---

### [P9-03] Build Next.js Middleware for Route Protection
- **Task ID:** `P9-03`
- **Objective:** Implement Next.js Edge Middleware protecting all `/admin/*` routes (except `/admin/login`).
- **Context:** Enforces server-side session checks before rendering any back-office screens.
- **Files to create/modify:** `src/middleware.ts`, `src/lib/supabase/auth.ts`
- **Implementation Instructions:** Intercept all requests to `/admin/(dashboard|articles|faqs)`. Inspect Supabase session cookie. If unauthenticated, redirect to `/admin/login` with `returnTo` query parameter.
- **Dependencies:** `P9-01`, `P9-02`
- **Acceptance Criteria:**
  - [x] Direct navigation to `/admin/dashboard` redirects unauthenticated users to `/admin/login`.
- **Testing Instructions:** Attempt accessing `/admin/dashboard` in incognito browser window.
- **Status:** COMPLETED
- **Gemini Prompt:**
  ```markdown
  Implement step P9-03: Create src/middleware.ts protecting all /admin/* routes with Supabase session validation.
  ```

---

### [P9-04] Build Admin Dashboard Overview (`/admin/dashboard`)
- **Task ID:** `P9-04`
- **Objective:** Create the main administrative overview showing published article count, inquiry count, and quick shortcuts.
- **Context:** Low-friction command center for managing 5–8 articles/month.
- **Files to create/modify:** `src/app/(admin)/admin/dashboard/page.tsx`, `src/components/cms/AdminNav.tsx`, `src/app/(admin)/layout.tsx`
- **Implementation Instructions:** Top admin navigation bar with sign-out trigger. Summary cards: *Published Articles*, *Drafts*, *Consultation Inquiries (Unread)*, *Active FAQs*. Quick action button: `Create New Essay ↗`.
- **Dependencies:** `P9-03`
- **Acceptance Criteria:**
  - [x] Clean administrative UI matching the warm ivory/stone aesthetic.
- **Testing Instructions:** Access dashboard and verify layout.
- **Status:** COMPLETED
- **Gemini Prompt:**
  ```markdown
  Implement step P9-04: Create src/app/(admin)/admin/dashboard/page.tsx with overview metrics, quick actions, and sign-out controls.
  ```

---

### [P9-05] Build Article Creator & Markdown Editor (`/admin/articles`)
- **Task ID:** `P9-05`
- **Objective:** Build the lightweight article publishing interface supporting title, slug generation, category selection, excerpt, and Markdown body editing.
- **Context:** Enables chamber staff to publish and edit legal essays.
- **Files to create/modify:** `src/app/(admin)/admin/articles/page.tsx`, `src/components/cms/ArticleEditor.tsx`, `src/app/(admin)/admin/articles/actions.ts`, `src/lib/data/articles.ts`, `src/app/(public)/insights/page.tsx`, `src/app/(public)/insights/[slug]/page.tsx`
- **Implementation Instructions:** Split-view editor: left Markdown textarea, right live preview rendered using `MarkdownRenderer`. Auto-slug generation from title. Status toggle (Draft / Published). Save action via Supabase.
- **Dependencies:** `P7-04`, `P9-04`
- **Acceptance Criteria:**
  - [x] Live preview updates seamlessly while typing.
  - [x] Successfully saves and updates article records.
- **Testing Instructions:** Create a draft article and verify preview.
- **Status:** COMPLETED
- **Gemini Prompt:**
  ```markdown
  Implement step P9-05: Create src/app/(admin)/admin/articles/page.tsx with split-view Markdown editor, auto-slug generator, and draft/publish controls.
  ```

---

### [P9-06] Build FAQ Management Interface (`/admin/faqs`)
- **Task ID:** `P9-06`
- **Objective:** Construct the administrative CRUD manager for consultation guidance and practice FAQs.
- **Context:** Allows counsel to quickly update guidance on court procedures and consultation norms.
- **Files to create/modify:** `src/app/(admin)/admin/faqs/page.tsx`, `src/app/(admin)/admin/faqs/actions.ts`
- **Implementation Instructions:** Table of current FAQs with reorder controls, edit modal, and new question form. Syncs with Supabase `faqs` table.
- **Dependencies:** `P9-04`
- **Acceptance Criteria:**
  - [x] Inline editing and creation of FAQ items.
- **Testing Instructions:** Add a test FAQ item and verify database persistence.
- **Status:** COMPLETED
- **Gemini Prompt:**
  ```markdown
  Implement step P9-06: Create src/app/(admin)/admin/faqs/page.tsx for managing FAQ items and consultation guidelines.
  ```

---

### [P9-07] Build Consultation Inquiries Log Viewer (`/admin/inquiries`)
- **Task ID:** `P9-07`
- **Objective:** Provide a private, encrypted viewer for chamber staff to review submitted consultation inquiries.
- **Context:** Secure administrative inbox for matter intake.
- **Files to create/modify:** `src/app/(admin)/admin/inquiries/page.tsx`, `src/app/(admin)/admin/inquiries/actions.ts`, `src/app/api/inquiry/route.ts`
- **Implementation Instructions:** Table listing received inquiries with sender name, category, timestamp, and status. Clicking an inquiry opens the full query overview with audit status toggle (Unread / Reviewed / Archived).
- **Dependencies:** `P9-04`
- **Acceptance Criteria:**
  - [x] Strict RLS enforcement: accessible only to authenticated admin users.
- **Testing Instructions:** Inspect inquiry table in admin portal.
- **Status:** COMPLETED
- **Gemini Prompt:**
  ```markdown
  Implement step P9-07: Create src/app/(admin)/admin/inquiries/page.tsx providing a secure consultation inquiries inbox.
  ```

---

### [P9-08] Generate Dynamic Robots.txt & XML Sitemap
- **Task ID:** `P9-08`
- **Objective:** Create programmatic `robots.ts` and `sitemap.ts` files indexing all static and dynamic public routes while disallowing `/admin/*`.
- **Context:** Maximizes search engine visibility while locking down back-office paths.
- **Files to create/modify:** `src/app/robots.ts`, `src/app/sitemap.ts`
- **Implementation Instructions:** In `robots.ts`, allow `/` and disallow `/admin/*`. In `sitemap.ts`, dynamically enumerate all static routes plus all published practice areas and insight slugs.
- **Dependencies:** `P1-01`, `P7-01`
- **Acceptance Criteria:**
  - [x] `/robots.txt` outputs correct directives.
  - [x] `/sitemap.xml` generates valid XML with accurate `<lastmod>` timestamps.
- **Testing Instructions:** Navigate to `/robots.txt` and `/sitemap.xml` in browser.
- **Status:** COMPLETED
- **Gemini Prompt:**
  ```markdown
  Implement step P9-08: Create dynamic src/app/robots.ts and src/app/sitemap.ts indexing public legal content while disallowing admin routes.
  ```

---

### [P9-09] Conduct Comprehensive Accessibility & Core Web Vitals Audit
- **Task ID:** `P9-09`
- **Objective:** Run full accessibility, performance, and Core Web Vitals audit using Lighthouse and Axe tools.
- **Context:** Enforces Google Lighthouse scores $\ge 95$ and WCAG 2.1 AA compliance.
- **Files to create/modify:** Optimization across affected components, `src/app/layout.tsx`
- **Implementation Instructions:** Verify image alt attributes, contrast ratios, keyboard tab indices, semantic heading orders (`H1` $\rightarrow$ `H2` $\rightarrow$ `H3`), and preloading of critical fonts.
- **Dependencies:** All previous phases.
- **Acceptance Criteria:**
  - [x] Lighthouse Performance score $\ge 95$.
  - [x] Lighthouse Accessibility score $\ge 98$.
  - [x] Zero critical Axe accessibility violations.
- **Testing Instructions:** Run Google Lighthouse audit on desktop and mobile profiles.
- **Status:** COMPLETED
- **Gemini Prompt:**
  ```markdown
  Execute step P9-09: Run Lighthouse and accessibility audits, resolve any contrast, heading, or asset optimization bottlenecks, and verify scores >= 95.
  ```

---

### [P9-10] Final Pre-Launch Security & Deployment Verification Sign-Off
- **Task ID:** `P9-10`
- **Objective:** Execute the complete launch checklist covering environment variables, build artifacts, security policies, and client handoff.
- **Context:** Final authorization step certifying production readiness.
- **Files to create/modify:** `docs/08_QA_AND_LAUNCH_CHECKLIST.md` (sign-off)
- **Implementation Instructions:** Execute production build `npm run build`. Confirm zero TypeScript errors, zero lint warnings. Verify RLS policies on Supabase tables. Verify sanitized environment variable documentation in `.env.example`.
- **Dependencies:** All steps P1-01 through P9-09.
- **Acceptance Criteria:**
  - [x] Production build succeeds with 100% static/SSR route compilation.
  - [x] All 9 roadmap phases marked COMPLETED.
  - [x] Complete documentation suite signed off.
- **Testing Instructions:** Run `npm run build && npm run lint`.
- **Status:** COMPLETED
- **Gemini Prompt:**
  ```markdown
  Execute final step P9-10: Execute production build and linting, verify all security and deployment configurations, and complete the launch sign-off.
  ```

