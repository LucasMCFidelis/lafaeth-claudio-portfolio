"use server";

import { eq } from "drizzle-orm";
import { updateTag } from "next/cache";

import { ComicDTO } from "@/app/data/comics/comic-dto";
import mapToComicDTO from "@/app/data/comics/map-to-comic";
import {
  UpdateComicDTO,
  updateComicSchema,
} from "@/app/data/schemas/update-comic-schema";
import verifyUserLogged from "@/app/data/user/verify-user";
import { db } from "@/db";
import { comicsTable } from "@/db/schema";
import { cacheTags } from "@/queries/tags";

export const updateComic = async (
  comicId: string,
  data: UpdateComicDTO
): Promise<ComicDTO> => {
  const dataValidated = updateComicSchema.parse(data);

  const userIsLogged = await verifyUserLogged();
  if (!userIsLogged) throw new Error("Unauthorize");

  const [comicUpdated] = await db
    .update(comicsTable)
    .set({
      imageId: dataValidated.imageId,
      productionSizePages: dataValidated.productionSizePages,
      productionYear: dataValidated.productionYear,
      visibleInComics: dataValidated.visibleInComics,
    })
    .where(eq(comicsTable.id, comicId))
    .returning();

  if (!comicUpdated) throw new Error("Comic not found");

  updateTag(cacheTags.comics);

  return mapToComicDTO({ data: comicUpdated, withImage: true });
};
