"use server";

import { ComicDTO } from "@/app/data/comics/comic-dto";
import getVisibleComicsCached from "@/app/data/comics/get-visible-comics";

/** Public: only the comics shown on the site, in display order. */
export const getVisibleComics = async (): Promise<Array<ComicDTO<true>>> =>
  getVisibleComicsCached();
