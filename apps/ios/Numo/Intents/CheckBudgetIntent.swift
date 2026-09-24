import AppIntents
import Foundation
import SwiftData

struct CheckSpendingIntent: AppIntent {
    static var title: LocalizedStringResource = "Check Today's Spending"
    static var description = IntentDescription("Returns how much money you spent today.")
    
    func perform() async throws -> some IntentResult & ProvidesDialog {
        let schema = Schema([Budget.self, Expense.self, Category.self, Income.self, User.self])
        guard let container = try? ModelContainer(for: schema) else {
            return .result(dialog: "Unable to check spending.")
        }
        
        let context = ModelContext(container)
        let calendar = Calendar.current
        let startOfDay = calendar.startOfDay(for: Date())
        let descriptor = FetchDescriptor<Expense>(predicate: #Predicate { $0.spentAt >= startOfDay })
        let expenses = (try? context.fetch(descriptor)) ?? []
        
        let total = expenses.reduce(0.0) { $0 + $1.amount }
        return .result(dialog: "You spent \(String(format: "%.1f DT", total)) today.")
    }
}

struct CheckRemainingBudgetIntent: AppIntent {
    static var title: LocalizedStringResource = "Check Remaining Budget"
    static var description = IntentDescription("Returns how much money remains in this month's budget.")
    
    func perform() async throws -> some IntentResult & ProvidesDialog {
        let schema = Schema([Budget.self, Expense.self, Category.self, Income.self, User.self])
        guard let container = try? ModelContainer(for: schema) else {
            return .result(dialog: "Unable to check remaining budget.")
        }
        
        let context = ModelContext(container)
        let budgets = (try? context.fetch(FetchDescriptor<Budget>())) ?? []
        let expenses = (try? context.fetch(FetchDescriptor<Expense>())) ?? []
        
        let metrics = DataStore.calculateMetrics(budget: budgets.first, expenses: expenses)
        return .result(dialog: "You have \(String(format: "%.1f DT", metrics.remainingThisMonth)) left this month.")
    }
}

struct CheckDailyAllowanceIntent: AppIntent {
    static var title: LocalizedStringResource = "Check Daily Allowance"
    static var description = IntentDescription("Returns today's daily allowance.")
    
    func perform() async throws -> some IntentResult & ProvidesDialog {
        let schema = Schema([Budget.self, Expense.self, Category.self, Income.self, User.self])
        guard let container = try? ModelContainer(for: schema) else {
            return .result(dialog: "Unable to check daily allowance.")
        }
        
        let context = ModelContext(container)
        let budgets = (try? context.fetch(FetchDescriptor<Budget>())) ?? []
        let expenses = (try? context.fetch(FetchDescriptor<Expense>())) ?? []
        
        let metrics = DataStore.calculateMetrics(budget: budgets.first, expenses: expenses)
        return .result(dialog: "You have \(String(format: "%.1f DT", metrics.leftToday)) available for today.")
    }
}
