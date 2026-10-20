"use client";

import { Search } from "lucide-react";
import { parseAsBoolean, parseAsString, useQueryStates } from "nuqs";
import { useDeferredValue, useState } from "react";

import CadastreImageModal from "@/app/(no-layout)/admin/components/cadastre-image-modal";
import DetailImageModal from "@/app/(no-layout)/admin/components/detail-image-modal";
import VisibilitySwitch from "@/app/(no-layout)/admin/components/visibility-switch";
import { ImageDTO } from "@/app/data/image/image-dto";
import { isImageInUse } from "@/app/data/image/image-usage-dto";
import { Input } from "@/components/ui/input";
import { useAllImages, useImagesUsage } from "@/hooks/queries/use-images";
import { cn } from "@/lib/utils";

import ExpandItemButton from "./expand-item-button";
import FadeImage from "./fade-image";

interface AllImageListProps {
  /** Picker mode (inside the image dialog): clicking an image selects it. */
  actionOnClick?: (image: ImageDTO) => void;
}

/** Case and accent insensitive, so "ilustracao" finds "Ilustração". */
const normalize = (text: string) =>
  text
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();

const AllImageList = ({ actionOnClick }: AllImageListProps) => {
  const { data: images, isPending } = useAllImages();
  const { data: usage } = useImagesUsage();
  const [search, setSearch] = useState("");
  const deferredSearch = useDeferredValue(search);

  const [{ imageId: imageSelected }, setStates] = useQueryStates({
    imageId: parseAsString,
    openDetailImage: parseAsBoolean.withDefault(false),
  });

  const term = normalize(deferredSearch.trim());
  const filteredImages = term
    ? images?.filter((image) =>
        normalize(`${image.title} ${image.description}`).includes(term)
      )
    : images;

  return (
    <>
      <div className="relative mx-2 mt-2">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Buscar imagem pelo título"
          aria-label="Buscar imagem pelo título"
          className="pl-9"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-2">
        {isPending ? (
          <p className="col-span-full text-center">Carregando imagens...</p>
        ) : filteredImages && filteredImages.length > 0 ? (
          filteredImages.map((image) => (
            <div
              key={image.id}
              className="relative aspect-square overflow-hidden rounded-lg border hover:ring-2 hover:ring-primary"
            >
              <button
                type="button"
                onClick={() => actionOnClick?.(image)}
                aria-label={
                  actionOnClick ? `Selecionar ${image.title}` : image.title
                }
                className={cn("relative aspect-square h-full w-full")}
              >
                <FadeImage
                  src={image.imageUrl}
                  alt={image.title}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                  className="object-cover"
                />
              </button>
              {!actionOnClick && (
                <VisibilitySwitch
                  entity="homeImage"
                  id={image.id}
                  visible={image.visibleInHome}
                  visibleLabel="Na Home"
                />
              )}
              {isImageInUse(usage?.[image.id]) && (
                <span className="pointer-events-none absolute bottom-2 left-2 z-20 rounded-full bg-primary/85 px-2 py-0.5 text-[0.7rem] font-medium text-primary-foreground">
                  Em uso
                </span>
              )}
              <ExpandItemButton
                type="button"
                aria-label={`Detalhes de ${image.title}`}
                onClick={() =>
                  setStates({ imageId: image.id, openDetailImage: true })
                }
              />
            </div>
          ))
        ) : (
          <p className="col-span-full text-center">
            {term
              ? "Nenhuma imagem encontrada para essa busca"
              : "Nenhuma imagem cadastrada até o momento"}
          </p>
        )}
      </div>
      <DetailImageModal
        imageId={imageSelected || ""}
        initialData={images?.find((img) => img.id === imageSelected)}
      />
      <CadastreImageModal />
    </>
  );
};

export default AllImageList;
