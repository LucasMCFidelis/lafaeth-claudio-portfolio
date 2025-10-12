import "server-only";

import { eq } from "drizzle-orm";
import { cache } from "react";

import { db } from "@/db";
import { userTable } from "@/db/schema";
import { calculateAge } from "@/helpers/calculate-age";
import { mountWhatsappUrl } from "@/helpers/mount-whatsapp-url";

import { UserDTO } from "./user-dto";

const getUserData = cache(async (): Promise<UserDTO> => {
  const userId = process.env.USER_ID;
  if (!userId) throw new Error("USER_ID not defined in env variables");

  const user = await db.query.userTable.findFirst({
    where: eq(userTable.id, userId),
  });

  if (!user) {
    throw new Error("User Not Found");
  }

  const birthDate = user.birthDate ? new Date(user.birthDate) : null;
  const whatsappUrl = user.whatsappNumber
    ? mountWhatsappUrl({
        number: user.whatsappNumber,
        ...(user.whatsappMessage && { message: user.whatsappMessage }),
      })
    : null;

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    image: user.image,
    description: user.description,
    birthDate,
    age: birthDate ? calculateAge(birthDate) : null,
    instagram: user.instagram,
    behance: user.behance,
    whatsapp: whatsappUrl,
    whatsappMessage: user.whatsappMessage,
    whatsappNumber: user.whatsappNumber,
    lattes: user.lattes,
  };
});

export default getUserData;
