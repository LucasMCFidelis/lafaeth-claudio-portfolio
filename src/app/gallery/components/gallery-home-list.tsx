"use client";

import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import Image from "next/image";
import { parseAsString, useQueryState } from "nuqs";

import { ImageDTO } from "@/app/data/image/image-dto";
import { Button } from "@/components/ui/button";
import { useHomeImages } from "@/hooks/queries/use-home-images";

interface GalleryHomeListProps {
  initialData?: Array<ImageDTO>;
}

const GalleryHomeList = ({ initialData }: GalleryHomeListProps) => {
  const [id, setId] = useQueryState("id", parseAsString);
  if (!id) throw new Error("id is required");

  const { data: images = [] } = useHomeImages(initialData && { initialData });
  const currentIndex = images.findIndex((img) => img.id === id);
  const image = images[currentIndex];

  const goToImage = (newIndex: number) => {
    const target = images[newIndex];
    if (target) {
      setId(target.id);
    }
  };

  const goPrev = () => {
    goToImage(currentIndex > 0 ? currentIndex - 1 : images.length - 1);
  };

  const goNext = () => {
    goToImage(currentIndex < images.length - 1 ? currentIndex + 1 : 0);
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
      <div className="font-sans">
        <div className="flex w-full justify-between items-center mb-2">
          <Button size="icon" onClick={goPrev}>
            <ArrowBigLeft />
          </Button>
          <Button size="icon" onClick={goNext}>
            <ArrowBigRight />
          </Button>
        </div>
        {image && (
          <>
            <h2 className="font-extrabold text-xl md:text-3xl ">
              {image.title}
            </h2>
            <p>{image.description}</p>
          </>
        )}
      </div>
    </>
  );
};

export default GalleryHomeList;
