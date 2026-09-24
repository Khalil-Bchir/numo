import SwiftUI
import WidgetKit

struct BudgetWidgetEntry: TimelineEntry {
    let date: Date
    let remainingBudget: Double
    let spentToday: Double
    let leftToday: Double
    let currency: String
}

struct BudgetWidgetEntryView: View {
    var entry: BudgetWidgetEntry
    @Environment(\.widgetFamily) var family

    var body: some View {
        switch family {
        case .systemSmall:
            smallWidgetView
        case .systemMedium:
            mediumWidgetView
        case .accessoryCircular, .accessoryRectangular, .accessoryInline:
            lockScreenWidgetView
        default:
            smallWidgetView
        }
    }

    // Small Home Screen Widget (Spec 29)
    private var smallWidgetView: some View {
        VStack(alignment: .leading, spacing: 6) {
            Text("NUMO")
                .font(.system(size: 11, weight: .bold))
                .foregroundColor(NumoColor.accent)
            
            Spacer()
            
            Text("\(String(format: "%.0f", entry.remainingBudget)) \(entry.currency)")
                .font(.system(size: 24, weight: .bold, design: .rounded))
                .foregroundColor(NumoColor.primaryText)
            
            Text("left this month")
                .font(.system(size: 12))
                .foregroundColor(NumoColor.secondaryText)
        }
        .padding(14)
        .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .leading)
        .background(NumoColor.primarySurface)
    }

    // Medium Home Screen Widget (Spec 29)
    private var mediumWidgetView: some View {
        VStack(alignment: .leading, spacing: 8) {
            HStack {
                Text("TODAY")
                    .font(.system(size: 12, weight: .bold))
                    .foregroundColor(NumoColor.secondaryText)
                Spacer()
                Text("\(String(format: "%.0f", entry.remainingBudget)) \(entry.currency) left this month")
                    .font(.system(size: 12))
                    .foregroundColor(NumoColor.mutedText)
            }
            
            HStack(spacing: 20) {
                VStack(alignment: .leading, spacing: 2) {
                    Text("\(String(format: "%.1f", entry.spentToday)) \(entry.currency)")
                        .font(.system(size: 20, weight: .bold, design: .rounded))
                        .foregroundColor(NumoColor.primaryText)
                    Text("Spent")
                        .font(.system(size: 11))
                        .foregroundColor(NumoColor.secondaryText)
                }
                
                VStack(alignment: .leading, spacing: 2) {
                    Text("\(String(format: "%.1f", entry.leftToday)) \(entry.currency)")
                        .font(.system(size: 20, weight: .bold, design: .rounded))
                        .foregroundColor(NumoColor.accent)
                    Text("Remaining")
                        .font(.system(size: 11))
                        .foregroundColor(NumoColor.secondaryText)
                }
                
                Spacer()
            }
            .padding(.top, 4)
        }
        .padding(16)
        .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .leading)
        .background(NumoColor.primarySurface)
    }

    // Lock Screen Widget (Spec 28)
    private var lockScreenWidgetView: some View {
        VStack(alignment: .leading, spacing: 2) {
            Text("\(String(format: "%.1f", entry.leftToday)) \(entry.currency)")
                .font(.system(size: 16, weight: .bold, design: .rounded))
            Text("left today")
                .font(.system(size: 10))
        }
    }
}
