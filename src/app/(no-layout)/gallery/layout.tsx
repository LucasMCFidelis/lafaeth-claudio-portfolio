import type { Metadata } from "next";

import ExpandFullSizeButton from "./components/expand-full-size-button";

export const metadata: Metadata = {
  title: "Galeria de projetos",
  description:
    "Página de galeria para o Portfolio do Design, Ilustrador e Quadrinista Lafaeth Claudio",
};

export default function GalleryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main id="gallery-container" className="relative flex flex-col flex-1 ">
      <ExpandFullSizeButton />
      <div className="flex flex-col flex-1 p-5 w-full sm:grid sm:grid-cols-[1fr_25%] gap-5 md:gap-10">
        {children}
      </div>
    </main>
  );
}
