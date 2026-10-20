import "./globals.css";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Toaster } from "sonner";

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

// Applies the saved (or system) theme before the first paint, so dark mode
// does not flash light while React loads. Same rule as getPreferenceTheme().
const themeScript = `try{var s=localStorage.getItem("darkTheme");var d=s!==null?s==="true":matchMedia("(prefers-color-scheme: dark)").matches;document.documentElement.classList.toggle("dark",d)}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // The theme script changes the class before hydration.
    <html lang="pt" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col justify-start`}
      >
        <ReactQueryProvider>
          <NuqsAdapter>
            {children}
            <Toaster />
          </NuqsAdapter>
        </ReactQueryProvider>
        {/* beforeInteractive puts it in the initial HTML, ahead of React. A
            plain <script> element warns when React renders it on the client. */}
        <Script id="theme" strategy="beforeInteractive">
          {themeScript}
        </Script>
      </body>
    </html>
  );
}
