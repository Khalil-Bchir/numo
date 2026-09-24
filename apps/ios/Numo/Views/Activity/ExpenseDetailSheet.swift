import SwiftUI
import SwiftData

struct ExpenseDetailSheet: View {
    @Environment(\.dismiss) private var dismiss
    @Environment(\.modelContext) private var modelContext
    
    @Bindable var expense: Expense
    let currency: String
    
    @Query(sort: \Category.name) private var categories: [Category]
    
    @State private var isEditing: Bool = false
    @State private var editAmountText: String = ""
    @State private var editCategory: Category?
    @State private var editNote: String = ""
    @State private var editDate: Date = Date()
    @State private var showingDeleteConfirmation: Bool = false
    
    var body: some View {
        NavigationStack {
            VStack(spacing: 24) {
                if !isEditing {
                    // Read-only presentation (spec 31)
                    VStack(spacing: 8) {
                        Text("\(String(format: "%.1f", expense.amount)) \(currency)")
                            .font(NumoTypography.largeAmount())
                            .foregroundColor(NumoColor.primaryText)
                        
                        Text(expense.category?.name ?? "Other")
                            .font(NumoTypography.sectionHeading())
                            .foregroundColor(NumoColor.secondaryText)
                    }
                    .padding(.top, 24)
                    
                    VStack(spacing: 16) {
                        if let note = expense.note, !note.isEmpty {
                            detailRow(label: "Note", value: note)
                        }
                        
                        detailRow(label: "Date", value: formattedDate(expense.spentAt))
                        detailRow(label: "Time", value: formattedTime(expense.spentAt))
                        detailRow(label: "Status", value: expense.syncStatus.capitalized)
                    }
                    .numoCard()
                    .padding(.horizontal, 20)
                    
                    Spacer()
                    
                    // Edit and Delete Actions
                    VStack(spacing: 12) {
                        Button(action: {
                            editAmountText = String(format: "%.1f", expense.amount)
                            editCategory = expense.category
                            editNote = expense.note ?? ""
                            editDate = expense.spentAt
                            isEditing = true
                        }) {
                            Text("Edit")
                                .font(NumoTypography.primaryBody().weight(.semibold))
                                .foregroundColor(NumoColor.accent)
                                .frame(maxWidth: .infinity, minHeight: 50)
                                .background(NumoColor.secondarySurface)
                                .clipShape(RoundedRectangle(cornerRadius: NumoRadius.button, style: .continuous))
                        }
                        
                        Button(action: {
                            HapticService.subtleWarning()
                            showingDeleteConfirmation = true
                        }) {
                            Text("Delete")
                                .font(NumoTypography.primaryBody().weight(.semibold))
                                .foregroundColor(NumoColor.destructive)
                                .frame(maxWidth: .infinity, minHeight: 50)
                                .background(NumoColor.destructive.opacity(0.12))
                                .clipShape(RoundedRectangle(cornerRadius: NumoRadius.button, style: .continuous))
                        }
                    }
                    .padding(.horizontal, 20)
                    .padding(.bottom, 20)
                } else {
                    // Edit Form (spec 32)
                    Form {
                        Section("Amount") {
                            TextField("Amount", text: $editAmountText)
                                .keyboardType(.decimalPad)
                        }
                        
                        Section("Category") {
                            Picker("Category", selection: $editCategory) {
                                ForEach(categories) { cat in
                                    Text(cat.name).tag(Optional(cat))
                                }
                            }
                        }
                        
                        Section("Note") {
                            TextField("Add a note", text: $editNote)
                        }
                        
                        Section("Date") {
                            DatePicker("Date & Time", selection: $editDate)
                        }
                    }
                    .scrollContentBackground(.hidden)
                    .background(NumoColor.background)
                    
                    Button(action: saveChanges) {
                        Text("Save")
                            .font(NumoTypography.primaryBody().weight(.semibold))
                            .foregroundColor(.white)
                            .frame(maxWidth: .infinity, minHeight: 50)
                            .background(NumoColor.accent)
                            .clipShape(RoundedRectangle(cornerRadius: NumoRadius.button, style: .continuous))
                    }
                    .padding(.horizontal, 20)
                    .padding(.bottom, 20)
                }
            }
            .navigationTitle(isEditing ? "Edit Expense" : "Expense Detail")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .topBarTrailing) {
                    Button("Done") { dismiss() }
                }
            }
            .alert("Delete this expense?", isPresented: $showingDeleteConfirmation) {
                Button("Cancel", role: .cancel) {}
                Button("Delete", role: .destructive) {
                    deleteExpense()
                }
            } message: {
                Text("\(String(format: "%.1f", expense.amount)) \(currency) - \(expense.category?.name ?? "Expense")")
            }
        }
        .presentationDetents([.medium, .large])
        .presentationCornerRadius(NumoRadius.card)
    }
    
    private func detailRow(label: String, value: String) -> some View {
        HStack {
            Text(label)
                .font(NumoTypography.secondaryBody())
                .foregroundColor(NumoColor.secondaryText)
            Spacer()
            Text(value)
                .font(NumoTypography.primaryBody().weight(.medium))
                .foregroundColor(NumoColor.primaryText)
        }
    }
    
    private func saveChanges() {
        if let newAmount = Double(editAmountText), newAmount > 0 {
            expense.amount = newAmount
            expense.category = editCategory
            expense.note = editNote.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty ? nil : editNote
            expense.spentAt = editDate
            expense.updatedAt = Date()
            expense.syncStatus = "pending"
            try? modelContext.save()
            HapticService.lightSuccess()
            isEditing = false
        }
    }
    
    private func deleteExpense() {
        modelContext.delete(expense)
        try? modelContext.save()
        HapticService.lightSuccess()
        dismiss()
    }
    
    private func formattedDate(_ date: Date) -> String {
        let formatter = DateFormatter()
        formatter.dateStyle = .medium
        return formatter.string(from: date)
    }
    
    private func formattedTime(_ date: Date) -> String {
        let formatter = DateFormatter()
        formatter.timeStyle = .short
        return formatter.string(from: date)
    }
}
