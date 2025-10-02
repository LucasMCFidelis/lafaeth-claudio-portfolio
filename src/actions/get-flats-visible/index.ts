"use server";

import { FlatDTO } from "@/app/data/flat/flat-dto";
import getManyFlats from "@/app/data/flat/get-many-flats";

export const getFlatsVisible = async (): Promise<Array<FlatDTO>> => {
  const flats = await getManyFlats({
    where: { field: "visibleInFlat", value: true },
    withImages: true,
  });

  return flats;
};
