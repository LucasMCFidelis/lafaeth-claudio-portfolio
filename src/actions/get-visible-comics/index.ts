"use server";

import { ComicDTO } from "@/app/data/comics/comic-dto";
import getManyComics from "@/app/data/comics/get-many-comics";
import { displayOrder } from "@/app/data/order-by-condition";

/** Public: only the comics shown on the site, in display order. */
export const getVisibleComics = async (): Promise<Array<ComicDTO<true>>> => {
  return getManyComics({
    where: { field: "visibleInComics", value: true },
    orderBy: displayOrder,
    withImage: true,
  });
};
