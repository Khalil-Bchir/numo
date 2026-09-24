import SwiftUI

enum NumoRadius {
    /// Large cards (24-28 pt)
    static let card: CGFloat = 26
    
    /// Interactive buttons (18-24 pt)
    static let button: CGFloat = 20
    
    /// Input fields (18-22 pt)
    static let input: CGFloat = 20
    
    /// Small controls & tags (14-18 pt)
    static let control: CGFloat = 16
    
    /// Floating navigation bar (24-28 pt)
    static let floatingNav: CGFloat = 26
}

struct NumoCardModifier: ViewModifier {
    var padding: CGFloat = 20
    
    func body(content: Content) -> some View {
        content
            .padding(padding)
            .background(NumoColor.primarySurface)
            .clipShape(RoundedRectangle(cornerRadius: NumoRadius.card, style: .continuous))
    }
}

extension View {
    func numoCard(padding: CGFloat = 20) -> some View {
        modifier(NumoCardModifier(padding: padding))
    }
}
