import SwiftUI
import SwiftData

struct InsightsScreenView: View {
    @Query private var expenses: [Expense]
    @Query private var budgets: [Budget]
    
    private var currency: String {
        (budgets.first?.currency ?? "TND") == "TND" ? "DT" : (budgets.first?.currency ?? "DT")
    }
    
    private var metrics: BudgetMetrics {
        DataStore.calculateMetrics(budget: budgets.first, expenses: expenses)
    }
    
    private var categoryTotals: [(categoryName: String, icon: String, amount: Double)] {
        var dict: [String: (icon: String, amount: Double)] = [:]
        for exp in expenses {
            let catName = exp.category?.name ?? "Other"
            let icon = exp.category?.icon ?? "ellipsis.circle.fill"
            let existing = dict[catName]?.amount ?? 0
            dict[catName] = (icon, existing + exp.amount)
        }
        return dict.map { (categoryName: $0.key, icon: $0.value.icon, amount: $0.value.amount) }
            .sorted { $0.amount > $1.amount }
    }
    
    private var topCategory: String? {
        categoryTotals.first?.categoryName
    }
    
    private var dailyAverage: Double {
        let calendar = Calendar.current
        let dayOfMonth = max(1, calendar.component(.day, from: Date()))
        return metrics.totalSpentThisMonth / Double(dayOfMonth)
    }
    
    var body: some View {
        NavigationStack {
            ScrollView(showsIndicators: false) {
                VStack(alignment: .leading, spacing: 20) {
                    // Header Summary
                    VStack(alignment: .leading, spacing: 6) {
                        Text("Where did my money go?")
                            .font(NumoTypography.secondaryBody())
                            .foregroundColor(NumoColor.secondaryText)
                        
                        Text("\(String(format: "%.1f", metrics.totalSpentThisMonth)) \(currency)")
                            .font(NumoTypography.largeAmount())
                            .foregroundColor(NumoColor.primaryText)
                        
                        Text("spent this month")
                            .font(NumoTypography.secondaryBody())
                            .foregroundColor(NumoColor.secondaryText)
                    }
                    .padding(.top, 10)
                    .numoCard()
                    
                    // Natural Language Insights (Spec 40)
                    if let top = topCategory, metrics.totalSpentThisMonth > 0 {
                        VStack(alignment: .leading, spacing: 8) {
                            Text("Summary")
                                .font(NumoTypography.sectionHeading())
                                .foregroundColor(NumoColor.primaryText)
                            
                            VStack(alignment: .leading, spacing: 6) {
                                HStack(spacing: 8) {
                                    Image(systemName: "sparkles")
                                        .foregroundColor(NumoColor.accent)
                                    Text("\(top) represents your largest spending category this month.")
                                        .font(NumoTypography.primaryBody())
                                        .foregroundColor(NumoColor.primaryText)
                                }
                                
                                HStack(spacing: 8) {
                                    Image(systemName: "calendar")
                                        .foregroundColor(NumoColor.accent)
                                    Text("Your daily average is \(String(format: "%.1f", dailyAverage)) \(currency).")
                                        .font(NumoTypography.primaryBody())
                                        .foregroundColor(NumoColor.primaryText)
                                }
                            }
                            .numoCard()
                        }
                    }
                    
                    // Category Breakdown (Horizontal Bars)
                    VStack(alignment: .leading, spacing: 12) {
                        Text("Categories")
                            .font(NumoTypography.sectionHeading())
                            .foregroundColor(NumoColor.primaryText)
                        
                        if categoryTotals.isEmpty {
                            VStack(spacing: 8) {
                                Text("Add a few expenses to see your spending patterns.")
                                    .font(NumoTypography.primaryBody())
                                    .foregroundColor(NumoColor.secondaryText)
                            }
                            .frame(maxWidth: .infinity)
                            .padding(.vertical, 24)
                            .numoCard()
                        } else {
                            VStack(spacing: 16) {
                                ForEach(categoryTotals, id: \.categoryName) { item in
                                    CategoryBarView(
                                        categoryName: item.categoryName,
                                        icon: item.icon,
                                        amount: item.amount,
                                        totalAmount: metrics.totalSpentThisMonth,
                                        currency: currency
                                    )
                                }
                            }
                            .numoCard()
                        }
                    }
                    
                    // Spending Patterns (Spec 39)
                    VStack(alignment: .leading, spacing: 12) {
                        Text("Patterns")
                            .font(NumoTypography.sectionHeading())
                            .foregroundColor(NumoColor.primaryText)
                        
                        HStack(spacing: 12) {
                            VStack(alignment: .leading, spacing: 4) {
                                Text("\(String(format: "%.1f", dailyAverage)) \(currency)")
                                    .font(NumoTypography.sectionHeading())
                                    .foregroundColor(NumoColor.primaryText)
                                Text("Daily average")
                                    .font(NumoTypography.caption())
                                    .foregroundColor(NumoColor.secondaryText)
                            }
                            .frame(maxWidth: .infinity, alignment: .leading)
                            .numoCard(padding: 16)
                            
                            VStack(alignment: .leading, spacing: 4) {
                                Text("\(String(format: "%.1f", metrics.dailyAllowance)) \(currency)")
                                    .font(NumoTypography.sectionHeading())
                                    .foregroundColor(NumoColor.primaryText)
                                Text("Daily allowance")
                                    .font(NumoTypography.caption())
                                    .foregroundColor(NumoColor.secondaryText)
                            }
                            .frame(maxWidth: .infinity, alignment: .leading)
                            .numoCard(padding: 16)
                        }
                    }
                    
                    Spacer(minLength: 80)
                }
                .padding(.horizontal, 20)
            }
            .background(NumoColor.background.ignoresSafeArea())
            .navigationTitle("Insights")
        }
    }
}
