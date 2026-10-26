"use server";

import { ColorDTO } from "@/app/data/colorization/colors-dto";
import getManyColors, {
  GetManyColorsProps,
} from "@/app/data/colorization/get-many-colors";
import verifyUserLogged from "@/app/data/user/verify-user";

/** Admin: any colorization, including hidden ones. */
export const getColors = async <WithImage extends boolean>({
  where,
  orderBy,
  withImage,
}: GetManyColorsProps<WithImage>): Promise<Array<ColorDTO<WithImage>>> => {
  const userIsLogged = await verifyUserLogged();
  if (!userIsLogged) throw new Error("Unauthorize");

  return getManyColors({ where, orderBy, withImage });
};
