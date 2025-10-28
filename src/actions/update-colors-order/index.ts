"use server";

import { ColorDTO } from "@/app/data/colorization/colors-dto";
import updateDisplayOrderItems from "@/app/data/update-display-order-items";
import { colorizationTable } from "@/db/schema";

export const updateColorsOrder = async (colors: Array<ColorDTO>) => {
  await updateDisplayOrderItems({
    items: colors,
    table: colorizationTable,
  });

  return { success: true };
};
