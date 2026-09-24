---
name: Kinetic Minimal Ledger
version: 1.0.0
platform: iOS 17+ & Web
design_direction: Native Apple iOS Minimalism, Flat Tactile Surfaces, Full Continuous Curvature

tokens:
  light:
    background: '#FCF9F8'
    on-background: '#1C1B1B'
    surface: '#FCF9F8'
    surface-dim: '#DCD9D9'
    surface-bright: '#FCF9F8'
    surface-container-lowest: '#FFFFFF'
    surface-container-low: '#F6F3F2'
    surface-container: '#F0EDEC'
    surface-container-high: '#EBE7E7'
    surface-container-highest: '#E5E2E1'
    surface-variant: '#E5E2E1'
    on-surface: '#1C1B1B'
    on-surface-variant: '#484555'
    outline: '#797587'
    outline-variant: '#E8E8EA'
    primary: '#532BDB'
    on-primary: '#FFFFFF'
    primary-container: '#6C4BF4'
    on-primary-container: '#1B0063'
    primary-subtle: '#F1EAFF'
    secondary: '#1B6D24'
    on-secondary: '#FFFFFF'
    secondary-container: '#A0F399'
    on-secondary-container: '#217128'
    tertiary: '#A90816'
    on-tertiary: '#FFFFFF'
    tertiary-container: '#CD2A2B'
    on-tertiary-container: '#FFE9E6'
    error: '#BA1A1A'
    on-error: '#FFFFFF'
    error-container: '#FFDAD6'
    on-error-container: '#93000A'

  dark:
    background: '#101010'
    on-background: '#F2F0F0'
    surface: '#101010'
    surface-dim: '#0B0B0B'
    surface-bright: '#1C1C1C'
    surface-container-lowest: '#0C0C0C'
    surface-container-low: '#151515'
    surface-container: '#1B1B1B'
    surface-container-high: '#222222'
    surface-container-highest: '#292929'
    surface-variant: '#222222'
    on-surface: '#F2F0F0'
    on-surface-variant: '#B9B5C3'
    outline: '#918D9A'
    outline-variant: '#3A3742'
    primary: '#8B72FF'
    on-primary: '#16005C'
    primary-container: '#8B72FF'
    on-primary-container: '#16005C'
    primary-subtle: 'rgba(139, 114, 255, 0.15)'
    secondary: '#8DDF86'
    on-secondary: '#06210A'
    secondary-container: '#285D2D'
    on-secondary-container: '#A0F399'
    tertiary: '#FF8A80'
    on-tertiary: '#3B0003'
    tertiary-container: '#8E1820'
    on-tertiary-container: '#FFE9E6'
    error: '#FF8A80'
    on-error: '#3B0003'
    error-container: '#690005'
    on-error-container: '#FFDAD6'

typography:
  display-hero:
    fontFamily: SF Pro Display
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 52px
    letterSpacing: -0.03em
  display-hero-mobile:
    fontFamily: SF Pro Display
    fontSize: 38px
    fontWeight: '700'
    lineHeight: 42px
    letterSpacing: -0.025em
  headline-lg:
    fontFamily: SF Pro Display
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 38px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: SF Pro Display
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 30px
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: SF Pro Display
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 26px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: SF Pro Text
    fontSize: 17px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: -0.01em
  body-md:
    fontFamily: SF Pro Text
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: -0.005em
  body-sm:
    fontFamily: SF Pro Text
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: 0em
  label-lg:
    fontFamily: SF Pro Text
    fontSize: 15px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0em
  label-md:
    fontFamily: SF Pro Text
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: SF Pro Text
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.04em
  numeric-keypad:
    fontFamily: SF Pro Display
    fontSize: 28px
    fontWeight: '400'
    lineHeight: 34px
    letterSpacing: -0.01em

rounded:
  sm: 0.5rem       # 8px
  DEFAULT: 1rem    # 16px
  md: 1.25rem      # 20px
  lg: 1.5rem       # 24px
  xl: 1.75rem      # 28px
  full: 9999px     # Pill termination

spacing:
  gutter: 1rem     # 16px lateral screen margin
  space-xs: 0.25rem # 4px
  space-sm: 0.5rem  # 8px
  space-md: 1rem    # 16px inter-card gap
  space-lg: 1.25rem # 20px internal card padding
  space-xl: 1.75rem # 28px
  space-2xl: 2.5rem # 40px section separation
  clearance-bottom: 6rem # 96px floating navigation clearance
