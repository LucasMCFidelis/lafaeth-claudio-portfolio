import { illustrationsTable, imagesTable } from "@/db/schema";

import { mapToImageDTO } from "../image/map-to-image-dto";
import { IllustrationDTO } from "./illustration-dto";

interface MapToIllustrationDTOProps<WithImage extends boolean> {
  data: typeof illustrationsTable.$inferSelect & {
    image?: typeof imagesTable.$inferSelect | null;
  };
  withImage: WithImage;
}

const mapToIllustrationDTO = <WithImage extends boolean>({
  data,
  withImage,
}: MapToIllustrationDTOProps<WithImage>): IllustrationDTO<WithImage> => {
  return {
    id: data.id,
    redirectUrl: data.redirectUrl,
    visibleInIllustrations: data.visibleInIllustrations,
    horizontalIllustration: data.horizontalIllustration,
    index: data.index,
    description: data.description,
    imageId: data.imageId,
    image:
      withImage && data.image ? mapToImageDTO({ image: data.image }) : null,
  };
};

export default mapToIllustrationDTO;
