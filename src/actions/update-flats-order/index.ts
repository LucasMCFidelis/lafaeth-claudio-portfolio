"use server";

import { FlatDTO } from "@/app/data/flat/flat-dto";
import updateDisplayOrderItems from "@/app/data/update-display-order-items";
import { flatTable } from "@/db/schema";

export const updateFlatsOrder = async (flats: Array<FlatDTO>) => {
  await updateDisplayOrderItems({
    items: flats,
    table: flatTable,
  });

  return { success: true };
};
