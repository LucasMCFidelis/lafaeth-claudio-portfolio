"use server";

import getManyIllustrations, {
  GetManyIllustrationsProps,
} from "@/app/data/illustrations/get-many-illustration";
import { IllustrationDTO } from "@/app/data/illustrations/illustration-dto";
import verifyUserLogged from "@/app/data/user/verify-user";

/** Admin: any illustration, including hidden ones. */
export const getIllustrations = async <WithImage extends boolean>({
  where,
  orderBy,
  withImage,
}: GetManyIllustrationsProps<WithImage>): Promise<
  Array<IllustrationDTO<WithImage>>
> => {
  const userIsLogged = await verifyUserLogged();
  if (!userIsLogged) throw new Error("Unauthorize");

  return getManyIllustrations({ where, orderBy, withImage });
};
