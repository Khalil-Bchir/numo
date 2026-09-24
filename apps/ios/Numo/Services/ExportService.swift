import Foundation

enum ExportService {
    static func generateCSV(from expenses: [Expense]) -> String {
        var csv = "date,amount,category,note\n"
        let formatter = DateFormatter()
        formatter.dateFormat = "yyyy-MM-dd"
        
        for expense in expenses.sorted(by: { $0.spentAt > $1.spentAt }) {
            let dateStr = formatter.string(from: expense.spentAt)
            let categoryName = expense.category?.name ?? "Other"
            let note = (expense.note ?? "").replacingOccurrences(of: "\"", with: "\"\"")
            let formattedAmount = String(format: "%.3f", expense.amount)
            csv += "\(dateStr),\(formattedAmount),\(categoryName),\"\(note)\"\n"
        }
        return csv
    }
    
    static func generateJSON(from expenses: [Expense]) -> Data? {
        let formatter = ISO8601DateFormatter()
        let items: [[String: Any]] = expenses.map { exp in
            [
                "id": exp.id.uuidString,
                "amount": exp.amount,
                "category": exp.category?.name ?? "Other",
                "note": exp.note ?? "",
                "date": formatter.string(from: exp.spentAt)
            ]
        }
        return try? JSONSerialization.data(withJSONObject: items, options: [.prettyPrinted])
    }
}
