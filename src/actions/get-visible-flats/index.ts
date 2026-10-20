"use server";

import { FlatDTO } from "@/app/data/flat/flat-dto";
import getManyFlats from "@/app/data/flat/get-many-flats";
import { displayOrder } from "@/app/data/order-by-condition";

/** Public: only the flats shown on the site, in display order. */
export const getVisibleFlats = async (): Promise<Array<FlatDTO>> => {
  return getManyFlats({
    where: { field: "visibleInFlat", value: true },
    orderBy: displayOrder,
    withImages: true,
  });
};
