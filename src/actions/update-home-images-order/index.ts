"use server";

import { updateTag } from "next/cache";

import { ImageDTO } from "@/app/data/image/image-dto";
import updateDisplayOrderItems from "@/app/data/update-display-order-items";
import verifyUserLogged from "@/app/data/user/verify-user";
import { imagesTable } from "@/db/schema";
import { cacheTags } from "@/queries/tags";

export const updateHomeImagesOrder = async (images: Array<ImageDTO>) => {
  const userIsLogged = await verifyUserLogged();
  if (!userIsLogged) throw new Error("Unauthorize");

  await updateDisplayOrderItems({
    items: images,
    table: imagesTable,
  });

  updateTag(cacheTags.images);

  return { success: true };
};
