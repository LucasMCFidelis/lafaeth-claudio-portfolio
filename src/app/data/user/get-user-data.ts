import "server-only";

import { eq } from "drizzle-orm";
import { cache } from "react";

import { db } from "@/db";
import { userTable } from "@/db/schema";

import { UserDTO } from "./user-dto";

const getUserData = cache(async (): Promise<UserDTO | null> => {
  const userId = process.env.NEXT_PUBLIC_USER_ID;
  if (!userId) throw new Error("Public userId not defined in env variables");
  
  const user = await db.query.userTable.findFirst({
    where: eq(userTable.id, userId),
  });

  if (!user) {
    throw new Error("User Not Found");
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    image: user.image,
    description: user.description,
    birthDate: user.birthDate ? new Date(user.birthDate) : null,
  };
});

export default getUserData;
