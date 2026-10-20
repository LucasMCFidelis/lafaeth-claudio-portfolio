"use server";

import { updateTag } from "next/cache";

import { IllustrationDTO } from "@/app/data/illustrations/illustration-dto";
import mapToIllustrationDTO from "@/app/data/illustrations/map-to-illustration";
import {
  CadastreIllustrationDTO,
  cadastreIllustrationSchema,
} from "@/app/data/schemas/cadastre-illustration-schema";
import verifyUserLogged from "@/app/data/user/verify-user";
import { db } from "@/db";
import { illustrationsTable } from "@/db/schema";
import { cacheTags } from "@/queries/tags";

export const postIllustration = async (
  data: CadastreIllustrationDTO
): Promise<IllustrationDTO> => {
  const dataValidated = cadastreIllustrationSchema.parse(data);

  const userIsLogged = await verifyUserLogged();
  if (!userIsLogged) throw new Error("Unauthorize");

  const [newIllustration] = await db
    .insert(illustrationsTable)
    .values({
      imageId: dataValidated.imageId,
      description: dataValidated.description || null,
      redirectUrl: dataValidated.redirectUrl || null,
      horizontalIllustration: dataValidated.horizontalIllustration,
      visibleInIllustrations: dataValidated.visibleInIllustrations,
    })
    .returning();

  updateTag(cacheTags.illustrations);

  return mapToIllustrationDTO({ data: newIllustration, withImage: true });
};
