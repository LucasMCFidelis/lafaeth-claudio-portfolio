"use server";

import { ColorDTO } from "@/app/data/colorization/colors-dto";
import getManyColors from "@/app/data/colorization/get-many-colors";
import { displayOrder } from "@/app/data/order-by-condition";

/** Public: only the colorizations shown on the site, in display order. */
export const getVisibleColors = async (): Promise<Array<ColorDTO<true>>> => {
  return getManyColors({
    where: { field: "visibleInColorization", value: true },
    orderBy: displayOrder,
    withImage: true,
  });
};
