# 02 — DESIGN PHILOSOPHY & DESIGN SYSTEM SPECIFICATION

**Project:** Surojit Sinha — Advocate & Legal Counsel Personal Brand Website  
**Creative Direction:** Editorial Legal Minimalism  
**Document Status:** Approved Design System  
**Authoring Body:** Design Directorate & UI Architecture  

---

## 1. The Core Creative Philosophy: Editorial Legal Minimalism

**Editorial Legal Minimalism** is an aesthetic and philosophical framework engineered specifically for senior legal counsel. It merges the physical tactile elegance of classical legal printing—monographs, bound law reports, bespoke stationery—with the effortless fluidity and precision of modern digital interfaces.

### 1.1 The Four Guiding Tenets

1. **Intellectual Gravitas Over Visual Loudness:**  
   Authority in advocacy is demonstrated through precision of thought, disciplined rhetoric, and restraint. The website communicates high standing not through visual bombast, but through proportion, typographic mastery, and generous whitespace.
2. **Tactile Editorial Surfaces:**  
   Digital screens often feel cold, synthetic, and ephemeral. We reject sterile blue-white canvases (`#FFFFFF`) in favor of warm, organic ivory and parchment foundations that comfort the eye and evoke archival permanence.
3. **Architectural Symmetry & Purposeful Asymmetry:**  
   Legal arguments combine structural order with nuanced situational adaptability. The interface mirrors this: foundational containers maintain rock-solid geometric stability, while interior content flows into asymmetric editorial columns.
4. **Calm, Purposeful Motion:**  
   Animation must never exist as entertainment or spectacle. Every motion on this website functions as an optical guide: revealing information smoothly, illustrating step progression, or signaling interaction availability.

---

## 2. Color Palette & Systematic Design Tokens

The color architecture is built around organic earth minerals, archival paper stocks, and botanical forest depths.

```
+---------------------------------------------------------------------------------+
| Warm Ivory        Parchment Surface    Deep Forest Green    Muted Sage Accent   |
| #F8F6F0           #F4F1EA              #1B3B2B              #D3DDD6             |
| Surface Base      Card Background      Primary Brand & Hero Secondary UI Accent |
+---------------------------------------------------------------------------------+
| Charcoal Text     Muted Slate Body     Fine Stone Border    Accent Gold Wash    |
| #1B1D1C           #515652              #E5E0D6              #C5A880             |
| Headings & Logos  Reading Prose        Dividers & Outlines  Subtle Highlights   |
+---------------------------------------------------------------------------------+
```

### 2.1 CSS & Tailwind Color Tokens

```css
:root {
  /* Surface Foundations */
  --bg-primary: #F8F6F0;       /* Warm Ivory base canvas */
  --bg-surface: #F4F1EA;       /* Elevated cards & containers */
  --bg-surface-subtle: #EFECE4;/* Inset wells, table headers */
  --bg-forest-deep: #142B20;   /* Hero card & dark container base */
  --bg-forest-surface: #1B3B2B;/* Active selection & CTA background */

  /* Text & Typographic Tones */
  --text-primary: #1B1D1C;     /* High-contrast deep ebony/charcoal */
  --text-muted: #515652;       /* Editorial body & secondary prose */
  --text-light: #858B86;       /* Micro metadata, timestamps, captions */
  --text-inverse: #F8F6F0;     /* Text on dark green surfaces */
  --text-inverse-muted: #C5D3C8; /* Secondary copy on dark green */

  /* Accents & Signals */
  --accent-forest: #1B3B2B;    /* Signature brand green */
  --accent-forest-hover: #11251B; /* Button hover state */
  --accent-sage: #D3DDD6;      /* Organic secondary badge & pill fill */
  --accent-sage-dark: #687D70; /* Active icons & borders */
  --accent-gold: #C5A880;      /* Rare, disciplined highlight (citations) */

  /* Borders & Dividers */
  --border-subtle: #E5E0D6;    /* 1px structural dividing lines */
  --border-muted: rgba(27, 59, 43, 0.08); /* Card container outlines */
  --border-inverse: rgba(248, 246, 240, 0.15); /* Borders inside dark cards */

  /* Shadows (Subtle, Atmospheric Ambient Only) */
  --shadow-editorial: 0 4px 20px -2px rgba(27, 59, 43, 0.04), 0 2px 6px -1px rgba(27, 59, 43, 0.02);
  --shadow-floating: 0 12px 36px -6px rgba(27, 59, 43, 0.07), 0 4px 12px -2px rgba(27, 59, 43, 0.03);
}
```

---

## 3. Typography Architecture

Typography is the supreme carrier of credibility for an advocate. The typographic system combines the literary sophistication of an editorial serif with the pristine functional legibility of a contemporary geometric-humanist sans-serif.

### 3.1 Typeface Selection (Next.js Google Fonts)

1. **Display & Editorial Serif: *Newsreader* (or *Cormorant Garamond*)**  
   - Usage: Page titles, section headlines, pull quotes, publication titles, case citations.
   - Character: High x-height, refined serifs, sculpted editorial rhythm; carries judicial authority and historical weight.
   - Weights: `400` (Regular), `500` (Medium), `600` (Semi-bold).
2. **Body & Interface Sans: *Plus Jakarta Sans***  
   - Usage: Long-form article text, navigation links, metadata, UI buttons, forms, legal notices.
   - Character: Crisp, open apertures, warm humanist geometry; optimized for sustained reading across mobile and retina displays.
   - Weights: `400` (Regular), `500` (Medium), `600` (Semi-bold).

### 3.2 Typographic Hierarchy & Scale

