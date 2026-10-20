"use server";

import { eq } from "drizzle-orm";

import { ComicDTO } from "@/app/data/comics/comic-dto";
import mapToComicDTO from "@/app/data/comics/map-to-comic";
import {
  CadastreComicDTO,
  cadastreComicSchema,
} from "@/app/data/schemas/cadastre-comic-schema";
import verifyUserLogged from "@/app/data/user/verify-user";
import { db } from "@/db";
import { comicsTable } from "@/db/schema";

export const postComic = async (data: CadastreComicDTO): Promise<ComicDTO> => {
  const dataValidated = cadastreComicSchema.parse(data);

  const userIsLogged = await verifyUserLogged();
  if (!userIsLogged) throw new Error("Unauthorize");

  const existingComic = await db.query.comicsTable.findFirst({
    columns: { id: true },
    where: eq(comicsTable.imageId, dataValidated.imageId),
  });
  if (existingComic) {
    throw new Error(
      "Duplicate imageId: a comic with this image already exists"
    );
  }

  const [newComic] = await db
    .insert(comicsTable)
    .values(dataValidated)
    .returning();

  return mapToComicDTO({ data: newComic, withImage: true });
};
