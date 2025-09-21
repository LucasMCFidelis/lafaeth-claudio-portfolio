"use server";

import { eq } from "drizzle-orm";

import getUserData from "@/app/data/user/get-user-data";
import { UserUpdateDTO } from "@/app/data/user/user-update-dto";
import verifyUserLogged from "@/app/data/user/verify-user";
import { db } from "@/db";
import { userTable } from "@/db/schema";

export const updateUserData = async (dataUpdate: UserUpdateDTO) => {
  const userIsLogged = await verifyUserLogged();
  if (!userIsLogged) throw new Error("Unauthorize");

  const user = await getUserData();

  await db
    .update(userTable)
    .set({
      email: dataUpdate.email,
      name: dataUpdate.name,
      description: dataUpdate.description,
      image: dataUpdate.image,
      birthDate: dataUpdate.birthDate,
    })
    .where(eq(userTable.id, user.id));

  return { success: true };
};
