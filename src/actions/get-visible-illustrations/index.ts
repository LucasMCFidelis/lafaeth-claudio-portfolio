"use server";

import getManyIllustrations from "@/app/data/illustrations/get-many-illustration";
import { IllustrationDTO } from "@/app/data/illustrations/illustration-dto";
import { displayOrder } from "@/app/data/order-by-condition";

/** Public: only the illustrations shown on the site, in display order. */
export const getVisibleIllustrations = async (): Promise<
  Array<IllustrationDTO<true>>
> => {
  return getManyIllustrations({
    where: { field: "visibleInIllustrations", value: true },
    orderBy: displayOrder,
    withImage: true,
  });
};
