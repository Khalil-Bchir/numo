# Numo iOS App

Native iOS application for **Numo** — an ultra-fast, minimalist personal expense tracker built for iOS 17+ using **SwiftUI**, **SwiftData**, **App Intents**, **WidgetKit**, and **ActivityKit**.

Designed and implemented in exact accordance with the [Numo Product Brief](../../docs/Numo_Product_Brief.pdf).

---

## 📱 Key Features

- **⚡ Sub-3-Second Expense Logging**: Custom numpad + 1-tap category selection + optional note. Auto-dismiss with haptic feedback.
- **🎯 Remaining-Budget Dominance**: The Home screen prioritizes what you have left to spend this month, alongside today's spending and daily allowance.
- **📱 Native System Integrations**:
  - **App Intents & Shortcuts**: Log expenses via Siri, Shortcuts, and the iOS 15 Pro / 16 Action Button (`"Hey Siri, log 15 DT for lunch"`).
  - **WidgetKit**: Home screen widget (Small, Medium, Lock Screen) displaying remaining budget & daily allowance.
  - **ActivityKit**: Dynamic Island & Live Activity showing today's ongoing spending burn rate.
- **💾 Local-First & Privacy-Focused**:
  - Full offline capability using **SwiftData** container.
  - Non-blocking sync queue (`SyncService`) syncing transactions seamlessly with the Numo backend API & Supabase.
- **🎨 Design System**:
  - Minimalist flat aesthetic with rounded corners (`16pt` cards, `12pt` buttons, `8pt` pills).
  - High-contrast neutral palette (`#F5F5F7` light, `#000000` & `#1C1C1E` dark, `#4F6BFF` electric blue accent).
  - Native **SF Pro** typography hierarchy with bold tabular figures for financial numbers.
  - **TND (DT)** currency formatting and English interface.
- **📊 Analytics & Export**:
  - Horizontal bar charts and category breakdowns without confusing financial graphs.
  - Full data export in CSV & JSON format (`ExportService`).

---

## 🏗 Project Architecture

```
apps/ios/
├── Numo.xcodeproj/            # Standard Xcode Project (iOS 17+)
├── Package.swift               # Swift Package Manager manifest
├── package.json                # Monorepo workspace package (@numo/ios)
└── Numo/
    ├── App/
    │   ├── NumoApp.swift       # App lifecycle & SwiftData ModelContainer setup
    │   └── AppState.swift      # Global navigation & sheet coordinator
    ├── DesignSystem/
    │   ├── Colors.swift        # Palette conforming to product brief
    │   ├── Typography.swift    # SF Pro typographic tokens
    │   └── CornerRadius.swift  # Border radius & card styling modifiers
    ├── Models/                 # SwiftData @Model entities
    │   ├── User.swift
    │   ├── Budget.swift
    │   ├── Category.swift
    │   ├── Expense.swift
    │   └── Income.swift
    ├── Services/
    │   ├── DataStore.swift     # Local metrics & budget calculations
    │   ├── SyncService.swift   # Local-first background sync engine
    │   ├── HapticService.swift # Tactile sensory feedback
    │   └── ExportService.swift # CSV & JSON exporter
    ├── Views/
    │   ├── Navigation/         # FloatingTabBar & MainTabView
    │   ├── Home/               # Hero remaining budget & quick glance
    │   ├── Expense/            # AddExpenseSheet, Keypad, Category selector
    │   ├── Activity/           # Transaction history & detail editor
    │   ├── Insights/           # Category breakdown & pattern summaries
    │   ├── Settings/           # Budget config, theme, export & privacy
    │   └── Onboarding/         # 4-step first-launch introduction
    ├── Intents/                # App Intents & Shortcuts provider
    ├── Widgets/                # WidgetKit & ActivityKit implementations
    └── Resources/              # Info.plist & Assets.xcassets
```

---

## 🚀 Getting Started

### Prerequisites

- macOS 14 (Sonoma) or macOS 15 (Sequoia)
- Xcode 15.0 or later
- iOS 17.0+ Simulator or physical device

### Opening in Xcode

From your Mac terminal:

```bash
cd apps/ios
open Numo.xcodeproj
```

Xcode will automatically resolve the Swift Package dependency (`supabase-swift`).

### Running the App

1. Select the `Numo` scheme.
2. Select any **iPhone 15** or **iPhone 16** simulator running iOS 17+.
3. Press `Cmd + R` to build and run.

### Configuring Backend Synchronization

By default, `SyncService` operates locally and enqueues sync operations. To connect with your local or deployed Numo API backend, configure the backend endpoint in `SyncService.swift` or via `Info.plist`:

```swift
// apps/ios/Numo/Services/SyncService.swift
private let backendUrl = URL(string: "http://localhost:3000/api")!
```

---

## 🎙 Siri & Action Button Setup

Numo exposes App Intents via `AppShortcutsProvider`:
- **"Log expense in Numo"**: Triggers `AddExpenseIntent` allowing voice input or parameter prompting for amount and category.
- **"Check budget in Numo"**: Triggers `CheckBudgetIntent` returning the remaining monthly budget.

On iPhone 15 Pro / 16 models:
1. Open **Settings** > **Action Button**.
2. Choose **Shortcut**.
3. Select **"Log Expense"** from Numo.
