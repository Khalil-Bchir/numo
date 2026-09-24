// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "Numo",
    defaultLocalization: "en",
    platforms: [
        .iOS(.v17)
    ],
    products: [
        .library(
            name: "NumoKit",
            targets: ["NumoKit"]
        )
    ],
    dependencies: [
        .package(url: "https://github.com/supabase-community/supabase-swift.git", from: "2.5.0")
    ],
    targets: [
        .target(
            name: "NumoKit",
            dependencies: [
                .product(name: "Supabase", package: "supabase-swift")
            ],
            path: "Numo",
            exclude: [
                "Resources/Info.plist",
                "Preview Content"
            ]
        )
    ]
)
