import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Galeria de projetos",
  description:
    "Página de galeria para o Portfolio do Design, Ilustrador e Quadrinista Lafaeth Claudio",
};

export default async function GalleryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main id="gallery-container" className="relative flex flex-col flex-1 ">
      {children}
    </main>
  );
}
