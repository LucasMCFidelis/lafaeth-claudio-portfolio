"use server";

import { eq } from "drizzle-orm";
import { updateTag } from "next/cache";

import { IllustrationDTO } from "@/app/data/illustrations/illustration-dto";
import mapToIllustrationDTO from "@/app/data/illustrations/map-to-illustration";
import {
  UpdateIllustrationDTO,
  updateIllustrationSchema,
} from "@/app/data/schemas/update-illustration-schema";
import verifyUserLogged from "@/app/data/user/verify-user";
import { db } from "@/db";
import { illustrationsTable } from "@/db/schema";
import { cacheTags } from "@/queries/tags";

export const updateIllustration = async (
  illustrationId: string,
  data: UpdateIllustrationDTO
): Promise<IllustrationDTO> => {
  const dataValidated = updateIllustrationSchema.parse(data);

  const userIsLogged = await verifyUserLogged();
  if (!userIsLogged) throw new Error("Unauthorize");

  const [illustrationUpdated] = await db
    .update(illustrationsTable)
    .set({
      imageId: dataValidated.imageId,
      description: dataValidated.description || null,
      redirectUrl: dataValidated.redirectUrl || null,
      horizontalIllustration: dataValidated.horizontalIllustration,
      visibleInIllustrations: dataValidated.visibleInIllustrations,
      // A hidden illustration loses its position on the public page.
      ...(!dataValidated.visibleInIllustrations && { index: null }),
    })
    .where(eq(illustrationsTable.id, illustrationId))
    .returning();

  if (!illustrationUpdated) throw new Error("Illustration not found");

  updateTag(cacheTags.illustrations);

  return mapToIllustrationDTO({ data: illustrationUpdated, withImage: true });
};
