import type { Metadata } from "next";

import Footer from "@/components/common/footer";
import Header from "@/components/common/header";

export const metadata: Metadata = {
  title: "Portfolio Lafaeth Claudio",
  description: "Portfolio de Design, Ilustrador e Quadrinista",
};

export default function PageBasicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="flex flex-col flex-1">{children}</main>
      <Footer />
    </>
  );
}
