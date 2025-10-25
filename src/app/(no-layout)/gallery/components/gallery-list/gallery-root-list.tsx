"use client";

import { ArrowBigLeft, ArrowBigRight, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { parseAsBoolean, parseAsString, useQueryStates } from "nuqs";

import { ImageDTO } from "@/app/data/image/image-dto";
import { Button } from "@/components/ui/button";
import getPreferenceTheme from "@/helpers/get-theme-preference";

import ExpandFullSizeButton from "../expand-full-size-button";

interface GalleryRootListProps<T extends ImageDTO> {
  itemsList: Array<T>;
  hrefBackToClose?: string;
}

const GalleryRootList = <T extends ImageDTO>({
  itemsList,
  hrefBackToClose = "/",
}: GalleryRootListProps<T>) => {
  const isDarkTheme = getPreferenceTheme();
  const [{ id, "full-screen": isFullscreen }, setValues] = useQueryStates({
    id: parseAsString,
    "full-screen": parseAsBoolean,
  });
  if (!id) throw new Error("id is required");

  const currentIndex = itemsList.findIndex((img) => img.id === id);
  const startIndex = 0;
  const endIndex = itemsList.length - 1;
  const item = itemsList[currentIndex];

  const goToItem = (newIndex: number) => {
    const target = itemsList[newIndex];
    if (target) {
      setValues({ id: target.id });
    }
  };

  const goPrev = () => {
    goToItem(currentIndex > startIndex ? currentIndex - 1 : endIndex);
  };

  const goNext = () => {
    goToItem(currentIndex < endIndex ? currentIndex + 1 : startIndex);
  };
  return (
    <>
      <div className="absolute w-full flex justify-between z-10 px-5 pt-5">
        <ExpandFullSizeButton />
        <Button size="icon" asChild>
          <Link href={hrefBackToClose}>
            <X />
          </Link>
        </Button>
      </div>
      <div className="flex flex-col flex-1 p-5 w-full sm:grid sm:grid-cols-[1fr_25%] gap-5 md:gap-10">
        <div className="flex-1 relative">
          {item && (
            <Image
              src={item.imageUrl}
              alt={"teste"}
              fill
              className="object-contain"
            />
          )}
        </div>
        <div
          className={`font-sans flex flex-col justify-between sm:mt-10 ${
            isFullscreen && !isDarkTheme && "text-white"
          }`}
        >
          <div className="flex-1">
            <h2 className="font-extrabold text-xl md:text-3xl first-letter:uppercase">
              {item.title}
            </h2>
            <div className="text-xs lg:text-sm">
              <p className="first-letter:uppercase">{item.description}</p>
              {item.screenwriter && <p>Roteiro: {item.screenwriter}</p>}
              {item.colorist && <p>Cor: {item.colorist}</p>}

              {"productionYear" in item &&
                typeof item.productionYear === "number" && (
                  <p>Ano: {item.productionYear}</p>
                )}
              {"productionSizePages" in item &&
                typeof item.productionSizePages === "number" && (
                  <p>Tamanho: {item.productionSizePages} páginas</p>
                )}
              {"observations" in item &&
                typeof item.observations === "string" && (
                  <p>{item.observations}</p>
                )}
            </div>
          </div>

          <div className="flex w-full justify-between items-center mb-2">
            <Button size="icon" onClick={goPrev}>
              <ArrowBigLeft />
            </Button>
            <Button size="icon" onClick={goNext}>
              <ArrowBigRight />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default GalleryRootList;
