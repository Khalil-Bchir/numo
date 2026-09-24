import SwiftUI

enum TabItem: String, CaseIterable, Identifiable {
    case home = "Home"
    case activity = "Activity"
    case insights = "Insights"
    case settings = "Settings"
    
    var id: String { rawValue }
    
    var icon: String {
        switch self {
        case .home: return "house.fill"
        case .activity: return "list.bullet"
        case .insights: return "chart.bar.xaxis"
        case .settings: return "gearshape.fill"
        }
    }
}

struct FloatingTabBar: View {
    @Binding var selectedTab: TabItem
    var onAddExpenseTap: () -> Void
    
    var body: some View {
        HStack(spacing: 0) {
            // Home
            tabButton(for: .home)
            
            // Activity
            tabButton(for: .activity)
            
            // Prominent + Expense Center Button
            Button(action: {
                HapticService.selection()
                onAddExpenseTap()
            }) {
                HStack(spacing: 6) {
                    Image(systemName: "plus")
                        .font(.system(size: 16, weight: .bold))
                    Text("Expense")
                        .font(NumoTypography.secondaryBody().weight(.semibold))
                }
                .foregroundColor(.white)
                .padding(.horizontal, 16)
                .padding(.vertical, 12)
                .background(NumoColor.accent)
                .clipShape(Capsule())
                .shadow(color: NumoColor.accent.opacity(0.35), radius: 8, x: 0, y: 4)
            }
            .padding(.horizontal, 8)
            
            // Insights
            tabButton(for: .insights)
            
            // Settings
            tabButton(for: .settings)
        }
        .padding(.horizontal, 12)
        .padding(.vertical, 10)
        .background(
            NumoColor.primarySurface
                .shadow(color: Color.black.opacity(0.08), radius: 16, x: 0, y: 6)
        )
        .clipShape(RoundedRectangle(cornerRadius: NumoRadius.floatingNav, style: .continuous))
        .padding(.horizontal, 18)
        .padding(.bottom, 12)
    }
    
    private func tabButton(for tab: TabItem) -> some View {
        Button(action: {
            HapticService.selection()
            selectedTab = tab
        }) {
            VStack(spacing: 3) {
                Image(systemName: tab.icon)
                    .font(.system(size: 18, weight: selectedTab == tab ? .semibold : .regular))
                Text(tab.rawValue)
                    .font(NumoTypography.caption())
            }
            .frame(maxWidth: .infinity)
            .foregroundColor(selectedTab == tab ? NumoColor.accent : NumoColor.secondaryText)
        }
    }
}
