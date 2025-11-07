import "server-only";

import getOneIllustration from "./get-one-illustration";
import { IllustrationDTO } from "./illustration-dto";

export interface GetOneIllustrationByIdProps {
  illustrationId: string;
}

const getOneIllustrationById = async ({
  illustrationId,
}: GetOneIllustrationByIdProps): Promise<IllustrationDTO> => {
  const illustration = await getOneIllustration({
    where: { field: "id", value: illustrationId },
  });

  return illustration;
};

export default getOneIllustrationById;
