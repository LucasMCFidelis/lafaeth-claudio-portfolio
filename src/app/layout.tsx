import "./globals.css";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";

import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import { Toaster } from "@/components/ui/sonner";
import ReactQueryProvider from "@/providers/react-query";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portfolio Lafaeth Claudio",
  description: "Portfolio de Design, Ilustrador e Quadrinista",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col justify-start`}
      >
        <ReactQueryProvider>
          <NuqsAdapter>
            <Header />
            <main className="flex flex-col flex-1">
              {children}
              <Toaster />
            </main>
            <Footer />
          </NuqsAdapter>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
