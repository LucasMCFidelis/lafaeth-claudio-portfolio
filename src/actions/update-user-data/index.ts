"use server";

import { eq } from "drizzle-orm";
import { updateTag } from "next/cache";
import { after } from "next/server";

import deleteUnusedImageFiles from "@/app/data/image/delete-unused-image-files";
import { updateUserSchema } from "@/app/data/schemas/update-user-schema";
import getUserData from "@/app/data/user/get-user-data";
import { UserUpdateDTO } from "@/app/data/user/user-update-dto";
import verifyUserLogged from "@/app/data/user/verify-user";
import { db } from "@/db";
import { userTable } from "@/db/schema";
import { cacheTags } from "@/queries/tags";

export const updateUserData = async (dataUpdate: UserUpdateDTO) => {
  const dataValidated = updateUserSchema.parse(dataUpdate);
  const userIsLogged = await verifyUserLogged();
  if (!userIsLogged) throw new Error("Unauthorize");

  const user = await getUserData();

  // Read straight from the database: getUserData() is cached.
  const [current] = await db
    .select({ image: userTable.image })
    .from(userTable)
    .where(eq(userTable.id, user.id));

  await db
    .update(userTable)
    .set({
      email: dataValidated.email,
      name: dataValidated.name,
      description: dataValidated.description ?? null,
      image: dataValidated.image,
      birthDate: dataValidated.birthDate ?? null,
      behance: dataValidated.behance ?? null,
      instagram: dataValidated.instagram ?? null,
      lattes: dataValidated.lattes ?? null,
      whatsappMessage: dataValidated.whatsappMessage
        ? dataValidated.whatsappMessage
        : null,
      whatsappNumber: dataValidated.whatsappNumber ?? null,
      bannerImageId: dataValidated.bannerImageId,
    })
    .where(eq(userTable.id, user.id));

  updateTag(cacheTags.user);
  if (current?.image && current.image !== dataValidated.image) {
    after(() => deleteUnusedImageFiles([current.image]));
  }

  return { success: true };
};
