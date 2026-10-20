"use server";

import getImagesUsage from "@/app/data/image/get-images-usage";
import { ImageUsage } from "@/app/data/image/image-usage-dto";
import verifyUserLogged from "@/app/data/user/verify-user";

/** Admin: where each image is used, keyed by image id (unused ones left out). */
export const getImagesUsageAction = async (): Promise<
  Record<string, ImageUsage>
> => {
  const userIsLogged = await verifyUserLogged();
  if (!userIsLogged) throw new Error("Unauthorize");

  return getImagesUsage();
};
