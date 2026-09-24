import SwiftUI
import WidgetKit

struct NumoWidget: Widget {
    let kind: String = "NumoBudgetWidget"

    var body: some WidgetConfiguration {
        StaticConfiguration(kind: kind, provider: NumoTimelineProvider()) { entry in
            BudgetWidgetEntryView(entry: entry)
        }
        .configurationDisplayName("Budget Awareness")
        .description("Track your remaining monthly budget and daily allowance.")
        .supportedFamilies([.systemSmall, .systemMedium, .accessoryRectangular, .accessoryInline])
    }
}

struct NumoTimelineProvider: TimelineProvider {
    func placeholder(in context: Context) -> BudgetWidgetEntry {
        BudgetWidgetEntry(
            date: Date(),
            remainingBudget: 1240.0,
            spentToday: 32.0,
            leftToday: 29.5,
            currency: "DT"
        )
    }

    func getSnapshot(in context: Context, completion: @escaping (BudgetWidgetEntry) -> Void) {
        let entry = BudgetWidgetEntry(
            date: Date(),
            remainingBudget: 1240.0,
            spentToday: 32.0,
            leftToday: 29.5,
            currency: "DT"
        )
        completion(entry)
    }

    func getTimeline(in context: Context, completion: @escaping (Timeline<BudgetWidgetEntry>) -> Void) {
        let currentDate = Date()
        let entry = BudgetWidgetEntry(
            date: currentDate,
            remainingBudget: 1240.0,
            spentToday: 32.0,
            leftToday: 29.5,
            currency: "DT"
        )
        let nextUpdate = Calendar.current.date(byAdding: .minute, value: 30, to: currentDate)!
        let timeline = Timeline(entries: [entry], policy: .after(nextUpdate))
        completion(timeline)
    }
}

@main
struct NumoWidgetBundle: WidgetBundle {
    var body: some Widget {
        NumoWidget()
        NumoLiveActivity()
    }
}
