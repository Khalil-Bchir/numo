import SwiftUI
import SwiftData

struct MainTabView: View {
    @State private var selectedTab: TabItem = .home
    @State private var showingAddExpenseSheet: Bool = false
    
    var body: some View {
        ZStack(alignment: .bottom) {
            // Active Tab Destination
            Group {
                switch selectedTab {
                case .home:
                    HomeScreenView {
                        showingAddExpenseSheet = true
                    }
                case .activity:
                    ActivityScreenView()
                case .insights:
                    InsightsScreenView()
                case .settings:
                    SettingsScreenView()
                }
            }
            .frame(maxWidth: .infinity, maxHeight: .infinity)
            
            // Floating Bottom Navigation Bar
            FloatingTabBar(
                selectedTab: $selectedTab,
                onAddExpenseTap: {
                    showingAddExpenseSheet = true
                }
            )
        }
        .sheet(isPresented: $showingAddExpenseSheet) {
            AddExpenseSheet()
        }
    }
}
