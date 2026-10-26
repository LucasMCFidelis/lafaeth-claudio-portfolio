import "server-only";

import { cacheLife, cacheTag } from "next/cache";

import { cacheTags } from "@/queries/tags";

import { displayOrder } from "../order-by-condition";
import getManyIllustrations from "./get-many-illustration";
import { IllustrationDTO } from "./illustration-dto";

/**
 * Public, cached read: only what is shown on the site, in display order.
 * Expired by updateTag(cacheTags.illustrations) in the server actions that write.
 */
const getVisibleIllustrationsCached = async (): Promise<Array<IllustrationDTO<true>>> => {
  "use cache";
  cacheLife("max");
  cacheTag(cacheTags.illustrations);
  cacheTag(cacheTags.images);

  return getManyIllustrations({
    where: { field: "visibleInIllustrations", value: true },
    orderBy: displayOrder,
    withImage: true,
  });
};

export default getVisibleIllustrationsCached;
