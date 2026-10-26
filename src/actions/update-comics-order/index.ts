"use server";

import { updateTag } from "next/cache";

import { ComicDTO } from "@/app/data/comics/comic-dto";
import updateDisplayOrderItems from "@/app/data/update-display-order-items";
import verifyUserLogged from "@/app/data/user/verify-user";
import { comicsTable } from "@/db/schema";
import { cacheTags } from "@/queries/tags";

export const updateComicsOrder = async (comics: Array<ComicDTO>) => {
  const userIsLogged = await verifyUserLogged();
  if (!userIsLogged) throw new Error("Unauthorize");

  await updateDisplayOrderItems({
    items: comics,
    table: comicsTable,
  });

  updateTag(cacheTags.comics);

  return { success: true };
};
