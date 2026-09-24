import AppIntents

struct NumoShortcuts: AppShortcutsProvider {
    static var appShortcuts: [AppShortcut] {
        AppShortcut(
            intent: AddExpenseIntent(),
            phrases: [
                "Add an expense in \(.applicationName)",
                "Add \(\.$amount) to \(.applicationName)",
                "I spent \(\.$amount) in \(.applicationName)"
            ],
            shortTitle: "Add Expense",
            systemImageName: "plus.circle.fill"
        )
        
        AppShortcut(
            intent: CheckSpendingIntent(),
            phrases: [
                "How much did I spend today in \(.applicationName)?",
                "Check today's spending in \(.applicationName)"
            ],
            shortTitle: "Today's Spending",
            systemImageName: "chart.line.uptrend.xyaxis"
        )
        
        AppShortcut(
            intent: CheckRemainingBudgetIntent(),
            phrases: [
                "How much money do I have left in \(.applicationName)?",
                "Check remaining budget in \(.applicationName)"
            ],
            shortTitle: "Remaining Budget",
            systemImageName: "wallet.pass"
        )
        
        AppShortcut(
            intent: CheckDailyAllowanceIntent(),
            phrases: [
                "How much can I spend today in \(.applicationName)?",
                "Check daily allowance in \(.applicationName)"
            ],
            shortTitle: "Daily Allowance",
            systemImageName: "calendar.badge.clock"
        )
    }
}
