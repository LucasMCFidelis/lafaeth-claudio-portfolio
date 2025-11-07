"use server";

import getManyIllustrations, { GetManyIllustrationsProps } from "@/app/data/illustrations/get-many-illustration";
import { IllustrationDTO } from "@/app/data/illustrations/illustration-dto";

export const getIllustrations = async <WithImage extends boolean>({
  where,
  orderBy,
  withImage,
}: GetManyIllustrationsProps<WithImage>): Promise<Array<IllustrationDTO<WithImage>>> => {
  const illustrations = await getManyIllustrations({
    where,
    orderBy,
    withImage,
  });

  return illustrations;
};
