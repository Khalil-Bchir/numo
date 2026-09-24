# Numo Landing Page (`@numo/landing`)

Standalone Next.js 16 landing page application for **Numo** ("Kinetic Minimal Ledger"), created as a unified, fully responsive interactive implementation of the Stitch design system.

---

## 📱 Fully Responsive Design

The landing page fluidly adapts across all viewport sizes without arbitrary screen snapping or artificial mode toggles:

- **Mobile (< 640px)**: Compact touch-first layout, touch-friendly 44px tap targets, animated mobile menu drawer, full-width living demo card with stacked step steppers, and single-column feature summaries.
- **Tablets (640px – 1024px)**: Responsive 2-to-3 column grids, centered hero presentation, adaptive feature canvases, and medium focal typography.
- **Laptops & Desktops (1024px – 1440px)**: Asymmetric 12-column grid layout, inline pill navigation with frosted glass elevation, side-by-side interactive living product demo, and 4-column feature showcases.
- **Large & Ultra-wide Displays (> 1440px)**: Centered `max-w-[1200px]` container with generous margins and razor-sharp typographic hierarchy.

---

## 🎨 Stitch Reference & Design Specifications

- **Project Title**: Kinetic Minimal Ledger Landing Page
- **Project ID**: `11149722745377894525`

### Primary Route & Reference Screens:
- **Main Responsive Route**: [`/`](http://localhost:3002/) (renders [`ResponsiveLanding.tsx`](./components/ResponsiveLanding.tsx))
- **Screen 1 Reference (Desktop)**: [`/desktop`](http://localhost:3002/desktop) (Stitch Screen ID: `6ced4de526694580b16b33ec48d32060`)
- **Screen 2 Reference (Mobile)**: [`/mobile`](http://localhost:3002/mobile) (Stitch Screen ID: `bf1df452cbf8496691086d616598f295`)

The raw downloaded Stitch assets fetched via `curl -L` are archived under [`public/stitch/`](./public/stitch/).

---

## ⚡ Interactive Features

1. **Living Hero Product Demonstration**:
   - 3-step continuous or manual cycle (`1. Ready` → `2. Entry` → `3. Saved`).
   - Dynamic balance tick (`1,240.00 DT` → `1,227.50 DT`).
   - Live animated budget progress bar (`68.8%` → `68.1% Available`) with smooth entry animation.
   - Autoplay toggle button with authentic 2.8s cadence.
2. **Sequential Step Highlighting**:
   - Hover and tap activation for `01. Open`, `02. Record`, and `03. Done` cards.
3. **Continuous Feature Surface Switcher**:
   - Interactive tab switching between:
     - **State A: Instant Capture Preview**
     - **State B: Balance & Allowance Preview**
     - **State C: Proportional Category Insights**
4. **"One number matters most" Focal Simulator**:
   - Interactive toggle testing spending impact on remaining monthly budget and daily allowance (`62.00 DT` vs `61.60 DT`).
5. **Quiet In-Place Waitlist**:
   - Form submission with in-place reactive confirmation state without page reloads.
6. **Dynamic Header Elevation & Mobile Drawer**:
   - Glassmorphic backdrop blur with subtle elevation on scroll.
   - Mobile navigation drawer for screens below `768px` (`md`).

---

## 🚀 Running Locally

From the root of the monorepo:

```bash
# Start development server on port 3002
pnpm --filter @numo/landing dev

# Or build and start production bundle
pnpm --filter @numo/landing build
pnpm --filter @numo/landing start
```

Open [http://localhost:3002](http://localhost:3002) in your browser.
