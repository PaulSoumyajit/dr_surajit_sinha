# Layout Components (`src/components/layout`)

This directory houses global application shell, header, footer, and compliance layout components adhering strictly to the **Editorial Legal Minimalism** design system.

### Completed Components (Phase 3):

1. **`BrandLogo.tsx`**  
   Bespoke personal brand lockup for Dr. Surajit Sinha, Advocate.
   - Vector monogram emblem ("SS") with interlocking serif letterforms inside a forest-green rounded cartouche.
   - Editorial wordmark: `DR. SURAJIT SINHA` in Newsreader serif and `ADVOCATE — HIGH COURT & LOWER COURTS` in tracked uppercase Plus Jakarta Sans.
   - Sizes: `sm` (30px/mobile), `md` (36px/header default), `lg` (44px/footer).
   - Links to `/` with accessible `aria-label`.

2. **`Navbar.tsx`**  
   Desktop sticky navigation header.
   - Translucent warm ivory surface (`bg-primary-canvas/90 backdrop-blur-md`).
   - Scroll-activated border definition and elevation.
   - Central navigation links (*About*, *Practice Areas*, *Publications*, *Judgments*, *Insights*) with active route indicators.
   - Neutral, BCI Rule 36 compliant contact action (`Contact details ↗` leading to `/contact`).

3. **`MobileNav.tsx`**  
   Accessible full-screen mobile navigation drawer (<768px).
   - Morphing hamburger to close (X) trigger button.
   - WAI-ARIA Modal Dialog Pattern (`role="dialog"`, `aria-modal="true"`, `aria-labelledby`).
   - Dynamic focus trap, Escape key dismissal, focus restoration, and document body scroll locking.
   - Large Newsreader serif titles with descriptive route metadata.
   - Zero fabricated contact details; displays verified advocate profile data only.

4. **`Footer.tsx`**  
   Comprehensive multi-tier editorial footer.
   - Upper tier: BrandLogo, professional description, editorial directory links, and compliance links.
   - Middle tier: Bar Council of India Rule 36 non-solicitation declaration banner.
   - Lower tier: Dynamic copyright year, legal policy links (*Disclaimer*, *Privacy Policy*, *Terms*), and keyboard-accessible smooth `Back to top ↑` trigger.

5. **`RegulatoryNoticeBar.tsx`**  
   Persistent informational banner declaring non-solicitation status under Bar Council of India rules.
   - Session-persistent dismissal stored in `sessionStorage`.
   - SSR-safe mounting without hydration mismatches.

6. **`SiteShell.tsx`**  
   Unified structural wrapper enclosing all public routes in `src/app/(public)/layout.tsx`.
   - Accessible skip-to-content link targeting `#main-content`.
   - Assembles `RegulatoryNoticeBar`, `Navbar`, `MobileNav`, `<main id="main-content">`, and `Footer`.
   - Cleanly decoupled from future administrative layouts (`/admin`).
