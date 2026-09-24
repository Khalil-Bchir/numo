import SwiftUI
import SwiftData

@MainActor
final class AppState: ObservableObject {
    @Published var showingAddExpenseQuickAction: Bool = false
    
    init() {}
}
