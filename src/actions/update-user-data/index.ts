"use server";

import { eq } from "drizzle-orm";

import { updateUserSchema } from "@/app/data/schemas/update-user-schema";
import getUserData from "@/app/data/user/get-user-data";
import { UserUpdateDTO } from "@/app/data/user/user-update-dto";
import verifyUserLogged from "@/app/data/user/verify-user";
import { db } from "@/db";
import { userTable } from "@/db/schema";

export const updateUserData = async (dataUpdate: UserUpdateDTO) => {
  console.log( "aaaa");
  
  const dataValidated = updateUserSchema.parse(dataUpdate);
  const userIsLogged = await verifyUserLogged();
  if (!userIsLogged) throw new Error("Unauthorize");

  const user = await getUserData();

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
    })
    .where(eq(userTable.id, user.id));

  return { success: true };
};
