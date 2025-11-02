"use server";

import { ColorDTO } from "@/app/data/colorization/colors-dto";
import getOneColorById from "@/app/data/colorization/get-one-color-by-id";

export const getColor = async ({
  colorId,
}: {
  colorId: string;
}): Promise<ColorDTO> => {
  const color = await getOneColorById({
    colorId,
  });
  return color;
};
