// app/layout.tsx
import type { Metadata } from "next";
import { Cormorant, Inter } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from "@/contexts/ThemeContext";
import ThemeToggle from "@/components/ThemeToggle";
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
    default: "Azurea — A Private Coastal Enclave in Seseh, Bali",
    template: "%s | Azurea",
  },
  description:
    "Azurea is a curated collection of luxury villas in Munggu, Bali. A private coastal enclave offering high-yield investment and timeless tropical living.",
  openGraph: {
    siteName: "Azurea",
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
      data-theme="navy"
      className={`${cormorant.variable} ${inter.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-cream text-brand-black relative">
        <ThemeProvider>
          <Navbar />
          <main className="flex-1 relative z-10">{children}</main>
          <Footer />
          <ThemeToggle />
        </ThemeProvider>
      </body>
    </html>
  );
}
