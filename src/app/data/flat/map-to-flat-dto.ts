import { flatTable, imagesTable } from "@/db/schema";

import { mapToImageDTO } from "../image/map-to-image-dto";
import { FlatDTO } from "./flat-dto";

interface MapToFlatDTOProps<WithImages extends boolean = false> {
  data: typeof flatTable.$inferSelect & {
    backImage?: typeof imagesTable.$inferSelect | null;
    frontImage?: typeof imagesTable.$inferSelect | null;
  };
  withImages: WithImages;
}

const mapToFlatDTO = <WithImages extends boolean = false>({
  data,
  withImages,
}: MapToFlatDTOProps<WithImages>): FlatDTO => {
  return {
    id: data.id,
    title: data.title,
    description: data.description,
    visibleInFlat: data.visibleInFlat,
    index: data.index,
    horizontalPage: data.backImage?.horizontalPage === data.frontImage?.horizontalPage,
    backImageId: data.backImageId,
    frontImageId: data.frontImageId,
    ...(withImages && {
      frontImage: data.frontImage
        ? mapToImageDTO({ image: data.frontImage })
        : null,
      backImage: data.backImage
        ? mapToImageDTO({ image: data.backImage })
        : null,
    }),
  };
};

export default mapToFlatDTO;
