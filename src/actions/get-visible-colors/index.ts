"use server";

import { ColorDTO } from "@/app/data/colorization/colors-dto";
import getVisibleColorsCached from "@/app/data/colorization/get-visible-colors";

/** Public: only the colorizations shown on the site, in display order. */
export const getVisibleColors = async (): Promise<Array<ColorDTO<true>>> =>
  getVisibleColorsCached();
