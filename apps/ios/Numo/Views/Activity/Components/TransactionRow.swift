import SwiftUI

struct TransactionRow: View {
    let expense: Expense
    let currency: String
    
    var body: some View {
        HStack(spacing: 12) {
            ZStack {
                Circle()
                    .fill(NumoColor.secondarySurface)
                    .frame(width: 40, height: 40)
                
                Image(systemName: expense.category?.icon ?? "cart.fill")
                    .font(.system(size: 16))
                    .foregroundColor(NumoColor.accent)
            }
            
            VStack(alignment: .leading, spacing: 3) {
                Text(expense.category?.name ?? "Other")
                    .font(NumoTypography.primaryBody().weight(.medium))
                    .foregroundColor(NumoColor.primaryText)
                
                if let note = expense.note, !note.isEmpty {
                    Text(note)
                        .font(NumoTypography.secondaryBody())
                        .foregroundColor(NumoColor.secondaryText)
                        .lineLimit(1)
                }
            }
            
            Spacer()
            
            VStack(alignment: .trailing, spacing: 3) {
                Text("\(String(format: "%.1f", expense.amount)) \(currency)")
                    .font(NumoTypography.primaryBody().weight(.semibold))
                    .foregroundColor(NumoColor.primaryText)
                
                Text(expense.spentAt, style: .time)
                    .font(NumoTypography.caption())
                    .foregroundColor(NumoColor.mutedText)
            }
        }
        .padding(.vertical, 8)
        .contentShape(Rectangle())
    }
}
