"use server";

import getHomeImagesCached from "@/app/data/image/get-home-images";
import { ImageDTO } from "@/app/data/image/image-dto";

/** Public: images shown on the home page, in display order. */
export const getHomeImages = async (): Promise<Array<ImageDTO>> =>
  getHomeImagesCached();
