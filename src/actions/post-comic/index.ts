"use server";

import { ComicDTO } from "@/app/data/comics/comic-dto";
import getOneComic from "@/app/data/comics/get-one-comic";
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

  let comic;
  try {
    comic = await getOneComic({
      where: { field: "imageId", value: dataValidated.imageId },
    });
  } catch (error) {
    if (error instanceof Error && error.message === "Comic not found") {
      comic = null;
    } else {
      console.error("Unexpected error fetching comic:", error);
      throw error;
    }
  }
  if (comic) {
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
