import SwiftUI
import SwiftData

struct OnboardingView: View {
    @Environment(\.modelContext) private var modelContext
    var onComplete: () -> Void
    
    @State private var currentStep: Int = 1
    @State private var budgetAmount: String = "1500"
    @State private var resetDay: Int = 1
    
    var body: some View {
        VStack {
            Spacer()
            
            switch currentStep {
            case 1:
                stepOneView
            case 2:
                stepTwoView
            case 3:
                stepThreeView
            case 4:
                stepFourView
            default:
                EmptyView()
            }
            
            Spacer()
            
            bottomButton
        }
        .padding(.horizontal, 24)
        .padding(.bottom, 24)
        .background(NumoColor.background.ignoresSafeArea())
    }
    
    // Step 1: Welcome
    private var stepOneView: some View {
        VStack(spacing: 12) {
            Image(systemName: "wallet.pass.fill")
                .font(.system(size: 64))
                .foregroundColor(NumoColor.accent)
                .padding(.bottom, 12)
            
            Text("Your money.\nMade simple.")
                .font(NumoTypography.primaryHeading())
                .foregroundColor(NumoColor.primaryText)
                .multilineTextAlignment(.center)
            
            Text("Track your spending without the spreadsheets.")
                .font(NumoTypography.secondaryBody())
                .foregroundColor(NumoColor.secondaryText)
                .multilineTextAlignment(.center)
        }
    }
    
    // Step 2: Monthly Budget
    private var stepTwoView: some View {
        VStack(spacing: 16) {
            Text("How much do you want to manage each month?")
                .font(NumoTypography.sectionHeading())
                .foregroundColor(NumoColor.primaryText)
                .multilineTextAlignment(.center)
            
            HStack(alignment: .firstTextBaseline, spacing: 4) {
                TextField("1500", text: $budgetAmount)
                    .font(NumoTypography.largeAmount())
                    .keyboardType(.numberPad)
                    .multilineTextAlignment(.center)
                    .frame(maxWidth: 180)
                
                Text("DT")
                    .font(NumoTypography.sectionHeading())
                    .foregroundColor(NumoColor.secondaryText)
            }
            .padding()
            .background(NumoColor.primarySurface)
            .clipShape(RoundedRectangle(cornerRadius: NumoRadius.card, style: .continuous))
        }
    }
    
    // Step 3: Reset Date
    private var stepThreeView: some View {
        VStack(spacing: 20) {
            Text("When should your budget reset?")
                .font(NumoTypography.sectionHeading())
                .foregroundColor(NumoColor.primaryText)
                .multilineTextAlignment(.center)
            
            VStack(spacing: 12) {
                resetOptionButton(title: "1st of every month", day: 1)
                resetOptionButton(title: "15th of every month", day: 15)
            }
        }
    }
    
    private func resetOptionButton(title: String, day: Int) -> some View {
        let isSelected = resetDay == day
        return Button(action: {
            HapticService.selection()
            resetDay = day
        }) {
            HStack {
                Text(title)
                    .font(NumoTypography.primaryBody().weight(.medium))
                Spacer()
                if isSelected {
                    Image(systemName: "checkmark.circle.fill")
                        .foregroundColor(NumoColor.accent)
                }
            }
            .foregroundColor(NumoColor.primaryText)
            .padding()
            .background(NumoColor.primarySurface)
            .clipShape(RoundedRectangle(cornerRadius: NumoRadius.card, style: .continuous))
            .overlay(
                RoundedRectangle(cornerRadius: NumoRadius.card)
                    .stroke(isSelected ? NumoColor.accent : Color.clear, lineWidth: 2)
            )
        }
    }
    
    // Step 4: Finish
    private var stepFourView: some View {
        VStack(spacing: 12) {
            Image(systemName: "checkmark.seal.fill")
                .font(.system(size: 64))
                .foregroundColor(NumoColor.success)
                .padding(.bottom, 12)
            
            Text("You're ready.")
                .font(NumoTypography.primaryHeading())
                .foregroundColor(NumoColor.primaryText)
            
            Text("Record spending in seconds. Understand your money at a glance.")
                .font(NumoTypography.secondaryBody())
                .foregroundColor(NumoColor.secondaryText)
                .multilineTextAlignment(.center)
        }
    }
    
    private var bottomButton: some View {
        Button(action: handleNext) {
            Text(currentStep == 1 ? "Get started" : (currentStep == 4 ? "Start budgeting" : "Next"))
                .font(NumoTypography.primaryBody().weight(.semibold))
                .foregroundColor(.white)
                .frame(maxWidth: .infinity, minHeight: 52)
                .background(NumoColor.accent)
                .clipShape(RoundedRectangle(cornerRadius: NumoRadius.button, style: .continuous))
        }
    }
    
    private func handleNext() {
        HapticService.selection()
        if currentStep < 4 {
            withAnimation(.spring(response: 0.3, dampingFraction: 0.8)) {
                currentStep += 1
            }
        } else {
            // Save Budget & Complete
            let amount = Double(budgetAmount) ?? 1500.0
            let budget = Budget(amount: amount, resetDay: resetDay)
            modelContext.insert(budget)
            try? modelContext.save()
            
            onComplete()
        }
    }
}
