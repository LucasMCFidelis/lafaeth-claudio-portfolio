import "server-only";

import { ColorDTO } from "./colors-dto";
import getOneColor from "./get-one-color";


export interface GetOneColorByIdProps {
  colorId: string;
}

const getOneColorById = async ({
  colorId,
}: GetOneColorByIdProps): Promise<ColorDTO> => {
  const comic = await getOneColor({ where: { field: "id", value: colorId } });

  return comic;
};

export default getOneColorById;
