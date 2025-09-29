import { comicsTable, imagesTable } from "@/db/schema";

import { mapToImageDTO } from "../image/map-to-image-dto";
import { ComicDTO } from "./comic-dto";

interface MapToComicDTOProps<WithImage extends boolean> {
  data: typeof comicsTable.$inferSelect & {
    image?: typeof imagesTable.$inferSelect | null;
  };
  withImage?: WithImage;
}

const mapToComicDTO = <WithImage extends boolean>({
  data,
  withImage,
}: MapToComicDTOProps<WithImage>): ComicDTO<WithImage> => {
  return {
    id: data.id,
    productionYear: data.productionYear,
    visibleInComics: data.visibleInComics,
    indexInComics: data.indexInComics,
    productionSizePages: data.productionSizePages,
    imageId: data.imageId,
    image:
      withImage && data.image ? mapToImageDTO({ image: data.image }) : null,
  };
};

export default mapToComicDTO;
