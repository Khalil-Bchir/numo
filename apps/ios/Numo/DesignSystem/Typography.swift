import SwiftUI

enum NumoTypography {
    /// Large Financial Value (32-44 pt, heavy/bold, rounded)
    static func largeAmount() -> Font {
        .system(size: 38, weight: .bold, design: .rounded)
    }
    
    /// Primary Heading (28-34 pt)
    static func primaryHeading() -> Font {
        .system(size: 28, weight: .bold, design: .default)
    }
    
    /// Section Heading (20-24 pt)
    static func sectionHeading() -> Font {
        .system(size: 22, weight: .semibold, design: .default)
    }
    
    /// Primary Body (16-17 pt)
    static func primaryBody() -> Font {
        .system(size: 16, weight: .regular, design: .default)
    }
    
    /// Secondary Body (14-15 pt)
    static func secondaryBody() -> Font {
        .system(size: 14, weight: .regular, design: .default)
    }
    
    /// Caption (12-13 pt)
    static func caption() -> Font {
        .system(size: 12, weight: .medium, design: .default)
    }
}
