import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { BottomNav } from "@/components/layout/BottomNav";
import { Sidebar } from "@/components/layout/Sidebar";
import { RegisterServiceWorker } from "@/components/layout/RegisterServiceWorker";
import { AppDataProvider } from "@/context/AppDataContext";
import { SplashScreen } from "@/components/layout/SplashScreen";
import "./globals.css";
import { PageTransition } from "@/components/layout/PageTransition";
import { ToastProvider } from "@/context/ToastContext";
import { ProfilFloatingButton } from "@/components/layout/ProfilFloatingButton";

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
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon-32.png",
    apple: "/apple-touch-icon.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "By_Carl",
  },
};

export const viewport: Viewport = {
  themeColor: "#B86648",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-sans antialiased bg-cream text-espresso min-h-screen">
       <ToastProvider>
        <AppDataProvider>
          <SplashScreen />
          <RegisterServiceWorker />
          <Sidebar />
          <ProfilFloatingButton />
          <main className="w-full pb-28 md:pb-12 md:pl-64 pt-[72px]">
            <PageTransition>{children}</PageTransition>
          </main>
          <BottomNav />
        </AppDataProvider>
       </ToastProvider>
      </body>
    </html>
  );
}
