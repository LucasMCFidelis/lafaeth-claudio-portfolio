"use server";

import { ColorDTO } from "@/app/data/colorization/colors-dto";
import getOneColorById from "@/app/data/colorization/get-one-color-by-id";
import verifyUserLogged from "@/app/data/user/verify-user";

export const getColor = async ({
  colorId,
}: {
  colorId: string;
}): Promise<ColorDTO> => {
  const userIsLogged = await verifyUserLogged();
  if (!userIsLogged) throw new Error("Unauthorize");

  const color = await getOneColorById({
    colorId,
  });
  return color;
};
