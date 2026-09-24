import Foundation
import SwiftData

@Model
final class Expense {
    @Attribute(.unique) var id: UUID
    var userId: UUID?
    var amount: Double
    var note: String?
    var spentAt: Date
    var createdAt: Date
    var updatedAt: Date
    var syncStatus: String // "pending", "synced"
    
    var category: Category?
    
    init(
        id: UUID = UUID(),
        userId: UUID? = nil,
        amount: Double,
        category: Category? = nil,
        note: String? = nil,
        spentAt: Date = Date(),
        createdAt: Date = Date(),
        updatedAt: Date = Date(),
        syncStatus: String = "pending"
    ) {
        self.id = id
        self.userId = userId
        self.amount = amount
        self.category = category
        self.note = note
        self.spentAt = spentAt
        self.createdAt = createdAt
        self.updatedAt = updatedAt
        self.syncStatus = syncStatus
    }
}
