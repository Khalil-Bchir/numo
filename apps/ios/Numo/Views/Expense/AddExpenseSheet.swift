import SwiftUI
import SwiftData

struct AddExpenseSheet: View {
    @Environment(\.dismiss) private var dismiss
    @Environment(\.modelContext) private var modelContext
    
    @Query(sort: \Category.name) private var categories: [Category]
    
    @State private var amountText: String = ""
    @State private var selectedCategory: Category?
    @State private var note: String = ""
    @State private var showingSavedToast: Bool = false
    
    var body: some View {
        NavigationStack {
            VStack(spacing: 20) {
                // Top drag indicator / close bar
                HStack {
                    Spacer()
                    Button(action: { dismiss() }) {
                        Image(systemName: "xmark.circle.fill")
                            .font(.system(size: 24))
                            .foregroundColor(NumoColor.mutedText)
                    }
                }
                .padding(.horizontal, 20)
                .padding(.top, 16)
                
                // Dominant Amount Display
                VStack(spacing: 4) {
                    HStack(alignment: .firstTextBaseline, spacing: 4) {
                        Text(amountText.isEmpty ? "0" : amountText)
                            .font(.system(size: 48, weight: .bold, design: .rounded))
                            .foregroundColor(amountText.isEmpty ? NumoColor.mutedText : NumoColor.primaryText)
                        
                        Text("DT")
                            .font(NumoTypography.sectionHeading())
                            .foregroundColor(NumoColor.secondaryText)
                    }
                    .frame(maxWidth: .infinity, alignment: .center)
                    .padding(.vertical, 8)
                }
                
                // Rounded Category Selector
                VStack(alignment: .leading, spacing: 8) {
                    CategorySelectorView(categories: categories, selectedCategory: $selectedCategory)
                }
                .padding(.horizontal, 16)
                
                // Optional Note
                HStack {
                    Image(systemName: "pencil")
                        .foregroundColor(NumoColor.mutedText)
                    TextField("Add a note", text: $note)
                        .font(NumoTypography.primaryBody())
                        .foregroundColor(NumoColor.primaryText)
                }
                .padding(.horizontal, 16)
                .padding(.vertical, 12)
                .background(NumoColor.secondarySurface.opacity(0.4))
                .clipShape(RoundedRectangle(cornerRadius: NumoRadius.input, style: .continuous))
                .padding(.horizontal, 20)
                
                // Numeric Keypad
                KeypadView(amountText: $amountText) {
                    saveExpense()
                }
                .padding(.horizontal, 20)
                
                // Save Button
                Button(action: saveExpense) {
                    Text("Save expense")
                        .font(NumoTypography.primaryBody().weight(.semibold))
                        .foregroundColor(.white)
                        .frame(maxWidth: .infinity, minHeight: 52)
                        .background(canSave ? NumoColor.accent : NumoColor.mutedText.opacity(0.4))
                        .clipShape(RoundedRectangle(cornerRadius: NumoRadius.button, style: .continuous))
                }
                .disabled(!canSave)
                .padding(.horizontal, 20)
                .padding(.bottom, 12)
            }
            .background(NumoColor.background.ignoresSafeArea())
            .onAppear {
                if selectedCategory == nil {
                    selectedCategory = categories.first(where: { $0.name == "Food" }) ?? categories.first
                }
            }
        }
        .presentationDetents([.fraction(0.85), .large])
        .presentationCornerRadius(NumoRadius.card)
    }
    
    private var canSave: Bool {
        guard let amount = Double(amountText), amount > 0 else { return false }
        return true
    }
    
    private func saveExpense() {
        guard let amount = Double(amountText), amount > 0 else { return }
        
        let newExpense = Expense(
            amount: amount,
            category: selectedCategory,
            note: note.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty ? nil : note,
            spentAt: Date()
        )
        
        // 1. Save locally immediately
        modelContext.insert(newExpense)
        try? modelContext.save()
        
        // 2. Light success haptic
        HapticService.lightSuccess()
        
        // 3. Queue silent background sync
        Task {
            await SyncService.shared.syncPendingExpenses(modelContext: modelContext)
        }
        
        // 4. Return to previous context immediately
        dismiss()
    }
}
