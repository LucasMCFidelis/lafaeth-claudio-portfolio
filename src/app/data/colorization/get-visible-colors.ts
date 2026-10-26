import "server-only";

import { cacheLife, cacheTag } from "next/cache";

import { cacheTags } from "@/queries/tags";

import { displayOrder } from "../order-by-condition";
import { ColorDTO } from "./colors-dto";
import getManyColors from "./get-many-colors";

/**
 * Public, cached read: only what is shown on the site, in display order.
 * Expired by updateTag(cacheTags.colors) in the server actions that write.
 */
const getVisibleColorsCached = async (): Promise<Array<ColorDTO<true>>> => {
  "use cache";
  cacheLife("max");
  cacheTag(cacheTags.colors);
  cacheTag(cacheTags.images);

  return getManyColors({
    where: { field: "visibleInColorization", value: true },
    orderBy: displayOrder,
    withImage: true,
  });
};

export default getVisibleColorsCached;
