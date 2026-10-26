import "server-only";

import { cacheLife, cacheTag } from "next/cache";

import { cacheTags } from "@/queries/tags";

import { displayOrder } from "../order-by-condition";
import { FlatDTO } from "./flat-dto";
import getManyFlats from "./get-many-flats";

/**
 * Public, cached read: only what is shown on the site, in display order.
 * Expired by updateTag(cacheTags.flats) in the server actions that write.
 */
const getVisibleFlatsCached = async (): Promise<Array<FlatDTO>> => {
  "use cache";
  cacheLife("max");
  cacheTag(cacheTags.flats);
  cacheTag(cacheTags.images);

  return getManyFlats({
    where: { field: "visibleInFlat", value: true },
    orderBy: displayOrder,
    withImages: true,
  });
};

export default getVisibleFlatsCached;
