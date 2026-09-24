import Foundation
import SwiftData

@Model
final class User {
    @Attribute(.unique) var id: UUID
    var email: String
    var currency: String
    var timezone: String
    var createdAt: Date
    
    init(
        id: UUID = UUID(),
        email: String = "",
        currency: String = "TND",
        timezone: String = TimeZone.current.identifier,
        createdAt: Date = Date()
    ) {
        self.id = id
        self.email = email
        self.currency = currency
        self.timezone = timezone
        self.createdAt = createdAt
    }
}
