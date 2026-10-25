"use client";

import { ChevronLeft, ChevronRight, Download, Info, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { parseAsString, useQueryStates } from "nuqs";
import { useEffect, useRef, useState } from "react";

import ArtworkTransition from "@/components/common/artwork-transition";
import FadeImage from "@/components/common/fade-image";
import { Button } from "@/components/ui/button";
import { useIsFullscreen } from "@/hooks/use-is-fullscreen";
import { cn } from "@/lib/utils";

import ExpandFullSizeButton from "../expand-full-size-button";
import { GalleryBasicType } from "./gallery-basic-type";

interface GalleryRootListProps {
  itemsList: Array<GalleryBasicType>;
  hrefBackToClose?: string;
}

/** Horizontal distance (px) a swipe must travel to change the image. */
const SWIPE_THRESHOLD = 50;

const DETAILS_PANEL_ID = "gallery-details";

const GalleryRootList = ({
  itemsList,
  hrefBackToClose = "/",
}: GalleryRootListProps) => {
  const router = useRouter();
  const [{ id }, setValues] = useQueryStates({ id: parseAsString });
  const swipeStartX = useRef<number | null>(null);
  const isFullscreen = useIsFullscreen();

  // In fullscreen the image takes the whole screen and the details start
  // collapsed; they open over the image only when asked.
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [wasFullscreen, setWasFullscreen] = useState(isFullscreen);
  if (wasFullscreen !== isFullscreen) {
    setWasFullscreen(isFullscreen);
    setDetailsOpen(false);
  }
  const showDetails = !isFullscreen || detailsOpen;

  // Without a valid ?id= (old link, removed item) start at the first image.
  const foundIndex = itemsList.findIndex((img) => img.id === id);
  const currentIndex = foundIndex === -1 ? 0 : foundIndex;
  const lastIndex = itemsList.length - 1;
  const item = itemsList[currentIndex];

  const goToItem = (newIndex: number) => {
    const target = itemsList[newIndex];
    if (target) setValues({ id: target.id });
  };
  const goPrev = () =>
    goToItem(currentIndex > 0 ? currentIndex - 1 : lastIndex);
  const goNext = () =>
    goToItem(currentIndex < lastIndex ? currentIndex + 1 : 0);

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

  const counter = (
    <p className="text-xs text-muted-foreground" aria-live="polite">
      {currentIndex + 1} / {itemsList.length}
    </p>
  );

  return (
    <>
      <div className="absolute w-full flex justify-between z-10 px-5 pt-5">
        <ExpandFullSizeButton />
        <div className="flex gap-2">
          {item.originalUrl && (
            <Button size="icon" variant="overlay" asChild>
              {/* Plain link: the route answers with a file to save. */}
              <a
                href={`/api/download/${item.id}`}
                aria-label="Baixar original"
                title="Baixar original"
              >
                <Download />
              </a>
            </Button>
          )}
          {isFullscreen && (
            <Button
              size="icon"
              variant={detailsOpen ? "secondary" : "overlay"}
              onClick={() => setDetailsOpen((open) => !open)}
              aria-label={detailsOpen ? "Ocultar detalhes" : "Mostrar detalhes"}
              aria-expanded={detailsOpen}
              aria-controls={DETAILS_PANEL_ID}
            >
              <Info />
            </Button>
          )}
          <Button size="icon" variant="overlay" asChild>
            <Link href={hrefBackToClose} aria-label="Fechar galeria">
              <X />
            </Link>
          </Button>
        </div>
      </div>
      <div
        className={cn(
          "relative flex flex-col flex-1 w-full",
          !isFullscreen && "p-5 sm:grid sm:grid-cols-[1fr_25%] gap-5 md:gap-10"
        )}
      >
        {/* Same position in both modes, so the image is not remounted. */}
        <ArtworkTransition imageId={item.id}>
          <div
            className={cn(
              "touch-pan-y",
              isFullscreen
                ? "absolute inset-0"
                : "relative flex-1 min-h-[60svh] sm:min-h-0"
            )}
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            onPointerCancel={() => (swipeStartX.current = null)}
          >
            {item.imageUrl && (
              <FadeImage
                // A new key restarts the fade when moving to another image.
                key={item.imageUrl}
                src={item.imageUrl}
                alt={item.title}
                fill
                sizes={isFullscreen ? "100vw" : "(max-width: 640px) 100vw, 75vw"}
                loading="eager"
                fetchPriority="high"
                draggable={false}
                className="object-contain select-none"
              />
            )}
          </div>
        </ArtworkTransition>

        {showDetails ? (
          <div
            id={DETAILS_PANEL_ID}
            className={cn(
              "flex flex-col justify-between min-w-0 wrap-anywhere",
              isFullscreen
                ? // Over the image: bottom sheet on phones, side panel from sm.
                  "absolute z-5 inset-x-0 bottom-0 max-h-[60%] overflow-y-auto gap-5 p-5 border-t bg-background/90 backdrop-blur-sm sm:inset-y-0 sm:left-auto sm:w-1/4 sm:min-w-72 sm:max-h-none sm:pt-20 sm:border-t-0 sm:border-l"
                : "sm:mt-10"
            )}
          >
            <div className="flex-1">
              <h2 className="font-medium text-xl md:text-3xl first-letter:uppercase">
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
              <Button
                size="icon"
                variant="overlay"
                onClick={goPrev}
                aria-label="Imagem anterior"
              >
                <ChevronLeft />
              </Button>
              {counter}
              <Button
                size="icon"
                variant="overlay"
                onClick={goNext}
                aria-label="Próxima imagem"
              >
                <ChevronRight />
              </Button>
            </div>
          </div>
        ) : (
          // Details collapsed: the navigation floats over the image.
          <>
            <Button
              size="icon"
              variant="overlay"
              onClick={goPrev}
              aria-label="Imagem anterior"
              className="absolute z-10 left-5 top-1/2 -translate-y-1/2"
            >
              <ChevronLeft />
            </Button>
            <Button
              size="icon"
              variant="overlay"
              onClick={goNext}
              aria-label="Próxima imagem"
              className="absolute z-10 right-5 top-1/2 -translate-y-1/2"
            >
              <ChevronRight />
            </Button>
            <div className="absolute z-10 bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-background/80 px-3 py-1">
              {counter}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default GalleryRootList;
