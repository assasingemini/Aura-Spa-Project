import type { Metadata } from "next";
import "../styles/index.css";
import { Navbar, Footer } from "@/components/layout/PublicLayout";

export const metadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://lamdep.vercel.app"),
    title: {
        default: "LamDep - Dịch Vụ Làm Đẹp Chuyên Nghiệp",
        template: "%s | LamDep",
    },
    description:
        "LamDep cung cấp dịch vụ làm đẹp chuyên nghiệp hàng đầu. Đặt lịch hẹn ngay hôm nay để trải nghiệm dịch vụ chất lượng cao.",
    keywords: ["làm đẹp", "spa", "chăm sóc da", "dịch vụ làm đẹp", "beauty", "booking"],
    authors: [{ name: "LamDep Team" }],
    openGraph: {
        type: "website",
        locale: "vi_VN",
        siteName: "LamDep",
        title: "LamDep - Dịch Vụ Làm Đẹp Chuyên Nghiệp",
        description:
            "LamDep cung cấp dịch vụ làm đẹp chuyên nghiệp hàng đầu. Đặt lịch hẹn ngay.",
    },
    twitter: {
        card: "summary_large_image",
        title: "LamDep - Dịch Vụ Làm Đẹp Chuyên Nghiệp",
        description:
            "LamDep cung cấp dịch vụ làm đẹp chuyên nghiệp hàng đầu. Đặt lịch hẹn ngay.",
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="vi">
            <head>
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body style={{ fontFamily: "'Inter', sans-serif" }} className="min-h-screen bg-gradient-to-br from-[#FFD6BE]/30 via-white to-[#FEAEA7]/20 text-gray-900">
                <Navbar />
                <main>{children}</main>
                <Footer />
            </body>
        </html>
    );
}