| Role | Font Family | Mobile Size / Line-Height | Desktop Size / Line-Height | Letter Spacing | Weight |
|---|---|---|---|---|---|
| **Monument Hero** | Serif | 36px / 1.15 | 60px / 1.10 | `-0.025em` | 500 (Medium) |
| **Section Title (H2)** | Serif | 28px / 1.20 | 44px / 1.15 | `-0.020em` | 500 (Medium) |
| **Subsection (H3)** | Serif | 22px / 1.25 | 30px / 1.20 | `-0.015em` | 500 (Medium) |
| **Feature Lead / Pullquote** | Serif | 18px / 1.45 | 24px / 1.40 | `-0.010em` | 400 (Regular) |
| **Body Large (Intro)** | Sans | 16px / 1.60 | 18px / 1.65 | `-0.005em` | 400 (Regular) |
| **Body Regular (Standard)** | Sans | 15px / 1.65 | 16px / 1.70 | `0em` | 400 (Regular) |
| **Eyebrow / Category Tag** | Sans | 11px / 1.40 | 12px / 1.40 | `+0.120em` | 600 (Uppercase) |
| **UI Button / Action** | Sans | 14px / 1.30 | 14px / 1.30 | `+0.020em` | 500 (Medium) |
| **Caption & Legal Metadata** | Sans | 12px / 1.50 | 13px / 1.50 | `+0.010em` | 400 (Regular) |

---

## 4. Spacing System, Grid & Container Architecture

### 4.1 Content Width Constraints
To preserve editorial elegance and prevent uncomfortable eye travel across wide monitors, strict maximum line-lengths and container constraints are enforced:
- **Maximum Site Width:** `1280px` (`max-w-7xl`) for full section wrappers.
- **Hero & Card Container:** `1200px` (`max-w-6xl`) with generous horizontal padding.
- **Editorial Prose / Reading Column:** `680px` (`max-w-prose` / $\approx 65\text{–}72$ characters per line) for effortless long-form reading in essays and about sections.

### 4.2 Spacing Scale
Consistent vertical rhythms based on a geometric 8px root grid:
- `section-padding-y`: `py-20` (80px) on mobile; `py-32` (128px) on desktop.
- `component-gap`: `gap-6` (24px) to `gap-12` (48px) between related content modules.
- `header-margin`: `mb-8` (32px) to `mb-12` (48px) beneath section headings.

---

## 5. Component Styling Specifications

### 5.1 Buttons & Interactive Triggers

```
[ Primary Button: Dark Green ]      [ Secondary Button: Ivory ]      [ Editorial Text Link ]
+----------------------------+      +-------------------------+      
| Start a conversation    ↗  |      | View all publications ↗ |      A closer look  ↗
+----------------------------+      +-------------------------+      (Underline on hover)
Bg: #1B3B2B | Text: #F8F6F0          Bg: #F4F1EA | Text: #1B1D1C       Text: #1B3B2B
Hover: #11251B | Arrow shifts 2px    Border: 1px #E5E0D6               Arrow shifts 3px
```

1. **Primary Button:**
   - Background: Deep Forest Green (`#1B3B2B`).
   - Text: Warm Ivory (`#F8F6F0`), font size 14px, medium weight.
   - Border radius: Pill (`rounded-full`), height 46px, padding: horizontal 24px.
   - Icon: Slanted directional arrow (`↗`), translates diagonally 2px upon hover.
2. **Secondary / Inverted Button:**
   - Background: Warm Surface (`#F4F1EA`) or pure Ivory.
   - Border: 1px solid `--border-subtle` (`#E5E0D6`).
   - Text: Deep Charcoal (`#1B1D1C`).
   - Hover: Background transitions to `#EFECE4`, border darkens subtly.
3. **Editorial Text Link:**
   - Inline sans-serif or serif link accompanied by `↗`.
   - Subtle bottom border (`border-b border-primary/20`) that transitions to 100% opacity on hover.

### 5.2 Cards & Containers
- Border radius: Clean, restrained `rounded-xl` (12px) or `rounded-2xl` (16px). Strictly no juvenile bubbly radii (`rounded-3xl` or `rounded-[40px]`).
- Outlines: Crisp 1px solid border (`#E5E0D6` or `rgba(27, 59, 43, 0.08)`).
- Padding: Generous interior breathing room: `p-8` (32px) to `p-12` (48px).

---

## 6. Motion & Interaction Design Standards

Interactions must feel intentional, aristocratic, and dignified.

### 6.1 The Motion Curves & Constants

```typescript
// Shared animation constants across all Framer Motion components
export const EASE_LUXE = [0.22, 1, 0.36, 1] as const; // Premium deceleration curve
export const DURATION_STANDARD = 0.8;                 // Standard section reveal duration
export const DURATION_FAST = 0.35;                     // Button & state hover transitions
```

### 6.2 Standard Motion Behaviors
1. **Section Reveal:** Elements translate upward by `18px` while fading from `opacity: 0` to `opacity: 1` over `0.8s` with `EASE_LUXE`. Viewport trigger set to `{ once: true, margin: "-10% 0px" }`.
2. **Animated Word Reveal (Headings):** Staggered upward mask reveals for monumental headlines (`staggerChildren: 0.045s`), avoiding aggressive rotations or heavy blurs.
3. **Accordion Transition:** Fluid `height: auto` expansion using `AnimatePresence` with `opacity` fade, executing smoothly without jitter.
4. **Scenario Switcher Transition:** Cross-fade duration of `0.4s` between scenario panels and synchronized image swap.

### 6.3 Accessibility & Reduced Motion
Any component utilizing Framer Motion must wrap animations in a check for the user's OS preference:
```typescript
import { useReducedMotion } from "framer-motion";
// When prefers-reduced-motion is true, all translations and durations collapse to instant opacity transitions.
```

