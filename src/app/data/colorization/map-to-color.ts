import { colorizationTable, imagesTable } from "@/db/schema";

import { mapToImageDTO } from "../image/map-to-image-dto";
import { ColorDTO } from "./colors-dto";

interface MapToColorDTOProps<WithImage extends boolean = boolean> {
  data: typeof colorizationTable.$inferSelect & {
    image?: typeof imagesTable.$inferSelect | null;
  };
  withImage?: WithImage;
}

const mapToColorDTO = <WithImage extends boolean>({
  data,
  withImage,
}: MapToColorDTOProps<WithImage>): ColorDTO<WithImage> => {
  return {
    id: data.id,
    productionYear: data.productionYear,
    visibleInColors: data.visibleInColorization,
    index: data.index,
    observations: data.observations,
    imageId: data.imageId,
    image:
      withImage && data.image ? mapToImageDTO({ image: data.image }) : null,
  };
};

export default mapToColorDTO;
