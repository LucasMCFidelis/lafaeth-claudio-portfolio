"use client";

import { Expand } from "lucide-react";
import Image from "next/image";
import { parseAsBoolean, parseAsString, useQueryStates } from "nuqs";

import DetailImageModal from "@/app/(no-layout)/admin/components/detail-image-modal";
import { ImageDTO } from "@/app/data/image/image-dto";
import { useAllImages } from "@/hooks/queries/use-all-images";
import { cn } from "@/lib/utils";

import { Button } from "../ui/button";

interface AllImageListProps {
  initialData?: Array<ImageDTO>;
  actionOnClick?: (image: ImageDTO) => void;
}

const AllImageList = ({ initialData, actionOnClick }: AllImageListProps) => {
  const { data: images } = useAllImages(initialData && { initialData });
  const [{ imageId: imageSelected }, setStates] = useQueryStates({
    imageId: parseAsString,
    openDetailImage: parseAsBoolean.withDefault(false),
  });

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-2">
        {images?.map((image) => (
          <div
            key={image.id}
            className="relative aspect-square overflow-hidden rounded-lg border hover:ring-2 hover:ring-primary"
          >
            <button
              onClick={() => actionOnClick?.(image)}
              className={cn("relative aspect-square h-full")}
            >
              <Image
                src={image.imageUrl}
                alt={image.title}
                fill
                className="object-cover"
              />
            </button>
            <Button
              onClick={() =>
                setStates({ imageId: image.id, openDetailImage: true })
              }
              className="absolute top-0 right-0 z-20"
            >
              <Expand />
            </Button>
          </div>
        ))}
      </div>
      <DetailImageModal
        imageId={imageSelected || ""}
        initialData={images?.find((img) => img.id === imageSelected)}
      />
    </>
  );
};

export default AllImageList;
