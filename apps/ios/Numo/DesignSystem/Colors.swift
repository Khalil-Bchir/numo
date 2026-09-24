import SwiftUI

extension Color {
    init(hex: String) {
        let hex = hex.trimmingCharacters(in: CharacterSet.alphanumerics.inverted)
        var int: UInt64 = 0
        Scanner(string: hex).scanHexInt64(&int)
        let a, r, g, b: UInt64
        switch hex.count {
        case 3: // RGB (12-bit)
            (a, r, g, b) = (255, (int >> 8) * 17, (int >> 4 & 0xF) * 17, (int & 0xF) * 17)
        case 6: // RGB (24-bit)
            (a, r, g, b) = (255, int >> 16, int >> 8 & 0xFF, int & 0xFF)
        case 8: // ARGB (32-bit)
            (a, r, g, b) = (int >> 24, int >> 16 & 0xFF, int >> 8 & 0xFF, int & 0xFF)
        default:
            (a, r, g, b) = (1, 1, 1, 0)
        }
        self.init(
            .sRGB,
            red: Double(r) / 255,
            green: Double(g) / 255,
            blue: Double(b) / 255,
            opacity: Double(a) / 255
        )
    }
}

enum NumoColor {
    // Dynamic Colors conforming to Numo Product Specification
    static let background = Color(UIColor { trait in
        trait.userInterfaceStyle == .dark ? UIColor(hex: "000000") : UIColor(hex: "F5F5F7")
    })
    
    static let primarySurface = Color(UIColor { trait in
        trait.userInterfaceStyle == .dark ? UIColor(hex: "1C1C1E") : UIColor(hex: "FFFFFF")
    })
    
    static let secondarySurface = Color(UIColor { trait in
        trait.userInterfaceStyle == .dark ? UIColor(hex: "2C2C2E") : UIColor(hex: "E8E8EA")
    })
    
    static let primaryText = Color(UIColor { trait in
        trait.userInterfaceStyle == .dark ? UIColor(hex: "FFFFFF") : UIColor(hex: "111111")
    })
    
    static let secondaryText = Color(UIColor { trait in
        trait.userInterfaceStyle == .dark ? UIColor(hex: "98989D") : UIColor(hex: "707070")
    })
    
    static let mutedText = Color(UIColor { trait in
        trait.userInterfaceStyle == .dark ? UIColor(hex: "636366") : UIColor(hex: "A0A0A5")
    })
    
    static let divider = Color(UIColor { trait in
        trait.userInterfaceStyle == .dark ? UIColor(hex: "2C2C2E") : UIColor(hex: "E8E8EA")
    })
    
    static let accent = Color(UIColor { trait in
        trait.userInterfaceStyle == .dark ? UIColor(hex: "6F82FF") : UIColor(hex: "4F6BFF")
    })
    
    static let success = Color(UIColor { trait in
        trait.userInterfaceStyle == .dark ? UIColor(hex: "30D158") : UIColor(hex: "34C759")
    })
    
    static let destructive = Color(UIColor { trait in
        trait.userInterfaceStyle == .dark ? UIColor(hex: "FF453A") : UIColor(hex: "FF3B30")
    })
}

extension UIColor {
    convenience init(hex: String) {
        let hex = hex.trimmingCharacters(in: CharacterSet.alphanumerics.inverted)
        var int: UInt64 = 0
        Scanner(string: hex).scanHexInt64(&int)
        let a, r, g, b: UInt64
        switch hex.count {
        case 3:
            (a, r, g, b) = (255, (int >> 8) * 17, (int >> 4 & 0xF) * 17, (int & 0xF) * 17)
        case 6:
            (a, r, g, b) = (255, int >> 16, int >> 8 & 0xFF, int & 0xFF)
        case 8:
            (a, r, g, b) = (int >> 24, int >> 16 & 0xFF, int >> 8 & 0xFF, int & 0xFF)
        default:
            (a, r, g, b) = (255, 0, 0, 0)
        }
        self.init(
            red: CGFloat(r) / 255,
            green: CGFloat(g) / 255,
            blue: CGFloat(b) / 255,
            alpha: CGFloat(a) / 255
        )
    }
}
