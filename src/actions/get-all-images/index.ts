"use server";

import getManyImages from "@/app/data/image/get-many-images";
import { ImageDTO } from "@/app/data/image/image-dto";
import verifyUserLogged from "@/app/data/user/verify-user";

/** Admin: every registered image. */
export const getAllImages = async (): Promise<Array<ImageDTO>> => {
  const userIsLogged = await verifyUserLogged();
  if (!userIsLogged) throw new Error("Unauthorize");

  return getManyImages({});
};
