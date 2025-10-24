"use server";

import getOneImageById from "@/app/data/image/get-one-image-by-id";
import { ImageDTO } from "@/app/data/image/image-dto";

export const getImage = async ({
  imageId,
}: {
  imageId: string;
}): Promise<ImageDTO> => {
  const image = await getOneImageById({ imageId });

  return image;
};
