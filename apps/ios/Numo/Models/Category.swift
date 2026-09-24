import Foundation
import SwiftData

@Model
final class Category {
    @Attribute(.unique) var id: UUID
    var userId: UUID?
    var name: String
    var icon: String
    var isDefault: Bool
    var createdAt: Date
    
    @Relationship(deleteRule: .nullify, inverse: \Expense.category)
    var expenses: [Expense]? = []
    
    init(
        id: UUID = UUID(),
        userId: UUID? = nil,
        name: String,
        icon: String,
        isDefault: Bool = false,
        createdAt: Date = Date()
    ) {
        self.id = id
        self.userId = userId
        self.name = name
        self.icon = icon
        self.isDefault = isDefault
        self.createdAt = createdAt
    }
    
    static let defaults: [(name: String, icon: String)] = [
        ("Food", "fork.knife"),
        ("Transport", "car.fill"),
        ("Shopping", "bag.fill"),
        ("Bills", "doc.text.fill"),
        ("Entertainment", "tv.fill"),
        ("Health", "cross.case.fill"),
        ("Other", "ellipsis.circle.fill")
    ]
}
