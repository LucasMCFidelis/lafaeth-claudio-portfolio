"use client";

import { ArrowBigLeft, ArrowBigRight, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { parseAsBoolean, parseAsString, useQueryStates } from "nuqs";
import { useEffect, useRef } from "react";

import { Button } from "@/components/ui/button";
import getPreferenceTheme from "@/helpers/get-theme-preference";
import { cn } from "@/lib/utils";

import ExpandFullSizeButton from "../expand-full-size-button";
import { GalleryBasicType } from "./gallery-basic-type";

interface GalleryRootListProps {
  itemsList: Array<GalleryBasicType>;
  hrefBackToClose?: string;
}

/** Horizontal distance (px) a swipe must travel to change the image. */
const SWIPE_THRESHOLD = 50;

const GalleryRootList = ({
  itemsList,
  hrefBackToClose = "/",
}: GalleryRootListProps) => {
  const router = useRouter();
  const isDarkTheme = getPreferenceTheme();
  const [{ id, "full-screen": isFullscreen }, setValues] = useQueryStates({
    id: parseAsString,
    "full-screen": parseAsBoolean,
  });
  const swipeStartX = useRef<number | null>(null);

  // Without a valid ?id= (old link, removed item) start at the first image.
  const foundIndex = itemsList.findIndex((img) => img.id === id);
  const currentIndex = foundIndex === -1 ? 0 : foundIndex;
  const lastIndex = itemsList.length - 1;
  const item = itemsList[currentIndex];

  const goToItem = (newIndex: number) => {
    const target = itemsList[newIndex];
    if (target) setValues({ id: target.id });
  };
  const goPrev = () => goToItem(currentIndex > 0 ? currentIndex - 1 : lastIndex);
  const goNext = () => goToItem(currentIndex < lastIndex ? currentIndex + 1 : 0);

  // Keep the latest handlers for the window listener without re-subscribing.
  const keyHandlers = useRef({ goPrev, goNext });
  useEffect(() => {
    keyHandlers.current = { goPrev, goNext };
  });

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("input, textarea, [contenteditable]")) return;
      if (e.key === "ArrowLeft") keyHandlers.current.goPrev();
      if (e.key === "ArrowRight") keyHandlers.current.goNext();
      // In fullscreen the browser uses Esc to leave it; close only otherwise.
      if (e.key === "Escape" && !document.fullscreenElement) {
        router.push(hrefBackToClose);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [router, hrefBackToClose]);

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse") return;
    swipeStartX.current = e.clientX;
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (swipeStartX.current === null) return;
    const deltaX = e.clientX - swipeStartX.current;
    swipeStartX.current = null;
    if (deltaX > SWIPE_THRESHOLD) goPrev();
    if (deltaX < -SWIPE_THRESHOLD) goNext();
  };

  if (!item) {
    return <p className="m-auto">Nenhuma imagem para exibir</p>;
  }

  return (
    <>
      <div className="absolute w-full flex justify-between z-10 px-5 pt-5">
        <ExpandFullSizeButton aria-label="Tela cheia" />
        <Button size="icon" asChild>
          <Link href={hrefBackToClose} aria-label="Fechar galeria">
            <X />
          </Link>
        </Button>
      </div>
      <div className="flex flex-col flex-1 p-5 w-full sm:grid sm:grid-cols-[1fr_25%] gap-5 md:gap-10">
        <div
          className="flex-1 relative min-h-[60svh] sm:min-h-0 touch-pan-y"
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerCancel={() => (swipeStartX.current = null)}
        >
          {item.imageUrl && (
            <Image
              src={item.imageUrl}
              alt={item.title}
              fill
              sizes="(max-width: 640px) 100vw, 75vw"
              loading="eager"
              fetchPriority="high"
              draggable={false}
              className="object-contain select-none"
            />
          )}
        </div>
        <div
          className={cn(
            "font-sans flex flex-col justify-between sm:mt-10 min-w-0 wrap-anywhere",
            isFullscreen && !isDarkTheme && "text-white"
          )}
        >
          <div className="flex-1">
            <h2 className="font-extrabold text-xl md:text-3xl first-letter:uppercase">
              {item.title}
            </h2>
            <div className="text-xs lg:text-sm">
              <p className="first-letter:uppercase">{item.description}</p>
              {item.screenwriter && <p>Roteiro: {item.screenwriter}</p>}
              {item.colorist && <p>Cor: {item.colorist}</p>}

              {item.productionYear && <p>Ano: {item.productionYear}</p>}
              {item.productionSizePages && (
                <p>Tamanho: {item.productionSizePages} páginas</p>
              )}
              {item.observations && <p>{item.observations}</p>}
              {item.redirectUrl && (
                <Link href={item.redirectUrl}>{item.redirectUrl}</Link>
              )}
            </div>
          </div>

          <div className="flex w-full justify-between items-center mb-2">
            <Button size="icon" onClick={goPrev} aria-label="Imagem anterior">
              <ArrowBigLeft />
            </Button>
            <p className="text-xs text-muted-foreground" aria-live="polite">
              {currentIndex + 1} / {itemsList.length}
            </p>
            <Button size="icon" onClick={goNext} aria-label="Próxima imagem">
              <ArrowBigRight />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default GalleryRootList;
