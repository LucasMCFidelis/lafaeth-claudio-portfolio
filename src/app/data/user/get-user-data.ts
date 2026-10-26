import "server-only";

import { eq } from "drizzle-orm";
import { cacheLife, cacheTag } from "next/cache";

import { db } from "@/db";
import { userTable } from "@/db/schema";
import { calculateAge } from "@/helpers/calculate-age";
import { mountWhatsappUrl } from "@/helpers/mount-whatsapp-url";
import { cacheTags } from "@/queries/tags";

import { mapToImageDTO } from "../image/map-to-image-dto";
import { UserDTO } from "./user-dto";

/**
 * Cached profile of the site owner, with the home banner. Expired by
 * updateTag(cacheTags.user) in update-user-data, and by cacheTags.images when
 * the banner image changes. Uses "days" instead of "max" because `age` depends on
 * the current date.
 */
const getUserData = async (): Promise<UserDTO> => {
  "use cache";
  cacheLife("days");
  cacheTag(cacheTags.user, cacheTags.images);

  const userId = process.env.USER_ID;
  if (!userId) throw new Error("USER_ID not defined in env variables");

  const user = await db.query.userTable.findFirst({
    where: eq(userTable.id, userId),
    with: { bannerImage: true },
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
    bannerImageId: user.bannerImageId,
    bannerImage: user.bannerImage
      ? mapToImageDTO({ image: user.bannerImage })
      : null,
  };
};

export default getUserData;
