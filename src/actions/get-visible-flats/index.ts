"use server";

import { FlatDTO } from "@/app/data/flat/flat-dto";
import getVisibleFlatsCached from "@/app/data/flat/get-visible-flats";

/** Public: only the flats shown on the site, in display order. */
export const getVisibleFlats = async (): Promise<Array<FlatDTO>> =>
  getVisibleFlatsCached();
