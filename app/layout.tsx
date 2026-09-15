import type { Metadata, Viewport } from "next";
import { Vazirmatn } from "next/font/google";
import { brand } from "@/lib/menu";
import "./globals.css";

const vazir = Vazirmatn({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "700", "800", "900"],
  variable: "--font-vazir",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: brand.fullName,
  description: `منوی کافه ${brand.name} — شعبه فرشته`,
  robots: "index,follow",
  openGraph: {
    locale: "fa_IR",
    type: "website",
    siteName: brand.name,
    title: brand.fullName,
    description: `منوی کافه ${brand.name}`,
    url: siteUrl,
  },
  twitter: {
    title: brand.fullName,
    description: `منوی کافه ${brand.name}`,
  },
  icons: {
    icon: "/ui/icon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" className={vazir.variable}>
      <body className={vazir.className}>{children}</body>
    </html>
  );
}
