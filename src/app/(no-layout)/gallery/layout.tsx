import { ExpandIcon } from "lucide-react";
import type { Metadata } from "next";

import { Button } from "@/components/ui/button";

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
    <main className="relative flex flex-col flex-1">
      <Button
        size="icon"
        className="absolute translate-5"
      >
        <ExpandIcon />
      </Button>
      <div className="flex flex-col flex-1 p-5 w-full sm:grid sm:grid-cols-[1fr_25%] gap-5 md:gap-10">{children}</div>
    </main>
  );
}
