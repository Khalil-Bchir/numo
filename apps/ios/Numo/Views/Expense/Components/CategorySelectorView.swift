import SwiftUI

struct CategorySelectorView: View {
    let categories: [Category]
    @Binding var selectedCategory: Category?
    
    var body: some View {
        ScrollView(.horizontal, showsIndicators: false) {
            HStack(spacing: 10) {
                ForEach(categories) { category in
                    categoryPill(category)
                }
            }
            .padding(.horizontal, 4)
        }
    }
    
    private func categoryPill(_ category: Category) -> some View {
        let isSelected = selectedCategory?.id == category.id
        return Button(action: {
            HapticService.selection()
            selectedCategory = category
        }) {
            HStack(spacing: 6) {
                Image(systemName: category.icon)
                    .font(.system(size: 14, weight: .medium))
                Text(category.name)
                    .font(NumoTypography.secondaryBody().weight(isSelected ? .semibold : .regular))
            }
            .foregroundColor(isSelected ? .white : NumoColor.primaryText)
            .padding(.horizontal, 16)
            .padding(.vertical, 10)
            .background(isSelected ? NumoColor.accent : NumoColor.secondarySurface.opacity(0.8))
            .clipShape(RoundedRectangle(cornerRadius: NumoRadius.control, style: .continuous))
        }
    }
}
