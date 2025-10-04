"use server";

import getManyImages from "@/app/data/image/get-many-images";
import { ImageDTO } from "@/app/data/image/image-dto";

export const getAllImages = async (): Promise<Array<ImageDTO>> => {
  const allImages = await getManyImages({});

  return allImages;
};
