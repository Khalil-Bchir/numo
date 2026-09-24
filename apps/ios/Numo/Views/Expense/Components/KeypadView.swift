import SwiftUI

struct KeypadView: View {
    @Binding var amountText: String
    var onSave: () -> Void
    
    private let rows = [
        ["1", "2", "3"],
        ["4", "5", "6"],
        ["7", "8", "9"],
        [".", "0", "⌫"]
    ]
    
    var body: some View {
        VStack(spacing: 12) {
            ForEach(rows, id: \.self) { row in
                HStack(spacing: 12) {
                    ForEach(row, id: \.self) { key in
                        keypadButton(key)
                    }
                }
            }
        }
    }
    
    private func keypadButton(_ key: String) -> some View {
        Button(action: {
            HapticService.selection()
            handleKeyPress(key)
        }) {
            Text(key)
                .font(.system(size: 24, weight: .medium, design: .rounded))
                .foregroundColor(NumoColor.primaryText)
                .frame(maxWidth: .infinity, minHeight: 56)
                .background(NumoColor.secondarySurface.opacity(0.6))
                .clipShape(RoundedRectangle(cornerRadius: NumoRadius.button, style: .continuous))
        }
    }
    
    private func handleKeyPress(_ key: String) {
        if key == "⌫" {
            if !amountText.isEmpty {
                amountText.removeLast()
            }
        } else if key == "." {
            if !amountText.contains(".") {
                amountText += amountText.isEmpty ? "0." : "."
            }
        } else {
            // Maximum reasonable decimal places for TND (3 digits)
            if let dotIndex = amountText.firstIndex(of: ".") {
                let decimals = amountText.distance(from: dotIndex, to: amountText.endIndex) - 1
                if decimals >= 3 { return }
            }
            if amountText == "0" && key != "." {
                amountText = key
            } else {
                amountText += key
            }
        }
    }
}
