"use client";

import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import Image from "next/image";
import { parseAsBoolean, parseAsString, useQueryStates } from "nuqs";

import { ImageDTO } from "@/app/data/image/image-dto";
import { Button } from "@/components/ui/button";
import getPreferenceTheme from "@/helpers/get-theme-preference";

interface GalleryRootListProps<T extends ImageDTO> {
  imagesList: Array<T>;
  children?: React.ReactNode;
}

const GalleryRootList = <T extends ImageDTO>({
  imagesList,
  children,
}: GalleryRootListProps<T>) => {
  const isDarkTheme = getPreferenceTheme();
  const [{ id, "full-screen": isFullscreen }, setValues] = useQueryStates({
    id: parseAsString,
    "full-screen": parseAsBoolean,
  });
  if (!id) throw new Error("id is required");

  const currentIndex = imagesList.findIndex((img) => img.id === id);
  const startIndex = 0;
  const endIndex = imagesList.length - 1;
  const image = imagesList[currentIndex];

  const goToImage = (newIndex: number) => {
    const target = imagesList[newIndex];
    if (target) {
      setValues({ id: target.id });
    }
  };

  const goPrev = () => {
    goToImage(currentIndex > startIndex ? currentIndex - 1 : endIndex);
  };

  const goNext = () => {
    goToImage(currentIndex < endIndex ? currentIndex + 1 : startIndex);
  };
  return (
    <>
      <div className="flex-1 relative">
        {image && (
          <Image
            src={image.imageUrl}
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
          {children ? (
            children
          ) : (
            <>
              <h2 className="font-extrabold text-xl md:text-3xl ">
                {image.title}
              </h2>
              <p>{image.description}</p>
            </>
          )}
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
    </>
  );
};

export default GalleryRootList;
