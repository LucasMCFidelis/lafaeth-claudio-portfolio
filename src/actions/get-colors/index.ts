"use server";

import { ColorDTO } from "@/app/data/colorization/colors-dto";
import getManyColors, {
  GetManyColorsProps,
} from "@/app/data/colorization/get-many-colors";

export const getColors = async <WithImage extends boolean>({
  where,
  orderBy,
  withImage,
}: GetManyColorsProps<WithImage>): Promise<Array<ColorDTO<WithImage>>> => {
  const colors = await getManyColors({
    where,
    orderBy,
    withImage,
  });

  return colors;
};
