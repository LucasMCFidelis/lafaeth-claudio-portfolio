"use server";

import getOneImageById from "@/app/data/image/get-one-image-by-id";
import { ImageDTO } from "@/app/data/image/image-dto";
import verifyUserLogged from "@/app/data/user/verify-user";

export const getImage = async ({
  imageId,
}: {
  imageId: string;
}): Promise<ImageDTO> => {
  const userIsLogged = await verifyUserLogged();
  if (!userIsLogged) throw new Error("Unauthorize");

  const image = await getOneImageById({ imageId });

  return image;
};
