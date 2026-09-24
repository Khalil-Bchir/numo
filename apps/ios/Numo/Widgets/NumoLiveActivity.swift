import ActivityKit
import SwiftUI
import WidgetKit

struct NumoBudgetAttributes: ActivityAttributes {
    public struct ContentState: Codable, Hashable {
        var spentToday: Double
        var leftToday: Double
        var currency: String
    }
}

struct NumoLiveActivity: Widget {
    var body: some WidgetConfiguration {
        ActivityConfiguration(for: NumoBudgetAttributes.self) { context in
            // Lock screen / banner presentation
            HStack {
                VStack(alignment: .leading, spacing: 2) {
                    Text("Today's Budget")
                        .font(.system(size: 13, weight: .semibold))
                        .foregroundColor(NumoColor.secondaryText)
                    Text("\(String(format: "%.1f", context.state.leftToday)) \(context.state.currency) left")
                        .font(.system(size: 18, weight: .bold, design: .rounded))
                        .foregroundColor(NumoColor.primaryText)
                }
                Spacer()
                Text("Spent: \(String(format: "%.1f", context.state.spentToday)) \(context.state.currency)")
                    .font(.system(size: 13))
                    .foregroundColor(NumoColor.secondaryText)
            }
            .padding()
            .activityBackgroundTint(Color.black.opacity(0.8))
        } dynamicIsland: { context in
            // Dynamic Island presentation (Spec 27 & 54)
            DynamicIsland {
                DynamicIslandExpandedRegion(.leading) {
                    VStack(alignment: .leading) {
                        Text("Spent")
                            .font(.caption2)
                            .foregroundColor(.secondary)
                        Text("\(String(format: "%.1f", context.state.spentToday)) \(context.state.currency)")
                            .font(.system(.subheadline, design: .rounded).weight(.semibold))
                    }
                }
                DynamicIslandExpandedRegion(.trailing) {
                    VStack(alignment: .trailing) {
                        Text("Remaining")
                            .font(.caption2)
                            .foregroundColor(.secondary)
                        Text("\(String(format: "%.1f", context.state.leftToday)) \(context.state.currency)")
                            .font(.system(.subheadline, design: .rounded).weight(.semibold))
                            .foregroundColor(NumoColor.accent)
                    }
                }
                DynamicIslandExpandedRegion(.bottom) {
                    Text("Numo Budget Awareness")
                        .font(.caption2)
                        .foregroundColor(.secondary)
                }
            } compactLeading: {
                Image(systemName: "wallet.pass.fill")
                    .foregroundColor(NumoColor.accent)
            } compactTrailing: {
                Text("\(String(format: "%.0f", context.state.leftToday)) \(context.state.currency)")
                    .font(.system(size: 12, weight: .semibold, design: .rounded))
            } minimal: {
                Image(systemName: "wallet.pass.fill")
                    .foregroundColor(NumoColor.accent)
            }
        }
    }
}
