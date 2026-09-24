import SwiftUI

struct CategoryBarView: View {
    let categoryName: String
    let icon: String
    let amount: Double
    let totalAmount: Double
    let currency: String
    
    private var percentage: Double {
        totalAmount > 0 ? (amount / totalAmount) : 0
    }
    
    var body: some View {
        VStack(alignment: .leading, spacing: 6) {
            HStack {
                Image(systemName: icon)
                    .font(.system(size: 14))
                    .foregroundColor(NumoColor.accent)
                
                Text(categoryName)
                    .font(NumoTypography.primaryBody().weight(.medium))
                    .foregroundColor(NumoColor.primaryText)
                
                Spacer()
                
                Text("\(String(format: "%.1f", amount)) \(currency)")
                    .font(NumoTypography.primaryBody().weight(.semibold))
                    .foregroundColor(NumoColor.primaryText)
            }
            
            // Horizontal Bar
            GeometryReader { geometry in
                ZStack(alignment: .leading) {
                    RoundedRectangle(cornerRadius: 6, style: .continuous)
                        .fill(NumoColor.secondarySurface)
                        .frame(height: 8)
                    
                    RoundedRectangle(cornerRadius: 6, style: .continuous)
                        .fill(NumoColor.accent)
                        .frame(width: max(8, geometry.size.width * CGFloat(percentage)), height: 8)
                }
            }
            .frame(height: 8)
        }
        .padding(.vertical, 4)
    }
}
