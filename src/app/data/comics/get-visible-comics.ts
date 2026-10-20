import "server-only";

import { cacheLife, cacheTag } from "next/cache";

import { cacheTags } from "@/queries/tags";

import { displayOrder } from "../order-by-condition";
import { ComicDTO } from "./comic-dto";
import getManyComics from "./get-many-comics";

/**
 * Public, cached read: only what is shown on the site, in display order.
 * Expired by updateTag(cacheTags.comics) in the server actions that write.
 */
const getVisibleComicsCached = async (): Promise<Array<ComicDTO<true>>> => {
  "use cache";
  cacheLife("max");
  cacheTag(cacheTags.comics);
  cacheTag(cacheTags.images);

  return getManyComics({
    where: { field: "visibleInComics", value: true },
    orderBy: displayOrder,
    withImage: true,
  });
};

export default getVisibleComicsCached;
