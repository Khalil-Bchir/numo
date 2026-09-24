import Foundation
import SwiftData

@Model
final class Budget {
    @Attribute(.unique) var id: UUID
    var userId: UUID?
    var amount: Double
    var currency: String
    var resetDay: Int
    var createdAt: Date
    var updatedAt: Date
    
    init(
        id: UUID = UUID(),
        userId: UUID? = nil,
        amount: Double = 1500.0,
        currency: String = "TND",
        resetDay: Int = 1,
        createdAt: Date = Date(),
        updatedAt: Date = Date()
    ) {
        self.id = id
        self.userId = userId
        self.amount = amount
        self.currency = currency
        self.resetDay = resetDay
        self.createdAt = createdAt
        self.updatedAt = updatedAt
    }
}
