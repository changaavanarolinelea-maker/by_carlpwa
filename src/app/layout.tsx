import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { BottomNav } from "@/components/layout/BottomNav";
import { AppDataProvider } from "@/context/AppDataContext";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "By_Carl",
  description: "Carnet financier personnel et business de Carl",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-sans antialiased bg-cream text-espresso min-h-screen">
        <AppDataProvider>
          <main className="pb-28">{children}</main>
          <BottomNav />
        </AppDataProvider>
      </body>
    </html>
  );
}
