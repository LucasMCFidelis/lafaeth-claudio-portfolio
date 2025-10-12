import "server-only";

import { cache } from "react";

import getUserData from "./get-user-data";
import { UserMediasUrlsDTO } from "./user-medias-dto";

const getUserMediaData = cache(async (): Promise<UserMediasUrlsDTO> => {
  const user = await getUserData();

  return {
    instagram: user.instagram,
    behance: user.behance,
    whatsapp: user.whatsapp,
    lattes: user.lattes,
  };
});

export default getUserMediaData;
