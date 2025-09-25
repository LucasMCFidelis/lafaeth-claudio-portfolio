import { X } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";

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
      <div className="absolute w-full flex justify-between z-10 px-5 pt-5">
        <ExpandFullSizeButton/>
        <Button
          size="icon"
          asChild
        >
          <Link href={"/"}>
            <X />
          </Link>
        </Button>
      </div>
      <div className="flex flex-col flex-1 p-5 w-full sm:grid sm:grid-cols-[1fr_25%] gap-5 md:gap-10">
        {children}
      </div>
    </main>
  );
}
