import SwiftUI
import SwiftData

struct ActivityScreenView: View {
    @Query(sort: \Expense.spentAt, order: .reverse) private var expenses: [Expense]
    @Query private var budgets: [Budget]
    
    @State private var selectedExpense: Expense?
    
    private var currency: String {
        (budgets.first?.currency ?? "TND") == "TND" ? "DT" : (budgets.first?.currency ?? "DT")
    }
    
    private var totalSpent: Double {
        expenses.reduce(0.0) { $0 + $1.amount }
    }
    
    private var groupedExpenses: [(key: String, expenses: [Expense])] {
        let calendar = Calendar.current
        let formatter = DateFormatter()
        formatter.dateFormat = "MMMM d, yyyy"
        
        let groups = Dictionary(grouping: expenses) { (exp: Expense) -> String in
            if calendar.isDateInToday(exp.spentAt) {
                return "Today"
            } else if calendar.isDateInYesterday(exp.spentAt) {
                return "Yesterday"
            } else {
                return formatter.string(from: exp.spentAt)
            }
        }
        
        // Sort keys with Today first, Yesterday second, then by recent date
        return groups.map { (key: $0.key, expenses: $0.value) }
            .sorted { group1, group2 in
                if group1.key == "Today" { return true }
                if group2.key == "Today" { return false }
                if group1.key == "Yesterday" { return true }
                if group2.key == "Yesterday" { return false }
                guard let d1 = group1.expenses.first?.spentAt,
                      let d2 = group2.expenses.first?.spentAt else { return false }
                return d1 > d2
            }
    }
    
    var body: some View {
        NavigationStack {
            ScrollView(showsIndicators: false) {
                VStack(alignment: .leading, spacing: 20) {
                    // Header Summary
                    VStack(alignment: .leading, spacing: 4) {
                        Text(currentMonthName)
                            .font(NumoTypography.secondaryBody())
                            .foregroundColor(NumoColor.secondaryText)
                        
                        Text("\(String(format: "%.1f", totalSpent)) \(currency)")
                            .font(NumoTypography.largeAmount())
                            .foregroundColor(NumoColor.primaryText)
                        
                        Text("total spent")
                            .font(NumoTypography.secondaryBody())
                            .foregroundColor(NumoColor.secondaryText)
                    }
                    .padding(.top, 10)
                    .numoCard()
                    
                    if expenses.isEmpty {
                        VStack(spacing: 8) {
                            Text("Nothing here yet.")
                                .font(NumoTypography.primaryBody())
                                .foregroundColor(NumoColor.secondaryText)
                        }
                        .frame(maxWidth: .infinity)
                        .padding(.vertical, 40)
                        .numoCard()
                    } else {
                        // Transactions grouped by date
                        ForEach(groupedExpenses, id: \.key) { group in
                            VStack(alignment: .leading, spacing: 8) {
                                Text(group.key)
                                    .font(NumoTypography.sectionHeading())
                                    .foregroundColor(NumoColor.primaryText)
                                    .padding(.horizontal, 4)
                                
                                VStack(spacing: 0) {
                                    ForEach(group.expenses) { expense in
                                        Button(action: {
                                            selectedExpense = expense
                                        }) {
                                            TransactionRow(expense: expense, currency: currency)
                                        }
                                        
                                        if expense.id != group.expenses.last?.id {
                                            Divider()
                                                .background(NumoColor.divider)
                                        }
                                    }
                                }
                                .numoCard()
                            }
                        }
                    }
                    
                    Spacer(minLength: 80)
                }
                .padding(.horizontal, 20)
            }
            .background(NumoColor.background.ignoresSafeArea())
            .navigationTitle("Activity")
            .sheet(item: $selectedExpense) { expense in
                ExpenseDetailSheet(expense: expense, currency: currency)
            }
        }
    }
    
    private var currentMonthName: String {
        let formatter = DateFormatter()
        formatter.dateFormat = "MMMM yyyy"
        return formatter.string(from: Date())
    }
}
