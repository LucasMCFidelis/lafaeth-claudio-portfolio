"use server";

import { ImageDTO } from "@/app/data/image/image-dto";
import updateDisplayOrderItems from "@/app/data/update-display-order-items";
import { imagesTable } from "@/db/schema";

export const updateHomeImagesOrder = async (images: Array<ImageDTO>) => {
  await updateDisplayOrderItems({
    items: images,
    table: imagesTable,
  });
  
  return { success: true };
};
