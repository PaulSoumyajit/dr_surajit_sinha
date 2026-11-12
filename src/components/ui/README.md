# UI Primitives (`src/components/ui`)

This directory houses atomic, reusable interface primitives adhering strictly to the **Editorial Legal Minimalism** design system.

### Completed Primitives (Phase 2):

1. **`MotionProvider.tsx`**  
   Global motion configuration and accessibility boundary. Configures Motion for React (`motion/react`) with `reducedMotion="user"` and exports `useSafeAnimation()` hook for accessible duration collapsing.

2. **`Button.tsx`**  
   Polymorphic button / link component.
   - Variants: `primary` (Forest Green pill), `secondary` (Parchment with stone border), `outline`, and `editorial-text`.
   - Sizes: `sm`, `md`, `lg`.
   - Features: 2px diagonal arrow hover translation, keyboard accessibility, Next.js Link routing for `href`.

3. **`Reveal.tsx`**  
   Viewport entrance reveal primitive.
   - Restrained 18px translation using `EASE_LUXE` over 0.8s.
   - Zero blur filters to prevent GPU lag.
   - Degrades to instant zero-translation render when reduced motion is preferred.

4. **`AnimatedHeading.tsx`**  
   Word-by-word staggered reveal for monumental Newsreader serif headlines.
   - Stagger interval: 0.045s.
   - Preserves word spacing and line wrapping without jumping.
   - Accessibility: `aria-label` with full text on heading, `aria-hidden="true"` on word tokens.

5. **`Container.tsx`**  
   Standardized layout width and horizontal margin container.
   - Variants: `default` (`max-w-7xl`), `narrow` (`max-w-6xl`), and `prose` (`max-w-prose` for optimal 65–72ch reading length).
   - Fluid responsive padding: `px-4 sm:px-6 lg:px-8`.

6. **`Badge.tsx`**  
   Editorial section markers and taxonomy tags.
   - Variants: `eyebrow` (tracked uppercase Plus Jakarta Sans, 11-12px, 0.12em spacing, optional circular indicator) and `pill` (muted sage background, dark readable text).

7. **`Accordion.tsx`**  
   Accessible expandable disclosure primitive (`Accordion` & `AccordionItem`).
   - Complies with WAI-ARIA Accordion Pattern (`aria-expanded`, `aria-controls`, unique IDs).
   - Smooth height and opacity transitions via Motion for React.
   - Elegant plus icon (`+`) rotating 45° to dismiss (`×`).

8. **`EditorialImage.tsx`**  
   Standardized photographic frame wrapping Next.js `Image`.
   - Aspect ratios: `16/9`, `4/3`, `3/4`, `1/1`.
   - One-pixel subtle border (`#E5E0D6`), `rounded-xl` geometry, zero Cumulative Layout Shift (CLS).
   - Optional warm ivory glaze on hover, exterior caption, and interior overlay caption.
