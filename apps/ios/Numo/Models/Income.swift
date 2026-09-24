import Foundation
import SwiftData

@Model
final class Income {
    @Attribute(.unique) var id: UUID
    var userId: UUID?
    var amount: Double
    var source: String? // "Salary", "Freelance", "Other"
    var receivedAt: Date
    var createdAt: Date
    
    init(
        id: UUID = UUID(),
        userId: UUID? = nil,
        amount: Double,
        source: String? = nil,
        receivedAt: Date = Date(),
        createdAt: Date = Date()
    ) {
        self.id = id
        self.userId = userId
        self.amount = amount
        self.source = source
        self.receivedAt = receivedAt
        self.createdAt = createdAt
    }
}
