// app/layout.tsx
import type { Metadata } from "next";
import { Cormorant, Inter } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const cormorant = Cormorant({
  variable: "--font-cormorant-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "The Villa V Collection — Bali, Indonesia",
    template: "%s | The Villa V Collection",
  },
  description:
    "A curated collection of three luxury villas in Bali, Indonesia. Exhale & discover your next escape.",
  openGraph: {
    siteName: "The Villa V Collection",
    locale: "en_AU",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-brand-black">
        <Navbar />
        {/* Removed pt-20 so it sits flush at the top! */}
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}