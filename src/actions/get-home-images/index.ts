"use server";

import getManyImages from "@/app/data/image/get-many-images";
import { ImageDTO } from "@/app/data/image/image-dto";
import { displayOrder } from "@/app/data/order-by-condition";

export const getHomeImages = async (): Promise<Array<ImageDTO>> => {
  const imagesHome = await getManyImages({
    where: { field: "visibleInHome", value: true },
    orderBy: displayOrder,
  });

  return imagesHome;
};
