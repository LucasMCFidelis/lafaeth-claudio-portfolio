"use server";

import { ComicDTO } from "@/app/data/comics/comic-dto";
import updateDisplayOrderItems from "@/app/data/update-display-order-items";
import { comicsTable } from "@/db/schema";

export const updateComicsOrder = async (comics: Array<ComicDTO>) => {
  await updateDisplayOrderItems({
    items: comics,
    table: comicsTable,
  });

  return { success: true };
};
