import "server-only";

import getOneImage from "./get-one-image";
import { ImageDTO } from "./image-dto";

interface GetOneImageByIdProps {
  imageId: string;
}

const getOneImageById = async ({
  imageId,
}: GetOneImageByIdProps): Promise<ImageDTO> => {
  const image = await getOneImage({ where: { field: "id", value: imageId } });

  return image;
};

export default getOneImageById;
