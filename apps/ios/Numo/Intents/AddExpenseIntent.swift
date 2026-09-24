import AppIntents
import Foundation
import SwiftData

struct AddExpenseIntent: AppIntent {
    static var title: LocalizedStringResource = "Add Expense"
    static var description = IntentDescription("Quickly record a new expense in Numo.")
    static var openAppWhenRun: Bool = false
    
    @Parameter(title: "Amount", description: "Expense amount")
    var amount: Double
    
    @Parameter(title: "Category", description: "Category name (e.g. Food, Transport)")
    var category: String?
    
    @Parameter(title: "Note", description: "Optional description")
    var note: String?
    
    func perform() async throws -> some IntentResult & ProvidesDialog {
        let schema = Schema([Budget.self, Expense.self, Category.self, Income.self, User.self])
        guard let container = try? ModelContainer(for: schema) else {
            return .result(dialog: "Unable to record expense.")
        }
        
        let context = ModelContext(container)
        let catName = category ?? "Other"
        
        // Find or create category
        let descriptor = FetchDescriptor<Category>(predicate: #Predicate { $0.name == catName })
        let matchedCategory = (try? context.fetch(descriptor))?.first
        
        let expense = Expense(
            amount: amount,
            category: matchedCategory,
            note: note,
            spentAt: Date()
        )
        
        context.insert(expense)
        try? context.save()
        
        let formattedAmount = String(format: "%.1f DT", amount)
        return .result(dialog: "\(formattedAmount) added to \(catName).")
    }
}