---

# Numo Design System & Architecture Specification

> **Core Product Principle**: *Record spending in seconds. Understand your money at a glance.*

---

## Table of Contents

1. [Brand Philosophy & Principles](#1-brand-philosophy--principles)
2. [Color System & Side-by-Side Token Reference](#2-color-system--side-by-side-token-reference)
3. [Typography Engine](#3-typography-engine)
4. [Spatial System, Geometry & Elevation](#4-spatial-system-geometry--elevation)
5. [Component Specifications (Light & Dark Mode)](#5-component-specifications-light--dark-mode)
   * [5.1 Floating Navigation Bar & Quick-Add Action](#51-floating-navigation-bar--quick-add-action)
   * [5.2 Numeric Keypad & Amount Entry Display](#52-numeric-keypad--amount-entry-display)
   * [5.3 Transaction Rows & Date Grouping](#53-transaction-rows--date-grouping)
   * [5.4 Category & Filter Chips](#54-category--filter-chips)
   * [5.5 Form Text Fields & Search](#55-form-text-fields--search)
   * [5.6 Bottom Sheets & Action Modals](#56-bottom-sheets--action-modals)
   * [5.7 Widgets (Lock Screen, Home Screen) & Dynamic Island](#57-widgets-lock-screen-home-screen--dynamic-island)
6. [Landing Page & Web Appearance](#6-landing-page--web-appearance)
7. [Accessibility, Motion & Haptics](#7-accessibility-motion--haptics)
8. [Code Implementation Bridge (SwiftUI & Web)](#8-code-implementation-bridge-swiftui--web)

---

## 1. Brand Philosophy & Principles

Numo is engineered around **radical clarity, frictionless velocity, and surgical precision** for personal budgeting on iOS and the web. The brand identity represents effortless mastery over money: quiet, self-assured, and devoid of performative decorative clutter. 

Financial transactions are treated not as a chore to analyze, but as fluid, instantaneous micro-moments.

### 1.1 Core Tenets
* **Velocity First (≤ 3 Seconds)**: Any expense capture must complete in three taps or under three seconds: `Open → Enter Amount → Save`.
* **Zero Configuration**: No mandatory upfront categorization, no manual bank account reconciliations, no dense spreadsheet dashboards.
* **Apple-Native Minimalism**: Visual authority is derived strictly from deliberate typographic scale, pristine spatial geometry, and an intentional hierarchy of tactile, highly rounded surfaces.
* **Radical Restraint**: Chromatic energy is reserved strictly for interactive primary controls and high-consequence state shifts. Canvas surfaces remain calm, pure, and neutral.

### 1.2 Anti-Patterns (Strictly Prohibited)
* ❌ **No Skeumorphism or Faux-3D Glass**: Avoid artificial blurred glassmorphism, glowing borders, or heavy drop shadows.
* ❌ **No Pure `#000000` Canvas in Dark Mode**: Dark mode canvas is anchored at `#101010` to preserve optical depth for cards and wells.
* ❌ **No Arbitrary Color Categorization**: Never color every category differently. Accent color is singular (Violet).
* ❌ **No Punitive Red for Normal Spending**: Reserve red strictly for actual deficits or destructive deletions. Standard outflows use neutral typography.
* ❌ **No Blocking Loading Spinners**: UI must update optimistically and immediately on device (Local-First).

---

## 2. Color System & Side-by-Side Token Reference

Numo operates on strict chromatic restraint across both Light and Dark appearances.

### 2.1 Unified Token Cross-Reference Table

| Token Role | Light Mode Hex | Dark Mode Hex | Semantic Purpose & Usage |
| :--- | :--- | :--- | :--- |
| **Base Canvas** | `#FCF9F8` | `#101010` | Underlying structural ground; glare-free ergonomic base. |
| **Surface Card (Level 1)** | `#FFFFFF` | `#1B1B1B` | Primary cards, content blocks, transaction containers. |
| **Surface Low (Level 0.5)**| `#F6F3F2` | `#151515` | Low-level surfaces, badge backgrounds, input rest states. |
| **Surface Well / Container**| `#F0EDEC` | `#151515` | Recessed wells, large grouped wrappers. |
| **Surface Elevated (Level 2)**| `#EBE7E7` | `#222222` | Floating navigation, active containers, dialogs. |
| **Surface Highest (Level 3)**| `#E5E2E1` | `#292929` | Modals, bottom sheets, context menus, tooltips. |
| **Primary Text** | `#1C1B1B` | `#F2F0F0` | Uncompromising typographic clarity for values & titles. |
| **Secondary Text** | `#484555` | `#B9B5C3` | Muted neutral for categories, timestamps, currency codes. |
| **Muted / Metadata Text** | `#797587` | `#918D9A` | Eyebrow labels, helper notes, inactive icons. |
| **Disabled Text** | `#BDB9C7` | `#625F69` | Disabled actions and secondary keypad characters. |
| **Hairline Border / Divider**| `#E8E8EA` | `#3A3742` | Hairline perimeter strokes (1px) and row dividers. |
| **Elevated Border** | `#DCD9D9` | `#46424F` | Perimeter strokes for highest surfaces and modals. |
| **Primary Accent** | `#532BDB` | `#8B72FF` | Active triggers, confirmed states, primary actions. |
| **Primary Action Fill** | `#6C4BF4` | `#8B72FF` | Solid fill for primary buttons and quick-add trigger. |
| **Text on Primary Action**| `#FFFFFF` | `#16005C` | Label text on solid primary buttons (high contrast). |
| **Accent Subtle Tint** | `#F1EAFF` | `rgba(139,114,255,0.15)` | Category chips, badge backgrounds, focus halos. |
| **Accent Subtle Border** | `rgba(108,75,244,0.25)` | `rgba(139,114,255,0.30)` | Subtle border for active tags and chips. |
| **Status Positive / Income**| `#2E7D32` | `#8DDF86` | Inflows, surpluses, goal completions (`+` prefix). |
| **Status Destructive / Deficit**| `#D32F2F` | `#FF8A80` | Over-budget alerts, deletion confirmations. |

### 2.2 Dark Mode Structural Hierarchy
In dark mode, depth is achieved **purely through surface luminance tiering**, not through artificial shadows:

```text
#101010  Level 0: Base canvas (never pure black)
   └── #151515  Level 0.5: Recessed wells & secondary cards
        └── #1B1B1B  Level 1: Primary cards & transaction blocks (border: 1px solid #3A3742)
             └── #222222  Level 2: Elevated controls & floating navigation
                  └── #292929  Level 3: Bottom sheets & modal dialogs (border: 1px solid #46424F)
```

---

## 3. Typography Engine

Typography is built on Apple’s native **SF Pro** system typeface, leveraging proportional tracking and optical kerning standard to iOS Human Interface Guidelines.

### 3.1 Type Scale Hierarchy

| Style Token | Font Size | Font Weight | Line Height | Tracking | Primary Usage |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **`display-hero`** | `48px` | Bold (`700`) | `52px` | `-0.03em` | Desktop hero headline. |
| **`display-hero-mobile`** | `38px` | Bold (`700`) | `42px` | `-0.025em` | Mobile hero & primary focal balance. |
| **`headline-lg`** | `32px` | Bold (`700`) | `38px` | `-0.02em` | Major section headers. |
| **`headline-md`** | `24px` | Semi-bold (`600`)| `30px` | `-0.015em`| Section headers, modal titles. |
| **`headline-sm`** | `20px` | Semi-bold (`600`)| `26px` | `-0.01em` | Card titles, step headings. |
| **`body-lg`** | `17px` | Regular (`400`) | `24px` | `-0.01em` | Lead paragraphs, body copy. |
| **`body-md`** | `15px` | Regular (`400`) | `20px` | `-0.005em`| Standard description copy. |
| **`body-sm`** | `13px` | Regular (`400`) | `18px` | `0em` | Reassurance copy, footnotes. |
| **`label-lg`** | `15px` | Semi-bold (`600`)| `20px` | `0em` | Primary button labels, navigation links. |
| **`label-md`** | `13px` | Medium (`500`) | `18px` | `+0.01em` | Metadata, chips, table details. |
| **`label-sm`** | `11px` | Semi-bold (`600`)| `14px` | `+0.04em` | Eyebrow tags (UPPERCASE only). |
| **`numeric-keypad`** | `28px` | Regular (`400`) | `34px` | `-0.01em` | Keypad cell numerals. |

### 3.2 Typographic Principles
1. **Tabular Numerals (`tnum`)**: All live financial figures, balances, and allowance counters MUST use `font-variant-numeric: tabular-nums` to prevent layout jitter during typing or animations.
2. **Monetary Dominance**: The primary monthly balance and allowance figures must visually anchor the screen. Never hide them behind submenus.
3. **Weight Integrity in Dark Mode**: Do not artificially reduce font weights in dark mode; clarity is maintained via `#F2F0F0` luminance.

---

## 4. Spatial System, Geometry & Elevation

### 4.1 Spacing Rhythm
* **Lateral Margins (`gutter`)**: Fixed `16px` on mobile screens (`margin: 1rem`).
* **Tablet / Desktop Max-Width**: Content cards constrained to `640px` centered on iPad/tablet, and `1200px` on web landing page.
* **Internal Card Padding (`space-lg`)**: `20px` (`1.25rem`) padding for breathable framing.
* **Inter-Card Gap (`space-md`)**: `16px` (`1rem`) vertical stacking margin.
* **Section Gap (`space-2xl`)**: `40px` (`2.5rem`) spacing between distinct logical modules.
* **Floating Clearance**: Mandatory `96px` (`6rem`) bottom padding across all scroll views so the floating navigation bar never obscures content.

### 4.2 Corner Curvature (iOS Continuous Squircle)
* **Primary Cards & Containers**: `24px` to `28px` (`rounded-xl` / continuous squircle).
* **Buttons & Form Fields**: `16px` to `20px` (`rounded-lg`).
* **Badges, Filters & Floating Dock**: Full pill termination (`rounded-full` / `9999px`).

### 4.3 Elevation & Shadows

```text
Level 0 (Canvas):
  Light: #FCF9F8 flat
  Dark:  #101010 flat

Level 1 (Cards):
  Light: #FFFFFF | 1px solid #E8E8EA | box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02)
  Dark:  #1B1B1B | 1px solid #3A3742 | box-shadow: 0 4px 24px rgba(0, 0, 0, 0.35)

Level 2 (Floating Dock & Overlays):
  Light: #FFFFFF | 1px solid #E8E8EA | box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04)
  Dark:  #222222 | 1px solid #3A3742 | box-shadow: 0 4px 20px rgba(0, 0, 0, 0.24)

Level 3 (Modals & Sheets):
  Light: #FFFFFF | 1px solid #E8E8EA | backdrop: rgba(0, 0, 0, 0.28) | shadow: 0 8px 32px rgba(0,0,0,0.08)
  Dark:  #292929 | 1px solid #46424F | backdrop: rgba(0, 0, 0, 0.58) | shadow: 0 8px 32px rgba(0,0,0,0.32)
```

---

## 5. Component Specifications (Light & Dark Mode)

### 5.1 Floating Navigation Bar & Quick-Add Action
* **Architecture**: Floating pill detached from screen edges, centered horizontally with `16px` lateral margins and `16px` above the bottom safe area. Fixed height `64px`.
* **Dock Styling**:
  * *Light*: Background `#FFFFFF`, border `1px solid #E8E8EA`, shadow `0 4px 20px rgba(0, 0, 0, 0.04)`.
  * *Dark*: Background `#1B1B1B`, border `1px solid #3A3742`, shadow `0 4px 20px rgba(0, 0, 0, 0.24)`.
* **Triggers**:
  * *Inactive Trigger*: Icon color `#707070` (Light) / `#918D9A` (Dark).
  * *Active Trigger*: Icon color `#532BDB` (Light) / `#8B72FF` (Dark).
* **Center Quick-Add Action**:
  * *Light*: Circular `48px` button, background `#6C4BF4`, white `+` icon (`#FFFFFF`).
  * *Dark*: Circular `48px` button, background `#8B72FF`, dark violet `+` icon (`#16005C`). No neon glow.

---

### 5.2 Numeric Keypad & Amount Entry Display
* **Amount Input Display**:
  * Zero-chrome, borderless container rendering `display-hero-mobile` (`38px` bold).
  * Currency code (e.g. `DT`) rendered in `body-lg` (`17px`), color `#707070` (Light) / `#B9B5C3` (Dark).
  * Background: Fully transparent.
* **Keypad Grid**: Flat grid of edge-free number cells (`numeric-keypad` 28px).
  * *Cell Number Color*: `#1C1B1B` (Light) / `#F2F0F0` (Dark).
  * *Secondary Text (`.`, `⌫`)*: `#797587` (Light) / `#918D9A` (Dark).
  * *Pressed State*: Soft circular highlight, `#F6F3F2` (Light) / `#292929` (Dark). No visible cell grid lines.

---

### 5.3 Transaction Rows & Date Grouping
* **Card Container**: `24px` rounded corners, padding `20px`.
* **Row Geometry**: Fixed `60px` row height. Hairline divider inset `56px` from leading edge.
* **Leading Glyph Badge**:
  * Monochromatic circular badge (`40px`).
  * *Light*: Background `#F6F3F2`, icon `#1C1B1B`.
  * *Dark*: Background `#292929`, icon `#F2F0F0`.
* **Typography**:
  * *Title*: `label-lg` Semi-bold, `#1C1B1B` (Light) / `#F2F0F0` (Dark).
  * *Subtitle / Timestamp*: `label-sm` Regular, `#797587` (Light) / `#918D9A` (Dark).
* **Amounts**:
  * Standard Outflow: Primary text `#1C1B1B` (Light) / `#F2F0F0` (Dark).
  * Positive Inflow: Prefix `+`, color `#2E7D32` (Light) / `#8DDF86` (Dark).
  * Deficit / Warning: Color `#D32F2F` (Light) / `#FF8A80` (Dark).

---

### 5.4 Category & Filter Chips
* **Geometry**: Fixed height `36px`, full pill radius (`9999px`), horizontal padding `14px`.
* **Default State**:
  * *Light*: Background `#FFFFFF`, border `1px solid #E8E8EA`, text `#707070`.
  * *Dark*: Background `#1B1B1B`, border `1px solid #3A3742`, text `#B9B5C3`.
* **Active State**:
  * *Light*: Background `#F1EAFF`, border `1px solid rgba(108,75,244,0.3)`, text `#532BDB` (`#6C4BF4`).
  * *Dark*: Background `#8B72FF`, border `1px solid #8B72FF`, text `#16005C`.
* **Pressed State**:
  * Scale `0.97`, opacity `0.85`.

---

### 5.5 Form Text Fields & Search
* **Geometry**: Container height `52px`, corner radius `16px` (`rounded-lg`).
* **Rest State**:
  * *Light*: Background `#F6F3F2`, border `1px solid #E8E8EA`, text `#1C1B1B`, placeholder `#797587`.
  * *Dark*: Background `#1B1B1B`, border `1px solid #3A3742`, text `#F2F0F0`, placeholder `#918D9A`.
* **Focused State**:
  * *Light*: Background `#FFFFFF`, border `1.5px solid #532BDB`, ring `2px rgba(83, 43, 219, 0.15)`.
  * *Dark*: Background `#151515`, border `1.5px solid #8B72FF`, ring `2px rgba(139, 114, 255, 0.20)`.

---

### 5.6 Bottom Sheets & Action Modals
* **Backdrop Dimming Mask**:
  * *Light*: `rgba(0, 0, 0, 0.28)`.
  * *Dark*: `rgba(0, 0, 0, 0.58)`.
* **Sheet Surface**:
  * *Light*: Background `#FFFFFF`, border `1px solid #E8E8EA`, top radius `28px`.
  * *Dark*: Background `#1B1B1B`, border `1px solid #46424F`, top radius `28px`.
* **Drag Indicator Handle**:
  * Width `36px`, height `5px`, radius `9999px`.
  * *Light*: Background `#DCD9D9`.
  * *Dark*: Background `#625F69`.

---

### 5.7 Widgets (Lock Screen, Home Screen) & Dynamic Island
* **Small Home Screen Widget**:
  * Displays remaining monthly budget and available percentage.
  * *Light*: Background `#FFFFFF`, border `1px solid #E8E8EA`, balance `#1C1B1B`.
  * *Dark*: Background `#1B1B1B`, border `1px solid #3A3742`, balance `#F2F0F0`.
* **Lock Screen Widget**:
  * Monochromatic inline representation adhering strictly to Apple Lock Screen rendering rules.
* **Dynamic Island**:
  * Always deep black OLED `#000000` with white text and a single violet accent beacon.
  * Used strictly for temporary Live Activities (e.g. daily allowance awareness after spending), never permanently persistent.

---

## 6. Landing Page & Web Appearance

The web landing page is a living mirror of the product:

### 6.1 Theme Parity Rules
1. **Full Appearance Parity**: When Dark Mode is selected, the **entire web page switches** to the dark hierarchy. Never display a white card inside a dark page or vice versa.
2. **Living Kinetic Demonstrations**: All interactive mockups inside the landing page use real HTML/CSS native surfaces (no pre-rendered phone bezels or device mockups).
3. **Theme Switcher**:
   * Must use a **tactile button switcher** (Sun / Moon toggle with rotation animation), never a dropdown menu.
   * Persists choice in `localStorage` (`numo-theme`).
   * Honors OS `prefers-color-scheme` automatically.
   * Theme transition uses a smooth `0.25s` crossfade across surfaces and typography without layout recalculation.

---

## 7. Accessibility, Motion & Haptics

### 7.1 Accessibility Standards
* **WCAG AAA Compliance**: Primary monetary totals and critical controls must achieve at least a 7:1 contrast ratio against their respective surfaces.
* **Non-Chromatic Signals**: Never communicate financial surplus or deficit solely through color. Positive amounts MUST include the `+` sign; negative alerts MUST include explicit descriptive labels.
* **Dynamic Type**: All font sizes must scale fluidly with system text size preferences.

### 7.2 Motion & Animation
* **Animation Duration**: 150ms to 250ms max.
* **Easing**: Apple standard cubic-bezier `(0.4, 0, 0.2, 1)`.
* **Allowed Motion**: Subtle numerical count-ups, hairline progress bar width expands, soft opacity crossfades.
* **Strictly Prohibited**: Confetti, celebratory bouncing cards, decorative parallax, spring wobbles.

### 7.3 Haptic Feedback Map (iOS)
* **Expense Recorded**: `UIImpactFeedbackGenerator(style: .light)`
* **Keypad Number Tapped**: Low-latency selection tick (`selectionChanged()`).
* **Deletion Confirmation**: Warning haptic (`UINotificationFeedbackGenerator().notificationOccurred(.warning)`).
* Do NOT attach haptics to routine navigation or scroll events.

---

## 8. Code Implementation Bridge (SwiftUI & Web)

To guarantee 100% design fidelity between the iOS application and the Next.js landing page, both codebases adhere to matching semantic token identifiers.

### 8.1 Token Mapping Matrix

| Semantic Token | SwiftUI (`Color.numo...`) | Web / Tailwind CSS Class | CSS Variable |
| :--- | :--- | :--- | :--- |
| **Canvas Background** | `Color("numoBackground")` | `bg-background` | `var(--color-background)` |
| **Primary Card** | `Color("numoCard")` | `bg-surface-container-lowest` / `.hairline-card` | `var(--card-bg)` |
| **Secondary Surface** | `Color("numoSurfaceLow")` | `bg-surface-container-low` | `var(--color-surface-container-low)` |
| **Recessed Well** | `Color("numoWell")` | `bg-surface-container` | `var(--color-surface-container)` |
| **Primary Text** | `Color("numoTextPrimary")` | `text-on-surface` | `var(--color-on-surface)` |
| **Secondary Text** | `Color("numoTextSecondary")` | `text-on-surface-variant` | `var(--color-on-surface-variant)` |
| **Muted Metadata** | `Color("numoTextMuted")` | `text-outline` | `var(--color-outline)` |
| **Divider Stroke** | `Color("numoDivider")` | `border-outline-variant` | `var(--card-border)` |
| **Primary Accent** | `Color("numoPrimary")` | `bg-primary`, `text-primary` | `var(--color-primary)` |
| **Primary Button Text**| `Color("numoOnPrimary")` | `text-on-primary` | `var(--color-on-primary)` |
| **Accent Subtle Tag** | `Color("numoAccentSubtle")` | `bg-primary-subtle` | `var(--color-primary-subtle)` |
| **Success / Surplus** | `Color("numoSuccess")` | `text-success`, `bg-success` | `var(--color-success)` |
| **Error / Deficit** | `Color("numoError")` | `text-error`, `bg-error` | `var(--color-error)` |

---

*Numo Design System · Version 1.0.0 · Radical clarity for personal finance.*
