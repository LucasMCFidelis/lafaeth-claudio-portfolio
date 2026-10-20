import "server-only";

import { db } from "@/db";
import { illustrationsTable } from "@/db/schema";

import { OrderByCondition } from "../order-by-condition";
import { buildOrderBy, buildWhere } from "../query-builders";
import { WhereCondition } from "../where-condition";
import { IllustrationDTO } from "./illustration-dto";
import mapToIllustrationDTO from "./map-to-illustration";

export interface GetManyIllustrationsProps<WithImage extends boolean> {
  where?: WhereCondition<typeof illustrationsTable>;
  orderBy?: OrderByCondition<typeof illustrationsTable>;
  withImage: WithImage;
}

const getManyIllustrations = async <WithImage extends boolean>({
  where,
  orderBy,
  withImage,
}: GetManyIllustrationsProps<WithImage>): Promise<
  Array<IllustrationDTO<WithImage>>
> => {
  const illustrations = await db.query.illustrationsTable.findMany({
    where: buildWhere(illustrationsTable, where),
    orderBy: buildOrderBy(illustrationsTable, orderBy),
    ...(withImage && { with: { image: true } }),
  });

  return illustrations.map((illustration) =>
    mapToIllustrationDTO({ data: illustration, withImage })
  );
};

export default getManyIllustrations;
