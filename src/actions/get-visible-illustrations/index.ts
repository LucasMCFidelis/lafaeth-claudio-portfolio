"use server";

import getVisibleIllustrationsCached from "@/app/data/illustrations/get-visible-illustrations";
import { IllustrationDTO } from "@/app/data/illustrations/illustration-dto";

/** Public: only the illustrations shown on the site, in display order. */
export const getVisibleIllustrations = async (): Promise<
  Array<IllustrationDTO<true>>
> => getVisibleIllustrationsCached();
