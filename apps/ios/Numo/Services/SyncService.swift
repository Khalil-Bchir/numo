import Foundation
import SwiftData

@MainActor
final class SyncService: ObservableObject {
    static let shared = SyncService()
    
    @Published var isSyncing: Bool = false
    @Published var lastSyncError: String? = nil
    
    private let apiBaseUrl: String
    
    private init() {
        // Points to local/staged Hono backend API
        self.apiBaseUrl = Bundle.main.object(forInfoDictionaryKey: "API_BASE_URL") as? String ?? "http://localhost:3000/api/v1"
    }
    
    /// Queue synchronization silently in the background
    func syncPendingExpenses(modelContext: ModelContext) async {
        guard !isSyncing else { return }
        isSyncing = true
        defer { isSyncing = false }
        
        let descriptor = FetchDescriptor<Expense>(
            predicate: #Predicate { $0.syncStatus == "pending" }
        )
        
        guard let pending = try? modelContext.fetch(descriptor), !pending.isEmpty else {
            return
        }
        
        // For each pending expense, attempt push to backend API / Supabase
        for expense in pending {
            do {
                try await uploadExpense(expense)
                expense.syncStatus = "synced"
                expense.updatedAt = Date()
            } catch {
                // Keep status as "pending" - local-first ensures data safety
                lastSyncError = "We couldn't sync your latest changes. Your expenses are saved on this iPhone."
                break
            }
        }
        
        try? modelContext.save()
    }
    
    private func uploadExpense(_ expense: Expense) async throws {
        // REST API call: POST /expenses
        guard let url = URL(string: "\(apiBaseUrl)/expenses") else { return }
        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        
        let payload: [String: Any] = [
            "id": expense.id.uuidString,
            "amount": expense.amount,
            "category": expense.category?.name ?? "Other",
            "note": expense.note ?? "",
            "spentAt": ISO8601DateFormatter().string(from: expense.spentAt)
        ]
        
        request.httpBody = try? JSONSerialization.data(withJSONObject: payload)
        
        // Timeout shortly to ensure non-blocking behaviour
        let config = URLSessionConfiguration.default
        config.timeoutIntervalForRequest = 5.0
        let session = URLSession(configuration: config)
        
        let (_, response) = try await session.data(for: request)
        if let httpResponse = response as? HTTPURLResponse, (200...299).contains(httpResponse.statusCode) {
            return
        }
    }
}
