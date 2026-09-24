import SwiftUI
import SwiftData

struct ExportSheet: View {
    @Environment(\.dismiss) private var dismiss
    let expenses: [Expense]
    
    @State private var exportFormat: ExportFormat = .csv
    @State private var shareURL: URL? = nil
    @State private var isSharing: Bool = false
    
    enum ExportFormat: String, CaseIterable, Identifiable {
        case csv = "CSV"
        case json = "JSON"
        var id: String { rawValue }
    }
    
    var body: some View {
        NavigationStack {
            VStack(spacing: 20) {
                Picker("Format", selection: $exportFormat) {
                    ForEach(ExportFormat.allCases) { format in
                        Text(format.rawValue).tag(format)
                    }
                }
                .pickerStyle(.segmented)
                .padding(.horizontal, 20)
                .padding(.top, 10)
                
                VStack(alignment: .leading, spacing: 12) {
                    Text("Export Summary")
                        .font(NumoTypography.sectionHeading())
                        .foregroundColor(NumoColor.primaryText)
                    
                    Text("\(expenses.count) recorded transactions will be exported.")
                        .font(NumoTypography.primaryBody())
                        .foregroundColor(NumoColor.secondaryText)
                }
                .frame(maxWidth: .infinity, alignment: .leading)
                .numoCard()
                .padding(.horizontal, 20)
                
                Spacer()
                
                Button(action: prepareExport) {
                    Text("Export file")
                        .font(NumoTypography.primaryBody().weight(.semibold))
                        .foregroundColor(.white)
                        .frame(maxWidth: .infinity, minHeight: 50)
                        .background(NumoColor.accent)
                        .clipShape(RoundedRectangle(cornerRadius: NumoRadius.button, style: .continuous))
                }
                .padding(.horizontal, 20)
                .padding(.bottom, 20)
            }
            .navigationTitle("Export Data")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .topBarTrailing) {
                    Button("Done") { dismiss() }
                }
            }
            .sheet(isPresented: $isSharing) {
                if let url = shareURL {
                    ShareSheetView(activityItems: [url])
                }
            }
        }
        .presentationDetents([.medium])
        .presentationCornerRadius(NumoRadius.card)
    }
    
    private func prepareExport() {
        let tempDir = FileManager.default.temporaryDirectory
        if exportFormat == .csv {
            let csvString = ExportService.generateCSV(from: expenses)
            let fileURL = tempDir.appendingPathComponent("numo_expenses_\(dateStamp()).csv")
            try? csvString.write(to: fileURL, atomically: true, encoding: .utf8)
            shareURL = fileURL
            isSharing = true
        } else {
            if let jsonData = ExportService.generateJSON(from: expenses) {
                let fileURL = tempDir.appendingPathComponent("numo_expenses_\(dateStamp()).json")
                try? jsonData.write(to: fileURL)
                shareURL = fileURL
                isSharing = true
            }
        }
    }
    
    private func dateStamp() -> String {
        let formatter = DateFormatter()
        formatter.dateFormat = "yyyyMMdd"
        return formatter.string(from: Date())
    }
}

struct ShareSheetView: UIViewControllerRepresentable {
    let activityItems: [Any]
    
    func makeUIViewController(context: Context) -> UIActivityViewController {
        UIActivityViewController(activityItems: activityItems, applicationActivities: nil)
    }
    
    func updateUIViewController(_ uiViewController: UIActivityViewController, context: Context) {}
}
