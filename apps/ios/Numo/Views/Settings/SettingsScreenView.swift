import SwiftUI
import SwiftData

struct SettingsScreenView: View {
    @Environment(\.modelContext) private var modelContext
    @Query private var budgets: [Budget]
    @Query private var expenses: [Expense]
    
    @AppStorage("user_appearance") private var appearance: String = "system"
    @State private var showingExportSheet: Bool = false
    @State private var budgetAmountText: String = ""
    @State private var selectedResetDay: Int = 1
    
    private var currentBudget: Budget? {
        budgets.first
    }
    
    var body: some View {
        NavigationStack {
            Form {
                // Section: Budget (Spec 44)
                Section("Budget") {
                    HStack {
                        Text("Monthly budget")
                            .foregroundColor(NumoColor.primaryText)
                        Spacer()
                        TextField("Amount", text: $budgetAmountText)
                            .keyboardType(.numberPad)
                            .multilineTextAlignment(.trailing)
                            .frame(maxWidth: 120)
                            .onSubmit(saveBudget)
                        Text("DT")
                            .foregroundColor(NumoColor.secondaryText)
                    }
                    
                    Picker("Budget reset", selection: $selectedResetDay) {
                        Text("1st of every month").tag(1)
                        Text("15th of every month").tag(15)
                    }
                    .onChange(of: selectedResetDay) { _, _ in
                        saveBudget()
                    }
                    
                    HStack {
                        Text("Currency")
                            .foregroundColor(NumoColor.primaryText)
                        Spacer()
                        Text("TND (Tunisian Dinar)")
                            .foregroundColor(NumoColor.secondaryText)
                    }
                }
                
                // Section: Appearance
                Section("Appearance") {
                    Picker("Theme", selection: $appearance) {
                        Text("System").tag("system")
                        Text("Light").tag("light")
                        Text("Dark").tag("dark")
                    }
                    .pickerStyle(.menu)
                }
                
                // Section: Data
                Section("Data") {
                    Button(action: { showingExportSheet = true }) {
                        HStack {
                            Text("Export data (CSV / JSON)")
                                .foregroundColor(NumoColor.primaryText)
                            Spacer()
                            Image(systemName: "square.and.arrow.up")
                                .foregroundColor(NumoColor.accent)
                        }
                    }
                    
                    HStack {
                        Text("Storage Model")
                            .foregroundColor(NumoColor.primaryText)
                        Spacer()
                        Text("Local-first (SwiftData)")
                            .foregroundColor(NumoColor.secondaryText)
                    }
                }
                
                // Section: About & Privacy
                Section("About") {
                    HStack {
                        Text("App Version")
                            .foregroundColor(NumoColor.primaryText)
                        Spacer()
                        Text("Numo 1.0 (Build 1)")
                            .foregroundColor(NumoColor.secondaryText)
                    }
                    
                    VStack(alignment: .leading, spacing: 6) {
                        Text("Privacy Guarantee")
                            .font(NumoTypography.secondaryBody().weight(.medium))
                            .foregroundColor(NumoColor.primaryText)
                        Text("Numo stores financial data locally on your device first. No sensitive financial information is sold or unnecessarily tracked.")
                            .font(NumoTypography.caption())
                            .foregroundColor(NumoColor.secondaryText)
                    }
                    .padding(.vertical, 4)
                }
            }
            .navigationTitle("Settings")
            .sheet(isPresented: $showingExportSheet) {
                ExportSheet(expenses: expenses)
            }
            .onAppear {
                if let b = currentBudget {
                    budgetAmountText = String(format: "%.0f", b.amount)
                    selectedResetDay = b.resetDay
                } else {
                    budgetAmountText = "1500"
                    selectedResetDay = 1
                }
            }
        }
    }
    
    private func saveBudget() {
        if let amount = Double(budgetAmountText), amount > 0 {
            if let existing = currentBudget {
                existing.amount = amount
                existing.resetDay = selectedResetDay
                existing.updatedAt = Date()
            } else {
                let newBudget = Budget(amount: amount, resetDay: selectedResetDay)
                modelContext.insert(newBudget)
            }
            try? modelContext.save()
            HapticService.lightSuccess()
        }
    }
}
