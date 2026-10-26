import "server-only";

import { cacheLife, cacheTag } from "next/cache";

import { cacheTags } from "@/queries/tags";

import { displayOrder } from "../order-by-condition";
import getManyImages from "./get-many-images";
import { ImageDTO } from "./image-dto";

/**
 * Public, cached read: images shown on the home page, in display order.
 * Expired by updateTag(cacheTags.images) in the server actions that write.
 */
const getHomeImagesCached = async (): Promise<Array<ImageDTO>> => {
  "use cache";
  cacheLife("max");
  cacheTag(cacheTags.images);

  return getManyImages({
    where: { field: "visibleInHome", value: true },
    orderBy: displayOrder,
  });
};

export default getHomeImagesCached;
