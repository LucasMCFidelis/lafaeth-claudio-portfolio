"use server";

import { ColorDTO } from "@/app/data/colorization/colors-dto";
import updateDisplayOrderItems from "@/app/data/update-display-order-items";
import verifyUserLogged from "@/app/data/user/verify-user";
import { colorizationTable } from "@/db/schema";

export const updateColorsOrder = async (colors: Array<ColorDTO>) => {
  const userIsLogged = await verifyUserLogged();
  if (!userIsLogged) throw new Error("Unauthorize");

  await updateDisplayOrderItems({
    items: colors,
    table: colorizationTable,
  });

  return { success: true };
};
