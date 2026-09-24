import Foundation
import SwiftData

final class DataStore {
    static let shared = DataStore()
    
    private init() {}
    
    /// Calculate current budget metrics
    static func calculateMetrics(
        budget: Budget?,
        expenses: [Expense],
        incomes: [Income] = []
    ) -> BudgetMetrics {
        let calendar = Calendar.current
        let now = Date()
        let budgetAmount = budget?.amount ?? 1500.0
        let resetDay = budget?.resetDay ?? 1
        let currency = budget?.currency ?? "TND"
        
        // Determine start and end of current budget period based on resetDay
        let period = currentBudgetPeriod(calendar: calendar, date: now, resetDay: resetDay)
        
        // Filter expenses for current month/period
        let currentPeriodExpenses = expenses.filter {
            $0.spentAt >= period.start && $0.spentAt <= period.end
        }
        
        let totalSpentMonth = currentPeriodExpenses.reduce(0.0) { $0 + $1.amount }
        let remainingMonth = max(0, budgetAmount - totalSpentMonth)
        
        // Calculate remaining budget days in period
        let remainingDays = max(1, calendar.dateComponents([.day], from: calendar.startOfDay(for: now), to: period.end).day ?? 1)
        
        // Daily allowance
        let dailyAllowance = remainingMonth / Double(remainingDays)
        
        // Spent today
        let startOfToday = calendar.startOfDay(for: now)
        let endOfToday = calendar.date(byAdding: .day, value: 1, to: startOfToday) ?? now
        let spentToday = expenses.filter {
            $0.spentAt >= startOfToday && $0.spentAt < endOfToday
        }.reduce(0.0) { $0 + $1.amount }
        
        let leftToday = max(0, dailyAllowance - spentToday)
        let isOverDailyAllowance = spentToday > dailyAllowance
        let overAmount = isOverDailyAllowance ? (spentToday - dailyAllowance) : 0
        
        return BudgetMetrics(
            budgetAmount: budgetAmount,
            currency: currency,
            totalSpentThisMonth: totalSpentMonth,
            remainingThisMonth: remainingMonth,
            remainingDays: remainingDays,
            dailyAllowance: dailyAllowance,
            spentToday: spentToday,
            leftToday: leftToday,
            isOverDailyAllowance: isOverDailyAllowance,
            overDailyAllowanceAmount: overAmount
        )
    }
    
    /// Helper to find start and end of the current budget period
    private static func currentBudgetPeriod(calendar: Calendar, date: Date, resetDay: Int) -> (start: Date, end: Date) {
        let currentDay = calendar.component(.day, from: date)
        var startComponents = calendar.dateComponents([.year, .month], from: date)
        
        if currentDay >= resetDay {
            startComponents.day = resetDay
        } else {
            // Started in previous month
            if let prevMonthDate = calendar.date(byAdding: .month, value: -1, to: date) {
                startComponents = calendar.dateComponents([.year, .month], from: prevMonthDate)
                startComponents.day = resetDay
            }
        }
        
        let start = calendar.date(from: startComponents) ?? date
        let end = calendar.date(byAdding: .month, value: 1, to: start) ?? date
        return (start, end)
    }
    
    /// Ensure standard categories are present
    static func ensureDefaultCategories(modelContext: ModelContext) {
        let descriptor = FetchDescriptor<Category>()
        let count = (try? modelContext.fetchCount(descriptor)) ?? 0
        if count == 0 {
            for item in Category.defaults {
                let cat = Category(name: item.name, icon: item.icon, isDefault: true)
                modelContext.insert(cat)
            }
            try? modelContext.save()
        }
    }
}

struct BudgetMetrics {
    let budgetAmount: Double
    let currency: String
    let totalSpentThisMonth: Double
    let remainingThisMonth: Double
    let remainingDays: Int
    let dailyAllowance: Double
    let spentToday: Double
    let leftToday: Double
    let isOverDailyAllowance: Bool
    let overDailyAllowanceAmount: Double
    
    var formattedCurrency: String {
        currency == "TND" ? "DT" : currency
    }
}
