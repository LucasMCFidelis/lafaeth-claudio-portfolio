"use server";

import { ComicDTO } from "@/app/data/comics/comic-dto";
import getManyComics, {
  GetManyComicsProps,
} from "@/app/data/comics/get-many-comics";
import verifyUserLogged from "@/app/data/user/verify-user";

/** Admin: any comic, including hidden ones. */
export const getComics = async <WithImage extends boolean = boolean>({
  where,
  orderBy,
  withImage = false as WithImage,
}: GetManyComicsProps<WithImage>): Promise<Array<ComicDTO<WithImage>>> => {
  const userIsLogged = await verifyUserLogged();
  if (!userIsLogged) throw new Error("Unauthorize");

  return getManyComics({ where, orderBy, withImage });
};
