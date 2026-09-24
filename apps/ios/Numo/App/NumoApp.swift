import SwiftUI
import SwiftData

@main
struct NumoApp: App {
    @AppStorage("has_completed_onboarding") private var hasCompletedOnboarding: Bool = false
    @AppStorage("user_appearance") private var appearance: String = "system"
    
    @StateObject private var appState = AppState()
    
    let sharedModelContainer: ModelContainer = {
        let schema = Schema([
            Budget.self,
            Expense.self,
            Category.self,
            Income.self,
            User.self
        ])
        let modelConfiguration = ModelConfiguration(schema: schema, isStoredInMemoryOnly: false)

        do {
            return try ModelContainer(for: schema, configurations: [modelConfiguration])
        } catch {
            fatalError("Could not create ModelContainer: \(error)")
        }
    }()

    var body: some Scene {
        WindowGroup {
            Group {
                if !hasCompletedOnboarding {
                    OnboardingView {
                        hasCompletedOnboarding = true
                    }
                } else {
                    MainTabView()
                }
            }
            .preferredColorScheme(colorScheme)
            .environmentObject(appState)
            .onAppear {
                DataStore.ensureDefaultCategories(modelContext: sharedModelContainer.mainContext)
            }
        }
        .modelContainer(sharedModelContainer)
    }
    
    private var colorScheme: ColorScheme? {
        switch appearance {
        case "light": return .light
        case "dark": return .dark
        default: return nil
        }
    }
}
