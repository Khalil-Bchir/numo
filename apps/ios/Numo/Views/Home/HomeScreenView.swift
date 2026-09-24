import SwiftUI
import SwiftData

struct HomeScreenView: View {
    @Environment(\.modelContext) private var modelContext
    
    @Query private var budgets: [Budget]
    @Query(sort: \Expense.spentAt, order: .reverse) private var allExpenses: [Expense]
    
    var onAddExpenseTap: () -> Void
    
    private var metrics: BudgetMetrics {
        DataStore.calculateMetrics(
            budget: budgets.first,
            expenses: allExpenses
        )
    }
    
    private var todayExpenses: [Expense] {
        let calendar = Calendar.current
        return allExpenses.filter { calendar.isDateInToday($0.spentAt) }
    }
    
    var body: some View {
        ScrollView(showsIndicators: false) {
            VStack(alignment: .leading, spacing: 20) {
                // Greeting Header
                VStack(alignment: .leading, spacing: 4) {
                    Text(timeGreeting)
                        .font(NumoTypography.secondaryBody())
                        .foregroundColor(NumoColor.secondaryText)
                }
                .padding(.top, 10)
                
                // Dominant Balance Display (Large Financial Value)
                VStack(alignment: .leading, spacing: 6) {
                    Text("\(String(format: "%.1f", metrics.remainingThisMonth)) \(metrics.formattedCurrency)")
                        .font(NumoTypography.largeAmount())
                        .foregroundColor(NumoColor.primaryText)
                    
                    Text("left this month")
                        .font(NumoTypography.secondaryBody())
                        .foregroundColor(NumoColor.secondaryText)
                }
                .numoCard()
                
                // Today's Spent & Daily Allowance Cards
                HStack(spacing: 12) {
                    // Spent Today
                    VStack(alignment: .leading, spacing: 4) {
                        Text("\(String(format: "%.1f", metrics.spentToday)) \(metrics.formattedCurrency)")
                            .font(NumoTypography.sectionHeading())
                            .foregroundColor(NumoColor.primaryText)
                        
                        Text("spent today")
                            .font(NumoTypography.caption())
                            .foregroundColor(NumoColor.secondaryText)
                    }
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .numoCard(padding: 16)
                    
                    // Daily Allowance
                    VStack(alignment: .leading, spacing: 4) {
                        Text("\(String(format: "%.1f", metrics.dailyAllowance)) \(metrics.formattedCurrency)")
                            .font(NumoTypography.sectionHeading())
                            .foregroundColor(NumoColor.primaryText)
                        
                        Text(metrics.isOverDailyAllowance ? "over allowance" : "daily allowance")
                            .font(NumoTypography.caption())
                            .foregroundColor(metrics.isOverDailyAllowance ? NumoColor.destructive : NumoColor.secondaryText)
                    }
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .numoCard(padding: 16)
                }
                
                // Today's Transactions
                VStack(alignment: .leading, spacing: 12) {
                    Text("Today")
                        .font(NumoTypography.sectionHeading())
                        .foregroundColor(NumoColor.primaryText)
                    
                    if todayExpenses.isEmpty {
                        VStack(spacing: 8) {
                            Text("No expenses yet.")
                                .font(NumoTypography.primaryBody())
                                .foregroundColor(NumoColor.secondaryText)
                            Text("Your spending will appear here.")
                                .font(NumoTypography.caption())
                                .foregroundColor(NumoColor.mutedText)
                        }
                        .frame(maxWidth: .infinity)
                        .padding(.vertical, 24)
                        .numoCard()
                    } else {
                        VStack(spacing: 0) {
                            ForEach(Array(todayExpenses.prefix(5))) { expense in
                                HStack {
                                    Image(systemName: expense.category?.icon ?? "cart.fill")
                                        .foregroundColor(NumoColor.accent)
                                        .frame(width: 24, height: 24)
                                    
                                    VStack(alignment: .leading, spacing: 2) {
                                        Text(expense.category?.name ?? "Other")
                                            .font(NumoTypography.primaryBody().weight(.medium))
                                            .foregroundColor(NumoColor.primaryText)
                                        
                                        if let note = expense.note, !note.isEmpty {
                                            Text(note)
                                                .font(NumoTypography.caption())
                                                .foregroundColor(NumoColor.secondaryText)
                                        }
                                    }
                                    
                                    Spacer()
                                    
                                    Text("\(String(format: "%.1f", expense.amount)) \(metrics.formattedCurrency)")
                                        .font(NumoTypography.primaryBody().weight(.semibold))
                                        .foregroundColor(NumoColor.primaryText)
                                }
                                .padding(.vertical, 12)
                                
                                if expense.id != todayExpenses.prefix(5).last?.id {
                                    Divider()
                                        .background(NumoColor.divider)
                                }
                            }
                        }
                        .numoCard()
                    }
                }
                
                Spacer(minLength: 80) // Space for floating tab bar
            }
            .padding(.horizontal, 20)
        }
        .background(NumoColor.background.ignoresSafeArea())
    }
    
    private var timeGreeting: String {
        let hour = Calendar.current.component(.hour, from: Date())
        if hour < 12 { return "Good morning" }
        if hour < 18 { return "Good afternoon" }
        return "Good evening"
    }
}
