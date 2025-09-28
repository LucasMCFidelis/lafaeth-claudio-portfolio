import { imagesTable } from "@/db/schema";

import { ImageDTO } from "./image-dto";

interface MapImageDTOProps {
  image: typeof imagesTable.$inferSelect;
}

export function mapToImageDTO({ image }: MapImageDTOProps): ImageDTO {
  return {
    id: image.id,
    title: image.title,
    description: image.description,
    imageUrl: image.imageUrl,
    artist: image.artist,
    screenwriter: image.screenwriter,
    colorist: image.colorist,
    horizontalPage: image.horizontalPage,
    visibleInHome: !!image.visibleInHome,
    indexInHome: image.indexInHome,
    createdAt: image.createdAt,
  };
}
